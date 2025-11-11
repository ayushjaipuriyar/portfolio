/**
 * Voice Agent Configuration (Frontend - Next.js Portfolio)
 *
 * This file contains the configuration for the LiveKit voice agent integration
 * in the Next.js portfolio application. This includes token generation settings,
 * error messages, and rate limiting.
 *
 * Note: The agent worker configuration (STT, LLM, TTS) is managed separately
 * in the agent service deployment.
 */

/**
 * Environment variable validation for Next.js app
 */
export function validateVoiceAgentEnv(): {
  isValid: boolean;
  missingVars: string[];
} {
  const requiredVars = ['LIVEKIT_API_KEY', 'LIVEKIT_API_SECRET', 'LIVEKIT_URL'];

  const missingVars = requiredVars.filter((varName) => !process.env[varName]);

  return {
    isValid: missingVars.length === 0,
    missingVars,
  };
}

/**
 * Get LiveKit configuration from environment
 */
export function getLiveKitConfig() {
  return {
    apiKey: process.env.LIVEKIT_API_KEY || '',
    apiSecret: process.env.LIVEKIT_API_SECRET || '',
    url: process.env.LIVEKIT_URL || '',
  };
}

/**
 * Error messages for voice agent errors
 */
export const voiceAgentErrorMessages = {
  microphone_permission_denied:
    'Microphone access is required. Please enable it in your browser settings.',
  connection_failed: 'Failed to connect to voice agent. Please try again.',
  token_generation_failed: 'Unable to start voice session. Please refresh and try again.',
  network_error: 'Network connection lost. Attempting to reconnect...',
  browser_not_supported:
    "Your browser doesn't support voice features. Please use Chrome, Safari, or Firefox.",
} as const;

/**
 * Rate limiting configuration for token generation
 */
export const rateLimitConfig = {
  maxRequestsPerMinute: 10,
  windowMs: 60 * 1000, // 1 minute
};

/**
 * Session timeout configuration
 */
export const sessionConfig = {
  maxDurationMinutes: 10,
  idleTimeoutMinutes: 5,
  tokenExpirationHours: 1,
};

/**
 * LiveKit room configuration
 */
export const roomConfig = {
  // Room name prefix for voice agent sessions
  roomPrefix: 'voice-agent',
  // Auto-disconnect empty rooms after 5 minutes
  emptyTimeout: 300,
  // Maximum participants per room (1 user + 1 agent)
  maxParticipants: 2,
};
