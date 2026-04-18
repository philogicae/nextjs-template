/**
 * Theme Initialization Script
 *
 * This script runs before hydration to apply the correct theme from localStorage
 * or system preference. It prevents flash of incorrect theme (FOIT) by setting
 * the class before React renders. Must be rendered as an inline script in the <head>
 * for best results.
 *
 * Priority: localStorage > system preference > default (dark)
 */
export function getThemeScript(): string {
  return `
    (function() {
      try {
        let isDark = true; // default
        const stored = localStorage.getItem('theme-storage')
        if (stored) {
          const parsed = JSON.parse(stored)
          if (parsed && typeof parsed.isDark === 'boolean') {
            isDark = parsed.isDark
          }
        } else if (window.matchMedia) {
          // Check system preference if no stored preference
          const prefersDark = window.matchMedia('(prefers-color-scheme: dark)')
          if (prefersDark.matches) {
            isDark = true
          } else {
            const prefersLight = window.matchMedia('(prefers-color-scheme: light)')
            if (prefersLight.matches) {
              isDark = false
            }
          }
        }
        
        if (isDark) {
          document.documentElement.classList.add('dark')
        } else {
          document.documentElement.classList.remove('dark')
        }
      } catch (e) {
        // Fail silently if localStorage or matchMedia is unavailable
      }
    })()
  `
}
