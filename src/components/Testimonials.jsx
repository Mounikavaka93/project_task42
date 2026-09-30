import { ChevronLeft, ChevronRight, Quote } from 'lucide-react'
import { useEffect, useState } from 'react'
import { testimonials } from '../data'
import Reveal, { SectionEyebrow, SectionTitle } from './Reveal'

export default function Testimonials() {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (paused) return undefined
    const timer = window.setInterval(() => {
      setIndex((current) =>
        current === testimonials.length - 1 ? 0 : current + 1,
      )
    }, 6500)
    return () => window.clearInterval(timer)
  }, [paused])

  const prev = () =>
    setIndex((current) =>
      current === 0 ? testimonials.length - 1 : current - 1,
    )
  const next = () =>
    setIndex((current) =>
      current === testimonials.length - 1 ? 0 : current + 1,
    )

  return (
    <section id="testimonials" className="bg-linen py-24 sm:py-32">
      <div className="site-inner">
        <Reveal className="text-center">
          <SectionEyebrow>Guest stories</SectionEyebrow>
          <SectionTitle>What lingered after the last payasam.</SectionTitle>
        </Reveal>

        <Reveal delay={120} variant="scale">
          <div
            className="story-stage relative mx-auto mt-16 h-[28rem] max-w-3xl"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            {testimonials.map((item, i) => {
              const offset =
                (i - index + testimonials.length) % testimonials.length
              return (
                <article
                  key={item.name}
                  className="story-card absolute inset-0 rounded-[2rem] bg-ivory px-8 py-12 text-center sm:px-16"
                  style={{
                    zIndex: testimonials.length - offset,
                    transform: `translateY(${offset * 18}px) scale(${1 - offset * 0.045}) rotate(${offset * -2.4}deg)`,
                    opacity: offset > 2 ? 0 : 1,
                    pointerEvents: offset === 0 ? 'auto' : 'none',
                  }}
                >
                  <Quote className="mx-auto text-gold" size={32} />
                  <p className="font-display mt-6 text-2xl leading-snug text-espresso italic sm:text-3xl">
                    “{item.quote}”
                  </p>
                  <div className="gold-rule mx-auto my-8 w-24" />
                  <p className="text-sm font-medium tracking-wide text-espresso">
                    {item.name}
                  </p>
                  <p className="mt-1 text-xs tracking-[0.16em] text-stone uppercase">
                    {item.event}
                  </p>
                </article>
              )
            })}
          </div>

          <div className="mt-8 flex items-center justify-center gap-4">
            <button
              type="button"
              onClick={prev}
              className="grid h-11 w-11 place-items-center rounded-full border border-mist text-espresso transition-all duration-300 hover:border-gold hover:bg-gold"
              aria-label="Previous story"
            >
              <ChevronLeft size={18} />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setIndex(i)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === index ? 'w-8 bg-gold' : 'w-3 bg-mist'
                  }`}
                  aria-label={`Show story ${i + 1}`}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={next}
              className="grid h-11 w-11 place-items-center rounded-full border border-mist text-espresso transition-all duration-300 hover:border-gold hover:bg-gold"
              aria-label="Next story"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
