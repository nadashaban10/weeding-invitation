import { useTheme } from '../context/ThemeProvider'

export default function ThemeControls() {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <div
      className="fixed left-3 top-3 z-[101] flex flex-wrap items-center gap-2 sm:left-4 sm:top-4"
      role="toolbar"
      aria-label="Display theme"
    >
      <button
        type="button"
        onClick={toggleTheme}
        className="rounded-full border border-gold/30 bg-white/80 px-3 py-2 text-[10px] font-medium uppercase tracking-[0.2em] text-ink shadow-sm backdrop-blur transition hover:bg-white dark:border-gold/25 dark:bg-teal/90 dark:text-paper dark:hover:bg-teal"
        aria-pressed={isDark}
        aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
        title={isDark ? 'Light mode' : 'Dark mode'}
      >
        {isDark ? '☀' : '☾'}
      </button>
    </div>
  )
}
