---
name: nextjs-template
description: Next.js 16 template with HeroUI, Tailwind CSS v4, TypeScript, Zustand, Biome. For new Next.js projects, React apps with TypeScript, or production-ready web foundations.
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
    - API test page
---

# Next.js Template

Modern Next.js template with latest web technologies.

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
├── api/                # API routes
│   └── hello/
├── skills.md/          # Serves SKILLS.md raw
├── components/         # React components
├── layout/             # Layout components
├── stores/             # Zustand stores
│   ├── theme.ts        # Theme + persist
│   ├── counter.ts      # Demo store
│   └── index.ts        # Exports
├── utils/              # Utilities
├── globals.css         # CSS variables
├── layout.tsx          # Root layout
├── page.tsx            # Home page
├── test/               # API test page
└── not-found.tsx       # 404 page
public/                 # Static assets
SKILLS.md               # Agent Skills def
AGENTS.md               # Agent config
```

## Technologies

**Framework**

- Next.js 16 (App Router)
- React 19 (Server Components default)
- TypeScript strict mode

**Styling**

- Tailwind CSS v4 (CSS-first)
- CSS variables: `--color-bg-primary`, etc.
- `cn()` utility from `@utils/tw.ts`

**UI**

- HeroUI v3 components
- Dark mode toggle in `ThemeToggle.tsx`

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

**Styling**

```tsx
<div className="bg-(--color-bg-surface) p-4">
  <Button className="bg-(--color-accent-cyan)">Click</Button>
</div>
```

## Common Tasks

**Add Page**

1. Create `app/about/page.tsx`
2. Add to `navLinks` in `Navbar.tsx`
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

**Test APIs**
Visit `/test` for API testing interface:

- `GET /api/hello` - Hello message
- `POST /api/hello` - Echo JSON
- `GET /skills.md` - Raw SKILLS.md

## Dev Commands

```bash
pnpm dev      # Dev server
pnpm build    # Production
pnpm start    # Start prod
pnpm lint     # Lint/format
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
