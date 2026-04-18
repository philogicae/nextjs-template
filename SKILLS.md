---
name: nextjs-template
description: Next.js 16 template with HeroUI v3, Tailwind CSS v4, TypeScript, Zustand, Biome. For new Next.js projects, React apps with TypeScript, or production-ready web foundations.
license: MIT
compatibility: Node.js 20+, pnpm
metadata:
  author: philogicae
  version: "1.0.0"
  template-type: nextjs
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
    - API playground page
---

# Next.js Template

Modern Next.js template with latest web technologies, mobile-first UI, and reusable components.

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
├── api/                   # API routes
│   └── hello/route.ts
├── skills.md/route.ts     # Serves SKILLS.md raw
├── components/            # Reusable UI
│   ├── Container.tsx      # Page width wrapper
│   ├── FeatureCard.tsx    # Feature grid card
│   ├── StatusBadge.tsx    # Status dot + label
│   ├── ThemeToggle.tsx    # Theme switch
│   └── index.ts           # Barrel
├── layout/                # Layout-level
│   ├── Navbar.tsx         # Responsive navbar
│   └── Footer.tsx         # Site footer
├── stores/                # Zustand
│   ├── theme.ts           # Theme + persist
│   ├── counter.ts         # Demo store
│   └── index.ts           # Barrel
├── utils/
│   └── tw.ts              # cn()
├── globals.css            # Design tokens
├── layout.tsx             # Root layout
├── page.tsx               # Landing
├── test/page.tsx          # API + state playground
└── not-found.tsx          # 404
public/                    # Static assets
SKILLS.md                  # Agent Skills
AGENTS.md                  # Agent config
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

- HeroUI v3 components (`Button`, `Card`, `CardHeader`, `CardContent`, `CardFooter`, ...)
- Button variants: `primary`, `secondary`, `tertiary`, `outline`, `ghost`, `danger`, `danger-soft`
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

- Pages: `app/[route]/page.tsx`
- API: `app/api/[endpoint]/route.ts`
- Components: PascalCase (`Navbar.tsx`)
- Utilities: camelCase (`tw.ts`)

**Client Components**

- Add `"use client"` for hooks, browser APIs, events
- Default to Server Components

**Imports (barrel aliases)**

```ts
import { Container, FeatureCard, StatusBadge, ThemeToggle } from "@components";
import { NavBar } from "@layout/Navbar"; // @layout/* only (no barrel)
import { Footer } from "@layout/Footer";
import { useCounterStore, useThemeStore } from "@stores";
import { cn } from "@utils/tw";
```

> `@layout` barrel alias is intentionally absent: it would conflict with `app/layout.tsx`. Always use `@layout/Navbar` / `@layout/Footer`.

**Styling**

```tsx
<div className="bg-(--color-bg-surface) p-4">
  <Button className="bg-(--color-accent-cyan)">Click</Button>
</div>
```

## Common Tasks

**Add Page**

1. Create `app/about/page.tsx`
2. Add to `navLinks` in `app/layout/Navbar.tsx` (used by both desktop nav + mobile dropdown)
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

- `bg-(--color-bg-primary)` - Background
- `text-(--color-text-primary)` - Text
- `bg-(--color-accent-cyan)` - Accent
- `border-(--color-border-default)` - Border

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

**Use Reusable Components**

```tsx
import { Container, FeatureCard, StatusBadge } from "@components";

<Container size="md">
  <FeatureCard icon="▲" name="Next.js" description="App Router" />
  <StatusBadge status="success" />
</Container>;
```

**Test APIs**
Visit `/test` for the playground:

- `GET /api/hello` - Hello message
- `POST /api/hello` - Echo JSON
- `GET /skills.md` - Raw SKILLS.md

## Dev Commands

```bash
pnpm dev      # Dev server
pnpm build    # Production
pnpm start    # Start prod
pnpm lint     # Lint/format (auto-fix)
pnpm upgrade  # Update deps
pnpm clean    # Clean reinstall
```

## Requirements

- Node.js 20+
- pnpm (recommended)
- Modern browser

## AI Agent Integration

**AGENTS.md**: Standard config for Kilo Code, Cursor, Windsurf, etc.

**SKILLS.md + /skills.md**: Agent Skills spec. Raw content served at `/skills.md`.

## References

- [Next.js](https://nextjs.org/docs)
- [HeroUI](https://www.heroui.com/docs)
- [Tailwind v4](https://tailwindcss.com/docs)
- [AGENTS.md](https://agents.md/)
- [SKILLS.md](https://agentskills.io/specification)
