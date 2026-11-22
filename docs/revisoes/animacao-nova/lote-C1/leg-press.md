# Lote C1 · Leg press (`leg-press`)

De 18/11/2026. Primeira animação deste exercício (até aqui ele só aparecia como cartão de texto). Sentado no leg press 45°, as costas no encosto, as mãos nos pegadores ao lado do assento, os pés no meio da chapa; o carro desce na guia até o joelho passar de 90° e volta até quase estender, com a trava solta. **Ainda não aprovada nem ligada às telas** (quem integra registra em `aprovados.ts` e no catálogo do guia).

- Ficha da técnica: `docs/pesquisa/animacoes/leg-press.md`. Cartão do app: `src/conteudo/exercicios/leg-press.json` (só leitura).
- Ficha de movimento: `src/engine/novo/dados/movimentos/leg-press.json`.
- Animação: `src/engine/novo/exercicios/leg-press.ts`, sobre o núcleo novo das máquinas de trilho com assento (`exercicios/leg-press-base.ts`, que a panturrilha no leg press também usa). Regras medidas: `src/engine/novo/regras/leg-press.ts` (família "no trilho", também do hack).
- Peça nova: `src/engine/novo/pecas-de-cena/leg-press.ts` com `dados/objetos/leg-press.json`; folha em `docs/revisoes/animacoes-restantes/pecas/folha-leg-press.png`.
- Quadros grandes: `../quadros/leg-press.png`. **Sem folha** ao lado da animação de hoje: este exercício não tinha animação.

## Onde os números saem

A ficha da técnica dá a técnica em palavras (consenso de treinadores, `nsca2021` não verificado) e um número só: "dobra os joelhos até passarem de 90°". O que ela não dá saiu de três lugares, cada linha da ficha de movimento com o motivo: das animações aprovadas parecidas (o ritmo e a abertura das pontas dos pés do agachamento no smith; a lombar achatada 15° contra o apoio, dos deitados no chão), da máquina (o ângulo das guias, do nome e da página da Hammer Strength) e do corpo da tabela. **A bacia não é posta a olho:** uma calibração mede, na superfície do Boneco, a inclinação da bacia em que as escápulas e o glúteo encostam juntos no encosto e a posição em que o glúteo apoia no assento (amassando 1 cm). **A posição do carro também não:** em cada quadro, o pé fica preso à chapa e o carro anda na guia até a distância do quadril ao tornozelo dar o ângulo do joelho da ficha (uma conta de segundo grau, sem tentativa e erro).

## O que a fonte pede × o que o boneco faz (medido) × confere?

| O que a ficha da técnica (e o cartão) pede | Selo | O que o boneco faz (medido) | Confere? |
|---|---|---|---|
| Costas e quadril apoiados | consenso | as escápulas e a bacia a −1 cm da face do encosto e o glúteo a −1 cm do assento (afundam 1 cm) em todos os quadros; a bacia não se mexe (0 cm); a lombar achatada 15°, sem mudar no ciclo | sim |
| Pés no meio da plataforma, na largura do quadril ou dos ombros | consenso | o meio de cada pé no centro da chapa, a 13 cm do meio do corpo (o quadril fica a 8,35 e os ombros a 20,4); as pontas 12° para fora; os pés andam 0 cm em relação à chapa e a sola fica a 0 cm dela | sim |
| Mãos nos pegadores | consenso | as mãos fechadas nos pegadores de 3,8 cm (Gym Gear), paradas (0 cm), sem faltar alcance | sim |
| Descida de ~2–3 s, até os joelhos passarem de 90°, sem o quadril descolar | consenso | 2,4 s; embaixo o joelho dobra 100°, o quadril 127,8° (a média da tabela de amplitudes é 132°) e a bacia continua no assento | sim |
| Sobe até quase estender, sem travar | consenso | 1,3 s; em cima o joelho dobra 12° | sim |
| Joelhos na direção dos pés | consenso | o plano da perna fica a 0° da direção dos dedos (o joelho anda sobre a linha do pé) | sim |
| O carro anda na guia de 45° | medida (nome do aparelho; Hammer Strength HSLLP) | o centro da chapa sai 0 cm da linha da guia, a 0° dela; o carro anda 29,6 cm na guia (20,9 cm de altura) | sim |
| Trava solta na série; batente abaixo do fundo ("adjustable bottom stop", Magnum) | consenso | as alavancas da trava abertas (giradas 65° para cima) o ciclo inteiro; no ponto mais baixo, o carro fica 4 cm acima dos batentes | sim |
| Anilhas iguais dos dois lados | consenso | uma de 20 kg de cada lado, no pino do carro | sim |

Conferência automática (`node scripts/animacao-nova/conferir.mjs leg-press`): **0 falhas, 3 avisos.**

- **Dorsiflexão do tornozelo 34,6°** (a média da tabela é 14,8°; o máximo observado, 48°). Embaixo, com o joelho a 100° e o pé chapado no meio da chapa, a canela deita sobre o pé. É o que acontece no aparelho; com o pé mais alto na chapa seria menos, mas a ficha pede o meio.
- **Provisórios:** a lombar, o pescoço, a cabeça, o quanto o corpo afunda nos estofados, a anilha, os batentes e o corte do quadro são escolhas de desenho (cada uma com o motivo na ficha de movimento).
- **Músculos de cima: 0 cm²** no pior dos três instantes (embaixo, as coxas apontam para quem olha de cima). A vista de cima fica para os rótulos e o erro dos joelhos; o modo Músculos abre de lado (311 cm²).

O resto: proporções exatas (0 cm de desvio), ritmo suave (salto de 4,1% da velocidade de pico), simetria e fecho do ciclo em 0 cm, o corpo afunda no máximo 1 cm nos estofados.

## Os erros (os quatro do cartão, na mesma ordem)

| Erro | O que o desenho mostra (medido) | Vista, instante |
|---|---|---|
| Descer pouco | embaixo, o joelho para a 55° (no certo, 100°) | lateral, fim da descida |
| Quadril descola no fundo | desce até o joelho a 118°; a bacia gira 25° para trás e a lombar arredonda o mesmo tanto, com as escápulas paradas no encosto: a bacia sobe 8,2 cm e sai do assento | lateral, fim da descida |
| Travar os joelhos | em cima, o joelho estica até 1,8° (no certo, 12°) | lateral, começo |
| Joelhos para dentro | os joelhos giram 8° para dentro em volta da linha do quadril ao tornozelo, mais no meio do caminho: o joelho direito vai de 7,3 a 4,8 cm do meio, com o pé a 13 cm | de cima, meio do caminho |

Todos os erros do cartão têm consequência visível; nenhum ficou sem desenho.

## O equipamento

A peça nova (folha `folha-leg-press.png`): o tamanho da Hammer Strength PL-LP (176 × 130 × 145 cm; desenhada com 181 × 130 × 140), as guias a 45°, a guia de 40 mm, o tubo de 100 × 50 mm, os pegadores de 38 mm e os 4 pinos de guardar anilhas (Gym Gear), a massa do carro (75,7 kg, Magnum). O encosto a 40° do chão, a altura do assento, a linha em que a chapa corre e onde a trava apoia saíram do corpo da tabela (tipo `derivada`, com o motivo); o assento a 10°, a chapa 10° mais em pé que a perpendicular à guia e a largura dos estofados, do cartão de hoje.

Na cena, o lado de perto da máquina (as guias, o pino com as anilhas, a alavanca) vai para trás do corpo, como cenário (como no smith aprovado): de lado, ele cobriria as pernas. A estrutura e o banco são pintados atrás do corpo (eles ficam sempre do lado das costas; a ordem pelo centro os punha na frente do tronco). O quadro corta o chão e o pé da estrutura, para o corpo ocupar o quadro; as guias aparecem inteiras, para o nome dos erros não cair em cima delas.

## O que não ficou bom

- **A vista de cima é pequena** (o quadro tem 202 cm de altura, porque inclui as guias inteiras) e a chapa cobre as canelas e os pés: o erro "joelhos para dentro" se lê, mas os joelhos se encostam e o desenho fica pequeno. Tentei de frente (a chapa cobre tudo) e de três quartos (os joelhos ficam atrás da chapa no meio do caminho).
- **O rótulo "quadril no assento"** fica acima do corpo, com a linha descendo pela coxa até a bacia; ao lado não cabe sem o quadro abrir mais. A dica "sem travar no topo" saiu da vista de lado pelo mesmo motivo (duas não cabiam sem encolher o corpo) e "joelhos na direção dos pés" foi para a vista de cima.
- **Ângulos de desenho que nenhuma ficha confirma:** o encosto a 40° (derivado do corpo), a chapa 10° mais em pé (do cartão). Mudam a dorsiflexão do fundo e a flexão do quadril.

**Risco de o Gustavo não gostar: médio.** A vista de lado lê bem e a máquina funciona; a vista de cima e a dorsiflexão alta embaixo são os pontos fracos.

## Correção de 19/11 (auditoria, pequenos)

**O achado da auditoria: de cima, o encosto é pintado sobre a raiz dos braços. Confirma-se.** No desenho real, de cima, em todos os quadros, 5 anéis de cada braço (junto do ombro) ficam na frente do encosto e por cima dele na tela, e o pintor os põe por baixo dele: os braços saíam de trás das bordas do encosto. A causa: de cima, cada braço entra na ordem pela profundidade média dele (52,8), abaixo da do centro do encosto (58,4).

**O que mudou (a ordem de pintura do exercício).** `exercicios/leg-press.ts`: `viesNaVista: { cima: { bracoR: 6, bracoL: 6 } }`. De cima, os braços passam a ser pintados depois do encosto e continuam antes do corpo (72,2). De lado, nada muda.

| de cima | antes | depois |
|---|---|---|
| anéis de cada braço por baixo do encosto | 5 de 5 | 0 de 5 |

**Conferência nova:** `leg-press-corpo-por-cima-dos-estofados` (`regras/leg-press.ts`, com a medida em `regras/pintura-sobre-o-estofado.ts`): nas duas vistas e na de cada erro, na técnica e nos quatro erros, os anéis dos braços, antebraços, coxas, canelas, do tronco, da bacia e da cabeça, dos dois lados, contra o encosto e contra o assento. Depois: passa (0 em tudo).

**Conferência automática:** 0 falha, 3 avisos (os de antes). O preparo não muda. Quadros refeitos.

**O que ainda não ficou bom:** nada que eu tenha visto nos quadros de cima e de lado, nos dois lados.
