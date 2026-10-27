import { describe, expect, it } from 'vitest'
import { selectTestimonials, type Testimonial } from './testimonials'

const real: Testimonial[] = [{ quote: 'Muito bom.', author: 'Maria S.' }]
const samples: Testimonial[] = [{ quote: 'Exemplo.', author: 'Nome do cliente', sample: true }]

describe('selectTestimonials', () => {
  it('mostra os exemplos quando não há depoimentos reais', () => {
    expect(selectTestimonials([], samples)).toEqual(samples)
  })

  it('havendo depoimentos reais, mostra só eles', () => {
    expect(selectTestimonials(real, samples)).toEqual(real)
  })
})
