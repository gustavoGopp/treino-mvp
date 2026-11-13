# O avaliador na grade reduzida

> Gerado por `npm run auditoria:avaliador` (`scripts/auditoria/avaliador.ts`). Dados fictícios. Não editar à mão.

**5.850 programas** do gerador: 6 cenários comuns × 3 níveis × 2 a 6 dias × 30, 45, 60, 75, 90 min × 13 focos, sem dor.

## Veredito

| veredito | programas | % |
| --- | ---: | ---: |
| bom | 2.683 | 45,9% |
| limite | 2.659 | 45,5% |
| ajustar | 508 | 8,7% |
| bloqueado | 0 | 0% |
| **está bom ou só limite** | **5.342** | **91,3%** |
| com um ajuste, alerta ou segurança que o gerador não avisa | 0 | 0% |

## Por cenário

| cenário | bom | limite | ajustar | bloqueado |
| --- | ---: | ---: | ---: | ---: |
| academia | 543 | 385 | 47 | 0 |
| condominio | 568 | 318 | 89 | 0 |
| casa | 518 | 385 | 72 | 0 |
| elasticos | 490 | 390 | 95 | 0 |
| halteres-banco | 564 | 308 | 103 | 0 |
| sem-nada | 0 | 873 | 102 | 0 |

## Achados (programas com o achado)

| gravidade e tipo | programas | % |
| --- | ---: | ---: |
| limite abaixo-da-meta | 1.983 | 33,9% |
| limite abaixo-do-piso | 1.381 | 23,6% |
| limite funcoes | 1.203 | 20,6% |
| limite sem-exercicio | 975 | 16,7% |
| info maximo | 866 | 14,8% |
| limite tempo | 742 | 12,7% |
| limite obrigatorio | 476 | 8,1% |
| ajustar abaixo-da-meta | 380 | 6,5% |
| ajustar abaixo-do-piso | 101 | 1,7% |
| limite empurrar-puxar | 60 | 1% |
| ajustar tempo | 57 | 1% |

## Sem aviso do gerador (o que a régua cobra)

Nenhum.
