import { describe, expect, it } from 'vitest'
import type { OrderLine } from '@/context/orderReducer'
import { buildPhoneThread } from './phone'

const lines: OrderLine[] = [{ id: 'brownie-tradicional', name: 'Brownie tradicional', price: 8, quantity: 2 }]

describe('buildPhoneThread', () => {
  it('começa só com a saudação da loja quando o pedido está vazio', () => {
    expect(buildPhoneThread([], '').map((message) => message.id)).toEqual(['oi'])
  })

  it('mostra o pedido, o aviso do nome e o total quando há itens', () => {
    const thread = buildPhoneThread(lines, '')
    expect(thread.map((message) => message.id)).toEqual(['oi', 'pedido', 'nome', 'total'])
    expect(thread[3]?.text).toContain('R$ 16')
    expect(thread[3]?.kind).toBe('actions')
  })

  it('o balão do cliente é a mensagem real que vai para o WhatsApp', () => {
    const order = buildPhoneThread(lines, 'Maria')[1]
    expect(order?.from).toBe('customer')
    expect(order?.text).toContain('2x Brownie tradicional')
    expect(order?.text).toContain('"Maria"')
  })

  it('confirma o nome quando ele foi escrito, ignorando espaços', () => {
    expect(buildPhoneThread(lines, '  Ana ')[2]?.text).toBe('Anotei: Ana no saquinho =)')
  })

  it('pede o nome quando ainda não foi escrito', () => {
    expect(buildPhoneThread(lines, '')[2]?.text).toContain('Quer um nome no saquinho?')
  })
})
