# Lote 5 · Tríceps francês unilateral na polia, com estribo (`triceps-frances-polia-unilateral`)

De 15/11/2026. Quarta animação da família do tríceps francês no motor novo, e a primeira com um braço só. Em pé, um pé à frente do outro, de costas para a polia, que fica embaixo; o braço direito (o de perto, de lado) fica parado acima da cabeça e só o antebraço estende; o cabo sobe da roldana, por trás das costas, até o estribo. A outra mão fica na cintura, como pede o texto do app. Ainda não está ligada às telas do app.

- Ficha da técnica: `docs/pesquisa/animacoes/triceps-frances-polia-unilateral.md`; texto do app: `src/conteudo/exercicios/triceps-frances-polia-unilateral.json`.
- Ficha de movimento: `src/engine/novo/dados/movimentos/triceps-frances-polia-unilateral.json` (parte da ficha do `triceps-frances`: o mesmo braço e o mesmo passo).
- Animação: `src/engine/novo/exercicios/triceps-frances-polia-unilateral.ts`, sobre o núcleo da família (`exercicios/triceps-frances-base.ts`), que ganhou a carga `estribo` (mudança aditiva, ver abaixo).
- Regras novas medidas: `src/engine/novo/regras/triceps-frances-unilateral.ts` (prefixo `triceps-frances-unilateral-`). Usa também três regras do francês que servem como estão: `triceps-frances-braco-parado`, `triceps-frances-alonga-atras-da-cabeca` e `triceps-frances-estende-em-cima` (as três medem só o lado direito).
- Folha ao lado da de hoje: `../prototipos/folha-triceps-frances-polia-unilateral.png`. Quadros grandes: `../quadros/triceps-frances-polia-unilateral.png`.

## O que mudou no núcleo (aditivo)

- A carga `estribo`: em pé, como a corda; a mão direita fecha na pegada do estribo com a pegada neutra (o polegar na direção de baixo e um pouco de trás do tronco: a pronação fica perto de 0° no ciclo inteiro); a polia fica embaixo, atrás, onde o cabo, no alongado, desce a `cabo.inclinacao` graus da horizontal; a pilha sobe o curso do cabo dividido pela relação.
- Com uma mão só, o giro do antebraço em volta do braço é o do alongado (a mão atrás da cabeça, `maos.meiaDistancia` do meio) e fica fixo até em cima. Com as duas mãos, ele continua resolvido a cada quadro, como antes.
- A mão esquerda na cintura (`maoNaCintura`): a palma aberta sobre a crista do quadril, os dedos para a frente e para baixo, o cotovelo para fora e para trás.
- Os três tríceps franceses já feitos ficam iguais: os quadros, as cenas desenhadas e a conferência dos três dão o mesmo resultado, byte a byte, com o núcleo antigo e com o novo (conferido por um resumo SHA-1 das saídas).

## O que a fonte pede × o que o boneco faz (medido) × confere?

| O que a ficha da técnica (e o texto do app) pede | Selo | O que o boneco faz (medido) | Confere? |
|---|---|---|---|
| Polia embaixo, estribo no mosquetão; de costas para a polia | consenso | roldana a 22 cm do chão (correção de 04/11: 20/22 cm); o cabo, no alongado, sobe da roldana a 64° da horizontal | sim |
| Base escalonada | consenso | pé direito 30 cm à frente, inteiro no chão; o esquerdo 30 cm atrás, na ponta; joelhos a 16°; os pés não saem do lugar | sim |
| Abdômen firme; o tronco não arqueia | consenso | o peito fica a 18° da vertical em todos os quadros; a lombar e a torácica não mudam | sim |
| Mão atrás da cabeça, cabo passando por trás do corpo | consenso | o centro da mão fica 19,2 cm atrás da parte de trás da cabeça; o cabo passa a no mínimo 1,9 cm da pele (o braço esquerdo, dobrado na cintura) | sim |
| Cotovelo apontando para cima, perto da cabeça | consenso | braço a 166,6° do braço pendurado, 6° para o meio; o cotovelo fica a 8,3 cm da pele da cabeça | sim |
| Só o antebraço se mexe: estende acima da cabeça | consenso | o cotovelo anda 0 cm e o braço gira 0°; o cotovelo vai de 134,7° a 8,1° | sim |
| ~1 s estendendo, ~2–3 s voltando | consenso | 1,1 s e 2,4 s | sim |
| A outra mão na cintura | consenso | a pele da mão esquerda fica a 0,6 cm da pele da cintura e não anda em relação à pelve | sim |

Conferência automática (`node scripts/animacao-nova/conferir.mjs triceps-frances-polia-unilateral`): **0 falha, 1 aviso** (as linhas da ficha de movimento que são escolha de desenho: pés, pelve, tronco, pescoço, quanto o braço vai para o meio, a inclinação do cabo e a mão na cintura). Medidas: ritmo com salto de 6,2% (limite 15%); a pilha sobe 27,4 cm para 54,8 cm de cabo (2:1); pronação do antebraço até 2,2° e supinação até 5,8° (a pegada neutra); o punho da mão que trabalha fica reto (0°), e o da mão na cintura estende 31°; centro de massa sempre dentro do apoio dos pés.

## As vistas

- **De lado** (a primeira): o braço parado acima da cabeça, o antebraço que vai para trás da cabeça, o estribo, o cabo por trás das costas e a pilha que sobe.
- **De frente** (a segunda): o cotovelo perto da cabeça, o erro de abrir o cotovelo, a mão na cintura e o tríceps. Tríceps visível (cm², só o lado direito): de frente 90, de três quartos 79, de lado 64, de três quartos de trás 31, de trás 0. **A vista padrão do modo Músculos é a de frente.**

## Erros

| Erro (texto do app) | O que o boneco faz (medido) |
|---|---|
| Abrir o cotovelo (de frente; quadro parado no alongado) | o braço abre 22° para fora (no certo, 6° para dentro) e volta para perto da cabeça estendendo; elevação de 155° no alongado |
| Arquear as costas (de lado; quadro parado em cima) | a lombar e a torácica estendem enquanto o estribo sobe (os mesmos graus do francês com halter aprovado) |
| Amplitude curta (de lado; quadro parado no alongado) | a volta para com o cotovelo a 90°; a mão fica acima da cabeça |

## O equipamento

- **Coluna de polia** e **estribo**: os da tabela de objetos (os mesmos da puxada unilateral), sem peça nova. A altura do estribo (15 cm da pegada ao elo) continua provisória na tabela.

## Correções já feitas que esta animação respeita (`correcoes-ja-feitas.md`)

- Polia a 20/22 cm do chão nos tríceps unilaterais (04/11): aqui, 22 cm.
- A vista de lado como principal no tríceps.
- Músculos: tríceps principal, só o lado que trabalha, sem secundário (ficha da técnica, B.3.2).

## O que não ficou bom

- **De lado, o cabo passa por cima do desenho do braço esquerdo** (o que está na cintura, do lado de longe): fica 1,9 cm atrás da pele dele, mas no desenho as duas linhas se cruzam (`lateral:tec:f0` e `f1`). É onde o cabo passa de verdade com a mão na cintura; com o braço solto, ao lado do corpo, o cruzamento sumiria, mas o texto do app pede a mão na cintura.
- **O estribo aparece pequeno** em todos os quadros: a pegada fica dentro da mão e as alças, atrás dela.
- **Tirei o rótulo "desce atrás da cabeça"** da vista de lado: no alongado o fio cruzava o braço e a cabeça (o mesmo defeito anotado no francês). A vista de lado ficou com um rótulo ("cotovelo para cima"); a dica continua no texto da fase.
