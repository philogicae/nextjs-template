# Next.js Template

A modern, production-ready Next.js template featuring the latest technologies and best practices.

## Features

- **Next.js 16** — App Router with React Server Components
- **React 19** — Latest React features and improvements
- **TypeScript** — Full type safety with strict configuration
- **Tailwind CSS 4** — Utility-first styling with CSS variables
- **HeroUI v3** — Beautiful, accessible UI components
- **Zustand** — Lightweight state management with persistence
- **Dark Mode** — Built-in theme switching with state persistence
- **Biome** — Fast linting and code formatting
- **Mobile-first** — Fully responsive layout
- **Path Aliases** — Clean imports with `@components`, `@layout`, `@utils`, `@stores`

## Getting Started

### Prerequisites

- Node.js 20+
- pnpm (recommended)

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
│   └── hello/
│       └── route.ts       # Example GET/POST endpoint
├── skills.md/
│   └── route.ts           # Serves SKILLS.md as raw text
├── components/            # Reusable UI components
│   ├── Container.tsx      # Page width wrapper
│   ├── FeatureCard.tsx    # Landing page feature card
│   ├── StatusBadge.tsx    # Status indicator with colored dot
│   ├── ThemeToggle.tsx    # Dark/light theme switch
│   └── index.ts           # Barrel exports
├── layout/                # Layout components (no barrel)
│   ├── Navbar.tsx         # Responsive navbar with mobile menu
│   └── Footer.tsx         # Site footer with links
├── playground/            # Interactive API + state playground
│   └── page.tsx
├── stores/                # Zustand state stores
│   ├── theme.ts           # Theme store with persistence
│   ├── counter.ts         # Demo counter store
│   └── index.ts           # Barrel exports
├── utils/                 # Utility functions
│   ├── tw.ts              # cn() class merger
│   ├── theme-script.ts    # FOIT prevention script
│   ├── debounce.ts       # Debounce hooks
│   └── media-query.ts    # Responsive hooks
├── globals.css            # Global styles and design tokens
├── layout.tsx             # Root layout (Navbar + main + Footer)
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

SKILLS.md                  # Agent Skills definition
AGENTS.md                  # AI agent configuration
```

## AI Agent Configuration

This project includes AI agent configuration files:

- **AGENTS.md** — development workflows, code style, and architecture guidance
- **SKILLS.md** — task-specific skills, patterns, and quick reference

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
- Task-specific patterns and common operations
- Technology stack details and cheatsheets
- File organization guidelines
- Code examples for components, stores, APIs

The skills definition is also served at `/skills.md` as raw text for dynamic discovery by AI agents.

### Live Demo

Visit the [live demo](https://fractal-nextjs.vercel.app/) to see the template in action, including the AI Agent Integration section with tabs for AGENTS.md, SKILLS.md, and Repomix documentation.

## Customization

### Design Tokens

Edit `app/globals.css` to customize colors, spacing, and other design tokens:

```css
:root {
  --color-bg-primary: #ffffff;
  --color-accent-cyan: #06b6d4;
  /* ... */
}
```

### Path Aliases

Configured in `tsconfig.json`:

```json
{
  "paths": {
    "@components/*": ["./app/components/*"],
    "@components": ["./app/components"],
    "@layout/*": ["./app/layout/*"],
    "@utils/*": ["./app/utils/*"],
    "@stores/*": ["./app/stores/*"],
    "@stores": ["./app/stores"]
  }
}
```

> Note: `@layout` (barrel) is intentionally **not** aliased because it would conflict with `app/layout.tsx`. Use `@layout/Navbar` / `@layout/Footer` for explicit paths.

### Reusable Components

```tsx
import { Container, FeatureCard, StatusBadge, ThemeToggle } from "@components";

<Container size="md">
  <FeatureCard icon="▲" name="Next.js 16" description="App Router" />
  <StatusBadge status="success" />
</Container>;
```

### HeroUI Button Variants

HeroUI v3 Button variants: `primary` (default), `secondary`, `tertiary`, `outline`, `ghost`, `danger`, `danger-soft`.

## API Playground

Visit `/playground` to test the API endpoints and Zustand state management:

- GET/POST requests to `/api/hello` with live status badges
- GET request to `/skills.md` (returns raw SKILLS.md content)
- Zustand counter demo (increment, decrement, +5, reset, undo)

## License

MIT License
