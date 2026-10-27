import { useEffect, useMemo, useRef, useState, type FormEvent } from 'react'
import { MAX_NAME_LENGTH } from '@/context/orderReducer'
import { useOrder } from '@/context/useOrder'
import { cn } from '@/lib/cn'
import { buildPhoneThread } from '@/lib/phone'
import { buildOrderMessage, whatsappUrl } from '@/lib/whatsapp'
import { buttonStyles } from '../ui/buttonStyles'

const chip =
  'cursor-pointer border border-ink bg-paper px-3 py-1.5 text-xs font-medium transition-colors fine-hover:bg-ink fine-hover:text-paper'

/**
 * Aba "Pedido": uma conversa de WhatsApp em que o pedido é montado de verdade.
 * O balão do cliente é a mensagem exata que vai para o WhatsApp; as respostas da loja
 * aqui são só uma simulação.
 */
export function WhatsAppChat({ onOpenCatalog }: { onOpenCatalog: () => void }) {
  const { lines, customerName, setCustomerName, clearOrder } = useOrder()
  const [draft, setDraft] = useState('')
  const logRef = useRef<HTMLDivElement>(null)

  const thread = useMemo(() => buildPhoneThread(lines, customerName), [lines, customerName])

  // leva a conversa para a última mensagem sempre que ela cresce
  useEffect(() => {
    const log = logRef.current
    if (log) log.scrollTo({ top: log.scrollHeight, behavior: 'smooth' })
  }, [thread.length])

  function submitName(event: FormEvent) {
    event.preventDefault()
    const name = draft.trim()
    if (!name) return
    setCustomerName(name)
    setDraft('')
  }

  return (
    <div className="flex h-full flex-col">
      <div
        ref={logRef}
        role="log"
        aria-live="polite"
        aria-label="Conversa do pedido"
        className="flex-1 space-y-2 overflow-y-auto px-3 py-4"
      >
        {thread.map((message) => {
          const mine = message.from === 'customer'
          return (
            <div
              // o balão do pedido muda de chave a cada alteração: reaparece e mostra que o pedido cresceu
              key={message.kind === 'order' ? `${message.id}:${message.text}` : message.id}
              className={cn(
                'max-w-[90%] px-3 py-2 text-[0.8125rem] leading-snug whitespace-pre-line',
                mine
                  ? 'animate-sent ml-auto rounded-t-lg rounded-bl-lg bg-accent/35'
                  : 'animate-received rounded-t-lg rounded-br-lg bg-paper',
              )}
            >
              {message.text}
              {mine && <span className="mt-1 block text-right text-xs text-muted">✓✓</span>}

              {message.kind === 'actions' && (
                <div className="mt-2 flex flex-wrap gap-1.5">
                  <a
                    href={whatsappUrl(buildOrderMessage(lines, customerName))}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={buttonStyles({ variant: 'accent', size: 'xs' })}
                  >
                    Abrir no WhatsApp ↗
                  </a>
                  <button type="button" className={chip} onClick={onOpenCatalog}>
                    Adicionar mais
                  </button>
                  <button type="button" className={cn(chip, 'border-ink/40 text-muted')} onClick={clearOrder}>
                    Limpar
                  </button>
                </div>
              )}
            </div>
          )
        })}

        {lines.length === 0 && (
          <button type="button" className={cn(chip, 'ml-1')} onClick={onOpenCatalog}>
            Abrir o cardápio
          </button>
        )}
      </div>

      {/* campo de mensagem: o nome do saquinho */}
      <form onSubmit={submitName} className="flex items-center gap-2 border-t border-ink/15 bg-paper p-3">
        <label htmlFor="phone-name" className="sr-only">
          Seu nome no saquinho
        </label>
        <input
          id="phone-name"
          type="text"
          value={draft}
          maxLength={MAX_NAME_LENGTH}
          autoComplete="given-name"
          placeholder="Seu nome no saquinho"
          onChange={(event) => setDraft(event.target.value)}
          className="min-w-0 flex-1 rounded-full border border-ink/25 bg-cream px-4 py-2 text-[0.8125rem] placeholder:text-muted"
        />
        <button
          type="submit"
          aria-label="Enviar nome"
          className="grid size-9 shrink-0 cursor-pointer place-items-center rounded-full bg-ink text-paper transition-colors fine-hover:bg-accent fine-hover:text-ink"
        >
          →
        </button>
      </form>
    </div>
  )
}
