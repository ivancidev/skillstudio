<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

<!-- BEGIN:skillstudio-quality-rules -->
# Quality & Architecture Rules for SkillStudio

## 🛠️ Stack & Architecture
- **Framework**: Next.js 16 (App Router)
- **Runtime APIs**: Dynamic APIs like `cookies()`, `headers()`, and Page component parameters (`params`, `searchParams`) are asynchronous and must be awaited or resolved via React `use()` hook.
- **Language**: Strict TypeScript. No `any` type casts unless absolutely required by compiler limitations (must be documented in comments).
- **Package Manager**: Bun (`bun add`). Do not use `npm` or `yarn`.
- **Database & Auth**: Supabase via `lib/supabase/client.ts` and `lib/supabase/server.ts` with local mock fallback configurations.

## 🎨 Design System & Styling (Strict Enforcement)
- **Page Canvas Background**: `#F8FAFC` (Off-white, never pure white).
- **Signature Cards Background**: `#0F172A` (Slate 900) with rounded corners (`14px`) and a subtle Indigo grid background (`#6366F1` at 6% opacity, size `24px 24px`).
- **Aesthetic Accents**: `#6366F1` (Indigo) as the single visual accent (badges, borders, links). No CSS gradients allowed.
- **Success Indicators**: `#22C55E` (Success green) is strictly reserved for positive results or ready-to-use indicators, never decorative.
- **Typography Scale**:
  - Headings / Titles: `Space Grotesk`, weight 700/600, tracking `-0.02em`, size `36px` / `22px`
  - Body Text: `Inter`, weight 400, line-height `1.6`, size `15px`
  - Code / Metadata / Statuses: `JetBrains Mono`, size `13px` / `11px` uppercase tracking-wide
- **Logo Mark**: 36x36 container in `#0F172A` with a 2x2 grid containing 2 Indigo and 2 semi-transparent Slate squares.

## 🤖 Agent Flow & UI States
- **State Flow**: The AI SDK version 5+ uses a transport-based `useChat` hook, which does not manage input fields internally. Implement local React `useState` hooks for input data and send prompt inputs using `sendMessage({ role: 'user', content: input })`.
- **Client Security**: API keys must be kept locally in browser `localStorage` under `ss_api_key_{provider}` and sent inside the request header `'x-api-key'`. They must never be written to any database or the Next.js server logs.
- **ZIP Export**: Downloadable skill bundles (.skill.zip) are packaged server-side inside `app/api/export/route.ts` using `jszip` and return binary response streams.

## 🧪 Verification & Release
- **Local Testing**: Always run `bun run build` after modifying any code to ensure clean TypeScript compilation, Next.js build validation, and linting success before closing task turns.
<!-- END:skillstudio-quality-rules -->

