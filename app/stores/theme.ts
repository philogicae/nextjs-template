import { create } from "zustand"
import { persist } from "zustand/middleware"

/**
 * Theme State Interface
 */
interface ThemeState {
  /** Current theme mode */
  isDark: boolean
  /** Whether the component has mounted (for hydration safety) */
  mounted: boolean
  /** Actions */
  toggleTheme: () => void
  setTheme: (isDark: boolean) => void
  setMounted: (mounted: boolean) => void
}

/**
 * Theme Store
 *
 * Manages the application's theme state with localStorage persistence.
 * Uses Zustand's persist middleware to save theme preference across sessions.
 *
 * @example
 * const { isDark, toggleTheme } = useThemeStore()
 * const theme = useThemeStore(state => state.isDark)
 */
export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      isDark: true,
      mounted: false,
      toggleTheme: () =>
        set((state) => {
          const newTheme = !state.isDark
          // Sync with document class for immediate UI update
          if (typeof document !== "undefined") {
            const html = document.documentElement
            if (newTheme) {
              html.classList.add("dark")
            } else {
              html.classList.remove("dark")
            }
          }
          return { isDark: newTheme }
        }),
      setTheme: (isDark: boolean) =>
        set(() => {
          // Sync with document class for immediate UI update
          if (typeof document !== "undefined") {
            const html = document.documentElement
            if (isDark) {
              html.classList.add("dark")
            } else {
              html.classList.remove("dark")
            }
          }
          return { isDark }
        }),
      setMounted: (mounted: boolean) => set({ mounted }),
    }),
    {
      name: "theme-storage",
      // Only persist the theme preference, not the mounted state
      partialize: (state) => ({ isDark: state.isDark }),
    }
  )
)

/**
 * Hook to initialize theme from localStorage on mount
 * Call this in your root layout or app component
 */
export function useInitTheme(): void {
  const { isDark, setMounted } = useThemeStore()

  // Sync on mount
  if (typeof document !== "undefined") {
    const html = document.documentElement
    if (isDark) {
      html.classList.add("dark")
    } else {
      html.classList.remove("dark")
    }
  }

  // Mark as mounted for hydration safety
  setMounted(true)
}
