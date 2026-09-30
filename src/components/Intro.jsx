import { useEffect, useState } from 'react'
import Kolam from './Kolam'
import { usePrefersReducedMotion } from './Motion'

export default function Intro({ onDone }) {
  const reduced = usePrefersReducedMotion()
  const [leaving, setLeaving] = useState(false)

  useEffect(() => {
    if (reduced) {
      onDone()
      return undefined
    }

    document.body.style.overflow = 'hidden'
    document.body.classList.add('intro-lock')
    const leave = window.setTimeout(() => setLeaving(true), 2400)
    const done = window.setTimeout(() => {
      document.body.style.overflow = ''
      document.body.classList.remove('intro-lock')
      onDone()
    }, 3180)

    return () => {
      window.clearTimeout(leave)
      window.clearTimeout(done)
      document.body.style.overflow = ''
      document.body.classList.remove('intro-lock')
    }
  }, [onDone, reduced])

  if (reduced) return null

  return (
    <div className={`intro-screen ${leaving ? 'is-leaving' : ''}`}>
      <Kolam className="intro-kolam" light />
      <div className="intro-core">
        <span className="intro-ring" />
        <img src="/amma-icon.jpg" alt="" className="intro-amma" />
      </div>
      <p className="intro-word">Amma Kitchen</p>
      <p className="intro-sub">The feast begins</p>
    </div>
  )
}
