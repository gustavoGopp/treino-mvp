# Parecer: Início e folhas, Fim do treino, Semana e Evolução

Revisão independente, só leitura. Vi uma a uma todas as capturas 06*, 07, 13*, 14* e 15* de `depois/390-claro` e `depois/320-escuro`, os dois extras (`inicio-folha-avisos.png`, `semana-sem-treino.png`) nos dois tamanhos, parte de `390-escuro` e `320-claro`, e o "antes" de 390-claro para comparar. Depois li `Programa.tsx`, `ComoLer.tsx`, `ComoEsta.tsx`, `Prefiro.tsx`, `Miniatura.tsx`, `CartaoTexto.tsx`, `Resumo.tsx`, `Semana.tsx`, `SemanaLeve.tsx`, `Evolucao.tsx`, `ui.tsx`, `Folha.tsx`, `icones.tsx`, `avisos.tsx` e o `styles.css` (fora os blocos do Boneco).

- `npm run conferir:tokens`: passou ("tudo nos tokens"). O script não olha tamanho de letra nem `flex-basis`, então não pega o item 31.
- Contraste de texto, calculado dos tokens: texto secundário 6,8:1 no claro e 8,2:1 no escuro; sobre a superfície cinza, 6,0:1 e 6,5:1. O texto passa em AA nos dois temas. O problema de contraste está nos elementos que não são texto (item 13).
- Nenhuma função da lista sumiu em relação ao "antes" (ver o fim da seção 2).
- "Pelo código" marca o que não aparece em nenhuma captura.
- Não achei defeito que bloqueie nas capturas. O item 1 é o candidato mais forte e precisa de uma captura a 360 px para confirmar.

---

## 1. Os 20 cuidados do bloco B

| # | Cuidado | Situação | Evidência |
|---|---|---|---|
| 1 | Selo só com informação | cumpre em parte | O selo carrega o nível de evidência, mas também aparece em frases que não afirmam nada: "09/11 a 15/11, em qualquer local **consenso**" (14), "São os termos de sempre do treino de força. **consenso**" logo abaixo de outro "consenso" (06-inteira), "Toque numa opção… **consenso**" (folha dos avisos). |
| 2 | Sem rótulo redundante | não cumpre | Nome do dia 3 vezes na 1ª tela (aba, título, botão); minutos 2 vezes; "Avisos" sobre "Ajustes possíveis"; na Semana, "1 de 3 treinos" + "1 treino nesta semana" + "Esta semana / Com treino."; "ainda não treinou nesta semana" em 9 linhas. |
| 3 | Sem itálico solto | cumpre | Nenhum itálico nas capturas; os `<i>` do código são barras sem texto. |
| 4 | Uma família de letra | cumpre | Só Geist, com números tabulares da própria letra. |
| 5 | Sistema de design de verdade | cumpre em parte | Tokens conferidos. Fora do sistema: 3 estilos de título de seção no Fim do treino, linhas de navegação com e sem seta, `.warnbox` com dois comportamentos, letra de 19 px no `.btn` fora dos 8 tamanhos. |
| 6 | Conteúdo real em primeiro plano | cumpre em parte | A 390 cabem 4 exercícios na 1ª tela; a 320×640 cabe 1 (06) ou nenhum inteiro (06c). A miniatura do Boneco caiu para 64 px. |
| 7 | O principal é o maior | cumpre em parte | Título do dia, placar e número da semana estão certos. A prescrição "3 × 8–12" é o menor texto da linha, em cinza, na lista e na folha. |
| 8 | Agrupar por espaçamento | cumpre em parte | Linhas duplas com faixa vazia de 24 px entre blocos do Início (06, 06c); última frase do "Como ler" colada na linha de baixo. |
| 9 | Títulos específicos | cumpre em parte | "Corpo todo A" com "6 exercícios" e "1 de 3 treinos" estão bons. "Avisos" é genérico e o título da aba do navegador é sempre "treino-mvp". |
| 10 | Uma ação principal perto do polegar | cumpre em parte | No Início, sim (presa embaixo). No Fim, o botão fica no fim da página e leva a uma tela que repete o que acabou de ser lido. Nas folhas, o "Fechar" fica no alto e some ao rolar. |
| 11 | Uma cor, um sentido | cumpre em parte | Nas capturas, tudo preto e branco. Pelo código, o vermelho também aparece em "Apagar este treino?" e em "Não foi possível salvar", que não são segurança física. |
| 12 | Ícones de uma família | cumpre em parte | Lucide em quase tudo. Exceções: "›" de texto na faixa da semana, "+" e "–" de texto no "Como ler", "↑" de texto nas marcas, um desenho à mão na miniatura "guia em texto". |
| 13 | Sem enfeite | cumpre | Sem degradê, sombra ou brilho. A barra solitária de "Esta semana" não informa (item 15). |
| 14 | Raio aninhado coerente | cumpre | 8 px em tudo e 16 px na folha, com respiro de 24. |
| 15 | Contraste AA | cumpre em parte | Texto passa. Bloco vazio dos treinos, trilho das barras e fundo dos botões secundários têm 1,12:1 no claro e 1,26:1 no escuro; o preenchimento "mantendo" tem 2,6:1. |
| 16 | Quebra de linha cuidada | cumpre em parte | Títulos equilibrados. A 320: "abaixo da meta. Dá / para ajustar.", "3 kg × 9 · / RIR 2", "RIR 3–4 · / descanso 1:45". A 360 o botão principal deve quebrar em colunas (item 1). |
| 17 | Alinhamento a olho | cumpre em parte | Selo centralizado no cartão "Ajustar" (06b); selo com recuo de 4 px quando cai para a linha de baixo (07); "+" sublinhado virando "±"; Início e Semana sem respiro no topo. |
| 18 | Números tabulares | cumpre | `font-variant-numeric: tabular-nums` no `body`. |
| 19 | Estado em toda espera, vazio e erro | cumpre em parte | Regras, fontes, cartão de texto e miniatura têm espera e erro. Faltam: erro em "Conferindo o programa…", orientação na Evolução vazia, ação na semana sem treino. |
| 20 | Movimento só como resposta | cumpre | Toque de 100 ms, folha de 200 ms, miniatura em espera; tudo desligado com `prefers-reduced-motion`. |

---

## 2. Defeitos, em ordem de gravidade

### Bloqueia

Nenhum confirmado em captura.

### Importante

**1. O botão "Começar o treino" deve quebrar em colunas a 360 px, com letra a 125% ou com 2 locais (pelo código e pela medida da captura).**
- Tela: Início, `06-inicio.png` (390).
- O que está errado: o botão é `inline-flex` com `gap`, e o rótulo tem 2 ou 3 filhos soltos ("Começar o treino", o `<span>` com o nome do dia, " em {local}"). Cada filho vira uma coluna que encolhe e quebra por dentro. Medi na captura: 156 + 8 + 118 px de texto, mais 48 de respiro e 32 de margem, pedem 363 px de tela. A 360 px, a largura mais comum no Android, não cabe. Com " em Casa" não cabe nem a 390. O resultado é "Começar o / treino" ao lado de "Corpo / todo A" ao lado de "em / Casa".
- Mesmo quando cabe, o `gap` de 8 px soma ao espaço e deixa um vão duplo entre "treino" e "Corpo" (visível em 06 e 06c).
- Fere: cuidados 16 e 10; uso com uma mão.
- Causa: `Programa.tsx:420-423` e `.btn{display:inline-flex;gap:var(--s8)}` em `styles.css:170`.
- Correção: pôr o rótulo inteiro num único `<span>`, para quebrar como texto corrido e centrado. Pedir uma captura a 360 px e outra com 2 locais antes de fechar.

**2. A 320×640 a lista de exercícios quase não aparece na 1ª tela.**
- Tela: Início, `320-escuro/06-inicio.png` (1 exercício) e `320-claro/06c-inicio-depois-do-1o-treino.png` (nenhum inteiro).
- O que está errado: abas (64) + rótulo + título + números + faixa da semana + aviso ocupam cerca de 430 px. Botão preso e barra de navegação ocupam mais 160 px, 25% da tela.
- Fere: cuidados 6 e 7.
- Causa: `.cartao-hoje` e `.numeros` (`styles.css:554-560`), `.acao-fixa` (189), `.nav-inferior` (300).
- Correção: em tela baixa (`max-height:700px`), tirar o bloco "6 exercícios / ~44 minutos" (os minutos já estão na aba e a contagem é a própria lista), juntar a faixa da semana e o aviso numa linha só e reduzir o respiro da `.acao-fixa` para 8.

**3. A prescrição "3 × 8–12" é o texto mais apagado da linha e da folha.**
- Tela: Início e folha do exercício, `06-inicio.png` e `07-folha-do-exercicio.png`.
- O que está errado: séries × repetições é o que a pessoa procura na academia e aparece em 15 px, peso 400, cinza. No "antes" era o maior texto do cartão. O comentário do próprio arquivo diz "séries × repetições em destaque" (`Programa.tsx:31-32`).
- Fere: cuidado 7.
- Causa: `.series` e `.ex-texto .series` em `styles.css:598-600`.
- Correção: cor `--texto`, peso 600 e tamanho `--t-corpo`; "cada lado" continua em apoio. Na folha, a prescrição em `--t-pergunta`.

**4. Linhas duplas com faixa vazia entre os blocos do Início.**
- Tela: Início, `06-inicio.png`, `06c-inicio-depois-do-1o-treino.png`, `06c-…-inteira.png`.
- O que está errado: faixa da semana, aviso, lista, "Como ler" e "Sobre o programa" têm cada um a sua linha em cima e embaixo, e o `gap` de 24 fica entre duas linhas. Em 06c são 5 linhas horizontais em 340 px, com duas faixas vazias que parecem linhas de tabela sem conteúdo. O mesmo acontece entre "Como ler" e "Sobre o programa".
- Fere: bloco A (distância em vez de divisória); cuidados 8 e 17.
- Causa: `.faixa-semana` (`styles.css:564`), `.aviso-linha` (567), `.cartoes-ex` (290), `details.box` (436), `.linha-sobre` (296), dentro de `.conteudo{gap:var(--s24)}` (120).
- Correção: cada bloco só com a linha de baixo, ou faixa da semana e aviso como itens de uma mesma lista, sem `gap` entre eles.

**5. O "+" e o "–" do "Como ler o seu treino" saem sublinhados e parecem "±" e "=".**
- Tela: Início, `06-inicio-inteira.png` (aberto) e `06c-…-inteira.png` (fechado).
- Fere: cuidados 12 e 17.
- Causa: `.dobra summary{text-decoration:underline}` (`styles.css:230`) alcança o `summary::after` (439-440).
- Correção: sublinhar só o texto (um `<span>` dentro do `summary`) e trocar os caracteres pelos ícones `plus` e `minus`, que já existem em `icones.tsx`.

**6. A legenda da Semana fala em "traço tracejado", mas o traço é contínuo.**
- Tela: Semana, `14-semana-inteira.png`. No "antes" era tracejado.
- Fere: texto que descreve errado o desenho; cuidado 17.
- Causa: `Semana.tsx:146` e `.m-barra u` em `styles.css:836`.
- Correção: mudar o texto para "o traço é a meta" ou desenhar o tracejado. Aproveitar para subir a legenda para antes da lista: hoje ela vem depois de 10 linhas.

**7. "ainda não treinou nesta semana" repetido em toda linha de músculo.**
- Tela: Semana, `14-semana.png` (9 de 10 linhas) e `semana-sem-treino.png` (10 de 10).
- O que está errado: a frase não acrescenta nada ao "0 de 6" e dobra a altura da lista. Na 1ª semana, a tela é um paredão da mesma frase.
- Fere: cuidado 2; estado vazio (19).
- Causa: `Semana.tsx:135-138` (`TEXTO_ESTADO['sem-treino']`).
- Correção: não mostrar o estado quando `feitas === 0`. Com zero treinos, uma frase só acima da lista.

**8. "Fechar" some ao rolar a folha e fica longe do polegar.**
- Tela: todas as folhas, `06b`, `07`, `inicio-folha-avisos.png`.
- O que está errado: o cabeçalho rola junto com o conteúdo. Em "Sobre o programa" (resumo, fase, avaliação, avisos, fases, porquês, tabela), quem leu até o fim precisa voltar ao topo ou acertar os 12% de véu no alto da tela. Não há gesto de arrastar.
- Fere: uso com uma mão; cuidado 10.
- Causa: `.folha-cab` sem `position:sticky` (`styles.css:282-285`), `Folha.tsx:120-127`.
- Correção: cabeçalho preso no topo da folha, com fundo `--fundo`, e um "Fechar" no fim das folhas longas.

**9. Um toque numa linha de texto gera o programa de novo, sem confirmar e sem desfazer.**
- Tela: folha dos avisos, `inicio-folha-avisos.png`.
- O que está errado: as 4 opções parecem parágrafos (sem seta, sem fundo). Tocar em qualquer uma troca dias, minutos ou prioridades e fecha a folha na hora; sobra só a frase "Programa gerado de novo".
- Fere: cuidado 10; uso com uma mão (toque sem querer).
- Causa: `Programa.tsx:94-119` (`escolher`) e `512-531` (`Ajustes`); `.opcao-ajuste` em `styles.css:612`.
- Correção: seta à direita em cada linha e um passo de confirmação, ou "Desfazer" ao lado da mensagem.

**10. Selo centralizado e "Ajustar:" numa linha própria no cartão de "Como está o seu programa".**
- Tela: folha "Sobre o programa", `06b-inicio-sobre-o-programa.png` (claro e escuro). Já era assim no "antes".
- O que está errado: `.warnbox` empilha os filhos em coluna. O `<b>`, o texto e o botão do selo viram 3 linhas, e o botão estica na largura toda com o texto centrado. Na lista "Limite", logo abaixo, o mesmo conteúdo sai corrido.
- Pelo código, a tela "Programa pausado" tem o mesmo defeito: texto solto mais selo dentro de `.warnbox.seguranca`.
- Fere: cuidados 17 e 5.
- Causa: `ComoEsta.tsx:55-60`, `Programa.tsx:70-80`, `.warnbox{display:flex;flex-direction:column}` em `styles.css:145`.
- Correção: envolver o conteúdo num `<p>`, como já fazem `SemanaLeve.tsx:21` e `Resumo.tsx:173`.

**11. O título do documento é sempre "treino-mvp".**
- Tela: todas (pelo código).
- O que está errado: `index.html:11` fixa o `<title>` e nada em `src/` muda `document.title`. Leitor de tela, histórico e multitarefa não distinguem as telas.
- Fere: acessibilidade (WCAG 2.4.2).
- Correção: em `Titulo` (`ui.tsx:224-236`), definir `document.title` com o texto do título e o nome do app.

**12. Início e Semana começam colados no topo da tela.**
- Tela: `06-inicio.png` (as abas encostam em y=0) e `14-semana.png` (o "A sua semana" encosta na borda). O Fim tem 32 px e a Evolução tem o cabeçalho.
- Fere: bloco A (margens da tela); cuidado 17.
- Causa: `.wrap` sem respiro em cima (`styles.css:99`), `Topo` devolve `null` (`ui.tsx:170`), só `.fim-do-treino` tem `padding-top` (562). Não há `env(safe-area-inset-top)`, embora o `index.html` use `viewport-fit=cover`.
- Correção: `padding-top:max(var(--s16),env(safe-area-inset-top))` em `.wrap.com-nav > main`.

**13. Blocos vazios, trilhos e botões secundários quase somem do fundo.**
- Tela: Semana e Fim, `14-semana.png`, `semana-sem-treino.png`, `13-fim-do-treino.png`, nos dois temas.
- O que está errado: `--superficie-2` sobre `--fundo` dá 1,12:1 no claro e 1,26:1 no escuro. Os treinos "a fazer", o trilho das barras de músculo e o contorno de "Ver", "leve / normal / pesado demais" e das abas não escolhidas dependem disso. O preenchimento "mantendo" (opacidade .4) tem 2,6:1.
- Fere: cuidado 15 (luz forte da academia); WCAG 1.4.11.
- Causa: `.pontos i` (`styles.css:825`), `.m-barra` (832), `.m-mantendo .m-barra i` (835), `.btn.sec` (173), tokens da linha 12.
- Correção: contorno interno de 1 px em `--borda` (4,2:1) nos blocos vazios e no trilho; escurecer `--superficie-2` ou dar o mesmo contorno aos botões secundários; diferenciar "mantendo" por padrão ou altura, não só por opacidade.

**14. O aviso de instalar no iPhone entra antes da lista, fora da fila de avisos (pelo código).**
- Tela: Início no Safari do iPhone, até a pessoa tocar em "Entendi".
- O que está errado: título, parágrafo, 3 passos, ajuda e botão (cerca de 350 px) ficam entre o aviso e a lista. Na 1ª tela do aparelho-alvo não sobra exercício nenhum, e o código promete "uma mensagem por vez" (`Programa.tsx:146-148`).
- Fere: cuidados 6 e 7.
- Causa: `Programa.tsx:375` e `avisos.tsx:38-72`.
- Correção: pôr o aviso na fila (uma linha com "Ver") ou depois da lista.

**15. A seção "Esta semana" da Semana não informa nada.**
- Tela: Semana, `14-semana.png`.
- O que está errado: um título, uma barra preta de 48 px e "Com treino.", logo abaixo de "1 de 3 treinos", dos blocos e de "1 treino nesta semana".
- Fere: cuidados 2 e 13; elemento sem função aparente.
- Causa: `Semana.tsx:75-91`, `.semanas` em `styles.css:839-841`.
- Correção: mostrar a faixa das semanas só com 2 semanas ou mais.

**16. O botão principal do Fim leva a uma tela que repete o que acabou de ser lido, e fica abaixo da dobra.**
- Tela: Fim do treino, `13-fim-do-treino.png` e `320-escuro/13-fim-do-treino.png`.
- O que está errado: "A sua semana ▮▯▯ 1 de 3" e a mensagem são os mesmos do topo da Semana. O botão vem depois de tudo; a 320 está a mais de uma tela de distância.
- Fere: cuidados 10 e 2.
- Causa: `Resumo.tsx:94-105` e `165-170`.
- Correção: prender a ação embaixo com `.acao-fixa` e decidir com o Gustavo qual é a principal ("Voltar ao início" parece mais natural). Na Semana, rolar até "Séries por músculo" quando a pessoa vem do Fim.

**17. Fim por segurança: o "192" não é tocável e o placar domina o aviso (pelo código).**
- Tela: Fim do treino com `encerradaPorAlerta`.
- O que está errado: o aviso do SAMU é uma caixa de texto com "192" em negrito. Abaixo vêm o placar em 72 px, "Hoje foi" e "Ver a sua semana", como num treino normal.
- Fere: segurança; cuidado 7.
- Causa: `Resumo.tsx:68-90`.
- Correção: `<a href="tel:192">` como botão de 56 px e, nesse estado, tirar ou reduzir o placar, o "Hoje foi" e a progressão.

**18. Confirmar "apagar este treino": o foco se perde e o vermelho é usado fora da segurança (pelo código).**
- Tela: Fim do treino.
- O que está errado: o botão tocado some e dá lugar a uma caixa com `role="alert"`; o foco cai no `body`. Por ser `role="alert"`, a caixa ganha o fundo vermelho da segurança para uma ação de dados.
- Fere: acessibilidade (ordem de foco, uso do `role`); cuidado 11.
- Causa: `Resumo.tsx:171-196` e `.warnbox[role="alert"]` em `styles.css:148-149`.
- Correção: usar a `Folha`, que já cuida do foco, ou `role="group"` com rótulo e foco em "Manter". Sem vermelho.

**19. Links das alternativas com menos de 44 px (pelo código).**
- Tela: folha do exercício, abaixo da dobra (não aparece em 07).
- O que está errado: "Se o equipamento estiver ocupado: a, b ou c." são links dentro de um parágrafo, com cerca de 22 px de altura e separados por vírgula.
- Fere: área de toque de 44 px ou mais.
- Causa: `Programa.tsx:740-768`; não existe regra CSS para `.alternativas a`.
- Correção: uma linha de 48 px por alternativa, com seta, no estilo de `.linhas-dados`.

**20. Trocar e preferir ficam no fim da folha, depois de todo o "Por que este exercício".**
- Tela: folha do exercício, `07-folha-do-exercicio.png`. A 320 são mais de 2 telas de rolagem.
- Fere: uso com uma mão; cuidado 10.
- Causa: ordem dos blocos em `Programa.tsx:601-615`.
- Correção: ordem prescrição, "Ver como fazer", alternativas e "Prefiro", evolução, e só então o porquê.

**21. "Preferência salva" aparece atrás da folha (pelo código).**
- Tela: folha do exercício, ao tocar em "Prefiro…".
- O que está errado: a mensagem vai para o `<p role="status">` da página, que está sob o véu e inerte. Quem enxerga não a vê e o leitor de tela pode não anunciar.
- Fere: estado de resposta (19); acessibilidade.
- Causa: `Programa.tsx:133-136` e `371-373`.
- Correção: um `role="status"` dentro da folha, junto dos botões.

**22. Jargão sem explicação à mão, para uma persona iniciante.**
- Telas e capturas:
  - Fim (13): "Calibrar · próxima: 2 kg".
  - Evolução (15): "ACERTO DA CARGA" e "RIR 2". É o mesmo conceito de "Calibrar", com outro nome; o "Como ler" usa um terceiro ("o app ajusta a carga").
  - Sobre o programa (06b): "volume no mínimo, RIR 3–4 e sem superséries", "Foco abaixo da meta".
  - Folha do exercício (07): "Multiarticular", "perto da falha", e parênteses aninhados em "(como agachamento livre com barra (profundo))".
- Fere: jargão sem explicação; pt-BR claro.
- Causa: `Resumo.tsx:18-27`, `Evolucao.tsx:43-46`, textos de `fase.texto` e `x.porque`.
- Correção: um nome só para a 1ª série de acerto, com uma frase na Evolução ("1ª vez: série para acertar a carga; não conta como marca"); "RIR" por extenso fora do Início ("2 de reserva"); revisar os textos das fases.

**23. "Conferindo o programa…" não tem estado de erro (pelo código).**
- Tela: folha "Sobre o programa".
- O que está errado: o `import()` do avaliador não trata falha. Sem rede, ou com versão nova publicada, a frase fica para sempre.
- Fere: cuidado 19 (inclui o uso sem rede).
- Causa: `ComoEsta.tsx:21-30`.
- Correção: tratar a falha com mensagem e "Tentar de novo", como em `CartaoTexto.tsx:38-56`.

### Acabamento

**24. Selos em frases que não afirmam nada, e dois selos iguais em linhas seguidas.**
- Tela: `06-inicio-inteira.png` (fim do "Como ler"), `14-semana.png` (ao lado das datas), `inicio-folha-avisos.png`, `15-evolucao.png`.
- Fere: cuidados 1 e 2.
- Causa: `ComoLer.tsx:48-50`, `Semana.tsx:61-63`, `Programa.tsx:516-518`, `Evolucao.tsx:29-31`.
- Correção: tirar a frase "São os termos de sempre…" e levar o selo `treino.leitura` para o título; na Semana, pôr o selo na regra (a mensagem), não na data. Decisão do Gustavo, porque esbarra no princípio da evidência.

**25. Fim do "Como ler" sem respiro.**
- Tela: `06-inicio-inteira.png`.
- O que está errado: a última frase encosta na última definição (0 px) e na linha de baixo.
- Fere: bloco A; cuidado 8.
- Causa: `.como-ler dl` (`styles.css:870`) e `details.box{padding:0}` (436).
- Correção: `gap` de 16 entre a lista e a frase e `padding-bottom` de 16 no `details` aberto.

**26. Folha "Avisos" com dois títulos.**
- Tela: `inicio-folha-avisos.png`: "Avisos" e, logo abaixo, "Ajustes possíveis".
- Fere: cuidados 2 e 9.
- Causa: `Programa.tsx:361` e `515`.
- Correção: com um aviso só, o título da folha é o do bloco.

**27. Botão "Ver" sem contexto para o leitor de tela (pelo código).**
- Causa: `Programa.tsx:349-351`.
- Correção: `aria-label` com o texto do aviso ("Ver ajustes possíveis") ou `aria-describedby` apontando para a linha.

**28. Quebras ruins a 320.**
- `320-escuro/15-evolucao.png`: "3 kg × 9 ·" e "RIR 2" na linha de baixo, com o ponto órfão. Causa: `Evolucao.tsx:43`, `.pontos-evolucao li` em `styles.css:845`. Correção: o `<small>` em bloco e sem o " · " abaixo de 360 px.
- `320-escuro/07-folha-do-exercicio.png`: "RIR 3–4 ·" e "descanso 1:45". Causa: `Programa.tsx:580-584`. Correção: cada dado num `<span class="nw">` e o separador só entre itens da mesma linha.
- `320-escuro/06-inicio.png`: "abaixo da meta. Dá / para ajustar.". Causa: `.aviso-linha p` (`styles.css:568`). Correção: `text-wrap:balance`.
- Fere: cuidado 16.

**29. Selo com recuo de 4 px quando cai sozinho na linha de baixo.**
- Tela: `07-folha-do-exercicio.png` ("moderada" e "consenso" começam 4 px à direita do texto).
- Fere: cuidado 17.
- Causa: `.selo{padding:0 var(--s4)}` em `styles.css:261`.
- Correção: `padding:0` (a área de toque já vem do `::after`) e o espaço antes do selo como espaço de texto.

**30. Ícones fora da família.**
- "›" de texto na faixa da semana, menor e mais fino que as setas da lista logo abaixo (`06c`): `Semana.tsx:40-42`.
- Desenho à mão na miniatura "guia em texto" (`06c-…-inteira`, exercício 6): `Miniatura.tsx:19-22`; existe `file-text` em `icones.tsx`.
- "↑" de texto nas marcas: `styles.css:808`; existe `arrow-up`.
- Fere: cuidado 12.

**31. Três estilos de título de seção no Fim, e letra de 19 px fora da escala.**
- Tela: `13-fim-do-treino.png`: "O QUE MUDOU HOJE" e "HOJE FOI: (OPCIONAL)" como rótulo de 13 px, "Para a próxima vez" em 20 px, para três seções irmãs.
- Fere: cuidado 5.
- Causa: `.mudou h2` (`styles.css:802`), `.hoje-foi legend` (813), `.secao` (126); `.btn{font-size:1.1875rem}` (170) não é nenhum dos 8 tamanhos.
- Correção: um estilo só para as três; o `.btn` em `--t-pergunta` ou `--t-corpo`.

**32. "Hoje foi: (opcional)" e "Nada vem marcado."**
- Tela: `13-fim-do-treino.png`. Em maiúsculas vira "HOJE FOI: (OPCIONAL)", com dois-pontos e parênteses; a frase de baixo descreve o que a pessoa já vê.
- Fere: cuidado 2.
- Causa: `Resumo.tsx:128` e `136-141`.
- Correção: "Como foi hoje? Opcional" e só o "por quê?".

**33. Semana sem treino: orientação sem ação.**
- Tela: `semana-sem-treino.png`: "Nova semana. O próximo treino é o Corpo todo A.", sem link para o treino. Para quem nunca treinou, "Nova semana" não é o caso.
- Fere: cuidado 19.
- Causa: `Semana.tsx:66-72` (a mensagem vem do domínio).
- Correção: um link "Ir para o Corpo todo A" e mensagem própria para o 1º uso.

**34. Evolução: vazio sem orientação e "voltar" que nem sempre volta.**
- Pelo código: "Ainda não há treino registrado deste exercício." não diz o que fazer (`Evolucao.tsx:32`).
- `15-evolucao.png`: "‹ Semana" vai sempre para a Semana, mesmo para quem veio da folha do exercício no Início (`Programa.tsx:612`); a barra acende "Semana" (`Evolucao.tsx:26`).
- Com um único ponto de acerto, a tela é uma linha e muito vazio.
- Correção: guardar a origem na rota (`?de=programa`) e completar o vazio com "Ela aparece depois do 1º treino com este exercício".

**35. "Sua evolução" na Semana: linhas sem seta e sem dado.**
- Tela: `14-semana-inteira.png`: só o nome do exercício, sem a seta das outras linhas de navegação e sem a última série.
- Fere: cuidado 5.
- Causa: `Semana.tsx:177-183`, `.lista-evolucao a` em `styles.css:844`.
- Correção: usar o padrão de `.linhas-dados`, com a última série à direita e a seta.

**36. Tabela "Séries por músculo" do "Sobre": cabeçalho à esquerda e números à direita (pelo código).**
- Fere: cuidado 17.
- Causa: `.vol th,.vol td{text-align:left}` seguido de `.vol td{text-align:right}` em `styles.css:461-462`.
- Correção: `th[scope="col"]:not(:first-child){text-align:right}`.

**37. "Sobre o programa": linha solta e conteúdo repetido.**
- `06b`: "**Corpo todo A/B/C.**" sozinho, em negrito e com ponto final, sem dizer que é a divisão. "3X POR SEMANA" (o "x" vira "X" nas maiúsculas).
- Pelo código: o que ficou abaixo da meta aparece em "Como está o seu programa", de novo em "Avisos" e de novo na tabela, na mesma folha, além da linha do Início e da folha dos avisos.
- Fere: cuidado 2.
- Causa: `Programa.tsx:650-675`.
- Correção: "Divisão: corpo todo, 3 treinos (A, B e C)"; "3 vezes por semana"; uma só lista de pendências, com a tabela como detalhe.

**38. Dois sentidos de "semana" na mesma tela.**
- Tela: `06c`: "SEMANA 1" (a do programa) logo acima de "A sua semana 1 de 3" (a do calendário).
- Causa: `Programa.tsx:291`.
- Correção: "Semana 1 do programa".

**39. Depois do 1º treino, as abas não mostram qual dia já foi feito.**
- Tela: `06c`: quem enxerga só vê "1 de 3"; o nome de cada treino feito existe só no `aria-label` dos blocos (`Semana.tsx:23`).
- Correção: o ícone `check` na aba do dia feito na semana.

**40. Abas: `aria-controls` aponta para painéis que não existem; a ação principal é a última no foco (pelo código).**
- Só o painel do dia escolhido é desenhado (`Programa.tsx:245-271` e `377`). "Começar o treino" vem depois de "Como ler" e "Sobre" na ordem do DOM (`Programa.tsx:413-425`).
- Correção: `aria-controls` só na aba escolhida; avaliar subir a ação no DOM, mantendo a posição visual.

**41. O corte da lista sob o botão preso parece falha de desenho.**
- Tela: `06-inicio.png`: "Flexão de joelho" cortado ao meio, sem nada que marque a borda da área presa.
- Causa: `.acao-fixa` em `styles.css:189`.
- Correção: uma linha de 1 px em `--linha` no topo da `.acao-fixa`.

**42. Miniatura do Boneco a 64 px na lista (só o tamanho da moldura; o desenho está fora da revisão).**
- Tela: `06-inicio.png`: a 64×48 a figura mal se lê; no "antes" tinha cerca de 96 px.
- Fere: cuidado 6.
- Causa: `.cartao-ex-corpo .miniatura{width:4rem}` em `styles.css:584`.
- Correção: 5 rem a partir de 360 px, tirando a coluna do número (a ordem já é a da lista).

### Funções conferidas contra o "antes"

Todas presentes:

- Escolher o dia (abas) e começar o treino: nas capturas.
- "Onde vou treinar hoje?": pelo código, `Programa.tsx:305-335`.
- Alternativas e "Prefiro": pelo código, no fim da folha do exercício.
- Ajustes possíveis: linha "Ver" que abre a folha; "Ver ajustes possíveis" no "Sobre" quando recolhido.
- "Como ler o seu treino": nas capturas.
- Fases e porquês: pelo código, no "Sobre", abaixo da dobra.
- Semana leve: na fila do Início, no Fim e na Semana.
- "Hoje foi", com desmarcar ao tocar de novo, e apagar o treino: nas capturas.
- Séries por músculo: na Semana e na tabela do "Sobre".
- "O que subiu nesta semana": pelo código, só quando há marca.
- Evolução por exercício: nas capturas.

O que mudou e merece atenção: o traço da meta deixou de ser tracejado (item 6) e a prescrição perdeu o destaque (item 3). O atalho "Início" no alto do Fim saiu, mas "Voltar ao início" continua.

---

## 3. O que está bom e não deve ser mexido

- A direção preta e branca está limpa nas capturas e o texto secundário passa em AA nos dois temas.
- O placar do Fim e o "1 de 3 treinos" da Semana: o número é o maior elemento, com rótulo pequeno embaixo.
- As abas A/B/C: 64 px, com os minutos de cada dia, setas do teclado, e o prefixo comum ("Corpo todo") fica só para o leitor de tela.
- A ação principal do Início presa embaixo, acima da barra, e o `scroll-padding` que impede o foco de ficar escondido.
- A `Folha`: foco no título, Esc, Tab que dá a volta, resto da página inerte, foco devolvido a quem abriu.
- O selo: palavra discreta com área de toque de 48 px por fora, nome acessível completo, espera e erro na folha das fontes.
- A área de toque: tudo o que vi tem 48 px ou mais, fora os links das alternativas (item 19).
- `prefers-reduced-motion` respeitado; números tabulares em tudo.
- O 320 escuro: nada estoura, nada some, e as inversões funcionam.
- A lista de exercícios em linhas finas, sem cartão em volta, e a confirmação antes de apagar o treino.
