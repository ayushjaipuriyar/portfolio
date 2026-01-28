<!-- .github/copilot-instructions.md -->

# Copilot instructions — portfolio

## Big picture

- Next.js App Router site in `app/`; most page content is config-driven from `config/portfolio.ts`.
- Voice assistant is LiveKit-based:
  - UI widget: `components/voice-agent/voice-assistant.tsx` (mounted in `app/layout.tsx`).
  - Client connection flow: `hooks/useRoom.ts` fetches tokens from `app/api/connection-details/route.ts`.
  - Long-running AI worker is separate: `agent-worker/` (Python, LiveKit Agents) with entrypoint `agent-worker/src/agent.py`.

## Where to edit (high leverage)

- Update personal info/skills/projects/SEO: `config/portfolio.ts` (single source of truth for the website UI).
- Home page data flow: `app/page.tsx` calls `lib/github.ts` to fetch pinned GitHub repos; it returns `[]` if `GITHUB_TOKEN` is missing and the UI falls back to config projects.
- Global metadata + providers + VoiceAssistant mount: `app/layout.tsx`.

## Dev workflows

- This repo is pnpm-only (`package.json` has `preinstall: only-allow pnpm`):
  - Install: `pnpm install`
  - Dev: `pnpm dev`  |  Build: `pnpm build`  |  Start: `pnpm start`
  - Lint/format: `pnpm lint`, `pnpm format`
  - GitHub projects script: `pnpm fetch-projects`

## Voice assistant local dev (2 terminals)

- Website: run `pnpm dev` with `.env.local` containing `LIVEKIT_API_KEY`, `LIVEKIT_API_SECRET`, `LIVEKIT_URL`.
- Worker: in `agent-worker/`, prefer `uv sync`, then:
  - One-time: `uv run python src/agent.py download-files`
  - Run: `uv run python src/agent.py dev`

## Conventions / patterns

- Server vs client: keep secrets in server routes/components; client components are explicitly marked `'use client'`.
- Imports: prefer `@/` alias (see `tsconfig.json` paths).
- UI: reuse primitives in `components/ui/*` and LiveKit UI pieces under `components/app/*` + `components/livekit/*`.
- Assets: prefer `public/images/...` + Next `Image`; update `next.config.js` if adding new remote image domains.

## Key env vars

- Web: `LIVEKIT_API_KEY`, `LIVEKIT_API_SECRET`, `LIVEKIT_URL`, optional `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_GOOGLE_ANALYTICS`, `NEXT_PUBLIC_GTM_ID`, and GitHub fetch vars (`GITHUB_TOKEN`, `GITHUB_USERNAME`, `PROJECTS_LIMIT`).
- Worker: see `agent-worker/README.md` for required LiveKit + model provider keys (e.g., `GEMINI_API_KEY`).
