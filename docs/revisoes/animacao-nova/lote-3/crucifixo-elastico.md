# Lote 3 · Crucifixo com elástico (`crucifixo-elastico`)

De 15/11/2026. O crucifixo em pé, de costas para uma porta fechada, com o tubo de 60 pol preso atrás na altura do peito.

- **Postura:** um pé à frente do outro (o direito 12 cm à frente do meio, o esquerdo 10 cm atrás, os dois inteiros no chão), os dois joelhos dobrados 12°, o tronco 12° à frente com a coluna nas curvas de repouso.
- **Braço:** num arco quase horizontal, 14° abaixo da linha do ombro, com o cotovelo dobrado 20° o ciclo todo, das mãos na linha do corpo (alongado) até as duas mãos se encontrarem na frente da parte de baixo do peito. Pegada neutra, polegar para cima.
- **Tubo:** o meio dele dá a volta na alça de uma âncora de porta, no vão do lado da dobradiça, atrás das costas, na altura do peito. De cada pegador, vai para trás pelo lado de fora do braço e das costas até a alça (`elastico-faixa.ts` contorna o corpo).

Ainda não está ligada às telas do app.

- **Fontes:** a ficha da técnica (`docs/pesquisa/animacoes/crucifixo-elastico.md`), o texto do app (`src/conteudo/exercicios/crucifixo-elastico.json`) e, para as distâncias que a ficha não dá, a animação de hoje (`src/engine/exercicios/crucifixo-elastico.ts`). O motor novo ainda não tem o crucifixo na polia, então o arco do braço é novo, montado no próprio arquivo do exercício.
- **Ficha de movimento:** `src/engine/novo/dados/movimentos/crucifixo-elastico.json`.
- **Animação:** `src/engine/novo/exercicios/crucifixo-elastico.ts`.
- **Regras novas** (em `regras/elasticos.ts`): `elastico-crucifixo-cotovelo-fixo`, `elastico-crucifixo-maos-na-linha-do-corpo`, `elastico-crucifixo-maos-juntas-no-peito`, `elastico-ancora-atras-na-altura-do-peito`. Usa também `tronco-quase-parado`, `lombar-neutra`, `elastico-livre-do-corpo`, `elastico-nas-maos` e `elastico-bracos-juntos`.
- **Folha:** `../prototipos/folha-crucifixo-elastico.png`. **Quadros:** `../quadros/crucifixo-elastico.png`.

## Mudança em arquivo comum (aditiva)

- **`pecas-de-cena/elastico-ancora-no-alto.ts`:** a função `portaComAncoraNoAlto` ganhou o último argumento opcional `atras` (a porta atrás de quem treina, espelhada em z em volta da face). Sem ele, cada conta dá o mesmo número de antes (multiplicada por 1), e o resumo SHA-1 dos quadros e do enquadramento da `puxada-elastico` (a única que a usa) dá o mesmo.

## O elástico

O tubo de 60 pol (`elasticoTuboLongo`, o mesmo do desenvolvimento com elástico; medidas e fontes em `desenvolvimento-elastico.md`). Com o tubo de 48 pol da tabela a conta fecharia na técnica (1,6 a 2,1 vezes), mas o erro "Elástico frouxo com os braços abertos" ficaria impossível: com as mãos a 140 cm uma da outra, o tubo de 48 pol estica pelo menos 1,15 vezes mesmo com a porta encostada nas costas.

| Corpo | Aberto | Mãos juntas |
|---|---|---|
| Homem | 1,3 vezes (198 cm) | 1,7 vezes (264 cm) |
| Mulher | 1,3 vezes (198 cm) | 1,8 vezes (268 cm) |

Já esticado com os braços abertos (a distância até a porta sai daí: a âncora fica 47 cm atrás das costas no homem e 57 na mulher), mais esticado com as mãos juntas, longe do máximo de 3,3 vezes.

## O que a fonte pede × o que o boneco faz (medido) × confere?

| O que a ficha da técnica (e o texto do app) pede | Selo | O que o boneco faz (medido, homem) | Confere? |
|---|---|---|---|
| Preso atrás, na altura do peito, num ponto firme | consenso | A alça fica 1,2 cm acima da altura do peito (129,4 cm), 47,1 cm atrás das costas, numa porta fechada. | sim |
| 1–2 passos à frente, já esticado com os braços abertos | consenso | 1,3 vezes no alongado | sim |
| Um pé à frente do outro, joelhos levemente dobrados | consenso | 22 cm de passo; os dois joelhos a 12° | sim |
| Tronco levemente inclinado à frente, peito alto | consenso | A bacia inclina 12°, a coluna nas curvas de repouso, a base do pescoço anda 0 cm, a lombar 0° além da curva. | sim |
| Cotovelos levemente dobrados, no mesmo ângulo a série toda | consenso | 20° do começo ao fim, nos dois braços | sim |
| Alongado: mãos mais ou menos na linha do corpo | consenso | O centro da mão fica no plano dos ombros (0 cm). | sim |
| Fim: mãos juntas na frente da parte de baixo do peito | consenso | As mãos ficam a 10 cm uma da outra, na altura de 126,4 cm do corpo em pé (peito: 129,4; costela de baixo: 112). | sim |
| ~1–1,5 s fechando, ~2–3 s abrindo | consenso | 1,3 s e 2,5 s | sim |

O tubo passa a no mínimo 1 cm da pele (antebraço). Ritmo: o maior salto é de 4,3%. O centro de massa fica sempre dentro do apoio: a pelve fica onde os dois joelhos dobram o mesmo, e o centro de massa vai um pouco à frente do meio dos pés, como quem segura o elástico que puxa as mãos para trás.

**Conferência automática:** `conferir.mjs` dá **0 falha e 3 avisos**:

1. **"Mais esticado em cima":** o ciclo começa no alongado, onde o elástico estica menos. É o que a ficha diz (a tensão é menor justamente na parte alongada).
2. **Linhas de desenho da ficha:** a base, `braco.abaixo`, `elastico.folga`, `elastico.noQuadro`, o pescoço e a cabeça.
3. **De cima, o peito não aparece** (0 cm², contra 474 de frente): a vista de cima fica fora do modo Músculos.

## As vistas

- **De frente** (a primeira): o peito, os braços abrindo e fechando e as mãos que se encontram. A porta aparece atrás, como fundo.
- **De cima:** o arco das mãos, o cotovelo fixo e o tubo até a âncora, atrás.
- **Peito visível (cm², homem/mulher):** de frente 474/530; de três quartos 116/92; de lado 84/68; de cima, de trás e de três quartos por trás 0. **A vista padrão do modo Músculos é a de frente.** No motor de hoje, os crucifixos abriam de cima (correção de 05/11); aqui a de frente vem primeiro porque a regra desta rodada é a vista padrão do modo Músculos ser a que mais mostra o principal, e de cima o peito não aparece.

## Erros

| Erro (texto do app) | O que o boneco faz |
|---|---|
| Transformar em supino (de cima, alongado) | O cotovelo dobra 85° no alongado e estica até 20° ao fechar. |
| Abrir demais (de cima, alongado) | O braço abre 25° além da linha do corpo: as mãos passam para trás. |
| Usar o tronco (de lado, mãos juntas) | A lombar curva 14° e as costas de cima 18° para fechar. |
| Elástico frouxo com os braços abertos (de lado, alongado) | A pessoa fica perto demais da porta (a alça logo atrás das costas): com os braços abertos o tubo fica no comprimento de repouso, sem tensão, e cai um pouco no meio. |

## O que não ficou bom

- **De frente, nenhum rótulo.** As três dicas do app apontam para as mãos ou para os cotovelos. Ao lado do corpo, o fio cruzava a mão (aberto) ou o antebraço (fechado); acima do corpo (o campo `acima`), o texto ficava em cima do batente da porta. Tirei.
- **De cima, o fio de "abraça a árvore"** cruza o antebraço direito no fim, quando as mãos estão no meio, na frente do corpo: é o mesmo que acontece na elevação com halteres aprovada, de cima. Não achei lugar melhor para esse texto.
- **De frente, a porta ocupa metade do fundo.** A âncora no vão da dobradiça precisa da porta atrás do corpo; ela é cenário (não entra no enquadramento), mas aparece.
- **O erro "frouxo"** não tem como deixar o tubo mais curto que o repouso: o desenho mostra o tubo sem tensão, caído 4% (escolha de desenho).
- **O tubo de 60 pol** é outro elástico, e não o da tabela, e o máximo de 3,3 vezes vem de um fabricante só.

## Risco de o Gustavo não gostar: médio

O arco do braço é novo no motor novo (não há crucifixo aprovado nele), a vista de frente ficou sem rótulo e a porta aparece inteira no fundo.
