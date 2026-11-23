# O avaliador na grade reduzida

> Gerado por `npm run auditoria:avaliador` (`scripts/auditoria/avaliador.ts`). Dados fictícios. Não editar à mão.

**5.850 programas** do gerador: 6 cenários comuns × 3 níveis × 2 a 6 dias × 30, 45, 60, 75, 90 min × 13 focos, sem dor.

## Veredito

| veredito | programas | % |
| --- | ---: | ---: |
| bom | 2.684 | 45,9% |
| limite | 2.740 | 46,8% |
| ajustar | 426 | 7,3% |
| bloqueado | 0 | 0% |
| **está bom ou só limite** | **5.424** | **92,7%** |
| com um ajuste, alerta ou segurança que o gerador não avisa | 0 | 0% |

## Por cenário

| cenário | bom | limite | ajustar | bloqueado |
| --- | ---: | ---: | ---: | ---: |
| academia | 552 | 377 | 46 | 0 |
| condominio | 558 | 338 | 79 | 0 |
| casa | 522 | 389 | 64 | 0 |
| elasticos | 494 | 396 | 85 | 0 |
| halteres-banco | 558 | 340 | 77 | 0 |
| sem-nada | 0 | 900 | 75 | 0 |

## Achados (programas com o achado)

| gravidade e tipo | programas | % |
| --- | ---: | ---: |
| limite abaixo-da-meta | 1.956 | 33,4% |
| limite abaixo-do-piso | 1.376 | 23,5% |
| limite funcoes | 1.332 | 22,8% |
| limite sem-exercicio | 975 | 16,7% |
| info maximo | 877 | 15% |
| limite tempo | 748 | 12,8% |
| limite obrigatorio | 479 | 8,2% |
| ajustar abaixo-da-meta | 353 | 6% |
| ajustar abaixo-do-piso | 69 | 1,2% |
| limite empurrar-puxar | 59 | 1% |
| ajustar tempo | 19 | 0,3% |

## Sem aviso do gerador (o que a régua cobra)

Nenhum.
