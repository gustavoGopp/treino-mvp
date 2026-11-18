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
| Braços só seguram | consenso | **as duas mãos** ficam nos pegadores (0 cm), fechadas, à frente do peito, logo abaixo das almofadas; em relação ao tórax, andam 4,4 cm e o cotovelo vai de 116,3° a 122,7° | sim |
| (Nada da máquina no rosto ou no corpo) | desenho | nos dois lados, as hastes do braço da máquina, as dos pegadores e as empunhaduras ficam a no mínimo 0,9 cm da pele (fora a mão que segura) e a 11,1 cm da cabeça | sim |
| (A máquina funciona) | consenso | o braço gira de 0,5° a 42° no eixo; a pilha sobe 7,2 cm (o arco do came de 20 cm) | sim |

**Conferência automática: 0 falha, 1 aviso** (as linhas que são escolha de desenho).

## Os dois lados (aviso de 18/11)

Todas as regras de contato medem os dois lados: as duas almofadas (no peito e dentro das bordas: a primeira versão, de 22 cm e mais alta, tinha a ponta de cima no ar, a 7 a 9 cm da pele, sobre a clavícula; ficou com 16 cm, 18 cm abaixo da sétima cervical e 15 cm entre os centros), as duas mãos nos pegadores, os dois pés sob os rolos e os dois lados do glúteo no assento. Nos quadros, de três quartos, o braço, a mão e a almofada do lado de longe aparecem no lugar.

## A revisão de 18/11: o pegador na frente do rosto

Na primeira versão, de lado (a vista que o app abre), o pegador e a haste que descia do arco por cima dos ombros ficavam na frente dos olhos em f0 e f0,5. Agora:
- **as mãos ficam à frente do peito, logo abaixo das almofadas** (o centro de cada uma 27 cm abaixo da sétima cervical, 32 cm à frente dela, a 13 cm do meio do corpo), nos pegadores que saem da ponta de baixo das almofadas, apontando para a frente e para cima (45°). O manual da Life Fitness só diz "grip handles"; o desenho dele põe as mãos ao lado da cabeça, e era isso que cruzava o rosto. No fim do abdominal os pegadores ficam quase na horizontal, a 0,9 cm das coxas no ponto mais perto;
- **o braço da máquina não passa mais por cima dos ombros:** as duas hastes sobem pelos lados do corpo, por fora dos cotovelos de quem treina (a 45,8 cm do meio, 2 cm por fora da pele deles), vêm à frente do peito na altura das almofadas e entram até a borda de fora delas. Nada da máquina fica na altura do rosto;
- **de lado, a almofada do lado de perto aparece no peito**, inteira, e a mão segura logo abaixo dela.

Uma regra nova mede isso nos dois lados (`abdominal-maquina-pegadores-livres-do-corpo`: as hastes e os pegadores a pelo menos 0,5 cm da pele, fora a mão que segura, e a pelo menos 10 cm da cabeça).

## As vistas

**De lado** (padrão): a coluna enrolando, a almofada no peito, as mãos logo abaixo dela, o assento, o apoio da lombar, a pilha subindo atrás. A haste e o montante do braço do lado de perto são pintados atrás do corpo (o corte de ilustração do smith). **De três quartos** (segunda e a do modo Músculos): o braço da máquina inteiro, as duas almofadas no peito, as duas mãos, os rolos dos pés.

## Erros (os dois do cartão, com o mesmo título e na mesma ordem)

| Erro | Vista | O que o boneco faz (medido) |
|---|---|---|
| Puxar com os braços | de lado | o braço da máquina vai o caminho todo (42°), mas a coluna enrola só 35%: os braços puxam (o cotovelo abre) e o peito sai das almofadas |
| Só dobrar o quadril | de lado | a coluna fica reta e a bacia gira 38°: o tronco desce inteiro, a lombar sai do apoio e o braço da máquina vai mais longe |

## O que não ficou bom

- **De frente, as hastes passam na frente dos braços**, na altura das almofadas, e a máquina fica larga (as hastes a 45,8 cm do meio): é o preço de tirá-las de cima dos ombros.
- **A peça é diferente do cartão de hoje** (o eixo baixo, ao lado da lombar, o apoio da lombar, as hastes pelos lados): segue o manual da Life Fitness, mas o cartão do app não foi mexido.
- De lado, a almofada de perto é pintada por cima do braço (de perfil, o braço fica entre ela e quem olha): é o que deixa a almofada aparecer no peito.

**Risco de o Gustavo não gostar: médio** (máquina nova, diferente do cartão).
