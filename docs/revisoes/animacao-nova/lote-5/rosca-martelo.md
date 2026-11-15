# Lote 5 · Rosca martelo com halteres (`rosca-martelo`)

De 15/11/2026. Segunda animação da família das roscas no motor novo: a rosca alternada com a pegada neutra (palmas uma para a outra, polegar para cima no topo), um braço de cada vez, como o texto do app e a animação aprovada de hoje. Ainda não está ligada às telas do app.

- Ficha da técnica: `docs/pesquisa/animacoes/rosca-martelo.md`.
- Ficha de movimento: `src/engine/novo/dados/movimentos/rosca-martelo.json`.
- Animação: `src/engine/novo/exercicios/rosca-martelo.ts`, sobre o núcleo `exercicios/dobrar-o-cotovelo.ts` (o mesmo da alternada; muda a pegada e a abertura do braço).
- Regras medidas: `src/engine/novo/regras/roscas.ts` (a nova aqui é `palmas-uma-para-a-outra-na-rosca`).
- Folha ao lado da de hoje: `../prototipos/folha-rosca-martelo.png`. Quadros grandes: `../quadros/rosca-martelo.png`.

## Como fica

O corpo, o ritmo, a alternância e os erros são os da alternada (ver `rosca-alternada.md`). A mão fica com o polegar para a frente do antebraço o tempo todo (pegada neutra): o cabo do halter fica de pé em relação ao antebraço, apontando para a frente embaixo e para cima no topo. Com o cabo para a frente, as cabeças do halter ficam na frente e atrás da mão, e não do lado da coxa: o braço só precisa abrir 6° (a abertura dos braços pendurados do desenho aprovado), e não 17° como na alternada.

## O que a fonte pede × o que o boneco faz (medido) × confere?

| O que a ficha da técnica (e o texto do app) pede | Selo | O que o boneco faz (medido) | Confere? |
|---|---|---|---|
| Em pé, pés na largura do quadril, joelhos destravados | consenso | pés a 9 cm do meio, joelhos a 5°; os pés não saem do lugar (0 cm) | sim |
| Pegada neutra: palmas uma para a outra o tempo todo, sem girar | consenso | o polegar fica a 0° da posição neutra em todos os quadros, nos dois braços | sim |
| Cotovelos encostados ao lado do tronco, parados | consenso | o cotovelo anda 0 cm enquanto dobra de 8° a 130°; o braço fica 0° à frente da linha do tronco e 6° aberto | sim |
| Sobe até os halteres chegarem perto dos ombros | consenso | o centro da pegada chega a 27,3 cm do centro do ombro, 9 cm abaixo e à frente dele; o cotovelo dobra 130° | sim |
| Estende os braços embaixo | consenso | o cotovelo dobra 8° (sem travar) | sim |
| Um braço de cada vez (texto do app) | consenso | enquanto o direito sobe, a mão esquerda não anda (0 cm) | sim |
| ~1 s subindo, ~2 s descendo | consenso | 1,1 s e 2,2 s; salto de velocidade de 6% (limite 15%) | sim |
| O halter não atravessa o corpo (desenho) | — | menor folga de 0,4 cm (do antebraço, junto ao punho da mão que segura), no ciclo inteiro e nos três erros | sim |
| Equilíbrio | — | o centro de massa (corpo + 2 × 11,3 kg) fica sempre dentro do apoio dos pés | sim |

**O topo a 130°, e não a 132° como na alternada:** com o cabo de pé, a cabeça de trás do halter chega ao braço quando o cotovelo passa de ~135° (medido: a folga cai para 0,2 cm a 135°). 130° deixa o halter perto do ombro sem encostar.

Conferência automática: **0 falha, 3 avisos**: as linhas de desenho (abertura do braço e peso do halter); o antebraço em "só ajuda" (correção de 04/11); e a vista de lado, que não serve ao modo Músculos.

## As vistas

- **De lado** (padrão da técnica): cotovelo parado e o halter de pé subindo sem girar.
- **De frente**: os halteres aparecem de topo (a face sextavada), o sinal de que as palmas estão viradas uma para a outra; e a alternância. É a vista padrão do modo Músculos, medida: de frente 192 cm² do bíceps; de três quartos (`quina`) 124 cm²; de lado 54 cm² (não serve). Testei a de três quartos como segunda vista: o braço esquerdo some atrás do corpo e o halter dele parece solto; fiquei com a de frente.

## Erros

| Erro (texto do app) | O que o boneco faz (medido) |
|---|---|
| Balançar o tronco (de lado) | o peito vai 12° para trás e a lombar arqueia 6° enquanto o halter sobe; os pés não saem do lugar |
| Cotovelos vão para a frente (de lado) | o braço sobe 35° à frente do tronco e o antebraço dobra 110°: o cotovelo anda 17 cm para a frente e o halter fica à frente do queixo |
| Não estender os braços (de lado) | embaixo, os cotovelos param dobrados 55°; o halter fica 13 cm acima de onde fica no certo |

## Correções já feitas que esta animação respeita (`correcoes-ja-feitas.md`)

- Antebraço "só ajuda" (listrado) nas roscas (04/11, `SO_AJUDA`). Respeitada.
- Rosca martelo foi o caso que motivou o acabamento A2 (braço sumindo no tronco de lado, sem mão, halter como borrão de frente). No motor novo, de lado, o braço tem contorno próprio por cima do tronco e a mão fecha em volta do cabo; de frente ver abaixo.
- "Polegar para cima" só no texto (limite de 04/11): o rótulo de lado agora é "sobe sem girar a mão" (do texto do app), porque embaixo o polegar aponta para a frente, e não para cima.

## Músculos

Bíceps (principal) e antebraço (só ajuda, listrado: é ali que fica o braquiorradial, que a ficha cita). O braquial não existe como grupo no desenho; a biblioteca conta só o bíceps.

## O que não ficou bom

- **De frente, a cabeça do halter cobre a mão** (embaixo, e em parte no topo): é a geometria (a cabeça da frente fica entre a mão e quem olha), a mesma limitação registrada em 04/11 ("disco do halter cobre a mão de frente"). Não pintei a mão por cima da cabeça porque ficaria na profundidade errada. De lado a mão aparece fechada no cabo.
