import { site } from '@/config/site'
import { PhoneMockup } from '../hero/PhoneMockup'
import { PhoneScreen } from '../hero/PhoneScreen'
import { ArrowLink } from '../ui/ArrowLink'
import { buttonStyles } from '../ui/buttonStyles'
import { Photo } from '../ui/Photo'

/**
 * Topo: duas fotografias ao fundo e, à frente, um celular onde o pedido é feito numa conversa
 * de WhatsApp. Em telas estreitas o texto vem primeiro e o celular logo abaixo.
 */
export function Hero() {
  return (
    <section aria-labelledby="titulo-hero" className="relative overflow-hidden bg-ink text-paper">
      <div aria-hidden="true" className="absolute inset-0 grid grid-rows-2 md:grid-cols-2 md:grid-rows-1">
        <Photo name="hero" alt="" priority className="size-full" />
        <Photo name="copo-1" alt="" priority className="size-full" />
      </div>

      {/* sombra em gradiente: o texto à esquerda e o celular à direita ficam legíveis sobre as fotos */}
      <div aria-hidden="true" className="absolute inset-0 bg-linear-to-r from-ink/90 via-ink/65 to-ink/55" />

      <div className="grid-wrap relative grid min-h-[calc(100svh-4rem)] items-center gap-12 py-12 md:grid-cols-[1.1fr_auto] md:gap-16 md:py-14">
        <div className="max-w-3xl">
          <p className="eyebrow mb-5 text-paper/80">
            {site.tagline} · {site.city}
          </p>
          <h1 id="titulo-hero" className="display-title text-[clamp(2.25rem,4.4vw,3.75rem)] leading-[1]">
            Feito em casa.
            <br />
            Servido com carinho.
          </h1>
          <p className="mt-6 max-w-[44ch] text-lg text-paper/85">
            Brownies e os copos da Felicidade, num saquinho de papel com o seu nome. Experimente: monte seu
            pedido no celular.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
            <a href="#cardapio" className={buttonStyles({ variant: 'accent' })}>
              Ver o cardápio
            </a>
            <ArrowLink href="#historia" direction="down" className="eyebrow text-paper">
              Descobrir
            </ArrowLink>
          </div>
        </div>

        <div className="justify-self-center">
          <PhoneMockup>
            <PhoneScreen />
          </PhoneMockup>
          <p className="eyebrow mt-5 text-center text-paper/70">Simulação. O pedido real abre no seu WhatsApp.</p>
        </div>
      </div>
    </section>
  )
}
