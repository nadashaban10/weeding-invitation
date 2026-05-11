import { useCallback, useEffect, useState } from 'react'

const DEFAULT_IMAGES = [
  { src: '/images/couple.svg', alt: 'Together' },
  { src: '/gallery/01.svg', alt: 'Moment one' },
  { src: '/gallery/02.svg', alt: 'Moment two' },
  { src: '/gallery/03.svg', alt: 'Moment three' },
  { src: '/gallery/04.svg', alt: 'Moment four' },
  { src: '/gallery/05.svg', alt: 'Moment five' },
]

export default function Gallery({ images = DEFAULT_IMAGES }) {
  const [open, setOpen] = useState(null)

  const close = useCallback(() => setOpen(null), [])
  const prev = useCallback(() => {
    setOpen((i) => (i == null ? i : (i - 1 + images.length) % images.length))
  }, [images.length])
  const next = useCallback(() => {
    setOpen((i) => (i == null ? i : (i + 1) % images.length))
  }, [images.length])

  useEffect(() => {
    if (open == null) return
    const onKey = (e) => {
      if (e.key === 'Escape') close()
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, close, prev, next])

  return (
    <section
      id="gallery"
      className="snap-panel flex flex-col items-center justify-center bg-transparent px-5 sm:px-8 py-14"
    >
      <div className="w-full max-w-5xl mx-auto">
        <div className="divider mb-10 animate-fade-up">Gallery</div>
        <p className="text-center text-sm text-muted mb-8 max-w-lg mx-auto animate-fade-up anim-delay-1 dark:text-paper/70">
          Tap a portrait to view it larger. Navigate with the buttons — no sideways scrolling.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5">
          {images.map((img, idx) => (
            <button
              key={img.src}
              type="button"
              onClick={() => setOpen(idx)}
              className="group text-left rounded-[22px] focus:outline-none focus-visible:ring-2 focus-visible:ring-teal/40 animate-fade-up"
              style={{ animationDelay: `${0.08 * idx}s` }}
            >
              <div
                className="relative p-2 sm:p-2.5 rounded-[20px] transition-transform duration-500 group-hover:-translate-y-1 border border-gold/28 bg-gradient-to-br from-white/95 to-[#ebe6dd]/90 shadow-[0_16px_44px_rgba(20,18,16,0.07)] dark:border-gold/25 dark:from-teal/40 dark:to-teal/25 dark:shadow-[0_16px_44px_rgba(0,0,0,0.35)]"
              >
                <div
                  className="relative overflow-hidden rounded-[14px]"
                  style={{
                    border: '6px double rgba(184, 146, 74, 0.35)',
                    boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.65)',
                  }}
                >
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="w-full aspect-[4/5] object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                    loading="lazy"
                  />
                  <div
                    className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                      background: 'linear-gradient(180deg, transparent, rgba(20,18,16,0.2))',
                    }}
                  />
                </div>
                <p className="mt-3 text-[10px] tracking-[0.32em] uppercase text-center text-dim transition-colors group-hover:text-teal dark:text-paper/45 dark:group-hover:text-gold-light">
                  {String(idx + 1).padStart(2, '0')} · {img.alt}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {open != null && (
        <div
          className="fixed inset-0 z-[90] flex items-center justify-center p-4 sm:p-8 animate-fade-in"
          style={{ background: 'rgba(14,12,10,0.72)' }}
          role="dialog"
          aria-modal="true"
          aria-label="Enlarged photo"
          onClick={close}
        >
          <div className="relative max-w-3xl w-full animate-scale-in" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="absolute -top-10 right-0 text-white/85 text-[11px] tracking-[0.3em] uppercase hover:text-white"
              onClick={close}
            >
              Close
            </button>

            <div
              className="p-2 sm:p-3 rounded-[18px]"
              style={{
                border: '2px solid rgba(220, 197, 152, 0.45)',
                background: 'linear-gradient(145deg, rgba(30,61,58,0.25), rgba(20,18,16,0.5))',
                boxShadow: '0 40px 100px rgba(0,0,0,0.45)',
              }}
            >
              <div className="rounded-[12px] overflow-hidden border border-white/20 bg-black/20">
                <img
                  src={images[open].src}
                  alt={images[open].alt}
                  className="w-full max-h-[70vh] object-contain bg-paper"
                />
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between gap-4">
              <button type="button" className="outline-btn bg-white/10 text-white border-white/25" onClick={prev}>
                Previous
              </button>
              <span className="text-white/70 text-[11px] tracking-[0.35em] uppercase">
                {open + 1} / {images.length}
              </span>
              <button type="button" className="outline-btn bg-white/10 text-white border-white/25" onClick={next}>
                Next
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
