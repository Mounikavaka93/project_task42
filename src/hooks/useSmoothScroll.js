import { useEffect } from 'react'

const ease = (t) => (t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2)

function animateScroll(to, duration = 900) {
  const from = window.scrollY
  const change = to - from
  if (Math.abs(change) < 1) return
  const start = performance.now()

  const tick = (now) => {
    const t = Math.min(1, (now - start) / duration)
    window.scrollTo(0, from + change * ease(t))
    if (t < 1) requestAnimationFrame(tick)
  }

  requestAnimationFrame(tick)
}

export function useSmoothScroll() {
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const offset = 88

    const onClick = (event) => {
      const link = event.target.closest('a[href^="#"]')
      if (!link) return
      const id = link.getAttribute('href')?.slice(1)
      if (!id) return
      const section = document.getElementById(id)
      if (!section) return
      event.preventDefault()
      const top = Math.max(
        0,
        section.getBoundingClientRect().top + window.scrollY - offset,
      )
      if (reduced) window.scrollTo(0, top)
      else animateScroll(top, 920)
    }

    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [])
}
