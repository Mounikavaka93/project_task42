import { useEffect, useRef, useState } from 'react'
import { useInView } from '../hooks/useInView'
import Kolam from './Kolam'

export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReduced(media.matches)
    update()
    media.addEventListener('change', update)
    return () => media.removeEventListener('change', update)
  }, [])

  return reduced
}

export function Magnetic({ children, className = '', strength = 0.28 }) {
  const ref = useRef(null)
  const reduced = usePrefersReducedMotion()

  const onMove = (event) => {
    if (reduced || !ref.current) return
    const box = ref.current.getBoundingClientRect()
    const x = event.clientX - box.left - box.width / 2
    const y = event.clientY - box.top - box.height / 2
    ref.current.style.transform = `translate(${x * strength}px, ${y * strength}px)`
  }

  const onLeave = () => {
    if (!ref.current) return
    ref.current.style.transform = 'translate(0, 0)'
  }

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`magnetic ${className}`}
    >
      {children}
    </div>
  )
}

export function TiltCard({ children, className = '' }) {
  const ref = useRef(null)
  const reduced = usePrefersReducedMotion()

  const onMove = (event) => {
    if (reduced || !ref.current) return
    const box = ref.current.getBoundingClientRect()
    const px = (event.clientX - box.left) / box.width
    const py = (event.clientY - box.top) / box.height
    const rx = (py - 0.5) * -12
    const ry = (px - 0.5) * 14
    ref.current.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) scale3d(1.03, 1.03, 1.03)`
  }

  const onLeave = () => {
    if (!ref.current) return
    ref.current.style.transform =
      'perspective(900px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)'
  }

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`tilt-card h-full ${className}`}
    >
      {children}
    </div>
  )
}

export function CountUp({ value, suffix = '', className = '' }) {
  const [ref, visible] = useInView()
  const [count, setCount] = useState(0)
  const reduced = usePrefersReducedMotion()

  useEffect(() => {
    if (!visible) return
    if (reduced) {
      setCount(value)
      return
    }

    const duration = 1400
    const start = performance.now()
    let frame = 0

    const tick = (now) => {
      const progress = Math.min(1, (now - start) / duration)
      const eased = 1 - (1 - progress) ** 3
      setCount(Math.round(eased * value))
      if (progress < 1) frame = requestAnimationFrame(tick)
    }

    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [visible, value, reduced])

  return (
    <span ref={ref} className={className}>
      {count.toLocaleString('en-IN')}
      {suffix}
    </span>
  )
}

export function OrbitFeast({ items }) {
  return (
    <section className="orbit-wrap" aria-hidden="true">
      <div className="orbit-stage">
        <div className="orbit-ring">
          {items.map((item, index) => (
            <span
              key={item}
              className="orbit-item"
              style={{
                '--i': index,
                '--n': items.length,
              }}
            >
              {item}
            </span>
          ))}
        </div>
        <div className="orbit-heart">
          <Kolam className="orbit-kolam" light />
          <div className="orbit-core">
            <img src="/amma-icon.jpg" alt="" />
          </div>
        </div>
      </div>
    </section>
  )
}

export function Marquee({ items }) {
  const row = [...items, ...items]

  return (
    <div className="marquee border-y border-linen bg-ivory py-4" aria-hidden="true">
      <div className="marquee-track">
        {row.map((item, index) => (
          <span key={`${item}-${index}`} className="marquee-item">
            {item}
            <span className="mx-5 text-gold">✦</span>
          </span>
        ))}
      </div>
    </div>
  )
}

export function Cursor() {
  const reduced = usePrefersReducedMotion()
  const dot = useRef(null)
  const ring = useRef(null)
  const canvas = useRef(null)
  const pos = useRef({ x: 0, y: 0, dx: 0, dy: 0 })

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches
    if (reduced || !fine) return undefined

    document.body.classList.add('has-cursor')
    const dust = []
    const board = canvas.current
    if (!board) return undefined
    const ctx = board.getContext('2d')

    const size = () => {
      board.width = window.innerWidth
      board.height = window.innerHeight
    }
    size()

    const spark = (x, y, burst = false) => {
      const count = burst ? 16 : 1
      for (let i = 0; i < count; i += 1) {
        if (dust.length > 90) dust.shift()
        const angle = burst ? (Math.PI * 2 * i) / count : Math.random() * Math.PI * 2
        const speed = burst ? 2.4 + Math.random() * 2.2 : 0.25 + Math.random() * 0.6
        dust.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - (burst ? 0.6 : 0),
          life: burst ? 1 : 0.7,
          size: burst ? 2.2 : 1.2 + Math.random(),
        })
      }
    }

    let last = 0
    const onMove = (event) => {
      pos.current.x = event.clientX
      pos.current.y = event.clientY
      const now = performance.now()
      if (now - last > 28) {
        spark(event.clientX, event.clientY)
        last = now
      }
      if (dot.current) {
        dot.current.style.transform = `translate(${event.clientX}px, ${event.clientY}px)`
      }
    }

    const onClick = (event) => spark(event.clientX, event.clientY, true)

    const onOver = (event) => {
      const hover = event.target.closest('a, button, input, select, textarea')
      document.body.classList.toggle('cursor-hover', Boolean(hover))
    }

    let frame = 0
    const loop = () => {
      pos.current.dx += (pos.current.x - pos.current.dx) * 0.16
      pos.current.dy += (pos.current.y - pos.current.dy) * 0.16
      if (ring.current) {
        ring.current.style.transform = `translate(${pos.current.dx}px, ${pos.current.dy}px)`
      }

      ctx.clearRect(0, 0, board.width, board.height)
      for (let i = dust.length - 1; i >= 0; i -= 1) {
        const p = dust[i]
        p.x += p.vx
        p.y += p.vy
        p.vy += 0.02
        p.life -= 0.018
        if (p.life <= 0) {
          dust.splice(i, 1)
          continue
        }
        ctx.beginPath()
        ctx.fillStyle = `rgba(196, 163, 106, ${p.life})`
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fill()
      }

      frame = requestAnimationFrame(loop)
    }

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseover', onOver)
    window.addEventListener('click', onClick)
    window.addEventListener('resize', size)
    frame = requestAnimationFrame(loop)

    return () => {
      document.body.classList.remove('has-cursor', 'cursor-hover')
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseover', onOver)
      window.removeEventListener('click', onClick)
      window.removeEventListener('resize', size)
      cancelAnimationFrame(frame)
    }
  }, [reduced])

  if (reduced) return null

  return (
    <>
      <canvas ref={canvas} className="cursor-dust" />
      <div ref={ring} className="cursor-ring" />
      <div ref={dot} className="cursor-dot" />
    </>
  )
}
