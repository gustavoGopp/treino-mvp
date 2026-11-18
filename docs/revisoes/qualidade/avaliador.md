# O avaliador na grade reduzida

> Gerado por `npm run auditoria:avaliador` (`scripts/auditoria/avaliador.ts`). Dados fictícios. Não editar à mão.

**5.850 programas** do gerador: 6 cenários comuns × 3 níveis × 2 a 6 dias × 30, 45, 60, 75, 90 min × 13 focos, sem dor.

## Veredito

| veredito | programas | % |
| --- | ---: | ---: |
| bom | 2.680 | 45,8% |
| limite | 2.701 | 46,2% |
| ajustar | 469 | 8% |
| bloqueado | 0 | 0% |
| **está bom ou só limite** | **5.381** | **92%** |
| com um ajuste, alerta ou segurança que o gerador não avisa | 0 | 0% |

## Por cenário

| cenário | bom | limite | ajustar | bloqueado |
| --- | ---: | ---: | ---: | ---: |
| academia | 551 | 381 | 43 | 0 |
| condominio | 555 | 328 | 92 | 0 |
| casa | 522 | 378 | 75 | 0 |
| elasticos | 494 | 391 | 90 | 0 |
| halteres-banco | 558 | 324 | 93 | 0 |
| sem-nada | 0 | 899 | 76 | 0 |

## Achados (programas com o achado)

| gravidade e tipo | programas | % |
| --- | ---: | ---: |
| limite abaixo-da-meta | 1.978 | 33,8% |
| limite abaixo-do-piso | 1.367 | 23,4% |
| limite funcoes | 1.344 | 23% |
| limite sem-exercicio | 975 | 16,7% |
| info maximo | 877 | 15% |
| limite tempo | 753 | 12,9% |
| limite obrigatorio | 479 | 8,2% |
| ajustar abaixo-da-meta | 350 | 6% |
| ajustar abaixo-do-piso | 86 | 1,5% |
| limite empurrar-puxar | 62 | 1,1% |
| ajustar tempo | 49 | 0,8% |

## Sem aviso do gerador (o que a régua cobra)

Nenhum.
