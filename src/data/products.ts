/**
 * Cardápio da LL Brownies.
 *
 * Cada `id` também é o nome da foto do produto (veja `lib/photos.ts`).
 * Regra do site: brownie sem foto em `src/assets/photos/` não aparece na página.
 * Quando a foto chegar (ex.: `brownie-leitinho.webp`), o produto volta sozinho.
 * Os copos são exibidos numa galeria única (`copo-1`, `copo-2`, `copo-3`).
 */

export interface Brownie {
  id: string
  name: string
  /** Nome completo usado na mensagem do WhatsApp. */
  orderName: string
  description: string
  price: number
}

export interface CupSize {
  label: 'Pequeno' | 'Grande'
  price: number
}

export interface Cup {
  id: string
  name: string
  orderName: string
  description: string
}

export const brownies: readonly Brownie[] = [
  {
    id: 'brownie-tradicional',
    name: 'Brownie tradicional',
    orderName: 'Brownie tradicional',
    description: 'Sem recheio, só o chocolate do jeito clássico.',
    price: 8,
  },
  {
    id: 'brownie-leitinho',
    name: 'Recheado de leitinho',
    orderName: 'Brownie recheado de leitinho',
    description: 'Brownie com recheio de leitinho.',
    price: 12,
  },
  {
    id: 'brownie-brigadeiro',
    name: 'Recheado de brigadeiro',
    orderName: 'Brownie recheado de brigadeiro',
    description: 'Brownie com recheio de brigadeiro.',
    price: 12,
  },
  {
    id: 'brownie-maracuja',
    name: 'Recheado de brigadeiro de maracujá',
    orderName: 'Brownie recheado de brigadeiro de maracujá',
    description: 'Brownie com recheio de brigadeiro de maracujá.',
    price: 12,
  },
]

export const cupSizes: readonly CupSize[] = [
  { label: 'Pequeno', price: 10 },
  { label: 'Grande', price: 20 },
]

export const cups: readonly Cup[] = [
  {
    id: 'copo-leitinho-brigadeiro',
    name: 'Leitinho com brigadeiro',
    orderName: 'Copo da Felicidade de leitinho com brigadeiro',
    description: 'Duas camadas de recheio, com brownie no meio.',
  },
  {
    id: 'copo-leitinho-maracuja',
    name: 'Leitinho com brigadeiro de maracujá',
    orderName: 'Copo da Felicidade de leitinho com brigadeiro de maracujá',
    description: 'Duas camadas de recheio, com brownie no meio.',
  },
  {
    id: 'copo-brigadeiro-maracuja',
    name: 'Brigadeiro com brigadeiro de maracujá',
    orderName: 'Copo da Felicidade de brigadeiro com brigadeiro de maracujá',
    description: 'Duas camadas de recheio, com brownie no meio.',
  },
]
