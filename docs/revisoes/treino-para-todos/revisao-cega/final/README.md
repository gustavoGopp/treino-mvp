# Revisão cega final da etapa 2 (17/11/2026)

> Sessão "treino para todos". Três revisores no papel de treinadores (opinião simulada, não evidência) leram 36 páginas embaralhadas: a semana de 18 pessoas fictícias na `main` de antes da etapa 2 e a semana das mesmas pessoas no ramo, com os pacotes 0 a 5. Ninguém sabia qual era qual. Cada revisor tinha um olhar: eficiência; adequação à pessoa e segurança; "parece feito por treinador ou por máquina".

## O que há aqui

| Arquivo | O que é |
|---|---|
| [`briefing.md`](briefing.md) | O que os revisores receberam |
| [`paginas/`](paginas/) | As 36 páginas (S01 a S36), como foram lidas |
| [`chave.json`](chave.json) | Qual página é de quem e de qual versão ("hoje" = `main`; "proposta" = ramo) |
| [`revisor-1.md`](revisor-1.md), [`revisor-2.md`](revisor-2.md), [`revisor-3.md`](revisor-3.md) | As notas e os comentários de cada um |
| [`resultado.json`](resultado.json) | As médias por pessoa |
| [`ombro/`](ombro/) | A mini-rodada feita depois da marca do ombro (abaixo) |

## O resultado

Notas de 1 a 10, na ordem: eficiente · adequada à pessoa · agradável de fazer. Média dos três revisores.

| | `main` | ramo |
|---|---|---|
| **Média das 18 pessoas** | 5,43 · 5,85 · 5,15 | **5,91 · 6,31 · 5,52** |

| Pessoa | Quem é (resumo) | `main` | ramo | Soma |
|---|---|---|---|---:|
| Marina | intermediária, academia, 4 × 60 min, quer força | 4,7 · 6,0 · 5,3 | 7,0 · 7,7 · 6,7 | +5,3 |
| X2 | avançado, academia, 5 × 90 min | 3,7 · 4,3 · 4,3 | 6,0 · 6,7 · 6,0 | +6,3 |
| X1 | iniciante, casa com halteres e elásticos, 2 × 30 min | 5,0 · 5,3 · 5,0 | 6,0 · 6,7 · 6,0 | +3,3 |
| Gilberto | 67 anos, nunca treinou, condomínio, 2 × 45 min | 4,7 · 3,0 · 4,0 | 5,7 · 4,0 · 4,7 | +2,7 |
| Jonas | intermediário, academia, 2 × 30 min | 5,7 · 5,3 · 5,3 | 6,0 · 6,7 · 5,7 | +2,0 |
| Leandro | iniciante, academia, dor 7 no joelho | 6,0 · 6,0 · 5,7 | 6,7 · 6,7 · 6,0 | +1,7 |
| X3 | intermediária, academia, dor 7 no ombro | 3,7 · 5,0 · 3,3 | 5,0 · **4,0** · 4,7 | +1,7 |
| Ana | iniciante, halteres até 12 kg, 3 × 45 min | 5,3 · 5,0 · 4,7 | 5,3 · 5,7 · 4,7 | +0,7 |
| X6 | avançada, halteres até 12 kg e banco, quer pernas | 5,7 · 6,0 · 5,0 | 5,7 · 6,3 · 5,0 | +0,3 |
| Carla, Diego, Elisa, Fábio, Íris, Kátia, X4, X5 | (oito pessoas) | iguais | iguais | 0 |
| Bruno | intermediário voltando de pausa, 4 focos de cima | **5,7** · 6,0 · 5,0 | **5,3** · 6,0 · 5,0 | −0,3 |

**Nove melhoram, oito ficam iguais, uma piora (o Bruno, em 0,3 ponto de uma nota).**

## As duas notas que caem

1. **Bruno, eficiência 5,7 → 5,3.** Um dos três revisores deu 6 à semana da `main` e 5 à do ramo; os outros dois deram a mesma nota às duas. A crítica é a mesma nas duas páginas: braços e ombros com mais séries que as pernas. No ramo, o tempo liberado pelas trocas virou 1 série de elevação lateral e 1 de rosca (bíceps de 12,5 para 13,5; pernas iguais, com 8). O Bruno pediu 4 focos, todos de cima. Fica no backlog: com 3 focos ou mais, a série que sobra não deveria ir para o braço enquanto a perna está no mínimo.
2. **X3 (dor 7 no ombro), "adequada" 5,0 → 4,0.** A soma dela sobe (+1,7), porque o ramo acaba com os dois dias de 12 minutos. Mas os três revisores apontaram o **agachamento com a barra nas costas** para quem tem dor forte no ombro. O defeito já existia na `main` (o dado do exercício não marcava o ombro); na semana maior do ramo ele ficou mais à vista. **Foi corrigido no mesmo dia** (abaixo).

## A marca do ombro e a mini-rodada ([`ombro/`](ombro/))

Com a decisão do Gustavo em 17/11, o agachamento livre com barra e o do Smith passaram a marcar o ombro (a barra apoiada no alto das costas pede o ombro aberto e rodado para fora). Com dor forte no ombro, os dois saem e entra o leg press ou outro exercício do mesmo músculo. Das 36 páginas, só uma muda: a da X3 no ramo ([`ombro/S36-com-a-marca-do-ombro.md`](ombro/S36-com-a-marca-do-ombro.md)).

Para conferir, três revisores novos leram 6 páginas embaralhadas: as três versões da X3 (`main`, ramo antes da marca, ramo com a marca) e três páginas de outras pessoas, para calibrar.

| X3 | eficiente · adequada · agradável |
|---|---|
| `main` | 3,0 · 3,7 · 2,3 |
| ramo, antes da marca | 4,3 · 3,7 · 4,3 |
| ramo, com a marca | 4,3 · **5,0** · 4,3 |

Com a marca, a nota de "adequada" sobe de 3,7 para 5,0, e nenhuma das três notas fica abaixo da `main`. As três páginas de calibragem tiveram notas a no máximo 1 ponto das da rodada grande (Carla 7,3 · 8,0 · 7,0; Gilberto na `main` 4,7 · 3,0 · 3,7; Leandro no ramo 6,3 · 7,0 · 6,0).

O que os revisores continuam apontando na X3, e que **não** foi mexido: com dor forte no ombro, o app tira peito, costas e ombros por inteiro (não adapta amplitude nem pegada: o app não diagnostica); dois dos três acham que a rosca Scott também carrega o ombro (a biblioteca não marca; precisa de fonte; está no backlog).

## Limites desta revisão

- São revisores simulados. As notas servem para achar problemas e comparar versões, não como prova de que o treino é bom.
- Quando duas páginas são iguais, os revisores percebem e repetem a nota: as oito pessoas "iguais" não medem o ruído.
- Uma diferença de 0,3 (um ponto de um revisor em uma nota) está dentro do que muda de uma rodada para outra: nas páginas de calibragem da mini-rodada, a mesma página mudou até 1 ponto.
