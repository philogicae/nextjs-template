"use client"

import { LanguageSwitcher } from "@components/LanguageSwitcher"
import { ThemeToggle } from "@components/ThemeToggle"
import { siteConfig } from "@config/site"
import type { Dictionary } from "@i18n/config"
import { useDict } from "@i18n/LocaleProvider"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useCallback, useEffect, useRef, useState } from "react"

const navLinks = siteConfig.nav

/** Map a nav entry's `labelKey` to its translated label. */
function navLabel(
  dict: Dictionary,
  key: (typeof navLinks)[number]["labelKey"]
): string {
  return dict.nav[key]
}

interface NavLinkProps {
  href: string
  label: string
  isActive: boolean
  external: boolean
  onClick?: () => void
  mobile?: boolean
}

function NavLink({
  href,
  label,
  isActive,
  external,
  onClick,
  mobile = false,
}: NavLinkProps): React.ReactElement {
  const className = [
    mobile
      ? "px-2 py-1.5 rounded-[var(--radius-tags)]"
      : "px-3 py-1.5 rounded-[var(--radius-tags)]",
    "text-xs font-medium transition-colors tracking-[-0.13px]",
    isActive
      ? "bg-(--color-bg-surface) text-(--color-text-primary)"
      : "text-(--color-text-muted) hover:text-(--color-text-primary) hover:bg-(--color-bg-surface)/50",
  ].join(" ")

  if (external) {
    return (
      <a href={href} className={className}>
        {label}
      </a>
    )
  }
  return (
    <Link href={href} onClick={onClick} className={className}>
      {label}
    </Link>
  )
}

function NavList({
  pathname,
  dict,
  mobile = false,
  onItemClick,
}: {
  pathname: string
  dict: Dictionary
  mobile?: boolean
  onItemClick?: () => void
}): React.ReactElement {
  return (
    <>
      {navLinks.map((link) => (
        <NavLink
          key={link.href}
          href={link.href}
          label={navLabel(dict, link.labelKey)}
          isActive={pathname === link.href}
          external={"external" in link && link.external === true}
          onClick={onItemClick}
          mobile={mobile}
        />
      ))}
    </>
  )
}

function MobileMenuButton({
  open,
  onToggle,
  label,
  openLabel,
  closeLabel,
}: {
  open: boolean
  onToggle: () => void
  label: string
  openLabel: string
  closeLabel: string
}): React.ReactElement {
  return (
    <button
      type="button"
      aria-label={label}
      aria-expanded={open}
      onClick={onToggle}
      className="md:hidden inline-flex items-center justify-center w-8 h-8 rounded-(--radius-tags) text-(--color-text-muted) hover:text-(--color-text-primary) hover:bg-(--color-bg-surface)/50 transition-colors"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <title>{open ? closeLabel : openLabel}</title>
        {open ? (
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
}

function Logo(): React.ReactElement {
  return (
    <Link
      href="/"
      className="flex items-center gap-2 sm:gap-2.5 md:gap-3 hover:opacity-80 transition-opacity min-w-0"
    >
      <div className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-9 lg:h-9 shrink-0 relative logo-halo">
        <Image
          src="/images/logo.gif"
          alt=""
          fill
          className="object-contain"
          priority
          sizes="(max-width: 640px) 20px, (max-width: 768px) 24px, 28px"
          unoptimized
        />
      </div>
      <span className="text-sm sm:text-base md:text-lg font-semibold text-(--color-text-primary) tracking-tighter truncate -mt-0.5">
        {siteConfig.shortName}
      </span>
    </Link>
  )
}

/**
 * Fixed header with logo, navigation, theme toggle, and mobile menu.
 */
export function NavBar(): React.ReactElement {
  const pathname = usePathname()
  const dict = useDict()
  const [mobileOpen, setMobileOpen] = useState(false)
  const headerRef = useRef<HTMLElement>(null)

  // Close menu on route change.
  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  // Close menu when clicking/tapping outside.
  useEffect(() => {
    if (!mobileOpen) return
    const handle = (event: MouseEvent | TouchEvent) => {
      if (
        headerRef.current &&
        !headerRef.current.contains(event.target as Node)
      ) {
        setMobileOpen(false)
      }
    }
    document.addEventListener("mousedown", handle)
    document.addEventListener("touchstart", handle)
    return () => {
      document.removeEventListener("mousedown", handle)
      document.removeEventListener("touchstart", handle)
    }
  }, [mobileOpen])

  const toggleMobile = useCallback(() => setMobileOpen((v) => !v), [])
  const closeMobile = useCallback(() => setMobileOpen(false), [])

  return (
    <header ref={headerRef} className="sticky top-0 z-50 backdrop-blur-xl">
      <div className="flex items-center justify-between h-(--navbar-height-mobile) sm:h-(--navbar-height) px-3 sm:px-4 md:px-6 w-full">
        <Logo />

        <div className="flex items-center gap-1 sm:gap-2 md:gap-4">
          <nav className="hidden md:flex items-center gap-1">
            <NavList pathname={pathname} dict={dict} />
          </nav>

          <LanguageSwitcher />
          <ThemeToggle />

          <MobileMenuButton
            open={mobileOpen}
            onToggle={toggleMobile}
            label={dict.nav.toggleMenu}
            openLabel={dict.nav.openMenu}
            closeLabel={dict.nav.closeMenu}
          />
        </div>
      </div>

      {mobileOpen && (
        <nav className="md:hidden bg-(--color-bg-primary)/95 backdrop-blur-xl">
          <div className="flex flex-col px-3 py-2 gap-0.5">
            <NavList
              pathname={pathname}
              dict={dict}
              mobile
              onItemClick={closeMobile}
            />
          </div>
        </nav>
      )}
    </header>
  )
}
