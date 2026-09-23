import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type Theme = 'light' | 'dark'

interface ThemeState {
  theme: Theme
  toggleTheme: () => void
}

function applyTheme(theme: Theme): void {
  document.documentElement.classList.toggle('dark', theme === 'dark')
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      theme: window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light',
      toggleTheme: () => {
        const next = get().theme === 'dark' ? 'light' : 'dark'
        applyTheme(next)
        set({ theme: next })
      },
    }),
    {
      name: 'green-api-theme',
      onRehydrateStorage: () => (state) => {
        if (state) applyTheme(state.theme)
      },
    },
  ),
)

applyTheme(useThemeStore.getState().theme)
