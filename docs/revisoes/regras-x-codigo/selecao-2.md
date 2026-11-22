# Escolha dos exercícios (2ª metade): relatório do conferente

> Relatório de um conferente independente (22/11/2026), que recebeu a regra, a frase e o código, sem hipótese da sessão. É matéria-prima: cada divergência só vale depois de conferida pela sessão no código (coluna "situação" de `../regras-x-codigo.md`). As linhas citadas são as do dia da conferência.

# Conferência regra × código × frase: seleção (grupo 2, 19 regras)

Só leitura. Além de ler o código, rodei o gerador de verdade (`gerarPrograma` e `cortarTempo`) com perfis fictícios, por scripts fora do repositório (`scratchpad/d1s2/run*.ts`, com `npx tsx`). Nada do repositório foi alterado; `privado/` não foi lida.

Abreviações: `G` = `src/domain/gerador/index.ts`; `F` = `src/domain/gerador/funcoes.json`; `D` = `src/domain/gerador/divisoes.ts`.

Resumo: 9 batem, 7 com o código divergente, 2 com a frase divergente, 1 que não está no app.

| id | classificação | onde no código (arquivo:linha) | evidência em uma ou duas frases |
|---|---|---|---|
| selecao.lombar-no-dia | bate | G:232, G:669-673, G:1704 | `cansa` = carrega a lombar e o dia já tem 1 (tronco) ou 2 (perna) que carregam; entra na chave do desempate depois da dor de 3 a 5 e da estabilidade e antes da carga. É só ordem: sem outro do nível, o exercício entra. Abdômen (`padrao core`) e os de tag `apoiado` não contam. |
| selecao.pratica-do-iniciante | a frase diverge | G:204, G:225, G:235, G:496-508 | O "nunca em todos os dias" só existe com 3 dias ou mais (`limiteDeRepeticao` é infinito com 2 dias). Com 2 dias o iniciante repete o mesmo exercício nos dois dias havendo outro do mesmo nível; a frase não diz essa condição. |
| selecao.dia-sem-principal | o código diverge | G:404-455 (406, 420), G:605-626, G:748-815 | A troca de divisão dispara com qualquer dia fraco, mesmo que ele não venha da dor (G:406), e o aviso culpa a dor. A trava do foco deixa o foco perder séries até a meta (G:420), e a regra diz "abaixo do que tinha". O resto (vaga do multiarticular, preenchimento, avisos) bate. |
| selecao.vaga-sem-equipamento | bate | G:698-720, G:845-848 | Meta, função que o dia não tem, teto, limite de N e 3º empurrar conferem. Ressalva: o aviso que "diz o que falta" só existe para as funções com `lacuna` (extensora, abdução, panturrilha sentada), mais os avisos de puxar; a vaga de crucifixo vazia não gera aviso próprio. |
| selecao.preferencia | o código diverge | G:212-222, G:236, G:245; `src/features/programa/Prefiro.tsx:5-37`; `src/features/treino/acoes.ts:82-92` | A regra e a frase dizem que a preferência vem "antes da animação e da ordem alfabética"; o último desempate do código é a ordem de referência da lista da função (desde 15/11, `selecao.funcao-da-vaga`). O resto bate: só entre equivalentes do mesmo nível, um toque desfaz, nada vem preferido, a dor acima de 5 tira. |
| selecao.alongado | bate | F:11, F:15, F:16, F:21; G:1762 | Tríceps acima da cabeça, extensora e panturrilha em pé são funções próprias e obrigatórias; a cadeira flexora (sentada) é o nível 1 da flexão de joelho, antes da mesa. |
| selecao.exercicios-por-musculo | o código diverge | `src/domain/gerador/familias.ts:12-37`; G:1555-1598; G:235; D:80 | Os grandes batem (2 famílias de funções, completadas depois dos cortes). Os pequenos não: sem prioridade, saem com 2 exercícios diferentes (variedade entre os dias e o complemento de tríceps), e a regra e a frase dizem "1, ou 2 se forem prioridade". |
| selecao.isolador-obrigatorio | bate | F:11, F:15, F:21; G:648-656; G:2080; G:1085; G:1601-1604; `src/domain/regras/index.ts:97` | As 3 funções têm `obrigatoria`; o corte de exercícios pula o obrigatório; com N ≤ 4 entram na fila depois das vagas-base; o que ficou de fora volta num dia da região com lugar. |
| selecao.equivalencia | bate | G:1732-1750, G:341-342 | Mesma função com outro equipamento primeiro; com menos de 2 de outro equipamento, entram as do mesmo músculo. O botão "Prefiro este" aparece entre equivalentes. |
| selecao.manter-no-bloco | não está no app | G:1409 (só o texto) | Nada conta as 4 a 8 semanas e não existe "troca de bloco". O programa só muda quando a pessoa pede (verdade), mas refeito com as mesmas entradas sai idêntico: a "variação dentro da mesma função" não acontece. A frase dá a entender que o app faz. |
| selecao.gluteo | bate | F:18-19; G:569-573, G:600, G:621, G:885; D:182 | Coice na polia no nível 1; a extensão de quadril entra pela falta de dobrar o quadril (só o Corpo todo A/B tem a vaga só de foco); até 45 min só sobe enquanto o dia couber; não entra no dia que perdeu vaga de pernas pela dor. Ressalva: a abdução só entra com glúteos como foco (`c('abducao', ['gluteos'])`), e a frase não diz. |
| selecao.crucifixo-complemento | bate | F:3-4; D:69, D:82, D:119, D:173, D:199, D:207 | A função crucifixo é sempre uma vaga a mais ao lado de uma vaga de empurrar; só substitui quando nenhum empurrar é possível (último nível do empurrar inclinado). |
| selecao.mergulho | o código diverge | F:2, F:12; G:172-175; `src/domain/triagem/index.ts:66-70` | Complexidade 3 e níveis conferem. Mas "só com o ombro sem restrição" no código é só "sem dor acima de 5": com dor 4 no ombro o mergulho entra (rodado). Depende de como se lê "restrição". |
| selecao.aducao-complemento | o código diverge | D:95 (e iguais); F:20; G:643; G:2078-2081 | Só entra com pernas ou glúteos como foco e nunca gera aviso: confere. Mas não "sai primeiro nos cortes": o corte tira o último isolador sem foco da lista, e o abdominal vem depois da adução (rodado: sai o abdominal, fica a adução). |
| selecao.abdomen-prioridade | bate | D:72, D:84, D:201, D:211, D:252 | Superior A e B, Empurrar A e B e Pernas B têm `c('abdomen', ['abdomen'])`. Rodado: com foco em abdômen, os dois dias de superior ganham o abdominal. |
| selecao.complexidade-nivel | a frase diverge | `src/domain/regras/index.ts:164`; G:172; `src/domain/avaliador/index.ts:201-202` | O filtro bate (2, 3, 3; alerta no avaliador). A frase lista 3 exercícios como os que ficam fora do iniciante; a biblioteca tem 10 de complexidade 3, entre eles o agachamento livre e o supino com barra. |
| selecao.dobrar-quadril | bate | F:17 | Níveis: terra romeno e stiffs com carga; hiperextensão e pull-through; stiff com elástico; `seNada: flexao-joelho`. |
| selecao.flexao-joelho-sem-maquina | bate | F:16; `src/domain/biblioteca/exercicios.json:3765-3794` | Nível 3: bola e elástico; nível 4: deslizante e nórdico (complexidade 3, fora do iniciante). Ressalva: o nível 4 tem também a flexão de joelho na suspensão, que a regra e a frase não citam. |
| selecao.nordico | o código diverge | `src/domain/biblioteca/exercicios.json:3765-3794`; F:16 | Complexidade 3 e faixa de 6 a 10 conferem. Não há código para "a 1ª semana com 2 séries": o nórdico recebe as séries da distribuição comum, até 4 já na 1ª semana (rodado). |

## Divergências

### selecao.pratica-do-iniciante: a frase diverge

- **Regra:** "nunca em todos os dias havendo outro do mesmo nível (`selecao.variacoes-equivalentes`)". A regra citada limita: "numa semana de 3 dias ou mais".
- **Frase:** "Nunca em todos os dias, havendo outro." Não traz a condição dos 3 dias.
- **Código:** G:204 `const limiteDeRepeticao = perfil.diasSemana >= 3 ? perfil.diasSemana - 1 : Infinity;` e G:225 `variedadeOuPratica = (u) => (nivel === 'iniciante' && !semPratica ? (u >= limiteDeRepeticao ? 1000 + u : -u) : u)`. Com 2 dias o limite é infinito, e quem já está na semana sempre vem antes.
- **Exemplo (rodado):** iniciante, 2 dias de 60 min, academia completa, sem foco: `abdominal-maquina` nos dois dias, com `abdominal-polia` e `abdominal-declinado` no mesmo nível. Sem equipamento, 2 dias de 45 min: `flexao`, `flexao-joelho-deslizante` e `abdominal-chao` nos dois dias.
- **Observação menor:** a prática também cai quando o limite de 6 exercícios custa volume (G:506-507, `custaVolume` devolve a montagem `sem`, que desliga as duas regras). Isso está escrito em `tempo.exercicios-do-iniciante`, não nesta regra nem nesta frase.
- **Conserto em uma linha:** dizer na frase "com 3 dias ou mais, nunca em todos os dias".

### selecao.dia-sem-principal: o código diverge (3 pontos)

1. **O dia fraco não precisa vir da dor.**
   - Regra: "quando a dor acima de 5 deixa algum dia da divisão recomendada com menos de 3 exercícios ou sem multiarticular". Frase: "Se a dor acima de 5 deixa algum dia…".
   - Código: G:406 `if (perfil.divisao || base.status !== 'ok' || !base.programa.regioesExcluidas.length || !diasFracos(base.programa, perfil.diasSemana)) return base;`. Basta haver uma região excluída e um dia fraco qualquer.
   - Exemplo (rodado): iniciante, 5 dias de 30 min, halteres de 1 a 12 kg e banco reto, sem foco, dor 7 no joelho. Sem a dor, a divisão recomendada já tem 1 dia fraco (Empurrar: crucifixo, elevação lateral e tríceps francês, sem multiarticular). Com a dor continua com 1, e o programa sai em Corpo todo 5x com o aviso "Por causa da dor no joelho (7 hoje)… na divisão recomendada, um dos dias ficaria quase vazio". O mesmo acontece com elásticos e barra fixa.
   - Conserto: comparar com os dias fracos da mesma divisão sem a dor, ou mudar o texto do aviso.
2. **O foco pode perder séries.**
   - Regra: a troca não pode custar "o foco abaixo do que tinha". Frase: "ou o foco com menos séries".
   - Código: G:420 `focoDoPerfil.every((m) => (p.volumeSemanal[m] ?? 0) >= Math.min(p0.volumeSemanal[m] ?? 0, metasDoFoco[m] ?? 0))`. O foco pode cair, desde que fique na meta.
   - Exemplo (rodado): iniciante, 4 dias de 60 min, academia completa, foco em peito e braços, dor 7 no quadril: Superior/Inferior (2x) vira Corpo todo 4x e o tríceps vai de 10,5 para 10 séries (meta 10). A diferença é pequena.
   - Conserto: frase e regra dizerem "o foco abaixo da meta que tinha alcançado".
3. **"Acima de 5" inclui a dor sem nota** (dado antigo): `src/domain/triagem/index.ts:67` `if (nota === undefined || nota > 5) return 'exclui'`. A regra e a frase só falam em "acima de 5". Menor.

O resto confere: a vaga de multiarticular que a dor esvaziou recebe outra função do mesmo músculo e do mesmo tipo, primeiro uma que o dia não tem (G:605-619); o preenchimento é um por músculo, dentro do teto (G:771-788); o dia só de abdômen recebe ao menos um; os três textos de aviso existem (G:797-814); a vaga perdida pela dor não vira lacuna de equipamento (G:628-632); a troca não acontece se a pessoa escolheu a divisão; o Corpo todo 6x entra como opção com 6 dias (G:423-424).

### selecao.preferencia: o código diverge (a regra e a frase ficaram para trás)

- **Regra (valores):** "antes da animação e da ordem alfabética". **Frase:** "e antes da animação e da ordem alfabética".
- **Código:** G:236-237 põe a preferência antes da animação, e o empate final é G:245 `return ordemDeReferencia(funcaoDe(a), a, funcaoDe(b), b);`. O comentário de G:212-214 diz: "a ordem de referência da lista da função… e não a alfabética". A regra `selecao.funcao-da-vaga` e a frase dela já dizem isso ("8) é o mais comum e mais simples de montar").
- **Exemplo:** no puxar vertical com tudo empatado, sai `puxada-frente` (a 1ª da lista de F:5), e não `barra-fixa`, que viria antes pela ordem alfabética. Rodado: intermediário, 4 dias, academia completa: Superior A com `puxada-frente`.
- **Também não está na frase:** entre a carga possível e a variedade há mais dois critérios, a lombar no dia (G:232) e os dois lados (G:234); e, para o iniciante, a "variedade entre os dias" é a prática (G:225).
- **Conserto:** trocar "ordem alfabética" por "ordem de referência da função" na regra e na frase.

### selecao.exercicios-por-musculo: o código diverge (leitura literal dos pequenos)

- **Regra (valores):** "pequenos: 1, ou 2 se forem prioridade". **Frase:** "Os pequenos recebem 1, ou 2 se forem prioridade."
- **Código:** nada limita o músculo pequeno a 1 exercício. A variedade entre os dias (G:235, para intermediário e avançado) troca o exercício de um dia para o outro, e o complemento de tríceps é vaga sem prioridade (D:80 `c('triceps-complemento')`, D:144, D:158, D:200, D:209).
- **Exemplo (rodado):** intermediário, 4 dias de 60 min, academia completa, sem nenhum foco: bíceps com `rosca-scott` e `rosca-inclinada`; tríceps com `triceps-frances` e `triceps-corda`; ombro posterior com `voador-invertido` e `crucifixo-inverso`; panturrilha com `panturrilha-em-pe-maquina` e `panturrilha-leg-press`; abdômen com `abdominal-polia` e `abdominal-maquina`.
- **Se a regra quer dizer "pelo menos 1", o código bate** e só a frase precisa de "pelo menos".
- **Outra ressalva da frase:** "recebem 2 exercícios diferentes" é dito sem condição; no código vale "havendo outra família possível e lugar no tempo" (G:1558-1560, G:1513-1529).

### selecao.manter-no-bloco: não está no app

- **Regra:** "Mantém os exercícios por 4–8 semanas (o programa só muda quando a pessoa pede); ao trocar de bloco, varia dentro da mesma função".
- **Frase:** "Os exercícios ficam os mesmos por 4–8 semanas, e o programa só muda quando você pede. Na troca de bloco, a variação fica dentro da mesma função."
- **Código:** a única ocorrência é o texto do porquê do programa (G:1409). Não achei nada que conte as semanas do bloco para os exercícios, que ofereça trocar de bloco, nem que varie os exercícios. O "bloco" de `src/domain/sessao/bloco.ts` é o das pausas (volta gradual), sem relação com a seleção. Como o gerador é determinístico, refazer o programa com as mesmas entradas devolve os mesmos exercícios.
- **O que vale de fato:** o programa não muda sozinho. A 2ª parte da frase ("Na troca de bloco, a variação fica dentro da mesma função") dá a entender uma função que o app não tem.
- **Conserto:** tirar a 2ª parte da frase ou marcá-la como orientação.

### selecao.mergulho: o código diverge (depende da leitura de "restrição")

- **Regra (valores):** "nível 2; só com o ombro sem restrição". **Frase:** "só entra com o ombro sem restrição".
- **Código:** o mergulho só sai quando o ombro (ou o cotovelo) é região excluída: G:174-175 `carregaExcluida`, e `src/domain/triagem/index.ts:67-69` (exclui só acima de 5 ou sem nota; de 3 a 5 é "prefere-outros").
- **Exemplo (rodado):** intermediário, 4 dias de 60 min, paralelas e barra fixa, dor 4 no ombro marcada na triagem: Superior B sai com `mergulho`, 4 séries.
- Se "sem restrição" quer dizer "sem dor acima de 5", bate; quem marcou dor 4 no ombro lê a frase de outro jeito.
- **Conserto:** a frase dizer "sai com dor acima de 5 no ombro".

### selecao.aducao-complemento: o código diverge ("sai primeiro nos cortes")

- **Regra (valores):** "só quando pernas ou glúteos são prioridade e há tempo; sai primeiro nos cortes; nunca gera aviso". **Frase:** "sai primeiro nos cortes".
- **Código, no corte de tempo:** G:2078-2081 tira, entre os isoladores sem foco, não obrigatórios e removíveis, o de maior posição no dia (`.sort((a, b) => b.i - a.i)[0]`). A ordem do dia põe o abdômen por último (G:1000), depois da adução. Havendo um abdominal removível, ele sai antes dela.
- **Exemplo (rodado, `cortarTempo` direto):** programa de intermediário, Corpo todo 4x, foco em pernas, academia completa, gerado com 90 min. Cortando para 60 min, o Corpo todo B perde `abdominal-maquina` e fica com `aducao-maquina`. A adução só sai com o limite de 55 min.
- **Código, na escolha das vagas que cabem:** G:643 dá à adução o rank 2 (complemento de prioridade), na frente dos complementos sem prioridade (rank 3). Rodado: iniciante, 3 dias de 75 min, sem equipamento, foco em pernas e glúteos: o Corpo todo B tem `aducao-deitado` e não tem o abdominal (complemento).
- **O que confere:** só entra com o foco (D:95, D:108, D:134, D:191, D:240, D:251, D:267), é a última vaga do dia e não tem `lacuna` (F:20), então não gera aviso.
- **Conserto:** no corte, tirar primeiro o exercício da função `aducao`; ou tirar "sai primeiro nos cortes" da regra e da frase.

### selecao.complexidade-nivel: a frase diverge (lista incompleta)

- **Regra:** "o iniciante fica até 2 (o mergulho nas paralelas, o nórdico e a roda abdominal ficam de fora…)".
- **Frase:** "Ficam fora do iniciante o mergulho nas paralelas (ombro), o nórdico (dor forte na 1ª sessão) e a roda abdominal (lombar)."
- **Código e dados:** G:172 `e.complexidade <= NIVEL_COMPLEXIDADE_MAX[nivel]`, com `{ iniciante: 2, intermediario: 3, avancado: 3 }` (`src/domain/regras/index.ts:164`). Na biblioteca, 10 exercícios têm complexidade 3: `supino-barra`, `remada-barra`, `desenvolvimento-barra`, `agachamento-barra`, `terra-romeno-barra`, `mergulho`, `nordico`, `bulgaro-suspensao`, `roda-abdominal`, `flexao-pes-elevados`.
- **Exemplo (rodado):** iniciante, 2 dias de 60 min, academia completa com barra longa e rack: o programa sai com `leg-press`, `supino-reto` (halteres) e `stiff`; nunca com agachamento livre, supino com barra ou terra romeno com barra. A frase não avisa disso.
- **Conserto:** a frase dizer "por exemplo" e citar os exercícios com barra livre.

### selecao.nordico: o código diverge (1ª semana com 2 séries)

- **Regra (valores):** "a 1ª semana com 2 séries (o mínimo do programa)"; "começa com poucas séries".
- **Frase:** "A 1ª semana tem 2 séries, o mínimo do programa. Começa com poucas séries…".
- **Código:** não achei o código. Fora do motor de animação, `nordico` só aparece nos dados (`exercicios.json:3765`, F:16, `escadas.json:102`, a ficha de conteúdo). O gerador não tem caso especial: o nórdico recebe séries pela distribuição comum (G:868-899) e pela sobra de tempo (G:1139-1207), até 4. As fases só existem para o iniciante e para a volta de pausa.
- **Exemplo (rodado):** intermediário, sem equipamento, 2 dias de 60 min, foco em pernas: Corpo todo B com `nordico` 4 séries, sem fase (`fases: []`), ou seja, 4 séries já na 1ª semana. Com 3 dias de 60 min também saem 4; com 4 dias de 75 min, 3 e 4 em dois dias (7 na semana).
- **O que confere:** complexidade 3 (fora do iniciante), faixa de 6 a 10, calcanhares presos, descida lenta e mãos amortecendo (ficha `src/conteudo/exercicios/nordico.json`, que também manda "comece com poucas descidas").
- **Conserto:** travar o nórdico em 2 séries na 1ª semana do programa, ou tirar a promessa da frase.

## Ressalvas dos que batem

- **selecao.vaga-sem-equipamento:** "o aviso diz o que falta" só vale para as funções com `lacuna` em `funcoes.json` (extensora, abdução, panturrilha sentada), para a puxada vertical e para "sem algo para puxar" (G:830-848, G:2148-2153). Rodado: intermediário, sem equipamento, 3 dias de 60 min: a vaga de crucifixo do Corpo todo A fica vazia (peito já na meta) e nenhum aviso cita o crucifixo. Outra: "abaixo da meta" é medido com todos os exercícios ainda em 2 séries (G:702-703), antes da distribuição.
- **selecao.gluteo:** a abdução é `c('abducao', ['gluteos'])` em todas as divisões; sem glúteos como foco ela não entra, mesmo sobrando tempo (rodado: intermediário, 4 dias de 60 min, academia completa, sem foco: Inferior A com 45 min e sem abdução). A frase diz só "abdução como complemento".
- **selecao.flexao-joelho-sem-maquina:** o nível 4 de F:16 tem um 3º exercício, `flexao-joelho-suspensao` (pede fitas de suspensão, complexidade 2), que a regra e a frase não citam.
- **selecao.lombar-no-dia:** a lista de quem "carrega a lombar sem apoio" sai dos dados (G:1704) e é maior que os exemplos da regra: inclui a remada baixa na polia, o pull-through, o agachamento no smith e o terra com barra hexagonal. A regra só atua no preenchimento principal das vagas (G:673), não na vaga vazia, no dia refeito pela dor nem no 2º exercício do foco.
- **selecao.crucifixo-complemento:** nas divisões Empurrar B e clássicas o crucifixo é vaga-base (`v('crucifixo')`, D:207, D:255, D:271), sempre ao lado de uma vaga de empurrar.
- **selecao.abdomen-prioridade:** nas clássicas, os dias sem vaga de abdômen não ganham a vaga pela divisão; rodado com o iniciante na Clássica ABCD, o abdominal entrou no dia de peito pela regra do 2º exercício do foco, e o dia de pernas ficou sem.

## O que não rodei

- Não abri o app no navegador nem rodei `npm run check`: a tarefa era de leitura e nada foi mudado.
- Não conferi `docs/pesquisa/regras.md` linha a linha contra `regras.json`; usei o `regras.json`.
- Um gancho de "portão do envio" apareceu numa chamada de terminal; não fiz `git push` nem commit.
