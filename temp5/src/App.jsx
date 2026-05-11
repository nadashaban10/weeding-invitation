import { useRef } from 'react'
import InviteGate from './components/InviteGate'
import ThemeControls from './components/ThemeControls'
import SectionNav from './components/SectionNav'
import Hero from './components/Hero'
import Welcome from './components/Welcome'
import Locations from './components/Locations'
import Gallery from './components/Gallery'
import RSVP from './components/RSVP'
import Footer from './components/Footer'
export default function App() {
  const scrollRoot = useRef(null)
  const scrollToHero = () => {
    requestAnimationFrame(() => {
      document.getElementById('hero')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })
  }
  return (
    <div className="min-h-dvh paper-bg text-ink dark:text-paper">
      <ThemeControls />
      <InviteGate onOpen={scrollToHero} />
      <div ref={scrollRoot} className="snap-root">
        <SectionNav rootRef={scrollRoot} />
        <Hero />
        <Welcome />
        <Locations />
        <Gallery />
        <RSVP />
        <div className="[scroll-snap-align:none]">
          <Footer />
        </div>
      </div>
    </div>
  )
}
