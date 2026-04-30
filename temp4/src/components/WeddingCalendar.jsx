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

function HeartMark() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 21s-7-4.6-9.3-9.2C.7 7.8 3 5 6 5c1.7 0 3.2.9 4 2.2C10.8 5.9 12.3 5 14 5c3 0 5.3 2.8 3.3 6.8C19 16.4 12 21 12 21z"
        fill="rgba(227,201,140,0.95)"
      />
      <path
        d="M12 21s-7-4.6-9.3-9.2C.7 7.8 3 5 6 5c1.7 0 3.2.9 4 2.2C10.8 5.9 12.3 5 14 5c3 0 5.3 2.8 3.3 6.8C19 16.4 12 21 12 21z"
        fill="none"
        stroke="rgba(184,138,59,0.85)"
        strokeWidth="1.2"
      />
    </svg>
  )
}

function getMonthGrid(year, monthIndex) {
  const first = new Date(year, monthIndex, 1)
  const startDow = (first.getDay() + 6) % 7 // Monday=0
  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate()

  const cells = []
  for (let i = 0; i < startDow; i++) cells.push(null)
  for (let d = 1; d <= daysInMonth; d++) cells.push(d)
  while (cells.length % 7 !== 0) cells.push(null)

  const weeks = []
  for (let i = 0; i < cells.length; i += 7) weeks.push(cells.slice(i, i + 7))
  return weeks
}

export default function WeddingCalendar({
  date = new Date('2026-05-20T16:00:00'),
  label = 'Wedding Day',
}) {
  const year = date.getFullYear()
  const month = date.getMonth()
  const day = date.getDate()
  const weeks = getMonthGrid(year, month)
  const monthName = MONTHS[month]

  return (
    <div
      className="w-full rounded-[26px] overflow-hidden"
      style={{
        border: '1px solid rgba(184, 138, 59, 0.18)',
        background: 'rgba(255,255,255,0.72)',
        boxShadow: '0 18px 60px rgba(18,16,14,0.08)',
      }}
    >
      <div
        className="px-6 py-5 flex items-center justify-between"
        style={{
          borderBottom: '1px solid rgba(184, 138, 59, 0.14)',
          background:
            'radial-gradient(520px 140px at 50% 0%, rgba(227,201,140,0.20), transparent 60%)',
        }}
      >
        <div>
          <div className="text-[10px] tracking-[0.5em] uppercase text-dim mb-2">{label}</div>
          <div className="font-serif text-ink" style={{ fontSize: '26px', fontWeight: 300 }}>
            {monthName} {day}, {year}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <HeartMark />
        </div>
      </div>

      <div className="px-6 py-6">
        <div className="grid grid-cols-7 gap-2 text-center">
          {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d) => (
            <div
              key={d}
              className="text-[10px] tracking-[0.35em] uppercase text-dim"
              style={{ letterSpacing: '0.25em' }}
            >
              {d}
            </div>
          ))}
        </div>

        <div className="mt-4 grid grid-cols-7 gap-2 text-center">
          {weeks.flat().map((d, idx) => {
            const isSelected = d === day
            return (
              <div key={idx} className="flex items-center justify-center">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center text-sm"
                  style={
                    isSelected
                      ? {
                          background:
                            'linear-gradient(90deg, rgba(227,201,140,0.35), rgba(184,138,59,0.22))',
                          border: '1px solid rgba(227,201,140,0.50)',
                          color: 'rgba(18,16,14,0.92)',
                          boxShadow: '0 10px 26px rgba(184,138,59,0.18)',
                        }
                      : {
                          color: d ? 'rgba(18,16,14,0.78)' : 'transparent',
                          border: d ? '1px solid rgba(184,138,59,0.10)' : '1px solid transparent',
                          background: d ? 'rgba(255,255,255,0.55)' : 'transparent',
                        }
                  }
                >
                  {d ?? '•'}
                </div>
              </div>
            )
          })}
        </div>

        <div className="mt-6 flex items-center justify-center gap-3">
          <span className="h-px w-10" style={{ background: 'rgba(184,138,59,0.22)' }} />
          <div className="text-[10px] tracking-[0.45em] uppercase text-[rgba(123,90,34,1)]">
            Save this date
          </div>
          <span className="h-px w-10" style={{ background: 'rgba(184,138,59,0.22)' }} />
        </div>
      </div>
    </div>
  )
}

