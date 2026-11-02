# Personas: antes e depois das correções de anatomia na biblioteca

> As 3 mudanças da biblioteca aprovadas em 02/11/2026: posteriores fora da ponte, do hip thrust e dos coices (achado 1); "costas" fora dos crucifixos invertidos (achado 5); adutores em todo agachamento, no leg press e no terra hexagonal (achado 6). Tudo com as personas fictícias. Só aparece o que muda.

## O treino da semana (`gerador.test.ts`)
| Persona | O que muda no treino | Volume semanal (séries) |
|---|---|---|
| **Ana** (halteres + banco reto) | Corpo todo B: stiff unilateral **3 → 4** séries; panturrilha **4 → 3**, rosca **3 → 2**, crucifixo invertido **3 → 2** (estes três passam a ter a última série em drop set); o dia vai de 45 para 44 min | posteriores **8 → 7**; costas **7,5 → 6**; glúteos 10 → 10,5. O aviso de falta de tempo, que era "quadríceps 6 de 8", passa a ser "quadríceps 6 de 8; posteriores 7 de 8" |
| **Bruno** (prédio, polia dupla) | Superior B: remada baixa **2 → 3** séries; o dia vai de 66 para 69 min | posteriores **9 → 8**; bíceps 12 → 12,5; ombro posterior 9 → 9,5 |
| **Carla** (academia completa) | Superior: puxada unilateral **3 → 4**; Inferior: stiff **3 → 4**; os dias vão de 66 para 70 min e de 61 para 63 min | glúteos 8,5 → 9; bíceps 10 → 10,5; ombro posterior 10 → 10,5 |
| **Diego** (casa, elásticos) | Corpo todo B: rosca com elástico **3 → 2** séries | posteriores **6 → 5**; bíceps 6 → 5; adutores 1 → 2,5 |

Por que o treino muda: o gerador completa a meta semanal de cada músculo. Quando a ponte deixa de contar posteriores, o stiff ganha uma série para cobrir; quando o crucifixo invertido deixa de contar costas, a remada ou a puxada ganham uma.

## Outros snapshots
- **Bruno na academia do bairro** (`locais.test.ts`): no Superior B, a remada apoiada vai de 2 para 3 séries (a mesma troca acima).
- **Volta de 30 dias** (`personas-r2.test.ts`): só o número de séries da semana 6 e da semana 1 acompanha as mudanças acima (Ana 17 → 15 no dia B; Carla 24 → 25 e 23 → 24; Diego 16 → 15 e 9 → 8; Bruno 23 → 24 e 14 → 15).
- **"Prefiro o leg press"** da Carla (`preferencia.test.ts`): o stiff sobe de 3 para 4 séries nos dois lados, e a troca agachamento → leg press agora **mantém o volume igual** (antes mudava, porque o agachamento com barra contava os adutores e o leg press, não).
- **`dados-dominio.test.ts`**: o teste que fixava a lista dos adutores de 01/11 (só afundos, búlgaros e agachamento com barra) passa para a lista nova, decidida no achado 6.
