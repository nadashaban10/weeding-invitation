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
        className="flex h-11 min-h-[44px] w-11 min-w-[44px] items-center justify-center rounded-full border border-gold/30 bg-white/80 text-xl leading-none text-ink shadow-sm backdrop-blur transition hover:bg-white sm:h-12 sm:min-h-[48px] sm:w-12 sm:min-w-[48px] sm:text-2xl dark:border-gold/25 dark:bg-teal/90 dark:text-paper dark:hover:bg-teal"
        aria-pressed={isDark}
        aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
        title={isDark ? 'Light mode' : 'Dark mode'}
      >
        <span className="relative top-px" aria-hidden>
          {isDark ? '☀' : '☾'}
        </span>
      </button>
    </div>
  )
}
