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
        className={cn(buttonStyles({ variant, size }), 'w-full')}
      >
        {children}
        {/* o nome acessível começa pelo texto visível do botão e termina com o item */}
        <span className="sr-only">, {line.name}</span>
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
