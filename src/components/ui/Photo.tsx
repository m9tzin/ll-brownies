import { useState } from 'react'
import { cn } from '@/lib/cn'
import { getPhoto } from '@/lib/photos'

interface PhotoProps {
  /** Nome do arquivo em src/assets/photos, sem extensão (ex.: "hero"). */
  name: string
  alt: string
  className?: string
  /** Foto acima da dobra: carrega primeiro, com prioridade. */
  priority?: boolean
  /** Só para fotos grandes lá embaixo na página. As demais carregam logo: evita foto "quebrada" ao rolar. */
  lazy?: boolean
  /** Classes da <img>, por exemplo `object-[50%_60%]` para escolher o foco do corte. */
  imageClassName?: string
}

const MAX_RETRIES = 1
const RETRY_DELAY_MS = 800

/**
 * Mostra a foto quando ela existe. Se o arquivo não existe, ou se o carregamento falha (mesmo
 * depois de uma nova tentativa), mostra um espaço neutro "Foto em breve" em vez do ícone de
 * imagem quebrada.
 */
export function Photo({ name, alt, className, priority = false, lazy = false, imageClassName }: PhotoProps) {
  const src = getPhoto(name)
  const [attempt, setAttempt] = useState(0)
  const [failed, setFailed] = useState(false)

  if (src && !failed) {
    // a nova tentativa muda a URL para o navegador não reaproveitar a resposta que falhou
    const url = attempt === 0 ? src : `${src}${src.includes('?') ? '&' : '?'}retry=${attempt}`

    return (
      <div className={cn('overflow-hidden bg-cream', className)}>
        <img
          key={attempt}
          src={url}
          alt={alt}
          loading={lazy ? 'lazy' : 'eager'}
          fetchPriority={priority ? 'high' : 'auto'}
          decoding="async"
          onError={() => {
            if (attempt < MAX_RETRIES) setTimeout(() => setAttempt((current) => current + 1), RETRY_DELAY_MS)
            else setFailed(true)
          }}
          className={cn('size-full object-cover', imageClassName)}
        />
      </div>
    )
  }

  return (
    <div
      role="img"
      aria-label={`${alt} (foto em breve)`}
      className={cn('eyebrow grid place-items-center border border-ink/15 bg-cream text-muted', className)}
    >
      Foto em breve
    </div>
  )
}
