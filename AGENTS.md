# Next.js Template

Next.js 16 + HeroUI + Tailwind CSS v4 + TypeScript + Zustand.

## Project Overview

- **Framework**: Next.js 16 (App Router)
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

- Components: `/app/components/` or `/app/layout/`
- Pages: `/app/[route]/page.tsx`
- Utilities: `/app/utils/`
- API routes: `/app/api/[endpoint]/route.ts`
- Stores: `/app/stores/`

**Naming**

- Components: PascalCase (`Navbar.tsx`)
- Hooks: camelCase with `use` prefix
- Utilities: camelCase

## Component Patterns

**Client Components**

- Add `"use client"` only when using hooks, browser APIs, or event handlers
- Default to Server Components

**Styling**

- Tailwind utility classes
- CSS variables: `--color-bg-primary`, `--color-text-primary`, etc.
- Use `cn()` from `@utils/tw.ts` for class merging

**Example**

```tsx
"use client";
import { Button } from "@heroui/react";
import { useState } from "react";

export function Example() {
  const [state, setState] = useState("");
  return (
    <div className="bg-(--color-bg-surface) p-4">
      <Button onPress={() => setState("x")}>Click</Button>
    </div>
  );
}
```

## Architecture

**Routing**

- File-based App Router
- Dynamic: `[id]/page.tsx`
- Groups: `(group)/page.tsx`

**API Routes**

- Location: `/app/api/[endpoint]/route.ts`
- Export: `GET`, `POST`, `PUT`, `DELETE` handlers
- Return: `Response.json()`

**Data Fetching**

- Prefer Server Components
- Use `fetch()` with proper caching
- Client: `useEffect` + `fetch()`

## Development

```bash
pnpm dev      # Dev server
pnpm build    # Production build
pnpm start    # Start production
pnpm lint     # Biome lint/format
pnpm upgrade  # Update deps
pnpm clean    # Clean reinstall
```

## Project Structure

```
app/
├── api/              # API routes
│   └── hello/
├── skills.md/        # Serves SKILLS.md raw
├── components/       # React components
├── layout/           # Layout components
├── stores/           # Zustand stores
│   ├── theme.ts      # Theme + persist
│   ├── counter.ts    # Demo store
│   └── index.ts      # Exports
├── utils/            # Utilities
├── globals.css       # CSS variables
├── layout.tsx        # Root layout
├── page.tsx          # Home
├── test/             # API test page
└── not-found.tsx     # 404
public/               # Static assets
SKILLS.md             # Agent Skills def
AGENTS.md             # Agent instructions
```

## Dependencies

- `next`, `react`, `react-dom`
- `@heroui/react`
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
- `--color-text-primary`, `--color-text-secondary`
- `--color-accent-cyan`

## Common Tasks

**Add Page**

1. Create `app/about/page.tsx`
2. Add to `navLinks` in `app/layout/Navbar.tsx`

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

**Import Stores**

```ts
import { useThemeStore, useCounterStore } from "@stores";
```

## Build & Deploy

- Build: `pnpm build` → `.next/`
- Static export: Configure in `next.config.js`
- Requires: Node.js 20+

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
