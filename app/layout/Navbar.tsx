"use client"

import { ThemeToggle } from "@components/ThemeToggle"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"

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
 */
export function NavBar(): React.ReactElement {
  const pathname = usePathname()

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-(--navbar-height) bg-(--color-bg-primary)/80 backdrop-blur-xl border-b border-(--color-border-default)">
      <div className="flex items-center justify-between h-full px-4 md:px-6 lg:px-8 w-full">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-3 hover:opacity-80 transition-opacity"
        >
          <div className="w-10 h-10 rounded-xl bg-[#0a0f1a] border-2 border-(--color-border-default) flex items-center justify-center overflow-hidden">
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
          <span className="text-xl font-medium text-(--color-text-primary) leading-none">
            Template
          </span>
        </Link>

        {/* Right side: Nav + Theme */}
        <div className="flex items-center gap-4">
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
        </div>
      </div>
    </header>
  )
}
