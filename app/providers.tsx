"use client"

import { ThemeProvider } from "next-themes"

/**
 * Client-side providers tree.
 *
 * `next-themes` toggles the `dark` class on `<html>` and injects its own
 * pre-hydration script to prevent FOUC. HeroUI v3 reads theme via the same
 * class, so no dedicated provider is needed.
 *
 * See https://beta.heroui.com/docs/customization/dark-mode
 */
export function Providers({
  children,
}: {
  children: React.ReactNode
}): React.ReactElement {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </ThemeProvider>
  )
}
