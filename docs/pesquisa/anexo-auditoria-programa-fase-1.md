# Anexo: auditoria do programa de referência (Fase 1)

Este anexo compara `referencia/programa-fase-1.md` (versão de 28/10/2026) com as conclusões de `docs/pesquisa/` e com a tabela `regras.md`. O programa é a saída esperada do gerador no cenário "minha academia", então cada divergência aqui vira uma decisão: ajustar o programa, ajustar a regra ou aceitar a diferença.

**Nada no programa muda sem aprovação do usuário.** Este anexo só propõe. Nenhum arquivo de `referencia/` foi editado.

Legenda:
- **Confirma**: a pesquisa sustenta a regra como está.
- **Ajustar**: a regra fica, mas o texto, o número ou o rótulo de evidência precisa mudar.
- **Muda**: a pesquisa contradiz a regra ou o rótulo, e é preciso trocar.

## 1. Regras do programa

| # | Regra no programa | Decisão | Motivo | Regras |
|---|---|---|---|---|
| 1 | Divisão Torso/Membros, 4 dias, todo grupo 2x por semana | Confirma | Com volume igual, a frequência quase não muda a hipertrofia; 2x é o padrão que respeita o teto por sessão | `frequencia.efeito-hipertrofia`, `frequencia.musculo`, `volume.sessao.teto` |
| 2 | Peito, costas e ombros com 10–12 séries efetivas semanais, subindo só se a recuperação deixar | Confirma | Dentro da faixa do intermediário (10–16) e próximo do alvo 12 | `volume.semanal.minimo`, `volume.semanal.alvo`, `volume.semanal.maximo` |
| 3 | Pernas em 6–8 séries semanais (volume mínimo eficaz) | Confirma | Acima do piso eficaz de 4–6 para músculos não prioritários. Fica abaixo da faixa típica do intermediário, o que é coerente com a prioridade declarada | `volume.semanal.minimo-eficaz` |
| 4 | +1 série nos supinos, remadas e elevação lateral a partir da semana 5, se a recuperação estiver boa | Confirma | Continua dentro de 10–16 e abaixo de 10 séries por músculo por sessão | `volume.semanal.maximo`, `volume.sessao.teto` |
| 5 | Deltoide posterior com 2 séries diretas, completadas pelas remadas e puxadas | Confirma | Pela contagem fracionada, 12 séries de remada e puxada × 0,5 = 6, somadas às 2 diretas dão 8 | `volume.serie-indireta.peso` |
| 6 | Só exercícios estáveis, sem barra longa (halteres, polia, barra fixa, banco) | Confirma | Máquina, polia e halter se equivalem; estabilidade é critério de pontuação razoável | `selecao.equivalencia-equipamento`, `selecao.estabilidade` |
| 7 | Faixas: compostos 6–10 ou 8–12, isoladores 10–20, com o rótulo "evidência robusta" | Ajustar | Os números ficam. O rótulo deve separar as partes: "cargas leves e pesadas dão hipertrofia parecida perto da falha" é robusta; a divisão por tipo de exercício é consenso | `reps.equivalencia-cargas`, `reps.faixa.por-tipo` |
| 8 | RIR: compostos 1–2, isoladores 0–1; "RIR 4 ou mais estimula menos (evidência moderada)" | Confirma | Coincide com o intermediário. O rótulo moderada se apoia numa meta-regressão exploratória; a divisão por tipo é consenso | `rir.alvo`, `rir.serie-efetiva` |
| 9 | Volume: "10 ou mais séries rendem mais, com ganho cada vez menor acima de ~20 (evidência robusta)" | Ajustar | Separar os rótulos: "10 ou mais > menos de 10" é robusta; "pouco ganho acima de ~20" é moderada | `volume.semanal.dose-resposta`, `volume.semanal.teto-padrao` |
| 10 | Descanso: compostos 2–3 min, isoladores 1–1,5 min; "mais de 60–90 s dá vantagem pequena (evidência moderada)" | Confirma | Coincide (1–1,5 min = 60–90 s). Acrescentar que a divisão por tipo de exercício é consenso | `descanso.piso`, `descanso.por-tipo` |
| 11 | Sessões de 55–65 min (torso) e 50–65 min (membros) | Confirma | Plausível pelo modelo de duração, que é consenso e deve ser recalibrado com o tempo registrado | `tempo.serie`, `tempo.transicao`, `tempo.aquecimento`, `tempo.colchao` |
| 12 | Bi-sets de elevação lateral com face pull, e de rosca com tríceps | Confirma | Pares que não competem pelo mesmo músculo; superséries mantêm volume e adaptações | `tempo.superserie` |
| 13 | "Limitação real: sem máquinas de perna e com halteres de carga limitada, quadríceps e posteriores vão crescer menos" | Ajustar | A pesquisa diz que o equipamento importa pouco se a série chega perto da falha. Texto proposto: "podem crescer menos se a carga disponível não permitir chegar perto da falha em até ~30 repetições; o programa compensa com unilaterais, amplitude completa e repetições altas" | `selecao.equivalencia-equipamento`, `reps.teto.carga-limitada`, `equipamento.escada-carga-leve` |
| 14 | Ombro: estalar sem dor é comum e não exige mudar o treino | Confirma | Coerente com a evidência indireta; texto deve indicar consenso | `seguranca.estalo-sem-dor` |
| 15 | Readaptação, semana 1: 2 séries por exercício, RIR 3–4 em tudo | Confirma | 2 de 3 séries está perto dos ~50–60% propostos; RIR coincide | `readaptacao.semana1` |
| 16 | Readaptação, semana 2: todas as séries da tabela, RIR 2–3 | Ajustar | A regra proposta usa ~75% das séries na semana 2 e o volume cheio só na semana 3 | `readaptacao.semana2`, `readaptacao.semana3` |
| 17 | Carga inicial da semana 1: ~60% do que se fazia no auge | Ajustar | A regra proposta usa 10–20% abaixo da última carga registrada. As duas referências diferem (auge contra último registro); o app só conhece o que foi registrado. Decidir qual vale e marcar como consenso | `readaptacao.semana1` |
| 18 | "Se ficou fácil demais, suba na sessão seguinte, não na mesma" | Confirma | Coerente com a progressão entre sessões | `progressao.carga-leve` |
| 19 | "A primeira sessão protege as seguintes (efeito da sessão repetida, evidência robusta)" | Ajustar | O fenômeno é bem estabelecido, mas a proteção de sessões leves dura ~2 semanas e não 3, dado de um único grupo (moderada). Sugere-se "evidência moderada" e manter a regra de repetir a semana 1 se a dor persistir | `readaptacao.gatilho`, `readaptacao.semana1` |
| 20 | "Memória muscular: a massa perdida volta mais rápido (evidência moderada); as cargas sobem rápido nas primeiras 4–6 semanas" | Muda | A evidência em humanos é mista: um estudo não achou aumento de mionúcleos, outro achou mionúcleos mantidos sem diferença final de espessura, e a recuperação rápida vem de um estudo em cada caso. Texto proposto: "força e tamanho costumam voltar mais rápido do que na primeira vez (um estudo em cada caso; mecanismos com evidência mista)". As 4–6 semanas são consenso | `readaptacao.semana3` |
| 21 | Aquecimento de 6–8 min: geral opcional, ombro com elástico nos dias de torso, séries de aproximação no 1º exercício de cada grupo | Confirma | Coerente com aquecimento específico de 1–2 séries leves por exercício principal; o aquecimento de ombro é consenso | `tempo.aquecimento` |
| 22 | Só contam como efetivas as séries de trabalho no RIR indicado | Confirma | Aquecimento não conta. Falta definir o limiar numérico | `rir.serie-efetiva` |
| 23 | Calibração do RIR: falha na última série de um isolador, 1x por semana a partir da semana 3 | Confirma | Coincide | `rir.calibracao`, `rir.leitura` |
| 24 | Dupla progressão: topo da faixa em todas as séries, no RIR certo e com amplitude completa → sobe na sessão seguinte | Ajustar | A regra proposta pede 2 sessões seguidas no topo antes de subir, para evitar subir por um dia bom isolado (consenso, fonte primária da NSCA não verificada) | `progressao.subir`, `progressao.manter` |
| 25 | Halteres fixos sobem de 1 em 1 kg; montáveis em ~2 kg por halter, com queda normal ao fundo da faixa | Confirma | Menor incremento disponível no inventário | `progressao.incremento.halteres` |
| 26 | Salto grande: se a 1ª série não chegar ao mínimo, voltar, fazer até 2 repetições acima do topo ou descida de 3 s e tentar de novo | Ajustar | Manter a regra e acrescentar o critério preventivo: com salto relativo acima de ~10%, exigir 1–2 repetições extras antes de subir | `progressao.salto-grande` |
| 27 | Polia: anotar o número da placa e subir 1 placa por vez | Confirma | Coincide | `progressao.incremento.polia` |
| 28 | Peso do corpo: repetições, depois descida lenta, pausa ou pés elevados; na barra fixa, por último, carga entre os pés | Confirma | Coincide | `progressao.incremento.peso-corporal` |
| 29 | Carga leve demais: 2 ou mais repetições acima do topo na 1ª série → 2 incrementos | Confirma | Coincide; é consenso sem fonte primária, e o rótulo deve dizer isso | `progressao.carga-leve` |
| 30 | Técnica primeiro: repetições com amplitude encurtada ou embalo não contam | Confirma | Coincide | `progressao.criterios-invalidos` |
| 31 | Estagnação: 3 sessões sem ganho → "me avisa" | Ajustar | No app, a resposta é a escada fixa: faixa mais larga, −10% e reconstruir, semana leve se ≥ 2 exercícios estagnarem, troca por variação equivalente | `progressao.estagnacao` |
| 32 | Deload quando precisar (repetições caindo em vários exercícios por 2 sessões, ou cansaço, dor articular e sono ruim juntos): 1 semana com metade das séries, mesmas cargas, RIR 3–4, a cada 6–10 semanas (consenso) | Ajustar | Conteúdo coincide. No app é sugestão manual e opcional; o gatilho por tempo proposto é 6–8 semanas sem pausa, e a carga pode ficar igual ou cair 10% | `deload.semana-leve` |
| 33 | Supinos com pegada levemente neutra e cotovelos a ~45° do tronco | Confirma | Dentro de 30–60°; o texto não deve sugerir que 45° previne lesão | `tecnica.supino-halteres.cotovelos` |
| 34 | Tríceps francês: "~40% mais crescimento que o tríceps na polia num estudo de 2023 (evidência moderada, um estudo)" | Muda | O rótulo se contradiz. O selo é "um estudo", em não treinados e com desenho intra-sujeito; os números do resumo são cabeça longa +28,5% contra +19,6% | `selecao.triceps-acima-cabeca` |
| 35 | Lista de fontes do programa | Ajustar | Usar as chaves de `fontes.md`; a fonte de Pelland et al. passa a ser o registro do PubMed (41343037) e não o resumo do sponet | `volume.semanal.dose-resposta` |

### Itens fora do escopo desta pesquisa

Estes itens do programa não foram avaliados e ficam como estão até uma pesquisa própria: o cardio opcional e a afirmação de que cardio moderado "praticamente não atrapalha" a hipertrofia (as fontes do programa sobre cardio não foram auditadas; cardio prescrito está fora do MVP), as recomendações de sono, o intervalo de 48 h entre os dois dias de torso, a ordem quando se perde um dia, e os itens que dependem da revisão de dieta. Também não foram avaliados o desenvolvimento com banco a 75–80°, o crucifixo na polia e os exercícios de abdômen.

## 2. Exercícios do programa

Nenhum exercício precisa ser trocado. As mudanças são de texto e de rótulo.

| Dia | Exercício | Decisão | Motivo | Regras |
|---|---|---|---|---|
| Torso A | Supino inclinado com halteres (banco a ~30°) | Manter | Ângulo coincide; inclinado como complemento do peitoral | `tecnica.supino-inclinado.angulo`, `selecao.peitoral-inclinado` |
| Torso A | Barra fixa ("pegada neutra ou aberta") | Ajustar texto | Padrão passa a ser **pronada a ~1–1,5× a largura dos ombros**, com **neutra e supinada como alternativas equivalentes** para o latíssimo; evitar a pegada muito aberta, que reduz a carga. O texto do programa precisa ser atualizado | `tecnica.barra-fixa.pegada` |
| Torso A | Remada baixa com triângulo ("polia no ponto mais baixo, sentado no banco") | Ajustar texto | O texto deve dizer **polia na altura do umbigo da pessoa sentada, ou 1–2 furos abaixo**, cabo horizontal ou levemente ascendente, mãos ao abdômen, cotovelos rentes. **A animação do guia já está correta**; só o texto do programa muda | `tecnica.remada-baixa.polia` |
| Torso A | Crucifixo na polia (crossover) | Manter | Foco no alongamento é coerente com o desempate por comprimento longo | `selecao.comprimento-longo` |
| Torso A | Elevação lateral unilateral na polia | Manter | Isolador para deltoide lateral | `selecao.multi-mono` |
| Torso A | Face pull com corda | Manter | Deltoide posterior; par de bi-set adequado | `tempo.superserie` |
| Torso A | Abdominal na polia com corda | Manter | Fora do escopo da pesquisa | — |
| Membros A | Agachamento goblet com calcanhar elevado | Manter | Se o halter ficar leve (mais de ~30 repetições), aplicar a escada; o búlgaro já cobre o padrão unilateral | `equipamento.escada-carga-leve`, `reps.teto.carga-limitada` |
| Membros A | Stiff com halteres | Manter | Extensão de quadril como complemento dos isquiotibiais | `selecao.complementos` |
| Membros A | Afundo estático com halteres | Manter | Unilateral aumenta a carga relativa com halter leve | `selecao.equivalencia-equipamento` |
| Membros A | Panturrilha unilateral no step, pausa de 2 s embaixo | Manter | Ênfase no alongamento | `selecao.panturrilha-alongada` |
| Membros A | Rosca direta na polia | Manter | Isolador de braço | `selecao.multi-mono` |
| Membros A | Tríceps na polia com corda | Manter | Complementado pelo tríceps francês no Membros B | `selecao.complementos` |
| Torso B | Supino reto com halteres (cotovelos a ~45°) | Manter | Cotovelos dentro de 30–60° | `tecnica.supino-halteres.cotovelos` |
| Torso B | Remada com halteres, peito apoiado no banco inclinado | Manter | Estável, apoio do peito reduz a demanda lombar | `selecao.estabilidade` |
| Torso B | Desenvolvimento sentado com halteres | Manter | Não avaliado especificamente | — |
| Torso B | Puxada unilateral ajoelhado na polia alta | Manter | Puxada vertical presente; alongar bem em cima é coerente com amplitude completa | `selecao.amplitude` |
| Torso B | Flexão de braço | Manter | Válida perto da falha; passou de 20 repetições, variação mais difícil | `equipamento.flexao-por-supino` |
| Torso B | Elevação lateral com halteres | Manter | Isolador para deltoide lateral | `selecao.multi-mono` |
| Torso B | Elevação de joelhos na barra fixa | Manter | Fora do escopo da pesquisa | — |
| Membros B | Agachamento búlgaro com apoio | Manter | Um estudo mostra hipertrofia do quadríceps com o búlgaro sozinho | `selecao.equivalencia-equipamento` |
| Membros B | Flexão de joelho na bola suíça | Manter | Sem cadeira flexora no inventário. Se houver máquina em outro cenário, preferir a flexora sentada | `selecao.flexora-sentada` |
| Membros B | Panturrilha em pé no step | Manter | Em pé e com pausa no alongamento | `selecao.panturrilha-alongada` |
| Membros B | Rosca inclinada com halteres | Manter | Braço atrás do tronco carrega o bíceps alongado (desempate) | `selecao.comprimento-longo` |
| Membros B | Tríceps francês na polia com corda | Manter, ajustar rótulo | Exercício acima da cabeça coincide com a regra; corrigir o rótulo de evidência (ver regra 34) | `selecao.triceps-acima-cabeca` |
| Membros B | Elevação lateral unilateral na polia | Manter | Isolador para deltoide lateral | `selecao.multi-mono` |

## 3. Mudanças de rótulo de evidência

| Afirmação no programa | Rótulo atual | Rótulo proposto |
|---|---|---|
| Cargas leves e pesadas, perto da falha, dão hipertrofia parecida | robusta | robusta (manter) |
| Divisão compostos 6–10 / 8–12 e isoladores 10–20 | (incluída em "robusta") | consenso |
| Ganho cada vez menor acima de ~20 séries | robusta | moderada |
| Efeito da sessão repetida protege as sessões seguintes | robusta | moderada (duração da proteção vem de um único grupo) |
| Memória muscular: a massa volta mais rápido | moderada | um estudo em cada caso; mecanismos com evidência mista |
| Tríceps acima da cabeça cresce mais | "moderada, um estudo" | um estudo (em não treinados) |
| Deload a cada 6–10 semanas | consenso | consenso (manter) |

## 4. Próximo passo

O usuário revisa este anexo junto com `regras.md`. O que for aprovado entra numa mudança separada de `referencia/programa-fase-1.md`. As correções de texto da remada baixa e da barra fixa seguem o rito do `docs/PLANO-MVP.md`: mudança separada e revisada. A animação da remada baixa já está correta; se a animação da barra fixa precisar mudar, ela ganha nova linha de base da regressão visual.
