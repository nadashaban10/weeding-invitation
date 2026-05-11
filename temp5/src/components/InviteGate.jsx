import { useState } from 'react'
import { COUPLE_SCRIPT, DATE_LINE, LOCATION_TAGLINE } from '../constants'

const BASMALA = 'بسم الله الرحمن الرحيم'

const ARABIC_VERSE = `وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِنْ أَنْفُسِكُمْ أَزْوَاجًا لِتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُمْ مَوَدَّةً وَرَحْمَةً ۚ إِنَّ فِي ذَلِكَ لَآيَاتٍ لِقَوْمٍ يَتَفَكَّرُونَ`

const ENGLISH_VERSE =
  'And among His signs is that He created for you spouses from yourselves, that you may find tranquility in them; and He placed between you compassion and mercy. Indeed in that are signs for people who reflect.'

const IMG_FLORA = '/images/flora.png'
const IMG_FLOWER = '/images/flower.png'
const IMG_FLOWERRR = '/images/flowerrr.png'

/** flora · flower · flowerrr on the photo layer — black keyed out with screen blend on the darkened hero */
function GateBackdropBotanicals() {
  return (
    <div
      className="pointer-events-none absolute inset-0 z-[1] min-h-[100dvh] overflow-hidden"
      aria-hidden
    >
      <img
        src={IMG_FLORA}
        alt=""
        className="absolute -bottom-[10%] -right-[12%] w-[min(56vw,300px)] max-w-none opacity-[0.52] mix-blend-screen motion-safe:animate-float-slow"
        loading="lazy"
        decoding="async"
      />
      <img
        src={IMG_FLOWER}
        alt=""
        className="absolute -left-[16%] top-[5%] w-[min(48vw,260px)] max-w-none opacity-[0.44] mix-blend-screen motion-safe:animate-float-slow motion-safe:[animation-delay:1s]"
        loading="lazy"
        decoding="async"
      />
      <img
        src={IMG_FLOWERRR}
        alt=""
        className="absolute left-1/2 top-[10%] w-[min(88vw,460px)] max-w-none -translate-x-1/2 opacity-[0.36] mix-blend-screen motion-safe:animate-float-slow motion-safe:[animation-delay:0.45s]"
        loading="lazy"
        decoding="async"
      />
    </div>
  )
}

/** Soft flora + flower through the frosted glass (flowerrr stays on photo so the GIF reads once) */
function GateFloraAccents() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden>
      <img
        src={IMG_FLOWER}
        alt=""
        className="absolute -left-[4%] -top-[2%] w-[min(44vw,220px)] max-w-none opacity-[0.11] saturate-[0.82] mix-blend-multiply dark:opacity-[0.14] dark:mix-blend-soft-light motion-safe:animate-float-slow"
        loading="lazy"
        decoding="async"
      />
      <img
        src={IMG_FLORA}
        alt=""
        className="absolute -bottom-[6%] -right-[8%] w-[min(52vw,270px)] max-w-none opacity-[0.12] saturate-[0.82] mix-blend-multiply dark:opacity-[0.15] dark:mix-blend-soft-light motion-safe:animate-float-slow motion-safe:[animation-delay:1.25s]"
        loading="lazy"
        decoding="async"
      />
    </div>
  )
}

export default function InviteGate({ imageSrc = '/images/couple.svg', onOpen }) {
  const [opened, setOpened] = useState(false)
  const [closing, setClosing] = useState(false)

  if (opened) return null

  return (
    <div
      className="fixed inset-0 z-[100] min-h-[100dvh] w-full max-w-none"
      role="dialog"
      aria-modal="true"
      aria-label="Invitation cover"
    >
      <div className="absolute inset-0 min-h-[100dvh] w-full">
        <img src={imageSrc} alt="" className="min-h-[100dvh] h-full w-full object-cover" loading="eager" />
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse 85% 55% at 50% 15%, rgba(227, 201, 140, 0.08) 0%, transparent 50%),
              radial-gradient(ellipse 60% 45% at 0% 90%, rgba(30, 61, 58, 0.12) 0%, transparent 45%),
              radial-gradient(ellipse 60% 45% at 100% 85%, rgba(30, 61, 58, 0.11) 0%, transparent 45%),
              linear-gradient(165deg, rgba(20, 18, 16, 0.18) 0%, rgba(30, 61, 58, 0.22) 45%, rgba(12, 10, 8, 0.42) 100%)
            `,
          }}
        />
      </div>

      <div className="pointer-events-none absolute inset-0 min-h-[100dvh] w-full overflow-hidden" aria-hidden>
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

      <GateBackdropBotanicals />

      <div
        className="relative z-[3] flex min-h-[100dvh] w-full flex-col overflow-y-auto overscroll-y-contain transition-all duration-[700ms] ease-out"
        style={
          closing
            ? { opacity: 0, transform: 'scale(0.98) translateY(12px)' }
            : { opacity: 1, transform: 'scale(1) translateY(0)' }
        }
      >
        <div
          className="invite-gate-card relative flex min-h-[100dvh] w-full max-w-none flex-1 flex-col justify-center px-6 pt-10 pb-[max(2.75rem,env(safe-area-inset-bottom,0px))] text-ink backdrop-blur-xl backdrop-saturate-150 animate-fade-in sm:px-10 sm:pt-12 sm:pb-[max(3.25rem,env(safe-area-inset-bottom,0px))] dark:text-ink"
          style={{
            background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.58) 0%, rgba(247, 244, 238, 0.45) 100%)',
            border: 'none',
            boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.35), inset 0 -1px 0 rgba(184, 146, 74, 0.08)',
          }}
        >
          <GateFloraAccents />
          <div className="relative z-[1] flex min-h-0 w-full flex-1 flex-col justify-center">
          <div
            className="pointer-events-none absolute left-6 right-6 top-0 h-px opacity-90 sm:left-10 sm:right-10"
            style={{
              background:
                'linear-gradient(90deg, transparent, rgba(184, 146, 74, 0.45), rgba(30, 61, 58, 0.25), rgba(184, 146, 74, 0.45), transparent)',
            }}
            aria-hidden
          />

          <blockquote
            className="mx-auto mt-2 max-w-xl text-center font-arabic text-teal animate-fade-up anim-delay-1"
            dir="rtl"
          >
            <p className="mb-3 text-[clamp(0.8rem,2.9vw,1.02rem)] leading-relaxed tracking-wide">{BASMALA}</p>
            <p className="text-[clamp(0.72rem,2.6vw,0.95rem)] leading-[1.78]">{ARABIC_VERSE}</p>
          </blockquote>
            
          <p className="mx-auto mt-2 max-w-md text-center font-serif text-[11px] italic leading-relaxed text-muted sm:text-[12px] animate-fade-up anim-delay-2">
            {ENGLISH_VERSE}
          </p>
          <p className="mt-4 text-center text-[10px] tracking-[0.38em] uppercase text-gold-dark animate-fade-up anim-delay-1">
            Surah Ar-Rum · 30:21
          </p>

          <div
            className="mx-auto mt-3 h-px w-20"
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(184, 146, 74, 0.5), transparent)',
            }}
          />

          <div
            className="mx-auto mt-4 max-w-[min(100%,24rem)] text-center font-script leading-none text-gold-dark animate-fade-up anim-delay-3"
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

          <div className="mt-10 flex flex-col items-center gap-4">
            <button
              type="button"
              className="group relative isolate overflow-hidden rounded-full border-[1.5px] border-gold/55 bg-gradient-to-b from-white/55 via-white/30 to-white/15 px-10 py-4 font-sans text-[10px] font-medium uppercase tracking-[0.38em] text-teal shadow-[inset_0_1px_0_rgba(255,255,255,0.65),0_8px_32px_rgba(20,18,16,0.1)] backdrop-blur-md transition-all duration-500 ease-out hover:-translate-y-0.5 hover:border-gold hover:from-white/75 hover:via-white/45 hover:to-white/25 hover:shadow-[0_14px_44px_rgba(30,61,58,0.16)] active:translate-y-0 active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-gold/50 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent dark:border-gold-light/22 dark:from-paper/[0.14] dark:via-paper/[0.07] dark:to-paper/[0.03] dark:text-paper/90 dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_6px_28px_rgba(0,0,0,0.18)] dark:backdrop-blur-lg dark:hover:border-gold-light/35 dark:hover:from-paper/[0.2] dark:hover:via-paper/[0.11] dark:hover:to-paper/[0.05] dark:hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.1),0_10px_36px_rgba(0,0,0,0.22)] dark:focus-visible:ring-gold-light/35 sm:px-14 sm:py-[1.125rem] sm:text-[11px]"
              onClick={() => {
                if (closing) return
                setClosing(true)
                window.setTimeout(() => {
                  setOpened(true)
                  onOpen?.()
                }, 680)
              }}
            >
              <span
                className="pointer-events-none absolute inset-0 -translate-x-full skew-x-12 bg-gradient-to-r from-transparent via-white/45 to-transparent opacity-0 transition duration-700 ease-out group-hover:translate-x-full group-hover:opacity-100 dark:via-white/[0.08]"
                aria-hidden
              />
              <span className="relative flex items-center justify-center gap-3 sm:gap-4">
                <span
                  className="h-px w-7 bg-gradient-to-r from-transparent to-gold/80 sm:w-9 dark:to-gold-light/38"
                  aria-hidden
                />
                <span className="whitespace-nowrap">Open invitation</span>
                <span
                  className="h-px w-7 bg-gradient-to-l from-transparent to-gold/80 sm:w-9 dark:to-gold-light/38"
                  aria-hidden
                />
              </span>
            </button>

          </div>
          </div>
        </div>
      </div>
    </div>
  )
}
