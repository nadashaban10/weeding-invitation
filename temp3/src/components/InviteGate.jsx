import { useState } from 'react'

export default function InviteGate({
  couple = 'Sophia & Oliver',
  dateLine = '20 · 05 · 2026',
  subtitle = 'Save the date',
  locationLine = 'Tuscany, Italy',
  imageSrc = '/images/brideandgroom.jpeg',
  frameSrc = '/images/vecteezy_watercolor-illustration-frame-with-green-leaves-digital-hand_9637989.png',
  onOpen,
}) {
  const [opened, setOpened] = useState(false)
  const [closing, setClosing] = useState(false)

  if (opened) return null

  return (
    <div
      className="fixed inset-0 z-[100] w-full h-full"
      style={{ transition: 'opacity 700ms ease, transform 700ms ease' }}
    >
      <div className="absolute  w-full h-full">
        <img
          src={imageSrc}
          alt="Invitation cover"
          className="w-full h-full object-cover filter brightness-75"
          loading="eager"
        />
        <div
          className="absolute inset-0 w-full h-full"
          style={{
            background:
              'linear-gradient(180deg, rgba(18,16,14,0.35) 0%, rgba(18,16,14,0.55) 60%, rgba(18,16,14,0.75) 100%)',
          }}
        />
        <div className="absolute inset-0 w-full h-full noise opacity-[0.22]" />
      </div>

      <div
        className="relative h-full w-full flex items-center justify-center p-6"
        style={
          closing
            ? { opacity: 0, transform: 'scale(1.03)' }
            : { opacity: 1, transform: 'scale(1)' }
        }
      >
        <div
          className="relative w-full max-w-[520px] rounded-[34px] overflow-hidden"
          style={{
            border: '1px solid rgba(227, 201, 140, 0.25)',
            background: 'rgba(18,16,14,0.35)',
            backdropFilter: 'blur(10px)',
            boxShadow: '0 40px 120px rgba(0,0,0,0.45)',
          }}
        >
          {/* Decorative frame */}
          <div className="pointer-events-none absolute inset-0 w-full h-full">
            <img
              src={frameSrc}
              alt=""
              className="absolute inset-2 w-full h-full object-cover opacity-[0.25] mix-blend-screen animate-float-slow"
              loading="lazy"
            />
          </div>

          <div className="p-10 sm:p-12 text-center">
            <div className="animate-fade-in text-[10px] tracking-[0.55em] uppercase text-white/75 mb-6 ">
              {subtitle}
            </div>

            <div
              className="animate-fade-up anim-delay-1 font-script  leading-none mb-5"
              style={{ fontSize: 'clamp(45px, 10vw, 50px)' , color: 'rgba(239, 214, 157, 0.77)' }}
            >
              {couple}
            </div>

            <div className="animate-fade-up anim-delay-2 flex items-center justify-center gap-4 text-white/70 text-[11px] tracking-[0.4em] uppercase">
              <span className="h-px w-10" style={{ background: 'rgba(227,201,140,0.35)' }} />
              <span>{dateLine}</span>
              <span className="h-px w-10" style={{ background: 'rgba(227,201,140,0.35)' }} />
            </div>

            <div className="animate-fade-up anim-delay-3 mt-10 mb-6 text-white/75 text-[11px] tracking-[0.45em] uppercase">
              {locationLine}
            </div>

            <button
              className="animate-fade-up anim-delay-4 relative mx-auto block w-[86px] h-[86px] rounded-full"
              style={{ transition: 'transform 200ms ease, opacity 200ms ease' }}
              onClick={() => {
                if (closing) return
                setClosing(true)
                window.setTimeout(() => {
                  setOpened(true)
                  onOpen?.()
                }, 650)
              }}
            >
              <span
                className="absolute inset-0 rounded-full animate-ring-pulse"
                style={{
                  border: '1px solid rgba(227, 201, 140, 0.55)',
                }}
              />
              <span
                className="absolute inset-0 rounded-full"
                style={{
                  border: '1px solid rgba(227, 201, 140, 0.55)',
                  background:
                    'radial-gradient(60px 60px at 50% 35%, rgba(227,201,140,0.22), rgba(184,138,59,0.10))',
                  boxShadow: '0 14px 40px rgba(0,0,0,0.35)',
                }}
              />
              <span className="absolute inset-0 flex flex-col items-center justify-center">
                 <span className="mt-1 text-[rgba(227,201,140,0.95)]">✦</span>
                <span className="text-[10px] tracking-[0.5em] uppercase text-white/85">Open</span>
                <span className="mt-1 text-[rgba(227,201,140,0.95)]">✦</span>
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

