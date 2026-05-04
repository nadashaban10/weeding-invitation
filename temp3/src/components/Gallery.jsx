import { useMemo } from 'react'

const DEFAULT_IMAGES = [
  { src: '/images/brideandgroom.jpeg', alt: 'Bride and groom' },
  { src: '/gallery/location1.jpg', alt: 'Venue moment 1' },
  { src: '/gallery/location2.jpeg', alt: 'Venue moment 2' },
  { src: '/gallery/leaf1.png', alt: 'Details 1' },
  { src: '/gallery/leaf2.png', alt: 'Details 2' },
  { src: '/gallery/leaf3.png', alt: 'Details 3' },
]

const keyframes = `
  @keyframes scroll-left {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(calc(-100% / 6));
    }
  }

  .gallery-scroll {
    animation: scroll-left 20s linear infinite;
  }

  .polaroid-frame {
    background: white;
    padding: 12px;
    position: relative;
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
  }

  .polaroid-frame::after {
    content: '';
    position: absolute;
    bottom: -8px;
    left: 50%;
    transform: translateX(-50%);
    width: 60%;
    height: 8px;
    background: rgba(0, 0, 0, 0.05);
    filter: blur(2px);
  }
`

export default function Gallery({ images = DEFAULT_IMAGES }) {
  const items = useMemo(() => images.filter(Boolean), [images])
  // Duplicate images for seamless looping
  const duplicatedItems = useMemo(() => [...items, ...items], [items])

  return (
    <section id="gallery" className="pb-10 px-6 overflow-x-hidden">
      <style>{keyframes}</style>
      <div className="max-w-full mx-auto w-full">
        <div className="divider mb-12 animate-fade-up anim-delay-1">Gallery</div>

        <div className="relative animate-fade-up anim-delay-2 overflow-hidden w-full">
          {/* Infinite scrolling carousel */}
          <div className="gallery-scroll flex gap-2 sm:gap-4" style={{ width: 'fit-content' }}>
            {duplicatedItems.map((img, idx) => (
              <div
                key={`${img.src}-${idx}`}
                className="shrink-0 relative"
                style={{
                  width: 'min(60vw, 320px)',
                }}
              >
                {/* White frame/border */}
                <div className="polaroid-frame" style={{
                  paddingBottom: '16px'
                }}>
                  <div className="group relative overflow-hidden rounded-sm bg-white/70 border border-[rgba(184,138,59,0.18)] shadow-[0_12px_40px_rgba(28,25,23,0.10)] flex-1 flex flex-col">
                    <img
                      src={img.src}
                      alt={img.alt ?? `Photo ${(idx % items.length) + 1}`}
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
                        {String((idx % items.length) + 1).padStart(2, '0')}
                      </div>
                      <div className="text-[10px] tracking-[0.35em] uppercase text-white/85">
                        {img.alt ?? 'Moment'}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

