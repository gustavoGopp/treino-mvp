# Lote C3 · grupo "braços": a máquina de rosca e a máquina de tríceps

De 18/11/2026, sobre o commit `5a96e30`. Duas peças novas (uma função comum com um modelo para cada, como a cadeira flexora e a extensora) e duas animações. Nenhuma está aprovada nem ligada às telas.

| Exercício | Conferência | Erros desenhados | Risco |
|---|---|---|---|
| `rosca-maquina` | 0 falhas, 2 avisos (linhas de desenho; o antebraço "só ajuda", como nas outras roscas) | Tirar o braço do apoio; Descer pouco | médio |
| `triceps-maquina` | 0 falhas, 1 aviso (linhas de desenho) | Tirar o braço da almofada; Amplitude curta em cima | médio |

Nenhum erro do cartão ficou sem desenho (os quatro têm consequência visível na pose).

## As peças

- `pecas-de-cena/rosca-maquina.ts`: a função comum `maquinaDeBraco(m, modelo, opções)` e o modelo `ROSCA_NA_MAQUINA`. O assento num pé só que sobe e desce (a regulagem), o apoio dos braços inclinado à frente do peito, a alavanca que gira num eixo na linha dos cotovelos (o came de um lado só, à esquerda de quem senta, como no cartão), o pegador na ponta (a barra reta atravessada com duas borrachas), o cabo e a pilha que sobe o arco do came, a torre ao lado e atrás do assento. Opção (desligada por padrão): `apoioAParte`, o apoio dos braços numa peça própria para entrar na ordem de profundidade com o corpo, enquanto o resto é cenário.
- `pecas-de-cena/triceps-maquina.ts`: o modelo `TRICEPS_NA_MAQUINA` (os dois pegadores em pé numa barra atravessada, a pegada neutra; o apoio da lombar que sobe e desce com o assento; a pilha sobe quando a alavanca desce).
- As medidas: `dados/objetos/rosca-maquina.json` e `triceps-maquina.json`.

### Medidas com fonte

| Medida | Rosca | Tríceps | Fonte |
|---|---|---|---|
| Comprimento × largura × altura da torre | 122 × 110 × 148 cm | 122 × 110 × 148 cm | Precor RSL0204 e RSL0208 (páginas públicas e ficha em PDF, lidas em 18/11); ao lado, LF SS-BC 122 × 160 × 148 e HS-BC 115 × 105 × 140; LF SS-TP 135 × 111 × 148, HS-TE 115 × 112 × 140, MV-NEXT 125,6 × 108,4 × 146, TG MK45 108 × 144 × 138 (pesquisa/04-objetos.md, 13.1) |
| Espessura dos estofados | 6,5 cm | 6,5 cm | Precor ("Total thickness is 2.5 inches (65 mm)") |
| O ajuste: o cotovelo no eixo, o braço deitado no apoio, o assento que regula | — | — | manual público da Hammer Strength Select (HS-BC p. 24, HS-TE p. 60; kb.cybexintl.com) e Precor |

### O que é de desenho (sem medida de fabricante), com o motivo na tabela

O ângulo do apoio dos braços (40°: mais deitado, o antebraço da rosca passava da vertical em cima; mais em pé, a ponta de baixo do apoio entrava na barriga), o comprimento dele (26 cm, do cotovelo à axila), a largura (56 cm) e **o vão do meio (28 cm)**; o eixo (84 cm do chão, 14 cm à frente do assento, 4 cm acima da face do apoio e 2 cm além da borda de baixo: o cotovelo do corpo da tabela); o curso do assento (40 a 62 cm); o came (22 cm, o das cadeiras); a alavanca, a barra, as borrachas, os pegadores em pé; a pilha desenhada; o apoio da lombar do tríceps (encosta na bacia do corpo da tabela). Nenhuma medida ficou provisória.

### O apoio partido no meio (a mudança que mais pesa)

O cartão de hoje tem o apoio inteiro. Com ele, o peito do corpo da tabela entrava 2,5 a 3 cm no estofado em todas as inclinações do tronco testadas (de 4° a 45°, medido): o braço deitado no apoio começa no ombro, e o peito do Boneco fica ~12 a 16 cm à frente do centro do ombro. Encurtar o apoio até o peito não bater deixava só 10 cm de apoio (um terço do braço), o contrário de "back of arms rest fully on arm pad". Com o apoio partido (uma metade para cada braço, 14 cm de largura cada, um vão de 28 cm), o braço deita inteiro no apoio, a axila chega ao alto dele e o peito fica a 0,6 cm, sem entrar. A Precor diz que o apoio "gives optimal support without restricting proper breathing"; não há medida de vão em ficha nenhuma.

### O cartão de hoje do tríceps é outra máquina

`public/equipamento/triceps_maquina.svg` desenha a máquina de mergulho sentado (os pegadores em pé ao lado do quadril, presos em braços que vêm de trás), como a Life Fitness SS-TP ("Triceps Press"). A ficha da técnica do app (`docs/pesquisa/animacoes/triceps-maquina.md`) é a do braço apoiado à frente (Hammer Strength HS-TE, Precor RSL0208, Technogym Arm Extension) e a peça nova segue a ficha. **Pedido para quem integra:** decidir se o cartão muda para a máquina de braço apoiado (e se o app precisa de um segundo equipamento para a de mergulho). Não mexi no cartão.

## O núcleo e as regras

- `exercicios/maquina-de-braco.ts` (novo): sentado, os braços deitados no apoio com o cotovelo no eixo, as mãos presas no pegador. Calcula uma vez por corpo (`calibragens.ts`) o quanto o ombro sobe da face do apoio (o tríceps amassa 1 cm), a bacia, a altura do assento, os pés e a distância do eixo à mão. Nos erros, com o braço fora do apoio, a mão continua no arco do pegador: o cotovelo dobra o que for preciso (rosca, com o tronco 16° para trás) ou o tronco se inclina o que for preciso (tríceps).
- `regras/maquinas-de-braco.ts` (novo): o cotovelo no eixo, o braço no apoio (e o peito sem atravessá-lo), sentado, o pegador no arco, a barra longe do rosto, e as pontas de cada exercício. Reaproveita, sem mudar: `cadeira-pilha-sobe-com-a-alavanca` (cadeiras), `maquina-maos-nos-pegadores` (máquinas de empurrar), `braco-estendido-embaixo-na-rosca`, `palma-para-a-frente-na-rosca`, `palmas-uma-para-a-outra-na-rosca` (roscas), `rosca-scott-sem-travar-embaixo` (Scott), `tronco-quase-parado` e `lombar-neutra` (comuns).

## Mudança em arquivo comum

- `scripts/animacao-nova/folha-pecas.mjs`: só acréscimo (as duas folhas novas e as duas linhas de exportação).
- Os três registros: uma linha cada por arquivo novo.
- Nenhuma mudança em núcleo, peça aprovada, `aprovados.ts`, catálogo, `src/domain/`, `src/conteudo/` ou `tests/`. O preparo regravou só os dois arquivos novos (e o `registro.ts` dele); o das aprovadas não mudou.

## O que não ficou bom

- De lado, na rosca, a alavanca e a barra quase não aparecem: a alavanca corre atrás do antebraço, na linha dele, e a barra é vista de ponta, na mão. De três quartos aparecem.
- O apoio partido e a torre ao lado mudam o desenho do cartão de hoje (explicado na folha).
- No erro "tirar o braço", o tronco se mexe (para trás), o que os cartões não dizem; com a mão presa no pegador, é a única geometria que deixa o cotovelo sair do apoio (medido em cada conferência escrita).
- O cartão de hoje do tríceps é outra máquina (acima).

Risco: **médio** nas duas.
