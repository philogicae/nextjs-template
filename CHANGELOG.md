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
- Feat: major template overhaul - next-themes, no barrel exports, AGENTS.md v2, Docker

- Replace custom Zustand theme store with next-themes (providers.tsx)
- Remove barrel export pattern from components/ and stores/
- Rewrite AGENTS.md with customization checklist and structured guidance
- Add CHECKLIST.md for project bootstrap tracking
- Add CHANGELOG.md and git-cliff config (cliff.toml)
- Refactor Dockerfile with multi-stage build and node-caged base
- Simplify globals.css design tokens (violet-cyan duotone)
- Update all components with explicit React.ReactElement return types
- Add Skeleton.tsx component and update ThemeToggle for next-themes
- Update next.config.mjs with security headers and caching
- Delete app/stores/theme.ts and app/utils/theme-script.ts (obsolete)
- Update tsconfig.json path aliases (remove @components barrel)
- Feat: add Vercel Analytics and Speed Insights with environment-based conditional rendering
- Feat: add complete internationalization (i18n) system with 4 locales

- Add provider-based i18n layer (no URL segment) with cookie + Accept-Language detection
- Implement server-side locale resolution via getCurrentDictionary()
- Add client LocaleProvider with useLocale() and useDict() hooks
- Create LanguageSwitcher component with HeroUI dropdown
- Add 4 locale dictionaries: en, fr, es, ro with full translations
- Update all pages (landing, error, not-found, playground) for i18n
- Integrate i18n into Navbar, Footer, ThemeToggle components
- Update site config to use labelKey-based navigation
- Add @i18n path alias and update tsconfig
- Update AGENTS.md, SKILLS.md, README.md with i18n conventions
- Feat: auto-sync SKILLS.md version from package.json in /skills.md route
- Feat: add comprehensive design system with dual-theme support and SKILL.md rename

- Add DESIGN.md with complete design tokens, colors, typography, and patterns
- Rename SKILLS.md → SKILL.md (singular) across all files and routes
- Refactor globals.css with dark/light mode CSS variables (pitch black canvas
  with neon lime/cyan in dark; sky white with Mediterranean sunrise in light)
- Update all components to use new --color-\* token naming conventions
- Ship with 4 locales (en, fr, es, ro) by default
- Remove empty app/api/skills/ stub
- Sync AGENTS.md, CHECKLIST.md, README.md with DESIGN.md references
- Feat: add floating navbar with rounded corners and border styling
- Feat: add useClickOutside hook, custom dropdowns, and SEO sitemap

- Add useClickOutside utility hook for dropdown dismiss behavior
- Refactor LanguageSwitcher to custom implementation (replaces HeroUI Dropdown)
- Update ThemeToggle with design-system hover states (inverted colors on hover)
- Add click-outside behavior to mobile menu in Navbar
- Add app/sitemap.ts for automatic SEO sitemap generation
- Update manifest.json with full PWA config (icons, screenshots, display_override)
- Update robots.txt with sitemap reference
- Sync all documentation: AGENTS.md, CHECKLIST.md, DESIGN.md, README.md, SKILL.md
- Update public assets (favicon, PWA icons, OpenGraph screenshot)
- Feat: replace raw color values with CSS variables, fix Tailwind v4 syntax, sync DESIGN.md

- Replace hardcoded white/black in hover states with --color-ghost-white/--color-pitch-black
- Update ThemeToggle, LanguageSwitcher, Navbar hover classes to use semantic tokens
- Fix globals.css theme toggle comment and values
- Fix Tailwind v4 syntax: rounded-[var(--*)] → rounded-(--\*)
- Add Heading Gradient tokens section to DESIGN.md
- Add shadow-halo-color to Shadows tables in DESIGN.md
- Ensure DESIGN.md and globals.css stay synchronized
- Feat: content-negotiated skill.md with minification, home button, mobile fonts

- Transform /skill.md route with content negotiation: styled HTML for browsers
  (markdown rendering, YAML frontmatter highlighting, dark/light theme toggle)
  and raw markdown for agents/curl via Accept header + User-Agent detection
- Add home button (house icon) to left of theme toggle in skill.md header
- Remove all CSS/HTML comments from STYLES and template to prevent pollution
- Add terser + csso dependencies for proper minification
- Minify inline CSS using csso, minify + obfuscate JS using terser
- Add mobile-responsive font sizes (smaller base on <640px screens)
- Add removeConsole to next.config.mjs for app-wide optimization
- Sync DESIGN.md Quick Start CSS with globals.css structure
- Update README.md design token examples to match actual color system

### 🐛 Bug Fixes

- Fix: update navbar logo styling and site config shortName

### 💼 Changes

- Init

### 🚜 Refactor

- Refactor: standardize counter button min-width values in playground
- Refactor: reduce component sizes and spacing for more compact UI
- Refactor: make Docker Compose configuration fully customizable via .env
- Refactor: remove redundant `code` field from locale metadata

### 📚 Documentation

- Docs: add OpenGraph/Twitter card image and update siteConfig.url to production domain
- Docs: clarify i18n best practices and simplify default locale setup

### ⚙️ Miscellaneous Tasks

- Chore: remove explicit pnpm version from CI workflow
- Chore: update github actions and add Next.js build job
- Chore: remove unused resource hints and optimize image configuration

- Remove Google Fonts preconnect links from layout (not used)
- Replace unoptimized prop with responsive sizes in Navbar Logo
- Clean up robots.txt formatting (remove empty sitemap reference)
- Chore: update changelog
- Chore: update changelog
- Chore: update changelog
