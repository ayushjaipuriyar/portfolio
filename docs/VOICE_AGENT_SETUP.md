# Voice Agent Setup Guide

This guide explains how to set up and configure the LiveKit-powered voice agent for the portfolio website.

## Architecture Overview

The voice agent system consists of **two separate services**:

1. **Next.js Portfolio App** (this repository)
   - Frontend voice UI component
   - API routes for token generation and webhooks
   - Runs on Vercel or similar platform

2. **Agent Worker Service** (`agent-worker/` directory)
   - Standalone Node.js service
   - Handles voice interactions using AI services
   - Runs on LiveKit Cloud, Railway, Render, or similar platform

```
┌─────────────────┐         ┌──────────────────┐         ┌─────────────────┐
│   Portfolio     │         │   LiveKit        │         │  Agent Worker   │
│   Website       │◄───────►│   Server         │◄───────►│   Service       │
│   (Next.js)     │         │   (WebRTC)       │         │   (Node.js)     │
└─────────────────┘         └──────────────────┘         └─────────────────┘
        │                            │                            │
        │                            │                            │
        ▼                            ▼                            ▼
  Token Generation            Media Streaming              AI Processing
  Webhook Handling            Room Management              STT/LLM/TTS
```

## Prerequisites

- Node.js 18+ and pnpm
- LiveKit Cloud account or self-hosted LiveKit server
- OpenAI API account
- AssemblyAI API account

## Part 1: Next.js Portfolio Setup

### Dependencies Installed

The following packages have been installed in the main portfolio app:

- `livekit-server-sdk` - Server-side LiveKit SDK for token generation
- `@livekit/components-react` - React components for LiveKit integration

### Environment Variables

Copy `.env.example` to `.env.local` and configure:

```bash
# LiveKit Configuration (for token generation only)
LIVEKIT_API_KEY=your_livekit_api_key
LIVEKIT_API_SECRET=your_livekit_api_secret
LIVEKIT_URL=wss://your-livekit-server.livekit.cloud
```

**How to get LiveKit credentials:**
1. Sign up at [LiveKit Cloud](https://cloud.livekit.io/)
2. Create a new project
3. Copy the API Key, API Secret, and WebSocket URL

### Configuration Files

**`types/voice-agent.ts`** - TypeScript types for:
- API request/response interfaces
- Frontend component types
- Webhook event types

**`config/voice-agent.ts`** - Frontend configuration:
- Environment variable validation
- Error messages
- Rate limiting settings
- Session timeout configuration

## Part 2: Agent Worker Setup

The agent worker is a **separate service** that must be deployed independently.

### 1. Navigate to Agent Worker Directory

```bash
cd agent-worker
```

### 2. Install Dependencies

```bash
pnpm install
```

This installs:
- `livekit-server-sdk` - LiveKit server SDK
- `@livekit/rtc-node` - Real-time communication
- `openai` - OpenAI SDK for LLM and TTS
- `assemblyai` - AssemblyAI SDK for STT

### 3. Configure Environment Variables

Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

Configure all required variables:

```bash
# LiveKit Configuration
LIVEKIT_API_KEY=your_livekit_api_key
LIVEKIT_API_SECRET=your_livekit_api_secret
LIVEKIT_URL=wss://your-livekit-server.livekit.cloud

# OpenAI API Key
OPENAI_API_KEY=your_openai_api_key

# AssemblyAI API Key
ASSEMBLYAI_API_KEY=your_assemblyai_api_key

# Portfolio Data Source
PORTFOLIO_DATA_URL=https://your-portfolio.com/api/portfolio-data
```

**How to get API keys:**
- **OpenAI**: [platform.openai.com/api-keys](https://platform.openai.com/api-keys)
- **AssemblyAI**: [assemblyai.com/dashboard/signup](https://www.assemblyai.com/dashboard/signup)

### 4. Development

Run the agent worker locally:

```bash
pnpm dev
```

### 5. Build for Production

```bash
pnpm build
pnpm start
```

## Deployment

### Deploy Next.js App (Vercel)

The portfolio app deploys normally to Vercel:

```bash
# From root directory
vercel
```

Ensure environment variables are set in Vercel dashboard.

### Deploy Agent Worker

The agent worker must be deployed separately. Choose one option:

#### Option 1: Railway (Recommended)

1. Create new Railway project
2. Connect to GitHub repository
3. Set root directory: `agent-worker`
4. Add environment variables
5. Deploy

#### Option 2: Render

1. Create new Web Service
2. Build command: `cd agent-worker && pnpm install && pnpm build`
3. Start command: `cd agent-worker && pnpm start`
4. Add environment variables
5. Deploy

#### Option 3: LiveKit Cloud Agents

Deploy directly to LiveKit's agent infrastructure:
- See [LiveKit Agents Documentation](https://docs.livekit.io/agents/)

#### Option 4: AWS/GCP/Azure

Deploy as a containerized service:
- Build Docker image from `agent-worker/`
- Deploy to ECS, Cloud Run, or App Service
- Ensure WebSocket connections are supported

## Project Structure

```
portfolio/
├── app/
│   └── api/
│       ├── voice-token/      # Token generation endpoint
│       └── voice-webhook/    # Webhook handler
├── components/
│   └── voice-agent/          # Voice UI component
├── types/
│   └── voice-agent.ts        # Frontend types
├── config/
│   └── voice-agent.ts        # Frontend config
└── docs/
    └── VOICE_AGENT_SETUP.md  # This file

agent-worker/                  # Separate service
├── src/
│   ├── index.ts              # Main entry point
│   ├── agent.ts              # Voice agent logic
│   ├── portfolio-loader.ts   # Portfolio data provider
│   ├── tools/                # Function tools
│   └── config.ts             # Agent configuration
├── package.json              # Separate dependencies
├── tsconfig.json
└── .env.example
```

## Next Steps

After completing the setup:

1. ✅ Dependencies and configuration (Task 1 - Complete)
2. ⏭️ Implement API routes for token generation and webhooks (Task 2)
3. ⏭️ Create portfolio data provider for the agent (Task 3)
4. ⏭️ Build the agent worker service (Task 4)
5. ⏭️ Create the frontend voice UI component (Task 5)

## Troubleshooting

### Next.js App Issues

**Missing Environment Variables**
```bash
# Check .env.local has all required variables
LIVEKIT_API_KEY=...
LIVEKIT_API_SECRET=...
LIVEKIT_URL=...
```

**TypeScript Errors**
```bash
pnpm install
npx tsc --noEmit
```

### Agent Worker Issues

**Dependencies Not Installing**
```bash
cd agent-worker
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

**Agent Not Connecting**
- Verify LiveKit credentials match in both services
- Check agent worker is running and accessible
- Review webhook configuration in LiveKit dashboard

**AI Service Errors**
- Verify OpenAI and AssemblyAI API keys
- Check API quotas and billing status
- Review error logs for specific issues

## Cost Estimation

Per 5-minute voice session:
- LiveKit: ~$0.01
- AssemblyAI STT: ~$0.02
- OpenAI LLM (GPT-4o-mini): ~$0.05
- OpenAI TTS: ~$0.03
- **Total: ~$0.11 per session**

Monthly estimates:
- 100 sessions: ~$11
- 500 sessions: ~$55
- 1000 sessions: ~$110

## Security Notes

- Never commit `.env` or `.env.local` files
- Rotate API keys periodically
- Implement rate limiting on token generation
- Validate all webhook signatures
- Use short-lived tokens (1 hour expiration)
- Monitor usage and set budget alerts

## Support

For issues or questions:
- LiveKit: [docs.livekit.io](https://docs.livekit.io/)
- OpenAI: [platform.openai.com/docs](https://platform.openai.com/docs)
- AssemblyAI: [assemblyai.com/docs](https://www.assemblyai.com/docs)
