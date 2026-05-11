import { useState } from 'react'
import { COUPLE_SCRIPT, DATE_LINE, LOCATION_TAGLINE } from '../constants'

const ARABIC_VERSE = `وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِنْ أَنْفُسِكُمْ أَزْوَاجًا لِتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُمْ مَوَدَّةً وَرَحْمَةً ۚ إِنَّ فِي ذَلِكَ لَآيَاتٍ لِقَوْمٍ يَتَفَكَّرُونَ`

const ENGLISH_VERSE =
  'And among His signs is that He created for you spouses from yourselves, that you may find tranquility in them; and He placed between you compassion and mercy. Indeed in that are signs for people who reflect.'

/** Gold / cream strokes — matches invitation metallics */
function BirdMark({ className, flip }) {
  return (
    <svg
      className={className}
      viewBox="0 0 64 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      style={flip ? { transform: 'scaleX(-1)' } : undefined}
    >
      <path
        d="M4 22 Q18 8 32 18 Q46 10 60 20"
        stroke="rgba(220, 197, 152, 0.55)"
        strokeWidth="1.6"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M32 18l8 7M44 16l6 6"
        stroke="rgba(184, 146, 74, 0.45)"
        strokeWidth="1"
        strokeLinecap="round"
      />
    </svg>
  )
}

/** Teal stem + gold-blush petals — same family as hero frame accents */
function BlossomSprig({ className, flip }) {
  return (
    <svg
      className={className}
      viewBox="0 0 100 88"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      style={flip ? { transform: 'scaleX(-1)' } : undefined}
    >
      <path
        d="M50 82 Q42 48 52 22 Q58 8 72 4"
        stroke="rgba(30, 61, 58, 0.35)"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
      <ellipse
        cx="44"
        cy="36"
        rx="10"
        ry="7"
        fill="rgba(227, 201, 140, 0.12)"
        stroke="rgba(184, 146, 74, 0.4)"
        strokeWidth="0.8"
        transform="rotate(-25 44 36)"
      />
      <ellipse
        cx="62"
        cy="28"
        rx="9"
        ry="6"
        fill="rgba(30, 61, 58, 0.08)"
        stroke="rgba(184, 146, 74, 0.35)"
        strokeWidth="0.8"
        transform="rotate(15 62 28)"
      />
      <circle
        cx="70"
        cy="14"
        r="6"
        fill="rgba(220, 197, 152, 0.15)"
        stroke="rgba(184, 146, 74, 0.45)"
        strokeWidth="0.7"
      />
    </svg>
  )
}

export default function InviteGate({ imageSrc = '/images/couple.svg', onOpen }) {
  const [opened, setOpened] = useState(false)
  const [closing, setClosing] = useState(false)

  if (opened) return null

  return (
    <div className="fixed inset-0 z-[100]" role="dialog" aria-modal="true" aria-label="Invitation cover">
      <div className="absolute inset-0">
        <img src={imageSrc} alt="" className="h-full w-full object-cover" loading="eager" />
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse 85% 55% at 50% 15%, rgba(227, 201, 140, 0.1) 0%, transparent 50%),
              radial-gradient(ellipse 60% 45% at 0% 90%, rgba(30, 61, 58, 0.18) 0%, transparent 45%),
              radial-gradient(ellipse 60% 45% at 100% 85%, rgba(30, 61, 58, 0.16) 0%, transparent 45%),
              linear-gradient(165deg, rgba(20, 18, 16, 0.26) 0%, rgba(30, 61, 58, 0.34) 45%, rgba(12, 10, 8, 0.62) 100%)
            `,
          }}
        />
      </div>

      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <div
          className="absolute -left-[18%] top-[10%] h-[42vmin] w-[42vmin] rounded-full opacity-40 blur-3xl"
          style={{ background: 'rgba(227, 201, 140, 0.12)' }}
        />
        <div
          className="absolute -right-[12%] bottom-[18%] h-[38vmin] w-[38vmin] rounded-full opacity-32 blur-3xl"
          style={{ background: 'rgba(30, 61, 58, 0.14)' }}
        />
        <div
          className="absolute left-[35%] top-[50%] h-[26vmin] w-[26vmin] rounded-full opacity-24 blur-2xl"
          style={{ background: 'rgba(184, 146, 74, 0.09)' }}
        />
      </div>

      <BlossomSprig className="pointer-events-none absolute left-0 top-[10%] z-[1] w-[min(42vw,160px)] opacity-95 sm:left-[3%] sm:top-[12%] sm:w-[180px] motion-safe:animate-float-slow" />
      <BlossomSprig className="pointer-events-none absolute right-0 top-[8%] z-[1] w-[min(42vw,160px)] opacity-95 sm:right-[3%] sm:top-[10%] sm:w-[180px] motion-safe:animate-float-slow" flip />

      <BirdMark className="pointer-events-none absolute left-[2%] top-[40%] z-[1] w-20 opacity-90 sm:left-[6%] sm:w-24" />
      <BirdMark className="pointer-events-none absolute right-[2%] top-[44%] z-[1] w-20 opacity-90 sm:right-[6%] sm:w-24" flip />

      <div
        className="relative z-[2] flex h-full w-full items-center justify-center overflow-y-auto px-4 py-10 sm:px-6 transition-all duration-[700ms] ease-out"
        style={
          closing
            ? { opacity: 0, transform: 'scale(0.98) translateY(12px)' }
            : { opacity: 1, transform: 'scale(1) translateY(0)' }
        }
      >
        <div
          className="invite-gate-card relative w-full max-w-[min(100%,480px)] rounded-[2.25rem] px-7 pb-9 pt-9 text-ink backdrop-blur-md animate-fade-in sm:rounded-[2.5rem] sm:px-10 sm:pb-10 sm:pt-10 dark:text-ink"
          style={{
            background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.92) 0%, rgba(247, 244, 238, 0.9) 100%)',
            border: '1px solid rgba(184, 146, 74, 0.28)',
            boxShadow:
              '0 24px 70px rgba(20, 18, 16, 0.14), inset 0 1px 0 rgba(255, 255, 255, 0.9), inset 0 -1px 0 rgba(184, 146, 74, 0.08)',
          }}
        >
          <div
            className="pointer-events-none absolute left-6 right-6 top-0 h-px opacity-90"
            style={{
              background:
                'linear-gradient(90deg, transparent, rgba(184, 146, 74, 0.45), rgba(30, 61, 58, 0.25), rgba(184, 146, 74, 0.45), transparent)',
            }}
            aria-hidden
          />

          <p className="text-center text-[10px] font-medium tracking-[0.48em] uppercase text-teal animate-fade-up">
            Walima invitation
          </p>

          <p className="mt-4 text-center text-[10px] tracking-[0.38em] uppercase text-gold-dark animate-fade-up anim-delay-1">
            Surah Ar-Rum · 30:21
          </p>

          <blockquote
            className="mx-auto mt-2 max-w-xl text-center font-arabic text-[clamp(0.72rem,2.6vw,0.95rem)] leading-[1.78] text-teal animate-fade-up anim-delay-1"
            dir="rtl"
          >
            {ARABIC_VERSE}
          </blockquote>

          <p className="mx-auto mt-2 max-w-md text-center font-serif text-[11px] italic leading-relaxed text-muted sm:text-[12px] animate-fade-up anim-delay-2">
            {ENGLISH_VERSE}
          </p>

          <div
            className="mx-auto mt-3 h-px w-20"
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(184, 146, 74, 0.5), transparent)',
            }}
          />

          <div
            className="mx-auto mt-4 max-w-[320px] text-center font-script leading-none text-gold-dark animate-fade-up anim-delay-3"
            style={{ fontSize: 'clamp(44px, 9.5vw, 72px)' }}
          >
            {COUPLE_SCRIPT}
          </div>

          <div className="mt-5 flex items-center justify-center gap-3 text-[11px] tracking-[0.36em] uppercase text-dim animate-fade-up anim-delay-4">
            <span
              className="h-px w-8"
              style={{ background: 'linear-gradient(to right, transparent, rgba(184, 146, 74, 0.55))' }}
            />
            <span className="text-ink">{DATE_LINE}</span>
            <span
              className="h-px w-8"
              style={{ background: 'linear-gradient(to left, transparent, rgba(184, 146, 74, 0.55))' }}
            />
          </div>

          <p className="mt-4 text-center text-[11px] tracking-[0.32em] uppercase text-muted animate-fade-up anim-delay-4">
            {LOCATION_TAGLINE}
          </p>

          <div className="mt-8 flex flex-col items-center gap-3">
            <button
              type="button"
              className="gold-btn rounded-full px-12 py-3.5 text-[11px] tracking-[0.32em] transition-all duration-300 hover:opacity-95 hover:-translate-y-px active:scale-[0.98]"
              onClick={() => {
                if (closing) return
                setClosing(true)
                window.setTimeout(() => {
                  setOpened(true)
                  onOpen?.()
                }, 680)
              }}
            >
              Open invitation
            </button>
            <p className="text-center text-[10px] tracking-[0.22em] uppercase text-dim">Tap to enter</p>
          </div>
        </div>
      </div>
    </div>
  )
}
