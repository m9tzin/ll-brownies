import type { DemoScenario } from '@/data/demo'
import type { OrderLine } from '@/context/orderReducer'
import { formatBRL } from './format'
import { buildOrderMessage } from './whatsapp'

export interface ChatMessage {
  id: string
  from: 'customer' | 'shop'
  text: string
  time: string
}

const money = (value: number) => formatBRL(value).replace(/\u00a0/g, ' ')

function toLines(scenario: DemoScenario): OrderLine[] {
  return scenario.items.map((item, index) => ({
    id: `${scenario.id}-${index}`,
    name: item.name,
    price: item.unitPrice,
    quantity: item.quantity,
  }))
}

export function scenarioTotal(scenario: DemoScenario): number {
  return scenario.items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0)
}

/**
 * Mensagens da conversa de exemplo até a etapa indicada (0 a 3).
 * 0 Pedido, 1 Preparado, 2 Aprovação, 3 Concluído. Tudo ilustrativo, sem backend.
 */
export function buildConversation(scenario: DemoScenario, stage: number): ChatMessage[] {
  const summary = scenario.items
    .map((item) => `• ${item.quantity}x ${item.name} (${money(item.quantity * item.unitPrice)})`)
    .join('\n')

  const all: ChatMessage[] = [
    {
      id: 'pedido',
      from: 'customer',
      time: '14:02',
      text: buildOrderMessage(toLines(scenario), scenario.customer),
    },
    {
      id: 'preparado',
      from: 'shop',
      time: '14:03',
      text: `Oi, ${scenario.customer}! Pedido preparado:\n${summary}\nTotal: ${money(scenarioTotal(scenario))}.\nNome no saquinho: ${scenario.customer}.\nPosso confirmar?`,
    },
    { id: 'aprovacao', from: 'customer', time: '14:04', text: 'Pode confirmar.' },
    {
      id: 'concluido',
      from: 'shop',
      time: '14:05',
      text: `Pedido confirmado, ${scenario.customer}. Agora combinamos os detalhes por aqui.`,
    },
  ]

  return all.slice(0, Math.min(Math.max(stage, 0), all.length - 1) + 1)
}
