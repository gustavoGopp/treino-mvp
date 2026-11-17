# Lote A3 · Resumo das quatro de perna em pé com carga

De 17/11/2026. Primeira animação de quatro exercícios que até aqui eram cartão de texto. Nenhuma está aprovada nem ligada às telas: quem integra registra em `aprovados.ts` e no catálogo do guia (o teste da ponte "todas as animações estão aprovadas e no catálogo" falha na cópia de trabalho, como esperado; o resto de `npm run check` passa).

| Exercício | Conferência escrita | Conferência automática | Erros desenhados | Risco de o Gustavo não gostar |
|---|---|---|---|---|
| Afundo para trás alternado (`afundo-tras`) | `afundo-tras.md` | 0 falha, 5 avisos (os mesmos do afundo para trás aprovado) | os 3 | baixo |
| Agachamento com 2 halteres (`agachamento-halteres`) | `agachamento-halteres.md` | 0 falha, 4 avisos (os mesmos do agachamento com o peso do corpo aprovado) | os 3 | baixo a médio |
| Goblet com kettlebell (`goblet-kettlebell`) | `goblet-kettlebell.md` | 0 falha, 3 avisos | os 3 | médio |
| Stiff unilateral com kettlebell (`stiff-unilateral-kettlebell`) | `stiff-unilateral-kettlebell.md` | 0 falha, 2 avisos (os mesmos do stiff unilateral aprovado) | os 3 | médio |

Os quadros grandes estão em `../quadros/<id>.png`. Não há folha (os quatro não tinham animação).

## Erros sem desenho

Nenhum. Os doze erros dos cartões têm consequência que se vê. "Impulso com a perna de trás" (afundo para trás) é desenhado como o erro "Empurrar com o pé de trás" do afundo para trás aprovado: o quadril fica para trás, perto do pé de trás, e o tronco recua. No goblet com kettlebell, "Tronco tomba" também dobra a lombar (sem isso o quadril passaria de 164°, além do que ele dobra).

## Mudança em arquivo comum

- `exercicios/dobrar-o-quadril.ts` (núcleo dos stiffs): a variação nova `'kettlebellOposta'` (o kettlebell numa mão só, a esquerda, numa perna só), com o perfil do braço em 49 pontos só para ela. Aditiva: o preparo das animações aprovadas não mudou e `npm run conferir:animacao` segue sem falha em todas.
- Duas linhas em `regras/registro.ts` (regras novas do agachamento com halteres e do goblet com kettlebell) e quatro em `exercicios/registro.ts`.
- Reaproveitadas sem mudar: `folgaDasPernas` e `alturaDaPegadaDoKettlebell` (`dobrar-o-quadril.ts`), `folgaDaCarga` (`regras/stiffs.ts`), `afundar` e `FRENTE`/`TRAS` (afundos), `agachar`.

## Para quem integra

- **O afundo com kettlebell aprovado** põe a bola 2,9 cm dentro do peito, medida na pele do Boneco (a profundidade sai de `prof.peito × 0,68`). No goblet com kettlebell a bola foi calibrada pela pele (0,8 cm de folga). Não mexi no aprovado.
- **Custo por quadro:** o agachamento com halteres faz duas passadas para abrir o braço por fora da perna (8 ms por quadro no computador; o goblet, 2,4 ms; o stiff unilateral aprovado, 20 ms).
