import type { CSSProperties, ReactNode } from 'react'

/**
 * Raio dos cantos da tela: o da moldura (2.75rem) menos a borda (10px), para os cantos ficarem
 * concêntricos. As barras de cima e de baixo do conteúdo usam o mesmo valor (--screen-radius).
 */
const frameStyle = { '--screen-radius': 'calc(2.75rem - 10px)' } as CSSProperties

/** Moldura de celular. O conteúdo da tela vem de fora (children). */
export function PhoneMockup({ children }: { children: ReactNode }) {
  return (
    <div
      style={frameStyle}
      className="relative mx-auto h-[min(38rem,calc(100svh-11rem))] min-h-[32rem] w-[19.5rem] rounded-[2.75rem] border-[10px] border-ink bg-ink shadow-[0_30px_60px_-20px_rgb(0_0_0/0.65)] ring-1 ring-paper/25"
    >
      <div aria-hidden="true" className="absolute top-1.5 left-1/2 z-10 h-5 w-24 -translate-x-1/2 rounded-full bg-ink" />
      {/* `isolate` + `clip-path` recortam a tela também no Safari, onde `overflow-hidden` sozinho
          deixa escapar os filhos que rolam (a lista do cardápio) e as barras de cima e de baixo.
          Mesmo assim o Safari do celular às vezes falha em recortar durante a rolagem e os cantos
          ficam quadrados: por isso as barras de cima e de baixo também têm o canto arredondado. */}
      <div className="isolate size-full overflow-hidden rounded-(--screen-radius) bg-cream [clip-path:inset(0_round_var(--screen-radius))]">
        {children}
      </div>
    </div>
  )
}
