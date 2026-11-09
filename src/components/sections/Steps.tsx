import { useEffect, useState } from 'react'
import { useInView } from '@/hooks/useInView'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import { cn } from '@/lib/cn'

const steps = [
  { title: 'Escolha', text: 'Abra o cardápio e toque em Adicionar nos brownies e nos copos.' },
  { title: 'Dê um nome ao saquinho', text: 'Escreva o nome de quem vai receber. É opcional.' },
  { title: 'Confira o pedido', text: 'Veja os itens e o total antes de enviar.' },
  { title: 'Envie no WhatsApp', text: 'A mensagem abre pronta e só vai quando você enviar.' },
] as const

const LAST = steps.length - 1
/** Pausa antes de o primeiro passo acender, quando a seção entra na tela. */
const START_MS = 300
const STEP_MS = 1300
/** Depois do passo 4: tempo para o saquinho sair e sumir antes de a sequência recomeçar. */
export const HOLD_MS = 2800
/** O saquinho espera o passo 4 acender antes de sair. */
export const BAG_DELAY_MS = 600

/**
 * Quatro passos logo abaixo do topo. Ao entrar na tela, a linha se enche e cada passo acende
 * em sequência; no último, um saquinho sai e some, e então recomeça. Passar o mouse (ou focar) pausa.
 * Com "menos movimento" ligado, todos os passos aparecem acesos e parados.
 */
export function Steps() {
  const reduced = usePrefersReducedMotion()
  const { ref, inView } = useInView<HTMLDivElement>(0.3)
  const [active, setActive] = useState(-1)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (!inView || reduced || paused) return
    const delay = active < 0 ? START_MS : active === LAST ? HOLD_MS : STEP_MS
    const timer = setTimeout(() => setActive(active === LAST ? 0 : active + 1), delay)
    return () => clearTimeout(timer)
  }, [inView, reduced, paused, active])

  const current = reduced ? LAST : active

  return (
    <section aria-labelledby="titulo-passos" className="border-b border-ink/15 bg-paper py-16 md:py-24">
      <div className="grid-wrap">
        <p className="eyebrow mb-4 text-muted">Como funciona</p>
        <h2 id="titulo-passos" className="display-title mb-12 max-w-[18ch] text-[clamp(1.875rem,3.8vw,3rem)] md:mb-16">
          Do desejo ao WhatsApp em quatro passos.
        </h2>

        <div
          ref={ref}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
        >
          <StepsTrack current={current} inView={inView} reduced={reduced} paused={paused} />
        </div>
      </div>
    </section>
  )
}

interface StepsTrackProps {
  /** Último passo aceso (-1 = nenhum). */
  current: number
  inView: boolean
  reduced: boolean
  paused: boolean
}

/** Linha de progresso, os quatro passos e o saquinho que sai do último. */
export function StepsTrack({ current, inView, reduced, paused }: StepsTrackProps) {
  const progress = current < 0 ? 0 : current / LAST

  return (
    <div className="relative">
      {/* linha que se enche até o passo atual (só em telas largas) */}
      <div aria-hidden="true" className="absolute top-[22px] left-[22px] h-px w-3/4 bg-ink/15 max-md:hidden">
        <div
          className="h-full origin-left bg-accent transition-transform duration-[850ms] ease-out motion-reduce:transition-none"
          style={{ transform: `scaleX(${progress})` }}
        />
      </div>

      <ol className="relative grid gap-10 md:grid-cols-4 md:gap-6">
        {steps.map((step, index) => {
          const reached = index <= current
          const isCurrent = index === current && !reduced
          return (
            <li
              key={step.title}
              aria-current={isCurrent ? 'step' : undefined}
              style={{ transitionDelay: inView ? `${index * 120}ms` : undefined }}
              className={cn(
                'relative transition-[opacity,translate] duration-700 ease-out motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:transition-none',
                inView ? 'translate-y-0' : 'translate-y-5',
                inView ? (reached ? 'opacity-100' : 'opacity-55') : 'opacity-0',
              )}
            >
              <span
                className={cn(
                  'display-small mb-5 grid size-11 place-items-center border text-xl transition-[background-color,border-color,color,scale,box-shadow] duration-500',
                  reached ? 'border-accent bg-accent text-ink' : 'border-ink/40 bg-paper text-muted',
                  isCurrent && 'scale-110 shadow-[0_0_0_6px_color-mix(in_oklab,var(--color-accent)_25%,transparent)]',
                )}
              >
                {index + 1}
              </span>
              <h3 className="display-small text-xl leading-tight">{step.title}</h3>
              <p className="mt-2 max-w-[30ch] text-muted">{step.text}</p>
              {index === LAST && isCurrent && <OutgoingBag paused={paused} />}
            </li>
          )
        })}
      </ol>
    </div>
  )
}

/** Saquinho de papel que sai do passo 4, sobe para a direita e some. Decorativo. */
function OutgoingBag({ paused }: { paused: boolean }) {
  return (
    <svg
      data-testid="saquinho-saindo"
      aria-hidden="true"
      viewBox="0 0 36 44"
      style={{ animationDelay: `${BAG_DELAY_MS}ms`, animationPlayState: paused ? 'paused' : 'running' }}
      className="animate-bag-out pointer-events-none absolute top-0 left-0 z-10 h-11 w-9"
    >
      <path d="M3 10h30l2 32H1z" className="fill-kraft-deep" />
      <path d="M3 10h30l.4 6H2.6z" className="fill-ink/15" />
      <rect x="9" y="22" width="18" height="11" className="fill-paper" />
      <path d="M13 28h10" className="stroke-ink/50" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}
