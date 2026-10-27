interface ImportMetaEnv {
  /** WhatsApp da loja: código do país + DDD + número, só dígitos. Modelo: 55DD9XXXXXXXX */
  readonly VITE_WHATSAPP_NUMBER?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
