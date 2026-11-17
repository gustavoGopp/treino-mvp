# Lote 7 · Extensão de joelho sentado com elástico (`extensao-joelho-elastico`)

De 15/11/2026. A extensão de joelho sentado na ponta de um banco reto, com o tubo com pegadores preso numa âncora de porta baixa, atrás do banco.

- **Postura:** sentado na beira do banco, costas retas, as mãos segurando as laterais do assento, o pé esquerdo no chão (joelho a 80°). A coxa direita fica apoiada e parada; só a canela sobe.
- **Elástico:** um pegador do tubo de 48 pol da tabela fica atravessado na frente do tornozelo direito (a "alça no tornozelo" do cartão, a mesma peça da flexão de joelho com elástico aprovada). O tubo sai de trás do tornozelo, passa debaixo do banco (ao lado do pé central dele) e vai até a alça de uma âncora de porta, a 10 cm do chão, no vão da dobradiça de uma porta atrás do banco, onde o outro pegador fica preso.
- **Por que o banco, e não a cadeira:** o cartão aceita "uma cadeira firme, sem rodinhas, ou um banco". A cadeira da tabela (`cadeira.json`) tem travessas entre os pés, perto do chão: no meio da subida o tubo passaria por dentro da travessa da frente. O banco reto tem um pé só no meio de cada ponta, e o tubo passa ao lado dele.

Ainda não está ligada às telas do app.

- **Fontes:** a ficha da técnica (`docs/pesquisa/animacoes/extensao-joelho-elastico.md`), o texto do app (`src/conteudo/exercicios/extensao-joelho-elastico.json`) e, para os erros, a animação de hoje (`src/engine/exercicios/extensao-joelho-elastico.ts`, que usava um poste baixo como escolha de desenho; aqui fica a trava de porta, que o cartão cita).
- **Ficha de movimento:** `src/engine/novo/dados/movimentos/extensao-joelho-elastico.json`.
- **Animação:** `src/engine/novo/exercicios/extensao-joelho-elastico.ts`. Usa as peças `elastico-ancora-no-alto.ts` (com a porta atrás, `atras`, acrescentado no crucifixo), `pegador-no-tornozelo.ts` e `elastico-pegador.ts`, sem mudança.
- **Regras novas** (em `regras/elasticos.ts`): `elastico-extensao-coxa-parada`, `elastico-extensao-amplitude`, `elastico-ancora-baixa-atras` e `elastico-livre-do-banco` (o tubo contra as caixas do banco). Usa também `elastico-livre-do-corpo`, `tronco-quase-parado` e `lombar-neutra`.
- **Folha:** `../prototipos/folha-extensao-joelho-elastico.png`. **Quadros:** `../quadros/extensao-joelho-elastico.png`.

## O elástico

O tubo da tabela: 121,9 cm, máximo de 3 vezes. A porta fica onde o tubo estica 1,15 vezes com o joelho dobrado ("o elástico já um pouco esticado", diz o cartão; "afaste a cadeira do ponto" é a progressão).

| Corpo | Joelho dobrado | Em cima |
|---|---|---|
| Homem | 1,2 vezes (140 cm) | 1,4 vezes (174 cm) |
| Mulher | 1,1 vezes (140 cm) | 1,5 vezes (182 cm) |

A alça fica 117 cm atrás da ponta do banco no homem e 131 na mulher.

## O que a fonte pede × o que o boneco faz (medido) × confere?

| O que a ficha da técnica (e o texto do app) pede | Selo | O que o boneco faz (medido, homem) | Confere? |
|---|---|---|---|
| Elástico preso num ponto baixo e firme atrás | consenso | A alça fica a 10 cm do chão, 93 cm atrás do corpo, numa porta fechada. | sim |
| A outra ponta no tornozelo (laço ou alça) | consenso | O pegador atravessado na frente do tornozelo, 2 cm acima dele. | sim |
| Sentado na beira do assento, costas retas, mãos na lateral | consenso | A ponta do banco 14 cm à frente do quadril; a base do pescoço anda 0 cm; a lombar 0° além da curva; as mãos fechadas na borda do estofado. | sim |
| Embaixo: joelho bem dobrado, pé fora do chão, elástico um pouco esticado | consenso | O joelho dobra 69° (mulher: 83°), com o pé 2 cm acima do chão; 1,2 vezes. | sim, com ressalva (abaixo) |
| Em cima: joelho quase esticado, sem tranco | consenso | 8° | sim |
| A coxa não sai do assento | consenso | O joelho e o quadril andam 0 cm. | sim |
| O tubo não encosta no banco nem no corpo | desenho | 4,2 cm do banco; 2,6 cm da pele (canela) | sim |
| ~1 s subindo, 1 s em cima, ~2 s descendo | consenso | 1,1 s, 1,0 s e 2,0 s | sim |

**Conferência automática:** `conferir.mjs` dá **0 falha e 2 avisos**:

1. **"Mais esticado em cima":** o ciclo começa com o joelho dobrado, onde o elástico estica menos. É o certo.
2. **Linhas de desenho da ficha:** a base, o banco, a coxa, o pé, as mãos e o trecho do tubo no quadro.

O item de ritmo da conferência dá 0%, porque ele acompanha o quadril, a cabeça, as mãos, o cotovelo e o joelho, e aqui nenhum deles se mexe: só a canela. O tornozelo anda sem degrau (`mix` linear em `u`, com o ritmo das fases).

## As vistas

- **De lado** (a primeira): a coxa parada no banco, a canela subindo e o tubo até a porta, que sai pela borda.
- **De três quartos, pela frente:** o banco, o tubo passando debaixo dele e o pegador no tornozelo.
- **Quadríceps visível (cm², homem/mulher):** de lado 356/327; de três quartos 335/310; de cima 321/295; de três quartos por trás 194/177; de frente e de trás 0. **A vista padrão do modo Músculos é a de lado.**

## Erros

| Erro (texto do app) | O que o boneco faz |
|---|---|
| Chutar a perna (de lado, em cima) | O joelho trava estendido (0°), o tronco vai 10° para trás e a lombar estende 6°. |
| Tirar a coxa do assento (de lado, em cima) | A coxa sobe 16° e o tronco vai 14° para trás. |
| Deixar o elástico puxar a perna de volta (de lado, no meio) | A perna cai solta: no meio da descida ela já está quase embaixo, e o tracejado mostra onde devia estar. |

## O que não ficou bom

- **Embaixo, o joelho do homem dobra 69°**, e não os ~87° da animação de hoje: no banco de 43,5 cm, mais dobrado o pé dele encosta no chão. A regra pede 60° ou mais ("joelho bem dobrado" não tem número na ficha). A mulher chega a 83°.
- **O fio de "desce devagar"** chega ao tornozelo de cima; em cima ele passa rente à ponta do pé.
- **O banco aparece inteiro** de lado: a pessoa senta na ponta e o banco vai para trás, até perto da porta.

## Risco de o Gustavo não gostar: médio

A pose sentada na ponta do banco é nova para esta extensão (a de hoje usava um caixote e um poste), o joelho do homem embaixo dobra menos que hoje e a âncora mudou do poste para a porta.
