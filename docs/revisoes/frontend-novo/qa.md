# Frontend novo: conferência final (13/11/2026)

> Direção B2 ("Placar"), escolhida pelo Gustavo em 12/11/2026. Tudo abaixo foi medido no build de produção servido em `localhost:4173`, com a persona fictícia Ana (`tests/personas/`). Capturas: `capturas/antes/` e `capturas/depois/` (390 e 320 px, claro e escuro) e as 6 folhas de `capturas/antes-depois/`. O parecer do revisor independente está em `revisao-bloco-2.md`.

## 1. Critério de pronto

| Critério | Resultado | Como conferir |
|---|---|---|
| Todas as telas no padrão novo | Sim: cadastro (5 passos), início e folhas, treino, descanso, guia, fim do treino, semana, evolução, Meus dados, locais, termos e tela de erro | `capturas/antes-depois/1-cadastro.png` a `6-dados-locais-termos.png` |
| `npm run check` | Limpo: lint, tipos e **896** testes (também depois da 2ª rodada de revisão) | `npm run check` |
| `npm run test:e2e` | **157** testes (155 de celular e 2 do motor). A última rodada passou inteira. Em 4 rodadas do comando completo no estado final, 2 passaram inteiras e 2 tiveram a mesma falha única: "o cartão de texto que não baixou avisa…" (`correcoes-auditoria.spec.ts`), que espera 5 s pela tela depois de recarregar. O mesmo teste passou em 4 rodadas só do celular e em 15 repetições sozinho, 12 delas em paralelo; a falha só apareceu com os testes do motor rodando junto. Não achei a causa; fica no backlog | `npm run test:e2e -- --trace off` |
| `npm run conferir:tokens` | "tudo nos tokens": nenhuma exceção além do desenho do Boneco (os blocos entre `BONECO:INICIO` e `BONECO:FIM`) | `npm run conferir:tokens` |
| Motor e domínio intactos | `git diff origin/main -- src/engine src/domain` vazio (0 linhas); `tests/motor/` passa sem regravar linha de base | o comando ao lado |
| Console sem erros | 0 erros em todas as telas abertas pela ferramenta `olhar.mjs` (início, treino, guia, semana, locais, Meus dados, em 390, 320, 206 px e tablet) | `node scripts/design/frontend-novo/olhar.mjs` |
| Claro e escuro, 320, 390 e tablet | Conferidos a olho nas capturas; 768 × 1024 conferido no início, treino, guia e semana | `capturas/depois/` |
| Letra a 125% e zoom de 200% | Conferidos pelos cenários do e2e (`cenarios.spec.ts`: toque, contraste, texto cortado e foco coberto em 8 cenários × 6 grupos de telas) | `npx playwright test tests/e2e/cenarios.spec.ts` |
| `prefers-reduced-motion` | O Boneco começa parado, a folha abre sem animação, as transições saem | `PARADO=1 node scripts/design/frontend-novo/olhar.mjs …` e o teste da folha em `correcoes-auditoria.spec.ts` |

Nenhum teste foi apagado nem pulado. Os testes mudados conferem a mesma coisa com o nome novo do controle (lista na seção 4).

## 2. Os 20 cuidados, por grupo de telas

Legenda: **sim** cumpre; **em parte** cumpre com a ressalva escrita; nenhum ficou em "não".

| # | Cuidado | Cadastro | Início e folhas | Treino e descanso | Guia | Fim, semana, evolução | Dados, locais, termos, erro |
|---|---|---|---|---|---|---|---|
| 1 | Sem selo de enfeite | sim | sim (o selo é o nível de evidência) | sim | em parte: a etiqueta "FIRME" (respiração) vem do motor e não se explica (pedido 5) | sim | sim |
| 2 | Sem rótulo redundante | sim (a folha da foto perdeu o título repetido) | sim | sim | em parte: no modo Erros o nome do erro aparece no desenho e na lista (saiu do topo do palco) | sim | em parte: na tela de erro, o título "Avisar o problema" e o botão "Avisar um problema" |
| 3 | Sem itálico solto | sim | sim | sim | sim | sim | sim |
| 4 | Uma família de letra | sim: só Geist, com números tabulares | sim | sim | sim | sim | sim |
| 5 | Sistema de design de verdade | sim | sim | em parte: os 4 modos têm um CSS só, mas a lista `MODOS` existe no treino e no guia | em parte: 3 jeitos de marcar "escolhido" no mesmo cartão (bloco preto nas vistas, traço nas abas, negrito na lista de erros) | sim | sim |
| 6 | Conteúdo real em primeiro plano | sim | sim: o treino de hoje, os números e a lista | sim: o Boneco, a carga e as repetições; nada cobre o Boneco (em tela pequena ele sai inteiro, nunca pela metade) | sim | sim | sim |
| 7 | O principal é o maior | sim | sim: o nome do treino | sim: carga e repetições na série; o relógio no descanso | sim: o palco | sim: o placar (séries, minutos, exercícios) no fim; "1 de 3 treinos" na semana | sim |
| 8 | Agrupar por espaçamento | sim | sim | em parte: dentro do registro, quase tudo está a 16 (título, dica, números, reserva, botão); os grupos se separam por linha fina | sim | sim | sim |
| 9 | Títulos específicos | sim | sim: "Corpo todo A", 6 exercícios, ~44 min | sim: "Série 1 de 3 · 8–12 cada lado" | sim: "Exercício 1 de 6" + nome | sim | em parte: as folhas "Por quê" e "Mais opções" têm título genérico |
| 10 | Uma ação principal, perto do polegar | sim | sim: "Começar o treino" preso embaixo | sim: "Série feita" preso embaixo; no fim do descanso ficam "Ok" e a ação principal | em parte: o guia é leitura; ganhou "Voltar para o treino" no fim da página | sim: "Ver a sua semana" | sim |
| 11 | Uma cor de destaque | sim | sim: preto e branco | sim: a única cor é o vermelho da segurança ("Senti algo", aviso de dor) | sim (as cores do Boneco são do desenho) | sim | sim: o vermelho também marca "Apagar todos os dados" |
| 12 | Ícones de uma família | sim: os 4 desenhos de lugar e os 49 de equipamento ficam | sim (Lucide, traço 2) | em parte: ícones de 24 e de 20 px na mesma barra | em parte: "+" e "–" dos blocos que abrem são texto, não ícone | sim | sim |
| 13 | Sem enfeite | sim | sim | sim: sem degradê, brilho nem sombra | sim | sim | sim |
| 14 | Raio interno = externo − respiro | sim | sim: folha 16 fora, 8 dentro | sim | em parte: o cartão do palco (raio 8) tem botões de raio 8 a 16 de distância | sim | sim |
| 15 | Contraste AA | sim (teste de contraste) | sim | em parte: o texto passa; o fundo do botão secundário e dos botões de valor (#E9E9E6 sobre #F6F6F4) é fraco sob luz forte. Os traços de progresso passaram a usar a cor da borda | sim | sim | sim |
| 16 | Quebra de linha cuidada | sim (sem hífen automático fora de 320) | sim | sim: faixa de repetições, "descansar 1:45" e "série 2 de 3" não quebram mais no meio | sim: o separador "·" vai com o item seguinte | sim | sim |
| 17 | Alinhamento a olho | sim | sim | sim: o cabeçalho foi realinhado depois da revisão | em parte: pausar, voltar e "Lento" ficam à esquerda com a vista embaixo | sim | sim |
| 18 | Números tabulares | sim | sim | sim: o relógio não se mexe mais quando a linha do "Desfazer" some | sim | sim | sim |
| 19 | Estado em toda espera e vazio | sim: foto com carregando e erro | sim | sim: o palco avisa e deixa tentar de novo se o guia não carregar; o botão desligado diz o que falta | em parte: a tela do guia fica em branco enquanto carrega (pedido 9) | sim: a faixa das semanas some quando não há semana; "Ainda não há treino registrado" na evolução | sim |
| 20 | Movimento só como resposta | sim | sim | sim | sim | sim | sim |

## 3. Funções: nenhuma se perdeu

| Função | Onde está agora |
|---|---|
| Cadastro e triagem | Igual; a triagem que pausa o programa ganhou a cor da segurança |
| Locais e foto | Igual; a lista de locais virou linhas; a folha da foto perdeu o título repetido |
| Programa e "Prefiro" | Igual (folha de trocar exercício) |
| Série com "Desfazer" | "Desfazer" por 5 s na linha do descanso; "Desfazer a última série" no "⋯" |
| Descanso | Tela cheia com o relógio; "Mudar" volta aos números sem parar o relógio; o relógio também aparece no guia aberto pelo treino |
| "Senti algo" com alternativa | Sempre à vista, no mesmo lugar, no treino e no guia; a folha diz o que cada grupo de opções encerra |
| Tela acesa | Igual (`tela-acesa.spec.ts`) |
| Fim do treino, semana, semana leve, evolução | Iguais; o fim abre com o placar |
| 4 modos do guia | No guia e, agora, dentro do treino (abas sob o Boneco) |
| Cartão de texto | Igual; no treino, rola dentro da área do guia |
| "por quê?" com selo e fonte | Igual; a prescrição do guia ganhou o "por quê?" |
| Exportar e apagar, estilo do Boneco | Iguais |
| Uso sem rede, instalação | Iguais (`sem-rede.spec.ts`); o ícone do app passou para o preto e branco |

## 4. Testes que mudaram com a interface

Todos conferem a mesma coisa; só o nome ou o lugar do controle mudou.

| Teste | O que mudou |
|---|---|
| `letra.spec.ts` | A letra servida pelo app agora é a Geist |
| `acompanhamento.spec.ts`, `locais.spec.ts` | O "voltar" é procurado no cabeçalho, pelo nome exato |
| `jornada.ts` (apoio) | "Próximo exercício" e, no "⋯", "Próximo" |
| `treino.spec.ts` | "Desfazer a última série" conferido no "⋯"; "Voltar ao treino" sem a seta de texto; "Como fazer: dicas e erros" sem o "›" |
| `corpo-livre.spec.ts` | O descanso mostra "A seguir · série 2 de …" e "Pular" leva à série 2 |
| `cenarios.spec.ts` | "Como fazer: dicas e erros" sem o "›" |
| `registro.spec.ts` | A confirmação de apagar o treino é procurada como grupo "Apagar este treino?" (era um alerta) |
| `correcoes-auditoria.spec.ts` | O selo aberto na folha do exercício é o da lista "Por que este exercício" (as alternativas e o "Prefiro" passaram a vir antes) |

Dois defeitos reais apareceram nos testes e foram corrigidos na tela, não no teste: com "movimento reduzido" ligado, o toque num botão de valor escapava do campo (o campo agora cobre o botão inteiro); e a falha ao baixar um arquivo de texto derrubava a tela do treino (o treino agora baixa só o texto do exercício da vez e avisa se falhar).

## 5. Medidas, antes e depois

Réguas de `docs/revisoes/redesign/medidas.md`; números em `medidas/antes.json` e `medidas/depois.json` (`scripts/design/frontend-novo/medir.mjs`).

| Medida | Antes | Depois |
|---|---|---|
| JavaScript da 1ª tela (teste de orçamento; limite 175 kB) | 154,4 kB | 156,4 kB |
| JavaScript de quem volta ao programa (limite 220 kB) | 202,8 kB | 204,9 kB |
| CSS comprimido | 12,2 kB | 13,8 kB |
| Letra | 34,0 kB (Atkinson) | 29,4 kB (Geist) |
| Pedidos a outros servidores | 0 | 0 |
| Espaços, alturas e cantos fora da escala (`conferir:tokens`) | 528 | 0 |
| Altura da tela do treino em 390 × 844, nos 6 exercícios da Ana | 844 a 1.020 px (o descanso, 1.176) | 844 px em todos (cabe sem rolar) |
| Lighthouse, desempenho · acessibilidade: `/` | 98 · 100 | 98 · 97 |
| triagem | 100 · 100 | 100 · 100 |
| `/programa` | 96 · 100 | 98 · 97 |
| `/treino` (sem treino aberto, abre o programa) | 92 · 100 | 97 · 97 |
| `/guia/bulgaro` | 83 · 100 | 85 · 100 |
| `/semana` | 99 · 100 | 100 · 100 |
| `/dados` | 95 · 96 | 94 · 96 |
| 1ª visita | 100 · 100 | 100 · 100 |

A nota de desempenho do Lighthouse varia alguns pontos de uma rodada para outra na mesma máquina (em quatro rodadas do depois, o guia deu 85, 89, 93 e 85; Meus dados, 100, 93 e 94); a tabela traz a última, a de `medidas/depois.json`, medida depois da 2ª rodada de revisão. O pacote subiu 2,0 kB na 1ª tela (os 34 ícones e as peças novas) e segue abaixo do limite.

A acessibilidade do início caiu de 100 para 97 e a de Meus dados segue em 96 pelo mesmo motivo: o Lighthouse acusa a linha da lista que, no ponto em que a tela é medida, fica meio coberta pela barra presa embaixo ("alvo parcialmente coberto"). As linhas têm 56 px ou mais e aparecem inteiras ao rolar; o teste de toque do projeto (`tests/e2e/toque.ts`) passa em todas as telas. Fica anotado no backlog: dar à lista uma folga no fim, do tamanho da barra presa.

## 6. Revisão independente

### 6.1 Treino e guia (1ª rodada)

Um revisor no modelo mais capaz recebeu só o código, as capturas e os blocos A e B, sem a minha conclusão. Achou **32 defeitos** no treino e no guia: 1 que bloqueava, 12 importantes e 19 de acabamento (`revisao-bloco-2.md`).

- **Corrigidos (22):** o que bloqueava (1: o registro cobria o Boneco em tela pequena); os importantes 2, 3, 4, 5, 6, 7, 8, 11, 12 e 13; e os de acabamento 14, 15, 16, 17, 18, 19, 20, 21, 24, 27 e 28.
- **Corrigidos em parte (5):** 9 ("1ª" no lugar de "1"; "RIR" continua, pedido 4); 10 (a folha de "Senti algo" diz o que cada grupo encerra; a nota de dor segue abaixo da dobra em 320 px, e não há confirmação, pedido 7); 22 (a linha do tempo saiu do leitor de tela; o cursor ainda passa sobre as letras); 30 (o palco do treino tem estado de erro; o guia, não); 31 (o nome do exercício novo é anunciado; o foco depois de salvar a série ainda não vai para o descanso).
- **No backlog (5):** 23, 25, 26, 29 e 32, além do que sobrou dos 5 corrigidos em parte.

### 6.2 Os outros blocos (2ª rodada, 13/11/2026)

A pedido do Gustavo, dois revisores independentes, com o mesmo material e sem a minha conclusão, olharam o resto do app. Nenhum achou defeito que bloqueie, e nenhuma função sumiu em relação ao antes.

| Parecer | Telas | Achados | Corrigidos | Em parte | Não feitos |
|---|---|---|---|---|---|
| `revisao-inicio-fim-semana.md` | Início e folhas, fim do treino, semana, evolução | 42 (23 importantes, 19 de acabamento) | 25 | 7 | 10 |
| `revisao-cadastro-dados-locais.md` | Cadastro, Meus dados, locais, termos, tela de erro | 43 (17 importantes, 26 de acabamento) | 12 | 11 | 20 |

**Início, fim, semana e evolução** (números do parecer):
- **Corrigidos (25):** 1 (o rótulo de "Começar o treino" é um bloco só e não vira colunas), 3 (a prescrição "3 × 8–12" em preto e firme, na lista e na folha), 4 (cada bloco do início só com a linha de baixo), 5 (o "+" e o "–" sem sublinhado), 6 (o traço da meta voltou a ser tracejado), 7 ("ainda não treinou nesta semana" não se repete em toda linha), 8 (o cabeçalho da folha fica preso: "Fechar" não some), 10 (o selo segue na mesma linha do texto no cartão), 11 (cada tela dá o seu nome ao documento), 12 (respiro no topo das telas sem cabeçalho, com a área do relógio do aparelho), 14 (o convite para instalar vem depois da lista), 15 (a faixa das semanas só com 2 semanas ou mais), 18 (a confirmação de apagar o treino é um grupo com nome, com o foco em "Manter", sem vermelho), 19 (cada alternativa numa linha de 48 px), 20 (na folha do exercício, trocar e preferir antes do porquê), 21 ("Preferência salva" aparece dentro da folha), 23 ("Conferindo o programa…" tem estado de erro e "Tentar de novo"), 25, 27, 28, 29, 31, 34, 36 e 41.
- **Em parte (7):** 2 (em celular baixo saem os números do treino de hoje; a faixa da semana e o aviso seguem separados), 9 (as opções de ajuste ganharam a seta; não há confirmação nem desfazer), 13 (os blocos vazios e o trilho das barras viraram contorno; o tom do "mantendo" e o fundo dos botões secundários seguem fracos), 17 (o SAMU virou um botão "Ligar para o SAMU: 192" e o placar encolhe; "Hoje foi" e a progressão continuam na tela), 30, 35 e 40.
- **Não feitos (10):** 16 e 24 (decisões do Gustavo, abaixo), 22 (jargão: pedido ao domínio), 26 e 32 (os testes procuram esses nomes; mudar pede decidir o texto), 33, 37, 38, 39 e 42 (backlog).

**Cadastro, Meus dados, locais, termos e erro** (números do parecer):
- **Corrigidos (12):** I2 ("Apagar tudo" em vermelho cheio; o botão da página, que só abre a pergunta, em texto vermelho), I3 (na boas-vindas, "Começar" preso embaixo, com o aceite logo abaixo e o link fácil de tocar), I8 (respiro entre as perguntas da rotina e na folha do Estilo do Boneco), I9 (em 320 px: sem palavra partida com hífen, opções em 3 por fileira, Estilo do Boneco empilhado), I10 (editar um local sem a barra de baixo), I12 (a resposta de exportar, importar e retirar a autorização aparece presa acima da navegação e some em 8 s), I15, I16 (o item com detalhe faltando não fica mais apagado: "falta completar" em vermelho), I17 (em "Quais valem", o "Voltar" de cima volta à pergunta geral sem perder as marcações), A9, A17 e A19.
- **Em parte (11):** I1 ("Rotina e divisão" e "Objetivo" abrem como tela de edição, com volta para Meus dados, do topo ou já na pergunta do objetivo; "Refazer a triagem" ainda passa pelos 4 passos), I5 (a lista das 9 condições virou texto com marcadores; os botões seguem depois dela, por decisão registrada no código), I7 (o título não encosta mais no topo; o texto de privacidade continua antes da lista), I11 (o botão desligado da foto diz o que falta; o "código de convite" segue sem explicação), I13 ("Importar dados" só acende com um arquivo escolhido; o rótulo não mudou), A1, A2, A11, A12, A20 e A23.
- **Não feitos (20):** I4 e I6 (decisões do Gustavo, abaixo), I14 (pedido ao domínio) e 17 de acabamento (A3 a A8, A10, A13 a A16, A18, A21, A22, A24 a A26), no backlog.

**Decisões que os revisores deixaram para o Gustavo** (a 1ª e a 2ª já decididas; as outras 2 seguem abertas):
1. **O escolhido e a ação principal têm a mesma cara** (I4). **Decidido em 13/11/2026:** no cadastro e no equipamento, o escolhido virou contorno (com o círculo ou a caixa marcada) e a inversão fica só para a ação principal; no treino (o valor da reserva), nas abas do início e no guia, o escolhido continua um bloco invertido, para ser lido de relance. Em 320 px, onde as opções em linha não têm o círculo, o escolhido também continua um bloco. A comparação que serviu à decisão está em `capturas/decisao-escolhido/`.
2. **O selo "consenso" em frases que não são regra de treino** (I6 e 24). **Decidido em 13/11/2026:** nas regras de privacidade, de onde os dados ficam, de locais e de registro (`privacidade.*`, `dados.*`, `local.*`, `registro.*`), a palavra do selo passou a ser "fonte"; a folha que abre é a mesma, com o nível e as fontes. As regras de treino e de segurança continuam mostrando o nível. Comparação em `capturas/decisoes/1-selo-claro.png`.
3. **A ação principal do fim do treino** (16): hoje é "Ver a sua semana", abaixo da dobra, e a semana repete o que o fim acabou de mostrar. Alternativa: "Voltar ao início" como principal, preso embaixo.
4. **O fundo cinza dos botões secundários** (13): fraco sob luz forte. Alternativa: um contorno fino na cor da borda.

Os defeitos reais achados nesta rodada pelos testes, e corrigidos na tela: as barras da semana devem ter uma cor só (regra do lote 4; o estado vai pela intensidade), e o botão preso da boas-vindas cobria o que recebia o foco em tela estreita.

## 7. Depois do fechamento: o estudo dos textos (13/11/2026)

A pedido do Gustavo, o texto do app foi medido e 11 telas passaram a seguir a regra "uma linha na tela, o resto a um toque" (`textos/estudo-dos-textos.md`, seção 10). Isso muda três linhas da tabela dos 20 cuidados da seção 2:

- **Cuidado 1 (selo só quando carrega informação):** os selos à vista caíram de 63 para 16 nas 41 telas medidas; os outros ficam dentro do que abre no toque.
- **Cuidado 2 (sem rótulo redundante):** saíram "Nada vem marcado." e a frase da semana no fim do treino, que repetia o "1 de 3".
- **Cuidado 6 (conteúdo real em primeiro plano):** no início, a lista de exercícios não é mais seguida por 150 palavras de definições abertas; em "Sobre o programa", o resumo e o que pede ajuste vêm antes de tudo.

Verificação no estado final: `npm run check` (896 testes), `npm run test:e2e` (157) e `npm run conferir:tokens` limpos; `git diff origin/main -- src/engine src/domain` continua vazio.
