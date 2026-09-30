import { X } from 'lucide-react'
import { useState } from 'react'
import { gallery } from '../data'
import Reveal, { SectionEyebrow, SectionTitle } from './Reveal'
import SafeImg from './SafeImg'

export default function Gallery() {
  const [active, setActive] = useState(null)

  return (
    <section id="gallery" className="bg-cream py-24 sm:py-32">
      <div className="site-inner">
        <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <Reveal>
            <SectionEyebrow>Image gallery</SectionEyebrow>
            <SectionTitle>Leaves we have laid.</SectionTitle>
          </Reveal>
          <Reveal delay={100}>
            <p className="max-w-xs text-sm text-stone">
              Hover to see the dish. Click to open the frame.
            </p>
          </Reveal>
        </div>

        <div className="grid auto-rows-[14rem] grid-cols-2 gap-3 sm:auto-rows-[16rem] md:grid-cols-4 md:gap-4">
          {gallery.map((item, i) => (
            <Reveal
              key={item.caption}
              delay={i * 70}
              variant="scale"
              className={`${item.tall ? 'row-span-2' : ''} ${
                i === 1 ? 'md:col-span-2' : ''
              }`}
            >
              <button
                type="button"
                onClick={() => setActive(item)}
                className="gallery-tile group relative h-full w-full overflow-hidden"
              >
                <SafeImg
                  src={item.src}
                  alt={item.alt}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-espresso/0 transition-all duration-500 group-hover:bg-espresso/45" />
                <div className="absolute inset-x-0 bottom-0 translate-y-4 p-5 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                  <p className="font-display text-xl text-cream">
                    {item.caption}
                  </p>
                </div>
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      {active && (
        <div
          className="lightbox-in fixed inset-0 z-[60] flex items-center justify-center bg-espresso/80 p-5 backdrop-blur-md"
          onClick={() => setActive(null)}
        >
          <button
            type="button"
            className="absolute top-6 right-6 grid h-11 w-11 place-items-center rounded-full border border-cream/20 text-cream"
            aria-label="Close image"
          >
            <X size={18} />
          </button>
          <SafeImg
            src={active.src}
            alt={active.alt}
            className="lightbox-in max-h-[82vh] max-w-5xl rounded-2xl object-contain shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  )
}
