import { COUPLE_DISPLAY } from '../constants'

const HERO_IMAGE = '/images/couple.svg'

const TIMELINE = [
  {
    time: '16:30',
    title: 'Arrival & seating',
    detail: 'Doors open for family and friends. Ushers will help you find your table.',
  },
  {
    time: '17:00',
    title: 'Nikah & blessings',
    detail: 'The ceremony with our families — a quiet, joyful start to the evening.',
  },
  {
    time: '18:15',
    title: 'Photos & greetings',
    detail: 'A short window for hugs, photos, and congratulations before dinner.',
  },
  {
    time: '19:30',
    title: 'Walima dinner',
    detail: 'Sharing a meal together — speeches, gratitude, and the first course.',
  },
  {
    time: '21:00',
    title: 'Cake & celebration',
    detail: 'Dessert, music, and room to dance if you’d like to stay a little longer.',
  },
]

export default function Welcome() {
  return (
    <section
      id="timeline"
      className="snap-panel paper-bg relative flex flex-col items-center overflow-hidden px-5 py-14 sm:px-8 sm:py-16"
    >
      <div
        className="pointer-events-none absolute -top-24 -right-24 h-[320px] w-[320px] rounded-full opacity-[0.07]"
        style={{ background: 'radial-gradient(circle, #1e3d3a, transparent 70%)' }}
      />
      <div
        className="pointer-events-none absolute -bottom-28 -left-20 h-[280px] w-[280px] rounded-full opacity-[0.08]"
        style={{ background: 'radial-gradient(circle, #b8924a, transparent 70%)' }}
      />

      <div className="relative z-[1] w-full max-w-lg animate-fade-up">
        <div className="divider justify-center">The day</div>

        <p className="mt-6 text-center text-[10px] tracking-[0.42em] uppercase text-teal/85 dark:text-gold-light/85">
          How our celebration unfolds
        </p>

        <div className="mx-auto mt-8 w-full max-w-[340px]">
          <div
            className="relative rounded-lg p-2.5 sm:p-3 motion-safe:animate-float-slow"
            style={{
              background: 'linear-gradient(145deg, rgba(30,61,58,0.1), rgba(184,146,74,0.14))',
              boxShadow: '0 20px 56px rgba(20,18,16,0.1)',
            }}
          >
            <div
              className="overflow-hidden rounded-md p-[5px]"
              style={{
                border: '2px solid rgba(184, 146, 74, 0.5)',
                boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.55)',
              }}
            >
              <img
                src={HERO_IMAGE}
                alt={COUPLE_DISPLAY}
                className="aspect-[4/5] w-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </div>

        <h2 className="mt-10 text-center font-serif text-xl sm:text-2xl text-ink font-light leading-snug dark:text-paper">
          Timeline
        </h2>
        <p className="mx-auto mt-2 max-w-md text-center text-sm text-muted leading-relaxed dark:text-paper/70">
          Times are a guide — we’ll keep the evening gentle and unhurried.
        </p>

        <div className="relative mx-auto mt-10 max-w-md pl-1">
          <div
            className="pointer-events-none absolute left-[11px] top-2 bottom-2 w-px sm:left-[13px]"
            style={{
              background:
                'linear-gradient(180deg, rgba(184,146,74,0.45), rgba(30,61,58,0.2), rgba(184,146,74,0.35))',
            }}
            aria-hidden
          />
          <ol className="relative">
            {TIMELINE.map((item, i) => (
              <li
                key={item.time}
                className={`relative pb-10 pl-10 sm:pl-12 last:pb-2 animate-fade-up ${
                  i === 0 ? 'anim-delay-1' : i === 1 ? 'anim-delay-2' : i === 2 ? 'anim-delay-3' : ''
                }`}
              >
                <span
                  className="absolute left-0 top-1.5 flex h-[22px] w-[22px] items-center justify-center rounded-full sm:h-6 sm:w-6"
                  style={{
                    border: '2px solid rgba(184, 146, 74, 0.55)',
                    background: 'linear-gradient(145deg, #fdfaf8, #ebe6dd)',
                    boxShadow: '0 2px 8px rgba(20,18,16,0.08)',
                  }}
                  aria-hidden
                >
                  <span className="h-2 w-2 rounded-full bg-teal/70 dark:bg-gold/80" />
                </span>
                <p className="font-serif text-lg text-teal sm:text-xl dark:text-gold-light" style={{ fontWeight: 500 }}>
                  {item.time}
                </p>
                <p className="mt-0.5 text-[10px] tracking-[0.32em] uppercase text-gold-dark dark:text-gold-light/90">
                  {item.title}
                </p>
                <p className="mt-2 font-serif text-sm leading-relaxed text-muted dark:text-paper/70" style={{ fontWeight: 400 }}>
                  {item.detail}
                </p>
              </li>
            ))}
          </ol>
        </div>

        <p className="mt-4 text-center text-[10px] tracking-[0.28em] uppercase text-dim dark:text-paper/55">
          Exact venues &amp; maps · Venues section
        </p>

        <div
          className="mx-auto mt-6 h-px w-24 bg-gradient-to-r from-transparent via-gold/50 to-transparent animate-shimmer-line"
          aria-hidden
        />
      </div>
    </section>
  )
}
