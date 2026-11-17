# Lote A1 · Rosca Scott com halter, braço apoiado no encosto do banco inclinado (`rosca-scott-banco-inclinado`)

De 17/11/2026. Primeira animação deste exercício: até aqui ele aparecia no app só como cartão de texto, e não existe animação de hoje. De pé atrás do banco regulável, com o encosto a 60°, a pessoa passa o braço direito por cima da ponta e deita o tríceps no estofado, com a axila no topo; só o antebraço gira. **Ainda não aprovada nem ligada ao app.**

- Ficha da técnica: `docs/pesquisa/animacoes/rosca-scott-banco-inclinado.md`; texto do app: `src/conteudo/exercicios/rosca-scott-banco-inclinado.json`.
- Ficha de movimento: `src/engine/novo/dados/movimentos/rosca-scott-banco-inclinado.json`.
- Animação: `src/engine/novo/exercicios/rosca-scott-banco-inclinado.ts` (o braço segue a mesma conta das roscas, `dobrar-o-cotovelo.ts`: o úmero parado e o antebraço dobrando no plano do braço, com o polegar 85° para fora; o halter vem de `halterNaMao`).
- Regras novas: `src/engine/novo/regras/rosca-scott.ts`.
- Quadros grandes: `../quadros/rosca-scott-banco-inclinado.png`. Sem folha (não há animação de hoje).

## De pé ou ajoelhado? E o ângulo do encosto

O cartão diz "de pé ou ajoelhado atrás do banco" e "encosto a ~45 a 60°". A ficha não escolhe; o cartão diz "de pé" primeiro. Medido nas tabelas (corpo ANSUR II; banco Rogue AB-3: dobradiça a 37,5 cm do chão, encosto de 98 cm, estofado de 7 cm):

| Encosto | Alto da face do encosto | Axila, de pé (133,2 cm) | Axila, ajoelhado (~84 cm) |
|---|---|---|---|
| 60° | 125,9 cm | 7 cm acima: chega com o tronco um pouco inclinado e o joelho levemente dobrado | 42 cm abaixo: não chega |
| 45° | 111,7 cm | 21 cm acima: precisaria se curvar muito | 28 cm abaixo: não chega |

Ajoelhado só funcionaria num banco mais baixo que o da tabela. Ficou **de pé, com o encosto a 60°**: a axila chega ao topo com o tronco inclinado 26° à frente e o joelho dobrado 18°, sem curvar a coluna (lombar a 0°). É também o ângulo da rosca inclinada aprovada, no mesmo banco.

## O que a fonte pede × o que o boneco faz (medido) × confere?

| O que a ficha da técnica (e o cartão) pede | Selo | O que o boneco faz (medido) | Confere? |
|---|---|---|---|
| Braço apoiado no encosto ("braço colado no encosto", "o braço continua no encosto") | consenso | o tríceps amassa o estofado 1 cm, do começo ao fim (de 1 a 1 cm: não descola nem atravessa); o cotovelo anda 0 cm enquanto dobra de 14° a 125° | sim |
| Axila no topo do encosto | consenso | o centro do ombro fica 8 cm além da ponta, na linha do braço; nos 6 cm de cima do encosto a pele do braço já amassa 1 cm; o lado do peito fica a 0,4 cm do alto do encosto | sim |
| De pé atrás do banco | consenso | de pé, pés na largura do quadril dos dois lados da viga do banco, parados (0 cm); tronco 26° à frente, joelho 18°, quadril 28° | sim |
| Halter na mão, palma para cima | consenso | o antebraço fica supinado 85° (90° = palma toda para cima, no plano do braço) o ciclo todo | sim |
| Embaixo: braço quase estendido, sem travar | opinião de 17 | o cotovelo para dobrado 14° (nunca chega a 0°) | sim |
| Em cima: halter perto do ombro | consenso | o centro da pegada fica a 29,8 cm do centro do ombro; o antebraço ainda 25° antes da vertical (o peso continua no bíceps) | sim |
| Subida ~1 s, pausa curta no alto, descida ~2 a 3 s | consenso | 1,0 s, 0,4 s e 2,6 s | sim |
| Só o antebraço se mexe | consenso | a base do pescoço e a pelve se movem 0 cm | sim |
| O halter não bate no corpo, no banco nem no chão | desenho | 0,4 cm do antebraço (a cabeça do halter junto da mão), 3,2 cm do rosto no topo, 5,2 cm do estofado | sim |

Conferência automática (`node scripts/animacao-nova/conferir.mjs rosca-scott-banco-inclinado`): **0 falha, 2 avisos**: as linhas de desenho da ficha (`apoio.amassa`, `tronco.frente`, `cervical`, `cabeca`, `pes.*`, `braco.x`, `braco.inclina`, `maos.supinacao`, `carga`) e o antebraço como "só ajuda", fora da lista do conteúdo (é a mesma escolha das outras roscas aprovadas, correção de 04/11). Ritmo suave (salto de 6%, limite de 15%); o corpo amassa o estofado 1 cm (tolerância 2,5).

### Como o braço fica no encosto (o contato medido)

O braço deita paralelo à face do encosto. A altura do ombro sobre a face é calculada para a pele do tríceps afundar 1 cm no estofado (`resolver1`, guardado em `calibragem`); a regra `rosca-scott-braco-no-encosto` mede, a cada 3 quadros, o ponto mais fundo da pele do braço direito (do ombro ao cotovelo) contra a face e exige que ele fique entre −0,5 e 2,5 cm. Mediu 1 cm o tempo todo.

Duas tentativas que não deram certo, e por quê:
- **Braço no meio do encosto:** o lado do peito, junto da axila, entrava 3 cm no estofado em qualquer posição do ombro ao longo do encosto (de 15 cm antes a 25 cm além da ponta), com o tronco de 10° a 40° e com o tronco girado. O braço passou para 9 cm do meio, para o lado do corpo (o estofado tem 28,6 cm): a axila e o lado do peito passam além da borda, e o braço continua inteiro sobre o estofado.
- **O ombro descendo ao longo do encosto até o peito encostar no topo** (a primeira versão): o ombro ia parar 5 cm antes da ponta, com o joelho dobrado 64°. Ficou a posição do ombro dada pela ficha (8 cm além da ponta).

### A vista, por medida

| Vista | Bíceps (cm²) | Caminho do halter na tela (cm) |
|---|---|---|
| de frente (`frontal`) | 86,4 | 55,6 |
| três quartos (`quina`) | 60,5 | 62,6 |
| de lado (`lateral`) | 53,6 | 66,4 |
| de cima (`cima`) | 42,8 | 30,5 |
| de trás e três quartos de trás | 0 | — |

Ficaram **de lado** (a padrão: é a única em que a face do encosto aparece de perfil, e dá para ver que o braço deita nela sem atravessar; o caminho do halter é o maior) e **três quartos** (a segunda: mostra o braço sobre o estofado, o bíceps e o halter). De frente o bíceps aparece mais, mas o encosto tapa o braço inteiro e o halter. O modo Músculos abre em três quartos (maior área entre as duas).

## Erros

| Erro (texto do app) | Vista | O que o boneco faz (medido) |
|---|---|---|
| Travar o cotovelo embaixo ("estica de vez, soltando o peso") | de lado | o cotovelo estica até o halter bater no estofado: 5,9° (no certo, 14°); a mão desce 4,8 cm e o halter fica apoiado no encosto, que é o "soltando o peso" do cartão |
| Tirar o braço do encosto ("o ombro ajuda a subir") | de lado | na subida, o braço gira 30° no ombro e sai do estofado: o cotovelo sobe 20 cm da face (anda 16,4 cm) e o tríceps fica a 6,9 cm dele; o cotovelo dobra só 100° em cima |
| Descer pouco ("desça até o braço quase estender") | de lado | embaixo, o cotovelo para em 55° (no certo, 14°): a mão fica 21,3 cm mais alta |

Os três erros do cartão foram desenhados, com o mesmo título e na mesma ordem.

## O equipamento

- **Banco regulável** (`dados/objetos.json`, `bancoRegulavel`, Rogue AB-3), na posição de sempre, encosto a 60°. A pessoa fica do lado de trás do encosto, com os pés dos dois lados da viga do chão.
- **Halter de 25 lb** (`dados/objetos.json`, `halter`): o cartão diz só "um halter". O cabo atravessa a palma, de lado.

## Correções já feitas que esta animação respeita

Nenhuma correção registrada para este id em `correcoes-ja-feitas.md`. Das roscas aprovadas vêm: o bíceps em vermelho e o antebraço como "só ajuda" (04/11), e a palma com o polegar 85° para fora.

## O que não ficou bom

- **O braço esquerdo pende solto**, ao lado do corpo, fora do banco. O cartão não diz o que ele faz. Tentei a mão segurando a borda do encosto, mas com o braço direito a 9 cm do meio (para o peito não entrar no estofado) a borda do lado do corpo fica ocupada pelo braço direito e pelo halter. De lado, a mão esquerda aparece atrás do encosto, na altura do joelho, como um volume solto.
- **O erro "travar o cotovelo" é discreto:** o halter bate no estofado com o cotovelo a 5,9°, só 8° menos que o certo. Para a diferença aparecer, o certo para em 14° (a rosca inclinada para em 8°); a linha tracejada e o halter apoiado no encosto contam o erro, mas ele se lê melhor em movimento.
- **No topo, o halter fica a 3,2 cm do rosto.** Com o cotovelo a 130° (como a rosca inclinada) ele chegava a 0,5 cm; ficou em 125°, e o pescoço um pouco estendido (olhar à frente). De lado, o halter aparece na frente do rosto.
- **O braço deita a 9 cm do meio do encosto**, perto da borda (o centro do braço a 5,3 cm dela). Na academia a pessoa costuma pôr o braço no meio; aqui o lado do peito atravessaria o estofado.
- **As distâncias do corpo (tronco, pés, pescoço) são escolha de desenho:** a ficha só dá "de pé atrás do banco, axila no topo".
