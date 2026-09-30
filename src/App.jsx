import { useCallback, useEffect, useState } from 'react'
import About from './components/About'
import Contact from './components/Contact'
import Events from './components/Events'
import Footer from './components/Footer'
import Gallery from './components/Gallery'
import Hero from './components/Hero'
import Intro from './components/Intro'
import Menu from './components/Menu'
import Navbar from './components/Navbar'
import Services from './components/Services'
import Testimonials from './components/Testimonials'
import { Cursor, Marquee, OrbitFeast } from './components/Motion'
import { marqueeItems, navLinks } from './data'
import { useSmoothScroll } from './hooks/useSmoothScroll'

export default function App() {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('home')
  const [progress, setProgress] = useState(0)
  const [orderPackage, setOrderPackage] = useState('Wedding Sadya')
  const [intro, setIntro] = useState(true)
  const endIntro = useCallback(() => setIntro(false), [])
  useSmoothScroll()

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 24)

      const height = document.documentElement.scrollHeight - window.innerHeight
      setProgress(height > 0 ? (y / height) * 100 : 0)

      let current = 'home'
      navLinks.forEach((link) => {
        const section = document.getElementById(link.id)
        if (section && section.getBoundingClientRect().top <= 140) {
          current = link.id
        }
      })
      setActive(current)
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="w-full min-h-screen overflow-x-hidden bg-cream">
      {intro && <Intro onDone={endIntro} />}
      <Cursor />
      <div
        className="pointer-events-none fixed top-0 left-0 z-[60] h-[2px] bg-gold progress-glow"
        style={{ width: `${progress}%` }}
      />
      <Navbar scrolled={scrolled} active={active} progress={progress} />
      <main className="w-full">
        <Hero />
        <About />
        <OrbitFeast items={marqueeItems} />
        <Marquee items={marqueeItems} />
        <Services />
        <Menu />
        <Events onSelectPackage={setOrderPackage} />
        <Gallery />
        <Testimonials />
        <Contact
          selectedPackage={orderPackage}
          onPackageChange={setOrderPackage}
        />
      </main>
      <Footer />
    </div>
  )
}
