import { useEffect, useState } from 'react'

const SECTIONS = [
  { id: 'hero', label: 'Home' },
  { id: 'timeline', label: 'Timeline' },
  { id: 'locations', label: 'Venues' },
  { id: 'gallery', label: 'Gallery' },
  { id: 'rsvp', label: 'RSVP' },
]

export default function SectionNav({ rootRef }) {
  const [active, setActive] = useState('hero')

  useEffect(() => {
    const root = rootRef?.current
    if (!root) return

    const ids = SECTIONS.map((s) => s.id)
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean)
    if (!els.length) return

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible?.target?.id) setActive(visible.target.id)
      },
      { root, threshold: [0.35, 0.55, 0.72] },
    )

    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [rootRef])

  useEffect(() => {
    const onKey = (e) => {
      const idx = SECTIONS.findIndex((s) => s.id === active)
      if (e.key === 'ArrowDown' && idx < SECTIONS.length - 1) {
        e.preventDefault()
        document.getElementById(SECTIONS[idx + 1].id)?.scrollIntoView({ behavior: 'smooth' })
      }
      if (e.key === 'ArrowUp' && idx > 0) {
        e.preventDefault()
        document.getElementById(SECTIONS[idx - 1].id)?.scrollIntoView({ behavior: 'smooth' })
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [active])

  const go = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <nav
      className="fixed right-4 sm:right-6 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-3"
      aria-label="Section navigation"
    >
      {SECTIONS.map((s) => {
        const on = active === s.id
        return (
          <button
            key={s.id}
            type="button"
            onClick={() => go(s.id)}
            className="group relative flex items-center justify-end outline-none"
            aria-current={on ? 'true' : undefined}
            aria-label={s.label}
          >
            <span
              className="absolute right-8 whitespace-nowrap rounded-full px-3 py-1 text-[10px] tracking-[0.25em] uppercase opacity-0 transition duration-300 group-hover:opacity-100 pointer-events-none"
              style={{
                background: 'rgba(20,18,16,0.88)',
                color: 'rgba(255,255,255,0.92)',
                border: '1px solid rgba(220,197,152,0.25)',
              }}
            >
              {s.label}
            </span>
            <span
              className={[
                'block rounded-full transition-all duration-300',
                on
                  ? 'bg-gradient-to-br from-gold-light to-teal shadow-[0_0_0_4px_rgba(184,146,74,0.25)]'
                  : 'bg-ink/20 dark:bg-paper/30',
              ].join(' ')}
              style={{ width: on ? 14 : 9, height: on ? 14 : 9 }}
            />
          </button>
        )
      })}
    </nav>
  )
}
