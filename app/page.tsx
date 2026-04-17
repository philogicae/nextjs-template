"use client"

import { Button } from "@heroui/react"
import { useEffect, useState } from "react"

// Subtle grid pattern
function BackgroundGrid() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-[0.03]">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `linear-gradient(var(--color-text-accent) 1px, transparent 1px),
            linear-gradient(90deg, var(--color-text-accent) 1px, transparent 1px)`,
          backgroundSize: "80px 80px",
        }}
      />
    </div>
  )
}

export default function LandingPage() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div className="min-h-screen w-full bg-(--color-bg-primary) relative flex flex-col">
      <BackgroundGrid />

      {/* Hero Section */}
      <section className="relative flex-1 flex items-center justify-center pt-[calc(var(--navbar-height)+var(--space-xl))] pb-(--space-2xl) px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          {/* Badge */}
          <div
            className={`flex justify-center mb-8 transition-all duration-700 ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          />

          {/* Headline */}
          <h1
            className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-center mb-6 text-(--color-text-primary) tracking-tight transition-all duration-700 delay-100 ${
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
            className={`text-lg text-(--color-text-secondary) text-center mb-10 max-w-xl mx-auto leading-relaxed transition-all duration-700 delay-200 ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            A production-ready Next.js template with HeroUI and Biome.
            <br />
            Start building in minutes.
          </p>

          {/* CTA Buttons */}
          <div
            className={`flex flex-col sm:flex-row gap-4 justify-center mb-20 transition-all duration-700 delay-300 ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <Button
              variant="primary"
              size="lg"
              className="bg-(--color-accent-cyan) hover:bg-(--color-accent-cyan-hover) text-white font-medium"
            >
              Get Started
            </Button>
            <a
              href="https://github.com/philogicae/nextjs-template"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                variant="outline"
                size="lg"
                className="border-(--color-border-default) hover:bg-(--color-bg-surface) w-full sm:w-auto"
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

          {/* Features - Simplified */}
          <div
            className={`grid grid-cols-2 md:grid-cols-5 gap-4 max-w-3xl mx-auto transition-all duration-700 delay-500 ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            {features.map((feature) => (
              <div
                key={feature.name}
                className="text-center px-4 py-6 rounded-xl border border-(--color-border-default) bg-(--color-bg-surface)/50 hover:border-(--color-text-accent)/30 transition-colors"
              >
                <div className="text-2xl mb-2">{feature.icon}</div>
                <div className="font-medium text-(--color-text-primary) text-sm">
                  {feature.name}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-8 px-4 sm:px-6 lg:px-8 border-t border-(--color-border-default)">
        <div className="max-w-6xl mx-auto flex items-center justify-center gap-4 text-sm text-(--color-text-muted)">
          <span>MIT License</span>
          <span className="text-(--color-border-subtle)">•</span>
          <span>Built with Next.js</span>
        </div>
      </footer>
    </div>
  )
}

const features = [
  { name: "Next.js 16", icon: "▲" },
  { name: "React 19", icon: "⚛" },
  { name: "Tailwind 4", icon: "🌊" },
  { name: "HeroUI", icon: "🎨" },
  { name: "Biome", icon: "🛠️" },
]
