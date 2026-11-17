# Lote A3 · Tríceps francês unilateral com halter (`triceps-frances-unilateral-halter`)

De 17/11/2026. Primeira animação deste exercício (até aqui ele só aparecia como cartão de texto). **Em pé**, pés na largura do quadril, tronco reto; um halter de 25 lb na mão direita, com a pegada neutra; o braço fica parado, apontado para o alto, e só o cotovelo dobra, levando o halter para trás da cabeça, e estende. A mão esquerda segura o braço direito logo acima do cotovelo. **Ainda não aprovada nem ligada às telas** (quem integra registra em `aprovados.ts` e no catálogo do guia).

- Ficha da técnica: `docs/pesquisa/animacoes/triceps-frances-unilateral-halter.md`. Cartão do app: `src/conteudo/exercicios/triceps-frances-unilateral-halter.json` (só leitura).
- Ficha de movimento: `src/engine/novo/dados/movimentos/triceps-frances-unilateral-halter.json`.
- Animação: `src/engine/novo/exercicios/triceps-frances-unilateral-halter.ts`, sobre o núcleo dos tríceps franceses (`exercicios/triceps-frances-base.ts`), com a variação nova `'halter-unilateral'`. Regras novas: `src/engine/novo/regras/triceps-frances-unilateral-halter.ts`.
- Quadros grandes: `../quadros/triceps-frances-unilateral-halter.png`. **Sem folha**: o exercício não tinha animação.

## Em pé, e não sentado

O cartão aceita os dois ("Sentado ou em pé"). A ficha da técnica pede **só o halter**, com "cadeira ou banco opcionais", e o cartão põe o banco como preferência ("Uma cadeira ou banco, se preferir sentado"). O caso de base, o que serve a quem tem só o halter, é em pé. Em pé, o erro do cartão "o tronco inclina para trás" também tem para onde ir.

## A outra mão no cotovelo

O cartão sugere ("a outra mão segura o cotovelo de trabalho, se quiser"), e eu desenhei: a mão esquerda fecha em volta do braço direito, 7 cm acima do cotovelo, vinda da frente e por cima da cabeça. O que precisou de ajuste, medido:

- com o cotovelo esquerdo apontando para baixo, o antebraço esquerdo passava na frente dos olhos e encostava no rosto (0,1 cm); com ele apontando um pouco para cima (`maoNoCotovelo.poloBaixo` = −0,3), o antebraço passa na altura da testa, a no mínimo 0,8 cm da pele da cabeça;
- com o polegar para o cotovelo, o antebraço esquerdo girava 123° a 161° (acima da amplitude da tabela); com o polegar para o ombro, ele fica em 35°.

**Por isso a segunda vista é a de trás, e não a de frente:** de frente, o antebraço esquerdo tapa o rosto (é o que acontece de verdade, mas o quadro vira um borrão). De trás, o halter atrás da cabeça e o cotovelo apontado para cima se leem de relance, e o braço esquerdo fica atrás da cabeça.

## Onde os números saem

A ficha da técnica dá "braço acima da cabeça, apontado para o alto" (maeo2023, um estudo) e "só o cotovelo dobra, até bem dobrado" (consenso), sem número. O que ela não dá saiu dos tríceps franceses aprovados: o braço a 165° do braço pendurado (o com halter), 6° para o meio, o cotovelo a 135° embaixo e a mão atrás da cabeça a 5 cm do meio, a pegada neutra e o tempo das fases (o unilateral na polia); a postura em pé, dos desenvolvimentos em pé aprovados (pés a 9 cm do meio, joelhos a 8°). O meio da pelve fica 3,5 cm à frente para o centro de massa (corpo + halter) cair no meio do pé.

## O que a fonte pede × o que o boneco faz (medido) × confere?

| O que a ficha da técnica (e o cartão) pede | Selo | O que o boneco faz (medido) | Confere? |
|---|---|---|---|
| Em pé, tronco reto, abdômen firme | consenso | o peito fica a 0° da vertical; a lombar e a torácica não saem da curva de repouso (0°); os pés parados (0 cm) | sim |
| Braço acima da cabeça, apontado para o alto | um estudo | o braço fica a 163,9° do braço pendurado, 6° para o meio, e o cotovelo a 7,6 cm da pele da cabeça | sim |
| Só o cotovelo dobra (o braço continua apontado para o alto) | consenso | do alongado ao estendido, o cotovelo anda 0 cm e o braço gira 0° no ombro | sim |
| Embaixo: halter atrás da cabeça, cotovelo bem dobrado | consenso | o cotovelo dobra 134,7°; o centro da mão fica 18,7 cm atrás da parte de trás da cabeça | sim |
| Em cima: braço reto acima da cabeça | consenso | o cotovelo dobra 8,1° | sim |
| O halter não encosta na cabeça, na nuca nem nas costas | desenho | o halter passa a no mínimo 1,1 cm da pele (o braço) | sim |
| A outra mão segura o cotovelo de trabalho (cartão) | consenso | a pele da mão esquerda fica de 0,3 a 0,4 cm da pele do braço direito; o centro da mão a 7 cm do cotovelo | sim |
| Descida ~2 a 3 s | consenso | 2,5 s; subida em 1,1 s (a do tríceps francês aprovado); ritmo suave (6,2% da velocidade de pico) | sim |
| Equilíbrio (mecânica) | consenso | o centro de massa (corpo + halter) anda de −3,3 a 1,7 cm do meio do pé | sim |

**O halter contra o corpo é medido por uma regra nova** (`triceps-frances-halter-livre-do-corpo`), e não pela dos tríceps franceses com as duas mãos (`triceps-frances-carga-livre-do-corpo`). A de lá mede cada cabeça do halter como uma cápsula (pontas arredondadas, com o raio da cabeça). Com o cabo atravessando a mão, a ponta arredondada da cápsula entra no punho, e a regra dava 0,4 cm "do antebraço" para uma cabeça de pontas planas que, medida como ela é, fica a mais de 1 cm da pele. A regra nova mede a cabeça como um cilindro de pontas planas com o raio de fora do prisma (a forma de verdade, ou um pouco maior), com o mesmo limite (1 cm).

**Conferência automática: 0 falha, 2 avisos.** (1) As linhas da ficha de movimento que são escolha de desenho (os pés, a pelve, o joelho, o pescoço, o braço para o meio, a mão atrás da cabeça e as três linhas da mão no cotovelo). (2) O modo Músculos abre de lado (64 cm²); de trás o tríceps não aparece (0 cm²: com o braço acima da cabeça, a parte de trás do braço fica virada para a frente). De frente ele apareceria (95 cm²), mas de frente o rosto fica tapado (acima).

## Erros (os três do cartão, com o mesmo título e na mesma ordem)

| Erro (texto do app) | Vista | O que o boneco faz (medido) |
|---|---|---|
| Abrir o cotovelo | de trás | no alongado, o braço abre 22° para fora (o cotovelo vai a 20,9 cm da cabeça; o certo: 7,6 cm) e volta para perto da cabeça estendendo; a mão esquerda continua no braço |
| Descer pouco | de lado | a descida para com o cotovelo a 75°: o halter fica acima da cabeça, sem descer atrás dela |
| Arquear a lombar | de lado | enquanto o halter sobe, a lombar estende 16° e as costas de cima 6°: o peito vai 19,5° para trás da vertical |

Os três são pose; nenhum ficou de fora. Nos três, o halter continua longe da pele (1,1 a 4 cm).

## O equipamento

- **Halter:** o sextavado de 25 lb da tabela de objetos, com o cabo atravessando a mão fechada (pegada neutra: em cima, a palma para a cabeça e o cabo de frente para trás).

## Correções já feitas que esta animação respeita

Não há correção registrada para este exercício. Das correções do tríceps francês com halter (as duas mãos juntas na anilha, 12 cm), nenhuma se aplica a uma mão só; a pegada aqui é no cabo, a do unilateral na polia aprovado.

## Mudanças em arquivos comuns

- `exercicios/triceps-frances-base.ts`: a variação nova `'halter-unilateral'` (em pé, pela mesma conta do estribo, com o halter na mão e a mão esquerda no braço direito, `maoNoCotovelo`). Aditiva: as outras variações não passam pelo código novo, e o preparo dos tríceps franceses aprovados não mudou.

## O que não ficou bom

- **De trás, embaixo, a mão que segura o halter fica escondida atrás do halter**; o halter cobre a parte de trás da cabeça (está atrás dela, a mais de 1 cm). De lado a mão fechada no cabo se vê bem.
- **O antebraço esquerdo passa a ~1 cm da testa.** É como se faz (o braço cruza por cima da cabeça), mas de frente ele tapa o rosto: por isso a vista de frente ficou de fora.
- **O modo Músculos só tem a vista de lado**: de trás o tríceps não aparece com o braço levantado.
