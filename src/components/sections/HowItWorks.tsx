import { useEffect, useMemo, useState } from 'react'
import { demoScenarios, demoStages } from '@/data/demo'
import { useInViewRepeat } from '@/hooks/useInViewRepeat'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import { buildConversation, scenarioTotal } from '@/lib/demo'
import { cn } from '@/lib/cn'
import { formatBRL } from '@/lib/format'
import { buttonStyles } from '../ui/buttonStyles'
import { Reveal } from '../ui/Reveal'

/** Texto do botão em cada etapa: o que acontece ao avançar. */
const actionLabels = ['Preparar o pedido', 'Aprovar o pedido', 'Concluir', 'Recomeçar'] as const

const LAST_STAGE = demoStages.length - 1
const PAUSE_MS = 1300 // entre uma mensagem e a próxima
const TYPING_MS = 1100 // quanto tempo "digitando…" aparece antes de uma resposta da loja

/**
 * Conversa de exemplo, toda ilustrativa e sem backend: a loja prepara e o cliente aprova.
 * Toda vez que ela entra na tela, a conversa recomeça sozinha: as mensagens do cliente chegam
 * pela direita ("enviada") e as da loja pela esquerda, depois de um "digitando…".
 */
export function HowItWorks() {
  const reduced = usePrefersReducedMotion()
  const [scenarioId, setScenarioId] = useState(demoScenarios[0]?.id)
  const [stage, setStage] = useState(0)
  const [typing, setTyping] = useState(false)
  const [autoplay, setAutoplay] = useState(false)
  /** Muda a cada recomeço: remonta os balões para a animação de entrada tocar de novo. */
  const [playKey, setPlayKey] = useState(0)

  const scenario = demoScenarios.find((item) => item.id === scenarioId)
  const messages = useMemo(() => (scenario ? buildConversation(scenario, stage) : []), [scenario, stage])

  // cada vez que a conversa entra na tela, recomeça do zero e passa a tocar sozinha
  const chatRef = useInViewRepeat<HTMLDivElement>((inView) => {
    if (reduced) return
    if (inView) {
      setStage(0)
      setPlayKey((key) => key + 1)
      setAutoplay(true)
    } else {
      setAutoplay(false)
      setTyping(false)
    }
  }, 0.5)

  // toca: espera, mostra "digitando…" antes de respostas da loja e então revela a próxima mensagem
  useEffect(() => {
    if (!autoplay || !scenario || stage >= LAST_STAGE) return

    const nextFrom = buildConversation(scenario, stage + 1).at(-1)?.from
    let typingTimer: ReturnType<typeof setTimeout> | undefined
    const waitTimer = setTimeout(() => {
      if (nextFrom === 'shop') {
        setTyping(true)
        typingTimer = setTimeout(() => {
          setTyping(false)
          setStage((current) => current + 1)
        }, TYPING_MS)
      } else {
        setStage((current) => current + 1)
      }
    }, PAUSE_MS)

    return () => {
      clearTimeout(waitTimer)
      clearTimeout(typingTimer)
      setTyping(false)
    }
  }, [autoplay, stage, scenario])

  if (!scenario) return null

  function selectScenario(id: string) {
    setScenarioId(id)
    setStage(0)
    setTyping(false)
    setPlayKey((key) => key + 1)
    setAutoplay(!reduced)
  }

  function advance() {
    // quem clica assume o controle: a reprodução automática para
    setAutoplay(false)
    setTyping(false)
    if (stage >= LAST_STAGE) {
      setStage(0)
      setPlayKey((key) => key + 1)
    } else {
      setStage(stage + 1)
    }
  }

  return (
    <section id="pedir" aria-labelledby="titulo-pedir" className="py-24 md:py-40">
      <div className="grid-wrap">
        <Reveal className="mb-14 max-w-3xl">
          <p className="eyebrow mb-5 text-muted">Como pedir</p>
          <h2 id="titulo-pedir" className="display-title text-[clamp(2.25rem,4.8vw,4rem)]">
            Você escolhe.
            <br />
            A conversa vai pronta.
          </h2>
          <p className="mt-6 max-w-[48ch] text-lg text-ink/80">
            Veja um pedido do começo ao fim. A loja prepara, você aprova. Os nomes e as conversas abaixo são
            exemplos.
          </p>
        </Reveal>

        <div className="grid items-start gap-12 md:grid-cols-[4fr_6fr] md:gap-20">
          {/* seletor de cenários */}
          <div>
            <p className="eyebrow mb-4 text-muted" id="rotulo-cenarios">
              Escolha um exemplo
            </p>
            <ul aria-labelledby="rotulo-cenarios" className="border-t border-ink">
              {demoScenarios.map((item, index) => {
                const selected = item.id === scenario.id
                return (
                  <li key={item.id} className="border-b border-ink/20">
                    <button
                      type="button"
                      aria-pressed={selected}
                      onClick={() => selectScenario(item.id)}
                      className={cn(
                        'flex w-full cursor-pointer items-baseline gap-5 py-4 text-left transition-colors',
                        selected ? 'text-ink' : 'text-muted fine-hover:text-ink',
                      )}
                    >
                      <span className="eyebrow w-6 shrink-0">{String(index + 1).padStart(2, '0')}</span>
                      <span className={cn('flex-1', selected && 'font-medium')}>{item.label}</span>
                      <span aria-hidden="true" className={cn('text-accent', !selected && 'invisible')}>
                        ←
                      </span>
                    </button>
                  </li>
                )
              })}
            </ul>
          </div>

          {/* conversa */}
          <div ref={chatRef}>
            <ol className="mb-5 grid grid-cols-4 gap-2" aria-label="Etapas do pedido">
              {demoStages.map((label, index) => (
                <li key={label} aria-current={index === stage ? 'step' : undefined}>
                  <div className="mb-2 h-0.5 bg-ink/15">
                    <div
                      className={cn(
                        'h-full origin-left bg-accent transition-transform duration-500 ease-out motion-reduce:transition-none',
                        index <= stage ? 'scale-x-100' : 'scale-x-0',
                      )}
                    />
                  </div>
                  <span className={cn('eyebrow transition-colors', index <= stage ? 'text-ink' : 'text-muted')}>
                    {label}
                  </span>
                </li>
              ))}
            </ol>

            <div className="border border-ink bg-paper">
              <div className="flex items-center justify-between border-b border-ink px-5 py-3">
                <span className="text-sm font-medium">LL Brownie’s · WhatsApp</span>
                <span className="eyebrow text-muted">Exemplo</span>
              </div>

              <div
                role="log"
                aria-live="polite"
                aria-relevant="additions"
                aria-label="Conversa de exemplo"
                className="min-h-[26rem] space-y-3 bg-cream p-5"
              >
                {messages.map((message) => {
                  const sent = message.from === 'customer'
                  return (
                    <div
                      key={`${playKey}-${message.id}`}
                      className={cn(
                        'max-w-[88%] px-4 py-3 text-[0.9375rem] whitespace-pre-line',
                        sent
                          ? 'animate-sent ml-auto bg-ink text-paper'
                          : 'animate-received border border-ink/15 bg-paper text-ink',
                      )}
                    >
                      {message.text}
                      <span
                        className={cn(
                          'mt-2 flex items-center justify-end gap-1.5 text-[10px] tracking-wider',
                          sent ? 'text-paper/60' : 'text-muted',
                        )}
                      >
                        {message.time}
                        {sent && <span aria-hidden="true">✓✓</span>}
                      </span>
                    </div>
                  )
                })}

                {typing && (
                  <div
                    aria-hidden="true"
                    className="animate-received flex w-16 items-center justify-center gap-1.5 border border-ink/15 bg-paper px-4 py-4"
                  >
                    {[0, 1, 2].map((dot) => (
                      <span
                        key={dot}
                        style={{ animationDelay: `${dot * 160}ms` }}
                        className="animate-typing size-1.5 rounded-full bg-ink/70"
                      />
                    ))}
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between gap-4 border-t border-ink px-5 py-3">
                <span className="text-sm text-muted">
                  Total do exemplo <strong className="font-medium text-ink">{formatBRL(scenarioTotal(scenario))}</strong>
                </span>
                <button
                  type="button"
                  onClick={advance}
                  className={buttonStyles({ variant: stage >= LAST_STAGE ? 'outline' : 'accent', size: 'sm' })}
                >
                  {actionLabels[stage]}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
