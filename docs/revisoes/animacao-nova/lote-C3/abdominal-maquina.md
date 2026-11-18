# Lote C3 · Abdominal na máquina (`abdominal-maquina`)

De 18/11/2026. Primeira animação deste exercício (até aqui ele só aparecia como cartão de texto). Sentado na máquina de abdominal, a lombar no apoio, os pés no chão presos pelos rolos, as almofadas do braço da máquina sobre o peito e as mãos nos pegadores; o tronco enrola (as costelas vão à pelve) e o braço da máquina gira junto, levantando a pilha. **Ainda não aprovada nem ligada às telas.**

- Ficha da técnica: `docs/pesquisa/animacoes/abdominal-maquina.md`. Cartão do app: `src/conteudo/exercicios/abdominal-maquina.json` (só leitura).
- Ficha de movimento: `src/engine/novo/dados/movimentos/abdominal-maquina.json`.
- Animação: `src/engine/novo/exercicios/abdominal-maquina.ts`. Peça nova: a máquina de abdominal (`pecas-de-cena/abdominal-maquina.ts`, `dados/objetos/abdominal-maquina.json`, folha `docs/revisoes/animacoes-restantes/pecas/folha-abdominal-maquina.png`). A coluna enrola como no abdominal na polia aprovado (os mesmos números). Regras novas em `regras/avulsos-c3.ts`; a coluna que enrola, `polia-puxar-coluna-enrola` (`regras/polia-puxar.ts`), como está.
- Quadros grandes: `../quadros/abdominal-maquina.png`.

## A máquina (de onde vêm as medidas)

O tamanho vem das fichas (Life Fitness SS-AB 133 × 117 × 148 cm; Hammer Strength, Movement e Technogym na tabela). **Como ela funciona vem do manual público da Life Fitness** (Insignia, SS-AB): "adjust the seat height so that lower back pad is resting on your lower back", "grip handles", "avoid using your arms to power through the motion, they should provide a guide"; os desenhos mostram as almofadas sobre o peito presas a um braço que gira num eixo atrás e ao lado da lombar. O cartão de hoje tinha o eixo no alto, atrás da cabeça: a peça nova segue o manual. **O que sai do corpo:** a altura do assento (40,3 cm: a coxa na horizontal, os pés no chão), o apoio da lombar (encostado nas costas), **o eixo do braço no polo da rotação do tórax** do começo ao fim (26,1 cm acima do centro do quadril, 3,6 cm atrás dele): com o eixo ali, as almofadas ficam no mesmo lugar do peito no começo e no fim.

## O que a fonte pede × o que o boneco faz (medido) × confere?

| O que a ficha (e o cartão) pede | Selo | O que o boneco faz (medido) | Confere? |
|---|---|---|---|
| Sentado, pés presos | consenso | os dois lados do glúteo afundam 0,8 cm no assento, dentro das bordas dele; os pés no chão (0 cm), parados; **cada pé** sob o rolo do seu lado, dentro do comprimento dele, o rolo a 0,2 cm do peito do pé | sim |
| (A lombar no apoio: o manual) | consenso | no começo, as costas a 0,3 cm do apoio; no ciclo não entram nele | sim |
| Peito ou ombros nas almofadas | consenso | **nas duas almofadas**, a pele do peito fica de −0,2 a 0,6 cm da face delas, o movimento todo (o ângulo do braço é medido na pele, em 17 pontos, e ajustado por uma cúbica gravada pelo preparo); **cada almofada cabe no peito:** todo ponto da face, até 80% das bordas, fica a no máximo 5,3 cm do ponto da pele mais perto (a pele é amostrada a cada 3 a 4 cm), e o centro do contato a no máximo 30% do caminho do centro à borda | sim |
| Enrola o tronco: as costelas vão à pelve | consenso | a lombar dobra 26° e a torácica 40° (os números do abdominal na polia aprovado); o tórax gira 49,3°; a base do pescoço chega 6,9 cm mais perto do quadril | sim |
| O quadril dobra pouco | consenso | a bacia não anda nem gira (0 cm, 0°) | sim |
| Volta controlada até o tronco ficar reto | consenso | 2 s; no começo, o peito na vertical, a coluna neutra | sim |
| Braços só seguram | consenso | **as duas mãos** ficam nos pegadores (0 cm), fechadas; em relação ao tórax, andam 5,4 cm e o cotovelo vai de 138,2° a 143,4° | sim |
| (A máquina funciona) | consenso | o braço gira de 0,5° a 42° no eixo; a pilha sobe 7,2 cm (o arco do came de 20 cm) | sim |

**Conferência automática: 0 falha, 1 aviso** (as linhas que são escolha de desenho).

## Os dois lados (aviso de 18/11)

Todas as regras de contato medem os dois lados: as duas almofadas (no peito e dentro das bordas: a primeira versão, de 22 cm e mais alta, tinha a ponta de cima no ar, a 7 a 9 cm da pele, sobre a clavícula; ficou com 16 cm, 18 cm abaixo da sétima cervical e 15 cm entre os centros), as duas mãos nos pegadores, os dois pés sob os rolos e os dois lados do glúteo no assento. Nos quadros, de três quartos, o braço, a mão e a almofada do lado de longe aparecem no lugar.

## As vistas

**De lado** (padrão): a coluna enrolando, o assento, o apoio da lombar, a pilha subindo atrás. A haste e o montante do braço do lado de perto são pintados atrás do corpo (cobriam o ombro e as costas, o corte de ilustração do smith). **De três quartos** (segunda e a do modo Músculos): o braço da máquina inteiro, as almofadas no peito, os rolos dos pés.

## Erros (os dois do cartão, com o mesmo título e na mesma ordem)

| Erro | Vista | O que o boneco faz (medido) |
|---|---|---|
| Puxar com os braços | de lado | o braço da máquina vai o caminho todo (42,1°), mas a coluna enrola só 35% (o peito a 17,3° da vertical): os braços puxam (o cotovelo abre de 143° para 120°) e o peito sai das almofadas |
| Só dobrar o quadril | de lado | a coluna fica reta e a bacia gira 38°: o tronco desce inteiro (o peito a 38°), a lombar sai do apoio e o braço da máquina vai a 63° |

## O que não ficou bom

- **De lado, as almofadas quase não aparecem:** o braço da pessoa fica na frente delas, e a haste do lado de perto vai para trás do corpo. A máquina se lê melhor de três quartos.
- **As mãos ficam à frente dos ombros, e não ao lado da cabeça** como no desenho do manual: ao lado da cabeça, de lado, o pegador passava na frente do rosto. O cotovelo fica bem dobrado (~140°).
- **A peça é diferente do cartão de hoje** (o eixo baixo, ao lado da lombar, no lugar do eixo alto atrás da cabeça, e o apoio da lombar): segue o manual da Life Fitness, mas o cartão do app não foi mexido.
- O eixo está dentro da largura do corpo, na altura da lombar (é o polo da rotação do tórax); o braço da máquina passa por fora, a 31 cm do meio.

**Risco de o Gustavo não gostar: médio** (máquina nova, diferente do cartão; as almofadas aparecem pouco de lado).
