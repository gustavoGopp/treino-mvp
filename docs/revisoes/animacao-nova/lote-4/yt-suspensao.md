# Lote 4 · T na suspensão (`yt-suspensao`)

De 15/11/2026. Sobre o núcleo `exercicios/na-fita.ts`. **Só o T é animado**; o Y fica no texto, como pede a ficha (o último degrau da escada). Ainda não está ligado às telas do app.

- Ficha da técnica: `docs/pesquisa/animacoes/yt-suspensao.md`. Cartão: `src/conteudo/exercicios/yt-suspensao.json`.
- Ficha de movimento: `src/engine/novo/dados/movimentos/yt-suspensao.json`.
- Animação: `src/engine/novo/exercicios/yt-suspensao.ts`. Regras: `src/engine/novo/regras/suspensao.ts`.
- Folha: `../prototipos/folha-yt-suspensao.png`. Quadros grandes: `../quadros/yt-suspensao.png`.

## Como a geometria foi montada

1. **O começo:** corpo a 65° da vertical, calcanhares no chão 35 cm antes da vertical da âncora, braços quase retos (cotovelo a 10°) na linha da fita, palmas para baixo. Daí a fita sai com **129,7 cm**.
2. **No movimento**, o braço gira no tronco da frente (na linha da fita) até 90° para o lado, na altura do ombro, com o cotovelo sempre a 10° (o cotovelo aponta para fora no começo e para trás no T; o polegar, para dentro no começo e para a frente no T). O corpo sobe pela fita: **de 65° a 18,8°**, como nos vídeos de referência (hoje: de 60° a 16°).
3. **Por que 65° e 35 cm antes da âncora** (hoje: 60° e 12 cm além, com a âncora a 205 cm): no T as mãos ficam longe da âncora, e a fita precisa ser longa. Com a âncora do fabricante, os pés da remada (20 cm antes) e 55°, a fita ficava com 97 cm e o corpo teria de passar da vertical (medido); com 60° e 35 cm, terminava quase a prumo (9,6°).

## O que a fonte pede × o que o boneco faz (medido) × confere?

| O que a ficha da técnica (e o cartão) pede | Selo | O que o boneco faz (medido) | Confere? |
|---|---|---|---|
| Fitas num ponto firme no alto, alças na mesma altura | consenso | as duas fitas com 129,7 cm o ciclo inteiro (variação 0 cm) | sim |
| De frente para a âncora, corpo reto inclinado para trás, calcanhares no chão | consenso | ombro, quadril e tornozelo a no mínimo 175,6°; o pé parado, o calcanhar a 0 cm do chão | sim |
| Palmas para baixo, braços estendidos à frente | consenso | no começo, o polegar aponta 96% para dentro (no tronco); o pegador fica na linha da fita | sim |
| T: abre os braços quase retos | consenso | o cotovelo fica a 10° o movimento inteiro | sim |
| Até as mãos chegarem na linha dos ombros | consenso | no fim, a pegada fica 0 cm à frente da linha dos ombros, na altura do ombro, a 81 cm do meio do corpo | sim |
| Juntando as escápulas | consenso | a clavícula vai 18,2° para trás do começo ao fim; ombros baixos (−1) | sim |
| O corpo sobe junto (a fita não estica) | consenso (cartão) | de 65° a 18,8° da vertical; o quadril sobe de 44,7 para 89,1 cm | sim |
| ~1 s abrindo, 1 s parado, ~2 s voltando | consenso | 1,1 s / 1 s / 2,1 s | sim |

Conferência automática: **0 falha, 2 avisos.** (1) As linhas de escolha de desenho (pés, ângulo inicial, ponta do pé, polegar, escápulas). (2) Músculos: a vista padrão é a de trás (54 cm² do ombro de trás); de lado, 4 cm², e a vista de lado sai do modo Músculos. Ritmo suave (6,6%).

A pronação do antebraço fica em 73–75° (perto do neutro) mesmo com as palmas para baixo: com o cotovelo apontando para fora, quem vira a palma é o ombro (rotação interna), não o antebraço. Por isso a regra "palmas para baixo" mede o polegar no tronco, e não a pronação.

## Erros

| Erro (texto do app) | O que o boneco faz (medido) |
|---|---|
| Dobrar os cotovelos (de trás) | os cotovelos dobram 112° e as mãos vêm ao peito, como numa remada; o corpo quase não sobe (fica a 47° em vez de 18,8°) |
| Encolher os ombros (de trás) | a escápula sobe 7 (o ombro sobe 1,6 cm) |
| Quadril cai (de lado) | o quadril dobra 34° e desce 7,2 cm no T (de 89,1 para 81,9 cm) |

## O equipamento

A fita do lote 1 com os acréscimos deste lote (`pontoDeDivisao`, `vigaComoCenario`, viga escondida na vista de cima). De trás, a viga aparece em cima, como cenário.

## Correções já feitas que esta animação respeita

- O T é animado; o Y fica no texto (04/11).
- Só o ombro de trás em vermelho (a biblioteca não conta costas, achado 5): sim.
- A fita não estica e o corpo gira sobre os calcanhares (04/11): sim.

## O que não ficou bom

- **De lado, no T, o pegador e a mão ficam sobre o ombro no desenho** (eles estão 81 cm para o lado, atrás do ombro, na linha de quem olha). A vista de lado só mostra o corpo subindo; quem ensina o T é a vista de trás.
- **O encolher os ombros quase não se vê**: com o braço na horizontal, os 7 de elevação da escápula sobem o ombro só 1,6 cm (o mesmo valor de hoje). Aumentar o número seria exagerar a pose.
- Pés 35 cm antes da âncora e 65° no começo (hoje: 12 cm além e 60°), pelo motivo dito acima.
