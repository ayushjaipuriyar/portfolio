# Voice Agent Architecture

## Overview

The voice agent system is split into **two independent services** that communicate through LiveKit:

## Service 1: Next.js Portfolio App

**Location**: Root directory (this repository)

**Purpose**: Frontend application and API endpoints

**Responsibilities**:
- Display voice assistant UI to users
- Generate LiveKit access tokens
- Handle LiveKit webhooks
- Serve portfolio data via API

**Technology Stack**:
- Next.js 14 (React framework)
- shadcn/ui components
- LiveKit React SDK (`@livekit/components-react`)
- LiveKit Server SDK (`livekit-server-sdk`) for token generation

**Deployment**: Vercel, Netlify, or similar

**Dependencies**:
```json
{
  "livekit-server-sdk": "^2.14.0",
  "@livekit/components-react": "^2.9.15"
}
```

**Environment Variables**:
```bash
LIVEKIT_API_KEY=...
LIVEKIT_API_SECRET=...
LIVEKIT_URL=...
```

**Key Files**:
- `app/api/voice-token/route.ts` - Token generation
- `app/api/voice-webhook/route.ts` - Webhook handler
- `components/voice-agent/voice-assistant.tsx` - UI component
- `types/voice-agent.ts` - TypeScript types
- `config/voice-agent.ts` - Configuration

## Service 2: Agent Worker

**Location**: `agent-worker/` directory

**Purpose**: AI-powered voice interaction processing

**Responsibilities**:
- Connect to LiveKit rooms
- Process voice input (Speech-to-Text)
- Generate responses (LLM)
- Synthesize speech (Text-to-Speech)
- Answer questions about portfolio

**Technology Stack**:
- Node.js with TypeScript
- LiveKit Server SDK
- OpenAI SDK (LLM + TTS)
- AssemblyAI SDK (STT)

**Deployment**: Railway, Render, LiveKit Cloud, AWS ECS, or similar

**Dependencies**:
```json
{
  "livekit-server-sdk": "^2.14.0",
  "@livekit/rtc-node": "^0.11.0",
  "openai": "^6.8.1",
  "assemblyai": "^4.19.0"
}
```

**Environment Variables**:
```bash
LIVEKIT_API_KEY=...
LIVEKIT_API_SECRET=...
LIVEKIT_URL=...
OPENAI_API_KEY=...
ASSEMBLYAI_API_KEY=...
PORTFOLIO_DATA_URL=...
```

**Key Files**:
- `src/index.ts` - Main entry point
- `src/agent.ts` - Voice agent implementation
- `src/portfolio-loader.ts` - Portfolio data provider
- `src/tools/` - Function tools for queries
- `src/config.ts` - Agent configuration

## Communication Flow

```
1. User clicks voice button
   ↓
2. Frontend requests token from Next.js API
   ↓
3. Next.js generates LiveKit token
   ↓
4. Frontend connects to LiveKit room
   ↓
5. LiveKit sends webhook to Next.js
   ↓
6. Agent Worker joins the same room
   ↓
7. User speaks → LiveKit → Agent Worker
   ↓
8. Agent Worker: STT → LLM → TTS
   ↓
9. Agent Worker → LiveKit → Frontend
   ↓
10. User hears response
```

## Why Separate Services?

### Technical Reasons

1. **Different Runtime Requirements**
   - Next.js: Serverless functions (short-lived)
   - Agent Worker: Long-running WebSocket connections

2. **Different Dependencies**
   - Next.js: Frontend libraries, React components
   - Agent Worker: AI SDKs, real-time processing

3. **Independent Scaling**
   - Next.js: Scale based on web traffic
   - Agent Worker: Scale based on concurrent voice sessions

4. **Deployment Flexibility**
   - Next.js: Optimized for edge/CDN deployment
   - Agent Worker: Needs persistent connections

### Practical Benefits

1. **No Timeout Issues**
   - Serverless functions have 10-60 second limits
   - Voice sessions can last 5-10 minutes

2. **Better Resource Management**
   - Agent worker can maintain state across sessions
   - Efficient connection pooling to AI services

3. **Easier Debugging**
   - Separate logs for frontend vs agent
   - Independent monitoring and alerting

4. **Cost Optimization**
   - Only run agent worker when needed
   - Scale independently based on usage

## Data Sharing

The agent worker needs access to portfolio data. Two approaches:

### Approach 1: API Endpoint (Recommended)

Next.js exposes portfolio data:
```typescript
// app/api/portfolio-data/route.ts
export async function GET() {
  return NextResponse.json(portfolioConfig);
}
```

Agent worker fetches on startup:
```typescript
const response = await fetch(process.env.PORTFOLIO_DATA_URL);
const portfolioData = await response.json();
```

### Approach 2: Shared Configuration

Both services import from shared config:
```typescript
import portfolioConfig from '../config/portfolio';
```

Requires both services to have access to the same codebase.

## Development Workflow

### Local Development

Terminal 1 - Next.js App:
```bash
pnpm dev
```

Terminal 2 - Agent Worker:
```bash
cd agent-worker
pnpm dev
```

### Production Deployment

1. Deploy Next.js to Vercel:
```bash
vercel
```

2. Deploy Agent Worker to Railway:
```bash
cd agent-worker
railway up
```

3. Configure webhooks in LiveKit dashboard to point to Next.js API

## Monitoring

### Next.js Metrics
- Token generation requests
- Webhook events received
- API response times
- Error rates

### Agent Worker Metrics
- Active sessions
- Average session duration
- AI service latency (STT, LLM, TTS)
- API costs per session
- Error rates by type

## Security Considerations

### Next.js App
- Rate limit token generation (10 req/min)
- Validate webhook signatures
- Short-lived tokens (1 hour)
- CORS configuration

### Agent Worker
- Secure API key storage
- Validate LiveKit connections
- Content filtering for user input
- Session timeouts

## Cost Breakdown

### Next.js App
- Hosting: Free (Vercel hobby tier)
- LiveKit token generation: Free (API calls)

### Agent Worker
- Hosting: $5-20/month (Railway/Render)
- LiveKit: ~$0.01 per session
- STT: ~$0.02 per session
- LLM: ~$0.05 per session
- TTS: ~$0.03 per session

**Total per session: ~$0.11**

## Future Enhancements

1. **Caching Layer**
   - Cache common responses
   - Reduce LLM API calls

2. **Load Balancing**
   - Multiple agent worker instances
   - Distribute sessions across workers

3. **Analytics Dashboard**
   - Real-time session monitoring
   - Cost tracking
   - Usage patterns

4. **Advanced Features**
   - Multi-language support
   - Custom voice training
   - Screen sharing integration
