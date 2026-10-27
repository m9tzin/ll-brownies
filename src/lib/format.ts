const brl = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })
const brlInteiro = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
  maximumFractionDigits: 0,
})

/** "R$ 8" para valores inteiros e "R$ 8,50" quando há centavos. */
export function formatBRL(value: number): string {
  return Number.isInteger(value) ? brlInteiro.format(value) : brl.format(value)
}
