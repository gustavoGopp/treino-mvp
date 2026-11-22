# Escolha dos exercícios (1ª metade): relatório do conferente

> Relatório de um conferente independente (22/11/2026), que recebeu a regra, a frase e o código, sem hipótese da sessão. É matéria-prima: cada divergência só vale depois de conferida pela sessão no código (coluna "situação" de `../regras-x-codigo.md`). As linhas citadas são as do dia da conferência.

# Conferência regra × código × frase: grupo seleção 1 (19 regras)

Conferido em 22/11/2026, só leitura (nenhum arquivo do repositório mudou; `privado/` não foi lida).
Além da leitura do código, rodei o gerador de verdade (`gerarPrograma`, via `npx tsx`, scripts no scratchpad `d1s1/`) numa grade de 6.840 programas sem dor (19 inventários × 3 níveis × 2 a 6 dias × 30/45/60/90 min × 6 focos) e numa segunda de 16 inventários × 7 focos. Onde digo "medido", é dessa grade. A grade não tem dor nem "evitar": o que depende disso foi só lido.

Abreviações: `G` = `src/domain/gerador/index.ts`; `F` = `src/domain/gerador/funcoes.json` (uma função por linha); `B` = `src/domain/biblioteca/exercicios.json`.

## Tabela

| id | classificação | onde no código (arquivo:linha) | evidência |
|---|---|---|---|
| selecao.equivalencia-equipamento | bate | `F`:6 (puxar horizontal: máquina, polia, halter e unilateral no mesmo nível); `G`:1732-1750 (alternativas) | Os níveis de cada função misturam máquina, peso livre, polia, halter e um lado/dois lados como equivalentes; os critérios de carga e de dois lados são só desempate. A frase diz o mesmo. |
| selecao.amplitude | bate | `src/conteudo/exercicios/*.json`, campo `range` (171 de 171 cartões) | Nenhum código do gerador executa a regra; ela é cumprida como orientação no cartão (início e fim do movimento). A frase é uma orientação e não promete nada além disso. Não conferi o texto de cada um dos 171 cartões. |
| selecao.comprimento-longo | bate | `G`:226-238 (chave do desempate, sem critério de "alongado", EMG ou estímulo/fadiga); `F`:11, 16, 21 | A posição alongada entra só pela ordem dos níveis (tríceps acima da cabeça, flexora sentada, panturrilha em pé); a tag `alongado` só aparece em texto (`G`:1759). Nada é eliminado por ela. |
| selecao.estabilidade | o código diverge (leve) | `G`:136 e `G`:231; tags em `B` | Só iniciante e dentro do nível: certo. Mas "estável" é a tag `estavel`/`apoiado`/`maquina`, e 13 dos 21 exercícios de polia não a têm: o iniciante recebe o crucifixo com halteres porque "é mais estável" que o crucifixo na polia, que a regra e a frase listam como estável. |
| selecao.variacao | não está no app | não achei o código (procurei `selecao.variacao`, bloco, 4–8 semanas em `src/domain`, `src/features`) | Não existe bloco de 4 a 8 semanas nem troca planejada ao fim dele: o programa sai do perfil e do inventário (`src/features/app/estado.tsx`:133) e fica igual enquanto eles não mudam. `sessao/bloco.ts` trata de pausas. A frase dá a entender que o app faz. |
| selecao.variacoes-equivalentes | a frase diverge | `G`:225 (prática do iniciante), `G`:204, 227-228, 273-278, 597, 949 | A parte de não repetir em todos os dias bate (medido: 0 programas com o mesmo exercício em todos os dias havendo equivalente; 842 repetem sem equivalente nem nível abaixo). Mas "o exercício muda de um dia para o outro" não vale para o iniciante desde 16/11: ele repete o que já está na semana. |
| selecao.corpo-livre-ampliado | bate | `F`:2-3 (flexão com os pés elevados), 11, 9, 21, 14, 23; `B` (complexidade 3; faixas 8–15 e 12–20); `src/domain/regras/index.ts`:164; `src/domain/progressao/escadas.json`:2 | Os 6 estão nos níveis que a regra diz; a flexão com os pés elevados tem complexidade 3 e o iniciante vai até 2 (medido: nunca no programa do iniciante), e é o 2º degrau da escada da flexão. Ressalva em "Observações": a panturrilha no chão não fica só de alternativa. |
| selecao.halteres-ampliado | bate | `F`:7, 8, 11, 12, 9, 10, 4, 3; `B` (`elevacao-lateral-deitado` sem a tag `alongado`) | Os 9 estão nos níveis descritos, todos com complexidade até 2. Medido: a elevação lateral deitado nunca entrou num programa (só alternativa). A frase bate. |
| selecao.elastico-ampliado | o código diverge | `src/conteudo/exercicios/extensao-joelho-elastico.json`:59; `rosca-elastico.json`:10 e mais 4 cartões | Os 8 estão nos níveis descritos (`F`:6, 9, 19, 18, 8, 10, 12). Mas "todo cartão com elástico pede o pé inteiro sobre ele e conferir rachaduras" não é verdade: 1 dos 25 cartões não fala em rachaduras, e 5 cartões em que se pisa no elástico não pedem o pé inteiro. |
| selecao.barra-negativa | bate | `F`:5 (último nível); `B` (`faixaReps` [3,6]); `src/conteudo/exercicios/barra-fixa-negativa.json`:9, 24; `src/domain/progressao/escadas.ts`:87; `src/domain/sessao/index.ts`:174; `G`:708-714 | 3 a 6 descidas de 3 a 5 s, subindo pelo banco ou degrau; no topo da escada, a sugestão é a barra fixa. Medido: quem só tem a barra (intermediário, 3 dias) recebe barra fixa / barra só na descida / barra supinada. |
| selecao.barra-negativa-iniciante | bate | `G`:259-260, 268, 709, 757, 1873-1874 | A barra fixa (pronada ou supinada) vira a descida como candidata da vaga, e os caminhos de vaga vazia e de dia refeito pela dor excluem a barra. Medido: nenhum programa de iniciante com barra fixa em 2.280. |
| selecao.item-sozinho-ampliado | o código diverge (leve) | `src/conteudo/exercicios/extensao-joelho-mini-band.json` (sem o aviso); `G`:1785-1786 | Os 8 estão nos níveis descritos (`F`:8, 9, 18, 15, 19, 17). Mas o cartão da extensão de joelho com mini-band não diz que a evidência com elástico é fraca, como a regra afirma; e o "porquê" dela diz "a mini-band abre a abdução", que é de outro exercício. A frase não cita o cartão e bate. |
| selecao.complementos | o código diverge | `src/domain/gerador/familias.ts`:12-36 (tríceps não está nas famílias); nenhum `r('selecao.complementos')` no código | A regra e a frase prometem 2 exercícios de tríceps por semana; o código segue a `selecao.exercicios-por-musculo` (músculo pequeno: 1). Medido: academia completa, 2 dias de 60 min, sai 1 exercício de tríceps nos três níveis. |
| selecao.peitoral-inclinado | o código diverge | `G`:664-665 | O código olha se o modelo do dia tem a vaga de empurrar horizontal, mesmo quando ela é complemento e não coube no tempo. Medido: com 5 ou 6 dias de 30 min e sem banco inclinável, o dia de Empurrar sai com dois crucifixos e nenhum supino. |
| selecao.triceps-acima-cabeca | o código diverge | `G`:646-649 (`OBRIGATORIO_CURTO`); `F`:11 | Os 3 níveis batem com a regra. Mas "ao menos 1 por semana" não vale com treino curto: com 30 min a vaga entra na fila comum e pode não caber. Medido: 717 de 6.840 programas (todos de 30 min) sem tríceps acima da cabeça, havendo exercício possível. |
| selecao.flexora-sentada | bate | `F`:16 (cadeira no nível 1, mesa no 2); `G`:1755 | Com as duas, a vaga pega a cadeira flexora. Medido: nenhuma mesa flexora num programa em que a cadeira era possível. |
| selecao.panturrilha-alongada | o código diverge (leve) | `G`:273-278 com `G`:949 e 963; `G`:932 | A ordem dos níveis bate (`F`:21: máquina/step, degrau, chão) e o texto do chão também (`G`:1757-1758). Mas com foco em pernas e sem equipamento, a panturrilha no chão entra no programa mesmo com o degrau possível. Medido: 225 de 6.840. |
| selecao.multi-mono | bate | `G`:2074-2089 (o corte só tira isolador não obrigatório); `G`:645-649 | Quando falta tempo, só isolador sai; multiarticular só perde séries. A frase bate. Ressalva: o dia de Empurrar sem nenhum multiarticular existe, pela causa da `selecao.peitoral-inclinado`. |
| selecao.funcao-da-vaga | a frase diverge | `G`:225-238 (ordem do desempate), `G`:210-211, 215-222, 1700-1702 | A ordem do código é a da frase (dor, estável, carga, dois lados, variedade, preferência, animação, ordem de referência), e as ressalvas do um lado só batem. Medido: nenhum dia com dois afundos. Mas o item "5) varia entre os dias" é o contrário para o iniciante, e a frase não cita o critério da lombar, que fica entre o 2 e o 3 (`G`:232). |

Contagem: **bate 9 · o código diverge 7 · a frase diverge 2 · não está no app 1**.

## Divergências

### 1. selecao.peitoral-inclinado: o código diverge (a mais séria do grupo)

- **Regra:** "Sem banco inclinável, num dia que não tem outra vaga de empurrar horizontal, a vaga recebe um 2º empurrar (supino, flexão) antes do crucifixo, porque o isolador sozinho cresceu menos o peitoral que o multiarticular".
- **Frase:** "Sem ele, num dia sem outro empurrar horizontal, entra um 2º empurrar (supino, flexão) antes do crucifixo".
- **Código** (`G`:664-665):
  ```ts
  const segundoEmpurrar = funcao.id === 'empurrar-inclinado' && dia.vagas.some((w) => ativa(w) && w.funcao === 'empurrar-horizontal');
  const fora = (id: string) => itens.some((i) => i.ex.id === id) || (segundoEmpurrar && POR_ID[id]!.padrao === 'empurrar-h' && !POR_ID[id]!.tags.includes('inclinado'));
  ```
  A conferência é em `dia.vagas` (o modelo do dia), não em `mantidas` (as vagas que couberam). No dia de Empurrar do modelo de 5 e 6 dias, o empurrar horizontal é vaga de complemento; com 30 min cabem 4 exercícios e ela fica de fora, mas continua "existindo" para esta linha, que então proíbe o supino reto na vaga inclinada.
- **Exemplo:** intermediário, 5 dias de 30 min, sem foco, academia completa com banco reto no lugar do banco regulável. O dia 3 (Empurrar) sai: crucifixo na polia (na vaga de empurrar inclinado), elevação lateral, tríceps francês, voador. Nenhum supino no dia, com supino reto, com barra e na máquina possíveis. Com 45 min o mesmo dia tem supino com barra + crucifixo na polia + voador (certo). Medido: 36 dos 42 programas de 5 e 6 dias com 30 min (12 de 14 em cada nível), em cada um dos 3 inventários sem banco inclinável testados (halteres + banco reto; academia sem banco regulável; outro com flexoras). Nenhum caso com 45 min ou mais.
- **De quebra:** o "porquê" desse crucifixo diz "As opções de cima (como supino inclinado com halteres) pedem mais técnica que o seu nível; esta é a melhor que sobra" para o iniciante, que não é o motivo.
- **Conserto em uma linha:** conferir a vaga de empurrar horizontal entre as mantidas do dia, não no modelo.

### 2. selecao.triceps-acima-cabeca: o código diverge

- **Regra:** "Pelo menos 1 exercício de tríceps com o ombro flexionado (braço acima da cabeça) por semana"; valores "≥ 1" para os três níveis.
- **Frase:** "A semana tem ao menos 1 exercício de tríceps com o braço acima da cabeça."
- **Código** (`G`:648-649):
  ```ts
  const curto = N <= OBRIGATORIO_CURTO;
  const obrigatorias = curto ? [] : comExercicio.filter((x) => x.res.funcao.obrigatoria);
  ```
  Com até 4 exercícios por treino, a vaga obrigatória entra na fila comum, depois das vagas-base, e pode não caber. A exceção está escrita em outra regra (`selecao.isolador-obrigatorio`: "Em treinos curtos (até 4 exercícios), entra depois das vagas-base do dia"), mas nem esta regra nem a frase dela a citam.
- **Exemplo:** intermediário, 3 dias de 30 min, sem foco, academia completa (a da persona Carla): nenhum exercício de tríceps nos 3 dias. O mesmo com iniciante, 2 dias de 30 min. Medido: 717 de 6.840 programas, todos de 30 min, em todos os focos. O programa avisa só o volume ("Abaixo da meta: tríceps 3 de 6 séries por semana. Com 30 min cabem ~4 exercícios").
- **Conserto em uma linha:** ou a frase ganha "quando o treino tem mais de 4 exercícios", ou o gerador garante 1 por semana.

### 3. selecao.complementos: o código diverge

- **Regra:** "2 exercícios complementares por semana para quadríceps, isquiotibiais, tríceps e peitoral, quando o equipamento permitir (generalizada pela `selecao.exercicios-por-musculo`)"; valores "2 por músculo listado".
- **Frase:** "Quadríceps, posteriores da coxa (isquiotibiais), tríceps e peitoral recebem, cada um, 2 exercícios por semana que se complementam, quando o equipamento permite."
- **Código:** nenhuma linha cita `selecao.complementos`. O que existe é `FAMILIAS` (`src/domain/gerador/familias.ts`:12-36), só com peito, costas, quadríceps, posteriores e glúteos. O tríceps segue a `selecao.exercicios-por-musculo` ("pequenos: 1, ou 2 se forem prioridade"), que contradiz esta regra para o tríceps.
- **Exemplo:** iniciante, intermediário ou avançado, 2 dias de 60 min, sem foco, academia completa: a semana tem 1 exercício de tríceps (tríceps francês, no dia A; nenhum no dia B). Com foco em braços e 90 min saem 3. Para quadríceps a regra se cumpre sempre (6.840 de 6.840); para peito e posteriores, o que falta vem de tempo curto ou de equipamento.
- **Conserto em uma linha:** tirar o tríceps da frase (ou dizer "2 se for prioridade"), já que a regra que vale é a outra.

### 4. selecao.elastico-ampliado: o código diverge (cartões)

- **Regra:** "todo cartão com elástico pede o pé inteiro sobre ele e conferir rachaduras antes da série".
- **Frase:** "todo exercício com elástico pede o pé inteiro sobre ele e conferir rachaduras antes da série."
- **Cartões** (`src/conteudo/exercicios/`):
  - `extensao-joelho-elastico.json`:59 não fala em rachaduras em campo nenhum: "Antes da 1ª série, puxe forte o elástico para testar o ponto; se o elástico escapar ou o ponto ceder, pare." E a linha 9 manda prender "a ponta do elástico sob o pé", sem pedir o pé inteiro.
  - Pisam no elástico e não pedem o pé inteiro (dizem "pise no meio do elástico com os dois pés" e "bem preso"): `rosca-elastico.json`:10, `elevacao-lateral-elastico.json`:10, `desenvolvimento-elastico.json`:10, `stiff-elastico.json`:10, `triceps-elastico-acima.json`:10.
  - Os 8 cartões novos do lote e o `agachamento-elastico` cumprem. Nos cartões em que não se pisa (mini-band, elástico entre as mãos, elástico ancorado), "pé inteiro" não se aplica, mas a frase diz "todo".
- **Exemplo:** quem só tem elásticos recebe a extensão de joelho com elástico na vaga de extensora e abre um cartão sem o aviso de conferir rachaduras.
- **Conserto em uma linha:** pôr rachaduras e "pé inteiro" nesses 6 cartões, ou a frase dizer "todo exercício em que se pisa no elástico".

### 5. selecao.estabilidade: o código diverge (leve, é de dado)

- **Regra:** "Exercícios estáveis e apoiados (máquina, banco, polia): desempate dentro do mesmo nível da função, só para iniciante".
- **Frase:** "o desempate favorece o mais estável e apoiado (máquina, banco, polia)".
- **Código** (`G`:136): `const estavel = (e) => e.tags.some((t) => t === 'estavel' || t === 'apoiado' || t === 'maquina');`. Em `B`, 13 dos 21 exercícios de polia não têm nenhuma dessas tags (`crucifixo-polia`, `crucifixo-polia-baixo`, `supino-polia`, `supino-inclinado-polia`, `face-pull`, `rosca-polia-costas`, `triceps-frances`, `abdominal-polia`, `coice-polia`, `abducao-polia`, `triceps-frances-polia-unilateral`, `remada-unilateral-polia`, `crucifixo-invertido-polia`), e `supino-barra` (no banco) também não.
- **Exemplo:** iniciante, 4 dias de 60 min, polia dupla + halteres + banco reto: a vaga de crucifixo recebe o crucifixo com halteres, e o porquê diz "Ganhou de crucifixo na polia (crossover) [...] porque é mais estável e apoiado". O intermediário, no mesmo inventário, recebe o crucifixo na polia.
- **Conserto em uma linha:** ou a frase tira "polia" do parêntese, ou as tags dos exercícios de polia são revistas.

### 6. selecao.panturrilha-alongada: o código diverge (leve; vem de outra regra)

- **Regra:** "Panturrilha com ênfase no alongamento [...] sem máquina nem step, a panturrilha no degrau da escada vem antes da no chão"; a `selecao.corpo-livre-ampliado` diz que a do chão "fica de alternativa".
- **Frase:** "Sem máquina nem step, o degrau da escada vem antes do chão, onde o calcanhar não desce".
- **Código:** dois caminhos põem a do chão no programa com o degrau possível:
  - `G`:949 e 963 com `G`:273-278: no 2º exercício do foco, o degrau "já está em todos os outros dias", e a escolha desce um nível (`if (evitar?.(e)) { primeiro ??= ...; continue; }`), como manda a `selecao.variacoes-equivalentes`.
  - `G`:932 (`.filter((x) => !x.repete || funcoes.length === 1)`): o músculo que só tem uma função ganha outro exercício da mesma função no mesmo dia.
- **Exemplo:** iniciante, sem equipamento, 3 dias de 60 min, foco em pernas: dia 1 com panturrilha no chão (sozinha), dias 2 e 3 com panturrilha no degrau. Intermediário, mesmo perfil: no dia 2, degrau e chão juntos. Medido: 225 de 6.840 programas, todos com foco em pernas e sem máquina nem step.
- **O que pesa:** a regra da variedade diz que variar "não muda a hipertrofia", mas aqui a descida de nível troca um exercício com alongamento por um sem ("a metade de cima cresceu bem menos", na própria regra).
- **Conserto em uma linha:** não descer para o nível do chão por variedade (repetir o degrau), ou a frase dizer que com foco em pernas a do chão entra como 2º exercício.

### 7. selecao.item-sozinho-ampliado: o código diverge (leve; cartão e porquê)

- **Regra:** "extensão de joelho com mini-band no nível da extensão com elástico ([...] um estudo contra, com elástico: `yasuda2016`; o cartão diz que a evidência com elástico é fraca)".
- **Frase:** não cita o cartão; no resto, bate (8 exercícios, carga leve perto da falha).
- **Código:** `src/conteudo/exercicios/extensao-joelho-mini-band.json` não tem a frase da evidência fraca em campo nenhum (o que há é "Com o elástico, a série só conta perto da falha", linha 68). E o porquê do equipamento (`G`:1785-1786) é o mesmo para todo exercício que pede mini-band: "A mini-band abre a abdução sem máquina; ela sobe pelas forças da sua mini-band", que na extensão de joelho fala de outro exercício.
- **Exemplo:** quem só tem mini-band recebe a extensão de joelho com mini-band na vaga de extensora: o cartão não diz que a evidência é fraca, e o porquê fala em abdução.
- **Conserto em uma linha:** pôr a frase no cartão e separar o texto do porquê por padrão do exercício.

### 8. selecao.variacoes-equivalentes: a frase diverge

- **Regra:** "com mais de uma opção no mesmo nível da função, o desempate por variedade entre os dias (`selecao.funcao-da-vaga`) troca o exercício de um dia para o outro"; valores iguais nos três níveis. A regra é anterior à `selecao.pratica-do-iniciante` (16/11) e também não cita a exceção.
- **Frase:** "Com mais de uma opção equivalente no mesmo nível da função, o exercício muda de um dia para o outro e você ganha alternativas para trocar no dia."
- **Código** (`G`:225): `const variedadeOuPratica = (u: number) => (nivel === 'iniciante' && !semPratica ? (u >= limiteDeRepeticao ? 1000 + u : -u) : u);`. Para o iniciante, o exercício que já está na semana vem antes.
- **Exemplo:** halteres até 30 kg + banco reto, 4 dias de 60 min, sem foco. Intermediário: stiff no dia 2 e stiff unilateral no dia 4; rosca alternada e rosca martelo. Iniciante: stiff nos dois dias e rosca alternada nos dois, com os equivalentes possíveis.
- **Conserto em uma linha:** a frase ganha "para o intermediário e o avançado; o iniciante repete (veja a regra do iniciante)".

### 9. selecao.funcao-da-vaga: a frase diverge

- **Regra:** "dentro do mesmo nível da função, o desempate é dor de 3 a 5, estabilidade (só iniciante), carga possível, variedade entre os dias, a preferência da pessoa [...], animação aprovada e, por fim, a ordem de referência".
- **Frase:** "ganha, nesta ordem, o que: 1) poupa a região com dor de 3 a 5; 2) é mais estável (só iniciante); 3) permite mais carga; 4) trabalha os dois lados de uma vez, em máquina, polia ou barra; 5) varia entre os dias; 6) você prefere; 7) tem animação aprovada; 8) é o mais comum e mais simples de montar."
- **Código** (`G`:226-238): a chave é, nesta ordem, repetição em todos os dias (2 posições), afundo no dia, dor leve, estabilidade do iniciante, **lombar no dia** (`cansa`, `G`:232), carga, dois lados, **`variedadeOuPratica`** (`G`:235), preferência, animação; no empate, a ordem de referência (`G`:215-222, 245).
  - O item 5 é o contrário para o iniciante (`G`:225): ganha o que já está na semana, não o que varia. A frase marca "(só iniciante)" no item 2 e não marca nada no 5.
  - A frase não tem o critério da lombar no dia (`selecao.lombar-no-dia`), que fica entre o 2 e o 3.
- **Exemplo:** o mesmo do item 8 (iniciante com halteres e banco reto: stiff nos dois dias de pernas, quando a frase diz que ganha o que varia).
- **O resto bate:** "carga à vontade" é máquina, polia ou barra (`G`:210-211: `cargaPossivel(e) === 2 && e.carga !== 'halter' && e.carga !== 'kettlebell'`); o de um lado só não perde lugar com dor de 3 a 5 na região nem com "prefiro este"; a ordem curada de `F` é a que a regra descreve (puxada pela frente primeiro, flexão antes do supino na polia e do mergulho, afundo antes do afundo para trás e do búlgaro, abdominal no chão antes do na bola); um afundo por dia (medido: 0 dias com dois).
- **Conserto em uma linha:** item 5 vira "varia entre os dias (o iniciante, ao contrário, repete o que já está na semana)".

### 10. selecao.variacao: não está no app

- **Regra:** "Manter os exercícios no bloco (4–8 semanas); a variação é sistemática, dentro da mesma função (ex.: rosca inclinada ↔ Scott), nunca por sorteio".
- **Frase:** "Os exercícios ficam os mesmos durante o bloco, de 4 a 8 semanas. A variação é planejada, dentro da mesma função (por exemplo, entre a rosca inclinada e a rosca Scott), nunca por sorteio."
- **Código:** não achei. Não há bloco de 4 a 8 semanas nem troca de exercício ao fim de um período. O programa é recalculado do perfil e do inventário (`src/features/app/estado.tsx`:133) e, por ser determinístico, sai igual enquanto eles não mudam; `src/domain/sessao/bloco.ts` é sobre pausas e volta ao treino; a única troca sugerida é a da estagnação (`src/domain/progressao/index.ts`:359, outra regra). O que o app cumpre é só "nunca por sorteio" e "ficam os mesmos" (sem prazo).
- **A frase deixa claro?** Não. Ela dá a entender que o app trabalha em blocos de 4 a 8 semanas e planeja uma variação: quem lê espera que os exercícios mudem depois de 8 semanas, e não mudam.
- **Conserto em uma linha:** a frase dizer o que o app faz ("os exercícios ficam os mesmos enquanto o seu perfil e o seu equipamento não mudam; a troca é sua, pelas alternativas").

## Observações (não são divergência)

- **selecao.barra-negativa:** a 2ª puxada de quem só tem a barra chega pela vaga vazia de puxar horizontal (`G`:708-714), onde o desempate compara exercícios de níveis diferentes: a barra só na descida (4º nível) ganha da barra supinada (1º nível) só pela variedade. Aqui dá o que a regra quer; o caminho, em si, ignora o nível da função.
- **selecao.barra-negativa:** o texto da regra ainda diz "Para o iniciante, falta a regressão pelo nível [...] fica para o marco seguinte", e a `selecao.barra-negativa-iniciante` já fez isso. A frase não repete o trecho.
- **selecao.barra-negativa-iniciante:** o iniciante que só tem a barra, com 3 dias e foco em costas, recebe a barra só na descida nos 3 dias (não há equivalente nem nível abaixo possível): está de acordo com "sem nada abaixo, repete". O porquê diz "Equivale a barra fixa e às outras do mesmo tipo, que ficam como alternativa".
- **selecao.halteres-ampliado:** a regra deixa de fora "a panturrilha numa perna com halter para quem só tem halteres". Em `B`, `panturrilha-chao` tem `carga: halter` e `unilateral: true` e só pede apoio, e o cartão dela sugere "segure um halter na mão do mesmo lado" quando fica fácil. Para quem só tem halteres ela fica atrás do degrau, então não contei como divergência.
- **selecao.preferencia** (fora do grupo): a frase ainda diz "antes da animação e da ordem alfabética"; desde 15/11 o último critério é a ordem de referência.
- **Limite desta conferência:** a grade não tem dor, "evitar exercício", "prefiro este" nem troca de local; nesses caminhos só li o código (`G`:211, 230, 709, 757; `src/domain/locais/index.ts`:117). Não abri as telas no navegador.
