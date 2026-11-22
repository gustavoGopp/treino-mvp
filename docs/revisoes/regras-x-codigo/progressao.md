# Progressão, repetições e reserva: relatório do conferente

> Relatório de um conferente independente (22/11/2026), que recebeu a regra, a frase e o código, sem hipótese da sessão. É matéria-prima: cada divergência só vale depois de conferida pela sessão no código (coluna "situação" de `../regras-x-codigo.md`). As linhas citadas são as do dia da conferência.

# Conferência regra × código × frase: repetições, RIR, progressão, semana leve, registro (32 regras)

Conferido em 22/11/2026, só leitura. **Atenção:** a árvore de trabalho mudou durante a conferência (outra sessão gravou o commit `abc16344`, "Mantém a carga de quem fica dentro da meta que a tela mostra", que mexe em `progressao.calibracao`: regra, frase, `calibracao.ts` e teste; depois vieram edições ainda sem commit em `Treino.tsx`, `numero.ts`, `Evolucao.tsx`, `Programa.tsx`, só de texto de tela). O que está abaixo vale para a árvore depois do `abc16344`; os números de linha de `Treino.tsx` são os do momento da leitura.

As provas de comportamento saíram de dois scripts fora do repositório, rodados com `tsx` sobre o código de `src/` (nenhum arquivo do repositório foi alterado):
`(rascunho da sessão) d1/prova.ts` e `(rascunho da sessão) d1/prova2.ts`.

Resultado: **22 batem · 7 o código diverge · 0 só a frase diverge (há 1 frase divergente dentro de uma regra já marcada pelo código) · 3 não estão no app.**

## Tabela

| id | classificação | onde no código (arquivo:linha) | evidência |
|---|---|---|---|
| reps.equivalencia-cargas | bate | `src/domain/gerador/index.ts:1451-1460`; `src/features/treino/Treino.tsx:778-806` | A prescrição é sempre repetições + RIR (faixa do exercício e RIR do nível); não existe %1RM em tela nenhuma. A fórmula de Brzycki só entra na conta interna da calibração. |
| reps.faixa.por-tipo | **o código diverge** | `src/domain/biblioteca/exercicios.json` (campo `faixaReps`), lido em `src/domain/gerador/index.ts:1459` | Dos 108 exercícios com carga, 27 ficam fora de "composto 6–10 ou 8–12; isolador 10–20": 10 roscas isoladoras em 8–12, leg press e hack em 8–15, caneleiras em 15–25 etc. |
| reps.faixa.degrau | **o código diverge** | `src/domain/biblioteca/exercicios.json` | 6 exercícios de peso do corpo fogem de "5 a 8 de largura, topo até 20": abdução e adução deitado 15–30, hiperextensão e abdominal declinado 10–20, barra só na descida 3–6, nórdico 6–10. Os valores listados na regra (flexão, agachamento, afundo etc.) conferem. |
| reps.teto.carga-limitada | bate | `src/domain/progressao/index.ts:276, 316, 322` | O 30 aparece só como texto do motivo ("mais repetições (até ~30)", "até umas 30"), sob `equipamento.escada-carga-leve` e `equipamento.fim-da-escada`. Não há constante nem checagem de 30; como a regra é orientação, bate. |
| rir.falha.nao-necessaria | bate | `src/domain/regras/index.ts:49-50`; `src/domain/gerador/index.ts:1821` | Nenhum alvo exige RIR 0 (o mais baixo é 0–1, no isolador de intermediário e avançado); o porquê diz "perto da falha, sem precisar chegar nela". |
| rir.alvo | bate | `src/domain/regras/index.ts:49-50`; `src/domain/gerador/index.ts:1449` | Iniciante 2–3 e 1–2; intermediário e avançado 1–2 e 0–1: iguais à regra e à frase. As fases (aprendizado, volta) trocam o RIR em `aplicarFase` (`gerador/index.ts:2242`). |
| rir.serie-efetiva | **o código diverge** | `src/domain/progressao/index.ts:393`; `src/features/treino/Treino.tsx:42, 813-817`; `src/domain/regras/index.ts:52-53` | O registro só vai até "4 ou mais", guardado como 4, e `serieEfetiva` aceita `rir <= 4`: a série com 5 ou mais de reserva conta como efetiva. |
| rir.carga-baixa | **o código diverge** (leve) | `src/domain/gerador/index.ts:1450-1451`; `src/domain/regras/index.ts:55` | Para o iniciante bate (composto de faixa longa: 2–3 vira 1–2). Para intermediário e avançado a regra diz "RIR 0–2", e o código não muda nada: fica 1–2 no composto e 0–1 no isolador. |
| rir.leitura | **não está no app** (a frase dá a entender que está) | `src/domain/progressao/calibracao.ts:32, 75` (só o limiar de 12); `src/domain/progressao/index.ts:194, 393` (RIR lido ao pé da letra) | Nenhum código lê o RIR "com margem (2 vale 2–3)"; o número informado é comparado direto. Do que a regra diz, só o "acima de 12, passos pequenos" existe, na calibração. |
| rir.calibracao | **não está no app** (a frase deixa claro) | não achei o código (não há; a regra e a frase dizem "Ainda não está no app") | A frase começa por "Ainda não está no app". Correto. |
| cadencia.repeticao | bate (com ressalva) | `src/conteudo/exercicios/*.json` (cartões do guia); sem `regraId` no código | É só orientação nos cartões: "desça em ~2 a 3 s" está em 48 de 171 cartões; "nunca mais de 10 s" não aparece em nenhum lugar além da frase. |
| progressao.subir | bate | `src/domain/progressao/index.ts:193-207, 299, 333, 337-342` | Topo em todas as séries, RIR até o máximo pedido, carga da 1ª série ou mais, em 2 sessões com a mesma carga → +1 incremento. Ressalva na seção de observações (séries registradas × séries prescritas). |
| progressao.manter | bate | `src/domain/progressao/index.ts:363` | Sem outro gatilho: "Mantenha a carga e busque +1 repetição." |
| progressao.reduzir | **o código diverge** (arredondamento) | `src/domain/progressao/index.ts:171-189, 254-268`; `src/domain/regras/index.ts:146` | A conta mira −7,5% e pega a maior carga disponível até ali; em placa, contrapeso e degrau é sempre −1 passo. Com halteres de 4, 5 e 6 kg, 5 kg vira 4 kg (−20%), e a frase promete "de 5 a 10%". |
| progressao.incremento.halteres | bate | `src/domain/sessao/index.ts:156-159`; `src/domain/taxonomia/equipamentos.ts:310-327, 348`; `src/domain/progressao/index.ts:140-150` | Fixos: a lista do mínimo ao máximo pelo passo; montáveis: as combinações de anilhas; kettlebell: a lista. O próximo é o 1º acima na lista. |
| progressao.incremento.polia | bate | `src/domain/progressao/index.ts:118-121`; `src/features/treino/Treino.tsx:1026-1036` | Registro por número de placa; +1 placa por incremento, até `placasMax`. |
| progressao.incremento.maquina-anilha | bate | `src/domain/progressao/index.ts:103, 129-133`; `src/features/treino/Treino.tsx:965-980`; `src/domain/taxonomia/equipamentos.ts:142` | Guardado por lado, mostrado e digitado pelo total; sobe 1 par da menor anilha (padrão 2 kg de cada lado). Calibração só por passos. |
| progressao.incremento.assistido | bate | `src/domain/progressao/index.ts:134-139, 301-306`; `src/features/treino/Treino.tsx:982-1004` | Subir = tirar 1 placa de contrapeso; na placa 1, com topo em 2 sessões, a sugestão é a versão livre. |
| progressao.incremento.peso-corporal | bate | `src/domain/progressao/escadas.ts:13, 59-68`; `src/domain/progressao/index.ts:313-318` | A escada genérica tem os 4 passos da regra; no fim, o aviso de `equipamento.fim-da-escada`. O elástico sobe só pelas intensidades do inventário. |
| progressao.escada-por-exercicio | bate | `src/domain/progressao/escadas.ts:15-24, 66-67`; `src/domain/progressao/escadas.json` | Degrau 0 = o exercício como no guia; os seguintes vêm do JSON (42 exercícios), com pausa e 1,5 repetição entre eles. |
| progressao.negativa-para-barra | bate | `src/domain/progressao/escadas.ts:87`; `src/domain/sessao/index.ts:174`; `src/domain/progressao/index.ts:307-312` | No último degrau, com o topo em 2 sessões, a sugestão é tentar a barra fixa em "Trocar exercício". O "mínimo" citado é o da faixa da descida (3), ver observações. |
| progressao.escada-elastico | bate | `src/domain/progressao/escadas.ts:27-34, 61-65` | 3 degraus por intensidade (normal, mais esticado, mais esticado com descida de 3 s), de 1 a N do inventário; com 1 intensidade, 3 degraus e para. |
| progressao.degrau-inicial | bate | `src/domain/progressao/escadas.ts:79-84`; `src/features/treino/Treino.tsx:733` | Iniciante 0, intermediário 1, avançado 2; no elástico do avançado, a intensidade do meio se ficar acima do degrau 2; nunca além do último. Só vale na 1ª vez (sem sugestão nem última série). |
| progressao.criterio-degrau | bate | `src/domain/progressao/index.ts:196`; `src/domain/regras/index.ts:126` | 1ª série ≥ topo, as outras ≥ topo − 2, RIR até o máximo pedido, em 2 sessões com o mesmo degrau. |
| progressao.salto-grande | bate | `src/domain/progressao/index.ts:243-252, 272-278, 325-332`; `src/domain/regras/index.ts:124-125` | Salto > 10% (só em kg): exige topo + 1 em todas as séries; 1ª série abaixo do mínimo depois de subir → voltar; a carga fica 6 sessões sem ser sugerida, com a escada no lugar. |
| progressao.carga-leve | bate | `src/domain/progressao/index.ts:282-296` | 1ª série ≥ topo + 2 no RIR pedido: 2 incrementos se o total ficar em até 10% (só em kg); senão, 1. |
| progressao.calibracao | **o código diverge** (e a frase tem um número a mais) | `src/domain/sessao/index.ts:405-425`; `src/domain/progressao/calibracao.ts:50, 59-87`; `src/features/treino/Treino.tsx:405-408, 728` | Durante o treino, a dor de 3 a 5 não manda: a série leve com dor 4 ainda devolve "Ficou leve: na próxima série, 8 kg". Fora isso, o código segue a regra nova; a frase diz "no máximo 25%" e omite o "no mínimo 1 passo" (2 kg → 3 kg = +50%). |
| progressao.troca-equivalente | bate | `src/domain/sessao/index.ts:98-101, 203-220, 301-312, 345-353` | A troca leva séries, RIR e descanso da vaga; o exercício novo e a máquina num local novo recomeçam na calibração; o texto da 1ª vez nunca mostra a carga antiga. |
| progressao.criterios-invalidos | **não está no app** (a frase não deixa claro) | `src/domain/progressao/index.ts:191, 194, 393` leem `amplitudeCompleta`; nenhuma tela grava esse campo (`src/storage/esquema.ts:116` só o aceita) | O filtro existe no domínio, mas não há como marcar uma série de amplitude curta ou com embalo. A dor tardia nunca é perguntada, então nunca é gatilho. |
| progressao.estagnacao | bate | `src/domain/progressao/index.ts:348-361, 370`; `src/domain/regras/index.ts:130-132`; `src/domain/sessao/index.ts:392-395` | Janela 4, 8 e 16 pelo nível (3 sem nível), comparada pelas séries em comum; no aprendizado, vira "busque +1 repetição". |
| deload.semana-leve | **o código diverge** | `src/domain/acompanhamento/semana-leve.ts:98, 101` | A carência "3 semanas depois de uma volta de pausa" só vale para a pausa detectada no uso; na volta declarada no cadastro, a semana leve é sugerida já na semana 1. O resto bate (50% das séries, RIR 3–4, 7 dias, "Agora não" 7 dias, os 3 sinais). |
| registro.treino-feito | bate | `src/domain/sessao/bloco.ts:25`; `src/domain/sessao/index.ts:78`; `src/features/treino/Treino.tsx:556-593`; `src/features/treino/Resumo.tsx:167-196`; `src/features/treino/acoes.ts:173-180` | `treinoFeito` (fim + 1 série) filtra a rotação, a semana, a pausa e a semana leve; "Descartar este treino" e "Guardar mesmo assim" existem; "Apagar este treino" pede confirmação. |

## Divergências

### 1. reps.faixa.por-tipo: o código (os dados) diverge

- **Regra:** "Faixa de repetições padrão por tipo de exercício": "composto 6–10 ou 8–12; isolador 10–20".
- **Frase:** "A faixa padrão é de 6–10 ou 8–12 repetições nos exercícios compostos e de 10–20 nos isoladores."
- **Código:** a faixa vem de `faixaReps` em `src/domain/biblioteca/exercicios.json` e vai direto para a prescrição (`src/domain/gerador/index.ts:1459`, `reps: e.faixaReps`). Entre os exercícios com carga (fora peso do corpo e elástico):
  - compostos fora de 6–10 e 8–12 (9 de 50): 8–15 (`leg-press`, `hack`, `goblet`, `agachamento-halteres`, `goblet-kettlebell`), 10–15 (`puxada-unilateral`, `pull-through`), 10–20 (`ponte-gluteo-halter`, `ponte-kettlebell`);
  - isoladores fora de 10–20 (18 de 58): 8–12 (10 roscas: `rosca-polia`, `rosca-alternada`, `rosca-scott`, `rosca-martelo` etc.), 8–15 (`cadeira-flexora`, `mesa-flexora`), 15–25 (6 de caneleira).
- **Exemplo:** qualquer programa com rosca alternada mostra "8 a 12" num isolador; a página diz que isolador é 10–20.
- **Peso:** a palavra "padrão" dá alguma folga, mas 1 em cada 4 exercícios com carga está fora. Conserto em uma linha: dizer na regra e na frase que é a faixa mais comum e citar as exceções (roscas 8–12, leg press e hack 8–15, caneleira 15–25).

### 2. reps.faixa.degrau: o código (os dados) diverge

- **Regra:** "Faixas dos exercícios de peso do corpo e de elástico: 5 a 8 repetições de largura, topo até 20"; valores: "ponte e abdominal 12–20" etc.
- **Frase:** "as faixas têm de 5 a 8 repetições de largura e vão até 20".
- **Código:** `src/domain/biblioteca/exercicios.json`, exercícios com `carga: "peso-corpo"`:
  - `abducao-deitado` e `aducao-deitado`: `[15, 30]` (15 de largura, topo 30);
  - `hiperextensao` e `abdominal-declinado`: `[10, 20]` (10 de largura; a regra diz abdominal 12–20);
  - `barra-fixa-negativa`: `[3, 6]` (3 de largura) e `nordico`: `[6, 10]` (4 de largura).
- **Exemplo:** quem treina em casa sem nada recebe abdução deitado "15 a 30"; a página diz que a faixa vai até 20. A regra `selecao.gluteo` até fala em "repetições altas" para esse caso, mas `reps.faixa.degrau` não abre a exceção.
- **Conserto:** listar as exceções na regra e na frase, ou acertar as 6 faixas.

### 3. rir.serie-efetiva: o código diverge

- **Regra:** "RIR ≤ 4; RIR ≥ 5 e aquecimento não contam".
- **Frase:** "Não contam as séries com 5 ou mais repetições de reserva nem as de aquecimento."
- **Código:**
  - `src/features/treino/Treino.tsx:42`: `const RIRS = [0, 1, 2, 3, 4] as const;` e, em `:813-817`, a última opção é "4" + "ou mais" (na tela, "4+");
  - a série é guardada com `rir: 4`;
  - `src/domain/progressao/index.ts:393`: `export const serieEfetiva = (s) => s.rir <= RIR.serieEfetivaMax && s.amplitudeCompleta !== false;` → verdadeiro para 4;
  - o comentário de `src/domain/regras/index.ts:52` diz "acima de 4 a série não é efetiva, e o número exato não muda nada", o que não é verdade para a contagem: 4 conta e 5 não, e o registro junta os dois.
- **Exemplo:** série com 7 repetições de reserva (carga muito leve, 1ª semana): a pessoa toca "4+", e a série entra no quadro da semana como efetiva (`src/domain/acompanhamento/semana.ts:63`). Rodado: `serieEfetiva({ rir: 4 })` → `true`.
- **Conserto:** ou a última opção vira "5 ou mais" (com o 4 separado), ou a regra e a frase passam a dizer que "4 ou mais" conta.

### 4. rir.carga-baixa: o código diverge (leve)

- **Regra:** valores: iniciante "RIR 1–2 a partir da 3ª semana"; intermediário e avançado "RIR 0–2".
- **Frase:** "Séries de 15 repetições ou mais pedem menos repetições de reserva [...] Intermediário e avançado: 0–2."
- **Código:** `src/domain/gerador/index.ts:1450-1451`:
  `const cargaBaixa = (e.faixaReps[0] + e.faixaReps[1]) / 2 >= RIR.cargaBaixa.repsMeio && rirBase[1] > RIR.cargaBaixa.rirMax;`
  Só entra quando o máximo do RIR base passa de 2, isto é, só no composto do iniciante (2–3 → 1–2). Para intermediário e avançado nada muda: composto fica 1–2 e isolador 0–1, e a linha de porquê com `rir.carga-baixa` (`:1467`) nunca aparece para eles.
- **Exemplo:** intermediário com agachamento com o peso do corpo (12–20, meio 16): a tela pede 1–2; a regra e a frase dizem 0–2 e que a série longa "pede menos reserva", mas a reserva é a mesma de qualquer composto.
- **Peso:** o que o app pede está dentro de 0–2, do lado seguro. Conserto: dizer "no máximo 2" na regra e na frase, e que só muda algo para o iniciante.

### 5. progressao.reduzir: o código diverge (arredondamento ao equipamento)

- **Regra:** "abaixo do mínimo da faixa em 2 sessões seguidas → −5 a −10%".
- **Frase:** "A carga cai de 5 a 10% quando as repetições ficam abaixo do mínimo da faixa em 2 treinos seguidos."
- **Código:** `src/domain/regras/index.ts:146` (`REDUCAO.abaixoDoMinimo: 0.075`) e `src/domain/progressao/index.ts:171-189`:
  - lista de halteres: `[...lista].reverse().find((x) => x <= alvo + 1e-9) ?? lista.find((x) => x < c.kg)` (a maior carga até −7,5%; se não houver, a primeira abaixo);
  - placa, contrapeso e degrau: `if (c.tipo !== 'kg') return proximaCarga(c, -1, o);` (sempre 1 passo, sem porcentagem).
- **Exemplos rodados:** halteres 4, 5 e 6 kg, 5 kg × 6 repetições em 2 sessões (faixa 8–12) → sugere 4 kg (−20%); placa 3 → placa 2; barra de 40 kg com passo de 4 → 36 kg (−10%); halter de 20 kg com passo de 2 → 18 kg (−10%).
- **Peso:** com passos pequenos em relação à carga, bate; com carga leve ou máquina de placa, não tem como bater. O motivo mostrado diz só "reduza um pouco a carga". Conserto: a regra e a frase dizerem "cerca de 5 a 10%, ou a carga logo abaixo que você tem; em placa e degrau, 1 passo".

### 6. progressao.calibracao: o código diverge (dor durante o treino) e a frase diverge (25%)

**6a. A dor não manda dentro do treino (código).**
- **Regra:** "dor ≥ 3 manda".
- **Frase:** "Com dor de nota 3 ou mais, quem manda é a regra da dor."
- **Código:** `src/domain/progressao/calibracao.ts:50` diz "A dor (seguranca.dor.escala) é tratada antes, por quem chama". Na sessão seguinte isso acontece (`src/domain/sessao/index.ts:344`). Durante o treino, não: `calibracaoNaSessao` (`src/domain/sessao/index.ts:422-424`) chama `avaliarSerieDeCalibracao` sem olhar `s.dor`, e a tela usa o resultado para a dica (`src/features/treino/Treino.tsx:405-408`) e para preencher a carga da série seguinte (`:728`, `cal.ultima?.proxima`).
- **Exemplo rodado:** remada apoiada, 1ª vez, halteres de 2 em 2 kg; 1ª série 6 kg × 20 com "4+" (série de acerto); a pessoa toca "Senti algo" e dá nota 4 (a nota vai para essa série). Resultado de `calibracaoNaSessao`: `acao: 'subir', proxima: 8 kg, motivo: "Ficou leve: na próxima série, 8 kg."`. A tela mostra ao mesmo tempo o aviso de dor (reduzir a carga) e a dica de subir, com 8 kg já preenchido. Na sessão seguinte, a mesma história devolve `ajustar`, 4 kg, pela regra da dor.
- **Conserto:** em `calibracaoNaSessao`, com dor de 3 ou mais na última série, não devolver subida (manter ou a carga da regra da dor).

**6b. "No máximo 25%" (frase).**
- **Regra:** "leve com R > 12: +1 passo (+2 se R ≥ A + 6), no máximo +25% e no mínimo 1 passo; placa, anilhas, contrapeso e degrau só por passos".
- **Frase:** "3) acima, está leve e sobe, no máximo 25%."
- **Código:** `src/domain/progressao/calibracao.ts:79-84`: o teto de 25% só vale em kg, e quando nem 1 passo cabe em 25% o código sobe 1 passo assim mesmo (`: proximaCarga(c, 1, o)`). O código segue a regra; a frase cortou a exceção.
- **Exemplos rodados:** halteres de 2 e 3 kg, 2 kg × 20 com "4+" → 3 kg (+50%); placa 2 × 25 com "4+" → placa 4 (2 passos, sem teto).
- **Conserto:** "sobe, no máximo 25% ou 1 passo do que você tem".

### 7. deload.semana-leve: o código diverge (carência da volta de pausa)

- **Regra:** "não sugere nas 3 semanas depois de uma volta de pausa nem nas 3 depois de uma semana leve".
- **Frase:** "O app não sugere nas 3 semanas depois de uma volta de pausa, nas 3 depois de uma semana leve, nem na fase de aprendizado do iniciante."
- **Código:** `src/domain/acompanhamento/semana-leve.ts:98`:
  `const depoisDaVolta = hoje.bloco.pausaDias !== undefined && hoje.semana <= SEMANA_LEVE.carenciaSemanas;`
  `bloco.pausaDias` só existe quando a pausa de 21 dias ou mais foi detectada no histórico (`src/domain/sessao/bloco.ts:58-83`). A volta declarada no cadastro (`semanasParado ≥ 3`, que põe as fases `readaptacao.semana1` a `semana3` no programa, `src/domain/gerador/index.ts:2173`) fica no 1º bloco, sem `pausaDias`, e a carência não vale.
- **Exemplo rodado:** persona Bruno com `semanasParado: 8`; dois treinos na 1ª semana (segunda e quarta), os dois marcados "pesado demais"; na quinta, `semanaLeveDeHoje` devolve `sugerir: true, carencia: false`, com a fase de hoje em `readaptacao.semana1`. A pessoa está na semana 1 da volta e recebe "Semana leve?".
- **Conserto:** a carência valer também quando a fase da semana é de readaptação (`hoje.fase?.regraId` começa por `readaptacao.`) ou nas semanas 1 a 3 de um programa com essas fases.

### 8. rir.leitura: não está no app, e a frase dá a entender que está

- **Regra:** "Leitura do RIR relatado: as pessoas subestimam ~1 repetição"; valores: "RIR relatado ±1 (2 ≈ 2–3); acima de ~12 repetições, menos confiável (a calibração usa passos pequenos)".
- **Frase:** "As pessoas informam cerca de 1 repetição de reserva a menos do que têm, e **o app lê o número com essa margem (2 vale 2–3)**."
- **Código:** o RIR informado é usado ao pé da letra: `x.rir <= a.rir[1]` (`src/domain/progressao/index.ts:194`), `s.rir <= RIR.serieEfetivaMax` (`:393`), `const rr = s.reps + s.rir` (`src/domain/progressao/calibracao.ts:55`). Não achei nenhuma soma, margem ou faixa aplicada ao número. A única parte da regra que roda é o limiar de 12 da calibração (`calibracao.ts:32, 75`: acima de 12, passos em vez da fórmula).
- **Exemplo:** alvo 1–2, todas as séries no topo com RIR 3 informado: não sobe (3 > 2), embora pela frase "3" pudesse valer 3–4 ou, na outra direção, "2" valer 2–3. Nenhum dos dois casos tem tratamento.
- **Conserto:** trocar "o app lê o número com essa margem" por algo como "por isso o acerto da carga usa passos pequenos acima de 12 repetições".
- As duas frases de tela ligadas a essa regra (`src/features/entenda/Entenda.tsx:340-343` e `src/features/programa/ComoLer.tsx:33-35`) não prometem nada: só explicam o que é RIR.

### 9. progressao.criterios-invalidos: não está no app, e a frase não deixa claro

- **Regra:** "repetições com amplitude encurtada ou embalo não contam; dor muscular tardia (DOMS) nunca é gatilho".
- **Frase:** "Repetições com amplitude encurtada ou com embalo não contam. A dor muscular tardia [...] nunca entra na decisão de progredir."
- **Código:** o domínio tem o filtro (`amplitudeCompleta !== false` em `src/domain/progressao/index.ts:191, 194, 393` e `src/domain/acompanhamento/evolucao.ts:35`), mas nenhuma tela grava `amplitudeCompleta`: a busca em `src/features` não acha o campo, e a série montada em `Treino.tsx:765-766` só tem carga, repetições, RIR e quedas. O caminho é morto. A dor tardia nunca é perguntada, então de fato nunca é gatilho.
- **Exemplo:** 12 repetições com meia amplitude registradas como 12: contam para subir a carga e para as séries da semana.
- A frase de `src/features/entenda/Entenda.tsx:298` ("Conta a série com até 4 repetições de reserva **e amplitude completa**") também dá a entender que o app separa uma da outra.
- **Conserto:** a frase dizer que cabe à pessoa não contar essas repetições ao registrar.

### 10. rir.calibracao: não está no app, e a frase deixa claro

- A regra e a frase dizem "Ainda não está no app". Não há código, e nada na tela promete o teste. Sem conserto.

## Observações menores (não entraram como divergência)

- **progressao.subir, "todas as séries":** o código olha só as séries registradas (`progressao/index.ts:193-197`, `s.series.every`), sem saber quantas foram prescritas. Rodado: 1 série de 12 em cada uma de 2 sessões (de 3 prescritas) → `subir`. A regra não diz se "todas" são as prescritas ou as feitas.
- **progressao.subir, "volta ao fundo da faixa":** nada no app diz isso depois de subir; o motivo é "suba a carga", e as repetições da série seguinte vêm preenchidas com as da última vez (`Treino.tsx:735`), isto é, o topo.
- **progressao.salto-grande, "voltar":** o código manda voltar à carga anterior em qualquer subida em que a 1ª série fica abaixo do mínimo, não só em salto acima de 10% (`progressao/index.ts:246`; rodado com 20 → 21 kg). É mais amplo que a regra, sem contradizê-la.
- **progressao.negativa-para-barra, "mínimo da faixa":** o motivo usa o mínimo da faixa da descida ("não chegar a 3 repetições completas", `progressao/index.ts:310`, e o teste `tests/unit/escadas.test.ts:99` fixa o 3). A faixa da barra fixa é 5–10. A regra não diz de qual faixa é o mínimo.
- **progressao.degrau-inicial, texto da regra:** diz "leve demais sobe 2 degraus, `progressao.carga-leve`". Em `carga-leve`, o degrau sobe só 1 (os 2 incrementos são só em kg, `progressao/index.ts:287`; rodado: degrau 0 com topo + 5 → degrau 1). Os 2 degraus existem, mas na calibração da 1ª vez (`calibracao.ts:79`). A frase não repete isso.
- **progressao.incremento.maquina-anilha, "salvo se o peso do trenó for informado":** não existe campo para informar o peso do trenó (nada em `taxonomia/equipamentos.ts`, `Inventario.tsx`, `Locais.tsx`). A frase "Sem o peso do trenó, o acerto da carga vai por passos" é sempre o caso.
- **registro.treino-feito:** se todos os exercícios forem encerrados (por dor) sem nenhuma série, "Terminar treino" encerra direto, sem oferecer "Descartar" ou "Guardar mesmo assim" (`Treino.tsx:190`: `itens.every(... || t.feito.interrompido) ? terminar()`). Caso raro; o treino guardado não conta, como a regra pede.
- **cadencia.repeticao:** "o programa pede" vale para parte dos cartões (48 de 171 falam em 2 a 3 s; 78 falam em controle); o limite de 10 s só está na frase.
- **deload.semana-leve, carência depois da semana leve:** conta 7 + 21 dias a partir do início (`semana-leve.ts:99`), mesmo quando a pessoa tocou "Voltar ao normal" antes do 7º dia.
