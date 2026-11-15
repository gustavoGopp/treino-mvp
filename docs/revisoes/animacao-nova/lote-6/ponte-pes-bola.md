# Lote 6 · Ponte de glúteo com os pés na bola (`ponte-pes-bola`)

De 15/11/2026. Ainda não está ligada às telas do app.

- Ficha da técnica: `docs/pesquisa/animacoes/ponte-pes-bola.md`.
- Ficha de movimento: `src/engine/novo/dados/movimentos/ponte-pes-bola.json`.
- Animação: `src/engine/novo/exercicios/ponte-pes-bola.ts`. Usa, sem mudar, do núcleo das flexões de joelho deitado (`exercicios/flexao-joelho.ts`): `troncoDeCostas`, `bracosNoChao`, `folgaDaPelve`, `peAoChao`.
- Peça de cena: a bola suíça de 65 cm (`pecas-de-cena/bola-suica.ts`), sem mudança.
- Regras novas (`src/engine/novo/regras/ponte-bola.ts`): `ponte-bola-bola-parada`, `ponte-bola-joelhos-pouco-dobrados`, `ponte-bola-calcanhar-no-alto-da-bola`. Usadas como estão: `em-linha-no-fim` e `bola-*` (flexões de joelho e flexão na bola), `ponte-quadril-quase-no-chao` (pontes), `lombar-neutra`.
- Folha ao lado da de hoje: `../prototipos/folha-ponte-pes-bola.png`. Quadros grandes: `../quadros/ponte-pes-bola.png`.

## Como cada quadro é resolvido

- **O tronco** é o da ponte de costas do núcleo: as costas e a cabeça no chão, os ombros parados (`ombro.z`), os braços no chão abertos 30°. Duas suavizações, só nesta animação: a altura da bacia é uma parábola (mínimos quadrados em 13 pontos do caminho) e a dobra do pescoço vai da de baixo à do topo junto com a bacia. O núcleo acha as duas pelo ponto mais baixo da superfície, que pula de um ponto para o vizinho, e a cabeça andava aos trancos (até 42% de salto de velocidade). A conferência mede que as costas e a cabeça continuam no chão (de −0,8 a 0,2 cm).
- **Embaixo:** a bacia desce até a pele do glúteo ficar a 2,5 cm do chão; o joelho quase estendido (10° pedidos, 8,8° medidos); a coxa gira até o pé encostar na bola. A bola é posta ali: o calcanhar apoia 14 cm antes do alto dela, do lado do corpo, para a panturrilha passar por cima da bola embaixo, quando a perna fica mais em pé.
- **Em cada quadro:** a bola não sai do lugar e o calcanhar também não. A coxa e o joelho saem de uma conta de duas incógnitas (o pé encosta na bola, cedendo 1 cm; o calcanhar fica no mesmo z). O pé gira metade do que a canela gira (o calcanhar rola na bola); com o pé parado no mundo, a dorsiflexão chegava a 49°.
- **No topo:** a bacia sobe até ombro, quadril e joelho ficarem em linha.

## O que a fonte pede × o que o boneco faz (medido) × confere?

Medidas no homem; entre parênteses, na mulher.

| O que a ficha da técnica pede | Selo | O que o boneco faz (medido) | Confere? |
|---|---|---|---|
| Deitado de costas, braços abertos no chão | consenso | costas e nuca de −0,1 a 0,2 cm do chão, cabeça de −0,8 a 0,2 cm; o ombro anda 0,4 cm; as mãos não saem do lugar | sim |
| Calcanhares em cima da bola | consenso | o ponto do pé que apoia fica de 19,7° a 25,3° (21,1° a 25,3°) do alto da bola, do lado do corpo, e anda 2,8 cm (1,6 cm); o pé cede 1 cm na bola; coxas e canelas não entram na bola | sim |
| Pernas quase estendidas, joelhos um pouco dobrados | consenso | o joelho dobra 8,8° embaixo, até 42,2° no meio e 38,6° no topo (7,7°, 46,7°, 42,1°) | em parte (ver "O que não ficou bom") |
| Subida: ombros, quadril e joelhos em linha | consenso | 180° de lado; o centro da pelve sobe de 12,7 para 41,3 cm | sim |
| Embaixo: quadril quase no chão, sem descansar | consenso | a pele do glúteo fica a 2,4 cm (2,3 cm) do chão | sim |
| Bola parada | consenso | o centro da bola anda 0 cm | sim |
| Sem arquear a lombar | consenso | 0° além da curva de repouso | sim |
| ~1 s subindo, ~1 s parado, ~2 s descendo | consenso | 1,1 s, 1 s e 2 s, pausa de 0,5 s embaixo; maior salto de velocidade 9,3% (9,6%) | sim |

Conferência automática: **0 falha, 3 avisos**: dorsiflexão do tornozelo de 27,2° (29° na mulher; média 14,8°, máximo observado 48°), porque o tornozelo dobra metade do giro da canela; as linhas de desenho da ficha (`pe.angulo`, `bola.alemDoCalcanhar`, `pe.acompanha`, `pe.afundaNaBola`, `bracos.alcance`, `ombro.z`); os posteriores em "só ajuda", fora da lista do conteúdo (é a correção de 03–04/11, `SO_AJUDA`, a confirmar com o Gustavo).

## Por que o joelho dobra mais em cima

Com o ombro no chão e o calcanhar parado na bola, a distância do quadril ao calcanhar muda quando o quadril sobe: embaixo ela é a maior, e a perna tem de estar quase estendida; em cima ela encurta, e o joelho dobra. Medido (homem): com 20° no topo, embaixo a perna precisaria de mais que estendida (o calcanhar escorregava 2 cm na bola e o joelho dava trancos de 105%). Com 10° embaixo, o topo dá 38,6°. A animação de hoje faz o mesmo (o calcanhar preso num ponto e o quadril subindo), com uma bola desenhada menor.

## As vistas

- **De lado** (padrão da técnica e do modo Músculos: 155 cm² do glúteo, contra 117 cm² de três quartos): a linha ombro–quadril–joelho, a bola parada.
- **De três quartos, de frente (`quina`)**, como na flexão na bola: as duas pernas e os braços abertos. A bola é grande nessa vista.

## Erros

| Erro (texto do app) | O que o boneco faz |
|---|---|
| Arquear a lombar (de lado) | da metade da subida em diante, a lombar arqueia 12°; a bacia fica como no certo, as costas no chão, e o quadril sobe com a barriga para cima |
| Bola foge (de lado) | a bola rola 16 cm para longe com os pés (gira o que rolou); a perna estica (joelho a 3°) e o quadril para 5 cm abaixo do certo |
| Subir pouco (de lado) | o quadril sobe só 45% do caminho |

## Correções já feitas que esta animação respeita

- Os posteriores entram listrados, "só ajudam" (03–04/11, `SO_AJUDA` em `src/engine/estilo/musculos.ts`); o glúteo é o principal.
- A bola é a peça da flexão na bola (lote 2), com as mesmas cores e o mesmo achatado no chão.

## O que não ficou bom

- **O joelho dobra ~40° no topo** (`quadros/ponte-pes-bola.png`, "lateral:tec:f1"): a ficha diz "joelhos um pouco dobrados". Com a bola de 65 cm parada, o quadril quase no chão embaixo e o calcanhar no mesmo lugar, a conta não deixa dobrar menos (ver acima). Tentei 20° a 42° no topo, a folga embaixo de 1,5 a 4 cm e o pé parado ou acompanhando a canela. As saídas seriam a bola de 55 cm (para quem tem até 1,60 m, pela tabela do fabricante) ou deixar o calcanhar rolar alguns centímetros na bola; nenhuma das duas está na ficha.
- **No meio da subida o joelho dobra um pouco mais que no topo** (42° contra 39°): é a mesma conta.
- **De três quartos, a bola ocupa um terço do quadro** ("quina:tec:f0").
