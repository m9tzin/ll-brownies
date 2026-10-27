import { describe, expect, it } from 'vitest'
import { demoScenarios, demoStages } from '@/data/demo'
import { visibleFaq } from '@/data/faq'
import { buildConversation, scenarioTotal } from './demo'

describe('cenários da demo', () => {
  it('são seis e todos têm itens do cardápio', () => {
    expect(demoScenarios).toHaveLength(6)
    for (const scenario of demoScenarios) {
      expect(scenario.items.length).toBeGreaterThan(0)
      expect(scenarioTotal(scenario)).toBeGreaterThan(0)
    }
  })

  it('calcula o total com preços do cardápio', () => {
    const presente = demoScenarios.find((scenario) => scenario.id === 'presente')
    // 2 brownies (R$ 8) + 1 copo pequeno (R$ 10)
    expect(presente && scenarioTotal(presente)).toBe(26)
  })
})

describe('buildConversation', () => {
  const scenario = demoScenarios[0]!

  it('mostra uma mensagem a mais a cada etapa', () => {
    const counts = demoStages.map((_, stage) => buildConversation(scenario, stage).length)
    expect(counts).toEqual([1, 2, 3, 4])
  })

  it('alterna cliente e loja, começando pelo cliente', () => {
    const from = buildConversation(scenario, 3).map((message) => message.from)
    expect(from).toEqual(['customer', 'shop', 'customer', 'shop'])
  })

  it('inclui nome e total no resumo preparado', () => {
    const summary = buildConversation(scenario, 1)[1]
    expect(summary?.text).toContain(scenario.customer)
    expect(summary?.text).toContain('Total: R$ 8')
  })

  it('limita a etapa ao intervalo válido', () => {
    expect(buildConversation(scenario, -5)).toHaveLength(1)
    expect(buildConversation(scenario, 99)).toHaveLength(4)
  })
})

describe('faq', () => {
  it('só mostra perguntas que já têm resposta', () => {
    expect(visibleFaq.length).toBeGreaterThan(0)
    expect(visibleFaq.every((item) => item.answer.length > 0)).toBe(true)
  })
})
