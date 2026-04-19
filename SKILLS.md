---
name: nextjs-template-bootstrap
description: Bootstrap skill for starting a new project from the philogicae/nextjs-template. Use when a user asks to scaffold a new webapp. Covers cloning, the folder layout, what must be customized/deleted, and the template's conventions.
license: MIT
compatibility: Node.js 24+, pnpm 10+
metadata:
  author: philogicae
  version: "1.1.0"
  template-type: nextjs
  source: https://github.com/philogicae/nextjs-template
  live-demo: https://fractal-nextjs.vercel.app/
  stack:
    - Next.js 16 (App Router, Turbopack)
    - React 19
    - TypeScript (strict)
    - Tailwind CSS v4 (CSS-first)
    - HeroUI v3
    - Zustand (+ persist)
    - Biome
  features:
    - App Router + React Server Components
    - Dark mode via `next-themes` with FOUC prevention (theme-aware html background)
    - Mobile-first responsive layout
    - Error boundary, loading (Skeleton-based) and 404 pages
    - Debounce hooks, `useSyncExternalStore`-backed media-query hook
    - Security headers, AVIF/WebP image optimization with strict SVG CSP
    - Site-wide config at `app/config/site.ts` as single source of truth
    - Multi-stage Dockerfile with Next.js standalone output
---

# Next.js Template — Bootstrap Skill

> **Audience.** AI agents spinning up a **new project** from `philogicae/nextjs-template`. This document is self-contained: it covers both the bootstrap steps and the conventions the agent needs to customize the repo correctly.

## 1. Clone and install

```bash
git clone https://github.com/philogicae/nextjs-template.git <project-name>
cd <project-name>
rm -rf .git && git init
pnpm install
pnpm dev           # http://localhost:3000
```

Requirements: **Node.js 24+**, **pnpm 10+**, modern browser.

## 2. Repository tour

```
<project-name>/
├── app/
│   ├── api/
│   │   ├── hello/         # DEMO endpoint — delete or replace
│   │   └── skills/        # Empty stub for an agent-facing API — keep or delete
│   ├── skills.md/         # Route that serves SKILLS.md raw — KEEP
│   ├── components/        # Shared UI (no barrel — import per file)
│   │   ├── Container.tsx        # Keep (generic width wrapper)
│   │   ├── FeatureCard.tsx      # DEMO — delete if unused
│   │   ├── Skeleton.tsx         # Keep (themed pulse placeholder)
│   │   ├── StatusBadge.tsx      # DEMO — delete if unused
│   │   └── ThemeToggle.tsx      # Keep (uses next-themes)
│   ├── config/            # Site-wide config (single source of truth)
│   │   └── site.ts              # Name, description, nav, socials, theme colors
│   ├── layout/            # Navbar.tsx, Footer.tsx — driven by `@config/site`
│   ├── stores/            # Zustand (no barrel — import per file)
│   │   └── counter.ts           # DEMO — delete
│   ├── utils/             # cn(), debounce, media-query — Keep
│   ├── playground/        # DEMO page — DELETE
│   ├── globals.css        # Design tokens — CUSTOMIZE
│   ├── layout.tsx         # Root layout + metadata — CUSTOMIZE
│   ├── providers.tsx      # Client providers (next-themes) — Keep
│   ├── page.tsx           # Landing page — REPLACE
│   ├── error.tsx / loading.tsx / not-found.tsx   # Keep, restyle
├── public/                # favicon, logo, manifest, robots — REPLACE
├── .env.example           # Customize variables
├── next.config.mjs        # Security headers, image formats — review
├── biome.json             # Lint/format config
├── package.json           # name/description/repo — CUSTOMIZE
├── Dockerfile / compose.yaml     # Ready to use — rename `nextjs-template` only
├── README.md              # REWRITE for the new project
├── AGENTS.md              # In-repo agent conventions — keep in sync as you modify the project
├── SKILLS.md              # REWRITE to describe the new app (see §5) or delete if the app needs no agent surface
└── CHECKLIST.md           # Tickable bootstrap checklist — delete once every box is ticked
```

**Path aliases** (`tsconfig.json`):

```json
"@components/*": ["./app/components/*"],
"@config/*":     ["./app/config/*"],
"@layout/*":     ["./app/layout/*"],
"@stores/*":     ["./app/stores/*"],
"@utils/*":      ["./app/utils/*"]
```

> No barrel exports. Every import targets a specific file (`@components/Container`, `@stores/counter`, `@layout/Navbar`, ...).

## 3. Customization checklist

> **Track progress in `CHECKLIST.md`** at the repo root — it lists every item below as a tickable checkbox, plus sanity checks. Use that file as the source of truth while working; the summary here is for orientation only.

Work through these in order. Do **not** ship any of the template's demo branding.

**Identity & metadata** — most of this is now one file.

- `app/config/site.ts` → **single source of truth**. Set `name`, `shortName`, `description`, `keywords`, `url`, `license`, `themeColor.{light,dark}`, `nav` (entries rendered in `Navbar`), and `social` (entries rendered in `Footer`). `app/layout.tsx` metadata, `Navbar` branding, `Footer` socials, and landing-page CTAs all derive from it.
- `package.json` → `name`, `description`, `repository.url`, `homepage`, `version` (reset to `0.1.0`).
- `public/manifest.json` (name, short_name, description, colors, icons) and `public/robots.txt` — keep these aligned with `siteConfig` values.
- `public/favicon.ico` and `public/images/{logo.gif, apple-touch-icon.png, 192x192.png, 512x512.png}` — the `public/images/` folder ships empty in the template; you must add these assets (they are referenced by `app/layout.tsx`, `app/layout/Navbar.tsx`, and `public/manifest.json`).
- `LICENSE` — update copyright holder or replace.

**Layout / chrome**

- Editing `siteConfig.nav` drives `Navbar` links; editing `siteConfig.social` drives `Footer` links. The logo image path lives in `app/layout/Navbar.tsx` (`/images/logo.gif`).

**Landing page**

- `app/page.tsx` → replace hero copy, CTA buttons, and the `features` array with the new product's content. `BackgroundDecor` and `AnimatedSection` helpers can be kept or deleted.

**Design tokens**

- `app/globals.css` → adjust `--color-*`, `--space-*`, `--navbar-height*` to the new brand.

**Environment**

- `.env.example` → prune placeholders, add real variables.

**Docker / CI**

- `Dockerfile` is a multi-stage build (`base` → `deps` → `builder` → slim `runner`) that serves the Next.js standalone bundle (`node server.js`) as a non-root user with a `HEALTHCHECK`; `compose.yaml` is production-ready. Only rename the hardcoded `nextjs-template` service/image name. Base image is [`platformatic/node-caged:25-alpine`](https://hub.docker.com/r/platformatic/node-caged) — Node.js with V8 pointer compression enabled (~50% memory reduction for pointer-heavy workloads).
- `.github/workflows/ci-cd.yml` is ready to use out of the box; no changes needed.

## 4. Delete demo-only code

These files exist only to showcase the template. Remove them before writing product code, unless the user explicitly wants them kept:

- `app/playground/` — full directory.
- `app/api/hello/` — replace with real endpoints or delete.
- `app/stores/counter.ts`.
- `app/components/FeatureCard.tsx`, `app/components/StatusBadge.tsx` (only if not reused). `Skeleton.tsx` is not demo — keep it.
- The "Try the Playground" / "Read SKILLS.md" / "View on GitHub" / "Deploy to Vercel" buttons in `app/page.tsx`.
- The `/skills.md` and `/playground` entries in `navLinks` (`app/layout/Navbar.tsx`).

Keep the `app/skills.md/route.ts` handler — it is the delivery mechanism for the rewritten `SKILLS.md` (see §5). The empty `app/api/skills/` directory is reserved for an agent-facing API: keep it if you plan to expose one, delete it otherwise.

## 5. Rewrite `SKILLS.md` for the new project (default) — or delete it

**Default path.** After customization, **this file must be rewritten** so agents can interact with the shipped application through `/skills.md`. Its new purpose is to describe the app — its routes, API, auth, and how an agent should consume it — not how to install the template.

**Opt-out.** If the project has no agent-facing surface and the user does not want one, delete instead:

- this `SKILLS.md` file,
- the `app/skills.md/` route handler,
- the `/skills.md` entry in `navLinks` (`app/layout/Navbar.tsx`),
- any landing-page button that links to `/skills.md` in `app/page.tsx`.

Suggested structure when rewriting:

```markdown
---
name: <project-name>
description: <what the app does, who it is for>
---

# <Project name>

## Overview

Short description of the product and its primary users.

## Routes

- `/` — <purpose>
- `/<route>` — <purpose>

## API

- `GET /api/<endpoint>` — params, response shape, auth
- `POST /api/<endpoint>` — body, response shape

## Data model / state

- Zustand stores and what they own
- External data sources, DB, third-party APIs

## Environment variables

List every required variable with a one-line description.

## How an agent should interact with the app

- Preferred endpoints for programmatic use
- Auth flow
- Rate limits, error shapes
```

**`AGENTS.md` must be kept in sync throughout customization** — not as a one-shot pass at the end. As soon as you remove the playground / counter store / demo components, drop them from the "Demo code to remove" list; as soon as you add new routes, stores, or env variables, record them in the relevant sections so the next agent reading `AGENTS.md` sees an accurate picture of the project.

## 6. Sanity checks before handing off

```bash
pnpm lint        # Biome auto-fix
pnpm build       # Production build must succeed
```

Grep for any leftover template branding:

```bash
rg -i "next\.js template|philogicae|fractal-nextjs|playground|counter"
```

Every match should be intentional.

---

# Reference — template conventions

Quick reference for the conventions baked into the template, needed while customizing.

## Tech stack details

**Framework**

- Next.js 16 (App Router, Turbopack) — `next dev --turbo`, `next build --turbo`
- React 19 — Server Components by default
- TypeScript strict mode — explicit return types on exports, `interface` for objects, `type` for unions

**Styling**

- Tailwind CSS v4 via `@tailwindcss/postcss` (CSS-first config, no `tailwind.config`)
- CSS variables in `app/globals.css` consumed as `bg-(--color-bg-surface)`, etc.
- `cn()` helper from `@utils/tw` for conditional class merging (wraps `clsx` + `tailwind-merge`)

**UI — HeroUI v3**

- Button variants: `primary` (default), `secondary`, `tertiary`, `outline`, `ghost`, `danger`, `danger-soft`
- Button loading prop: `isPending` (not `isLoading`)
- Card parts: `CardHeader`, `CardContent`, `CardFooter` (no `CardBody`)

**State — Zustand**

- Global state in `app/stores/`, imported per file (e.g. `@stores/counter`)
- `persist` middleware available from `zustand/middleware` when you need `localStorage` sync
- Always subscribe with a **selector** to avoid unnecessary re-renders

**Dev tooling**

- Biome 2 for lint + format (`pnpm lint` runs `biome check --write --unsafe` over the whole repo)
- pnpm 10 with a committed `pnpm-lock.yaml`

## Code conventions

**File placement**

- Pages: `app/<route>/page.tsx`
- API routes: `app/api/<endpoint>/route.ts` — export `GET` / `POST` / `PUT` / `DELETE`
- Shared components: `app/components/` — import per file (e.g. `@components/Container`)
- Layout parts: `app/layout/`
- Config: `app/config/site.ts` (site-wide constants)
- Zustand stores: `app/stores/` — import per file (e.g. `@stores/counter`)
- Utilities: `app/utils/`

**Naming**

- Components: PascalCase (`Navbar.tsx`)
- Hooks: camelCase with `use` prefix
- Utilities / stores: camelCase

**Server vs Client components**

- Default to Server Components.
- Add `"use client"` only when a file needs hooks, browser APIs, or event handlers.
- Keep the client boundary small — extract the interactive part into its own component.

**Imports**

```ts
import { Container } from "@components/Container";
import { ThemeToggle } from "@components/ThemeToggle";
import { siteConfig } from "@config/site";
import { NavBar } from "@layout/Navbar";
import { useCounterStore } from "@stores/counter";
import { cn } from "@utils/tw";
```

## Common tasks

**Add a page**

1. Create `app/<route>/page.tsx`.
2. Add an entry to `navLinks` in `app/layout/Navbar.tsx` if it should appear in the header.

**Add an API route**

```ts
// app/api/<endpoint>/route.ts
export async function GET(): Promise<Response> {
  return Response.json({ ok: true });
}

export async function POST(request: Request): Promise<Response> {
  const body = await request.json();
  return Response.json({ received: body });
}
```

**Create a Zustand store**

```ts
// app/stores/<name>.ts
import { create } from "zustand";

interface State {
  value: string;
  setValue: (v: string) => void;
}

export const useMyStore = create<State>()((set) => ({
  value: "",
  setValue: (v) => set({ value: v }),
}));
```

**Consume a store (with selectors)**

```ts
import { useCounterStore } from "@stores/counter";

// Good — re-renders only when `count` changes
const count = useCounterStore((s) => s.count);

// Bad — re-renders on any state change
const { count } = useCounterStore();
```

**Client component example**

```tsx
"use client";
import { Container } from "@components/Container";
import { Button } from "@heroui/react";
import { useState } from "react";

export function Example(): React.ReactElement {
  const [value, setValue] = useState("");
  return (
    <Container size="md">
      <Button variant="outline" onPress={() => setValue("x")}>
        Click
      </Button>
    </Container>
  );
}
```

## Theme system

CSS variables (`app/globals.css`):

Palette is a violet + cyan duotone (violet primary, cyan secondary). Tokens:

- `--color-bg-primary`, `--color-bg-secondary`, `--color-bg-surface` — backgrounds
- `--color-text-primary`, `--color-text-secondary`, `--color-text-muted`, `--color-text-accent` — text (accent is violet)
- `--color-accent-cyan`, `--color-accent-cyan-hover` — cyan companion accent
- `--color-border-default`, `--color-border-subtle` — borders
- `--space-xs` … `--space-2xl` — spacing
- `--navbar-height`, `--navbar-height-mobile` — layout

Radius, shadow, and transitions are handled via Tailwind utilities (`rounded-*`, `shadow-*`, `transition-*`), not CSS vars. Dark mode overrides live under `.dark { … }` in the same file. One animation keyframe (`fade-in-up`) and `prefers-reduced-motion` handling are defined there too — add more as you need them.

Usage:

```tsx
<div className="bg-(--color-bg-primary) text-(--color-text-primary)">
  <Button className="bg-(--color-accent-cyan)">Click</Button>
</div>
```

Dark mode:

- Powered by [`next-themes`](https://github.com/pacocoursey/next-themes) via `app/providers.tsx` (`attribute="class"`, `defaultTheme="system"`, `enableSystem`, `disableTransitionOnChange`).
- `ThemeProvider` injects its own pre-hydration script, toggles the `dark` class on `<html>`, and persists the choice to `localStorage` (`theme` key).
- `ThemeToggle` (`app/components/ThemeToggle.tsx`) reads `resolvedTheme` and calls `setTheme("light"|"dark")`.
- `html` / `html.dark` background colors in `globals.css` match the first paint so neither mode flashes.
- Falls back to `prefers-color-scheme` when no preference is stored.

## Utilities

```ts
import { cn } from "@utils/tw";
import { useMediaQuery, useBreakpoint } from "@utils/media-query";
import {
  useDebounce,
  useDebouncedCallback,
  useDebounceState,
} from "@utils/debounce";
```

- `cn(...classes)` — Tailwind-aware class merge.
- `useMediaQuery("(max-width: 768px)")`, `useBreakpoint("md")` — `sm | md | lg | xl | 2xl`.
- `useDebounce(value, ms)` — debounced value.
- `useDebouncedCallback(fn, ms)` — debounced callback.
- `useDebounceState(initial, ms)` — returns `[value, debouncedValue, setValue]`.

## Performance notes

- Default to Server Components; keep `"use client"` boundaries small.
- Reach for `memo()` / `useCallback` / `useMemo` only when profiling shows a real re-render cost. Do not wrap zero-prop or stable-prop components in `memo()`.
- Always select Zustand state with a selector.
- `next.config.mjs` enables `output: "standalone"`, `optimizePackageImports` (for `@heroui/react`, `@heroui/styles`), AVIF/WebP images with a strict `contentSecurityPolicy` on image responses, `optimizeCss`, compression, long-term caching for `/images`, `/fonts`, `/_next/static`, and 6 security headers (HSTS, X-DNS-Prefetch-Control, X-Content-Type-Options, X-Frame-Options, Referrer-Policy, Permissions-Policy). No page-level CSP is set — add one if your app needs it.

## Scripts

```bash
pnpm dev      # Dev server, Turbopack, 0.0.0.0:3000
pnpm build    # Production build (Turbopack)
pnpm start    # Production server
pnpm lint     # Biome check + auto-fix
pnpm upgrade  # pnpm update && pnpm prune
pnpm clean    # rimraf .next out node_modules && pnpm install
pnpm repomix  # Markdown snapshot of the codebase for agents
```

## References

- [Next.js](https://nextjs.org/docs)
- [HeroUI](https://www.heroui.com/docs)
- [Tailwind CSS v4](https://tailwindcss.com/docs)
- [Zustand](https://zustand.docs.pmnd.rs/)
- [Biome](https://biomejs.dev/)
- [AGENTS.md standard](https://agents.md/)
- [Agent Skills spec](https://agentskills.io/specification)
