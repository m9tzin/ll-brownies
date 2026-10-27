import { useSyncExternalStore } from 'react'

const query = '(prefers-reduced-motion: reduce)'

/** `true` quando a pessoa pediu menos movimento no sistema. */
export function usePrefersReducedMotion(): boolean {
  return useSyncExternalStore(
    (notify) => {
      const media = window.matchMedia(query)
      media.addEventListener('change', notify)
      return () => media.removeEventListener('change', notify)
    },
    () => window.matchMedia(query).matches,
    () => false,
  )
}
