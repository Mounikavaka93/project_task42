import { ArrowUpRight } from 'lucide-react'
import { services } from '../data'
import { TiltCard } from './Motion'
import Reveal, { SectionEyebrow, SectionTitle } from './Reveal'
import SafeImg from './SafeImg'

export default function Services() {
  return (
    <section id="services" className="bg-cream py-24 sm:py-32">
      <div className="site-inner">
        <div className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <Reveal>
            <SectionEyebrow>Catering services</SectionEyebrow>
            <SectionTitle>
              Every gathering,
              <span className="italic text-sage"> its own sadya.</span>
            </SectionTitle>
          </Reveal>
          <Reveal delay={120}>
            <p className="max-w-sm text-sm leading-relaxed text-stone">
              Tilt a card to step closer. Weddings, offices, festivals, and
              home tables — each one cooked from the same spice box.
            </p>
          </Reveal>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {services.map((service, i) => (
            <Reveal key={service.title} delay={i * 80} variant="scale">
              <TiltCard>
                <article className="card-shine group relative h-[26rem] overflow-hidden rounded-[1.7rem] bg-espresso">
                  <SafeImg
                    src={service.image}
                    alt={service.title}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-espresso via-espresso/45 to-espresso/10 transition-opacity duration-500 group-hover:via-espresso/60" />
                  <div className="relative flex h-full flex-col justify-end p-7">
                    <span className="mb-3 w-fit rounded-full border border-cream/20 bg-espresso/40 px-3 py-1 text-[10px] tracking-[0.2em] text-gold-light uppercase backdrop-blur-sm">
                      {service.tag}
                    </span>
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="font-display text-3xl text-cream">
                        {service.title}
                      </h3>
                      <span className="mt-1 grid h-9 w-9 shrink-0 place-items-center rounded-full border border-cream/20 text-cream transition-all duration-500 group-hover:rotate-45 group-hover:border-gold group-hover:bg-gold group-hover:text-espresso">
                        <ArrowUpRight size={16} />
                      </span>
                    </div>
                    <p className="mt-3 max-h-0 overflow-hidden text-sm leading-relaxed text-cream/75 opacity-0 transition-all duration-500 group-hover:max-h-28 group-hover:opacity-100">
                      {service.copy}
                    </p>
                  </div>
                </article>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
