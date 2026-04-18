import { create } from "zustand"
import { persist } from "zustand/middleware"

/**
 * Theme State Interface
 */
interface ThemeState {
  /** Current theme mode */
  isDark: boolean
  /** Whether the store has been rehydrated from storage */
  _hasHydrated: boolean
  /** Actions */
  toggleTheme: () => void
  setTheme: (isDark: boolean) => void
  setHasHydrated: (hasHydrated: boolean) => void
}

/**
 * Helper to sync theme class on document.documentElement
 */
function syncThemeClass(isDark: boolean): void {
  if (typeof document !== "undefined") {
    const html = document.documentElement
    if (isDark) {
      html.classList.add("dark")
    } else {
      html.classList.remove("dark")
    }
  }
}

/**
 * Theme Store
 *
 * Manages the application's theme state with localStorage persistence.
 * Uses Zustand's persist middleware to save theme preference across sessions.
 *
 * The theme script in layout.tsx sets the initial class before hydration,
 * preventing flash of incorrect theme.
 *
 * @example
 * const { isDark, toggleTheme } = useThemeStore()
 * const theme = useThemeStore(state => state.isDark)
 */
export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      isDark: true,
      _hasHydrated: false,
      toggleTheme: () => {
        const newTheme = !get().isDark
        syncThemeClass(newTheme)
        set({ isDark: newTheme })
      },
      setTheme: (isDark: boolean) => {
        syncThemeClass(isDark)
        set({ isDark })
      },
      setHasHydrated: (hasHydrated: boolean) => {
        set({ _hasHydrated: hasHydrated })
      },
    }),
    {
      name: "theme-storage",
      // Only persist the theme preference
      partialize: (state) => ({ isDark: state.isDark }),
      // Sync theme class after rehydration from localStorage
      onRehydrateStorage: () => (state) => {
        if (state) {
          syncThemeClass(state.isDark)
          state.setHasHydrated(true)
        }
      },
    }
  )
)
