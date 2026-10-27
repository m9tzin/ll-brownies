import { useEffect, useRef } from 'react'
import { useOrder } from '@/context/useOrder'
import { formatBRL } from '@/lib/format'
import { buildOrderMessage, whatsappUrl } from '@/lib/whatsapp'
import { buttonStyles } from './ui/buttonStyles'
import { NameField } from './ui/NameField'

/** Janela do pedido: itens, total, nome do saquinho e envio pelo WhatsApp. */
export function CartDialog() {
  const { lines, totals, customerName, changeQuantity, clearOrder, isCartOpen, closeCart } = useOrder()
  const dialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (isCartOpen && !dialog.open) dialog.showModal()
    if (!isCartOpen && dialog.open) dialog.close()
  }, [isCartOpen])

  // trava a rolagem da página atrás da janela
  useEffect(() => {
    document.body.style.overflow = isCartOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [isCartOpen])

  // pedido esvaziado: não há o que mostrar
  const isEmpty = lines.length === 0
  useEffect(() => {
    if (isCartOpen && isEmpty) closeCart()
  }, [isCartOpen, isEmpty, closeCart])

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="cart-title"
      onClose={closeCart}
      onClick={(event) => {
        // clique no fundo escuro (fora do conteúdo) fecha a janela
        if (event.target === event.currentTarget) closeCart()
      }}
      className="m-auto max-h-[88svh] w-[min(480px,calc(100%-1.5rem))] overflow-y-auto border border-ink bg-paper p-0 text-ink backdrop:bg-ink/60 open:animate-pop"
    >
      <div className="flex flex-col gap-6 p-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="eyebrow mb-2 text-muted">Sacola</p>
            <h2 id="cart-title" className="display-title text-3xl">
              Meu pedido
            </h2>
          </div>
          <button
            type="button"
            onClick={closeCart}
            aria-label="Fechar"
            className="grid size-10 cursor-pointer place-items-center border border-ink text-lg leading-none transition-colors fine-hover:bg-ink fine-hover:text-paper"
          >
            ✕
          </button>
        </div>

        <ul className="border-t border-ink">
          {lines.map((line) => (
            <li
              key={line.id}
              className="grid grid-cols-[1fr_auto] items-center gap-x-4 gap-y-3 border-b border-ink/20 py-4"
            >
              <span className="text-[0.9375rem] leading-snug font-medium">{line.name}</span>
              <span className="text-right font-medium">{formatBRL(line.quantity * line.price)}</span>
              <span className="inline-flex items-center border border-ink">
                <button
                  type="button"
                  onClick={() => changeQuantity(line.id, -1)}
                  aria-label={`Tirar um: ${line.name}`}
                  className="size-9 cursor-pointer text-lg leading-none transition-colors fine-hover:bg-ink fine-hover:text-paper"
                >
                  −
                </button>
                <span aria-live="polite" className="min-w-8 text-center text-sm">
                  {line.quantity}
                </span>
                <button
                  type="button"
                  onClick={() => changeQuantity(line.id, 1)}
                  aria-label={`Colocar mais um: ${line.name}`}
                  className="size-9 cursor-pointer text-lg leading-none transition-colors fine-hover:bg-ink fine-hover:text-paper"
                >
                  +
                </button>
              </span>
            </li>
          ))}
        </ul>

        <div className="flex items-baseline justify-between">
          <span className="eyebrow text-muted">Total</span>
          <span className="price text-4xl">{formatBRL(totals.amount)}</span>
        </div>

        <NameField id="cart-name" />

        <div className="flex gap-3">
          <a
            href={whatsappUrl(buildOrderMessage(lines, customerName))}
            target="_blank"
            rel="noopener noreferrer"
            className={`${buttonStyles({ variant: 'accent' })} flex-1`}
          >
            Enviar no WhatsApp
          </a>
          <button type="button" onClick={clearOrder} className={buttonStyles({ variant: 'outline' })}>
            Limpar
          </button>
        </div>
      </div>
    </dialog>
  )
}
