import { navLinks } from '../data'
import AmmaMark from './AmmaMark'

const socials = [
  {
    href: 'https://instagram.com',
    label: 'Instagram',
    path: 'M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4zm10 2H7a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2zm-5 3.2A3.8 3.8 0 1 1 8.2 12 3.8 3.8 0 0 1 12 8.2zm0 1.6A2.2 2.2 0 1 0 14.2 12 2.2 2.2 0 0 0 12 9.8zM17.2 6.6a.9.9 0 1 1-.9.9.9.9 0 0 1 .9-.9z',
  },
  {
    href: 'https://facebook.com',
    label: 'Facebook',
    path: 'M14 9h3V6h-3c-2.2 0-4 1.8-4 4v2H8v3h2v7h3v-7h2.6l.4-3H13v-2c0-.6.4-1 1-1z',
  },
  {
    href: 'https://pinterest.com',
    label: 'Pinterest',
    path: 'M12 3a9 9 0 0 0-3.3 17.4c-.1-.8-.2-2 0-2.9l1.4-6s-.3-.7-.3-1.8c0-1.7 1-3 2.2-3 1.1 0 1.6.8 1.6 1.8 0 1.1-.7 2.7-1 4.2-.3 1.3.6 2.3 1.9 2.3 2.2 0 3.7-2.9 3.7-6.3 0-2.6-1.8-4.5-5-4.5-3.6 0-5.9 2.7-5.9 5.7 0 1 .3 1.7.8 2.3a.8.8 0 0 1 .2.8l-.3 1.1c-.1.3-.3.4-.6.3-1.6-.7-2.3-2.5-2.3-4.6 0-3.4 2.9-7.5 8.6-7.5 4.6 0 7.6 3.3 7.6 6.9 0 4.7-2.6 8.2-6.5 8.2-1.3 0-2.5-.7-2.9-1.5l-.8 3c-.3 1.1-1.1 2.5-1.6 3.3A9 9 0 1 0 12 3z',
  },
  {
    href: 'https://youtube.com',
    label: 'YouTube',
    path: 'M22 12.2s0-3.2-.4-4.6a2.9 2.9 0 0 0-2-2C17.8 5.2 12 5.2 12 5.2s-5.8 0-7.6.4a2.9 2.9 0 0 0-2 2C2 9 2 12.2 2 12.2s0 3.2.4 4.6a2.9 2.9 0 0 0 2 2c1.8.4 7.6.4 7.6.4s5.8 0 7.6-.4a2.9 2.9 0 0 0 2-2c.4-1.4.4-4.6.4-4.6zM10 15.2V9.2l5.2 3z',
  },
]

export default function Footer() {
  return (
    <footer className="bg-espresso text-cream">
      <div className="site-inner grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <a href="#home" className="group flex items-center gap-3">
            <AmmaMark className="h-12 w-12" />
            <span className="font-display text-3xl tracking-[0.12em] uppercase">
              Amma Kitchen
            </span>
          </a>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-cream/60">
            South Indian catering for weddings, sadyas, corporate dining, and
            home celebrations — cooked the way Amma wrote it down.
          </p>
        </div>

        <div>
          <p className="text-[11px] tracking-[0.22em] text-gold-light uppercase">
            Explore
          </p>
          <ul className="mt-4 space-y-2">
            {navLinks.map((link) => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  className="text-sm text-cream/70 transition-colors hover:text-gold-light"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-[11px] tracking-[0.22em] text-gold-light uppercase">
            The kitchen
          </p>
          <ul className="mt-4 space-y-2 text-sm text-cream/70">
            <li>14 Luz Church Road</li>
            <li>Mylapore, Chennai</li>
            <li>hello@ammakitchen.in</li>
            <li>+91 44 4567 2108</li>
          </ul>
        </div>

        <div>
          <p className="text-[11px] tracking-[0.22em] text-gold-light uppercase">
            Follow the feast
          </p>
          <div className="mt-5 flex gap-3">
            {socials.map(({ href, label, path }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="grid h-11 w-11 place-items-center rounded-full border border-cream/15 text-cream transition-all duration-300 hover:-translate-y-1 hover:border-gold hover:bg-gold hover:text-espresso"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
                  <path d={path} />
                </svg>
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-cream/10">
        <div className="site-inner flex flex-col items-center justify-between gap-3 py-6 text-xs text-cream/45 sm:flex-row">
          <p>© {new Date().getFullYear()} Amma Kitchen. All rights reserved.</p>
          <p className="tracking-[0.16em] uppercase">Tamil · Kerala · Andhra</p>
        </div>
      </div>
    </footer>
  )
}
