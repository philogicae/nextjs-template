/**
 * Site-wide configuration — single source of truth for brand, links,
 * and navigation. Update values here instead of hunting through
 * `layout.tsx`, `Navbar.tsx`, `Footer.tsx`, `page.tsx`, and `manifest.json`.
 */

export interface NavLink {
  href: string
  label: string
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
  shortName: "Template",
  description:
    "A modern Next.js template with HeroUI, Tailwind CSS, and TypeScript",
  keywords: ["Next.js", "React", "TypeScript", "Tailwind CSS", "HeroUI"],
  url: "https://github.com/philogicae/nextjs-template",
  license: "MIT License",
  themeColor: {
    light: "#fbfaff",
    dark: "#07060d",
  },
  nav: [
    { href: "/", label: "Home" },
    { href: "/playground", label: "Playground" },
    { href: "/skills.md", label: "SKILLS.md", external: true },
  ] as const satisfies readonly NavLink[],
  social: [
    { label: "GitHub", href: "https://github.com/philogicae/nextjs-template" },
    { label: "X", href: "https://x.com/philogicae" },
  ] as const satisfies readonly SocialLink[],
} as const
