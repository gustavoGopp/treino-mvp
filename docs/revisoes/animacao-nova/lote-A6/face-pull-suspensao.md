# Lote A6 · Remada alta na suspensão, com os cotovelos abertos (`face-pull-suspensao`)

De 18/11/2026. Primeira animação deste exercício (até aqui ele só aparecia como cartão de texto). De frente para a âncora, os calcanhares no chão e o corpo reto, inclinado para trás; começa com os braços estendidos na linha da fita, palmas para baixo e cotovelos para fora, e puxa com os cotovelos altos e abertos até as mãos ficarem ao lado das orelhas, juntando as escápulas. A fita não estica: o corpo sobe enquanto as mãos vêm à cabeça. **Ainda não aprovada nem ligada às telas.**

- Ficha da técnica: `docs/pesquisa/animacoes/face-pull-suspensao.md`. Cartão do app: `src/conteudo/exercicios/face-pull-suspensao.json` (só leitura).
- Ficha de movimento: `src/engine/novo/dados/movimentos/face-pull-suspensao.json`.
- Animação: `src/engine/novo/exercicios/face-pull-suspensao.ts`, sobre o núcleo da fita (`exercicios/na-fita.ts`, como a remada e o T na suspensão aprovados), com o caminho das mãos do face pull com corda aprovado (`face-pull.ts`: do começo ao fim no referencial do tórax, abrindo no fim do caminho). Regras medidas: `src/engine/novo/regras/face-pull-suspensao.ts` (duas novas) e as da suspensão (`regras/suspensao.ts`).
- Quadros grandes: `../quadros/face-pull-suspensao.png`. **Sem folha.**

## Onde os números saem

A ficha da técnica dá a técnica em palavras (corpo inclinado e reto, palmas para baixo: consenso; cotovelos altos e abertos, mãos ao lado das orelhas: um estudo, `youdas2021`). Os pés, o ângulo de partida (55°), as escápulas e o erro do quadril vêm da remada na suspensão aprovada; as palmas para baixo com os cotovelos para fora no começo e o erro que vira remada, do T na suspensão aprovado; o lugar das mãos no fim, do face pull com corda aprovado. O ângulo do corpo em cada quadro não é escolhido: sai da fita (o único ângulo em que, com aquele braço, o pegador fica à distância certa da âncora).

## O que a fonte pede × o que o boneco faz (medido) × confere?

| O que a ficha da técnica (e o cartão) pede | Selo | O que o boneco faz (medido) | Confere? |
|---|---|---|---|
| Corpo inclinado e reto, como uma prancha | consenso | de lado, ombro, quadril e tornozelo fazem no mínimo 175,5° (180° = reto) | sim |
| Pés à frente, calcanhares no chão | consenso | o ponto mais baixo do pé fica a 0 cm do chão e não anda; a ponta do pé, a 11,3 cm ou mais | sim |
| Palmas para baixo | consenso | no começo, o polegar aponta para dentro com 94% do comprimento; a pronação do antebraço fica de 45,5° a 73,9° | sim |
| Braços estendidos no começo | consenso | o cotovelo dobra 6° | sim |
| A fita não estica: o corpo sobe com a puxada | consenso | as duas fitas mantêm o comprimento (variação ≤ 0,3 cm); o corpo vai de 55,2° a 30,2° da vertical | sim |
| Mãos ao lado das orelhas | um estudo | no fim, no tronco, o centro da mão fica na altura do trágio, 6 cm à frente dele e a 22 cm do meio do corpo (as mãos a 44 cm uma da outra; a cabeça tem 15,2 cm de largura) | sim |
| Cotovelos altos e abertos, na altura dos ombros | um estudo | no fim, no tronco, o cotovelo fica 2,5 cm acima do centro do ombro, 30,2 cm para fora dele e 3,4 cm atrás; da metade da puxada em diante, nunca mais de 5,5 cm abaixo do ombro | sim |
| Pausa curta juntando as escápulas | consenso | a clavícula vai 17,6° para trás do começo ao fim; pausa de 0,6 s | sim |
| ~1 s puxando, ~2 s voltando | consenso | 1,1 s e 2,1 s | sim |
| A fita não encosta na cabeça | desenho | a fita passa a no mínimo 11,2 cm da cabeça e do pescoço | sim |

**Conferência automática: 0 falha, 2 avisos.** (1) As linhas de desenho da ficha de movimento (pés, ângulo de partida, pescoço, polegar, `fim.maos`, `fim.aFrente`, `fim.polo.tras`, escápulas). (2) O modo Músculos abre de três quartos por trás (o ombro de trás: 54 cm²); de lado, ele quase não aparece (3 cm²). De trás puro ele aparece menos (48 cm²), como no face pull com corda aprovado, em que o principal também quase não aparece.

## As vistas

**De três quartos, de trás** (padrão dos modos Técnica e Músculos): mostra os cotovelos abrindo e subindo e as mãos chegando ao lado das orelhas, com a fita. **De lado** (segunda vista): mostra o corpo em prancha subindo com a fita, e é a vista dos erros do quadril e do impulso. De lado, no fim, o pegador de perto fica desenhado por cima da orelha (a mão está 14 cm para fora da cabeça; é a mesma armadilha do tríceps testa de lado): por isso ela não é a primeira. De trás puro, o fim se lê muito bem (a pose de "bíceps duplo" de costas), mas o começo vira um borrão (os braços apontam para quem olha).

## Erros (os três do cartão, com o mesmo título e na mesma ordem)

| Erro (texto do app) | Vista | O que o boneco faz (medido) |
|---|---|---|
| Quadril caído | de lado | o quadril dobra: ombro, quadril e tornozelo fazem 150,5° (o certo: 175,5°) e o quadril fica 13,6 cm mais baixo no fim |
| Cotovelos baixos | três quartos, de trás | os cotovelos descem para junto do tronco e as mãos vêm ao peito, como numa remada comum: o cotovelo fica 24,7 cm abaixo do ombro (o certo: 2,5 cm acima) e só 13,6 cm para fora dele |
| Dar impulso | de lado | no meio da puxada, o tronco é jogado para trás: o quadril passa da linha reta (148°) e a lombar arqueia 12° |

"Dar impulso" ("o corpo joga para trás") é em parte ritmo; desenhei a consequência visível que o cartão descreve (o tronco jogado para trás), como o "Jogar o tronco para trás" aprovado do face pull com corda.

## O equipamento

A fita de suspensão aprovada (âncora na altura do fabricante, `dados/objetos/suspensao.json`), sem mudança; a viga é cenário.

## Correções já feitas que esta animação respeita

Achado 5 da anatomia: o meio das costas conta no face pull (a técnica junta as escápulas), em laranja; o ombro de trás em vermelho (a biblioteca). Da suspensão (04/11): a fita não estica e o corpo gira sobre os calcanhares.

## O que não ficou bom

- **O ombro de trás aparece pouco no modo Músculos** (54 cm² na melhor vista), como no face pull com corda aprovado; não há vista em que ele apareça muito, porque o braço levantado cobre a parte de trás do ombro.
- **De lado, no fim, o pegador fica por cima da orelha** (ver "As vistas"); é a segunda vista.
- **O cotovelo dobra muito no fim (140°):** com as mãos ao lado das orelhas e os cotovelos na altura dos ombros, o braço do Boneco precisa disso; com as mãos mais perto da cabeça, o cotovelo subia acima do ombro.
- **De três quartos, no começo,** a cabeça fica parcialmente escondida atrás dos ombros (o corpo está deitado para trás, virado para quem olha).
