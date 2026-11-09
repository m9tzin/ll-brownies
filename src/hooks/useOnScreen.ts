import { useEffect, useState } from 'react'

/** `true` enquanto qualquer parte do elemento com esse id está visível na tela. */
export function useOnScreen(id: string): boolean {
  const [onScreen, setOnScreen] = useState(false)

  useEffect(() => {
    const element = document.getElementById(id)
    if (!element || typeof IntersectionObserver === 'undefined') return

    const observer = new IntersectionObserver(([entry]) => setOnScreen(Boolean(entry?.isIntersecting)))
    observer.observe(element)
    return () => observer.disconnect()
  }, [id])

  return onScreen
}
