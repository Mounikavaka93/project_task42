import { useInView } from '../hooks/useInView'

export default function Reveal({
  children,
  className = '',
  delay = 0,
  variant = 'up',
}) {
  const [ref, visible] = useInView()
  const base =
    variant === 'left'
      ? 'reveal-left'
      : variant === 'scale'
        ? 'reveal-scale'
        : 'reveal'

  return (
    <div
      ref={ref}
      className={`${base} ${visible ? 'is-visible' : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}

export function SectionEyebrow({ children, light = false }) {
  return (
    <p
      className={`mb-3 text-[11px] font-medium tracking-[0.32em] uppercase ${
        light ? 'text-gold-light' : 'text-gold'
      }`}
    >
      {children}
    </p>
  )
}

export function SectionTitle({ children, light = false, className = '' }) {
  return (
    <h2
      className={`font-display text-4xl leading-[1.15] font-medium tracking-tight sm:text-5xl lg:text-[3.4rem] ${
        light ? 'text-cream' : 'text-espresso'
      } ${className}`}
    >
      {children}
    </h2>
  )
}
