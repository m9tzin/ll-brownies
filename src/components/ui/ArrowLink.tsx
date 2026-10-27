import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

interface ArrowLinkProps {
  href: string
  children: ReactNode
  /** ↗ para links que saem da página, ↓ para descer até uma seção. */
  direction?: 'out' | 'down'
  className?: string
}

/** Link com sublinhado fino e seta. */
export function ArrowLink({ href, children, direction = 'out', className }: ArrowLinkProps) {
  const external = direction === 'out'
  return (
    <a
      href={href}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      className={cn(
        'inline-flex items-baseline gap-1.5 underline decoration-1 underline-offset-[6px] transition-colors fine-hover:decoration-accent',
        className,
      )}
    >
      {children}
      <span aria-hidden="true">{external ? '↗' : '↓'}</span>
    </a>
  )
}
