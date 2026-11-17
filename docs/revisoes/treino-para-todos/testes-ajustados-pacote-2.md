# Pacote 2: testes de comportamento ajustados ao programa de agora

Data: 15/11/2026. Base: commit `2c168f8` (as três regras de escolha já aplicadas). Nada foi commitado.

## Resultado

- **18 testes de comportamento ajustados**, em 8 arquivos de `tests/unit/`. Todos passam.
- **0 testes deixados falhando de propósito** entre os de comportamento: em nenhum deles o comportamento protegido se perdeu.
- **8 testes de registro (snapshot) continuam falhando**, como pedido, sem nenhuma alteração: `gerador.test.ts` (bruno, ana, carla), `personas-r2.test.ts` (Ana, Carla, Bruno), `locais.test.ts` (os 4 dias do Bruno na academia do bairro) e `preferencia.test.ts` (o dia da Carla com "prefiro o leg press").
- `npx vitest run`: 8 falhas (as 8 de snapshot), 966 passam. `npx eslint tests` e `npx tsc --noEmit -p .`: limpos.
- Não mexi em `src/`, `docs/`, `scripts/`, `tests/personas/` nem em `tests/unit/__snapshots__/`. Sem `-u`, sem `.skip`, sem `.todo`, nenhum `expect` apagado.

Arquivos alterados: `tests/unit/pausa.test.ts`, `locais.test.ts`, `sessao.test.ts`, `gerador-r5a.test.ts`, `gerador.test.ts`, `avaliador.test.ts`, `acompanhamento.test.ts`, `ler-export.test.ts`.

## O que mudou nos programas das personas (a causa de tudo)

| Persona | Dia | Antes | Agora |
|---|---|---|---|
| Bruno | Superior A | `puxada-unilateral`, `remada-apoiada`, `crucifixo-invertido-polia` | `puxada-barra-reta`, `remada-baixa`, `face-pull` |
| Bruno | Inferior A | `bulgaro`, `panturrilha` | `goblet`, `panturrilha-bilateral-step` |
| Bruno | Superior B | `remada-baixa`, `desenvolvimento-unilateral`, `elevacao-lateral`, `rosca-polia-costas`, `face-pull` | `remada-apoiada`, `desenvolvimento`, `elevacao-halteres`, `rosca-inclinada`, `crucifixo-invertido-polia` |
| Bruno | Inferior B | `stiff-unilateral` | `stiff` |
| Ana | Corpo todo A | `bulgaro` (15 séries no dia) | `goblet` (17 séries no dia: o exercício de dois lados leva menos tempo, e sobram séries) |
| Carla | Superior | `puxada-unilateral`, `remada-apoiada` | `puxada-frente`, `remada-baixa` |

## Testes ajustados

### `tests/unit/pausa.test.ts`

**1. `os casos P1 a P9 do T6 > P6: Ana treinou a semana 1 (aprendizado) e ficou 10 dias sem treinar → volta na semana 2, ainda no aprendizado, com RIR 3–4`**
- Prova: 10 dias parada não tiram a Ana da fase de aprendizado (semana 2, RIR 3–4, menos séries que o programa completo).
- Quebrou porque: o total de séries do Corpo todo A era fixado. `bulgaro` → `goblet`, e o dia foi de 15 para 17 séries (4, 2, 2, 2, 4, 3); na fase de aprendizado, de 13 para 14 (cada exercício × 0,75, arredondado: 3, 2, 2, 2, 3, 2; conferido à mão).
- Mudei: `toBe(13)` → `toBe(14)` e `toBe(15)` → `toBe(17)`, com a linha do histórico no comentário, como nas mudanças anteriores.
- Intenção: igual. As outras verificações (semana, fase, RIR) não mudaram.

**2. `os casos P1 a P9 do T6 > P9: polia na placa 8, 30 dias → 8 × 0,9 = 7,2 → placa 7`**
- Prova: na volta de 30 dias, a carga da polia cai 10% e arredonda para baixo, em placas.
- Quebrou porque: o exemplo de polia do Superior A era `puxada-unilateral`; agora é `puxada-barra-reta` (também de polia).
- Mudei: só o id do exercício.
- Intenção: igual.

**3. `pausas com vários locais > o Bruno volta de 30 dias na academia do bairro: a máquina parte da última carga daquele local −10%; o halter, da última em qualquer local`**
- Prova: na volta, a máquina usa a carga daquele local e o halter usa a última de qualquer local (10 kg × 0,9 = 9 → 8 kg, com halteres de 2 em 2 kg).
- Quebrou porque: o exemplo de halter do Inferior A era `bulgaro`; agora é `goblet` (também com halter).
- Mudei: o id e o nome da variável.
- Intenção: igual.

**4. `pausas com vários locais > uma máquina sem registro naquele local recomeça pela calibração da 1ª série, que só desce na semana 1 da volta`**
- Prova: polia nunca usada num 3º local recomeça pela calibração, sem levar a carga do prédio.
- Quebrou porque: `puxada-unilateral` → `puxada-barra-reta`.
- Mudei: só o id.
- Intenção: igual.

### `tests/unit/locais.test.ts`

**5. `local.treino-do-dia: o Bruno faz o Superior A na academia do bairro > cada exercício de polia troca pelo equivalente possível ali, com o motivo verdadeiro`**
- Prova: num local sem polia, cada exercício de polia do dia troca pelo equivalente possível, e o motivo diz o que falta.
- Quebrou porque: o Superior A tem agora 5 exercícios de polia, e não 4: `puxada-barra-reta` (antes `puxada-unilateral`), `remada-baixa` (antes `remada-apoiada`, que não precisava de troca), `face-pull` (antes `crucifixo-invertido-polia`).
- Mudei: a lista esperada, com igualdade exata, passou a ter as 5 trocas de agora (`puxada-barra-reta → barra-fixa`, `remada-baixa → remada-apoiada`, `triceps-frances → triceps-frances-halter`, `crucifixo-polia → crucifixo-halteres`, `face-pull → crucifixo-inverso`), e o motivo da 1ª troca usa o nome do exercício de agora.
- Intenção: igual; o teste confere uma troca a mais.

**6. `sem equivalente no local (selecao.dia-sem-principal) > motivo verdadeiro: quando o único equivalente possível já está no treino de hoje, o aviso diz isso (auditoria, achado 10)`**
- Prova: quando a única remada possível no local já entrou no dia (no lugar da puxada), o aviso da vaga da remada diz isso, e não "nenhum equivalente".
- Quebrou porque: a vaga de remada do Superior A do cenário era `remada-apoiada`; agora é `remada-baixa`.
- Mudei: o id da vaga nas duas buscas e nos comentários. O cenário é o mesmo: a remada curvada entra no lugar da puxada, e a vaga da remada recebe a rosca com o motivo "o único equivalente possível aqui (remada curvada com halteres) já está no treino de hoje".
- Intenção: igual; todos os `expect` ficaram.

**7. `segurança e preferência nas trocas > Carla num local sem rack: sem preferência entra o leg press (ordem de referência da função); com "prefiro o hack", o hack`** (antes: `... entra o hack (ordem alfabética); com "prefiro o leg press", o leg press`)
- Prova: na troca de local, a preferência da pessoa vence o desempate padrão, e o porquê cita `selecao.preferencia`.
- Quebrou porque: sem preferência, entrava `hack` (ordem alfabética); agora entra `leg-press` (ordem de `funcoes.json`).
- Mudei: o padrão esperado é `leg-press`. Como "prefiro o leg press" deixaria de provar alguma coisa (ele já entra sozinho), a preferência do exemplo passou a ser `hack`. Nome do teste atualizado.
- Intenção: igual; a preferência continua sendo testada contra o padrão, com os papéis dos dois exercícios trocados.

**8. `progressao.troca-equivalente: ... > o mesmo dia nos dois locais; na academia do bairro, as trocas ficam registradas com o exercício do programa`**
- Prova: o histórico guarda cada troca com o exercício do programa (`noLugarDe`).
- Quebrou porque: as mesmas trocas do item 5.
- Mudei: a lista esperada (as 5 trocas de agora), com igualdade exata.
- Intenção: igual.

**9. `... > a barra fixa, 1ª vez, começa pela calibração; o exercício da polia, de volta ao prédio, segue de onde parou`**
- Prova: exercício novo calibra; o da polia, de volta ao local de origem, não recalibra.
- Quebrou porque: `puxada-unilateral` → `puxada-barra-reta`.
- Mudei: só o id.
- Intenção: igual.

**10. `... > máquina de outro local: a puxada feita no prédio, numa polia de outra academia, recomeça pela calibração`**
- Prova: a polia de outro local recomeça pela calibração, e o histórico do prédio fica inteiro.
- Quebrou porque: `puxada-unilateral` → `puxada-barra-reta`.
- Mudei: o id, nas 3 ocorrências.
- Intenção: igual.

**11. `... > a 1ª vez de um exercício equivalente diz qual a pessoa já faz, sem mostrar a carga dele`**
- Prova: o motivo cita o exercício que a pessoa já faz, sem placa nem kg.
- Quebrou porque: o texto começava com "Você já faz puxada unilateral"; agora, "Você já faz puxada ajoelhado na polia alta com barra reta".
- Mudei: o texto esperado.
- Intenção: igual.

### `tests/unit/sessao.test.ts`

**12. `guia com a prescrição da pessoa (R1) > na fase de aprendizado da Ana (semanas 1–2), o goblet vem com RIR 3–4 e menos séries; depois, o programa completo`** (antes: `... o búlgaro vem ...`)
- Prova: o guia mostra a prescrição da fase (RIR 3–4, menos séries) e, da 3ª semana em diante, a do programa.
- Quebrou porque: o exemplo era o 1º exercício do dia A da Ana, `bulgaro`; agora é `goblet`.
- Mudei: o id, o nome da variável, o nome do teste e o comentário.
- Intenção: igual.

**13. `guia com a prescrição da pessoa (R1) > na troca pela alternativa, vale a vaga (séries, RIR, descanso) com as repetições da alternativa`**
- Prova: na troca pela alternativa, séries, RIR e descanso vêm da vaga; nome, repetições, lado e animação vêm da alternativa.
- Quebrou porque: `bulgaro` → `goblet`.
- Mudei: o id. Além disso, a alternativa do exemplo deixou de ser `alternativas[0]` e passou a ser a 1ª alternativa do outro lado (`afundo-peso-corpo`). Com o búlgaro (um lado) e a 1ª alternativa dele (dois lados), o teste pegava um erro no campo `unilateral`; com o goblet e a 1ª alternativa dele, os dois são de dois lados e essa verificação ficaria sem efeito.
- Intenção: igual, com a mesma força de antes.

Também troquei `bulgaro` por `goblet` no teste vizinho, que já passava (`dia ou exercício fora do programa: sem prescrição`): ele pede um exercício do programa num dia que não existe, e o búlgaro deixou de ser do programa.

### `tests/unit/gerador-r5a.test.ts`

**14. `R5a: ajustes do gerador > selecao.funcao-da-vaga: um afundo por dia, havendo outra opção (o búlgaro na vaga de agachar não ganha um afundo ao lado)`**
- Prova: com o búlgaro na vaga de agachar, a vaga vazia da extensora não recebe outro afundo (recebe o goblet).
- Quebrou porque: no caso medido (condomínio, intermediário, Superior/Inferior), a vaga de agachar era do `bulgaro`; agora é do `goblet`. Com isso a vaga da extensora recebe `afundo-tras`, que é o único afundo do dia. A regra continua valendo (o laço sobre a amostra inteira, "no máximo 1 afundo por dia", passa), mas o caso deixou de ter o búlgaro.
- Mudei: o perfil do caso ganhou `preferidos: { agachar: 'bulgaro' }`, que põe o búlgaro de volta na vaga de agachar. Os dois `expect` ficaram como eram (contém `bulgaro` e `goblet`; não contém `afundo-tras`) e passam.
- Intenção: igual; o cenário é montado com "prefiro este".

### `tests/unit/gerador.test.ts`

**15. `regras do R0b no gerador > rir.carga-baixa: multiarticular do iniciante com 15 repetições ou mais (meio da faixa) fica com reserva 1–2 a partir da 3ª semana ...`**
- Prova: a ponte com halter (10–20) fica com reserva 1–2; um multiarticular de 8–12 repetições não muda (2–3).
- Quebrou porque: o exemplo de "não muda" era `bulgaro` (8–12), que saiu do programa da Ana.
- Mudei: o exemplo passou a ser `afundo` (também 8–12, multiarticular, no Corpo todo C da Ana).
- Intenção: igual.

### `tests/unit/avaliador.test.ts`

**16. `avaliador: equilíbrios, tempo e ordem > tempo.corte: acima de 110% com corte possível é ajustar ...; sem corte, limite`**
- Prova (a parte que quebrou): dia acima do tempo sem corte possível é "limite", com o texto "o que ficou segura o mínimo de cada músculo".
- Quebrou porque: o exemplo era o intermediário de 2 dias de 30 min na academia, com um dia de 34 min. Com `puxada-frente` e `panturrilha-bilateral-step` no lugar dos exercícios de um lado só, esse dia cabe nos 30 min e não há mais achado de tempo.
- Mudei: o mesmo perfil com 20 min (`daGrade('intermediario', 2, 20)`): o Corpo todo A fica com ~28 min, sem corte possível. Comentário atualizado.
- Intenção: igual; o `expect` é o mesmo.

### `tests/unit/acompanhamento.test.ts`

**17. `a semana em vários locais > conta o treino feito em qualquer local, inclusive o exercício que entrou na troca de local (a barra fixa no lugar da puxada)`**
- Prova: a semana soma as séries dos dois locais, inclusive as do exercício que entrou na troca.
- Quebrou porque: a barra fixa entrava no lugar de `puxada-unilateral`; agora, de `puxada-barra-reta`.
- Mudei: só o id.
- Intenção: igual.

### `tests/unit/ler-export.test.ts`

**18. `a leitura do export (scripts/export/ler-export.ts) > conta treinos, sugestões, "estagnado" e semana leve de um histórico parado`**
- Prova: o script conta certo treinos, sugestões, estagnados e semanas com a semana leve sugerida, num histórico de 4 semanas sem progresso.
- Quebrou porque: esperava 2 semanas com a semana leve sugerida; agora são 3. `puxada-barra-reta`, `desenvolvimento` e `rosca-inclinada` estão nos dois dias de Superior do Bruno, chegam ao 3º treino parado já na 2ª semana, e a sugestão (2 ou mais estagnados) aparece da terça da 2ª semana em diante. Antes, cada exercício do Superior aparecia 1 vez por semana, e a sugestão vinha da 3ª semana. Conferi treino a treino, com o código de antes e o de agora.
- Mudei: `toBe(2)` → `toBe(3)` e o comentário.
- Intenção: igual; o script conta certo. O número mudou por um efeito das regras novas que vale a atenção do Gustavo (abaixo).

## Testes deixados falhando de propósito

Nenhum dos de comportamento. Só os 8 de snapshot, que aguardam a aprovação do Gustavo.

## Para a revisão do Gustavo

1. **A semana leve chega uma semana mais cedo para o Bruno.** Os dois dias de Superior dele repetem agora 4 exercícios (`puxada-barra-reta`, `desenvolvimento`, `rosca-inclinada`, `elevacao-halteres`); antes, só `elevacao-halteres`. Quem não progride chega aos "3 treinos sem progresso" na 2ª semana, e não na 3ª. É consequência da regra de dois lados somada à ordem de referência; ninguém pediu esse efeito.
2. **O dia de 30 min do intermediário de 2 dias na academia deixou de passar do tempo** (34 → 30 min). É um efeito bom, mas tirou o exemplo do teste 16.
3. **Um nome de teste que já passava ficou desatualizado e eu não mexi**: `tests/unit/preferencia.test.ts`, linha 15, `Carla: sem preferência, a vaga de agachar fica com o agachamento livre (ordem alfabética entre 4 sem animação)`. O resultado continua certo (`agachamento-barra` é o 1º da lista da função), mas o motivo no nome agora é a ordem de referência. Não estava na lista de arquivos a ajustar.
4. **Três testes lentos estouraram o limite de 5 s numa das minhas rodadas completas** (`propriedade do R1` em `gerador.test.ts`, `equipamento-minimo.test.ts` e `os pesos da população somam 1` em `prototipo-treino-para-todos.test.ts`). Não mexi neles. A máquina estava com os 4 núcleos ocupados por `scripts/auditoria/retrato.ts` (4 partes em paralelo, de outro processo); na rodada seguinte os três passaram.

## Como conferi

- Programa de cada persona impresso com o código de antes (`88df3de`, exportado para a pasta de rascunho) e com o de agora.
- Para os casos menos diretos (6, 7, 14, 16, 18), rodei o cenário com os dois códigos e comparei as trocas, os motivos e as sugestões.
- Rodada final: `npx vitest run` com 8 falhas (só snapshots), `npx eslint tests` e `npx tsc --noEmit -p .` limpos. `git status`: só os 8 arquivos de teste modificados.
