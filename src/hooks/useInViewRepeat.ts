import { useEffect, useRef } from 'react'

/**
 * Avisa (`onChange`) toda vez que o elemento entra ou sai da tela. Diferente de `useInView`,
 * não para depois da primeira vez: serve para repetir uma animação a cada vez que a pessoa
 * rola até ali. Quem usa decide o que fazer no aviso, sem precisar de um efeito para isso.
 */
export function useInViewRepeat<T extends Element>(onChange: (inView: boolean) => void, threshold = 0.4) {
  const ref = useRef<T>(null)
  const latest = useRef(onChange)

  useEffect(() => {
    latest.current = onChange
  })

  useEffect(() => {
    const element = ref.current
    if (!element || typeof IntersectionObserver === 'undefined') return

    const observer = new IntersectionObserver(([entry]) => latest.current(Boolean(entry?.isIntersecting)), {
      threshold,
    })
    observer.observe(element)
    return () => observer.disconnect()
  }, [threshold])

  return ref
}
