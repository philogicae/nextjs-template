# Project Bootstrap Checklist

> **Audience.** AI agents (and humans) customizing a new project from `philogicae/nextjs-template`. Tick boxes as you go so the next agent picking up the work sees exactly what is left.
>
> **How to use.** Work top to bottom. Every unchecked box is something a fresh clone of the template still ships with. Do not skip §6 (Sanity checks).
>
> **Companion docs.**
>
> - `AGENTS.md` — in-repo conventions for agents (code style, patterns, common tasks).
> - `SKILLS.md` — bootstrap skill served at `/skills.md` for agent discovery.
> - `README.md` — human-facing overview.
>
> Keep those three in sync with this checklist whenever you add/remove routes, stores, components, or env variables.

---

## 1. Identity & metadata

> **Most identity fields now live in one file.** Edit `app/config/site.ts` first — it drives `app/layout.tsx` metadata (title, description, applicationName, keywords, openGraph, viewport.themeColor), `Navbar` branding, `Footer` socials, and landing-page CTAs.

- [ ] `app/config/site.ts` → `name`
- [ ] `app/config/site.ts` → `shortName`
- [ ] `app/config/site.ts` → `description`
- [ ] `app/config/site.ts` → `keywords`
- [ ] `app/config/site.ts` → `url`
- [ ] `app/config/site.ts` → `license`
- [ ] `app/config/site.ts` → `themeColor.light` / `themeColor.dark`
- [ ] `app/config/site.ts` → `nav` entries (remove `/playground`; keep or drop `/skills.md` — see §5)
- [ ] `app/config/site.ts` → `social` entries (GitHub, X)
- [ ] `package.json` → `name`
- [ ] `package.json` → `description`
- [ ] `package.json` → `repository.url`
- [ ] `package.json` → `homepage`
- [ ] `package.json` → `version` (reset to `0.1.0`)
- [ ] `public/manifest.json` → `name`, `short_name`, `description`, colors, icons (align with `siteConfig`)
- [ ] `public/robots.txt` → update host / sitemap
- [ ] `LICENSE` → update copyright holder or replace

## 2. Public assets

> `public/images/` ships **empty** in the template; supply every file below or the references in `app/layout.tsx`, `app/layout/Navbar.tsx`, and `public/manifest.json` will 404.

- [ ] `public/favicon.ico`
- [ ] `public/images/logo.gif` (used in `Navbar`)
- [ ] `public/images/apple-touch-icon.png`
- [ ] `public/images/192x192.png`
- [ ] `public/images/512x512.png`
- [ ] `public/images/screenshot.jpeg` (OpenGraph / Twitter card image)

## 3. Layout / chrome

> `Navbar` and `Footer` are driven by `siteConfig` (§1). The only hardcoded chrome left here is the logo image itself.

- [ ] `public/images/logo.gif` → replace with your brand logo (referenced by `app/layout/Navbar.tsx`)

## 4. Landing page & design tokens

- [ ] `app/page.tsx` → replace hero headline and subtitle (user-visible strings live in `app/i18n/dictionaries/*.json` under `landing.*`)
- [ ] `app/page.tsx` → replace / prune CTA buttons (`/playground`, `/skills.md`, GitHub from `siteConfig.url`, Deploy to Vercel)
- [ ] `app/page.tsx` → replace the `features` array (names stay in TS, descriptions live in `dict.landing.features.*`)
- [ ] `app/globals.css` → adjust `--color-*` tokens to the new brand
- [ ] `app/globals.css` → update the FOUC `html` / `html.dark` `background-color` to match the new tokens
- [ ] `app/globals.css` → adjust `--space-*` / `--navbar-height*` if the layout changes

### Internationalization

> **Important:** The template ships with multiple locales (`en`, `fr`, `es`, `ro`). When customizing, **delete the extra locales you don't need** and keep only `en.json` (or the locales the user specifically requests).
>
> **All user-visible text must use i18n** — no hardcoded strings in components. In Server Components use `const { dict } = await getCurrentDictionary()`, in Client Components use `const dict = useDict()`.

- [ ] `app/i18n/dictionaries/en.json` → translate every `landing.*`, `playground.*`, `nav.*`, `footer.*`, `error.*`, `notFound.*` string for the new product
- [ ] Delete extra locale files you don't need (e.g., `fr.json`, `es.json`, `ro.json`)
- [ ] In `app/i18n/config.ts`, remove imports and map entries for deleted locales
- [ ] (Only if user needs more locales) Add each new locale: create `app/i18n/dictionaries/<code>.json`, add import + map entry in `app/i18n/config.ts`
- [ ] Each dictionary file has a valid `meta: { flag, native }` — this is what the language switcher renders
- [ ] `app/config/site.ts` → every nav entry has a `labelKey`; when you add / rename one, also add the key to `NavLabelKey` and to `dict.nav` in every locale file

## 5. Delete demo-only code

These exist **only** to showcase the template. Remove unless the user explicitly wants them kept.

- [ ] `app/playground/` — entire directory
- [ ] `app/api/hello/` — delete or replace with real endpoints
- [ ] `app/stores/counter.ts`
- [ ] `app/components/FeatureCard.tsx` — if unused, delete
- [ ] `app/components/StatusBadge.tsx` — if unused, delete
- [ ] Landing-page buttons in `app/page.tsx` pointing to `/playground`, `/skills.md`, the GitHub repo, or "Deploy to Vercel"
- [ ] `/playground` entry in `siteConfig.nav` (`app/config/site.ts`)
- [ ] `/skills.md` entry in `siteConfig.nav` — **only if** you also remove the agent surface (see next section)

### `SKILLS.md` — rewrite (default) or delete

Choose one path:

- [ ] **Rewrite** `SKILLS.md` to describe the new app (routes, API, env, how an agent should interact). Use the template in `SKILLS.md` §5 as a starting point. Keep `app/skills.md/route.ts` and the `/skills.md` nav entry.
- [ ] **Delete** the agent surface entirely: remove `SKILLS.md`, `app/skills.md/`, the `/skills.md` entry in `siteConfig.nav`, and any landing-page button that links to `/skills.md`.

### `app/api/skills/` (empty stub)

- [ ] Keep the directory if you plan to expose an agent-facing API, otherwise delete it.

## 6. Environment & infrastructure

- [ ] `.env.example` → prune placeholders, add real variables, document each
- [ ] `compose.yaml` → no edits needed; set `DOCKER_PROJECT_NAME`, `DOCKER_CONTAINER_NAME`, `DOCKER_IMAGE_NAME`, `DOCKER_IMAGE_TAG`, `DOCKER_PORT` in `.env` to override the `nextjs-template` / `3000` defaults
- [ ] `Dockerfile` → no change needed unless you customize the build (multi-stage, standalone output, non-root runner with HEALTHCHECK)
- [ ] `.github/workflows/ci-cd.yml` → ready to use as-is; review only if you add tests or deploy targets
- [ ] `next.config.mjs` → tighten `images.remotePatterns` to your actual image hosts and add a page-level CSP header if your app needs one (SVG responses already get a strict per-image CSP)

## 7. Documentation

- [ ] `README.md` → rewrite for the new project (title, features, scripts, deployment)
- [ ] `AGENTS.md` → update the **Customization checklist**, **Demo code to remove**, and **Project structure** sections to reflect what actually remains. Keep it in sync as you add routes / stores / env variables.
- [ ] `CHECKLIST.md` (this file) → once every box is ticked, either delete it or replace it with a project-specific checklist (deploy steps, release process, etc.)

## 8. Sanity checks before handing off

Run these and fix anything that fails.

- [ ] `pnpm lint` — Biome auto-fix passes
- [ ] `pnpm build` — production build succeeds
- [ ] `pnpm dev` — app boots on http://localhost:3000 with no console errors
- [ ] Every route in `navLinks` resolves (no 404s)
- [ ] `/playground`, `/api/hello`, `/skills.md` return the expected result (200 if kept, 404 if deleted)
- [ ] Language switcher in the navbar cycles through every locale you ship and the visible strings actually change (no stale English)
- [ ] No leftover template branding — grep should return only intentional matches:

  ```bash
  rg -i "next\.js template|philogicae|fractal-nextjs|playground|counter"
  ```

- [ ] `AGENTS.md` customization checklist no longer lists items that have been completed
- [ ] `SKILLS.md` either describes the new app or has been deleted (with its route handler)
