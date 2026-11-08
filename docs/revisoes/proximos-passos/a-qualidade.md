# Frente A: qualidade, variação e combinações dos treinos gerados (06/11/2026)

> Sessão de próximos passos, Frente A. Só mede e propõe: nada em `src/`, `tests/` ou `scripts/` mudou. Dados fictícios (os cenários de `scripts/auditoria/cenarios-55.ts` e as 6 personas de `tests/personas/`). Os protótipos ficaram numa cópia do gerador no scratchpad e serão descartados. A cópia, rodada sem mudança nenhuma, dá programas idênticos aos do repositório em 7.431 de 7.431 casos.

**Em uma olhada.** Medi cada item do backlog numa grade reduzida: os 6 cenários comuns (academia, condomínio, casa, sem nada, só elásticos, halteres e banco), 3 níveis, 2 a 6 dias, 30 a 90 min e 13 combinações de prioridade, sem dor, o que dá 5.850 programas. Medi também as 6 personas. Seis achados mudam o que vale fazer:
1. A **D-4 como está escrita** ("a prioridade puxa frequência quando passa do teto de 10 por sessão") quase nunca se aplica: o teto da sessão explica 4 dos 5.301 casos de prioritário abaixo da meta. O que segura o prioritário é o tempo (43,5%) e o número de exercícios dele, todos já com 4 séries (39,2%). Um **2º exercício de outra função** para o prioritário baixa esses casos de 45,3% para 40,5%, e no avançado de 64,9% para 55,1%. Das personas, só a Carla muda.
2. **A repetição do mesmo exercício em todos os dias** vem quase toda do Corpo todo A/B/C em casa: 100% desses programas repetem a flexão (ou o supino). Descer um nível da mesma função num dos dias baixa a repetição de 29,6% para 18,4% sem mudar nenhuma série.
3. **O custo dos dias de 30 min acima do tempo** (F.9) cai de 69,6% para 48,1% dos programas quando o exercício protegido entra com 2 séries e, se o dia passar do tempo, troca de lugar com um isolador.
4. **A variação por blocos** (`selecao.variacao`) não é usada no código. Ela só rende na academia: com o rodízio dentro do mesmo nível que prefere o que tem animação, a pessoa vê 24,0 exercícios diferentes em 24 semanas hoje e 37,7 com o rodízio. Em casa vão de 17,6 para 18,5, e sem nada de 9,8 para 10. Para a hipertrofia, a evidência dá empate (moderada).
5. **O degrau de escada** (B.20) mexe em 89% dos programas fora da academia, sem precisar de animação nova.
6. Os itens **C.5, B.17 e B.14** pioram o programa ou não têm apoio na evidência. A **C.6** é pequena demais.

---

## 1. O que existe hoje

| O quê | Onde | Regra | Medido hoje (grade reduzida, 5.850 programas comuns) |
|---|---|---|---|
| Vagas por função, níveis de preferência e desempate entre equivalentes (dor leve, estabilidade, carga, **variedade entre os dias da semana**, "Prefiro este", animação, id) | `src/domain/gerador/index.ts` (`contextoDeSelecao`, `chave`), `funcoes.json` (22 funções) | `selecao.funcao-da-vaga`, `selecao.preferencia` | 17,1 exercícios diferentes por semana em média |
| Programa fixo até a pessoa pedir outro | `index.ts:722` (texto); `src/storage/esquema.ts` guarda só o programa atual, com a data `geradoEm` | `selecao.manter-no-bloco` (moderada, `kassiano2022`) | — |
| **Variação entre blocos** | **nenhum código a usa**: `selecao.variacao` só aparece em `regras.md`, em `regras.json` e num texto de `scripts/auditoria/catalogo.ts` (`grep -rn "selecao.variacao" src scripts`) | `selecao.variacao` (moderada, `kassiano2022`, `fonseca2014`) | 0 |
| Onde o exercício troca hoje | (1) "Prefiro este" (`preferidos` no estado, `acoes.ts:alternarPreferencia`), que vale no próximo programa; (2) a alternativa do dia (`noLugarDe` na sessão, `acoes.ts:105`); (3) o treino num outro local (`contextoDeSelecao`, mesma escolha); (4) o 4º passo do platô, **que é só texto**: `progressao/index.ts:122` diz "4) troque por uma variação equivalente" e não troca nada | `selecao.preferencia`, `progressao.troca-equivalente`, `progressao.estagnacao` (consenso) | — |
| Como a progressão trata um exercício novo | `sessao/index.ts`: o histórico é por `exId` (`historicoDoExercicio`); 1ª vez → calibração na 1ª série (`textoPrimeiraVez`: "Você já faz X; aqui é a 1ª vez"); a carga do antigo nunca é convertida | `progressao.calibracao`, `progressao.troca-equivalente` | — |
| Prioridade: meta do alvo do nível, vagas marcadas, séries primeiro no mais longe da meta, cortes por último | `metasDoPerfil`, `ativa`/`rank`, distribuição, `cortarTempo` | `volume.semanal.alvo`, `volume.prioridade.competicao` | prioritário abaixo da meta em 45,3% dos pares programa × músculo prioritário (iniciante 23,7%, intermediário 47,3%, avançado 64,9%); fatia das séries no foco: 17,4% com 1 grupo, 32,7% com 2, 57,3% com 3 |
| Proteção do abdômen e da panturrilha | `index.ts`, bloco `tempo.musculo-protegido` | `tempo.musculo-protegido` (consenso) | com 30 min, 69,6% dos programas têm um dia acima do tempo; com 45 min, 17,2% |
| Tempo que sobra vira série só nos dias com vaga vazia | bloco `tempo.sobra-series` | `tempo.sobra-series` | programas de 45 min ou mais cujo dia mais longo usa menos de 70% dos minutos: 18,9% (academia: 24,1%); uso médio do dia mais longo com 90 min: 72,5% |
| Repetição | — | `selecao.variacao` | o mesmo exercício (fora o abdominal) em todos os dias em 29,6% dos programas de 3 dias ou mais (na grade oficial com dor, 39,9%, `docs/revisoes/qualidade/grade.md`) |

**Por que o prioritário fica abaixo da meta** (diagnóstico novo; script `run.ts`, contador `motivo`): nos 5.301 pares programa × músculo prioritário abaixo da meta dos cenários comuns, o dia já está cheio de minutos (90% ou mais) em **43,5%**. Em **39,2%**, todos os exercícios do músculo já estão em 4 séries e falta um exercício a mais. Em **16,6%** não há exercício possível. O teto de 10 séries na sessão, com o músculo num dia só, explica **4 casos (0,08%)**, e o resto fica em 0,6%.

## 2. O que falta, medido

### 2.1 Cada item do backlog

Para cada item, a regra mudou numa cópia do gerador (`gerador.ts` com `PROT=<item>`) ou num dado mutado no próprio processo. A comparação vale para os 6 cenários comuns, salvo quando o item é de um cenário só. "Mudam" é a fatia dos 8.775 programas da grade reduzida, os 6 cenários comuns mais só halteres, só barra fixa e o Diego, cujo programa muda.

**D-4. A prioridade puxa frequência.** Três versões:
- D-4 como está escrita: só quando o músculo treina 1 dia e a meta passa de 10.
- D-4b: quando o máximo possível com os exercícios do músculo (4 séries cada, meia série nas indiretas, no máximo 10 por dia) fica abaixo da meta, entra uma vaga dele num dia que não o tem.
- D-4c: como a D-4b, mas pode entrar num dia que já tem o músculo, com outra função. Todas respeitam o número de exercícios que cabe.

| Medida | Hoje | D-4 escrita | D-4b | D-4c |
|---|---:|---:|---:|---:|
| Programas que mudam | — | 2,6% | 9,9% | 12,6% |
| Prioritário abaixo da meta (pares) | 45,3% | 45,0% | 42,4% | **40,5%** |
| Idem, avançado | 64,9% | 64,7% | 59,3% | **55,1%** |
| Avançado, por músculo: panturrilha / quadríceps / posteriores / costas / peito | 97 / 75 / 67 / 59 / 41% | igual | 60 / 73 / 68 / 59 / 41% | **62 / 60 / 60 / 50 / 34%** |
| Fatia das séries no foco (1 grupo) | 17,4% | 17,5% | 17,6% | 17,7% |
| Programas de 45 min com um dia acima do tempo | 17,2% | — | 17,8% | 17,7% |
| Personas que mudam | — | nenhuma | Carla | **Carla**: a panturrilha em pé na máquina entra no dia de Puxar (4 séries), a panturrilha vai de 12 para 14 e o aviso de focos que competem some |

**D-3. Recomendar até 2 grupos.** É texto no cadastro e não muda o gerador. A frequência medida: o prioritário fica abaixo da meta em 44,1% dos pares com 1 grupo, 44,2% com 2 e 50,2% com 3. O aviso `volume.prioridade.competicao` aparece em 18,2% dos programas da grade oficial (`grade.md`, Avisos). Bruno e Carla escolheram 4 grupos cada.

**D-5. Modo "só este grupo".** O protótipo deixou os não prioritários com 3 séries, o piso de manutenção, e manteve as mesmas vagas.

| Medida | Hoje | D-5 |
|---|---:|---:|
| Programas que mudam | — | 84,8% |
| Fatia das séries no foco (1 / 2 / 3 grupos) | 17,4 / 32,7 / 57,3% | 18,5 / 34,3 / 59,3% |
| Prioritário abaixo da meta | 45,3% | 45,0% |
| Programas de 45 min ou mais com uso abaixo de 70% | 18,9% | 24,1% (o treino encurta) |

Só baixar as metas dos outros quase não muda o foco: as vagas e o mínimo de 2 séries por exercício continuam. O modo pede vagas próprias. Fica no backlog, como já está.

**E-c. Mais séries para todos quando sobra tempo.** É o `tempo.sobra-series` valendo em todos os dias.

| Medida | Hoje | E-c |
|---|---:|---:|
| Programas que mudam | — | **52,9%** |
| Uso abaixo de 70% (45 min ou mais): comuns / academia | 18,9% / 24,1% | **11,8% / 9,1%** |
| Uso médio do dia mais longo com 60 / 75 / 90 min | 91,9 / 82,4 / 72,5% | 95,6 / 88,9 / 80,5% |
| Séries médias por semana: costas / quadríceps / tríceps | 6,7 / 8,2 / 7,5 | 7,8 / 8,9 / 8,5 |
| Fatia das séries no foco (1 grupo) | 17,4% | 16,2% (o foco se dilui) |
| Prioritário abaixo da meta | 45,3% | 44,9% |
| Personas | — | **Bruno**: o Inferior A vai de 40 para 66 min, e quadríceps, posteriores e glúteos vão de 8, 8 e 7 para 12, 12 e 12. **Carla**: ombro de trás, bíceps e tríceps vão de 10,5, 10,5 e 12 para 13,5, 13,5 e 14, e o Superior vai de 70 para 74 min (ela escolheu 75) |

**B.4. A barra fixa que encaixa baixo.** O protótipo dá `barra_baixa` a quem marca `barra_fixa: { baixa: true }`.

| Medida (só barra fixa) | Hoje | B.4 |
|---|---:|---:|
| Programas que mudam | — | 100% dos de só barra fixa e do cenário do Diego (22,2% da grade reduzida) |
| Costas, séries por semana (média) | 9,3 | 9,8 |
| Dias com até 3 exercícios (45 min ou mais) | 31,9% | 29,2% |
| Exercícios diferentes por semana | 12,5 | 13,2 |
| Prescrições sem animação | 0% | **8,6%** (a remada invertida não tem animação, ficha nem cartão; `fila.md`, bloco D, nº 10) |
| Personas | — | **Fábio**: a remada invertida entra no lugar da 2ª pegada da barra nos dois dias de superior, e as costas ficam iguais (12). **Diego**: a remada invertida entra no lugar da remada com elástico no dia B, e as costas ficam iguais (8) |

O ganho em volume é pequeno, porque a decisão 1 de 06/11 já completa as costas do Fábio com a outra pegada. Há também um custo de segurança que ninguém mediu: uma barra de porta montada baixa recebe o puxão na horizontal, para o qual o suporte não foi feito [opinião; não achei estudo].

**B.9. Ombro de trás no grupo "ombros".**

| Medida | Hoje | B.9 |
|---|---:|---:|
| Programas que mudam | — | 10,0% |
| Ombro de trás, séries por semana (média) | 5,5 | 5,7 |
| Prioritário abaixo da meta | 45,3% | 46,8% (mais um músculo com meta alta) |
| Personas | — | **Bruno**: ombro de trás de 9,5 para 12,5 (o crucifixo invertido sobe de 2 para 4 séries; os dias de superior caem de 70 e 69 para 67 e 67 min). **Carla**: de 10,5 para 14 (face pull 2→4, crucifixo invertido 2→4; a puxada perde 1 série; bíceps 10,5→10) |

**C.5. Ombro de trás como vaga-base no Superior A e no Corpo todo B.** Duas versões: C.5 põe a vaga depois das outras vagas-base; C.5b põe a vaga antes do bíceps.

| Medida | Hoje | C.5 | C.5b |
|---|---:|---:|---:|
| Programas que mudam | — | 14,6% | 48,5% |
| 45 min: o que sai | — | **o exercício de ombro de trás sai em 273 programas** (crucifixo invertido curvado, face pull com elástico...): com a vaga-base, o "único exercício direto" (`rank` 1) deixa de resgatá-lo nos outros dias | **a rosca sai 810 vezes** (elástico, martelo, inclinada, alternada, máquina) |
| Bíceps, séries por semana (média) | 6,2 | 6,2 | 5,9 |
| Personas | — | nenhuma | **Diego**: bíceps de 6 para 3,5 (abaixo do piso de 4), ombro de trás de 4 para 5,5 |

O `rank` de hoje já faz o trabalho, e faz melhor. Não recomendo.

**C.6. Abdômen como complemento nos dois dias de Puxar e a elevação lateral para o fim do Inferior B.** Mudam 1,1% dos programas e nenhuma persona: o abdominal entra no lugar de uma abdução ou adução num dia de pernas. Pequeno demais para valer um marco; pode ir junto de outro pacote.

**B.14. Nórdico invertido no nível 3 da extensora.** Frequência: a vaga da extensora fica vazia e o aviso `selecao.isolador-obrigatorio` sai em 100% dos programas de condomínio, sem nada, só halteres, halteres e banco e só barra fixa, e em 76,4% da grade oficial. O alcance é grande, mas só há um estudo, sem grupo controle (`alonso2019`), e o exercício é novo, sem ficha, cartão nem animação. Pequeno em evidência: não prototipei.

**B.17. Abdução com peso 0,5 e o glúteo fora dos secundários das flexões de joelho.**

| Medida | Hoje | B.17 |
|---|---:|---:|
| Programas que mudam | — | 26,6% |
| Glúteo, séries por semana (média): comuns / sem nada | 8,9 / 12,1 | 7,8 / 9,2 |
| Prioritário abaixo da meta | 45,3% | 46,1% |
| Personas | — | Bruno (glúteo 7→6), **Ana** (glúteo, o foco dela, 10→9), Elisa (8→6), Fábio (glúteo 9→8, quadríceps 9→8, posteriores 10→9) |

É uma mudança de conta, [opinião], que mexe na revisão de anatomia e no destaque de músculos do guia. Não recomendo agora.

**F.5 e F.9, 1º custo: dias de 30 min acima do tempo.** O protótipo `f9` faz o exercício protegido ficar com 2 séries (a distribuição não o sobe) e, se o dia passar do tempo, tira um isolador não obrigatório e não prioritário daquele dia, desde que o músculo dele não vá a zero. O `f9-30` faz o mesmo só com 30 min ou menos, que é a proposta da F.9.

| Medida | Hoje | f9 (todas as durações) | f9-30 (só 30 min) |
|---|---:|---:|---:|
| Programas que mudam | — | 16,5% | 13,8% |
| 30 min: programas com um dia acima do tempo | 69,6% | **48,1%** | **48,1%** |
| 45 min: idem | 17,2% | 11,8% | 17,2% |
| Panturrilha / abdômen, séries por semana (média) | 5,9 / 5,5 | 5,6 / 5,3 | 5,6 / 5,3 |
| Personas | — | **Ana** (45 min): búlgaro 2→3, flexão de joelho deslizante 2→3, abdominal 4→2 (abaixo do piso, com aviso), afundo 4→3; posteriores 6→7, glúteos 10→10,5, panturrilha 7→8; nenhum dia acima dos 45 min (antes, o dia C tinha 46) | nenhuma |

O resto dos dias de 30 min acima do tempo não vem da proteção. Nos cenários comuns com 30 min, 1.274 dos 4.680 dias passam do tempo, em média 6,5 min (`diag30.ts`). Em 786 deles (62%) há um exercício protegido. Nos outros 488 (38%), o dia passa do tempo só com 4 exercícios no mínimo de 2 séries: a conta "cabem 4 exercícios em 30 min" (`tempo.exercicios-por-sessao`, consenso) não fecha com o tempo estimado.

**F.9, 2º custo: o mesmo exercício em todos os dias.** Ver 2.3.

**F.9, 3º custo: o ombro lateral no Corpo todo 6x.** O protótipo `ov6` põe um complemento de empurrar vertical (o pike, sem depender da prioridade) nos dias A, C e E do Corpo todo 6x.

| Medida (sem nada) | Hoje | ov6 |
|---|---:|---:|
| Programas que mudam | — | 1,8% (só 6 dias sem nada) |
| Ombro lateral a zero na semana | 85,2% | 71,7% |
| Dias com até 4 exercícios (45 min ou mais) | 26,5% | 20,4% |
| Personas | — | nenhuma (nenhuma treina 6 dias) |

**B.20, 2ª parte: a panturrilha no degrau.** Em vez de um exercício novo, o protótipo trata um "degrau de escada" como o step: abre a `panturrilha` (uma perna, calcanhar abaixo do apoio, **já tem animação aprovada**) e a `panturrilha-bilateral-step` (também animada).

| Medida | Hoje | Com degrau |
|---|---:|---:|
| Programas que mudam | — | **88,9%** (todos os cenários fora da academia: hoje 100% deles usam a panturrilha no chão) |
| Panturrilha no chão → panturrilha no degrau | — | 11.658 prescrições saem; entram 7.881 com uma perna e 4.254 com as duas |
| Séries de panturrilha por semana | 5,9 | 5,9 (muda o estímulo, não o volume) |
| 30 min / 45 min: programas com um dia acima do tempo | 69,6 / 17,2% | 73,8 / 19,7% (uma perna de cada vez leva o dobro do tempo) |
| Personas | — | **Ana, Diego, Elisa, Fábio** |

### 2.2 Variação ao longo das semanas

Simulei 6 blocos seguidos para cada caso (10 cenários × 3 níveis × 5 números de dias × 45, 60 e 75 min × 8 prioridades = 360 casos por cenário; `rotacao.ts`). A cada bloco, entre os equivalentes do **mesmo nível** da função, vem antes o que foi usado em menos blocos anteriores. É determinístico: depende só do que já foi feito, sem sorteio nem relógio. O "Prefiro este" vence: a rotação não vale para a função com preferência. Três maneiras:
- **V1**: rodízio em todas as vagas, antes do critério da animação.
- **V2**: rodízio só nos isoladores; os multiarticulares ficam, para a progressão dos exercícios grandes seguir.
- **V3**: rodízio em todas as vagas, depois do critério da animação. Entre equivalentes, o que tem animação aprovada continua na frente.

| Cenário | Funções com 1 opção / 2+ (no nível usado) | 2+ contando todos os níveis | Diferentes por semana | 24 semanas, blocos de 6: hoje / V1 / V2 / V3 | 12 semanas, blocos de 6: V1 / V3 | Vagas que trocam do bloco 1 ao 2: V1 / V2 / V3 |
|---|---|---:|---:|---|---|---|
| academia | 4 / 18 | 21 | 24,0 | 24,0 / 48,9 / 34,5 / **37,7** | 38,5 / 32,9 | 63 / 29 / 36% |
| prédio do Bruno | 6 / 16 | 18 | 23,0 | 23,0 / 36,0 / 28,1 / **29,7** | 31,8 / 28,0 | 38 / 17 / 21% |
| condomínio | 13 / 8 | 13 | 19,8 | 19,8 / 25,6 / 20,3 / 22,6 | 23,8 / 22,3 | 17 / 2 / 11% |
| halteres e banco (Ana) | 13 / 8 | 11 | 18,7 | 18,7 / 22,0 / 19,2 / 20,4 | 21,2 / 20,4 | 12 / 2 / 7% |
| casa | 14 / 8 | 14 | 17,6 | 17,6 / 20,5 / 18,0 / 18,5 | 20,5 / 18,5 | 11 / 1 / 3% |
| só halteres | 12 / 8 | 11 | 17,5 | 17,5 / 19,7 / 18,1 / 18,6 | 19,7 / 18,6 | 9 / 2 / 4% |
| elásticos e barra (Diego) | 17 / 4 | 8 | 18,0 | 18,0 / 20,4 / 18,2 / 20,4 | 20,4 / 20,4 | 9 / 1 / 9% |
| só elásticos | 19 / 2 | 6 | 16,4 | 16,4 / 18,4 / 16,4 / 18,4 | 18,4 / 18,4 | 8 / 0 / 8% |
| só barra fixa (Fábio) | 9 / 4 | 4 | 12,7 | 12,7 / 13,0 / 12,7 / 13,0 | 13,0 / 13,0 | 2 / 0 / 2% |
| sem nada (Elisa) | 10 / 2 | 2 | 9,8 | 9,8 / 10,0 / 9,8 / 10,0 | 10,0 / 10,0 | 1 / 0 / 1% |

Com blocos de 4 semanas, em 24 semanas a academia vai a 49,6 (V1) e 38,0 (V3). Os outros cenários ficam iguais ao bloco de 6: o rodízio acaba antes, por falta de opções.

**O "Prefiro este" vence a rotação** em 40 de 40 casos por cenário, nos 10 cenários. Conferi gerando o bloco 2 com a preferência no exercício do bloco 1.

**Exercícios novos sem guia.** O V1 traz um exercício sem animação aprovada em 75% das entradas novas na academia, e 25% das entradas novas não têm nem cartão de texto (mostrariam "animação em breve"). Em casa, 71% das entradas novas não têm nenhum dos dois. O V3 baixa isso para 56% sem animação e 13% sem nada na academia, e para 0 em casa. A regra do projeto ("exercício sem animação aprovada aparece como cartão textual") pesa contra o V1.

**O que acontece com a progressão** (`sessao/index.ts`, `progressao/`), lido no código:
- **Exercício novo**: a carga recomeça pela calibração na 1ª série, com o texto "Você já faz X; aqui é a 1ª vez" (`textoPrimeiraVez`). Cada vaga que troca custa uma sessão de acerto de carga. Na academia, isso é 36% das vagas a cada bloco com o V3 e 63% com o V1.
- **Exercício que volta** (com 2 opções, o rodízio alterna: o do bloco 1 volta no bloco 3): o histórico antigo continua ligado ao `exId`. A dupla progressão parte da carga de 6 semanas antes. O teste de estagnação (`ult3`, as 3 últimas sessões do exercício) olha as sessões do bloco antigo, e se elas já estavam paradas, o app pode dizer "estagnado" logo na volta. Hoje só a volta de pausa usa o recorte `desde` (`OpcoesSugestao.bloco`): ver Pedidos ao domínio.
- **Semana leve e readaptação**: a troca de bloco não deve cair nelas. A semana leve mantém a carga (`deload.semana-leve`), e a semana 1 da volta só desce. Proponho oferecer a troca só fora dessas fases.
- **"Trocar só no platô"**, uma 4ª maneira, não dá para simular: não há dado real de platô, e o R3 vai medir isso no export do Gustavo. O que dá para medir é quanto dá para trocar sem descer de nível: 87% das prescrições na academia, 85% no prédio do Bruno, 42 a 48% em casa, no condomínio e com halteres, 24% sem nada e no Diego, 8% só com elásticos (`trocaveis.ts`). Hoje o 4º passo do platô só manda trocar, sem apontar as alternativas.

### 2.3 Monotonia e divisões

| Onde | O mesmo exercício em todos os dias (programas de 3 dias ou mais) |
|---|---|
| 6 cenários comuns | 29,6%: **todos no Corpo todo A/B/C**. Casa, halteres, halteres e banco, elásticos, Diego e só barra fixa: 195 de 195 (100%); condomínio: 18 de 195; academia: 0. Superior/Inferior, Sup/Inf + Empurrar/Puxar/Pernas e Empurrar/Puxar/Pernas 2x: 0 |
| O exercício repetido | a flexão (585 programas no Corpo todo A/B/C, mais 195 em cada Corpo todo de 4, 5 e 6 dias), o supino reto (halteres e banco: 195) e a flexão de joelho deslizante (51 a 52) |
| 55 cenários sem dor (53.625 programas) | 55,2%; os corpos todos de 4, 5 e 6 dias, que só aparecem por falta de como puxar, repetem em 97,4% (4.810 de 4.940) |

**Por quê.** No Corpo todo A/B/C, os dias A e C têm "empurrar horizontal" e o B tem "empurrar inclinado". Sem banco, o 1º nível com exercício das duas funções tem só a flexão. O desempate por variedade entre os dias só escolhe dentro do nível, e o nível de baixo (flexão com elástico, supino no chão) nunca entra.

**O que reduz sem tirar volume** (protótipo `m1`): se o exercício já estaria em todos os outros dias da semana, o dia usa o 1º do nível seguinte da mesma função que ainda não está na semana.

| Medida | Hoje | m1 |
|---|---:|---:|
| Mesmo exercício em todos os dias: 6 comuns / 55 cenários | 29,6% / 55,2% | **18,4% / 48,9%** |
| Programas que mudam: comuns / 55 cenários | — | 11,3% / 9,2% |
| O que entra | — | flexão com elástico 390, supino no chão com halteres 390 (sem animação: `fila.md`, bloco A, nº 10), flexão 195 (no lugar do supino de quem tem halteres e banco) |
| Séries por músculo, minutos, prioritário abaixo da meta | — | iguais, com diferença de no máximo 0,1 ponto |
| Personas | — | **Ana**: no dia C a flexão entra no lugar do supino reto (46→47 min). **Diego**: no dia C a flexão com elástico entra no lugar da flexão |

Sem nada (Elisa, Corpo todo 6x), não há nível de baixo: a repetição só sai com exercício novo. Repetir o mesmo exercício com o volume certo não atrapalha o crescimento (moderada, seção 3).

### 2.4 Onde a biblioteca é fina

As funções com 1 opção só, no nível que o gerador usa (intermediário; `rotacao.ts`):

| Cenário | Funções com 1 opção (o exercício) | O que abriria opção, já com evidência | Na fila? |
|---|---|---|---|
| academia | extensora (cadeira), flexão de joelho (cadeira flexora), adução, panturrilha sentada | nada a fazer: uma máquina por função é o normal | — |
| casa | empurrar horizontal e inclinado (flexão), crucifixo (elástico), empurrar vertical, elevação lateral, ombro de trás, tríceps complemento, extensora, flexão de joelho, abdução, adução, panturrilha em pé (**chão**), panturrilha sentada, abdômen | **degrau de escada** para a panturrilha (`kassiano2023b`, `nakamura2025`); o empurrar já tem o nível de baixo (m1) | a `panturrilha` já está animada; o supino no chão está no bloco A da fila |
| condomínio | 13, entre elas puxar vertical (puxada), bíceps, tríceps acima da cabeça, panturrilha em pé (chão) | degrau (idem) | — |
| halteres e banco (Ana) | 13, entre elas empurrar horizontal e inclinado (supino reto), panturrilha (chão) | degrau; o m1 usa a flexão | — |
| só elásticos / Diego | 19 / 17: quase todas | nenhuma com ensaio de hipertrofia que justifique uma 2ª versão com elástico [opinião] | os 12 do elástico já estão feitos (R4) |
| sem nada / só barra fixa | 10 / 9 | degrau; para a barra, a remada invertida (B.4, ver acima) | remada invertida no bloco D |
| prédio do Bruno | 6, entre elas empurrar horizontal (supino reto), hip thrust | — | — |

Leitura: em casa, a biblioteca fina é efeito do equipamento. Abrir opções só para variar tem pouco valor medido (a hipertrofia empata, seção 3). A exceção é o degrau, que muda a posição da panturrilha para a que mais cresceu. As duas entradas da C.1 da auditoria (rosca e francês com barra longa) servem a "só barra longa", fora dos cenários comuns, e já estão no backlog.

### 2.5 Combinações de músculos por dia

O que o `14-combinacoes-por-dia.md` concluiu: as divisões empatam com o volume igual (robusta); a ordem não muda a hipertrofia (moderada); supersérie só entre músculos que não competem (moderada); nunca empilhar empurrar sem puxar (consenso com apoio de caso-controle, `kolber2017`); o 2º exercício só vale se mudar a função (moderada). Conferi nos 55 cenários sem dor (53.625 programas, 214.500 dias; `combinacoes.ts`):

| Verificação | Dias |
|---|---:|
| 3 ou mais empurrar sem puxar, fora dos dias de empurrar | **0** |
| 3 ou mais multiarticulares de quadríceps no dia | 0 |
| Supersérie do mesmo músculo; dia começando pelo abdominal; multiarticular depois de isolador | 0; 0; 0 |
| Exercício de perna num dia de tronco | 0 |
| Corpo todo com 2 empurrar e nenhum puxar | 32.928 (todos sem ter como puxar: flexão + flexão fechada; nunca 3) |
| Idem, **havendo como puxar** | **98** (só barra fixa, 30 min, foco em ombros: o pike entrou pela prioridade e a barra não coube nos 4 exercícios) |
| Exercício de tronco num dia de pernas | 456 (a elevação lateral do Inferior B com foco em ombros, de propósito; a C.6 a manda para o fim) |
| 2 exercícios da mesma função no dia | 10.653 (de propósito: o 2º bíceps com foco em braços, e a remada no lugar da puxada sem puxada) |
| **Músculo com mais de 10 séries diretas numa sessão** | **3** (ex.: condomínio, avançado, 5 dias, 45 min, peito + braços: o dia de Empurrar soma 11 de peito, com supino inclinado 3, supino reto 2, flexão fechada 3 e crucifixo 3). A distribuição de séries confere o teto só no músculo que sobe, e a flexão fechada conta para peito e tríceps |

O gerador obedece à pesquisa. A falha real é a última linha, que é pequena: ver Pedidos ao domínio.

## 3. O que a evidência diz

| Pergunta | Resposta | Selo | Fontes (status) |
|---|---|---|---|
| Variar os exercícios cresce mais que mantê-los? | Não, no músculo inteiro: fixo e variado deram o mesmo em 70 mulheres por 10 semanas (+7,8 a 17,7% × +7,5 a 19,3%), no quadríceps em 49 pessoas por 12 semanas e na massa do braço por DXA | moderada | `kassiano2025var` PMID 39388663 (resumo lido no PubMed, relido hoje); `fonseca2014` PMID 24832974 (resumo, relido hoje); `fabriciovalerio2026` PMID 41985475 (resumo, relido hoje); `kassiano2022` PMID 35438660 (revisão sistemática, 8 estudos, 241 homens jovens; resumo, relido hoje) |
| Variar cobre mais regiões? | Sim, quando muda a função: só os grupos variados cresceram as 4 cabeças do quadríceps; o fixo deixou de crescer em pontos do vasto lateral e do bíceps | moderada | `fonseca2014`; `costa2021` PMID 33440446 (resumo); `zabaletakorta2021` PMID 34743671 (resumo) |
| Trocar demais atrapalha? | A revisão conclui que a variação "aleatória e excessiva" e a "rotação de alta frequência" podem atrapalhar; com exercícios sorteados a cada sessão, só o fixo cresceu o vasto intermédio | um estudo (o ensaio); a frase da revisão é interpretação dos autores | `kassiano2022`; `bazvalle2019` PMID 31881066 (resumo, relido hoje) |
| Variar melhora a motivação? | Sim, num ensaio: a motivação intrínseca subiu no variado e caiu, sem significância, no fixo | um estudo | `bazvalle2019` |
| E a força? | Misturado: um ensaio deu mais força ao "exercício variado com intensidade constante"; em outro, o 1RM empatou e a força isométrica do joelho foi maior no fixo; escolher o exercício na hora deu um pouco mais de massa magra e de supino em treinados | um estudo cada | `fonseca2014`; `costa2022` PMID 35481889 (resumo); `rauch2020` PMID 29016481 (resumo) |
| De quanto em quanto tempo trocar? | Nenhum ensaio compara ritmos de troca; "4 a 8 semanas" é prática de treinadores | consenso | `selecao.manter-no-bloco`; busca no PubMed em 06/11 ("exercise variation" e revisões de 2023 a 2026): não achei meta-análise nova depois de `kassiano2022` |
| A prioridade precisa de mais frequência? | Com o volume igual, a frequência não muda a hipertrofia; o teto por sessão é ~10 a 11 séries; o que trava o prioritário no app é o número de exercícios e o tempo (medido), e o 2º exercício de outra função cobre outra região | frequência: moderada; teto: um estudo (preprint); 2º exercício: moderada | `pelland2026` PMID 41343037; `ramoscampo2024` PMID 38595233; `remmert2025` (preprint); `fonseca2014`; `maeo2024` |
| Mais séries para os não prioritários (E-c) rendem? | Sim, com retorno decrescente; com 4 a 6 séries eles já crescem, mais devagar | robusta (dose-resposta); moderada ("4 a 6 já crescem") | `schoenfeld2017a` PMID 27433992; `pelland2026`; `iversen2021` PMID 34125411 |
| "Só este grupo" pode zerar os outros? | Não: manter custa 1 a 3 séries pesadas por semana; parar derruba a força antes da massa | moderada | `bickel2011` PMID 21131862; `spiering2021` PMID 33629972; `bosquet2013` |
| Quantos focos ao mesmo tempo (D-3)? | "1 a 2 por bloco" é prática de treinadores; não achei estudo | consenso | `pesquisa-v2/15` |
| Panturrilha no degrau × no chão? | No chão só se treina a metade de cima, que cresceu bem menos (+3,4% × +15,2%); com uma perna e descida lenta, sem carga, cresceu +9,1% | um estudo cada | `kassiano2023b` PMID 37015016; `nakamura2025` PMID 40229595 |
| Remada invertida substitui a remada? | Por EMG e consenso; hipertrofia só em idosos; segurança da barra de porta montada baixa: não achei | consenso + EMG; segurança: [opinião] | `fenwick2009`, `youdas2016`, `vural2023`, `soligon2020` |
| Nórdico invertido cresce o reto femoral (B.14)? | Num ensaio sem grupo controle | um estudo | `alonso2019` PMID 30293403 |
| A abdução vale meia série de glúteo; as flexões de joelho trabalham o glúteo (B.17)? | Nenhum ensaio; a abdução cresce mais a parte de cima e o glúteo médio | [opinião]; a abdução: um estudo | `attarieh2026` |
| Repetir a flexão em todos os dias atrapalha? | Não, se o volume está certo; flexão perto da falha ≈ supino com a carga igualada | moderada; flexão × supino: um estudo | `kassiano2025var`; `kikuchi2017` |
| Proteger o abdômen com 2 séries em vez de 4 (F.5)? | A meta de 4 é consenso, sem dose-resposta própria | consenso | `volume.semanal.abdomen` |
| Ombro de trás como vaga-base (C.5) ou no grupo "ombros" (B.9)? | Nenhum ensaio de hipertrofia do deltoide posterior com exercício nenhum | consenso; B.9: [opinião] | `pesquisa-v2/13` |

## 4. Valor para quem usa

- **Ana (halteres e banco, 3 × 45 min, foco em glúteos e pernas).** O degrau põe a panturrilha na posição que mais cresceu, desde o 1º treino. O m1 troca o supino de um dos 3 dias pela flexão. Com o f9 nas durações de 45 min (opcional), o búlgaro volta a 3 séries e o abdômen cai para 2, com aviso. Valor pequeno e visível no próprio programa.
- **Diego, Elisa e Fábio (casa).** O degrau, no cadastro e a cada treino de pernas. O Diego também ganha uma variação da flexão num dos 3 dias. A rotação por blocos quase não muda nada para eles: há 1 opção por função.
- **Bruno e Carla (academia e prédio).** São os únicos para quem a variação por blocos vale: de 23 a 30 exercícios diferentes em 24 semanas no prédio do Bruno, e de 24 para 38 na academia. O momento é a cada 6 semanas, como oferta. Quem mais ganha com a E-c é o Bruno, se o Gustavo quiser treinos que usem o tempo (pernas de 8 para 12 séries, Inferior A de 40 para 66 min). Com a D-4c, a Carla chega à meta da panturrilha e o aviso de focos que competem some.
- **Quem escolhe 30 min**, em qualquer cenário: 21 pontos a menos de programas com um dia acima do tempo (de 69,6% para 48,1%).
- **Sem exagero:** nenhuma dessas opções promete crescer mais. A variação empata na hipertrofia (moderada). A D-4c e a E-c dão mais séries, e mais séries rendem com retorno decrescente (robusta): de 6 para 14 séries, a conta da `pesquisa-v2/15` estima +2 a +3 pontos percentuais em 8 a 12 semanas [opinião sobre coeficientes moderados].

## 5. Opções

| Pacote | O que entra | Efeito medido | Esforço | Risco | Regra / dado / armazenamento | Dependências e choque |
|---|---|---|---|---|---|---|
| **A. Ajustes pequenos** | F.9 com 30 min ou menos (proteger com 2 séries e trocar por um isolador do dia: `f9-30`); m1 (descer um nível quando o exercício estaria em todos os dias); o pike no Corpo todo 6x (`ov6`); o teto da sessão na distribuição (os 3 dias com 11 séries); C.6 de carona | 30 min com dia acima do tempo 69,6→48,1%; repetição 29,6→18,4% (55 cenários: 55,2→48,9%); ombro lateral a zero, sem nada, 6 dias: 85,2→71,7%; f9 + m1 juntos mudam 25,2% dos programas | **1 dia** | baixo; o supino no chão (390 entradas) não tem animação (cartão textual) | Regras: `tempo.musculo-protegido` revista; texto em `selecao.variacao` ("na semana, um nível abaixo antes de repetir em todos os dias"); `volume.sessao.teto` sem mudança de número. Dado: `divisoes.ts` (ct-6x). Armazenamento: nada | Personas: Ana e Diego (o m1). Redesign: nada. R3: o programa do Gustavo só muda se ele pedir outro |
| **B. Prioridade com 2º exercício** | D-4c (o 2º exercício de outra função para o prioritário que não chega à meta, com preferência por um dia da mesma região) + D-3 (o texto "escolha até 2" no cadastro) | prioritário abaixo da meta 45,3→40,5%; avançado 64,9→55,1%; panturrilha do avançado 97→62%; muda 12,6% dos programas | **1,5 dia** (+ a tela da D-3 com o design) | médio: muda a lista do dia para quem tem foco; colocar o exercício no dia errado (a Carla recebe a panturrilha no Puxar) [opinião] | Regra nova `volume.prioridade.segundo-exercicio` (moderada para o 2º exercício; consenso para a escolha do dia); a backlog D-4 sai com a medida (o teto da sessão explica 0,08% dos casos). Armazenamento: nada | Persona: Carla. Redesign: as prioridades ficam no cadastro (proposta, decisão 6): o texto entra lá |
| **C. Usar o tempo que sobra (E-c)** | `tempo.sobra-series` em todos os dias | uso abaixo de 70% (45 min ou mais) 18,9→11,8%; academia 24,1→9,1%; uso com 90 min 72,5→80,5%; muda 52,9% dos programas; o foco cai de 17,4 para 16,2% das séries | **1 dia** + decisão do Gustavo | alto em produto: contradiz o texto aprovado ontem (D-1, "os outros ficam com ~6"); treinos mais longos e cansativos | Regra: `tempo.sobra-series` e `volume.semanal.alvo` reescritas. Armazenamento: nada | Personas: Bruno e Carla. Com B: 56,9% dos programas mudam; prioritário abaixo da meta 40,1% |
| **D. Variação por blocos** | V3 (rodízio no mesmo nível, animação antes, preferência vence), oferecido ao fim de 6 semanas, nunca na semana leve nem na volta; o 4º passo do platô aponta as alternativas do mesmo nível | academia: 24 → 37,7 exercícios diferentes em 24 semanas; Bruno 23 → 29,7; casa 17,6 → 18,5; sem nada 9,8 → 10; 36% das vagas recalibram a cada bloco na academia | **3 a 4 dias** | médio: recalibração, o "estagnado" falso na volta, mais exercícios sem guia (56% das entradas novas na academia sem animação); o ganho em hipertrofia é zero (moderada) e o em motivação, um estudo | Regra: `selecao.variacao` passa a valer, com o texto do V3. Domínio: o recorte `desde` do bloco na estagnação. Armazenamento: os usos anteriores saem do `historico` (sem migração); o "Manter" da oferta pede um campo em `respostas` (migração + teste) | Depende do R3 (o "estagnado" no uso real) e da tela de oferta (redesign: no máximo 1 oferta por abertura). Choque com o R3: trocar os exercícios no meio da medição mistura os dados |
| **E. Casa: o degrau** | B.20 como um item "degrau de escada firme" no "o que tem em casa", que abre a panturrilha no degrau (as animações já existem); a B.4 fica de fora | 88,9% dos programas da grade reduzida mudam (todos fora da academia); 11.658 prescrições de panturrilha no chão viram degrau; com 30 min, dia acima do tempo 69,6→73,8% | **1 dia** + a tela do cadastro | baixo; texto de segurança (segurar no corrimão ou na parede) [opinião]; conferir se o desenho do step serve para um degrau | Dado: item novo na taxonomia (`equipamentos.ts`, zod). Armazenamento: o inventário aceita um item novo (migração + teste). Regra: `selecao.panturrilha-alongada` ganha o degrau | Personas: Ana, Diego, Elisa, Fábio. Redesign: uma linha a mais na lista de casa |

Os itens que não entram em pacote, com o porquê medido: **C.5** (o ombro de trás sai em 273 programas de 45 min, ou a rosca sai 810 vezes), **B.17** ([opinião]; o glúteo da Ana, que é o foco dela, cai de 10 para 9), **B.14** (um estudo sem controle; exercício novo sem animação), **B.9** ([opinião]; muda Bruno e Carla, opcional dentro do B), **B.4** (o volume não muda; risco de segurança não estudado; exercício sem animação), **D-5** (só baixar as metas rende +1,1 ponto de foco; o modo não existe), **F.5 nas durações de 45 min** (opcional: o custo passa da Ana a outro músculo, com o abdômen dela em 2 séries).

## 6. Recomendação

**Recomendo A, depois E, depois B, nesta ordem, num marco só (3,5 dias, mais as duas telas com o design).** C e D ficam para depois.

- **A primeiro** porque corrige os custos que a F.9 deixou, medidos e sem trocar nada que a evidência defende: menos 21 pontos de dias acima do tempo com 30 min, menos 11 pontos de repetição, nenhuma série a menos. É barato e não toca o armazenamento.
- **E** porque é o item de maior alcance com evidência (um estudo × 2) e o mais barato em guia: as animações já existem.
- **B** porque é a forma da D-4 que tem efeito: a versão escrita no backlog mexe em 2,6% dos programas e baixa o prioritário abaixo da meta em 0,3 ponto, enquanto o 2º exercício baixa 4,8 pontos (avançado: 9,8). A tela da D-3 vai junto.
- **C não agora:** é uma decisão de produto (treino que usa todo o tempo × "foco e manutenção", aprovado em 06/11) e dilui o foco. Se o Gustavo quiser, o efeito está medido.
- **D depois do R3:** só rende na academia, não muda a hipertrofia (moderada) e precisa do dado do "estagnado" no uso real antes de mexer na progressão. Quando vier, que seja o V3: rodízio no mesmo nível, animação antes, preferência vence, como oferta.

---

## Pedidos à sessão de design

1. **Cadastro, tela das prioridades (D-3):** uma linha "Escolha até 2 para foco; com mais, o foco se divide", sem bloquear a escolha. Motivo: com 3 grupos, o prioritário fica abaixo da meta em 50,2% dos casos, contra 44,1% com 1; o aviso de focos que competem sai em 18,2% dos programas da grade oficial.
2. **Cadastro, lista "o que tem em casa" (B.20):** um item "Degrau de escada ou soleira firme", com a nota de segurança "segure no corrimão ou na parede". Motivo: hoje 100% dos programas fora da academia usam a panturrilha no chão (88,9% da grade reduzida).
3. **Se o pacote D vier:** (a) uma oferta "Seu bloco de 6 semanas terminou: quer variar alguns exercícios?", com "Variar" e "Manter", dentro da regra do redesign de no máximo 1 oferta por abertura; (b) na folha "Trocar exercício", os equivalentes do mesmo nível primeiro, que é o que o 4º passo do platô deveria apontar. Motivo: na academia, 87% das prescrições têm um equivalente do mesmo nível; só com elásticos, 8%.
4. **Não pedir agora:** a pergunta "a barra encaixa baixo?" (B.4).

## Pedidos ao domínio

1. **O teto da sessão na distribuição de séries** (`gerarPrograma`, passo 3): conferir os 10 por sessão em todos os músculos principais do exercício, como o bloco `tempo.sobra-series` já faz. Hoje há 3 dias com 11 séries de peito em 214.500 (`combinacoes.ts`).
2. **A estagnação no retorno de um exercício** (`progressao/index.ts`, `ult3`): com blocos, contar só as sessões do bloco atual (o recorte `desde` que a volta de pausa já usa) e manter a última carga como referência. Só vale se o pacote D vier.
3. **30 min:** 38% dos dias acima do tempo com 30 min não têm exercício protegido, e o dia passa do tempo com 4 exercícios no mínimo de 2 séries. Rever, com a calibração do tempo real (R2), se "cabem 4" (`tempo.exercicios-por-sessao`) ou a estimativa de minutos está alta.
4. **D-4c, o dia do 2º exercício:** preferir um dia da mesma região (inferior, pernas ou corpo todo para músculos de perna), para não pôr panturrilha num dia de Puxar [opinião].
5. **Script da grade** (`scripts/auditoria/qualidade.ts`): separar na monotonia "com opção no nível de baixo" de "sem opção nenhuma", para o m1 ficar medido na grade oficial.

## Fontes novas

Nenhuma fonte nova: tudo o que a frente usou já tem chave em `docs/pesquisa/fontes.md`. Há dois complementos a chaves existentes, lidos hoje no PubMed:
- `kassiano2022`: Kassiano W, Nunes JP, Costa B, Ribeiro AS, Schoenfeld BJ, Cyrino ES (2022). Does Varying Resistance Exercises Promote Superior Muscle Hypertrophy and Strength Gains? A Systematic Review. J Strength Cond Res 36(6):1753–1762. PMID 35438660. **DOI 10.1519/JSC.0000000000004258** (falta em `fontes.md`). Status: resumo lido no PubMed (8 estudos, N = 241, todos homens jovens; "variação sistemática" pode ajudar a região; "excessiva e aleatória" pode atrapalhar).
- `kassiano2025var`: Kassiano W, Costa B, Kunevaliki G, Nunes JP, Castro-E-Souza P, de Paula Felipe J, Tricoli I, Luiz A, Tricoli V, Cyrino ES (2025). Muscle Hypertrophy and Strength Adaptations to Systematically Varying Resistance Exercises. Res Q Exerc Sport 96(2):371–381. PMID 39388663. **DOI 10.1080/02701367.2024.2409961** (falta em `fontes.md`). Status: resumo lido no PubMed (70 mulheres, 10 semanas; o grupo variado trocava os 2 exercícios de perna a cada sessão da semana).
- Releitura de resumos, sem mudança de status: `fonseca2014` (PMID 24832974), `bazvalle2019` (31881066), `costa2022` (35481889), `fabriciovalerio2026` (41985475).
- Busca sem achado: meta-análise ou revisão sobre variação de exercícios posterior a `kassiano2022` (PubMed, 06/11/2026).

## Como reproduzir

Os scripts ficam no scratchpad e serão descartados. Rode a partir de `/home/user/treino-mvp`, com `npx vite-node --root / <script> -- <args>` (o `--root /` é preciso para o vite-node carregar arquivos fora do repositório).

- `gerador.ts` + `patch.py`: uma cópia de `src/domain/gerador/index.ts` com os imports absolutos e os protótipos atrás de `PROT` (`d4`, `d4b`, `d4c`, `d5`, `ec`, `b4`, `b9`, `b17`, `f9`, `f9-30`, `m1`, `rot`, `rotiso`, `rotanim`). Sem `PROT`, dá o mesmo programa que o repositório.
- `conferir.ts`: confere a cópia sem `PROT` contra o gerador do repositório (7.431 programas, 0 diferenças).
- `run.ts`: a grade reduzida (9 cenários × 3 níveis × 2 a 6 dias × 30 a 90 min × 13 prioridades = 8.775 programas, sem dor) e as 6 personas. Mede minutos, exercícios por dia, séries, metas, o motivo do prioritário abaixo da meta, monotonia e avisos. Também faz as mutações de dado `c5`, `c5b`, `c6`, `ov6` e `b20`, e roda os 55 cenários com `CENARIOS=<lista>`. Ex.: `PROT=d4c npx vite-node --root / run.ts -- out/d4c.json`.
- `comparar.py base.json var.json [prefixo]`: antes e depois de cada medida, % de programas que mudam, personas que mudam.
- `trocas.py base.json var.json [filtro]`: quais exercícios entram e saem nos programas que mudam (C.5, m1, B.20).
- `rotacao.ts`: 6 blocos seguidos por caso; exercícios diferentes em 12 e 24 semanas com blocos de 4, 6 e 8; funções com 1 e 2+ opções; vagas que trocam; entradas novas sem animação ou cartão; a preferência contra a rotação.
- `trocaveis.ts`: % das prescrições com um equivalente no mesmo nível, por cenário.
- `combinacoes.ts`: as verificações das combinações por dia nos 55 cenários sem dor (53.625 programas).
- `diag30.ts`: os dias de 30 e 45 min acima do tempo, com e sem exercício protegido.
- `caso.ts <cenário> <nível> <dias> <min> <prioridades|->`: imprime um programa (os casos citados na seção 2.5).
- `pm.sh "<termo>"`: busca no PubMed (eutils) e lista PMID, ano, revista e título.
