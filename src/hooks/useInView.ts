import { useEffect, useRef, useState } from 'react'

/** Vira `true` (uma única vez) quando o elemento entra na tela. */
export function useInView<T extends Element>(threshold = 0.12) {
  const ref = useRef<T>(null)
  const [inView, setInView] = useState(() => typeof IntersectionObserver === 'undefined')

  useEffect(() => {
    const element = ref.current
    if (!element || inView) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setInView(true)
          observer.disconnect()
        }
      },
      { threshold },
    )
    observer.observe(element)
    return () => observer.disconnect()
  }, [inView, threshold])

  return { ref, inView }
}
