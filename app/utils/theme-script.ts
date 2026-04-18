/**
 * Theme Initialization Script
 *
 * This script runs before hydration to apply the correct theme from localStorage.
 * It prevents flash of incorrect theme (FOIT) by setting the class before React renders.
 * Must be rendered as an inline script in the <head> for best results.
 */
export function getThemeScript(): string {
  return `
    (function() {
      try {
        const stored = localStorage.getItem('theme-storage')
        if (stored) {
          const parsed = JSON.parse(stored)
          if (parsed && typeof parsed.isDark === 'boolean') {
            if (parsed.isDark) {
              document.documentElement.classList.add('dark')
            } else {
              document.documentElement.classList.remove('dark')
            }
          }
        }
      } catch (e) {
        // Fail silently if localStorage is unavailable
      }
    })()
  `
}
