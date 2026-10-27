import { useState, type ReactNode } from 'react'
import { useInViewRepeat } from '@/hooks/useInViewRepeat'
import { cn } from '@/lib/cn'

interface IllustrationFrameProps {
  className?: string
  children: ReactNode
}

/**
 * Moldura de uma ilustração animada. Marca `data-playing` quando está na tela:
 * o CSS pausa as animações lá dentro enquanto ela está fora de vista (veja index.css).
 */
export function IllustrationFrame({ className, children }: IllustrationFrameProps) {
  const [playing, setPlaying] = useState(false)
  const ref = useInViewRepeat<HTMLDivElement>(setPlaying, 0.2)

  return (
    <div
      ref={ref}
      aria-hidden="true"
      data-illustration=""
      data-playing={playing}
      className={cn('relative aspect-[5/4] overflow-hidden', className)}
    >
      {children}
    </div>
  )
}
