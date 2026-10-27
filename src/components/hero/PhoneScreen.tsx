import { useState } from 'react'
import { useOrder } from '@/context/useOrder'
import { cn } from '@/lib/cn'
import { PhoneCatalog } from './PhoneCatalog'
import { WhatsAppChat } from './WhatsAppChat'

type Tab = 'catalog' | 'chat'

const tabs: readonly { id: Tab; label: string }[] = [
  { id: 'catalog', label: 'Cardápio' },
  { id: 'chat', label: 'Pedido' },
]

/** O que aparece na tela do celular: cabeçalho, duas abas (Cardápio e Pedido) e o conteúdo da aba. */
export function PhoneScreen() {
  const { totals } = useOrder()
  const [tab, setTab] = useState<Tab>('catalog')

  return (
    <div className="flex h-full flex-col bg-cream text-ink">
      <div className="flex items-center gap-3 bg-ink px-4 pt-8 pb-3 text-paper">
        <img src="/favicon.svg" alt="" width={36} height={36} className="size-9 rounded-full bg-paper p-1" />
        <div className="leading-tight">
          <p className="display-small text-[0.9375rem]">LL Brownie’s</p>
          <p className="text-xs text-paper/70">online</p>
        </div>
      </div>

      <div role="tablist" aria-label="Tela do celular" className="grid grid-cols-2 border-b border-ink/20 bg-paper">
        {tabs.map(({ id, label }) => {
          const selected = tab === id
          return (
            <button
              key={id}
              type="button"
              role="tab"
              id={`phone-tab-${id}`}
              aria-selected={selected}
              aria-controls="phone-panel"
              onClick={() => setTab(id)}
              className={cn(
                'flex cursor-pointer items-center justify-center gap-2 border-b-2 py-2.5 text-xs font-medium transition-colors',
                selected ? 'border-accent text-ink' : 'border-transparent text-muted fine-hover:text-ink',
              )}
            >
              {label}
              {id === 'chat' && totals.quantity > 0 && (
                <span className="grid min-w-5 place-items-center bg-accent px-1 text-xs text-ink">
                  {totals.quantity}
                </span>
              )}
            </button>
          )
        })}
      </div>

      <div id="phone-panel" role="tabpanel" aria-labelledby={`phone-tab-${tab}`} className="min-h-0 flex-1">
        {tab === 'catalog' ? (
          <PhoneCatalog onViewOrder={() => setTab('chat')} />
        ) : (
          <WhatsAppChat onOpenCatalog={() => setTab('catalog')} />
        )}
      </div>
    </div>
  )
}
