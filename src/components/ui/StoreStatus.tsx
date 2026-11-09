import { useStoreStatus } from '@/hooks/useStoreStatus'
import { cn } from '@/lib/cn'

/**
 * Aviso do horário de pedidos, para fundo escuro (fica no topo da página). Quebra de linha
 * natural em telas estreitas; `role="status"` avisa leitores de tela quando vira de aberto para fechado.
 */
export function StoreStatus({ className }: { className?: string }) {
  const { open, message } = useStoreStatus()

  return (
    <p
      role="status"
      className={cn(
        'inline-flex max-w-full items-start gap-2.5 border border-paper/25 bg-ink/70 px-3.5 py-2 text-sm leading-snug text-paper',
        className,
      )}
    >
      <span
        aria-hidden="true"
        className={cn('mt-[0.4em] size-2 shrink-0 rounded-full', open ? 'bg-accent' : 'bg-paper/50')}
      />
      {message}
    </p>
  )
}
