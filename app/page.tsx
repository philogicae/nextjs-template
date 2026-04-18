"use client"

import { Container, FeatureCard } from "@components"
import { Button } from "@heroui/react"
import Link from "next/link"
import { useEffect, useState } from "react"

/**
 * Background Grid Component
 *
 * Subtle grid pattern + radial accent glow for visual depth.
 */
function BackgroundDecor(): React.ReactElement {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 overflow-hidden pointer-events-none"
    >
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: `linear-gradient(var(--color-text-accent) 1px, transparent 1px),
            linear-gradient(90deg, var(--color-text-accent) 1px, transparent 1px)`,
          backgroundSize: "80px 80px",
        }}
      />
      <div
        className="absolute left-1/2 top-[-10%] h-[500px] w-[500px] -translate-x-1/2 rounded-full blur-3xl opacity-20"
        style={{
          background:
            "radial-gradient(circle, var(--color-accent-cyan) 0%, transparent 70%)",
        }}
      />
    </div>
  )
}

/**
 * Landing Page Component
 *
 * Modern hero with animated elements, feature grid, and quick-start snippet.
 */
export default function LandingPage(): React.ReactElement {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div className="relative w-full bg-(--color-bg-primary) flex-1 flex flex-col">
      <BackgroundDecor />

      {/* Hero Section */}
      <section className="relative pt-[calc(var(--navbar-height)+var(--space-lg))] sm:pt-[calc(var(--navbar-height)+var(--space-xl))] pb-(--space-xl)">
        <Container size="md">
          {/* Eyebrow */}
          <div
            className={`flex justify-center mb-6 transition-all duration-700 ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-(--color-border-default) bg-(--color-bg-surface)/60 px-3 py-1 text-xs font-medium text-(--color-text-secondary)">
              <span className="h-1.5 w-1.5 rounded-full bg-(--color-accent-cyan) animate-pulse" />
              Next.js 16 &bull; React 19 &bull; Tailwind v4
            </span>
          </div>

          {/* Headline */}
          <h1
            className={`text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-center mb-6 text-(--color-text-primary) tracking-tight transition-all duration-700 delay-100 ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            Build Faster with{" "}
            <span className="bg-linear-to-r from-(--color-text-accent) to-cyan-400 bg-clip-text text-transparent">
              Modern Stack
            </span>
          </h1>

          {/* Subheadline */}
          <p
            className={`text-base sm:text-lg text-(--color-text-secondary) text-center mb-10 max-w-xl mx-auto leading-relaxed px-2 transition-all duration-700 delay-200 ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            A production-ready Next.js template with HeroUI, Zustand, and Biome.
            Start building in minutes.
          </p>

          {/* CTA Buttons */}
          <div
            className={`flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-stretch sm:items-center mb-14 sm:mb-16 transition-all duration-700 delay-300 ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <Link href="/test" className="w-full sm:w-auto">
              <Button
                size="lg"
                className="w-full sm:w-auto bg-(--color-accent-cyan) hover:bg-(--color-accent-cyan-hover) text-white font-medium shadow-lg shadow-(--color-accent-cyan)/20"
              >
                Try the Playground
              </Button>
            </Link>
            <a
              href="https://github.com/philogicae/nextjs-template"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto"
            >
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto border-(--color-border-default) hover:bg-(--color-bg-surface)"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="mr-2"
                >
                  <title>GitHub</title>
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                </svg>
                View on GitHub
              </Button>
            </a>
          </div>
        </Container>

        {/* Features */}
        <Container size="lg">
          <div
            className={`grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 transition-all duration-700 delay-500 ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            {features.map((feature) => (
              <FeatureCard
                key={feature.name}
                icon={feature.icon}
                name={feature.name}
                description={feature.description}
              />
            ))}
          </div>
        </Container>
      </section>

      {/* Quick Start Section */}
      <section className="relative pb-(--space-2xl)">
        <Container size="md">
          <div
            className={`mt-8 sm:mt-12 rounded-2xl border border-(--color-border-default) bg-(--color-bg-surface)/40 p-5 sm:p-6 transition-all duration-700 delay-700 ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <div className="flex items-center justify-between flex-wrap gap-2 mb-3">
              <h2 className="text-sm font-semibold text-(--color-text-primary) tracking-wide uppercase">
                Quick Start
              </h2>
              <span className="text-xs text-(--color-text-muted)">
                terminal
              </span>
            </div>
            <pre className="overflow-x-auto rounded-lg bg-(--color-bg-primary) border border-(--color-border-default) p-3 sm:p-4 text-xs sm:text-sm leading-relaxed text-(--color-text-secondary)">
              <code>
                <span className="text-(--color-text-accent)">git</span> clone
                https://github.com/philogicae/nextjs-template.git my-project
                {"\n"}
                <span className="text-(--color-text-accent)">cd</span>{" "}
                my-project
                {"\n"}
                <span className="text-(--color-text-accent)">pnpm</span> install
                {"\n"}
                <span className="text-(--color-text-accent)">pnpm</span> dev
              </code>
            </pre>
          </div>
        </Container>
      </section>
    </div>
  )
}

const features = [
  {
    name: "Next.js 16",
    icon: "▲",
    description: "App Router + Turbo",
  },
  {
    name: "React 19",
    icon: "⚛",
    description: "Server Components",
  },
  {
    name: "Tailwind 4",
    icon: "🌊",
    description: "CSS-first config",
  },
  {
    name: "HeroUI",
    icon: "🎨",
    description: "Accessible UI kit",
  },
  {
    name: "Biome",
    icon: "🛠️",
    description: "Lint & format",
  },
]
