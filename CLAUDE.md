# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

Landing page da LL Brownie's (brownies artesanais de Nerópolis, GO). SPA estática em React 19 + Vite + Tailwind v4, sem backend: o "pedido" é montado no navegador e enviado como mensagem de WhatsApp. Todo texto voltado ao usuário, comentários e commits são em português.

## Comandos

```bash
npm run dev       # servidor Vite
npm run build     # tsc -b && vite build (o typecheck faz parte do build)
npm run lint      # oxlint (não há ESLint/Prettier)
npm test          # vitest run
npm run photos    # photos-originais/ -> src/assets/photos/*.webp (sharp, máx. 1600px)

npx vitest run src/lib/whatsapp.test.ts      # um arquivo de teste
npx vitest run -t "trecho do nome do teste"  # um teste pelo nome
```

Configuração: copie `.env.example` para `.env.local` e defina `VITE_WHATSAPP_NUMBER` (só dígitos, `55DD9XXXXXXXX`). Sem ela, `src/config/site.ts` usa um número placeholder inválido e avisa no console em dev. O deploy é na Vercel (`.vercel/` fica fora do git).

## Arquitetura

`App.tsx` empilha as seções (`components/sections/*`) dentro de um `OrderProvider`, mais `Nav`, `Footer`, `CartBar` e `CartDialog`. O alias `@/` aponta para `src/`.

**Fluxo do pedido** (precisa de vários arquivos para entender):
- `context/orderReducer.ts` é o reducer puro (add/change/clear/setName, nome do saquinho limitado a `MAX_NAME_LENGTH`) e concentra os seletores. É a parte testada.
- `context/OrderProvider.tsx` + `order-context.ts` + `useOrder.ts` expõem o estado; `orderStorage.ts` persiste em `localStorage` (chave `ll-brownies:pedido:v1`) e trata qualquer dado inválido ou armazenamento bloqueado como pedido vazio.
- `lib/whatsapp.ts` transforma as linhas do pedido na mensagem e na URL `wa.me` usando o número de `config/site.ts`.

**Cardápio e fotos**:
- `data/products.ts` é a fonte de brownies, copos e tamanhos/preços. O `id` do produto é também o nome do arquivo da foto.
- `lib/photos.ts` descobre as fotos por `import.meta.glob` em `src/assets/photos/`. **Regra do site: brownie sem foto não aparece** (`Menu.tsx` filtra com `hasPhoto`); quando a foto é adicionada, o produto volta sozinho. Os copos usam uma galeria fixa (`copo-1..3`).
- As fotos são geradas por `npm run photos` a partir de `photos-originais/`, que fica fora do git. Para mudar uma foto, regenere o `.webp`, não edite o arquivo gerado.

**Demo do WhatsApp no hero**: `data/demo.ts` define cenários montados só com itens e preços reais de `products.ts` (lança erro se um id sumir); `lib/demo.ts` gera a conversa por etapa reutilizando `buildOrderMessage`; `components/hero/*` renderiza o celular. Tudo ilustrativo.

**Depoimentos**: `data/testimonials.ts` mostra `realTestimonials` quando houver itens; enquanto estiver vazio, mostra os exemplos de `testimonials.samples.ts`, cada um com a etiqueta "Exemplo". Nunca invente depoimento atribuído a uma pessoa e não marque exemplo como real.

**Estilo**: Tailwind v4 sem `tailwind.config`; os tokens (`ink`, `paper`, `cream`, `accent`, fontes, animações) ficam em `@theme` no início de `src/index.css`, que também define a variante `fine-hover` (hover só com mouse de verdade). Animações de entrada passam por `ui/Reveal` e `hooks/usePrefersReducedMotion`.

## Convenções

- TypeScript estrito com `noUncheckedIndexedAccess`, `verbatimModuleSyntax` e `erasableSyntaxOnly` (sem `enum`/parameter properties); use `import type` para tipos.
- Testes (`*.test.ts`) ficam ao lado do código e cobrem só lógica pura em `lib/`, `context/` e `data/`; não há testes de componente.
- O README da raiz é mínimo, e `src/assets/photos/README.md` o cita como se tivesse a tabela de nomes de fotos, mas ela não existe lá. A regra está em `data/products.ts` e `lib/photos.ts`.
