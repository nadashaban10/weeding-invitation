const EVENTS = [
  {
    icon: '♦',
    label: 'Ceremony',
    time: '16:00',
    lines: ['Villa del Sole Chapel', 'Via delle Colline 12', 'Montepulciano, Siena'],
    note: 'Smart elegant attire requested',
    image: '/gallery/location1.jpg',
    mapUrl: 'https://www.google.com/maps?q=Montepulciano%2C%20Siena%2C%20Italy&z=14',
  },
  {
    icon: '◈',
    label: 'Reception',
    time: '18:30',
    lines: ['Villa del Sole Gardens', 'Cocktails, dinner & dancing', 'Open air under the stars'],
    note: 'Late night transportation provided',
    image: '/gallery/location2.jpeg',
    mapUrl: 'https://www.google.com/maps?q=Villa%20del%20Sole%20Tuscany%20Italy&z=14',
  },
]

const EXTRAS = [
  {
    icon: '⌂',
    label: 'Accommodation',
    text: 'A room block has been reserved at Hotel Bellavista (5 min walk). Quote "Sophia & Oliver" for the preferred rate.',
  },
  {
    icon: '✈',
    label: 'Getting There',
    text: 'Nearest airports: Florence (1.5h) or Rome Fiumicino (2.5h). Shuttle service available from both on the wedding day.',
  },
  {
    icon: '♪',
    label: 'Music',
    text: 'The evening will feature a live string quartet for the ceremony, followed by a jazz ensemble for dinner.',
  },
]

export default function Details() {
  return (
    <section
      id="details"
      className="py-24 px-6 animate-fade-up"
      style={{
        background:
          'radial-gradient(900px 420px at 50% 0%, rgba(227, 201, 140, 0.16) 0%, transparent 62%)',
      }}
    >
      <div className="max-w-5xl mx-auto">
        <div className="divider mb-16">The Celebration</div>

        {/* Event cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {EVENTS.map((ev, i) => (
            <div
              key={i}
              className={`animate-fade-up anim-delay-${i + 1} rounded-[28px] overflow-hidden`}
              style={{
                border: '1px solid rgba(184, 138, 59, 0.18)',
                background: 'rgba(255,255,255,0.74)',
                boxShadow: '0 18px 60px rgba(18,16,14,0.10)',
              }}
            >
              <div className="relative">
                <img
                  src={ev.image}
                  alt={`${ev.label} location`}
                  className="w-full h-[220px] object-cover"
                  loading="lazy"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      'linear-gradient(180deg, rgba(18,16,14,0.06), rgba(18,16,14,0.22))',
                  }}
                />
                <div className="absolute bottom-4 left-5 right-5 flex items-end justify-between">
                  <div>
                    <div className="text-[10px] tracking-[0.45em] uppercase text-white/85 mb-2">
                      {ev.label}
                    </div>
                    <div className="font-serif text-white" style={{ fontSize: '40px', fontWeight: 300 }}>
                      {ev.time}
                    </div>
                  </div>
                  <div className="text-gold text-2xl">{ev.icon}</div>
                </div>
              </div>

              <div className="p-8 sm:p-9">
                {ev.lines.map((l, j) => (
                  <p key={j} className="text-sm text-muted leading-loose text-center md:text-left">
                    {l}
                  </p>
                ))}

                <div className="mt-6 flex justify-center md:justify-start">
                  <a href={ev.mapUrl} target="_blank" rel="noreferrer">
                    <button type="button" className="outline-btn px-7">
                      Open in Google Maps
                    </button>
                  </a>
                </div>

                <p
                  className="mt-6 text-xs text-dim italic pt-4 text-center md:text-left"
                  style={{ borderTop: '1px solid rgba(184, 138, 59, 0.16)' }}
                >
                  {ev.note}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Extras */}
        <div
          className="animate-fade-up anim-delay-3 p-9"
          style={{
            background: 'rgba(255,255,255,0.7)',
            border: '1px solid rgba(184, 138, 59, 0.18)',
          }}
        >
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {EXTRAS.map((item, i) => (
              <div key={i} className="flex gap-4 items-start">
                <div className="detail-icon">
                  <span className="text-gold text-sm">{item.icon}</span>
                </div>
                <div>
                  <p className="text-[11px] tracking-[0.3em] uppercase text-gold mb-2">
                    {item.label}
                  </p>
                  <p className="text-xs text-muted leading-loose">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
