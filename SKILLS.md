---
name: nextjs-template
description: Next.js 16 template with HeroUI v3, Tailwind CSS v4, TypeScript, Zustand, Biome. For new Next.js projects, React apps with TypeScript, or production-ready web foundations.
license: MIT
compatibility: Node.js 20+, pnpm
metadata:
  author: philogicae
  version: "1.0.0"
  template-type: nextjs
  live-demo: https://fractal-nextjs.vercel.app/
  features:
    - Next.js 16 App Router
    - React 19
    - TypeScript strict
    - Tailwind CSS v4
    - HeroUI v3
    - Zustand + persist
    - Biome linting
    - Dark mode
    - Mobile-first responsive
    - Error boundary
    - Loading states
    - Debounce hooks
    - Media query hooks
---

# Next.js Template

Modern Next.js template with latest web technologies, mobile-first UI, and reusable components.

**Live Demo**: [https://fractal-nextjs.vercel.app/](https://fractal-nextjs.vercel.app/)

**Agent Files**: `AGENTS.md` (workflows) + `SKILLS.md` (tasks)

## When to Use

- Creating new Next.js projects
- Adding pages/components
- Working with API routes
- Configuring Tailwind CSS themes
- Setting up dark mode
- Adding dependencies
- Implementing state management

## Quick Start

```bash
git clone https://github.com/philogicae/nextjs-template.git my-project
cd my-project
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project Structure

```
app/
├── api/hello/          # API routes
├── skills.md/          # Serves SKILLS.md raw
├── components/         # Shared UI (barrel exports)
│   ├── Container.tsx   # Page width wrapper
│   ├── FeatureCard.tsx # Feature grid card
│   ├── StatusBadge.tsx # Status indicator
│   ├── ThemeToggle.tsx # Theme switch
│   └── index.ts
├── layout/            # Layout components (no barrel)
│   ├── Navbar.tsx     # Responsive navbar + mobile menu
│   └── Footer.tsx
├── stores/            # Zustand stores (barrel exports)
│   ├── theme.ts       # Theme + persist middleware
│   ├── counter.ts     # Demo store
│   └── index.ts
├── utils/             # Helper functions
│   ├── tw.ts          # cn() helper for Tailwind
│   ├── theme-script.ts # FOIT prevention script
│   ├── debounce.ts    # Debounce hooks (`useDebounce`, `useDebouncedCallback`)
│   └── media-query.ts # Responsive hooks (`useMediaQuery`, `useBreakpoint`)
├── globals.css        # Design tokens + CSS variables
├── layout.tsx         # Root layout with preconnect
├── page.tsx           # Landing page
├── not-found.tsx      # 404 page
├── error.tsx          # Error boundary
├── loading.tsx        # Loading UI
└── playground/
    └── page.tsx       # Interactive playground
public/                # Static assets
├── images/
│   ├── logo.gif
│   ├── apple-touch-icon.png
│   ├── 192x192.png
│   └── 512x512.png
├── favicon.ico
├── manifest.json
└── robots.txt
.env.example           # Environment template
SKILLS.md              # Agent Skills spec
AGENTS.md              # Agent config
```

## Technologies

**Framework**

- Next.js 16 (App Router, Turbopack)
- React 19 (Server Components default)
- TypeScript strict mode

**Styling**

- Tailwind CSS v4 (CSS-first)
- CSS variables: `--color-bg-primary`, etc.
- `cn()` utility from `@utils/tw`

**UI**

- HeroUI v3: `Button`, `Card`, `CardHeader`, `CardContent`, `CardFooter`
- Button variants: `primary`, `secondary`, `outline`, `ghost`, `danger`
- Button loading: `isPending` (not `isLoading`)
- Dark mode toggle in `ThemeToggle.tsx`
- Mobile hamburger menu in `Navbar.tsx`

**State**

- Zustand for global state
- Persist middleware for localStorage
- Theme sync with document class
- Counter demo with history/undo

**Dev Tools**

- Biome (lint/format)
- pnpm

## Code Conventions

**Files**

- **Pages**: `app/[route]/page.tsx` — file-based routing
- **API**: `app/api/[endpoint]/route.ts` — export GET/POST/PUT/DELETE
- **Layout**: `app/layout.tsx` — root layout with Navbar, main, Footer
- **Components**: PascalCase (`Navbar.tsx`) in `/app/components/`
- **Utilities**: camelCase (`tw.ts`) in `/app/utils/`
- **Stores**: camelCase (`theme.ts`) in `/app/stores/`
- **Barrel exports**: `index.ts` for clean imports

**Client Components**

- Add `"use client"` for hooks, browser APIs, events
- Default to Server Components

**Imports**

```ts
import { Container, FeatureCard, StatusBadge, ThemeToggle } from "@components";
import { NavBar } from "@layout/Navbar"; // @layout/* only (no barrel)
import { useCounterStore, useThemeStore } from "@stores";
import { cn } from "@utils/tw";
```

> `@layout` barrel is intentionally absent — it collides with `app/layout.tsx`. Use `@layout/Navbar` / `@layout/Footer`.

**Styling**

```tsx
<div className="bg-(--color-bg-surface) p-4">
  <Button className="bg-(--color-accent-cyan)">Click</Button>
</div>
```

## Common Tasks

**Add Page**

1. Create `app/about/page.tsx`
2. Add to `navLinks` in `app/layout/Navbar.tsx`
3. Run `pnpm dev`

**Add API Route**

```ts
// app/api/users/route.ts
export async function GET(): Promise<Response> {
  return Response.json({ users: [] });
}

export async function POST(request: Request): Promise<Response> {
  const body = await request.json();
  return Response.json({ created: body });
}
```

**Use Theme**

- `bg-(--color-bg-primary)` — Background
- `text-(--color-text-primary)` — Text
- `bg-(--color-accent-cyan)` — Accent
- `border-(--color-border-default)` — Border

**Use Zustand**

```ts
import { useThemeStore, useCounterStore } from "@stores";

const { isDark, toggleTheme } = useThemeStore();
const { count, increment, decrement, undo } = useCounterStore();
```

**Create Store**

```ts
// app/stores/myStore.ts
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

Then re-export from `app/stores/index.ts`.

## Theme System

**CSS Variables** (in `globals.css`):

- `--color-bg-primary`, `--color-bg-surface` — Backgrounds
- `--color-text-primary`, `--color-text-secondary`, `--color-text-muted` — Text
- `--color-accent-cyan`, `--color-accent-cyan-hover` — Accent
- `--color-border-default`, `--color-border-subtle` — Borders
- `--space-xs` .. `--space-2xl` — Spacing
- `--navbar-height` — Layout

**Usage:**

```tsx
<div className="bg-(--color-bg-primary) text-(--color-text-primary)">
  <Button className="bg-(--color-accent-cyan)">Click</Button>
</div>
```

## Dev Commands

```bash
pnpm dev      # Dev server (Turbopack)
pnpm build    # Production
pnpm start    # Start production
pnpm lint     # Lint/format (auto-fix)
pnpm upgrade  # Update deps
pnpm clean    # Clean reinstall
pnpm repomix  # Generate codebase summary (markdown)
```

## Utilities

**Media Query Hooks**

```ts
import { useMediaQuery, useBreakpoint } from "@utils/media-query";

const isMobile = useMediaQuery("(max-width: 768px)");
const isMd = useBreakpoint("md"); // sm | md | lg | xl | 2xl
```

**Debounce Hooks**

```ts
import {
  useDebounce,
  useDebouncedCallback,
  useDebounceState,
} from "@utils/debounce";

// Debounce a value
const debouncedSearch = useDebounce(search, 300);

// Debounce a callback
const debouncedSearch = useDebouncedCallback((query: string) => {
  fetchResults(query);
}, 300);

// Combined state + debounced value
const [search, debouncedSearch, setSearch] = useDebounceState("", 300);
```

**Tailwind Helper**

```ts
import { cn } from "@utils/tw"

// Merge classes with conflict resolution
className={cn("px-4", isActive && "bg-blue-500")}
```

## Requirements

- Node.js 20+
- pnpm (recommended)
- Modern browser

## AI Agent Integration

**AGENTS.md**: Standard config read by [Claude Code](https://claude.ai/code), [Cursor](https://www.cursor.com/), [Windsurf](https://windsurf.com/), [OpenClaw](https://openclaw.ai/), [Hermes](https://hermes-agent.nousresearch.com/). Provides development workflows, code style, and architecture patterns.

**SKILLS.md + /skills.md**: Agent Skills spec following [agentskills.io](https://agentskills.io/specification). Raw content served at `/skills.md` for dynamic discovery.

## Performance

**React Optimizations**

- Use `memo()` for pure components that re-render often:

  ```tsx
  const MyComponent = memo(function MyComponent({ prop }) {
    return <div>{prop}</div>;
  });
  ```

- Use `useCallback()` for event handlers passed to children
- Use `useMemo()` for expensive computations
- Split large components into smaller memoized sub-components

**Zustand Best Practices**

- Use selectors to subscribe only to needed state slices:

  ```ts
  // Good: Only re-renders when count changes
  const count = useCounterStore((s) => s.count);

  // Bad: Re-renders when any store property changes
  const { count } = useCounterStore();
  ```

**Server vs Client Components**

- Default to Server Components (no "use client" directive)
- Use CSS animations instead of JS state when possible
- Keep "use client" boundaries as small as possible

**Example: Optimized Zustand Usage**

```tsx
// Use granular selectors for better performance
const count = useCounterStore((s) => s.count);
const history = useCounterStore((s) => s.history);
const increment = useCounterStore((s) => s.increment);
const canUndo = useMemo(() => history.length > 0, [history]);
```

## References

- [Live Demo](https://fractal-nextjs.vercel.app/)
- [Next.js](https://nextjs.org/docs)
- [HeroUI](https://www.heroui.com/docs)
- [Tailwind v4](https://tailwindcss.com/docs)
- [AGENTS.md Standard](https://agents.md/)
- [SKILLS.md Specification](https://agentskills.io/specification)
- [Repomix](https://github.com/yamadashy/repomix)
