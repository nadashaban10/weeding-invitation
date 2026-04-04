import { useState, useEffect, useRef } from 'react';
import './App.css';

// ─── Wedding date: Friday, April 24, 2026 ───
const WEDDING_DATE = new Date('2026-04-24T15:00:00');

/* ── Countdown hook ── */
function useCountdown(targetDate: Date) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  useEffect(() => {
    const update = () => {
      const diff = targetDate.getTime() - Date.now();
      if (diff <= 0) { setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 }); return; }
      setTimeLeft({
        days: Math.floor(diff / 86_400_000),
        hours: Math.floor((diff / 3_600_000) % 24),
        minutes: Math.floor((diff / 60_000) % 60),
        seconds: Math.floor((diff / 1_000) % 60),
      });
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, [targetDate]);
  return timeLeft;
}

/* ── Scroll-reveal hook ── */
function useScrollReveal() {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>('.reveal');
    const io = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('revealed'); }),
      { threshold: 0.1 }
    );
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);
}

// April 2026 — April 1 = Wednesday (col 3)
const APRIL_DAYS = [
  [null, null, null, 1, 2, 3, 4],
  [5, 6, 7, 8, 9, 10, 11],
  [12, 13, 14, 15, 16, 17, 18],
  [19, 20, 21, 22, 23, 24, 25],
  [26, 27, 28, 29, 30, null, null],
];

export default function App() {
  useScrollReveal();
  const countdown = useCountdown(WEDDING_DATE);
  const formRef = useRef<HTMLFormElement>(null);

  const [name, setName] = useState('');
  const [family, setFamily] = useState('');
  const [attendance, setAttendance] = useState<'yes' | 'no' | null>(null);
  const [sending, setSending] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !attendance) return;
    setSending(true); setError('');

    // ─────────────────────────────────────────────────────────────────────────
    // PASTE YOUR GOOGLE SCRIPT URL HERE
    // ─────────────────────────────────────────────────────────────────────────
    const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzQYuBUS8yV1JCLg9MtF2In4wMxT94TR9byIEwXwYNakR9bw1_VldhWb4CMgEJdFiI_zA/exec';

    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors', // Apps Script requires no-cors for direct browser submissions
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          family: family || 'N/A',
          attendance: attendance === 'yes' ? 'yes' : 'no'
        }),
      });

      // With 'no-cors', the response is opaque, but if fetch doesn't throw, 
      // the data has been successfully dispatched to the sheet.
      setSubmitted(true);
    } catch (err: any) {
      console.error('RSVP Error:', err);
      setError('Something went wrong. Please try again.');
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="invitation-wrapper">

      {/* ══════════════════════════════════════════
          COUPLE PHOTO HERO
      ══════════════════════════════════════════ */}
      <section className="couple-hero">

        <div className="couple-photo-wrap reveal">
          <div className="couple-photo-frame">
            <img src="/bride&groom2.jpg" className="couple-photo" alt="Beshoy & Elaria" />
            <div className="couple-photo-overlay" />
          </div>
          {/* decorative corner ornaments */}
          <span className="frame-corner frame-corner--tl" />
          <span className="frame-corner frame-corner--tr" />
          <span className="frame-corner frame-corner--bl" />
          <span className="frame-corner frame-corner--br" />
        </div>

        {/* Bible Verse before names/quote */}
        <div className="hero-verse reveal">
          <p className="hv-text">“Three things will last forever—faith, hope, and love—and the greatest of these is love.”</p>
          <p className="hv-ref">1 Corinthians 13:13</p>
          <div className="hv-divider">✦</div>
        </div>

        {/* names badge below photo */}
        <div className="couple-names-badge reveal">
          <p className="badge-eyebrow">You are cordially invited to the wedding of</p>
          <p className="badge-names">Beshoy &amp; Elaria</p>
          <p className="badge-date">Friday · April 24, 2026</p>
        </div>

      </section>

      {/* ══════════════════════════════════════════
          INVITATION VERSE
      ══════════════════════════════════════════ */}
      <section className="verse-section">
        <img src="/Layer 1 1 (1).png" className="verse-watercolor" alt="" aria-hidden />
        <img src="/yyy 9.png" className="verse-leaf-right" alt="" aria-hidden />
        <img src="/yyy 7.png" className="verse-leaf-left" alt="" aria-hidden />

        <div className="verse-content reveal">
          <div className="verse-ornament">✦</div>
          <h3 className="verse-title">Dear Guests</h3>
          <p className="verse-text">
            In the presence of God and with thankful hearts for His grace,
            we invite our beloved family and friends to witness our union
            in faith as we become one. Your presence would be a true
            blessing as we begin this life-changing chapter together.
          </p>
          <div className="verse-ornament">✦</div>
        </div>

        {/* Calendar */}
        <div className="calendar-card reveal">
          <div className="calendar-header">
            <span className="calendar-month">April 2026</span>
          </div>
          <div className="calendar-grid">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
              <div key={d} className="cal-weekday">{d}</div>
            ))}
            {APRIL_DAYS.flat().map((day, i) => (
              <div key={i} className={[
                'cal-day',
                day === 24 ? 'cal-day--wedding' : '',
                !day ? 'cal-day--empty' : '',
              ].join(' ')}>
                {day && (
                  day === 24 ? (
                    <>
                      <svg className="cal-heart-outline" viewBox="0 0 24 22" fill="none"
                        stroke="currentColor" strokeWidth="1.8" aria-hidden>
                        <path d="M12 20C12 20 2 13 2 7C2 4 4.5 2 7.5 2C9.5 2 11 3.2 12 5C13 3.2 14.5 2 16.5 2C19.5 2 22 4 22 7C22 13 12 20 12 20Z" />
                      </svg>
                      <span className="wedding-day-num">24</span>
                    </>
                  ) : <span className="day-num">{day}</span>
                )}
              </div>
            ))}
          </div>
          <p className="calendar-note">Friday, April 24th</p>
        </div>
      </section>
      {/* ══════════════════════════════════════════
          ROSES PHOTO & COUNTDOWN OVERLAY
      ══════════════════════════════════════════ */}
      <section className="roses-photo-section reveal">
        <img src="/b4df593f5c852421f435b00095d3258f4b1177c4.jpg" className="roses-full-photo" alt="roses" />
        <div className="roses-photo-overlay" />
        
        {/* Countdown overlaying the photo */}
        <div className="countdown-overlay">
          <p className="countdown-label">Counting down to our big day</p>
          <div className="countdown-grid">
            {[
              { val: countdown.days,    label: 'Days' },
              { val: countdown.hours,   label: 'Hours' },
              { val: countdown.minutes, label: 'Min' },
              { val: countdown.seconds, label: 'Sec' },
            ].map(({ val, label }, i, arr) => (
              <span key={label} className="countdown-unit-wrap">
                <span className="countdown-unit">
                  <span className="countdown-num">{String(val).padStart(2, '0')}</span>
                  <span className="countdown-unit-label">{label}</span>
                </span>
                {i < arr.length - 1 && <span className="countdown-colon">:</span>}
              </span>
            ))}
          </div>
        </div>
      </section>

    


      {/* ══════════════════════════════════════════
          LOCATION — TWO VENUES
      ══════════════════════════════════════════ */}
      <section className="location-section">
        <img src="/unsplash_s87ngBxo4xg (1).png" className="loc-flower-right" alt="" aria-hidden />
        <img src="/yyy 7.png" className="loc-leaf-left" alt="" aria-hidden />
        <img src="/yyyyyy 1 (1).png" className="loc-gold" alt="" aria-hidden />

        <h2 className="location-title reveal">Locations</h2>

        {/* ── Venue 1: Church ── */}
        <div className="venue-card reveal" style={{ '--delay': '0s' } as React.CSSProperties}>
          <div className="venue-icon">
            {/* cross icon for church */}
            <svg viewBox="0 0 24 24" fill="none" stroke="#7a1c2e" strokeWidth="1.8" width="22" height="22">
              <line x1="12" y1="3" x2="12" y2="21" /><line x1="7" y1="8" x2="17" y2="8" />
            </svg>
          </div>
          <div className="venue-body">
            <p className="venue-type">St. Mark's Coptic Orthodox Church - Cleopatra</p>
            <p className="venue-label">Church Ceremony</p>
            <div className="venue-divider" />
            <p className="venue-datetime">
              <span>📅 Friday, April 24, 2026</span>
              <span>⏰ 3:00 PM</span>
            </p>
            <a
              className="venue-map-btn"
              href="https://maps.app.goo.gl/ExjqeKPHkJkZ9qP3A?g_st=ic"
              target="_blank"
              rel="noreferrer"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              Open on Map
            </a>
            <p className="venue-note">
              The ceremony is over,<br />now let the celebration begin!
            </p>
          </div>
        </div>

        {/* connector */}
        <div className="venues-connector reveal">
          <div className="connector-line" />
          <span className="connector-heart">♥</span>
          <div className="connector-line" />
        </div>

        {/* ── Venue 2: White Resort ── */}
        <div className="venue-card reveal" style={{ '--delay': '0.15s' } as React.CSSProperties}>
          <div className="venue-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="#7a1c2e" strokeWidth="1.8" width="22" height="22">
              <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
          </div>
          <div className="venue-body">
            <p className="venue-type">White Resort Orabi</p>
            <p className="venue-label">Reception & Celebration</p>
            <div className="venue-divider" />
            <p className="venue-datetime">
              <span>📅 Friday, April 24, 2026</span>
              <span>⏰ 4:30 PM</span>
            </p>
            <a
              className="venue-map-btn"
              href="https://maps.app.goo.gl/23rwEBe8P6U78Qc98?g_st=ic"
              target="_blank"
              rel="noreferrer"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              Open on Map
            </a>
            <p className="venue-note">
              Please join us to toast our new beginning.<br />
              Your presence is the greatest gift we could ask for.<br />
              Bring your dancing shoes — festivities begin at 5:00 PM!<br />
              <em>Sweet dreams to your little ones.</em>
            </p>
          </div>
        </div>

      </section>

      {/* ══════════════════════════════════════════
          RSVP
      ══════════════════════════════════════════ */}
      <section className="rsvp-section">
        <img src="/yyy 8.png" className="rsvp-cherry-left" alt="" aria-hidden />
        <img src="/yyy 9.png" className="rsvp-leaf-right" alt="" aria-hidden />
       
        <h2 className="rsvp-title reveal">
          {submitted 
            ? (attendance === 'yes' ? "See You Soon!" : "We'll Miss You!") 
            : "RSVP"}
        </h2>
        <p className="rsvp-subtitle reveal">
          {submitted 
            ? (attendance === 'yes' ? "We have received your response." : "Thank you for letting us know.") 
            : "Please respond by April 17, 2026"}
        </p>

        {submitted ? (
          <div className="rsvp-thanks fade-in">
            <p>🌹 Thank you, {name}!</p>
            <p className="thanks-sub">
              {attendance === 'yes' 
                ? "We can't wait to celebrate with you." 
                : "We truly appreciate your warm wishes and will be thinking of you!"}
            </p>
          </div>
        ) : (
          <form ref={formRef} className="rsvp-form reveal" onSubmit={handleSubmit}>
            <div className="rsvp-field">
              <label htmlFor="guest-name">Your Name</label>
              <input id="guest-name" name="guest_name" type="text"
                placeholder="Full name" value={name}
                onChange={e => setName(e.target.value)} required />
            </div>
            <div className="rsvp-field">
              <label htmlFor="guest-family">Family / Plus One</label>
              <input id="guest-family" name="guest_family" type="text"
                placeholder="Name(s)" value={family}
                onChange={e => setFamily(e.target.value)} />
            </div>
            <div className="rsvp-field">
              <label>Will you be able to attend?</label>
              <label className="rsvp-radio">
                <input type="radio" name="attendance" value="yes"
                  checked={attendance === 'yes'} onChange={() => setAttendance('yes')} />
                Yes, I will be able to attend
              </label>
              <label className="rsvp-radio">
                <input type="radio" name="attendance" value="no"
                  checked={attendance === 'no'} onChange={() => setAttendance('no')} />
                No, I will not be able to attend
              </label>
            </div>
            {error && <p className="rsvp-error">{error}</p>}
            <button type="submit" className="rsvp-submit"
              disabled={!name || !attendance || sending}>
              {sending ? 'Sending...' : 'Submit'}
            </button>
          </form>
        )}
      </section>

      {/* ══════════════════════════════════════════
          FOOTER
      ══════════════════════════════════════════ */}
      <footer className="invitation-footer">
        <img src="/yyy 8.png" className="footer-leaf" alt="" aria-hidden />
        <p>Beshoy &amp; Elaria · April 24, 2026</p>
        <p className="footer-heart">♥</p>
      </footer>
    </div>
  );
}