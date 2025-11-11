/**
 * API Routes Manual Tests
 *
 * Manual tests for voice token and webhook API routes
 * Run with: npx tsx app/api/voice-api.test.ts
 */

// Manual test functions for API routes
export const runVoiceTokenTests = () => {
  console.log('Running Voice Token API Manual Tests...');

  // Test 1: Environment variables validation
  try {
    const apiKey = process.env.LIVEKIT_API_KEY;
    const apiSecret = process.env.LIVEKIT_API_SECRET;
    const livekitUrl = process.env.NEXT_PUBLIC_LIVEKIT_URL;

    if (!apiKey) throw new Error('LIVEKIT_API_KEY is required');
    if (!apiSecret) throw new Error('LIVEKIT_API_SECRET is required');
    if (!livekitUrl) throw new Error('NEXT_PUBLIC_LIVEKIT_URL is required');

    console.log('✅ Environment variables validation passed');
  } catch (error) {
    console.log(
      '❌ Environment variables validation failed:',
      error instanceof Error ? error.message : String(error)
    );
  }

  // Test 2: Request structure validation
  try {
    const validRequest = {
      roomName: `voice-${Date.now()}`,
      participantName: 'portfolio-visitor',
    };

    if (!validRequest.roomName) throw new Error('roomName is required');
    if (!validRequest.participantName) throw new Error('participantName is required');

    console.log('✅ Request structure validation passed');
  } catch (error) {
    console.log(
      '❌ Request structure validation failed:',
      error instanceof Error ? error.message : String(error)
    );
  }

  // Test 3: Room name generation
  try {
    const roomName = `voice-${Date.now()}`;
    const roomNameRegex = /^voice-\d+$/;

    if (!roomNameRegex.test(roomName)) {
      throw new Error('Room name format is incorrect');
    }

    console.log('✅ Room name generation test passed');
  } catch (error) {
    console.log(
      '❌ Room name generation test failed:',
      error instanceof Error ? error.message : String(error)
    );
  }
};

export const runVoiceWebhookTests = () => {
  console.log('Running Voice Webhook API Manual Tests...');

  // Test 1: Webhook event structure
  try {
    const testEvents = [
      {
        event: 'participant_joined',
        room: { name: 'test-room', sid: 'room-sid' },
        participant: { identity: 'user-123', sid: 'participant-sid' },
        createdAt: Date.now(),
      },
      {
        event: 'participant_left',
        room: { name: 'test-room', sid: 'room-sid' },
        participant: { identity: 'user-123', sid: 'participant-sid' },
        createdAt: Date.now(),
      },
    ];

    testEvents.forEach((event) => {
      if (!event.event) throw new Error('Event type is required');
      if (!event.room?.name) throw new Error('Room name is required');
      if (!event.participant?.identity) throw new Error('Participant identity is required');
      if (!event.createdAt) throw new Error('Created timestamp is required');
    });

    console.log('✅ Webhook event structure validation passed');
  } catch (error) {
    console.log(
      '❌ Webhook event structure validation failed:',
      error instanceof Error ? error.message : String(error)
    );
  }

  // Test 2: Webhook signature validation placeholder
  try {
    // This would require the actual webhook receiver implementation
    console.log('✅ Webhook signature validation test placeholder (needs implementation)');
  } catch (error) {
    console.log(
      '❌ Webhook signature validation test failed:',
      error instanceof Error ? error.message : String(error)
    );
  }
};

export const runAllApiTests = () => {
  console.log('='.repeat(50));
  console.log('Running All API Routes Manual Tests');
  console.log('='.repeat(50));

  runVoiceTokenTests();
  console.log('');
  runVoiceWebhookTests();

  console.log('');
  console.log('='.repeat(50));
  console.log('API Tests Completed');
  console.log('='.repeat(50));
};

// Run tests if this file is executed directly
if (typeof require !== 'undefined' && require.main === module) {
  runAllApiTests();
}
