export default function OurStory() {
  return (
    <section id="story" className="py-24 px-6 animate-fade-up">
      <div className="max-w-5xl mx-auto">
        <div className="divider mb-12 text-center">A Note</div>

        <div
          className="rounded-[34px] overflow-hidden"
          style={{
            border: '1px solid rgba(184, 138, 59, 0.18)',
            background: 'rgba(255,255,255,0.74)',
            boxShadow: '0 24px 70px rgba(18,16,14,0.10)',
          }}
        >
          <div className="grid grid-cols-1 md:grid-cols-[1fr_420px]">
            <div className="p-10 sm:p-12 text-center md:text-left">
              <h2 className="font-serif text-ink mb-5" style={{ fontSize: '34px', fontWeight: 300 }}>
                With joy in our hearts…
              </h2>
              <p className="text-sm text-muted leading-loose mb-8">
                We’re so excited to celebrate this moment with the people we love most. Thank you for being part
                of our story — your presence means the world to us.
              </p>

              <blockquote
                className="font-serif italic text-ink leading-relaxed"
                style={{ fontSize: 'clamp(18px, 3.2vw, 28px)', fontWeight: 300 }}
              >
                “May our days be full of laughter, and our home full of peace.”
              </blockquote>

              <div className=" flex items-center justify-center md:justify-start gap-3">
                <span className="h-px w-10" style={{ background: 'rgba(184,138,59,0.32)' }} />
                <span className="text-[11px] tracking-[0.35em] uppercase text-[rgba(123,90,34,1)]">
                  Sophia &amp; Oliver
                </span>
                <span className="h-px w-10" style={{ background: 'rgba(184,138,59,0.32)' }} />
              </div>
            </div>

            <div className="relative">
              <img
                src="/gallery/leaf2.png"
                alt="Elegant detail"
                className="w-full h-[360px] md:h-full object-cover"
                loading="lazy"
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    'radial-gradient(600px 360px at 30% 10%, rgba(227,201,140,0.22), transparent 60%), linear-gradient(180deg, rgba(18,16,14,0.04), rgba(18,16,14,0.12))',
                }}
              />
              <div className="absolute bottom-6 left-6 right-6">
                <div
                  className="rounded-2xl px-5 py-4"
                  style={{
                    border: '1px solid rgba(255,255,255,0.20)',
                    background: 'rgba(255,255,255,0.18)',
                    backdropFilter: 'blur(10px)',
                  }}
                >
                  <div className="text-[10px] tracking-[0.5em] uppercase text-white/85">20 May 2026</div>
                  <div className="font-serif text-white" style={{ fontSize: '26px', fontWeight: 300 }}>
                    A celebration of love
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
