import { MAX_NAME_LENGTH } from '@/context/orderReducer'
import { useOrder } from '@/context/useOrder'

interface NameFieldProps {
  id: string
  className?: string
}

/** Campo do nome que vai no saquinho. Compartilha o valor com a sacola. */
export function NameField({ id, className }: NameFieldProps) {
  const { customerName, setCustomerName } = useOrder()

  return (
    <div className={className}>
      <label htmlFor={id} className="eyebrow mb-1 block text-muted">
        Nome no saquinho
      </label>
      <input
        id={id}
        type="text"
        value={customerName}
        maxLength={MAX_NAME_LENGTH}
        autoComplete="given-name"
        placeholder="Ex.: Maria"
        onChange={(event) => setCustomerName(event.target.value)}
        className="w-full border-0 border-b border-ink bg-transparent py-2 font-display text-2xl font-medium tracking-[-0.03em] placeholder:text-ink/30"
      />
      <p className="mt-2 text-sm text-muted">Opcional. Vai junto na mensagem do pedido.</p>
    </div>
  )
}
