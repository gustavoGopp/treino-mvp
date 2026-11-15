# Lote 6 · Flexão de joelho deslizante (`flexao-joelho-deslizante`)

De 15/11/2026. Primeira animação da família das flexões de joelho deitado. **Ainda não foi revista pelo Gustavo.**

- Ficha da técnica: `docs/pesquisa/animacoes/flexao-joelho-deslizante.md`. Texto do app: `src/conteudo/exercicios/flexao-joelho-deslizante.json` (só leitura).
- Ficha de movimento: `src/engine/novo/dados/movimentos/flexao-joelho-deslizante.json`.
- Animação: `src/engine/novo/exercicios/flexao-joelho-deslizante.ts`, sobre o núcleo da família (`exercicios/flexao-joelho.ts`: `ponteDeCostas`, que a flexão na suspensão vai usar com o calcanhar no ar, preso na fita).
- Regras medidas: `src/engine/novo/regras/flexao-joelho.ts`.
- Peça nova: a toalha de mão dobrada ao meio (`pecas-de-cena/toalha.ts`), com as medidas em `dados/objetos/toalha.json` (16 × 30 pol, Zogics; a espessura é provisória).
- Folha ao lado da de hoje: `../prototipos/folha-flexao-joelho-deslizante.png`. Quadros grandes: `../quadros/flexao-joelho-deslizante.png`.

## Como a pose é montada

Deitado de costas, a cabeça para −z. A cada quadro: (1) a bacia inclina o que a ficha pede (do início, com o glúteo a 5 cm do chão, ao fim, com ombros, quadril e joelhos em linha); (2) o corpo desce até a parte de cima das costas encostar no chão; (3) o pescoço dobra até a cabeça encostar; (4) o corpo anda em z para os ombros ficarem no lugar; (5) a coxa gira no plano de lado até o pé chegar ao tampo da toalha. O calcanhar não é contato preso: ele desliza, e a regra `calcanhar-desliza-no-apoio` mede o caminho. A toalha anda com os calcanhares (fica centrada debaixo deles, como pede a correção de 04/11). As mãos ficam presas no chão (`mao.R`, `mao.L`).

## O que a fonte pede × o que o boneco faz (medido) × confere?

| O que a ficha da técnica pede | Selo | O que o boneco faz (medido) | Confere? |
|---|---|---|---|
| Deitado de costas, braços no chão ao lado do corpo, palmas para baixo | consenso | mãos espalmadas no chão a 56 cm do ombro, 6 cm para fora dele; cotovelo dobra 17° a 19°; as mãos não saem do lugar (0 cm) | sim |
| Calcanhares na toalha | consenso | o ponto mais baixo do pé fica a 0 cm do tampo da toalha em todo o ciclo | sim |
| Quadril fora do chão o tempo todo, um pouco elevado com as pernas estendidas | consenso | a pele do glúteo fica de 5 cm (início, escolha de desenho) a 19 cm do chão; o centro da bacia sobe de 15,5 a 30,7 cm | sim |
| Com os joelhos dobrados, ombros, quadril e joelhos em linha | consenso | no fim, de lado, ombro, quadril e joelho fazem 177° | sim |
| Os calcanhares deslizam até perto do glúteo | consenso | o calcanhar desliza 64,7 cm, sem andar para o lado (0 cm); no fim fica 28 cm à frente do centro do quadril, e a uns 18 cm da pele do glúteo; o joelho dobra de 10° a 120° | **em parte**: "perto" não tem número; 18 cm é o que dá com 120° de joelho e o corpo em linha |
| Ombros no chão; a cabeça apoiada | consenso | o ponto mais baixo das costas fica de 0 a 0,3 cm do chão e o da cabeça a 0 cm; o centro do ombro anda 1,7 cm (a escápula rola no chão quando a bacia sobe) | sim |
| Pé em ângulo reto com a canela (correção de 04/11) | consenso | dorsiflexão de 0° no ciclo inteiro: o pé apoia no calcanhar, com a ponta para cima | sim |
| Puxada em ~1 s; volta em ~2–3 s | consenso | 1,2 s e 2,5 s, com 0,5 s parado no início e 0,6 s no fim | sim |

Conferência automática: **0 falha, 2 avisos**. Amplitudes: joelho 120° (ok); quadril de 8,2° de extensão a 9,1° de flexão; cotovelo 19°; elevação do braço 32° (é o tronco que inclina, não o braço que sobe); ponto mais baixo do corpo −0,2 cm; ritmo 12,5% (ok). Os avisos:

1. Provisórios: `joelho.fim` (120°), `quadril.folgaNoInicio` (5 cm), `ombro.z`, `maos.abaixoDoOmbro`, `maos.paraFora`. Só os dois primeiros mudam a técnica; a ficha não dá número para eles.
2. Músculos: de três quartos, de trás, o principal (posteriores) não aparece (0 cm²): a vista padrão do modo Músculos é a de lado (67 cm²).

## Erros

| Erro (texto do app) | O que o boneco faz (medido) |
|---|---|
| Quadril encosta no chão | enquanto os calcanhares vêm, a bacia desce até o glúteo ficar a 0,3 cm do chão; no fim, ombro–quadril–joelho fazem 123° (177° no certo) |
| Arquear a lombar | a lombar arqueia 25° e a bacia sobe 4 cm a mais que no certo (centro a 34,9 cm); a barriga sobe. A linha ombro–quadril–joelho, medida nos centros, ainda dá 175°: o erro se vê na curva das costas, não na linha |
| Puxar pouco | o joelho para a 54° (120° no certo); o calcanhar fica 73 cm à frente do quadril |

## Correções já feitas que esta animação respeita (`correcoes-ja-feitas.md`)

- 04/11: "toalha maior e centrada sob o calcanhar; pé em ângulo reto com a canela". Respeitada: a toalha tem a medida de uma toalha de mão (40,6 × 38,1 cm dobrada) e anda centrada sob os calcanhares; o pé fica a 0° de dorsiflexão.
- A panturrilha fica fora do realce, como a ficha da técnica decidiu.

## Músculos e vistas

O realçado bate com o conteúdo (principal: posteriores da coxa; secundário: glúteo). Os posteriores existem no desenho (`dados/musculos.json`, grupo `posteriores`). A vista de lado é a do modo Músculos; a de três quartos, de trás, fica para a Técnica (mostra a toalha e as duas pernas). A vista `quina` (de frente) não foi usada porque a folha ao lado da de hoje não sabe desenhar o guia de hoje nela.

## O que não ficou bom

- No fim, o calcanhar fica a uns 18 cm da pele do glúteo. Para chegar mais perto, o joelho teria de dobrar mais de 120° com o quadril estendido.
- No erro da lombar, a linha ombro–quadril–joelho medida nos centros quase não muda (175°): o que aparece é a curva das costas e a barriga mais alta. Pode não ler como erro na miniatura.
- O ombro anda 1,7 cm (sobe um pouco quando a bacia inclina): o limite da regra é 2 cm, escolha minha.
- A toalha, de lado, é só uma linha fina; de três quartos ela aparece, mas sem as dobras do tecido (é uma placa com a borda arredondada e um friso).
- A rótulo "ombros, quadril e joelhos em linha" aparece já no início, quando o corpo ainda não está em linha (a linha-guia mostra o ângulo); o texto vale para o fim.
- A espessura da toalha (0,4 cm por camada) é provisória.
