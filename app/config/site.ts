/**
 * Site-wide configuration — single source of truth for brand, links,
 * and navigation. Update values here instead of hunting through
 * `layout.tsx`, `Navbar.tsx`, `Footer.tsx`, `page.tsx`, and `manifest.json`.
 */

/**
 * Keys that must exist in `dict.nav` (see `app/i18n/dictionaries/*.json`).
 * Adding a new nav entry requires adding the matching translation key.
 */
export type NavLabelKey =
  | "home"
  | "playground"
  | "skills"
  | "openMenu"
  | "closeMenu"
  | "toggleMenu"
  | "language"
  | "themeToLight"
  | "themeToDark"
  | "themeToggle"

export interface NavLink {
  href: string
  /** Dictionary key used to resolve the display label per locale. */
  labelKey: NavLabelKey
  /**
   * When true, rendered with a plain `<a>` instead of `next/link`.
   * Use for route handlers (e.g. `/skills.md`) or absolute URLs.
   */
  external?: boolean
}

export interface SocialLink {
  label: string
  href: string
}

export const siteConfig = {
  name: "Next.js Template",
  shortName: "Next.js Template",
  description:
    "A modern Next.js template with HeroUI, Tailwind CSS, and TypeScript",
  keywords: ["Next.js", "React", "TypeScript", "Tailwind CSS", "HeroUI"],
  url: "https://fractal-nextjs.vercel.app/",
  license: "MIT License",
  themeColor: {
    light: "#fbfaff",
    dark: "#07060d",
  },
  nav: [
    { href: "/", labelKey: "home" },
    { href: "/playground", labelKey: "playground" },
    { href: "/skills.md", labelKey: "skills", external: true },
  ] as const satisfies readonly NavLink[],
  social: [
    { label: "GitHub", href: "https://github.com/philogicae/nextjs-template" },
    { label: "X", href: "https://x.com/philogicae" },
  ] as const satisfies readonly SocialLink[],
} as const
