# Mapa D: o que já foi MEDIDO, DECIDIDO, RECUSADO e ficou PENDENTE sobre a qualidade dos treinos gerados

Fonte: leitura de `docs/revisoes/` (auditoria-treino, auditoria-fable, qualidade-treinos, proximos-passos e suas frentes b, d, f, g; qualidade/caso-gustavo, avaliador, regua; auditoria/progressao e estresse), `docs/pesquisa-v2/17` (G5, tabela 4.7), `docs/backlog.md` e as entradas do `docs/devlog.md`. Repositório em 12/11/2026 (HEAD `3b9d7db`). Onde algo não foi encontrado, está escrito "não encontrado". Marcas: [doc] = dito no documento; [obs] = observação minha de leitura (inconsistência, entrada velha).

Convenções de nome nos docs: "main" = programa antes do marco; "grade de qualidade" = 911.625 programas (`npm run auditoria:qualidade`); "régua" = grade de 108.900 programas (36.300 sem dor; `npm run auditoria:regua`); "estresse" = 149.760 programas (`npm run auditoria:estresse`).

---

## 1. Linha do tempo (só o que mexeu no gerador de treinos, na biblioteca, na progressão ou na triagem)

Ordem real de execução dos marcos do R5: R5-CL (07-08/11) -> R5d (08/11) -> R5a (08/11, juntado ao R5d em 09/11) -> R5b (09/11) -> R5-anim (10/11). A ordem planejada em 07/11 era R5a -> R5-CL -> R5d -> R5-anim -> R5b -> R5c; na prática o R5a ficou depois do R5-CL e do R5d [obs, devlog].

| Data | Sessão/marco | O que mudou | Efeito medido |
|---|---|---|---|
| 29/10 | M2, gerador inicial | Taxonomia 25 itens, 73 exercícios, 77 regras com selo; divisão, filtro por equipamento/nível/dor, volume (indireta = 0,5; teto por sessão), cortes de tempo, readaptação, triagem PAR-Q+-estilo, progressão (dupla, salto grande, carga leve, estagnação, semana leve só sugerida) | Caso real (privado): 25 de 25 exercícios iguais ao programa montado à mão; diferença de séries por grupo entre -2 e +2. 432 combinações por propriedade; 99,8% de cobertura |
| 30/10 | M2.1, revisão independente do M2 | Texto da `ordem.sessao` alinhado ao código; piso por músculo nos cortes de tempo (prioritário = mínimo do nível; demais 4); `opcoesDeAjuste` ("+1 dia", "+15 min", "um grupo a menos"); panturrilha ganha 2ª vaga em 2 e 3 dias | Ana (quadríceps/posteriores/glúteos/panturrilha): 6/6/6/4 -> 8/6/7/6. Defeito real achado: corte de série numa remada derrubava o deltoide posterior abaixo do piso (corrigido) |
| 01/11 | Replanejamento (diagnóstico) | Só diagnóstico. Achou: marcar ombro na triagem tirava todo o tronco; guia mostrava prescrição do programa de referência; app não percebia pausas; academia completa usava 32 de 60 exercícios possíveis, extensora nunca entrava | Gerou os marcos R0 a R2 |
| 01/11 | R0b, divisão escolhida e vagas por função | 12 divisões (2 a 6 dias) escolhidas pela pessoa; vaga pede função (22 funções, `funcoes.json`, níveis); extensora, tríceps acima da cabeça e panturrilha em pé obrigatórios; descanso composto 105 s; escada de cortes (supersérie, drop set, menos exercícios, menos séries); estado v3 | 293 testes; varredura 1.296 combinações. Meta R0 (Carla, 540 programas): 39 de 60 exercícios distintos (meta 45). Extensora passa a entrar 2x/sem na academia. Ana: ponte 2x, panturrilha 6 -> 8; Carla: quadríceps e posteriores 12/8 -> 14 |
| 01/11 | R0c, catálogo ampliado | 25 -> 46 equipamentos; 29 exercícios novos (cartão de texto); registro de carga em 5 tipos; panturrilha sentada e adução como complementos; alternativas = todas da função; estado v4 | Meta R0: 54 de 102 exercícios distintos; todo exercício possível aparece como vaga ou alternativa; máquinas nas vagas 17% -> 31%; Carla Pernas 54 -> 67 min, panturrilha 8 -> 12 de 14 |
| 01/11 | R1, nada contradiz o programa | Triagem: "Nenhuma se aplica", osteoarticular pede região + nota de dor de hoje 0-10 (`seguranca.dor.programa`: >5 sai, 3-5 desfavorece, <=5 lembrete); aviso com o motivo verdadeiro; `selecao.dia-sem-principal`; teto semanal em todos os músculos do exercício; atalhos de equipamento; menor anilha; estado v5 | Cadastro da Ana 28 -> 13 toques, 0 caractere. Bruno com ombro 7: antes peito/costas/ombro a 0 e Superior A só com rosca; depois só saem os exercícios do ombro. Ana 50 -> 45 min (sai o crucifixo) |
| 01-02/11 | R1b, vários locais | Treino do dia por local (troca por função), calibração na 1ª série, histórico segue o exercício, "Prefiro este" (`selecao.preferencia`); estado v6 | 408 testes; 4 snapshots de persona iguais; novos: Bruno na academia do bairro, Carla "prefiro leg press" |
| 02/11 | R2, pausa, semana, evolução | Pausas detectadas (14-20 dias RIR+1; >=21 volta gradual 55%/75%/100%; carga -10/-15%/calibração); "a sua semana"; semana leve só com sinal; tempo calibrado; estado v7 | Volta de 22 dias do Bruno: 16/21/28 séries (T6 previa 12/15/20, mesma proporção). 4 programas das personas iguais |
| 02/11 | Auditoria do treino (`auditoria-treino.md`) | Estresse 149.760 + praticante simulado 16 sem. Entraram: cotovelo em 18 exercícios + lombar no pull-through; texto do 2º local; isoladores obrigatórios depois dos grandes em <=4 exercícios; carga leve sem vaivém; barra por 2x menor anilha; panturrilha sem halter por degrau; `rir.carga-baixa` a partir da 3ª semana; lote 1 de fichas/cartões; 4 exercícios só com halteres | Articulação faltando 128.531 -> 0; sem guia 33% -> 18%; progressão em vaivém 6 de 15 -> 2 de 15; 20 min com costas/posteriores zerados 48% -> 12%; 30 min 10% -> 0%; só halteres: costas prioritárias abaixo 100% -> 54,5%, ombro posterior <4: 100% -> 1,1%; biblioteca 102 -> 106 |
| 02/11 | Revisão de anatomia | Posteriores fora da ponte/hip thrust/coices; costas fora dos crucifixos invertidos; adutores em todo agachar; desenho do Boneco segue a biblioteca (6 animações) | Marcas a conferir 10 -> 0; programas com posteriores acima do máximo 2.511 -> 992; efeito colateral: posteriores zerados 324 -> 1.692 (todos "só peso do corpo"). Ana/Bruno/Carla/Diego mudam pouco (stiff 3->4 etc.) |
| 03/11 | Equipamento mínimo | Atalho "Corpo livre"; 4 exercícios de peso do corpo (flexão mãos juntas, pike, flexão de joelho deslizante, nórdico); sem puxar -> corpo todo; aviso sem compra; escada própria por exercício (dado) | 483.840 programas. Posteriores sem nada 0 -> 6,7 séries; escadas que não subiam em 16 sem: 30 -> 12 de 52 |
| 04/11 | Catálogo completo (cont.) | 14 animações em revisão, fila dos 69 sem animação, conferência das 40 antigas | Nenhum programa de persona muda |
| 04/11 | Auditoria independente "Fable" (`auditoria-fable.md`) | 14 animações aprovadas; 4 exercícios novos (abdução/adução deitado, extensão de joelho com elástico, panturrilha sentada com halter); 2 correções do gerador: teto semanal no mínimo de séries no preenchimento; ordem dos complementos (único exercício direto de um músculo com meta vem antes) | Vagas vazias (55 cenários) 431 -> 313. Ana igual; Bruno e Diego ganham extensão com elástico; Diego perde face pull do dia B (ombro posterior 4 -> 3) |
| 05/11 | R4 do boneco (cena) | Só animação (erro sobre o certo, rótulos, vista pelo movimento) + 16 animações; gerador só tem efeito indireto (desempate por animação aprovada) | Diego: agachamento peso do corpo -> agachamento com elástico. Prescrições sem animação no estresse 38,9% -> 22,5% |
| 05-06/11 | Qualidade dos treinos (`qualidade-treinos.md`) | Grade de 911.625; decisões 1 a 7 aprovadas: vaga sem exercício recebe outra função do mesmo músculo (B3) + séries sobem nos dias com vaga vazia (C2) + aviso de sobra pelo dia típico (D); Corpo todo 6x como recuo de `divisao.sem-puxar`; texto da prioridade ("foco + manutenção") e aviso `volume.prioridade.competicao`; 2º empurrar sem banco inclinável; abdômen e panturrilha protegidos dos cortes e vaga de abdômen quando é foco; ajustes B.8, B.11, B.16, B.18, B.20; ombro posterior na barra supinada e puxada com elástico (B.5); selos revistos | Dias <=3 exercícios (45+ min, limpos) 16,5% -> 6,6% (sem nada 20% -> 0%); uso <70% dos minutos 35% -> 21,8% (60 min: 31,3% -> 13,6%); mediana de uso em 60 min 75% -> 95%; abdômen a zero 11,6% -> 5,9%, panturrilha 10,4% -> 5,9%. Caso do Gustavo: 4/4/6 exercícios (28-45 min) -> 5/5/6 (51-58 min). Personas: Fábio costas 8 -> 12; Ana supino no lugar do crucifixo e abdominal protegido (custou 2 séries do búlgaro); Diego ombro posterior no piso; Ana e Carla ganham aviso de focos que competem. Custos: 30 min com dia acima do tempo 26% -> 40%; mesmo exercício em todos os dias 29,8% -> 39,9%; ombro lateral a zero no Corpo todo 6x 50,7% -> 55,9% |
| 06-07/11 | Próximos passos (só documentos) | Retrato, frentes A a G, régua da G5, 7 exercícios de corpo livre, depois 32 exercícios da biblioteca ampliada, duas revisões cegas; decisão da ordem dos marcos em 07/11 | Protótipo: sem defeito 73,4% -> 83,8%; mesmo exercício sem alternativa 44,1% -> 15,6%; revisão cega 12 melhores / 0 piores / 6 iguais |
| 07-08/11 | R5-CL, biblioteca ampliada | Régua da G5 em `scripts/auditoria/regua.ts` com linha de base da main; 32 exercícios (cartão de texto); proteção da coxa (`volume.equilibrio-coxa`); 30 min: protegido com 2 séries e sai um isolador se passar do tempo; "último dia da semana" e "descer um nível antes de repetir"; avisos de lacuna pelo que o programa tem | Sem defeito 71,4% -> 83,9% (84,6% sem contar D1); A2 7,5% -> 1,5%; A3 9,8% -> 7,0%; C1 4,1% -> 2,1%; D1 6,1% -> 1,2%; D3 1,6% -> 0%; B2 44,1% -> 15,6%; G1 8,4% -> 73,1% (o custo). Bruno e Carla iguais; Ana, Diego, Elisa, Fábio mudam |
| 08/11 | R5d, o foco que aparece | `volume.prioridade.foco-primeiro` (tempo que sobra vai primeiro ao foco; demais >=6 séries abaixo; travas do ombro e da coxa); `volume.prioridade.segundo-exercicio` (até 2 exercícios de outra função); meta do foco do iniciante 8 -> 10; 1º degrau da escada pelo nível; barra só na descida antes da barra para o iniciante; "escolha até 2" (`volume.prioridade.ate-dois`) | C2 28,8% -> 13,2%; C1 2,1% -> 1,5%; sem defeito 83,9% -> 85,0%; nenhum defeito pior. Caso do Gustavo: peito 12 -> 16, tríceps 12,5 -> 15, pernas 11-12 -> 9-10 |
| 08-09/11 | R5a, o registro que não engana | Dor guardada na série; treino sem série não conta; calibração com saída (3 séries de acerto); "Agora não" vale 7 dias; sem "estagnado"/semana leve nas semanas 1-2 do iniciante; estagnação pelo exercício feito; `npm run ler-export`; 4 ajustes do gerador: teto de 10 séries conta indiretas, ponte entra se não há stiff no Corpo todo A/B, 1 afundo por dia, pike no Corpo todo 6x | Dor guardada 0 de 6 -> 6 de 6 personas; calibração >3 sessões 57 -> 0; oferta recusada <=1/sem; dias com >10 séries de um músculo 27 -> 0; 2 afundos 810 -> 0; ombro lateral a zero no 6x sem nada 87,7% -> 24,6%; régua 83,9% -> 84,2% (na junção com o R5d: 85,1%). 30 min com dia acima do tempo 50,6% -> 50,1% (meta <=50% falhou por 0,1) |
| 09/11 | R5b, avaliador e porquê | `src/domain/avaliador/` (5 gravidades; regras `avaliador.gravidade`, `avaliador.empurrar-puxar`, `selecao.complexidade-nivel`); o avaliador vira régua do gerador (3 correções pós-corte); porquê específico por exercício; avisos com próximo passo; texto das regras sai do pacote inicial | Grade reduzida (5.850): "está bom" ou só limite 88,5%; segurança/alerta 0; "ajustar sem aviso" 0; avisos com próximo passo 2/20 -> 24/24; porquê específico 39% -> 140/140; D1 467 -> 373; 6 personas idênticas |
| 10/11 | R5-anim e lote 2 | 5 + 3 animações (panturrilha no degrau, abdominal invertido, extensão de tríceps, abertura em T, flexão pés elevados; ponte com halter, remada curvada, afundo para trás); efeito no gerador só pelo desempate por animação | G1 74,2% -> 17,4% -> 14,1%; sem defeito 85,5% -> 85,9%. Personas: Fábio troca elevação de joelhos por abdominal invertido e búlgaro por afundo para trás (nórdico 3 -> 2 séries; posteriores 10 -> 9); Ana troca remada sem banco por curvada (43 -> 41 min). Aceitas pelo Gustavo em 10/11 |
| 12/11 | Auditoria geral + correções | Estado v8; "subir" confere todas as séries; barra vazia é piso (antes sugeria 16 kg com barra de 20); minutos re-estimados após fase; aviso "sem puxar" nunca aparecia nas divisões clássicas (corrigido); sem exercício possível não devolve mais programa "ok" vazio; panturrilha no chão alinhada à fonte (`nakamura2025`); 20 exercícios sem guia ganham cartão; dor antes da 1ª série fica no exercício (`dorSemSerie`) | Régua: D1 379 -> 314 (sem dor), C1 479 -> 437, A3 2.281 -> 2.309 (panturrilha conta tempo de 2 pernas), sem defeito 85,9% -> 86,1%. "Ajuste sem aviso" 106 -> 210 de 911.625 (0,02%). 896 testes, 157 e2e |

---

## 2. A régua

Definida em `pesquisa-v2/17-biblioteca-ampliada.md` (parte G5, tabela 4.7; 22 medidas em 7 blocos) e implementada em `scripts/auditoria/regua.ts` (R5-CL). Dois níveis: DEFEITO (tem evidência ou decisão já tomada; "nenhum pode piorar"; o teste da auditoria compara com `docs/revisoes/qualidade/regua-linha-de-base.json`, a main antes da biblioteca ampliada) e NOTA (consenso/opinião; uma mudança é melhor se melhora uma nota sem piorar defeito). Opção 2 (nota única ponderada) foi descartada: "esconderia o defeito atrás da média [opinião]" [doc 17, 4.8].

Como é medido hoje: "dia típico" (A4) = mediana dos dias; "tem tempo" (C1, E1) = dia mais longo abaixo de 85% dos minutos; foco (C1, C2) só conta músculos com exercício possível; D1/D3 só valem quando o equipamento permite. As definições do protótipo se perderam com o rascunho e foram reescritas; reproduzem todos os números publicados menos o D1 (limite escrito 1,5 dá 6,1% na main, e não 0,9% do protótipo) [doc regua.md, devlog R5-CL].

### 2.1 Defeitos

| Cód. | Definição exata | Limite | Fonte/selo do limite | Evolução (sem dor, salvo indicação) |
|---|---|---|---|---|
| A2 | Piso do dia | >= 3 exercícios e >= 1 multiarticular | consenso; `iversen2021` (agachar, empurrar, puxar), `ordem.sessao` | main 7,5% -> R5-CL 1,5% -> contagem 532 (main c/ R5-CL) -> 385 (R5d) -> 359 (R5b) -> 357 (1,0%, 12/11). Com dor: 23,5% (base) -> 20,6%. Origem: dias de 30 min com 5-6 dias (216 dias, ex. casa dia "Empurrar": elevação lateral, tríceps, crucifixo com elástico) |
| A3 | Teto do tempo | dia mais longo <= 110% dos minutos | consenso (falta de tempo é barreira nº 1; Hoare 2017) | 9,8% -> 7,0% (R5-CL) -> 2.553 -> 2.512 -> 2.506 -> 2.458 (R5b) -> 2.281 (lote 2) -> 2.309 (6,4%, 12/11). Com 30 min: 20,5% dos programas ainda (regua.md). Com dor: 4,5% (base) -> 3,6% |
| A4 | Piso de uso, com aviso | dia típico >= 70% dos minutos OU aviso da duração real | consenso; `tempo.sobra`; `conti2026` | 5,3% -> 5,0% (1.831). Por cenário: atalhos 22,2%, personas 16,4%, pares de casa 11,4%; sem nada e um item só 0% |
| B1 | Repetição havendo opção | mesmo exercício (fora abdominal) em todos os dias, com 3+ dias, havendo equivalente do mesmo nível possível: 0% | moderada (variedade -> prazer/motivação; hipertrofia igual): `bazvalle2019`, `kassiano2022`, `kassiano2025var` | 0,3% -> 0% (regra "último dia da semana") ; com dor 1,3% -> 1,1% |
| C1 | Foco abaixo da meta com tempo | prioritário abaixo da meta com dia mais longo <85% dos minutos e exercício possível: 0% | robusta (dose-resposta, `schoenfeld2017a`, `pelland2026`); consenso (o número da meta) | 4,1% -> 2,1% -> 1,5% -> 466 -> 463 -> 479 -> 437 (1,2%). Com dor 5,8% -> 1,2% |
| D1 | Empurrar ÷ puxar | <= 1,5 (faixa 0,5-1,5; abaixo de 0,67 aceitável) quando há como puxar. Empurrar = horizontal + vertical + crucifixo; puxar = horizontal + vertical + ombro posterior. Desde 12/11 a flexão fechada conta como empurrar (padrão do movimento) | consenso com apoio de caso-controle: `kolber2010`, `kolber2014`, `kolber2017`. O 1,5 é decisão de 07/11 | main 6,1% -> 1,2% (R5-CL) -> 445 -> 467 (R5a) -> 373 (R5b) -> 379 (lote 2) -> 314 (0,9%). Com dor 3,2% -> 0,3% |
| D2 | Sem como puxar | nenhum empurrar a mais para "compensar" | consenso (`pesquisa-v2/14` 6b, 6f) | NÃO medido na régua (pendente, backlog "Do R5-CL") |
| D3 | Coxa | quadríceps ÷ posteriores entre 0,5 e 2 e >= 1 exercício direto de posteriores/semana quando os dois são possíveis | consenso (Green 2018: razão de força não prevê lesão; `kubo2019`; `maeo2021`) | 1,6% -> 0% (proteção da coxa, `volume.equilibrio-coxa`). Com dor 0,3% -> 0% |
| E1 | Não prioritário com 1 a 3 séries | 0, havendo exercício possível e tempo | moderada (`volume.semanal.minimo-eficaz`) | 75 (0,2%) -> 35 -> 38 (0,1%) |
| E2 | Músculo com 0 série | só com aviso que o cite | consenso (`equipamento.sem-ancoragem`) | 0 sem aviso na grade oficial; NÃO medido na régua |
| E3 | Séries por músculo na sessão | <= 10 (contando indiretas) | um estudo (preprint `remmert2025`; `volume.sessao.teto`) | era 0 só nos principais; R5a achou 27 dias (grade reduzida) e 238 dias (55 cenários) acima, corrigido -> 0. NÃO está como coluna da régua (só testes) |
| E4 | Reserva 0 em multiarticular | nunca | robusta/um estudo (`rir.falha.nao-necessaria`, Refalo 2025, Emanuel 2021) | 0 de 170.724 prescrições; não medido na régua |
| Segurança | Exercício impossível, acima da complexidade ou numa região com dor > 5 | 0 | `seguranca.dor.programa` | 0 em todas as rodadas |

### 2.2 Notas

| Cód. | Definição | Limite | Evolução |
|---|---|---|---|
| A1 | Exercícios por dia fora da faixa dos minutos | 30 min: 3-5; 45: 4-7; 60: 5-8; 75 e 90: 5-10 (consenso: ensaios usam 2-8, ACSM 2009 dava 8-10, expectativa do Gustavo 5-7; ver `qualidade-treinos` C.1/C.2) | 24,1% -> 10,2% (protótipo) -> 9,6% -> 10,0% (3.644) |
| A5 | Dia mais curto abaixo de 60% do mais longo | [opinião] (Kaushal 2015: consistência) | 22,5% -> 12,9% -> 13,3% (4.829) |
| A6 | Modelo de tempo a +-15% do relógio | informação | dentro de ~10% sem aquecimento; não é coluna |
| B2 | Mesmo exercício em todos os dias SEM opção do mesmo nível | com 4+ dias, um dia desce um nível ou outro degrau (a frente A mediu 29,6% -> 18,4%) | 44,1% -> 15,6% (R5-CL) -> 15,6% (5.665; 19,5% nos de 3+ dias). Sem nada 26,7%, um item só 21,9%, iniciante 40,9% |
| B3 | Dois ou mais exercícios repetidos em todos os dias | <= 1 por programa [opinião] | 14,4% -> 8,3% -> 7,9% |
| B4, B5 | Exercícios distintos na semana (alerta iniciante > ~20); variação entre blocos (manter 70-80%) | [opinião]/moderada | não medidas na régua; "exercícios diferentes por semana" é só medida: 12,9 -> 15,8 |
| C2 | Foco visível: séries do prioritário acima da mediana dos não prioritários (mínimo) e >= mediana + 2 (meta) | consenso/[opinião] | main 28,8% (protótipo 33,0%) -> R5d 13,2% -> 13,4% (4.877). Entre os que têm foco: iniciante 38,5% -> 15,4%. Restos: 30 min 31,3-32% e foco nas pernas 44,2% |
| C3 | Aviso quando o foco não cabe | toda vez que C1/C2 falham por tempo, equipamento ou competição | NÃO medida na régua (pendente) |
| F1 | Exercício com >= 1 alternativa | medir (métrica do catálogo) | "prescrições sem nenhuma alternativa" 54,3% (protótipo; 49,1% na main) -> 27,8% |
| F2 | Superséries | só onde a regra permite | não medida |
| G1 | Dia com >= 3 cartões de texto (sem animação aprovada) | <= 2 por dia; alerta com 3+ [opinião] (princípio "qualidade do guia") | 8,4% -> 73,1% (R5-CL, o custo) -> 74,1% (R5d) -> 17,4% (R5-anim, 5 animadas) -> 14,1% (lote 2; 5.122). Sem nada: 0%. Atalhos 56,2%, personas 43,2% |

Medidas auxiliares (sem dor): exercícios por dia 5,18 -> 5,58; exercícios diferentes por semana 12,9 -> 15,8; sem nada 4,91 -> 5,54 exercícios/dia e 9,5 -> 13,2 diferentes/semana; cartões por dia 0,68; funções com 0 opção / 1 opção (55 cenários) 348/509 -> 277/356.

Evolução do agregado "sem nenhum defeito" (sem dor): main 71,4% (73,4% sem D1, protótipo) -> R5-CL 83,9% -> R5d 85,0% -> R5a (com R5d) 85,1% -> R5b 85,5% (31.023) -> R5-anim 85,5% -> lote 2 85,9% -> 12/11 86,1% (31.255). Com dor: 74,1% -> 74,3% (53.923).

### 2.3 O que a régua NÃO mede

- Hipertrofia, força ou aderência reais. Tudo é proxy: séries por músculo por semana (robusta) e consenso de treinadores. A própria 17 diz: nenhum ensaio testa "quantos exercícios por treino" nem minutos; "agradável" só tem estudos agudos (prazer, esforço) e um observacional de aderência (`conti2026`) [doc 17].
- Qualidade da técnica, do guia ou da animação (G1 só conta cartão sem animação; não diz se o cartão é bom).
- A progressão ao longo de semanas e meses (isso é o simulador da frente D, não a régua).
- C3 (aviso de foco que não cabe), D2, E2, E3, E4, B4, B5, F2: escritas na tabela 4.7 mas não são colunas da régua [doc backlog "Do R5-CL": "Faltam na régua as medidas que o protótipo não publicou: C3, D2 e E2 a E4"].
- Só 3 situações de dor (nenhuma, ombro 7, joelho 7); só 11 focos; 30/45/60/90 min (sem 75 e 20); só a divisão recomendada de cada nº de dias; personas e cenários fictícios; 55 cenários onde 38 são "um item só".
- Ordem dentro do dia, descanso e séries por exercício (garantidos por código; só regressão).
- Prazer, variedade percebida, se o foco "parece" foco para a pessoa, adequação ao nível real. Isso só aparece nas revisões cegas (opinião de treinador simulado).
- Não mede o que a pessoa vê na tela (textos, avisos). O avaliador (R5b) e testes de e2e cobrem parte.
- Limites sem fonte forte: D1 1,5 e frente × trás 0,5-2 são consenso/[opinião] (decisão 07/11 do 1,5); A5, B3, G1 são [opinião].

### 2.4 Outras réguas/grades do projeto (não confundir)

- Estresse 149.760 (auditoria 02/11, ainda gerado): suspeitos `monotonia.repete-com-opcao` 58.808 (42,8% dos programas; era 29.769 -> 63.773 após 02/11), `tempo.sobra-com-meta-abaixo` 34.351, `volume.abaixo-sem-aviso` 11.452, `monotonia.todos-os-dias` 5.645 (4,1%), `volume.excesso.*` (glúteo 5.266, tríceps 2.838, bíceps 1.701...), `volume.zero.costas` 1.440, `equilibrio.sem-puxar` 1.440, `seguranca.dor-leve-nao-poupou` 464, `volume.zero.posteriores` 180, `dia.so-core` 8. Dias acima dos minutos 9,2% (sem aviso: 0); dia mais longo <70% dos minutos: 27,6%.
- Grade de qualidade 911.625 (05/11) e suas garantias (0 músculo grande a zero sem aviso; 0 dia vazio; 0 acima do teto).
- Avaliador na grade reduzida de 5.850 (`qualidade/avaliador.md`): bom 44,4%, limite 44,2%, ajustar 11,4%, bloqueado 0%; "bom ou só limite" 88,6%; "ajustar/alerta/segurança sem aviso do gerador" 0.

---

## 3. Revisões cegas por treinadores (subagentes) e auditorias independentes

### 3.1 Como foram feitas (G, rodada 2, 06/11; `g-biblioteca-ampliada.md`, seção 6)
Um subagente "treinador de força e hipertrofia" recebeu 36 semanas (18 personas: as 6 de `tests/personas/` + 12 fictícias; versão de hoje e versão nova, embaralhadas S01 a S36) e um briefing com 3 notas de 1 a 10 (eficiente, agradável, adequada à pessoa), o principal problema e o que mudaria. Só abria as duas páginas, não sabia como o app é feito nem o que mudou; a chave ficou com o orquestrador; revisores diferentes por rodada. Declarado: opinião de treinador simulado, não evidência; cada revisor tem a sua régua (só vale comparar dentro de cada revisão). O R5d repetiu o método em 3 rodadas. Para R5-anim, R5a, R5b e R5-anim: revisão cega NÃO encontrada.

### 3.2 Notas

| Revisão | Eficiente (hoje -> novo) | Agradável | Adequada | Personas melhor / pior / igual |
|---|---|---|---|---|
| G rodada 1 (hoje × biblioteca com rosca sem carga) | 5,28 -> 5,11 | 5,11 -> 5,89 | 5,50 -> 5,56 | 12 / 4 / 2 |
| G rodada 2 (hoje × versão final) | 5,78 -> 5,83 | 5,28 -> 6,17 | 5,72 -> 6,00 | 12 / 0 / 6 |
| R5d rodada 1 (1ª versão) | 5,28 -> 5,11 | 5,28 -> 5,06 | 4,89 -> 4,94 | 4 / 4 / 10 |
| R5d rodada 2 | 5,22 -> 5,39 | 5,22 -> 5,11 | 4,83 -> 5,39 | 7 / 2 / 9 |
| R5d rodada 3 (versão final) | 5,11 -> 5,33 | 5,22 -> 5,17 | 5,11 -> 5,67 | 8 / 2 / 8 |

Observações [obs]: as notas absolutas ficam em torno de 5 a 6 de 10; no R5d a nota "agradável" não melhorou (5,06; 5,11; 5,17); o aceite "nenhuma persona pior" não fechou ao pé da letra no R5d (Helena e Otto perdem 1 ponto numa das três notas na rodada 3; nenhuma piorou em mais de uma rodada) [doc devlog R5d].

### 3.3 Críticas que apareceram e o que foi feito
- G rodada 1: as 4 que pioraram (iniciante sem nada, mini-band, foco em glúteo sem nada, Elisa) tinham a mesma causa: rosca sem carga e abertura em T ocupando o tempo do foco; em 2 casos dia sem quadríceps nem glúteo. FEITO: rosca sem carga saiu da seleção (decisão 11); abertura em T ficou (sem ela D1 piora de 0,9% para 1,6%); proteções da coxa (decisão 9).
- G rodada 2: nenhuma piorou; críticas que sobraram (seção 5 do doc g): (1) foco muda pouco a distribuição (feito no R5d); (2) nível pesa pouco no corpo livre, avançado sem nada vê os mesmos exercícios do iniciante (feito parcialmente: 1º degrau da escada pelo nível; mas "a semana mostra o exercício base", crítica persiste no R5d); (3) iniciante com barra recebe barra sem regressão (feito: barra só na descida antes da barra); (4) avisos que se contradizem (feito, teste de regressão 0 contradições em 6.600 programas); (5) tempo mal distribuído A5 12,9% e A3 7,3% (parcial, nota A5 13,3%); (6) equipamento às vezes subaproveitado (academia sem hip thrust nem leg press; step sem subida; fita só para remada): é a ordem dos níveis em `funcoes.json`; NÃO feito.
- R5d rodada 1: achou piores os treinos encurtados (versão com os outros músculos no piso); FEITO: "foco primeiro, os outros até 6 séries abaixo", com travas do ombro e da coxa (uso do dia mais longo 91,3% vs 92,0% na main). Rodada 2: foco em glúteos só com séries indiretas (Murilo, Pietra: ponte com 2 séries); FEITO: regra das séries diretas. Pernas "perto do piso" (6) como o aceite pedia: NÃO feito, ficam em 9-10 porque a versão com 6 encurtava os treinos e foi a mais criticada.
- Críticas das 3 rodadas do R5d, nas duas versões, NÃO deste marco e ainda abertas (backlog "Do R5d"): nada de puxar improvisado sem equipamento (remada sob a mesa, toalha na porta; pede pesquisa de segurança e evidência); avançado sem carga com agachamento 12-20 (o degrau inicial só aparece no treino); abdominal com 4 séries num dia só e elevação lateral no dia de pernas; drop sets e superséries para iniciante fora da fase de aprendizado; halteres leves sem elevação lateral nem rosca; fita e mini-band pouco usadas; a barra só na descida em todos os dias do iniciante (pedem alternar com isometria no alto e remada australiana).

### 3.4 Outras auditorias independentes (não cegas)
- "Fable" (04/11, outro modelo sem histórico no projeto; `auditoria-fable.md`): sem notas numéricas; veredito: poses certas, falta o erro saltar aos olhos; achou 2 defeitos reais do gerador (teto semanal no preenchimento; ordem dos complementos), executou 14 aprovações e 4 exercícios novos; deixou como opções B.2 (texto do nível 2), B.5, B.6, F.2, zod 4.
- Frente B (protótipo do avaliador, 06/11): achou 3 defeitos reais do gerador (glúteo sem extensão de quadril no Corpo todo A/B em 6,3% dos programas; dois afundos no dia 2,4%; teto da sessão que não contava indiretas 0,5%) e, nos 4 programas publicados (Schoenfeld 2019 3 e 5 séries, Thomas e Burns 2016, Carneiro 2024), apontou o que um treinador apontaria (6-10 séries num exercício, posteriores/panturrilha a zero, dias de ~95 min em 60). Todos corrigidos no R5a/R5b.
- Auditoria geral (12/11): 6 frentes; correções listadas na seção 1.

---

## 4. PROPOSTO e RECUSADO ou ADIADO (um item por linha)

Formato: item | o que era | número medido | por que não entrou | quem decidiu.

### 4.1 Recusado ou descartado

| Item | O que era | Número | Por que não entrou | Quem decidiu |
|---|---|---|---|---|
| E-c, "usar todo o tempo que sobra para todos" | Mais séries em todos os dias quando sobra tempo (também na academia) | academia 45+ min uso <70%: 25,5% -> 6,7%; mas foco cai de 17,4% para 16,2% das séries; fatia do prioritário 16,1% -> 14% | Contradiz "foco com manutenção" aprovado em 06/11 (D-1); é mudança de volume para todos | Sessão de 07/11, autorizada pelo Gustavo ("pediu que a sessão decidisse"); registrado como DESCARTADO |
| E-b1, E-b2 (vaga vazia preenchida com outro músculo / repetindo músculo) | Vaga vazia recebe exercício de outro músculo do dia (B1r) ou repetindo músculo (B2) | B1r: dias <=4 sem nada 50,2% -> 20,5%, mas uso dos minutos não melhora (séries ficam em 2); B2: 8 exercícios/dia mas 3 de quadríceps no mesmo dia, monotonia 33,8% | "Não achei estudo de volume redistribuído"; repetir estímulo é redundante (`kassiano2022`); 3º empurrar sem puxar contra consenso do ombro | Recomendação da sessão de qualidade (05/11); Gustavo aprovou B3+C2+D em 06/11 |
| Animado primeiro (desempate) | O desempate prefere exercício animado à variedade | B1 0,3% -> 29,5%; sem defeito 78,3% -> 52,6% | Trocaria defeito com evidência (repetir havendo opção) por nota de opinião | Sessão (decisão técnica 8, 06/11) |
| Rosca sem carga | Bíceps a zero sem equipamento: contração sem carga (`counts2016`, 13 pessoas, texto completo não lido) | sem defeito 82,9% -> 83,8% ao tirá-la; apontada como o defeito mais frequente na 1ª revisão cega | Ocupa o tempo do foco com pouco estímulo; só um estudo; exigia carga nova `sem-carga` (estado/registro) | Sessão (decisão 11); fica registrada como candidata "se o texto completo sustentar e o foco já estiver resolvido" |
| Crucifixo no chão com halteres | Reabertura de recusa antiga | tirava multiarticulares do dia de empurrar do iniciante com 30 min | Piora medida | Sessão (decisão 7 do g) |
| Elevação lateral na parede sem carga | Ombro lateral sem peso | nenhum dado no deltoide | Sem evidência | Sessão |
| Panturrilha com halter numa perna (só halteres) | Mudança de `requer` | alongava o dia; o corte tirava séries de quadríceps | Piora medida | Sessão |
| Remada invertida na mesa; toalha na porta; batente; lençol; puxada deslizante no chão | Costas sem equipamento | 0 estudo; barra de porta ~41 mil idas ao pronto-socorro em 10 anos nos EUA (`shabbir2026`) | Segurança, app não vê a mesa, acidente grave | Gustavo (mesa: "decidida pela sessão, a pedido dele", 03/11); reafirmado em 06/11 |
| Mochila, galão e outros objetos como carga | Carga sem halter | — | Decisão do Gustavo | Gustavo, 03/11 |
| Sugestão de compra (barra/elástico) para quem não tem | Resolver costas | — | "Se a pessoa marcou que não tem nada, ela não tem nada" | Gustavo, 03/11 |
| Superman como série de costas; rosca isométrica com toalha; mergulho na cadeira/entre cadeiras; parada de mão; pseudo-planche; crucifixo deslizante; flexão com palma; sissy squat; good morning; extensão de quadril de bruços; calcanhar elevado; pistol livre; afundo lateral; prancha; dead bug; hollow; Copenhagen (estudo retratado) | Corpo livre | sem estudo, risco, ou não conta para nenhum músculo do app | `pesquisa-v2/16` | Sessão (frente F); resistência manual de parceiro fica "para depois" |
| Trocar a divisão para Superior/Inferior quando não há puxar | Alternativa ao corpo todo | dia de superiores com 19-29 min e 2-3 exercícios | Divisão não muda crescimento com volume igual (robusta) | Sessão (frente F), não recomendado |
| D-4 "prioridade puxa frequência" como escrita | Ativar a vaga do prioritário noutro dia | teto da sessão explica 4 de 5.301 casos (0,08%) | Quase não tem efeito; substituída pela D-4c (2º exercício do prioritário) que entrou no R5d | Sessão (frente A) |
| D-5 "só este grupo" | Modo que não zera os outros | +1,1 ponto de foco | Modo não existe; acima de 60 anos o piso de manutenção pode não bastar e o app não pergunta idade | Sessão; "fica no backlog" |
| B.14 nórdico invertido na extensora (nível 3) | Opção para reto femoral sem máquina | um estudo sem grupo controle (`alonso2019`) | Não recomendado numa vaga obrigatória | Sessão de qualidade |
| B.17 abdução peso 0,5 + glúteo fora dos secundários das flexões | Corrigir "inflação" do glúteo | [opinião] do pesquisador | Mexe na revisão de anatomia; pediria lista de efeitos | Decisão 7 de 06/11: "para depois"; depois "não recomendado" |
| B.9 ombro posterior no grupo "ombros" | Agrupar | [opinião]; efeito no Bruno e na Carla | Não recomendado | Sessão |
| C.5 ombro posterior como vaga-base num dia | Tirar do "complemento" | o ombro posterior sai em 273 programas de 45 min | Não recomendado | Sessão |
| C.6 ajustes de ordem dos complementos | Pequeno | Bruno pode ganhar/perder 1 exercício | "Pequeno demais para um marco" | Sessão |
| B.4 barra fixa que encaixa baixo (remada invertida) | Atributo no cadastro | sem ganho de volume, risco não estudado | Não recomendado | Sessão |
| Face pull do Diego | Manter extensão com elástico (nível 2) ou mover para nível 3 | Diego perde face pull no dia B (ombro posterior 4 -> 3) | Fable [opinião]: manter (extensora moderada, face pull consenso) | Fable propôs; depois o ombro posterior voltou ao piso pela B.5 (barra supinada); Gustavo aprovou os snapshots |
| Rosca direta com barra longa; tríceps francês sentado com barra (para "só barra") | 2 entradas propostas pela Fable | vagas vazias 431 -> 430 e 431 -> 429 | Cenários raros; cada uma pede ficha e cartão | Fable: "não feitas, opção"; continua no backlog |
| Nórdico (como opção sem máquina) e reto femoral sem máquina | Complemento | um estudo (`morin2025`); "não achei estudo de hipertrofia" | Exige técnica e ancoragem | Auditoria 02/11 [opinião] "para depois" |
| Pullover, flexão na suspensão, remada na mesa, Copenhagen, elevação lateral com kettlebell | Candidatos citados pela Fable | sem ensaio / decisão do Gustavo / faltava condição de peso | Não passam o filtro "evidência ou consenso claro + vaga que muda" | Fable |
| Biblioteca sem o lote 3 (25 exercícios) e "só corpo livre" (7) | Opções menores de ampliação | — | Superadas pela opção 1 (32 exercícios) | Sessão (frente G) |
| Nota única ponderada para a régua | Somar medidas com pesos | — | Pesos sem fonte; defeito some na média | Sessão (17, 4.8) |
| Zod 4, react-router 7, vitest 5 | Corrigir alertas do `npm audit` (20; 3 em produção) | `npm audit fix` sem `--force` não tira nenhum | Versões maiores, PR próprio | Decidido em 12/11 ("Fica") |
| Reescrever o histórico do git | Tirar e-mails antigos | muda todos os hashes | "Fica como está" | Decidido em 12/11 |

### 4.2 Adiado / aguardando condição

| Item | O que é | Número | Condição para voltar | Quem decidiu |
|---|---|---|---|---|
| Variação por blocos (`selecao.variacao`, regra sem código) | Trocar exercícios a cada 6-8 semanas | sem ganho de músculo (moderada); ganho de variedade só na academia (24 -> 37,7 exercícios/24 sem); 11-14% das séries recalibram | Só se o uso real mostrar tédio ou platô; depois do R3 | Sessão de 07/11 |
| "Monte o seu treino" do zero (editor) | Montar/editar programa; v8 coordenada com o redesign | 9 a 13 dias; sem estudo que compare programa montado com prescrito (só `teixeira2012`) | Depois do R5b; rascunho em `prompts/sessao-monte-o-seu.md` | Gustavo (público = quem já treina; avaliador só com exercícios do app) |
| Ler programa de fora por IA | Foto/texto -> exercícios da biblioteca | ~US$ 0,05-0,10 por programa (Opus 5.5, estimativa) | Depois do "monte o seu" | Gustavo: "depois" |
| Gatilhos numéricos da semana leve e do "estagnado" | Gatilho proporcional (>=40% dos exercícios), "estagnado" em 4 sessões, uma saída por vez | "estagnado" 2% a 45% conforme ritmo e ruído; variantes cortam "estagnado" pela metade mas mudam semana leve em no máx. 1 sugestão | Export real do Gustavo no R3 (`npm run ler-export`) | Backlog desde 02/11; mantido |
| Recalibrar ao mudar a faixa (objetivo/nível) | Evita a mensagem "duas sessões abaixo do mínimo" ao trocar força -> hipertrofia | Bruno 6, Carla 3 mensagens enganosas | Depois do R3 (pede campo novo na sessão) | Sessão |
| Revisão do nível oferecida aos ~6 meses (`nivel.revisao`) | Hoje o nível nunca é reavaliado | Ana iniciante com "forte": 0 de 19 prescrições mudam; só 10,1% dos iniciantes treinam aos 12 meses (`conti2026`) | Depois do R3 | Sessão |
| PAR-Q+ oficial e revisão por CREF | Triagem com perguntas de acompanhamento | ver seção 9 | Antes de abrir a desconhecidos | Gustavo |
| "Prefiro este" entre níveis (B.6) | Preferência puxa nível seguinte quando a diferença é só de carga | — | Pendente | Fable propôs |
| Cascata no 2º local | Trocar primeiro todas as vagas com equivalente | no Superior B de academia feito só com halteres: puxada -> elevação -> rosca -> tríceps | Pendente (gravidade média, frequência baixa) | Achado novo de 02/11 |
| Extensão de quadril nos cortes de tempo | Proteger o glúteo como abdômen/panturrilha | 0,8% dos programas (426, todos de 30-60 min em cenários de um item só) | Decidir | Backlog R5a |
| Dias de 30 min acima do tempo (F.9) | Proteger com 2 séries e trocar por isolador | 40% (eram 26%) -> 69,6% -> 48,1% -> medido 49,8-50,1% | Feito parcialmente (R5-CL/R5a); ainda 20,5% dos programas de 30 min têm A3 | — |

---

## 5. Decisões do Gustavo (dono do produto) sobre o gerador

Cuidado de leitura: em 07/11 o Gustavo "pediu que a sessão decidisse os pontos em aberto"; várias decisões técnicas dos marcos seguintes são da sessão (autorizada), com o motivo e a medida registrados. Abaixo, o que está atribuído ao Gustavo nos documentos.

- 01/11 (replanejamento): público principal é ele (família e amigos podem testar); sucesso medido pelo uso dele; cadastro até 1 min para quem não tem condição nem dor, com "academia completa"; boneco atual fica; revisão por Educação Física e triagem com perguntas de acompanhamento ficam de lado; foto do corpo, biotipo, idade, peso e sexo no perfil: não agora; primeiro passo = R0 (aproveitar o equipamento); critério "repetir 80% do programa de referência" sai.
- 01/11 (R0b): aprovou os 3 pontos: animação aprovada como desempate; sem drop set nas semanas de RIR 3-4; barra fixa/polia quando há as duas: fica a regra atual (polia ganha por "carga possível"). Aprovou snapshots das 4 personas.
- 01/11 (R0c): leg press segue como alternativa (desempate como está); nasce a funcionalidade "prefiro este"; adução sem alternativa é exceção; aviso da panturrilha sentada aprovado. Ideia nova: vários locais (virou R1b).
- 01/11 (R1): regra de segurança da triagem aprovada antes do código; Ana com 45 min (snapshot); `selecao.dia-sem-principal`; regressão visual com cabeçalho fixo.
- 02/11 (R1b): aprovado por inteiro; máquinas: cada local tem a sua carga (sem conversão entre aparelhos).
- 02/11 (R2): 4 decisões: "A sua semana" em faixa no topo; séries de acerto contam na semana com RIR <= 4; acima de 26 semanas, mesma volta (calibração a partir da última carga -20%); semana leve aceita vale 7 dias. Aprovou os 4 snapshots da volta de 30 dias; nenhuma semana leve nas 3 semanas depois de outra; a correção da fonte `nuzzo2024b`.
- 02/11 (auditoria do treino, item a item): entram agora 1 (articulações), 2 (lote 1 de fichas), 3 (carga leve sem vaivém), 4 (obrigatórios depois dos grandes), 6 (4 exercícios só com halteres), 7 (carga que existe), 9 (`rir.carga-baixa` a partir da 3ª semana), 10 (texto do 2º local); backlog: 5 (2ª vaga do prioritário) e 8 (escada por exercício); 11 medido no export do R3.
- 02/11 (anatomia, item a item): entram 1-7, 9, 10, 13; 8 (músculos que só ajudam ficam no desenho sem contar) e 12 (mergulho conta tríceps inteiro) ficam como estão. Também 02/11: acima de 65 anos fica fora (app não pergunta idade).
- 03/11 (equipamento mínimo): botão "Corpo livre"; app não sugere comprar; mochila/galão não entram como carga; remada na mesa não; "todos os exercícios ganham animação"; aviso de limite do peso do corpo é sutil.
- 04/11: aviso agrupado das costas ("sem algo para puxar") em vez de um aviso "abaixo da meta" por músculo; sessão de fechamento (9 folhas aprovadas, kettlebell, suspensão, tempo que sobra, lista de casa, flexão com mãos fechadas, avisos juntos); mini-band sai agora e os 12 do elástico esperam o R4; pergunta de objetivo: opção (b) (CLAUDE.md: só "ficar mais forte" muda números, só para intermediário/avançado).
- 05/11: aprovou a direção do R4 (erro sobre o certo, rótulos, vista pelo movimento); 16 animações aprovadas.
- 06/11 (qualidade dos treinos): aprovou as recomendações das decisões 1 a 7 (vaga sem exercício B3+C2+D; Corpo todo 6x só como recuo; texto da prioridade + aviso de focos que competem; 2º empurrar sem banco inclinável; abdômen e panturrilha protegidos + vaga de abdômen como foco; ajustes B.8, B.11, B.16, B.18, B.20; B.5 ombro posterior; B.17 para depois). Decisão 8: D-4, D-3, B.4, B.9, C.5, C.6, E-c vão para o backlog.
- 06/11 (próximos passos, respostas): o app abre para família e amigos (não ao público); "monte o seu" é para quem já treina e tem programa; avaliador aceita só exercícios do app (IA depois); ainda não há incômodos do R3 anotados. Pedido 4 do redesign (resumo curto da calibração) ficou de fora por decisão dele; nome do app segue treino-mvp até validar; aprovou "Quando você costuma treinar?" (v8) e as funções `marcasDaSessao`/`marcasDaSemana`.
- 07/11: pediu que a sessão decidisse os pontos em aberto (ordem R5a/R5-CL/R5d/R5-anim/R5b/R5c, limiar 1,5, E-c descartado, variação por blocos depois do R3, CREF de lado); autorizou levar a sessão à `main` (só `docs/`).
- 08/11: foto desligada por enquanto; revisão por advogado dispensada; teto de gasto confirmado (US$ 4,97, recarga desligada).
- 10/11: aprovou folha a folha as 5 + 3 animações; aceitou as 3 trocas por desempate nas personas (Fábio x2, Ana); pediu corrigir o braço da ponte com halter ("o braço está estranho").
- 12/11: manter dependências (zod 3 etc.) e o histórico do git como estão; pendente dele: decidir refazer a animação da `panturrilha-chao` (duas pernas na descida) ou mostrá-la como cartão.

---

## 6. Pendências do backlog (`docs/backlog.md`) que tocam gerador, biblioteca, progressão, cadastro e triagem

### 6.1 Gerador (seleção, volume, tempo, foco)
- **B.4** barra fixa que encaixa baixo: pendente, não recomendado.
- **B.9, B.14, B.17, C.5, C.6, D-5**: pendentes, "não recomendados com a medida".
- **B.6** "Prefiro este" entre níveis: pendente.
- **B.2** texto do porquê do nível 2: o backlog e `proximos-passos.md` (1.6) ainda o listam como pendente; mas `qualidade-treinos.md` F.8 diz que o porquê "deixa de soar como pior" foi alterado em 06/11 [obs: inconsistência; conferir no código].
- **D-3 / D-4c / foco-primeiro**: ENTRARAM no R5d (D-4 como escrita trocada pela D-4c).
- **E-c**: DESCARTADA (07/11).
- **F.5** custo da proteção do abdômen (Ana perdeu 2 séries do búlgaro): proteger com 2 séries sem passar dos minutos: parcialmente feito só com 30 min (R5-CL).
- **F.9** 3 custos: dias de 30 min (feito parcialmente), mesmo exercício todo dia no Corpo todo 6x (feito no R5-CL), ombro lateral no Corpo todo 6x (feito no R5a: 87,7% -> 24,6%).
- **Foco invisível que resta**: 30 min (31,3%) e foco nas pernas (44,2%); ideia a medir: com "pernas" e 30 min, sugerir mais minutos no cadastro.
- **Aceite do caso do Gustavo** (pernas em 9-10, não 6): se ele preferir treinos mais curtos com pernas no piso, a distância de 6 séries (`volume.prioridade.foco-primeiro`) vira escolha de produto.
- **Críticas dos treinadores fora do foco** (ver 3.3).
- **Desempate entre equivalentes animados** cai na ordem do nome (3 trocas aceitas); sugerido critério de variedade ou dificuldade dentro do nível; é "regra do gerador, para o marco do gerador".
- **D1 no Corpo todo A/B** (ponte por falta de stiff passa o D1 em +22 programas): rever com R5d/avaliador; **D1 e o foco** (peito/ombros sobem empurrar de propósito): rever se o limite deve considerar o foco.
- **Régua**: faltam C3, D2, E2, E3, E4.
- **Avaliador**: 106 -> 210 programas (0,02% de 911.625) com "ajustar" que o gerador não avisa (flexão fechada conta como empurrar desde 12/11: "elásticos, avançado, 3 dias, 45 min, foco peito e braços, lombar 7": empurrar 14 × puxar 8); decidir se o gerador aplica as trocas ou se o avaliador as trata como limite; decidir flexão fechada na tabela de funções; foco abaixo da meta com uma série que ainda cabe (panturrilha da Ana) e bi-sets em dias >110%.
- **Faixa "Há uma versão nova do seu programa"** aparece quando só os textos mudam; ideia: comparar só exercícios/séries/dias.
- **Cascata no 2º local**; **R1b**: apagar um local; "aqui dá para fazer também…".
- **Ancoragem do elástico** (não existe capacidade; cartão diz onde prender) + aviso de segurança (`ng2022`).
- **Costas sem algo para puxar**: sem saída honesta (decisão de manter o aviso).
- **Os 5 exercícios novos só como alternativa** (desenvolvimento em pé, elevação lateral unilateral e deitado com halter, remada unilateral com elástico, caminhada lateral): rever se a troca do dia mostrar que são escolhidos.
- **Gerador ~15% mais lento** (~2 ms/programa): só se incomodar.

### 6.2 Biblioteca e guia
- **Fila de animação**: 81 exercícios em cartão após o lote 2 (próximos sem peça nova: crucifixo com halteres 9,2%, tríceps testa 8,6%, crucifixo invertido curvado 8,5%, crucifixo invertido sentado 8,3%, francês unilateral 7,1%, crucifixo inverso 7,0%; máquinas pedem peça nova: cadeira flexora 8,7%, extensora 8,3%, puxada pela frente 7,3%). Ordem A, C, B, D, E.
- Nas personas, o que ainda é cartão: Carla (11), Bruno (5), Ana (ponte com halter já animada; sobra crucifixo invertido sentado), Diego/Fábio (barra só na descida); Elisa nenhum.
- **Degraus propostos para exercícios que já existem** (agachamento até a cadeira, flexão arqueiro, prancha lateral com abdução, abdominal com toalha, "no step ou num degrau"): não entraram.
- **Rosca direta com barra longa e francês com barra** (Fable): não feitos.
- **Panturrilha no chão**: animação mostra descida com as duas pernas; decidir refazer ou virar cartão (12/11).
- **Ponte com kettlebell**: cotovelos abertos no ar (aprovada 04/11); correção pede folha própria.
- **R4 D.3 itens 4 a 7** (câmera perto no modo Técnica, vista de cima na adução, mão por cima do disco, sombra): pendentes.
- **Fichas e cartões "dos 37 sem guia" e "~40 antigos"** [obs]: o devlog de 12/11 diz que a auditoria de base passou de 20 para 0 exercício sem guia; as entradas do backlog ("Da auditoria do treino" e R0c) não foram removidas.
- **Exercícios que só pedem halteres / lacunas de equipamento (auditoria 02/11, item 6)**: feitos (4 exercícios), depois ampliados pelo R5-CL.

### 6.3 Progressão
- **Gatilhos pelo export** (semana leve, "estagnado" em 3 sessões; achado 11; F.2): pendentes, depois do R3.
- **Tabela de Nuzzo 2024** (repetições × % da carga) no lugar de Brzycki na calibração: pendente.
- **Calibração na volta de pausa > 26 semanas**: feita no R2.
- **Menor anilha (T8)**: "confirmar a menor anilha da sua academia" é pendência do Gustavo (sem resposta vale 2 kg). Backlog do redesign lote 2: UI da barra ignora a menor anilha com `passoKg`; [obs] não está claro se foi fechado (a barra por 2× a menor anilha no domínio entrou em 02/11; barra vazia como piso em 12/11).
- **Resumo curto da calibração** (pedido 4 do redesign): fora, por decisão do Gustavo.
- **Nota de dor sem série onde ficar**: o backlog "Do R5a" diz pendente; o devlog de 12/11 diz que `dorSemSerie` resolve [obs: entrada do backlog desatualizada].
- **Simulador da frente D**: ficou no scratchpad; versionar em `scripts/auditoria/` se voltar a ser usado.
- **Acima de 65 anos**: fora do app.
- **Gráfico da evolução**: depois do R3.

### 6.4 Cadastro (perguntas ao usuário)
- **"Quando você costuma treinar?"** (dias planejados; estado v8): aprovada em 06/11, espera parada própria [obs: estado já está na v8 desde 12/11 por outro motivo].
- **Cronometrar o cadastro no celular** (critério 1; meta até 15 s a tela de equipamento): pendência do Gustavo.
- **Item por item do equipamento** ficou 2 toques mais longo para a Ana.
- **Esteira no inventário antigo**: decidir tirá-la quando a pessoa salvar o equipamento de novo.
- **Tela do "escolha até 2"**: pedido ao design.
- **Foto**: desligada por decisão de 08/11 (ligar com `VITE_FOTO=ligada` e convite por pessoa).
- **Idade, peso, sexo, altura, foto do corpo**: não pedidos (ver seção 10).

### 6.5 Triagem
- **Perguntas de acompanhamento** estilo PAR-Q+ (backlog linha 15): só depois de confirmar a licença e revisão por CREF.
- **Licença do PAR-Q+** (`parq2025`): autorização escrita para usar o texto oficial; decidir pedir ou seguir com as perguntas próprias (a tela diz "não é o questionário oficial").
- **Texto do bloqueio da triagem** (F.1): dizer que pressão controlada com liberação do médico costuma ser conversa rápida; sem mudar a triagem. Pendente.
- **Textos de segurança a partir do Guia do MS 2021** (`ms2021`): pendente.
- **RIR explicado na 1ª vez em cada tela** (F.3): só a folha no programa entrou.
- **Revisão por CREF**: "de lado" (seção 9).
- **Ordem dos avisos de meta** (F.3): pendente.

---

## 7. Longo prazo

### 7.1 O que a simulação mostrou (frente D, 06/11; 4 personas Ana, Bruno, Elisa, Carla; 48 corridas de 24 semanas e 8 de 52; código real, corpo modelo)
1. **Semana leve** sugerida 2 a 6 vezes em 24 semanas (8 a 13 em 52), sempre que a carência acaba (a cada ~4-5 semanas); gatilho "≥2 exercícios estagnados" em programas de 7 a 37 exercícios; a semana leve não desfaz a estagnação. Quem recusa ("Agora não" só até o próximo treino) vê a oferta 46 a 107 vezes em 24 semanas (Ana 46/57, Bruno 66/76, Elisa 51/64, Carla 107/107).
2. **Calibração que não termina**: com salto grande (4 -> 5 kg, +25%) nenhuma carga cai na janela; 62 de 492 exercícios ficaram >=4 sessões só em séries de acerto, 26 deles >=8 (até 31 sessões; elevação lateral do Bruno 20, adução da Carla 21).
3. **"Estagnado"** vai de 2% a 45% das sugestões conforme ritmo e ruído (Elisa lento sem ruído 45%); sem ação concreta (a frase lista 4 saídas, nada é aplicado). Variantes (4 sessões; "nenhuma das 3 subiu") cortam pela metade mas mudam a semana leve em no máx. 1 sugestão; o gatilho proporcional zera a semana leve para quem progride rápido.
4. **Iniciante**: o 1º "estagnado" da Ana/Elisa na semana 2 ou 3; semana leve da Elisa já na semana 2 em 5 de 10 cenários.
5. **Nível nunca reavaliado**: a regra do app reclassificaria aos ~6 meses (`6-24m` = intermediário); Ana iniciante com "ficar mais forte": 0 de 19 prescrições mudam (Bruno 8 de 32; Carla 10 de 37).
6. **Mudança de objetivo** (semana 13): hipertrofia -> força sobe 1 passo (Bruno 7, Carla 9), direção certa; força -> hipertrofia gera mensagem que engana ("Duas sessões abaixo do mínimo..." Bruno 6, Carla 3) porque a faixa mudou, e as sessões não guardam a prescrição.
7. **Troca de exercício ao fim de um bloco** (semana 9): põe 11-14% das séries das 8 semanas seguintes em "acerto" (Bruno 81 de 594, Carla 87 de 771); a semana leve continua contando as vagas antigas (exercício da vaga, não o feito).
8. **Cargas absurdas** (52 semanas): nenhuma fora do inventário; a placa da torre sem o nº de placas chega à 17.
9. Estado guarda só o programa atual; sem registro de programas anteriores.
10. Praticante simulado de 02/11 (`auditoria/progressao.md`, 15 casos, regerado): 11 "anda"; 2 "vaivém" (2 pares de halteres 5 e 10 kg: 5 subidas e 5 voltas; elevação lateral na polia: 2 e 2); 1 "não sobe" (halteres montáveis de casa, 18 kg); 1 "trava" (panturrilha no chão para quem só tem elásticos: 31 sessões sem progresso).

### 7.2 O que d-longo-prazo.md propôs e o que entrou
- Opção 1 (antes do fim do R3): (a) calibração com saída -> ENTROU (R5a: 3 séries de acerto; simulador 57 -> 0 calibrações longas); (b) "Agora não" até sinal novo -> ENTROU como 7 dias (sem campo novo; a variante com número de estagnados ficou fora); (c) carência na fase de aprendizado -> ENTROU (semanas 1-2 do iniciante); (d) estagnação pelo exercício feito -> ENTROU; (e) script de leitura do export -> ENTROU (`npm run ler-export`).
- Opção 2 (depois do R3): gatilho proporcional da semana leve, "estagnado" com saída concreta, recalibrar ao mudar a faixa, revisão do nível oferecida aos ~6 meses (`nivel.revisao`) -> NÃO entrou (espera o export; pede estado novo).
- Opção 3: blocos com troca de exercícios -> NÃO entrou (sem evidência de mais músculo; custo de calibração).
- Opção 4 (só medir) -> parcialmente (o script).
- Evidência de longo prazo: não achada para hipertrofia >1 ano em treinados; ganho de força desacelera (`steele2023`, `latella2020/2022`); periodizar/variar = mesma hipertrofia (moderada); semana leve não muda hipertrofia (`coleman2024`); só 10,1% dos iniciantes treinam aos 12 meses, mediana de abandono 19 semanas, 1º mês decide (`conti2026`).
- O simulador pós-R5a (reconstruído): ofertas recusadas em 24 semanas 0-106 -> 0-22; vezes/semana <=1; semana leve na fase de aprendizado 0 (o simulador não reproduziu o caso da frente D).
- Dados do uso real (R3): não encontrado export com números; "ainda não há incômodos anotados do R3" (06/11).

---

## 8. Defeitos conhecidos e ainda abertos nos programas gerados (com exemplos dos documentos)

1. **Costas, bíceps, ombro posterior sem algo para puxar**: 0 série com o aviso `equipamento.sem-ancoragem`; "sem saída honesta". Caso do Gustavo (sem nada, 60 min, 3 dias): costas e bíceps 0 em todas as versões.
2. **Treinos de 30 min**: A3 em 20,5% dos programas de 30 min (sem dor), A2 3,9%, C2 32%, D1 2,4%; 30 min com dia acima do tempo ~50% (grade reduzida). A causa é a proteção do abdômen/panturrilha (decisão 5 de 06/11).
3. **Dia típico abaixo de 70% dos minutos sem aviso (A4)**: 5,0% geral; 22,2% nos atalhos (casa, condomínio, academia), 16,4% nas personas, com 60-90 min. Com 90 min a mediana do dia típico é 52% dos minutos; "cabem cerca de 12 exercícios" é promessa que o modelo de dia não cumpre (qualidade A.11). Estresse: dia mais longo <70% em 27,6% dos programas; dia mais longo para em ~71 min com 90-150 min.
4. **Foco ainda invisível** em 13,4% (30 min 31-32%; foco "pernas" 44,2%; abdômen 21,6%); com 2-3 focos, "um chega à meta e o outro não" (aviso `volume.prioridade.competicao` existe). Carla recebe o aviso (panturrilha 12 de 14).
5. **Repetição por falta de opção (B2/B3)**: sem nada 26,7%, um item só 21,9%, iniciante 40,9% (B2); estresse: `monotonia.todos-os-dias` 5.645, com exemplo "ponte-gluteo-halter em todos os 3 dias" (casa/condomínio iniciante, ombro 7) e "rosca-scott-banco-inclinado em todos os 3 dias" (casa+, condomínio).
6. **Repete havendo equivalente parado**: estresse `monotonia.repete-com-opcao` 58.808 (42,8%); exemplo casa iniciante 20 min: ponte com halter em 2 dias com ponte e coice com elástico do mesmo nível sem uso. O desempate (carga possível > variedade) é decisão do R0b.
7. **Dor leve que não poupa** (`seguranca.dor-leve-nao-poupou` 464 no estresse): ex. casa+, iniciante, ombro 4: rosca inclinada carrega o ombro e a rosca Scott poupava.
8. **Estresse: `volume.abaixo-sem-aviso` 11.452**: ex. peso-corpo, iniciante, 2 dias, 20 min: ombro lateral com 0 de 6 séries sem aviso (o aviso agrupado "sem algo para puxar" cobre costas/bíceps; ver decisão 04/11).
9. **`dia.so-core` 8**: ex. elásticos, intermediário, PPL 2x (6 dias), 20 min: Empurrar B só com abdominal (8 min); `equilibrio.sem-puxar` 1.440 (peso-corpo, 2 dias, 20 min: 4 séries de empurrar e nenhuma de puxar); `volume.zero.costas` 1.440; `volume.zero.posteriores` 180; excesso acima do máximo do nível: glúteo 5.266, tríceps 2.838, bíceps 1.701 (ex. casa iniciante 3x60: bíceps 11 de máx. 10).
10. **Meta com tempo sobrando** (`tempo.sobra-com-meta-abaixo` 34.351): ex. casa iniciante 2 dias 90 min ombro 7: dia mais longo 53 de 90 min e há músculo abaixo da meta.
11. **G1**: 14,1% dos programas com um dia de 3+ cartões (Carla com máquinas e barra; Bruno com 5; atalhos 56,2%, personas 43,2%).
12. **D1** 0,9% sem dor (314 programas); 210 programas com ajuste de empurrar ÷ puxar que o gerador não avisa.
13. **Progressão**: panturrilha no chão sem halteres trava (31 sessões); 2 vaivéns com saltos de +100% e +50% em placa/halter esparso; halteres montáveis 2-18 kg "não sobe" em 16 sem; flexão e remada com elástico andavam pouco (escada própria desde 03/11).
14. **Elevação lateral/ombro lateral**: no máximo 3 opções mesmo na academia+ (qualidade 1.4 do retrato); com halteres leves sem elevação lateral nem rosca (crítica R5d).
15. **Aceitos como estão** (não são defeitos para corrigir): 1 dia/semana não aceito (2 a 6 dias); glúteo sem prioridade acima do máximo por séries indiretas (11-12 de 10 no iniciante; aproximação `volume.serie-indireta.peso`); "estagnado" medido só no R3.
16. Casos dos personas com custo registrado: Ana perdeu 2 séries do búlgaro pela proteção do abdominal (quadríceps 7 -> 6, glúteos 11 -> 10, posteriores 7 -> 6, panturrilha 8 -> 7; dia C 46 min com aviso); Fábio nórdico 3 -> 2 e posteriores 10 -> 9 após o afundo para trás.
17. Recorte de PERSONAS atual (regua.md): atalhos 66,5% sem defeito; personas 70,3%; pares de casa 73,3%; academia/quase nada muda.

---

## 9. Revisão por profissional de Educação Física (CREF)

- Está "de lado" por decisão do Gustavo desde 01/11/2026 (devlog, Replanejamento: "A revisão por profissional de Educação Física e a triagem com perguntas de acompanhamento ficam de lado"; backlog linha 39; backlog linha 15 condiciona as perguntas de acompanhamento à licença do PAR-Q+ e à revisão de um CREF).
- Reafirmado em 07/11 (proximos-passos 3.1 item 4): "A triagem continua com as perguntas próprias, e a revisão por um CREF continua 'de lado', como o Gustavo decidiu em 01/11. Fica registrada como item a reavaliar antes de abrir o app a desconhecidos (não para família e amigos)". Também no R5c (devlog): "reavaliar antes de abrir o app a desconhecidos".
- Matriz de próximos passos, linha 19: "PAR-Q+ oficial e revisão por um CREF: custo a orçar; estava 'de lado' (01/11); abrir a outras pessoas é um motivo novo para reconsiderar [opinião]: decisão do Gustavo". `e-produto.md` B8: o PAR-Q+ pode ter taxa "não informada" e o CREF "a orçar".
- O PLANO-MVP.md (seção de segurança) já "sugere uma revisão por um educador físico (CREF) antes do beta aberto". A Fable (04/11, Parte A, riscos) recomenda a revisão antes do beta aberto: a técnica de quase todo exercício vem de consenso (manual da NSCA, não verificado), "o roteiro do especialista já existe". Fable F.1: a proposta revisada de triagem (que para gente que as diretrizes mandariam treinar) está registrada e NÃO aplicada "por decisão do Gustavo, até a revisão de um profissional com CREF"; concorda em não aplicar sem o profissional (errar para o conservador é o erro certo num app sem supervisão). A OMS 2020 (`bull2020`) dispensa liberação só para atividade leve/moderada; hipertrofia perto da falha é vigorosa: "apoia manter a triagem conservadora até a revisão do profissional".
- Separado: há também uma "rodada com o especialista" sobre o Boneco (roteiro `docs/revisoes/r4-roteiro-especialista.md`; "designer de ilustração didática ou profissional de EF ou Fisioterapia"), pendente; o A foi feito oficial por pedido do Gustavo e a revisão do especialista "pode ainda pedir ajustes".
- Por que está de lado: o motivo explícito NÃO foi encontrado nos documentos lidos (só "decisão do Gustavo"). Contexto: o público principal é ele mesmo e depois família e amigos (01/11 e 06/11); custo a orçar; nenhum prazo registrado. A revisão por advogado foi tratada à parte e dispensada em 08/11.
- A triagem hoje: 9 perguntas próprias, não é o questionário oficial (licença exige autorização escrita da PAR-Q+ Collaboration); qualquer "sim" bloqueia até confirmar a liberação (exceto osteoarticular, que pede região e nota de dor); o app não pede nome nem CREF/CRM do profissional (LGPD art. 6º III; `09-decisoes-m3.md`, seção 8).

---

## 10. Perguntas do cadastro

### 10.1 O que o app pergunta hoje (código em `src/features/onboarding/` e devlog do redesign, lote 3, 08/11)
Cadastro em 5 telas (era 6); 11 toques sem a tela de equipamento (era 13):
1. Boas-vindas (aviso: o app não diagnostica; a foto, quando ligada, sai do aparelho).
2. Saúde/triagem em uma pergunta ("Nenhuma se aplica a mim" marca "não" nas 9; as perguntas inteiras a um toque): problema no coração ou pressão alta; dor no peito; perdeu o equilíbrio por tontura ou desmaiou nos últimos 12 meses; outra doença crônica; remédio para doença crônica; problema osteoarticular hoje ou nos últimos 12 meses (pede as regiões e a dor de hoje 0-10); médico pediu exercício só com acompanhamento; gravidez ou bebê nos últimos 6 meses; febre, gripe forte ou recuperação de doença. Um "sim" bloqueia até confirmar avaliação/liberação.
3. Nível: há quanto tempo treina musculação sem parar (menos de 6 meses / 6 meses a 2 anos / mais de 2 anos); se está treinando agora (faixas de pausa: treinando, ~2 semanas, 3 semanas a 6 meses, mais de 6 meses); confiança na técnica dos exercícios básicos (sim / mais ou menos / não); "Quer começar num nível mais leve?" (a pessoa pode baixar, nunca subir).
4. Rotina: dias por semana (2 a 6); minutos por treino (30, 45, 60, 75, 90 ou "Outro" de 20 a 150); grupos prioritários (opcional; "escolha até 2" com nota); divisão (opcional, "Como prefere dividir?"; nada marcado, vale a recomendada).
5. Equipamento: começa pelo lugar; atalhos ("casa com halteres e elásticos", "condomínio com multifuncional", "academia completa", "Corpo livre"); lista com busca; ou foto (hoje desligada); detalhes que mudam o programa (faixa e passo dos halteres, estações, altura da polia, pesos do kettlebell, menor anilha quando há anilhas).
Fora do cadastro, em "Meus dados": objetivo (ganhar músculo [padrão], manter o músculo enquanto perde peso, ficar mais forte, saúde e disposição; só "ficar mais forte" muda números, só para intermediário/avançado) e "algo a evitar" (exercícios e equipamentos). Observação: o devlog do redesign diz que o objetivo saiu do cadastro; `Rotina.tsx` só mostra a pergunta de objetivo quando aberta de Meus dados (`?de=dados`). A cada local: nome (Prédio, Academia, Casa, Trabalho ou texto) e equipamento. Pendente: "Quando você costuma treinar?" (opcional, depois do 1º treino; v8).

### 10.2 O que já foi discutido sobre idade, sexo, peso e outros
- **Decisão de 01/11 (replanejamento; `planejamento/2026-11-diagnostico.md` 5.5):** foto do corpo, biotipo, idade, peso e sexo (e altura): "não agora/não fazer". Motivo: nenhuma regra os usaria; LGPD art. 6º III (coletar só o necessário); alongaria o onboarding. Detalhe: sexo não muda volume/intensidade (Roberts 2020, não verificado; Refalo 2025: ganho absoluto um pouco maior em homens, relativo igual); idade muda pouco (talvez progressão mais conservadora e atenção à triagem; NSCA 2019 Fragala; perda de força em pausa maior acima dos 65, Bosquet 2013); peso corporal só serviria para mostrar carga em kg no peso do corpo, que a escada de dificuldade já resolve [opinião]; altura: nenhuma regra usa [opinião]. Peso inicial por fórmula com idade e peso: rejeitado; vale "calibrar na 1ª série" (feito no R1b).
- **Se um dia entrar:** idade em faixas ("60 anos ou mais?") só quando existir regra que use a resposta, com selo e fonte.
- **Backlog (R2, 02/11):** "Acima de 65 anos a pausa pesa mais e a manutenção pede mais, mas o app não pergunta a idade (decisão do Gustavo: fica fora)". Backlog "Decididos em 01/11": idade, peso corporal, sexo, altura no perfil: não fazer agora (nenhuma regra os usa); foto do corpo e biotipo: sem evidência e dado sensível.
- **Reaparece como limite:** D-5 "modo só este grupo" (qualidade D-3/D-5): "acima de 60 anos, 1 a 3 séries pode não bastar (`bickel2011`); o app não pergunta a idade". O Fable F.1 e a Parte B não pedem idade.
- **Sexo**: não aparece em nenhuma regra do gerador nos documentos lidos.
- **Gravidez** é pergunta da triagem (pergunta 8: "grávida ou teve bebê nos últimos 6 meses"); o Fable nota que os "6 meses" não vêm do formulário PAR-Q+ nem da OMS (a OMS aceita força na gestação sem contraindicação, com acompanhamento, evitando deitar de costas depois do 1º trimestre).
- **Objetivo** (04/11, `pesquisa-v2/12`): decisão (b), a pergunta de objetivo com ajustes pequenos dentro do treino de força; cutting e saúde = mesmo treino; saúde diz que as diretrizes pedem 150-300 min de aeróbio que o app não prescreve; a opção (c) (cardio prescrito, nutrição com parceiro, força máxima periodizada) foi para o backlog, fora do MVP.
- **Menor anilha** é a única pergunta de "dado físico" incluída porque muda o programa (sem resposta vale 2 kg).
- **Perguntas sobre sede/religião/etc.**: não aplicável; a nutrição (kashrut/halal) está no backlog como regra dura futura.
- **Nome ou registro do profissional na triagem**: não pedido (LGPD).
