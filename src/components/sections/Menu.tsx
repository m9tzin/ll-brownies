import { brownies, cups, cupSizes, type Brownie } from '@/data/products'
import { formatBRL } from '@/lib/format'
import { hasPhoto } from '@/lib/photos'
import { AddButton } from '../ui/AddButton'
import { NameField } from '../ui/NameField'
import { Photo } from '../ui/Photo'
import { Reveal } from '../ui/Reveal'

// Regra do site: brownie sem foto não aparece (veja src/data/products.ts).
const availableBrownies = brownies.filter((brownie) => hasPhoto(brownie.id))

const facts = [
  'Feito em casa, em pequenas quantidades',
  'Embalado individualmente, com a etiqueta da marca',
  'Vai num saquinho com o nome de quem recebe',
]

export function Menu() {
  return (
    <section id="cardapio" aria-labelledby="titulo-cardapio" className="bg-cream py-24 md:py-40">
      <div className="grid-wrap">
        <Reveal className="mb-16 grid items-end gap-10 md:grid-cols-[5fr_6fr] md:gap-20">
          <div>
            <p className="eyebrow mb-5 text-muted">Cardápio</p>
            <h2 id="titulo-cardapio" className="display-title text-[clamp(2.25rem,4.8vw,4rem)]">
              Para escolher
              <br />
              com calma.
            </h2>
          </div>
          <NameField id="menu-name" className="max-w-md" />
        </Reveal>

        {availableBrownies.map((brownie) => (
          <BrownieRow key={brownie.id} brownie={brownie} />
        ))}

        <div className="border-t border-ink pt-12">
          <Reveal>
            <ul className="mb-14 grid gap-3 sm:grid-cols-3 md:gap-6">
              {[
                { name: 'copo-1', alt: 'Copo da Felicidade grande, de chocolate, com brownie por cima' },
                { name: 'copo-2', alt: 'Copo da Felicidade com tampa, com creme amarelo e pedaços de brownie' },
                { name: 'copo-3', alt: 'Copo da Felicidade com tampa, em camadas de brigadeiro, creme e brownie' },
              ].map((photo) => (
                <li key={photo.name}>
                  <Photo name={photo.name} alt={photo.alt} className="aspect-[3/4] w-full" />
                </li>
              ))}
            </ul>
          </Reveal>

          <div className="grid items-start gap-10 md:grid-cols-[5fr_6fr] md:gap-20">
            <Reveal>
              <p className="eyebrow mb-5 text-muted">Copos da Felicidade</p>
              <h3 className="display-title mb-5 text-[clamp(2rem,4vw,3rem)]">
                Camadas de recheio.
                <br />
                Brownie no meio.
              </h3>
              <p className="max-w-[40ch] text-ink/80">Escolha o sabor e o tamanho. Todos levam pedacinhos de brownie.</p>
              <ul className="mt-6 flex flex-wrap gap-x-8 gap-y-2">
                {cupSizes.map((size) => (
                  <li key={size.label}>
                    <span className="eyebrow text-muted">{size.label}</span>{' '}
                    <span className="price text-2xl">{formatBRL(size.price)}</span>
                  </li>
                ))}
              </ul>
            </Reveal>

            <ul className="border-t border-ink md:border-t-0">
              {cups.map((cup, index) => (
                <li key={cup.id} className="border-b border-ink/20 py-6 first:pt-0 md:first:border-t-0">
                  <Reveal delay={index * 80}>
                    <h4 className="display-title text-[1.5rem] leading-tight">{cup.name}</h4>
                    <p className="mt-1 text-muted">{cup.description}</p>
                    <div className="mt-4 flex flex-wrap gap-3">
                      {cupSizes.map((size) => (
                        <AddButton
                          key={size.label}
                          variant={size.label === 'Pequeno' ? 'solid' : 'outline'}
                          line={{
                            id: `${cup.id}-${size.label.toLowerCase()}`,
                            name: `${cup.orderName} (${size.label})`,
                            price: size.price,
                          }}
                        >
                          {size.label} · {formatBRL(size.price)}
                        </AddButton>
                      ))}
                    </div>
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

function BrownieRow({ brownie }: { brownie: Brownie }) {
  const hasInterior = hasPhoto(`${brownie.id}-interior`)

  return (
    <div className="grid items-start gap-10 border-t border-ink py-12 md:grid-cols-[5fr_6fr] md:gap-20 md:pb-24">
      <Reveal className="relative">
        <Photo name={brownie.id} alt={brownie.name} className="aspect-[4/5] w-full" />
        {hasInterior && (
          <Photo
            name={`${brownie.id}-interior`}
            alt="Brownie partido ao meio, mostrando o miolo"
            className="absolute -right-3 -bottom-8 aspect-square w-2/5 border-4 border-cream md:-right-8"
          />
        )}
      </Reveal>

      <Reveal delay={120} className="md:pt-8">
        <p className="eyebrow mb-5 text-muted">Brownie</p>
        <h3 className="display-title text-[clamp(2.25rem,5vw,4rem)]">{brownie.name}</h3>
        <p className="mt-5 max-w-[40ch] text-lg text-ink/80">{brownie.description}</p>

        <ul className="mt-8 max-w-md border-t border-ink/20">
          {facts.map((fact) => (
            <li key={fact} className="border-b border-ink/20 py-3 text-[0.9375rem]">
              {fact}
            </li>
          ))}
        </ul>

        <div className="mt-8 flex items-center gap-6">
          <span className="price text-5xl">{formatBRL(brownie.price)}</span>
          <AddButton variant="accent" line={{ id: brownie.id, name: brownie.orderName, price: brownie.price }}>
            Adicionar ao pedido
          </AddButton>
        </div>
      </Reveal>
    </div>
  )
}
