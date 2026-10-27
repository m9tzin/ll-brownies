import { site } from '@/config/site'
import type { OrderLine } from '@/context/orderReducer'
import { formatBRL } from './format'

// Mensagens vão como texto puro: troca o espaço "sem quebra" do Intl por espaço comum.
const money = (value: number) => formatBRL(value).replace(/\u00a0/g, ' ')

function nameRequest(customerName: string): string {
  const name = customerName.trim()
  return name ? ` Pode colocar o nome "${name}" no saquinho? =)` : ''
}

/** Mensagem com o pedido completo, linha por linha, total e o nome do saquinho. */
export function buildOrderMessage(lines: readonly OrderLine[], customerName: string): string {
  const total = lines.reduce((sum, line) => sum + line.quantity * line.price, 0)
  const items = lines.map(
    (line) => `• ${line.quantity}x ${line.name} (${money(line.quantity * line.price)})`,
  )
  return [
    'Oi! Quero fazer um pedido:',
    ...items,
    `Total: ${money(total)}.${nameRequest(customerName)}`,
  ].join('\n')
}

/** Mensagem curta para quem quer só conversar antes de escolher. */
export function buildGeneralMessage(intro: string, customerName: string): string {
  return `Oi! ${intro}.${nameRequest(customerName)}`
}

export function whatsappUrl(message: string, number: string = site.whatsappNumber): string {
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`
}
