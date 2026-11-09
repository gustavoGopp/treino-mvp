# O avaliador na grade reduzida

> Gerado por `npm run auditoria:avaliador` (`scripts/auditoria/avaliador.ts`). Dados fictícios. Não editar à mão.

**5.850 programas** do gerador: 6 cenários comuns × 3 níveis × 2 a 6 dias × 30, 45, 60, 75, 90 min × 13 focos, sem dor.

## Veredito

| veredito | programas | % |
| --- | ---: | ---: |
| bom | 2.594 | 44,3% |
| limite | 2.522 | 43,1% |
| ajustar | 734 | 12,5% |
| bloqueado | 0 | 0% |
| **está bom ou só limite** | **5.116** | **87,5%** |
| com um ajuste, alerta ou segurança que o gerador não avisa | 0 | 0% |

## Por cenário

| cenário | bom | limite | ajustar | bloqueado |
| --- | ---: | ---: | ---: | ---: |
| academia | 515 | 349 | 111 | 0 |
| condominio | 564 | 300 | 111 | 0 |
| casa | 484 | 360 | 131 | 0 |
| elasticos | 472 | 358 | 145 | 0 |
| halteres-banco | 559 | 280 | 136 | 0 |
| sem-nada | 0 | 875 | 100 | 0 |

## Achados (programas com o achado)

| gravidade e tipo | programas | % |
| --- | ---: | ---: |
| limite abaixo-da-meta | 1.917 | 32,8% |
| limite abaixo-do-piso | 1.389 | 23,7% |
| limite funcoes | 1.201 | 20,5% |
| limite sem-exercicio | 975 | 16,7% |
| info maximo | 866 | 14,8% |
| limite tempo | 748 | 12,8% |
| ajustar abaixo-da-meta | 539 | 9,2% |
| limite obrigatorio | 475 | 8,1% |
| ajustar abaixo-do-piso | 195 | 3,3% |
| limite empurrar-puxar | 60 | 1% |
| ajustar tempo | 53 | 0,9% |

## Sem aviso do gerador (o que a régua cobra)

Nenhum.
