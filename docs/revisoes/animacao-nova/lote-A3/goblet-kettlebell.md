# Lote A3 · Agachamento goblet com kettlebell (`goblet-kettlebell`)

De 17/11/2026. Primeira animação deste exercício (até aqui ele só aparecia como cartão de texto). Em pé, pés um pouco mais abertos que o quadril, o kettlebell de 12 kg junto ao peito, seguro pelas duas hastes da alça, base para baixo; desce entre os joelhos até o quadril passar abaixo da altura do joelho, com os cotovelos apontando para baixo, e sobe com os calcanhares no chão. **Ainda não aprovada nem ligada às telas** (quem integra registra em `aprovados.ts` e no catálogo do guia).

- Ficha da técnica: `docs/pesquisa/animacoes/goblet-kettlebell.md`. Cartão do app: `src/conteudo/exercicios/goblet-kettlebell.json` (só leitura).
- Ficha de movimento: `src/engine/novo/dados/movimentos/goblet-kettlebell.json`.
- Animação: `src/engine/novo/exercicios/goblet-kettlebell.ts`, sobre o núcleo comum dos agachamentos (`exercicios/agachar.ts`); a altura da pegada na alça vem de `alturaDaPegadaDoKettlebell` (já exportada em `dobrar-o-quadril.ts`). Nenhum arquivo comum mudou.
- Regras novas: `goblet-kettlebell-junto-ao-peito` e `goblet-kettlebell-cotovelos-entre-os-joelhos`, em `src/engine/novo/regras/goblet-kettlebell.ts`.
- Uma calibração guardada (`goblet-kettlebell:bola-no-peito`, no preparo): onde a bola fica para encostar na pele do peito.
- Quadros grandes: `../quadros/goblet-kettlebell.png`. **Sem folha** (o exercício não tinha animação).

## Onde os números saem

A ficha diz "igual ao goblet com halter aprovado", com outro objeto. Do goblet aprovado vêm a amplitude (joelho a 126°), os pés (19 cm do meio, pontas a 15°) e a inclinação do peito embaixo (27°, selo `desenho`). **A diferença do goblet aprovado é o que o cartão deste exercício pede: os calcanhares no chão** ("Sobe com o tronco ereto e os calcanhares no chão"; nada de anilha sob o calcanhar), como no agachamento com o peso do corpo aprovado. A pegada é a do afundo com kettlebell aprovado (a altura das mãos, 14 cm abaixo da base do pescoço, e a folga de 0,8 cm da bola ao peito), com duas diferenças:

1. **A bola fica a 0,8 cm da pele, medida na superfície do Boneco.** No afundo com kettlebell aprovado, a profundidade sai de uma conta pela profundidade do peito (`prof.peito × 0,68`); medida na pele do Boneco, a bola dele entra 2,9 cm no peito. Aqui a profundidade é calibrada pela pele (a mesma folga de 0,8 cm). **Não mexi no aprovado**; anoto para quem integra.
2. **O kettlebell acompanha o tronco** quando ele inclina (o eixo vai de 4° a 28° da vertical), como o halter do goblet aprovado: ele está apertado contra o peito, não pendurado; se ficasse na vertical, a bola se afastaria do peito embaixo. A base continua para baixo.

Os cotovelos apontam para baixo, sem abrir para os lados (no afundo com kettlebell abrem 0,25): é o que leva o cotovelo para dentro do joelho embaixo, como a ficha pede.

## O que a fonte pede × o que o boneco faz (medido) × confere?

| O que a ficha da técnica (e o cartão) pede | Selo | O que o boneco faz (medido) | Confere? |
|---|---|---|---|
| Kettlebell junto ao peito, mãos nas laterais da alça, base para baixo | consenso | da bola à pele do peito, 0,8 cm o tempo todo; cada mão no meio da sua haste (0 cm); a base para baixo, com o eixo de 4° a 28° da vertical (acompanha o tronco) | sim |
| Pés um pouco mais abertos que o quadril; tronco ereto | consenso | centro de cada pé a 19 cm do meio (meia largura do quadril: 16,2), pontas a 15°; o peito inclina 3° em pé e 28° embaixo, a lombar sem dobrar (0°) | sim |
| Desce entre os joelhos o mais fundo possível sem dor | moderada | 2,4 s; embaixo, o joelho dobra 126° e o centro do quadril fica 7,6 cm abaixo do centro do joelho; o joelho anda a 5,4° da direção do pé; a bola passa a no mínimo 3,2 cm das coxas | sim |
| Cotovelos apontando para baixo, entre os joelhos no fundo | consenso | o braço desce a no máximo 15,8° da vertical; embaixo, cada cotovelo fica 2,2 cm para dentro do joelho e a pele do braço a 0,8 cm da coxa | sim |
| Sobe com o tronco ereto e os calcanhares no chão | consenso | 1,3 s; o centro de massa (corpo + kettlebell) fica a no máximo 0,3 cm do meio do pé; os pés não saem do lugar (0 cm) | sim |
| Em cima: em pé, sem travar os joelhos | consenso | joelhos a 8°; o último quadro emenda no primeiro (0 cm) | sim |

**Conferência automática: 0 falha, 3 avisos:** (1) a dorsiflexão do tornozelo embaixo, 27,4° (no agachamento com o peso do corpo aprovado, 25,4°; com os calcanhares no chão, é a consequência do equilíbrio); (2) as linhas da ficha que são escolha de desenho; (3) de frente, o quadríceps quase não aparece (0 cm²) e o modo Músculos abre de lado, como no goblet aprovado.

## As vistas

As do goblet aprovado: **de lado** (padrão: a descida, o tronco e o calcanhar no chão) e **de frente** (os cotovelos entre os joelhos e o kettlebell entre as coxas).

## Erros (os três do cartão, com o mesmo título e na mesma ordem)

| Erro (texto do app) | Vista | O que o boneco faz (medido) |
|---|---|---|
| Tronco tomba | de lado | o peito inclina 49° (no certo, 28°). Embaixo, o quadril já dobra 128°: sem a lombar, o tronco só tombaria com o quadril a 164°, além do que ele dobra; por isso a lombar dobra 22° (o mesmo raciocínio do erro do goblet aprovado, "o tronco cai e a lombar arredonda"). A bola chega a 0,2 cm das coxas, sem encostar |
| Descer pouco | de lado | para com o joelho a 72° (no certo, 126°), o quadril 34 cm acima do certo (como nos agachamentos aprovados) |
| Calcanhar sai do chão | de lado | o pé gira 14° na bola: o calcanhar sobe 4,8 cm e o peso vai para a bola do pé; o joelho vai 9,6 cm mais para a frente |

Nenhum erro ficou fora.

## O equipamento

O kettlebell da tabela de objetos (modelo de competição, medidas de fabricante; 12 kg), desenhado pelo gerador realista (o mesmo dos kettlebells aprovados). A alça passa pelas duas mãos (pedido do Gustavo de 04/11 para os kettlebells em duas mãos).

## Correções já feitas que esta animação respeita

- "O kettlebell nunca fica solto entre as mãos" (04/11): cada mão segura uma haste da alça.
- Os músculos da biblioteca (quadríceps; glúteos e adutores), como o goblet aprovado (adutores "pedido do Gustavo").

## O que não ficou bom

- **O rótulo "cotovelos entre os joelhos"** (de frente) aponta para o cotovelo também no quadro "Em pé", quando ele ainda está na altura do peito: o texto fala do fundo. É a dica do cartão ("Amplitude"); a outra opção era "joelho na direção do pé" do goblet aprovado, que não é dica deste cartão.
- **De lado, o punho fica por cima da alça** e a alça não aparece (a mão a cobre): o kettlebell se lê pela bola. De frente a alça e as duas mãos aparecem.
- **No erro "Tronco tomba" a lombar também dobra**, embora o cartão fale só do tronco: sem isso a pose seria impossível (o quadril passaria do que dobra). Está dito acima.

## Correção de 19/11 (auditoria)

A auditoria das fases A e B (M3) achou que, de lado, embaixo, o kettlebell, que fica entre os joelhos, era pintado por cima do joelho de perto, que está 17,6 cm mais perto de quem olha. **Causa:** a bola empatava com o item do corpo (d = 0) e a haste de perto da alça ficava 0,2 cm à frente dele.

**O que mudou.** Só no exercício: `viesNaVista` de lado traz o corpo (o tronco com as pernas de perto) 4 cm para a frente do kettlebell na pintura; o braço de perto, que segura a alça, continua 6,4 cm à frente do corpo. A regra nova `goblet-kettlebell-pintado-no-lugar` mede a bola, as duas hastes e a barra da alça contra cada parte do corpo, dos dois lados, nas duas vistas (as mãos, na alça, não contam).

**Antes → depois** (pior quadro, cm de folga de pintura): de lado, a perna direita, que esconde o kettlebell, −0,2 → 3,8; a perna esquerda (atrás dele) 4,7 e o braço esquerdo 10,4, sem mudança. De frente, o tronco 18,9 e os braços 4,7, sem mudança. Em pé, a bola encostada no peito se desenha igual a antes (ela não se cruza com o tronco na tela). A regra falha no estado antigo e passa no novo; a conferência automática dá 0 falha e os mesmos 3 avisos.

Como a ordem de pintura é medida (a regra nova, com o núcleo em `src/engine/novo/regras/ordem-de-pintura.ts`): em cada vista do guia (as do exercício e as dos erros), a cada 3 quadros do movimento certo e em cada erro no começo, no meio e no fim, um raio sai de cada ponto do eixo da peça até quem olha e de cada ponto da pele virada para quem olha (a 85% do raio) até quem olha; se ele atravessa o corpo (os dois lados, cada grupo à parte), aquela parte do corpo tem de ser pintada depois do item que pinta a peça; se atravessa a peça, antes. A folga é a diferença de profundidade de pintura (cm; negativa = ordem errada). Contam só os cruzamentos de 4 pontos ou mais; a pele que fica dentro de outra parte do corpo ou dentro da própria peça não conta; quando a mesma parte esconde e é escondida pela mesma peça, vale o lado com mais pontos.

**O que ainda não ficou bom.** No erro "Tronco tomba", os antebraços continuam entrando nas coxas (pequeno da auditoria, fora deste pedido).
