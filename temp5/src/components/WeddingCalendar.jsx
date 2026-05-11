const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

function CrescentMark() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"
        stroke="rgba(184,146,74,0.9)"
        strokeWidth="1.2"
        fill="rgba(30,61,58,0.12)"
      />
    </svg>
  )
}

function getMonthGrid(year, monthIndex) {
  const first = new Date(year, monthIndex, 1)
  const startDow = (first.getDay() + 6) % 7
  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate()

  const cells = []
  for (let i = 0; i < startDow; i++) cells.push(null)
  for (let d = 1; d <= daysInMonth; d++) cells.push(d)
  while (cells.length % 7 !== 0) cells.push(null)

  const weeks = []
  for (let i = 0; i < cells.length; i += 7) weeks.push(cells.slice(i, i + 7))
  return weeks
}

export default function WeddingCalendar({ date = new Date(), label = 'Celebration' }) {
  const year = date.getFullYear()
  const month = date.getMonth()
  const day = date.getDate()
  const weeks = getMonthGrid(year, month)
  const monthName = MONTHS[month]

  return (
    <div className="w-full max-w-md mx-auto rounded-[24px] overflow-hidden border border-gold/20 bg-white/82 shadow-[0_16px_48px_rgba(20,18,16,0.07)] transition-shadow duration-500 hover:shadow-lg dark:border-gold/25 dark:bg-teal/40 dark:shadow-[0_16px_48px_rgba(0,0,0,0.35)]">
      <div className="px-5 py-4 flex items-center justify-between border-b border-gold/15 bg-[radial-gradient(480px_120px_at_50%_0%,rgba(184,146,74,0.12),transparent_60%)] dark:border-gold/20 dark:bg-teal/30">
        <div>
          <div className="text-[10px] tracking-[0.45em] uppercase text-dim mb-1.5 dark:text-paper/50">{label}</div>
          <div className="font-serif text-ink dark:text-paper text-2xl font-light">
            {monthName} {day}, {year}
          </div>
        </div>
        <CrescentMark />
      </div>

      <div className="px-5 py-5 dark:bg-teal/25">
        <div className="grid grid-cols-7 gap-1.5 text-center">
          {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => (
            <div key={`${d}-${i}`} className="text-[10px] tracking-[0.28em] uppercase text-dim dark:text-paper/45">
              {d}
            </div>
          ))}
        </div>

        <div className="mt-3 grid grid-cols-7 gap-1.5 text-center">
          {weeks.flat().map((cell, idx) => {
            const isSelected = cell === day
            return (
              <div key={idx} className="flex items-center justify-center">
                <div
                  className={[
                    'w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center text-sm transition-transform duration-300',
                    isSelected
                      ? 'bg-gradient-to-br from-teal/20 to-gold/20 border border-gold/45 text-ink shadow-[0_8px_22px_rgba(30,61,58,0.12)] dark:from-teal/50 dark:to-gold/25 dark:border-gold/50 dark:text-paper dark:shadow-[0_8px_22px_rgba(0,0,0,0.35)]'
                      : cell != null
                        ? 'border border-gold/10 bg-white/55 text-ink/80 dark:border-gold/15 dark:bg-teal/45 dark:text-paper/90'
                        : 'border border-transparent text-transparent',
                  ].join(' ')}
                >
                  {cell ?? '·'}
                </div>
              </div>
            )
          })}
        </div>

        <div className="mt-5 flex items-center justify-center gap-3">
          <span className="h-px w-8 bg-gold/25" />
          <div className="text-[10px] tracking-[0.4em] uppercase text-teal dark:text-gold-light">Save the date</div>
          <span className="h-px w-8 bg-gold/25" />
        </div>
      </div>
    </div>
  )
}
