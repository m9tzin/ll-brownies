import { brownies, cups, cupSizes } from './products'

/** Etapas da conversa de exemplo. */
export const demoStages = ['Pedido', 'Preparado', 'Aprovação', 'Concluído'] as const

export interface DemoItem {
  name: string
  unitPrice: number
  quantity: number
}

export interface DemoScenario {
  id: string
  label: string
  /** Nome fictício de quem pede (e que vai no saquinho). */
  customer: string
  items: DemoItem[]
}

function brownie(id: string, quantity = 1): DemoItem {
  const product = brownies.find((item) => item.id === id)
  if (!product) throw new Error(`Brownie "${id}" não existe em products.ts`)
  return { name: product.orderName, unitPrice: product.price, quantity }
}

function cup(id: string, size: (typeof cupSizes)[number]['label'], quantity = 1): DemoItem {
  const product = cups.find((item) => item.id === id)
  const price = cupSizes.find((item) => item.label === size)
  if (!product || !price) throw new Error(`Copo "${id}" (${size}) não existe em products.ts`)
  return { name: `${product.orderName} (${size})`, unitPrice: price.price, quantity }
}

/** Seis pedidos de exemplo, todos montados com itens e preços reais do cardápio. */
export const demoScenarios: readonly DemoScenario[] = [
  { id: 'um-brownie', label: 'Um brownie para o lanche', customer: 'Ana', items: [brownie('brownie-tradicional')] },
  {
    id: 'copo-pequeno',
    label: 'Um copo pequeno para a tarde',
    customer: 'Bruno',
    items: [cup('copo-leitinho-brigadeiro', 'Pequeno')],
  },
  {
    id: 'copo-grande',
    label: 'Um copo grande para dividir',
    customer: 'Carla',
    items: [cup('copo-brigadeiro-maracuja', 'Grande')],
  },
  {
    id: 'presente',
    label: 'Presente com nome no saquinho',
    customer: 'Lúcia',
    items: [brownie('brownie-tradicional', 2), cup('copo-leitinho-maracuja', 'Pequeno')],
  },
  {
    id: 'um-de-cada',
    label: 'Um de cada tamanho',
    customer: 'Marina',
    items: [
      cup('copo-leitinho-brigadeiro', 'Pequeno'),
      cup('copo-brigadeiro-maracuja', 'Grande'),
      brownie('brownie-tradicional'),
    ],
  },
  {
    id: 'mesa-cheia',
    label: 'Para a mesa do escritório',
    customer: 'Rafael',
    items: [brownie('brownie-tradicional', 6)],
  },
]
