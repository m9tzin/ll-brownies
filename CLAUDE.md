# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

Landing page da LL Brownie's (brownies artesanais de Nerópolis, GO). SPA estática sem backend: o "pedido" é montado no navegador e enviado como mensagem de WhatsApp. Todo texto voltado ao usuário, comentários e commits são em português.

## Regras do projeto

- **Brownie sem foto não aparece** no cardápio. O `id` do produto em `data/products.ts` é o nome do arquivo da foto.
- As fotos em `src/assets/photos/` são geradas por `npm run photos` a partir de `photos-originais/` (fora do git). Para mudar uma foto, regenere o `.webp`, não edite o arquivo gerado.
- **Depoimentos**: nunca invente depoimento atribuído a uma pessoa e não marque exemplo como real. Exemplos só aparecem enquanto `realTestimonials` estiver vazio, sempre com a etiqueta "Exemplo".
