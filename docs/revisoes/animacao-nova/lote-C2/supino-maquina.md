# Lote C2 · Supino sentado na máquina (`supino-maquina`)

De 18/11/2026. Primeira animação deste exercício (até aqui ele só aparecia como cartão de texto). Sentado na máquina, as costas e as escápulas no encosto, os pés no chão; as mãos presas nos pegadores atravessados, que pendem de dois braços com o eixo acima da cabeça. Empurra até quase estender os cotovelos e volta até um alongamento confortável do peito. **Ainda não aprovada nem ligada às telas** (quem integra registra em `aprovados.ts` e no catálogo do guia).

- Ficha da técnica: `docs/pesquisa/animacoes/supino-maquina.md`. Cartão do app: `src/conteudo/exercicios/supino-maquina.json` (só leitura).
- Ficha de movimento: `src/engine/novo/dados/movimentos/supino-maquina.json`.
- Animação: `src/engine/novo/exercicios/supino-maquina.ts`, sobre o núcleo novo das máquinas de empurrar sentado (`exercicios/maquina-de-empurrar.ts`), que o desenvolvimento na máquina também usa. Regras medidas: `src/engine/novo/regras/maquinas-de-empurrar.ts` (e três das cadeiras de C1, `regras/cadeiras.ts`, que servem com as mesmas marcas).
- A peça: `src/engine/novo/pecas-de-cena/maquina-de-empurrar.ts` (a função comum, com um modelo por máquina) e `pecas-de-cena/supino-maquina.ts`; medidas em `src/engine/novo/dados/objetos/supino-maquina.json`; folha em `docs/revisoes/animacoes-restantes/pecas/folha-supino-maquina.png`.
- Quadros grandes: `../quadros/supino-maquina.png`. **Sem folha** ao lado da animação de hoje: este exercício não tinha animação.

## Onde os números saem

A ficha da técnica dá a técnica em palavras e um número só (cotovelos a ~30–60° do tronco, por analogia com o supino com halteres). O resto vem das animações aprovadas parecidas (selo `desenho`, cada linha diz de onde): o sentar e encostar das cadeiras de C1 (a lombar 10° menos curva, o pescoço que devolve 70% da inclinação do peito, 1 cm de estofado), as escápulas do supino com halteres aprovado, o cotovelo em cima do supino no smith aprovado (12°).

**Nada da pose é posto à mão; a máquina se regula para o corpo, como quem treina faz antes da série** (uma vez por corpo, guardado em `calibragens.ts`):
- o glúteo no assento e as costas paralelas e encostadas no encosto (a bacia e a inclinação do tronco saem do contato, medido na pele do Boneco);
- **a altura do assento**: sobe ou desce até o centro da mão, no pegador, ficar na linha do meio do peito (`altura.peito` da tabela) no começo: deu **46,1 cm** (o curso desenhado vai de 36 a 56);
- **a posição inicial dos braços da máquina**: onde o cotovelo dobra 100° ("alongamento confortável"; o supino com halteres aprovado dobra 104° embaixo): deu 7,0°;
- **o fim**: onde o cotovelo fica dobrado 12° (sem travar): deu 35,5°.

As mãos não andam numa reta: cada uma fica presa no pegador, e o pegador anda num arco em volta do eixo do braço da máquina (54 cm de raio); o braço de quem treina se resolve até a mão, com o cotovelo para onde a ficha pede (a 45° do tronco).

## O que a fonte pede × o que o boneco faz (medido) × confere?

| O que a ficha da técnica (e o cartão) pede | Selo | O que o boneco faz (medido) | Confere? |
|---|---|---|---|
| Banco na altura em que os pegadores ficam na linha do meio do peito | consenso | com o assento a 46,1 cm, o centro da mão fica a 0 cm da linha do meio do peito no começo | sim |
| Costas e escápulas apoiadas | consenso | as costas a −1 cm do encosto (afundam 1 cm) em cima e embaixo dele, o ciclo todo; o glúteo 1 cm dentro do assento; as escápulas 9° para trás e 4° para baixo | sim |
| Pés no chão | consenso | pés chapados, o joelho a 90°, parados (0 cm) | sim |
| Volta até um alongamento confortável do peito | consenso | no começo, o cotovelo dobra 100°, a mão fica 38 cm à frente da articulação do ombro e 10 cm abaixo dela; o cotovelo fica 5,7° à frente do plano do peito (o tronco deita 21° no encosto) | sim (ver "o que não ficou bom") |
| Cotovelos a ~30–60° do tronco | consenso | no começo, o braço faz 43,7° com o tronco, visto de frente para o peito | sim |
| Empurra até quase estender os cotovelos, sem travar | consenso | em cima, o cotovelo dobra 12°; a mão chega na altura do ombro (101,5 contra 102,1 cm) | sim |
| As mãos no pegador o movimento todo | consenso | a no máximo 0 cm do meio da borracha; nenhuma falta de alcance | sim |
| O pegador anda num arco (a máquina) | desenho | raio constante de 54 cm em volta do eixo; a mão anda 24,4 cm para a frente e 10,2 cm para cima (flecha de 1,7 cm), e os pegadores se aproximam de 61,3 para 54 cm entre as mãos (o eixo inclinado 8°, "converging motion path" da Precor) | sim |
| As placas sobem com os braços | desenho | 0 cm no começo (apoiadas), 6,5 cm em cima: o arco do came de 26 cm, a 0 cm do esperado | sim |
| Ritmo (do supino com halteres aprovado) | consenso | 0,45 s embaixo, empurra em 1,3 s, 0,4 s em cima, volta em 2,4 s; salto de velocidade de 7,5% do pico (limite 15%); o último quadro emenda no primeiro (0 cm) | sim |

**Conferência automática (`node scripts/animacao-nova/conferir.mjs supino-maquina`): 0 falha, 2 avisos.** (1) As linhas da ficha de movimento que são escolha de desenho (`assento.amassa`, `lombar.sentado`, `pescoco.compensa`, `joelho`, `cotovelos.atras`, `cotovelo.embaixo`, `placas`). (2) O modo Músculos abre de frente (peito: 438 cm²); de lado o peito quase não aparece (84 cm²), atrás do braço, como no supino com halteres aprovado. O corpo entra até 2,3 cm no estofado (o glúteo e as costas afundam 1 cm; a tolerância é 2,5).

## As vistas

**De lado** (padrão do modo Técnica): mostra o empurrão para a frente, o pegador na linha do peito e as costas no encosto. O braço de perto da máquina é pintado atrás do corpo nessa vista (um corte de ilustração, como o do smith): senão o tubo dele cobriria a mão e o braço direito. **De frente** (padrão do modo Músculos): mostra o peito, os cotovelos a ~45° e os pegadores se aproximando. De três quartos pela frente, o braço de perto da máquina passa na frente do ombro e do braço de quem treina e tapa o corpo; de três quartos por trás, a torre fica na frente: as duas ficaram de fora.

## Erros (os três do cartão, com o mesmo título e na mesma ordem)

| Erro (texto do app) | Vista | O que o boneco faz (medido) |
|---|---|---|
| Banco na altura errada | de lado, no começo | o assento 10 cm mais baixo (36,1 cm), com os braços da máquina na mesma posição inicial: o pegador fica na altura da articulação do ombro (91,3 contra 91,5 cm), 10 cm acima da linha do peito; o cotovelo dobra 108° e sobe junto |
| Tirar as costas | de lado, em cima | no fim do empurrão o tronco vai 18° à frente e os ombros 10°: as costas de cima saem 11,9 cm do encosto (as de baixo, 0,8 cm); o cotovelo fica dobrado 88° (o tronco foi até o pegador) |
| Travar os cotovelos | de lado, em cima | o cotovelo estica até 2,5° (o mais esticado que o braço do Boneco chega sem sair do pegador; o certo para em 12°), os ombros vão 6° à frente e os braços da máquina passam um pouco do fim certo |

Erro sem desenho: nenhum (os três têm consequência visível na pose).

## O equipamento

O supino na máquina é peça nova (folha: `docs/revisoes/animacoes-restantes/pecas/folha-supino-maquina.png`): o assento que sobe e desce num pé com pino, o encosto parado a 15°, a coluna de trás e a travessa do alto, dois braços independentes que pendem do eixo (145 cm do chão, 12 cm atrás da borda do assento) com o pegador atravessado na ponta, o came no braço da esquerda e a torre com a pilha ao lado. As medidas e as fontes estão no arquivo de objetos e na folha.

## Correções já feitas que esta animação respeita

Não há correção registrada para este exercício em `correcoes-ja-feitas.md` (ele nunca teve animação). Das correções do supino: a cabeça no lugar (aqui, sentado, o pescoço compensa a inclinação do encosto e o olhar fica quase na horizontal).

## Pedidos (texto do app ou lista de músculos)

Nenhum.

## O que não ficou bom

- **O alongamento embaixo é curto.** Com o cotovelo a 100° e o tronco deitado 21° no encosto, o cotovelo fica 5,7° à frente do plano do peito: o peito alonga pouco. Dobrar mais o cotovelo embaixo (110°) leva o cotovelo para trás do peito, mas a mão encosta mais perto do peito do que o supino com halteres aprovado; fiquei com o número do aprovado.
- **O caminho sobe 10 cm** (da linha do peito à altura do ombro), porque o braço pende de um eixo acima da cabeça. É o arco da máquina; numa máquina real o quanto ele sobe depende de onde fica o eixo, que nenhuma ficha lida dá.
- **De lado, o fio de "costas no encosto"** chega ao pescoço passando pela borda do encosto, e o de "pegador na linha do peito" aponta para a mão no meio do caminho (o ponto do rótulo é a média do ciclo).
- **O braço de perto da máquina some de lado** (é pintado atrás do corpo, de propósito); quem olha de lado vê o braço de longe.
- **O came de 26 cm** no eixo da esquerda é grande no quadro de lado (é o que faz as placas subirem 6,5 cm num giro de 28,5°; nenhuma ficha dá o came nem a relação do cabo).

**Risco de o Gustavo não gostar: médio.** A pose e a máquina fecham pela medida, os erros se leem, e a máquina funciona; o risco está na peça (o eixo acima da cabeça não é o do cartão de hoje, e o cartão é de anilhas) e no alongamento curto embaixo.

## Correção de 19/11 (auditoria, pequenos)

**Como medi.** No desenho que o app pinta (o mesmo `ex.quadro`, o mesmo Boneco e o mesmo desenho da máquina), em cada vista declarada e na de cada erro, na técnica e em cada erro, nos dois lados. A entrada na pele densa (`src/engine/novo/pele-densa.ts`): 36 pontos por anel e 3 anéis no meio de dois vizinhos, e não os 12 pontos por anel da conferência automática; a medida é a da conferência (a menor distância do ponto às faces da caixa), com a mesma tolerância de 2,5 cm.

**O achado da auditoria: o braço entra 2,7 cm no encosto, no fim. Não se confirma na técnica.** O 2,7 é o quanto a pele da raiz do braço fica atrás da face do encosto (medi 2,7), a 2,4 cm da borda do lado. Medida como a conferência mede, na pele densa, a entrada é 2,35 cm no fim e 1,8 no começo: dentro da tolerância. Na técnica não mexi.

**Achado novo, no erro "Banco na altura errada":** com o assento 10 cm mais baixo, em cima os braços sobem mais em relação aos ombros, e a pele da raiz do braço entrava **2,6 cm** no encosto (u = 1).

**O que mudou.** No núcleo das máquinas de empurrar (`exercicios/maquina-de-empurrar.ts`), duas opções novas do desvio, desligadas por padrão: `afasta` (o corpo vem para a frente, na normal do encosto, com os pés no lugar) e `encostoAte` (em cada quadro, se o tronco entra no encosto mais que o `amassa` ou a pele dos braços mais que o valor dado, medidos na pele densa, o corpo vem para a frente o que passa). Sem elas, nada muda (o desenvolvimento e a remada articulada também usam o núcleo). No supino, o erro do banco usa `encostoAte` = 2,35 cm (o que a raiz do braço entra em cima na técnica; linha nova da ficha, `erro.banco.ombroNoEncosto`).

| erro do banco | antes | depois |
|---|---|---|
| braço no encosto (pele densa), u = 1 | 2,6 cm | 2,33 cm |
| quanto o corpo veio para a frente, u = 1 | 0 | 0,28 cm (u < 0,85: 0) |
| costas de cima no encosto, u = 1 | −0,27 cm | 0,03 cm (encostadas) |
| cotovelo em cima | 12° | 16,7° |

**O outro achado da auditoria: o assento pintado sobre a coxa e a bacia, no erro do banco. Não se confirma no desenho real.** A estrutura do supino (o assento e o encosto) é cenário: o app a pinta numa camada abaixo do corpo (e do corpo tracejado do erro), em qualquer profundidade. A medida de pintura (`regras/pintura-sobre-o-estofado.ts`) acha 0 anel por baixo do assento (nenhum anel na frente dele e por cima dele na tela), e o quadro grande mostra o glúteo por cima da borda do assento. Não mexi.

**Conferência nova:** `supino-maquina-pele-nos-estofados` (`regras/maquinas-de-empurrar.ts`, com a medida em `regras/entrada-densa.ts`). Depois: passa (braços 2,4 cm; coxas 1,4; bacia 1,3; cintura 1,2; tronco 1).

**Conferência automática:** 0 falha, 2 avisos (os de antes). O preparo não muda (o ajuste é do quadro, não das calibrações). O quadro grande do erro do banco é o de u = 0, que não muda; os quadros não foram refeitos.

**O que ainda não ficou bom:** de lado, a raiz do braço (o anel do ombro do Boneco) passa um pouco por trás da linha das costas e por cima do encosto, na técnica também (2,35 cm de entrada). É da forma do braço junto do ombro, que este lote não muda.
