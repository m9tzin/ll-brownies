import { sampleTestimonials } from './testimonials.samples'

export interface Testimonial {
  quote: string
  /** Nome como a pessoa autorizou aparecer (ex.: "Maria S."). */
  author: string
  /** Opcional: cidade, ou o que ela pediu. */
  detail?: string
  /** `true` = texto de exemplo (não é cliente real). Nunca vai para o site publicado. */
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
 * Só os reais vão para o site publicado. No desenvolvimento (`npm run dev`) entram também os
 * exemplos, marcados como tal, para dar para ver como a seção fica. No build, `import.meta.env.DEV`
 * vira `false` e os exemplos saem do pacote.
 */
export function selectTestimonials(
  real: readonly Testimonial[],
  samples: readonly Testimonial[],
  isDev: boolean,
): readonly Testimonial[] {
  return real.length > 0 ? real : isDev ? samples : []
}

export const visibleTestimonials = selectTestimonials(
  realTestimonials,
  import.meta.env.DEV ? sampleTestimonials : [],
  import.meta.env.DEV,
)
