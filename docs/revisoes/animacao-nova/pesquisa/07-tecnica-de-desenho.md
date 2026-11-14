# Técnica de desenho da figura animada: motor próprio (SVG) contra alternativas

Pesquisa feita em 12/11/2026. Só páginas públicas. Licenças, versões e tamanhos desta nota foram lidos ou medidos nesta sessão; o que não foi conferido está marcado NÃO VERIFICADO.

Como medi (pacotes npm): consultei `registry.npmjs.org/<pacote>/latest` (versão, campo `license`, `unpackedSize`), baixei o arquivo já minificado publicado do pacote via `cdn.jsdelivr.net/npm/<pacote>@<versão>/...` para uma pasta de rascunho (nada instalado no repositório, nada executado) e medi com `wc -c` (min) e `gzip -9 -c arquivo | wc -c` (gzip). Licença: li o arquivo LICENSE do pacote (ou o campo `license` do package.json quando não há arquivo, indicado na coluna). Não fiz bundle com tree-shaking (exigiria instalar e rodar ferramenta de build): onde a tabela diz "build mínimo", é NÃO MEDIDO.

Convenção das colunas: "medido" = eu medi o arquivo; "pacote (unpacked)" = só o tamanho descompactado do pacote npm, que não é tamanho de bundle.

## Fontes

Todas com data de acesso 12/11/2026. Status: "lido" = abri a página/arquivo e li o texto; "lido (WebFetch)" = texto devolvido pela ferramenta de leitura, resumido por modelo, não vi o HTML bruto; "resumo de busca" = só vi o resumo do resultado de busca, NÃO VERIFICADO; "não abriu" = erro HTTP.

| chave | nome | URL | tipo | status |
|---|---|---|---|---|
| NPM | Registro npm (metadados dos pacotes citados) | https://registry.npmjs.org/ (um GET por pacote, `/latest`) | pacote npm | lido (JSON) |
| JSD | jsDelivr (arquivos e LICENSE dos pacotes, listagem em data.jsdelivr.com) | https://cdn.jsdelivr.net/npm/ | pacote npm | lido e medido |
| CANIUSE-OC | Can I use: OffscreenCanvas | https://caniuse.com/offscreencanvas | documentação | lido (WebFetch) |
| CANIUSE-GPU | Can I use: WebGPU | https://caniuse.com/webgpu | documentação | lido (WebFetch) |
| MDN-OC | MDN: OffscreenCanvas | https://developer.mozilla.org/en-US/docs/Web/API/OffscreenCanvas | documentação | lido (WebFetch); tabela de compatibilidade não carregou |
| WK-253431 | WebKit Bugzilla 253431 (Safari 16.4 só 2D em OffscreenCanvas) | https://www2.webkit.org/show_bug.cgi?id=253431 | documentação | resumo de busca |
| SMPL | SMPL: licença | https://smpl.is.tue.mpg.de/license.html | documentação | lido (WebFetch) |
| MESHCAPADE | Meshcapade: modelos de corpo (licença comercial paga) | https://meshcapade.com/assets/body-models | documentação | resumo de busca |
| SMPLX-SPEC | Licença não comercial do SPEC/SMPL-X | https://spec.is.tue.mpg.de/license.html | documentação | resumo de busca |
| MH-FAQ | MakeHuman: "Are MakeHuman files free?" | https://static.makehumancommunity.org/makehuman/faq/are_makehuman_files_free.html | documentação | lido (WebFetch) |
| MH-2020 | MakeHuman: "What changed regarding the license in 2020?" | https://static.makehumancommunity.org/oldsite/faq/what_changed_regarding_the_license_in_2020.html | documentação | resumo de busca |
| MIXAMO-HELP | Adobe: Mixamo, perguntas comuns | https://helpx.adobe.com/creative-cloud/faq/mixamo-faq.html | documentação | não abriu (403); só resumo de busca |
| MIXAMO-COM | Comunidade Adobe: Mixamo FAQ licensing | https://community.adobe.com/t5/mixamo-discussions/mixamo-faq-licensing-royalties-ownership-eula-and-tos/m-p/13234775 | documentação (fórum) | resumo de busca |
| RPM | Notícias sobre o encerramento do Ready Player Me | https://techcrunch.com/2025/12/19/netflix-acquires-gaming-avatar-maker-ready-player-me/ | artigo | resumo de busca |
| VROID | VRoid Studio Guidelines | https://vroid.com/en/studio/guidelines | documentação | resumo de busca |
| MBLAB | MB-Lab: licença | https://mb-lab-docs.readthedocs.io/en/latest/license.html | documentação | resumo de busca |
| ZANAT | Z-Anatomy, Models-of-human-anatomy | https://github.com/Z-Anatomy/Models-of-human-anatomy | repositório | lido (WebFetch) |
| BP3D | BodyParts3D, README | https://dbarchive.biosciencedbc.jp/data/bodyparts3d/LATEST/README_e.html | documentação | lido (WebFetch) |
| OPENSIM | opensim-core | https://github.com/opensim-org/opensim-core | repositório | lido (WebFetch) |
| OPENSIM-MOD | Modelos OpenSim de agachamento/supino (SimTK, artigos) | busca geral | artigo | resumo de busca |
| CMU | CMU Graphics Lab Motion Capture Database | http://mocap.cs.cmu.edu/info.php | documentação | não abriu (503 em duas tentativas, https e http); termos só por resumo de busca |
| CMU-FBX | Conversão FBX do CMU (4TU.nl) | https://data.4tu.nl/datasets/0448aab2-3332-449f-a8e2-d208cb58c7df | documentação | resumo de busca |
| AMASS | AMASS: página e licença | https://amass.is.tue.mpg.de/ e /license.html | documentação | lido (WebFetch) |
| H36M | Human3.6M | http://vision.imar.ro/human3.6m/description.php | documentação | não abriu (redirecionamento 302 não seguido); NÃO VERIFICADO |
| FIT3D | Fit3D (AIFit, CVPR 2021) | https://fit3d.imar.ro/ | documentação | lido (WebFetch); página de licença (/legal) não lida |
| FLAG3D | FLAG3D: projeto e licença | https://andytang15.github.io/FLAG3D/License_FLAG3D.pdf | documentação | PDF baixado, texto não legível pela ferramenta; termos só por resumo de busca |
| EC3D | EC3D (repositório do artigo ACCV 2022) | https://github.com/Jacoo-Zhao/3D-Pose-Based-Feedback-For-Physical-Exercises | repositório | lido (WebFetch) |
| SMUS | Boris Smus, "Canvas vs. SVG performance" | https://smus.com/canvas-vs-svg-performance/ | benchmark | lido (WebFetch); data 19/01/2009 |
| ECHARTS | ECharts handbook: canvas-vs-svg | https://apache.googlesource.com/echarts-handbook/+/07d57fee0c139b6762569c5bdfbfc27e3136e41b/contents/en/best-practice/canvas-vs-svg.md | documentação | lido (WebFetch); sem data |
| HORAK | Horak et al., poster de desempenho de grafos (TU Dresden) | https://mt.inf.tu-dresden.de/cnt/uploads/Horak-2018-Graph-Performance-Poster.pdf | artigo | resumo de busca (ano 2018 pelo nome do arquivo) |
| SVG-W3C | Lista www-svg, innerHTML vs DOM (Gecko) | https://lists.w3.org/Archives/Public/www-svg/2009Nov/0075.html | artigo (lista) | resumo de busca; nov/2009 |
| WK-CLIP | WebKit Bugzilla 226321 e 256380 (clip-path referenciando SVG, máscara) | https://bugs.webkit.org/show_bug.cgi?id=226321 | documentação | resumo de busca |
| MOZ-WC | Mozilla Bugzilla 1535159 (will-change e custo de pintura) | https://bugzilla.mozilla.org/show_bug.cgi?id=1535159 | documentação | resumo de busca |
| MOMENTIC | Guia de teste de WebGL/canvas (diferenças de AA entre GPUs) | https://momentic.ai/resources/the-definitive-guide-to-webgl-and-canvas-test-automation-from-pixels-to-pipelines | artigo | resumo de busca |
| W3C-GPU | Lista www-svg 2016: GPUs com <5 pixels diferindo de 1/255 | https://lists.w3.org/Archives/Public/www-svg/2016Dec/0018.html | artigo (lista) | resumo de busca; dez/2016 |
| THREE-FORUM | Fórum three.js: inconsistências desktop vs mobile | https://discourse.threejs.org/t/inconsistencies-on-desktop-vs-mobile/53877 | artigo (fórum) | resumo de busca |
| SEEN | seen.js | https://www.npmjs.com/package/seen | pacote npm | licença lida no LICENSE.md; tamanho medido |
| TSR | three-svg-renderer | https://www.npmjs.org/package/three-svg-renderer | pacote npm | metadado lido (registry); README não lido |
| FSS | flat-surface-shader (DataDog mirror) | https://gitee.com/mirrors_DataDog/flat-surface-shader | repositório | resumo de busca; o pacote npm com esse nome é um placeholder de segurança |

---

## A. Renderização

Medições: min/gzip são do arquivo publicado no pacote, medido por mim em 12/11/2026 (`gzip -9`). "Offline" = funciona sem rede quando empacotado no app (todos funcionam, pois são código local; Rive/dotLottie exigem servir também o .wasm local). "Determinístico" = mesma entrada, mesma saída pixel a pixel no mesmo ambiente; entre ambientes só o SVG-string é byte a byte.

### A.1 Tecnologias de renderização (APIs do navegador)

| item | o que é | licença (onde li) | versão | tamanho min / gzip | offline | determinístico | Worker | serve para app comercial? | observação |
|---|---|---|---|---|---|---|---|---|---|
| SVG por string (motor próprio atual) | `src/engine/` em TypeScript, emite SVG como string | código do projeto | n/a | fonte TS: 92 arquivos em `src/engine/exercicios` mais os demais, 367.569 bytes de fonte; gzip do fonte concatenado 80.323 bytes (NÃO é bundle minificado; medi só para ordem de grandeza) | sim | sim: a string é idêntica em qualquer ambiente; a regressão compara o texto | sim, é só string (sem DOM) | sim | a rasterização final (navegador) varia entre navegadores, mas a comparação é feita antes dela |
| SVG via DOM (createElementNS/setAttribute) | mesmos elementos, criados e atualizados por atributos | padrão W3C | n/a | 0 (API nativa) | sim | sim na árvore; pixel depende do navegador | não: não há DOM em Worker | sim | em Worker só dá para gerar string; DOM só na thread principal |
| Canvas 2D | API `CanvasRenderingContext2D` | padrão WHATWG | n/a | 0 | sim | não garantido entre navegadores/SO (antialiasing e fontes variam); NÃO VERIFICADO com medição minha | só via OffscreenCanvas | sim | sem temas por CSS: cores vêm do JS; sem inspeção de DOM |
| OffscreenCanvas em Worker | canvas desacoplado do DOM | padrão WHATWG | n/a | 0 | sim | mesmas ressalvas do Canvas 2D | sim | sim | Baseline "widely available" desde março de 2023 (MDN, lido). Can I use (lido): uso global 96,95% (96,48% total + 0,47% parcial); Chrome 69+, Firefox 105+; Safari desktop 16.2 a 16.6 parcial e 17.0 a 27.3 completo; Safari iOS 16.2 a 16.7 parcial e 17.0 a 27.2 completo. O Safari 16.4 só tinha contexto 2D (WebKit bug 253431, resumo de busca, NÃO VERIFICADO): detectar o construtor não prova suporte a WebGL |
| WebGL puro (1/2) | API de GPU | padrão Khronos | n/a | 0 | sim | NÃO bit a bit entre GPUs (ver abaixo) | sim, com OffscreenCanvas (Safari 17+) | sim | custo de escrever shaders e malha à mão |
| WebGPU | API de GPU nova | padrão W3C | n/a | 0 | sim | não garantido | sim | sim | Can I use (lido): 88,63% de uso global; Safari desktop 26.0 a 27.3 parcial; iOS Safari 26.0 a 27.2 suportado, 17.4 a 18.7 desativado por padrão; Chrome Android 157; Firefox desativado por padrão até a 163. Celular simples (iOS antigo, Android antigo) fica sem |

Determinismo do WebGL entre GPUs e regressão por pixel (fontes: MOMENTIC, W3C-GPU, THREE-FORUM, todas só resumo de busca, NÃO VERIFICADO por leitura direta): relatos de que o antialiasing por hardware (MSAA) e a rasterização diferem entre GPUs/navegadores; um relato diz que com os mesmos dados na GPU algumas GPUs divergem em menos de 5 pixels por 1/255 (lista W3C, dez/2016). As saídas citadas para teste: limiar/tolerância perceptual, fixar o ambiente (GPU ou renderizador por software fixo), ou desligar o antialiasing de hardware (`antialias: false`) e usar supersampling por software. Consequência para este app: a regressão por "comparação exata" só se mantém com WebGL/Canvas se o teste rodar sempre no mesmo ambiente e com tolerância; com SVG-string a comparação exata é do texto e independe da GPU.

### A.2 Bibliotecas

| item | o que é | licença (onde li) | versão | tamanho min / gzip (medido?) | offline | determinístico | Worker | serve para app comercial? | observação |
|---|---|---|---|---|---|---|---|---|---|
| three.js (core) | motor 3D WebGL | MIT (LICENSE do pacote, lido) | 0.187.0 | `build/three.module.min.js` 392.177 / 89.390 e `build/three.core.min.js` 422.062 / 105.278 (medido). Somados como teto: 814.239 / 194.668. Não verifiquei se o módulo importa o core nem fiz tree-shaking | sim | não bit a bit entre GPUs | sim (OffscreenCanvas) | sim | build mínimo com tree-shaking: NÃO MEDIDO (exigiria instalar e rodar bundler); o teto acima é o que mediu |
| three.js: CCDIKSolver | IK por CCD (exemplo de three) | MIT (licença do pacote three) | 0.187.0 | `examples/jsm/animation/CCDIKSolver.js` 14.297 / 3.774 (arquivo não minificado, medido) | sim | sim (cálculo numérico puro, mas depende do three) | sim | sim | acoplado a `SkinnedMesh`/`Bone` do three |
| Babylon.js | motor 3D | Apache-2.0 (license.md do pacote, lido) | 9.36.0 (`@babylonjs/core`) | NÃO MEDIDO: pacote ES modules sem arquivo único; unpacked 73.905.116 bytes (registry) | sim | não bit a bit | sim | sim | muito grande para o uso; só para constar |
| regl | WebGL funcional | MIT (LICENSE, lido) | 2.1.1 | `dist/regl.min.js` 86.652 / 28.438 (medido) | sim | não bit a bit | sim com OffscreenCanvas | sim | sem cena nem esqueleto; só wrapper de WebGL |
| OGL | mini 3D WebGL | Unlicense (campo license do package.json, lido; sem arquivo LICENSE no pacote) | 1.0.11 | NÃO MEDIDO: o pacote só traz fontes `src`; unpacked 423.239 bytes | sim | não bit a bit | sim | sim (domínio público) | |
| PixiJS | renderizador 2D (WebGL/WebGPU/Canvas) | MIT (LICENSE, lido) | 8.23.0 | `dist/pixi.min.js` 912.519 / 255.257 (medido) | sim | não bit a bit | sim (modo Worker existe; NÃO VERIFICADO) | sim | pesado para 2D simples |
| two.js | 2D com saídas SVG/Canvas/WebGL | MIT (LICENSE, lido) | 0.8.24 | `build/two.min.js` 205.366 / 49.691 (medido) | sim | SVG: sim na árvore | renderizador Canvas/WebGL possível; DOM não | sim | |
| Paper.js | vetores sobre Canvas | MIT (LICENSE.txt, lido) | 0.17.0 | `dist/paper-core.min.js` 311.756 / 105.423 (medido) | sim | não garantido | tem versão core sem DOM, mas depende de Canvas | sim | |
| Rough.js | traço "desenhado à mão" | MIT (LICENSE, lido) | 4.6.6 | `bundled/rough.cjs.js` 30.719 / 9.756 (medido, build CJS; não é o minificado UMD) | sim | usa semente (seed) explícita; a mesma semente reproduz | gera caminhos; sem DOM | sim | estilo esboçado, não serve ao rigor técnico do guia |
| Zdog | pseudo-3D em Canvas/SVG | MIT (campo license do package.json, lido; sem arquivo LICENSE no pacote) | 1.1.3 | `dist/zdog.dist.min.js` 29.737 / 7.269 (medido) | sim | sim na geometria | só com Canvas (via Offscreen) | sim | formas simples (cilindros e esferas achatados); não faz articulação nem oclusão correta em geral |
| Rive (runtime wasm) | animação vetorial com máquina de estados, WASM | MIT (campo license do package.json do `@rive-app/canvas`, lido; sem arquivo LICENSE no pacote) | 2.50.0 | `rive.js` 684.104 / 152.451 e `rive.wasm` 2.264.167 / 940.839 (medido); variante `canvas-lite`: js 545.250 / 122.477 e wasm 859.338 / 352.889 (medido) | sim (servir o .wasm local) | NÃO VERIFICADO | NÃO VERIFICADO | sim (runtime MIT); o editor/arquivos .riv seguem os termos da Rive (NÃO LIDOS) | depende de arquivos .riv feitos no editor deles |
| Lottie (lottie-web) | player de animação After Effects em JSON | MIT (LICENSE.md, lido) | 5.13.0 | `lottie.min.js` 305.704 / 76.054; `lottie_svg.min.js` 242.630 / 62.320; `lottie_light.min.js` 168.394 / 46.410 (medido) | sim | sim na árvore SVG | não (usa DOM) | sim | arquivos Lottie são quadros de curvas, não esqueleto: reproduz a animação, não a calcula |
| dotLottie (`@lottiefiles/dotlottie-web`) | player WASM dos arquivos .lottie | MIT (campo license do registry, lido) | 0.83.2 | `dist/index.js` 161.008 / 31.263 e `dist/dotlottie-player.wasm` 1.225.695 / 492.228 (medido) | sim | NÃO VERIFICADO | NÃO VERIFICADO | sim | |
| Spine runtimes | animação 2D por ossos | LICENSE do pacote `@esotericsoftware/spine-webgl` (lido): runtime só pode ser integrado nos termos do Spine Editor License; cada usuário do produto precisa da própria licença do editor | 4.3.13 | NÃO MEDIDO (sem arquivo minificado único localizado); unpacked 4.746.047 (webgl) e 3.529.553 (canvas) | sim | NÃO VERIFICADO | NÃO VERIFICADO | NÃO sem licença do editor: cláusula "each user of the Products must obtain their own Spine Editor license" | risco jurídico alto para distribuir o app a terceiros |
| DragonBones | animação 2D por ossos | ISC (LICENSE do pacote `dragonbones` lido diz MIT, campo license diz ISC; divergem) | 1.0.2 | `build/dragonbones-alone.min.js` 160.416 / 28.914 (medido) | sim | NÃO VERIFICADO | NÃO VERIFICADO | sim, mas projeto aparentemente parado (NÃO VERIFICADO) | |
| Theatre.js | linha do tempo/animação | `@theatre/core` Apache-2.0 (LICENSE, lido); o pacote `theatre` tem "SEE LICENSE IN LICENSE.md" (não li) | `@theatre/core` 0.7.2 | NÃO MEDIDO (dist/index.js 225.030 bytes não minificado, só listagem); unpacked 903.189 | sim | NÃO VERIFICADO | NÃO VERIFICADO | sim (core Apache-2.0) | serve para curvas de tempo, não renderiza |

---

## B. Figura articulada e cinemática inversa em JS/TS

| item | o que é | licença (onde li) | versão | tamanho min / gzip (medido?) | offline | determinístico | Worker | serve para app comercial? | observação |
|---|---|---|---|---|---|---|---|---|---|
| three-ik | IK (FABRIK) sobre ossos do three | MIT (campo license do package.json, lido) | 0.1.0 | `build/three-ik.min.js` 16.055 / 4.929 (medido) | sim | sim (numérico) | sim | sim | depende do three; versão 0.1.0, estado de manutenção NÃO VERIFICADO |
| closed-chain-ik | IK de cadeia fechada e restrições, em JS | Apache-2.0 (LICENSE, lido) | 0.0.3 | arquivos em `src/` não minificados (sem build único); unpacked 148.971. NÃO MEDIDO min/gzip | sim | NÃO VERIFICADO | NÃO VERIFICADO | sim | útil para pés/mãos fixos no aparelho; versão 0.0.3 |
| fabrik (npm) | FABRIK genérico | MIT (campo license do registry, lido) | 1.0.0-rc2 | unpacked 16.360; NÃO MEDIDO min/gzip | sim | NÃO VERIFICADO | NÃO VERIFICADO | sim | candidato a release; NÃO li o código |
| IK do próprio motor | esqueleto 3D em cm, projetado em vistas | código do projeto | n/a | incluso nos 367 KB de fonte acima | sim | sim | sim | sim | NÃO avaliei o código do motor nesta nota |
| glTF skin / BVH | formatos de esqueleto/animação | glTF: especificação Khronos; BVH: formato de texto livre | n/a | n/a | n/a | n/a | n/a | NÃO VERIFICADO (não li a licença das especificações) | formatos servem de intercâmbio; o app já tem esqueleto próprio |
| projetos abertos de figura humana para navegador | | | | | | | | | busca específica não feita; NÃO VERIFICADO |

---

## C. Modelos de corpo humano e de músculo

| item | o que é | licença (onde li) | versão | tamanho | offline | determinístico | Worker | serve para app comercial? | observação |
|---|---|---|---|---|---|---|---|---|---|
| SMPL-Body (subconjunto) | malha de corpo | CC BY 4.0 (smpl.is.tue.mpg.de/license.html, lido via WebFetch) | NÃO VERIFICADO | NÃO MEDIDO | sim | sim (dados fixos) | sim | sim, com atribuição | por busca: o subconjunto omite as formas por blendshape |
| SMPL (modelo completo) | idem, com forma | licença comercial paga via Meshcapade/Max Planck (resumo de busca, NÃO VERIFICADO; valores de preço citados na busca: não repito) | | | | | | só com licença comercial | |
| SMPL-X / SMPLify-X / SPEC | corpo com mãos e rosto | licença científica não comercial (resumo de busca e página de licença do SPEC, NÃO VERIFICADO em leitura direta) | | | | | | não sem acordo separado | |
| MakeHuman | gerador de humanos | ativos CC0 (MH-FAQ, lido: "The asset license is CC0"; "imposes no restriction on your use of the core assets"). Pelo resumo de busca (MH-2020, NÃO VERIFICADO): em 2020 mudou de AGPL para CC0 para ativos e exportações; README do GitHub ainda cita AGPL (conflito) | NÃO VERIFICADO | NÃO MEDIDO | sim | sim (arquivo exportado fixo) | sim | provavelmente sim para ativos CC0; ativos de terceiros podem ter outra licença | confirmar o arquivo exato exportado |
| MPFB (MakeHuman para Blender) | add-on | NÃO VERIFICADO | | | | | | NÃO VERIFICADO | |
| Mixamo | personagens e animações | NÃO consegui ler o FAQ oficial (HTTP 403). Resumo de busca (NÃO VERIFICADO): uso comercial permitido, sem redistribuir os arquivos brutos, sem treinar modelos de aprendizado; versão antiga de 2022 do FAQ da comunidade dizia "não" | | | | | | NÃO VERIFICADO | não serve à tarefa principal (animação própria) |
| Ready Player Me | avatares | serviço encerrado em 31/01/2026 (resumo de busca de vários sites; um relata sinais em jul/2026 de outra startup parada) | | | | | | n/a | descartar |
| VRoid / VRM | avatares estilo anime | resumo de busca (NÃO VERIFICADO): uso comercial por padrão para itens padrão sem cláusula especial; cada modelo pode ter termos próprios | | | | | | depende do modelo | estilo não combina com figura técnica |
| MB-Lab | Blender | resumo de busca (NÃO VERIFICADO): modelos gerados são AGPL-3; código GPL-3; CC0 depende de malha própria | | | | | | arriscado (AGPL) | sucessor CharMorph: código GPL-3 (busca) |
| Z-Anatomy | atlas 3D de anatomia | CC BY-SA 4.0 para "all the code and content" (README, lido) e exige atribuir BodyParts3D "CC-BY-SA 2.1 Japan" (lido); resumo de busca diz que alguns modelos têm licenças CC BY-NC | NÃO VERIFICADO | NÃO MEDIDO | sim | sim | sim | sim, mas com ShareAlike: obras derivadas teriam de sair em CC BY-SA 4.0; NÃO consegui avaliar o efeito sobre o resto do app | |
| BodyParts3D | malhas anatômicas | CC BY 4.0 segundo o README atual (lido: "The license for this database is specified in the Creative Commons Attribution 4.0 International"; atualização 27/02/2025). Versões antigas e o Z-Anatomy citam CC BY-SA 2.1 Japão | NÃO VERIFICADO | NÃO MEDIDO | sim | sim | sim | sim, com atribuição, conforme a versão baixada | a licença depende da versão do arquivo usado |
| OpenSim (opensim-core) | simulação musculoesquelética | Apache-2.0 (README do GitHub, lido via WebFetch) | NÃO VERIFICADO (a página não informou) | n/a (C++, não JS) | n/a | n/a | n/a | sim (código); a licença de cada modelo de corpo é separada e NÃO foi verificada | busca sobre modelos de agachamento/supino não achou licença clara (Gait2392, Rajagopal etc.: NÃO VERIFICADO) |
| AnyBody | simulador musculoesquelético | fechado (conhecimento prévio, NÃO LIDO nesta sessão) | | | | | | NÃO VERIFICADO | |
| músculo paramétrico / position based muscles / implicit skinning | técnicas da literatura | NÃO PESQUISADO a fundo; sem código JS aberto localizado | | | | | | NÃO VERIFICADO | uma ideia simples e reaproveitável: elipsoide/capsula achatada que engorda ao encurtar, conservando volume (de conhecimento geral; sem fonte lida) |

---

## D. Dados abertos de captura de movimento

O objetivo é só medir ângulos e tempos, não usar como animação.

| item | o que é | licença (onde li) | versão | contém os exercícios? | offline | serve para app comercial? | observação |
|---|---|---|---|---|---|---|---|
| CMU Graphics Lab MoCap | ~2.500 trechos de captura, domínio geral | site oficial não abriu (503). Resumo de busca (NÃO VERIFICADO): "grátis para pesquisa"; produtos que incluam os dados podem ser vendidos, mas os dados não podem ser revendidos nem convertidos e revendidos. Conversão FBX do 4TU.nl está em CC BY-NC 4.0 (resumo de busca) | n/a | NÃO VERIFICADO (não consegui abrir o índice de ações) | | NÃO VERIFICADO | confirmar o texto oficial antes de qualquer uso |
| AMASS | 15 conjuntos de mocap unificados em SMPL; mais de 40 horas, 300+ sujeitos, 11.000+ movimentos (página, lida) | licença lida: só pesquisa científica, educação ou projetos artísticos não comerciais; "any use for commercial purposes is prohibited"; também proíbe treinar métodos para uso comercial | n/a | NÃO VERIFICADO | | NÃO | contato para licença comercial: endereço na página de licença do conjunto (página de licença) |
| Human3.6M | captura de atividades cotidianas | NÃO abriu (redirecionamento) | | NÃO VERIFICADO | | NÃO VERIFICADO | |
| Fit3D (AIFit, CVPR 2021) | 37 exercícios repetidos, vários sujeitos, 4 câmeras, mocap com marcadores (página e busca) | NÃO li a licença (/legal); acesso passa por login/download | n/a | página não lista os exercícios; NÃO VERIFICADO se há agachamento, supino, puxada, flexão | | NÃO VERIFICADO | busca diz 611 sequências, 13 sujeitos |
| FLAG3D | 180 mil sequências, 60 categorias de exercício | por resumo de busca (NÃO VERIFICADO; PDF baixado sem texto legível): acordo assinado, só pesquisa científica, uso comercial e redistribuição proibidos, assinatura de orientador de instituição | n/a | NÃO VERIFICADO | | NÃO | |
| EC3D | 3 exercícios (agachamento, avanço, prancha) por busca; repositório lido: "3 different physical exercises", sem nomear | repositório sem arquivo LICENSE (lido); dados em Google Drive sem termos declarados | n/a | agachamento: sim (busca; NÃO VERIFICADO no repositório); 132 sequências de agachamento por busca | | NÃO VERIFICADO; sem licença declarada, tratar como sem permissão | 4 sujeitos por busca |
| Kinetics e conjuntos de pose em vídeo | vídeos de ações | NÃO PESQUISADO | | | | NÃO VERIFICADO | |
| agachamento/supino em Zenodo/SimTK | | busca encontrou projeto SimTK ARED (agachamento na ISS), licença NÃO lida | | | | NÃO VERIFICADO | |

---

## E. Desempenho do SVG em celular

Não achei benchmark público recente e controlado de celular que compare SVG e Canvas por número de formas, nem de troca de `innerHTML` a 30 a 60 fps. O que existe, com data:

| item | fonte e data | o que diz | status |
|---|---|---|---|
| SVG × Canvas por número de objetos | Smus, 19/01/2009 (SMUS) | tempo de renderização e limpeza do SVG cresce com o número de objetos; o do Canvas fica quase constante; o do Canvas cresce com a área em pixels, o do SVG não | lido (WebFetch); desktop, 2009, números não dados |
| SVG × Canvas em celular | ECharts handbook, sem data (ECHARTS) | SVG usa menos memória e rende melhor em celular para volume médio; Canvas vence com volume muito grande; SVG não faz textura nem sombra | lido (WebFetch); medições da própria biblioteca |
| ponto de perda de desempenho em grafos | Horak et al., 2018 (HORAK) | SVG e Canvas quase iguais; perda a partir de ~400 nós, ~8.000 elementos gráficos; medido em quadros por segundo durante interação, não em celular | resumo de busca, NÃO VERIFICADO |
| innerHTML × atributos | lista www-svg, nov/2009 (SVG-W3C) | o benchmark de innerHTML em Gecko comparava coisas diferentes (inserção no DOM contada só de um lado) | resumo de busca |
| trocar markup × mudar atributos por quadro | resumo de busca de 2026 (sem URL de benchmark controlado) | recomendação usual: montar a árvore uma vez e mudar atributos em `requestAnimationFrame`; NÃO achei medição direta de `innerHTML` por quadro | NÃO VERIFICADO |
| clip-path / máscara | WebKit Bugzilla 226321 e 256380 (WK-CLIP) | `clip-path` que referencia elemento SVG cai em camada + máscara repintada a cada repintura (inefici­ente) | resumo de busca |
| will-change | Mozilla Bugzilla 1535159 (MOZ-WC) | `will-change: transform` pode piorar muito a pintura em alguns casos (centenas de ms em vez de dezenas) | resumo de busca |
| pattern | NÃO ENCONTRADO | sem fonte localizada sobre custo de `<pattern>` | NÃO VERIFICADO |
| limite prático de nós/paths | NÃO ENCONTRADO | só o ponto ~8.000 elementos de Horak 2018 (acima) | NÃO VERIFICADO em celular |

Observação do projeto: 100 a 300 formas está abaixo do ponto reportado de ~8.000 elementos, mas essa comparação é desktop e não vale como garantia para celular simples. Medir no aparelho-alvo é a única forma segura; não medi nesta sessão.

---

## F. Vetores 2D a partir de 3D

| item | o que é | licença (onde li) | versão | tamanho min / gzip (medido?) | offline | determinístico | Worker | serve para app comercial? | observação |
|---|---|---|---|---|---|---|---|---|---|
| seen.js | renderizador 3D para SVG ou Canvas, sem dependências | Apache-2.0 (LICENSE.md do pacote, lido) | 0.2.7 | `dist/0.2.7/seen.min.js` 63.129 / 16.723 (medido) | sim | sim na geometria (NÃO testado) | só gerando string (NÃO VERIFICADO) | sim | método de ordenação não confirmado |
| Zdog | pseudo-3D em SVG/Canvas | MIT (package.json, lido) | 1.1.3 | 29.737 / 7.269 (medido) | sim | sim na geometria | só Canvas | sim | ver A.2 |
| three-svg-renderer | extrai contornos visíveis e ocultos (viewmap de arestas) a partir do three | GPLV3 (campo license do registry, lido) | 1.0.4 | unpacked 756.141; NÃO MEDIDO min/gzip | sim | NÃO VERIFICADO | NÃO VERIFICADO | NÃO sem abrir o código: GPL-3 | exige three |
| skewed | gera SVG 3D para exportar a editores vetoriais | MIT (campo license do registry, lido) | 1.1.0 | unpacked 894.551; NÃO MEDIDO | sim | NÃO VERIFICADO | NÃO VERIFICADO | sim | método de oclusão não lido |
| canvas-js-3d | 3D em Canvas com ordenação por profundidade (painter) e sombreamento plano | MIT (registry, lido) | 1.0.1 | unpacked 78.979; NÃO MEDIDO | sim | NÃO VERIFICADO | NÃO VERIFICADO | sim | só Canvas, sem SVG |
| Flat Surface Shader | triângulos iluminados em WebGL/Canvas/SVG | npm `flat-surface-shader` é um pacote de placeholder de segurança (registry); repositório espelhado não lido | | | | | | NÃO VERIFICADO | projeto legado (busca) |
| painter's algorithm, BSP, cel/toon em vetor | técnicas | n/a | | | | | | n/a | busca: o painter falha com polígonos que se interceptam, e a divisão por BSP é a saída citada (resumo de busca, NÃO VERIFICADO). Para silhueta e sombreamento cel em SVG não achei projeto específico lido |

---

## Resumo comparativo

Só fatos medidos ou lidos. Pesos de biblioteca são min / gzip de arquivos medidos; o peso do motor próprio é do código-fonte do projeto (não minificado), então não é comparável diretamente.

| opção | peso somado (medido) | licença | offline | determinístico / regressão | Worker | riscos registrados |
|---|---|---|---|---|---|---|
| Motor próprio SVG (hoje) | 0 de dependência; fonte TS de `src/engine` 367.569 bytes (gzip do fonte 80.323) | do projeto | sim | sim, comparação exata do texto | sim (string, sem DOM) | desempenho em celular simples NÃO medido; sem referência pública de limite; clip-path por referência SVG é caro no WebKit (busca) |
| Canvas 2D próprio | 0 de dependência | do projeto | sim | não garantido entre navegadores; precisaria de tolerância | sim, via OffscreenCanvas (Safari iOS 17+ completo; 16.2 a 16.7 parcial) | perde temas por CSS; reescrita do motor de saída; regressão exata deixa de valer |
| WebGL próprio | 0 de dependência (regl 28.438 gzip se usado) | do projeto (regl MIT) | sim | não bit a bit entre GPUs; AA de hardware varia | sim, via OffscreenCanvas (Safari 17+) | shaders e malha a escrever; regressão por pixel precisa de limiar ou ambiente fixo; perda de contexto em celular |
| three.js com malha | teto medido 814.239 min / 194.668 gzip (`three.module.min.js` + `three.core.min.js`); build com tree-shaking NÃO MEDIDO; mais a malha do corpo (tamanho e licença NÃO verificados) | MIT | sim | não bit a bit entre GPUs | sim | licença dos modelos de corpo é o ponto crítico (SMPL completo pago; SMPL-X não comercial; MakeHuman CC0 a confirmar; MB-Lab AGPL); regressão por pixel |
| Rive / Lottie | Lottie SVG 242.630 / 62.320 (menor variante leve: 168.394 / 46.410); Rive `canvas-lite` js 545.250 / 122.477 mais wasm 859.338 / 352.889 (total 1.404.588 / 475.366); dotLottie js 161.008 / 31.263 mais wasm 1.225.695 / 492.228 | MIT (runtimes) | sim (servir wasm) | Lottie SVG: árvore sim; Rive/dotLottie NÃO VERIFICADO | Lottie não; Rive/dotLottie NÃO VERIFICADO | animações viram arquivos feitos em outras ferramentas, não saem das regras do gerador; termos do editor da Rive NÃO lidos |

## O que não consegui conferir

- Site oficial do CMU MoCap (503 duas vezes): licença e lista de ações só por resumo de busca.
- Human3.6M (redirecionamento não seguido), página de licença do Fit3D (/legal), texto do PDF de licença do FLAG3D (não decodificado), licença do EC3D (repositório sem LICENSE), Kinetics.
- Mixamo: FAQ oficial deu 403; termos só por resumo de busca. Ready Player Me, VRoid, MB-Lab, MPFB, SMPL completo/SMPL-X: só resumo de busca.
- Tamanho minificado de Babylon.js, OGL, Spine, Theatre.js e dos pacotes sem arquivo único (closed-chain-ik, fabrik, skewed, canvas-js-3d, three-svg-renderer); build mínimo do three com tree-shaking (não instalei bundler); se `three.module.min.js` importa `three.core.min.js`.
- Versão de SMPL, MakeHuman, OpenSim e dos modelos de corpo.
- Determinismo, suporte a Worker de Rive, dotLottie, DragonBones, Spine e Theatre.
- Benchmarks de celular com datas recentes: não achei; os usados são de 2009, 2018 e sem data. Custo de `<pattern>` e limite prático de nós em celular: sem fonte. Nenhuma medição de desempenho foi feita em aparelho.
- Projetos abertos de figura humana para navegador e músculo paramétrico (seção B e C): busca específica não feita.
- Licença das especificações glTF e BVH.
- Se a licença CC BY-SA do Z-Anatomy contaminaria o app (efeito jurídico não avaliado).
- Caso de seen.js: método de ordenação por profundidade e uso em Worker não verificados.
