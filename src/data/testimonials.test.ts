import { describe, expect, it } from 'vitest'
import { selectTestimonials, type Testimonial } from './testimonials'

const real: Testimonial[] = [{ quote: 'Muito bom.', author: 'Maria S.' }]
const samples: Testimonial[] = [{ quote: 'Exemplo.', author: 'Nome do cliente', sample: true }]

describe('selectTestimonials', () => {
  it('no site publicado, nunca mostra exemplos', () => {
    expect(selectTestimonials([], samples, false)).toEqual([])
  })

  it('no desenvolvimento, mostra os exemplos quando não há depoimentos reais', () => {
    expect(selectTestimonials([], samples, true)).toEqual(samples)
  })

  it('havendo depoimentos reais, mostra só eles, em qualquer ambiente', () => {
    expect(selectTestimonials(real, samples, true)).toEqual(real)
    expect(selectTestimonials(real, samples, false)).toEqual(real)
  })
})
