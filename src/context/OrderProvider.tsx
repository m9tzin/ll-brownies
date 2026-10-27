import { useEffect, useMemo, useReducer, useState, type ReactNode } from 'react'
import { OrderContext, type OrderContextValue } from './order-context'
import { orderReducer, selectLines, selectTotals } from './orderReducer'
import { loadOrder, saveOrder } from './orderStorage'

export function OrderProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(orderReducer, undefined, loadOrder)
  const [isCartOpen, setCartOpen] = useState(false)

  useEffect(() => {
    saveOrder(state)
  }, [state])

  const value = useMemo<OrderContextValue>(() => {
    const lines = selectLines(state)
    return {
      lines,
      totals: selectTotals(lines),
      customerName: state.customerName,
      isCartOpen,
      addLine: (line) => dispatch({ type: 'add', line }),
      changeQuantity: (id, delta) => dispatch({ type: 'change', id, delta }),
      clearOrder: () => dispatch({ type: 'clear' }),
      setCustomerName: (name) => dispatch({ type: 'setName', name }),
      openCart: () => setCartOpen(true),
      closeCart: () => setCartOpen(false),
    }
  }, [state, isCartOpen])

  return <OrderContext value={value}>{children}</OrderContext>
}
