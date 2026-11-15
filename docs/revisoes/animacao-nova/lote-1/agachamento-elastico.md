# Lote 1 · Agachamento com elástico (`agachamento-elastico`)

De 15/11/2026. Segunda animação do lote 1. **Aprovada pelo Gustavo na folha em 15/11/2026 ("aprovada").** Ainda não está no app: falta ligar o motor novo às telas.

- Ficha da técnica: `docs/pesquisa/animacoes/agachamento-elastico.md`.
- Ficha de movimento: `src/engine/novo/dados/movimentos/agachamento-elastico.json`.
- Animação: `src/engine/novo/exercicios/agachamento-elastico.ts`, sobre o núcleo comum dos agachamentos (`agachar.ts`).
- Peça nova: o elástico em tubo, com um pegador em cada ponta (o do cartão `elasticos` do app), com as medidas reais na tabela de objetos (`pesquisa/11-medidas-do-elastico.md`).
- Folha ao lado da de hoje: `../prototipos/folha-agachamento-elastico.png`. Quadros grandes: `../parada-do-corpo/12-agachamento-elastico.png`.

## O que a fonte pede × o que o boneco faz (medido) × confere?

| O que a ficha da técnica pede | Selo | O que o boneco faz (medido) | Confere? |
|---|---|---|---|
| Os dois pés pisando no meio do elástico | consenso | o tubo passa por baixo dos dois pés, no meio da sola, e os pés não saem do lugar (0 cm) | sim |
| Cada mão segura uma ponta na frente dos ombros | consenso | em pé, a pegada fica 15,5 cm à frente e 0,8 cm acima do centro do ombro | sim |
| Cotovelos para baixo e um pouco à frente | consenso | em pé, o cotovelo fica 29,5 cm abaixo e 2,6 cm à frente do ombro | sim |
| O elástico sobe pela frente do corpo | consenso | em pé, desce reto da mão ao pé, pela frente; com o joelho dobrado, passa por fora do joelho (a perna fica no caminho) | sim, com escolha de desenho no joelho |
| Pés um pouco mais abertos que o quadril, pontas levemente para fora; peito alto | consenso | pés a 19 cm do meio, pontas 15° para fora | sim |
| Descida de ~2–3 s; subida de ~1–1,5 s | consenso | 2,4 s e 1,3 s, com 0,45 s de pausa embaixo | sim |
| Joelhos para a frente e para fora, na direção dos pés | consenso | o joelho anda a 4,1° da direção do pé | sim |
| Embaixo, quadril na altura do joelho ou abaixo, calcanhar apoiado, lombar neutra | consenso | o quadril fica 5,5 cm abaixo do joelho (38,2 e 43,8 cm do chão); o peso a no máximo 0,3 cm do meio do pé; lombar 0° | sim |
| O elástico estica mais em cima, e quase não tem tensão embaixo | consenso (física) | estica 2,5 vezes em cima (303 cm) e 1,4 vez embaixo (177 cm); o tubo de 122 cm nunca fica frouxo e não passa das 3 vezes do fabricante | **em parte**: está mais esticado em cima, mas embaixo ainda está esticado 1,4 vez, e não "quase sem tensão" |

Sobre a última linha: com um tubo de 122 cm pisado com os pés a 38 cm um do outro e as mãos nos ombros, a conta dá 1,4 vez embaixo. Para ficar quase frouxo embaixo, o elástico teria de ter perto de 175 cm. O texto da ficha descreve a tensão de modo geral; fica anotado em `../pedidos-ao-conteudo.md`.

Amplitudes (conferência automática, 0 falha): joelho 126°; quadril 131°; dorsiflexão do tornozelo 30° (**aviso**: média 14,8°, máximo 48°); cotovelo 153° (**aviso**: média 148°, é a mão no ombro); pronação do antebraço 81° (**aviso**: média 80°).

## Erros

| Erro (texto do app) | O que o boneco faz (medido) |
|---|---|
| Joelhos para dentro (de frente) | cada joelho cai 10,1 cm para dentro, e continua assim embaixo |
| Tronco cai e a lombar arredonda (de lado) | o peito cai a 45° (33° no certo) e a bacia gira para trás, com 35° de flexão da lombar: o mesmo erro refeito no goblet depois da revisão |
| Descer pouco (de lado) | para com o joelho a 72°: o quadril fica a 71,5 cm do chão, 24,6 cm acima do joelho |

## Correções já feitas que esta animação respeita (`correcoes-ja-feitas.md`)

- O erro `lombar` no lugar de "calcanhar" (05/11/2026, pedido pelo cartão). Respeitada: os três erros são os do texto do app.

## Músculos e vistas

O realçado bate com o conteúdo (principal: quadríceps; secundários: glúteos e adutores). A vista de lado é a do modo Músculos (352 cm²); a de frente fica para a Técnica e para o erro do joelho.

## O que não ficou bom

- O tornozelo dobra 30°, o dobro da média: é o agachamento fundo sem calcanhar elevado e com as mãos nos ombros (sem o contrapeso dos braços à frente). Dentro do máximo observado, mas é muito para um iniciante.
- De lado, embaixo, o rótulo "mãos nos ombros" fica acima da cabeça e o fio passa na frente do rosto.
- O tubo é desenhado como uma linha quebrada em três trechos; onde passa pelo joelho faz uma quina, e não uma curva.
- O efeito do elástico sobre o equilíbrio (ele puxa as mãos para baixo) não entra na conta do centro de massa.
