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

### Lote 1, base visual e testes (06/11/2026)
Mesmos scripts e mesmo método do "antes" (`FASE=lote-1`): `docs/revisoes/redesign/lote-1/` (`base.json`, `medidas-{claro,escuro,pequeno}.json`, `primeira-visita.json`). Imagens: `docs/img/redesign-lote-1-*.png`.

**Telas, toque e contraste** (102 telas e estados por projeto, as 6 personas)

| Medida | Antes | Lote 1 |
|---|---:|---:|
| Telas com toque abaixo de 44 px (claro / escuro / 360) | 0 / 0 / 0 | 0 / 0 / 0 |
| Telas com contraste abaixo da WCAG 1.4.3 | 0 / 0 / 0 | 0 / 0 / 0 |
| Telas que rolam de lado | 0 / 0 / 0 | 0 / 0 / 0 |
| "Começar o treino" no programa recém-gerado, a 360 px | 177% (fora) | 78% (à vista) |

O selo virou botão (abre a folha da regra); a pílula continua pequena e a área de toque cresce por fora dela até 44 px. Os dois medidores (`tests/e2e/toque.ts` e `scripts/design/medir.ts`) passaram a medir essa área ampliada: sem isso, a 1ª medição acusava 829 toques pequenos, todos selos.

A medida do botão principal acusa "Série feita" um pouco mais abaixo no descanso e na 2ª série (92% → 95% em 4 telas a 412 px). É a medida que conta do topo de uma página já rolada (ver acima); na captura, o botão do lote 1 aparece inteiro acima do painel do descanso, e o de antes ficava pela metade atrás dele. O e2e "Série feita visível sem rolar" passa a 412 e a 360.

**Os 4 critérios em 7 cenários** (`tests/e2e/cenarios.spec.ts`: claro, escuro, 360 × 740, 412 × 640, 320 × 640, zoom de 200% (206 × 420) e letra a 125%; 6 grupos de telas, 42 combinações)

| | Lote 1 |
|---|---:|
| Combinações em que toque, contraste, texto cortado e foco coberto passam | 29 de 42 |
| Pendentes, com o lote que reconstrói a tela | 13: treino (7, lote 2), guia (3, lote 2), fim pelo treino a 206 px (lote 2), início a 320 px (lote 4), equipamento com letra a 125% (lote 3) |

O que o lote 1 corrigiu para chegar lá: a folga de rolagem do tamanho do cabeçalho e das barras de baixo (antes, o foco do teclado ficava atrás da barra de baixo e do "Começar" fixo); o selo, a faixa "Ver opções" e a opção de estilo do boneco quebram a linha em tela estreita. Um defeito real ficou à vista: **com zoom de 200%, a tela do treino não deixa tocar "Série feita"** (lote 2).

**Bundle e letra**

| | Antes | Lote 1 |
|---|---:|---:|
| JavaScript da 1ª tela (KiB / gzip) | 1.060,1 / 269,4 | 1.065,0 / 271,5 |
| As fontes por extenso (só quando a pessoa abre um selo) | — | 48,9 / 16,3 |
| CSS (KiB / gzip) | 42,9 / 8,5 | 48,2 / 9,4 |
| Pedidos externos na 1ª visita | 3 (Google Fonts) | **0** |
| Letra | 18,6 + 33,2 kB (Google) | 33,2 kB (do app, guardada pelo service worker) |

**Lighthouse, 1ª visita** (perfil vazio; 3 rodadas de cada, na mesma sessão, com o "antes" construído de novo a partir de `420938e`)

| | Antes | Lote 1 |
|---|---:|---:|
| Desempenho | 74 · 74 · 72 | 49 · 71 · 71 |
| 1ª pintura (ms) | 1.493 · 1.528 · 1.485 | **903 · 905 · 968** |
| Bloqueio total (ms) | 1.319 · 1.326 · 1.580 | 3.119 · 2.799 · 3.066 |
| Pronto para uso (ms) | 4.680 · 4.697 · 4.939 | 5.704 a 6.022 |
| Trabalho do processador (ms) | 3.392 a 3.974 | 3.342 a 3.871 |

A 1ª pintura ficou 40% mais cedo (sem a folha de estilo do Google, que travava a pintura). O bloqueio total e o "pronto para uso" pioraram na simulação, com o mesmo trabalho do processador. Não achei a causa: não é o pré-carregamento da letra (sem ele, os números ficam iguais: 2.742 a 3.068 ms de bloqueio). Uma hipótese é a conta do simulador: com a 1ª pintura mais cedo, mais do processamento do JavaScript cai depois dela e conta como bloqueio. O lote técnico (dividir o pacote de 1 MB) ataca exatamente este número e vai medir de novo pelo mesmo método.

**Lighthouse, com o app instalado** (o método do "antes", por rota): desempenho de 63 a 71 (antes: 59 a 71); acessibilidade 100 em 5 rotas e 93 no guia (as 3 falhas de antes, que são do lote 2). A falha `target-size` do programa sumiu. Nesta situação a maior pintura variou de 17 ms a 3,4 s entre rotas parecidas: é ruído do método, que fica registrado.


### Lote técnico, desempenho (06/11/2026)
Mesmo método do lote 1: `docs/revisoes/redesign/lote-tecnico/`, com `base.json` e `primeira-visita.json`. O perfil do processador sai de `scripts/design/redesign/perfil.mjs`.

**O que mudou:**
- cada tela virou um pedaço próprio do JavaScript;
- o cartão de texto de cada exercício é baixado só quando aparece;
- o motor do Boneco não muda, mas as miniaturas e as prévias de estilo passaram a ser calculadas num Worker, fora da linha principal.

Nada mudou na tela: as capturas da Ana (programa, 1ª série e Meus dados) ficaram iguais às de antes, pixel por pixel.

**O que pesava de verdade.** O perfil do processador com o celular 4× mais lento mostrou que, no programa, quase todo o tempo ia para o motor desenhando as miniaturas, e não para o tamanho do pacote. Depois do Worker, a linha principal gasta cerca de 0,1 s ao abrir o programa.

| JavaScript da 1ª tela, comprimido (`tests/e2e/orcamento.spec.ts`) | Antes | Lote técnico |
|---|---:|---:|
| Boas-vindas (pessoa nova) | 271,5 kB, o app inteiro | **147,0 kB** (meta: menos de 150) |
| Programa (quem volta, com o motor das miniaturas) | 271,5 kB | 189,1 kB (limite do teste: 200) |
| O motor do Boneco | dentro do pacote | num pedaço só dele, mais o Worker, carregados quando a 1ª miniatura aparece |

Do pacote inicial, o que sobra é o que o app precisa para abrir: React, zod (valida o estado guardado), o domínio com as regras e o gerador, e as telas de boas-vindas e do programa.

**Lighthouse, 1ª visita** (perfil vazio, 3 rodadas de cada):

| | Antes (`420938e`) | Lote 1 | Lote técnico |
|---|---:|---:|---:|
| Desempenho | 74 · 74 · 72 | 49 · 71 · 71 | **100 · 100 · 100** |
| 1ª pintura (ms) | cerca de 1.500 | cerca de 900 | 902 a 959 |
| Bloqueio total (ms) | 1.319 a 1.580 | 2.799 a 3.119 | **17 a 39** |
| Pronto para uso (ms) | 4.680 a 4.939 | 5.704 a 6.022 | 2.185 a 2.243 |
| Trabalho do processador (ms) | 3.392 a 3.974 | 3.342 a 3.871 | 523 a 659 |

**Lighthouse, com o app instalado, por rota:**

| Rota | Desempenho (lote 1 → lote técnico) | Bloqueio total (ms) |
|---|---|---:|
| `/` (abre o programa) | 70 → 98 | 150 |
| `/comecar/triagem` | 71 → 100 | 25 |
| `/programa` | 64 → 93 | 309 |
| `/semana` | 63 → 100 | 39 |
| `/dados` | 64 → 100 | 25 |
| `/guia/bulgaro` | 70 → **71** | 3.229 |

A acessibilidade fica em 100 em 5 rotas e em 93 no guia, com as mesmas 3 falhas de antes.

**O que não melhorou:** o guia. Ele anima o Boneco quadro a quadro na própria tela, e esse cálculo não vai para o Worker sem mudar a forma de desenhar. Fica para o lote 2 (treino e guia), que já reconstrói essa tela, junto com as 3 falhas de acessibilidade.

**Sem rede:** `tests/e2e/sem-rede.spec.ts` abre o app uma vez, corta a rede e confere que o programa (com as miniaturas), o treino, o guia (com o palco) e a semana abrem, pelo que o service worker guardou.
