import { ArrowDown, ArrowRight } from 'lucide-react'
import { useEffect, useRef } from 'react'
import Kolam from './Kolam'
import { Magnetic } from './Motion'
import SafeImg from './SafeImg'

export default function Hero() {
  const stage = useRef(null)
  const art = useRef(null)
  const copy = useRef(null)

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return undefined
    const root = stage.current

    const onMove = (event) => {
      if (!root) return
      const box = root.getBoundingClientRect()
      const mx = event.clientX - box.left
      const my = event.clientY - box.top
      root.style.setProperty('--mx', `${mx}px`)
      root.style.setProperty('--my', `${my}px`)
      const ry = ((event.clientX / window.innerWidth) - 0.5) * 6
      if (art.current) {
        art.current.style.transform = `translate3d(${ry}px, ${window.scrollY * 0.12}px, 0) scale(1.06)`
      }
    }

    const onScroll = () => {
      if (!art.current) return
      art.current.style.transform = `translate3d(0, ${window.scrollY * 0.2}px, 0)`
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  return (
    <section
      id="home"
      ref={stage}
      className="hero-stage relative min-h-screen overflow-hidden"
    >
      <div className="absolute inset-0">
        <div ref={art} className="h-[108%] w-full origin-center will-change-transform">
          <SafeImg
            src="https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=2000&q=80"
            alt="A South Indian thali of rice, curries, and accompaniments"
            className="hero-kenburns h-full w-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-linear-to-b from-espresso/70 via-espresso/55 to-espresso/85" />
        <div className="hero-spot" />
        <Kolam className="hero-kolam" light />
        <span className="hero-blob top-[18%] right-[12%] h-40 w-40" />
        <span className="hero-blob bottom-[22%] left-[8%] h-28 w-28 [animation-delay:-3s]" />
      </div>

      <div
        ref={copy}
        className="site-inner relative flex min-h-screen flex-col justify-end pt-32 pb-16 sm:pb-20 lg:justify-center lg:pt-24"
      >
        <div className="max-w-3xl">
          <p className="hero-fade mb-6 text-[11px] font-medium tracking-[0.38em] text-gold-light uppercase">
            Est. 2008 · South Indian catering
          </p>
          <h1 className="font-display text-[3.1rem] leading-[0.95] font-medium text-cream sm:text-6xl lg:text-[5.4rem]">
            <span className="block overflow-hidden">
              <span className="hero-line">Amma’s recipes,</span>
            </span>
            <span className="mt-1 block overflow-hidden italic text-gold-light">
              <span className="hero-line [animation-delay:160ms]">
                served for your celebrations.
              </span>
            </span>
          </h1>
          <p className="hero-fade mt-7 max-w-xl text-base leading-relaxed text-cream/75 [animation-delay:280ms] sm:text-lg">
            From banana-leaf sadyas to Chettinad wedding feasts — tiffin,
            kuzhambu, biryani, and payasam cooked the way a Tamil home still
            cooks them.
          </p>
          <div className="hero-fade mt-10 flex flex-col gap-3 [animation-delay:420ms] sm:flex-row sm:items-center">
            <Magnetic>
              <a
                href="#contact"
                className="btn-shimmer inline-flex items-center justify-center gap-2 rounded-full bg-gold px-7 py-3.5 text-[12px] font-semibold tracking-[0.18em] text-espresso uppercase transition-all duration-300 hover:bg-gold-light"
              >
                Place an order
                <ArrowRight size={16} />
              </a>
            </Magnetic>
            <Magnetic strength={0.18}>
              <a
                href="#menu"
                className="inline-flex items-center justify-center rounded-full border border-cream/25 px-7 py-3.5 text-[12px] font-semibold tracking-[0.18em] text-cream uppercase transition-all duration-300 hover:border-gold hover:text-gold-light"
              >
                Explore the menu
              </a>
            </Magnetic>
          </div>
        </div>

        <div className="hero-fade mt-16 grid max-w-2xl grid-cols-3 gap-6 border-t border-cream/15 pt-8 text-cream [animation-delay:560ms] sm:mt-20">
          {[
            ['18 yrs', 'home recipes'],
            ['1,200+', 'feasts served'],
            ['Tamil · Kerala', 'Andhra kitchens'],
          ].map(([value, label]) => (
            <div key={label}>
              <p className="font-display text-2xl text-gold-light sm:text-3xl">
                {value}
              </p>
              <p className="mt-1 text-[11px] tracking-[0.16em] text-cream/60 uppercase">
                {label}
              </p>
            </div>
          ))}
        </div>
      </div>

      <a
        href="#about"
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-cream/70 lg:flex"
      >
        <span className="text-[10px] tracking-[0.28em] uppercase">Scroll</span>
        <span className="scroll-pulse h-10 w-px bg-gold" />
        <ArrowDown size={14} className="animate-bounce" />
      </a>
    </section>
  )
}
