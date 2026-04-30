import { useEffect, useMemo, useRef, useState } from 'react'

const DEFAULT_IMAGES = [
  { src: '/images/brideandgroom.jpeg', alt: 'Bride and groom' },
  { src: '/gallery/location1.jpg', alt: 'Venue moment 1' },
  { src: '/gallery/location2.jpeg', alt: 'Venue moment 2' },
  { src: '/gallery/leaf1.png', alt: 'Details 1' },
  { src: '/gallery/leaf2.png', alt: 'Details 2' },
  { src: '/gallery/leaf3.png', alt: 'Details 3' },
]

export default function Gallery({ images = DEFAULT_IMAGES }) {
  const items = useMemo(() => images.filter(Boolean), [images])
  const scrollerRef = useRef(null)
  const [active, setActive] = useState(0)

  useEffect(() => {
    const el = scrollerRef.current
    if (!el) return

    const onScroll = () => {
      const children = Array.from(el.querySelectorAll('[data-slide="1"]'))
      if (!children.length) return
      const left = el.scrollLeft
      let bestIdx = 0
      let bestDist = Infinity
      children.forEach((c, idx) => {
        const dist = Math.abs(c.offsetLeft - left)
        if (dist < bestDist) {
          bestDist = dist
          bestIdx = idx
        }
      })
      setActive(bestIdx)
    }

    el.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => el.removeEventListener('scroll', onScroll)
  }, [])

  const scrollToIndex = (idx) => {
    const el = scrollerRef.current
    if (!el) return
    const slides = el.querySelectorAll('[data-slide="1"]')
    const target = slides[idx]
    if (!target) return
    el.scrollTo({ left: target.offsetLeft, behavior: 'smooth' })
  }

  const prev = () => scrollToIndex(Math.max(0, active - 1))
  const next = () => scrollToIndex(Math.min(items.length - 1, active + 1))

  return (
    <section id="gallery" className="pb-10 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="divider mb-12 animate-fade-up anim-delay-1">Gallery</div>

        <div className="relative animate-fade-up anim-delay-2">
          {/* Carousel */}
          <div
            ref={scrollerRef}
            className="flex gap-4 overflow-x-auto scroll-smooth pb-4"
            style={{
              scrollSnapType: 'x mandatory',
              WebkitOverflowScrolling: 'touch',
            }}
          >
            {items.map((img, idx) => (
              <div
                key={img.src ?? idx}
                data-slide="1"
                className="shrink-0"
                style={{
                  scrollSnapAlign: 'start',
                  width: 'min(78vw, 360px)',
                }}
              >
                <div className="group relative overflow-hidden rounded-3xl bg-white/70 border border-[rgba(184,138,59,0.18)] shadow-[0_12px_40px_rgba(28,25,23,0.10)]">
                  <img
                    src={img.src}
                    alt={img.alt ?? `Photo ${idx + 1}`}
                    className="w-full h-full aspect-[4/5] object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    loading="lazy"
                  />
                  <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div
                      className="absolute inset-0"
                      style={{
                        background:
                          'linear-gradient(180deg, transparent, rgba(28,25,23,0.10), rgba(28,25,23,0.18))',
                      }}
                    />
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                    <div className="text-[10px] tracking-[0.4em] uppercase text-white/85">
                      {String(idx + 1).padStart(2, '0')}
                    </div>
                    <div className="text-[10px] tracking-[0.35em] uppercase text-white/85">
                      {img.alt ?? 'Moment'}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Controls */}
          <div className="mt-5 flex items-center justify-between gap-4">
            <button
              type="button"
              className="outline-btn px-6"
              onClick={prev}
              disabled={active === 0}
              style={{ opacity: active === 0 ? 0.5 : 1 }}
            >
              Prev
            </button>

            <div className="flex gap-2 items-center">
              {items.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  className="h-2 rounded-full transition-all duration-300"
                  style={{
                    width: i === active ? 26 : 10,
                    background: i === active ? 'rgba(184,138,59,0.95)' : 'rgba(129,119,107,0.35)',
                  }}
                  aria-label={`Go to slide ${i + 1}`}
                  onClick={() => scrollToIndex(i)}
                />
              ))}
            </div>

            <button
              type="button"
              className="outline-btn px-6"
              onClick={next}
              disabled={active === items.length - 1}
              style={{ opacity: active === items.length - 1 ? 0.5 : 1 }}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

