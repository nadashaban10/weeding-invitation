import { useCountdown } from './useCountdown'
import { buildGoogleCalendarUrl } from './calendar'
import WeddingCalendar from './WeddingCalendar'
import {
  COUPLE_DISPLAY,
  WEDDING_DATE,
  END_DATE,
  LOCATION_CALENDAR,
  CALENDAR_TITLE,
  CALENDAR_DESCRIPTION,
} from '../constants'

function CountCell({ label, value }) {
  return (
    <div className="countdown-cell">
      <div className="font-serif text-teal dark:text-gold-light" style={{ fontSize: 'clamp(26px, 6vw, 38px)', fontWeight: 300 }}>
        {String(value).padStart(2, '0')}
      </div>
      <div className="text-[9px] sm:text-[10px] tracking-[0.32em] uppercase text-dim mt-1 dark:text-paper/55">
        {label}
      </div>
    </div>
  )
}

export default function Hero({ imageSrc = '/images/couple.svg' }) {
  const nameParts = COUPLE_DISPLAY.split('&').map((s) => s.trim())
  const [nameA, nameB] = [nameParts[0] ?? COUPLE_DISPLAY, nameParts[1] ?? '']

  const { d, h, m, s } = useCountdown(WEDDING_DATE.getTime())
  const googleUrl = buildGoogleCalendarUrl({
    title: CALENDAR_TITLE,
    start: WEDDING_DATE,
    end: END_DATE,
    location: LOCATION_CALENDAR,
    description: CALENDAR_DESCRIPTION,
  })

  return (
    <section
      id="hero"
      className="snap-panel paper-bg flex flex-col items-center justify-center px-5 sm:px-8 py-12 sm:py-16 relative"
    >
      <p className="text-[10px] tracking-[0.48em] uppercase text-teal/80 mb-6 sm:mb-8 animate-fade-in text-center dark:text-gold-light/85">
        With gratitude · together with our families
      </p>

      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-[minmax(0,420px)_1fr] gap-10 lg:gap-14 items-center">
        <div className="relative flex justify-center lg:justify-end animate-fade-up">
          <div className="relative w-full max-w-[380px]">
            <span className="frame-ornament top-0 left-0 border-t-2 border-l-2 rounded-tl-[4px]" aria-hidden />
            <span className="frame-ornament top-0 right-0 border-t-2 border-r-2 rounded-tr-[4px]" aria-hidden />
            <span className="frame-ornament bottom-0 left-0 border-b-2 border-l-2 rounded-bl-[4px]" aria-hidden />
            <span className="frame-ornament bottom-0 right-0 border-b-2 border-r-2 rounded-br-[4px]" aria-hidden />

            <div
              className="relative p-[10px] sm:p-3 rounded-[8px] animate-float-slow"
              style={{
                background: 'linear-gradient(145deg, rgba(30,61,58,0.12), rgba(184,146,74,0.15))',
                boxShadow: '0 28px 80px rgba(20,18,16,0.12)',
              }}
            >
              <div
                className="p-[6px] rounded-[6px]"
                style={{
                  border: '2px solid rgba(184, 146, 74, 0.55)',
                  boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.55)',
                }}
              >
                <div className="overflow-hidden rounded-[4px] relative">
                  <img
                    src={imageSrc}
                    alt={COUPLE_DISPLAY}
                    className="w-full aspect-[3/4] object-cover transition-transform duration-[1.2s] ease-out hover:scale-[1.02]"
                    loading="eager"
                  />
                  <div
                    className="pointer-events-none absolute inset-0"
                    style={{
                      background: 'linear-gradient(180deg, rgba(20,18,16,0) 55%, rgba(20,18,16,0.25) 100%)',
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center space-y-7 animate-fade-up anim-delay-2 lg:text-left">
          <h1
            className="font-serif text-ink leading-[1.05] dark:text-paper"
            style={{ fontSize: 'clamp(40px, 7vw, 64px)', fontWeight: 300 }}
          >
            {nameB ? (
              <>
                {nameA}{' '}
                <span className="text-gold italic dark:text-gold-light">&amp;</span> {nameB}
              </>
            ) : (
              nameA
            )}
          </h1>

          <p className="font-serif text-lg sm:text-xl text-muted italic tracking-wide dark:text-paper/70">
            Request the pleasure of your company
          </p>

          <div className="space-y-1">
            <p className="text-sm sm:text-base tracking-[0.12em] text-ink font-serif dark:text-paper">
              {WEDDING_DATE.toLocaleDateString(undefined, {
                weekday: 'long',
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              })}
            </p>
            <p className="text-[11px] tracking-[0.35em] uppercase text-dim dark:text-paper/55">{LOCATION_CALENDAR}</p>
          </div>

          <div>
            <p className="text-[10px] tracking-[0.4em] uppercase text-teal mb-3 dark:text-gold-light/90">Counting down</p>
            <div className="flex flex-wrap gap-2 sm:gap-3 justify-center lg:justify-start">
              <CountCell label="Days" value={d} />
              <CountCell label="Hours" value={h} />
              <CountCell label="Minutes" value={m} />
              <CountCell label="Seconds" value={s} />
            </div>
          </div>

          <div className="flex flex-wrap gap-3 justify-center pt-1 lg:justify-start">
            <a href={googleUrl} target="_blank" rel="noreferrer">
              <button type="button" className="outline-btn">
                Google Calendar
              </button>
            </a>
          </div>

          <div className="max-w-md mx-auto lg:mx-0 lg:max-w-none pt-2">
            <WeddingCalendar date={WEDDING_DATE} label="Walima day" />
          </div>
        </div>
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-dim text-[10px] tracking-[0.35em] uppercase opacity-80 dark:text-paper/50">
        <span>Scroll or use arrow keys</span>
        <span className="text-gold/70 text-lg leading-none motion-safe:animate-bounce">↓</span>
      </div>
    </section>
  )
}
