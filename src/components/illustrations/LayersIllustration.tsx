// De baixo para cima: brigadeiro, brownie, maracujá, creme e brownie.
// Cada camada tem a sua própria animação (pour-N), com os tempos em index.css.
const layers = [
  { color: '#7a4a32', animation: 'animate-pour-1' },
  { color: 'var(--color-cacau)', animation: 'animate-pour-2' },
  { color: '#f1d982', animation: 'animate-pour-3' },
  { color: 'var(--color-paper)', animation: 'animate-pour-4' },
  { color: 'var(--color-cacau)', animation: 'animate-pour-5' },
] as const

/** Copo que se enche camada por camada e fecha com a tampa; depois esvazia e recomeça. Puro CSS. */
export function LayersIllustration() {
  return (
    <div className="absolute top-[14%] left-1/2 h-[74%] w-[34%] -translate-x-1/2">
      <div className="animate-lid absolute -top-[3%] -right-[5%] -left-[5%] z-10 h-[5%] border border-ink/20 bg-paper" />
      <div className="relative size-full overflow-hidden [clip-path:polygon(0_0,100%_0,84%_100%,16%_100%)]">
        {layers.map((layer, index) => (
          <div
            key={index}
            style={{ bottom: `${index * 20}%`, background: layer.color }}
            className={`${layer.animation} absolute inset-x-0 h-[20%]`}
          />
        ))}
      </div>
    </div>
  )
}
