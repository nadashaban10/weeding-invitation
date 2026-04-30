const PETALS = Array.from({ length: 12 }, (_, i) => ({
  id: i,
  left: `${8 + i * 8}%`,
  top: `${15 + (i % 5) * 14}%`,
  delay: `${i * 0.4}s`,
  duration: `${3.5 + (i % 3) * 0.5}s`,
  size: `${8 + (i % 3) * 4}px`,
  color: ['rgba(227,201,140,0.95)', 'rgba(184,138,59,0.85)', 'rgba(123,90,34,0.55)'][i % 3],
}))

export default function Petals() {
  return (
    <>
      {PETALS.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-tl-full rounded-br-full animate-float-petal pointer-events-none"
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            background: p.color,
            opacity: 0.25,
            animationDelay: p.delay,
            animationDuration: p.duration,
          }}
        />
      ))}
    </>
  )
}
