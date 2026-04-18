# Next.js Template

Next.js 16 + HeroUI v3 + Tailwind CSS v4 + TypeScript + Zustand.

## Project Overview

- **Framework**: Next.js 16 (App Router, Turbopack)
- **UI**: HeroUI v3
- **Styling**: Tailwind CSS v4 (CSS-first config)
- **State**: Zustand with persist middleware
- **Linting**: Biome
- **Package Manager**: pnpm

## Code Style

**TypeScript**

- Strict mode enabled
- Explicit return types for exports
- `interface` for objects, `type` for unions
- Prefer `const`, never `var`

**File Organization**

- Reusable components: `/app/components/`
- Layout-level components: `/app/layout/`
- Pages: `/app/[route]/page.tsx`
- Utilities: `/app/utils/`
- API routes: `/app/api/[endpoint]/route.ts`
- Stores: `/app/stores/`

**Naming**

- Components: PascalCase (`Navbar.tsx`)
- Hooks: camelCase with `use` prefix
- Utilities: camelCase

## Component Patterns

**Client vs Server**

- Add `"use client"` only when using hooks, browser APIs, or event handlers
- Default to Server Components (`Footer`, `Container`, `FeatureCard`, `StatusBadge` are server components)

**Styling**

- Tailwind utility classes
- CSS variables: `--color-bg-primary`, `--color-text-primary`, etc.
- Use `cn()` from `@utils/tw` for class merging

**HeroUI v3 cheatsheet**

- `Button` variants: `primary` (default), `secondary`, `tertiary`, `outline`, `ghost`, `danger`, `danger-soft`
- `Button` loading prop: `isPending` (not `isLoading`)
- `Card` subcomponents: `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, `CardFooter` (no `CardBody`)

**Example**

```tsx
"use client";
import { Container } from "@components";
import { Button } from "@heroui/react";
import { useState } from "react";

export function Example() {
  const [state, setState] = useState("");
  return (
    <Container size="md">
      <div className="bg-(--color-bg-surface) p-4">
        <Button variant="outline" onPress={() => setState("x")}>
          Click
        </Button>
      </div>
    </Container>
  );
}
```

## Architecture

**Routing**

- File-based App Router
- Dynamic: `[id]/page.tsx`
- Groups: `(group)/page.tsx`

**Root Layout**

`app/layout.tsx` wraps every page with `<NavBar />`, `<main>`, and `<Footer />`. Pages should not render their own footer.

**API Routes**

- Location: `/app/api/[endpoint]/route.ts`
- Export: `GET`, `POST`, `PUT`, `DELETE` handlers
- Return: `Response.json()`

**Data Fetching**

- Prefer Server Components
- Use `fetch()` with proper caching
- Client: `useEffect` + `fetch()`

## Path Aliases

```json
"@components/*": ["./app/components/*"],
"@components":   ["./app/components"],
"@layout/*":     ["./app/layout/*"],
"@utils/*":      ["./app/utils/*"],
"@stores/*":     ["./app/stores/*"],
"@stores":       ["./app/stores"]
```

> `@layout` barrel is intentionally **absent** — it collides with `app/layout.tsx`. Import from `@layout/Navbar` or `@layout/Footer`.

## Development

```bash
pnpm dev      # Dev server (Turbopack)
pnpm build    # Production build
pnpm start    # Start production
pnpm lint     # Biome lint/format (auto-fix)
pnpm upgrade  # Update deps
pnpm clean    # Clean reinstall
```

## Project Structure

```
app/
├── api/hello/             # Example API route
├── skills.md/             # Serves SKILLS.md raw
├── components/            # Reusable UI
│   ├── Container.tsx
│   ├── FeatureCard.tsx
│   ├── StatusBadge.tsx
│   ├── ThemeToggle.tsx
│   └── index.ts           # Barrel
├── layout/
│   ├── Navbar.tsx         # Responsive navbar + mobile menu
│   └── Footer.tsx
├── stores/
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
SKILLS.md                  # Agent Skills def
AGENTS.md                  # Agent instructions
```

## Dependencies

- `next`, `react`, `react-dom`
- `@heroui/react`, `@heroui/styles`
- `zustand`
- `tailwindcss`, `tailwind-merge`, `clsx`
- `typescript`, `@biomejs/biome`

## Security

- Never commit `.env` files
- Use `NEXT_PUBLIC_` prefix only for client secrets
- Validate all API inputs
- Sanitize rendered data

## Theme System

CSS vars in `globals.css`:

- `--color-bg-primary`, `--color-bg-surface`
- `--color-text-primary`, `--color-text-secondary`, `--color-text-muted`, `--color-text-accent`
- `--color-accent-cyan`, `--color-accent-cyan-hover`
- `--color-border-default`, `--color-border-subtle`
- Spacing: `--space-xs` .. `--space-2xl`
- Layout: `--navbar-height`

## Common Tasks

**Add Page**

1. Create `app/about/page.tsx`
2. Add entry to `navLinks` in `@/app/layout/Navbar.tsx` (serves both desktop + mobile menu)

**Add API Route**

```ts
// app/api/users/route.ts
export async function GET(): Promise<Response> {
  return Response.json({ users: [] });
}
```

**Create Zustand Store**

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

**Import Stores**

```ts
import { useThemeStore, useCounterStore } from "@stores";
```

## Build & Deploy

- Build: `pnpm build` → `.next/`
- Static export: Configure in `next.config.mjs`
- Requires: Node.js 20+

## Responsiveness

- Root layout is a flex column; main fills available height so the footer always sits at the bottom.
- `Navbar` collapses to a hamburger menu below `md` (the nav links become a dropdown).
- Pages use the `Container` component for consistent horizontal padding and max-width.
- Hero CTAs stack full-width on mobile; grids step from 2 → 3 → 5 columns.

## AI Agent Integration

**AGENTS.md** (this file): Standard agent config read by Kilo Code, Cursor, Windsurf, etc.

**SKILLS.md + /skills.md**: Agent Skills spec. `/skills.md` serves raw content for discovery.

## Clone Template

```bash
git clone https://github.com/philogicae/nextjs-template.git my-project
cd my-project
pnpm install
pnpm dev
```

Update `package.json`, `README.md`, `AGENTS.md`, `SKILLS.md` for your project.

## Links

- [Next.js](https://nextjs.org/docs)
- [HeroUI](https://www.heroui.com/docs)
- [Tailwind v4](https://tailwindcss.com/docs)
- [Biome](https://biomejs.dev/)
- [AGENTS.md](https://agents.md/)
- [SKILLS.md](https://agentskills.io/specification)
