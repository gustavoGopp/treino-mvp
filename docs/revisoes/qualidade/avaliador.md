# O avaliador na grade reduzida

> Gerado por `npm run auditoria:avaliador` (`scripts/auditoria/avaliador.ts`). Dados fictícios. Não editar à mão.

**5.850 programas** do gerador: 6 cenários comuns × 3 níveis × 2 a 6 dias × 30, 45, 60, 75, 90 min × 13 focos, sem dor.

## Veredito

| veredito | programas | % |
| --- | ---: | ---: |
| bom | 2.665 | 45,6% |
| limite | 2.704 | 46,2% |
| ajustar | 481 | 8,2% |
| bloqueado | 0 | 0% |
| **está bom ou só limite** | **5.369** | **91,8%** |
| com um ajuste, alerta ou segurança que o gerador não avisa | 0 | 0% |

## Por cenário

| cenário | bom | limite | ajustar | bloqueado |
| --- | ---: | ---: | ---: | ---: |
| academia | 548 | 390 | 37 | 0 |
| condominio | 553 | 324 | 98 | 0 |
| casa | 518 | 382 | 75 | 0 |
| elasticos | 490 | 394 | 91 | 0 |
| halteres-banco | 556 | 316 | 103 | 0 |
| sem-nada | 0 | 898 | 77 | 0 |

## Achados (programas com o achado)

| gravidade e tipo | programas | % |
| --- | ---: | ---: |
| limite abaixo-da-meta | 1.974 | 33,7% |
| limite abaixo-do-piso | 1.367 | 23,4% |
| limite funcoes | 1.342 | 22,9% |
| limite sem-exercicio | 975 | 16,7% |
| info maximo | 874 | 14,9% |
| limite tempo | 783 | 13,4% |
| limite obrigatorio | 477 | 8,2% |
| ajustar abaixo-da-meta | 371 | 6,3% |
| ajustar abaixo-do-piso | 78 | 1,3% |
| limite empurrar-puxar | 69 | 1,2% |
| ajustar tempo | 52 | 0,9% |

## Sem aviso do gerador (o que a régua cobra)

Nenhum.
