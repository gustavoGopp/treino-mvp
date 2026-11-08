# R5-anim: as animações dos 5 exercícios de corpo livre (07/11/2026)

Prompt: `docs/prompts/sessao-r5-animacao-corpo-livre.md`. Uma animação por vez, pelo ritual de `docs/pesquisa/animacoes/README.md`, com parada a cada folha para o "aprovar" do Gustavo. As poses ficam em `src/engine/exercicios/revisao/` e o texto do guia em `src/conteudo/revisao/`, fora do app até a aprovação. Nenhuma animação aprovada nem o motor mudaram.

| # | Animação (id da biblioteca) | Nos programas sem dor | Base aprovada | Folha | Medida | Situação |
|---|---|---|---|---|---|---|
| 1 | `panturrilha-degrau` | 81,8% | `panturrilha-b` (step) + `panturrilha-chao` (mãos na parede) | `folhas/panturrilha-degrau.png` | ik 0 (animação e 2 erros) | **aprovada em 07/11**; entra no app com o R5-CL |
| 2 | `abdominal-invertido` | 61,7% | `ponte-gluteo` (deitado, braços) + `abdominal-chao` + `elevacao-joelhos` (a pelve) | `folhas/abdominal-invertido.png` | ik 0 (animação e 2 erros) | **aprovada em 08/11**; entra no app com o R5-CL |
| 3 | `extensao-triceps-peso-corpo` | 59,4% | `triceps-suspensao` (corpo, ciclo e erros), mãos paradas numa bancada | `folhas/extensao-triceps-peso-corpo.png` | ik 0 (animação e 3 erros) | **aprovada em 08/11**, com a bancada; entra no app com o R5-CL |
| 4 | `abertura-t-deitado` | 56,1% | `flexao-joelho-elastico` (de bruços) + `yt-suspensao` (o T e os erros) | `folhas/abertura-t-deitado.png` | ik 0 (animação e 3 erros) | **aprovada em 08/11** (2ª versão, com as vistas pela cabeça e de cima); entra no app com o R5-CL |
| 5 | `flexao-pes-elevados` | 53,8% | `flexao` + a cadeira do `bulgaro-peso-corpo` | `folhas/flexao-pes-elevados.png` | ik 0 (animação e 3 erros) | **aprovada em 08/11**; entra no app com o R5-CL |

## Pré-requisito: o R5-CL ainda não está na `main`
O prompt supõe o R5-CL feito (os 32 exercícios na biblioteca, com cartão e ficha). Em 07/11 a `main` tem 139 exercícios e nenhum dos 5. O que isso muda:
- **Dá para fazer agora:** a ficha (escrita aqui, a partir de `16` e `17`), a pose, a checagem e a folha. É o que o Gustavo aprova.
- **Espera o R5-CL:** `node scripts/aprovar-animacao.mjs <id> <exercicio>` liga a animação ao exercício da biblioteca e falha se ele não existir; a medida da grade (dias com 3 ou mais cartões) depende dos 32 exercícios. A conferência "a ficha bate com o cartão" é feita quando o cartão existir.

## Peças de cena
Nenhuma peça nova até aqui. O degrau da escada é a caixa de 15 cm do step aprovado; a parede é a da panturrilha no chão; o colchonete é o da ponte de glúteo; a cadeira dos pés elevados é a do búlgaro com o peso do corpo.
- A bancada da cozinha (extensão de tríceps) é a mesma caixa do degrau e da parede, com 90 cm de altura: nenhum desenho novo no motor. O Gustavo aprovou assim em 08/11.

## Aprovações
- `panturrilha-degrau`: aprovada pelo Gustavo em 07/11/2026, como está na folha (as duas pernas, 1 s embaixo). Fica em `revisao/` até o R5-CL pôr o exercício na biblioteca; aí, `node scripts/aprovar-animacao.mjs panturrilha-degrau panturrilha-degrau` e a linha de base.
- `abdominal-invertido`: aprovada pelo Gustavo em 08/11/2026, como está na folha. Mesma espera pelo R5-CL.
- `extensao-triceps-peso-corpo`: aprovada pelo Gustavo em 08/11/2026, com a bancada desenhada como a caixa de 90 cm. Mesma espera pelo R5-CL.
- `abertura-t-deitado`: a 1ª folha (vista "por trás") ficou "muito esquisita" para o Gustavo; a 2ª, com as vistas pela cabeça, de cima e de lado, foi aprovada em 08/11/2026. Mesma espera pelo R5-CL.
- `flexao-pes-elevados`: aprovada pelo Gustavo em 08/11/2026, como está na folha (pés na cadeira do búlgaro). Mesma espera pelo R5-CL.

## O que a sessão verificou (08/11/2026)
- **As animações aprovadas não mudaram:** nenhum arquivo do motor fora de `revisao/` mudou em relação à `main`; a regressão visual (`npx playwright test --project=motor`) passa, com os 2 testes (o guia original e o estilo A); `node referencia/qa/check-motor.cjs check` limpo (0 falha de IK).
- `npm run check`: 670 testes passando. `npm run test:e2e`: 48 de 48.
- **Ensaio da ligação** (numa cópia descartável do repositório, fora do git): com os 5 exercícios na biblioteca como `16` os propõe e as 5 animações ligadas pelo script de aprovação, as duas linhas de base ganham só as 5 novas (todas com `ik=0`) e **nenhuma das antigas muda**; os testes de anatomia acharam 2 textos a acertar (o alvo da abertura em T e o "sentir" da flexão com os pés elevados), já acertados em `src/conteudo/revisao/`.

## Depois do R5-CL: o roteiro para ligar as 5
Quando os 5 exercícios estiverem na biblioteca (`src/domain/biblioteca/exercicios.json`), com os mesmos ids:
1. `for id in panturrilha-degrau abdominal-invertido extensao-triceps-peso-corpo abertura-t-deitado flexao-pes-elevados; do node scripts/aprovar-animacao.mjs $id $id; done` (move as poses e os textos para fora de `revisao/`, põe na lista `EX` e liga `animacaoId`). O texto do guia substitui o cartão de texto que o R5-CL escrever para esses 5 (apagar o cartão com o mesmo id).
2. **Os músculos que só ajudam** (desenhados listrados, como nas bases aprovadas): em `src/engine/estilo/musculos.ts` (`SO_AJUDA`), `'abdominal-invertido': ['obliquos']` e `'flexao-pes-elevados': ['retoAbdominal']`; em `scripts/auditoria/anatomia-regras.ts` (`AJUDANTES`), `'flexao-pes-elevados': ['abdomen']`. Na folha aprovada, esses dois músculos saíram laranja cheio, porque a lista só vale para animações ligadas; no app, saem listrados como no abdominal no chão e na flexão. É a única diferença.
3. `ATUALIZAR_NOVAS=1 ATUALIZAR_ESTILO_A=1 npx playwright test --project=motor` (grava a linha de base das 5) e, de novo, sem as variáveis, para conferir.
4. **Testes que mudam** (contam exercícios sem animação, ou listam exercícios à mão):
   - `tests/unit/anatomia.test.ts`, "achado 5": a lista dos isoladores de ombro de trás ganha `abertura-t-deitado` (se o R5-CL ainda não a acrescentou);
   - `tests/unit/legenda.test.ts`: passa com o passo 2 (falha sem ele);
   - `tests/unit/conteudo.test.ts`: os 5 deixam de ser cartão e passam a ser guia (o teste "todo cartão é de exercício sem animação" falha se o cartão do passo 1 não for apagado);
   - os snapshots das personas (`tests/unit/gerador.test.ts`, "cenários (snapshots revisados)", e `tests/unit/personas-r2.test.ts`): o gerador desempata pela animação aprovada (`selecao.equivalencia`), então os programas com esses 5 podem mudar; rodar `npx vitest run` antes de regravar e registrar o antes × depois, como no elástico (`../elastico/README.md`).
5. **Medir** a grade de qualidade com os 5 animados (os dias com 3 ou mais cartões nos programas sem dor; a meta é ≤ 20%, e 0% no corpo livre; o protótipo deu 19,5%) e as 6 personas.
6. `npm run check` e `npm run test:e2e`.
