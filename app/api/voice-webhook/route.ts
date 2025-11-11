import { NextRequest, NextResponse } from 'next/server';
import { WebhookReceiver } from 'livekit-server-sdk';

// Webhook event types
interface WebhookEvent {
  event: string;
  room?: {
    name: string;
    sid: string;
  };
  participant?: {
    identity: string;
    sid: string;
  };
  createdAt: number;
}

// Logger utility
function logWebhookEvent(event: WebhookEvent, message: string) {
  const timestamp = new Date().toISOString();
  console.log(
    JSON.stringify({
      timestamp,
      service: 'voice-webhook',
      event: event.event,
      roomName: event.room?.name,
      roomSid: event.room?.sid,
      participantIdentity: event.participant?.identity,
      participantSid: event.participant?.sid,
      message,
    })
  );
}

export async function POST(req: NextRequest) {
  try {
    // Validate environment variables
    const apiSecret = process.env.LIVEKIT_API_SECRET;

    if (!apiSecret) {
      console.error('Missing LIVEKIT_API_SECRET');
      return NextResponse.json(
        { success: false, message: 'Webhook service is not configured' },
        { status: 500 }
      );
    }

    // Get the raw body and headers for signature validation
    const body = await req.text();
    const authHeader = req.headers.get('authorization');

    if (!authHeader) {
      console.error('Missing authorization header');
      return NextResponse.json(
        { success: false, message: 'Missing authorization header' },
        { status: 401 }
      );
    }

    // Create webhook receiver and validate signature
    const receiver = new WebhookReceiver(apiSecret);
    let event: WebhookEvent;

    try {
      event = receiver.receive(body, authHeader) as WebhookEvent;
    } catch (error) {
      console.error('Webhook signature validation failed:', error);
      return NextResponse.json(
        { success: false, message: 'Invalid webhook signature' },
        { status: 401 }
      );
    }

    // Handle different webhook events
    switch (event.event) {
      case 'participant_joined':
        logWebhookEvent(event, 'Participant joined the room');

        // TODO: In a production setup, this would notify the agent worker
        // to join the room and start the conversation
        // For now, we just log the event

        break;

      case 'participant_left':
        logWebhookEvent(event, 'Participant left the room');

        // TODO: In a production setup, this would notify the agent worker
        // to clean up and leave the room
        // For now, we just log the event

        break;

      case 'room_finished':
        logWebhookEvent(event, 'Room finished');
        break;

      default:
        logWebhookEvent(event, `Unhandled event type: ${event.event}`);
    }

    return NextResponse.json({
      success: true,
      message: 'Webhook processed successfully',
    });
  } catch (error) {
    console.error('Webhook processing error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to process webhook' },
      { status: 500 }
    );
  }
}

// Health check endpoint
export async function GET() {
  return NextResponse.json({
    status: 'ok',
    service: 'voice-webhook',
    timestamp: new Date().toISOString(),
  });
}
