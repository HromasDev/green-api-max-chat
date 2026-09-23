import { Moon, Sun } from 'lucide-react'
import { useThemeStore } from '#/shared/lib/theme.store.ts'

export function ThemeToggle() {
  const theme = useThemeStore((state) => state.theme)
  const toggleTheme = useThemeStore((state) => state.toggleTheme)

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label="Переключить тему"
      className="cursor-pointer rounded-md p-1.5 text-slate-500 hover:bg-slate-100 dark:text-neutral-400 dark:hover:bg-neutral-800"
    >
      {theme === 'dark' ? (
        <Sun className="size-4" />
      ) : (
        <Moon className="size-4" />
      )}
    </button>
  )
}
