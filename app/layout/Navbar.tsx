"use client"

import { ThemeToggle } from "@components/ThemeToggle"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react"

/** Navigation links defined outside component to prevent re-creation. */
const navLinks = [
  { href: "/", label: "Home" },
  { href: "/playground", label: "Playground" },
  { href: "/skills.md", label: "SKILLS.md" },
] as const

interface NavLinkProps {
  href: string
  label: string
  isActive: boolean
  isExternalRoute: boolean
  onClick?: () => void
  mobile?: boolean
}

const NavLink = memo(function NavLink({
  href,
  label,
  isActive,
  isExternalRoute,
  onClick,
  mobile = false,
}: NavLinkProps): React.ReactElement {
  const baseClasses = mobile
    ? "px-3 py-2 rounded-md text-sm font-medium transition-colors"
    : "px-4 py-2 rounded-lg text-sm font-medium transition-colors"

  const activeClasses = isActive
    ? "bg-(--color-bg-surface) text-(--color-text-primary)"
    : "text-(--color-text-secondary) hover:text-(--color-text-primary) hover:bg-(--color-bg-surface)/50"

  const linkClasses = `${baseClasses} ${activeClasses}`

  if (isExternalRoute) {
    return (
      <a href={href} className={linkClasses}>
        {label}
      </a>
    )
  }

  return (
    <Link href={href} onClick={onClick} className={linkClasses}>
      {label}
    </Link>
  )
})

interface MobileMenuButtonProps {
  mobileOpen: boolean
  onToggle: () => void
}

const MobileMenuButton = memo(function MobileMenuButton({
  mobileOpen,
  onToggle,
}: MobileMenuButtonProps): React.ReactElement {
  return (
    <button
      type="button"
      aria-label="Toggle navigation menu"
      aria-expanded={mobileOpen}
      onClick={onToggle}
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
  )
})

interface MobileNavProps {
  pathname: string
  onClose: () => void
}

const MobileNav = memo(function MobileNav({
  pathname,
  onClose,
}: MobileNavProps): React.ReactElement {
  const links = useMemo(
    () =>
      navLinks.map((link) => ({
        ...link,
        isActive: pathname === link.href,
        isExternalRoute: link.href === "/skills.md",
      })),
    [pathname]
  )

  return (
    <nav className="md:hidden border-t border-(--color-border-default) bg-(--color-bg-primary)/95 backdrop-blur-xl">
      <div className="flex flex-col px-3 py-2 gap-0.5">
        {links.map((link) => (
          <NavLink
            key={link.href}
            href={link.href}
            label={link.label}
            isActive={link.isActive}
            isExternalRoute={link.isExternalRoute}
            onClick={onClose}
            mobile
          />
        ))}
      </div>
    </nav>
  )
})

interface DesktopNavProps {
  pathname: string
}

const DesktopNav = memo(function DesktopNav({
  pathname,
}: DesktopNavProps): React.ReactElement {
  const links = useMemo(
    () =>
      navLinks.map((link) => ({
        ...link,
        isActive: pathname === link.href,
        isExternalRoute: link.href === "/skills.md",
      })),
    [pathname]
  )

  return (
    <nav className="hidden md:flex items-center gap-1">
      {links.map((link) => (
        <NavLink
          key={link.href}
          href={link.href}
          label={link.label}
          isActive={link.isActive}
          isExternalRoute={link.isExternalRoute}
        />
      ))}
    </nav>
  )
})

const Logo = memo(function Logo(): React.ReactElement {
  return (
    <Link
      href="/"
      className="flex items-center gap-1.5 sm:gap-2 md:gap-3 hover:opacity-80 transition-opacity min-w-0"
    >
      <div className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 shrink-0 rounded-md sm:rounded-lg md:rounded-xl bg-[#0a0f1a] border-2 border-(--color-border-default) flex items-center justify-center overflow-hidden relative">
        <Image
          src="/images/logo.gif"
          alt=""
          fill
          className="object-contain p-0.5"
          priority
          unoptimized
        />
      </div>
      <span className="text-xs sm:text-base md:text-xl font-medium text-(--color-text-primary) leading-none truncate">
        Next.js Template
      </span>
    </Link>
  )
})

/**
 * Fixed header with logo, navigation, theme toggle, and mobile menu.
 *
 * Performance optimizations:
 * - memo() for pure components
 * - useCallback for event handlers
 * - useMemo for computed link states
 * - Separate mobile/desktop nav components
 */
export function NavBar(): React.ReactElement {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)
  const headerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  // Close menu when clicking outside
  useEffect(() => {
    if (!mobileOpen) return

    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (
        headerRef.current &&
        !headerRef.current.contains(event.target as Node)
      ) {
        setMobileOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    document.addEventListener("touchstart", handleClickOutside)

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
      document.removeEventListener("touchstart", handleClickOutside)
    }
  }, [mobileOpen])

  const toggleMobile = useCallback(() => {
    setMobileOpen((v) => !v)
  }, [])

  const closeMobile = useCallback(() => {
    setMobileOpen(false)
  }, [])

  return (
    <header
      ref={headerRef}
      className="fixed top-0 left-0 right-0 z-50 bg-(--color-bg-primary)/80 backdrop-blur-xl border-b border-(--color-border-default)"
    >
      <div className="flex items-center justify-between h-(--navbar-height-mobile) sm:h-(--navbar-height) px-3 sm:px-4 md:px-6 w-full">
        <Logo />

        <div className="flex items-center gap-1 sm:gap-2 md:gap-4">
          <DesktopNav pathname={pathname} />

          <ThemeToggle />

          <MobileMenuButton mobileOpen={mobileOpen} onToggle={toggleMobile} />
        </div>
      </div>

      {mobileOpen && <MobileNav pathname={pathname} onClose={closeMobile} />}
    </header>
  )
}
