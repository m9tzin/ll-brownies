import { sampleTestimonials } from './testimonials.samples'

export interface Testimonial {
  quote: string
  /** Nome como a pessoa autorizou aparecer (ex.: "Maria S."). */
  author: string
  /** Opcional: cidade, ou o que ela pediu. */
  detail?: string
  /** `true` = texto de exemplo (não é cliente real). A seção mostra a etiqueta "Exemplo". */
  sample?: boolean
}

/**
 * DEPOIMENTOS REAIS: adicione aqui, com a autorização de quem escreveu.
 * Pode vir do destaque "Clientes!" do Instagram ou de conversas do WhatsApp.
 * Não invente depoimentos nem atribua frases a pessoas que não as disseram: é enganoso
 * para quem lê e pode ser tratado como publicidade enganosa.
 */
export const realTestimonials: readonly Testimonial[] = []

/**
 * Enquanto não houver depoimentos reais, a seção mostra os exemplos, cada um com a etiqueta
 * "Exemplo, não é cliente real". Assim que `realTestimonials` tiver itens, só eles aparecem.
 */
export function selectTestimonials(
  real: readonly Testimonial[],
  samples: readonly Testimonial[],
): readonly Testimonial[] {
  return real.length > 0 ? real : samples
}

export const visibleTestimonials = selectTestimonials(realTestimonials, sampleTestimonials)
