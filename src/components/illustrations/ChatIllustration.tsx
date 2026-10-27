function Bars({ light = false }: { light?: boolean }) {
  const bar = light ? 'bg-paper/45' : 'bg-ink/20'
  return (
    <div className="space-y-1.5">
      <div className={`h-1.5 w-full ${bar}`} />
      <div className={`h-1.5 w-4/5 ${bar}`} />
    </div>
  )
}

/**
 * Conversa em loop: um balão chega, a resposta entra pela direita, aparece o "digitando…"
 * e chega outro balão; no fim, tudo some e recomeça. Puro CSS.
 */
export function ChatIllustration() {
  return (
    <>
      <div className="animate-chat-a absolute top-[14%] left-[9%] w-[56%] bg-paper p-3.5">
        <Bars />
      </div>
      <div className="animate-chat-b absolute top-[38%] right-[9%] w-[54%] bg-ink p-3.5">
        <Bars light />
      </div>
      <div className="animate-chat-typing absolute top-[64%] left-[16%] flex items-center gap-1.5 bg-paper px-4 py-3.5">
        {[0, 1, 2].map((dot) => (
          <span
            key={dot}
            style={{ animationDelay: `${dot * 160}ms` }}
            className="animate-typing size-1.5 rounded-full bg-ink/70"
          />
        ))}
      </div>
      <div className="animate-chat-c absolute top-[64%] left-[16%] flex w-[42%] items-center gap-2 bg-paper p-3.5">
        <span className="size-2.5 shrink-0 bg-accent" />
        <div className="h-1.5 w-full bg-ink/20" />
      </div>
    </>
  )
}
