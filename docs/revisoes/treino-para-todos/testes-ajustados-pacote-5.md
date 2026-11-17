# Pacote 5: testes ajustados à janela de estagnação por nível (16/11/2026)

Arquivos editados: `tests/unit/semana-leve.test.ts` e `tests/unit/ler-export.test.ts`. Nada mais foi tocado
(`tests/unit/apoio-treino.ts` não precisou de mudança). Sem commit.

Resultado: `npx vitest run tests/unit/semana-leve.test.ts tests/unit/ler-export.test.ts` → 14 de 14 passam;
`npx eslint` nos dois arquivos → limpo; `tsc -b --noEmit` sem erro nesses dois arquivos.

Nenhum `expect` foi apagado ou afrouxado, e não há `.skip`/`.todo`. Houve um acréscimo (controle no S2).

Persona: todos os 7 testes usam o Bruno, que é intermediário (`tests/personas/index.ts`): janela de 8 sessões do
mesmo exercício.

## Um teste por vez

### 1. `semana-leve` · "S2: 2 exercícios estagnados → sugere, com o motivo"
- **Prova:** com 2 ou mais exercícios estagnados, a semana leve é sugerida, com o motivo, o texto e a regra.
- **Antes → agora:** 3 semanas paradas, conferido no dia 21, motivo "em 3 treinos" → 8 semanas paradas, conferido no
  dia 56, motivo `/^\d+ exercícios sem progresso em 8 treinos$/`.
- **Acréscimo (controle):** com 3 semanas paradas (o cenário antigo), `sugerir` é `false` e `motivos` é `[]`. Esse
  controle pega um erro que o cenário de 8 semanas não pega: o texto "em 8 treinos" e a contagem dos estagnados recebem
  a janela por caminhos separados em `semanaLeveDeHoje`.
- **Intenção:** igual.

### 2. `semana-leve` · "S5: 2 exercícios estagnados na semana 2 depois de uma volta de pausa → não sugere"
- **Prova:** o sinal de estagnação existe (`motivos.length > 0`), mas, nas 3 semanas depois da volta de uma pausa, a
  carência segura a sugestão; na semana 4 do bloco, ela aparece.
- **Antes → agora:** depois da pausa, 2 semanas normais (4 treinos cada) mais 1 treino, conferido no dia 50 → depois da
  pausa, 16 dias seguidos de treino no rodízio dos 4 dias (dias 35 a 50), conferido no dia 51. A carência acabando:
  antes, mais 1 semana normal e conferência no dia 63 → agora, o rodízio segue até o dia 55 e a conferência é no dia 56.
- **Por que mudou a ordem dos eventos:** depois de uma pausa, a estagnação só conta as sessões do bloco novo. Com 4
  treinos por semana, a puxada e o abdominal (2 vezes por semana) só chegam à 8ª sessão no fim da semana 4 do bloco,
  quando a carência já acabou. Alongar o histórico não cabia; foi preciso pôr 8 sessões em 3 semanas.
- **Não passa no vazio:** os mesmos `expect` de antes continuam (bloco aberto por pausa, semana 3, motivos > 0,
  carência `true`, `sugerir` `false`, e `sugerir` `true` na semana 4). No dia 51 o motivo é "2 exercícios sem progresso
  em 8 treinos".
- **Intenção:** igual, mas o cenário ficou artificial (treinar 16 dias seguidos). Ver "Efeitos reais", item 3.
- **Alternativa que não usei:** trocar o Bruno pelo "Bruno iniciante" (janela de 4), como o teste da fase de aprendizado
  já faz. O cenário ficaria realista (4 treinos por semana), mas deixaria de testar o intermediário. Se preferirem, a
  troca é simples.

### 3. `semana-leve` · "é manual: só começa com o aceite, vale 7 dias, …"
- **Prova:** a sugestão aparece, o aceite não muda o programa salvo, a semana leve vale 7 dias com metade das séries e
  RIR 3–4, e o treino feito nela fica marcado.
- **Antes → agora:** `parado()` de 3 semanas, `n = 21`, `ate: '2026-11-01'` → `parado()` de 8 semanas, `n = 56`,
  `ate: '2026-12-06'` (aceite em 30/11, 7º dia em 06/12).
- **Intenção:** igual.

### 4. `semana-leve` · "\"Voltar ao normal\" encerra antes; \"Agora não\" esconde a sugestão por 7 dias, …"
- **Prova:** encerrar a semana leve antes do fim; 3 semanas sem sugerir depois dela; "Agora não" esconde por 7 dias,
  mesmo com um treino no meio, e a sugestão volta no 7º dia.
- **Antes → agora:** `n = 21` → `n = 56` (só isso; o `parado()` é o de 8 semanas).
- **Não passa no vazio:** conferi à parte que, sem a recusa, a sugestão apareceria nos dias `n + 2` e `n + 6` (18
  exercícios estagnados depois do Superior A). O próprio teste fecha o controle com `n + 7 → true`.
- **Por que 8 semanas, e não 4:** com 4 semanas, o Bruno tem exatamente 2 estagnados, e um deles (a puxada) deixa de
  contar depois de um Superior A. O "esconde" passaria no vazio e o `n + 7 → true` falharia. Ver "Efeitos reais", item 2.
- **Intenção:** igual.

### 5. `semana-leve` · "as sessões da semana leve ficam fora da dupla progressão: …"
- **Prova:** os 4 treinos feitos na semana leve ficam marcados, e a estagnação de antes continua valendo.
- **Antes → agora:** aceite no dia 21, treinos em 21 + k, conferência no dia 26 → aceite no dia 56, treinos em 56 + k,
  conferência no dia 61. Comentário: "os 3 treinos de antes" → "os 8 treinos de antes".
- **Intenção:** igual. Ver "Achados fora do pedido", item B (o último `expect` já era pouco discriminante).

### 6. `semana-leve` · "a estagnação conta o exercício feito no lugar da vaga (noLugarDe), e não a vaga que ninguém fez"
- **Prova:** (1) vagas paradas, mas a pessoa passou a fazer a alternativa e está subindo: nada estagnado; (2) a
  alternativa parada, com a vaga nunca feita: conta.
- **Antes → agora:**
  - sessões paradas nos dias 0, 2, 4 → 8 sessões, nos dias 0, 2, …, 14;
  - sessões da alternativa nos dias 8, 10, 12 → 8 sessões, nos dias 16, 18, …, 30;
  - motivo "2 exercícios sem progresso em 3 treinos" → "… em 8 treinos" (igualdade exata mantida, nos dois lugares);
  - a alternativa subindo: +1 repetição por sessão (3 sessões) → +1 a cada 2 sessões (`Math.floor(k / 2)`, 8 sessões).
    Com +1 por sessão, a barra fixa (faixa 5–10) passaria do topo e a sugestão sairia por outro ramo ("subir"). Assim,
    o "nada estagnado" vem da regra de estagnação;
  - "hoje": `h.length > 3 ? 14 : último + 2` → sempre `último + 2`. Nos três usos antigos o valor já era esse.
- **Não passa no vazio:** se o código contasse a vaga (parada há 8 sessões) em vez da alternativa, o caso 1 daria
  "2 exercícios…" e falharia.
- **Intenção:** igual.

### 7. `ler-export` · "conta treinos, sugestões, \"estagnado\" e semana leve de um histórico parado"
- **Prova:** o leitor do export refaz, treino a treino, o que o app mostrou: conta treinos, semanas, sugestões por
  tipo, exercícios estagnados e semanas com a semana leve sugerida.
- **Antes → agora:** `quatroSemanasParado()` → `oitoSemanasParado()`.

  | Verificação | Antes | Agora |
  |---|---|---|
  | `treinos` | 16 | 32 |
  | `semanasComTreino` | 4 | 8 |
  | `semanasComSemanaLeveSugerida` | 3 | 4 |
  | texto do resumo | "Treinos feitos: 16 em 4 semanas" | "Treinos feitos: 32 em 8 semanas" |

  Ficaram iguais: `semSerie` 0, a soma das sugestões igual ao total de exercícios feitos, `estagnado > 0` (o valor é
  12) e `exerciciosEstagnados >= 2` (o valor é 2: puxada com barra reta e abdominal na polia). O comentário foi reescrito.
- **Intenção:** igual. O `>= 2` passa no limite: os exercícios feitos 1 vez por semana só recebem "estagnado" na 9ª
  sessão (o leitor avalia antes de cada treino). Com 9 semanas seriam 19 exercícios e 5 semanas sugeridas.

## Efeitos reais que notei (Bruno, intermediário, tudo parado, 4 treinos por semana)

1. **A semana leve passa a ser sugerida no fim da 4ª semana** (antes, na 2ª). São só 2 exercícios, os que entram em
   dois dias: a puxada com barra reta e o abdominal na polia. Os exercícios feitos 1 vez por semana só chegam à 8ª
   sessão no fim da 8ª semana; aí o motivo passa a "19 exercícios sem progresso em 8 treinos". Com a janela de 3, eram
   18 estagnados já no fim da 3ª semana.

2. **Da 5ª à 7ª semana a sugestão pisca dentro da semana.** A puxada tem 3 séries no Superior A e 2 no Superior B, e a
   regra compara o total de repetições da sessão: 30, 20, 30, 20… Quando a janela de 8 começa num Superior B (20), o
   Superior A seguinte (30) conta como "ganho", e a puxada sai dos estagnados. Sobra 1 estagnado, e a sugestão some
   depois do Superior A e volta depois do Superior B. O mecanismo já existia com a janela de 3 (18 ou 19 exercícios),
   mas não mudava a sugestão. Agora muda, enquanto só 2 exercícios estão no limite. Vale para qualquer exercício com
   número de séries diferente entre os dias. Não mexi em `src/`.

3. **Depois de uma volta de pausa, a carência de 3 semanas deixou de fazer diferença para a estagnação do
   intermediário.** O bloco novo zera a contagem, e 8 sessões de um exercício feito até 2 vezes por semana levam 4
   semanas. No programa do Bruno, só a elevação com halteres entra 3 vezes por semana, e 1 exercício não basta. Por
   isso o S5 precisou de 16 dias seguidos de treino. A carência segue valendo para "pesado demais" e para a dor, e para
   o iniciante (janela de 4: exercício 2 vezes por semana chega lá em 2 semanas). Para o avançado (16), menos ainda.

4. **No export fictício de 8 semanas:** "estagnado" 12 vezes, em 2 exercícios, no máximo 8 seguidos no mesmo; semana
   leve sugerida em 4 das 8 semanas (da 5ª à 8ª). Com 4 semanas de histórico: nenhum "estagnado", nenhuma semana
   sugerida.

## Achados fora do pedido (não alterei; os dois já eram assim antes do pacote 5)

A. **"na fase de aprendizado do iniciante, nem semana leve nem \"estagnado\"…"** (passa; não estava na lista). O
   `expect(sug.acao).not.toBe('estagnado')` olha o 1º exercício do Superior A (supino reto), que só tem 2 sessões em 2
   semanas. Ele não seria "estagnado" nem fora da fase de aprendizado, com a janela de 4 ou com a de 3: essa linha passa
   no vazio. Conserto de uma linha: usar `exercicios[1]` (puxada com barra reta, 4 sessões). Conferi que ela dá
   "manter" na fase de aprendizado e "estagnado" sem a opção `aprendizado`. O resto do teste está firme: no dia 13 o
   motivo é "10 exercícios sem progresso em 4 treinos" com carência, e no dia 21 a sugestão aparece.

B. **"as sessões da semana leve ficam fora da dupla progressão"**: o último `expect` não distingue "a leve ficou de
   fora" de "a leve contou". Tirei a marca `semanaLeve` das 4 sessões leves e o motivo continuou igual ("19 exercícios
   sem progresso em 8 treinos"): a sessão leve tem a mesma carga e menos repetições, então nunca parece ganho. Para
   provar a exclusão, o teste teria de pôr um treino normal depois da semana leve.
