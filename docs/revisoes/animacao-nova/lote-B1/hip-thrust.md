# Lote B1 · Hip thrust (`hip-thrust`)

De 18/11/2026. Primeira animação deste exercício (até aqui ele só aparecia como cartão de texto). A parte de cima das costas apoiada na borda comprida de um banco reto atravessado, os pés no chão; a barra longa com uma anilha de 5 kg de cada lado e a almofada de espuma sobre a dobra do quadril, segura pelas duas mãos; o quadril sobe até alinhar com o tronco e as coxas, segura ~1 s e desce. **Ainda não aprovada nem ligada às telas.**

- Ficha da técnica: `docs/pesquisa/animacoes/hip-thrust.md`. Cartão do app: `src/conteudo/exercicios/hip-thrust.json` (só leitura).
- Ficha de movimento: `src/engine/novo/dados/movimentos/hip-thrust.json`.
- Animação: `src/engine/novo/exercicios/hip-thrust.ts`. Usa de `exercicios/ponte.ts` (só importadas, sem mudança) as medidas da linha ombro–quadril–joelho e da canela; a carga sobre o quadril segue a ideia das pontes aprovadas (assenta por gravidade na dobra do quadril). Regras: `regras/barra-longa.ts` (novas) e `ponte-calcanhares-no-chao` (`regras/pontes.ts`, como está).
- Peças novas: `pecas-de-cena/banco-atravessado.ts` (o banco reto da tabela, com o desenho do banco de `equipamento.ts`, girado um quarto de volta: o estofado de um lado ao outro do corpo) e a almofada da barra (desenhada no arquivo do exercício, medidas em `dados/objetos/almofada-da-barra.json`).
- Quadros grandes: `../quadros/hip-thrust.png`. **Sem folha** (não havia animação de hoje).

## Como a pose é montada

1. A bacia inclina o que o instante pede, de embaixo a em cima.
2. O corpo é posto de modo que **um ponto fixo das costas** (no meio delas, 3 cm abaixo da ponta de baixo da escápula, ao longo do tronco: "borda do banco logo abaixo das escápulas") fique na borda do banco: o corpo gira em volta dela, sem deslizar.
3. As pernas vão aos pés, presos no chão. O pé fica onde, no topo, a canela fica a 3° da vertical ("canelas quase verticais").
4. A barra: a almofada assenta por gravidade no vale entre a barriga e as coxas (medido na pele desenhada, de meio em meio centímetro); no alto o corpo fica quase reto e o vale some, e as mãos a seguram perto da dobra (uma penalidade pequena com a distância a 6 cm à frente dos quadris). O resultado é tabelado em 25 pontos e alisado, para a barra não tremer.
5. As mãos seguram a barra por fora da almofada, a 28 cm do meio, com os cotovelos para fora e para baixo, como na ponte com halter aprovada.

**As anilhas são as de 5 kg (24 cm).** Com a de 20 kg (45 cm), de lado, a anilha de perto cobria o quadril e o glúteo inteiros, justamente o que o exercício ensina; com a de 24 cm, o glúteo, a mão na barra e a linha do tronco com as coxas aparecem.

## O que a fonte pede × o que o boneco faz (medido) × confere?

| O que a ficha da técnica (e o cartão) pede | Selo | O que o boneco faz (medido) | Confere? |
|---|---|---|---|
| Borda do banco logo abaixo das escápulas | consenso | a borda fica de 2,6 a 2,9 cm abaixo da ponta de baixo da escápula, ao longo do tronco; a pele das costas fica a 1,3 cm da borda (o ponto mais perto da conferência; o estofado amassa) | sim |
| Pés no chão na largura do quadril | consenso | pés a 18 cm (centros), parados (0 cm); o pé inteiro no chão (0 cm) | sim |
| Empurra pelos calcanhares até o quadril alinhar com o tronco e as coxas | consenso | subida de 1,2 s; no topo, ombro, quadril e joelho a 177,8° (180° = em linha); o tronco quase na horizontal (a 2,8° dela, a cabeça mais alta) | sim |
| No topo, canelas quase verticais | consenso | 3° da vertical | sim |
| Pausa de ~1 s no topo | consenso | 1 s | sim |
| Sem arquear a lombar; costelas para baixo, queixo levemente recolhido | consenso | lombar sem dobra além da curva de repouso (0°); o pescoço dobra 18° para a frente | sim |
| Embaixo: quadril perto do chão | consenso | a pele do glúteo a 12 cm do chão; o tronco a 48° da horizontal; o joelho dobra 102° | sim (ver abaixo) |
| Almofada na barra, sobre o quadril | consenso | a almofada fica de 0 a 0,1 cm da pele; a barra fica de 4,6 a 7,7 cm à frente do meio dos quadris, para o lado dos pés (na dobra); as anilhas a 33 cm do chão embaixo | sim |
| Banco encostado ou travado | consenso | o banco não sai do lugar no movimento certo | sim |
| A barra é rígida e as duas mãos a seguram | — | as mãos a 0 cm da barra, a 56 cm uma da outra; o cotovelo dobra de 48° a 90° | sim |

Ritmo: maior salto de 10,2% do pico (limite 15%). O corpo entra até 2,3 cm no estofado do banco (o tampo, onde as costas e a nuca apoiam no topo; a tolerância da conferência é 2,5 cm: o estofado amassa).

**"Perto do chão" = 12 cm.** Com as costas presas na borda de um banco de 43,5 cm, descer o glúteo a 4 cm do chão deixaria o tronco quase em pé (a 66° da horizontal), sentado contra o banco. Com 12 cm, o tronco fica a 48° da horizontal, como nas fotos de técnica. É escolha de desenho (selo `desenho`).

**Conferência automática: 0 falha, 2 avisos.** (1) As linhas de desenho da ficha de movimento. (2) O modo Músculos abre de lado (glúteo: 155 cm²); de três quartos, 27 cm².

## As vistas

**De lado** (padrão dos dois modos): o banco de topo, o tronco girando na borda, o quadril subindo até a linha, o glúteo e os pés no chão. **Três quartos, de frente** (segunda vista): o banco atravessado, a barra com a almofada sobre o quadril e as mãos nela. De trás e de frente, o banco e a barra tapam o corpo.

## Erros (os quatro do cartão, com o mesmo título e na mesma ordem)

| Erro (texto do app) | Vista | O que o boneco faz (medido) |
|---|---|---|
| Arquear a lombar no topo | de lado | no topo, a lombar arqueia 22° e a bacia inclina menos: o quadril fica dobrado 23° (o certo: 2,5°). Os números da ponte com halter aprovada |
| Empurrar pela ponta dos pés | de lado | o calcanhar sobe 12,8 cm (o pé a 40° da horizontal, como na ponte aprovada) |
| Subir pouco | de lado | o quadril para em 40% do caminho: no topo, a linha ombro–quadril–joelho fica 51° abaixo de reta |
| Banco desliza | de lado | o banco solto desliza 18 cm para trás com o empurrão; as costas vão junto e os pés ficam: os joelhos abrem de 88° para 55°, as canelas deitam e o corpo fica esticado, sem base. O cartão só diz "falha de montagem": a distância (18 cm) é escolha de desenho |

## O equipamento

- **Barra longa** com uma anilha de 5 kg de cada lado: a peça já mostrada ao Gustavo, sem mudança.
- **Banco reto atravessado** (`pecas-de-cena/banco-atravessado.ts`): as medidas do banco reto da tabela (122 × 30,5 cm, 43,5 cm de altura, estofado de 6,35 cm) e o mesmo desenho do banco de `equipamento.ts`, girado. O banco reto de `pecas.ts` fica ao longo de z e não serve aqui; não mexi nele.
- **Almofada da barra** (`dados/objetos/almofada-da-barra.json`): a AbMat Barbell Pad da Rogue, com as medidas da ficha pública do fabricante (44,45 cm de comprimento, 8,89 cm de largura, parede de 3,175 cm), desenhada como um tubo de espuma preta em volta do meio da barra.

## Correções já feitas que esta animação respeita

Não há correção registrada para este exercício. Das pontes aprovadas: ombro, quadril e joelho em linha no topo, canela em pé, a carga na dobra do quadril presa pelas duas mãos e os cotovelos para fora (correção de 10/11 na ponte com halter).

## O que não ficou bom

- **O banco aparece atrás do corpo, de lado.** O banco atravessado tem 1,22 m e a metade de perto dele, de verdade, ficaria na frente das costas; o pintor o põe atrás (a peça inteira tem uma profundidade só), o que deixa a borda e as costas visíveis. Ficou assim por ser mais legível; não é a perspectiva exata.
- **No erro "Banco desliza" não aparece onde o banco estava:** o banco é desenhado só na posição deslizada; o que mostra o erro é o corpo vermelho longe do tracejado do certo.
- **O fio do rótulo "empurra pelos calcanhares"** (três quartos) desce cruzando a perna até o calcanhar.
- **"Perto do chão" ficou em 12 cm** pelo motivo acima; se o Gustavo quiser o quadril mais baixo, o tronco fica mais em pé.
