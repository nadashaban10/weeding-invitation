const EVENTS = [
  {
    label: 'Nikah',
    time: '17:00',
    lines: ['Family masjid — Al-Rehab', 'Short ceremony followed by dua'],
    note: 'Kindly arrive ten minutes early.',
    image: '/gallery/01.svg',
    mapUrl: 'https://www.google.com/maps?q=New+Cairo+Egypt&z=13',
  },
  {
    label: 'Walima',
    time: '19:30',
    lines: ['Garden Pavilion', 'Dinner under the stars — families welcome'],
    note: 'Modest elegant attire appreciated.',
    image: '/gallery/02.svg',
    mapUrl: 'https://www.google.com/maps?q=Garden+Pavilion+New+Cairo&z=13',
  },
]

export default function Locations() {
  return (
    <section
      id="locations"
      className="snap-panel flex flex-col items-center justify-center bg-transparent px-5 sm:px-8 py-14"
    >
      <div className="w-full max-w-5xl mx-auto">
        <div className="divider mb-10 sm:mb-12 animate-fade-up">The venues</div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {EVENTS.map((ev, i) => (
            <article
              key={ev.label}
              className={`rounded-[28px] overflow-hidden animate-fade-up border border-gold/22 bg-white/82 shadow-[0_22px_60px_rgba(20,18,16,0.08)] transition-[transform,box-shadow] duration-[450ms] ease-out hover:-translate-y-1 hover:shadow-[0_28px_70px_rgba(20,18,16,0.12)] dark:border-gold/25 dark:bg-teal/35 dark:shadow-[0_22px_60px_rgba(0,0,0,0.35)] dark:hover:shadow-[0_28px_70px_rgba(0,0,0,0.45)] ${
                i === 0 ? 'anim-delay-1' : 'anim-delay-2'
              }`}
            >
              <div
                className="relative p-3 sm:p-4 dark:bg-gradient-to-b dark:from-teal/50 dark:to-teal/30"
                style={{ background: 'linear-gradient(180deg,#ebe6dd,#f7f4ee)' }}
              >
                <div
                  className="relative rounded-[22px] overflow-hidden"
                  style={{
                    border: '3px double rgba(184, 146, 74, 0.45)',
                    boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.6)',
                  }}
                >
                  <img src={ev.image} alt="" className="w-full h-[200px] sm:h-[220px] object-cover" loading="lazy" />
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background: 'linear-gradient(180deg, rgba(20,18,16,0.05), rgba(20,18,16,0.35))',
                    }}
                  />
                  <div className="absolute bottom-4 left-5 right-5 flex items-end justify-between gap-3">
                    <div>
                      <p className="text-[10px] tracking-[0.42em] uppercase text-white/90 mb-1">{ev.label}</p>
                      <p className="font-serif text-white text-4xl font-light">{ev.time}</p>
                    </div>
                    <span className="text-gold-light/90 text-2xl" aria-hidden>
                      ✦
                    </span>
                  </div>
                </div>
              </div>

              <div className="px-7 sm:px-9 py-8 space-y-4 text-center md:text-left">
                {ev.lines.map((line) => (
                  <p key={line} className="text-sm text-muted leading-relaxed dark:text-paper/75">
                    {line}
                  </p>
                ))}
                <div className="flex justify-center md:justify-start pt-2">
                  <a href={ev.mapUrl} target="_blank" rel="noreferrer">
                    <button type="button" className="outline-btn">
                      Open in Maps
                    </button>
                  </a>
                </div>
                <p className="text-xs text-dim italic border-t border-gold/20 pt-5 dark:text-paper/55">{ev.note}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
