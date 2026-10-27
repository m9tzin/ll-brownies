import type { Testimonial } from './testimonials'

/**
 * TEXTOS DE EXEMPLO, só para ver o layout durante o desenvolvimento.
 * Não são de clientes reais e NÃO entram no site publicado (veja `testimonials.ts`).
 */
export const sampleTestimonials: readonly Testimonial[] = [
  {
    quote: 'Veio no saquinho com o meu nome e um sorriso. Já começou bem o meu dia.',
    author: 'Nome do cliente',
    detail: 'Nerópolis, GO',
    sample: true,
  },
  {
    quote: 'O copo é uma delícia: camadas de recheio e pedacinhos de brownie no meio.',
    author: 'Nome do cliente',
    detail: 'Nerópolis, GO',
    sample: true,
  },
  {
    quote: 'Tem gostinho de coisa feita em casa. Peço sempre que dá vontade de doce.',
    author: 'Nome do cliente',
    detail: 'Nerópolis, GO',
    sample: true,
  },
]
