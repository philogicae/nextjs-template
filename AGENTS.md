# AGENTS.md

> **Audience.** AI agents working inside a repository **already cloned** from `philogicae/nextjs-template` who need to customize it into a real product. This document is self-contained.
>
> **Keep this file in sync while you work.** Every time you remove demo code, add a route/store/component, introduce an env variable, or change conventions, update the matching section of `AGENTS.md` in the same commit. The next agent reading it must see the current state of the project, not the template's baseline.
>
> **Track progress in `CHECKLIST.md`.** A structured, tickable bootstrap checklist lives at the repo root — it is the **only** source of truth for what has or hasn't been customized yet. This document deliberately does not duplicate that list; it covers conventions and patterns instead. When every box in `CHECKLIST.md` is ticked, delete it or replace it with a project-specific checklist.

## Requirements

- Node.js 24+
- pnpm 10+

## Stack

- **Framework**: Next.js 16 (App Router, Turbopack)
- **UI**: HeroUI v3
- **Styling**: Tailwind CSS v4 (CSS-first, via `@tailwindcss/postcss`)
- **State**: Zustand + `persist` middleware
- **Lint/format**: Biome 2
- **Package manager**: pnpm 10
- **i18n**: Provider-based (cookie + `Accept-Language`), no URL locale segment. Ships with `en` / `fr` / `es` / `ro`

## Customization checklist

**Do not duplicate this list here.** The full, tickable checklist lives in
[`CHECKLIST.md`](./CHECKLIST.md) at the repo root — identity & metadata,
public assets, layout / chrome, landing page & design tokens,
internationalization, demo-code deletions, environment & infrastructure,
documentation, and sanity checks. Work top-to-bottom through that file
and tick boxes as you go; that is the single source of truth for what
remains to be customized in this clone.

This document covers the **conventions** an agent needs to carry out
those steps correctly (code style, i18n wiring, component patterns,
common tasks). When you need a progress tracker, switch to
`CHECKLIST.md`.

## Demo code to remove

These exist **only** to showcase the template:

- `app/playground/` — delete entirely
- `app/api/hello/` — delete or replace with real endpoints
- `app/stores/counter.ts`
- `app/components/FeatureCard.tsx` and `app/components/StatusBadge.tsx` if unused
- `/playground` entry in `siteConfig.nav` (`app/config/site.ts`); the `/skills.md` entry goes only if you also remove the agent surface (see the `SKILLS.md` section below)
- Landing-page buttons in `app/page.tsx` that point to the playground, SKILLS.md, the GitHub repo, or "Deploy to Vercel"

Keep unless you have a reason to drop them:

- `app/skills.md/route.ts` — serves `SKILLS.md` raw at `/skills.md`; useful for agent discovery
- `app/api/skills/` — empty stub reserved for an agent-facing API; keep if you expose one, delete otherwise
- `app/components/Container.tsx`, `Skeleton.tsx`, `ThemeToggle.tsx`
- `app/config/site.ts`
- `app/providers.tsx` (wraps children in `next-themes`'s `ThemeProvider`)
- `app/utils/{tw,debounce,media-query}.ts`
- `app/{error,loading,not-found}.tsx`
- `app/i18n/*` and `app/components/LanguageSwitcher.tsx` — the internationalization layer is core infrastructure. Drop a locale you don't want (see "Add a locale" above, in reverse) rather than ripping the whole system out.

**`SKILLS.md` — rewrite by default, or delete.** The default expectation is that you **rewrite `SKILLS.md`** so agents can interact with the shipped application through the `/skills.md` endpoint. Describe the new project's routes, API, auth, env variables, and how an agent should consume it — not how to install the template. Suggested frontmatter + sections:

```markdown
---
name: <project-name>
description: <what the app does, who it is for>
---

# <Project name>

## Overview

## Routes

## API

## Data model / state

## Environment variables

## How an agent should interact with the app
```

If the project has no agent-facing surface and the user does not want one, delete instead: `SKILLS.md`, `app/skills.md/` (route handler), the `/skills.md` entry in `siteConfig.nav` (`app/config/site.ts`), and any landing-page button that links to `/skills.md` in `app/page.tsx`.

## Project structure (template baseline)

```
app/
├── api/                  # Route handlers (GET/POST/PUT/DELETE)
├── skills.md/            # Serves SKILLS.md raw
├── components/           # Shared UI (no barrel — import per file)
├── config/               # Site-wide config (site.ts) — edit here, not in layout/page
├── i18n/                 # Internationalization (provider-based, no URL segment)
│   ├── config.ts         #   SINGLE REGISTRY: Locale, Dictionary, locales,
│   │                     #   localeMeta, hasLocale(), getDictionary() — all
│   │                     #   derived from the statically-imported dictionaries
│   ├── dictionaries/     #   en.json / fr.json / es.json / ro.json — each ships a top-level
│   │                     #   `meta: { flag, native }` used by the switcher
│   ├── get-locale.ts     #   Accept-Language matcher (zero-dep)
│   ├── server.ts         #   getCurrentLocale(), getCurrentDictionary()
│   ├── actions.ts        #   setLocaleAction Server Action (writes NEXT_LOCALE cookie)
│   └── LocaleProvider.tsx#   client context: useLocale(), useDict()
├── layout/               # Navbar.tsx (with LanguageSwitcher), Footer.tsx
├── stores/               # Zustand (no barrel — import per file)
├── utils/                # tw, debounce, media-query
├── globals.css           # Design tokens + CSS variables
├── layout.tsx            # Async root layout (reads locale, passes dict to providers)
├── providers.tsx         # Client providers (next-themes + LocaleProvider)
├── page.tsx              # Landing page
├── error.tsx loading.tsx not-found.tsx
public/                   # Static assets
.env.example  next.config.mjs  biome.json  tsconfig.json
Dockerfile  compose.yaml
SKILLS.md  AGENTS.md  README.md
```

Path aliases (`tsconfig.json`, with `noUncheckedIndexedAccess` + `noImplicitOverride` on):

```json
"@components/*": ["./app/components/*"],
"@config/*":     ["./app/config/*"],
"@i18n/*":       ["./app/i18n/*"],
"@layout/*":     ["./app/layout/*"],
"@stores/*":     ["./app/stores/*"],
"@utils/*":      ["./app/utils/*"]
```

> No barrel exports. Every import targets a specific file (`@components/Container`, `@stores/counter`, `@layout/Navbar`, ...). Keeps tree-shaking predictable and avoids circular-import traps.

## Code style

**TypeScript**

- Strict mode; explicit return types on exported functions/components.
- `interface` for object shapes, `type` for unions.
- `const` by default; never `var`.

**Naming**

- Components: PascalCase (`Navbar.tsx`)
- Hooks: camelCase with `use` prefix
- Utilities / stores: camelCase

**File placement**

- Pages: `app/<route>/page.tsx`
- API: `app/api/<endpoint>/route.ts` — export `GET`/`POST`/`PUT`/`DELETE`
- Components: `app/components/` — import per file (e.g. `@components/Container`)
- Layout parts: `app/layout/`
- Config: `app/config/site.ts` (site-wide constants)
- Stores: `app/stores/` — import per file (e.g. `@stores/counter`)
- Utilities: `app/utils/`

**Formatting**

- `pnpm lint` runs `biome check --write --unsafe` over the whole repo. Run it before finishing a task.

## Component patterns

**Server vs Client**

- Default to Server Components.
- Add `"use client"` only when a file needs hooks, browser APIs, or event handlers.
- Keep the client boundary small — extract the interactive part into its own component.

**HeroUI v3**

- Button variants: `primary` (default), `secondary`, `tertiary`, `outline`, `ghost`, `danger`, `danger-soft`.
- Button loading prop is `isPending` (not `isLoading`).
- Card parts: `CardHeader`, `CardContent`, `CardFooter` (no `CardBody`).

**Styling**

- Tailwind utilities + CSS variables.
- Use `cn()` from `@utils/tw` for conditional class merging.

```tsx
<div className="bg-(--color-bg-surface) p-4">
  <Button className="bg-(--color-accent-cyan)">Click</Button>
</div>
```

**Example client component**

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

## Common tasks

**Add a page**

1. Create `app/<route>/page.tsx`.
2. Add an entry to `siteConfig.nav` in `app/config/site.ts` if it should appear in the header. Entries carry a `labelKey` (not a literal label); add the matching key to `NavLabelKey` and to `dict.nav` in every `app/i18n/dictionaries/*.json`.
3. Wrap any user-visible string in the dictionary: in a Server Component use `const { dict } = await getCurrentDictionary()` (`@i18n/server`), in a Client Component use `const dict = useDict()` (`@i18n/LocaleProvider`).

**Add a locale**

1. Create `app/i18n/dictionaries/<code>.json` — copy `en.json` as a scaffold so the `Dictionary` type stays satisfied. **Update the top-level `meta` object** (`flag`, `native`) — it drives the language switcher.
2. In `app/i18n/config.ts`, add one static import (`import xx from "./dictionaries/xx.json"`) and one entry in the `dictionaries` map. That's it — `Locale`, `locales`, `localeMeta`, `hasLocale()`, `getDictionary()`, and the switcher all derive from that map.

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

## Theme system

CSS variables live in `app/globals.css`. The palette is a violet + cyan duotone: soft violet-tinted paper in light mode, near-black violet-tinted surfaces in dark mode, with violet primary (`--color-text-accent`) and cyan secondary (`--color-accent-cyan`) accents that power the hero gradient and focus rings.

- `--color-bg-primary`, `--color-bg-secondary`, `--color-bg-surface`
- `--color-text-primary`, `--color-text-secondary`, `--color-text-muted`, `--color-text-accent`
- `--color-accent-cyan`, `--color-accent-cyan-hover`
- `--color-border-default`, `--color-border-subtle`
- `--space-xs` … `--space-2xl`
- `--navbar-height`, `--navbar-height-mobile`

The template uses Tailwind utilities for radius (`rounded-*`), shadow (`shadow-*`), and transitions (`transition-*`) instead of bespoke CSS vars. Add tokens here only when you need them across hand-written CSS. Animation keyframes (`fade-in-up`) and a `prefers-reduced-motion` override are also defined in `globals.css`.

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

- `cn(...)` — class merge with Tailwind conflict resolution.
- `useMediaQuery("(max-width: 768px)")`, `useBreakpoint("md")` — `sm | md | lg | xl | 2xl`.
- `useDebounce(value, ms)`, `useDebouncedCallback(fn, ms)`, `useDebounceState(initial, ms)`.

## Performance

- Default to Server Components; keep `"use client"` boundaries small.
- Reach for `memo()` / `useCallback` / `useMemo` only when profiling shows a real re-render cost. Do **not** wrap zero-prop or stable-prop components in `memo()`.
- Always select Zustand state with a selector (see above).
- `next.config.mjs` enables `output: "standalone"` (slim Docker images), `optimizePackageImports` (for `@heroui/react`, `@heroui/styles`), AVIF/WebP images with a strict `contentSecurityPolicy` on image responses, `optimizeCss`, compression, long-term caching for `/images`, `/fonts`, `/_next/static`, and 6 security headers (HSTS, X-DNS-Prefetch-Control, X-Content-Type-Options, X-Frame-Options, Referrer-Policy, Permissions-Policy). No page-level CSP is set — add one if your app needs it.
- The `Dockerfile` ships a multi-stage build (`base` → `deps` → `builder` → slim `runner`) that runs `node server.js` from the standalone bundle as a non-root user with a `HEALTHCHECK`.

## Scripts

```bash
pnpm dev      # Dev server, Turbopack, 0.0.0.0:3000
pnpm build    # Production build
pnpm start    # Production server
pnpm lint     # Biome check + auto-fix
pnpm upgrade  # pnpm update && pnpm prune
pnpm clean    # rimraf .next out node_modules && pnpm install
pnpm repomix  # Generate a markdown snapshot of the codebase for agents
```

## References

- [Next.js](https://nextjs.org/docs)
- [HeroUI](https://www.heroui.com/docs)
- [Tailwind CSS v4](https://tailwindcss.com/docs)
- [Zustand](https://zustand.docs.pmnd.rs/)
- [Biome](https://biomejs.dev/)
- [AGENTS.md standard](https://agents.md/)
- [Agent Skills spec](https://agentskills.io/specification)
