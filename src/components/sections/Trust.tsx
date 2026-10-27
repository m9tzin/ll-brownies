import { Reveal } from '../ui/Reveal'

const points = [
  { title: 'Você vê o total', text: 'A sacola soma tudo antes de qualquer envio. Sem surpresa no fim.' },
  { title: 'Você escolhe o nome', text: 'O nome do saquinho é seu. Pode mudar quando quiser, até a hora de enviar.' },
  {
    title: 'Você aperta enviar',
    text: 'A mensagem abre pronta no WhatsApp, mas só sai quando você enviar.',
  },
]

export function Trust() {
  return (
    <section aria-labelledby="titulo-controle" className="bg-ink py-24 text-paper md:py-40">
      <div className="grid-wrap">
        <Reveal className="mb-16 max-w-3xl">
          <p className="eyebrow mb-5 text-paper/60">Você no controle</p>
          <h2 id="titulo-controle" className="display-title text-[clamp(2.25rem,4.8vw,4rem)]">
            Nada sai sem
            <br />
            a sua aprovação.
          </h2>
        </Reveal>

        <ul className="grid gap-x-8 gap-y-10 md:grid-cols-3">
          {points.map((point, index) => (
            <li key={point.title}>
              <Reveal delay={index * 100} className="border-t border-paper/40 pt-5">
                <span className="eyebrow text-paper/60">{String(index + 1).padStart(2, '0')}</span>
                <h3 className="display-title mt-3 text-[1.75rem]">{point.title}</h3>
                <p className="mt-3 max-w-[34ch] text-paper/75">{point.text}</p>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
