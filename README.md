# Next.js Template

A modern, production-ready Next.js template featuring the latest technologies and best practices.

## Features

- **Next.js 16** — App Router with React Server Components
- **React 19** — Latest React features and improvements
- **TypeScript** — Full type safety with strict configuration
- **Tailwind CSS 4** — Utility-first styling with CSS variables
- **HeroUI v3** — Beautiful, accessible UI components
- **Zustand** — Lightweight state management with persistence
- **Dark Mode** — `next-themes` with `localStorage` persistence, system preference, and FOUC prevention
- **Biome** — Fast linting and code formatting
- **Mobile-first** — Fully responsive layout
- **Path Aliases** — Clean per-file imports with `@components/*`, `@config/*`, `@layout/*`, `@stores/*`, `@utils/*`
- **Site config** — Brand, nav, and socials centralized in `app/config/site.ts`
- **Built-in UX pages** — `error.tsx` boundary, `loading.tsx` skeletons, `not-found.tsx` 404
- **Utility hooks** — `useDebounce`, `useDebouncedCallback`, `useDebounceState`, `useMediaQuery`, `useBreakpoint`
- **Reduced-motion aware** — `prefers-reduced-motion` handled globally in `globals.css`
- **Production-ready** — Multi-stage `Dockerfile` with `output: "standalone"`, GitHub Actions CI/CD, 6 security headers, AVIF/WebP images (with strict CSP), long-term static caching
- **Agent-ready** — `AGENTS.md`, `SKILLS.md`, and a `/skills.md` route for dynamic agent discovery

## Getting Started

### Prerequisites

- Node.js 24+
- pnpm 10+

### Clone and Setup

```bash
git clone https://github.com/philogicae/nextjs-template.git my-project
cd my-project
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

- `pnpm dev` — Start development server with Turbo
- `pnpm build` — Build for production
- `pnpm start` — Start production server
- `pnpm lint` — Run Biome linter and formatter (auto-fix)
- `pnpm upgrade` — Update all dependencies
- `pnpm clean` — Clean build artifacts and reinstall
- `pnpm repomix` — Generate codebase summary for AI agents (markdown)

## Project Structure

```
app/
├── api/                   # API routes
│   ├── hello/
│   │   └── route.ts       # (demo) Example GET/POST endpoint
│   └── skills/            # Empty stub reserved for an agent-facing API
├── skills.md/
│   └── route.ts           # Serves SKILLS.md as raw text (cached 1h)
├── components/            # Reusable UI components
│   ├── Container.tsx      # Page width wrapper
│   ├── FeatureCard.tsx    # (demo) Landing page feature card
│   ├── Skeleton.tsx       # Themed pulse placeholder
│   ├── StatusBadge.tsx    # (demo) Status indicator with colored dot
│   └── ThemeToggle.tsx    # Dark/light theme switch (uses next-themes)
├── config/                # Site-wide config (single source of truth)
│   └── site.ts            # Name, description, nav, socials, theme colors
├── layout/                # Layout components (no barrel)
│   ├── Navbar.tsx         # Responsive navbar with mobile menu
│   └── Footer.tsx         # Site footer with links
├── playground/            # (demo) Interactive API + state playground
│   └── page.tsx
├── stores/                # Zustand state stores
│   └── counter.ts         # (demo) counter store
├── utils/                 # Utility functions
│   ├── tw.ts              # cn() class merger
│   ├── debounce.ts        # Debounce hooks
│   └── media-query.ts     # Responsive hooks
├── globals.css            # Global styles and design tokens
├── layout.tsx             # Root layout (Navbar + main + Footer)
├── providers.tsx          # Client providers (next-themes)
├── page.tsx               # Landing page
├── error.tsx              # Error boundary
├── loading.tsx            # Loading UI
└── not-found.tsx          # 404 page

public/                    # Static assets
├── images/
│   ├── logo.gif
│   ├── apple-touch-icon.png
│   ├── 192x192.png
│   └── 512x512.png
├── favicon.ico
├── manifest.json
└── robots.txt

SKILLS.md                  # Agent Skills definition (served at /skills.md)
AGENTS.md                  # In-repo agent conventions
CHECKLIST.md               # Tickable bootstrap checklist (delete once done)
```

## AI Agent Configuration

This project includes AI agent configuration files:

- **AGENTS.md** — conventions for an agent working inside an already-cloned repo: customization checklist, code style, and architecture guidance. Meant to be kept in sync as the project evolves.
- **SKILLS.md** — bootstrap skill for an agent starting a **new** project from this template: clone, folder tour, customize / delete checklist, and the conventions it needs to do that correctly. Once the project ships, this file should be rewritten to describe the new app (routes, API, env) — or deleted if there is no agent-facing surface.
- **CHECKLIST.md** — structured, tickable bootstrap checklist that mirrors the customization / delete / sanity-check steps from `AGENTS.md` and `SKILLS.md`. Agents should tick boxes as they go so the next session sees exactly what is left. Delete it once every box is ticked.

Usable with (and beyond): [Claude Code](https://claude.ai/code), [Cursor](https://www.cursor.com/), [Windsurf](https://windsurf.com/), [OpenClaw](https://openclaw.ai/), [Hermes](https://hermes-agent.nousresearch.com/)

### AGENTS.md

Standardized instructions following the [AGENTS.md standard](https://agents.md/):

- Project overview and architecture
- Code style and conventions (TypeScript, naming)
- Component patterns (Client vs Server)
- Development workflows and commands

### SKILLS.md

Agent Skills definition following the [Agent Skills specification](https://agentskills.io/specification):

- Skill metadata and compatibility
- Bootstrap workflow (clone, folder tour, customize / delete checklist)
- Template conventions reference (stack, code style, common tasks, theme, utilities)
- Template for rewriting `SKILLS.md` after customization so agents can interact with the shipped app

The skills definition is also served at `/skills.md` as raw text for dynamic discovery by AI agents.

### Live Demo

Visit the [live demo](https://fractal-nextjs.vercel.app/) to see the template in action, including the AI Agent Integration section with tabs for AGENTS.md, SKILLS.md, and Repomix documentation.

## Deployment

### Docker

A multi-stage `Dockerfile` (`base` → `deps` → `builder` → slim `runner`) and `compose.yaml` are included. The `runner` stage serves the Next.js standalone bundle (`node server.js`) as a non-root user with a `HEALTHCHECK`. Base image: [`platformatic/node-caged:25-alpine`](https://hub.docker.com/r/platformatic/node-caged) — Node.js with V8 pointer compression enabled (~50% memory reduction for pointer-heavy workloads).

```bash
docker compose up --build       # Build and run on :3000
```

`compose.yaml` sets `NODE_ENV=production` and optionally loads a local `.env` file. Project name, container name, image name/tag, and host port are all configurable via `.env` (`DOCKER_PROJECT_NAME`, `DOCKER_CONTAINER_NAME`, `DOCKER_IMAGE_NAME`, `DOCKER_IMAGE_TAG`, `DOCKER_PORT`) — defaults fall back to `nextjs-template` / `3000`.

### GitHub Actions

`.github/workflows/ci-cd.yml` ships ready to use — no edits needed.

### Production hardening (built-in, via `next.config.mjs`)

- **Security headers** — HSTS, X-DNS-Prefetch-Control, X-Content-Type-Options, X-Frame-Options, Referrer-Policy, Permissions-Policy. No page-level CSP is set — add one if your app needs it.
- **Image optimization** — AVIF/WebP formats, 24h minimum cache TTL, remote patterns over HTTPS, strict `contentSecurityPolicy` on image responses to neutralize SVG XSS.
- **Standalone output** — `output: "standalone"` in `next.config.mjs` produces a minimal production server bundle for slim Docker images.
- **Long-term caching** — 1 week for `/images`, `/fonts`, and `/_next/static` (Next.js content-hashed URLs make this safe).
- **Package import optimization** — `@heroui/react`, `@heroui/styles` tree-shaken via `experimental.optimizePackageImports`.
- **CSS optimization** — `experimental.optimizeCss` enabled.
- **Compression** — enabled by default; `x-powered-by` header stripped.

## Customization

### Design Tokens

Edit `app/globals.css` to customize colors, spacing, and layout vars. It ships with a violet + cyan duotone (violet primary, cyan secondary — pairs beautifully for the hero gradient):

```css
:root {
  /* Light — soft violet-tinted paper */
  --color-bg-primary: #fbfaff;
  --color-text-accent: #7c3aed; /* violet-600 */
  --color-accent-cyan: #06b6d4; /* cyan-500  */
  /* ... */
}
.dark {
  /* Dark — near-black with a faint violet hue */
  --color-bg-primary: #07060d;
  --color-text-accent: #a78bfa; /* violet-400 */
  --color-accent-cyan: #22d3ee; /* cyan-400  */
}
```

Radius, shadow, and transitions are driven by Tailwind utilities (`rounded-*`, `shadow-*`, `transition-*`) rather than bespoke CSS vars.

### Path Aliases

Configured in `tsconfig.json`:

```json
{
  "paths": {
    "@components/*": ["./app/components/*"],
    "@config/*": ["./app/config/*"],
    "@layout/*": ["./app/layout/*"],
    "@stores/*": ["./app/stores/*"],
    "@utils/*": ["./app/utils/*"]
  }
}
```

> No barrel exports: each file imports exactly what it needs (e.g. `@components/Container`, `@stores/counter`). `@layout` is intentionally **not** a barrel because it would conflict with `app/layout.tsx`.

### Reusable Components

```tsx
import { Container } from "@components/Container";
import { FeatureCard } from "@components/FeatureCard";
import { Skeleton } from "@components/Skeleton";
import { StatusBadge } from "@components/StatusBadge";
import { ThemeToggle } from "@components/ThemeToggle";

<Container size="md">
  <FeatureCard icon="▲" name="Next.js 16" description="App Router" />
  <StatusBadge status="success" />
  <Skeleton className="h-6 w-32" />
</Container>;
```

### Site Config

Edit `app/config/site.ts` — it is the **single source of truth** for brand name, description, keywords, URL, theme colors, nav links, and socials. `app/layout.tsx` metadata, `Navbar`, `Footer`, `manifest.json`-facing values, and landing-page CTAs all derive from it.

```ts
import { siteConfig } from "@config/site";

siteConfig.name;
siteConfig.url;
siteConfig.nav;
siteConfig.social;
```

### Utility Hooks

```ts
import { cn } from "@utils/tw";
import { useMediaQuery, useBreakpoint } from "@utils/media-query";
import {
  useDebounce,
  useDebouncedCallback,
  useDebounceState,
} from "@utils/debounce";
```

- `cn(...)` — Tailwind-aware class merge (clsx + tailwind-merge).
- `useMediaQuery("(max-width: 768px)")`, `useBreakpoint("md")` — `sm | md | lg | xl | 2xl`.
- `useDebounce(value, ms)` / `useDebouncedCallback(fn, ms)` / `useDebounceState(initial, ms)`.

### HeroUI Button Variants

HeroUI v3 Button variants: `primary` (default), `secondary`, `tertiary`, `outline`, `ghost`, `danger`, `danger-soft`.

Card parts: `CardHeader`, `CardContent`, `CardFooter` (no `CardBody`). Button loading prop is `isPending` (not `isLoading`).

## API Playground (demo)

Visit `/playground` to test the API endpoints and Zustand state management:

- GET/POST requests to `/api/hello` with live status badges
- GET request to `/skills.md` (returns raw SKILLS.md content)
- Zustand counter demo (increment, decrement, +5, reset, undo)

> The `/playground` page, `/api/hello` route, the counter store, and `FeatureCard` / `StatusBadge` components are included as examples only. When starting a new project from this template, remove them — see `SKILLS.md` and `AGENTS.md` for the full customization checklist.

## License

MIT License
