# Animações novas: como cada uma é feita e aprovada

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
