# Medidas do redesign: antes e depois

> Tudo medido por script, contra o build de produção servido em `localhost:4173`, com as personas fictícias de `tests/personas/`. A coluna **depois** é preenchida a cada lote da implementação (Fase 5). Quando uma medida não pôde ser feita, a linha diz por quê.
>
> Como rodar de novo (com o app servido em 4173):
> - `node scripts/design/redesign/estados.mjs` (o estado das 6 personas, pelo gerador real)
> - `npx playwright test -c scripts/design/redesign/playwright.config.ts` (capturas e medidas por tela)
> - `node scripts/design/redesign/referencia.mjs` (o conjunto de referência versionado)
> - `node scripts/design/redesign/base.mjs` (bundle, letra e Lighthouse)

## Antes (06/11/2026, HEAD `420938e`)

### Telas, toque e contraste
`docs/revisoes/redesign/antes/medidas-{claro,escuro,pequeno}.json`: 100 telas e estados por projeto (o cadastro da Ana com as 4 variantes do equipamento, e programa, treino, descanso, 2ª série, "Senti algo", troca, guia em 3 modos ou cartão de texto, fim, semana, evolução e meus dados das 6 personas; os locais do Bruno).

| Medida | Claro (412 px) | Escuro (412 px) | 360 × 740 |
|---|---:|---:|---:|
| Telas medidas | 100 | 100 | 100 |
| Telas com toque abaixo de 44 px (`tests/e2e/toque.ts`) | 0 | 0 | 0 |
| Telas com texto abaixo do contraste WCAG 1.4.3 | 0 | 0 | 0 |
| Telas que rolam de lado | 0 | 0 | 0 |

### O botão principal na 1ª tela (360 × 740, sem rolar)
A medida (`scripts/design/medir.ts`) dá a posição do botão em % da altura da tela, contada do topo da página. Só vale para a tela aberta sem rolar: nas capturas da 2ª série e do descanso a página já estava rolada, e a imagem mostra o "Série feita" visível (a medida de visibilidade por estado é do agente 3).

| Tela | Botão | Posição | Alturas de tela |
|---|---|---:|---:|
| Boas-vindas | Entendi, vamos começar | 154% (fora) | 1,8 |
| Triagem | Nenhuma vale para mim | 147% (fora) | 1,8 |
| Experiência, respondida | Continuar | 182% (fora) | 2,1 |
| Rotina, respondida | Continuar | 206% (fora) | 2,3 |
| Equipamento, vazio | Continuar (fixo) | 91% | 5,0 |
| Equipamento, academia completa | Continuar (fixo) | 91% | 8,1 |
| Equipamento, lista da Ana | Continuar | 563% (fora) | 5,9 |
| Tudo certo? | Gerar meu programa | 83% | 1,1 |
| Início (Ana, Diego, Elisa, Fábio) | Começar o treino | 134% a 189% (fora) | 2,9 a 3,9 |
| Treino, 1ª série (6 personas) | Série feita | 88% | 1,6 a 1,7 |
| Fim do treino (5 de 6 personas) | Ver a sua semana | 143% a 152% (fora) | 1,7 |

O "Começar" do início só gruda embaixo quando a lista do dia já está à vista (`Programa.tsx`, `.acao-fixa` dentro da seção do dia); acima dela vêm a semana, os avisos de meta, a fase e a semana leve. No Bruno e na Carla, o 1º botão da tela é "Atualizar" (programa com versão nova), a 48–52%.

### Cadastro
| Medida | Antes | Fonte |
|---|---:|---|
| Toques da abertura ao programa, sem condição de saúde, sem a tela de equipamento | 13 | `tests/e2e/onboarding.spec.ts` |
| Caracteres digitados | 0 | idem |
| Telas (passos) | 6 | `PASSOS` em `src/storage/esquema.ts` |
| Toques, tempo do robô e tempo KLM por persona | ver o relatório do agente 2 | `agente-2-cadastro.md` |
| Tempo da tela de equipamento com "academia completa" (critério: ≤ 15 s) | ver o relatório do agente 2 | idem |
| Cronometragem do Gustavo no celular | não medido (fica para o fim do lote do cadastro, decisão de 05/11) | — |

### Bundle de produção e letra
`docs/revisoes/redesign/antes/base.json`.

| Arquivo | KiB (1.024 bytes) | KiB comprimido (gzip) |
|---|---:|---:|
| JavaScript (um arquivo só) | 1.060,1 | 269,4 |
| CSS | 42,9 | 8,5 |
| Pré-cache do PWA (6 arquivos) | 1.104,2 | — |

O Vite mostra os mesmos arquivos em kB de 1.000 bytes: JS 1.085,56 kB (275,90 kB gzip) e CSS 43,94 kB (8,64 kB gzip). É a conta citada no briefing comum.

| Letra (Atkinson Hyperlegible Next, Google Fonts) | Valor |
|---|---:|
| Pedidos externos na 1ª visita | 3 (1 CSS + 2 arquivos) |
| CSS da letra | 3,8 kB |
| Arquivos woff2 (variável: um arquivo cobre os 4 pesos; o 2º é o subconjunto latin-ext) | 18,6 + 33,2 = 51,8 kB |

### Lighthouse (celular simulado, CPU 4× mais lenta e rede 4G lenta, Lighthouse 13.6)
Duas situações. **Com o app já instalado** (o perfil tem o estado da Ana e o service worker já guardou os arquivos: é o caso de quem abre o app na academia). **1ª visita** (perfil vazio, nada em cache).

| Rota | Desempenho | Acessibilidade | 1ª pintura (ms) | Maior pintura (ms) | Bloqueio total (ms) | Falhas de acessibilidade |
|---|---:|---:|---:|---:|---:|---|
| `/` (abre em `/programa`) | 69 | 96 | 167 | 167 | 5.064 | `target-size` |
| `/comecar/triagem` | 59 | 100 | 109 | 3.283 | 3.111 | — |
| `/programa` | 69 | 96 | 286 | 286 | 4.409 | `target-size` |
| `/guia/bulgaro` | 70 | 93 | 72 | 72 | 3.076 | `aria-allowed-attr`, `landmark-one-main`, `label-content-name-mismatch` |
| `/semana` | 70 | 100 | 96 | 96 | 3.540 | — |
| `/dados` | 71 | 100 | 23 | 23 | 2.747 | — |
| `/` na 1ª visita | 73 | 100 | 1.444 | 1.444 | 1.387 | — (9 pedidos, 316 kB, 2 deles ao Google Fonts) |

O que isso diz:
- **Desempenho abaixo da meta de 90 em todas as rotas** (critério do pedido do redesign). O peso está no processamento do JavaScript, não na rede: de 1,4 s (1ª visita) a 5,1 s (instalado) de tela travada (bloqueio total) no celular simulado. O app de hoje é um pacote único de 1 MB, que inclui o motor do Boneco e a biblioteca de exercícios em todas as telas.
- **Acessibilidade de 93 a 100.** O critério de 90 é cumprido; a meta de 100 não, em 3 rotas:
  - `target-size` no programa: os botões "Fazer a semana leve" e "Agora não" (`.btn.sec.pequeno`) ficam colados demais (o critério do Lighthouse considera tamanho **e** espaçamento; o nosso teste de toque só mede o tamanho).
  - no guia, os chips de exercício têm `role="tab"` com `aria-pressed` (atributo que uma aba não aceita); a página não tem `<main>`; o botão "Câmera lenta" mostra um texto e tem outro nome acessível.
- O tempo do bloqueio na situação "instalado" é maior que na 1ª visita porque o service worker registra e pré-carrega os arquivos durante a medição; a comparação antes × depois tem de usar sempre o mesmo método.

### Daltonismo
Não medido nas telas do app de hoje nesta etapa: a simulação das 3 deficiências sobre as telas é do agente 5 (`agente-5-cor.md`). No Boneco, ver `docs/revisoes/design.md`, achado 3.

## Depois
(preenchido a cada lote)
