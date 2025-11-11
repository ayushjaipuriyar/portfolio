# Voice Agent Deployment Guide

This guide covers deploying the portfolio voice agent system to production.

## Architecture Overview

The voice agent consists of three main components:

1. **Next.js Frontend + API Routes** - Handles UI and token generation
2. **Agent Worker Service** - Processes voice conversations
3. **LiveKit Cloud** - Real-time communication infrastructure

## Prerequisites

### Required Accounts & API Keys

1. **LiveKit Cloud Account**
   - Sign up at [cloud.livekit.io](https://cloud.livekit.io)
   - Create a project
   - Note: API Key, API Secret, and WebSocket URL

2. **OpenAI API Key**
   - Get from [platform.openai.com](https://platform.openai.com/api-keys)
   - Recommended: GPT-4o-mini for cost efficiency

3. **AssemblyAI Account**
   - Sign up at [assemblyai.com](https://assemblyai.com)
   - Get API key for speech-to-text

4. **Optional: ElevenLabs Account**
   - Sign up at [elevenlabs.io](https://elevenlabs.io)
   - For enhanced text-to-speech (alternative to OpenAI TTS)

## Deployment Options

### Option 1: Vercel + Railway (Recommended)

#### 1. Deploy Next.js App to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Set environment variables in Vercel dashboard
LIVEKIT_API_KEY=your_api_key
LIVEKIT_API_SECRET=your_api_secret
NEXT_PUBLIC_LIVEKIT_URL=wss://your-livekit-server.livekit.cloud
```

#### 2. Deploy Agent Worker to Railway

```bash
# Install Railway CLI
npm install -g @railway/cli

# Login and deploy
railway login
railway init
railway up

# Set environment variables
railway variables set LIVEKIT_API_KEY=your_api_key
railway variables set LIVEKIT_API_SECRET=your_api_secret
railway variables set OPENAI_API_KEY=your_openai_key
railway variables set ASSEMBLYAI_API_KEY=your_assemblyai_key
```

### Option 2: Vercel + Render

#### 1. Deploy Next.js App to Vercel (same as above)

#### 2. Deploy Agent Worker to Render

```yaml
# render.yaml
services:
  - type: web
    name: voice-agent-worker
    runtime: node
    buildCommand: "npm install -g pnpm && pnpm install --frozen-lockfile && npm run build"
    startCommand: "node services/voice-agent/dist/index.js"
    envVars:
      - key: NODE_ENV
        value: production
      - key: LIVEKIT_API_KEY
        fromSecret: livekit_api_key
      - key: LIVEKIT_API_SECRET
        fromSecret: livekit_api_secret
      - key: OPENAI_API_KEY
        fromSecret: openai_api_key
      - key: ASSEMBLYAI_API_KEY
        fromSecret: assemblyai_api_key
```

### Option 3: Single Deployment (Vercel Only)

For simpler deployments, you can run the agent worker as a serverless function:

```typescript
// In Next.js API route: app/api/agent-worker/route.ts
import { PortfolioVoiceAgent } from '@/services/voice-agent/agent';

export async function POST(request: Request) {
  // Handle agent worker logic here
  // Note: Limited by Vercel function timeout (10-60 seconds)
}
```

## Environment Variables Setup

### Required Variables

```bash
# LiveKit Configuration
LIVEKIT_API_KEY=your_livekit_api_key_here
LIVEKIT_API_SECRET=your_livekit_api_secret_here
NEXT_PUBLIC_LIVEKIT_URL=wss://your-livekit-server.livekit.cloud

# AI Services
OPENAI_API_KEY=your_openai_api_key_here
ASSEMBLYAI_API_KEY=your_assemblyai_api_key_here

# Application
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

### Optional Variables

```bash
# Voice Agent Configuration
VOICE_AGENT_STT_PROVIDER=assemblyai  # or 'deepgram'
VOICE_AGENT_LLM_MODEL=gpt-4o-mini    # or 'gpt-4'
VOICE_AGENT_TTS_PROVIDER=openai      # or 'elevenlabs'
VOICE_AGENT_VOICE=alloy              # OpenAI voices
VOICE_AGENT_LANGUAGE=en              # Language code

# Deployment URLs
AGENT_WORKER_URL=https://your-agent-worker.vercel.app
LIVEKIT_WEBHOOK_URL=https://your-domain.com/api/voice-webhook
```

## LiveKit Webhook Configuration

1. Go to [LiveKit Cloud Dashboard](https://cloud.livekit.io)
2. Navigate to your project settings
3. Add webhook URL: `https://your-domain.com/api/voice-webhook`
4. Select events:
   - `participant_joined`
   - `participant_left`
   - `room_finished`
5. Save configuration

## Testing Deployment

### 1. Frontend Testing

```bash
# Test the voice assistant button appears
curl https://your-domain.com

# Test token generation
curl -X POST https://your-domain.com/api/voice-token \
  -H "Content-Type: application/json" \
  -d '{"roomName":"test-room","participantName":"test-user"}'
```

### 2. Webhook Testing

```bash
# Test webhook endpoint
curl -X POST https://your-domain.com/api/voice-webhook \
  -H "Content-Type: application/webhook+json" \
  -d '{
    "event": "participant_joined",
    "room": {"name": "test-room", "sid": "room-sid"},
    "participant": {"identity": "test-user", "sid": "participant-sid"},
    "createdAt": 1234567890
  }'
```

### 3. Agent Worker Testing

```bash
# Test agent worker health (if available)
curl https://your-agent-worker.com/health

# Check agent worker logs in your deployment platform
```

## Monitoring & Troubleshooting

### Common Issues

#### 1. Voice Assistant Button Not Appearing

**Symptoms:** Voice assistant FAB button is missing from the site

**Solutions:**
- Check browser console for JavaScript errors
- Verify LiveKit URL is set correctly
- Ensure all required environment variables are configured

#### 2. Connection Failures

**Symptoms:** "Connection failed" error in voice assistant

**Solutions:**
- Verify LiveKit API credentials
- Check webhook URL configuration
- Ensure agent worker is running and accessible
- Check browser network tab for failed requests

#### 3. No Audio/Microphone Issues

**Symptoms:** Voice assistant connects but no audio

**Solutions:**
- Verify microphone permissions are granted
- Check browser compatibility (WebRTC support)
- Ensure HTTPS is enabled (required for microphone access)
- Test microphone access in browser settings

#### 4. Agent Not Responding

**Symptoms:** Voice assistant connects but agent doesn't speak

**Solutions:**
- Check agent worker logs for errors
- Verify OpenAI API key is valid and has credits
- Ensure AssemblyAI API key is configured
- Check LiveKit room connection in dashboard

### Monitoring

#### Logs

- **Next.js App:** Check Vercel function logs
- **Agent Worker:** Check Railway/Render deployment logs
- **LiveKit:** Monitor room connections in LiveKit dashboard

#### Metrics to Track

- Voice session success rate
- Average session duration
- API error rates
- Token generation failures
- Webhook delivery success

### Cost Monitoring

#### Estimated Monthly Costs

- **LiveKit:** ~$0.01 per voice session
- **OpenAI (GPT-4o-mini):** ~$0.05 per 5-minute conversation
- **AssemblyAI:** ~$0.02 per 5-minute conversation
- **Total:** ~$0.08 per voice session

#### Cost Optimization

- Use GPT-4o-mini instead of GPT-4
- Implement session time limits
- Cache common responses
- Monitor usage and set up alerts

## Security Considerations

1. **API Key Protection**
   - Never commit API keys to version control
   - Use environment variables only
   - Rotate keys periodically

2. **Rate Limiting**
   - Implement rate limiting on token generation
   - Monitor for abuse patterns

3. **Input Validation**
   - Validate all webhook payloads
   - Sanitize user inputs
   - Implement content filtering if needed

## Performance Optimization

1. **Caching**
   - Cache portfolio data in agent worker
   - Implement response caching for common queries

2. **Connection Pooling**
   - Reuse LiveKit connections when possible
   - Implement connection pooling in agent worker

3. **Resource Limits**
   - Set memory limits for agent worker
   - Implement session timeouts
   - Monitor resource usage

## Support

For issues or questions:

1. Check the troubleshooting section above
2. Review deployment logs
3. Test with the manual test scripts in the codebase
4. Check LiveKit status page for service issues

## Updating the Voice Agent

To update the voice agent's knowledge:

1. Update `config/portfolio.ts` with new information
2. The agent worker will automatically reload data on restart
3. No code changes needed for content updates

To update the voice agent logic:

1. Modify code in `services/voice-agent/`
2. Test changes locally
3. Deploy updated code to your platform
4. Monitor for any issues
