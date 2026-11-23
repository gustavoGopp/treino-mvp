# Animações novas: como cada uma é feita e aprovada

> **Nota de 23/11/2026 (pacote D4).** O ritual abaixo é o do motor de antes (`src/engine/exercicios/`, `scripts/folha-animacao.mjs`), que foi apagado: as 171 animações do app estão no motor novo (`src/engine/novo/`), e a conferência de hoje é `npm run conferir:animacao` mais a regressão visual (`npx playwright test --project=motor`). O texto fica como registro de como as primeiras animações foram feitas; as fichas de técnica desta pasta continuam valendo.

O guia original tinha 25 animações. As outras 48 da biblioteca entram aqui, em lotes, sempre pelo mesmo ritual
(`CLAUDE.md`: precisão vale mais que quantidade; nada de animação improvisada).

1. **Pesquisa da técnica.** Uma ficha por exercício nesta pasta: posição inicial, execução, amplitude, erros comuns,
   músculos e fontes, cada afirmação com o selo de evidência de `../00-metodo.md`. Fonte que não foi lida no original
   aparece como não verificada.
2. **Poses.** Arquivo em `src/engine/exercicios/<id>.ts`, no mesmo formato das 25 originais, depois delas na lista `EX`.
3. **Verificação automática.** `node scripts/folha-animacao.mjs <id>` roda a checagem de cinemática (precisa dar
   `ik=0` na animação e em cada erro) e gera a folha de contatos: quadros-chave em cada vista, músculos, trajetória e erros.
4. **Revisão do Gustavo.** A animação só aparece no app depois de aprovada a folha de contatos.
5. **Linha de base.** Depois da aprovação, os quadros entram na regressão visual: qualquer mudança futura no motor
   que altere a animação aprovada falha no CI.

## Lotes
| Lote | Exercícios | O que muda no motor |
|---|---|---|
| 1 | 17 variações próximas das animações existentes (remada unilateral, rosca alternada, panturrilha no chão, abdominal no chão, afundo para trás…) | Nada novo: halter, banco e peso do corpo já existem |
| 2 | 7 de polia | Acessórios e posições novas na torre |
| 3 | 12 com elástico | Desenho do elástico |
| 4 | 12 com barra longa ou máquinas | Desenho da barra, do leg press, das cadeiras e da remada invertida |

Dentro de cada lote, primeiro os exercícios que mais aparecem nos programas das personas.
