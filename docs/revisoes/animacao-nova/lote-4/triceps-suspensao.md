# Lote 4 · Tríceps na suspensão, mãos à testa (`triceps-suspensao`)

De 15/11/2026. Sobre o núcleo `exercicios/na-fita.ts`, de costas para a âncora e na ponta dos pés. Ainda não está ligado às telas do app.

- Ficha da técnica: `docs/pesquisa/animacoes/triceps-suspensao.md`. Cartão: `src/conteudo/exercicios/triceps-suspensao.json`.
- Ficha de movimento: `src/engine/novo/dados/movimentos/triceps-suspensao.json`.
- Animação: `src/engine/novo/exercicios/triceps-suspensao.ts`. Regras: `src/engine/novo/regras/suspensao.ts`.
- Folha: `../prototipos/folha-triceps-suspensao.png`. Quadros grandes: `../quadros/triceps-suspensao.png`.

## Como a geometria foi montada

1. **Os pés** apoiam na ponta, com o calcanhar levantado 35° e parado (como na extensão de tríceps com o peso do corpo do motor novo); o corpo gira no tornozelo. A ficha não diz se é na ponta ou no calcanhar; inclinado à frente, a ponta é o apoio natural.
2. **O começo:** corpo a 24° à frente da vertical ("comece quase em pé"; hoje 25°), o braço a 115° do braço pendurado, no tronco (dentro dos ~90–120° da ficha), cotovelo reto: as mãos ficam na altura dos ombros (135,6 contra 137,1 cm). Daí a fita sai com **82 cm**.
3. **No movimento**, o braço não se move no tronco (cotovelos parados, apontando para a frente) e só o antebraço dobra, até 100°. O ângulo do corpo sai da fita: o corpo vai à frente de 24° a 40,8°.
4. **A âncora** fica a 182,9 cm (fabricante). Com os pés 30 cm atrás dela, como hoje, a fita passava a 0,2 cm da cabeça; os pés recuaram para **50 cm atrás**, e a fita passa a 2,7 cm, por cima da cabeça.

## O que a fonte pede × o que o boneco faz (medido) × confere?

| O que a ficha da técnica (e o cartão) pede | Selo | O que o boneco faz (medido) | Confere? |
|---|---|---|---|
| Fitas num ponto firme no alto, alças na mesma altura | consenso | as duas fitas com 82 cm o ciclo inteiro (variação 0 cm) | sim |
| De costas para a âncora, corpo reto como numa prancha, inclinado à frente, começando quase em pé | consenso | ombro, quadril e tornozelo a no mínimo 177,3°; corpo a 24° no começo | sim |
| Palmas para baixo, braços estendidos à frente na altura dos ombros | consenso | antebraço a 160° de pronação (180° = palma toda para baixo); mãos 1,5 cm abaixo do ombro, cotovelo reto | sim |
| A fita passa por cima da cabeça, não no pescoço | consenso (cartão) | a fita passa a no mínimo 2,7 cm da cabeça e do pescoço | sim |
| Cotovelos apontam para a frente e ficam parados | consenso | o braço gira 0° no tronco e abre 0° para o lado (no mundo o cotovelo desce 30 cm, porque o corpo inteiro inclina) | sim |
| Mãos à testa, com o corpo indo à frente | consenso | no fim, a pegada fica a 15,3 cm da cabeça, 8,3 cm à frente do centro dela e 20,2 cm acima (em frente ao alto da testa); o corpo vai de 24° a 40,8° | sim |
| ~2 s descendo, ~1 s estendendo | consenso | 2 s / pausa 0,5 s / 1,1 s | sim |

Conferência automática: **0 falha, 1 aviso** (as linhas de escolha de desenho: pés, calcanhar, ângulo inicial, polegar, dobra do cotovelo no fim). Ritmo suave (10,6%). Tornozelo de 8,1° de flexão plantar a 8,7° de dorsiflexão. Músculos: a vista padrão é a de lado (o tríceps aparece inteiro); a segunda vista é de três quartos por trás (`quinaTras`), porque de trás, no começo, as mãos somem atrás da cabeça.

## Erros

| Erro (texto do app) | O que o boneco faz (medido) |
|---|---|
| Quadril cai (de lado) | o quadril estende 16° e a lombar arqueia 10°: o quadril desce de 75,4 para 61,7 cm no fim; a fita continua com 82 cm |
| Cotovelos abrem ou descem (de três quartos por trás) | os cotovelos abrem 50° para o lado e descem (o braço a 70° do pendurado): o cotovelo vai para 22 cm do meio do corpo e 18 cm abaixo do ombro; o corpo fica mais em pé (27,8°): vira uma flexão |
| Descer pouco (de lado) | o cotovelo dobra só 45° e o corpo para a 30,5° |

## O equipamento

A fita do lote 1 com os acréscimos da remada (`pontoDeDivisao`, `vigaComoCenario`) e da rosca (viga escondida na vista de cima). Nada novo aqui.

## Correções já feitas que esta animação respeita

- A fita não estica (04/11): aqui o corpo gira na ponta dos pés (não nos calcanhares, como "nas quatro de pé" de hoje; a ficha não diz, e inclinado à frente o apoio natural é a ponta). Dito para o Gustavo decidir.
- "Rótulo sobre o braço no tríceps" (resolvido pelo R4): os rótulos ficam fora do corpo.
- Erros `quadril`, `cotovelo`, `curta`: sim.

## O que não ficou bom

- **Os pés ficam 50 cm atrás da âncora** (hoje, 30 cm, com a âncora a 205 cm). Com 30 cm e a âncora do fabricante, a fita raspava a cabeça (0,2 cm medido).
- **As mãos param em frente ao alto da testa**, 20 cm acima do centro da cabeça: com o braço a 115° no tronco, é aí que o antebraço chega. Baixar o braço (105°) faz a fita encostar na cabeça (0 cm, medido); dobrar menos o cotovelo deixa as mãos longe da testa (17,6 cm, falha).
- No mundo, os cotovelos descem 30 cm (o corpo todo inclina 17°); a animação de hoje mantinha a altura do cotovelo. A ficha pede "parados" e o cartão "só os antebraços se mexem"; aqui eles estão parados em relação ao tronco.
