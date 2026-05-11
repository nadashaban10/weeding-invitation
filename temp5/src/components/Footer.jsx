import { COUPLE_DISPLAY, DATE_LINE } from '../constants'

export default function Footer() {
  return (
    <footer className="py-8 px-6 text-center border-t border-gold/15 bg-paper/90 backdrop-blur dark:border-gold/20 dark:bg-teal/50">
      <p className="font-serif text-lg text-teal/90 dark:text-gold-light/90">{COUPLE_DISPLAY}</p>
      <p className="mt-2 text-[10px] tracking-[0.4em] uppercase text-dim dark:text-paper/55">{DATE_LINE}</p>
      <p className="mt-4 text-[10px] tracking-[0.25em] uppercase text-dim/80 dark:text-paper/45">
        Digital invitation · Template 5
      </p>
    </footer>
  )
}
