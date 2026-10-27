export interface FaqItem {
  question: string
  /** `null` = a loja ainda não passou a informação: a pergunta não aparece no site. */
  answer: string | null
}

export const faq: readonly FaqItem[] = [
  {
    question: 'Como faço um pedido?',
    answer:
      'Escolha os itens no cardápio, confira a sacola e toque em enviar. A conversa abre no WhatsApp com tudo pronto, e só vai quando você enviar.',
  },
  {
    question: 'Posso escolher o nome que vai no saquinho?',
    answer: 'Pode. Escreva no cardápio ou na sacola. O nome vai junto na mensagem do pedido.',
  },
  {
    question: 'Quais são os tamanhos dos copos?',
    answer: 'Pequeno por R$ 10 e grande por R$ 20. Todos levam brownie entre as camadas.',
  },
  {
    question: 'Onde vocês ficam?',
    answer: 'Em Nerópolis, GO.',
  },

  // Respostas genéricas: levam o assunto para o WhatsApp em vez de afirmar regras da loja.
  // Quando tiver a regra definida, troque pelo texto exato (ex.: "Entregamos em Nerópolis, GO").
  {
    question: 'Vocês entregam ou só retiram?',
    answer: 'Isso a gente combina direto no WhatsApp, junto com o seu pedido.',
  },
  {
    question: 'Quais são as formas de pagamento?',
    answer: 'As formas de pagamento também são combinadas no WhatsApp, na hora de confirmar o pedido.',
  },
  {
    question: 'Com quanto tempo de antecedência devo pedir?',
    answer:
      'Para um dia ou horário específico, ou para quantidades maiores, chame no WhatsApp com antecedência para combinar.',
  },
]

export const visibleFaq = faq.filter(
  (item): item is FaqItem & { answer: string } => item.answer !== null,
)
