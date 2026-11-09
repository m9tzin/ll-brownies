import { heroPhoneId } from '@/config/site'
import { useOrder } from '@/context/useOrder'
import { useOnScreen } from '@/hooks/useOnScreen'
import { cn } from '@/lib/cn'
import { formatBRL } from '@/lib/format'

/**
 * Barra flutuante que aparece quando há itens no pedido. Fica escondida enquanto o celular do topo
 * está na tela: ele já mostra o pedido e, no celular de verdade, a barra cobria os cantos de baixo dele.
 */
export function CartBar() {
  const { totals, openCart } = useOrder()
  const phoneOnScreen = useOnScreen(heroPhoneId)
  const hasItems = totals.quantity > 0
  const visible = hasItems && !phoneOnScreen

  return (
    <>
      {/* anuncia a mudança para leitores de tela, sem depender da barra estar visível */}
      <p role="status" className="sr-only">
        {hasItems ? `${totals.quantity} itens no pedido, ${formatBRL(totals.amount)}` : 'Pedido vazio'}
      </p>
      <button
        type="button"
        onClick={openCart}
        inert={!visible}
        aria-label={`Abrir meu pedido: ${totals.quantity} itens, ${formatBRL(totals.amount)}`}
        className={cn(
          'fixed bottom-4 left-1/2 z-40 flex cursor-pointer items-center gap-4 whitespace-nowrap border border-paper bg-ink px-5 py-3.5 text-[0.9375rem] font-medium text-paper',
          'transition duration-300 ease-out',
          visible ? '-translate-x-1/2 translate-y-0' : '-translate-x-1/2 translate-y-[180%]',
        )}
      >
        {/* key: a cada item novo o número dá um pulinho */}
        <span
          key={totals.quantity}
          aria-hidden="true"
          className="grid min-w-6 animate-bump place-items-center bg-accent px-1.5 py-0.5 text-[0.8125rem] font-medium text-ink"
        >
          {totals.quantity}
        </span>
        <span aria-hidden="true">Meu pedido · {formatBRL(totals.amount)}</span>
      </button>
    </>
  )
}
