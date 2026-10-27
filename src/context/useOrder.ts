import { use } from 'react'
import { OrderContext, type OrderContextValue } from './order-context'

export function useOrder(): OrderContextValue {
  const context = use(OrderContext)
  if (!context) throw new Error('useOrder precisa estar dentro de <OrderProvider>.')
  return context
}
