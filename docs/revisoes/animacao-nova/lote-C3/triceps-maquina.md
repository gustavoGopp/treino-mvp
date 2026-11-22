# Lote C3 · Tríceps na máquina (`triceps-maquina`)

De 18/11/2026. Primeira animação deste exercício (até aqui ele só aparecia como cartão de texto). Sentado na máquina de tríceps, a bacia no apoio da lombar, o tronco um pouco à frente com as costas retas; os dois braços deitados no apoio inclinado, os cotovelos no eixo da máquina, as mãos nos pegadores em pé (a pegada neutra). Do cotovelo dobrado a 100°, os antebraços estendem juntos até quase travar e voltam. **Ainda não aprovada nem ligada às telas** (quem integra registra em `aprovados.ts` e no catálogo do guia).

- Ficha da técnica: `docs/pesquisa/animacoes/triceps-maquina.md` (o braço apoiado à frente). Cartão do app: `src/conteudo/exercicios/triceps-maquina.json` (só leitura).
- Ficha de movimento: `src/engine/novo/dados/movimentos/triceps-maquina.json`.
- Animação: `src/engine/novo/exercicios/triceps-maquina.ts`, sobre o núcleo das máquinas de braço (`exercicios/maquina-de-braco.ts`, o mesmo da rosca na máquina). Regras medidas: `src/engine/novo/regras/maquinas-de-braco.ts`.
- A peça: `src/engine/novo/pecas-de-cena/triceps-maquina.ts` (o modelo `TRICEPS_NA_MAQUINA` da função comum `maquinaDeBraco`, de `rosca-maquina.ts`), medidas em `src/engine/novo/dados/objetos/triceps-maquina.json`; folha em `docs/revisoes/animacoes-restantes/pecas/folha-triceps-maquina.png`.
- Quadros grandes: `../quadros/triceps-maquina.png`. **Sem folha** ao lado da animação de hoje: este exercício não tinha animação.

## Onde os números saem

A ficha da técnica dá a técnica em palavras: o cotovelo no eixo, os braços apoiados, "estende os cotovelos até quase travar; volta até o cotovelo dobrar ~90° ou mais". O manual público da Hammer Strength (HS-TE) dá o ajuste ("backs of arms rest fully on arm pad, aligning the elbows with the machines pivot", "hips in contact with the lower back pad, leaning forward and keeping the back straight"). O resto saiu da rosca na máquina (a mesma máquina e o mesmo núcleo) e das máquinas sentadas aprovadas, com selo `desenho`. O que é calculado, uma vez por corpo: o braço no apoio (o tríceps amassa 1 cm), a bacia, a altura do assento, os pés e a distância do eixo à mão, como na rosca.

## O que a fonte pede × o que o boneco faz (medido) × confere?

| O que a ficha da técnica (e o cartão) pede | Selo | O que o boneco faz (medido) | Confere? |
|---|---|---|---|
| Assento na altura em que o cotovelo fica alinhado com o eixo | consenso | o assento sobe até 47 cm do chão; o centro dos dois cotovelos fica a 0 cm do eixo no ciclo inteiro | sim |
| Braços apoiados na almofada | consenso | o ponto mais fundo do tríceps amassa o estofado 1 cm, nos dois braços, do começo ao fim; o peito fica a 0,6 cm do alto do apoio | sim |
| "Hips in contact with the lower back pad" (manual) | consenso | a bacia e a lombar afundam 0,3 cm no apoio da lombar (limite: até 1,5 cm, sem descolar mais de 0,5 cm) | sim |
| "Leaning forward and keeping the back straight" (manual) | consenso | a bacia inclina 15° à frente; a lombar fica 3° menos curva que em pé (limite 5°) | sim |
| Sentado | consenso | o glúteo afunda 1 cm no assento, a bacia 21,9 cm atrás da borda da frente; não se mexe (0 cm) | sim |
| As mãos presas nos pegadores o tempo todo (pedido do lote) | consenso | as mãos ficam a 0 cm do centro dos pegadores em pé; eles andam num arco de 33,7 cm em volta do eixo, e as mãos com eles | sim |
| Início: cotovelo dobrado ~90° ou mais | consenso | 100° | sim |
| Estende os cotovelos até quase travar | consenso | 1 s; no fim, o cotovelo ainda dobra 8° | sim |
| Volta controlada | consenso | 2,4 s, pelo mesmo caminho; o ciclo emenda (0 cm); salto de 5,3% da velocidade de pico (limite 25%) | sim |
| A pegada neutra (pegadores em pé) | desenho | o polegar a 0° da posição neutra, sem girar | sim |
| A máquina funciona | desenho | a alavanca gira de 148° a 56°; as placas sobem de 0 a 17,7 cm no arco do came, quando a alavanca desce, e apoiam no começo | sim |
| Os pegadores não batem no rosto | desenho | a linha entre as duas mãos passa a no mínimo 17,9 cm da pele | sim |

Conferência automática (`node scripts/animacao-nova/conferir.mjs triceps-maquina`): **0 falhas, 1 aviso** (as linhas de desenho da ficha de movimento: assento.amassa, apoio.amassa, lombar.sentado, cervical, cabeca, pes.meiaDistancia, joelho, escapula.prot, escapula.elev, maos.supinacao, placas). O corpo entra no máximo 1 cm num estofado.

## Os erros

| Erro do cartão (na ordem) | O que o quadro mostra | Medido |
|---|---|---|
| Tirar o braço da almofada | no fim da extensão, o braço gira 20° no ombro para fora da face; com a mão presa no pegador, o tronco recua o que for preciso (calculado: cerca de 6°) e o cotovelo sai do apoio e do eixo | no fim, o cotovelo fica 10,5 cm acima do eixo; o braço fica fora do estofado (só a pele junto da axila encosta na ponta de cima); a alavanca para em 94° em vez de 56° |
| Amplitude curta em cima | a extensão para com o cotovelo dobrado 45° | o antebraço para 37° antes do certo |

Por que o tronco se mexe no erro: com a mão presa no pegador, que só anda no arco dele, o cotovelo não sai do apoio com o tronco parado (medido: não há ângulo do cotovelo, de 0° a 170°, que deixe a mão no arco com o braço girado 20°). O tronco inclinar à frente (14°, a primeira tentativa) também não fecha a conta; recuar um pouco fecha. É a forma geométrica de "o braço sai do apoio" com a mão no pegador.

## O equipamento

A máquina de tríceps é nova, a irmã da máquina de rosca (a mesma estrutura, o mesmo apoio partido, o came no eixo dos cotovelos, a torre ao lado), com os pegadores em pé numa barra atravessada, o apoio da lombar que sobe e desce com o assento e a pilha que sobe quando a alavanca desce. **O cartão de hoje (`triceps_maquina`) é outra máquina**: a de mergulho sentado, com os pegadores ao lado do quadril (como a Life Fitness SS-TP, "Triceps Press"). A ficha da técnica do app é a do braço apoiado à frente (Hammer Strength HS-TE, Precor RSL0208), e a peça segue a ficha. Quem integra decide se o cartão muda (fica no resumo).

## Vistas

`lateral` (a que o app abre: o cotovelo no eixo, os pegadores em pé e o antebraço que estende se leem de relance; de lado, a alavanca aparece, porque os pegadores ficam fora da linha do antebraço) e `quina` (de três quartos pela frente: os dois pegadores, a barra e a alavanca). O modo Músculos abre de lado (o tríceps na parte de trás do braço, sobre o apoio).

## O que não ficou bom

- **O cartão de hoje não é desta máquina** (ver acima): na tela de marcar o equipamento, quem tem a máquina de mergulho sentado vai ver no guia a de braço apoiado à frente.
- **O erro "tirar o braço" mexe o tronco para trás**, o que o cartão não diz ("O braço sai do apoio"). É o que a geometria deixa com a mão presa no pegador; está medido acima.
- A Hammer Strength põe os pés sob uma barra; aqui os pés ficam no chão (a Precor, que dá o tamanho, não tem a barra).

Risco de o Gustavo não gostar: **médio** — o exercício se lê bem e a máquina funciona, mas a peça não é a do cartão de hoje (que é outra máquina), e o erro mexe o tronco.
