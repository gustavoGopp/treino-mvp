# Lote C2 · Voador: resumo (a peça, o voador e o voador invertido)

De 18/11/2026. A peça nova do voador (peck deck) e as duas primeiras animações dos exercícios nela (antes, só cartão de texto). Nenhuma está aprovada nem ligada às telas: quem integra registra em `aprovados.ts` e no catálogo do guia.

## A peça: o voador

`src/engine/novo/pecas-de-cena/voador.ts`, medidas em `src/engine/novo/dados/objetos/voador.json`, folha em `docs/revisoes/animacoes-restantes/pecas/folha-voador.png` (`node scripts/animacao-nova/folha-pecas.mjs voador`: o cartão de hoje ao lado, no tamanho do cartão e ampliado, a máquina nas duas regulagens, de lado, os braços abrindo e fechando de frente e de cima e a pilha subindo, e as medidas). Uma máquina só faz os dois exercícios, como a Life Fitness SS-FLY e a Precor RSL0505: o mesmo estofado é o encosto das costas no voador e o apoio do peito no invertido.

**Medidas com fonte (páginas públicas, lidas em 18/11/2026):**

- Life Fitness, manual público da linha Insignia (`kb.cybexintl.com/.../Life_Fitness_Insignia_Series_Owners_Manual_9481201_Rev_BE.pdf`, p. 28, Pectoral Fly / Rear Deltoid SS-FLY): **203 × 197 × 203 cm**; no voador, o assento na altura em que **o cotovelo fica um pouco abaixo do ombro**, as mãos nos pegadores verticais; no invertido, sentado virado para o encosto, **os braços paralelos ao chão**, as mãos nos pegadores horizontais; os braços giram **em volta do ombro** ("out and about the shoulder"), e os desenhos de cima põem os eixos sobre os ombros.
- Precor RSL0505 Rear Delt / Pec Fly (`precor.com/en-US/products/RSL0505`): 142 × 97 × 213 cm, **torre de 148 cm**, **estofados de 6,5 cm**, a posição inicial de cada braço regulável em **120°** (13 posições).
- Movement Next Pec Fly / Rear Delt (apresentação Next Selectorized 2025, p. 17): 158,3 × 135,2 × **199,1 cm** (a altura usada), os braços articulados, os pegadores ao lado dos braços, os pinos da posição inicial.
- Hammer Strength HS-FLY (catálogo 2024, p. 59): 125 × 143 × 181 cm.
- Hoist, patente US 8.162.807 B1 (col. 16 e 17): o encosto que muda de lugar para virar apoio do peito no deltoide de trás. É uma máquina de cabos, outra mecânica: daqui só sai a ideia do encosto que anda.

**O que sai do corpo (tipo `derivada`), porque nenhuma ficha dá:** cada eixo fica **sobre o centro do ombro** (17,8 cm do meio); o braço da máquina desce a 62,25 cm do eixo e o pegador vertical fica 10 cm ao lado dele (a mão a 63 cm do eixo: o alcance do braço com o cotovelo a ~20°); o pegador horizontal 0,45 cm por fora; o assento a **46 cm** (voador: cotovelo 3,7 cm abaixo do ombro) e a **53 cm** (invertido: braços paralelos ao chão); o encosto com a borda de baixo a 89 cm (acima das coxas no invertido) e, na guia, 1,2 cm atrás do eixo (voador: as costas encostam) ou **15,4 cm** atrás (invertido: o peito encosta com o ombro sob o eixo).

**De desenho (sem ficha, em amarelo na folha):** a altura dos eixos (180 cm) e do braço que sai deles (176 cm), o pegador vertical a 101 cm, o horizontal 12 cm acima, os comprimentos dos pegadores, o encosto (10° deitado, 32 × 24 cm: a Precor só diz "slightly inclined" e o revendedor, "long, narrow pad"), o assento (36 × 36 cm), a coluna 52 cm atrás dos eixos, a torre (34 × 32 cm, atrás da coluna, à esquerda de quem senta no voador), a pilha e o came de 10 cm de raio.

**A máquina funciona:** cada braço gira num eixo vertical no alto; o came no alto de cada eixo enrola o cabo, que corre pela viga até a torre; as placas do pino sobem o arco do came (a média dos dois braços): até 18,7 cm no voador e 15,2 cm no invertido. As posições iniciais desenhadas (104° e 170° do braço da máquina) ficam a 66° uma da outra, dentro da faixa de 120° da Precor. O encosto anda 14,2 cm na guia e o assento sobe 7 cm entre as duas regulagens.

**O que não fecha com as fichas:** 143 cm de comprimento (Precor 142, Movement 158, Life Fitness 203) e ~162 cm de uma ponta à outra com os braços abertos (Life Fitness 197). O cartão de hoje tem o encosto alto e almofadas para os antebraços; a peça nova tem os pegadores da ficha da técnica e do manual da Life Fitness, e o encosto curto (ver "O que não ficou bom").

**Voador × polia dupla a 96 px:** não se confundem (o voador tem o assento, o encosto e os braços presos aos eixos; a polia dupla, duas torres altas sem assento). O cartão do app (`public/equipamento/voador.svg`) não foi mexido.

## As animações

| | Voador (`voador`) | Voador invertido (`voador-invertido`) |
|---|---|---|
| Conferência automática | 0 falha, 1 aviso (linhas de desenho) | 0 falha, 1 aviso (linhas de desenho) |
| Vistas | de cima e de frente | de trás e de cima |
| Movimento | as mãos de −12° (fechadas, a 2,1 cm uma da outra) a 84,8° (5,2° antes da linha dos ombros); o cotovelo de 20,1° a 22,4°; o ombro a 0,3 cm do eixo | os braços de 11,9° (à frente) a 90° (na linha do corpo), paralelos ao chão; o cotovelo de 19,5° a 21,8°; o ombro a 0,2 cm do eixo |
| Erros desenhados | abrir demais; tirar as costas; dobrar e esticar os cotovelos | encolher os ombros; embalar o tronco; abrir pouco |
| Erros não desenhados | nenhum | nenhum |
| Conferência escrita | `voador.md` | `voador-invertido.md` |
| Quadros grandes | `../quadros/voador.png` | `../quadros/voador-invertido.png` |
| Risco de o Gustavo não gostar | médio | médio |

## Mudanças em arquivos comuns

Nenhuma no núcleo, nas peças comuns ou nos exercícios aprovados. Arquivos novos: a peça e o objeto (`pecas-de-cena/voador.ts`, `dados/objetos/voador.json`), o núcleo (`exercicios/no-voador.ts`, com a calibração da bacia gravada pelo `preparo.mjs`), as regras (`regras/voador.ts`: `voador-eixo-no-ombro`, `voador-maos-nos-pegadores`, `voador-cotovelo-fixo`, `voador-cotovelo-abaixo-do-ombro`, `voador-costas-no-encosto`, `voador-abre-ate-a-linha-do-ombro`, `voador-fecha-a-frente-do-peito`, `voador-placas-sem-descansar`, `voador-invertido-cotovelos-levemente-dobrados`, `voador-invertido-bracos-paralelos-ao-chao`, `voador-invertido-peito-no-encosto`, `voador-invertido-abre-ate-a-linha-do-corpo`), as fichas de movimento e os dois exercícios, mais uma linha em cada registro. O voador invertido usa também a regra aprovada `crucifixo-inverso-escapulas-sem-encolher-nem-juntar`. `scripts/animacao-nova/folha-pecas.mjs` ganhou a seção `voador`, sem mudar as outras. As opções `viesNaVista` e `vies.cabeca` já existiam.

## Pontos para quem integra

- O teste da ponte que falha ("todas as animações estão aprovadas e no catálogo") é o esperado; os outros 7 passam.
- Nenhum erro ficou fora da ficha: nada a pôr em `SEM_DESENHO`.
- Os músculos: peito (principal) e frente do ombro (secundário) no voador; só o ombro de trás no invertido, como a biblioteca (a ficha da técnica cita o meio do trapézio como secundário; a biblioteca não, pelo achado 5 da anatomia).
- O `dados/preparo/registro.ts` é o gerado pelo `preparo.mjs`; ele só gravou os dois arquivos novos e as duas linhas do registro.

## O que não ficou bom (nas duas)

- **O corpo ocupa pouco mais da metade da altura do quadro de frente e de trás**: a viga dos eixos fica a 199 cm (a Movement). Cortá-la tiraria os eixos sobre os ombros, que explicam a máquina.
- **O encosto é curto (32 cm, de 89 a ~120 cm do chão)**: alto, ele bateria no queixo de quem senta virado para ele; baixo, nas coxas. No voador, a lombar fica sem apoio.
- **O encosto anda 14,2 cm na guia entre os dois exercícios.** Sem isso, o ombro não fica sob o eixo nos dois (as costas ficam a ~3 cm do centro do ombro; o peito, a ~13 cm), e a mão presa no pegador faria o cotovelo dobrar e esticar. As fichas comerciais lidas não dizem como resolvem isso (os braços "articulados" da Movement e da Precor talvez sejam a resposta); a única fonte de um encosto que muda de lugar é uma patente de outra máquina. **É o ponto mais discutível da peça.**
- **De cima, a viga, os eixos e os braços da máquina acima dos pegadores são cortados** (cobririam a cabeça e os braços), e de frente (voador, mãos fechadas) os braços da máquina somem atrás da cabeça: dois cortes de ilustração.
- **No invertido, o tronco fica inclinado 12° e o peito encosta na metade de baixo do encosto.**
