# Pesquisa 01: bibliotecas e código aberto (acabamento e estética)

Data da pesquisa: 12/11/2026. Escrita em linguagem simples. Nada aqui vira regra de treino.

Como ler os pesos: "min+gzip" é o tamanho do JavaScript depois de minificado e comprimido, que é o que o teste de limite do app conta. Há dois tipos de número:

- **Medido aqui**: instalei o pacote numa pasta isolada, empacotei só as peças citadas com esbuild (minificado) e comprimi com gzip -9. React e react-dom ficaram de fora (o app já os tem). Esse é o número mais confiável para decidir.
- **Bundlephobia / npm**: número do pacote inteiro, consultado na API do Bundlephobia (bundlephobia.com/api/size). Serve para comparar, mas superestima quando só se usa uma peça.

O app está com cerca de 170 kB na 1ª tela e o limite é 175 kB: sobram uns 5 kB. Não medi o app em si. Isso significa que qualquer biblioteca com mais de uns 5 kB só entra se for carregada sob demanda (depois da 1ª tela), ou se uma coisa que já existe for trocada por ela.

## 1. Em 10 linhas

1. O navegador de hoje já tem quase tudo que se pensava em comprar: janela modal (`<dialog>`, com foco preso e tecla Esc de graça), aviso/menu (Popover API), animação (CSS e Web Animations API) e transição entre telas (View Transitions, 93% dos aparelhos).
2. **Folha que sobe de baixo**: escrever à mão, com `<dialog>` + cerca de 60 linhas para o arrasto. A Vaul (a biblioteca mais famosa) pesa 22 kB e o autor avisou que **não está mais mantida**. Descartar.
3. **Campo de carga com mais e menos (stepper)**: escrever à mão (dois botões e um campo com teclado numérico). As bibliotecas acessíveis custam de 14 a 26 kB só para isso.
4. **Aviso temporário (toast)**: escrever à mão, é uma região `role="status"` com um temporizador. A Sonner (9,6 kB) é a reserva.
5. **Movimento**: CSS + Web Animations API + View Transitions. Se um dia precisar de mola (efeito "elástico"), o "motion mini" pesa 3,3 kB. O Motion completo (26 a 32 kB) não vale.
6. **Gráfico de carga**: desenhar o SVG à mão (poucos pontos). Recharts (150 kB), Chart.js (70 kB) e Plot (127 kB) são grandes demais.
7. **Ícones**: Lucide (ISC) ou Tabler (MIT), copiando só os ~12 ícones usados como SVG no código (menos de 0,5 kB cada). Não instalar a família inteira. Remix Icon tem licença própria: fora.
8. **Letra**: manter variável e pequena. Medido (latim): Figtree 20 kB, Manrope 25 kB, Public Sans 27 kB, Geist 29 kB, Atkinson Next 34 kB, Inter 48 kB. Todas OFL. Figtree, Geist e Atkinson Next têm números tabulares.
9. **Se for preciso uma biblioteca de peças**, a única que se paga é a Radix Dialog ou a Base UI, carregadas só na tela que usa. React Aria Components (279 kB inteira) e Ark UI (297 kB) são pesadas demais.
10. **Apps abertos de treino** mostram princípios (registrar série com um toque, tudo no aparelho), mas quase todos têm licença AGPL/GPL: servem para aprender, nunca para copiar código.

## 2. Tabelas por assunto

Legenda do tipo de fonte: **Registro** = registro npm (licença e data), **BPh** = Bundlephobia, **Medido** = esbuild aqui, **Doc** = documentação oficial, **Repo** = página do repositório, **Resumo** = só o resumo da busca. Selos: robusta / moderada / um estudo / consenso / opinião.

### 2.1 Peças sem estilo e acessíveis

| Endereço | Tipo de fonte | O que se aproveita | Licença | Peso (min+gzip) e origem | Selo |
|---|---|---|---|---|---|
| https://www.radix-ui.com/primitives/docs/overview/introduction | Doc | Cada peça se instala separada (`@radix-ui/react-dialog`). Sem estilo; segue padrões WAI-ARIA com foco e teclado tratados. | MIT (Registro) | Dialog 14,2 kB; Tabs 9,7; Toggle Group 9,0; Toast 12,7. Medido aqui. Pacote inteiro do Dialog no BPh: 13,2 kB (v1.3.1, 12/10/2026) | moderada |
| https://www.radix-ui.com/primitives/docs/components/dialog | Doc | Foco preso no modal, Esc fecha e devolve o foco ao botão, `Title` e `Description` para leitor de tela. A página não explica animação de saída. | MIT | (ver acima) | moderada |
| https://react-aria.adobe.com/NumberField | Doc | Campo numérico com botões `increment`/`decrement` (slots), `step`, `minValue`/`maxValue` e formatação pelo idioma (`Intl.NumberFormat`). A página não cita toque-e-segura nem teclado numérico. | Apache-2.0 (Registro) | Medido: NumberField via Components 26,2 kB; só o hook `useNumberField` + estado 19,1 kB; Modal 20,0 kB. Pacote inteiro no BPh: 279 kB (v1.22.1, 09/10/2026) | moderada |
| https://base-ui.com/react/overview/quick-start | Doc | Pacote único `@base-ui/react` que se importa por subcaminho (`@base-ui/react/dialog`), sem estilo. Estável na linha 1.9.0 (09/10/2026). A página não cita licença; a licença MIT vem do Registro. | MIT (Registro) | Medido: Dialog 24,1 kB; Number Field 14,2; Tabs 13,9; Toast 26,9. Pacote inteiro (BPh): 166 kB | moderada |
| https://base-ui.com/react/components/number-field | Doc | Botões de mais/menos, `step` pequeno (Alt) e grande (Shift), mín/máx, formatação por idioma e uma "área de arrastar" para mudar o valor. Toque-e-segura: a página não diz. | MIT | (ver acima) | moderada |
| https://base-ui.com/react/components/toast | Doc | Toast que some deslizando, auto-fecha em 5 s (configurável), limite de 3 na tela, região de foco com F6 e prioridade para leitor de tela. | MIT | 26,9 kB medido | moderada |
| https://headlessui.com/ | Doc | Lista de peças: Dialog, Tabs, Radio Group, Switch, etc. **Não tem** campo numérico, toast nem folha de baixo. | MIT (Registro) | Pacote inteiro 63 kB (BPh, v2.2.10, 07/04/2026) | moderada |
| https://www.npmjs.com/package/@ark-ui/react (só dados do Registro e BPh; a página de docs deu 404) | Registro + BPh | Ark UI v5.40.0 (29/10/2026) tem 69 dependências por trás (Zag.js). Não consegui abrir a documentação. | MIT | Pacote inteiro 297 kB (BPh) | moderada |
| https://sonner.emilkowal.ski/ | Doc | `<Toaster />` uma vez na raiz e `toast('texto')` em qualquer lugar. Desliza para dispensar. | MIT (Registro) | 9,6 kB medido (v2.0.8, 09/08/2026) | consenso |

### 2.2 Folha de baixo com gesto

| Endereço | Tipo de fonte | O que se aproveita | Licença | Peso e origem | Selo |
|---|---|---|---|---|---|
| https://github.com/emilkowalski/vaul | Repo | Biblioteca de "drawer" para React (cerca de 8,7 mil estrelas). O dono escreveu: "This repo is unmaintained". Última versão 1.1.2, de 14/12/2024 (Registro). | MIT | 22,4 kB medido (inclui o Radix Dialog por baixo); BPh 18,5 kB | moderada |
| https://dev.to/viliket/native-like-bottom-sheets-on-the-web-the-power-of-modern-css-ld6 | Artigo técnico | Folha feita com `overflow-y: scroll` + `scroll-snap-type: y mandatory`: o próprio rolar do navegador faz o arrasto. Truques: um elemento de 1 px para o Safari "grudar" e um atalho para o ponto inicial. Precisa de JavaScript para teclado virtual e para fechar ao deslizar. Há um bug do iOS Safari (WebKit 183870) com `pointer-events`. | não se aplica (artigo) | sem pacote | consenso |
| https://github.com/viliket/pure-web-bottom-sheet | Repo | Componente que embrulha um `<dialog>` nativo, com pontos de parada definidos por CSS (`--snap`) e atributo `swipe-to-dismiss`. Diz ter "near zero JavaScript". | MIT | não conferido (os selos de tamanho não vieram no texto) | moderada |
| https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/dialog | Doc (MDN) | `showModal()` já dá fundo inerte, foco para dentro, Esc fecha, `::backdrop` e marca `aria-modal`. Disponível amplamente desde março de 2022. `closedby="any"` fecha ao tocar fora. | não se aplica | 0 kB | robusta |
| https://developer.mozilla.org/en-US/docs/Web/API/Popover_API | Doc (MDN) | Atributo `popover` e camada de topo (top layer). Não modal. Baseline 2025 ("newly available"): mais novo, serve para menus e avisos, não para a folha principal. | não se aplica | 0 kB | robusta |
| https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_scroll_snap | Doc (MDN) | `scroll-snap-type`, `scroll-snap-align`, `scroll-snap-stop: always` e eventos `scrollsnapchange`. Base do carrossel e da folha por rolagem. Não li a parte de compatibilidade. | não se aplica | 0 kB | robusta |

### 2.3 Movimento

| Endereço | Tipo de fonte | O que se aproveita | Licença | Peso e origem | Selo |
|---|---|---|---|---|---|
| https://motion.dev/docs/react-reduce-bundle-size | Doc | Componente `motion` de React: 43 kB (valor da página, sem encolher). Com `LazyMotion`: +24 kB (`domAnimation`) ou +38 kB (`domMax`). `useAnimate` mini 3,3 kB e híbrido 23 kB. | MIT (Repo) | Valores da página (não são min+gzip confirmados). Medido aqui: `animate` mini 3,3 kB; `animate` híbrido 26,4 kB; `LazyMotion`+`m` 31,9 kB | moderada |
| https://motion.dev/docs/animate | Doc | `animate()` mini 3,2 kB e híbrido 22 kB. Diz que o mini usa "APIs nativas". Não afirma que seja a Web Animations API. | MIT | idem | moderada |
| https://github.com/motiondivision/motion | Repo | 35 mil estrelas, mantido por patrocínio. Versão 14.13.0 de 12/11/2026 (Registro, ou seja, ativo hoje). | MIT | 64 kB pacote `motion` inteiro (BPh) | moderada |
| https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API | Doc (MDN) | `element.animate(keyframes, opções)` devolve um objeto com `finished` (promessa). Não achei na página dados de compatibilidade. | não se aplica | 0 kB | robusta |
| https://developer.chrome.com/docs/web-platform/view-transitions/same-document | Doc (Chrome) | `document.startViewTransition(() => atualizaTela())` faz a transição entre dois estados. Padrão: fade. Exemplos de duração: 90/210 ms (fade), 300 ms (slide), 150 ms (saída). Para respeitar movimento reduzido: `@media (prefers-reduced-motion)` com `animation: none` nos pseudo-elementos. Chrome 111+. | não se aplica | 0 kB | robusta |
| https://caniuse.com/view-transitions | Tabela de compatibilidade | 93,17% de uso global. Chrome 111+, Safari 18+, Firefox 144+. Sempre usar com teste `if (document.startViewTransition)`. | não se aplica | 0 kB | robusta |
| https://developer.mozilla.org/en-US/docs/Web/CSS/@starting-style | Doc (MDN) | Faz entrada animada de `<dialog>`, popover e elementos que saem de `display:none`, só com CSS (junto com `transition-behavior: allow-discrete`). Baseline 2024. | não se aplica | 0 kB | robusta |
| https://developer.mozilla.org/en-US/docs/Web/API/View_Transition_API | Doc (MDN) | Duas formas: mesma página (SPA) e entre páginas (`@view-transition`). O quadro de compatibilidade não carregou. | não se aplica | 0 kB | robusta |

### 2.4 Gráficos leves

| Endereço | Tipo de fonte | O que se aproveita | Licença | Peso e origem | Selo |
|---|---|---|---|---|---|
| https://github.com/leeoniya/uPlot | Repo | Canvas 2D; o README diz "~50 KB min" e 166 mil pontos em 25 ms (teste do próprio autor, 2023, num notebook). Sem animação, **sem toque embutido**, sem texto de acessibilidade. Última versão 1.6.32 (14/03/2025, Registro). | MIT | 23,0 kB medido aqui; BPh 21,9 kB | moderada |
| https://github.com/airbnb/visx | Repo | Peças soltas de gráfico (visx v4 é estável, exige React 18 ou 19). 21 mil estrelas. Pacote `@visx/shape` v4.0.0 de 11/06/2026. | MIT | `LinePath` + `scaleLinear`: 14,8 kB medido; `d3-shape` só `line`+`curveMonotoneX`: 3,9 kB medido | moderada |
| https://www.npmjs.com/package/recharts (só Registro e BPh) | Registro + BPh | Recharts v3.10.1 (25/07/2026): 150 kB. Grande demais para poucos pontos. | MIT | 149,9 kB (BPh) | moderada |
| https://www.npmjs.com/package/chart.js (só Registro e BPh) | Registro + BPh | Chart.js v4.6.1 (22/10/2026): 69,6 kB, canvas. | MIT | 69,6 kB (BPh) | moderada |
| https://www.npmjs.com/package/@observablehq/plot (só Registro e BPh) | Registro + BPh | Plot 0.6.19 (05/11/2026): feito para análise de dados, 127 kB. | ISC | 126,9 kB (BPh) | moderada |
| https://www.npmjs.com/package/chartist (só Registro e BPh) | Registro + BPh | Chartist 2.2.0 (20/10/2026), SVG, 27 kB. Licença dupla "MIT OR WTFPL" (WTFPL não está na lista permitida, então só serve pela opção MIT). | MIT OR WTFPL | 27,3 kB (BPh) | moderada |
| SVG à mão (sem endereço) | opinião | Um `<polyline>`/`<path>` com 5 a 50 pontos, escala linear em ~15 linhas, pontos como `<circle>` com área de toque ≥ 44 px, `<title>` e tabela alternativa para leitor de tela. | não se aplica | ~0,5 kB (estimativa minha, não medida) | opinião |

### 2.5 Famílias de ícones

O peso "6 ícones" é o que medi: um arquivo com 6 ícones importados da biblioteca (min+gzip, já com o pequeno envoltório de React de cada pacote).

| Endereço | Tipo de fonte | O que se aproveita | Licença | Peso e origem | Selo |
|---|---|---|---|---|---|
| https://github.com/lucide-icons/lucide e https://lucide.dev/guide/packages/lucide-react | Repo + Doc | Cada ícone é um componente; "only the icons you import are included". Traço ajustável por propriedade. O README fala em 1600+ e na lateral em 2000+ arquivos (não bate). Versão 1.72.0 de 11/11/2026. | ISC | 6 ícones: 2,3 kB medido. Pacote inteiro 211 kB (BPh, só importa se não houver tree-shaking) | moderada |
| https://github.com/tabler/tabler-icons | Repo | 6.287 ícones (5.233 de contorno, 1.054 preenchidos), grade 24x24, traço 2 px. SVG avulso em `icons/outline/nome.svg`. Versão 3.51.0 de 08/11/2026. | MIT | 6 ícones: 1,0 kB medido. Inteiro 504 kB (BPh) | moderada |
| https://github.com/tailwindlabs/heroicons | Repo | Estilos: 24 contorno, 24 sólido, 20 sólido, 16 sólido. Contorno com `stroke-width="2"`. Última versão 2.2.0 (18/11/2024), pouco ativa. | MIT | 6 ícones: 0,7 kB medido | moderada |
| https://github.com/phosphor-icons/react | Repo | Seis pesos (thin, light, regular, bold, fill, duotone): útil para trocar "contorno" por "cheio" em aba ativa. Import por nome é tree-shaken. Última versão 2.1.10 (22/05/2025). | MIT | 6 ícones: 2,9 kB medido. Inteiro 1.065 kB (BPh) | moderada |
| https://github.com/iconoir-icons/iconoir | Repo | 1.383 ícones (288 com variante cheia), pacote `iconoir-react`. Versão 7.12.2 (04/11/2026). | MIT | 6 ícones: 1,2 kB medido | moderada |
| https://github.com/google/material-design-icons | Repo | Material Symbols com eixos variáveis: peso 100-700, preenchimento 0-100, grade -50 a 200, tamanho óptico 20-48. A página não ensina baixar SVG avulso (aponta um pacote de terceiro, `@material-design-icons/svg`, que o Google não revisa). | Apache-2.0 | não medido | moderada |
| https://github.com/Remix-Design/RemixIcon | Repo | 3.200+ ícones, contorno e cheio. **Licença própria "Remix Icon License v1.0"** (atualizada em janeiro de 2026), fora da lista MIT/Apache/ISC/BSD. | Remix Icon License 1.0 | 501 kB inteiro (BPh) | moderada |

### 2.6 Letras (SIL OFL)

Medidos aqui: baixei o arquivo woff2 variável (eixo de peso) do **pacote Fontsource, já recortado para latim**, via jsDelivr, e li as tabelas com a biblioteca Python fontTools. "Tab." = tem o recurso `tnum` (números tabulares) nesse arquivo recortado. Atenção: o recorte do Fontsource pode ter retirado recursos; para as três que marquei "não" vale conferir no arquivo original antes de descartar. Todas OFL-1.1 pelo Registro (versão 5.3.0, 19/07/2026; Onest 5.3.1, 30/08/2026). As versões estáticas são arquivos separados por peso (cerca de 11 a 25 kB cada).

| Endereço (pacote) | Tipo de fonte | O que se aproveita | Licença | Peso do woff2 latim | Selo |
|---|---|---|---|---|---|
| https://cdn.jsdelivr.net/npm/@fontsource-variable/figtree/files/figtree-latin-wght-normal.woff2 | Medido | Peso 300-900, Tab. sim. O arquivo mais leve da lista. Estáticas 11,4 kB por peso. | OFL-1.1 | 20,2 kB | moderada |
| .../@fontsource-variable/manrope/files/manrope-latin-wght-normal.woff2 | Medido | Peso 200-800, Tab. sim. | OFL-1.1 | 24,8 kB | moderada |
| .../@fontsource-variable/public-sans/files/public-sans-latin-wght-normal.woff2 | Medido | Peso 100-900, Tab. sim. | OFL-1.1 | 26,8 kB | moderada |
| .../@fontsource-variable/geist/files/geist-latin-wght-normal.woff2 + https://github.com/vercel/geist-font | Medido + Repo | Peso 100-900, Tab. sim. A página do repositório confirma OFL-1.1 e não fala de números nem de idiomas. | OFL-1.1 | 29,4 kB | moderada |
| .../@fontsource-variable/instrument-sans/files/instrument-sans-latin-wght-normal.woff2 | Medido | Peso 400-700 apenas, Tab. sim. Só o recorte "standard" (57 kB) existe como alternativa. | OFL-1.1 | 30,1 kB | moderada |
| .../@fontsource-variable/atkinson-hyperlegible-next/files/atkinson-hyperlegible-next-latin-wght-normal.woff2 | Medido | A atual do app. Peso 200-800, Tab. sim. Estáticas 12,1 kB por peso. | OFL-1.1 | 34,0 kB | moderada |
| .../@fontsource-variable/hanken-grotesk/files/hanken-grotesk-latin-wght-normal.woff2 | Medido | Peso 100-900. Tab.: não nesse recorte. | OFL-1.1 | 34,7 kB | moderada |
| .../@fontsource-variable/ibm-plex-sans/files/ibm-plex-sans-latin-wght-normal.woff2 | Medido | Peso 100-700. Tab.: não nesse recorte. | OFL-1.1 | 45,7 kB | moderada |
| .../@fontsource-variable/schibsted-grotesk/files/schibsted-grotesk-latin-wght-normal.woff2 | Medido | Peso 400-900, Tab. sim. | OFL-1.1 | 46,8 kB | moderada |
| https://github.com/rsms/inter + .../@fontsource-variable/inter/files/inter-latin-wght-normal.woff2 | Repo + Medido | Variável, números tabulares e zero cortado listados na página; desenhada para tela. O arquivo recortado tem `tnum` mas não achei `zero`. Nome reservado "Inter" (não pode vender derivados). | OFL-1.1 | 48,3 kB | moderada |
| .../@fontsource-variable/dm-sans, plus-jakarta-sans, onest, outfit | Medido | DM Sans 36,9 kB (sem tab. no recorte); Plus Jakarta Sans 27,3 kB (tab. sim); Onest 33,8 kB (tab. sim); Outfit 32,3 kB (tab. sim). | OFL-1.1 | veja a coluna | moderada |
| https://www.brailleinstitute.org/freefont/ | Tentativa de abrir | A página veio vazia para a ferramenta. Nada de descrição oficial conferida aqui (veja a seção 5). | não conferido | não se aplica | não conferido |

### 2.7 Apps abertos de treino e PWAs

O que importa aqui é o princípio. Todos os apps de treino abaixo têm licença copyleft (AGPL/GPL): **não copiar código nem tela**.

| Endereço | Tipo de fonte | O que se aproveita (princípio) | Licença | Peso | Selo |
|---|---|---|---|---|---|
| https://github.com/LiamMorrow/LiftLog | Repo | App de celular (React Native/Expo) que guarda os treinos só no aparelho, sem cadastro; usa Material 3. Princípio: registrar progresso "sem atrapalhar". A página não cita rastreador nem timer; uma avaliação de terceiros (só o resumo da busca) menciona Sentry sem opção de desligar. | AGPL-3.0 | não se aplica | consenso |
| https://github.com/Snouzy/workout-cool | Repo | Web (Next.js) com shadcn/ui + Radix UI + Tailwind, 8,7 mil estrelas. Princípio: peças Radix por baixo de um visual próprio. Nota: pacotes grandes, não é lição de leveza. | MIT | não se aplica | consenso |
| https://github.com/wger-project/wger | Repo | Django, 9.835 commits, apps Android/iOS (provavelmente Flutter, a página não confirma). Princípio: dados de exercícios com licença Creative Commons por entrada. Mostra a organização de uma biblioteca grande. | AGPL-3.0-or-later (dados em CC) | não se aplica | consenso |
| https://f-droid.org/en/packages/com.noahjutz.gymroutines/ | Página de loja | GymRoutines: tudo local, sem internet, exporta dados mesmo durante o treino (v0.1.1, 22/04/2025). Princípio: nunca depender de rede no meio do treino. | GPL-3.0-or-later | não se aplica | consenso |
| https://github.com/johannesjo/super-productivity | Repo | PWA/Electron "privado, offline-first, código aberto", 23,6 mil estrelas. A página não confirma o status de PWA. Princípio: app local que funciona sem conta. | MIT | não se aplica | consenso |
| https://github.com/torrencio/LiftLog e outros "Massive/LibreFit/iTrack" | Só o resumo da busca | Vários apps de nome parecido. O "Massive" aparece como arquivado (GPL-3.0), e o LibreFit (GPL-3.0) e o iTrack (MIT) como ativos. Não abri essas páginas. | veja o resumo | não se aplica | só o resumo da busca |

### 2.8 Listas "awesome"

| Endereço | Tipo de fonte | O que se aproveita | Licença | Selo |
|---|---|---|---|---|
| https://github.com/myshov/awesome-mobile-web-development | Lista | Seções "Touch", "Gestures", "Performance", "UI libraries". Referências úteis: atraso de toque de 300 ms, acessibilidade em toque, performance para celulares fracos. Boa parte do conteúdo é antigo (Swiper, Slideout, Interact.js). | não conferida | consenso |
| https://github.com/hemanth/awesome-pwa | Lista | Seções: checklist de PWA, apps por categoria (inclui "Health and Lifestyle"), casos de estudo, ferramentas. Exemplos abertos: Super Productivity, OpenHabitTracker, Recipe Jar (app local de receitas). Mais útil para ver PWAs reais do que para estética. | não conferida | consenso |

## 3. Recomendação para este app

Resumo de peso: todas as indicações abaixo "à mão" somam por volta de 3 a 5 kB (estimativa minha). O problema real é o limite de 175 kB: não dá para colocar nenhuma biblioteca de 10 kB ou mais na 1ª tela sem tirar outra coisa.

| Necessidade | Indicação | Motivo e peso |
|---|---|---|
| Folha de baixo (bottom sheet) | **Usar o que o navegador já tem + escrever à mão** | `<dialog>` com `showModal()` dá foco, Esc e fundo inerte (MDN, disponível amplamente desde 2022). Soma-se `@starting-style` para entrar e ~60 linhas de ponteiro (`pointerdown/move/up` + `transform: translateY`) para arrastar e fechar. Peso estimado 1 kB (não medido). Plano B: o artigo do scroll-snap acima. Vaul: 22 kB e sem manutenção. |
| Diálogo | **Usar o que o navegador já tem** (`<dialog>`) | 0 kB. Reserva: Radix Dialog (14,2 kB medido), carregado só na tela que usa. |
| Stepper de carga e repetições | **Escrever à mão** | Dois botões de 44 px + `<input inputmode="decimal">`, toque-e-segura com `setInterval` (~25 linhas) e `Intl.NumberFormat('pt-BR')` para vírgula. Custo ~1 kB estimado. Alternativas medidas: Base UI Number Field 14,2 kB, React Aria 19 a 26 kB. Só vale se aparecer problema real de acessibilidade ou de formatação. |
| Aviso temporário (toast) | **Escrever à mão** | Um `<div role="status" aria-live="polite">` com texto e um temporizador (~30 linhas). Reserva: Sonner 9,6 kB, carregada sob demanda. Base UI Toast e Radix Toast (26,9 e 12,7 kB) são maiores. |
| Movimento | **Usar o que o navegador já tem** | CSS (`transition`, `@starting-style`) + `element.animate()` para pequenos movimentos e `document.startViewTransition` para troca de tela, sempre com `if (document.startViewTransition)` e `prefers-reduced-motion`. 0 kB. Só se um dia precisar de mola ou sequências: Motion mini, 3,3 kB. Não usar o componente `motion` completo (26 a 32 kB medido). Antes de adotar View Transitions com o roteador atual, conferir se o `react-router-dom` 6.30 tem o recurso: **não conferido**. |
| Gráfico de evolução de carga | **Escrever à mão** (SVG) | Poucos pontos: `<path>` + escala linear, ~0,5 kB estimado. Se quiser curva suave, `d3-shape` só com `line` e `curveMonotoneX`: 3,9 kB medido. uPlot (23 kB) não traz toque nem animação. |
| Ícones | **Escrever à mão** a partir de uma família livre | Copiar para o código, como SVG inline ou sprite, só os ~12 ícones usados, de Lucide (ISC) ou Tabler (MIT), guardando o aviso de licença num arquivo. Cada ícone ficou em torno de 0,2 a 0,4 kB (6 ícones: Tabler 1,0 kB, Lucide 2,3 kB, medido com o envoltório React). Escolha entre as duas é de gosto (opinião). Heroicons é pouco ativo desde 2024. |
| Letra | **Usar a letra em arquivo local, variável, recortada** | Para carga e relógio, é preciso `font-variant-numeric: tabular-nums`. Medidas (latim): Figtree 20 kB, Geist 29 kB, Atkinson Next 34 kB (a atual). Opinião: se leitura para baixa visão importa mais que o tamanho, mantenha a Atkinson Next; para ganhar 14 kB e um visual mais "produto", Geist ou Figtree. Decida por teste visual dos números em tamanho grande, não por esta tabela. |

## 4. O que não usar e por quê

- **Vaul**: o próprio autor declara "unmaintained"; última versão em dezembro de 2024; 22 kB.
- **React Aria Components inteiro / Ark UI / Recharts / Chart.js / Observable Plot**: 150 a 300 kB como pacote (BPh); mesmo com tree-shaking, uma peça sozinha passa de 14 kB.
- **Motion completo (`motion` ou `LazyMotion`)**: 26 a 32 kB medidos para algo que CSS e Web Animations fazem.
- **Remix Icon**: licença própria, fora da lista permitida.
- **Chartist**: licença dupla "MIT OR WTFPL"; só serve usando a opção MIT. Sem ganho sobre desenhar à mão.
- **Phosphor** (importa-se bem, mas o pacote inteiro tem 1 MB no BPh e depende de tree-shaking; última versão 05/2025): evitar, a não ser que o peso "cheio/contorno" seja decisivo.
- **Copiar código ou telas de LiftLog, wger, GymRoutines**: AGPL/GPL.
- **Material Symbols via fonte** (arquivo de fonte inteiro) : fora da regra de "só os ícones usados"; usar SVG avulso.

## 5. O que não consegui abrir ou conferir

- **GitHub API** (api.github.com) deu 403 e o `gh` não tinha acesso aos repositórios. Licença e data de versão vieram do registro npm. As datas de "última versão" são as de publicação no npm (consultei em 12/11/2026); não verifiquei se há commits mais recentes no GitHub.
- **Documentação do Ark UI** (ark-ui.com) deu 404 e o **zag.js.org** só devolveu um redirecionamento. O Ark entrou só por dados do registro e do BPh.
- **Brailleinstitute.org/freefont**: a página voltou vazia. Não confirmei por esse endereço a licença OFL da Atkinson Hyperlegible Next. Pelo registro, o pacote Fontsource da Atkinson Next está como OFL-1.1.
- **Compatibilidade** na MDN (Web Animations, View Transitions, scroll-snap): as tabelas não vieram. Baseline só vem confirmado para `<dialog>` (amplamente disponível desde março de 2022), Popover (2025) e `@starting-style` (2024). View Transitions: 93,17% de uso global pelo caniuse.
- **Número de ícones do Heroicons**: a página não informa. **Lucide**: README e lateral discordam (1600+ e 2000+).
- **Peso do pure-web-bottom-sheet**: não conferido.
- **Os "números tabulares" nas letras sem `tnum` (DM Sans, Hanken Grotesk, IBM Plex Sans)**: só vi o arquivo recortado do Fontsource; a fonte original pode ter o recurso.
- **react-router-dom 6.30 com View Transitions**: não conferido.
- **Peso estimado "à mão"** (0,5 a 1 kB): são estimativas minhas, não medidas.
- **Massive, LibreFit, iTrack** e **awesome-design-systems**: só o resumo da busca ou nem abertos.
- Pesos medidos dependem do esbuild e da minha versão de cada pacote instalada em 12/11/2026; o bundler do app (Vite/Rollup) pode dar números levemente diferentes.
