/**
 * Fotos do site. Basta salvar o arquivo em `src/assets/photos/` com o nome do
 * produto (ex.: `brownie-leitinho.jpg`) ou `historia.jpg`; o Vite empacota e
 * otimiza o cache. Formatos aceitos: jpg, jpeg, png, webp e avif.
 */
const files = import.meta.glob<string>('/src/assets/photos/*.{jpg,jpeg,png,webp,avif}', {
  eager: true,
  query: '?url',
  import: 'default',
})

const byName = new Map<string, string>(
  Object.entries(files).map(([path, url]) => {
    const file = path.split('/').pop() ?? path
    return [file.replace(/\.[^.]+$/, ''), url]
  }),
)

/** URL da foto com esse nome, ou `undefined` enquanto ela não existe. */
export function getPhoto(name: string): string | undefined {
  return byName.get(name)
}

/** O site só mostra produto que tem foto: use isto para decidir se o cartão aparece. */
export function hasPhoto(name: string): boolean {
  return byName.has(name)
}
