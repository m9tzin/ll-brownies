import { useEffect } from 'react'

/**
 * Publica `--nav-progress` (0 a 1) no <html> conforme a rolagem.
 * A nav usa essa variável para ganhar fundo aos poucos. Atualiza no máximo
 * uma vez por quadro (requestAnimationFrame), sem re-renderizar o React.
 */
export function useNavProgress(range = 160): void {
  useEffect(() => {
    const root = document.documentElement
    let frame = 0

    const update = () => {
      frame = 0
      const progress = Math.min(1, Math.max(0, window.scrollY / range))
      root.style.setProperty('--nav-progress', progress.toFixed(3))
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (frame) cancelAnimationFrame(frame)
      root.style.removeProperty('--nav-progress')
    }
  }, [range])
}
