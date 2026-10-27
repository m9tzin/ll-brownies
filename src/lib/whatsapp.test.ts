import { describe, expect, it } from 'vitest'
import type { OrderLine } from '@/context/orderReducer'
import { buildGeneralMessage, buildOrderMessage, whatsappUrl } from './whatsapp'

const lines: OrderLine[] = [
  { id: 'brownie-tradicional', name: 'Brownie tradicional', price: 8, quantity: 2 },
  { id: 'copo-x-grande', name: 'Copo da Felicidade (Grande)', price: 20, quantity: 1 },
]

describe('buildOrderMessage', () => {
  it('lista os itens, o total e pede o nome no saquinho', () => {
    expect(buildOrderMessage(lines, 'Maria')).toBe(
      [
        'Oi! Quero fazer um pedido:',
        '• 2x Brownie tradicional (R$ 16)',
        '• 1x Copo da Felicidade (Grande) (R$ 20)',
        'Total: R$ 36. Pode colocar o nome "Maria" no saquinho? =)',
      ].join('\n'),
    )
  })

  it('não pede nome quando está vazio ou só tem espaços', () => {
    expect(buildOrderMessage(lines, '   ')).toMatch(/Total: R\$ 36\.$/)
  })
})

describe('buildGeneralMessage', () => {
  it('monta a mensagem curta com o nome', () => {
    expect(buildGeneralMessage('Quero fazer um pedido', ' Ana ')).toBe(
      'Oi! Quero fazer um pedido. Pode colocar o nome "Ana" no saquinho? =)',
    )
  })
})

describe('whatsappUrl', () => {
  it('codifica o texto e usa o número informado', () => {
    expect(whatsappUrl('Oi! 🙂', '5500000000000')).toBe(
      `https://wa.me/5500000000000?text=${encodeURIComponent('Oi! 🙂')}`,
    )
  })
})
