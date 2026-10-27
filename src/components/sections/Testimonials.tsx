import { visibleTestimonials } from '@/data/testimonials'
import { Reveal } from '../ui/Reveal'

/**
 * Depoimentos de clientes. Sem depoimentos reais, mostra textos de exemplo, marcados como tal
 * (veja data/testimonials.ts).
 */
export function Testimonials() {
  if (visibleTestimonials.length === 0) return null

  return (
    <section aria-labelledby="titulo-depoimentos" className="bg-cream py-24 md:py-40">
      <div className="grid-wrap">
        <Reveal className="mb-14 max-w-3xl">
          <p className="eyebrow mb-5 text-muted">Quem já provou</p>
          <h2 id="titulo-depoimentos" className="display-title text-[clamp(2.25rem,4.8vw,4rem)]">
            Palavras de quem
            <br />
            recebeu o saquinho.
          </h2>
        </Reveal>

        <ul className="grid gap-x-8 gap-y-12 md:grid-cols-[repeat(auto-fit,minmax(17rem,1fr))]">
          {visibleTestimonials.map((item, index) => (
            <li key={`${item.author}-${index}`}>
              <Reveal delay={index * 100} className="h-full">
                <figure className="flex h-full flex-col border-t border-ink pt-5">
                  {item.sample && (
                    <span className="eyebrow mb-4 self-start bg-accent px-2 py-1 text-ink">
                      Exemplo, não é cliente real
                    </span>
                  )}
                  <span aria-hidden="true" className="display-title h-10 text-6xl leading-none text-accent">
                    “
                  </span>
                  <blockquote className="mt-2 flex-1 text-xl leading-snug">{item.quote}</blockquote>
                  <figcaption className="mt-6 text-[0.9375rem]">
                    <span className="font-medium">{item.author}</span>
                    {item.detail && <span className="text-muted"> · {item.detail}</span>}
                  </figcaption>
                </figure>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
