import { Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { navLinks } from '../data'
import AmmaMark from './AmmaMark'
import { Magnetic } from './Motion'

export default function Navbar({ scrolled, active, progress = 0 }) {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'border-b border-linen/80 bg-cream/90 shadow-[0_10px_40px_rgba(28,25,20,0.06)] backdrop-blur-xl'
          : 'bg-transparent'
      }`}
    >
      <div className="site-inner flex h-[4.4rem] items-center justify-between">
        <a href="#home" className="group flex items-center gap-2.5">
          <span className="relative grid h-12 w-12 place-items-center">
            <svg className="progress-ring" viewBox="0 0 48 48" aria-hidden="true">
              <circle cx="24" cy="24" r="21" className="progress-ring-bg" />
              <circle
                cx="24"
                cy="24"
                r="21"
                className="progress-ring-bar"
                style={{
                  strokeDashoffset: 132 - (132 * progress) / 100,
                }}
              />
            </svg>
            <AmmaMark className="relative h-9 w-9" />
          </span>
          <span
            className={`font-display text-xl tracking-[0.12em] uppercase transition-colors duration-300 sm:text-2xl ${
              scrolled ? 'text-espresso' : 'text-cream'
            }`}
          >
            Amma Kitchen
          </span>
        </a>

        <nav className="hidden items-center gap-5 whitespace-nowrap xl:gap-7 lg:flex">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              className={`nav-link text-[12px] font-medium tracking-[0.16em] uppercase transition-colors duration-300 ${
                scrolled
                  ? active === link.id
                    ? 'text-espresso'
                    : 'text-stone hover:text-espresso'
                  : active === link.id
                    ? 'text-cream'
                    : 'text-cream/70 hover:text-cream'
              } ${active === link.id ? 'is-active' : ''}`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Magnetic className="hidden sm:inline-flex">
            <a
              href="#contact"
              className={`btn-shimmer hidden rounded-full px-5 py-2.5 text-[11px] font-semibold tracking-[0.18em] uppercase transition-all duration-300 sm:inline-flex ${
                scrolled
                  ? 'bg-espresso text-cream hover:bg-ink'
                  : 'bg-gold text-espresso hover:bg-gold-light'
              }`}
            >
              Place an order
            </a>
          </Magnetic>
          <button
            type="button"
            className={`grid h-10 w-10 place-items-center rounded-full border lg:hidden ${
              scrolled
                ? 'border-mist text-espresso'
                : 'border-cream/25 text-cream'
            }`}
            onClick={() => setOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={18} />
          </button>
        </div>
      </div>

      <div
        className={`mobile-nav fixed inset-0 z-50 bg-espresso/95 backdrop-blur-xl lg:hidden ${
          open ? 'is-open visible' : 'invisible'
        }`}
      >
        <div className="site-inner flex items-center justify-between pt-5">
          <span className="flex items-center gap-2.5">
            <AmmaMark className="h-10 w-10" />
            <span className="font-display text-2xl tracking-[0.12em] text-cream uppercase">
              Amma Kitchen
            </span>
          </span>
          <button
            type="button"
            className="grid h-10 w-10 place-items-center rounded-full border border-cream/20 text-cream"
            onClick={() => setOpen(false)}
            aria-label="Close menu"
          >
            <X size={18} />
          </button>
        </div>
        <nav className="mt-16 flex flex-col gap-6 px-[clamp(1.1rem,3.4vw,2.5rem)]">
          {navLinks.map((link, i) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={() => setOpen(false)}
              className="mobile-link font-display text-4xl text-cream transition-transform duration-300 hover:translate-x-2 hover:text-gold-light"
              style={{ animationDelay: open ? `${120 + i * 70}ms` : '0ms' }}
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  )
}
