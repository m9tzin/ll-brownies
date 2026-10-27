// Converte as fotos originais (pesadas) em WebP leve para o site.
//
//   Origem:  photos-originais/*.jpg|png|webp  (fora do git; subpastas são ignoradas)
//   Destino: src/assets/photos/<mesmo-nome>.webp
//
// O nome do arquivo decide onde a foto aparece (veja src/assets/photos/README.md).
// Uso: npm run photos
import { mkdir, readdir, stat } from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

const SOURCE_DIR = 'photos-originais'
const OUTPUT_DIR = 'src/assets/photos'
const MAX_WIDTH = 1600
const QUALITY = 80

const kb = (bytes) => `${Math.round(bytes / 1024)} KB`

await mkdir(OUTPUT_DIR, { recursive: true })

const entries = await readdir(SOURCE_DIR, { withFileTypes: true })
const files = entries.filter((e) => e.isFile() && /\.(jpe?g|png|webp)$/i.test(e.name))

if (files.length === 0) {
  console.log(`Nenhuma foto encontrada em ${SOURCE_DIR}/`)
  process.exit(0)
}

for (const file of files) {
  const input = path.join(SOURCE_DIR, file.name)
  const output = path.join(OUTPUT_DIR, `${path.parse(file.name).name}.webp`)

  await sharp(input)
    .rotate() // respeita a orientação gravada pela câmera
    .resize({ width: MAX_WIDTH, withoutEnlargement: true })
    .webp({ quality: QUALITY })
    .toFile(output)

  const [before, after] = await Promise.all([stat(input), stat(output)])
  console.log(`${file.name}: ${kb(before.size)} -> ${kb(after.size)}  (${output})`)
}
