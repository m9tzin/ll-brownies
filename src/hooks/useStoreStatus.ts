import { useEffect, useState } from 'react'
import { getStoreStatus, type StoreStatus } from '@/lib/storeHours'

const REFRESH_MS = 60_000

/** Estado da loja agora; reavalia a cada minuto para o aviso virar sozinho na hora de abrir ou fechar. */
export function useStoreStatus(): StoreStatus {
  const [status, setStatus] = useState(() => getStoreStatus(new Date()))

  useEffect(() => {
    const timer = setInterval(() => setStatus(getStoreStatus(new Date())), REFRESH_MS)
    return () => clearInterval(timer)
  }, [])

  return status
}
