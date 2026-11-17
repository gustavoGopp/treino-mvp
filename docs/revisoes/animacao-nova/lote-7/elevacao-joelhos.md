# Lote 7 · Elevação de joelhos na barra fixa (`elevacao-joelhos`)

De 15/11/2026. Sobre o núcleo do corpo pendurado (`exercicios/pendurado.ts`, lote 4, o mesmo da barra fixa) e o núcleo da elevação de joelhos (`exercicios/pendurado-joelhos.ts`, comum às paralelas). A estação de barra é a da barra fixa (`pecas-de-cena/barra-fixa.ts`). Ainda não está ligado às telas do app.

- Ficha da técnica: `docs/pesquisa/animacoes/elevacao-joelhos.md`. Cartão: `src/conteudo/exercicios/elevacao-joelhos.json`.
- Ficha de movimento: `src/engine/novo/dados/movimentos/elevacao-joelhos.json`.
- Animação: `src/engine/novo/exercicios/elevacao-joelhos.ts`. Regras: `src/engine/novo/regras/pendurado.ts`.
- Folha: `../prototipos/folha-elevacao-joelhos.png`. Quadros grandes: `../quadros/elevacao-joelhos.png`.

## Como a geometria foi montada

1. **Pendurado, braços estendidos, ombros ativos:** as mãos presas na barra (a 228,6 cm), o cotovelo a 6° o ciclo inteiro e a escápula 6° abaixo do ritmo do ombro (a mesma "escápula encaixada" da barra fixa).
2. **O que se move é a parte de baixo:** o quadril dobra até 82° na bacia (chega ao topo a 85% da subida); o joelho dobra até 95° (a 65%); a partir de 35% da subida a pelve enrola 25°: a bacia gira para trás e a lombar dobra o mesmo tanto, com o tórax parado (a mesma conta do abdominal invertido). A coxa termina acima da horizontal pela soma do quadril com a pelve enrolada.
3. **Sem balanço:** em cada quadro, o centro de massa fica na vertical das mãos. Quando as pernas sobem à frente, o corpo vai um pouco para trás e os braços inclinam (o ombro anda 17,5 cm para trás, de −5,1 a −22,6 cm em z, com a mão parada). É a física de quem fica parado pendurado: sem esse recuo o corpo giraria em volta da barra.

## O que a fonte pede × o que o boneco faz (medido) × confere?

| O que a ficha da técnica (e o cartão) pede | Selo | O que o boneco faz (medido) | Confere? |
|---|---|---|---|
| Pegada na largura dos ombros ou um pouco mais aberta | consenso | 49 cm de centro a centro das mãos (1,2 × 40,8 cm), pegada pronada | sim |
| A mão segura a barra | consenso | o centro da pegada fica a 0 cm do eixo da barra, com a mão fechada no diâmetro dela | sim |
| Ombros ativos: um pouco longe das orelhas | consenso | a clavícula fica a 11° o ciclo inteiro (sem mudar); do alto do ombro à base do crânio, 18,7 cm (o mesmo de em pé, parado; pendurado e solto, 16,1 cm na barra fixa) | sim |
| Corpo parado, pernas juntas | consenso | o centro de massa a 0 cm da vertical das mãos em todos os quadros; cada coxa 3° para o meio | sim |
| Suba os joelhos e, no fim, enrole a pelve | consenso (escamilla2006 para a escolha) | do começo ao topo, a bacia gira 25° para trás em relação ao tórax e a lombar dobra 25°, a partir de 35% da subida | sim |
| Em cima: joelhos pelo menos na altura do quadril, pelve enrolada | consenso | no topo, o centro do joelho fica 14,8 cm acima do centro do quadril | sim |
| Embaixo: pernas estendidas, sem embalo | consenso | o joelho dobra 5° embaixo; o quadril, 0° | sim |
| Braços estendidos | consenso | cotovelo a 6° em todos os quadros | sim |
| O corpo não atravessa a barra | (desenho) | a pele fica a no mínimo 3,2 cm da superfície da barra | sim |
| ~1 s subindo, ~2 s descendo | consenso | 1,1 s / 0,5 s no topo / 2 s, com 0,4 s pendurado | sim |

Conferência automática: **0 falha, 4 avisos.** (1) Elevação do braço até 170,6° (média da tabela 170°, máximo 192°): pendurado, o braço fica quase na vertical. (2) Ritmo: 15,9% da velocidade de pico, no quadril (o ok vai até 15%; tranco só acima de 25%): é a bacia, que vai para trás e depois para cima quando a pelve enrola, no meio da subida, quando tudo anda mais rápido. Tentei atrasar e adiantar o começo do enrolar (35% a 45%) e o fim do joelho (60% a 90%): fica entre 15,9% e 18%. (3) Linhas de escolha de desenho (para onde aponta o cotovelo, ângulos do topo, tempos dentro da subida, pelve enrolada 25°, inclinação de 4° do corpo). (4) Músculos: o antebraço aparece como "só ajuda", fora da lista do conteúdo (como na animação aprovada de hoje).

## Erros

| Erro (texto do app) | Vista | O que o boneco faz (medido) |
|---|---|---|
| Balançar o corpo | de lado (quadro parado no começo) | no começo, as pernas vão 25° para trás e a lombar arqueia 12° (o embalo); no meio da subida o centro de massa sai 10 cm à frente das mãos; no topo, a pelve só enrola 7,5° (30% do certo) |
| Só levantar as pernas | de lado | a pelve não enrola (lombar 0°): no topo, o joelho fica a 112,8 cm, só 2,8 cm abaixo do quadril (no certo, 14,8 cm acima) |

## Músculos

O abdômen em vermelho; oblíquos e antebraço listrados ("só ajuda", como em `SO_AJUDA` de hoje e na correção de 04/11). Os flexores do quadril trabalham, mas o app não os conta e o desenho não os tem. A vista padrão do modo Músculos é **de frente** (236 cm² do abdômen; de lado, 134 cm²; de trás, nada), e por isso as vistas são de lado (a técnica) e de frente.

## Correções já feitas que esta animação respeita

- Oblíquos "só ajuda" nos abdominais (04/11): sim.
- Pegada: a de hoje fica a 60 cm (1,5×); a ficha pede "na largura dos ombros ou um pouco mais aberta", e a nova usa 1,2×.

## O que não ficou bom

- **De lado, o braço de perto cobre parte da cabeça** pendurado (com a mão acima e um pouco à frente do ombro, o braço passa diante do rosto na vista de lado). De frente, o rosto aparece.
- Ritmo de 15,9% (aviso), pelo motivo dito acima.
