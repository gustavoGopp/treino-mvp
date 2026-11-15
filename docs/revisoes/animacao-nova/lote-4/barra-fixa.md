# Lote 4 · Barra fixa, pegada pronada (`barra-fixa`)

De 15/11/2026. Primeiro corpo pendurado pelas mãos no motor novo: núcleo `exercicios/pendurado.ts` (comum à barra supinada e às elevações de joelhos) e `exercicios/barra-fixa-base.ts` (comum às duas pegadas). Ainda não está ligado às telas do app.

- Ficha da técnica: `docs/pesquisa/animacoes/barra-fixa.md`. Cartão: `src/conteudo/exercicios/barra-fixa.json`.
- Ficha de movimento: `src/engine/novo/dados/movimentos/barra-fixa.json`.
- Animação: `src/engine/novo/exercicios/barra-fixa.ts`. Regras: `src/engine/novo/regras/pendurado.ts`.
- Peça de cena nova: `src/engine/novo/pecas-de-cena/barra-fixa.ts`, medidas em `src/engine/novo/dados/objetos/barra-fixa.json`.
- Folha: `../prototipos/folha-barra-fixa.png`. Quadros grandes: `../quadros/barra-fixa.png`.

## Como a geometria foi montada

1. **As mãos são o único apoio.** O centro de cada pegada fica no eixo da barra, parado, com a mão fechada no diâmetro dela (3,2 cm). O resto do corpo pende das mãos: escolhe-se a forma do corpo (coluna, pernas, escápula) e a posição sai de duas condições físicas: (a) o braço alcança a barra com a dobra de cotovelo pedida; (b) parado, sem balanço, o centro de massa fica na vertical das mãos. A condição (b) é o que leva os pés um pouco à frente quando o tronco vai para trás no topo.
2. **A subida anda pela dobra do cotovelo**, de 8° (braço estendido) até a dobra do topo, que é a do corpo com o queixo 3 cm acima do alto da barra. Subir pela altura dava um tranco no cotovelo no começo da puxada (perto do braço estendido, 1 cm de altura gira muito o cotovelo; ritmo de 24,7%); pela dobra, 15,5%.
3. **Uma fase só de subida** (para a conferência e os quadros f0–f1 verem as duas partes): as escápulas descem nos primeiros 30% (o ombro se afasta da orelha e o corpo sobe com o braço ainda estendido); os braços começam a puxar a 24%; o tronco vai para trás e a cabeça recua até 65% da subida, antes de o rosto chegar à altura da barra (sem isso, a cabeça atravessava a barra em 0,5 cm).
4. **Barra a 228,6 cm** (a regulagem mais alta da torre de referência): pendurado com os joelhos a 24°, o ponto mais baixo do corpo fica a 13,3 cm do chão.

## A pegada (correção antiga)

`correcoes-ja-feitas.md` registra que a animação de hoje põe as mãos a 68 cm (1,8× os ombros), fora do 1 a 1,5× da pesquisa (`docs/pesquisa/08-tecnica-guia.md`, conclusão 2). A nova segue a pesquisa e o "cerca de 1,5×" do app: **61,2 cm de centro a centro das mãos = 1,5 × 40,8 cm** (a largura entre os acrômios da tabela do corpo). Medido em todos os quadros.

## O que a fonte pede × o que o boneco faz (medido) × confere?

| O que a ficha da técnica (e o cartão) pede | Selo | O que o boneco faz (medido) | Confere? |
|---|---|---|---|
| Mãos a 1 a 1,5 vez a largura dos ombros, palmas para a frente | moderada (pesquisa) / consenso | 61,2 cm de centro a centro (1,5×); o polegar aponta no mínimo 90% para dentro; o antebraço fica de 12° a 40° de pronação além do neutro | sim |
| A mão segura a barra | consenso | o centro da pegada fica a 0 cm do eixo da barra o ciclo inteiro, com a mão fechada no diâmetro dela | sim |
| Comece pendurado, com os braços estendidos | consenso | o cotovelo dobra 8° embaixo | sim |
| Os ombros sobem naturalmente, mas sem despencar | consenso | do alto do ombro à base do crânio, ao longo do tronco: 16,1 cm pendurado (em pé, parado: 18,7 cm) | sim |
| Primeiro abaixe as escápulas: os ombros se afastam das orelhas e o corpo sobe alguns centímetros | consenso | quando o cotovelo começa a dobrar (10° além do de baixo), o ombro já se afastou 2,6 cm da orelha e o corpo já subiu 4 cm | sim |
| Puxe os cotovelos para baixo e para os lados das costelas | consenso | no topo, o cotovelo fica 19,4 cm abaixo do ombro, 40 cm do meio do corpo e 9,4 cm à frente da linha da coluna (dentro do fundo do peito, 22,6 cm); o braço a 50,4° da linha do tronco | sim |
| Topo: queixo acima da barra, peito perto dela, tronco levemente inclinado para trás | consenso | o queixo 3 cm acima do alto da barra; o peito a 6 cm dela; o tronco inclinado para trás (bacia −6°, torácica −10°, lombar −4°) | sim |
| Ombros longe das orelhas no topo | consenso | 20,4 cm do alto do ombro à base do crânio (mais que em pé, 18,7) | sim |
| Pernas juntas, joelhos levemente dobrados, pés um pouco à frente | consenso | joelho a 24° (32° no topo), quadril a 12° (26° no topo), cada coxa 3° para o meio | sim |
| Abdômen firme para o corpo não balançar | consenso | o centro de massa fica a 0 cm da vertical das mãos em todos os quadros | sim |
| O corpo não atravessa a barra | (desenho) | fora as mãos, a pele fica a no mínimo 1,8 cm da superfície da barra (a cabeça, passando por trás dela) | sim |
| ~1–1,5 s subindo, pausa curta, ~2–3 s descendo | consenso | 1,5 s / 0,5 s / 2,6 s, com 0,5 s pendurado | sim |

Amplitudes, todas dentro da média: cotovelo até 135,2°, elevação do braço até 163,9°, pronação até 39,6° além do neutro.

Conferência automática: **0 falha, 4 avisos.** (1) Ritmo: 15,5% da velocidade de pico no cotovelo no começo da puxada (limite do "ok": 15%; tranco só acima de 25%): é o braço saindo do quase estendido. (2) Linhas de escolha de desenho (escápula, inclinação do tronco no topo, tempo dentro da subida, para onde aponta o cotovelo, ponta do pé). (3) Músculos: o trapézio médio e inferior aparece como secundário dentro de "costas", que o conteúdo conta como principal; o antebraço aparece como "só ajuda" (como na animação aprovada de hoje). (4) Vista dos músculos: a padrão é a de trás (532 cm² do principal); de lado, 176 cm², e a vista de lado sai do modo Músculos.

## Erros

| Erro (texto do app) | Vista | O que o boneco faz (medido) |
|---|---|---|
| Balanço (kipping) | de lado | no meio da subida o quadril dobra 70° e o joelho 85° (o chute), no começo a lombar arqueia 14°, e o centro de massa sai 10 cm à frente da vertical da barra; volta ao prumo antes de a cabeça chegar à barra (a cabeça não a atravessa: no mínimo 2,3 cm) |
| Meia repetição embaixo | de trás | embaixo, o cotovelo fica a 75° (em vez de 8°) e o corpo 14,2 cm mais alto |
| Ombros encolhidos no topo | de trás | no topo, a clavícula fica a 24,5° de elevação (no certo, 4,4°), o pescoço estica 24° e o queixo só chega ao alto da barra, com o corpo 6,5 cm mais baixo |

## O equipamento

Peça nova: a estação de barra fixa (torre). O texto do app fala em "barra no topo da estação"; o cartão de hoje (`scripts/desenhos-equipamento/realista/itens.mjs`, `barra_fixa`) é uma barra de batente de porta, a 192 cm, baixa demais para o corpo pender com os joelhos só um pouco dobrados. Medidas (todas em `dados/objetos/barra-fixa.json`, com o trecho lido):

- altura do centro da barra: **228,6 cm** (90 pol, a regulagem mais alta; ProsourceFit Power Tower);
- diâmetro da barra: **3,2 cm** (1,25 pol, o padrão das barras de puxar; Rogue Monster Crown);
- largura da torre: 104,1 cm e fundo da base: 99,1 cm (ProsourceFit); tubo de 5,1 × 7 cm (Titan, de outro modelo de torre);
- de desenho: a barra 32 cm à frente dos montantes e o trecho emborrachado de 18 cm debaixo de cada mão.

Duas peças: a barra (o equipamento, que entra no enquadramento, com o trecho debaixo da mão pintado atrás dela, para a mão fechar por cima) e a estrutura (cenário: pintada atrás do corpo, fora do enquadramento; de perfil não aparece, porque o braço da torre cai bem onde a cabeça passa no topo, como a coluna de polia que é cenário).

## Correções já feitas que esta animação respeita

- Pegada de 1,8× os ombros fora da pesquisa (04/11, nota sem correção): agora 1,5×.
- Ombro posterior em laranja (decisão de 06/11): sim; costas em vermelho (dorsal), meio das costas e bíceps em laranja, antebraço listrado ("só ajuda", como em `SO_AJUDA` de hoje).

## O que não ficou bom

- **De lado, no topo, o braço de perto cobre parte do rosto** e a cabeça, inclinada para trás para passar da barra, parece grande no perfil. É a geometria do topo (a mão está na frente do queixo); a vista de trás é a padrão e mostra o topo sem isso.
- **O corpo ocupa cerca de 75% da altura do quadro** (menos que o búlgaro aprovado): o boneco pendurado, com os braços para cima, tem 230 cm do pé à mão e ainda sobe 54 cm; o quadro precisa conter os dois. A estrutura já não entra no enquadramento.
- Ritmo de 15,5% (aviso, logo acima dos 15%): o cotovelo saindo do quase estendido. Tentei subir pela altura (24,7%) e pela dobra do cotovelo (15,5%); fiquei com a dobra.
