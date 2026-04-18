"use client"

import { Button } from "@heroui/react"
import { useThemeStore } from "@stores"
import { memo, useCallback } from "react"

/**
 * Sun Icon Component (memoized)
 */
const SunIcon = memo(function SunIcon(): React.ReactElement {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-4 h-4 sm:w-5 sm:h-5 text-(--color-text-accent)"
    >
      <title>Sun icon</title>
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1" x2="12" y2="3" />
      <line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" />
      <line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  )
})

/**
 * Moon Icon Component (memoized)
 */
const MoonIcon = memo(function MoonIcon(): React.ReactElement {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-4 h-4 sm:w-5 sm:h-5 text-(--color-text-secondary)"
    >
      <title>Moon icon</title>
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  )
})

/**
 * ThemeToggle Component
 *
 * Toggles between light and dark themes using Zustand state management.
 * Theme preference is persisted to localStorage.
 *
 * The initial theme class is set by a script in layout.tsx before hydration,
 * preventing flash of incorrect theme. This component only renders after
 * the store has rehydrated to avoid hydration mismatches.
 *
 * Performance optimizations:
 * - Uses Zustand selectors to only subscribe to needed state
 * - Memoized icon components to prevent unnecessary re-renders
 * - useCallback for the toggle handler
 *
 * @example
 * <ThemeToggle />
 */
export function ThemeToggle(): React.ReactElement {
  // Use selectors to only subscribe to specific state slices
  // This prevents re-renders when other store properties change
  const isDark = useThemeStore((state) => state.isDark)
  const _hasHydrated = useThemeStore((state) => state._hasHydrated)
  const toggleTheme = useThemeStore((state) => state.toggleTheme)

  // Memoize the toggle handler
  const handleToggle = useCallback(() => {
    toggleTheme()
  }, [toggleTheme])

  // Prevent hydration mismatch by rendering a placeholder until rehydrated
  if (!_hasHydrated) {
    return (
      <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-md bg-(--color-bg-surface)" />
    )
  }

  return (
    <Button
      isIconOnly
      variant="ghost"
      size="sm"
      onPress={handleToggle}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className="h-8 w-8 sm:h-10 sm:w-10 min-w-0"
    >
      {isDark ? <SunIcon /> : <MoonIcon />}
    </Button>
  )
}
