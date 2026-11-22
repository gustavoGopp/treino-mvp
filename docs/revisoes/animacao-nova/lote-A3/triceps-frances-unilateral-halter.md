# Lote A3 · Tríceps francês unilateral com halter (`triceps-frances-unilateral-halter`)

De 17/11/2026. Primeira animação deste exercício (até aqui ele só aparecia como cartão de texto). **Em pé**, pés na largura do quadril, tronco reto; um halter de 25 lb na mão direita, com a pegada neutra; o braço fica parado, apontado para o alto, e só o cotovelo dobra, levando o halter para trás da cabeça, e estende. **A mão esquerda fica na cintura**, como no tríceps francês unilateral na polia aprovado. **Ainda não aprovada nem ligada às telas** (quem integra registra em `aprovados.ts` e no catálogo do guia).

- Ficha da técnica: `docs/pesquisa/animacoes/triceps-frances-unilateral-halter.md`. Cartão do app: `src/conteudo/exercicios/triceps-frances-unilateral-halter.json` (só leitura).
- Ficha de movimento: `src/engine/novo/dados/movimentos/triceps-frances-unilateral-halter.json`.
- Animação: `src/engine/novo/exercicios/triceps-frances-unilateral-halter.ts`, sobre o núcleo dos tríceps franceses (`exercicios/triceps-frances-base.ts`), com a variação nova `'halter-unilateral'`. Regra nova: `src/engine/novo/regras/triceps-frances-unilateral-halter.ts`.
- Quadros grandes: `../quadros/triceps-frances-unilateral-halter.png`. **Sem folha**: o exercício não tinha animação.

## Em pé, e não sentado

O cartão aceita os dois ("Sentado ou em pé"). A ficha da técnica pede **só o halter**, com "cadeira ou banco opcionais", e o cartão põe o banco como preferência ("Uma cadeira ou banco, se preferir sentado"). O caso de base, o que serve a quem tem só o halter, é em pé. Em pé, o erro do cartão "o tronco inclina para trás" também tem para onde ir.

## A outra mão na cintura (revisão de 17/11/2026)

A primeira versão desenhou a sugestão do cartão ("a outra mão segura o cotovelo de trabalho, se quiser"): a mão esquerda no braço direito, 7 cm acima do cotovelo. O braço esquerdo cruzava por cima da cabeça e, de lado, o quadro ficava confuso; de frente, o antebraço esquerdo tapava o rosto, e a segunda vista teve de ser a de trás, onde o tríceps não aparece (0 cm²). Na revisão de quem integra, a mão foi para a cintura, como no unilateral na polia aprovado: o cartão diz que segurar o cotovelo é opcional. Com isso, **a vista de frente voltou a servir** (o tríceps aparece com 90 a 95 cm² e o rosto fica livre), e o rótulo e o erro de abrir o cotovelo voltaram para ela.

## Onde os números saem

A ficha da técnica dá "braço acima da cabeça, apontado para o alto" (maeo2023, um estudo) e "só o cotovelo dobra, até bem dobrado" (consenso), sem número. O que ela não dá saiu dos tríceps franceses aprovados: o braço a 165° do braço pendurado (o com halter), 6° para o meio, o cotovelo a 135° embaixo e a mão atrás da cabeça a 5 cm do meio, a pegada neutra, a mão na cintura e o tempo das fases (o unilateral na polia); a postura em pé, dos desenvolvimentos em pé aprovados (pés a 9 cm do meio, joelhos a 8°). O meio da pelve fica 5 cm à frente para o centro de massa (corpo + halter) cair no meio do pé (com a mão na cintura, o braço esquerdo não vai mais para a frente da cabeça, e a pelve foi 1,5 cm mais à frente que na primeira versão).

## O que a fonte pede × o que o boneco faz (medido) × confere?

| O que a ficha da técnica (e o cartão) pede | Selo | O que o boneco faz (medido) | Confere? |
|---|---|---|---|
| Em pé, tronco reto, abdômen firme | consenso | o peito fica a 0° da vertical; a lombar e a torácica não saem da curva de repouso (0°); os pés parados (0 cm) | sim |
| Braço acima da cabeça, apontado para o alto | um estudo | o braço fica a 163,9° do braço pendurado, 6° para o meio, e o cotovelo a 7,6 cm da pele da cabeça | sim |
| Só o cotovelo dobra (o braço continua apontado para o alto) | consenso | do alongado ao estendido, o cotovelo anda 0 cm e o braço gira 0° no ombro | sim |
| Embaixo: halter atrás da cabeça, cotovelo bem dobrado | consenso | o cotovelo dobra 134,7°; o centro da mão fica 18,7 cm atrás da parte de trás da cabeça | sim |
| Em cima: braço reto acima da cabeça | consenso | o cotovelo dobra 8,1° | sim |
| O halter não encosta na cabeça, na nuca nem nas costas | desenho | o halter passa a no mínimo 1,1 cm da pele (o braço) | sim |
| A outra mão (segurar o cotovelo é opcional no cartão) | desenho | na cintura: a pele da mão esquerda fica a 0,6 cm da pele da cintura e não anda em relação à pelve (0 cm) | sim |
| Descida ~2 a 3 s | consenso | 2,5 s; subida em 1,1 s (a do tríceps francês aprovado); ritmo suave (6,2% da velocidade de pico) | sim |
| Equilíbrio (mecânica) | consenso | o centro de massa (corpo + halter) anda de −2,9 a 2,1 cm do meio do pé (limite: ±5 cm) | sim |

**O halter contra o corpo é medido por uma regra nova** (`triceps-frances-halter-livre-do-corpo`), e não pela dos tríceps franceses com as duas mãos (`triceps-frances-carga-livre-do-corpo`). A de lá mede cada cabeça do halter como uma cápsula (pontas arredondadas, com o raio da cabeça). Com o cabo atravessando a mão, a ponta arredondada da cápsula entra no punho, e a regra dava 0,4 cm "do antebraço" para uma cabeça de pontas planas que, medida como ela é, fica a mais de 1 cm da pele. A regra nova mede a cabeça como um cilindro de pontas planas com o raio de fora do prisma (a forma de verdade, ou um pouco maior), com o mesmo limite (1 cm).

**Conferência automática: 0 falha, 1 aviso**: as linhas da ficha de movimento que são escolha de desenho (os pés, a pelve, o joelho, o pescoço, o braço para o meio, a mão atrás da cabeça e as três linhas da mão na cintura). O modo Músculos abre de frente (90 cm², o pior dos três instantes; 95 cm² no alongado), com o tríceps de frente porque, com o braço acima da cabeça, a parte de trás do braço fica virada para a frente; de lado, 64 cm².

## As vistas

**De lado** (padrão do modo Técnica): o braço parado apontado para o alto, o halter descendo atrás da cabeça e o arco da lombar. **De frente**: o cotovelo perto da cabeça (e o erro de abri-lo), o tríceps no modo Músculos e o rosto livre. Embaixo, de frente, o halter fica escondido atrás da cabeça (é onde ele tem de estar); a vista de lado mostra onde ele está.

## Erros (os três do cartão, com o mesmo título e na mesma ordem)

| Erro (texto do app) | Vista | O que o boneco faz (medido) |
|---|---|---|
| Abrir o cotovelo | de frente | no alongado, o braço abre 22° para fora (o cotovelo vai a 20,9 cm da cabeça; o certo: 7,6 cm) e volta para perto da cabeça estendendo |
| Descer pouco | de lado | a descida para com o cotovelo a 75°: o halter fica acima da cabeça, sem descer atrás dela |
| Arquear a lombar | de lado | enquanto o halter sobe, a lombar estende 16° e as costas de cima 6°: o peito vai 19,5° para trás da vertical |

Os três são pose; nenhum ficou de fora. Nos três, o halter continua longe da pele (1,1 a 4 cm) e a mão esquerda fica na cintura (0,5 a 0,6 cm).

## O equipamento

- **Halter:** o sextavado de 25 lb da tabela de objetos, com o cabo atravessando a mão fechada (pegada neutra: em cima, a palma para a cabeça e o cabo de frente para trás).

## Correções já feitas que esta animação respeita

Não há correção registrada para este exercício. Das correções do tríceps francês com halter (as duas mãos juntas na anilha, 12 cm), nenhuma se aplica a uma mão só; a pegada aqui é no cabo, e a outra mão na cintura, as do unilateral na polia aprovado.

## Mudanças em arquivos comuns

- `exercicios/triceps-frances-base.ts`: a variação nova `'halter-unilateral'` (em pé, pela mesma conta do estribo, com o halter na mão e a mão esquerda na cintura, a mesma função do estribo). Aditiva: as outras variações não passam pelo código novo, e o preparo dos tríceps franceses aprovados não mudou.

## O que não ficou bom

- **De frente, embaixo, o halter some atrás da cabeça**; só a mão e o antebraço aparecem por cima dela. A vista de lado (a que o app abre) mostra o halter atrás da cabeça.
- **De lado, o cotovelo esquerdo (mão na cintura) aparece atrás das costas**, como no unilateral na polia aprovado.
