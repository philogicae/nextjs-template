# Next.js Template

A modern, production-ready Next.js template featuring the latest technologies and best practices.

## Features

- **Next.js 16** - App Router with React Server Components
- **React 19** - Latest React features and improvements
- **TypeScript** - Full type safety with strict configuration
- **Tailwind CSS 4** - Utility-first styling with CSS variables
- **HeroUI v3** - Beautiful, accessible UI components
- **Zustand** - Lightweight state management with persistence
- **Dark Mode** - Built-in theme switching with state persistence
- **Biome** - Fast linting and code formatting
- **Mobile-first** - Fully responsive layout (hero, playground, 404)
- **Path Aliases** - Clean imports with `@components`, `@layout`, `@utils`, `@stores`

## Getting Started

### Prerequisites

- Node.js 20+
- pnpm (recommended)

### Clone and Setup

```bash
# Clone the repository
git clone https://github.com/philogicae/nextjs-template.git my-project
cd my-project

# Install dependencies
pnpm install

# Run development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

- `pnpm dev` - Start development server with Turbo
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run Biome linter and formatter (auto-fix)
- `pnpm upgrade` - Update all dependencies
- `pnpm clean` - Clean build artifacts and reinstall

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
├── layout/                # Layout-level components
│   ├── Navbar.tsx         # Responsive navbar with mobile menu
│   └── Footer.tsx         # Site footer with links
├── stores/                # Zustand state stores
│   ├── theme.ts           # Theme store with persistence
│   ├── counter.ts         # Demo counter store
│   └── index.ts           # Barrel exports
├── utils/                 # Utility functions
│   └── tw.ts              # cn() class merger
├── test/
│   └── page.tsx           # Interactive API + state playground
├── globals.css            # Global styles and design tokens
├── layout.tsx             # Root layout (Navbar + main + Footer)
├── page.tsx               # Landing page
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

This project includes configuration files for AI coding assistants:

### AGENTS.md

Standardized instructions for AI coding assistants following the [AGENTS.md standard](https://agents.md/). See [AGENTS.md](./AGENTS.md) for:

- Code style and conventions
- Project architecture
- Component patterns
- Development workflows

### SKILLS.md

Agent Skills definition following the [Agent Skills specification](https://agentskills.io/specification). See [SKILLS.md](./SKILLS.md) for:

- Skill metadata and compatibility
- Common tasks and patterns
- Technology stack details
- File organization guidelines

The skills definition is also served at `/skills.md` as raw text for dynamic discovery by AI agents.

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

Visit `/test` to test the API endpoints and Zustand state management. The page provides:

- GET/POST requests to `/api/hello` with live status badges
- GET request to `/skills.md` (returns raw SKILLS.md content)
- Zustand counter demo (increment, decrement, +5, reset, undo)

## License

MIT License
