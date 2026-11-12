# Pesquisa 05: PWA com cara de app nativo

Data da pesquisa: 12/11/2026. Todas as páginas abaixo foram abertas de fato e carregaram. Quando a ferramenta de leitura não mostrou a tabela de suporte de uma página, isso está dito ("não conferido") e o suporte vem de outra fonte, sempre com a versão.

Selos: **robusta** (norma ou documentação oficial do navegador), **moderada**, **um estudo**, **consenso** (prática corrente, sem estudo), **opinião** (de um autor só; dito de quem).

Aviso sobre versões: as páginas do caniuse e do firt.dev que abri mostram versões até iOS/Safari 27.x e Chrome 157-163. Copiei os números como a página mostrou, na data de hoje. Se algum parecer estranho, confira de novo no aparelho antes de decidir.

---

## 1. Em 10 linhas

1. Para o app não parecer "site", o que mais pesa é o básico: ocupar a tela toda, não deixar nada colar no entalhe nem na barra de gestos, e não "puxar" a página como se fosse uma folha da web.
2. Use `viewport-fit=cover` e dê folga com `env(safe-area-inset-*)`. O app já faz isso na barra de baixo, mas só nela.
3. Troque `100vh` por `100dvh` (ou `svh` para o que precisa caber sempre). O app já usa `100dvh` em um lugar.
4. Falta travar o "puxar para recarregar" e o efeito elástico com `overscroll-behavior`, e falta travar a rolagem do fundo quando a folha está aberta. No iPhone instalado, só o `overflow: hidden` no fundo não basta (bug aberto no WebKit desde 2023).
5. Falta tirar o realce azul do toque, o atraso do toque duplo (`touch-action: manipulation`) e a seleção de texto nos botões. Nada disso está no CSS hoje. Troque o realce por um estado "pressionado" visível.
6. Letra de 16 px ou mais nos campos evita o zoom do iPhone. Os campos de carga do app já passam disso (20 px). O teclado decimal (`inputmode="decimal"`) já está certo.
7. No iPhone **não existe vibração** na web e **não há convite automático para instalar**; só se instala pelo menu Compartilhar. Dá para tela acesa (Wake Lock) e para som, mas o som precisa de um toque antes.
8. Com o app em segundo plano ou a tela bloqueada, um aviso de "descanso acabou" só chega por notificação push de um servidor, e só no app instalado. Um app 100% offline e sem servidor não consegue prometer isso no iPhone.
9. A animação entre telas (View Transitions) hoje funciona no Chrome 111+, Safari 18+ e Firefox 144+. Use como enfeite opcional, nunca como obrigação, e desligue com "reduzir movimento".
10. O que denuncia o "site": tela que pula quando o teclado abre, barra de baixo colada na borda, texto que se seleciona sem querer, atraso ao tocar e letra que pisca. Tudo isso tem conserto simples.

---

## 2. Tabelas por assunto

### 2.1 Áreas seguras e o entalhe

| Endereço | Tipo de fonte | A regra, com o valor exato | Suporte | Selo |
|---|---|---|---|---|
| https://webkit.org/blog/7929/designing-websites-for-iphone-x/ | Blog de navegador (WebKit) | Por padrão (`viewport-fit=auto`) o Safari afasta o conteúdo da área segura e pinta o vão com o `background-color` da página. Com `<meta name="viewport" content="initial-scale=1, viewport-fit=cover">` a página ocupa a tela toda, e aí você mesmo dá folga com `env(safe-area-inset-top/right/bottom/left)`. Para não colar na borda em paisagem, use `max(12px, env(safe-area-inset-left))`. `constant()` foi trocado por `env()` no iOS 11.2. | iOS 11 (2017); `env()` desde iOS 11.2 | robusta |
| https://developer.mozilla.org/en-US/docs/Web/CSS/env | Documentação (MDN) | `env(safe-area-inset-bottom)` vale 0 onde não há nada ocupando a borda. Exemplo oficial de barra fixa: `position: sticky; bottom: 0; padding: 1em 1em calc(1em + env(safe-area-inset-bottom));`. Segundo argumento é o valor de reserva: `env(safe-area-inset-top, 0px)`. Nomes diferenciam maiúscula. Existem também `safe-area-max-inset-*` (o maior valor com a interface retraída). | MDN: Baseline "amplamente disponível", desde janeiro de 2020 | robusta |
| https://developer.apple.com/library/archive/documentation/AppleApplications/Reference/SafariHTMLRef/Articles/MetaTags.html | Documentação (Apple, arquivo de 2014) | Com `apple-mobile-web-app-status-bar-style` igual a `black-translucent`, o conteúdo ocupa a tela inteira e a barra de status fica por cima; aí o topo precisa de `env(safe-area-inset-top)`. Com `default` ou `black`, o conteúdo começa abaixo da barra. | iOS, só em app instalado | robusta (documento antigo; ver 2.5 para o que mudou) |

### 2.2 Altura da tela e teclado

| Endereço | Tipo de fonte | A regra, com o valor exato | Suporte | Selo |
|---|---|---|---|---|
| https://web.dev/blog/viewport-units | Artigo oficial (web.dev) | `100vh` pode passar da área visível quando a barra de endereço está aberta. `svh` = tela com a barra aberta (sempre cabe); `lvh` = com a barra recolhida; `dvh` = acompanha. O `dvh` não segue a barra suavemente (os navegadores limitam a frequência). Teclado e barras de rolagem não mudam essas unidades. | Firefox 101, Safari 15.4, Chrome 108, Edge 108 (versões da página; sem datas) | robusta |
| https://developer.chrome.com/blog/viewport-resize-behavior | Blog de navegador (Chrome) | `<meta name="viewport" content="..., interactive-widget=resizes-visual">` (padrão no Chrome Android 108+) muda só a viewport visual quando o teclado abre; `resizes-content` redimensiona também o layout; `overlays-content` não redimensiona nada. O Safari do iPhone já só muda a viewport visual. `interactive-widget` não vale no Chrome do iOS (usa WebKit). | Chrome Android 108 (beta desde 27/10/2022) | robusta |
| https://developer.mozilla.org/en-US/docs/Web/API/VisualViewport | Documentação (MDN) | O teclado encolhe a viewport **visual** sem mexer na de layout. Para manter uma barra fixa embaixo logo acima do teclado: ouvir `visualViewport.resize` e `scroll`, calcular `visualBottom = offsetTop + height` e mover a barra com `transform`. Aviso da MDN: essa emulação "pode piscar durante a rolagem". | Não conferido (tabela não carregou) | robusta |
| https://developer.mozilla.org/en-US/docs/Web/API/VirtualKeyboard_API | Documentação (MDN) | `navigator.virtualKeyboard.overlaysContent = true` + `env(keyboard-inset-height, 0px)`. Sempre com detecção (`"virtualKeyboard" in navigator`). | MDN: "disponibilidade limitada", experimental. Que navegadores suportam: **não conferido** nesta fonte (só Chromium no Android, pelo que se sabe; não confirmado) | robusta (documentação), suporte não conferido |
| https://dev.to/cederhook/fixing-the-ios-standalone-pwa-keyboard-bug-that-shrinks-your-viewport-for-good-63d | Relato de desenvolvedor | No iPhone, em app instalado, a primeira vez que o teclado abre a altura encolhe e não volta (`innerHeight`, `visualViewport.height` e `100dvh` ficam menores; exemplo 932 → 873), deixando a barra fixa de baixo ~59 px alta demais. Conserto do autor: ao sair do campo, esperar ~140 ms; se a altura estiver mais de 4 px abaixo do máximo visto, esconder (`display:none`) um elemento de altura total, forçar o reflow (`offsetHeight`) e mostrar de novo. O ano da postagem não aparece. | Testado pelo autor no iOS 17 e 18 | opinião (um autor) |

### 2.3 Rolagem e gestos

| Endereço | Tipo de fonte | A regra, com o valor exato | Suporte | Selo |
|---|---|---|---|---|
| https://developer.mozilla.org/en-US/docs/Web/CSS/overscroll-behavior | Documentação (MDN) | `overscroll-behavior: contain` em uma folha com `overflow:auto` impede a rolagem de "vazar" para a página de trás. `none` também tira o efeito elástico e o puxar-para-recarregar. Num contêiner sem rolagem (`overflow:hidden`) vale o mesmo. Só vale em contêiner que rola; não vale em `<iframe>`. | MDN marca "disponibilidade limitada"; versões **não conferidas** na página | robusta |
| https://bugs.webkit.org/show_bug.cgi?id=259568 | Registro de erro (WebKit) | `overflow: hidden` no `body` **não** trava a rolagem do fundo em PWA instalado no iPhone/iPad. Estado: NEW (aberto), aberto em 27/07/2023 com Safari 16, última alteração 03/11/2023, sem responsável. | Visto em iOS 16; sem correção registrada até a última alteração | robusta (registro oficial) |
| https://developer.mozilla.org/en-US/docs/Web/CSS/touch-action | Documentação (MDN) | `touch-action: manipulation` = permite arrastar e pinçar, desliga o toque duplo para dar zoom (e, com isso, o atraso do clique). `touch-action: pan-y` restringe a um eixo. | `touch-action` inteiro: Baseline amplamente disponível desde setembro de 2019; o valor `manipulation` isoladamente não foi conferido | robusta |
| (só o resumo da busca) busca: "iOS PWA body scroll lock position fixed overscroll-behavior" | Resultados de busca (blogs, GitHub) | Conserto mais citado: travar o fundo com `position: fixed` no `body`, guardando e devolvendo a posição de rolagem; `overscroll-behavior` sozinho não impede a rolagem quando o dedo está no fundo, só impede o "vazar". Relatos também de `position: fixed` quebrando depois de um tempo em PWA no iOS 17 (fórum da Apple). Nada disso li em página aberta. | Não conferido | opinião (vários autores, só o resumo da busca) |

### 2.4 Toque

| Endereço | Tipo de fonte | A regra, com o valor exato | Suporte | Selo |
|---|---|---|---|---|
| https://webkit.org/blog/5610/more-responsive-tapping-on-ios/ | Blog de navegador (WebKit) | O atraso de ~350 ms no toque some se a viewport não é escalável (`user-scalable=no`), ou com `width=device-width` (enquanto a página está na escala inicial), ou com `touch-action: manipulation` no elemento (vale também para os filhos, em qualquer zoom). | iOS 9.3 (o post em si não cita a versão; ela vem da página do Chrome abaixo: março de 2016) | robusta |
| https://developer.chrome.com/blog/300ms-tap-delay-gone-away | Blog de navegador (Chrome) | Atraso de 300-350 ms removido a partir do Chrome 32 (2014), para sites com `<meta name="viewport" content="width=device-width">`. `touch-action: manipulation` faz o mesmo se não puder mudar a meta. Firefox e Edge seguiram; no iOS, iOS 9.3 (março de 2016). | Chrome 32; iOS 9.3 | robusta |
| https://developer.mozilla.org/en-US/docs/Web/CSS/-webkit-tap-highlight-color | Documentação (MDN) | `-webkit-tap-highlight-color: transparent` tira o realce do toque. É não padrão. Se tirar, ponha outro retorno visível (estado pressionado), senão a pessoa não sabe se tocou. | Não padrão; tabela de suporte não conferida | robusta (sobre ser não padrão); a regra de dar retorno visível é consenso |
| https://developer.mozilla.org/en-US/docs/Web/CSS/user-select | Documentação (MDN) | `-webkit-user-select: none; user-select: none;` (o prefixo é para o Safari) em botões e controles, **não** em texto que a pessoa pode querer copiar. | "Disponibilidade limitada" na MDN; prefixo exigido pelo Safari segundo o exemplo da página | robusta |
| https://developer.mozilla.org/en-US/docs/Web/CSS/-webkit-touch-callout | Documentação (MDN) | `-webkit-touch-callout: none` desliga o menu que o iOS abre ao segurar um link ou imagem. Não padrão. | Só WebKit; tabela não conferida | robusta |
| https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Global_attributes/inputmode | Documentação (MDN) | `inputmode="decimal"`: teclado com dígitos e o separador decimal **do idioma da pessoa** (vírgula em pt-BR, ponto em outros). `numeric`: só 0-9. É só uma dica; não valida nada. Pode ou não ter tecla de menos. | Baseline amplamente disponível desde dezembro de 2021 | robusta |
| (só o resumo da busca) busca: "iOS Safari zooms in on input focus font-size less than 16px" | Resultados de busca (blogs) | O Safari do iPhone dá zoom ao focar campo com letra computada **menor que 16 px** e não volta sozinho. Conserto: letra de 16 px ou mais no campo. Não "consertar" desligando o zoom da página (ruim para acessibilidade). | Não conferido em página oficial; a Apple (página de ajuste de texto) não trata disso | consenso |
| https://developer.apple.com/library/archive/documentation/AppleApplications/Reference/SafariHTMLRef/Articles/MetaTags.html | Documentação (Apple) | `user-scalable=no` também faz o Safari parar de rolar a tela ao digitar. Não recomendado por acessibilidade. | iOS | robusta |

Sobre o `:active` no iPhone: **não consegui uma fonte aberta** que confirme, com versão, que o `:active` funciona no Safari do iOS sem um `ontouchstart` vazio. Está em "não consegui abrir ou conferir".

### 2.5 Aparência de app instalado

| Endereço | Tipo de fonte | A regra, com o valor exato | Suporte | Selo |
|---|---|---|---|---|
| https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Manifest/Reference/display | Documentação (MDN) | `"display": "standalone"`. Se o navegador não suporta o modo, cai em: `fullscreen` → `standalone` → `minimal-ui` → `browser`. Para estilizar só no instalado: `@media (display-mode: standalone)`. | "Disponibilidade limitada" na MDN | robusta |
| https://firt.dev/notes/pwa-ios/ | Artigo/nota de especialista (Maximiliano Firtman, atualizada em 13/10/2026, testes próprios) | No iPhone: `display` só vale `browser` e `standalone` (`minimal-ui` e `fullscreen` não). `theme-color` substituiu `apple-mobile-web-app-status-bar-style` a partir do iOS 15; `theme_color` do manifesto também desde o 15. `black-translucent` é a única forma de tela inteira. Ícones do manifesto desde o iOS 15.4; SVG desde o iOS 26.0 (só se declarado no manifesto); ícones `maskable` e `monochrome` são **ignorados**. Tela de abertura: só `apple-touch-startup-image` (e só com `apple-mobile-web-app-capable`). `orientation`, `shortcuts`, `share_target` não suportados. | iOS 15, 15.4, 26.0 (conforme a nota) | moderada (um especialista com testes próprios; ele mesmo diz que mudam) |
| https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/meta/name/theme-color | Documentação (MDN) | `<meta name="theme-color" content="#F5F3EF" media="(prefers-color-scheme: light)">` e outra com `dark`. A cor só vale quando a condição bate. | "Disponibilidade limitada"; versões não conferidas | robusta |
| https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/How_to/Define_app_icons | Documentação (MDN) | Ícones de 192 e 512 px em PNG; `purpose: "maskable"` é um ícone próprio. Prévia em Maskable.app. | Não conferido por versão | robusta |
| https://web.dev/articles/maskable-icon | Artigo oficial (web.dev) | Zona segura do ícone mascarável: círculo central com raio de 40% da largura; os 10% de fora podem ser cortados. Fundo opaco, sem transparência. **Não** usar `"any maskable"` no mesmo ícone (fica com folga demais como `any`). No Android 8.0+ ícone sem máscara aparece dentro de um círculo branco. | Chrome e Firefox; Android 8.0 | robusta |
| https://webkit.org/blog/16993/news-from-wwdc25-web-technology-coming-in-safari-26-beta/ | Blog de navegador (WebKit) | Safari 26: todo site adicionado à tela de início abre como app web por padrão (a pessoa pode desligar "Abrir como app web"). Ícones SVG aceitos em todo lugar (favicon e tela de início). Manifesto e service worker continuam valendo para ícones e offline. | Safari 26 (beta em 2025; fonte é o post do beta) | robusta |
| https://developer.apple.com/library/archive/documentation/AppleApplications/Reference/SafariHTMLRef/Articles/MetaTags.html | Documentação (Apple) | `<meta name="apple-mobile-web-app-capable" content="yes">` faz abrir sem as barras do Safari; `navigator.standalone` diz se está nesse modo. `format-detection` com `telephone=no` evita números virarem link. | iOS | robusta |

### 2.6 Transições entre telas

| Endereço | Tipo de fonte | A regra, com o valor exato | Suporte | Selo |
|---|---|---|---|---|
| https://developer.mozilla.org/en-US/docs/Web/API/View_Transition_API | Documentação (MDN) | `if (!document.startViewTransition) { atualiza(); return; } document.startViewTransition(() => atualiza());`. Entre páginas de verdade (MPA): `@view-transition { navigation: auto; }`. Para movimento reduzido: pular a transição em JS (`matchMedia('(prefers-reduced-motion: reduce)')`) ou encurtar `::view-transition-*`. | Versões não vieram da MDN (ver caniuse abaixo) | robusta |
| https://caniuse.com/mdn-api_document_startviewtransition | Tabela de suporte (caniuse) | `document.startViewTransition`: Chrome 111+, Safari (Mac e iOS) 18.0+, Firefox 144+, Firefox Android 160 (como a página mostrou, lida em 12/11/2026). | Ver coluna da regra | robusta (dados de suporte) |
| https://developer.chrome.com/docs/web-platform/view-transitions/same-document | Documentação (Chrome) | Em app de página única: chamar `startViewTransition(callback)`, com o callback fazendo a troca no DOM. No React, usar `flushSync` para o DOM estar pronto. A página fica **congelada** enquanto o callback espera, então buscar dados **antes**. Só roda uma transição por vez (a nova pula a anterior). `view-transition-name` repetido cancela a transição. Tratar como enfeite: se falhar, a troca de tela não pode falhar. "Reduzir movimento" não é "sem movimento": dá para usar algo mais sutil. Animar largura/altura força layout a cada quadro. | Chrome 111; classes de transição Chrome 125, Firefox 144, Safari 18.2; tipos Chrome 125, Safari 18 | robusta |
| https://webkit.org/blog/16301/webkit-features-in-safari-18-2/ | Blog de navegador (WebKit) | Safari 18.2: transições entre documentos (`@view-transition`), eventos `pageswap` e `pagereveal`, classes e tipos de transição. | Safari 18.2 | robusta |

Quando NÃO animar (consenso, a partir das regras acima): quando a pessoa pede movimento reduzido; quando a tela vai ser trocada durante uma série em andamento (a página fica congelada durante o callback); em trocas frequentes e repetitivas (cada toque em "mais/menos"); quando a troca depende de dados ainda não carregados. Não achei fonte que dê esta lista pronta; é a minha síntese.

### 2.7 Vibração, som, tela acesa e aviso em segundo plano

| Endereço | Tipo de fonte | A regra, com o valor exato | Suporte | Selo |
|---|---|---|---|---|
| https://caniuse.com/mdn-api_navigator_vibrate | Tabela de suporte (caniuse) | `navigator.vibrate(...)`: **Safari iOS: sem suporte em nenhuma versão listada (3.2 a 27.2)**; Safari Mac sem suporte; Chrome Android 157 suporta; Firefox Android 160 "parcial" (sem detalhe); Firefox desktop deixou de suportar na 129. | Dados da página em 12/11/2026 | robusta (dados) |
| https://firt.dev/notes/pwa-ios/ | Nota de especialista | Vibração: não suportada no iPhone. Wake Lock: desde o iOS 16.4, e no app instalado desde o 18.4. | iOS 16.4, 18.4 | moderada |
| https://developer.mozilla.org/en-US/docs/Web/API/Vibration_API | Documentação (MDN) | `navigator.vibrate([250,120,250])`; se o aparelho não vibra, a chamada não faz nada. "Disponibilidade limitada". Se exige toque antes: **não conferido** nesta página. | Ver caniuse acima | robusta |
| https://developer.mozilla.org/en-US/docs/Web/API/Screen_Wake_Lock_API | Documentação (MDN) | `await navigator.wakeLock.request('screen')` (só em HTTPS). O sistema solta a trava sozinho quando a página fica oculta: ouvir `visibilitychange` e pedir de novo quando `visibilityState === 'visible'`. Pode falhar com economia de bateria. Soltar quando não precisar. | Baseline 2025 "recém disponível" (MDN: desde março de 2025) | robusta |
| https://caniuse.com/wake-lock | Tabela de suporte (caniuse) | Safari iOS 16.4 em diante; Chrome Android 157 (como a página mostrou). | 12/11/2026 | robusta (dados) |
| https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API/Best_practices | Documentação (MDN) | O `AudioContext` só toca se criado ou retomado **dentro de um gesto do usuário**; criado fora, começa `suspended` e é preciso `resume()` num clique. A página não fala de iOS em especial. | Não conferido por versão | robusta |
| https://developer.mozilla.org/en-US/docs/Web/Media/Guides/Autoplay | Documentação (MDN) | Áudio só toca sozinho se a pessoa já interagiu com o site (ou está mudo). No Safari, `<video>` precisa de `playsinline` para tocar sozinho. | Comportamento varia por navegador | robusta |
| https://developer.mozilla.org/en-US/docs/Web/API/Notification/Notification | Documentação (MDN) | No celular, `new Notification()` costuma dar `TypeError`; use `registration.showNotification()` via service worker, com permissão (`Notification.requestPermission()`) e HTTPS. | "quase todos os navegadores de celular" (sem versão) | robusta |
| https://webkit.org/blog/13878/web-push-for-web-apps-on-ios-and-ipados/ | Blog de navegador (WebKit) | Push no iPhone exige app adicionado à tela de início (manifesto com `display` `standalone` ou `fullscreen`), e o pedido de permissão tem de vir de um toque direto. É Push API + Notifications + service worker, sem conta de desenvolvedor Apple. Respeita os modos de Foco. | iOS/iPadOS 16.4 | robusta |
| https://firt.dev/notes/pwa-ios/ | Nota de especialista | Web Push só em app instalado (16.4); Push declarativo desde o 18.4, também só instalado e sem service worker; Background Sync, Periodic Sync e Background Fetch **não** existem no iPhone. | iOS 16.4, 18.4 | moderada |

Ponto crítico para o temporizador (minha análise, **não confirmada em fonte**): o JavaScript de um app web fica suspenso com a tela bloqueada ou em segundo plano, então um `setTimeout` para tocar o aviso não é confiável. Sons já agendados no relógio do `AudioContext` podem tocar ou não com a tela bloqueada; **não achei fonte que diga**. Só uma notificação push (vinda de um servidor) tem garantia documentada, e ela quebra o "tudo no aparelho, sem servidor" do projeto.

### 2.8 Desempenho percebido

| Endereço | Tipo de fonte | A regra, com o valor exato | Suporte | Selo |
|---|---|---|---|---|
| https://web.dev/articles/inp | Artigo oficial (web.dev) | INP "bom" = 200 ms ou menos (percentil 75); "precisa melhorar" até 500 ms; "ruim" acima. Mede do toque até o próximo quadro pintado. Dar retorno visual no próximo quadro, mesmo se o resultado demora. | Padrão de métrica (Core Web Vitals) | robusta |
| https://web.dev/articles/cls | Artigo oficial (web.dev) | CLS "bom" = 0,1 ou menos; "ruim" acima de 0,25. Causas: imagens sem dimensão, fonte que muda de tamanho ao trocar, conteúdo inserido acima do que já está na tela. Animar com `transform`, não com `top/left/width/height`. | Métrica | robusta |
| https://web.dev/articles/font-best-practices | Artigo oficial (web.dev) | `font-display: swap` mostra o texto logo e troca a fonte depois; `optional` evita qualquer salto (se a fonte chegar tarde, nem usa). Pode combinar: `swap` para marca, `optional` para corpo. `size-adjust` na fonte de reserva reduz o salto. Servir só WOFF2. `preload` ignora `unicode-range`. Embutir o `@font-face` no `<head>` costuma ser melhor que `preload`. | Baseline | robusta |
| https://developer.chrome.com/docs/web-platform/prerender-pages | Documentação (Chrome) | Speculation Rules: `prefetch` baixa a próxima página, `prerender` a carrega escondida. Eagerness `conservative` age ao encostar o dedo. | Chrome e Edge sim; Firefox parcial (prévia técnica); Safari atrás de opção desligada (como a página mostrou) | robusta; **não serve para app de página única com rotas internas** (a página não trata disso) |
| https://web.dev/case-studies/twitter | Relato de equipe (Twitter Lite, via Google) | App shell vindo do cache; divisão do código por rota para a primeira tela carregar só o que precisa; 600 KB contra 23,5 MB do app nativo; primeira carga abaixo de 5 s em 3G e abaixo de 3 s para quem volta; −50% no p99 de tempo até interativo; −30% no tempo médio de carga. Depois do convite "Adicionar à tela de início": 250 mil usuários únicos por dia abrem pelo ícone, 4 vezes ao dia em média. | Dados da própria empresa; resultado de 2017-2018, sem data na página | moderada (números da empresa, não independentes) |

Sobre esqueleto contra indicador de espera: **não achei fonte aberta com medição**. A prática comum (esqueleto com o mesmo tamanho do conteúdo para não dar salto, indicador só se passar de ~1 s) é consenso, mas não li página que a comprove. Ver seção 5.

### 2.9 Limitações do PWA no iPhone e no Android; convite para instalar

| Endereço | Tipo de fonte | A regra, com o valor exato | Suporte | Selo |
|---|---|---|---|---|
| https://firt.dev/notes/pwa-ios/ | Nota de especialista | iOS: sem `beforeinstallprompt`, sem `appinstalled`, sem faixa de instalação; instalar é pelo menu Compartilhar. Desde o iOS/iPadOS 26.0 todo site pode ser instalado como app web. Instalação por outros navegadores desde o 16.4 (se o navegador aderir). Cookies de login copiados para o app instalado desde o 17.2. Armazenamento **não** é compartilhado entre o Safari e o app instalado. Não abre o app ao tocar num link (só uma notificação push abre). Faltam: Bluetooth, NFC, Serial, Battery, Virtual Keyboard, Idle Detection, Screen Capture, entre outros. | iOS 16.4, 17.2, 26.0 | moderada |
| https://web.dev/articles/customize-install | Artigo oficial (web.dev) | No Chrome: ouvir `beforeinstallprompt`, chamar `preventDefault()`, guardar o evento e mostrar o seu botão; `prompt()` só uma vez por evento; `appinstalled` avisa de qualquer instalação. Detectar o modo: `matchMedia('(display-mode: standalone)')` (e `navigator.standalone` no iOS). | Chrome (a página não diz do Safari) | robusta |
| https://web.dev/articles/define-install-strategy | Artigo oficial (web.dev) | Mostrar o convite **depois de uma ação significativa**, não em momento aleatório; guardar dispensas e visitas; não empurrar a instalação a quem já recusou; sempre deixar um caminho de instalação. | Orientação, sem versão | moderada |
| https://developer.mozilla.org/en-US/docs/Web/Media/Guides/Autoplay | Documentação (MDN) | (ver 2.7) | | robusta |
| (só o resumo da busca) busca: "Hacker News PWA vs native iOS limitations" (espelho: https://brianlovin.com/hn/34823402) | Discussão (Hacker News, via espelho) | Comentaristas: o push só em app instalado é restrição que não existe em outros sistemas; Chrome Android tem push no navegador desde 2015; "falta só o convite de instalação". Não abri a conversa original; só o resumo da busca. | Não conferido | opinião (comentaristas anônimos) |
| https://bugs.webkit.org/show_bug.cgi?id=259568 | Registro de erro (WebKit) | (ver 2.3) | | robusta |

Mudanças recentes no iPhone que valem para o desenho (de firt.dev e dos posts do WebKit): iOS 26 trata todo site como app web ao adicionar à tela de início (o usuário pode desligar); SVG nos ícones; push declarativo no iOS 18.4; Wake Lock também no app instalado no 18.4; "Static Routing" do service worker consta no iOS 27.0 na nota do firt.dev (não conferi em outra fonte).

---

## 3. O que o app já faz e o que falta

Lido só em leitura: `index.html`, `vite.config.ts`, `public/`, `src/styles.css`, `src/features/*`.

| # | Item | Situação | Onde | Fonte |
|---|---|---|---|---|
| 1 | `viewport-fit=cover` na meta viewport | **já faz** | `index.html:5` | webkit.org/blog/7929 |
| 2 | Barra de baixo com folga da barra de gestos (`env(safe-area-inset-bottom)`) | **já faz** | `src/styles.css:616` (barra), `:278` (ação fixa), `:350` (folha), `:472` (registro) | developer.mozilla.org/.../env |
| 3 | Folga no topo (`env(safe-area-inset-top)`) e nas laterais em paisagem | **falta** (só aparece em `styles.css:349`, para o véu; o cabeçalho e o corpo não têm; as laterais não são tratadas) | `src/styles.css:349` | webkit.org/blog/7929 |
| 4 | Altura da tela com `dvh`, sem `100vh` | **já faz** em um lugar; **falta** conferir o resto (a busca por `100vh` não achou nada) | `src/styles.css:917` | web.dev/blog/viewport-units |
| 5 | Tela inteira como app instalado, `display: standalone` | **já faz** | `vite.config.ts:45` | MDN display |
| 6 | `theme-color` claro e escuro por `media` | **já faz** | `index.html:6-7` | MDN theme-color |
| 7 | `theme_color` e `background_color` do manifesto acompanhando o tema escuro | **falta** (só existe a cor clara `#F5F3EF`, que aparece na abertura e na troca de apps do Android mesmo se o aparelho está no escuro) | `vite.config.ts:46-47` | MDN theme-color |
| 8 | Ícones 192/512 `any` e 512 `maskable` em arquivos separados, mais SVG | **já faz** | `vite.config.ts:51-54` | web.dev/articles/maskable-icon |
| 9 | Ícone de tela de início do iPhone | **já faz** (`apple-touch-icon.png`) | `index.html:9` | firt.dev/notes/pwa-ios |
| 10 | Tela de abertura no iPhone (`apple-touch-startup-image`) | **falta** (o iPhone mostra tela em branco ou da cor de fundo enquanto abre) | `index.html` | firt.dev/notes/pwa-ios |
| 11 | `apple-mobile-web-app-capable` e estilo da barra de status | **falta** (nenhuma das duas metas; o iOS 15+ usa `theme-color`, o que já existe; `black-translucent` é a única forma de tela inteira sob a barra) | `index.html` | developer.apple.com (MetaTags); firt.dev |
| 12 | `overscroll-behavior` na página (impedir puxar para recarregar e o efeito elástico) | **falta** na página; **já faz** dentro da folha | folha: `src/styles.css:350`; página: sem regra | MDN overscroll-behavior |
| 13 | Travar a rolagem do fundo com a folha aberta | **falta** (a folha usa `inert` e o véu, mas não trava a rolagem; no iPhone instalado só `overflow:hidden` não basta, bug 259568) | `src/features/app/Folha.tsx:12-28` | bugs.webkit.org/show_bug.cgi?id=259568 |
| 14 | `touch-action: manipulation` nos controles | **falta** (não aparece no CSS; a meta com `width=device-width` já tira o atraso, mas o toque duplo ainda pode dar zoom em partes da página) | `src/styles.css` | webkit.org/blog/5610 |
| 15 | `-webkit-tap-highlight-color` | **falta** (não aparece no CSS; hoje o realce azul-acinzentado padrão do iPhone e do Android aparece) | `src/styles.css` | MDN tap-highlight |
| 16 | Estado pressionado (`:active`) nos botões | **falta** (`:active` aparece 0 vezes no CSS) | `src/styles.css` | web.dev/articles/inp (retorno no próximo quadro) |
| 17 | `user-select: none` e `-webkit-touch-callout: none` nos controles | **falta** | `src/styles.css` | MDN user-select; MDN touch-callout |
| 18 | Letra de 16 px ou mais em campos (evitar zoom ao focar) | **já faz** (campo numérico 1,25 rem = 20 px; seletores do registro 1,75 a 2 rem) | `src/styles.css:303`, `:483`, `:503` | busca (só o resumo): consenso de 16 px |
| 19 | Teclado decimal para carga | **já faz** parcialmente (`inputMode="decimal"` com `type="number"`); **conferir** no aparelho se o teclado mostra vírgula e se `type="number"` aceita "12,5" em pt-BR | `src/features/app/ui.tsx:364-365` | MDN inputmode |
| 20 | Tela acesa (Wake Lock) com pedido de novo ao voltar ao app | **já faz** | `src/features/treino/Temporizador.tsx:21-42` | MDN Screen Wake Lock |
| 21 | Som do descanso com `AudioContext` retomado | **já faz** o `resume()` (precisa estar ligado a um toque; **conferir** se o contexto é criado/retomado dentro do toque que inicia o descanso) | `src/features/treino/Temporizador.tsx:70-72` | MDN Web Audio best practices |
| 22 | Vibração ao fim do descanso, sem quebrar onde não existe | **já faz** (`navigator.vibrate?.` com `try/catch`); no iPhone não vibra, e o app precisa dar outro aviso (som e visual) | `src/features/treino/Temporizador.tsx:138` | caniuse vibrate |
| 23 | Aviso do fim do descanso com o app em segundo plano (notificação) | **falta**; e **não se aplica** de forma confiável sem servidor (ver seção 4) | sem código | MDN Notification; webkit.org/blog/13878 |
| 24 | Fonte própria sem piscar: `font-display`, pré-carregamento, WOFF2 | **já faz** (`swap`, `preload`, WOFF2 local); **falta** `size-adjust` na fonte de reserva para não dar salto | `src/styles.css:7`; `index.html:10` | web.dev/articles/font-best-practices |
| 25 | Troca de telas com View Transitions | **falta** (não há `startViewTransition`); opcional | `src/App.tsx` (rotas) | developer.chrome.com (same-document) |
| 26 | Respeito a `prefers-reduced-motion` | **já faz** na folha e nas barras | `src/styles.css:356`, `:370`, `:535` | developer.chrome.com (same-document) |
| 27 | Telas carregadas por demanda e uma tela de espera | **já faz** (`lazy` + `Suspense` com `Carregando`); **falta** um esqueleto com o tamanho do conteúdo (hoje é um indicador) | `src/App.tsx:11`, `:42` | web.dev/articles/cls |
| 28 | Funcionar sem rede (service worker, cache do desenho do equipamento) | **já faz** | `vite.config.ts:31-37` | web.dev/case-studies/twitter |
| 29 | Convite para instalar sem ser chato | **já faz** para o iPhone (aviso com os passos, dispensável); **falta** o botão para Android com `beforeinstallprompt` | `src/features/app/avisos.tsx:18`; sem `beforeinstallprompt` no código | web.dev/articles/customize-install |
| 30 | Barra fixa de baixo acompanha o teclado (registro de série com campo aberto) | **falta** (nada ouve `visualViewport`; o painel de registro fica `sticky` e pode ficar fora do lugar com o teclado, principalmente no bug do iPhone instalado) | `src/styles.css:472` | MDN VisualViewport; dev.to (bug de altura) |

Resumo: dos 30 itens, cerca de 16 estão feitos (alguns só em parte: 4, 19, 21, 27 e 29) e cerca de 14 faltam (3, 7, 10 a 17, 23, 25 e 30; o 23 depende de decisão de produto). A lacuna maior é o conjunto "toque e gestos" (itens 12 a 17), porque é o que mais denuncia o "site".

---

## 4. O que um PWA não consegue fazer no iPhone hoje

(para não prometer no desenho; fonte principal: firt.dev/notes/pwa-ios, atualizada em 13/10/2026, e os posts do WebKit)

- **Vibrar.** Não existe `navigator.vibrate` no Safari do iPhone (caniuse: sem suporte de 3.2 a 27.2). Usar som e movimento na tela.
- **Convite automático de instalação.** Não há `beforeinstallprompt`, nem `appinstalled`, nem faixa. A pessoa instala sozinha pelo Compartilhar; o app só pode explicar os passos.
- **Avisar com o app fechado, sem servidor.** Push só chega no app **instalado**, depois de a pessoa aceitar a permissão num toque, e precisa de um servidor de push. Não há Background Sync nem Periodic Sync.
- **Ícone mascarável e monocromático.** O iOS ignora; precisa de um ícone `any` bonito por conta própria.
- **Tela inteira sem a barra de status.** `fullscreen` e `minimal-ui` não valem; só `standalone`.
- **Orientação travada, atalhos de ícone, compartilhar para o app.** `orientation`, `shortcuts` e `share_target` não são suportados.
- **Abrir o app ao tocar num link.** Não há captura de link no iPhone.
- **Dividir dados com o Safari.** O armazenamento do app instalado é separado do navegador (o aviso de "exporte antes" do app tem razão de ser).
- **Teclado virtual como no Android.** A `VirtualKeyboard API` não existe no iPhone; use `visualViewport`.
- **Bluetooth, NFC, relógios, Battery Status** e outros recursos de hardware: não suportados.
- **Alerta de segurança (não é limitação de recurso, é cuidado):** há um relato de que a altura da tela encolhe depois do primeiro teclado em app instalado (iOS 17 e 18); teste em aparelho real.

Tela acesa (Wake Lock) **funciona** desde o iOS 16.4 (também no app instalado desde o 18.4) e pode ser prometida, com a ressalva de que a trava é solta se o app sai da tela.

---

## 5. O que não consegui abrir ou conferir

- **x.com e reddit.com:** não tentei, conforme a regra.
- **MDN, tabelas de suporte (compatibilidade):** a ferramenta de leitura não trouxe as tabelas das páginas de `overscroll-behavior`, `touch-action`, `-webkit-tap-highlight-color`, `user-select`, `-webkit-touch-callout`, `VisualViewport`, `VirtualKeyboard`, `Vibration`, `View Transition`, `theme-color`, `display` e `inputmode`. As versões que cito vêm de outras páginas (caniuse, WebKit, web.dev, firt.dev) e, quando não achei, está "não conferido".
- **Suporte da VirtualKeyboard API:** só sei pela MDN que é "limitada"; quais navegadores, **não conferido**.
- **`:active` no iOS:** não achei fonte aberta e datada sobre ele funcionar sem o truque do `ontouchstart` vazio. Precisa de teste em aparelho.
- **Zoom ao focar campo (16 px):** só o resumo da busca (blogs). A página de ajuste de texto da Apple não trata do assunto. Também não conferi, em fonte oficial, se `maximum-scale=1` ainda funciona no iOS atual.
- **Esqueleto contra indicador de espera:** não abri nenhuma página com medição. O que escrevi é consenso, sem fonte.
- **Quando NÃO animar uma transição:** a lista da seção 2.6 é minha síntese, a partir da MDN e do Chrome; não achei uma fonte única.
- **Bugs de `position: fixed` em PWA no iOS 17** (fórum da Apple) e os conserto de travar o fundo: só o resumo da busca; só o registro 259568 do WebKit foi aberto.
- **Hacker News:** só o resumo da busca e um espelho (`brianlovin.com/hn/34823402`, que não abri como página). Não li as conversas originais.
- **Casos de Starbucks, Pinterest, Spotify, Photopea, Excalidraw:** não busquei nem abri. Só o Twitter Lite (web.dev) foi aberto.
- **Som tocando com a tela bloqueada no iPhone:** não achei fonte. O comportamento de sons agendados no relógio do `AudioContext` com o app em segundo plano está **não conferido**.
- **Convite de instalação no Android sem ser chato:** a orientação do web.dev é geral (momento significativo, guardar dispensas); não achei número de conversão confiável além do estudo do Twitter Lite (dados da própria empresa).
- **Versões muito novas (iOS/Safari 27.x, Chrome 157-163):** vieram do caniuse e do firt.dev como as páginas mostraram. Não tive como conferir em segunda fonte.
- **Páginas que carregaram só em parte:** MDN `env`, `overscroll-behavior`, `touch-action`, `user-select`, `tap-highlight`, `touch-callout`, `Autoplay`, `Prerender` e `Screen Wake Lock` avisaram que parte do texto não foi lida (a tabela de suporte fica no fim).

---

## Lista das referências abertas (43 endereços distintos, mais 3 só pelo resumo da busca)

Abertas e carregadas: MDN env; webkit.org 7929; web.dev viewport-units; developer.chrome.com viewport-resize-behavior; MDN overscroll-behavior; MDN touch-action; developer.chrome.com 300ms-tap-delay; webkit.org 5610; MDN tap-highlight; MDN inputmode; firt.dev/notes/pwa-ios; webkit.org 13878; MDN Screen Wake Lock; MDN Vibration; MDN View Transition; MDN manifest display; webkit.org 16993 (Safari 26); webkit.org 16301 (Safari 18.2); developer.chrome.com view-transitions same-document; web.dev define-install-strategy; web.dev customize-install; web.dev font-best-practices; MDN VisualViewport; MDN VirtualKeyboard; MDN Define app icons; web.dev maskable-icon; MDN theme-color; MDN user-select; MDN Web Audio best practices; MDN Autoplay; web.dev inp; developer.chrome.com prerender-pages; web.dev cls; web.dev case-studies/twitter; bugs.webkit.org 259568; dev.to (bug do teclado no iOS); developer.apple.com MetaTags; developer.apple.com AdjustingtheTextSize (não trata de zoom em campo); MDN touch-callout; MDN Notification; caniuse wake-lock; caniuse vibrate; caniuse startViewTransition.

Só o resumo da busca: busca sobre bloqueio de rolagem no iOS; busca sobre zoom a 16 px; busca sobre Hacker News.
