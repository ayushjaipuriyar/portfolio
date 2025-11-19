import { NextRequest, NextResponse } from 'next/server';
import { AccessToken } from 'livekit-server-sdk';

// Simple in-memory rate limiter
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX_REQUESTS = 10;

function getRateLimitKey(req: NextRequest): string {
    const forwarded = req.headers.get('x-forwarded-for');
    const ip = forwarded ? forwarded.split(',')[0] : req.headers.get('x-real-ip') || 'unknown';
    return ip;
}

function checkRateLimit(key: string): boolean {
    const now = Date.now();
    const record = rateLimitMap.get(key);

    if (!record || now > record.resetTime) {
        rateLimitMap.set(key, {
            count: 1,
            resetTime: now + RATE_LIMIT_WINDOW,
        });
        return true;
    }

    if (record.count >= RATE_LIMIT_MAX_REQUESTS) {
        return false;
    }

    record.count++;
    return true;
}

function generateRoomName(): string {
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2, 8);
    return `voice-agent-${timestamp}-${random}`;
}

export async function POST(req: NextRequest) {
    try {
        // Check rate limit
        const rateLimitKey = getRateLimitKey(req);
        if (!checkRateLimit(rateLimitKey)) {
            return NextResponse.json(
                { error: 'Rate limit exceeded. Please try again later.' },
                { status: 429 }
            );
        }

        // Validate environment variables
        const apiKey = process.env.LIVEKIT_API_KEY;
        const apiSecret = process.env.LIVEKIT_API_SECRET;
        const serverUrl = process.env.LIVEKIT_URL;

        if (!apiKey || !apiSecret || !serverUrl) {
            console.error('Missing LiveKit configuration:', {
                hasApiKey: !!apiKey,
                hasApiSecret: !!apiSecret,
                hasServerUrl: !!serverUrl,
            });
            return NextResponse.json(
                { error: 'Voice agent service is not configured. Please check environment variables.' },
                { status: 500 }
            );
        }

        // Parse request body
        let body: {
            room_config?: {
                agents?: Array<{ agent_name: string }>;
            };
        } = {};

        try {
            body = await req.json();
        } catch {
            // If no body or invalid JSON, use defaults
        }

        const roomName = generateRoomName();
        const participantName = `user-${Math.random().toString(36).substring(2, 8)}`;

        // Generate access token
        const token = new AccessToken(apiKey, apiSecret, {
            identity: participantName,
            ttl: '1h',
        });

        // Grant permissions
        token.addGrant({
            roomJoin: true,
            room: roomName,
            canPublish: true,
            canSubscribe: true,
            canPublishData: true,
        });

        const participantToken = await token.toJwt();

        // Return connection details in the format expected by LiveKit agents UI
        return NextResponse.json({
            serverUrl,
            participantToken,
            participantName,
            roomName,
        });
    } catch (error) {
        console.error('Connection details generation error:', error);
        return NextResponse.json(
            { error: 'Failed to generate connection details' },
            { status: 500 }
        );
    }
}
