# Lote C3 · Hiperextensão no banco romano (`hiperextensao`)

De 18/11/2026. Primeira animação deste exercício (até aqui ele só aparecia como cartão de texto). De bruços no banco romano a 45°: as solas na chapa, os rolos atrás dos tornozelos, a frente das coxas nas almofadas e as mãos cruzadas no peito. O tronco desce dobrando o quadril, com a coluna neutra, e sobe até a linha reta. **Ainda não aprovada nem ligada às telas** (quem integra registra em `aprovados.ts` e no catálogo do guia).

- Ficha da técnica: `docs/pesquisa/animacoes/hiperextensao.md`. Cartão do app: `src/conteudo/exercicios/hiperextensao.json` (só leitura). Nenhuma correção anterior em `correcoes-ja-feitas.md`.
- Ficha de movimento: `src/engine/novo/dados/movimentos/hiperextensao.json`.
- Animação: `src/engine/novo/exercicios/hiperextensao.ts` (as mãos cruzadas vêm do núcleo dos abdominais aprovado, `exercicios/abdominal.ts`, sem mudança). Regras medidas novas: `src/engine/novo/regras/banco-romano.ts`.
- Peça nova: o banco romano a 45° (`pecas-de-cena/banco-romano.ts`, `dados/objetos/banco-romano.json`, folha `docs/revisoes/animacoes-restantes/pecas/folha-banco-romano.png`).
- Quadros grandes: `../quadros/hiperextensao.png`. Sem folha ao lado da animação de hoje (não havia animação).

## Onde os números saem

A ficha da técnica dá a técnica em palavras (consenso, NSCA não verificado; Lawrence 2019 para mostrar a flexão no quadril com a coluna neutra) e nenhum número. As distâncias de desenho vêm das animações aprovadas parecidas (as mãos cruzadas do abdominal no chão; o pescoço na linha do tronco do stiff) e do banco (o ângulo de 45° e a faixa de regulagem da Body-Solid GHYP345).

**O corpo se encaixa no banco por medida, não a olho:** a pele mais baixa dos pés fica na face da chapa; a frente das coxas amassa 1 cm as almofadas; o eixo dos rolos fica 7 cm acima do centro do tornozelo, com a pele de trás da perna encostando neles. O centro do quadril e as pernas ficam parados; a bacia e o tronco giram juntos em volta do quadril. A conta fica guardada (`calibragem`, chave `hiperextensao:parado`).

## O que a fonte pede × o que o boneco faz (medido) × confere?

| O que a ficha da técnica (e o cartão) pede | Selo | O que o boneco faz (medido) | Confere? |
|---|---|---|---|
| Almofada no alto da coxa, abaixo do osso do quadril, para o quadril dobrar livre | consenso | o alto das almofadas fica 7 cm abaixo do centro do quadril (a crista do osso do quadril fica 15,9 cm acima dele); as coxas amassam 1 cm as almofadas em todos os quadros | sim, mas veja "O que não ficou bom" (a regulagem fica abaixo da faixa da Body-Solid) |
| Pés presos na trava | consenso | as solas na chapa (0 cm) em todo o ciclo; a pele atrás do tornozelo encosta nos rolos (amassa 0,6 cm); o tornozelo anda 0 cm | sim |
| Mãos no peito | consenso | cruzadas, presas ao tórax (os punhos andam 0 cm em relação a ele); a mão mais perto da cabeça fica a 16,2 cm dela | sim |
| Desce dobrando o quadril, coluna neutra, até um alongamento confortável atrás da coxa | consenso | embaixo, o quadril dobra 80° com a perna estendida (o tronco fica 77° da linha das pernas, 35° abaixo da horizontal); a lombar fica na curva de repouso (0°) | sim (80° é escolha de desenho: a ficha não dá número) |
| Sobe até o corpo ficar em linha reta, sem passar da linha | consenso | em cima, o tronco fica 2,8° além da linha das pernas, medido da bacia à base do pescoço (é a curva de repouso da torácica; o quadril fica em 0°) | sim |
| Ritmo (o cartão não dá tempo) | desenho | descida de 2 s, subida de 1,2 s, pausas de 0,5 s em cima e 0,4 s embaixo; o ritmo não dá salto (4,3% da velocidade de pico) | sim |

Conferência automática (`node scripts/animacao-nova/conferir.mjs hiperextensao`): **0 falhas, 1 aviso** (as linhas de desenho da ficha de movimento, cada uma com o motivo). O corpo entra até 2,3 cm nas almofadas (embaixo, a barriga dobra sobre a borda de cima delas; tolerância 2,5 cm). O ponto mais baixo do corpo fica a 25 cm do chão.

## As vistas

`lateral` (a que o app abre) e `quina`. De lado, o arco do tronco em volta do quadril e a linha reta em cima se leem de relance, com as almofadas debaixo das coxas e a trava dos tornozelos. De três quartos aparecem as duas almofadas, a chapa e os dois rolos. O modo Músculos abre de lado: o glúteo e os posteriores aparecem.

## Erros

| Erro do cartão | O que o boneco faz | Vista |
|---|---|---|
| Arquear a lombar no topo | em cima, o quadril passa 15° da linha reta e a lombar arqueia 20° além da curva de repouso (a cabeça vai junto, 10° para trás) | lateral, em cima |
| Arredondar as costas | embaixo, o quadril dobra só 45° e as costas curvam (a lombar 30° e a torácica 25° além da curva de repouso) | lateral, embaixo |
| Embalar ("subir com impulso") | **não desenhado** | — |

"Embalar" é só ritmo: o cartão diz apenas "subir com impulso", sem consequência visível na pose além do que já é o erro 1 (passar da linha em cima). Pela seção 9 do guia, fica fora da ficha; quem integra põe a exceção em `SEM_DESENHO`.

## O equipamento

O banco romano é peça nova (folha: `folha-banco-romano.png`): a viga a 45°, o tamanho total (130 × 73 × 91 cm), as almofadas de 3 pol e a faixa da regulagem (89 a 112 cm, da chapa ao alto das almofadas) vêm da Body-Solid GHYP345; a viga de 75 mm, da Bench Fitness REVOLVE. De desenho, como no cartão de hoje: as duas almofadas lado a lado (uma por coxa), a chapa com as ranhuras, a haste com os dois rolos. As almofadas têm as bordas arredondadas (raio 3,5 cm), no desenho e na conferência (duas caixas em cruz). A viga termina debaixo das almofadas (com ela mais comprida, o tronco a atravessava na descida). As almofadas vão um pouco para trás na pintura (o corpo deita por cima delas).

## Mudança em arquivo comum

Nenhuma. O núcleo dos abdominais (`bracosCruzados`) e a regra `abdominal-maos-no-peito` são usados como estão.

## O que não ficou bom

- **A regulagem das almofadas fica 5,4 cm abaixo do mínimo da Body-Solid** (83,6 cm, contra 89). Com o corpo da tabela (o centro do quadril a 90,6 cm da sola), a almofada no mínimo da ficha ficaria só 1,6 cm abaixo do quadril, e embaixo a barriga entraria 3,6 cm nas almofadas (a tolerância é 2,5). Tentei 1,5, 5, 6 e 7 cm abaixo do quadril; 7 é o primeiro valor com folga. Na vida real a barriga amassa sobre a borda; o Boneco é rígido. A regra `hiperextensao-almofada-abaixo-do-quadril` mostra a faixa da Body-Solid no texto medido, mas não a cobra (está dito no código).
- O corpo fica médio no quadro de lado: a base de 130 cm e o tronco em cima (155 cm de altura na cabeça) entram no enquadramento.
- Os eretores da coluna (o secundário da ficha da técnica) não existem no desenho dos músculos: o modo Músculos mostra só o glúteo e os posteriores, como a biblioteca.

**Risco de o Gustavo não gostar: médio.** O movimento se lê bem e as medidas fecham, mas a regulagem fora da faixa da ficha e o corpo médio no quadro podem chamar atenção.
