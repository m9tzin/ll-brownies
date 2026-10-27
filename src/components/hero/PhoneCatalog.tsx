import { brownies, cups, cupSizes } from '@/data/products'
import { useOrder } from '@/context/useOrder'
import { formatBRL } from '@/lib/format'
import { hasPhoto } from '@/lib/photos'
import { buttonStyles } from '../ui/buttonStyles'
import { AddButton } from '../ui/AddButton'
import { Photo } from '../ui/Photo'

// Mesma regra do cardápio da página: brownie sem foto não aparece.
const availableBrownies = brownies.filter((brownie) => hasPhoto(brownie.id))

const galleryPhotos = [
  { name: 'copo-1', alt: 'Copo da Felicidade grande, de chocolate, com brownie por cima' },
  { name: 'copo-2', alt: 'Copo da Felicidade com tampa, com creme amarelo e pedaços de brownie' },
  { name: 'copo-3', alt: 'Copo da Felicidade com tampa, em camadas de brigadeiro, creme e brownie' },
]

/*
 * Escala de texto da tela do celular (só quatro tamanhos, para ficar em harmonia):
 *   16px  títulos de seção        (Fraunces)
 *   15px  nomes e preços          (Fraunces)
 *   13px  texto corrido           (DM Sans)
 *   12px  descrições e botões     (DM Sans)
 */

/** Aba "Cardápio" do celular: todos os itens em lista, com foto, preço e botão de adicionar. */
export function PhoneCatalog({ onViewOrder }: { onViewOrder: () => void }) {
  const { lines, totals } = useOrder()
  const quantityOf = (id: string) => lines.find((line) => line.id === id)?.quantity ?? 0

  return (
    <div className="flex h-full flex-col">
      <div className="flex-1 overflow-y-auto px-3 pb-4">
        {availableBrownies.length > 0 && (
          <section aria-labelledby="phone-brownies">
            <h3 id="phone-brownies" className="display-small pt-4 pb-1 text-base">
              Brownies
            </h3>
            <ul>
              {availableBrownies.map((brownie) => (
                <li key={brownie.id} className="flex gap-3 border-b border-ink/15 py-3">
                  <Photo name={brownie.id} alt={brownie.name} className="size-20 shrink-0" />
                  <div className="min-w-0 flex-1">
                    <p className="display-small text-[0.9375rem] leading-tight">{brownie.name}</p>
                    <p className="mt-1 text-xs leading-snug text-muted">{brownie.description}</p>
                    <div className="mt-2 flex items-center justify-between gap-2">
                      <span className="price text-[0.9375rem]">{formatBRL(brownie.price)}</span>
                      <AddButton
                        size="xs"
                        line={{ id: brownie.id, name: brownie.orderName, price: brownie.price }}
                      >
                        Adicionar{quantityOf(brownie.id) > 0 && ` · ${quantityOf(brownie.id)}`}
                      </AddButton>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        )}

        <section aria-labelledby="phone-copos">
          <h3 id="phone-copos" className="display-small pt-4 pb-2 text-base">
            Copos da Felicidade
          </h3>
          <ul className="mb-2 grid grid-cols-3 gap-1.5">
            {galleryPhotos.map((photo) => (
              <li key={photo.name}>
                <Photo name={photo.name} alt={photo.alt} className="aspect-[3/4] w-full" />
              </li>
            ))}
          </ul>
          <p className="mb-1 text-xs text-muted">Camadas de recheio, com brownie no meio.</p>

          <ul>
            {cups.map((cup) => (
              <li key={cup.id} className="border-b border-ink/15 py-3">
                <p className="display-small text-[0.9375rem] leading-tight">{cup.name}</p>
                <div className="mt-2 flex gap-2">
                  {cupSizes.map((size) => {
                    const id = `${cup.id}-${size.label.toLowerCase()}`
                    const quantity = quantityOf(id)
                    return (
                      <AddButton
                        key={size.label}
                        size="xs"
                        variant={size.label === 'Pequeno' ? 'solid' : 'outline'}
                        className="flex-1"
                        line={{ id, name: `${cup.orderName} (${size.label})`, price: size.price }}
                      >
                        {size.label} · {formatBRL(size.price)}
                        {quantity > 0 && ` · ${quantity}`}
                      </AddButton>
                    )
                  })}
                </div>
              </li>
            ))}
          </ul>
        </section>
      </div>

      {/* barra fixa embaixo: leva ao pedido assim que há itens */}
      <div className="border-t border-ink/15 bg-paper p-3">
        {totals.quantity > 0 ? (
          <button type="button" onClick={onViewOrder} className={`${buttonStyles({ variant: 'accent', size: 'xs' })} w-full py-2.5`}>
            Ver pedido · {totals.quantity} {totals.quantity === 1 ? 'item' : 'itens'} · {formatBRL(totals.amount)}
          </button>
        ) : (
          <p className="py-1.5 text-center text-xs text-muted">Toque em Adicionar para montar o pedido.</p>
        )}
      </div>
    </div>
  )
}
