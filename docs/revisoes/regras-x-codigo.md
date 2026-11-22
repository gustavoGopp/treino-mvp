# Regras × código: a conferência regra por regra (pacote D1)

> Sessão de melhorias da análise crítica, 22/11/2026. As 166 regras de `docs/pesquisa/regras.md` foram conferidas contra o código e contra a frase simples de "Entenda o treino" (`src/conteudo/frases-das-regras.json`) por sete conferentes independentes, cada um com um grupo de regras e sem a hipótese da sessão. Os relatórios inteiros estão em `regras-x-codigo/`.
>
> **Como ler.** "Classificação" é a do conferente. "Situação" é o que a sessão fez depois de conferir no código: *confirmado* ou *não confirmado*, e o destino (consertado, com o commit; decisão do Gustavo; backlog, com o motivo). Enquanto diz "a conferir", o apontamento ainda não vale como achado.

## Resumo (classificação dos conferentes)

| classificação | regras |
|---|---|
| bate | 93 |
| o código diverge | 53 |
| a frase diverge | 12 |
| não está no app | 8 |
| **total** | **166** |

## O que a sessão fez com os apontamentos

Dos 73 apontamentos que não eram "bate":

- **Consertados no código, com teste (7):** o menos e o mais da barra andam no passo do local (`equipamento.menor-anilha`); o acerto da carga não sugere nada com dor de 3 ou mais na série (`progressao.calibracao`); a semana leve espera 3 semanas também na volta de pausa declarada no cadastro (`deload.semana-leve`); "mantendo" só a partir de 1 série (`acompanhamento.semana`); no objetivo de força, a troca do corte de tempo mantém as 5 a 8 repetições e o descanso longo (`objetivo.forca.faixa-compostos` e `.descanso`); o porquê da extensão de joelho com mini-band (`selecao.item-sozinho-ampliado`).
- **Textos do app acertados à regra (4):** o texto da dieta, o da saúde e os ângulos dos dois guias de supino.
- **Regras e frases que ficaram para trás, acertadas ao que o app faz:** a maior parte. Cada uma está na tabela.
- **Para o pacote D3 (mudam programas; pedem personas e régua antes e depois):** 15 apontamentos do gerador, listados em `docs/backlog.md`. A sessão não reproduziu esses; os conferentes rodaram o gerador e deram o exemplo.
- **Decididos pela sessão, por delegação do Gustavo em 22/11/2026 (6):** "Senti algo" ganhou dois sinais; 9 exercícios ganharam a marca de montagem e 4 a nota; 6 guias de elástico ganharam o aviso; as regras da dor e do "não diagnostica" foram acertadas ao que o app faz; o limite do nórdico foi para o D3. Cada um está na tabela, para a revisão dele.
- **Nada a fazer:** as regras de referência e as que a frase já diz que não estão no app.

## As 166 regras

| id | classificação | relatório | situação |
|---|---|---|---|
| `selecao.equivalencia-equipamento` | bate | [selecao-1](regras-x-codigo/selecao-1.md) | — |
| `selecao.amplitude` | bate | [selecao-1](regras-x-codigo/selecao-1.md) | — |
| `selecao.comprimento-longo` | bate | [selecao-1](regras-x-codigo/selecao-1.md) | — |
| `selecao.estabilidade` | o código diverge (leve) | [selecao-1](regras-x-codigo/selecao-1.md) | apontado com exemplo rodado pelo conferente; a sessão não reproduziu. Consertar muda programas: vai para o pacote D3 (personas e régua antes e depois), anotado no backlog (13 dos 21 exercícios de polia sem a marca "estável") |
| `selecao.variacao` | não está no app | [selecao-1](regras-x-codigo/selecao-1.md) | conferido no código; frase e regra acertadas: é orientação, o app não planeja a variação |
| `selecao.variacoes-equivalentes` | a frase diverge | [selecao-1](regras-x-codigo/selecao-1.md) | conferido no código; frase e regra acertadas: o iniciante repete o exercício |
| `selecao.corpo-livre-ampliado` | bate | [selecao-1](regras-x-codigo/selecao-1.md) | — |
| `selecao.halteres-ampliado` | bate | [selecao-1](regras-x-codigo/selecao-1.md) | — |
| `selecao.elastico-ampliado` | o código diverge | [selecao-1](regras-x-codigo/selecao-1.md) | conferido nos guias; **decidido pela sessão, por delegação: consertado.** Os 5 em que se pisa no elástico pedem o pé inteiro, e a extensão de joelho com elástico pede conferir rachaduras |
| `selecao.barra-negativa` | bate | [selecao-1](regras-x-codigo/selecao-1.md) | — |
| `selecao.barra-negativa-iniciante` | bate | [selecao-1](regras-x-codigo/selecao-1.md) | — |
| `selecao.item-sozinho-ampliado` | o código diverge (leve) | [selecao-1](regras-x-codigo/selecao-1.md) | conferido no código; **consertado**: o porquê da extensão de joelho com mini-band dizia "abdução". A nota de evidência fraca no guia fica no backlog |
| `selecao.complementos` | o código diverge | [selecao-1](regras-x-codigo/selecao-1.md) | apontado com exemplo rodado pelo conferente; a sessão não reproduziu. Consertar muda programas: vai para o pacote D3 (personas e régua antes e depois), anotado no backlog; a frase já diz que o 2º de tríceps depende de o dia ter lugar |
| `selecao.peitoral-inclinado` | o código diverge | [selecao-1](regras-x-codigo/selecao-1.md) | apontado com exemplo rodado pelo conferente; a sessão não reproduziu. Consertar muda programas: vai para o pacote D3 (personas e régua antes e depois), anotado no backlog (com 5 ou 6 dias de 30 min e sem banco inclinável, o dia de Empurrar sai com dois crucifixos e nenhum supino) |
| `selecao.triceps-acima-cabeca` | o código diverge | [selecao-1](regras-x-codigo/selecao-1.md) | apontado com exemplo rodado pelo conferente; a sessão não reproduziu. Consertar muda programas: vai para o pacote D3 (personas e régua antes e depois), anotado no backlog (717 de 6.840 programas, todos de 30 min); a frase já diz "quando cabe no tempo" |
| `selecao.flexora-sentada` | bate | [selecao-1](regras-x-codigo/selecao-1.md) | — |
| `selecao.panturrilha-alongada` | o código diverge (leve) | [selecao-1](regras-x-codigo/selecao-1.md) | apontado com exemplo rodado pelo conferente; a sessão não reproduziu. Consertar muda programas: vai para o pacote D3 (personas e régua antes e depois), anotado no backlog |
| `selecao.multi-mono` | bate | [selecao-1](regras-x-codigo/selecao-1.md) | — |
| `selecao.funcao-da-vaga` | a frase diverge | [selecao-1](regras-x-codigo/selecao-1.md) | conferido no código; frase e regra acertadas (o iniciante repete; a lombar no dia entra no desempate) |
| `selecao.lombar-no-dia` | bate | [selecao-2](regras-x-codigo/selecao-2.md) | — |
| `selecao.pratica-do-iniciante` | a frase diverge | [selecao-2](regras-x-codigo/selecao-2.md) | conferido no código; frase e regra acertadas: vale com 3 dias ou mais |
| `selecao.dia-sem-principal` | o código diverge | [selecao-2](regras-x-codigo/selecao-2.md) | conferido no código; frase e regra acertadas no ponto do foco. O aviso que culpa a dor por um dia fraco que já existia: apontado com exemplo rodado pelo conferente; a sessão não reproduziu. Consertar muda programas: vai para o pacote D3 (personas e régua antes e depois), anotado no backlog |
| `selecao.vaga-sem-equipamento` | bate | [selecao-2](regras-x-codigo/selecao-2.md) | — |
| `selecao.preferencia` | o código diverge | [selecao-2](regras-x-codigo/selecao-2.md) | conferido no código; frase e regra acertadas: ordem de referência da função, e não alfabética |
| `selecao.alongado` | bate | [selecao-2](regras-x-codigo/selecao-2.md) | — |
| `selecao.exercicios-por-musculo` | o código diverge | [selecao-2](regras-x-codigo/selecao-2.md) | conferido no código; frase e regra acertadas: os pequenos recebem pelo menos 1 |
| `selecao.isolador-obrigatorio` | bate | [selecao-2](regras-x-codigo/selecao-2.md) | — |
| `selecao.equivalencia` | bate | [selecao-2](regras-x-codigo/selecao-2.md) | — |
| `selecao.manter-no-bloco` | não está no app | [selecao-2](regras-x-codigo/selecao-2.md) | conferido no código; frase e regra acertadas: o app não propõe trocar de bloco |
| `selecao.gluteo` | bate | [selecao-2](regras-x-codigo/selecao-2.md) | — |
| `selecao.crucifixo-complemento` | bate | [selecao-2](regras-x-codigo/selecao-2.md) | — |
| `selecao.mergulho` | o código diverge | [selecao-2](regras-x-codigo/selecao-2.md) | conferido no código; frase e regra acertadas: sai com dor acima de 5 no ombro ou no cotovelo |
| `selecao.aducao-complemento` | o código diverge | [selecao-2](regras-x-codigo/selecao-2.md) | conferido no código; frase acertada (saiu o "sai primeiro nos cortes"); mudar a ordem do corte: apontado com exemplo rodado pelo conferente; a sessão não reproduziu. Consertar muda programas: vai para o pacote D3 (personas e régua antes e depois), anotado no backlog |
| `selecao.abdomen-prioridade` | bate | [selecao-2](regras-x-codigo/selecao-2.md) | — |
| `selecao.complexidade-nivel` | a frase diverge | [selecao-2](regras-x-codigo/selecao-2.md) | conferido no código; frase e regra acertadas, com os exercícios de barra livre |
| `selecao.dobrar-quadril` | bate | [selecao-2](regras-x-codigo/selecao-2.md) | — |
| `selecao.flexao-joelho-sem-maquina` | bate | [selecao-2](regras-x-codigo/selecao-2.md) | — |
| `selecao.nordico` | o código diverge | [selecao-2](regras-x-codigo/selecao-2.md) | **decidido pela sessão, por delegação:** a frase diz que o app ainda não limita as séries na 1ª semana; o limite de 2 séries vai para o pacote D3 (muda programas) |
| `reps.equivalencia-cargas` | bate | [progressao](regras-x-codigo/progressao.md) | — |
| `reps.faixa.por-tipo` | o código diverge | [progressao](regras-x-codigo/progressao.md) | confirmado; regra e frase acertadas: cada exercício tem a sua faixa na biblioteca, e 27 saem do padrão |
| `reps.faixa.degrau` | o código diverge | [progressao](regras-x-codigo/progressao.md) | confirmado; regra e frase acertadas, com os exercícios que saem da faixa |
| `reps.teto.carga-limitada` | bate | [progressao](regras-x-codigo/progressao.md) | — |
| `rir.falha.nao-necessaria` | bate | [progressao](regras-x-codigo/progressao.md) | — |
| `rir.alvo` | bate | [progressao](regras-x-codigo/progressao.md) | — |
| `rir.serie-efetiva` | o código diverge | [progressao](regras-x-codigo/progressao.md) | confirmado; regra e frase dizem agora que "4 ou mais" conta como 4. Separar o "5 ou mais" no registro muda o dado guardado: backlog |
| `rir.carga-baixa` | o código diverge (leve) | [progressao](regras-x-codigo/progressao.md) | confirmado; regra e frase acertadas: só muda o composto do iniciante; os outros níveis já ficam em até 2 |
| `rir.leitura` | não está no app (a frase dá a entender que está) | [progressao](regras-x-codigo/progressao.md) | confirmado; regra e frase acertadas: o app usa o número informado, sem corrigir |
| `rir.calibracao` | não está no app (a frase deixa claro) | [progressao](regras-x-codigo/progressao.md) | confirmado; nada a fazer: a frase diz que ainda não está no app |
| `cadencia.repeticao` | bate (com ressalva) | [progressao](regras-x-codigo/progressao.md) | — |
| `progressao.subir` | bate | [progressao](regras-x-codigo/progressao.md) | — |
| `progressao.manter` | bate | [progressao](regras-x-codigo/progressao.md) | — |
| `progressao.reduzir` | o código diverge (arredondamento) | [progressao](regras-x-codigo/progressao.md) | confirmado; regra e frase acertadas: a redução fica com a carga disponível logo abaixo, que pode passar de 10% |
| `progressao.incremento.halteres` | bate | [progressao](regras-x-codigo/progressao.md) | — |
| `progressao.incremento.polia` | bate | [progressao](regras-x-codigo/progressao.md) | — |
| `progressao.incremento.maquina-anilha` | bate | [progressao](regras-x-codigo/progressao.md) | — |
| `progressao.incremento.assistido` | bate | [progressao](regras-x-codigo/progressao.md) | — |
| `progressao.incremento.peso-corporal` | bate | [progressao](regras-x-codigo/progressao.md) | — |
| `progressao.escada-por-exercicio` | bate | [progressao](regras-x-codigo/progressao.md) | — |
| `progressao.negativa-para-barra` | bate | [progressao](regras-x-codigo/progressao.md) | — |
| `progressao.escada-elastico` | bate | [progressao](regras-x-codigo/progressao.md) | — |
| `progressao.degrau-inicial` | bate | [progressao](regras-x-codigo/progressao.md) | — |
| `progressao.criterio-degrau` | bate | [progressao](regras-x-codigo/progressao.md) | — |
| `progressao.salto-grande` | bate | [progressao](regras-x-codigo/progressao.md) | — |
| `progressao.carga-leve` | bate | [progressao](regras-x-codigo/progressao.md) | — |
| `progressao.calibracao` | o código diverge (e a frase tem um número a mais) | [progressao](regras-x-codigo/progressao.md) | confirmado; **consertado com teste**: com dor de 3 ou mais na série, o acerto não sugere carga. A frase ganhou o "no mínimo 1 passo". (A faixa do "perto" mudou no lote M3, por decisão do Gustavo.) |
| `progressao.troca-equivalente` | bate | [progressao](regras-x-codigo/progressao.md) | — |
| `progressao.criterios-invalidos` | não está no app (a frase não deixa claro) | [progressao](regras-x-codigo/progressao.md) | confirmado; regra e frase acertadas: a amplitude é orientação, e nenhuma tela pergunta por ela |
| `progressao.estagnacao` | bate | [progressao](regras-x-codigo/progressao.md) | — |
| `deload.semana-leve` | o código diverge | [progressao](regras-x-codigo/progressao.md) | confirmado; **consertado com teste**: a volta de pausa declarada no cadastro também tem as 3 semanas de carência |
| `registro.treino-feito` | bate | [progressao](regras-x-codigo/progressao.md) | — |
| `volume.semanal.dose-resposta` | não está no app | [volume](regras-x-codigo/volume.md) | nada a fazer: é regra de referência, e a frase não promete ação do app |
| `volume.semanal.minimo` | o código diverge | [volume](regras-x-codigo/volume.md) | apontado com exemplo rodado pelo conferente; a sessão não reproduziu. Consertar muda programas: vai para o pacote D3 (personas e régua antes e depois), anotado no backlog (1.814 de 10.920 programas com foco: o foco que já está abaixo do mínimo perde mais séries no corte); a frase foi acertada |
| `volume.semanal.alvo` | bate | [volume](regras-x-codigo/volume.md) | — |
| `volume.prioridade.competicao` | bate | [volume](regras-x-codigo/volume.md) | — |
| `volume.prioridade.foco-primeiro` | a frase diverge | [volume](regras-x-codigo/volume.md) | conferido no código; frase acertada: com 3 grupos de foco ou mais, o foco para na meta |
| `volume.prioridade.segundo-exercicio` | o código diverge | [volume](regras-x-codigo/volume.md) | conferido no código; frase acertada: até 2 exercícios a mais, e a função se repete quando o músculo só tem uma |
| `volume.prioridade.ate-dois` | bate | [volume](regras-x-codigo/volume.md) | — |
| `volume.semanal.maximo` | o código diverge | [volume](regras-x-codigo/volume.md) | conferido no código; frase acertada: o máximo do nível vale para o tempo que sobra. Fazer valer na distribuição: apontado com exemplo rodado pelo conferente; a sessão não reproduziu. Consertar muda programas: vai para o pacote D3 (personas e régua antes e depois), anotado no backlog |
| `volume.semanal.teto-padrao` | a frase diverge | [volume](regras-x-codigo/volume.md) | conferido no código; frase acertada: o app não oferece passar de 20 |
| `volume.semanal.minimo-eficaz` | bate | [volume](regras-x-codigo/volume.md) | — |
| `volume.semanal.abdomen` | bate | [volume](regras-x-codigo/volume.md) | — |
| `volume.manutencao.piso` | não está no app | [volume](regras-x-codigo/volume.md) | nada a fazer: a frase diz que ainda não está no app |
| `volume.sessao.teto` | bate | [volume](regras-x-codigo/volume.md) | — |
| `volume.equilibrio-coxa` | o código diverge | [volume](regras-x-codigo/volume.md) | apontado com exemplo rodado pelo conferente; a sessão não reproduziu. Consertar muda programas: vai para o pacote D3 (personas e régua antes e depois), anotado no backlog (95 de 28.224 programas, só com divisão escolhida) |
| `volume.serie-indireta.peso` | bate | [volume](regras-x-codigo/volume.md) | — |
| `volume.series-por-exercicio` | bate | [volume](regras-x-codigo/volume.md) | — |
| `frequencia.efeito-hipertrofia` | não está no app | [volume](regras-x-codigo/volume.md) | nada a fazer: é regra de referência |
| `frequencia.musculo` | bate | [volume](regras-x-codigo/volume.md) | — |
| `divisao.equivalencia` | bate | [volume](regras-x-codigo/volume.md) | — |
| `divisao.frequencia-minima` | bate | [volume](regras-x-codigo/volume.md) | — |
| `divisao.recomendacao` | bate | [volume](regras-x-codigo/volume.md) | — |
| `divisao.seis-dias` | bate | [volume](regras-x-codigo/volume.md) | — |
| `divisao.classica` | bate | [volume](regras-x-codigo/volume.md) | — |
| `divisao.sem-puxar` | o código diverge | [volume](regras-x-codigo/volume.md) | apontado: sem equipamento de puxar, a tela da rotina ainda marca como recomendada a divisão de sempre, e com 6 dias o aviso manda escolher "Corpo todo", que a tela não oferece. Backlog, pacote D3 |
| `objetivo.pergunta` | bate | [volume](regras-x-codigo/volume.md) | — |
| `objetivo.cutting.mesmo-programa` | bate | [volume](regras-x-codigo/volume.md) | — |
| `objetivo.cutting.texto` | o código diverge (leve) | [volume](regras-x-codigo/volume.md) | conferido no código; **consertado**: o texto do app passou a dizer "o músculo tende a crescer pouco", como a regra |
| `objetivo.forca.faixa-compostos` | o código diverge | [volume](regras-x-codigo/volume.md) | reproduzido pela sessão (60 de 288 programas da grade); **consertado com teste**: a troca do corte de tempo mantém as 5 a 8 repetições |
| `objetivo.forca.descanso` | o código diverge | [volume](regras-x-codigo/volume.md) | mesma causa e mesmo conserto da faixa de força |
| `objetivo.forca.seguranca` | o código diverge (leve) | [volume](regras-x-codigo/volume.md) | conferido no código; frase acertada: as máquinas de anilha entram na lista (erra para o lado cauteloso) |
| `objetivo.saude.texto` | o código diverge (leve) | [volume](regras-x-codigo/volume.md) | conferido no código; **consertado**: o texto do app ganhou o "ou 75 a 150 de vigorosa" |
| `descanso.piso` | bate | [tempo](regras-x-codigo/tempo.md) | — |
| `descanso.por-tipo` | bate | [tempo](regras-x-codigo/tempo.md) | — |
| `readaptacao.gatilho` | o código diverge | [tempo](regras-x-codigo/tempo.md) | apontado com exemplo rodado pelo conferente; a sessão não reproduziu. Consertar muda programas: vai para o pacote D3 (personas e régua antes e depois), anotado no backlog (a reserva a mais da pausa de 2 semanas volta quando a pessoa muda a rotina) |
| `readaptacao.durante-uso` | bate | [tempo](regras-x-codigo/tempo.md) | — |
| `readaptacao.semana1` | o código diverge | [tempo](regras-x-codigo/tempo.md) | conferido: na volta declarada no cadastro não há histórico, e o texto da fase diz "10–20% abaixo da que você usava"; os 10% ou 15% da regra valem sobre o histórico. Regra anotada |
| `readaptacao.semana2` | bate | [tempo](regras-x-codigo/tempo.md) | — |
| `readaptacao.semana3` | bate | [tempo](regras-x-codigo/tempo.md) | — |
| `iniciante.fase-aprendizado` | o código diverge | [tempo](regras-x-codigo/tempo.md) | conferido no código; frase acertada (2 semanas, não "2 a 3"). O iniciante que declara pausa fica sem a fase de aprendizado: apontado com exemplo rodado pelo conferente; a sessão não reproduziu. Consertar muda programas: vai para o pacote D3 (personas e régua antes e depois), anotado no backlog |
| `ordem.sessao` | bate | [tempo](regras-x-codigo/tempo.md) | — |
| `tempo.serie` | bate | [tempo](regras-x-codigo/tempo.md) | — |
| `tempo.transicao` | bate | [tempo](regras-x-codigo/tempo.md) | — |
| `tempo.aquecimento` | o código diverge | [tempo](regras-x-codigo/tempo.md) | conferido no código; frase e regra acertadas: o app lembra no 1º exercício do treino (corte aprovado em 22/11); o modelo de tempo conta 90 s a mais por músculo novo |
| `tempo.colchao` | bate | [tempo](regras-x-codigo/tempo.md) | — |
| `tempo.calibracao` | bate | [tempo](regras-x-codigo/tempo.md) | — |
| `tempo.exercicios-por-sessao` | bate | [tempo](regras-x-codigo/tempo.md) | — |
| `tempo.exercicios-do-iniciante` | bate | [tempo](regras-x-codigo/tempo.md) | — |
| `tempo.corte` | bate | [tempo](regras-x-codigo/tempo.md) | — |
| `tempo.sobra` | bate | [tempo](regras-x-codigo/tempo.md) | — |
| `tempo.sobra-series` | a frase diverge | [tempo](regras-x-codigo/tempo.md) | apontado com exemplo rodado pelo conferente; a sessão não reproduziu. Consertar muda programas: vai para o pacote D3 (personas e régua antes e depois), anotado no backlog (a trava do iniciante só vale no 2º passo do tempo que sobra) |
| `tempo.musculo-protegido` | bate | [tempo](regras-x-codigo/tempo.md) | — |
| `tempo.superserie` | o código diverge | [tempo](regras-x-codigo/tempo.md) | conferido no código; a tela do treino não conduz a dupla (cada série ganha o descanso inteiro), e a frase agora diz isso. Conduzir a dupla, e tirar a dupla do iniciante que volta de pausa: backlog, pacote D3 |
| `tempo.drop-set` | o código diverge | [tempo](regras-x-codigo/tempo.md) | conferido no código; frase acertada: kettlebell e caneleira entram |
| `tempo.outras-tecnicas` | não está no app | [tempo](regras-x-codigo/tempo.md) | conferido no código; frase acertada: é orientação, o app não prescreve |
| `tecnica.flexao.punho` | bate | [tempo](regras-x-codigo/tempo.md) | — |
| `tecnica.parcial-alongada` | bate | [tempo](regras-x-codigo/tempo.md) | — |
| `nivel.classificacao` | o código diverge | [tempo](regras-x-codigo/tempo.md) | conferido no código; frase acertada: o app não pergunta pelo ritmo do progresso |
| `tecnica.remada-baixa.polia` | bate | [tempo](regras-x-codigo/tempo.md) | — |
| `tecnica.barra-fixa.pegada` | bate | [tempo](regras-x-codigo/tempo.md) | — |
| `tecnica.supino-inclinado.angulo` | o código diverge | [tempo](regras-x-codigo/tempo.md) | conferido no código; **consertado**: o guia dizia "entre 30° e 45°"; a regra aceita de 15° a 45° |
| `tecnica.supino-halteres.cotovelos` | o código diverge | [tempo](regras-x-codigo/tempo.md) | conferido no código; **consertado**: os dois guias diziam "~30° e ~70°"; a regra diz 30° a 60° |
| `equipamento.fim-da-escada` | o código diverge | [equipamento](regras-x-codigo/equipamento.md) | confirmado; regra e frase acertadas: o aviso está no motivo da sugestão, que desde 16/11 aparece em "Entenda o treino". Voltar o aviso à tela do treino fica no backlog |
| `local.treino-do-dia` | bate | [equipamento](regras-x-codigo/equipamento.md) | — |
| `equipamento.escada-carga-leve` | o código diverge | [equipamento](regras-x-codigo/equipamento.md) | confirmado; frase acertada: a ordem é resumida no motivo da sugestão, e o aviso de fim da escada vale no peso do corpo |
| `equipamento.bfr` | não está no app | [equipamento](regras-x-codigo/equipamento.md) | confirmado; nada a fazer: a regra é cumprida por ausência e a frase diz isso |
| `equipamento.capacidades` | bate | [equipamento](regras-x-codigo/equipamento.md) | — |
| `equipamento.caneleira` | bate | [equipamento](regras-x-codigo/equipamento.md) | — |
| `equipamento.mini-band` | bate | [equipamento](regras-x-codigo/equipamento.md) | — |
| `equipamento.roda-abdominal` | a frase diverge | [equipamento](regras-x-codigo/equipamento.md) | confirmado; frase e regra acertadas: sai com dor lombar acima de 5 |
| `equipamento.atalhos` | bate | [equipamento](regras-x-codigo/equipamento.md) | — |
| `equipamento.menor-anilha` | o código diverge | [equipamento](regras-x-codigo/equipamento.md) | confirmado; **consertado com teste**: o menos e o mais da barra andam no passo do local (`kgNoPasso`) |
| `equipamento.sem-puxada-vertical` | o código diverge | [equipamento](regras-x-codigo/equipamento.md) | confirmado; regra e frase acertadas ao desempate do gerador; o pullover saiu (não está na biblioteca) |
| `equipamento.sem-ancoragem` | o código diverge | [equipamento](regras-x-codigo/equipamento.md) | confirmado; regra e frase acertadas: o aviso lista os músculos que de fato ficam sem exercício |
| `equipamento.flexao-por-supino` | o código diverge | [equipamento](regras-x-codigo/equipamento.md) | confirmado; regra e frase acertadas (a flexão inclinada ainda não está no app, e está no backlog); a linha do guia que contradizia a escada foi reescrita |
| `visao.desambiguacao` | bate | [equipamento](regras-x-codigo/equipamento.md) | — |
| `privacidade.foto` | bate | [equipamento](regras-x-codigo/equipamento.md) | — |
| `dados.copia` | o código diverge | [equipamento](regras-x-codigo/equipamento.md) | confirmado; regra e frase acertadas: o lembrete fica acima do botão |
| `dados.instalar-iphone` | bate | [equipamento](regras-x-codigo/equipamento.md) | — |
| `dados.persistente` | bate | [equipamento](regras-x-codigo/equipamento.md) | — |
| `acompanhamento.semana` | o código diverge (borda) | [seguranca](regras-x-codigo/seguranca.md) | confirmado; consertado: "mantendo" só a partir de 1 série (`16c936ca`), com teste |
| `acompanhamento.mensagens` | bate | [seguranca](regras-x-codigo/seguranca.md) | — |
| `acompanhamento.evolucao` | o código diverge | [seguranca](regras-x-codigo/seguranca.md) | confirmado; a regra e a frase ficaram para trás: acertadas ao que o app faz (carga maior é "subiu a carga"; "recorde" é mais repetições com aquela carga ou com uma mais pesada). O teste E1 já fixava esse comportamento |
| `avaliador.gravidade` | a frase diverge | [seguranca](regras-x-codigo/seguranca.md) | confirmado; frase e regra acertadas: o app mede o programa da pessoa, e não há tela para digitar um |
| `avaliador.empurrar-puxar` | bate | [seguranca](regras-x-codigo/seguranca.md) | — |
| `seguranca.triagem` | bate | [seguranca](regras-x-codigo/seguranca.md) | — |
| `seguranca.triagem.osteoarticular` | bate | [seguranca](regras-x-codigo/seguranca.md) | — |
| `seguranca.triagem.nenhuma` | bate | [seguranca](regras-x-codigo/seguranca.md) | — |
| `seguranca.triagem.texto` | bate | [seguranca](regras-x-codigo/seguranca.md) | — |
| `seguranca.alerta.cardiovascular` | bate | [seguranca](regras-x-codigo/seguranca.md) | — |
| `seguranca.alerta.musculoesqueletico` | o código diverge (parcial) | [seguranca](regras-x-codigo/seguranca.md) | confirmado; **decidido pela sessão, por delegação do Gustavo (22/11): consertado.** "Senti algo" ganhou "Estalo com dor" e "Dor que se espalha pelo braço ou pela perna", que encerram o exercício; com teste |
| `seguranca.dor.escala` | o código diverge | [seguranca](regras-x-codigo/seguranca.md) | confirmado; **decidido pela sessão, por delegação:** a regra e a frase passam a dizer o que o app faz (a nota é dada em "Senti algo"; o aviso sai com nota de 3 ou mais em 2 treinos seguidos). Não entra pergunta nova em cada série |
| `seguranca.dor.programa` | bate | [seguranca](regras-x-codigo/seguranca.md) | — |
| `seguranca.sem-diagnostico` | o código diverge (leve) | [seguranca](regras-x-codigo/seguranca.md) | confirmado; **decidido pela sessão, por delegação:** regra e frase dizem "médico ou profissional de Educação Física", como as telas |
| `seguranca.estalo-sem-dor` | não está no app | [seguranca](regras-x-codigo/seguranca.md) | resolvido com o "estalo com dor" em "Senti algo" |
| `seguranca.montagem` | o código diverge (parcial) | [seguranca](regras-x-codigo/seguranca.md) | confirmado; **decidido pela sessão, por delegação: consertado.** 9 exercícios ganharam a marca de montagem; a rosca Scott e os 3 de barra fixa ganharam a nota, com frases já aprovadas em outros guias |
| `treino.leitura` | o código diverge | [seguranca](regras-x-codigo/seguranca.md) | confirmado; regra e frase acertadas à decisão de 16/11 (as definições ficam em "Entenda o treino") |
