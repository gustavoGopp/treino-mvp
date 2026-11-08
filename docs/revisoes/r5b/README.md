# R5b: o avaliador e o porquê (07/11/2026)

> Branch `claude/compassionate-curie-0nqhyc`, a partir da `main` `b92fa13`. O R5a, o R5-CL, o R5d e o R5-anim **ainda não vieram**: por isso as 3 correções do gerador que o avaliador achou entraram aqui, como o prompt pedia. O estado guardado não mudou de versão (continua 7). As medidas completas, geradas por script, estão em `medidas.md`; a auditoria inteira, em `../qualidade/grade.md` (seção "O avaliador (R5b)"). Dados fictícios.

## Em uma olhada

- **O avaliador existe** (`src/domain/avaliador/`): recebe qualquer programa feito com exercícios da biblioteca (o gerado, um digitado, depois um editado), o perfil e o local, e devolve "está bom" ou os achados, cada um com a regra, o selo, a gravidade e o fato + o que fazer. Os achados iguais saem numa linha só ("5 séries num exercício só" × 21 vira 1 linha com 7 exercícios, "nos 3 dias"). Só a segurança bloqueia.
- **Ele mede o gerador.** Na grade reduzida (5.850 programas), **80,8%** saem "está bom" (41,2%) ou "só limite" (39,6%); 0 achado de segurança; 0 alerta; 0 "ajustar" que o gerador não avise. Na amostra da grade inteira (com dor e exercício evitado), 87%.
- **Os 4 programas publicados** (Schoenfeld 2019 com 3 e 5 séries, Thomas e Burns 2016, Carneiro 2024, lidos de novo no PMC e digitados como dado de teste) dão os mesmos achados do protótipo: 6 a 10 séries num exercício só, posteriores e panturrilha sem série, dias de ~90 min em 60, uma função só no peito, nas costas e no quadríceps.
- **3 defeitos do gerador corrigidos:** o teto de 10 séries por treino agora conta as indiretas (85 → 0 programas); o glúteo ganha a extensão de quadril quando o stiff não é possível (155 → 1); a vaga de agachar não repete o afundo do dia (1.329 → 51). Os snapshots das 6 personas **não mudaram**.
- **Os avisos dizem o que fazer:** 20 de 20 nas personas (eram 2), inclusive "não precisa fazer nada" quando a causa é o equipamento, sem sugerir compra.
- **O porquê específico:** os 137 exercícios das personas dizem a função, o músculo, se é o foco, as séries ali e na semana, e por que ganharam das outras opções (eram 39% com algo além dos textos genéricos).
- **A Semana diz a meta do programa** quando ela fica abaixo da do nível: "quadríceps 2 de 8 · o seu programa planeja 6 de 8: falta tempo" (15 músculos nas personas; 5 antes sem explicação nenhuma).

## As decisões, com a medida

1. **Limiares** (decididos em 07/11, não reabertos): empurrar ÷ puxar acima de **1,5** é "ajustar" (`avaliador.equilibrio.empurrar-puxar`, consenso, `kolber2010`, `kolber2014`, `kolber2017`); quadríceps ÷ posteriores fora de **0,5 a 2**, ou sem nenhum exercício direto de posteriores, também (`avaliador.equilibrio.coxa`, consenso, `green2018`, `kubo2019`, `maeo2021`). As duas são as faixas D1 e D3 da régua da G5.
2. **A flexão em duas vagas conta como 2 funções do peito**, mas só quando é o exercício que a tabela de funções escolheria para a outra vaga com aquele equipamento. Medida: contando 1, um terço dos programas da grade reduzida (1.982 de 5.850, a maioria com a flexão, o supino reto e a remada unilateral) ganharia "uma função só"; em metade deles não há outro exercício possível, e no resto a 2ª vaga é o "2º empurrar" que a regra aprovada `selecao.peitoral-inclinado` pede (o isolador sozinho cresceu menos o peitoral). Com a regra da tabela: sem banco inclinável, o supino reto vale na vaga de inclinado; com banco inclinável, não (o avaliador sugere o supino inclinado). Teste: `avaliador.test.ts`, "decisão do R5b".
3. **Cinco gravidades** (`avaliador.gravidade`): segurança (bloqueia), alerta (forte, não bloqueia), ajustar, limite ("não precisa fazer nada"), informação. "Ajustar" só quando a pessoa consegue mudar com o que tem: uma série a mais que cabe nos minutos e nos tetos, um exercício novo num dia com espaço, uma troca de um exercício de músculos que já passaram da meta (nunca o único exercício direto de um músculo, pela `selecao.multi-mono`), ou passar séries de um músculo acima do máximo do nível. O dia mais longo que os minutos só é "ajustar" se dá para cortar séries sem deixar músculo abaixo do limiar e sem tirar um isolador obrigatório; senão é "limite".
4. **O que o gerador ainda não fazia vira aviso.** Quatro tipos de "ajustar" que o gerador não avisava (uma função só num músculo grande, a coxa, empurrar ÷ puxar, o isolador que faltou; ~8% da grade reduzida, quase todos com 30 min) agora entram nos avisos do programa, com o próximo passo que a pessoa consegue dar hoje: a rotina. Com 15 min a mais por treino, 80% somem (`medidas.md`, seção 2). Corrigir o gerador nesses casos é do R5a (o ajuste de 30 min) e do R5-CL (as proteções da coxa).
5. **A 3ª correção ficou no dia, não na semana.** Medida pela semana ("a vaga de agachar com um afundo e a semana com uma vaga de afundo"), o defeito apareceria em 31% dos programas, e corrigir mudaria um terço deles; pela tabela de funções, o búlgaro é legítimo na vaga de agachar. Ficou o que o protótipo descreveu: o mesmo dia com dois afundos.

## Regras novas e revistas (`docs/pesquisa/regras.md`; 146 no total)

| id | o quê | selo |
|---|---|---|
| `avaliador.gravidade` (nova) | as 5 gravidades; só a segurança bloqueia; agrupar; medir pela tabela de funções | consenso |
| `avaliador.equilibrio.empurrar-puxar` (nova) | ≤ 1,5 | consenso |
| `avaliador.equilibrio.coxa` (nova) | 0,5 a 2 e ≥ 1 exercício direto de posteriores | consenso |
| `selecao.complexidade-nivel` (nova) | o filtro de complexidade ganha id; o avaliador dá alerta | consenso |
| `selecao.agachar-e-afundo` (nova) | no dia com afundo, a vaga de agachar prefere um agachamento do mesmo nível | consenso |
| `volume.sessao.teto` (revista) | conta as indiretas pela metade | um estudo |
| `selecao.gluteo` (revista) | sem stiff possível, a extensão de quadril entra para todos | um estudo |
| `selecao.vaga-sem-equipamento` (revista) | a vaga vazia prefere um padrão de movimento novo no dia | consenso |
| `acompanhamento.mensagens` (revista) | fato + próximo passo também nos avisos do programa e do avaliador | consenso |

## O que mudou no código

- `src/domain/avaliador/` (novo): `avaliar`, `textoDaAvaliacao`, `avisosDoAvaliador`, `avisadoPeloGerador`; `complementos.json` (as funções que se complementam nos músculos grandes, validado com zod).
- `src/domain/gerador/index.ts`: `prescrever`, `ajustarParaForca` e `cabeNoTeto` exportados (a mesma saída em 27.245 programas antes das correções); as 3 correções; os avisos com o próximo passo; os avisos do avaliador; `porqueEspecifico`. `funcoes.json`: as lacunas ganham `proximo`.
- `src/domain/acompanhamento/semana.ts`: `planejadoDoMusculo` e o campo `planejado` de cada músculo.
- Telas (só texto, componentes de hoje): a dobra "Como está o seu programa" na tela do treino; a linha do músculo na Semana.
- Testes: `avaliador.test.ts` (36, cobertura de linhas 100% do avaliador), `avaliador-regua.test.ts` (a régua sobre o gerador), `correcoes-r5b.test.ts`, `mensagens.test.ts`, `porque.test.ts`, `semana-meta.test.ts`; `tests/publicados/` (os 4 programas, com a fonte); o e2e do corpo livre confere a dobra nova.
- Auditoria: a seção "O avaliador (R5b)" em `npm run auditoria:qualidade`; `scripts/auditoria/r5b.ts` escreve `medidas.md`; `scripts/auditoria/grade-reduzida.ts`.

## Pedidos à sessão de design

Os itens 7 a 9 de `proximos-passos.md`, seção 2.5, agora com o que o domínio entrega:

7. **"Como está o seu programa"**: hoje é uma dobra com os componentes atuais. O domínio entrega `avaliar(...)`: o veredito (4 valores, com frase), os achados por gravidade (cada um com regra, selo, texto e a lista dos itens agrupados) e a tabela por músculo (séries, meta, dias, funções). Pedido: em 1 linha "Está bom: nada a ajustar" quando for o caso; as superfícies "alerta" (segurança), "aviso" (ajustar) e "informação" (limite) do redesign; os itens agrupados com "ver todos" quando passam de 3; a tabela recolhida.
8. **A folha do exercício começa pelo porquê específico**: o domínio já põe o específico em 1º lugar; os genéricos (reps, RIR, descanso, alternativas) podem ficar recolhidos.
9. **A Semana com a meta do programa**: hoje é um texto ao lado do estado. O domínio entrega `planejado: { series, motivo }`. Pedido: a meta do programa como uma marca na barra, e o motivo em 1 toque.

## O que não entrou, e por quê

- **O editor e o "montar do zero"**: o próximo marco (rascunho em `../../prompts/sessao-monte-o-seu.md`).
- **"Pequenos: 2 exercícios se forem prioridade"** (`selecao.exercicios-por-musculo`): não virou achado, porque o gerador só faz isso no R5d (o 2º exercício do prioritário); hoje seria um "ajustar" em quase todo programa com foco em braços ou ombros.
- **O protótipo contava "dois afundos" pelo padrão de movimento**; o avaliador mede pela tabela de funções, como o prompt pedia, e o búlgaro na vaga de agachar é legítimo nela. A correção do gerador ficou no dia (decisão 5).
- **Velocidade:** o gerador agora chama o avaliador no fim (para os avisos): gerar um programa ficou ~1,6× mais lento (de ~1,6 ms para ~2,6 ms nas personas). A grade inteira da auditoria passa de ~15 para ~25 min.
