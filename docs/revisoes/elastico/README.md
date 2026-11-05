# As 12 animações do elástico (R4, 05/11/2026)

As poses estão em `src/engine/exercicios/revisao/`, fora do app até o "aprovar". Cada uma tem a folha (`folhas/<id>.png`, estilo A com as três propostas do R4 por cima), a medida (`node scripts/medir-animacao.mjs <id>`) e a conferência escrita (`conferencia/<id>.md`: o que a fonte pede × o que o boneco faz × confere?). O texto completo do guia fica em `src/conteudo/revisao/<id>.json`, com os mesmos erros do cartão.

**A âncora do elástico (decisão de desenho, a confirmar):** onde a ficha prende o elástico num ponto (porta, pilar, barra), o boneco mostra um **poste fino com um anel** (`poste`, em `src/engine/desenho.ts`), porque a porta, de lado, cobriria o corpo e, de frente, sumiria; o poste lê em todas as vistas e é a convenção da torre da polia. Onde a ficha passa o elástico sob os pés ou pelas costas, é isso que se desenha. A faixa (`band`) calibra o repouso pelo menor comprimento do ciclo e afina até 55% quando estica ao dobro: a tensão aparece onde a faixa fica fina.

| # | Animação | Base aprovada | Âncora | Folha | Medida (ik; faixa repouso → máx.) |
|---|---|---|---|---|---|
| 1 | `flexao-joelho-elastico` | pose nova (de bruços) + ciclo da flexão deslizante | poste baixo atrás dos pés, laço nos tornozelos | `folhas/flexao-joelho-elastico.png` | ik 0; 50 → 90 cm |
| 2 | `rosca-elastico` | rosca alternada (os dois braços juntos) | sob os dois pés | `folhas/rosca-elastico.png` | ik 0; 76 → 137 |
| 3 | `elevacao-lateral-elastico` | elevação com halteres | sob os dois pés | `folhas/elevacao-lateral-elastico.png` | ik 0; 78 → 151 |
| 4 | `crucifixo-elastico` | crucifixo na polia (sem as torres) | poste atrás, altura do peito | `folhas/crucifixo-elastico.png` | ik 0; 76 → 134 (aberto 102) |
| 5 | `stiff-elastico` | stiff | sob os dois pés | `folhas/stiff-elastico.png` | ik 0; 34 → 76 (em pé) |
| 6 | `remada-elastico` | remada baixa | sola dos pés | `folhas/remada-elastico.png` (04/11) | ik 0 |
| 7 | `face-pull-elastico` | face pull (sem a torre e a corda) | poste à frente, altura da testa | `folhas/face-pull-elastico.png` | ik 0; 70 → 126 |
| 8 | `puxada-elastico` | puxada unilateral ajoelhada (os dois braços) | poste alto à frente | `folhas/puxada-elastico.png` | ik 0; 62 → 129 |
| 9 | `triceps-elastico-acima` | tríceps na polia (em pé, tronco reto) | sob o pé de trás, pelas costas | `folhas/triceps-elastico-acima.png` | ik 0; 150 → 197 |
| 10 | `desenvolvimento-elastico` | desenvolvimento (em pé) | sob os dois pés | `folhas/desenvolvimento-elastico.png` | ik 0; 166 → 201 |
| 11 | `agachamento-elastico` | agachamento com o peso do corpo (mãos nos ombros) | sob os dois pés | `folhas/agachamento-elastico.png` | ik 0; 49 → 134 (em pé) |
| 12 | `flexao-elastico` | flexão | pelas costas, sob as palmas | `folhas/flexao-elastico.png` | ik 0; 33 → 67 |

Erros novos (sem par na base, pedidos pelo cartão): `frouxo` no crucifixo (perto demais do poste: a faixa grossa com os braços abertos), `arco` no tríceps, `lombar` no agachamento (no lugar do "calcanhar"), `pescoco` na flexão (a faixa sobe para o pescoço), `tranco` na flexão de joelho.

## Aprovadas (05/11/2026)
O Gustavo aprovou as 12 (e as 4 da auditoria) com o poste como âncora. Entraram no app com `node scripts/aprovar-animacao.mjs <id> <id>`; o texto completo substituiu o cartão em `src/conteudo/exercicios/`.

**Antes × depois nos programas** (`npx vitest run` antes de regravar os snapshots): só o **Diego** muda. No Corpo todo A, o agachamento com o peso do corpo (2×12–20) dá lugar ao **agachamento com elástico (2×10–16)**: os dois são equivalentes na vaga de agachar, e o desempate pela animação aprovada agora escolhe o do elástico (a escada de carga passa a ser a do elástico: mais esticado, descida de 3 s). Bruno e Carla não mudam (as vagas deles já tinham o exercício com elástico escolhido, ou outro equipamento na frente). Ana, Elisa e Fábio não têm elástico.
