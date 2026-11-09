import { storeHours } from '@/config/site'

export interface StoreStatus {
  open: boolean
  /** Frase pronta para o aviso da página. */
  message: string
}

interface Hours {
  open: number
  close: number
  timeZone: string
}

/** Hora cheia (0 a 23) de `now` no fuso da loja, não no do visitante. */
function hourIn(timeZone: string, now: Date): number {
  const parts = new Intl.DateTimeFormat('en-GB', { timeZone, hour: 'numeric', hourCycle: 'h23' }).formatToParts(now)
  return Number(parts.find((part) => part.type === 'hour')?.value)
}

/** Estado da loja no instante `now`: se aceita pedidos e o que dizer sobre isso. */
export function getStoreStatus(now: Date, hours: Hours = storeHours): StoreStatus {
  const hour = hourIn(hours.timeZone, now)

  if (hour >= hours.open && hour < hours.close) {
    return { open: true, message: `Pedidos abertos hoje até as ${hours.close}h` }
  }
  // antes de abrir ainda é o mesmo dia; depois de fechar, só amanhã
  const when = hour < hours.open ? 'abrimos hoje' : 'voltamos amanhã'
  return { open: false, message: `Fechado agora, ${when} às ${hours.open}h` }
}
