# Lote 2 · Flexão com os pés elevados (`flexao-pes-elevados`)

De 15/11/2026. Segunda animação do lote 2. Ainda não aprovada nem ligada às telas do app.

- Ficha da técnica: `docs/pesquisa/animacoes/flexao-pes-elevados.md`.
- Ficha de movimento: `src/engine/novo/dados/movimentos/flexao-pes-elevados.json`.
- Animação: `src/engine/novo/exercicios/flexao-pes-elevados.ts`, sobre o núcleo das flexões (`exercicios/flexionar.ts`), com os pés no tampo do banco reto.
- Regras novas (em `regras/flexoes.ts`): `pes-no-apoio`, `cabeca-livre-do-chao`.
- Folha ao lado da de hoje: `../prototipos/folha-flexao-pes-elevados.png`. Quadros grandes: `../quadros/flexao-pes-elevados.png`.

## O apoio dos pés: o banco reto, e não um degrau

A ficha e o texto do app pedem "um degrau de escada, a cama ou um sofá firme"; a animação de hoje (aprovada em 10/11/2026) usa uma caixa de 45 cm, a altura de uma cama ou de um sofá. Aqui o apoio é o **banco reto** da tabela de objetos (43,5 cm, medida de fabricante, `dados/objetos.json`), que já existe no motor: a altura fica a 1,5 cm da caixa aprovada, e as medidas têm fonte. Não fiz peça nova de cama ou sofá (não há ficha pública de medida que sirva para "uma cama") nem de degrau (um degrau de 16 a 18 cm, sozinho, vira o "step solto" que a revisão de 10/11 já apontou como limite, e mudaria a inclinação do corpo aprovada). **O banco não está na lista da ficha**: se o Gustavo quiser o degrau ou um sofá, é uma peça nova e a calibração refaz o resto sozinha.

## O que a fonte pede × o que o boneco faz (medido) × confere?

| O que a ficha da técnica pede | Selo | O que o boneco faz (medido) | Confere? |
|---|---|---|---|
| Mãos no chão um pouco mais abertas que os ombros | consenso | o centro da mão fica a 30,4 cm do meio do corpo (a da `flexao`); a borda de dentro, 2 cm para fora da linha de fora do ombro | sim |
| Pés no apoio, que não desliza | consenso | as pontas dos pés ficam no tampo do banco (0 cm de folga) e não saem do lugar no ciclo (0 cm); o banco fica parado | sim |
| Corpo reto da cabeça aos calcanhares | consenso | ombro, quadril e tornozelo fazem no mínimo 177° de lado; a lombar não dobra | sim |
| A cabeça fica abaixo do quadril | consenso | embaixo, o quadril fica a 36 cm do chão e a cabeça a 1,5 cm | sim |
| Descida em ~2 a 3 s, cotovelos a ~45° do corpo | consenso | 2,5 s; embaixo, o braço faz 50,5° com o tronco, visto de cima | sim |
| Até o peito quase tocar o chão | consenso | o peito para a **8,9 cm** do chão (o limite da regra é 9): a cabeça chega antes, a 1,5 cm do chão | **em parte**: ver abaixo |
| Empurra até os braços estenderem, sem travar | consenso (`ebben2011`) | em cima, o cotovelo dobra 10° | sim |
| Subida ~1 s | consenso | 1,0 s | sim |

**Por que o peito não desce a 5 cm, como na `flexao`:** com a cabeça abaixo dos pés, a cabeça em linha com o corpo bate no chão antes do peito. Medido: com o peito a 5 cm, o ponto mais baixo da cabeça ficaria 4,7 cm **abaixo** do chão. A descida agora para no que vier primeiro: o peito a 5 cm ou a cabeça a 1,5 cm do chão (`cabeca.aoChao`, escolha de desenho); com os pés a 43,5 cm, a cabeça vem primeiro. O pescoço estende um pouco mais que na `flexao` (16° e 12°, contra 4° e 6°) e ajuda pouco (o peito sobe de 9,9 para 8,9 cm). A animação de hoje resolveu o mesmo problema parando os ombros a 20 cm ("o queixo não bate no chão"); aqui os ombros param a 25 cm.

**Outras escolhas de desenho, todas medidas:**

- A linha das mãos: embaixo, a mão fica debaixo do ombro (`maos.abaixoDoOmbro` = 0; na `flexao`, 13 cm). A ficha não dá a linha; com os pés elevados o ombro quase não anda para trás na subida, e com a mão 13 cm atrás o punho dobrava 107° em cima (máximo observado: 95°). Ficou em 93°.
- O tornozelo: com o corpo inclinado para baixo e os dedos no tampo, o tornozelo da `flexao` (10°) dobrava os dedos 96° (máximo: 90°). Ficou em 27° de dorsiflexão (o calcanhar vai para trás), com os dedos a 80°.

Conferência automática: **0 falha**. Avisos: dorsiflexão do tornozelo 27° (média 14,8°, máximo 48°); extensão do punho 93° (média 70°, máximo 95°); extensão dos dedos do pé 80,1° (média 70°, máximo 90°); ritmo com salto de 15,3% (limite do suave: 15%; tranco acima de 25%); as linhas de desenho da ficha (`maos.abaixoDoOmbro`, `tornozelo.dorsiflexao`, `escapula.retracaoEmbaixo`, `pes.daBordaDoBanco`, `banco.pontaNoQuadro`, `pescoco.extensao`, `cabeca.extensao`, `cabeca.aoChao`); o abdômen listrado fora da lista do conteúdo (é a correção de 10/11); e a vista de cima, que não serve ao modo Músculos (de lado, 84 cm², é a padrão).

## Erros

| Erro (texto do app) | O que o boneco faz (medido) |
|---|---|
| Quadril caído ou alto demais (de lado) | só o caído, como na animação de hoje: a lombar arqueia 16°; ombro, quadril e tornozelo fazem 166° (o certo: 177°); a barriga para a 1 cm do chão e a cabeça a 0,2 cm |
| Descer pouco (de lado) | para na metade: o peito fica a 24 cm do chão, o cotovelo dobra 84° |
| Cotovelos abertos em T (de cima) | embaixo, o braço faz 83° com o tronco, visto de cima (o certo: 50,5°) |

## Músculos

Principal: peitoral; secundários: tríceps e frente do ombro; o abdômen listrado ("só ajuda"), como a correção de 10/11/2026 pediu (como na `flexao`). Vista do modo Músculos: de lado.

## Correções já feitas que esta animação respeita (`correcoes-ja-feitas.md`)

- 10/11/2026: o abdômen na lista do "só ajuda". Respeitada.
- 10/11/2026: a caixa de 45 cm. Respeitada em altura (o banco tem 43,5 cm), trocada a peça (ver acima).
- 10/11/2026: o erro do cartão é "quadril caído ou alto demais" e o boneco mostra só o caído. Mantido assim (um erro desenhado só mostra um quadro).
- A correção de texto da altura da cabeça (`872da42`): a cabeça fica abaixo do quadril, medida.

## O que não ficou bom

- **O peito para a 8,9 cm do chão**, no limite da regra "quase toca". A ficha pede o peito quase tocando; com a cabeça em linha, o corpo não chega lá. Pode parecer que a pessoa "desce pouco".
- **O banco não é o apoio que o texto do app cita** (degrau, cama ou sofá). Tem a altura certa e medida real, mas é equipamento de academia num exercício pensado para casa.
- **De cima, o banco cobre o quadro acima dos pés** e corta o tampo na borda (é a ponta que o quadro mostra).
- **A cabeça para a 1,5 cm do chão**: de lado, parece que o rosto encosta.
- **O erro do quadril** mostra só o caído; o "alto demais" fica no texto.
- O tornozelo e a linha das mãos mudaram contra a `flexao` para os ângulos caberem; são escolhas de desenho medidas, sem fonte própria.

## Risco de o Gustavo não gostar

**Médio.** A pose é a da flexão aprovada, girada, e passa em tudo; mas a troca da caixa pelo banco e o peito parando a quase 9 cm do chão são decisões que ele pode querer diferentes.
