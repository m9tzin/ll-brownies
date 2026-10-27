import { visibleFaq } from '@/data/faq'
import { Reveal } from '../ui/Reveal'

export function Faq() {
  return (
    <section id="perguntas" aria-labelledby="titulo-perguntas" className="py-24 md:py-40">
      <div className="grid-wrap grid gap-12 md:grid-cols-[5fr_6fr] md:gap-20">
        <Reveal>
          <p className="eyebrow mb-5 text-muted">Perguntas</p>
          <h2 id="titulo-perguntas" className="display-title text-[clamp(2.25rem,4.8vw,4rem)]">
            O que mais
            <br />
            perguntam.
          </h2>
        </Reveal>

        <Reveal delay={100}>
          <div className="border-t border-ink">
            {visibleFaq.map((item) => (
              <details key={item.question} className="group border-b border-ink/20">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-lg font-medium [&::-webkit-details-marker]:hidden">
                  {item.question}
                  <span
                    aria-hidden="true"
                    className="font-display text-2xl leading-none transition-transform group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <p className="max-w-[52ch] pb-6 text-ink/80">{item.answer}</p>
              </details>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
