# Lote 4 · Barra fixa, pegada supinada (`barra-fixa-supinada`)

De 15/11/2026. A mesma subida da pronada (`exercicios/barra-fixa-base.ts`, sobre o núcleo `exercicios/pendurado.ts`; ver `barra-fixa.md` para a geometria e a estação de barra). Muda a pegada: palmas viradas para você, mãos na largura dos ombros, cotovelos que descem à frente do corpo. Ainda não está ligado às telas do app.

- Ficha da técnica: `docs/pesquisa/animacoes/barra-fixa-supinada.md`. Cartão: `src/conteudo/exercicios/barra-fixa-supinada.json`.
- Ficha de movimento: `src/engine/novo/dados/movimentos/barra-fixa-supinada.json`.
- Animação: `src/engine/novo/exercicios/barra-fixa-supinada.ts`. Regras: `src/engine/novo/regras/pendurado.ts`.
- Folha: `../prototipos/folha-barra-fixa-supinada.png`. Quadros grandes: `../quadros/barra-fixa-supinada.png`.

## O que muda em relação à pronada

1. **Largura:** 1 vez a largura dos ombros (40,8 cm de centro a centro das mãos), "mais ou menos na largura dos ombros" da ficha e do app (hoje: 42 cm).
2. **Polegar:** para fora, ao longo da barra (palmas para você).
3. **Cotovelo:** aponta para a frente, e um pouco para dentro (−0,1). Com o cotovelo um pouco para fora, como na animação de hoje (0,35), a supinação do antebraço passava de 109° (a tabela de amplitudes dá média de 87,5° e máximo de 131°); com −0,1, fica em 84° a 94°. Com a palma virada para você e a mão fechada na barra, quem vira a palma é o antebraço, quase no fim da amplitude: isso é real (a pegada supinada pede supinação completa).

## O que a fonte pede × o que o boneco faz (medido) × confere?

| O que a ficha da técnica (e o cartão) pede | Selo | O que o boneco faz (medido) | Confere? |
|---|---|---|---|
| Palmas viradas para você, mãos mais ou menos na largura dos ombros | consenso | o polegar aponta 99% para fora; 40,8 cm de centro a centro (1×); o antebraço fica de 84° a 94° de supinação | sim |
| A mão segura a barra | consenso | o centro da pegada fica a 0 cm do eixo da barra, com a mão fechada no diâmetro dela (3,2 cm) | sim |
| Pendurado com os braços estendidos | consenso | o cotovelo dobra 8° embaixo | sim |
| Primeiro as escápulas descem, depois os braços dobram | consenso | quando o cotovelo começa a dobrar, o ombro já se afastou 2,6 cm da orelha e o corpo já subiu 4,1 cm | sim |
| Cotovelos descem à frente do corpo, rentes às costelas | consenso | no topo, o cotovelo fica 21,8 cm abaixo do ombro, 16,8 cm do meio do corpo (o centro do ombro fica a 18 cm) e 22,4 cm à frente da linha da coluna (o peito tem 22,6 cm de fundo) | sim |
| Topo: queixo acima da barra, peito perto dela, tronco um pouco para trás | consenso | o queixo 3 cm acima do alto da barra; o peito a 6,6 cm dela | sim |
| Ombros longe das orelhas | consenso | do alto do ombro à base do crânio: 16,1 cm pendurado e 20,5 cm no topo (em pé: 18,7 cm) | sim |
| Pernas juntas, joelhos levemente dobrados, sem balanço | consenso | joelho a 24° (32° no topo); o centro de massa a 0 cm da vertical das mãos | sim |
| O corpo não atravessa a barra | (desenho) | a pele fica a no mínimo 2,5 cm da superfície da barra | sim |
| ~1–1,5 s subindo, ~2–3 s descendo | consenso | 1,5 s / 0,5 s / 2,6 s | sim |

Conferência automática: **0 falha, 5 avisos.** (1) Elevação do braço até 171,2° (média da tabela 170°, máximo 192°): com as mãos na largura dos ombros, o braço fica quase na vertical pendurado. (2) Supinação do antebraço até 93,8° (média 87,5°, máximo 131°), pelo motivo dito acima. (3) Linhas de escolha de desenho. (4) Músculos: o trapézio médio e inferior como secundário dentro de "costas". (5) Vista dos músculos: a padrão é a de trás (532 cm²); de lado, 176 cm². Ritmo: 14,3% (ok).

## Erros

| Erro (texto do app) | Vista | O que o boneco faz (medido) |
|---|---|---|
| Balanço (kipping) | de lado | o chute (quadril 70°, joelho 85°), a lombar arqueada no começo e o centro de massa 10 cm à frente da barra no meio da subida; a cabeça não atravessa a barra (no mínimo 3,1 cm) |
| Meia repetição embaixo | **de lado** | embaixo, o cotovelo fica a 75° e o corpo 13,9 cm mais alto. Na pegada supinada o cotovelo dobra para a frente, e de trás o braço dobrado parecia reto: por isso o erro foi para a vista de lado (na pronada ele fica de trás) |
| Ombros encolhidos no topo | de trás | no topo, a clavícula a 24,3° (no certo, 4,1°), o pescoço esticado e o corpo 6,5 cm mais baixo |

## Músculos

Dorsal em vermelho; trapézio médio e inferior, bíceps e ombro de trás em laranja (a biblioteca conta costas, bíceps e ombro posterior; o ombro de trás entrou pela decisão de 06/11). O antebraço fica fora, como na animação aprovada de hoje.

## Correções já feitas que esta animação respeita

- Ombro posterior em laranja (decisão de 06/11, "incoerência 1" da auditoria): sim.

## O que não ficou bom

- Os mesmos da pronada: de lado, no topo, o braço de perto cobre parte do rosto; o corpo ocupa cerca de 75% da altura do quadro (o boneco pendurado tem 230 cm do pé à mão e sobe 54 cm).
- De lado, no erro "meia repetição", o braço dobrado tapa a cabeça (o erro se lê pelo braço).
