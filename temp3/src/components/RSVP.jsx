import { useState } from 'react'

const INITIAL = {
  name: '',
  email: '',
  attending: 'yes',
  guests: '1',
  dietary: '',
  message: '',
}

export default function RSVP() {
  const [form, setForm] = useState(INITIAL)
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    // Simulate API call — replace with your backend endpoint
    await new Promise((r) => setTimeout(r, 1400))
    setLoading(false)
    setSubmitted(true)
  }

  return (
    <section id="rsvp" className="py-10 px-6 max-w-xl mx-auto animate-fade-up">
      <div className="divider mb-12">RSVP</div>

      {submitted ? (
        <div className="animate-scale-in">
          <div
            className="rounded-[30px] p-12 text-center"
            style={{
              border: '1px solid rgba(184, 138, 59, 0.18)',
              background: 'rgba(255,255,255,0.76)',
              boxShadow: '0 24px 70px rgba(18,16,14,0.10)',
            }}
          >
            <div className="relative w-full">
              <div className="mb-6 text-4xl">✨</div>
              <div className="font-serif text-gold" style={{ fontSize: '40px', fontWeight: 300, lineHeight: 1.2 }}>
                {form.attending === 'yes' ? "See You Soon!" : "We'll Miss You!"}
              </div>
              <p className="text-[13px] tracking-[0.2em] uppercase text-dim mt-4 mb-8">
                {form.attending === 'yes' ? "We have received your response." : "Thank you for letting us know."}
              </p>
            </div>

            <div className="p-9 text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
                style={{
                  border: '1px solid rgba(184,138,59,0.22)',
                  background: 'rgba(227,201,140,0.14)',
                }}
              >
                <span className="text-gold">✦</span>
                <span className="text-[10px] tracking-[0.45em] uppercase text-[rgba(123,90,34,1)]">
                  {form.attending === 'yes' ? 'Joyfully accepted' : 'Regretfully declined'}
                </span>
              </div>

              <p className="text-sm text-muted leading-loose italic">
                {form.attending === 'yes' ? (
                  <>
                    We’re honored you’ll celebrate with us. We’ll send final details closer to the date.
                    <br />
                    <span className="text-[rgba(123,90,34,1)]">Guests:</span> {form.guests}
                  </>
                ) : (
                  <>We’ll miss you dearly — thank you for letting us know. You’ll be in our hearts that day.</>
                )}
              </p>

              {form.message?.trim() && (
                <div
                  className="mt-7 rounded-2xl px-6 py-5 text-left"
                  style={{
                    border: '1px solid rgba(184,138,59,0.18)',
                    background: 'rgba(255,255,255,0.7)',
                  }}
                >
                  <div className="text-[10px] tracking-[0.45em] uppercase text-dim mb-2">Your note</div>
                  <div className="text-sm text-ink leading-relaxed italic">"{form.message.trim()}"</div>
                </div>
              )}

              <div className="mt-9 flex flex-wrap gap-3 justify-center">
                <button
                  type="button"
                  className="outline-btn"
                  onClick={() => {
                    setSubmitted(false)
                  }}
                >
                  Edit response
                </button>
                <a href="#details">
                  <button type="button" className="outline-btn">
                   see locations
                  </button>
                </a>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div
          className="relative rounded-[30px] overflow-hidden animate-fade-up anim-delay-1"
          style={{
            border: '1px solid rgba(184, 138, 59, 0.18)',
            background: 'rgba(255,255,255,0.76)',
            boxShadow: '0 24px 70px rgba(18,16,14,0.10)',
          }}
        >
          <div className="pointer-events-none absolute inset-0">
            <img
              src="/images/vecteezy_romantic-wedding-invitation-card-with-greenery-floral_15215529.png"
              alt=""
              className="w-full h-full object-cover opacity-[0.12]"
              loading="lazy"
            />
          </div>

          <div className="relative p-8 sm:p-10">
            <form onSubmit={handleSubmit} className="space-y-8">
          {/* Name + Email */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div>
              <label className="block text-[10px] tracking-[0.3em] uppercase text-dim mb-1">
                Full Name
              </label>
              <input
                className="form-input"
                required
                placeholder="Your full name"
                value={form.name}
                onChange={(e) => set('name', e.target.value)}
              />
            </div>
            <div>
              <label className="block text-[10px] tracking-[0.3em] uppercase text-dim mb-1">
                Email
              </label>
              <input
                className="form-input"
                type="email"
                required
                placeholder="your@email.com"
                value={form.email}
                onChange={(e) => set('email', e.target.value)}
              />
            </div>
          </div>

          {/* Attendance */}
          <div>
            <p className="text-[10px] tracking-[0.3em] uppercase text-dim mb-4">
              Will you attend?
            </p>
            <div className="flex gap-3 flex-wrap">
              {[
                ['yes', 'Joyfully Accepts'],
                ['no', 'Regretfully Declines'],
              ].map(([val, label]) => (
                <button
                  type="button"
                  key={val}
                  onClick={() => set('attending', val)}
                  className={`rsvp-option ${form.attending === val ? 'selected' : ''}`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Guests + Dietary (only if attending) */}
          {form.attending === 'yes' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div>
                <label className="block text-[10px] tracking-[0.3em] uppercase text-dim mb-1">
                  Number of Guests
                </label>
                <select
                  className="form-input"
                  value={form.guests}
                  onChange={(e) => set('guests', e.target.value)}
                  style={{ appearance: 'none' }}
                >
                  {['1', '2', '3', '4'].map((n) => (
                    <option key={n} value={n} style={{ background: '#fffaf6' }}>
                      {n} {n === '1' ? 'Guest' : 'Guests'}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-[10px] tracking-[0.3em] uppercase text-dim mb-1">
                  Dietary Requirements
                </label>
                <input
                  className="form-input"
                  placeholder="Vegetarian, allergies…"
                  value={form.dietary}
                  onChange={(e) => set('dietary', e.target.value)}
                />
              </div>
            </div>
          )}

          {/* Message */}
          <div>
            <label className="block text-[10px] tracking-[0.3em] uppercase text-dim mb-1">
              Message (optional)
            </label>
            <textarea
              className="form-input resize-none"
              rows={3}
              placeholder="Leave a kind word for the couple…"
              value={form.message}
              onChange={(e) => set('message', e.target.value)}
            />
          </div>

          {/* Submit */}
          <div className="text-center pt-2">
            <button type="submit" className="gold-btn" disabled={loading}>
              {loading ? 'Sending…' : 'Send RSVP'}
            </button>
          </div>
            </form>
          </div>
        </div>
      )}
    </section>
  )
}
