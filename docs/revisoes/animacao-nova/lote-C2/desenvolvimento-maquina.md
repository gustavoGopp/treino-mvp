# Lote C2 · Desenvolvimento na máquina (`desenvolvimento-maquina`)

De 18/11/2026. Primeira animação deste exercício (até aqui ele só aparecia como cartão de texto). Sentado na máquina, as costas no encosto, os pés no chão; as mãos presas nos pegadores atravessados, na ponta de dois braços que saem de um eixo alto atrás do encosto. Empurra para cima até quase estender os cotovelos e desce até os pegadores chegarem perto dos ombros. **Ainda não aprovada nem ligada às telas** (quem integra registra em `aprovados.ts` e no catálogo do guia).

- Ficha da técnica: `docs/pesquisa/animacoes/desenvolvimento-maquina.md`. Cartão do app: `src/conteudo/exercicios/desenvolvimento-maquina.json` (só leitura).
- Ficha de movimento: `src/engine/novo/dados/movimentos/desenvolvimento-maquina.json`.
- Animação: `src/engine/novo/exercicios/desenvolvimento-maquina.ts`, sobre o núcleo das máquinas de empurrar sentado (`exercicios/maquina-de-empurrar.ts`, o mesmo do supino na máquina). Regras medidas: `src/engine/novo/regras/maquinas-de-empurrar.ts`, mais `carga-na-altura-do-ombro` (dos desenvolvimentos em pé aprovados) e duas das cadeiras de C1.
- A peça: `src/engine/novo/pecas-de-cena/maquina-de-empurrar.ts` (a função comum) e `pecas-de-cena/desenvolvimento-maquina.ts`; medidas em `src/engine/novo/dados/objetos/desenvolvimento-maquina.json`; folha em `docs/revisoes/animacoes-restantes/pecas/folha-desenvolvimento-maquina.png`.
- Quadros grandes: `../quadros/desenvolvimento-maquina.png`. **Sem folha** ao lado da animação de hoje.

## Onde os números saem

A ficha da técnica não dá número. O que ela não dá vem das animações aprovadas parecidas (selo `desenho`): o sentar e encostar das cadeiras de C1, o encosto a 12° da vertical e os cotovelos 30° à frente do desenvolvimento sentado com halteres aprovado, o cotovelo embaixo dos desenvolvimentos em pé aprovados (142° a 147° com a carga perto dos ombros), o erro de arquear do desenvolvimento sentado aprovado (a lombar −22°, as costas de cima −8°, a bacia 14° à frente).

A máquina se regula para o corpo (uma vez por corpo, em `calibragens.ts`):
- o glúteo no assento e as costas paralelas e encostadas no encosto (medido na pele);
- **a altura do assento**: até o centro da mão ficar 5 cm acima da ponta do ombro no começo ("na linha dos ombros", "na altura do queixo ou dos ombros"): deu **47,0 cm**;
- **a posição inicial dos braços da máquina**: onde o cotovelo dobra 142°: deu 81,9° (90° = o braço da máquina na horizontal);
- **o fim**: onde o cotovelo fica dobrado 12°: deu 132,7°.

As mãos ficam presas nos pegadores, que andam num arco de 72 cm de raio em volta do eixo de cada braço.

## O que a fonte pede × o que o boneco faz (medido) × confere?

| O que a ficha da técnica (e o cartão) pede | Selo | O que o boneco faz (medido) | Confere? |
|---|---|---|---|
| Banco na altura em que os pegadores ficam na linha dos ombros; embaixo, na altura do queixo ou dos ombros | consenso | embaixo, o centro da mão fica 5 cm acima da ponta do ombro (assento a 47 cm), 16 cm à frente da articulação do ombro; o cotovelo dobra 142° | sim |
| Costas apoiadas no encosto, sem arquear a lombar | consenso | as costas a −1 cm do encosto em cima e embaixo dele, o ciclo todo; o glúteo 1 cm dentro do assento; a lombar fica na curva de sentado (10° menos curva que em pé) | sim |
| Empurra para cima até quase estender os cotovelos | consenso | em cima, o cotovelo dobra 12°; o braço sobe a 167° | sim |
| Em cima, as mãos sobre os ombros (dos desenvolvimentos aprovados) | consenso | em cima, o centro da mão fica a 3,2 cm da vertical do ombro | sim |
| As mãos no pegador o movimento todo | consenso | a no máximo 0 cm do meio da borracha; nenhuma falta de alcance | sim |
| O pegador anda num arco (a máquina) | desenho | raio constante de 72 cm; a mão sobe 58 cm e volta 19,4 cm (flecha de 7 cm: vai um pouco à frente no meio e termina sobre o ombro); os pegadores se aproximam de 58,8 para 42,5 cm entre as mãos (o eixo inclinado 8°, "converging axis" da Precor) | sim |
| As placas sobem com os braços | desenho | 0 cm no começo, 14,2 cm em cima (o arco do came de 32 cm), a 0 cm do esperado | sim |
| Ritmo (dos desenvolvimentos aprovados) | consenso | 0,45 s embaixo, sobe em 1,3 s, 0,4 s em cima, desce em 2,4 s; salto de 5,9% (limite 15%); o ciclo fecha (0 cm) | sim |

**Conferência automática (`node scripts/animacao-nova/conferir.mjs desenvolvimento-maquina`): 0 falha, 2 avisos.** (1) As linhas de escolha de desenho (`assento.amassa`, `lombar.sentado`, `pescoco.compensa`, `pes.meiaDistancia`, `joelho`, `cotovelos.desce`, `cotovelo.embaixo`, `placas`). (2) O modo Músculos abre de lado (a frente do ombro: 48 cm²); de frente, 0 cm²: o mesmo aviso do desenvolvimento sentado com halteres aprovado (40 e 0 cm²). O corpo entra até 1,9 cm no estofado (tolerância 2,5).

## As vistas

**De lado** (padrão): o pegador subindo quase na vertical, as costas no encosto, o braço da máquina vindo de trás da cabeça. O braço de perto da máquina é pintado atrás do corpo nessa vista (como no supino). **De frente**: os braços subindo e se aproximando, os pegadores na altura dos ombros embaixo. De três quartos, o braço de perto da máquina cruza a cabeça e os braços de quem treina: ficou de fora.

## Erros (os dois do cartão, com o mesmo título e na mesma ordem)

| Erro (texto do app) | Vista | O que o boneco faz (medido) |
|---|---|---|
| Arquear a lombar | de lado, em cima | a lombar arqueia 22°, as costas de cima 8° e a bacia vai 14° à frente enquanto sobe: na altura da lombar, as costas saem do encosto (de 2 cm de folga no certo, que é o oco natural da lombar, para 5,7 cm), e o peito vai para trás; os braços da máquina param onde o cotovelo ainda dobra 12° |
| Descer pouco | de frente, embaixo | a descida para a 45% do caminho: as mãos ficam acima da cabeça (141 cm, contra 113 no certo), o cotovelo dobra 105° em vez de 142°; as placas não voltam a apoiar |

## O equipamento

O desenvolvimento na máquina é peça nova (folha: `docs/revisoes/animacoes-restantes/pecas/folha-desenvolvimento-maquina.png`), da mesma função do supino na máquina com outro modelo: o eixo dos braços atrás do encosto (123 cm do chão, 95 cm atrás da borda do assento), os braços de 72 cm que vêm dele para a frente passando ao lado da cabeça, o encosto mais longo (72 cm, até a nuca) a 12°.

## Correções já feitas que esta animação respeita

Não há correção registrada para este exercício. Do desenvolvimento sentado aprovado: o encosto a 12° (78° da horizontal) e o erro de arquear com os mesmos números.

## Pedidos (texto do app ou lista de músculos)

Nenhum. (O desenvolvimento sentado aprovado mostra o trapézio de cima como "só ajuda"; a ficha da máquina não lista o trapézio, e ele ficou de fora.)

## O que não ficou bom

- **De lado, embaixo, a mão fica na frente do rosto** (ela está a 29 cm do meio, ao lado da cabeça, mas de perfil as duas se cobrem), como no desenvolvimento com halteres aprovado.
- **De lado, os fios dos dois rótulos atravessam o corpo** (a máquina ocupa o lado de trás do quadro e os textos vão para a frente), como "costas no encosto" no desenvolvimento sentado aprovado.
- **O arqueado se lê pela forma do tronco mais que pelo vão:** a lombar sai 3,7 cm a mais do encosto, porque a borda de baixo do encosto (60 cm) fica acima do fundo da lombar.
- **O eixo não é "overhead" como a Precor diz:** fica atrás do encosto, na altura da cabeça. Com o eixo acima da cabeça e o braço pendendo dele, o pegador iria para a frente ao subir, e não para cima.
- **O came de 32 cm** é grande (é o que faz as placas subirem 14 cm num giro de 51°).

**Risco de o Gustavo não gostar: médio.** A pose fecha pela medida e se parece com o desenvolvimento aprovado; o risco está na peça nova (o cartão é de anilhas e tem o eixo mais baixo) e no quadro de lado, em que o braço da máquina e a mão se juntam perto do rosto.

## Correção de 19/11 (auditoria, pequenos)

**Como medi.** No desenho que o app pinta (o mesmo `ex.quadro`, o mesmo Boneco e o mesmo desenho da máquina), em cada vista declarada e na de cada erro, na técnica e em cada erro, nos dois lados. A entrada na pele densa (`src/engine/novo/pele-densa.ts`): 36 pontos por anel e 3 anéis no meio de dois vizinhos, e não os 12 pontos por anel da conferência automática; a medida é a da conferência (a menor distância do ponto às faces da caixa), com a mesma tolerância de 2,5 cm.

**O achado da auditoria: o braço entra 2,6 cm no encosto no fim e 3,2 no erro "Arquear a lombar".** No fim da técnica, não se confirma como entrada: o 2,6 é o quanto a pele fica atrás da face do encosto (medi 2,7), a 2,5 cm da borda do lado; a entrada, na pele densa, é 2,1 cm. **No erro, confirma-se:** 3,19 cm de entrada (u = 0,95), e o tronco também entrava 1,7 cm (o `amassa` é 1). A causa: no arco, o peito vai para trás em volta da bacia parada e leva o alto das costas e a parte de trás dos ombros para dentro do encosto.

**O que mudou.** O erro usa a opção nova do núcleo `encostoAte` (`exercicios/maquina-de-empurrar.ts`, ver o supino na máquina), com 2,1 cm (o que a raiz do braço entra em cima na técnica; linha nova da ficha, `erro.arco.ombroNoEncosto`): o corpo vem para a frente o que o tronco e os ombros entrariam a mais, e é a lombar e a bacia que saem do encosto, como o cartão diz.

| erro "Arquear a lombar" | antes | depois |
|---|---|---|
| braço no encosto (pele densa) | 3,19 cm (u = 0,95) | 2,16 cm |
| tronco no encosto | 1,72 cm (u = 1) | 1,0 cm ou menos |
| quanto o corpo veio para a frente, em cima | 0 | 1,9 cm |
| costas de cima, em cima | entravam 1,7 cm | 0,2 cm fora do encosto |
| cotovelo em cima | 12° | 17,8° |

**Conferência nova:** `desenvolvimento-maquina-pele-nos-estofados`. Depois: passa (braços 2,1 cm; coxas 1,9; bacia 1,2; cintura 1,2; tronco 1).

**Conferência automática:** 0 falha, 2 avisos (os de antes). O preparo não muda. Quadros refeitos (só o erro do arco muda).

**O que ainda não ficou bom:** em cima, no erro, o alto das costas fica 0,2 cm fora do encosto (para os ombros não entrarem mais que na técnica) e o cotovelo para em 17,8°, e não em 12°: o ângulo final dos braços da máquina no erro foi calculado sem o corpo vir para a frente. Os dois não aparecem no quadro.
