import { describe, expect, it } from 'vitest'
import {
  initialOrderState,
  MAX_NAME_LENGTH,
  orderReducer,
  selectLines,
  selectTotals,
  type OrderState,
} from './orderReducer'

const brownie = { id: 'brownie-tradicional', name: 'Brownie tradicional', price: 8 }
const cup = { id: 'copo-x-pequeno', name: 'Copo (Pequeno)', price: 10 }

function withLines(...items: (typeof brownie)[]): OrderState {
  return items.reduce((state, line) => orderReducer(state, { type: 'add', line }), initialOrderState)
}

describe('orderReducer', () => {
  it('adiciona um item novo com quantidade 1', () => {
    const state = withLines(brownie)
    expect(state.lines[brownie.id]?.quantity).toBe(1)
  })

  it('soma a quantidade ao adicionar o mesmo item de novo', () => {
    const state = withLines(brownie, brownie, brownie)
    expect(state.lines[brownie.id]?.quantity).toBe(3)
  })

  it('aumenta e diminui a quantidade', () => {
    let state = withLines(brownie, brownie)
    state = orderReducer(state, { type: 'change', id: brownie.id, delta: 1 })
    expect(state.lines[brownie.id]?.quantity).toBe(3)
    state = orderReducer(state, { type: 'change', id: brownie.id, delta: -1 })
    expect(state.lines[brownie.id]?.quantity).toBe(2)
  })

  it('remove o item quando a quantidade chega a zero', () => {
    const state = orderReducer(withLines(brownie), { type: 'change', id: brownie.id, delta: -1 })
    expect(state.lines[brownie.id]).toBeUndefined()
  })

  it('ignora mudança em item que não está no pedido', () => {
    const state = withLines(brownie)
    expect(orderReducer(state, { type: 'change', id: 'inexistente', delta: 1 })).toBe(state)
  })

  it('limpa os itens mas mantém o nome do saquinho', () => {
    let state = orderReducer(withLines(brownie), { type: 'setName', name: 'Maria' })
    state = orderReducer(state, { type: 'clear' })
    expect(selectLines(state)).toHaveLength(0)
    expect(state.customerName).toBe('Maria')
  })

  it('limita o tamanho do nome', () => {
    const state = orderReducer(initialOrderState, { type: 'setName', name: 'a'.repeat(100) })
    expect(state.customerName).toHaveLength(MAX_NAME_LENGTH)
  })
})

describe('selectTotals', () => {
  it('soma quantidade e valor', () => {
    const state = withLines(brownie, brownie, cup)
    expect(selectTotals(selectLines(state))).toEqual({ quantity: 3, amount: 26 })
  })

  it('devolve zeros para pedido vazio', () => {
    expect(selectTotals([])).toEqual({ quantity: 0, amount: 0 })
  })
})
