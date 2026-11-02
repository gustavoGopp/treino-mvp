# Auditoria do treino (02/11/2026)

> Revisão independente da base de exercícios e do programa que o gerador monta. Tudo foi medido com dados fictícios e pode ser refeito com `npm run auditoria`, que gera os mesmos números a cada rodada. Os números completos estão em `docs/revisoes/auditoria/`:
> - `estresse.md`: 149.760 programas (13 cenários × 3 níveis × 12 divisões de 2 a 6 dias × 8 durações de 20 a 150 min × 5 prioridades × 8 situações de dor);
> - `progressao.md`: o "praticante simulado", 16 semanas com os saltos reais de cada equipamento;
> - `inventario.md`: os 102 exercícios, com a frequência de cada um;
> - `cobertura.md`: quantos exercícios existem para cada músculo e cada vaga, em cada cenário.
>
> Os selos seguem `docs/pesquisa/00-metodo.md`. O que é opinião minha está marcado **[opinião]**. Nada mudou no app: cada item espera a decisão do Gustavo.

## Em uma frase
A base é **segura e honesta**: em quase 150 mil programas, nenhum exercício carrega uma região marcada com dor forte, nenhum dia passa do tempo sem aviso e todo músculo abaixo da meta tem um aviso com o motivo. Os pontos fracos estão em **quatro lugares**: a marcação das articulações (o cotovelo falta em quase todo empurrar e puxar), **um terço das prescrições sem guia nenhum**, uma **regra de progressão que entra em vaivém**, e **músculos prioritários abaixo da meta mesmo com tempo sobrando**.

## O que está bom (medido)
| O que | Resultado |
|---|---|
| Dor acima de 5 numa região | 0 exercício que carrega a região marcada, em 112.320 programas com dor |
| Dor de 3 a 5 | sempre com o lembrete; sempre troca por um equivalente do mesmo nível que poupa a região, quando ele existe |
| Tempo | 7% dos dias passam do tempo, e **todos** com aviso |
| Avisos de meta | todo músculo abaixo do limiar tem aviso, com o motivo verdadeiro |
| Dias | nenhum dia vazio, nenhum dia só com abdominal, nenhum programa bloqueado sem motivo |
| Alternativas | todo exercício possível aparece como vaga ou como alternativa, em todos os 13 cenários |
| Determinismo | duas rodadas completas geram arquivos idênticos |
| Textos | os músculos dos 32 guias e dos 29 cartões batem com a biblioteca; ângulo do banco, pegada, cotovelos e altura da polia batem com as regras `tecnica.*` |

## Os achados, por prioridade
Prioridade = gravidade × frequência. Gravidade **alta**: segurança ou o app ensina ou prescreve algo errado; **média**: o treino fica pior do que poderia, sem risco; **baixa**: texto ou detalhe.

| # | Achado | Gravidade | Frequência | Esforço |
|---|---|---|---|---|
| 1 | Articulações incompletas: com dor forte no cotovelo, remadas, puxadas e flexão continuam | alta | 19 exercícios; 128 mil ocorrências | pequeno |
| 2 | 42 exercícios sem guia nenhum: 33% das prescrições | alta | 1 em cada 3 exercícios prescritos | grande (41 sem ficha) |
| 3 | "Carga leve" sobe 2 degraus sem a trava de salto grande: vaivém sem fim | alta | 6 de 15 casos simulados | pequeno |
| 4 | Treinos de 20–30 min: os isoladores obrigatórios tiram costas ou posteriores da semana | média | 48% dos programas de 20 min; 10% dos de 30 | pequeno |
| 5 | Prioridade abaixo da meta com tempo sobrando | média | ombro lateral prioritário abaixo em ~44% dos casos sem dor; panturrilha em 40–75% | médio a grande |
| 6 | Lacunas de equipamento comum (só halteres, halteres + banco reto, casa) | média | 4 dos 8 cenários comuns | médio |
| 7 | Carga que não existe: barra em 2,5 kg, panturrilha sem halter em kg | média | barra: todo programa com barra; panturrilha: quem não tem halteres | pequeno |
| 8 | Peso do corpo e elástico: a escada é genérica e trava nas faixas largas | média | flexão, elásticos e peso do corpo | médio |
| 9 | Regra `rir.carga-baixa` aprovada e não aplicada | baixa | iniciante, multiarticular de 15+ repetições | pequeno |
| 10 | 2º local: o aviso diz "nenhum exercício substitui" quando o único já está no dia | baixa | casos raros | pequeno |
| 11 | "Estagnado" sensível demais com progresso lento | baixa (a confirmar no R3) | modelo | — |
| 12 | Monotonia e glúteo indireto acima do máximo | baixa | 18,5% / 2,5% | — |

---

### 1. Articulações incompletas: com dor forte no cotovelo, o tronco quase todo continua
**Problema.** O campo `articulacoes` decide o que sai com dor acima de 5. A barra fixa e a rosca marcam o cotovelo, mas **19 exercícios de empurrar e puxar não marcam**: flexão (inclusive com elástico), todas as remadas, todas as puxadas na polia, o desenvolvimento unilateral, com barra e com elástico. O pull-through não marca a lombar, embora o stiff e o terra romeno marquem. Resultado: com cotovelo 7, a rosca e o tríceps saem, e a remada, a puxada e a flexão ficam, sem lembrete nenhum.

**Exemplos** (`estresse.md`, `seguranca.articulacao-incompleta.*`):
- casa · iniciante · Corpo todo A/B · 20 min · cotovelo 7: flexão nos 2 dias, remada com elástico no B.
- condomínio · iniciante · Corpo todo A/B · 20 min · cotovelo 7: flexão e remada apoiada com 4 séries.
- academia · iniciante · Corpo todo A/B · 20 min · joelho 7 + lombar 7: pull-through com 4 séries.

**Evidência.** consenso (anatomia: puxar dobra o cotovelo contra a carga com o bíceps e o braquial; empurrar o estende com o tríceps). É a mesma lógica que a biblioteca já usa na barra fixa e na rosca. Regra afetada: `seguranca.dor.programa`.

**Proposta.** Marcar o cotovelo nos 18 e a lombar no pull-through (lista em `inventario.md`, coluna "falta marcar"), com um teste que confere a marcação por padrão de movimento. Com cotovelo acima de 5, o tronco perde quase tudo, como já acontece com o ombro, e entra o preenchimento da regra `selecao.dia-sem-principal`. Os snapshots das personas não mudam (nenhuma tem dor no cotovelo).

**Esforço.** Pequeno (dados + 1 teste).

### 2. Um terço das prescrições sem guia nenhum
**Problema.** 31 exercícios têm animação, 29 têm cartão de texto e **42 não têm nada**: na tela aparece só "animação em breve" com os músculos. Eles somam **33% das 3,07 milhões de prescrições** do teste. A **ponte de glúteo é o exercício mais prescrito de todos** (177 mil vezes), à frente da panturrilha e do abdominal. Depois vêm o crucifixo com halteres, o crucifixo inverso, a **cadeira extensora** (vaga obrigatória), a **flexora sentada** e os exercícios com elástico. O backlog já cita "~40 sem cartão", mas não a frequência.

**Exemplos.** Ana (halteres e banco): a ponte entra toda semana. Academia completa: a extensora e a flexora entram 2 vezes por semana. Casa com elásticos: remada, puxada, rosca e flexão de joelho, todas sem guia.

**Evidência.** É regra do projeto (`CLAUDE.md`, qualidade do guia): sem animação aprovada, cartão de texto a partir de uma ficha com fonte. 41 dos 42 também **não têm ficha de técnica** (`docs/pesquisa/animacoes/`); só o agachamento livre tem.

**Proposta.** Fichas e cartões em lotes, pela frequência medida: 1) ponte, crucifixo com halteres, crucifixo inverso, extensora, flexora sentada; 2) os 5 com elástico mais usados; 3) o resto. E usar a mesma frequência para a fila das animações do R5 (a ponte é a 1ª).

**Esforço.** Grande: cada ficha pede pesquisa com fonte (~1 lote de 5 por sessão **[opinião]**).

### 3. "Carga leve" sobe 2 degraus sem a trava de salto grande, e o app entra em vaivém
**Problema.** Quando a 1ª série passa do topo por 2 repetições ou mais, a regra `progressao.carga-leve` sobe **2 degraus de uma vez**, sem a checagem de salto acima de ~10% que a subida normal tem. Se ficar pesado, a regra `progressao.salto-grande` manda voltar; na sessão seguinte a carga leve dispara de novo, e assim por diante.

**Exemplos** (`progressao.md`, rastro sessão a sessão):
- halteres de 2 em 2 kg: 18 kg × 12 → sobe para 22 kg (+22%) → 4 repetições → volta para 18 → sobe para 22… (5 voltas em 16 semanas);
- cadeira extensora: placa 8 → placa 10 → 7 repetições → volta → placa 10… (6 voltas);
- só 2 pares de halteres (5 e 10 kg): sobe e volta em **todas** as 32 sessões.

Também no kettlebell (8, 12, 16 kg), na elevação lateral na polia e no graviton. O corpo é um modelo; o ciclo é da regra: depois de "voltar", nada impede a carga leve de disparar de novo.

**Evidência.** consenso (`progressao.carga-leve`, `progressao.salto-grande`; `consenso-projeto`).

**Proposta.** Na carga leve, subir 2 degraus só se o salto total ficar em ~10% ou menos; senão, 1 degrau, com a mesma trava da subida normal. E não repetir a subida logo depois de um "voltar": pedir 1–2 repetições acima do topo antes. Teste com os três casos acima.

**Esforço.** Pequeno.

### 4. Treinos de 20–30 minutos: os obrigatórios tiram os grandes
**Problema.** Com 20 min cabem 3 exercícios. Os isoladores obrigatórios (tríceps acima da cabeça, panturrilha em pé, extensora; regra `selecao.isolador-obrigatorio`) entram **antes** de tudo, e ocupam 2 dos 3 lugares do dia. Em **48% dos programas de 20 min** (10% dos de 30 min; 0% a partir de 45), com equipamento que permitiria, um músculo grande fica com **0 série na semana**: costas ou posteriores.

**Exemplos** (`estresse.md`, `volume.zero.costas` e `volume.zero.posteriores`):
- casa · iniciante · Corpo todo A/B/C · 20 min · prioridade pernas: goblet, flexão e tríceps; stiff, flexão e panturrilha; afundo, flexão e panturrilha. **Nenhum puxar na semana.**
- condomínio · iniciante · Corpo todo A/B/C · 20 min: a mesma coisa, com supino no lugar da flexão.
- casa · iniciante · Corpo todo A/B · 20 min · sem prioridade: goblet, tríceps e panturrilha no A; **0 série de posteriores** na semana.

**Evidência.** `selecao.multi-mono` (um estudo): base em multiarticulares, isoladores saem primeiro quando falta tempo. A regra dos obrigatórios (moderada) diz que eles não saem nos cortes, mas não que entram antes dos grandes.

**Proposta.** Com 4 exercícios ou menos por dia, os obrigatórios só entram depois dos multiarticulares do modelo do dia. Os programas com 45 min ou mais não mudam (as 4 personas usam 45 a 75 min).

**Esforço.** Pequeno.

### 5. Músculo prioritário abaixo da meta, com tempo sobrando
**Problema.** Sem dor e com 45 min ou mais, o músculo que a pessoa marcou como prioridade fica abaixo da meta com frequência: ombro lateral em ~44% dos casos, abdômen em ~59%, panturrilha em 40% (academia) a 75% (casa), tríceps em 20–70%, quadríceps em ~60% sem extensora. Ao mesmo tempo, **o dia mais longo para em ~54 min** (mediana) com 75, 90, 120 ou 150 min escolhidos. O aviso aparece e diz o motivo ("a divisão treina este músculo 2x por semana e, com até 4 séries por exercício e 10 por sessão, não cabe mais"), mas o motivo é o modelo do dia ter **uma vaga por função**.

**Exemplos** (intermediário, sem dor, 90 min):
- prédio do Bruno (polia dupla) · Superior/Inferior 2x · prioridade pernas e glúteos: dias de 43 a 54 min; quadríceps 8 de 12 e panturrilha 8 de 12.
- casa · Superior/Inferior 2x · prioridade pernas e glúteos: dias de 37 a 53 min; quadríceps 8 de 12 e panturrilha 8 de 12.
- condomínio · Superior/Inferior 2x · prioridade braços e ombros: Inferior A com **35 min** de 90; tríceps 8 de 12.

Na academia completa a meta fecha mais vezes (a extensora e a panturrilha sentada dão a 2ª vaga), mas o ombro lateral prioritário ainda fica abaixo em ~44% dos casos.

**Evidência.** robusta para "mais séries semanais, mais hipertrofia" (`volume.semanal.dose-resposta`); moderada para dividir em 2 exercícios acima de 4 séries (`volume.series-por-exercicio`); a regra `selecao.exercicios-por-musculo` já diz "2 se forem prioridade" (consenso).

**Proposta.** Quando o músculo é prioridade, está abaixo da meta e o dia tem tempo, o gerador abre uma 2ª vaga dele (outra função do mesmo músculo ou o 2º exercício do mesmo nível), sem passar do teto por sessão. Muda os snapshots da Carla e do Bruno (precisa da sua revisão do antes e depois).

**Esforço.** Médio a grande. **[opinião]** Bom candidato ao R5, depois do uso real.

### 6. Lacunas de equipamento comum
**Problema** (`cobertura.md`):
- **só halteres, sem banco:** 0 exercício de costas e 0 de ombro posterior. A remada com halter pede banco, e a remada curvada (sem banco) não existe na biblioteca;
- **halteres + banco reto** (a Ana): 1 remada só e 0 ombro posterior; costas abaixo da meta em 57% dos programas;
- **casa e condomínio:** glúteo só com a ponte, sem carga (e sem guia, item 2); nenhum complemento de tríceps; nenhuma extensora nem abdução sem as máquinas;
- **só peso do corpo:** 0 costas, 0 posteriores, 0 braços.

**Evidência.** robusta para "o equipamento não decide o crescimento" (`haugen2023`, `selecao.equivalencia-equipamento`): o mesmo movimento com halter vale o mesmo. Para cada exercício novo, consenso de treinadores.

**Proposta.** 4 exercícios que só pedem halteres, cada um com ficha e cartão: **remada curvada com halteres**, **crucifixo invertido curvado**, **ponte de glúteo com halter** (dá carga à ponte) e **supino no chão com halteres**. Muda o snapshot da Ana (ganha ombro posterior). Ficam para depois **[opinião]**: o nórdico (`morin2025`, um estudo, mas exige técnica e ancoragem) e opções sem máquina para o reto femoral (não achei estudo de hipertrofia que eu tenha lido).

**Esforço.** Médio (dados + 4 fichas + 4 cartões).

### 7. O app sugere carga que a pessoa não tem
**Problema.**
- **Barra:** a carga sobe sempre de 2,5 kg, ignorando a menor anilha que a pessoa informou (`equipamento.menor-anilha`). Com anilhas de 2 kg, a barra de 20 kg vai de 4 em 4 kg; o app sugere 62,5 e 67,5 kg.
- **Panturrilha no chão e no step** (3 exercícios): a carga é "halter", mas o exercício não pede halter. Para quem não tem halteres, o registro é em kg, começa em "0 kg" e a sugestão sobe para 5 e 10 kg.
- A rosca Scott com halteres e o hip thrust no smith registram como barra.

**Exemplos** (`progressao.md`): agachamento com anilhas de 2 kg; o mesmo com anilhas de 5 kg; panturrilha no chão para quem só tem elásticos (0 → 5 → 10 kg).

**Evidência.** consenso (`progressao.incremento.*`, `equipamento.menor-anilha`).

**Proposta.** Barra: passo de 2 × a menor anilha. Panturrilha sem halter: registro em degraus, como o peso do corpo. Scott e hip thrust: o tipo de carga pela versão possível.

**Esforço.** Pequeno.

### 8. Peso do corpo e elástico: a escada é genérica e trava
**Problema.** A progressão sem kg usa a mesma escada de 4 degraus para tudo ("mais repetições → descida de 3 s → variação mais difícil → carga externa"). Ela não usa a escada própria da flexão que já está aprovada (`equipamento.flexao-por-supino`: inclinada → chão → declinada → com elástico → déficit) nem o número de intensidades de elástico que a pessoa informou. E só passa de degrau com todas as séries no topo de faixas largas (8–20, 12–25, 15–30): no modelo, a flexão e a remada com elástico ficaram **16 semanas sem subir**.

**Evidência.** um estudo (`kikuchi2017`, `calatayud2015`: flexão ≈ supino com carga equivalente) para a escada da flexão; consenso para as outras.

**Proposta.** Escada por exercício (a da flexão primeiro), e os elásticos pela intensidade (1 a N). **[opinião]** Rever as faixas largas junto.

**Esforço.** Médio.

### 9. A regra `rir.carga-baixa` está aprovada e não é aplicada
**Problema.** A regra diz: séries de 15 repetições ou mais pedem reserva de 0 a 2. O gerador dá reserva de 2 a 3 a todo multiarticular do iniciante, inclusive agachamento sem carga (15–30), flexão (8–20) e elásticos (até 25). Também não aparecem no código as regras `rir.calibracao` (calibrar a reserva) e `equipamento.flexao-por-supino` (item 8).

**Evidência.** um estudo (`lasevicius2022`, `robinson2024`).

**Proposta.** Escolher: aplicar a regra (reserva 1–2 nesses exercícios para o iniciante) ou registrar em `regras.md` que, na fase do iniciante, vale 2–3 por segurança. **[opinião]** Aplicar a partir da 3ª semana.

**Esforço.** Pequeno.

### 10. 2º local: o motivo da vaga fora não é o verdadeiro
**Problema.** No treino do dia em outro local, quando o único equivalente possível já foi usado no mesmo dia, o aviso diz "nenhum exercício possível substitui".
**Exemplo.** Academia → halteres e banco reto, Superior A: a remada com halter entra no lugar da puxada; a vaga da remada apoiada recebe a rosca alternada (outro músculo); e a rosca inclinada fica de fora com "nenhum exercício possível substitui", embora a rosca alternada substitua e só já esteja no dia.
**Proposta.** "O único equivalente possível aqui já está no treino de hoje." **Esforço.** Pequeno.

### 11. "Estagnado" pode aparecer cedo demais (a confirmar no R3)
No modelo, com +1% de força por semana (progresso lento e normal para intermediário **[modelo]**), metade das sugestões vira "estagnado" (3 sessões sem mais repetições), e 2 exercícios estagnados sugerem a semana leve. Como depende do modelo, a proposta é **medir no export do R3** antes de mexer.

### 12. Detalhes sem ação proposta
- **Monotonia:** 18,5% dos programas de 3 dias ou mais têm um exercício em todos os dias, quase sempre por falta de opção (casa); 21,7% repetem um exercício com outro equivalente parado, porque a "carga possível" vem antes da variedade no desempate (decisão do R0b).
- **Glúteo sem prioridade acima do máximo do nível** (11–12 de 10 no iniciante), pelas séries indiretas de agachamento, afundo e stiff contadas pela metade. A contagem é uma aproximação (`volume.serie-indireta.peso`, moderada).
- **1 dia por semana:** o app aceita de 2 a 6 (`divisao.seis-dias`, consenso). Fica como está.

## O que sobra
Na academia completa, 19 exercícios possíveis nunca são a 1ª escolha (supino na polia, barra fixa, remada com barra, remada invertida, goblet, agachamento com halteres, afundo para trás, ponte, abdominal no chão, terra com barra hexagonal, mergulho, os dois do graviton, remada na estação e hiperextensão), mas **todos aparecem como alternativa**, e servem a outros cenários e à dor. Parecidos entre si: agachamento com halteres × goblet, afundo para trás × afundo, panturrilha bilateral × unilateral no step. **[opinião]** Nenhum precisa sair: custam pouco como dado. O que importa é **não gastar animação** com eles antes dos mais usados (item 2).

## Para a sessão de anatomia
Os músculos de cada exercício estão coerentes entre a biblioteca e os textos. Pontos para a anatomia conferir: o terra com barra hexagonal (hoje na função "agachar", com quadríceps e glúteo como principais), a hiperextensão (glúteo e posteriores; a lombar não aparece como músculo), o mergulho (peito e tríceps contados por inteiro), o desenvolvimento (só o ombro anterior como principal) e o face pull e o crucifixo inverso (costas como secundário). O rascunho do prompt fica em `docs/prompts/sessao-anatomia.md`.

## Depois das correções (02/11/2026)
As correções aprovadas entraram no branch `auditoria-treino`, cada uma com teste (`git log`). `npm run auditoria` foi rodado de novo; os arquivos em `docs/revisoes/auditoria/` já são os de depois.

| Medida | Antes | Depois |
|---|---|---|
| Exercício que fica com dor > 5 numa região que ele carrega e o dado não marcava (item 1) | 128.531 ocorrências | **0** |
| Prescrições de exercícios sem guia nenhum (item 2, lote 1; e os 4 novos já com cartão) | 33% | **18%** |
| Progressão: casos simulados em vaivém (item 3) | 6 de 15 | **2 de 15**, limitados a 1 tentativa a cada 6 sessões (os saltos de +100% e de +50% numa placa leve) |
| Programas de 20 min com costas ou posteriores zerados na semana (item 4) | 48% | **12%** (só a divisão de 2 dias; ver abaixo) |
| Programas de 30 min com músculo grande zerado | 10% | **0%** |
| Só halteres, sem banco: costas prioritárias abaixo da meta / ombro posterior abaixo de 4 séries (item 6) | 100% / 100% | **54,5% / 1,1%** |
| Halteres + banco reto: costas prioritárias abaixo / ombro posterior abaixo de 4 | 57,3% / 38,3% | **16,2% / 1,1%** |
| Carga sugerida que não existe: barra, panturrilha sem halter (item 7) | 4 de 15 casos | **0** |
| Exercícios na biblioteca / com cartão de texto | 102 / 29 | **106 / 38** |

**Efeitos colaterais, medidos:**
- A "repetição com um equivalente parado" subiu de 29.769 para 63.773 programas: com mais opções no mesmo nível (por exemplo, a remada curvada ao lado da remada com halter apoiada), mais vezes uma delas fica sem uso. É o desempate do R0b (estabilidade e carga antes da variedade); não muda o volume.
- Em casa, as costas prioritárias ficaram abaixo da meta em 16% dos programas (eram 12%), e o abdômen da Ana sai do dia B (de 4 para 0 séries, com aviso) para entrar o ombro posterior. Os dois estão nos snapshots aprovados.

**Achados novos, vistos durante as correções (para decidir):**
- **Cascata no 2º local.** Quando uma vaga não tem equivalente no local, o preenchimento "outro músculo do dia" pega o exercício que seria o equivalente da vaga seguinte, e assim por diante (no Superior B de uma academia completa feito só com halteres e banco reto: a puxada vira elevação lateral, a elevação vira rosca, a rosca vira tríceps). Proposta: primeiro trocar todas as vagas que têm equivalente, e só depois preencher as que não têm. Gravidade média, frequência baixa (só no treino em outro local). Esforço pequeno a médio.
- **20 min em 2 dias.** Com 3 exercícios por dia e 2 dias, os 5 músculos grandes não cabem: os posteriores ficam de fora (com aviso). É limite de espaço, não de regra; uma saída seria pôr o "dobrar o quadril" antes do "afundo" no modelo do dia B. **[opinião]** Deixar como está: quem treina 2 × 20 min recebe o aviso.

## Decisões do Gustavo
Decididas em 02/11/2026, item a item, sem nada pré-marcado.

| # | Achado | Decisão |
|---|---|---|
| 1 | Articulações (cotovelo e lombar) | **entra agora** |
| 2 | Fichas e cartões dos 42 sem guia | **entra agora: o 1º lote** (ponte, crucifixo com halteres, crucifixo inverso, extensora, flexora sentada); o resto vai para o backlog |
| 3 | Carga leve sem vaivém | **entra agora** |
| 4 | Obrigatórios depois dos grandes em 20–30 min | **entra agora** |
| 5 | 2ª vaga para o prioritário abaixo da meta | **backlog (R5)** |
| 6 | 4 exercícios novos só com halteres | **entra agora** |
| 7 | Carga que não existe (barra, panturrilha, Scott, hip thrust) | **entra agora** |
| 8 | Escada por exercício (peso do corpo e elástico) | **backlog (R5)** |
| 9 | `rir.carga-baixa` | **aplicar a partir da 3ª semana** |
| 10 | Texto do 2º local | **entra agora** |
| 11 | Estagnação medida no R3 | **medir no export do R3** |
