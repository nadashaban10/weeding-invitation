export default function Footer() {
  return (
    <footer
      className="py-16 px-6 text-center animate-fade-up"
      style={{ borderTop: '1px solid rgba(156, 122, 69, 0.18)' }}
    >
      <h2
        className="font-serif text-ink mb-3"
        style={{ fontSize: '32px', fontWeight: 300 }}
      >
        Sophia &amp; Oliver
      </h2>
      <p className="text-[11px] tracking-[0.4em] uppercase text-dim mb-8">
        20 · 05 · 2026
      </p>
      <p className="text-sm text-muted tracking-wide">
        With love, we cannot wait to celebrate with you.
      </p>
      <p className="text-[11px] text-dim tracking-wide mt-10">
        Digital Wedding Invitation · Built with React &amp; Tailwind CSS
      </p>
    </footer>
  )
}
