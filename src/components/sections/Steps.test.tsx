/// <reference types="node" />
import { readFileSync } from 'node:fs'
import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'
import { BAG_DELAY_MS, HOLD_MS, StepsTrack } from './Steps'

// o Vitest zera os .css importados (até com ?raw), então o arquivo é lido direto
const css = readFileSync(new URL('../../index.css', import.meta.url), 'utf8')

const BAG = 'data-testid="saquinho-saindo"'
const LAST = 3

function render(current: number, props: { reduced?: boolean } = {}) {
  return renderToStaticMarkup(
    <StepsTrack current={current} inView reduced={props.reduced ?? false} paused={false} />,
  )
}

/** Um trecho por passo (o `<li>` de cada um). */
const stepItems = (html: string) => html.split('<li').slice(1)

/** Quadros da animação `bag-out`: porcentagem, opacidade e deslocamento horizontal. */
function bagFrames() {
  const block = css.match(/@keyframes bag-out\s*\{([\s\S]*?)\n {2}\}/)?.[1] ?? ''
  return [...block.matchAll(/(\d+)%\s*\{([^}]*)\}/g)].map(([, percent, body]) => ({
    percent: Number(percent),
    opacity: Number(body?.match(/opacity:\s*([\d.]+)/)?.[1] ?? Number.NaN),
    x: Number(body?.match(/translate\(\s*(-?[\d.]+)px/)?.[1] ?? Number.NaN),
  }))
}

describe('saquinho que sai do passo 4', () => {
  it('renderiza dentro do passo 4 quando ele é o passo atual', () => {
    const items = stepItems(render(LAST))
    expect(items).toHaveLength(4)
    expect(items[LAST]).toContain(BAG)
    // só um saquinho, e só no último passo
    expect(render(LAST).split(BAG)).toHaveLength(2)
  })

  it('não aparece antes de chegar ao passo 4', () => {
    for (const current of [-1, 0, 1, 2]) {
      expect(render(current), `passo atual ${current}`).not.toContain(BAG)
    }
  })

  it('não renderiza com "menos movimento" ligado', () => {
    expect(render(LAST, { reduced: true })).not.toContain(BAG)
  })

  it('usa a animação bag-out, registrada no tema', () => {
    expect(stepItems(render(LAST))[LAST]).toContain('animate-bag-out')
    expect(css).toMatch(/--animate-bag-out:\s*bag-out\s/)
  })

  it('é visto saindo: aparece, se afasta do passo e some no fim', () => {
    const frames = bagFrames()
    const first = frames.find((frame) => frame.percent === 0)
    const last = frames.find((frame) => frame.percent === 100)
    const visible = frames.filter((frame) => frame.percent > 0 && frame.percent < 100 && frame.opacity >= 0.9)

    expect(first?.opacity, 'começa escondido').toBe(0)
    expect(visible.length, 'chega a ficar visível no meio').toBeGreaterThan(0)
    expect(Math.max(...visible.map((frame) => frame.x)), 'se afasta do passo').toBeGreaterThan(first?.x ?? 0)
    expect(last?.opacity, 'termina sumido').toBe(0)
  })

  it('termina antes de a sequência recomeçar', () => {
    const seconds = Number(css.match(/--animate-bag-out:\s*bag-out\s+([\d.]+)s/)?.[1])
    expect(seconds).toBeGreaterThan(0)
    expect(BAG_DELAY_MS + seconds * 1000).toBeLessThanOrEqual(HOLD_MS)
  })
})
