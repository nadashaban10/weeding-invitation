const SECTIONS = ['hero', 'story', 'details', 'gallery', 'rsvp']

export default function Nav({ active }) {
  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav className="fixed right-6 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-50">
      {SECTIONS.map((s) => (
        <button
          key={s}
          onClick={() => scrollTo(s)}
          title={s}
          className={`nav-dot ${active === s ? 'active' : ''}`}
          aria-label={`Go to ${s}`}
        />
      ))}
    </nav>
  )
}
