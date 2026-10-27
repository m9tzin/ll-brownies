import { cn } from '@/lib/cn'

interface ButtonStyleOptions {
  variant?: 'accent' | 'solid' | 'outline' | 'outline-light'
  size?: 'md' | 'sm' | 'xs'
}

/**
 * Botões retos, sem raio. Servem para <button> e <a>.
 * O acento (caramelo) leva texto em tinta: contraste 5,3:1. Texto claro sobre ele ficaria em 3,0:1.
 */
export function buttonStyles({ variant = 'solid', size = 'md' }: ButtonStyleOptions = {}): string {
  return cn(
    'inline-flex cursor-pointer items-center justify-center gap-2 border font-medium transition-colors duration-200 select-none',
    size === 'md' && 'px-6 py-3.5 text-[0.9375rem]',
    size === 'sm' && 'px-4 py-2.5 text-[0.8125rem]',
    size === 'xs' && 'px-2.5 py-1.5 text-[0.75rem]',
    variant === 'accent' &&
      'border-accent bg-accent text-ink fine-hover:border-ink fine-hover:bg-ink fine-hover:text-paper',
    variant === 'solid' &&
      'border-ink bg-ink text-paper fine-hover:border-accent fine-hover:bg-accent fine-hover:text-ink',
    variant === 'outline' && 'border-ink bg-transparent text-ink fine-hover:bg-ink fine-hover:text-paper',
    variant === 'outline-light' &&
      'border-paper bg-transparent text-paper fine-hover:bg-paper fine-hover:text-ink',
  )
}
