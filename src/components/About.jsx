import { stats } from '../data'
import Kolam from './Kolam'
import { CountUp } from './Motion'
import Reveal, { SectionEyebrow, SectionTitle } from './Reveal'
import SafeImg from './SafeImg'

export default function About() {
  return (
    <section id="about" className="relative overflow-hidden bg-ivory py-24 sm:py-32">
      <Kolam className="about-kolam" />
      <div className="site-inner grid items-center gap-16 lg:grid-cols-12">
        <Reveal className="relative lg:col-span-6" variant="left">
          <div className="grid grid-cols-12 gap-3 sm:gap-4">
            <div className="col-span-7 overflow-hidden rounded-3xl">
              <img
                src="/amma-icon.jpg"
                alt="Amma, founder of Amma Kitchen"
                className="img-reveal h-[22rem] w-full object-cover object-top sm:h-[28rem]"
              />
            </div>
            <div className="col-span-5 flex flex-col gap-3 sm:gap-4">
              <div className="overflow-hidden rounded-3xl">
                <SafeImg
                  src="https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=800&q=80"
                  alt="Masala dosa on a plate"
                  className="img-reveal h-[10.5rem] w-full object-cover sm:h-[13rem]"
                />
              </div>
              <div className="float-soft flex flex-1 flex-col justify-end rounded-3xl bg-espresso p-5 text-cream sm:p-6">
                <p className="font-display text-4xl text-gold-light">
                  <CountUp value={18} />
                </p>
                <p className="mt-1 text-xs leading-relaxed text-cream/70">
                  years of batter, brass, and banana leaves.
                </p>
              </div>
            </div>
          </div>
        </Reveal>

        <div className="lg:col-span-6">
          <Reveal>
            <SectionEyebrow>About the kitchen</SectionEyebrow>
            <SectionTitle>
              A Chennai home kitchen, opened for your guests.
            </SectionTitle>
          </Reveal>
          <Reveal delay={120}>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-stone">
              Amma Kitchen began with wedding lunches cooked in a Mylapore
              courtyard. The sambar still simmers all morning. The dosa batter
              still ferments overnight. The payasam is still finished last, so
              it arrives warm.
            </p>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-stone">
              We cook Tamil, Kerala, and Andhra food the way Amma wrote it down
              — Chettinad heat, coastal coconut, and festival sweets — then
              serve it with the calm of a well-run family feast.
            </p>
          </Reveal>
          <Reveal delay={200}>
            <div className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-4">
              {stats.map((item) => (
                <div key={item.label} className="border-t border-mist pt-4">
                  <p className="font-display text-3xl text-espresso">
                    <CountUp value={item.count} />
                    <span className="text-gold">{item.suffix}</span>
                  </p>
                  <p className="mt-2 text-[11px] leading-snug tracking-wide text-stone uppercase">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
