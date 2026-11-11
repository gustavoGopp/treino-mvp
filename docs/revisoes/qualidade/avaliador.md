# O avaliador na grade reduzida

> Gerado por `npm run auditoria:avaliador` (`scripts/auditoria/avaliador.ts`). Dados fictícios. Não editar à mão.

**5.850 programas** do gerador: 6 cenários comuns × 3 níveis × 2 a 6 dias × 30, 45, 60, 75, 90 min × 13 focos, sem dor.

## Veredito

| veredito | programas | % |
| --- | ---: | ---: |
| bom | 2.600 | 44,4% |
| limite | 2.579 | 44,1% |
| ajustar | 671 | 11,5% |
| bloqueado | 0 | 0% |
| **está bom ou só limite** | **5.179** | **88,5%** |
| com um ajuste, alerta ou segurança que o gerador não avisa | 0 | 0% |

## Por cenário

| cenário | bom | limite | ajustar | bloqueado |
| --- | ---: | ---: | ---: | ---: |
| academia | 515 | 374 | 86 | 0 |
| condominio | 564 | 305 | 106 | 0 |
| casa | 487 | 368 | 120 | 0 |
| elasticos | 472 | 358 | 145 | 0 |
| halteres-banco | 562 | 298 | 115 | 0 |
| sem-nada | 0 | 876 | 99 | 0 |

## Achados (programas com o achado)

| gravidade e tipo | programas | % |
| --- | ---: | ---: |
| limite abaixo-da-meta | 1.939 | 33,1% |
| limite abaixo-do-piso | 1.396 | 23,9% |
| limite funcoes | 1.203 | 20,6% |
| limite sem-exercicio | 975 | 16,7% |
| info maximo | 866 | 14,8% |
| limite tempo | 741 | 12,7% |
| limite obrigatorio | 476 | 8,1% |
| ajustar abaixo-da-meta | 475 | 8,1% |
| ajustar abaixo-do-piso | 192 | 3,3% |
| limite empurrar-puxar | 59 | 1% |
| ajustar tempo | 55 | 0,9% |

## Sem aviso do gerador (o que a régua cobra)

Nenhum.
