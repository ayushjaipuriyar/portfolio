# Minimalistic Portfolio

A modern, minimalistic portfolio website built with Next.js 14, TypeScript, and Tailwind CSS.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v3
- **UI Components**: shadcn/ui (to be added)
- **Animations**: Framer Motion (to be added)

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the portfolio in your browser.

### Build

```bash
npm run build
```

### Production

```bash
npm start
```

## Project Structure

```
portfolio/
├── app/
│   ├── layout.tsx       # Root layout
│   ├── page.tsx         # Main portfolio page
│   └── globals.css      # Global styles with CSS variables
├── components/          # React components (to be added)
├── public/             # Static assets
├── tailwind.config.js  # Tailwind configuration
├── tsconfig.json       # TypeScript configuration
└── next.config.js      # Next.js configuration
```

## Features

- ✅ Next.js 14 with App Router
- ✅ TypeScript support
- ✅ Tailwind CSS with custom theme
- ✅ Dark/Light mode CSS variables
- ✅ Image optimization configured
- ✅ Responsive design ready
- ✅ **Voice AI Assistant** - LiveKit-powered conversational agent

## Voice Assistant

This portfolio includes an integrated voice AI assistant powered by LiveKit Agents. The assistant can answer questions about experience, projects, skills, and provide contact information through natural voice conversations.

### Setting up the Voice Assistant

1. **Environment Variables**: Add LiveKit credentials to `.env.local`:
   ```bash
   LIVEKIT_API_KEY=your_api_key
   LIVEKIT_API_SECRET=your_api_secret
   LIVEKIT_URL=wss://your-project.livekit.cloud
   ```

2. **Start the Agent Worker**:
   ```bash
   cd agent-worker
   pip install -r requirements.txt  # or uv sync
   python src/agent.py dev
   ```

3. **Start the Website**:
   ```bash
   npm run dev
   ```

4. **Test**: Click the microphone button and start a conversation!

### Voice Agent Features

- Real-time speech-to-text and text-to-speech
- Contextual responses about portfolio content
- Function tools for retrieving specific information
- Multi-turn conversations with memory
- Mobile-responsive voice interface

## License

MIT
