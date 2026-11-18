# Lote C3 · Coice na polia com tornozeleira (`coice-polia`)

De 18/11/2026. Primeira animação deste exercício (até aqui ele só aparecia como cartão de texto). Em pé, de frente para a coluna de polia, as mãos nos montantes da frente dela; a tornozeleira na perna direita (a de perto, de lado), presa ao cabo da roldana mais baixa; a perna vai de à frente do corpo até a coxa passar um pouco da linha do corpo. **Ainda não aprovada nem ligada às telas.**

- Ficha da técnica: `docs/pesquisa/animacoes/coice-polia.md`. Cartão do app: `src/conteudo/exercicios/coice-polia.json` (só leitura).
- Ficha de movimento: `src/engine/novo/dados/movimentos/coice-polia.json`.
- Animação: `src/engine/novo/exercicios/coice-polia.ts`, com o núcleo novo `exercicios/polia-no-tornozelo.ts`; a tornozeleira nova (`pecas-de-cena/tornozeleira.ts`) e a coluna aprovada. Regras novas em `regras/avulsos-c3.ts`; as do peso no pé de apoio (`regras/abducao-em-pe.ts`) e das polias (`regras/polia-bracos.ts`) como estão.
- Quadros grandes: `../quadros/coice-polia.png`.

## Em pé ou em quatro apoios

A ficha da técnica pede o coice **em pé** ("de frente para a torre, mãos apoiadas nela"), e o cartão também. Os coices aprovados (`quatro-apoios.ts`, com caneleira, elástico e na máquina) são em quatro apoios, com o joelho a 90°: não servem. O corpo em pé segue a abdução na polia (o equilíbrio sobre o pé de apoio da abdução com elástico aprovada).

## O que a fonte pede × o que o boneco faz (medido) × confere?

| O que a ficha (e o cartão) pede | Selo | O que o boneco faz (medido) | Confere? |
|---|---|---|---|
| De frente para a torre, mãos apoiadas nela | consenso | as duas mãos fecham nos montantes da frente da coluna, a 112 cm do chão (0 cm do eixo, paradas), os cotovelos a 20° no começo | sim |
| Polia no ponto mais baixo, tornozeleira na perna que trabalha | consenso | o carrinho a 17,8 cm; a tornozeleira 2 cm acima do centro do tornozelo, assentada (0,7 cm além da pele) | sim |
| Tronco levemente inclinado à frente | consenso | o peito a 13,3° da vertical, parado (a bacia gira 12° sobre o quadril de apoio, com a coluna neutra) | sim |
| Leva a perna para trás até a coxa passar um pouco da linha do corpo; volta até a frente do corpo | um estudo | de lado, a coxa vai de 22,1° à frente da vertical a 18° atrás dela, 8,8° além da linha do corpo (que desce dos ombros ao quadril) | sim |
| Joelho quase estendido | um estudo | 13° nas pontas do caminho; **34° no meio**, quando o pé passa embaixo do quadril (ver "O que não ficou bom") | em parte |
| Sem arquear a lombar | consenso | a lombar não passa da curva de repouso (0°) | sim |
| (O peso no pé de apoio; a bacia não gira) | consenso | o centro de massa de 35,3% a 37% do calcanhar à ponta do pé de apoio, sobre o eixo dele; a bacia não rola nem gira (0°); a coxa abre 5° para o lado (o pé passa ao lado do outro) | sim |
| O cabo da roldana ao tornozelo, a pilha que sobe | consenso | o cabo a no mínimo 4,5 cm da pele; anda 45,1 cm e a pilha sobe 22,6 cm (relação 2:1) | sim |

**Conferência automática: 0 falha, 2 avisos.** (1) A dorsiflexão do tornozelo chega a 20° (a média da tabela de amplitudes é 14,8°; o máximo, 48°): é o pé da perna que trabalha dobrando para cima quando o joelho dobra no meio, para a ponta não raspar o chão. (2) As linhas que são escolha de desenho.

## As vistas

**De lado** (padrão): a perna indo para trás, o joelho, a lombar parada, o cabo e a pilha. **De três quartos, por trás** (segunda e a do modo Músculos): o glúteo da perna que trabalha. De trás, a perna vem para quem olha e some; de frente, a coluna cobre o corpo.

## Erros (os três do cartão, com o mesmo título e na mesma ordem)

| Erro | Vista | O que o boneco faz (medido) |
|---|---|---|
| Arquear a lombar | de lado | a lombar arqueia 16° no fim e a coxa vai a 36° atrás da vertical; o tronco sobe (o peito a 2,7° para trás da vertical) |
| Dobrar o joelho | de lado | o joelho dobra até 75° no fim: vira uma flexora |
| Embalar | de lado | o tronco cai 16° a mais à frente (o peito a 29,3°) enquanto a perna vai para trás; os cotovelos dobram até 92° |

## O que não ficou bom

- **O joelho dobra até 34° no meio do caminho.** Em pé num pé só, a perna livre estendida e na vertical é ~1 cm mais comprida que a distância do quadril ao chão: o calcanhar entra no chão. Tentei a perna reta com o pé esticado ou dobrado (a ponta ou o calcanhar raspam), o joelho de apoio mais reto (ganha 0,1 cm) e a perna um pouco aberta (5°, ganha 0,3 cm). O que resolve é o que o corpo faz no passo: o joelho dobra quando o pé passa embaixo, num sino suave (13° nas pontas, 34° no meio). O rótulo "joelho quase estendido" fica certo nas pontas, mas no meio o joelho se vê dobrado.
- **No erro de arquear a lombar, o tronco sobe e os braços esticam** (cotovelo a 2°): as mãos ficam presas na torre.
- A tornozeleira tem a argola e o mosquetão provisórios.

**Risco de o Gustavo não gostar: médio a alto** (o joelho que dobra no meio pode parecer "flexora"; é o primeiro coice em pé do motor).
