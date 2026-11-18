# Lote B1 · Remada curvada com barra (`remada-barra`)

De 18/11/2026. Primeira animação deste exercício (até aqui ele só aparecia como cartão de texto). Em pé, tronco inclinado a 60° da vertical com a coluna reta; a barra longa com uma anilha de 5 kg de cada lado pende embaixo dos ombros e as duas mãos a puxam até encostar na barriga, com o tronco parado. **Ainda não aprovada nem ligada às telas.**

- Ficha da técnica: `docs/pesquisa/animacoes/remada-barra.md`. Cartão do app: `src/conteudo/exercicios/remada-barra.json` (só leitura).
- Ficha de movimento: `src/engine/novo/dados/movimentos/remada-barra.json`.
- Animação: `src/engine/novo/exercicios/remada-barra.ts`. O corpo parado sai do núcleo dos stiffs (`dobrarOQuadril`, só importado), como na remada curvada com halteres aprovada. O braço que puxa **não** é o do núcleo das remadas (`remada.ts`): lá cada mão segura um halter e o braço é dado por direções, com a mão andando de lado; com a barra rígida, as duas mãos ficam presas a ela a 50 cm uma da outra, então a barra anda num caminho e os braços se resolvem até ela. Regras: `regras/barra-longa.ts` (novas) e `regras/remadas.ts`, `regras/suspensao.ts` (as que já existiam, usadas como estão).
- Quadros grandes: `../quadros/remada-barra.png`. **Sem folha** (não havia animação de hoje).

## Onde os números saem

A ficha da técnica dá: tronco "a ~45° ou mais", pegada "um pouco mais aberta que os ombros", puxar "até a barriga", cotovelos "rente ao corpo", ~2 s na volta, tronco parado. O que ela não dá em número vem da remada curvada com halteres aprovada, com selo `desenho` e fonte `halteres`: joelho a 20°, pescoço, escápulas, ritmo da puxada e os números dos erros "arredondar" e "subir o tronco".

- **Tronco a 60°** (o halteres aprovado usa 62°): dentro do "45° ou mais". Com 50°, a barra pendurada ficava na altura do joelho e o boneco parecia quase em pé.
- **O caminho da barra:** começa pendurada embaixo do meio dos ombros, com os braços estendidos (se ela chegasse a menos de 1 cm das coxas, os braços iriam à frente; não foi preciso: ela pende a 19,5 cm da pele) e termina encostada na barriga, a 72% do caminho do meio dos ombros ao meio dos quadris, medido na pele desenhada. Entre as duas, em linha reta.
- **O equilíbrio** é feito com a barra a meio caminho da puxada; daí em diante o corpo não se mexe. O centro de massa anda dentro do apoio dos pés no ciclo todo.

**As anilhas são as de 5 kg (24 cm).** Com a de 20 kg (45 cm), de lado, a anilha de perto cobria o braço inteiro e a barriga: a puxada não se via (ver o terra romeno, mesmo problema).

## O que a fonte pede × o que o boneco faz (medido) × confere?

| O que a ficha da técnica (e o cartão) pede | Selo | O que o boneco faz (medido) | Confere? |
|---|---|---|---|
| Pés na largura do quadril, joelhos um pouco dobrados | consenso | pés parados (0 cm); joelho a 20°, parado | sim |
| Tronco inclinado a ~45° ou mais, coluna reta | consenso | o peito a 61,3° da vertical; lombar sem dobra além da curva de repouso (0°) | sim |
| Pegada um pouco mais aberta que os ombros | consenso | pegadas a 50 cm; centros dos ombros a 38,3 cm | sim |
| Início: braços estendidos, costas alongadas | consenso | o cotovelo dobra 9,3°; a escápula começa 6° à frente | sim |
| Puxa a barra até a barriga | consenso | no fim, a barra a 0 cm da pele da barriga, a 74,9% do caminho do ombro ao quadril | sim |
| Cotovelos passando rente ao corpo | consenso | o braço se afasta no máximo 20,8° do lado do tronco (a regra das remadas aprovadas: até 30°) | sim |
| No fim, as escápulas se juntam (das remadas aprovadas) | desenho | a clavícula vai 12,8° para trás | sim |
| Volta em ~2 s, sem mexer o tronco | consenso | volta de 2,1 s; a base do pescoço e a bacia andam 0 cm, o tórax gira 0° | sim |
| A barra sobe sem bater nas pernas | — | a barra fica a no mínimo 3,6 cm da pele das coxas e dos joelhos | sim |
| A barra é rígida | — | as mãos a 0 cm da barra, sempre a 50 cm uma da outra; a barra na horizontal | sim |

Ritmo: maior salto de 9,9% do pico (limite 15%). O cotovelo dobra de 9° a 98°.

**Conferência automática: 0 falha, 2 avisos.** (1) As linhas de desenho da ficha de movimento. (2) O modo Músculos abre de três quartos, de trás (dorsal e meio das costas: 565 cm²); de lado, 176 cm².

## As vistas

**De lado** (padrão do modo Técnica, como a remada com halteres aprovada): o tronco inclinado e parado, a barra subindo até a barriga e o cotovelo indo para trás. **Três quartos, de trás** (segunda vista e padrão do modo Músculos): as duas mãos na barra, os cotovelos para trás e o dorsal. Tentei pôr os rótulos de três quartos: com a barra atravessada eles só cabiam em cima, com os fios cruzando o corpo; ficaram de lado.

## Erros (os três do cartão, com o mesmo título e na mesma ordem)

| Erro (texto do app) | Vista | O que o boneco faz (medido) |
|---|---|---|
| Arredondar a lombar | de lado | a lombar e a parte de cima das costas curvam 22° cada; a bacia vira para trás o bastante para a base do pescoço ficar na mesma altura (os números da remada com halteres). Com as costas curvadas, a barriga chega perto das coxas: a barra para a 80% do caminho do ombro ao quadril, a 0,3 cm da coxa (o caminho foi achado de novo, encostado na barriga curvada) |
| Subir o tronco a cada puxada | de lado | o tronco sobe 25° durante a puxada (de 61° para 36° da vertical) |
| Puxar para o peito | três quartos, de trás | a barra vai a 35% do caminho do ombro ao quadril (o peito) e os cotovelos abrem: o braço se afasta 76° do lado do tronco (o certo: 21°) |

## O equipamento

A barra longa com uma anilha de 5 kg de cada lado: a peça já mostrada ao Gustavo, sem mudança. Nenhum objeto novo.

## Correções já feitas que esta animação respeita

Não há correção registrada para este exercício. Das remadas aprovadas: o tronco parado, os cotovelos que passam a linha das costas e as escápulas que se juntam no fim.

## O que não ficou bom

- **De lado, a anilha de perto cobre as mãos e a barra cobre parte da coxa** no fim da puxada; a pegada fechada se vê na vista de três quartos, de trás.
- **O caminho da barra é uma reta** da pendurada à barriga. De lado ela parece subir e voltar um pouco para trás, como na remada de verdade, mas não há fonte para a curva; ficou a reta.
- **No erro "Puxar para o peito", de três quartos, o braço de longe some atrás do tronco**; o cotovelo aberto se lê pelo braço de perto.
