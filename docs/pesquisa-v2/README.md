# Pesquisa v2: a base do programa, refeita sem premissas (iniciada em 01/11/2026)

## Por que existe
O Gustavo pediu um passo atrás: estudar de novo **qual é a melhor forma de montar um programa de hipertrofia**, para qualquer pessoa e para ele, **sem tomar como certo** nada do que veio do programa pessoal de referência (`referencia/programa-fase-1.md`). Esse programa foi feito rápido, como ponto de partida do projeto, e não como resultado de um estudo.

A pesquisa de 29/10 (`docs/pesquisa/`, M0-R) continua valendo como ponto de partida. Mas ela respondeu "que números usar" (volume, RIR, descanso…) e **não respondeu "como montar o treino"**:
- qual divisão usar;
- quantos exercícios por dia;
- quais exercícios em cada lugar;
- como aproveitar o equipamento.

Essas decisões foram copiadas do programa de referência para o código, sem pesquisa.

## Método (o que muda em relação ao M0-R)
- **Leitura melhor.** A rede desta sessão agora abre o PubMed. Cada estudo citado aqui teve o **resumo oficial lido no PubMed** (marcado **resumo-PubMed**, com o número PMID). Isso é um degrau acima do "verificado-busca" do M0-R. O texto completo continua não lido, salvo quando dito.
- **Os mesmos 4 selos** de `docs/pesquisa/00-metodo.md` (robusta, moderada, um estudo, consenso).
- **Nada é premissa.** Toda decisão de montagem que hoje está no código passa pela pergunta "qual é a evidência?". Se não houver, ela vira consenso declarado ou é refeita.
- **Universal primeiro, pessoal depois.** O programa do Gustavo sai do mesmo gerador universal, com o perfil e o equipamento dele (que ficam em `privado/`), sem regra especial.

## Premissas herdadas que estão sendo reavaliadas
| # | Premissa no projeto hoje | De onde veio | Situação |
|---|---|---|---|
| 1 | A divisão é fixa pelo número de dias (2 → corpo todo A/B; 3 → corpo todo A/B/C; 4 → torso/membros; 5 → torso/membros + superiores) | Programa de referência (`src/domain/gerador/divisoes.ts`) | **Reavaliada em `01-divisao-e-frequencia.md`** |
| 2 | Cada dia tem vagas fixas, com preferências copiadas do programa de referência (ex.: ombro lateral "prefere polia") | Programa de referência | Em estudo (tema 3 do plano abaixo) |
| 3 | Cada exercício tem uma "ordem" fixa de preferência na biblioteca | Programa de referência | Em estudo (tema 3) |
| 4 | Critério de sucesso: o gerador repetir ≥ 80% do programa de referência | Plano de 29/10 | **Retirada em 01/11/2026** (ver `01`, seção 6, e o critério 2 do `PLANO-MVP.md`) |
| 5 | A biblioteca de 73 exercícios e as 25 animações originais | O guia do programa de referência | Em estudo (`03-universo-de-equipamentos.md` e tema 3) |
| 6 | Os números das regras (volume, RIR, cargas, descanso, progressão) | Pesquisa M0-R | **Conferidos contra a evidência nova em `02-panorama-da-evidencia.md`**: na maior parte, confirmados |

## Arquivos
| Arquivo | Conteúdo | Situação |
|---|---|---|
| [01-divisao-e-frequencia.md](01-divisao-e-frequencia.md) | Corpo todo, AB, ABC, ABCD, superior/inferior, empurrar/puxar/pernas: o que a evidência diz e como escolher | Aprovado em 01/11/2026 |
| [02-panorama-da-evidencia.md](02-panorama-da-evidencia.md) | O que a evidência mais recente (ACSM 2026 e meta-análises) diz de cada variável, comparado com as regras atuais | Aprovado em 01/11/2026 |
| [03-universo-de-equipamentos.md](03-universo-de-equipamentos.md) | Os equipamentos que academias, condomínios e casas costumam ter, organizados para o gerador | Primeira versão |
| [04-exercicios-por-musculo.md](04-exercicios-por-musculo.md) | Tema T3: o que cresce mais em cada um dos 12 músculos, as regras de escolha por função e quantos exercícios por semana | Aprovado em 01/11/2026 |
| [05-montagem-da-sessao.md](05-montagem-da-sessao.md) | Tema T4: quanto cabe em cada duração, ordem, aquecimento e a nova escada de cortes quando falta tempo | Aprovado em 01/11/2026 |
| [06-populacoes-e-seguranca.md](06-populacoes-e-seguranca.md) | Tema T5: iniciante, volta de pausa, mulheres, 60+, gestação, pressão alta e lesões; a triagem conferida contra as diretrizes e uma proposta registrada, não aplicada | Aprovado em 01/11/2026 |
| [07-progressao-e-acompanhamento.md](07-progressao-e-acompanhamento.md) | Tema T6: pausas detectadas sozinhas, "a sua semana", evolução por exercício, semana leve só com sinal e calibração da carga na 1ª série; base do marco R2 | Aprovado em 01/11/2026 |
| [08-equipamentos-v2.md](08-equipamentos-v2.md) | Tema T7: a lista final de 46 equipamentos, o que cada um permite e como a carga sobe, os 3 atalhos de cenário, a foto e a fila das animações com o custo; 30 fichas de técnica novas em `../pesquisa/animacoes/` | Aprovado em 01/11/2026 |
| [09-trocas-e-locais.md](09-trocas-e-locais.md) | Tema T9: o que se leva do progresso ao trocar de aparelho ou de local, o que recomeça pela calibração na 1ª série e o "prefiro este"; base do marco R1b | Aprovado em 01/11/2026 |
| [10-equipamento-minimo.md](10-equipamento-minimo.md) | Quem não tem nada, ou tem um aparelho só: peso do corpo, puxar sem equipamento, escadas por exercício | Decidido em 03 e 04/11/2026 (`docs/revisoes/equipamento-minimo.md`) |
| [11-catalogo-completo.md](11-catalogo-completo.md) | O catálogo completo, por músculo, nível e equipamento: os buracos medidos, 17 equipamentos candidatos (com o sandbag), os exercícios que faltam, escadas, segurança e a lista de entrada ordenada por ganho ÷ custo de animação | Para a decisão do Gustavo |
| [12-outros-objetivos.md](12-outros-objetivos.md) | Cutting, força máxima e saúde: o que muda no treino e o que o app pode fazer sem sair do MVP | Decidido em 04/11/2026: a pergunta de objetivo entrou no MVP, só dentro do treino de força (`CLAUDE.md`, "Escopo") |
| [13-exercicios-por-grupamento.md](13-exercicios-por-grupamento.md) | Quantos exercícios e quais por grupamento, e o que fazer quando a vaga fica vazia (sessão de qualidade dos treinos, 05 e 06/11/2026) | Base das decisões de `docs/revisoes/qualidade-treinos.md` |
| [14-combinacoes-por-dia.md](14-combinacoes-por-dia.md) | Quantos exercícios por treino, o que combina no mesmo dia e a vaga vazia (06/11/2026) | Base das decisões de `docs/revisoes/qualidade-treinos.md` |
| [15-prioridade-e-manutencao.md](15-prioridade-e-manutencao.md) | Prioridade de um grupo e manutenção dos outros (06/11/2026) | Base do marco R5d (`devlog.md`, 08/11/2026) |
| [16-corpo-livre-e-casa.md](16-corpo-livre-e-casa.md) | O que dá para treinar sem equipamento, só com apoio (06/11/2026) | Base do marco R5-CL (`devlog.md`, 07 e 08/11/2026) |
| [17-biblioteca-ampliada.md](17-biblioteca-ampliada.md) | Exercícios para todas as combinações de equipamento e o que faz um treino agradável (06/11/2026) | Base do marco R5-CL (`devlog.md`, 07 e 08/11/2026) |
| [18-volume-pelo-tempo-e-pelo-nivel.md](18-volume-pelo-tempo-e-pelo-nivel.md) | Quanto fazer: dose-resposta, dose mínima, nível, frequência, teto por sessão (12/11/2026) | Para a decisão do Gustavo (`docs/revisoes/treino-para-todos/proposta.md`) |
| [19-carga-falha-repeticoes-e-descanso.md](19-carga-falha-repeticoes-e-descanso.md) | Carga, falha, precisão da reserva, repetições por equipamento, descanso, carga leve em quem é forte (12/11/2026) | Idem |
| [20-escolha-ordem-e-interferencia.md](20-escolha-ordem-e-interferencia.md) | O desempate entre exercícios, a ordem, a fadiga da lombar e da pegada, dias seguidos (12/11/2026) | Idem |
| [21-progressao-em-meses-e-tecnicas-de-tempo.md](21-progressao-em-meses-e-tecnicas-de-tempo.md) | Dupla progressão, periodização, semana leve, platô, volta de pausa, bi-set e drop set (12/11/2026) | Idem |
| [22-pessoas-diferentes-e-cadastro.md](22-pessoas-diferentes-e-cadastro.md) | Iniciantes, mulheres, 60 anos ou mais, acima do peso; idade, sexo e peso no cadastro (13/11/2026) | Idem |
| [23-dor-pressao-alta-e-gestacao.md](23-dor-pressao-alta-e-gestacao.md) | Dor por articulação, pressão alta e gestação: treino × triagem; o PAR-Q+ 2025 lido (13/11/2026) | Pauta da revisão por profissional; nada muda na segurança |
| [24-objetivos-e-adesao.md](24-objetivos-e-adesao.md) | Manter na dieta, ficar mais forte, saúde; o que faz a pessoa continuar (13/11/2026) | Para a decisão do Gustavo |
| [25-treinadores-e-aplicativos.md](25-treinadores-e-aplicativos.md) | Como treinadores montam, o que se critica em treinos de aplicativo, o que os aplicativos fazem; só consenso (13/11/2026) | Base das medidas do retrato |
| [26-verificacao-independente.md](26-verificacao-independente.md) | 23 afirmações centrais conferidas na fonte por verificadores que não viram as conclusões (13/11/2026) | 16 confirmadas, 7 em parte |

## Estado (atualizado em 13/11/2026)
Os temas 18 a 26 são da sessão "treino para todos" (12 e 13/11/2026): começaram pelo que os 17 anteriores não respondiam ou respondiam com evidência fraca (o mapa das lacunas está em `docs/revisoes/treino-para-todos/mapa-das-lacunas/`). Trouxeram 114 fontes novas e releram 116. Nenhuma regra mudou ainda.

Os temas T1 a T7 e o T9 estão aprovados e aplicados: os marcos R0b, R0c, R1, R1b e R2 (este com o T6, em 02/11/2026); os marcos do R5 vieram depois (`docs/devlog.md`). Os documentos 10 a 17 vieram das sessões seguintes (equipamento mínimo, catálogo completo, outros objetivos, qualidade dos treinos e próximos passos). Falta só o T8 (o programa do Gustavo), que é feito na máquina dele, com `privado/`. Para ler os resumos do PubMed, use `scripts/pesquisa/pubmed.py`.

## Plano dos próximos temas (em ordem)

> O plano detalhado de cada tema (perguntas, fontes, entregável e critério de pronto) está em [PLANO-DOS-TEMAS.md](PLANO-DOS-TEMAS.md). Os temas 1 e 2 e a divisão escolhida pela pessoa foram aprovados pelo Gustavo em 01/11/2026.
1. ~~Divisão e frequência~~ (feito).
2. ~~Panorama das variáveis~~ (feito).
3. ~~**Escolha dos exercícios, músculo por músculo.**~~ (feito: `04-exercicios-por-musculo.md`)
   - Para cada músculo: quais exercícios têm evidência de crescer mais, como posição alongada, ângulos e regiões do músculo. Exemplos já lidos: a flexora sentada cresceu mais os posteriores que a deitada (Maeo 2021); hip thrust e agachamento cresceram o glúteo de forma parecida (Plotkin 2023).
   - Quantos exercícios por músculo e por sessão.
   - Como variar entre blocos de semanas.

   Esse tema substitui as "vagas" e a "ordem" herdadas.
4. ~~**Montagem da sessão.**~~ (feito: `05-montagem-da-sessao.md`) Duração, ordem, técnicas para economizar tempo (superséries, drop set), aquecimento e transições.
5. ~~**Iniciantes, volta de pausa e populações.**~~ (feito: `06-populacoes-e-seguranca.md`)
6. ~~**Progressão e acompanhamento.**~~ (feito: `07-progressao-e-acompanhamento.md`) Dupla progressão, pausas, semana leve e adesão. Base do marco R2.
7. ~~**Universo de equipamentos, segunda versão.**~~ (feito: `08-equipamentos-v2.md`) O que cada equipamento abre, com prioridade.
8. **O programa do Gustavo.** Aplicar a base nova ao perfil e ao equipamento dele, na máquina que tem `privado/`, e comparar com o programa de referência só como curiosidade, não como meta.

Cada tema termina num arquivo desta pasta e numa lista de mudanças propostas para `docs/pesquisa/regras.md`, que só entram com aprovação.
