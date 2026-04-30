import Petals from './Petals'
import { useCountdown } from './useCountdown'
import { buildGoogleCalendarUrl, buildICS, downloadICS } from './calendar'
import WeddingCalendar from './WeddingCalendar'

// ── Edit your wedding date here ──────────────────────────────────────────────
const WEDDING_DATE = new Date('2026-05-20T16:00:00')
const END_DATE = new Date('2026-05-20T23:30:00')
const LOCATION = 'Villa del Sole · Tuscany, Italy'

function CountdownBlock({ label, value }) {
  return (
    <div className="countdown-card">
      <div
        className="font-serif text-gold"
        style={{ fontSize: 'clamp(28px, 7vw, 40px)', fontWeight: 300, lineHeight: 1 }}
      >
        {String(value).padStart(2, '0')}
      </div>
      <div className="text-[9px] sm:text-[10px] tracking-[0.32em] uppercase text-dim mt-1.5">
        {label}
      </div>
    </div>
  )
}

export default function Hero() {
  const { d, h, m, s } = useCountdown(WEDDING_DATE.getTime())
  const googleUrl = buildGoogleCalendarUrl({
    title: 'Sophia & Oliver — Wedding',
    start: WEDDING_DATE,
    end: END_DATE,
    location: LOCATION,
    description: 'We can’t wait to celebrate with you.',
  })

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center px-6 py-16 overflow-hidden"
      style={{
        background:
          'radial-gradient(900px 520px at 50% 0%, rgba(227, 201, 140, 0.18) 0%, transparent 65%)',
      }}
    >
      <Petals />

      {/* Eyebrow */}
      <p className="animate-fade-in anim-delay-1 text-[10px] tracking-[0.5em] uppercase text-dim mb-8">
        Together with their families
      </p>

      {/* Hero card */}
      <div
        className="animate-fade-up anim-delay-2 w-full max-w-[520px] md:max-w-5xl rounded-[34px] overflow-hidden"
        style={{
          border: '1px solid rgba(184, 138, 59, 0.18)',
          background:
            'linear-gradient(180deg, rgba(255,255,255,0.82), rgba(255,250,246,0.78))',
          boxShadow: '0 30px 90px rgba(28,25,23,0.12)',
        }}
      >
        <div className="grid grid-cols-1 md:grid-cols-[420px_1fr]">
          <div className="relative">
            <img
              src="/images/brideandgroom.jpeg"
              alt="Bride and groom"
              className="w-full h-[260px] sm:h-[320px] md:h-full object-cover"
              loading="eager"
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  'linear-gradient(180deg, rgba(28,25,23,0.00), rgba(28,25,23,0.14))',
              }}
            />
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
              <div className="text-[10px] tracking-[0.5em] uppercase text-white/90">Wedding Day</div>
              <div className="text-[10px] tracking-[0.4em] uppercase text-white/80">20 · 05 · 2026</div>
            </div>
          </div>

          <div className="p-9 sm:p-10 md:p-12 text-center md:text-left">
            {/* Names */}
            <h1
              className="font-serif leading-tight"
              style={{ fontSize: 'clamp(46px, 6vw, 72px)', fontWeight: 300 }}
            >
              Sophia <span className="text-gold italic">&amp;</span> Oliver
            </h1>

            {/* Subtitle line */}
            <div className="mt-5 mb-7 flex items-center gap-4 justify-center md:justify-start">
              <div
                className="w-12 h-px"
                style={{
                  background: 'linear-gradient(to right, transparent, rgba(184,138,59,0.75))',
                }}
              />
              <p className="font-serif text-[rgba(123,90,34,1)] italic text-sm tracking-[0.3em]">
                request the pleasure of your company
              </p>
              <div
                className="w-12 h-px"
                style={{
                  background: 'linear-gradient(to left, transparent, rgba(184,138,59,0.75))',
                }}
              />
            </div>

            {/* Venue */}
            <div className="mb-8">
              <p className="font-serif text-[20px] tracking-[0.08em] text-ink mb-1">
                20 May, 2026 · 16:00
              </p>
              <p className="text-[12px] tracking-[0.4em] uppercase text-dim">{LOCATION}</p>
            </div>

            {/* Mini calendar */}
            <div className="mb-8">
              <WeddingCalendar date={WEDDING_DATE} />
            </div>

            {/* Countdown + calendar */}
            <div className="animate-fade-up anim-delay-3">
              <div className="flex gap-2 sm:gap-3 flex-wrap justify-center md:justify-start">
                <CountdownBlock label="Days" value={d} />
                <CountdownBlock label="Hours" value={h} />
                <CountdownBlock label="Minutes" value={m} />
                <CountdownBlock label="Seconds" value={s} />
              </div>

              <div className="mt-6 flex gap-3 flex-wrap justify-center md:justify-start">
                <a href={googleUrl} target="_blank" rel="noreferrer">
                  <button className="outline-btn w-full sm:w-auto">Add to Google Calendar</button>
                </a>
                <button
                  className="outline-btn w-full sm:w-auto"
                  onClick={() => {
                    const ics = buildICS({
                      title: 'Sophia & Oliver — Wedding',
                      start: WEDDING_DATE,
                      end: END_DATE,
                      location: LOCATION,
                      description: 'We can’t wait to celebrate with you.',
                    })
                    downloadICS('wedding-invitation.ics', ics)
                  }}
                >
                  Download Calendar (.ics)
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-9 flex flex-col items-center gap-2 text-dim text-[11px] tracking-[0.2em] uppercase">
        <span>Scroll</span>
        <div
          className="w-px h-8"
          style={{ background: 'linear-gradient(to bottom, rgba(156,122,69,0.6), transparent)' }}
        />
      </div>
    </section>
  )
}
