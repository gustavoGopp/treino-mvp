# Lote 3 · Relatório da família dos ombros

De 15/11/2026. As quatro animações estão feitas, na ordem pedida, com a conferência automática **sem falha** em todas. Ramo: `worktree-agent-ac3603542ec40ae14` (sem push, merge ou PR). Conferências escritas: `lote-3/<id>.md`; quadros: `quadros/<id>.png`; folhas: `prototipos/folha-<id>.png`.

**Aviso sobre o pedido:** o id `elevacao-lateral` não é a elevação com halteres: pela ficha da técnica, pelo texto do app e pela animação de hoje, é a **elevação lateral unilateral na polia** (a de halteres é `elevacao-halteres`, que é lateral, não frontal). Segui a ficha.

## 1. `elevacao-lateral` (polia, um braço)
- **Conferência:** 0 falha; avisos: linhas de escolha de desenho; frente do ombro listrada ("só ajuda", decisão de 02/11).
- **Medido:** braço 30° à frente do plano do corpo no alto; cotovelo 2,3 cm acima do centro do ombro e 4,3 cm acima da mão; clavícula sem elevação além do ritmo (0°); cabo a ≥ 2 cm da pele, na frente do corpo; pilha 2:1 conferida; tronco parado (0 cm).
- **O que não ficou bom:** os dois rótulos de frente ficam juntos à esquerda e, no alto, o fio de "ombro longe da orelha" corre sobre o braço (`frontal:tec:f1`); de cima, embaixo, a mão quase some sob o ombro (`cima:tec:f0`).
- **Risco de o dono não gostar: médio.** A torre entra como cenário (cortada em cima) e é a primeira polia "de lado" no motor novo; a segunda vista é a de cima, que ele ainda não viu nesta família.

## 2. `elevacao-halteres` (lateral, em pé, tronco levemente à frente)
- **Conferência:** 0 falha; avisos: escolha de desenho; frente do ombro listrada; vista de cima não serve ao modo Músculos.
- **Medido:** peito 13° à frente; braço 30,5° à frente do plano do corpo; cotovelo 0,4 cm abaixo do centro do ombro e 8,1 cm acima da mão; clavícula 0° além do ritmo; tronco parado; centro de massa ±2,3 cm do meio do pé.
- **O que não ficou bom:** embaixo, "halteres na frente das coxas" vira "ao lado e à frente": com a palma para dentro o halter de 33 cm (o único da tabela) não cabe na frente da coxa (`frontal:tec:f0`); tentei levar o braço mais à frente embaixo (55°), mais que isso o braço sobe à frente antes de ir para o lado. O halter de 25 lb é grande para uma elevação lateral.
- **Risco: baixo/médio** (a posição de baixo).

## 3. `desenvolvimento` (sentado, halteres, encosto a 78°)
- **Conferência:** 0 falha; avisos: escolha de desenho; trapézio de cima listrado.
- **Medido:** costas e nuca no encosto (0 cm); mão 1 cm acima da orelha embaixo; cotovelos 30° à frente; antebraço 0° da vertical; topo com cotovelo a 10° e a mão a 5,3 cm da vertical do ombro; halteres a 12,4 cm um do outro e a 14,3 cm da cabeça; lombar 0°.
- **Banco:** a ficha pede encosto, o banco reto não serve. Desenhei uma **peça provisória** do banco regulável (`pecas-de-cena/banco-regulavel-provisorio.ts`, mesmo gerador realista e mesmas medidas da tabela) **para ser trocada pela peça do colega** na integração.
- **O que não ficou bom:** a base do banco (143,5 cm) alarga a cena de lado e o corpo fica um pouco menor que no búlgaro (`lateral:tec:f0`); o fio de "cotovelos um pouco à frente" passa sobre o braço.
- **Risco: médio** (o banco é provisório e é a primeira vez que o corpo senta com encosto no motor novo).

## 4. `desenvolvimento-unilateral-kettlebell` (em pé, rack)
- **Conferência:** 0 falha; avisos: cotovelo a 150° embaixo (rack) e braço a 173° no topo (acima da média, abaixo do máximo); escolha de desenho; vista de frente não serve ao modo Músculos.
- **Medido:** mão 3,2 cm acima da ponta do ombro; bola a 0,3 cm da pele do antebraço o ciclo todo; cotovelo a 3,7 cm do tronco; punho 0°; antebraço vertical; topo com cotovelo a 8°, mão 32 cm acima da cabeça; bola a ≥ 18 cm da cabeça; tronco parado; mão livre na cintura parada.
- **O que não ficou bom:** no tema escuro a bola quase some (`frontal:tec:f1::cinza:escuro`; é o desenho comum do kettlebell); o erro do punho se lê mal de lado (`lateral:err:f0:punho`, o "erro pequeno" já registrado); no meio da subida a bola passa na frente do rosto, de lado (`lateral:tec:f0.5`). O braço sobe quase no plano da frente do corpo (pegada neutra): num plano mais para o lado, a frente do ombro some no topo e a conferência falhava.
- **Risco: médio.**

## Arquivos comuns que mexi
- `exercicios/dobrar-o-quadril.ts` (núcleo dos stiffs): campo opcional `alfa` no pedido (o quadril fica num ângulo dado, sem refazer o equilíbrio) e `alfa` no retorno. Aditivo; sem ele nada muda. Motivo: nas elevações e no desenvolvimento em pé o tronco tem de ficar parado ("sem embalo"); com o equilíbrio de cada quadro a bacia andava 5 cm.
- Uma linha em `exercicios/registro.ts` por exercício e uma em `regras/registro.ts` (`regras/ombros.ts`).
- `npm run conferir:animacao` sem falha em todas as animações; arquivos gerais desfeitos antes dos commits.

## Medidas provisórias (selo `desenho`)
Elevações: joelho, inclinação do tronco (halteres 12°), cotovelo 15°, giro do úmero 50°, transição do plano, folga embaixo, massa do halter (5 kg); na polia, a altura da mão na torre (112 cm) e a coluna 6 cm à frente. Desenvolvimento: inclinação da bacia (−16°), cabeça, quanto o estofado afunda (1 cm), pés (16 cm do meio, 56 cm à frente); assento do banco (34 cm) é `provisoria` na tabela. Kettlebell: joelho, plano do braço (92° embaixo, 80° no topo), giro da mão, folga da bola (0,3 cm), massa (12 kg, `desenho` na tabela).

## Commits
- `a962a2b` Lote 3: elevação lateral unilateral na polia
- `e2ecd21` Lote 3: elevação lateral com halteres
- `8233f12` Lote 3: desenvolvimento sentado com halteres
- o último commit (desenvolvimento com kettlebell e este relatório): "Lote 3: desenvolvimento unilateral com kettlebell"
