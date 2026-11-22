# Tempo, descanso, técnica, nível e volta de pausa: relatório do conferente

> Relatório de um conferente independente (22/11/2026), que recebeu a regra, a frase e o código, sem hipótese da sessão. É matéria-prima: cada divergência só vale depois de conferida pela sessão no código (coluna "situação" de `../regras-x-codigo.md`). As linhas citadas são as do dia da conferência.

# Conferência regra × frase × código: grupo "tempo" (30 regras)

Feita em 22/11/2026, só de leitura. Além da leitura do código, rodei o gerador numa grade de 21.600 programas fictícios (3 níveis × 2 a 6 dias × 30/45/60/75/90 min × 6 focos × 24 inventários das personas de `tests/personas/`; para o iniciante, também com pausa de 2, 12 e 30 semanas), com scripts em `scratchpad/d1/` (fora do repositório). Os números de linha de `src/features/treino/Treino.tsx` e `Programa.tsx` são os da cópia de trabalho, que tinha mudanças não commitadas de outra sessão durante a conferência.

Resultado: **19 batem, 9 com o código divergindo, 1 com a frase divergindo, 1 que não está no app.**

## Tabela

| id | classificação | onde no código (arquivo:linha) | evidência |
|---|---|---|---|
| descanso.piso | bate | `src/domain/regras/index.ts:60-61`; `src/features/treino/Treino.tsx:200-201` | Todo descanso prescrito é de 75 s, 105 s ou 150 s (força); nenhum fica abaixo de 60 s. A frase diz o mesmo. |
| descanso.por-tipo | bate | `src/domain/regras/index.ts:58-62`; `src/domain/gerador/index.ts:1461`, `1822-1828` | Composto 105 s, isolador 75 s, em todos os níveis. Observação: o "2–3 min como opção" não existe como escolha na tela (ver Observações). |
| readaptacao.gatilho | o código diverge | `src/domain/sessao/bloco.ts:131`; `src/storage/esquema.ts:281`; `src/domain/gerador/index.ts:2174-2175` | Os limites (< 2, 2 a < 3, ≥ 3 semanas) batem. Mas o RIR +1 da pausa de 2 semanas volta a valer meses depois, se a pessoa mudar a rotina (dias com ids novos). |
| readaptacao.durante-uso | bate | `src/domain/regras/index.ts:111-119`; `src/domain/sessao/bloco.ts:30-37`, `62-83`, `89-93`; `src/domain/sessao/index.ts:357-384`; `src/domain/acompanhamento/volta.ts:24-46` | Faixas 13/20/56/182 dias, −10%/−15%/−20%, bloco novo a partir de 21 dias, semana do programa só com semanas com treino, mensagem "Bem-vindo de volta! Faz N dias…". Tudo como a regra e a frase. |
| readaptacao.semana1 | o código diverge | `src/domain/gerador/index.ts:2192`; `src/domain/regras/index.ts:108` | Séries × 0,55, RIR 3–4, carga da volta para baixo, placa, degrau, contrapeso e "só desce" batem. O texto da fase da pausa do cadastro diz "carga 10–20% abaixo", e a regra e a frase dizem 10% ou 15%. |
| readaptacao.semana2 | bate | `src/domain/regras/index.ts:109`; `src/domain/gerador/index.ts:2198` | Séries × 0,75 e RIR 2–3. |
| readaptacao.semana3 | bate | `src/domain/gerador/index.ts:2199`; `src/domain/sessao/index.ts:250` | Fator 1, RIR da prescrição, e o "só desce" vale só na semana 1. |
| iniciante.fase-aprendizado | o código diverge | `src/domain/gerador/index.ts:2173-2180` | RIR 3–4, 3/4 das séries, sem "estagnado" e sem semana leve batem. Mas a pausa do cadastro é testada antes do nível: o iniciante que diz "parei há umas 2 semanas" não tem fase de aprendizado nenhuma. |
| ordem.sessao | bate | `src/domain/gerador/index.ts:996-1007`, `1474-1478` | Chave de ordenação: core por último, multiarticular, prioridade, ordem da vaga no modelo. |
| tempo.serie | bate | `src/domain/regras/index.ts:73-74`; `src/domain/gerador/index.ts:1837` | Meio da faixa de repetições × 3 s + 7,5 s; dobra no exercício de um lado só. |
| tempo.transicao | bate | `src/domain/regras/index.ts:75`; `src/domain/gerador/index.ts:1842`, `1857` | 90 s entre exercícios, descanso só entre séries (séries − 1), nada depois do último exercício. |
| tempo.aquecimento | o código diverge | `src/domain/gerador/index.ts:1845-1852`; `src/domain/regras/index.ts:77`; `src/features/treino/Treino.tsx:398` | O modelo soma 180 s no 1º multiarticular de cada região (bate) e mais 90 s em cada multiarticular seguinte de músculo ainda não aquecido (a regra não prevê). Na tela, o lembrete aparece só no 1º exercício do treino. |
| tempo.colchao | bate | `src/domain/regras/index.ts:78`; `src/domain/gerador/index.ts:69`, `1859` | Segundos × (1 + 0,10), arredondado para minutos. |
| tempo.calibracao | bate | `src/domain/acompanhamento/tempo.ts:9-16`, `35-62`; `src/features/acompanhamento/acoes.ts:82-91` | 3 treinos com ≥ 80% das séries, mediana de real ÷ estimado sem margem, de −10% a +50%, 5 min de diferença, só com o aceite. Observações menores abaixo. |
| tempo.exercicios-por-sessao | bate | `src/domain/regras/index.ts:89-102`; `src/domain/gerador/index.ts:636-656`, `681` | Tabela 4/6/8/10/12, proporcional com arredondamento para baixo; ordem das vagas (base, único direto, foco, outros) e teto semanal no mínimo de séries. |
| tempo.exercicios-do-iniciante | bate | `src/domain/gerador/index.ts:461-464`, `496-509`, `563-564`, `767`, `927`, `1355-1358` | Iniciante, exatamente 3 dias, até 60 min, quando caberiam mais de 6. Comparação com a montagem sem o limite pelos 5 custos da regra. Na grade: 504 programas com o limite, nenhum dia com mais de 7 exercícios. |
| tempo.corte | bate | `src/domain/gerador/index.ts:1963-2127`, `1227-1239`, `2229-2247` | Degraus 1b, superséries (isoladores, depois multiarticulares), drop set em isolador com ≥ 3 séries, menos exercícios, menos séries; coxa e único direto de posteriores protegidos; drop set sai nas semanas com RIR 3–4. Observação sobre a ordem dos degraus 4 e 5 abaixo. |
| tempo.sobra | bate | `src/domain/gerador/index.ts:1318-1335`; `src/domain/regras/index.ts:81` | Mediana dos dias < 70% dos minutos; os dois textos (falta exercício ou dor; séries no limite), com a menção ao foco só para quem não tem; nunca sugere compra. |
| tempo.sobra-series | a frase diverge | `src/domain/gerador/index.ts:1169`, `1208` | A trava do iniciante ("só os multiarticulares sobem, até 3 séries") só existe no 2º passo. Nos dias com vaga sem exercício possível, o 1º passo sobe isoladores do iniciante até 4 séries, e a frase não diz isso. |
| tempo.musculo-protegido | bate | `src/domain/gerador/index.ts:723-743`, `882`, `1069-1096`, `1171`, `1997-1998`, `2080` | Entra no dia com menos exercícios; o corte não o tira (é o único exercício direto do músculo, e nenhum exercício da biblioteca tem abdômen ou panturrilha como secundário); com 30 min, 2 séries e a saída do último isolador. |
| tempo.superserie | o código diverge | `src/features/treino/Treino.tsx:200-201`; `src/domain/gerador/index.ts:2231` | (a) A tela do treino não executa a supersérie: nenhum arquivo de `src/features/treino/` lê `supersetCom`. (b) O iniciante com pausa no cadastro recebe supersérie nas semanas 1 e 2. |
| tempo.drop-set | o código diverge | `src/domain/gerador/index.ts:1213-1224` | 1 por exercício, só em isolador, conta 2 no volume: bate. Mas o drop set também entra em isolador de kettlebell e de caneleira, e a regra e a frase dizem "máquina, polia ou halter". |
| tempo.outras-tecnicas | não está no app | não achei o código (só `regras.json`, `frases-das-regras.json` e `fontes.json`) | O app não prescreve nem registra rest-pause, cluster ou pré-exaustão. A frase diz "é permitido", sem dizer que o app não faz nada com isso. |
| tecnica.flexao.punho | bate | `src/domain/gerador/index.ts:1669-1677`; `src/domain/triagem/index.ts:66-70` | Dor de 3 a 5 no punho + um dos 5 exercícios da regra (todos têm "punho" nas articulações) → o porquê traz a dica; acima de 5, o exercício sai. |
| tecnica.parcial-alongada | bate | `src/domain/gerador/index.ts:1397-1404` | O porquê do programa cita a técnica só para o avançado, em texto. |
| nivel.classificacao | o código diverge | `src/domain/nivel/index.ts:65-76` | Iniciante e intermediário batem. O avançado sai só de "mais de 2 anos" + técnica "sim" + pausa ≤ 26 semanas: o app não pergunta sobre o "progresso lento" da regra e da frase. |
| tecnica.remada-baixa.polia | bate | `src/conteudo/exercicios/remada-baixa.json:9`, `52`, `59` | O cartão diz polia na altura do umbigo, cabo quase horizontal, triângulo no abdômen, cotovelos rentes, coluna neutra. Só não cita "1 a 2 furos abaixo". |
| tecnica.barra-fixa.pegada | bate | `src/conteudo/exercicios/barra-fixa.json:10`, `57`; `src/conteudo/exercicios/barra-fixa-supinada.json:61` | O cartão diz "um pouco mais abertas que os ombros (cerca de 1,5×)", dentro de 1–1,5×; a supinada "muita gente consegue mais repetições"; nenhum texto diz "alarga as costas". |
| tecnica.supino-inclinado.angulo | o código diverge | `src/conteudo/exercicios/supino-inclinado.json:9` | O cartão diz "Entre 30° e 45° funciona"; a regra e a frase dizem aceitável de 15° a 45°. |
| tecnica.supino-halteres.cotovelos | o código diverge | `src/conteudo/exercicios/supino-reto.json:59`; `src/conteudo/exercicios/supino-inclinado.json:60` | O cartão diz cotovelo "entre ~30° e ~70° do tronco"; a regra e a frase dizem ~30° a 60°. |

## Divergências

### 1. tempo.superserie: o código diverge (a mais séria do grupo)

- **Regra:** "~15 s entre A e B e descanso só entre rodadas"; valores do iniciante: "só a partir da 3ª semana".
- **Frase:** "com cerca de 15 s entre os exercícios e descanso só entre rodadas […] Iniciante: só a partir da 3ª semana."
- **Código, parte (a):** o gerador marca a dupla (`supersetCom`) e o modelo de tempo conta 15 s entre A e B (`src/domain/gerador/index.ts:1854-1856`). Mas a tela do treino conduz um exercício por vez e inicia o descanso inteiro depois de cada série: `src/features/treino/Treino.tsx:200-201`, `if (feito.series.length + 1 < x.series) descanso.iniciar(x.descansoSeg); else if (!ultimo) descanso.iniciar(x.descansoSeg);`. Nenhum arquivo de `src/features/treino/` lê `supersetCom`. Na tela do programa só aparece o rótulo "· bi-set" na folha do exercício (`src/features/programa/Programa.tsx:624`), sem dizer com qual exercício.
- **Exemplo:** iniciante, 2 dias de 30 min, inventário da persona Carla: na semana 3 o dia sai com `leg-press<>supino-reto` e `puxada-frente<>stiff`. O dia foi estimado para caber em 30 min por causa das duplas; no treino, a pessoa faz as 2 séries de leg press com 105 s de descanso, depois as do supino, e o treino passa do tempo estimado.
- **Código, parte (b):** `aplicarFase` só tira a supersérie na fase de aprendizado: `src/domain/gerador/index.ts:2231`, `const semSuperserie = fase.regraId === 'iniciante.fase-aprendizado';`. O iniciante com pausa no cadastro recebe as fases de readaptação (ou a de "1ª sessão"), e a dupla fica.
- **Exemplo:** o mesmo perfil com `semanasParado: 12`: a semana 1 sai `leg-press<>supino-reto 1x rir 3–4 | puxada-frente<>stiff …`. Sem pausa, a semana 1 sai sem dupla. Na grade, 3.750 das 10.800 combinações de iniciante com pausa têm supersérie na semana 1 ou 2.
- **Conserto em uma linha:** (a) ou a tela do treino alterna A e B com 15 s, ou o modelo de tempo deixa de contar a economia; (b) tirar a supersérie do iniciante nas semanas 1 e 2 de qualquer fase.

### 2. iniciante.fase-aprendizado: o código diverge

- **Regra:** "2–3 semanas com RIR 3–4, volume no mínimo da faixa (3/4 das séries do programa) e foco técnico", sem exceção para o iniciante.
- **Frase:** "Só para o iniciante: 2 a 3 semanas de foco na técnica, com 3 a 4 repetições de reserva e 3/4 das séries do programa."
- **Código:** `src/domain/gerador/index.ts:2173-2176`: `if (p.semanasParado >= READAPTACAO.semanasProtocolo) return fasesDeReadaptacao(); if (p.semanasParado >= READAPTACAO.semanasNormal) return [{ semanas: '1ª sessão', … }]; if (p.nivel === 'iniciante') return […aprendizado…]`. A pausa é testada antes do nível.
- **Exemplo:** "Menos de 6 meses" de treino + "Parei há umas 2 semanas" → iniciante com `semanasParado: 2`. As fases são só `1ª sessão: readaptacao.gatilho`: programa completo desde a semana 1, RIR 2–3 (3–4 só na 1ª sessão de cada dia), superséries, "estagnado" e semana leve liberados. Com 3 semanas ou mais de pausa, o iniciante recebe a readaptação (55% e 75% das séries), que é mais leve que o aprendizado, e não a fase da regra.
- **Menor:** a regra, a frase e a tela "Como ler" (`src/features/programa/ComoLer.tsx:42`, "Nas 2 a 3 primeiras") dizem 2 a 3 semanas; o app faz sempre 2 (`semanas: '1–2'`).
- **Conserto em uma linha:** decidir e escrever na regra o que vale para o iniciante com pausa de 2 semanas (hoje, nada da fase).

### 3. readaptacao.gatilho: o código diverge (caso não tratado)

- **Regra:** "2 a < 3 semanas: 1ª sessão de cada dia com RIR +1", para a pausa dita no cadastro.
- **Frase:** "1 repetição de reserva a mais na 1ª vez que você fizer cada dia do programa."
- **Código:** `src/domain/sessao/bloco.ts:131`: `if (bloco.pausaDias === undefined && programa.fases.some((f) => f.regraId === 'readaptacao.gatilho')) desde = 0;` e, adiante, `programa.dias.map((x) => x.id).filter((id) => !feitos.has(id))`. O perfil sempre leva a pausa do cadastro (`src/storage/esquema.ts:281`), então todo programa gerado de novo traz a fase "1ª sessão".
- **Exemplo (rodado):** intermediário com pausa de 2 semanas no cadastro treina 10 semanas, 3 vezes por semana, sem falhar, em Corpo todo (`corpo-a/b/c`). Na semana 11 troca para 4 dias (`superior-a`, `inferior-a`, `superior-b`, `inferior-b`). `hojeNoPrograma` devolve RIR +1 nos 4 dias novos (supino reto com RIR 2–3 em vez de 1–2), dois meses e meio depois da pausa.
- **Conserto em uma linha:** valer só enquanto o bloco tiver menos treinos que dias do programa, ou só na semana 1 do bloco.

### 4. readaptacao.semana1: o código diverge (texto da tela)

- **Regra:** "carga −10% (pausa de 3 a 8 semanas) ou −15% (8 a 26 semanas) […] pausa dita no cadastro, sem histórico: começar leve".
- **Frase:** "10% menor (pausa de 3 a 8 semanas) ou 15% menor (de 8 a 26 semanas) […] Pausa informada no cadastro, sem histórico: comece leve."
- **Código:** `src/domain/regras/index.ts:108`, `reducaoCarga: [0.1, 0.2]`, usado em `src/domain/gerador/index.ts:2192`: "Cerca de metade das séries, RIR 3–4 e carga 10–20% abaixo da que você usava antes da pausa (na dúvida, comece leve)." O texto aparece em "Entenda o treino" (`src/features/entenda/Entenda.tsx:148`, `180-184`).
- **Exemplo:** qualquer perfil com "Parei há 3 semanas a 6 meses" vê "10–20%", número que a regra e a frase não têm (a faixa de 10–20% é a anterior ao R2).
- **Menor:** `Math.round(séries × 0,55)` dá 2 → 1, 3 → 2, 4 → 2; no exercício de 3 séries são 67%, acima dos "~50–60%".

### 5. tempo.aquecimento: o código diverge

- **Regra:** "Aquecimento específico antes do 1º multiarticular de cada região"; "1–2 séries leves, ~2–4 min; a última perto da carga do treino".
- **Frase:** "Antes do 1º exercício multiarticular de cada região, você faz 1–2 séries leves do próprio exercício, cerca de 2–4 min. A última fica perto da carga do treino."
- **Código, modelo de tempo:** `src/domain/gerador/index.ts:1845-1849`: `if (y.tipo === 'composto' && !e.musculos.primarios.some((m) => aquecidos.has(m))) { … seg += aquecidos.has(regiao) ? TEMPO.aquecimentoCurto : TEMPO.aquecimento;` com `aquecimentoCurto: 90` (`src/domain/regras/index.ts:77`). Todo multiarticular seguinte da mesma região, de músculo ainda não aquecido, soma 90 s que a regra não prevê.
- **Exemplo:** dia com supino reto e depois puxada: 180 s no supino (certo) e mais 90 s na puxada; com a margem, 1,65 min a mais por exercício assim. Num dia de superiores com 3 multiarticulares de músculos diferentes são cerca de 3 min, que pesam no corte de tempo.
- **Código, tela:** `src/features/treino/Treino.tsx:398`: `{i === 0 && precisaAquecer(dia, …) && (<p className="dica">Aqueça antes: 1–2 séries leves, sem contar.</p>)}`. O lembrete só aparece no 1º exercício do treino. Num dia de corpo todo que abre com supino, o agachamento (1º multiarticular de inferiores) não tem lembrete, e o texto não diz "a última perto da carga". O comentário do código diz que o corte foi aprovado pelo Gustavo em 22/11/2026, então esta parte é decisão; fica a diferença entre o que a frase manda fazer e o que a tela lembra.
- **Menor:** a frase curada da página (`src/features/entenda/Entenda.tsx:338`) diz "Antes do 1º exercício de cada grupo", e a regra diz "1º multiarticular de cada região".

### 6. tempo.sobra-series: a frase diverge

- **Regra:** a trava do iniciante está escrita dentro da descrição do 2º passo ("Travas do segundo passo […] **Para o iniciante, fora do foco, só os multiarticulares sobem, e até 3 séries**"); o 1º passo (dias com vaga sem exercício por equipamento) continua descrito sem ela.
- **Frase:** "Em todos os dias, o tempo que sobra vira série […] No iniciante, fora do foco, só os multiarticulares sobem, até 3 séries." Sem ressalva.
- **Código:** `src/domain/gerador/index.ts:1169`: `if (emTodos && nivel === 'iniciante' && !prioritarios.has(m) && (x.tipo !== 'composto' || x.series >= VOLUME.sobraDoIniciante)) return;`. A trava só vale com `emTodos` (2º passo). O 1º passo roda antes (`subirSeries(diasComVaga, false)`, linha 1208) e sobe qualquer exercício até 4 séries.
- **Exemplo (rodado):** iniciante sem foco, 2 dias de 60 min, sem equipamento (persona Iara): a flexão de joelho deslizante, um isolador, sai com 4 séries nos dois dias (8 de posteriores na semana, com meta de 6), e o porquê diz "Nos dias com vaga sem exercício possível, o tempo que sobrou virou série: os músculos que dá para treinar sobem até ~8 séries por semana." Na grade, 513 casos de músculo só com isoladores e 7 ou mais séries diretas, em 600 programas de iniciante sem foco.
- **Conserto em uma linha:** ou a frase ganha a ressalva dos dias com vaga vazia, ou a trava passa a valer nos dois passos (se era essa a intenção da decisão de 13/11, então é o código que diverge).

### 7. tempo.drop-set: o código diverge (leve)

- **Regra:** "só onde a carga pode ser reduzida (máquina, polia ou halter)".
- **Frase:** "Só entra quando falta tempo e a carga pode ser reduzida (máquina, polia ou halter)."
- **Código:** `src/domain/gerador/index.ts:1217-1222`: `c === 'maquina' || c === 'polia' || c === 'anilha' || (c === 'halter' && cargasDeHalter >= 2) || (c === 'kettlebell' && cargasDeKettlebell >= 2) || (c === 'caneleira' && cargasDeCaneleira >= 2)`.
- **Exemplo:** quem só tem kettlebells de 8, 12 e 16 kg (persona Kaique) pode receber drop set na rosca com kettlebell ou no tríceps francês com kettlebell. Na grade: 171 drop sets em kettlebell, de 4.685 (halter 1.980, máquina 1.484, polia 874, máquina de anilhas 176, caneleira 0).
- **Conserto em uma linha:** acrescentar kettlebell e caneleira à regra e à frase, ou tirar do `podeDrop`.

### 8. nivel.classificacao: o código diverge (leve)

- **Regra:** avançado = "> ~2 anos de treino contínuo com progresso lento".
- **Frase:** "avançado, mais de uns 2 anos, com progresso lento".
- **Código:** `src/domain/nivel/index.ts:75`: `return { nivel: 'avancado', motivo: 'Mais de ~2 anos de treino contínuo, com técnica estável.', regraId };`. As perguntas são tempo, pausa e técnica; nenhuma sobre o ritmo do progresso.
- **Exemplo:** 3 anos de treino contínuo, técnica "Sim", ainda subindo carga toda semana → avançado.
- **Conserto em uma linha:** tirar "com progresso lento" da regra e da frase (ou tratar como descrição, não critério).

### 9. tecnica.supino-inclinado.angulo: o código diverge (texto do cartão)

- **Regra:** "~30° (aceitável 15–45°; encaixe mais próximo de 30°); evitar > 45°".
- **Frase:** "De 15° a 45° é aceitável: use o encaixe mais próximo de 30°."
- **Cartão:** `src/conteudo/exercicios/supino-inclinado.json:9`: "Encosto a cerca de 30° […]. Entre 30° e 45° funciona; acima disso o ombro assume mais o trabalho."
- **Exemplo:** banco com encaixes em 20° e 50°: pela regra, 20°; pelo cartão, 20° fica fora do que "funciona" e a pessoa tende ao de 50°, que a regra manda evitar.

### 10. tecnica.supino-halteres.cotovelos: o código diverge (texto do cartão)

- **Regra:** "~30–60° do tronco ("seta", não "T")".
- **Frase:** "Os cotovelos ficam a cerca de 30° a 60° do tronco".
- **Cartão:** `src/conteudo/exercicios/supino-reto.json:59`: "O ângulo do cotovelo (entre ~30° e ~70° do tronco)…"; `src/conteudo/exercicios/supino-inclinado.json:60`: "(algo entre ~30° e ~70°)". O campo aparece no guia (`src/features/guia/Guia.tsx:655`).
- **Exemplo:** quem abre o guia do supino reto lê 70°; quem abre a regra em "Entenda o treino" lê 60°.

### 11. tempo.outras-tecnicas: não está no app

- **Regra:** "Rest-pause (ou myo-reps) permitido na última série de exercício estável; cluster sets e pré-exaustão não entram no modo curto".
- **Frase:** "O rest-pause (ou myo-reps) é permitido na última série de um exercício estável. Cluster sets e pré-exaustão não entram quando o treino precisa ser encurtado…"
- **Código:** não achei. `rest-pause`, `myo`, `cluster` e `pré-exaustão` só aparecem em `regras.json`, `frases-das-regras.json` e `fontes.json`. O gerador nunca prescreve rest-pause e o registro da série só tem as quedas do drop set.
- **A frase deixa claro?** Não. "É permitido" pode ser lido como algo que o app faz ou sabe registrar. Bastaria "o app não prescreve; se você fizer, registre como uma série".

## Observações que não chegam a divergência

- **descanso.por-tipo:** a regra e a frase dizem "2–3 min como opção" nos compostos. Não há controle para escolher isso: o relógio sempre começa em 105 s e segue contando depois do zero. Só o objetivo "ficar mais forte" muda o descanso (150 s).
- **tempo.transicao:** o modelo conta 90 s entre exercícios; no treino, o relógio depois da última série de um exercício usa o descanso dele (75 s ou 105 s; `Treino.tsx:201`). Os dois ficam dentro de 60–120 s.
- **tempo.calibracao:** o código usa os últimos 6 treinos que valem (`tempo.ts:11`, a regra só diz "depois de 3"); a "diferença de 5 min" é a média de real − estimado com a margem de hoje, não a mediana; e há uma condição a mais, a margem proposta tem de diferir da atual em 5 pontos ou mais (`tempo.ts:53`).
- **tempo.corte:** a regra e a frase põem "menos exercícios" antes de "menos séries". O código intercala por prioridade (`index.ts:2074-2101`): tira isoladores sem foco, corta séries sem foco, e só então tira isoladores do foco e corta séries do foco. Cumpre "um prioritário nunca perde séries antes de um não prioritário", mas um isolador do foco sai depois de séries dos outros já terem sido cortadas. A frase curada da página (`Entenda.tsx:346`) diz "o app oferece ajustes; nada muda sem a sua escolha", o que vale para os ajustes de rotina oferecidos (`opcoes.ts`), não para a escada, que o gerador aplica sozinho.
- **tempo.musculo-protegido:** com 30 min, o exercício protegido de um músculo do foco não fica preso em 2 séries (`index.ts:882`, por `volume.prioridade.foco-primeiro`). A frase diz "ele fica com 2 séries" sem essa exceção.
- **tempo.exercicios-por-sessao:** fora da tabela (a opção "outro" de minutos), o código extrapola com piso de 3 e teto de 14 exercícios (`regras/index.ts:101`), que a regra não cita.
- **tempo.sobra-series:** quem não tem nada para puxar fica fora da trava de empurrar ÷ puxar ≤ 1,5 (`podePuxar`, `index.ts:1181`); a regra não cita a exceção, mas sem ela nenhuma série de empurrar subiria.
- **tecnica.barra-fixa.pegada:** o cartão fixa "cerca de 1,5×" (o topo da faixa de 1–1,5× da regra).
- **tecnica.remada-baixa.polia:** o cartão não cita "1 a 2 furos abaixo" nem "levemente ascendente".
