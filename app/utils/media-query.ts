"use client"

import { useEffect, useState } from "react"

/**
 * useMediaQuery Hook
 *
 * Reactively tracks CSS media query matches.
 * Useful for responsive design logic in components.
 *
 * @example
 * const isMobile = useMediaQuery('(max-width: 768px)')
 * const prefersDark = useMediaQuery('(prefers-color-scheme: dark)')
 *
 * @param query - CSS media query string
 * @returns Boolean indicating if the media query matches
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    // Check if window is available (SSR safety)
    if (typeof window === "undefined") {
      return
    }

    const media = window.matchMedia(query)

    // Set initial value
    setMatches(media.matches)

    // Create listener
    const listener = (event: MediaQueryListEvent): void => {
      setMatches(event.matches)
    }

    // Add listener (with fallback for older browsers)
    if (media.addEventListener) {
      media.addEventListener("change", listener)
    } else {
      // Legacy fallback
      media.addListener(listener)
    }

    // Cleanup
    return () => {
      if (media.removeEventListener) {
        media.removeEventListener("change", listener)
      } else {
        // Legacy fallback
        media.removeListener(listener)
      }
    }
  }, [query])

  return matches
}

/**
 * Predefined breakpoint queries for common use cases
 */
export const breakpoints = {
  sm: "(min-width: 640px)",
  md: "(min-width: 768px)",
  lg: "(min-width: 1024px)",
  xl: "(min-width: 1280px)",
  "2xl": "(min-width: 1536px)",
} as const

/**
 * useBreakpoint Hook
 *
 * Convenience hook for tracking common breakpoints.
 *
 * @example
 * const isMd = useBreakpoint('md')
 * const isDesktop = useBreakpoint('lg')
 */
export function useBreakpoint(breakpoint: keyof typeof breakpoints): boolean {
  return useMediaQuery(breakpoints[breakpoint])
}
