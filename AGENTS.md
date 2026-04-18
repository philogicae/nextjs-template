# Next.js Template

Next.js 16 + HeroUI v3 + Tailwind CSS v4 + TypeScript + Zustand.

**Live Demo**: [https://fractal-nextjs.vercel.app/](https://fractal-nextjs.vercel.app/)

**Agent Files**: `AGENTS.md` (this file) + `SKILLS.md` (quick reference)

## Stack

- **Framework**: Next.js 16 (App Router, Turbopack)
- **UI**: HeroUI v3
- **Styling**: Tailwind CSS v4 (CSS-first)
- **State**: Zustand + persist middleware
- **Linting**: Biome
- **Package Manager**: pnpm

## Code Style

**TypeScript**

- Strict mode
- `interface` for objects, `type` for unions
- Explicit return types on exports
- Prefer `const`, never `var`

**Files**

- **Pages**: `app/[route]/page.tsx` — file-based routing
- **API**: `app/api/[endpoint]/route.ts` — export GET/POST/PUT/DELETE
- **Layout**: `app/layout.tsx` — root layout with Navbar, main, Footer
- **Components**: `/app/components/` — shared UI with barrel exports
- **Layout parts**: `/app/layout/` — Navbar, Footer (no barrel)
- **Stores**: `/app/stores/` — Zustand with barrel exports
- **Utilities**: `/app/utils/` — helper functions
  - `tw.ts` — Tailwind class merging (`cn()`)
  - `theme-script.ts` — FOIT prevention script
  - `debounce.ts` — Debounce hooks (`useDebounce`, `useDebouncedCallback`)
  - `media-query.ts` — Responsive hooks (`useMediaQuery`, `useBreakpoint`)

**Naming**

- Components: PascalCase (`Navbar.tsx`)
- Hooks: camelCase with `use` prefix
- Utilities: camelCase

## Component Patterns

**Client vs Server**

- Add `"use client"` for hooks, browser APIs, or event handlers
- Default to Server Components (`Footer`, `Container` are Server Components)
- Keep `"use client"` boundaries small — extract client parts into sub-components

**Styling**

- Tailwind utility classes
- CSS variables: `--color-bg-primary`, `--color-text-primary`, etc.
- Use `cn()` from `@utils/tw` for class merging

```tsx
<div className="bg-(--color-bg-surface) p-4">
  <Button className="bg-(--color-accent-cyan)">Click</Button>
</div>
```

**HeroUI v3**

- Button variants: `primary`, `secondary`, `outline`, `ghost`, `danger`
- Button loading: `isPending` (not `isLoading`)
- Card: `CardHeader`, `CardContent`, `CardFooter` (no `CardBody`)

**Example Component**

```tsx
"use client";
import { Container } from "@components";
import { Button } from "@heroui/react";
import { useState } from "react";

export function Example() {
  const [state, setState] = useState("");
  return (
    <Container size="md">
      <Button variant="outline" onPress={() => setState("x")}>
        Click
      </Button>
    </Container>
  );
}
```

## Architecture

**Path Aliases**

```json
"@components/*": ["./app/components/*"],
"@components":   ["./app/components"],
"@layout/*":     ["./app/layout/*"],
"@utils/*":      ["./app/utils/*"],
"@stores/*":     ["./app/stores/*"],
"@stores":       ["./app/stores"]
```

> `@layout` has no barrel — import from `@layout/Navbar` or `@layout/Footer`.

**Project Structure**

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
│   ├── debounce.ts    # Debounce hooks
│   └── media-query.ts # Responsive hooks
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
AGENTS.md              # Agent config (this file)
```

## Common Tasks

**Add Page**

1. Create `app/about/page.tsx`
2. Add entry to `navLinks` in `app/layout/Navbar.tsx`
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

**Import Stores (with Selectors)**

```ts
import { useThemeStore, useCounterStore } from "@stores";

// Good: Use selectors to prevent unnecessary re-renders
const count = useCounterStore((s) => s.count);
const { isDark, toggleTheme } = useThemeStore((s) => ({
  isDark: s.isDark,
  toggleTheme: s.toggleTheme,
}));

// Bad: Destructuring causes re-renders on any store change
const { count } = useCounterStore();
```

## Theme System

**CSS Variables** (in `globals.css`):

- `--color-bg-primary`, `--color-bg-surface` — Backgrounds
- `--color-text-primary`, `--color-text-secondary`, `--color-text-muted` — Text
- `--color-accent-cyan`, `--color-accent-cyan-hover` — Accent
- `--color-border-default`, `--color-border-subtle` — Borders
- `--space-xs` .. `--space-2xl` — Spacing
- `--navbar-height` — Layout

**Usage in Tailwind:**

```tsx
<div className="bg-(--color-bg-primary) text-(--color-text-primary)">
  <Button className="bg-(--color-accent-cyan)">Click</Button>
</div>
```

**Theme Toggle:**

- Uses `ThemeToggle.tsx` component
- Theme state persisted via `theme.ts` store
- FOIT prevention via inline script in `layout.tsx`
- Respects `prefers-color-scheme` if no stored preference

## Performance

**React Optimizations**

- Use `memo()` for pure components that re-render often
- Use `useCallback()` for event handlers passed to children
- Use `useMemo()` for expensive computations
- Split large components into smaller memoized sub-components

**Zustand Best Practices**

- Use selectors to subscribe only to needed state slices:
  ```ts
  const count = useCounterStore((s) => s.count); // Good
  const { count } = useCounterStore(); // Bad
  ```

**Server vs Client Components**

- Default to Server Components (no "use client")
- Use CSS animations instead of JS state when possible
- Keep "use client" boundaries small

**Build Optimizations**

- `optimizePackageImports` in `next.config.mjs` for tree-shaking
- Image optimization with AVIF/WebP formats
- CSS optimization (`optimizeCss`)
- 7 security headers (HSTS, X-Frame-Options, CSP, etc.)
- Long-term caching headers for static assets
- Compression enabled

## Development

```bash
pnpm dev      # Dev server (Turbopack)
pnpm build    # Production
pnpm start    # Start production
pnpm lint     # Biome lint/format (auto-fix)
pnpm upgrade  # Update deps
pnpm clean    # Clean reinstall
pnpm repomix  # Generate codebase summary
```

## Links

- [Live Demo](https://fractal-nextjs.vercel.app/)
- [Next.js](https://nextjs.org/docs)
- [HeroUI](https://www.heroui.com/docs)
- [Tailwind v4](https://tailwindcss.com/docs)
- [Biome](https://biomejs.dev/)
