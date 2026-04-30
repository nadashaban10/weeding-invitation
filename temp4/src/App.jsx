import React from 'react'
import Hero from './components/Hero'
import OurStory from './components/OurStory'
import Details from './components/Details'
import Petal from './components/Petals'
import Gallery from './components/Gallery'
import RSVP from './components/RSVP'
import Footer from './components/Footer'
import InviteGate from './components/InviteGate'

export default function App() {
  return (
    <div className="noise relative">
      <InviteGate
        couple="Sophia & Oliver"
        dateLine="20 · 05 · 2026"
        locationLine="Tuscany, Italy"
        imageSrc="/images/brideandgroom.jpeg"
        onOpen={() => {
          document.getElementById('hero')?.scrollIntoView({ behavior: 'smooth' })
        }}
      />
      <Hero />
      <OurStory />
      <Details />
      <Petal />
      <Gallery />
      <RSVP />
      <Footer />
    </div>
  )
}
