# 💍 Wedding Digital Invitation — Sophia & Oliver

A luxury digital wedding invitation built with **React + Vite + Tailwind CSS**, inspired by TheDigitalYes style.

---

## 🚀 Getting Started

### 1. Install dependencies
```bash
npm install
```

### 2. Start development server
```bash
npm run dev
```

Then open `http://localhost:5173` in your browser.

---

## 📁 Project Structure

```
wedding-invitation/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── Nav.jsx           ← Side navigation dots
│   │   ├── Petals.jsx        ← Floating petal animation
│   │   ├── Divider.jsx       ← Gold section divider
│   │   ├── HeroSection.jsx   ← Hero + countdown timer
│   │   ├── StorySection.jsx  ← Our Story timeline
│   │   ├── DetailsSection.jsx← Ceremony & reception info
│   │   ├── GallerySection.jsx← Photo gallery
│   │   ├── RSVPSection.jsx   ← RSVP form
│   │   ├── Footer.jsx        ← Footer
│   │   └── useCountdown.js   ← Countdown hook
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── vite.config.js
├── tailwind.config.js
└── postcss.config.js
```

---

## ✏️ Customization

### Change couple names, date & venue
Edit `src/components/HeroSection.jsx`:
```js
const WEDDING_DATE = new Date('2025-09-20T16:00:00').getTime()
```
And update the text in the JSX to your names, venue, and date.

### Change story
Edit the `timeline` array in `src/components/StorySection.jsx`.

### Add real photos to Gallery
Replace the gradient divs in `src/components/GallerySection.jsx` with:
```jsx
<img src="./images/photo1.jpg" alt="..." className="w-full h-full object-cover" />
```
Put your images in `public/images/`.

### Connect RSVP to a real backend
In `src/components/RSVPSection.jsx`, replace the fake `setTimeout` in `handleSubmit` with a real API call (e.g. EmailJS, Formspree, or your own endpoint).

---

## 🏗️ Build for production
```bash
npm run build
```
Output goes to `dist/` — deploy to Netlify, Vercel, or any static host.

---

## 🎨 Colors
| Token | Value | Use |
|-------|-------|-----|
| Gold | `#c9a84c` | Accents, icons |
| Gold Light | `#e8d08a` | Highlights |
| Cream | `#f0e6d0` | Headings |
| Muted | `#9a8e7a` | Body text |
| Subtle | `#7a6a4a` | Labels, dividers |
| Background | `#0e0c09` | Page background |
