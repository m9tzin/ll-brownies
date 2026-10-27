import { useRef, useState, type ReactNode } from 'react'
import type { OrderLine } from '@/context/orderReducer'
import { useOrder } from '@/context/useOrder'
import { cn } from '@/lib/cn'
import { buttonStyles } from './buttonStyles'

interface AddButtonProps {
  line: Omit<OrderLine, 'quantity'>
  children: ReactNode
  variant?: 'accent' | 'solid' | 'outline'
  size?: 'sm' | 'xs'
  className?: string
}

/** Adiciona um item ao pedido; um "+1" sobe e some. */
export function AddButton({ line, children, variant = 'solid', size = 'sm', className }: AddButtonProps) {
  const { addLine } = useOrder()
  const [marks, setMarks] = useState<number[]>([])
  const nextId = useRef(0)

  function handleClick() {
    addLine(line)
    const id = nextId.current++
    setMarks((current) => [...current, id])
  }

  return (
    <span className={cn('relative inline-block', className)}>
      <button
        type="button"
        onClick={handleClick}
        aria-label={`Adicionar ao pedido: ${line.name}`}
        className={cn(buttonStyles({ variant, size }), 'w-full')}
      >
        {children}
      </button>
      {marks.map((id) => (
        <span
          key={id}
          aria-hidden="true"
          onAnimationEnd={() => setMarks((current) => current.filter((mark) => mark !== id))}
          className="pointer-events-none absolute -top-1 left-1/2 -translate-x-1/2 animate-rise font-display text-sm font-medium text-accent"
        >
          +1
        </span>
      ))}
    </span>
  )
}
