import type { OrderLine } from '@/context/orderReducer'
import { formatBRL } from './format'
import { buildOrderMessage } from './whatsapp'

/** `actions` é uma mensagem da loja com botões embaixo (abrir o WhatsApp, adicionar mais, limpar). */
export type PhoneMessageKind = 'text' | 'order' | 'actions'

export interface PhoneMessage {
  id: string
  from: 'shop' | 'customer'
  kind: PhoneMessageKind
  text: string
}

const money = (value: number) => formatBRL(value).replace(/ /g, ' ')

/**
 * Conversa da aba "Pedido" do celular. É derivada do pedido real: o balão do cliente
 * é exatamente a mensagem que vai para o WhatsApp, e a loja "responde" em cima dele.
 */
export function buildPhoneThread(lines: readonly OrderLine[], customerName: string): PhoneMessage[] {
  const thread: PhoneMessage[] = [
    {
      id: 'oi',
      from: 'shop',
      kind: 'text',
      text: 'Oi! Eu sou a LL Brownie’s. Escolha no cardápio e eu monto o seu pedido aqui.',
    },
  ]

  if (lines.length === 0) return thread

  const name = customerName.trim()
  const total = lines.reduce((sum, line) => sum + line.quantity * line.price, 0)

  thread.push({ id: 'pedido', from: 'customer', kind: 'order', text: buildOrderMessage(lines, customerName) })
  thread.push({
    id: 'nome',
    from: 'shop',
    kind: 'text',
    text: name ? `Anotei: ${name} no saquinho =)` : 'Quer um nome no saquinho? Escreva na mensagem aqui embaixo.',
  })
  thread.push({
    id: 'total',
    from: 'shop',
    kind: 'actions',
    text: `Total ${money(total)}. Posso abrir o WhatsApp para você enviar?`,
  })

  return thread
}
