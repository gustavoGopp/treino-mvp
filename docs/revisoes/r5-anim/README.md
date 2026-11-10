# R5-anim: as 5 animações de corpo livre (10/11/2026)

O R5-CL pôs 32 exercícios novos na biblioteca, todos como cartão de texto. Cinco deles, de corpo livre, aparecem em quase todo programa e são os que mais deixam um dia com 3 ou mais exercícios sem animação. Este marco anima os cinco, um por vez, pelo ritual de `docs/pesquisa/animacoes/README.md`: a ficha confere com o cartão; as poses em `src/engine/exercicios/revisao/`; a folha com a cinemática limpa (`ik=0`); o "aprovar" do Gustavo; a linha de base.

Nada aqui muda o corpo do Boneco, o estilo ou as animações já aprovadas: as poses novas são dados, desenhados com o mesmo motor.

## A fila
| # | Animação | Em quantos programas aparece | Base aprovada | Folha | Situação |
|---|---|---|---|---|---|
| 1 | `panturrilha-degrau` (panturrilha no degrau da escada) | 81,8% | panturrilha no step (`panturrilha-b`) + parede da panturrilha no chão | `folhas/panturrilha-degrau.png`, `folhas/panturrilha-degrau-erros.png` | **aprovada em 10/11** |
| 2 | `abdominal-invertido` (abdominal invertido no chão) | 61,7% | abdominal no chão (o colchonete e o corpo deitado) | `folhas/abdominal-invertido.png`, `folhas/abdominal-invertido-erros.png` | **aprovada em 10/11** |
| 3 | `extensao-triceps-peso-corpo` (extensão de tríceps com o peso do corpo) | 59,4% | tríceps na suspensão (o corpo reto inclinado) + uma bancada (caixa) | `folhas/extensao-triceps-peso-corpo.png`, `folhas/extensao-triceps-peso-corpo-erros.png` | **espera o "aprovar"** |
| 4 | `abertura-t-deitado` | 56,1% | — | — | depois da 3 |
| 5 | `flexao-pes-elevados` | 53,8% | flexão | — | depois da 4 |

## Como ler cada folha
- **Técnica:** os quadros de cada fase (embaixo, subida, descida), com os rótulos verdes.
- **Músculos e trajetória:** o músculo principal em vermelho; o caminho do calcanhar (ou da mão) em azul.
- **Erros:** o certo é a figura cheia; a parte do corpo que erra aparece em vermelho tracejado, com o nome do erro. A folha `-erros` mostra cada erro em 6 instantes do ciclo, para ver o erro se mexendo.
- A conferência escrita (`conferencia/<id>.md`) compara, ponto a ponto, o que a fonte pede com o que o boneco faz (medido em cm).

## O que muda nos programas das personas (medido a cada aprovação)
- **Panturrilha no degrau:** nada muda.
- **Abdominal invertido:** só o **Fábio**. No Inferior B, a elevação de joelhos na barra (2×10–15) dá lugar ao abdominal invertido (2×12–20). As duas valem para a mesma vaga, no mesmo nível. Antes, a elevação ganhava porque só ela tinha animação. Agora as duas têm, e o empate cai no último critério, a ordem do nome. O gerador não mudou.
