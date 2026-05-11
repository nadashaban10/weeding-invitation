import { useState } from 'react'
import { RSVP_GOOGLE_SCRIPT_URL } from '../constants'
import Petals from './Petals'

const INITIAL = {
  name: '',
  email: '',
  attending: 'yes',
  guests: '1',
  dietary: '',
  message: '',
}

function buildFamilyPayload(form) {
  const parts = [
    `Email: ${form.email}`,
    `Guests: ${form.guests}`,
    form.dietary.trim() ? `Dietary: ${form.dietary.trim()}` : null,
    form.message.trim() ? `Message: ${form.message.trim()}` : null,
  ].filter(Boolean)
  return parts.join(' | ') || 'N/A'
}

export default function RSVP() {
  const [form, setForm] = useState(INITIAL)
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      await fetch(RSVP_GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name.trim(),
          family: buildFamilyPayload(form),
          attendance: form.attending === 'yes' ? 'yes' : 'no',
        }),
      })
      setSubmitted(true)
    } catch (err) {
      console.error('RSVP Error:', err)
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section
      id="rsvp"
      className="snap-panel relative flex flex-col items-center justify-center overflow-hidden bg-transparent px-5 sm:px-8 py-14"
    >
      <Petals
        count={6}
        className="z-0 opacity-[0.38] dark:opacity-[0.28] motion-safe:animate-fade-in"
      />

      <div className="relative z-[1] mx-auto w-full max-w-xl">
        <div className="divider mb-10 animate-fade-up">RSVP</div>

        {submitted ? (
          <div
            className="rounded-[28px] overflow-hidden animate-scale-in text-center border border-gold/22 bg-white/92 shadow-[0_26px_70px_rgba(20,18,16,0.1)] dark:border-gold/25 dark:bg-teal/40 dark:shadow-[0_26px_70px_rgba(0,0,0,0.4)]"
          >
            <div className="px-8 pt-10 pb-6">
              <h2 className="font-serif text-3xl sm:text-[2.35rem] text-teal font-light leading-tight animate-fade-in dark:text-gold-light">
                {form.attending === 'yes' ? 'See You Soon!' : "We'll Miss You!"}
              </h2>
              <p className="mt-3 text-sm tracking-[0.08em] text-muted italic dark:text-paper/70">
                {form.attending === 'yes'
                  ? 'We have received your response.'
                  : 'Thank you for letting us know.'}
              </p>
            </div>

            <div className="px-8 pb-10 animate-fade-up anim-delay-1">
              <div className="text-2xl mb-2" aria-hidden>
                ✨
              </div>
              <p className="font-serif text-xl sm:text-2xl text-ink font-light dark:text-paper">Thank you for your response!</p>
              <p className="mt-4 text-sm text-muted leading-relaxed italic max-w-md mx-auto dark:text-paper/70">
                {form.attending === 'yes'
                  ? "We can't wait to celebrate with you. 🤍"
                  : "We're grateful you let us know — you're in our thoughts. 🤍"}
              </p>

              <div className="flex flex-wrap gap-3 justify-center mt-9">
                <button
                  type="button"
                  className="outline-btn"
                  onClick={() => {
                    setSubmitted(false)
                    setError('')
                  }}
                >
                  Edit response
                </button>
                <button
                  type="button"
                  className="outline-btn"
                  onClick={() =>
                    document.getElementById('locations')?.scrollIntoView({ behavior: 'smooth' })
                  }
                >
                  See venues
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div
            className="relative rounded-[28px] p-8 sm:p-10 animate-fade-up anim-delay-1 border border-gold/22 bg-white/88 shadow-[0_22px_65px_rgba(20,18,16,0.09)] dark:border-gold/25 dark:bg-teal/35 dark:shadow-[0_22px_65px_rgba(0,0,0,0.35)]"
          >
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div>
                  <label className="block text-[10px] tracking-[0.28em] uppercase text-dim mb-1 dark:text-paper/50">
                    Full name
                  </label>
                  <input
                    className="form-input"
                    required
                    placeholder="Your name"
                    value={form.name}
                    onChange={(e) => set('name', e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-[10px] tracking-[0.28em] uppercase text-dim mb-1 dark:text-paper/50">
                    Email
                  </label>
                  <input
                    className="form-input"
                    type="email"
                    required
                    placeholder="you@email.com"
                    value={form.email}
                    onChange={(e) => set('email', e.target.value)}
                  />
                </div>
              </div>

              <div>
                <p className="text-[10px] tracking-[0.28em] uppercase text-dim mb-4 dark:text-paper/50">Will you attend?</p>
                <div className="flex gap-3 flex-wrap">
                  {[
                    ['yes', 'Joyfully accepts'],
                    ['no', 'Regretfully declines'],
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

              {form.attending === 'yes' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 animate-fade-in">
                  <div>
                    <label className="block text-[10px] tracking-[0.28em] uppercase text-dim mb-1 dark:text-paper/50">
                      Guests
                    </label>
                    <select
                      className="form-input"
                      value={form.guests}
                      onChange={(e) => set('guests', e.target.value)}
                      style={{ appearance: 'none', background: 'transparent' }}
                    >
                      {['1', '2', '3', '4'].map((n) => (
                        <option key={n} value={n} className="bg-paper dark:bg-teal">
                          {n} {n === '1' ? 'guest' : 'guests'}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] tracking-[0.28em] uppercase text-dim mb-1 dark:text-paper/50">
                      Dietary notes
                    </label>
                    <input
                      className="form-input"
                      placeholder="Allergies, vegetarian…"
                      value={form.dietary}
                      onChange={(e) => set('dietary', e.target.value)}
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-[10px] tracking-[0.28em] uppercase text-dim mb-1 dark:text-paper/50">
                  Message (optional)
                </label>
                <textarea
                  className="form-input resize-none"
                  rows={3}
                  placeholder="A kind word for the couple…"
                  value={form.message}
                  onChange={(e) => set('message', e.target.value)}
                />
              </div>

              {error ? (
                <p className="text-center text-sm italic text-red-800/90 dark:text-red-300/90">{error}</p>
              ) : null}

              <div className="text-center pt-1">
                <button type="submit" className="gold-btn" disabled={loading}>
                  {loading ? 'Sending…' : 'Submit'}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </section>
  )
}
