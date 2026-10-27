import { createContext } from 'react'
import type { OrderLine } from './orderReducer'

export interface OrderContextValue {
  lines: OrderLine[]
  totals: { quantity: number; amount: number }
  customerName: string
  isCartOpen: boolean
  addLine: (line: Omit<OrderLine, 'quantity'>) => void
  changeQuantity: (id: string, delta: number) => void
  clearOrder: () => void
  setCustomerName: (name: string) => void
  openCart: () => void
  closeCart: () => void
}

export const OrderContext = createContext<OrderContextValue | null>(null)
