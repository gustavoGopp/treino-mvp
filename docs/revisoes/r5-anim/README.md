# R5-anim: as 5 animações de corpo livre (10/11/2026)

O R5-CL pôs 32 exercícios novos na biblioteca, todos como cartão de texto. Cinco deles, de corpo livre, aparecem em quase todo programa e são os que mais deixam um dia com 3 ou mais exercícios sem animação. Este marco anima os cinco, um por vez, pelo ritual de `docs/pesquisa/animacoes/README.md`: a ficha confere com o cartão; as poses em `src/engine/exercicios/revisao/`; a folha com a cinemática limpa (`ik=0`); o "aprovar" do Gustavo; a linha de base.

Nada aqui muda o corpo do Boneco, o estilo ou as animações já aprovadas: as poses novas são dados, desenhados com o mesmo motor.

## A fila
| # | Animação | Em quantos programas aparece | Base aprovada | Folha | Situação |
|---|---|---|---|---|---|
| 1 | `panturrilha-degrau` (panturrilha no degrau da escada) | 81,8% | panturrilha no step (`panturrilha-b`) + parede da panturrilha no chão | `folhas/panturrilha-degrau.png`, `folhas/panturrilha-degrau-erros.png` | **aprovada em 10/11** |
| 2 | `abdominal-invertido` (abdominal invertido no chão) | 61,7% | abdominal no chão (o colchonete e o corpo deitado) | `folhas/abdominal-invertido.png`, `folhas/abdominal-invertido-erros.png` | **aprovada em 10/11** |
| 3 | `extensao-triceps-peso-corpo` (extensão de tríceps com o peso do corpo) | 59,4% | tríceps na suspensão (o corpo reto inclinado) + uma bancada (caixa) | `folhas/extensao-triceps-peso-corpo.png`, `folhas/extensao-triceps-peso-corpo-erros.png` | **aprovada em 10/11** |
| 4 | `abertura-t-deitado` (abertura em T deitado de bruços) | 56,1% | corpo de bruços da flexão de joelho com elástico + braço em T do T na suspensão | `folhas/abertura-t-deitado.png`, `folhas/abertura-t-deitado-erros.png` | **aprovada em 10/11** |
| 5 | `flexao-pes-elevados` (flexão com os pés elevados) | 53,8% | flexão (as mesmas mãos e erros) + uma caixa de 45 cm | `folhas/flexao-pes-elevados.png`, `folhas/flexao-pes-elevados-erros.png` | **aprovada em 10/11** |

## Como ler cada folha
- **Técnica:** os quadros de cada fase (embaixo, subida, descida), com os rótulos verdes.
- **Músculos e trajetória:** o músculo principal em vermelho; o caminho do calcanhar (ou da mão) em azul.
- **Erros:** o certo é a figura cheia; a parte do corpo que erra aparece em vermelho tracejado, com o nome do erro. A folha `-erros` mostra cada erro em 6 instantes do ciclo, para ver o erro se mexendo.
- A conferência escrita (`conferencia/<id>.md`) compara, ponto a ponto, o que a fonte pede com o que o boneco faz (medido em cm).

## O que muda nos programas das personas (medido a cada aprovação)
- **Panturrilha no degrau:** nada muda.
- **Abdominal invertido:** só o **Fábio**. No Inferior B, a elevação de joelhos na barra (2×10–15) dá lugar ao abdominal invertido (2×12–20). As duas valem para a mesma vaga, no mesmo nível. Antes, a elevação ganhava porque só ela tinha animação. Agora as duas têm, e o empate cai no último critério, a ordem do nome. O gerador não mudou.
- **Extensão de tríceps com o peso do corpo:** nada muda.
- **Abertura em T deitado:** nada muda.
- **Flexão com os pés elevados:** nada muda. O abdômen entra na lista dos que "só ajudam" (listrado de laranja), como na flexão e na flexão com elástico (`SO_AJUDA` no motor e `AJUDANTES` na auditoria de anatomia).

## Lote 2 (10/11/2026): os 3 mais frequentes de halter e banco
Pela régua com os 5 de corpo livre animados (`revisoes/qualidade/regua.md`, "Uso de cada exercício"); nenhum pede peça nova.

| # | Animação | Em quantos programas aparece | Base aprovada | Folha | Situação |
|---|---|---|---|---|---|
| 6 | `ponte-gluteo-halter` (ponte de glúteo com halter) | 13,5% | ponte com kettlebell | `folhas/ponte-gluteo-halter.png`, `folhas/ponte-gluteo-halter-erros.png` | **aprovada em 10/11** (depois de apoiar os cotovelos no chão); nenhum programa das personas muda |
| 7 | `remada-curvada-halteres` (remada curvada com halteres) | 11,8% | remada unilateral sem banco (os dois braços) + as pernas do stiff | `folhas/remada-curvada-halteres.png`, `folhas/remada-curvada-halteres-erros.png` | **aprovada em 10/11**; muda o programa da Ana (Corpo todo C: a remada sem banco vira a curvada), **à espera da decisão do Gustavo** |
| 8 | `afundo-tras-peso-corpo` | 10,7% | — | — | depois da 7 |

