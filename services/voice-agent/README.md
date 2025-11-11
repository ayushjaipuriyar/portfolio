# Voice Agent Portfolio Data Services

This directory contains the portfolio data provider and function tools for the voice agent integration.

## Setup and Configuration

### Environment Variables

Before running the voice agent, you need to configure the following environment variables:

#### Required Variables

```bash
# LiveKit Configuration (get from https://cloud.livekit.io)
LIVEKIT_API_KEY=your_livekit_api_key_here
LIVEKIT_API_SECRET=your_livekit_api_secret_here
NEXT_PUBLIC_LIVEKIT_URL=wss://your-livekit-server.livekit.cloud

# AI Services
OPENAI_API_KEY=your_openai_api_key_here
ASSEMBLYAI_API_KEY=your_assemblyai_api_key_here  # or DEEPGRAM_API_KEY
```

#### Optional Variables

```bash
# Voice Agent Configuration
VOICE_AGENT_STT_PROVIDER=assemblyai  # or 'deepgram'
VOICE_AGENT_LLM_MODEL=gpt-4o-mini    # or 'gpt-4'
VOICE_AGENT_TTS_PROVIDER=openai      # or 'elevenlabs'
VOICE_AGENT_VOICE=alloy              # OpenAI voices: alloy, echo, fable, onyx, nova, shimmer
VOICE_AGENT_LANGUAGE=en

# Deployment
AGENT_WORKER_URL=https://your-agent-worker.vercel.app
LIVEKIT_WEBHOOK_URL=https://your-domain.com/api/voice-webhook
```

### API Key Setup

1. **LiveKit**: Sign up at [cloud.livekit.io](https://cloud.livekit.io) and create a project
2. **OpenAI**: Get API key from [platform.openai.com](https://platform.openai.com/api-keys)
3. **AssemblyAI**: Sign up at [assemblyai.com](https://assemblyai.com) for speech-to-text
4. **ElevenLabs** (optional): Sign up at [elevenlabs.io](https://elevenlabs.io) for enhanced TTS

### LiveKit Webhook Configuration

The voice agent requires webhook configuration in LiveKit to receive room events:

1. **Go to LiveKit Cloud Dashboard**: https://cloud.livekit.io
2. **Navigate to your project** settings
3. **Add webhook URL**: `https://your-domain.com/api/voice-webhook`
4. **Select events to receive**:
   - `participant_joined`
   - `participant_left`
   - `room_finished`
5. **Save configuration**

The webhook will automatically trigger the agent worker to join/leave rooms.

### Testing Webhook Delivery

Test webhook delivery using LiveKit's webhook testing tools or by:

1. Starting a voice session on your portfolio
2. Checking server logs for webhook events
3. Verifying agent connection in LiveKit dashboard

## Overview

The voice agent uses these services to retrieve and format portfolio information when answering user questions about experience, projects, skills, education, and contact information.

## Components

### 1. Portfolio Data Provider (`portfolio-loader.ts`)

The `PortfolioDataProvider` class provides methods to access and format portfolio data from the configuration file.

**Key Methods:**

- `getExperienceSummary(company?: string)` - Get formatted work experience
- `getProjectDetails(featured?: boolean, projectId?: string)` - Get project information
- `getSkillsByCategory(category?: string)` - Get skills organized by category
- `getEducationSummary()` - Get education background
- `getContactInfo()` - Get contact information
- `getPersonalInfo()` - Get personal bio and tagline
- `getPortfolioSummary()` - Get high-level portfolio overview
- `searchPortfolio(query: string)` - Search across all portfolio data

**Example Usage:**

```typescript
import { portfolioDataProvider } from './portfolio-loader';

// Get all experience
const experience = portfolioDataProvider.getExperienceSummary();

// Get experience for specific company
const healthtripExp = portfolioDataProvider.getExperienceSummary('Healthtrip');

// Get featured projects
const projects = portfolioDataProvider.getProjectDetails(true);

// Get frontend skills
const frontendSkills = portfolioDataProvider.getSkillsByCategory('frontend');
```

### 2. Function Tools (`function-tools.ts`)

Function tools that can be called by the LLM when it needs specific portfolio information.

**Available Tools:**

1. `getExperience` - Get work experience information
2. `getProjects` - Get project information
3. `getSkills` - Get technical skills
4. `getEducation` - Get education background
5. `getContactInfo` - Get contact information
6. `getPersonalInfo` - Get personal bio
7. `getPortfolioSummary` - Get portfolio overview
8. `searchPortfolio` - Search portfolio data

**Example Usage:**

```typescript
import { executeFunctionTool, functionTools } from './function-tools';

// Execute a function tool
const result = executeFunctionTool('getExperience', { company: 'Microsoft' });

// Get function tool definitions (for OpenAI function calling)
const tools = functionTools;

// Use with OpenAI API
const response = await openai.chat.completions.create({
  model: 'gpt-4',
  messages: [...],
  tools: functionTools,
});
```

### 3. Index (`index.ts`)

Main entry point that exports all services.

```typescript
import {
  portfolioDataProvider,
  executeFunctionTool,
  functionTools,
} from './services/voice-agent';
```

## Testing

Run the test script to verify all functionality:

```bash
npx tsx services/voice-agent/test-portfolio-data.ts
```

This will test:
- All portfolio data provider methods
- All function tools
- Data formatting and filtering
- Search functionality

## Integration with Voice Agent

These services will be used by the agent worker (Task 4) to:

1. Load portfolio data at startup
2. Provide function tools to the LLM
3. Execute function calls when the LLM needs specific information
4. Format responses in a conversational manner

**Example Agent Integration:**

```typescript
import { portfolioDataProvider, functionTools, executeFunctionTool } from './services/voice-agent';

// Configure agent with function tools
const agent = new VoiceAgent({
  instructions: `You are a helpful assistant for ${portfolioDataProvider.getPersonalInfo()}`,
  tools: functionTools,
  onFunctionCall: (name, args) => {
    return executeFunctionTool(name, args);
  },
});
```

## Data Source

All data is loaded from `config/portfolio.ts`, which contains:
- Personal information
- Work experience
- Projects
- Skills
- Education
- Contact information

To update the voice agent's knowledge, simply update the portfolio configuration file. No code changes are needed.

## Requirements Satisfied

This implementation satisfies the following requirements from the spec:

- **Requirement 2.1-2.5**: Function tools for experience, projects, skills, education, and contact info
- **Requirement 8.1**: Load portfolio data from configuration file
- **Requirement 8.3**: Access structured data about portfolio content
- **Requirement 8.5**: Provide accurate information matching the website

## Next Steps

The next task (Task 4) will build the agent worker service that uses these tools to power the voice agent conversations.
