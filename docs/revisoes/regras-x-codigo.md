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

## As 166 regras

| id | classificação | relatório | situação |
|---|---|---|---|
| `selecao.equivalencia-equipamento` | bate | [selecao-1](regras-x-codigo/selecao-1.md) | — |
| `selecao.amplitude` | bate | [selecao-1](regras-x-codigo/selecao-1.md) | — |
| `selecao.comprimento-longo` | bate | [selecao-1](regras-x-codigo/selecao-1.md) | — |
| `selecao.estabilidade` | o código diverge (leve) | [selecao-1](regras-x-codigo/selecao-1.md) | a conferir |
| `selecao.variacao` | não está no app | [selecao-1](regras-x-codigo/selecao-1.md) | a conferir |
| `selecao.variacoes-equivalentes` | a frase diverge | [selecao-1](regras-x-codigo/selecao-1.md) | a conferir |
| `selecao.corpo-livre-ampliado` | bate | [selecao-1](regras-x-codigo/selecao-1.md) | — |
| `selecao.halteres-ampliado` | bate | [selecao-1](regras-x-codigo/selecao-1.md) | — |
| `selecao.elastico-ampliado` | o código diverge | [selecao-1](regras-x-codigo/selecao-1.md) | a conferir |
| `selecao.barra-negativa` | bate | [selecao-1](regras-x-codigo/selecao-1.md) | — |
| `selecao.barra-negativa-iniciante` | bate | [selecao-1](regras-x-codigo/selecao-1.md) | — |
| `selecao.item-sozinho-ampliado` | o código diverge (leve) | [selecao-1](regras-x-codigo/selecao-1.md) | a conferir |
| `selecao.complementos` | o código diverge | [selecao-1](regras-x-codigo/selecao-1.md) | a conferir |
| `selecao.peitoral-inclinado` | o código diverge | [selecao-1](regras-x-codigo/selecao-1.md) | a conferir |
| `selecao.triceps-acima-cabeca` | o código diverge | [selecao-1](regras-x-codigo/selecao-1.md) | a conferir |
| `selecao.flexora-sentada` | bate | [selecao-1](regras-x-codigo/selecao-1.md) | — |
| `selecao.panturrilha-alongada` | o código diverge (leve) | [selecao-1](regras-x-codigo/selecao-1.md) | a conferir |
| `selecao.multi-mono` | bate | [selecao-1](regras-x-codigo/selecao-1.md) | — |
| `selecao.funcao-da-vaga` | a frase diverge | [selecao-1](regras-x-codigo/selecao-1.md) | a conferir |
| `selecao.lombar-no-dia` | bate | [selecao-2](regras-x-codigo/selecao-2.md) | — |
| `selecao.pratica-do-iniciante` | a frase diverge | [selecao-2](regras-x-codigo/selecao-2.md) | a conferir |
| `selecao.dia-sem-principal` | o código diverge | [selecao-2](regras-x-codigo/selecao-2.md) | a conferir |
| `selecao.vaga-sem-equipamento` | bate | [selecao-2](regras-x-codigo/selecao-2.md) | — |
| `selecao.preferencia` | o código diverge | [selecao-2](regras-x-codigo/selecao-2.md) | a conferir |
| `selecao.alongado` | bate | [selecao-2](regras-x-codigo/selecao-2.md) | — |
| `selecao.exercicios-por-musculo` | o código diverge | [selecao-2](regras-x-codigo/selecao-2.md) | a conferir |
| `selecao.isolador-obrigatorio` | bate | [selecao-2](regras-x-codigo/selecao-2.md) | — |
| `selecao.equivalencia` | bate | [selecao-2](regras-x-codigo/selecao-2.md) | — |
| `selecao.manter-no-bloco` | não está no app | [selecao-2](regras-x-codigo/selecao-2.md) | a conferir |
| `selecao.gluteo` | bate | [selecao-2](regras-x-codigo/selecao-2.md) | — |
| `selecao.crucifixo-complemento` | bate | [selecao-2](regras-x-codigo/selecao-2.md) | — |
| `selecao.mergulho` | o código diverge | [selecao-2](regras-x-codigo/selecao-2.md) | a conferir |
| `selecao.aducao-complemento` | o código diverge | [selecao-2](regras-x-codigo/selecao-2.md) | a conferir |
| `selecao.abdomen-prioridade` | bate | [selecao-2](regras-x-codigo/selecao-2.md) | — |
| `selecao.complexidade-nivel` | a frase diverge | [selecao-2](regras-x-codigo/selecao-2.md) | a conferir |
| `selecao.dobrar-quadril` | bate | [selecao-2](regras-x-codigo/selecao-2.md) | — |
| `selecao.flexao-joelho-sem-maquina` | bate | [selecao-2](regras-x-codigo/selecao-2.md) | — |
| `selecao.nordico` | o código diverge | [selecao-2](regras-x-codigo/selecao-2.md) | a conferir |
| `reps.equivalencia-cargas` | bate | [progressao](regras-x-codigo/progressao.md) | — |
| `reps.faixa.por-tipo` | o código diverge | [progressao](regras-x-codigo/progressao.md) | a conferir |
| `reps.faixa.degrau` | o código diverge | [progressao](regras-x-codigo/progressao.md) | a conferir |
| `reps.teto.carga-limitada` | bate | [progressao](regras-x-codigo/progressao.md) | — |
| `rir.falha.nao-necessaria` | bate | [progressao](regras-x-codigo/progressao.md) | — |
| `rir.alvo` | bate | [progressao](regras-x-codigo/progressao.md) | — |
| `rir.serie-efetiva` | o código diverge | [progressao](regras-x-codigo/progressao.md) | a conferir |
| `rir.carga-baixa` | o código diverge (leve) | [progressao](regras-x-codigo/progressao.md) | a conferir |
| `rir.leitura` | não está no app (a frase dá a entender que está) | [progressao](regras-x-codigo/progressao.md) | a conferir |
| `rir.calibracao` | não está no app (a frase deixa claro) | [progressao](regras-x-codigo/progressao.md) | a conferir |
| `cadencia.repeticao` | bate (com ressalva) | [progressao](regras-x-codigo/progressao.md) | — |
| `progressao.subir` | bate | [progressao](regras-x-codigo/progressao.md) | — |
| `progressao.manter` | bate | [progressao](regras-x-codigo/progressao.md) | — |
| `progressao.reduzir` | o código diverge (arredondamento) | [progressao](regras-x-codigo/progressao.md) | a conferir |
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
| `progressao.calibracao` | o código diverge (e a frase tem um número a mais) | [progressao](regras-x-codigo/progressao.md) | a conferir |
| `progressao.troca-equivalente` | bate | [progressao](regras-x-codigo/progressao.md) | — |
| `progressao.criterios-invalidos` | não está no app (a frase não deixa claro) | [progressao](regras-x-codigo/progressao.md) | a conferir |
| `progressao.estagnacao` | bate | [progressao](regras-x-codigo/progressao.md) | — |
| `deload.semana-leve` | o código diverge | [progressao](regras-x-codigo/progressao.md) | a conferir |
| `registro.treino-feito` | bate | [progressao](regras-x-codigo/progressao.md) | — |
| `volume.semanal.dose-resposta` | não está no app | [volume](regras-x-codigo/volume.md) | a conferir |
| `volume.semanal.minimo` | o código diverge | [volume](regras-x-codigo/volume.md) | a conferir |
| `volume.semanal.alvo` | bate | [volume](regras-x-codigo/volume.md) | — |
| `volume.prioridade.competicao` | bate | [volume](regras-x-codigo/volume.md) | — |
| `volume.prioridade.foco-primeiro` | a frase diverge | [volume](regras-x-codigo/volume.md) | a conferir |
| `volume.prioridade.segundo-exercicio` | o código diverge | [volume](regras-x-codigo/volume.md) | a conferir |
| `volume.prioridade.ate-dois` | bate | [volume](regras-x-codigo/volume.md) | — |
| `volume.semanal.maximo` | o código diverge | [volume](regras-x-codigo/volume.md) | a conferir |
| `volume.semanal.teto-padrao` | a frase diverge | [volume](regras-x-codigo/volume.md) | a conferir |
| `volume.semanal.minimo-eficaz` | bate | [volume](regras-x-codigo/volume.md) | — |
| `volume.semanal.abdomen` | bate | [volume](regras-x-codigo/volume.md) | — |
| `volume.manutencao.piso` | não está no app | [volume](regras-x-codigo/volume.md) | a conferir |
| `volume.sessao.teto` | bate | [volume](regras-x-codigo/volume.md) | — |
| `volume.equilibrio-coxa` | o código diverge | [volume](regras-x-codigo/volume.md) | a conferir |
| `volume.serie-indireta.peso` | bate | [volume](regras-x-codigo/volume.md) | — |
| `volume.series-por-exercicio` | bate | [volume](regras-x-codigo/volume.md) | — |
| `frequencia.efeito-hipertrofia` | não está no app | [volume](regras-x-codigo/volume.md) | a conferir |
| `frequencia.musculo` | bate | [volume](regras-x-codigo/volume.md) | — |
| `divisao.equivalencia` | bate | [volume](regras-x-codigo/volume.md) | — |
| `divisao.frequencia-minima` | bate | [volume](regras-x-codigo/volume.md) | — |
| `divisao.recomendacao` | bate | [volume](regras-x-codigo/volume.md) | — |
| `divisao.seis-dias` | bate | [volume](regras-x-codigo/volume.md) | — |
| `divisao.classica` | bate | [volume](regras-x-codigo/volume.md) | — |
| `divisao.sem-puxar` | o código diverge | [volume](regras-x-codigo/volume.md) | a conferir |
| `objetivo.pergunta` | bate | [volume](regras-x-codigo/volume.md) | — |
| `objetivo.cutting.mesmo-programa` | bate | [volume](regras-x-codigo/volume.md) | — |
| `objetivo.cutting.texto` | o código diverge (leve) | [volume](regras-x-codigo/volume.md) | a conferir |
| `objetivo.forca.faixa-compostos` | o código diverge | [volume](regras-x-codigo/volume.md) | a conferir |
| `objetivo.forca.descanso` | o código diverge | [volume](regras-x-codigo/volume.md) | a conferir |
| `objetivo.forca.seguranca` | o código diverge (leve) | [volume](regras-x-codigo/volume.md) | a conferir |
| `objetivo.saude.texto` | o código diverge (leve) | [volume](regras-x-codigo/volume.md) | a conferir |
| `descanso.piso` | bate | [tempo](regras-x-codigo/tempo.md) | — |
| `descanso.por-tipo` | bate | [tempo](regras-x-codigo/tempo.md) | — |
| `readaptacao.gatilho` | o código diverge | [tempo](regras-x-codigo/tempo.md) | a conferir |
| `readaptacao.durante-uso` | bate | [tempo](regras-x-codigo/tempo.md) | — |
| `readaptacao.semana1` | o código diverge | [tempo](regras-x-codigo/tempo.md) | a conferir |
| `readaptacao.semana2` | bate | [tempo](regras-x-codigo/tempo.md) | — |
| `readaptacao.semana3` | bate | [tempo](regras-x-codigo/tempo.md) | — |
| `iniciante.fase-aprendizado` | o código diverge | [tempo](regras-x-codigo/tempo.md) | a conferir |
| `ordem.sessao` | bate | [tempo](regras-x-codigo/tempo.md) | — |
| `tempo.serie` | bate | [tempo](regras-x-codigo/tempo.md) | — |
| `tempo.transicao` | bate | [tempo](regras-x-codigo/tempo.md) | — |
| `tempo.aquecimento` | o código diverge | [tempo](regras-x-codigo/tempo.md) | a conferir |
| `tempo.colchao` | bate | [tempo](regras-x-codigo/tempo.md) | — |
| `tempo.calibracao` | bate | [tempo](regras-x-codigo/tempo.md) | — |
| `tempo.exercicios-por-sessao` | bate | [tempo](regras-x-codigo/tempo.md) | — |
| `tempo.exercicios-do-iniciante` | bate | [tempo](regras-x-codigo/tempo.md) | — |
| `tempo.corte` | bate | [tempo](regras-x-codigo/tempo.md) | — |
| `tempo.sobra` | bate | [tempo](regras-x-codigo/tempo.md) | — |
| `tempo.sobra-series` | a frase diverge | [tempo](regras-x-codigo/tempo.md) | a conferir |
| `tempo.musculo-protegido` | bate | [tempo](regras-x-codigo/tempo.md) | — |
| `tempo.superserie` | o código diverge | [tempo](regras-x-codigo/tempo.md) | a conferir |
| `tempo.drop-set` | o código diverge | [tempo](regras-x-codigo/tempo.md) | a conferir |
| `tempo.outras-tecnicas` | não está no app | [tempo](regras-x-codigo/tempo.md) | a conferir |
| `tecnica.flexao.punho` | bate | [tempo](regras-x-codigo/tempo.md) | — |
| `tecnica.parcial-alongada` | bate | [tempo](regras-x-codigo/tempo.md) | — |
| `nivel.classificacao` | o código diverge | [tempo](regras-x-codigo/tempo.md) | a conferir |
| `tecnica.remada-baixa.polia` | bate | [tempo](regras-x-codigo/tempo.md) | — |
| `tecnica.barra-fixa.pegada` | bate | [tempo](regras-x-codigo/tempo.md) | — |
| `tecnica.supino-inclinado.angulo` | o código diverge | [tempo](regras-x-codigo/tempo.md) | a conferir |
| `tecnica.supino-halteres.cotovelos` | o código diverge | [tempo](regras-x-codigo/tempo.md) | a conferir |
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
| `seguranca.alerta.musculoesqueletico` | o código diverge (parcial) | [seguranca](regras-x-codigo/seguranca.md) | confirmado; **decisão do Gustavo** (texto de segurança): "Senti algo" não tem "estalo com dor" nem "dor que se espalha" |
| `seguranca.dor.escala` | o código diverge | [seguranca](regras-x-codigo/seguranca.md) | confirmado; **decisão do Gustavo**: a regra promete a pergunta de dor em cada série e o aviso quando a dor piora; o app só tem a nota em "Senti algo" e o aviso com nota 3 ou mais em 2 treinos seguidos |
| `seguranca.dor.programa` | bate | [seguranca](regras-x-codigo/seguranca.md) | — |
| `seguranca.sem-diagnostico` | o código diverge (leve) | [seguranca](regras-x-codigo/seguranca.md) | confirmado; **decisão do Gustavo** (texto de segurança): a regra diz "profissional com CREF", as telas dizem "médico ou profissional de Educação Física" |
| `seguranca.estalo-sem-dor` | não está no app | [seguranca](regras-x-codigo/seguranca.md) | confirmado; segue a decisão do "estalo com dor" (acima) |
| `seguranca.montagem` | o código diverge (parcial) | [seguranca](regras-x-codigo/seguranca.md) | confirmado; **decisão do Gustavo** (texto de segurança): 6 exercícios com barra sem a marca de montagem, a rosca Scott sem nota de travas, e 3 de barra fixa sem nota |
| `treino.leitura` | o código diverge | [seguranca](regras-x-codigo/seguranca.md) | confirmado; regra e frase acertadas à decisão de 16/11 (as definições ficam em "Entenda o treino") |
