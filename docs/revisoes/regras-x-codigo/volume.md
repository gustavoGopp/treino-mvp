# Volume, frequência, divisão e objetivo: relatório do conferente

> Relatório de um conferente independente (22/11/2026), que recebeu a regra, a frase e o código, sem hipótese da sessão. É matéria-prima: cada divergência só vale depois de conferida pela sessão no código (coluna "situação" de `../regras-x-codigo.md`). As linhas citadas são as do dia da conferência.

# Conferência regra × código × frase: volume, frequência, divisão e objetivo (31 regras)

Lido no HEAD `29674511` (os arquivos citados não estavam entre os modificados na árvore de trabalho). Além da leitura, o gerador foi rodado numa cópia fora do repositório (`scratchpad/d1v/`, com dois campos de instrumentação a mais: o volume antes e depois dos cortes de tempo), nesta grade: 14 inventários das personas fictícias × 3 níveis × 2–6 dias × 30/45/60/90 min × 14 combinações de foco = 11.760 programas na divisão recomendada; 28.224 com cada divisão oferecida escolhida; 7.840 com objetivo "ficar mais forte" (intermediário e avançado). Nada do repositório foi alterado e `privado/` não foi lida.

Resumo: **bate 16 · o código diverge 10 · a frase diverge 2 · não está no app 3**.

| id | classificação | onde no código (arquivo:linha) | evidência |
|---|---|---|---|
| volume.semanal.dose-resposta | não está no app | (nenhum uso do id em `src/`; só o catálogo de `Entenda.tsx:66-104`) | Regra de referência. A frase é uma afirmação de evidência e não diz que o app faz algo: está clara. |
| volume.semanal.minimo | **o código diverge** | `src/domain/gerador/index.ts:1984` e `:1991` (também `:1522`) | Os números 6/10/12 batem (`regras/index.ts:24`), e nenhum foco *cruza* o mínimo no corte (0 casos). Mas o foco que já está abaixo do mínimo não trava o corte e perde mais séries: 1.814 de 10.920 programas com foco. |
| volume.semanal.alvo | bate | `src/domain/regras/index.ts:27`; `gerador/index.ts:139-145`, `:1365-1370` | Metas 10/12/14 para o foco, 6 para os outros, 4 para o abdômen; o texto do programa diz o mesmo que a frase. |
| volume.prioridade.competicao | bate | `src/domain/gerador/index.ts:1301-1312` | Um aviso por programa, com quais e quanto, e a nota das pernas; nenhum caso com 2+ grupos e foco abaixo da meta ficou sem o aviso. Ressalva 1 abaixo. |
| volume.prioridade.foco-primeiro | **a frase diverge** | `src/domain/gerador/index.ts:1122-1129`, `:1150-1157`, `:1175` | A frase diz "até 10, 16 ou 20" sem as duas condições que o código aplica: com 3 grupos ou mais o foco para na meta, e o foco passa do máximo do nível enquanto as séries diretas estão abaixo da meta. |
| volume.prioridade.segundo-exercicio | **o código diverge** | `src/domain/gerador/index.ts:1869`, `:914`, `:932` | A regra e a frase dizem "1 exercício a mais, de outra função"; o código dá até 2 por músculo e, no músculo com uma função só, repete a função. 153 de 11.760 programas com 2 a mais para o mesmo músculo. |
| volume.prioridade.ate-dois | bate | `src/domain/gerador/opcoes.ts:110-127`; `src/features/onboarding/Rotina.tsx:149-162` | "Escolha até 2", sem bloquear; pernas = 3, braços = 2; a nota aparece acima disso. |
| volume.semanal.maximo | **o código diverge** | `src/domain/gerador/index.ts:583`/`:1435-1436` e `:877` (só conferem 20); `avaliador/index.ts:393` (trata como "info") | O máximo do nível só é conferido no tempo que sobra. Na montagem e na distribuição vale só o teto de 20: 1.555 de 3.920 programas de iniciante têm músculo acima de 10 (até 20). |
| volume.semanal.teto-padrao | **a frase diverge** | `src/domain/gerador/index.ts:1435-1436`, `:877`, `:1175`; `regras/index.ts:37` | O teto de 20 vale para os três níveis (0 casos acima em ~40 mil programas). Não existe no app a opção de o avançado passar de 20, e a frase dá a entender que existe. |
| volume.semanal.minimo-eficaz | bate | `src/domain/regras/index.ts:39-40`; `gerador/index.ts:143`, `:1984`, `:2140` | Meta de 6, piso de 4 nos cortes e aviso abaixo de 4. Ressalva 2 abaixo. |
| volume.semanal.abdomen | bate | `src/domain/gerador/index.ts:143`, `:1123-1124` | Abdômen fora do foco: meta 4, e o tempo que sobra não o sobe. |
| volume.manutencao.piso | não está no app | (nenhum uso do id nem do conceito em `src/`) | A frase começa com "O modo manutenção ainda não está no app": está clara. |
| volume.sessao.teto | bate | `src/domain/gerador/index.ts:874`, `:927`, `:967`, `:1172`, `:1517` | 10 por músculo por treino, com as indiretas a meia série; 0 violações em ~40 mil programas. |
| volume.equilibrio-coxa | **o código diverge** | `src/domain/gerador/index.ts:1884-1888` (só protege cortes e séries a mais); `:868-899` (a distribuição não confere a razão) | Na divisão recomendada, 0 casos fora de 0,5–2 e sempre 1 exercício direto de posteriores. Com divisão escolhida, 95 de 28.224 programas saem com a razão abaixo de 0,5, sem aviso da coxa. |
| volume.serie-indireta.peso | bate | `src/domain/regras/index.ts:42`; `gerador/index.ts:1710` | 0,5 por série indireta em toda a contagem. |
| volume.series-por-exercicio | bate | `src/domain/regras/index.ts:43`; `gerador/index.ts:887`, `:1167`, `:2095` | 2 a 4 em todos os programas gerados (0 fora). Ressalva 3 abaixo. |
| frequencia.efeito-hipertrofia | não está no app | (nenhum uso do id em `src/`) | Regra de referência. A frase é uma afirmação de evidência e não promete nada do app. |
| frequencia.musculo | bate | `src/domain/gerador/index.ts:1352`, `:1695-1698`; `avaliador/index.ts:394-397` | O mínimo ceil(séries ÷ 10) sai do teto de 10 por treino; 0 violações, contando os dias com série direta ou indireta. Ressalva 4 abaixo. |
| divisao.equivalencia | bate | `src/domain/gerador/index.ts:1348-1351`; `Rotina.tsx:186-188` | Só texto, mostrado no porquê do programa e na escolha da divisão; diz o mesmo que a frase. |
| divisao.frequencia-minima | bate | `src/domain/regras/index.ts:41`; `gerador/index.ts:874` | Mesma conta da frequencia.musculo, pelo teto por treino. |
| divisao.recomendacao | bate | `src/domain/gerador/divisoes.ts:451-457`, `:489-501`, `:508-522`; `Rotina.tsx:50`, `:183-213` | As opções por número de dias são as da regra; a 1ª vem com "Por que é a recomendada"; nada vem marcado; sem escolha vale a 1ª. |
| divisao.seis-dias | bate | `src/features/onboarding/Rotina.tsx:13`; `src/storage/esquema.ts:49` | 2 a 6 dias, na tela e no dado guardado. |
| divisao.classica | bate | `src/domain/gerador/divisoes.ts:469`, `:483`, `:492`, `:499` | Só aparece com a maior meta ≤ 10, para 3 a 5 dias, com o aviso da falta; se o foco muda e a meta passa de 10, volta a recomendada. |
| divisao.sem-puxar | **o código diverge** | `src/domain/gerador/divisoes.ts:498`; `src/features/onboarding/Rotina.tsx:57`, `:195`; `gerador/index.ts:826` | O gerador cumpre a regra, mas a tela de escolha continua marcando "Recomendada" a divisão de sempre, e o aviso manda "escolher Corpo todo na rotina", que com 6 dias não é oferecido. |
| objetivo.pergunta | bate | `src/features/onboarding/Rotina.tsx:19-24`, `:165-180`; `src/storage/esquema.ts:285` | Quatro opções, nada marcado, sem resposta vale ganhar músculo; só "forca" muda números. Ressalva 5 abaixo. |
| objetivo.cutting.mesmo-programa | bate | `src/domain/gerador/index.ts:1035` (só "forca" entra na prescrição), `:1627-1632` | 588 comparações: o programa de "cutting" saiu idêntico ao de ganhar músculo (dias e fases). |
| objetivo.cutting.texto | **o código diverge** (leve) | `src/domain/gerador/index.ts:1635` | A regra e a frase dizem "o músculo tende a crescer pouco"; o texto do app diz "é normal o músculo parar de crescer". |
| objetivo.forca.faixa-compostos | **o código diverge** | `src/domain/gerador/index.ts:1235` (também `:2051-2059`); `src/domain/locais/index.ts:98`; `src/domain/sessao/index.ts:100` | A faixa 5–8 é aplicada antes dos cortes de tempo; a troca "dois lados no lugar de um lado só" prescreve o exercício de novo sem ela. 685 de 7.840 programas têm um dia com menos de 2 exercícios ajustados. |
| objetivo.forca.descanso | **o código diverge** | `src/domain/gerador/index.ts:1235` | Mesma causa: o exercício trocado volta a 1 min 45 s. O valor (150 s) e o iniciante (105 s, dentro de 90–120) batem. |
| objetivo.forca.seguranca | **o código diverge** (leve) | `src/domain/gerador/index.ts:1037` | A lista de peso livre do código inclui `anilha` (leg press, hack, Smith), que a regra e a frase não citam. O erro é para o lado mais cauteloso. |
| objetivo.saude.texto | **o código diverge** (leve) | `src/domain/gerador/index.ts:1652` | O texto do app traz os 150–300 min de aeróbio moderado, mas não o "(ou 75–150 vigoroso)" que a regra e a frase põem nele. |

## Divergências

### 1. volume.semanal.minimo — o código diverge
- **Regra:** "nos cortes de tempo, um músculo em foco não desce abaixo dele" (6 / 10 / 12).
- **Frase:** "Quando o treino não cabe no tempo, um músculo em foco não desce abaixo disso."
- **Código:** `gerador/index.ts:1991`: `const ok = (m, delta) => (v[m] ?? 0) < piso(m) || (v[m] ?? 0) - delta >= piso(m);`. O comentário em `:1987-1988` assume: "Músculo que já estava abaixo do piso antes (limite estrutural) não trava o corte". Quem já está abaixo do mínimo pode perder séries até 2 por exercício.
- **Exemplo:** inventário do Bruno, iniciante, 2 dias de 30 min, foco em braços. Antes do corte: bíceps 3 e tríceps 3 (mínimo 6). Depois do corte: bíceps 2 e tríceps 2,5.
- **Medida:** 1.814 de 10.920 programas com foco (328 de iniciante, 709 de intermediário, 777 de avançado). Nenhum caso de foco que estava no mínimo ou acima e cruzou para baixo.
- **Conserto em uma linha:** ou a regra e a frase dizem "não cruza o mínimo; o que já está abaixo pode perder séries por último", ou o corte passa a poupar o foco que já está abaixo.

### 2. volume.prioridade.foco-primeiro — a frase diverge
- **Regra:** "vai primeiro para os músculos do foco, até o máximo do nível e enquanto as séries diretas do foco [...] estiverem abaixo da meta". A regra não cita o limite dos 3 grupos; ele está em `tempo.sobra-series` ("com 3 grupos ou mais, o foco fica na meta e só os outros sobem").
- **Frase:** "o tempo que sobra vira séries primeiro nos músculos dele, até 10 por semana (iniciante), 16 (intermediário) ou 20 (avançado)."
- **Código:**
  - `gerador/index.ts:1157`: com mais de 2 grupos de foco, no 2º passo, o foco que chegou à meta não sobe (`perfil.prioridades.length > VOLUME.focosComSobra`).
  - `:1150-1154` e `:1175`: no 1º passo o limite do foco é 20, não o máximo do nível, e ele continua subindo enquanto as séries diretas estão abaixo da meta.
- **Exemplo A (3 grupos):** inventário da Carla, intermediário, 4 dias de 90 min. Foco em peito, costas e ombros: peito 12 e costas 12, e o texto do programa diz "sem passar o foco da meta de ~12". Foco em peito e costas: os dois chegam a 16.
- **Exemplo B (acima do máximo):** inventário da Ana, intermediário, 4 dias de 90 min, foco em glúteos: glúteos 20 (a frase diz até 16).
- **Conserto em uma linha:** acrescentar à frase "com 1 ou 2 grupos de foco" e "o foco pode passar disso enquanto as séries diretas não chegam à meta".

### 3. volume.prioridade.segundo-exercicio — o código diverge
- **Regra:** "ganha 1 exercício de outra função do mesmo músculo"; valores: "1 exercício a mais por músculo do foco abaixo da meta".
- **Frase:** "ganha 1 exercício a mais, de outra função do mesmo músculo (que o trabalha de outro jeito)".
- **Código:** `gerador/index.ts:1869`: `const SEGUNDOS_POR_MUSCULO = 2;`, usado no laço de `:914`. Em `:932`, `.filter((x) => !x.repete || funcoes.length === 1)` deixa repetir a função quando o músculo só tem uma.
- **Exemplo:** inventário do Bruno, avançado, 2 dias de 90 min, foco em ombros. A elevação lateral na polia entra a mais nos dois dias, na mesma função da elevação com halteres que já estava lá, e o porquê na tela diz "para trabalhar o músculo de outro jeito". Outro: intermediário, 2 dias de 90 min, foco em braços: o tríceps ganha 2 exercícios a mais.
- **Medida:** 153 de 11.760 programas com 2 exercícios a mais para o mesmo músculo.
- **Conserto em uma linha:** ou a regra e a frase passam a dizer "até 2, e da mesma função quando o músculo só tem uma", ou a constante volta a 1.

### 4. volume.semanal.maximo — o código diverge
- **Regra:** "Máximo semanal padrão do nível": 10 / 16 / 20.
- **Frase:** "O máximo padrão de séries por semana em cada músculo é 10 (iniciante), 16 (intermediário) ou 20 (avançado)."
- **Código:** o máximo do nível só aparece em `gerador/index.ts:1175`, no laço do tempo que sobra. A entrada das vagas (`:583`, `:681`, com `cabeNoTetoSemanal` em `:1435-1436`) e a distribuição (`:877`: `(v[x] ?? 0) + n <= VOLUME.teto`) só conferem 20. O avaliador trata o excesso como informação (`avaliador/index.ts:393`, `gravidade: 'info'`).
- **Exemplo A (sem foco):** inventário do Bruno, iniciante, 6 dias de 45 min, sem foco: peito 12 e tríceps 11, com todos os exercícios em 2 séries (é a soma das vagas da divisão).
- **Exemplo B (com foco):** inventário da Ana, iniciante, 4 dias de 60 min, foco em glúteos: glúteos 16, e o porquê do programa diz "primeiro para o foco (até ~10 séries por semana)".
- **Medida:** 1.555 de 3.920 programas de iniciante (40%) têm músculo com meta acima de 10; 81 chegam a 20. No intermediário, 279 de 3.920 passam de 16. No avançado o máximo é o próprio teto.
- **Conserto em uma linha:** decidir se o máximo do nível é limite de verdade (aí a montagem e a distribuição têm de conferir) ou só o alvo do tempo que sobra (aí a frase tem de dizer isso).

### 5. volume.semanal.teto-padrao — a frase diverge
- **Regra:** avançado: "20; acima só por opção explícita do usuário".
- **Frase:** "O avançado só passa se escolher isso de forma explícita."
- **Código:** `regras/index.ts:37` (`teto: 20`) e todos os usos (`gerador/index.ts:877`, `:1175`, `:1436`, `:1519`) valem para os três níveis. Não há campo, tela nem opção para o avançado passar de 20 (procurei em `src/features/`, `src/storage/esquema.ts` e no `Perfil`).
- **Exemplo:** avançado, qualquer inventário e foco: nenhum músculo passa de 20 (0 casos em 13.328 programas de avançado), e não há onde pedir mais.
- **Conserto em uma linha:** a frase dizer "nenhum músculo passa de 20, em nenhum nível" (a opção do avançado não existe no app).

### 6. volume.equilibrio-coxa — o código diverge (raro)
- **Regra:** "as séries semanais de quadríceps ÷ posteriores ficam entre 0,5 e 2"; os cortes e o ajuste de 30 min não tiram da faixa, "salvo se ela já estava fora".
- **Frase:** "as séries por semana de quadríceps divididas pelas de posteriores ficam entre 0,5 e 2".
- **Código:** `gerador/index.ts:1884-1888`, `mantemCoxa`, só impede que um corte ou uma série a mais tire a razão da faixa (`if (!coxaNaFaixa(v)) return true;`). A distribuição das séries (`:868-899`) não confere a razão.
- **Exemplo:** inventário da Ana, avançado, 6 dias de 60 min, foco em glúteos e pernas, divisão escolhida Superior/Inferior (3x): quadríceps 6, posteriores 14 (razão 0,43). Os glúteos chegam ao teto de 20, e os exercícios de quadríceps, que dão meia série ao glúteo, não podem mais subir. O aviso que sai é o de "abaixo da meta: quadríceps 6 de 14", com o motivo "até 4 séries por exercício e 10 por sessão", que também não é o motivo real.
- **Medida:** 0 de 11.760 na divisão recomendada; 95 de 28.224 com divisão escolhida. O exercício direto de posteriores nunca faltou.
- **Conserto em uma linha:** a distribuição conferir a razão, ou a frase dizer "na divisão recomendada".

### 7. divisao.sem-puxar — o código diverge (na tela)
- **Regra:** "Sem nenhum exercício de puxar possível, a divisão recomendada passa a ser a de corpo todo do mesmo número de dias".
- **Frase:** "a recomendada passa a ser a divisão de corpo todo do mesmo número de dias [...] A que você escolheu fica, com um aviso".
- **Código:**
  - O gerador cumpre (`divisoes.ts:519-521`).
  - A tela de escolha não sabe do equipamento: `divisoes.ts:498` (`recomendada: i === 0`), chamada em `Rotina.tsx:57` só com dias e meta, e a etiqueta em `Rotina.tsx:195`.
  - O aviso de quem manteve a escolha (`gerador/index.ts:826`) termina com "Para trocar, escolha Corpo todo na rotina."
- **Exemplo A:** sem equipamento nenhum, 4 dias. Em Meus dados → Rotina, "Superior/Inferior (2x)" aparece com a etiqueta "Recomendada" e o texto "Por que é a recomendada"; o programa gerado sem escolha sai em "Corpo todo 4x", com o porquê "a recomendada é a de corpo todo".
- **Exemplo B:** sem equipamento, 6 dias, com Empurrar/Puxar/Pernas (2x) escolhida: o aviso manda escolher Corpo todo na rotina, mas a tela de 6 dias só oferece Empurrar/Puxar/Pernas (2x) e Superior/Inferior (3x). O caminho real é "Deixar o app escolher".
- **Conserto em uma linha:** passar o "sem puxar" para `opcoesDeDivisao` e trocar o fim do aviso de 6 dias por "toque em Deixar o app escolher".

### 8. objetivo.cutting.texto — o código diverge (leve)
- **Regra:** "no déficit, o músculo tende a crescer pouco e a força pode continuar subindo".
- **Frase:** "Durante a dieta, o músculo tende a crescer pouco e a força pode continuar subindo."
- **Código:** `gerador/index.ts:1635`: "Na dieta, é normal o músculo parar de crescer; a carga pode continuar subindo." O texto também acrescenta "procure um nutricionista", que a regra não cita.
- **Exemplo:** qualquer perfil com objetivo "manter o músculo enquanto perde peso": o porquê do programa diz "parar de crescer".
- **Conserto em uma linha:** trocar por "o músculo tende a crescer pouco".

### 9. objetivo.forca.faixa-compostos — o código diverge
- **Regra:** "os 2 primeiros exercícios multiarticulares com carga de cada treino usam 5–8 repetições".
- **Frase:** "intermediário e avançado fazem 5–8 repetições nos 2 primeiros exercícios multiarticulares com carga de cada treino."
- **Código:** o ajuste é feito uma vez, na 1ª prescrição (`gerador/index.ts:1038-1061`). Depois dele:
  - `:1235`: o degrau 1b do corte de tempo troca o exercício de um lado só pelo de dois lados com `prescrever(...)`, que devolve a faixa e o descanso de base, sem o ajuste de força.
  - `:2051-2059`: a supersérie reordena o dia, e os 2 ajustados deixam de ser os 2 primeiros da lista.
  - `locais/index.ts:98` (`reps: e.faixaReps`) e `sessao/index.ts:100` (`reps: alt.faixaReps`): no treino em outro local e na troca pela alternativa, o exercício que entra volta à faixa de base, mesmo sendo com carga.
- **Exemplo A:** inventário da Ana (halteres até 12 kg e banco reto), intermediário, 2 dias de 30 min, foco em costas, objetivo "ficar mais forte". Corpo todo A sai com remada curvada com halteres 8–12 e 105 s (entrou no lugar da remada de um braço), goblet 5–8 e 150 s, supino reto 6–10 e 105 s: um ajustado só, com 4 multiarticulares com carga no dia.
- **Exemplo B (ordem):** inventário do Bruno, intermediário, 2 dias de 30 min, foco em pernas: goblet 5–8, supino reto 6–10, terra romeno 5–8. O 2º da lista não é ajustado e o 3º é.
- **Medida:** 685 de 7.840 programas (8,7%) têm um dia com menos de 2 ajustados havendo 2 multiarticulares com carga; outros 284 têm os 2 ajustados fora das 2 primeiras posições.
- **Conserto em uma linha:** reaplicar o ajuste de força depois dos cortes (e nas trocas de local e de alternativa).

### 10. objetivo.forca.descanso — o código diverge (mesma causa da 9)
- **Regra:** "Descanso nesses exercícios": 2 min 30 s para intermediário e avançado.
- **Frase:** "Nos 2 primeiros exercícios multiarticulares com carga do objetivo de força, intermediário e avançado descansam 2 min 30 s."
- **Código:** `gerador/index.ts:1235`: o exercício que entra na troca de dois lados sai com `DESCANSO.composto` (105 s).
- **Exemplo:** o exemplo A da divergência 9: a remada curvada, 1º multiarticular com carga do dia, com 105 s.
- **Conserto em uma linha:** o mesmo da 9.

### 11. objetivo.forca.seguranca — o código diverge (leve)
- **Regra:** "multiarticular com peso livre (barra, halter, kettlebell) fica com 2 a 3 repetições de reserva".
- **Frase:** "o exercício multiarticular com peso livre (barra, halter, kettlebell)".
- **Código:** `gerador/index.ts:1037`: `['barra', 'halter', 'kettlebell', 'anilha'].includes(e.carga)`. Na biblioteca, `anilha` é a carga do leg press, do hack, do agachamento no Smith e do supino no Smith.
- **Exemplo:** inventário só com Smith e banco reto, intermediário, 3 dias de 60 min, objetivo "ficar mais forte": agachamento no Smith e supino no Smith saem com 5–8 e reserva 2–3, com o texto "Com peso livre, termine com 2 a 3 repetições de reserva". O mesmo com só leg press ou só hack.
- **Conserto em uma linha:** tirar `anilha` da lista, ou a regra e a frase citarem as máquinas de anilha e o Smith.

### 12. objetivo.saude.texto — o código diverge (leve)
- **Regra:** "elas pedem também 150–300 min por semana de aeróbio moderado (ou 75–150 vigoroso), que o app não prescreve".
- **Frase:** "Elas pedem também 150–300 min por semana de exercício aeróbio moderado (ou 75–150 de vigoroso), que o app não inclui."
- **Código:** `gerador/index.ts:1652`: "Elas pedem também 150 a 300 min por semana de atividade aeróbia moderada (como caminhada rápida), que o app não prescreve." Sem a alternativa vigorosa.
- **Exemplo:** qualquer perfil com objetivo "saúde e disposição": o porquê do programa não traz os 75–150 min.
- **Conserto em uma linha:** acrescentar "(ou 75 a 150 de vigorosa)" ao texto.

## As 3 regras que não estão no app
- **volume.semanal.dose-resposta** e **frequencia.efeito-hipertrofia:** são a base de outras regras (o alvo de 10 ou mais; a divisão que só distribui o volume). O app não as executa nem as cita fora do catálogo de "Entenda o treino". As frases são afirmações de evidência e não dão a entender que o app faz algo.
- **volume.manutencao.piso:** a frase diz "ainda não está no app" logo no começo.

## Ressalvas nas regras que batem
1. **volume.prioridade.competicao:** o aviso só lista o foco abaixo da meta que tem exercício possível (`gerador/index.ts:1302`); o foco sem exercício possível sai em outro aviso ("Sem exercício possível"). A regra e a frase não dizem essa condição. Com exatamente 2 grupos, a sugestão é "escolha um grupo só".
2. **volume.semanal.minimo-eficaz:** "têm um mínimo de 4–6" é meta, não garantia: em muitos programas curtos ou de pouco equipamento há músculo fora do foco abaixo de 4 mesmo com exercício possível. Em todos os casos medidos havia aviso.
3. **volume.series-por-exercicio:** vale para o programa completo. Na semana 1 da readaptação e na semana leve, o exercício de 2 séries fica com 1 (`gerador/index.ts:2241`): no programa do Bruno, 16 de 32 exercícios. A frase diz "série única não é o padrão", o que cobre o caso, mas não cita essas semanas.
4. **frequencia.musculo:** "uma vez só é aceitável com até 10 séries" vale contando os dias com série indireta (`avaliador/index.ts:394`). Contando só os dias com exercício direto, há músculo com mais de 10 séries e 1 dia direto (exemplo: inventário do Bruno, intermediário, 2 dias de 90 min, foco em glúteos: 12 séries).
5. **objetivo.pergunta:** a pergunta não é feita no cadastro (`Rotina.tsx:164-165`: só com `?de=dados`); fica em Meus dados → Objetivo, que mostra "Ganhar músculo" enquanto não há resposta. "O app pergunta" é verdade só para quem vai até lá.
6. **volume.semanal.alvo:** "ficam pelo menos 6 séries abaixo do foco" (texto do programa) vale só para o tempo que sobra; pelas séries indiretas, um músculo fora do foco pode ficar mais perto (inventário da Carla, intermediário, 4 dias de 90 min, foco em peito, costas e ombros: bíceps 10 com o foco em 12).

## O que não foi conferido
- As telas não foram abertas no navegador: a parte de tela vem da leitura de `Rotina.tsx`, `Entenda.tsx` e dos textos que o gerador devolve.
- A grade usa os 14 inventários das personas, sem dor na triagem e sem "algo a evitar"; as contagens são desta grade, não da população de 680.625 programas das auditorias do projeto.
- `docs/pesquisa/regras.md` foi comparado com `regras.json` só nas linhas de `volume.semanal.maximo` e `volume.semanal.teto-padrao` (iguais).
