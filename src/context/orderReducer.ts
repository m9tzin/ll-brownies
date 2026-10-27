export interface OrderLine {
  id: string
  name: string
  price: number
  quantity: number
}

export interface OrderState {
  lines: Record<string, OrderLine>
  customerName: string
}

export type OrderAction =
  | { type: 'add'; line: Omit<OrderLine, 'quantity'> }
  | { type: 'change'; id: string; delta: number }
  | { type: 'clear' }
  | { type: 'setName'; name: string }

export const MAX_NAME_LENGTH = 24

export const initialOrderState: OrderState = { lines: {}, customerName: '' }

export function orderReducer(state: OrderState, action: OrderAction): OrderState {
  switch (action.type) {
    case 'add': {
      const current = state.lines[action.line.id]
      const line: OrderLine = { ...action.line, quantity: (current?.quantity ?? 0) + 1 }
      return { ...state, lines: { ...state.lines, [line.id]: line } }
    }
    case 'change': {
      const current = state.lines[action.id]
      if (!current) return state
      const quantity = current.quantity + action.delta
      if (quantity <= 0) {
        const { [action.id]: _removed, ...rest } = state.lines
        return { ...state, lines: rest }
      }
      return { ...state, lines: { ...state.lines, [action.id]: { ...current, quantity } } }
    }
    case 'clear':
      return { ...state, lines: {} }
    case 'setName':
      return { ...state, customerName: action.name.slice(0, MAX_NAME_LENGTH) }
  }
}

export function selectLines(state: OrderState): OrderLine[] {
  return Object.values(state.lines)
}

export function selectTotals(lines: readonly OrderLine[]): { quantity: number; amount: number } {
  return lines.reduce(
    (totals, line) => ({
      quantity: totals.quantity + line.quantity,
      amount: totals.amount + line.quantity * line.price,
    }),
    { quantity: 0, amount: 0 },
  )
}
