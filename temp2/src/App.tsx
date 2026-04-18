import { useState, useEffect, useRef } from 'react';
import './App.css';

// ─── Wedding date: Friday, May 1, 2026 ───
const WEDDING_DATE = new Date('2026-05-01T14:00:00');

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

// May 2026 — May 1 = Friday (col 5)
const MAY_DAYS = [
  [null, null, null, null, null, 1, 2],
  [3, 4, 5, 6, 7, 8, 9],
  [10, 11, 12, 13, 14, 15, 16],
  [17, 18, 19, 20, 21, 22, 23],
  [24, 25, 26, 27, 28, 29, 30],
  [31, null, null, null, null, null, null],
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

  // Location Carousel State
  const [locationIndex, setLocationIndex] = useState(0);

  const locations = [
    {
      type: "Church of Saint Cyril Greek Melkite",
      label: "Church Ceremony",
      time: "2:00 PM",
      date: "Friday, May 1, 2026",
      link: "https://share.google/GaDmFOWViVfxszcAd",
      image: "/location1.jpeg",
      note: "Let’s celebrate love, family & forever 🤍✨"
    },
    {
      type: "Dusit Thani – New Cairo",
      label: "Reception & Celebration",
      subLabel: "Palms Ballroom",
      time: "6:00 PM",
      date: "Friday, May 1, 2026",
      link: "https://maps.app.goo.gl/2NSQWo4SdSeEEMSz9?g_st=ic",
      image: "/location2.jpeg",
      note: "Your presence is the greatest gift we could ask for."
    }
  ];

  const nextLocation = () => setLocationIndex((prev) => (prev + 1) % locations.length);
  const prevLocation = () => setLocationIndex((prev) => (prev - 1 + locations.length) % locations.length);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !attendance) return;
    setSending(true); setError('');

    // ─────────────────────────────────────────────────────────────────────────
    // PASTE YOUR GOOGLE SCRIPT URL HERE
    // ─────────────────────────────────────────────────────────────────────────
    const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxekTfzqJxesAikvHwmiI4gvPj3DdHHE93OFgdCjhHN1P-7SOuHsYcA0QvOhezeOza24A/exec';

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
            <img src="/brideandgroom.jpeg" className="couple-photo" alt="Raouf & Miriam" />
            <div className="couple-photo-overlay" />
          </div>
          {/* decorative corner ornaments */}
          <span className="frame-corner frame-corner--tl" />
          <span className="frame-corner frame-corner--tr" />
          <span className="frame-corner frame-corner--bl" />
          <span className="frame-corner frame-corner--br" />
        </div>

        <div className="couple-names-badge">
          <p className="badge-eyebrow">We're getting married ❤️</p>
          <p className="badge-names">Raouf & Miriam</p>
          <p className="badge-date">FRIDAY · 1 MAY 2026</p>
        </div>

        {/* Bible Verse before names/quote */}
        <div className="hero-verse reveal">
          <p className="hv-text">“So they are no longer two, but one flesh. Therefore, what God has joined together, no human being must separate.”</p>
          <p className="hv-ref">Matthew 19:6</p>
          <div className="hv-divider">✦</div>
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
          <h3 className="verse-title">We would love for you</h3>
          <p className="verse-text">
            to celebrate this special day with us.
          </p>
          <div className="verse-ornament">✦</div>
        </div>

        {/* Calendar */}
        <div className="calendar-card reveal">
          <div className="calendar-header">
            <span className="calendar-month">May 2026</span>
          </div>
          <div className="calendar-grid">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
              <div key={d} className="cal-weekday">{d}</div>
            ))}
            {MAY_DAYS.flat().map((day, i) => (
              <div key={i} className={[
                'cal-day',
                day === 1 ? 'cal-day--wedding' : '',
                !day ? 'cal-day--empty' : '',
              ].join(' ')}>
                {day && (
                  day === 1 ? (
                    <>
                      <svg className="cal-heart-outline" viewBox="0 0 24 22" fill="none"
                        stroke="currentColor" strokeWidth="1.8" aria-hidden>
                        <path d="M12 20C12 20 2 13 2 7C2 4 4.5 2 7.5 2C9.5 2 11 3.2 12 5C13 3.2 14.5 2 16.5 2C19.5 2 22 4 22 7C22 13 12 20 12 20Z" />
                      </svg>
                      <span className="wedding-day-num">1</span>
                    </>
                  ) : <span className="day-num">{day}</span>
                )}
              </div>
            ))}
          </div>
          <p className="calendar-note">Friday, May 1st</p>
        </div>
      </section>
      {/* ══════════════════════════════════════════
          ROSES PHOTO & COUNTDOWN OVERLAY
      ══════════════════════════════════════════ */}
      <section className="countdown-section reveal">
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

      <section className="location-section">
        <h2 className="location-title reveal">Locations</h2>

        <div className="location-gallery">
            <div className="gallery-frame frame-primary">
              <img src="/location1.jpeg" alt="Venue 1" />
            </div>
            <div className="gallery-frame frame-secondary">
              <img src="/location2.jpeg" alt="Venue 2" />
            </div>
        </div>

        <div className="location-carousel-wrapper reveal">
          <button className="carousel-btn prev" onClick={prevLocation} aria-label="Previous">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="24" height="24">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          <div className="location-card-container">
            {locations.map((loc, idx) => (
              <div 
                key={idx} 
                className={`location-card no-img ${idx === locationIndex ? 'active' : ''}`}
              >
                <div className="venue-body">
                  <p className="venue-label">{loc.label}</p>
                  <p className="venue-type">{loc.type}</p>
                  {loc.subLabel && <p className="venue-sublabel">{loc.subLabel}</p>}
                  <div className="venue-divider" />
                  <p className="venue-datetime">
                    <span>📅 {loc.date}</span>
                    <span>⏰ {loc.time}</span>
                  </p>
                  <a
                    className="venue-map-btn"
                    href={loc.link}
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
                    {loc.note}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <button className="carousel-btn next" onClick={nextLocation} aria-label="Next">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="24" height="24">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>

        <div className="carousel-dots">
          {locations.map((_, idx) => (
            <span 
              key={idx} 
              className={`dot ${idx === locationIndex ? 'active' : ''}`} 
              onClick={() => setLocationIndex(idx)}
            />
          ))}
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
            <div className="thanks-icon">✨</div>
            <p>Thank you for your response!</p>
            <p className="thanks-sub">We can't wait to celebrate with you. 🤍</p>
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
        <p>Raouf & Miriam · May 1, 2026 ♥</p>
        
      </footer>
    </div>
  );
}