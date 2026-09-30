import { useMemo, useState } from 'react'
import { menuCategories, menuItems } from '../data'
import Reveal, { SectionEyebrow, SectionTitle } from './Reveal'
import SafeImg from './SafeImg'

export default function Menu() {
  const [active, setActive] = useState('All')

  const items = useMemo(
    () =>
      active === 'All'
        ? menuItems
        : menuItems.filter((item) => item.category === active),
    [active],
  )

  return (
    <section id="menu" className="bg-espresso py-24 text-cream sm:py-32">
      <div className="site-inner">
        <Reveal>
          <SectionEyebrow light>Menu & categories</SectionEyebrow>
          <SectionTitle light>
            From tiffin
            <span className="italic text-gold-light"> to payasam.</span>
          </SectionTitle>
        </Reveal>

        <Reveal delay={100}>
          <div className="mt-10 flex flex-wrap gap-2">
            {menuCategories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setActive(category)}
                className={`filter-pill rounded-full px-5 py-2 text-[11px] font-semibold tracking-[0.18em] uppercase ${
                  active === category
                    ? 'is-on bg-gold text-espresso'
                    : 'border border-cream/15 text-cream/70 hover:border-gold hover:text-gold-light'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </Reveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => (
            <article
              key={`${item.name}-${active}`}
              className="menu-flip menu-card group"
              style={{ animationDelay: `${i * 50}ms` }}
            >
              <div className="menu-flip-inner">
                <div className="menu-flip-face overflow-hidden rounded-[1.4rem] border border-cream/10 bg-ink">
                  <div className="relative h-52 overflow-hidden">
                    <SafeImg
                      src={item.image}
                      alt={item.name}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <span className="absolute top-4 left-4 rounded-full bg-espresso/70 px-3 py-1 text-[10px] tracking-[0.18em] text-gold-light uppercase backdrop-blur-sm">
                      {item.category}
                    </span>
                  </div>
                  <div className="p-6">
                    <h3 className="font-display text-2xl">{item.name}</h3>
                    <p className="mt-2 text-sm text-cream/55">{item.note}</p>
                  </div>
                </div>
                <div className="menu-flip-back rounded-[1.4rem] border border-gold/30 bg-ink p-8">
                  <p className="text-[11px] tracking-[0.22em] text-gold-light uppercase">
                    {item.category}
                  </p>
                  <h3 className="font-display mt-3 text-3xl">{item.name}</h3>
                  <p className="mt-4 text-sm leading-relaxed text-cream/70">
                    {item.note}. Cooked in Amma’s sequence — temper first, gravy
                    slow, sweet last.
                  </p>
                  <a
                    href="#contact"
                    className="mt-8 inline-flex text-[11px] tracking-[0.18em] text-gold uppercase"
                  >
                    Add to your feast →
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
