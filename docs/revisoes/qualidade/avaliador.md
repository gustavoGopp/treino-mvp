# O avaliador na grade reduzida

> Gerado por `npm run auditoria:avaliador` (`scripts/auditoria/avaliador.ts`). Dados fictícios. Não editar à mão.

**5.850 programas** do gerador: 6 cenários comuns × 3 níveis × 2 a 6 dias × 30, 45, 60, 75, 90 min × 13 focos, sem dor.

## Veredito

| veredito | programas | % |
| --- | ---: | ---: |
| bom | 2.683 | 45,9% |
| limite | 2.682 | 45,8% |
| ajustar | 485 | 8,3% |
| bloqueado | 0 | 0% |
| **está bom ou só limite** | **5.365** | **91,7%** |
| com um ajuste, alerta ou segurança que o gerador não avisa | 0 | 0% |

## Por cenário

| cenário | bom | limite | ajustar | bloqueado |
| --- | ---: | ---: | ---: | ---: |
| academia | 543 | 383 | 49 | 0 |
| condominio | 568 | 318 | 89 | 0 |
| casa | 518 | 382 | 75 | 0 |
| elasticos | 490 | 394 | 91 | 0 |
| halteres-banco | 564 | 307 | 104 | 0 |
| sem-nada | 0 | 898 | 77 | 0 |

## Achados (programas com o achado)

| gravidade e tipo | programas | % |
| --- | ---: | ---: |
| limite abaixo-da-meta | 1.983 | 33,9% |
| limite abaixo-do-piso | 1.381 | 23,6% |
| limite funcoes | 1.350 | 23,1% |
| limite sem-exercicio | 975 | 16,7% |
| info maximo | 866 | 14,8% |
| limite tempo | 763 | 13% |
| limite obrigatorio | 476 | 8,1% |
| ajustar abaixo-da-meta | 375 | 6,4% |
| ajustar abaixo-do-piso | 80 | 1,4% |
| ajustar tempo | 60 | 1% |
| limite empurrar-puxar | 60 | 1% |

## Sem aviso do gerador (o que a régua cobra)

Nenhum.
