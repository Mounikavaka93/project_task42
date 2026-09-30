import { Check } from 'lucide-react'
import { packages } from '../data'
import Reveal, { SectionEyebrow, SectionTitle } from './Reveal'

export default function Events({ onSelectPackage }) {
  return (
    <section id="events" className="bg-ivory py-24 sm:py-32">
      <div className="site-inner">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <Reveal>
            <SectionEyebrow>Events & packages</SectionEyebrow>
            <SectionTitle>
              Choose the scale.
              <span className="italic text-terracotta"> We cook the feast.</span>
            </SectionTitle>
          </Reveal>
        </div>

        <div className="grid items-stretch gap-6 lg:grid-cols-3">
          {packages.map((pack, i) => (
            <Reveal key={pack.name} delay={i * 100} variant="scale">
              <article
                className={`relative flex h-full flex-col rounded-[1.8rem] p-8 transition-transform duration-500 hover:-translate-y-2 ${
                  pack.featured
                    ? 'featured-glow bg-espresso text-cream'
                    : 'border border-linen bg-cream'
                }`}
              >
                {pack.featured && (
                  <span className="absolute -top-3 left-8 rounded-full bg-gold px-3 py-1 text-[10px] font-semibold tracking-[0.2em] text-espresso uppercase">
                    Most requested
                  </span>
                )}
                <p
                  className={`text-[11px] tracking-[0.22em] uppercase ${
                    pack.featured ? 'text-gold-light' : 'text-gold'
                  }`}
                >
                  {pack.guests}
                </p>
                <h3 className="font-display mt-3 text-4xl">{pack.name}</h3>
                <p className="mt-5 font-display text-3xl">
                  {pack.price}
                  <span
                    className={`ml-2 font-sans text-sm tracking-normal ${
                      pack.featured ? 'text-cream/50' : 'text-stone'
                    }`}
                  >
                    {pack.unit}
                  </span>
                </p>
                <ul className="mt-8 flex-1 space-y-3">
                  {pack.includes.map((line) => (
                    <li key={line} className="flex items-start gap-3 text-sm">
                      <Check
                        size={16}
                        className={`mt-0.5 shrink-0 ${
                          pack.featured ? 'text-gold-light' : 'text-sage'
                        }`}
                      />
                      <span
                        className={
                          pack.featured ? 'text-cream/80' : 'text-stone'
                        }
                      >
                        {line}
                      </span>
                    </li>
                  ))}
                </ul>
                <a
                  href="#contact"
                  onClick={() => onSelectPackage?.(pack.name)}
                  className={`mt-8 inline-flex justify-center rounded-full px-5 py-3 text-[11px] font-semibold tracking-[0.18em] uppercase transition-all duration-300 ${
                    pack.featured
                      ? 'bg-gold text-espresso hover:bg-gold-light'
                      : 'border border-espresso/15 text-espresso hover:bg-espresso hover:text-cream'
                  }`}
                >
                  Order this package
                </a>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
