/** Número de exemplo, inválido de propósito (DDD 00 não existe): não leva a ninguém. Troque em .env.local (veja .env.example). */
export const PLACEHOLDER_WHATSAPP = '5500000000000'

export const site = {
  name: 'LL Brownie’s',
  city: 'Nerópolis, GO',
  tagline: 'Brownies artesanais',
  instagramHandle: '@ll.browniess',
  instagramUrl: 'https://www.instagram.com/ll.browniess/',
  whatsappNumber: import.meta.env.VITE_WHATSAPP_NUMBER || PLACEHOLDER_WHATSAPP,
} as const

/** Seções do menu, na ordem em que aparecem na página. */
export const navLinks = [
  { id: 'historia', label: 'Nossa história' },
  { id: 'cardapio', label: 'Cardápio' },
  { id: 'pedir', label: 'Como pedir' },
  { id: 'perguntas', label: 'Perguntas' },
] as const

if (import.meta.env.DEV && site.whatsappNumber === PLACEHOLDER_WHATSAPP) {
  console.warn(
    '[LL Brownie’s] WhatsApp de exemplo em uso. Defina VITE_WHATSAPP_NUMBER em .env.local.',
  )
}
