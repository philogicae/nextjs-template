# Next.js Template

A modern, production-ready Next.js template featuring the latest technologies and best practices.

## Features

- **Next.js 16** - App Router with React Server Components
- **React 19** - Latest React features and improvements
- **TypeScript** - Full type safety with strict configuration
- **Tailwind CSS 4** - Utility-first styling with CSS variables
- **HeroUI** - Beautiful, accessible UI components
- **Dark Mode** - Built-in theme switching
- **Biome** - Fast linting and code formatting
- **Path Aliases** - Clean imports with `@components`, `@layout`, `@utils`

## Getting Started

### Prerequisites

- Node.js 20+
- pnpm (recommended)

### Installation

```bash
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
├── components/     # React components
│   └── ThemeToggle.tsx
├── layout/         # Layout components
│   └── Navbar.tsx
├── utils/          # Utility functions
│   └── tw.ts
├── api/            # API routes
│   └── hello/
│       └── route.ts
├── globals.css     # Global styles and design tokens
├── layout.tsx      # Root layout
├── page.tsx        # Home page
└── about/
    └── page.tsx    # About page

public/             # Static assets
├── images/
│   ├── logo.gif
│   ├── apple-touch-icon.png
│   ├── 192x192.png
│   └── 512x512.png
├── favicon.ico
├── manifest.json
└── robots.txt
```

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
    "@utils/*": ["./app/utils/*"]
  }
}
```

## License

MIT License
