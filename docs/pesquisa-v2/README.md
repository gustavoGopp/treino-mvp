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
| [01-divisao-e-frequencia.md](01-divisao-e-frequencia.md) | Corpo todo, AB, ABC, ABCD, superior/inferior, empurrar/puxar/pernas: o que a evidência diz e como escolher | Pronto para revisão |
| [02-panorama-da-evidencia.md](02-panorama-da-evidencia.md) | O que a evidência mais recente (ACSM 2026 e meta-análises) diz de cada variável, comparado com as regras atuais | Pronto para revisão |
| [03-universo-de-equipamentos.md](03-universo-de-equipamentos.md) | Os equipamentos que academias, condomínios e casas costumam ter, organizados para o gerador | Primeira versão |
| [04-exercicios-por-musculo.md](04-exercicios-por-musculo.md) | Tema T3: o que cresce mais em cada um dos 12 músculos, as regras de escolha por função e quantos exercícios por semana | Aprovado em 01/11/2026 |
| [05-montagem-da-sessao.md](05-montagem-da-sessao.md) | Tema T4: quanto cabe em cada duração, ordem, aquecimento e a nova escada de cortes quando falta tempo | Aprovado em 01/11/2026 |
| [06-populacoes-e-seguranca.md](06-populacoes-e-seguranca.md) | Tema T5: iniciante, volta de pausa, mulheres, 60+, gestação, pressão alta e lesões; a triagem conferida contra as diretrizes e uma proposta registrada, não aplicada | Aprovado em 01/11/2026 |
| [07-progressao-e-acompanhamento.md](07-progressao-e-acompanhamento.md) | Tema T6: pausas detectadas sozinhas, "a sua semana", evolução por exercício, semana leve só com sinal e calibração da carga na 1ª série; base do marco R2 | Pronto para revisão |

## Próxima sessão
O prompt para continuar com o tema T6 está em [`docs/prompts/sessao-pesquisa-v2-t6.md`](../prompts/sessao-pesquisa-v2-t6.md). Para ler os resumos do PubMed, use `scripts/pesquisa/pubmed.py`.

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
6. **Progressão e acompanhamento.** (em revisão: `07-progressao-e-acompanhamento.md`) Dupla progressão, pausas, semana leve e adesão. Base do marco R2.
7. **Universo de equipamentos, segunda versão.** O que cada equipamento abre, com prioridade.
8. **O programa do Gustavo.** Aplicar a base nova ao perfil e ao equipamento dele, na máquina que tem `privado/`, e comparar com o programa de referência só como curiosidade, não como meta.

Cada tema termina num arquivo desta pasta e numa lista de mudanças propostas para `docs/pesquisa/regras.md`, que só entram com aprovação.
