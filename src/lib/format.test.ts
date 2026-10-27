import { describe, expect, it } from 'vitest'
import { formatBRL } from './format'

// O Intl usa espaço sem quebra entre "R$" e o número.
const plain = (text: string) => text.replace(/\u00a0/g, ' ')

describe('formatBRL', () => {
  it('mostra valores inteiros sem centavos', () => {
    expect(plain(formatBRL(8))).toBe('R$ 8')
    expect(plain(formatBRL(20))).toBe('R$ 20')
  })

  it('mostra centavos quando existem', () => {
    expect(plain(formatBRL(8.5))).toBe('R$ 8,50')
  })
})
