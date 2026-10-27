import { initialOrderState, MAX_NAME_LENGTH, type OrderLine, type OrderState } from './orderReducer'

const STORAGE_KEY = 'll-brownies:pedido:v1'

function isLine(value: unknown): value is OrderLine {
  if (typeof value !== 'object' || value === null) return false
  const line = value as Record<string, unknown>
  return (
    typeof line.id === 'string' &&
    typeof line.name === 'string' &&
    typeof line.price === 'number' &&
    Number.isFinite(line.price) &&
    line.price >= 0 &&
    typeof line.quantity === 'number' &&
    Number.isInteger(line.quantity) &&
    line.quantity > 0
  )
}

/** Lê o pedido guardado no navegador. Qualquer dado inválido vira um pedido vazio. */
export function loadOrder(): OrderState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return initialOrderState
    const data: unknown = JSON.parse(raw)
    if (typeof data !== 'object' || data === null) return initialOrderState

    const { lines, customerName } = data as Record<string, unknown>
    const valid: Record<string, OrderLine> = {}
    if (typeof lines === 'object' && lines !== null) {
      for (const value of Object.values(lines)) {
        if (isLine(value)) valid[value.id] = value
      }
    }
    return {
      lines: valid,
      customerName: typeof customerName === 'string' ? customerName.slice(0, MAX_NAME_LENGTH) : '',
    }
  } catch {
    return initialOrderState
  }
}

/** Guarda o pedido. Se o navegador bloquear o armazenamento, a página segue funcionando. */
export function saveOrder(state: OrderState): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch {
    /* armazenamento indisponível: ignorar */
  }
}
