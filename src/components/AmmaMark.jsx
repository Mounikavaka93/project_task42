export default function AmmaMark({ className = 'h-10 w-10' }) {
  return (
    <img
      src="/amma-icon.jpg"
      alt="Amma"
      className={`logo-mark rounded-full object-cover object-top ring-1 ring-gold/40 ${className}`}
    />
  )
}
