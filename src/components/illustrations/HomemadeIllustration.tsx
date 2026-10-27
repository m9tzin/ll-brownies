const ruled =
  'bg-[repeating-linear-gradient(transparent_0_17px,color-mix(in_oklab,var(--color-ink)_10%,transparent)_17px_18px)]'

/** Três fichas de receita que flutuam em ritmos diferentes; o carimbo pulsa e a linha "escreve". Puro CSS. */
export function HomemadeIllustration() {
  return (
    <>
      <div
        style={{ animationDuration: '7s', animationDelay: '-1s' }}
        className="animate-drift absolute top-[18%] left-[12%] h-[62%] w-[38%] -rotate-6 border border-ink/15 bg-paper"
      />
      <div
        style={{ animationDuration: '8s', animationDelay: '-4s' }}
        className={`animate-drift absolute top-[10%] left-[29%] h-[62%] w-[38%] rotate-3 border border-ink/15 bg-cream ${ruled}`}
      />
      <div
        style={{ animationDuration: '6s', animationDelay: '-2.5s' }}
        className={`animate-drift absolute top-[22%] left-[47%] h-[62%] w-[38%] -rotate-2 border border-ink/15 bg-paper ${ruled}`}
      >
        <span className="animate-stamp absolute top-3 right-3 size-3 bg-accent" />
        <span className="animate-write absolute bottom-4 left-3 h-px w-1/2 origin-left bg-ink/40" />
      </div>
    </>
  )
}
