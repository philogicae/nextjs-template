# Next.js Template

A modern, production-ready Next.js template featuring the latest technologies and best practices.

## Features

- **Next.js 16** - App Router with React Server Components
- **React 19** - Latest React features and improvements
- **TypeScript** - Full type safety with strict configuration
- **Tailwind CSS 4** - Utility-first styling with CSS variables
- **HeroUI** - Beautiful, accessible UI components
- **Zustand** - Lightweight state management with persistence
- **Dark Mode** - Built-in theme switching with state persistence
- **Biome** - Fast linting and code formatting
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
- `pnpm lint` - Run Biome linter and formatter
- `pnpm upgrade` - Update all dependencies
- `pnpm clean` - Clean build artifacts and reinstall

## Project Structure

```
app/
├── api/               # API routes
│   └── hello/         # Example API with GET/POST
│       └── route.ts
├── skills.md/         # Serves SKILLS.md as raw text
│   └── route.ts
├── components/        # React components
│   └── ThemeToggle.tsx
├── layout/            # Layout components
│   └── Navbar.tsx
├── stores/            # Zustand state stores
│   ├── theme.ts       # Theme store with persistence
│   ├── counter.ts     # Demo counter store
│   └── index.ts       # Store exports
├── utils/             # Utility functions
│   └── tw.ts
├── test/              # API test page with Zustand demo
│   └── page.tsx
├── globals.css        # Global styles and design tokens
├── layout.tsx         # Root layout
├── page.tsx           # Home page
└── not-found.tsx      # 404 page

public/                # Static assets
├── images/
│   ├── logo.gif
│   ├── apple-touch-icon.png
│   ├── 192x192.png
│   └── 512x512.png
├── favicon.ico
├── manifest.json
└── robots.txt

SKILLS.md              # Agent Skills definition
AGENTS.md              # AI agent configuration
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

Configure path aliases in `tsconfig.json`:

```json
{
  "paths": {
    "@components/*": ["./app/components/*"],
    "@layout/*": ["./app/layout/*"],
    "@utils/*": ["./app/utils/*"],
    "@stores/*": ["./app/stores/*"],
    "@stores": ["./app/stores"]
  }
}
```

## API Testing

Visit `/test` to test the API endpoints and Zustand state management. The test page provides a UI for testing:
- GET/POST requests to `/api/hello`
- GET request to `/skills.md` (returns the raw SKILLS.md content)
- Zustand state management with counter demo (increment, decrement, undo)

## License

MIT License
