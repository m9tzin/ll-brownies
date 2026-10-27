import { site } from '@/config/site'
import { ArrowLink } from '../ui/ArrowLink'
import { buttonStyles } from '../ui/buttonStyles'
import { Photo } from '../ui/Photo'

/** Fechamento: foto de fundo, uma frase e o próximo passo. */
export function Closing() {
  return (
    <section
      aria-labelledby="titulo-fechamento"
      className="relative flex min-h-[80svh] items-end overflow-hidden bg-ink text-paper"
    >
      <Photo
        name="fechamento"
        lazy
        alt="Brownie partido ao meio, mostrando o miolo macio de chocolate"
        className="absolute inset-0 size-full"
        imageClassName="object-[50%_75%]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-linear-to-t from-ink/90 from-0% via-ink/40 via-45% to-ink/15 to-100%"
      />

      <div className="grid-wrap relative flex flex-col gap-10 pb-14 md:flex-row md:items-end md:justify-between md:pb-20">
        <div>
          <p className="eyebrow mb-5 text-paper/80">{site.city}</p>
          <h2 id="titulo-fechamento" className="display-title text-[clamp(2.5rem,6.4vw,4.75rem)] leading-[0.95]">
            Hoje tem
            <br />
            brownie =)
          </h2>
        </div>
        <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
          <a href="#cardapio" className={buttonStyles({ variant: 'accent' })}>
            Fazer meu pedido
          </a>
          <ArrowLink href={site.instagramUrl} className="text-paper">
            {site.instagramHandle}
          </ArrowLink>
        </div>
      </div>
    </section>
  )
}
