"use client"

import { ThemeToggle } from "@components/ThemeToggle"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"

/**
 * Navigation links configuration
 */
const navLinks = [
  { href: "/", label: "Home" },
  { href: "/test", label: "Test" },
]

/**
 * Navbar component
 *
 * Fixed header with logo, navigation links (right-aligned), and theme toggle.
 * Includes a mobile hamburger menu for small screens.
 */
export function NavBar(): React.ReactElement {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-(--color-bg-primary)/80 backdrop-blur-xl border-b border-(--color-border-default)">
      <div className="flex items-center justify-between h-(--navbar-height) px-4 md:px-6 lg:px-8 w-full">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 sm:gap-3 hover:opacity-80 transition-opacity min-w-0"
        >
          <div className="w-9 h-9 sm:w-10 sm:h-10 shrink-0 rounded-xl bg-[#0a0f1a] border-2 border-(--color-border-default) flex items-center justify-center overflow-hidden">
            <Image
              src="/images/logo.gif"
              alt=""
              width={36}
              height={36}
              className="block"
              priority
              unoptimized
            />
          </div>
          <span className="text-lg sm:text-xl font-medium text-(--color-text-primary) leading-none truncate">
            Next.js Template
          </span>
        </Link>

        {/* Right side: Nav + Theme + Mobile Toggle */}
        <div className="flex items-center gap-2 sm:gap-4">
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-(--color-bg-surface) text-(--color-text-primary)"
                      : "text-(--color-text-secondary) hover:text-(--color-text-primary) hover:bg-(--color-bg-surface)/50"
                  }`}
                >
                  {link.label}
                </Link>
              )
            })}
          </nav>

          <ThemeToggle />

          {/* Mobile menu button */}
          <button
            type="button"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
            className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg text-(--color-text-secondary) hover:text-(--color-text-primary) hover:bg-(--color-bg-surface)/50 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <title>{mobileOpen ? "Close menu" : "Open menu"}</title>
              {mobileOpen ? (
                <>
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </>
              ) : (
                <>
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </>
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile nav dropdown */}
      {mobileOpen && (
        <nav className="md:hidden border-t border-(--color-border-default) bg-(--color-bg-primary)/95 backdrop-blur-xl">
          <div className="flex flex-col px-4 py-3 gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                    isActive
                      ? "bg-(--color-bg-surface) text-(--color-text-primary)"
                      : "text-(--color-text-secondary) hover:text-(--color-text-primary) hover:bg-(--color-bg-surface)/50"
                  }`}
                >
                  {link.label}
                </Link>
              )
            })}
          </div>
        </nav>
      )}
    </header>
  )
}
