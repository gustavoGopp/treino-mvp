# Pedidos ao conteúdo (animação nova)

Esta frente não corrige texto técnico nem lista de músculos por conta própria. O que ela encontra fica aqui, com a fonte, para o Gustavo decidir em separado. Nada abaixo foi alterado em `src/conteudo/`, `src/domain/` nem no guia de hoje.

## 1. Supino reto com halteres: o ângulo dos cotovelos aparece com dois intervalos (14/11/2026)

| Onde | O que diz |
|---|---|
| Pesquisa da técnica (`docs/pesquisa/08-tecnica-guia.md`, conclusão 4, `tecnica.supino-halteres.cotovelos`) | cotovelos a **~30–60°** do tronco (consenso com apoio biomecânico) |
| Ficha da técnica da animação (`docs/pesquisa/animacoes/supino-reto.md`) | **~30–60°**, citando a conclusão acima |
| Texto do app (`src/conteudo/exercicios/supino-reto.json`, campo `vary`) | "entre **~30° e ~70°** do tronco" |
| Rótulo do guia de hoje, vista de cima (`src/engine/exercicios/supino-reto.ts`) | "cotovelo **~30–70°** do tronco" |

O que a animação nova faz: usa **30–60°** no rótulo e na regra conferida (o boneco desce com o braço a 50° do tronco), porque é o que a pesquisa lida sustenta.

Pedido: decidir qual intervalo vale e alinhar o texto do app (e o rótulo do guia de hoje, enquanto ele existir). Recomendação: 30–60°, o da pesquisa. Se o 70° veio de outra leitura (o campo `vary` cita um estudo de modelagem com supino de barra), a fonte precisa entrar na pesquisa.

## 2. Músculos: o que a conferência nova mostra (14/11/2026)

A conferência passou a comparar o músculo realçado em cada animação com a biblioteca do app (`src/domain/biblioteca/exercicios.json`). Não há divergência de papel nas quatro âncoras. Ficam três observações, que não são erro do conteúdo:

- **Flexão de braço:** o desenho realça o reto abdominal como "só ajuda a firmar", e a biblioteca não lista o abdômen na flexão. O guia de hoje já desenha assim. Confirmar se fica.
- **Puxada unilateral:** o trapézio aparece como secundário, e a biblioteca conta "costas" como um grupo só (principal). O guia de hoje desenha trapézio médio e inferior e romboides como secundários (decisão de 02/11/2026). Confirmar se fica.
- **Supino, flexão e puxada:** a biblioteca separa o ombro em anterior, lateral e posterior; o desenho novo só tem o deltoide inteiro. É a decisão aberta sobre as porções que o desenho não separa (proposta, seção 9, item 11).

## 3. Supino inclinado: dizer em que nível pôr o banco (pedido do Gustavo, 15/11/2026)

O que ele pediu: ter o supino inclinado na animação nova e, se der, uma recomendação de mais ou menos em que nível pôr o banco ("2, 3, 4"), conforme o tamanho da pessoa. Se não der, fica para um segundo momento.

O que já existe:

- O supino inclinado com halteres já tem animação no guia de hoje e texto no app (`src/conteudo/exercicios/supino-inclinado.json`: "Encosto a cerca de 30° (um terço do caminho entre deitado e sentado)"). Na animação nova ele está no lote 3; o banco regulável já tem as medidas na tabela de objetos (Rogue Adjustable Bench 3.0: 10 posições, de 0 a 85°).
- A pesquisa (`docs/pesquisa/08-tecnica-guia.md`, conclusão 3): banco a **~30°**, aceitável de 15° a 45°; acima de 45° o ombro assume. Selo: um estudo, de ativação muscular (30 pessoas treinadas), e não de crescimento.

O que dá para fazer e o que não dá:

- **Dá:** a animação mostrar o encosto no ângulo certo, com o ângulo escrito, e o texto dizer "o encaixe mais perto de 30°".
- **Não dá para dizer "nível 3" valendo para todo banco:** o número do furo não é padronizado; cada fabricante tem um número de posições e ângulos diferentes. Só daria com a ficha do modelo do banco da pessoa.
- **Pelo tamanho da pessoa:** a pesquisa lida não tem nada que faça o ângulo mudar com a altura. Sem fonte, não entra como regra.

Proposta: no lote do supino inclinado, desenhar o encosto a 30° com o ângulo marcado e uma dica de como achar o encaixe sem transferidor ("um terço do caminho entre deitado e sentado", que o texto do app já usa). A ideia de dizer o número do furo pelo modelo do banco reconhecido nas fotos vai para o `docs/backlog.md` no fechamento desta frente.

## 4. Puxada unilateral: "a cerca de meio passo" da torre deixa o cabo em pé demais (15/11/2026)

O texto do app e a ficha da técnica pedem ajoelhar "a cerca de meio passo" da torre e terminar com o "cotovelo ao lado das costelas, um pouco atrás do tronco". Com a polia no alto (193 cm) e a pessoa tão perto, o cabo fica quase na vertical, e para o cotovelo chegar às costelas ele precisa dobrar muito. Medido no boneco:

| Distância dos joelhos à base da torre | Tronco | Dobra do cotovelo no fim |
|---|---|---|
| 62 cm (como estava) | 4° para trás | 162° (a mão chega ao queixo) |
| 70 cm (como ficou) | 8° para trás | 152° |
| 90 cm | 8° para trás | 145° |
| 110 cm | 4° para trás | 148° |

A amplitude média de flexão do cotovelo é 148° e a máxima observada, 166° (CDC). Os dois revisores automáticos apontaram os 162° (um como erro, outro como impreciso) e sugeriram terminar perto de 145°.

O que a animação fez, dentro do que o texto permite: 70 cm, tronco 8° para trás, cotovelo 6° atrás do tronco: 152°.

Pedido: avaliar trocar "a cerca de meio passo" por "a cerca de um passo" no texto do app. Sem fonte além do consenso do guia original e da conta acima; por isso é pedido, e não mudança.

## 5. Agachamento com elástico: "quase nenhuma tensão embaixo" (15/11/2026)

A ficha da técnica (`docs/pesquisa/animacoes/agachamento-elastico.md`, linha "A faixa") diz que a tensão é "maior com as pernas quase estendidas e quase nenhuma embaixo". Medido no boneco, com o tubo de 122 cm (Rogue Tube Bands, 48 pol) pisado com os pés a 38 cm um do outro e as mãos nos ombros: o elástico estica 2,5 vezes em cima e ainda 1,4 vez embaixo. Para ficar quase frouxo embaixo, teria de ter perto de 175 cm.

Pedido: avaliar trocar "quase nenhuma embaixo" por "menor embaixo" no texto do app, se o texto usar essa frase. A direção está certa (estica mais em cima); o "quase nenhuma" depende do comprimento do elástico da pessoa.
