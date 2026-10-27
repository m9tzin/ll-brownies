import { useOrder } from '@/context/useOrder'

/**
 * Saquinho de papel que balança, com a etiqueta "para: [nome]".
 * O nome é o que o cliente digitou: a cada mudança a etiqueta salta e o sorriso dá uma piscada.
 */
export function BagIllustration() {
  const { customerName } = useOrder()
  const name = customerName.trim() || 'você'

  return (
    <>
      <div
        style={{ animationDuration: '8s', animationDelay: '-3s' }}
        className="animate-drift absolute top-[34%] left-[14%] h-[52%] w-[28%] -rotate-12 bg-kraft-deep/70"
      />
      <div className="animate-swing absolute top-[12%] left-[38%] h-[76%] w-[38%] origin-top bg-kraft-deep">
        <div className="absolute inset-x-0 top-0 h-[14%] border-b border-dashed border-ink/30 bg-ink/10" />
        <div key={name} className="animate-pop absolute inset-x-[14%] top-[34%] bg-paper px-2 py-3 text-center">
          <p className="eyebrow text-muted">para</p>
          <p className="display-title wrap-anywhere text-[clamp(1rem,2.4vw,1.5rem)]">{name}</p>
          <p className="animate-smile mt-1 inline-block font-display text-sm">=)</p>
        </div>
      </div>
    </>
  )
}
