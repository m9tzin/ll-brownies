import { describe, expect, it } from 'vitest'
import { getStoreStatus } from './storeHours'

// Brasília é UTC-3: 12:00 UTC é 09:00 na loja.
const at = (hourUtc: number, minute = 0) => new Date(Date.UTC(2026, 10, 9, hourUtc, minute))

describe('getStoreStatus', () => {
  it('abre às 9h, no horário de Brasília', () => {
    expect(getStoreStatus(at(11, 59)).open).toBe(false)
    expect(getStoreStatus(at(12, 0))).toEqual({ open: true, message: 'Pedidos abertos hoje até as 20h' })
  })

  it('fecha às 20h: 19h59 ainda atende', () => {
    expect(getStoreStatus(at(22, 59)).open).toBe(true)
    expect(getStoreStatus(at(23, 0)).open).toBe(false)
  })

  it('antes de abrir, diz que abre hoje', () => {
    // 05:30 em Brasília
    expect(getStoreStatus(at(8, 30))).toEqual({ open: false, message: 'Fechado agora, abrimos hoje às 9h' })
  })

  it('depois de fechar, diz que volta amanhã', () => {
    // 21:00 em Brasília
    expect(getStoreStatus(at(24, 0))).toEqual({ open: false, message: 'Fechado agora, voltamos amanhã às 9h' })
  })

  // hora de Brasília -> mensagem esperada; UTC = Brasília + 3h. Inclui a meia-noite, onde um
  // formato de hora "24" faria o aviso dizer "voltamos amanhã" em vez de "abrimos hoje".
  it.each([
    ['00:00', 3, 0, 'Fechado agora, abrimos hoje às 9h'],
    ['08:59', 11, 59, 'Fechado agora, abrimos hoje às 9h'],
    ['09:00', 12, 0, 'Pedidos abertos hoje até as 20h'],
    ['19:59', 22, 59, 'Pedidos abertos hoje até as 20h'],
    ['20:00', 23, 0, 'Fechado agora, voltamos amanhã às 9h'],
    ['23:59', 26, 59, 'Fechado agora, voltamos amanhã às 9h'],
  ])('às %s em Brasília', (_hora, hourUtc, minute, message) => {
    expect(getStoreStatus(at(hourUtc, minute)).message).toBe(message)
  })

  it('usa o fuso da loja, não o do visitante', () => {
    // 12:00 UTC é meio-dia em Londres e 09:00 em Brasília: a loja já abriu
    expect(getStoreStatus(at(12), { open: 9, close: 20, timeZone: 'America/Sao_Paulo' }).open).toBe(true)
    expect(getStoreStatus(at(12), { open: 13, close: 20, timeZone: 'UTC' }).open).toBe(false)
  })
})
