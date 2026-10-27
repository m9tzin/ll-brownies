import { Photo } from '../ui/Photo'
import { Reveal } from '../ui/Reveal'

export function About() {
  return (
    <section id="historia" aria-labelledby="titulo-historia" className="py-24 md:py-40">
      <div className="grid-wrap grid items-start gap-12 md:grid-cols-[5fr_6fr] md:gap-20">
        <Reveal>
          <Photo
            name="historia"
            lazy
            alt="Brownies embalados, com etiqueta, numa tigela de vidro sobre um pano de crochê"
            className="aspect-[4/5] w-full"
          />
        </Reveal>

        <Reveal delay={120} className="md:pt-16">
          <p className="eyebrow mb-6 text-muted">Nossa história</p>
          <h2
            id="titulo-historia"
            className="display-title text-[clamp(1.75rem,3.4vw,2.75rem)] leading-[1.12]"
          >
            Todo mundo tem uma lembrança de cozinha.{' '}
            <em className="text-muted not-italic">
              O cheiro de chocolate saindo do forno, a vasilha raspada de colher na mão.
            </em>{' '}
            É dessa lembrança que nasceu a LL Brownie’s.
          </h2>

          <div className="mt-10 max-w-[48ch] space-y-5 text-[1.0625rem] text-ink/80">
            <p>
              Aqui o doce é feito em casa, em pequenas quantidades, com tempo e sem pressa. Não tem fórmula
              secreta: tem ingrediente bom, receita ajustada até ficar certa e a vontade de fazer alguém sorrir.
            </p>
            <p>
              Por isso cada pedido vai num saquinho de papel, como o de padaria, com o nome de quem recebe e um
              sorriso =). O sabor de um doce caseiro não está só no recheio. Está no carinho de quem fez.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
