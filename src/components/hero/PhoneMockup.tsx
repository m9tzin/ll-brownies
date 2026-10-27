import type { ReactNode } from 'react'

/** Moldura de celular. O conteúdo da tela vem de fora (children). */
export function PhoneMockup({ children }: { children: ReactNode }) {
  return (
    <div className="relative mx-auto h-[min(38rem,calc(100svh-11rem))] min-h-[32rem] w-[19.5rem] rounded-[2.75rem] border-[10px] border-ink bg-ink shadow-[0_30px_60px_-20px_rgb(0_0_0/0.65)] ring-1 ring-paper/25">
      <div aria-hidden="true" className="absolute top-1.5 left-1/2 z-10 h-5 w-24 -translate-x-1/2 rounded-full bg-ink" />
      {/* raio = raio da moldura (2.75rem) menos a borda (10px = 0.625rem): os cantos ficam concêntricos.
          `isolate` + `clip-path` garantem o recorte também no Safari, onde `overflow-hidden` sozinho
          deixa escapar os filhos que rolam (a lista do cardápio) e as barras de cima e de baixo. */}
      <div className="isolate size-full overflow-hidden rounded-[2.125rem] bg-cream [clip-path:inset(0_round_2.125rem)]">
        {children}
      </div>
    </div>
  )
}
