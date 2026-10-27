import type { ReactNode } from 'react'
import { BagIllustration } from '../illustrations/BagIllustration'
import { ChatIllustration } from '../illustrations/ChatIllustration'
import { HomemadeIllustration } from '../illustrations/HomemadeIllustration'
import { IllustrationFrame } from '../illustrations/IllustrationFrame'
import { LayersIllustration } from '../illustrations/LayersIllustration'
import { Reveal } from '../ui/Reveal'

const tones = {
  hazelnut: 'bg-hazelnut',
  kraft: 'bg-kraft',
  latte: 'bg-latte',
  praline: 'bg-praline',
} as const

interface Pillar {
  title: string
  text: string
  tone: keyof typeof tones
  illustration: ReactNode
}

const pillars: readonly Pillar[] = [
  {
    title: 'Feito em casa',
    text: 'Receita ajustada até ficar certa. Sem pressa e sem fórmula secreta.',
    tone: 'hazelnut',
    illustration: <HomemadeIllustration />,
  },
  {
    title: 'Seu nome no saquinho',
    text: 'Papel de padaria, o nome de quem recebe e um sorriso =).',
    tone: 'kraft',
    illustration: <BagIllustration />,
  },
  {
    title: 'Copos da Felicidade',
    text: 'Camadas de recheio, com brownie no meio. Em dois tamanhos.',
    tone: 'latte',
    illustration: <LayersIllustration />,
  },
  {
    title: 'Pedido pelo WhatsApp',
    text: 'Você monta aqui. A mensagem vai pronta, é só enviar.',
    tone: 'praline',
    illustration: <ChatIllustration />,
  },
]

export function Pillars() {
  return (
    <section aria-labelledby="titulo-pilares" className="pb-24 md:pb-40">
      <div className="grid-wrap">
        <h2 id="titulo-pilares" className="sr-only">
          O que torna a LL Brownie’s diferente
        </h2>
        <ul className="grid gap-x-6 gap-y-14 sm:grid-cols-2">
          {pillars.map((pillar, index) => (
            <li key={pillar.title}>
              <Reveal delay={(index % 2) * 100}>
                <IllustrationFrame className={tones[pillar.tone]}>{pillar.illustration}</IllustrationFrame>
                <div className="mt-5 flex gap-6 border-t border-ink pt-4">
                  <span className="eyebrow pt-2 text-muted">{String(index + 1).padStart(2, '0')}</span>
                  <div>
                    <h3 className="display-title text-[1.75rem]">{pillar.title}</h3>
                    <p className="mt-2 max-w-[36ch] text-muted">{pillar.text}</p>
                  </div>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
