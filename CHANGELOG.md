## [unreleased]

### 🚀 Features

- Feat: add AI agent config, Zustand stores, CI workflow, and enhanced API
- Add AGENTS.md and SKILLS.md for AI assistant integration
- Implement Zustand stores (theme with persist, counter with undo)
- Add GitHub Actions lint workflow with Biome
- Create /skills.md API route for dynamic skill discovery
- Refactor ThemeToggle to use global theme store
- Add TypeScript return types across all components
- Enhance /test page with API testing and Zustand demo
- Update README with project structure and clone instructions
- Feat: add reusable UI components, Footer, responsive layout, and fix theme persistence
Adds Container, FeatureCard, StatusBadge components with @components barrel exports;
adds Footer integrated into root layout; adds mobile hamburger menu to Navbar;
updates landing, playground, and 404 pages for mobile-first responsiveness;
refreshes AGENTS.md/README.md/SKILLS.md with HeroUI v3 patterns.
Fixes dark/light mode to properly restore user preference on return visits
by adding an inline theme initialization script that reads localStorage
before hydration, preventing flash of incorrect theme.
- Feat: comprehensive UI/UX overhaul with performance optimizations and new utilities
- Add error.tsx error boundary and loading.tsx skeleton UI
- Rename /test to /playground with memoized components and improved state management
- Add debounce hooks (useDebounce, useDebouncedCallback, useDebounceState)
- Add media query hooks (useMediaQuery, useBreakpoint)
- Refactor Navbar with memoized sub-components (Logo, DesktopNav, MobileNav, NavLink)
- Refactor ThemeToggle with granular Zustand selectors and hydration handling
- Refactor landing page with CSS animations (AnimatedSection, BackgroundDecor)
- Add animations to globals.css (fade-in, scale-in, slide-in, pulse-glow, shimmer)
- Add security headers and caching to next.config.mjs (HSTS, CSP, 7 headers total)
- Add API route caching with unstable_cache in skills.md/route.ts
- Update all documentation (AGENTS.md, SKILLS.md, README.md) with accurate structure
- Biome linting passes on all 23 files, TypeScript strict mode validated

### 💼 Changes

- Init

### 🚜 Refactor

- Refactor: standardize counter button min-width values in playground

### ⚙️ Miscellaneous Tasks

- Chore: remove explicit pnpm version from CI workflow
- Chore: update github actions and add Next.js build job
- Chore: remove unused resource hints and optimize image configuration

- Remove Google Fonts preconnect links from layout (not used)
- Replace unoptimized prop with responsive sizes in Navbar Logo
- Clean up robots.txt formatting (remove empty sitemap reference)
