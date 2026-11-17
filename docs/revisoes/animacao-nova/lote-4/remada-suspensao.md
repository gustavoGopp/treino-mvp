# Lote 4 · Remada na suspensão (`remada-suspensao`)

De 15/11/2026. Primeira da família da fita com as duas mãos nos pegadores, sobre o núcleo novo `exercicios/na-fita.ts` (o corpo em prancha que gira no tornozelo, os pés presos, as mãos nos pegadores e o ângulo do corpo que sai da fita). Ainda não está ligada às telas do app.

- Ficha da técnica: `docs/pesquisa/animacoes/remada-suspensao.md`. Cartão: `src/conteudo/exercicios/remada-suspensao.json`.
- Ficha de movimento: `src/engine/novo/dados/movimentos/remada-suspensao.json`.
- Animação: `src/engine/novo/exercicios/remada-suspensao.ts`; núcleo: `src/engine/novo/exercicios/na-fita.ts`.
- Regras medidas novas (da família): `src/engine/novo/regras/suspensao.ts`.
- Peça: `src/engine/novo/pecas-de-cena/suspensao.ts` (do lote 1), com dois acréscimos (ver "O equipamento").
- Folha: `../prototipos/folha-remada-suspensao.png`. Quadros grandes: `../quadros/remada-suspensao.png`.

## Como a geometria foi montada

1. **A âncora** fica a 182,9 cm, a altura do fabricante (a mesma do búlgaro na suspensão do lote 1; a animação de hoje usa 205 cm, escolha de desenho).
2. **O começo** é da ficha: corpo reto a 55° da vertical (como hoje), calcanhares no chão, braços estendidos **na linha da fita** (o pegador fica na reta do ombro ao ponto onde a fita se divide). Daí sai o comprimento da fita: **96,5 cm** da âncora ao centro de cada pegador.
3. **A cada instante**, o braço vai de estendido até 30° atrás da linha do tronco (no referencial do tórax) e o antebraço fica na linha da fita, que puxa a mão. O ângulo do corpo é o único em que a fita, com esse braço, tem 96,5 cm (`resolver1`). **Nada foi posto à mão:** o corpo sobe de 55° a 32,7° porque a fita não estica.
4. **Os pés:** o fundo do calcanhar fica 20 cm antes da vertical da âncora (hoje: 30 cm além). Com a âncora a 183 cm e os pés além dela, as mãos só chegavam ao peito com o corpo passando da vertical (medido: a fita ficava curta demais); com 20 cm antes, no fim a fita fica quase perpendicular ao corpo, como numa remada de verdade.

## O que a fonte pede × o que o boneco faz (medido) × confere?

| O que a ficha da técnica (e o cartão) pede | Selo | O que o boneco faz (medido) | Confere? |
|---|---|---|---|
| Fitas num ponto firme no alto, alças na mesma altura | consenso | âncora a 182,9 cm; as duas fitas com 96,5 cm o ciclo inteiro (variação 0 cm; limite 0,3) | sim |
| De frente para a âncora, corpo reto inclinado para trás | consenso | ombro, quadril e tornozelo a no mínimo 177° (limite 172°); corpo a 55° da vertical no começo | sim |
| Calcanhares no chão | consenso | o ponto mais baixo do pé fica a 0 cm do chão, parado (bola e ponta do pé deslocam 0 cm); a ponta do pé a 11,3 cm | sim |
| Palmas viradas uma para a outra | consenso (cartão) | antebraço de 95° a 101° (90° = polegar para cima) | sim |
| Puxa até as mãos ao lado do peito | consenso | no fim, a pegada fica 28,3 cm abaixo da base do pescoço (o mamilo fica a 22,1), 17,3 cm à frente da linha da coluna e 16,4 cm do meio do corpo | sim |
| Cotovelos rentes | consenso | no fim, o braço se afasta 14° do lado do tronco; o cotovelo dobra até 137° | sim |
| A fita puxa a mão (antebraço na linha da fita) | desenho | 0° de desvio: é como a pose é construída (a regra confirma, não descobre) | sim |
| Escápulas se juntam no fim, ombros baixos | consenso (cartão) | a clavícula vai 11° para trás do começo ao fim; elevação −1 | sim |
| A fita não estica: o corpo sobe enquanto as mãos vêm ao corpo | (física) | o corpo vai de 55° a 32,7° da vertical; o quadril sobe de 57 para 80 cm | sim |
| ~1 s puxando, 1 s parado, ~2 s voltando | consenso | 1,1 s / 1 s / 2,1 s | sim |

Conferência automática: **0 falha, 2 avisos.** (1) Ritmo: salto de 17,3% da velocidade de pico na mão, no começo da puxada (limite de falha: 25%): a mão sai rápido quando o cotovelo começa a dobrar com o antebraço preso à linha da fita. (2) As linhas da ficha de movimento que são escolha de desenho (pés, ângulo inicial, inclinação do pé, quanto o braço vai para trás, escápulas, polegar). Músculos: a vista padrão é a de trás (397 cm² do principal; de lado, 176 cm²).

## Erros

| Erro (texto do app) | O que o boneco faz (medido) |
|---|---|
| Quadril cai (de lado) | o quadril dobra 34° no fim e desce 7,6 cm (de 80,4 para 72,8 cm); a fita continua com 96,5 cm, então o corpo inteiro se ajeita: as pernas deitam e o tronco fica mais em pé |
| Encolher os ombros (de trás) | a escápula sobe 7 (como hoje) |
| Não estender os braços (de lado; quadro parado no começo) | a volta para na metade: o cotovelo fica dobrado 71° e o corpo a 47° em vez de 55° |

## O equipamento

- Fita de suspensão do lote 1, com dois pegadores de mão. **Acréscimos aditivos em `pecas-de-cena/suspensao.ts`:** `pontoDeDivisao` (onde a fita se divide, para a fita puxar a mão nessa direção) e a opção `vigaComoCenario` (a viga e a ponta da fita de ancoragem saem numa peça à parte, `cenario: true`, atrás do corpo e fora do enquadramento; sem a opção nada muda: `conferir.mjs bulgaro-suspensao` continua com 0 falha e os mesmos 3 avisos).
- Medidas provisórias, as do lote 1: largura da fita, mosquetão, pegador (14 × 3,5 cm), berço.

## Correções já feitas que esta animação respeita (`correcoes-ja-feitas.md`)

- A fita não estica e o corpo gira sobre os calcanhares (04/11): sim, medido.
- Ids dos erros `quadril`, `encolher`, `curta` (04/11): sim.
- Músculos (04/11): dorsal e meio das costas (`trapMedInf`) em vermelho, ombro de trás e bíceps em laranja.
- "O corpo fica pequeno por causa da âncora" (proposta 4 da Fable): âncora na altura do fabricante e viga como cenário.
- O comprimento de 85 cm e a âncora a 205 cm de hoje **não** foram mantidos: com a âncora do fabricante, a fita sai da posição inicial (96,5 cm). Dito acima.

## O que não ficou bom

- **Os pés ficam 20 cm antes da âncora, e não 30 cm além, como hoje.** Tentei manter os 30 cm além: com a âncora a 183 cm a fita fica com 61 cm e o corpo precisaria passar da vertical para as mãos chegarem ao peito (medido). A ficha não dá número; o Gustavo pode preferir outra combinação de âncora e pés.
- **De trás, no começo, as mãos ficam atrás da cabeça** (a vista olha para o corpo inclinado na direção de quem olha). Testei `quinaTras`: o corpo vira um borrão de braços e fitas; fiquei com a de trás, que mostra as escápulas e o músculo.
- O aviso de ritmo (17%) é real: a mão acelera no começo da puxada.
