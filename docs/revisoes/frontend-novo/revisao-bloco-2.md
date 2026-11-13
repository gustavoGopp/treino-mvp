# Parecer: telas do TREINO e do GUIA (bloco 2)

Revisão independente, só leitura. Data: 13/11/2026.

**O que foi visto.** Todas as capturas 08* a 12* de `390-claro/` e `320-escuro/` (uma a uma), as capturas de antes em `docs/revisoes/frontend-novo/capturas/antes/390-claro/`, e o código: `src/features/treino/` (Treino.tsx, PalcoTreino.tsx, Temporizador.tsx), `src/features/guia/Guia.tsx`, `src/features/app/` (ui.tsx, Folha.tsx, icones.tsx), `src/features/programa/desenhoFora.ts` e `src/styles.css` (fora dos trechos BONECO). `npm run conferir:tokens` passou ("tudo nos tokens").

**Limites.** Não rodei o app (pedido: sem build, e2e nem servidor). Os defeitos marcados "pelo código" não foram reproduzidos em aparelho. O `src/styles.css` estava sendo editado durante a revisão (passou de 925 para 951 linhas em 15 minutos): os números de linha do CSS são de 03:34 UTC e servem de aproximação (às 03:37 a seção do treino já estava 4 linhas abaixo); localize pelo seletor, que vai sempre escrito. Os .tsx do treino e do guia não mudaram durante a revisão.

**Estados sem captura (não avaliados a olho):** folha "Trocar só neste treino por:", cartão de texto (exercício sem animação), exercício encerrado por dor, "Séries completas" com "Próximo exercício"/"Terminar treino", drop set, aviso de segurança (`warnbox role="alert"`) na tela da série, erro ao salvar, palco carregando. Vale capturar pelo menos o aviso de segurança e o cartão de texto: os dois entram no mesmo leiaute que falha no defeito 1.

**Bloco A (grade de 8).** O conferidor passa, e as alturas de toque são 48/56/64. Ressalvas: (a) ele não olha `width` nem `font-size`, e por isso passam os ícones de 1.25rem (20 px) ao lado dos de 24, e o `font-size:1.1875rem` do `.btn`, um 9º tamanho de letra fora dos 8 tokens `--t-*`; (b) `.timeline{gap:2px}` passa pela exceção das "linhas finas", mas é espaço; (c) o princípio "o que organiza é o contraste entre as distâncias" não está aplicado na tela da série: tudo no registro está a 16 de tudo (ver cuidado 8).

---

## 1. Os 20 cuidados do bloco B

| # | Cuidado | Veredito | Evidência |
|---|---|---|---|
| 1 | Sem selo de enfeite | cumpre em parte | "consenso" carrega informação; a pílula "FIRME" do palco do guia (12*) é a respiração, mas sem contexto lê como etiqueta solta. |
| 2 | Sem rótulo redundante | cumpre em parte | No modo Erros (12b) o nome do erro aparece 3 vezes: no topo do palco, dentro do desenho e na lista. "Onde sentir" e "Erros comuns" repetem embaixo o que os modos já mostram. |
| 3 | Sem itálico solto | cumpre | Nenhum `italic` no CSS da interface. |
| 4 | Uma família de letra | cumpre | Só Geist; `tabular-nums` no `body`; nada monoespaçado. |
| 5 | Sistema de design de verdade | cumpre em parte | Tokens valem. Mas as abas dos 4 modos existem duas vezes (`.modes` e `.modos-treino`, CSS idêntico; `MODOS` duplicado em Guia.tsx e PalcoTreino.tsx), há 7 variantes de "botão-texto sublinhado" e 3 jeitos de marcar "escolhido" no mesmo cartão do guia. Colisão de classe `.meta` (defeito 3). |
| 6 | Conteúdo real em primeiro plano | cumpre em parte | Em 390 o Boneco está à vista. Em 320 o registro cobre o palco e sobra uma tira sem o Boneco (08c-2/4/5/6 em 320). |
| 7 | O principal é o maior | cumpre | Relógio no descanso, números na série, palco no guia. Ressalva: com a carga vazia, o maior elemento da tela é um travessão (08). |
| 8 | Agrupar por espaçamento | cumpre em parte | No registro tudo está a 16 (título, dica, cabeçalho da série, números, reserva, botão): não há contraste entre grupos. O agrupamento é feito por linhas (descanso: 4; "Senti algo": 8), não por distância. |
| 9 | Títulos específicos | cumpre em parte | "Exercício 1 de 6", "Série 1 de 3 · 8–12" são bons. Folhas "Por quê" e "Mais opções" são genéricas. Em 320 o "1 de 6" some do cabeçalho. |
| 10 | Uma ação principal, perto do polegar | cumpre em parte | Série e descanso: sim. Guia: a única saída ("Voltar ao treino") fica no canto de cima, numa página de ~2.750 px. Fim do descanso: "Ok" e "Preencher a série 1" disputam (09c). |
| 11 | Uma cor de destaque | cumpre | Só o vermelho do "Senti algo" e dos avisos de segurança. A inversão preta serve a "escolhido" e a "ação principal" ao mesmo tempo (08b: dois blocos pretos empilhados); é a regra da direção, registro só como observação. |
| 12 | Ícones de uma família | cumpre em parte | Lucide, traço 2. Mas dois tamanhos (24 e 20) e glifos de texto no lugar de ícone: "+" e "–" dos acordeões do guia, "›" em "Como fazer: dicas e erros ›". |
| 13 | Sem enfeite | cumpre | Sem degradê, brilho ou sombra. |
| 14 | Raio interno = externo − respiro | cumpre em parte | Só a folha segue (16 fora, 8 dentro). No cartão do guia, `.card` de raio 8 contém botões de raio 8 a 16 de distância, e a pílula "FIRME" (raio 8) a 8 do canto. |
| 15 | Contraste AA, inclusive sob luz forte | cumpre em parte | Texto passa (5,8:1 ou mais, claro e escuro, calculado pelos tokens). Não-texto falha: trilha do progresso, traços das séries e trilha do relógio têm 1,13:1 sobre o fundo; a marca da meta, 2,3:1; o preenchimento de botões secundários e chips (#E9E9E6 em #F6F6F4) some sob luz forte. Os valores-alvo da reserva ficam cinza por engano (defeito 3). |
| 16 | Quebra de linha cuidada | cumpre em parte | Títulos equilibram bem. Falham: "8–/12 CADA LADO", "descansar/1:45", "SÉRIE/2 DE 3" (320); "RIR 3–4 ·" com o ponto órfão, "1–/3 dias", "abrir/a fonte" (390). |
| 17 | Alinhamento a olho | cumpre em parte | Seta do cabeçalho do treino a 29 px da borda (a do guia, a 17); abas com o texto centrado na coluna e fora da margem de 16; linha de controles do guia solta à esquerda; notas de dor em 6+5. |
| 18 | Números tabulares | cumpre | `tabular-nums` global. Ressalva: o relógio do descanso desce ~24 px quando a linha "Série 1 salva" some aos 5 s (defeito 18). |
| 19 | Estado em toda espera e vazio | cumpre em parte | Folhas de regra têm carregando e erro com orientação. O palco só pulsa, sem erro nem prazo; com movimento reduzido vira um retângulo vazio. Carga vazia e botão principal desligado não dizem o que falta. |
| 20 | Movimento só como resposta | cumpre | Toque, folha (200 ms), barra do relógio; `prefers-reduced-motion` respeitado no palco, nas folhas e nas transições. |

---

## 2. Defeitos, em ordem de gravidade

### Bloqueia

**1. O bloco do registro cobre o guia sempre que o conteúdo passa da altura da tela.**
- Capturas: `320-escuro/08c-treino-exercicio-2.png`, `-4`, `-5`, `-6` (o Boneco some; sobra uma tira de ~60 px com o rótulo da fase, e 16 px de palco vazam dos dois lados do bloco); `320-escuro/08-treino-serie-vazia.png` (o bloco se solta e o botão principal sai da tela); `390-claro/08c-treino-exercicio-2.png` (a legenda "Duas mãos no halter…" cortada ao meio); `390-claro/09b-treino-serie-com-descanso.png` (as 4 abas e a legenda inteiras atrás do bloco: os modos somem da vista).
- O que está errado: a tela promete "o palco encolhe, nunca o registro", mas o palco tem piso (`min-height`) e o registro é `sticky` com fundo opaco. Quando a soma passa de 100dvh, a página rola e o registro fica por cima do palco, das abas e da legenda. Em 390×844 a tela 08 cabe com folga zero (palco em 146 px, piso de 144): basta a faixa do descanso, uma dica de 2 linhas ou o aviso de segurança para estourar.
- Fere: cuidados 6 e 7; regra "nada de animação improvisada" (um Boneco cortado é pior que o cartão de texto); "4 modos do guia" (09b); texto cortado.
- Causa: `styles.css` `.treino-tela{min-height:100dvh}` (≈641), `.palco-btn{…min-height:calc(var(--h48) * 3)}` (≈661) e a versão de `max-height:800px` (≈752), `.registro-bloco:not(.solto){position:sticky}` (≈677), `.palco-treino{margin:0 calc(-1 * var(--s16))}` (o vazamento lateral); `Treino.tsx:556-579` (`usePainelPreso`, limite de 75% na linha 564); as consultas são pela altura da tela (`max-height:700px`, ≈762), mas o que falta é o espaço que sobra, que depende da faixa do descanso, da dica e do aviso.
- Correção sugerida: altura fixa em grade (`height:100dvh; grid-template-rows:auto minmax(0,1fr) auto`), com o guia em `overflow:hidden` e sem `sticky`. Decidir o que some por consulta de contêiner na área do guia, não pela altura da tela: abaixo de um piso, primeiro saem a legenda e as abas; abaixo de outro, o palco vira a miniatura ao lado do nome (como era antes) em vez de ser coberto. Em paralelo, emagrecer o registro em 320 (itens 12 e 20).

### Importante

**2. Toque duplo em "Série feita" registra a série seguinte com reserva que ninguém respondeu (pelo código).**
- Capturas: `390-claro/08b-treino-serie-preenchida.png` e `09-treino-descanso.png`: "Série feita · descansar 1:45" e "Série 2 feita" ocupam exatamente o mesmo lugar (y 1528–1656).
- O que está errado: ao salvar, a tela troca para o descanso e o botão principal passa a ser "Série 2 feita", já pronto, porque a reserva da série nova nasce preenchida com a da anterior e a carga vem da sugestão. Um segundo toque em seguida grava a série 2. A linha "A seguir" mostra "2 kg × 9", mas não a reserva que vai ser gravada. Num quadro intermediário o botão é "Preencher a série 2", e o segundo toque pode cair nele.
- Fere: função "registrar série com Desfazer" (o Desfazer de 5 s passa a apontar para a série 2); a reserva alimenta a progressão.
- Causa: `Treino.tsx:641` (`useState(anteriores.at(-1)?.rir)`), `Treino.tsx:227-230` e `164-175`.
- Correção: ignorar o botão principal do descanso por ~700 ms depois de salvar; mostrar a reserva no "A seguir" ("2 kg × 9 · sobrando 2") ou pedir a reserva na própria tela do descanso; avaliar não pré-preencher a reserva.

**3. Os valores-alvo da reserva (3 e 4+) parecem desligados.**
- Capturas: `390-claro/08-treino-serie-vazia.png` e todas as 08*: "3" e "4+" em cinza (#55565A) e letra menor; "0, 1, 2" em preto.
- Causa: colisão de classe. `Treino.tsx:704` põe `meta` no chip, e `styles.css` `.meta{margin:0;font-size:var(--t-apoio);color:var(--texto-2)}` (≈680, feita para o parágrafo `.meta`) pega junto. A marca da meta (`.chip-valor.meta::after`, ≈720, `opacity:.55`) fica com 2,3:1.
- Fere: cuidados 5, 7 e 15; a meta do dia é o que a regra quer que a pessoa escolha.
- Correção: renomear para `.chip-valor.na-meta` (ou escopar `.ex-sessao .meta`) e tirar a opacidade do traço.

**4. Botão secundário desligado não parece desligado.**
- Captura: `390-claro/11-treino-mais-opcoes.png` e `320-escuro/11-…`: no exercício 1 de 6, "Anterior" está desligado e é idêntico a "Próximo" (mesmo #0E0E10).
- Causa: `.btn:disabled` (≈172) e `.btn.sec` (≈173) têm a mesma especificidade e os dois usam `!important`; o segundo vem depois e ganha.
- Fere: estados; elemento que não responde ao toque.
- Correção: `.btn.sec:disabled{color:var(--texto-2) !important;opacity:.5}` depois de `.btn.sec`, ou esconder o botão que não vale.

**5. "Próximo" cortado na borda em 320.**
- Captura: `320-escuro/11-treino-mais-opcoes.png`: os dois botões têm ~146 px e a folha só tem 272 úteis.
- Causa: `.dois{grid-template-columns:1fr 1fr}` (≈189) com `.btn{padding:… var(--s24)}`; a correção feita em `.equipamento .dois .btn` não vale aqui.
- Correção: `grid-template-columns:minmax(0,1fr) minmax(0,1fr)` e `.dois .btn{min-width:0;padding-inline:var(--s8)}` para todos.

**6. A carga não diz que é tocável, e a tela vazia não diz o que falta.**
- Capturas: `390-claro/08-treino-serie-vazia.png`, `08c-*`: um travessão de 72 px com "ESCOLHA" de 13 px pendurado; `08b`: "3 kg" sem nenhum sinal de que abre a lista. Antes era um seletor visível com seta.
- O que está errado: a lista de cargas é um `<select>` invisível por cima do número. A "Dificuldade" (08c-5) tem caixa e seta; a carga, nada. O botão principal fica desligado sem dizer se falta a carga, a reserva ou as duas.
- Fere: cuidados 19 e 5; função de escolher a carga direto na lista ficou escondida.
- Causa: `Treino.tsx:903-921`, `.com-lista select{opacity:0}` (≈704), `.valor-grande small.escolha` (≈701), `Treino.tsx:758`.
- Correção: seta (`chevron-down`) ao lado da unidade nos dois estados; vazio como "– kg" em cinza com "toque para escolher"; uma linha "Falta: carga e reserva" sob o botão, ou botão ligado que aponta o que falta.

**7. A seta do cabeçalho, colada em "1 de 6", parece "exercício anterior", mas sai do treino.**
- Capturas: todas as 08*–11* (`‹ 1 de 6`). Antes era "‹ Início".
- Fere: elemento sem função aparente; uso com uma mão (sair sem querer no meio da série).
- Causa: `Treino.tsx:182-189`. O livro (`190-194`) também ficou sem rótulo, e abaixo de 700 px de altura é o único caminho para os 4 modos.
- Correção: devolver o texto "Início" (ou trocar por ícone de casa) e separar do contador; pôr "Guia" ao lado do livro onde couber.

**8. Descanso em 320×640: a ação principal fica abaixo da dobra.**
- Captura: `320-escuro/09-treino-descanso.png` (só o topo do botão aparece, em y 625).
- Causa: `.descanso-topo{min-height:calc(var(--h48) * 3)}` (≈727 e a versão de 800 px), relógio de 6.5rem, mais "A seguir" em 3 linhas, a linha das séries e a linha do Desfazer.
- Correção: em tela baixa, tirar o piso do topo, juntar as séries feitas na linha do "A seguir" e não deixar "A seguir · série 2 de 3" quebrar.

**9. "1 3 kg × 9" lê-se "13 kg".**
- Capturas: `390-claro/09-treino-descanso.png`, `09b`, `320-escuro/09-…`.
- Causa: `Treino.tsx:144-153` (o número da série em negrito seguido de espaço) e `.series-feitas .n` (≈687). "RIR 2" e "acerto da carga" são jargão que a tela não apresenta em lugar nenhum (a pergunta visível é "Quantas ainda conseguiria?").
- Correção: "1ª" ou "Série 1:" e, no lugar de "RIR 2", "sobrando 2".

**10. "Senti algo": a consequência de cada opção não aparece, e a nota de dor fica escondida.**
- Capturas: `390-claro/10-treino-senti-algo.png`, `320-escuro/10-…`.
- O que está errado: as 4 primeiras linhas encerram o treino inteiro com um toque (`Treino.tsx:428-433`, `terminar(true)`), as 3 seguintes encerram o exercício, e nada distingue os grupos; as linhas agora se encostam (antes havia 12 px entre as caixas). Em 320 a escala de 0 a 10, o uso mais comum, fica toda abaixo da dobra sem indício de que existe. Não verifiquei se um treino encerrado por engano pode ser retomado.
- Fere: cuidado 8; segurança com uma mão.
- Causa: `Treino.tsx:971-1006`, `.opcao-ajuste` (linhas coladas).
- Correção: dois grupos separados por 24–32 com rótulo ("Pare o treino agora" / "Pare este exercício") e, depois, a nota; confirmar ou permitir desfazer o encerramento do treino.

**11. No guia, "Lateral" e "Frontal" trocam de lugar.**
- Capturas: `390-claro/12-guia-tecnica.png` (Lateral | Frontal) e `12b-guia-erros.png` (Frontal | Lateral).
- Causa: `Guia.tsx:265`, `[...new Set([vista, ...ex.views])]` põe a vista atual na frente; no modo Erros, tocar no 2º botão faz ele pular para o 1º lugar.
- Correção: ordem fixa (`ex.views` mais a vista do erro no fim, se faltar).

**12. Ir ao guia durante o descanso apaga o relógio e o aviso do fim (pelo código).**
- O que está errado: o guia aberto pelo treino não mostra o descanso em curso, e ao sair da tela do treino os bipes agendados são cancelados e a vibração não dispara. O livro do cabeçalho convida a ir ao guia justamente no descanso.
- Fere: função "descanso com temporizador".
- Causa: `Temporizador.tsx:153-168` (limpeza) e `172-180`; `Guia.tsx:295-308` não usa `useDescanso`.
- Correção: a `faixa-descanso` no cabeçalho do guia quando `de=treino`, com `useDescanso(sessao.id)` montado ali (os bipes voltam a ser agendados na montagem).

**13. A prescrição do guia não tem evidência a um toque.**
- Captura: `390-claro/12-guia-tecnica.png` ("Semana 1: 3 × 8–12 cada lado · RIR 3–4 · descanso 1:45 · fase de aprendizado").
- Causa: `Guia.tsx:425-437`; `minha.fase.regraId` existe e não é usado. "RIR" aparece aqui e no checklist sem explicação.
- Fere: regra fixa da evidência; princípio do CLAUDE.md.
- Correção: um `<PorQue>` com as regras da faixa, da reserva, do descanso e da fase, que também explique o que é a reserva.

### Acabamento

**14. Controles do cabeçalho parecem vivos atrás das folhas, mas estão inertes.** `390-claro/10`, `11`, `11b`, `11c`: a seta, o livro e o "⋯" continuam em preto pleno acima do véu e não respondem nem fecham a folha. Causa: `Folha.tsx:23-40` deixa só o "Senti algo" livre; não há estilo para `[inert]`. Correção: `.cab-treino [inert]{opacity:.35}`.

**15. Quebras de linha em 320.** "SÉRIE 1 DE 3 · 8–/12 CADA LADO" (`Treino.tsx:667-670`; a faixa precisa de `.nw`), "Série feita · descansar/1:45" (`Treino.tsx:759`), "A SEGUIR · SÉRIE/2 DE 3" (`Treino.tsx:250-252`), "por quê?" sozinho numa linha sob a pergunta da reserva (`.rir-pe`, ≈715). Cuidado 16.

**16. O rótulo da fase bate nas anotações do desenho.** `390-claro/08c-treino-exercicio-4.png` ("PUXADA · CONCÊNTRICA" encostado em "costas retas") e `320-escuro/08c-…-4.png` (sobreposto). Causa: `PalcoTreino.tsx:155` e `.palco-btn .fase-do-movimento` (≈665), sem fundo nem área reservada; antes o rótulo tinha uma placa branca. Correção: tirar o rótulo de cima do desenho (uma linha entre o palco e as abas) ou devolver a placa.

**17. Fim do descanso com controles sem sentido.** `390-claro/09c-…`: "−15 s" com o tempo já estourado só aumenta o "+0:35"; "Ok" não diz o que faz e leva ao mesmo lugar que "Preencher a série 1". Causa: `Temporizador.tsx:204-214`. Correção: no estado `acabou`, esconder os ±15 s e deixar uma ação só.

**18. O relógio se mexe 5 s depois de começar.** A linha "Série 1 salva · Desfazer" some (`Treino.tsx:105-109`, `265-275`) e o relógio, centrado no que sobra (`.descanso-topo`, ≈727), desce ~24 px. Cuidado 18. Correção: reservar a altura da linha ou ancorar o relógio em cima.

**19. Contraste de elementos gráficos.** Trilha do progresso (`.prog-treino li`, ≈655), traços das séries (`.pips li`, ≈692) e trilha do relógio (`.tbar`, ≈729) usam `--superficie-2` sobre `--fundo` (1,13:1 no claro, 1,26:1 no escuro): quase invisíveis nas capturas 08 e 09. O exercício atual e o feito só diferem por cinza e preto. Cuidado 15. Correção: `--linha` ou `--borda` para o que falta.

**20. Cabeçalho do treino desalinhado e com regras mortas.** A seta fica a 29 px da borda (no guia, a 17) e fora do centro do alvo; "1 de 6" sai em 15 px. Causa: `.app .brand > a` e `.app .brand > span` (≈112-113) têm especificidade maior que `.cab-treino .volta-inicio` (≈648) e `.cab-treino .onde-treino`, cujas `margin-left`, `display` e `font-size` não valem. Em 320 o "1 de 6" some (`@media (max-width:359px)`, ≈844).

**21. Abas dos 4 modos.** Texto centrado em colunas iguais: "Técnica" começa a 27 px da borda, fora da margem de 16, e o traço é mais largo que a palavra; "Músculos" e "Trajetória" ficam a 25 px uma da outra e "Técnica" e "Erros", a 48 (`.modos-treino`, ≈667; `.modes`, ≈400). Cuidado 17. Correção: `flex` com `gap:var(--s24)`, alinhado à margem, traço da largura do texto; uma peça só para as duas telas.

**22. Linha do tempo do guia.** `390-claro/12*`: "descida" não tem barra (`.tseg` tem a cor do próprio cartão, ≈388) e "subida" tem; o cursor passa por cima das letras ("subi|da", 12d) e sai 8 px para fora dos dois lados (`.tcur{left:var(--s8)}` contra `padding:… var(--s16)`; `Guia.tsx:216`, `- 16`). Sem `aria-hidden`: o leitor de tela lê "descida subida" soltos (`Guia.tsx:350-357`).

**23. "FIRME" sem contexto.** `Guia.tsx:344-346` e `241-244`, `.breath` (≈383): é a respiração, mas parece etiqueta. Correção: "respiração: firme" ou um ícone ao lado. Cuidado 1.

**24. Nome do erro três vezes na mesma tela.** `390-claro/12b-guia-erros.png`. Causa: `Guia.tsx:231-234`. Correção: no modo Erros, o topo do palco mostra só a fase. Cuidado 2.

**25. Legenda com duas amostras iguais.** `390-claro/12-guia-tecnica.png`: "linhas de referência" e "articulações" com o mesmo verde (#0A7C72). `Guia.tsx:499-516`. Correção: diferenciar pela forma (traço e círculo).

**26. Linha de controles do guia.** Pausar, voltar e "Lento" soltos à esquerda com o resto da linha vazio; três jeitos de marcar "escolhido" no mesmo cartão (bloco preto, traço sob a aba, negrito na lista de erros). `.controls`, `.seg` (≈391-398). Cuidados 5 e 17.

**27. Guia sem ação embaixo.** Página de ~2.750 px que termina na caixa "Segurança"; voltar ao treino exige rolar tudo de volta. `Guia.tsx:462-475`. Cuidado 10. Correção: "Voltar ao treino" preso embaixo quando `de=treino`.

**28. Texto do guia.** "setup" em inglês (`Guia.tsx:472`; a seção já se chama "Montagem"); "1–/3 dias" quebrando no travessão (`Guia.tsx:465`); "RIR 3–4 ·" com o separador órfão no fim da linha (`Guia.tsx:431-436`: pôr o " · " dentro do `.nw` do item seguinte).

**29. Folha "Por quê".** `390-claro/11b-…`: o texto interno da regra é o maior elemento da folha (`.selo-folha .regra`, ≈266) e traz "(revista no R2)", referência interna; "EVIDÊNCIA MODERADA." com ponto final num rótulo (`ui.tsx:124`); "abrir/a fonte" quebra no meio e o alvo tem ~18 px de altura (`ui.tsx:146-148`); a fonte 2 aparece como "(título não conferido). Periódico não anotado." Vale decidir se uma citação não conferida deve aparecer como fonte (princípio da evidência).

**30. Palco sem estado de erro.** `PalcoTreino.tsx:37-46`: se a ficha não chega, o palco pulsa para sempre; com movimento reduzido, é um retângulo vazio sem explicação. `PalcoTreino.tsx:142`: animação sem texto devolve `null`, sem cair no cartão de texto. `Guia.tsx:79-88`: tela em branco enquanto carrega, sem prazo nem orientação. `desenhoFora.ts` não trata `worker.onerror`. Cuidado 19.

**31. Acessibilidade no código.**
- Ao salvar a série, o botão com o foco fica `hidden` e o foco cai no corpo da página; mandar para o descanso (`Treino.tsx:164-175`, `309`).
- `Titulo` só foca ao montar: ao trocar de exercício o nome novo não é anunciado (`Treino.tsx:311`, `ui.tsx:224-236`); usar `key={x.exId}`.
- Botão principal com `disabled` sai da ordem de foco e não diz o motivo (`Treino.tsx:758`); usar `aria-disabled` com descrição.
- A faixa do descanso é um botão cujo nome é "Descanso 1:41", sem dizer que abre o relógio (`Treino.tsx:282-285`).
- O `h1` vem depois do palco e das abas no DOM: quem chega pelo foco no título passa do guia.
- No guia, nada recebe o foco ao abrir, e o SVG se chama só "Animação do exercício" (`Guia.tsx:338`; no treino, "O Boneco fazendo …").

**32. Miudezas.**
- "Calibração: Ficou pesada: na próxima série, 2 kg." com dois dois-pontos (`Treino.tsx:344-345`).
- `<div className="errbanner" />` nunca recebe `.on` (`Guia.tsx:348`); `.alca` da folha está sempre oculta.
- Notas de dor em 6+5, com sobra à direita (`390-claro/10`; `.chips-valor`, ≈240).
- Ícones de 20 e de 24 px na mesma barra (`.alerta-topo .icone`, `.ctl .icone`, `.toca`).
- Na tela invertida, a miniatura continua clara (ladrilho branco em tela preta, 09c) e uma folha aberta sai no tema normal.
- "Desmarcar tudo" ligado sem nada marcado; o checklist zera ao voltar do treino.
- Folha "Trocar só neste treino por:" tem título terminando em dois-pontos (`Treino.tsx:381`).

---

## 3. O que está bom e não deve ser mexido

- "Senti algo" no mesmo lugar em todas as capturas, inclusive por cima das folhas e no guia.
- O relógio do descanso: o maior elemento, legível de longe, e a inversão da tela no fim (não depende de cor nem de som).
- A dupla de números grandes (carga e repetições) com menos e mais de 56 px logo abaixo.
- "por quê?" e o selo "consenso" a um toque, com carregando e erro tratados na folha.
- Preto e branco com o vermelho só na segurança; nenhuma sombra ou degradê.
- A confirmação de "Terminar o treino agora?" com "Continuar treinando" como ação principal.
- Áreas de toque: todos os controles conferidos têm 48 px ou mais (a exceção é o link "abrir a fonte").
- `prefers-reduced-motion`: palco começa parado, folha sem animação, transições desligadas.
- Nenhuma função da lista sumiu: Desfazer (5 s e no "⋯"), temporizador, alternativa depois do "Senti algo", trocar, 4 modos, cartão de texto e terminar estão no código. As ressalvas são de descoberta (itens 6 e 7) e de leiaute (item 1).
