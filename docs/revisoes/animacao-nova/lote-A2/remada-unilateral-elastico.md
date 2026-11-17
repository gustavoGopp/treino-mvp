# Lote A2 · Remada unilateral com elástico sob o pé da frente (`remada-unilateral-elastico`)

De 17/11/2026. Primeira animação deste exercício (até aqui ele só aparecia como cartão de texto). O pé esquerdo à frente, pisando inteiro no meio do tubo; o direito atrás; o tronco inclinado com as costas retas, a mão esquerda apoiada na coxa da frente; a mão direita segura as duas pontas do tubo e o cotovelo vai para trás, rente ao corpo, até a mão chegar perto do quadril. **Ainda não aprovada nem ligada às telas.**

- Ficha da técnica: `docs/pesquisa/animacoes/remada-unilateral-elastico.md`. Cartão do app: `src/conteudo/exercicios/remada-unilateral-elastico.json` (só leitura).
- Ficha de movimento: `src/engine/novo/dados/movimentos/remada-unilateral-elastico.json`.
- Animação: `src/engine/novo/exercicios/remada-unilateral-elastico.ts`. O corpo parado é o da remada unilateral sem banco aprovada (`remada-sem-banco.ts`, usado como está), o braço que puxa é o do núcleo das remadas (`remada.ts`, com a opção nova `carga: 'elastico'`) e o tubo pisado sai do núcleo novo `exercicios/elastico-pisado.ts`.
- Quadros grandes: `../quadros/remada-unilateral-elastico.png`. **Sem folha** (não havia animação).

## Onde os números saem

A ficha da técnica não dá número. A base (tronco a 55°, joelho da frente a 30°, perna de trás a 8° com o calcanhar 15° no ar, passo de 66 cm, a mão na coxa com o cotovelo a 12°), o braço que puxa e os erros de girar e de arredondar saem da **remada unilateral sem banco aprovada** (fonte `semBanco`). O tubo é o da tabela (48 pol). **Como o tubo fica:** o cartão diz "pisando com o pé inteiro no meio do elástico" e "a ponta do elástico na mão do lado de trás". Pisado no meio, o tubo tem duas pontas; elas sobem juntas até a mão direita, que segura os dois pegadores. É o que fecha a conta sem voltas na mão: dobrado ao meio, cada trecho tem uns 50 cm do pé à mão, e com o braço estendido o tubo fica a 1,0 vez o comprimento em repouso (esticado, sem folga). Sob a sola, os dois trechos passam lado a lado, a 3 cm um do outro, e a dobra fica embaixo da borda de fora do pé.

## O que a fonte pede × o que o boneco faz (medido) × confere?

| O que a ficha da técnica (e o cartão) pede | Selo | O que o boneco faz (medido) | Confere? |
|---|---|---|---|
| Pé da frente inteiro sobre o elástico, no meio dele | consenso | os dois trechos passam sob a sola de 47% a 62% do caminho do calcanhar à bola do pé, a 0,6 cm do chão; o calcanhar no chão (0 cm); os pés não andam (0 cm) | sim |
| Um pé à frente, o outro atrás (o do lado da mão que puxa) | consenso | o tornozelo direito fica 66 cm atrás do esquerdo | sim |
| Tronco inclinado, costas retas | consenso | o peito a 56,3° da vertical; a lombar não dobra além da curva de repouso (0°) | sim |
| Mão livre apoiada na coxa da frente, parada | consenso | a mão a 0,2 cm da pele da coxa, a 88% do caminho do quadril ao joelho; ela anda 0 cm e o cotovelo fica a 12° | sim |
| Braço estendido no começo | consenso | o cotovelo dobra 3° | sim |
| Cotovelo para trás, perto do corpo, sem girar o tronco | consenso | o braço se afasta no máximo 16° do lado do tronco; o tórax gira 0° e a bacia anda 0 cm | sim |
| Fim: mão perto do quadril, cotovelo atrás do tronco | consenso | a mão a 87% do caminho do ombro ao quadril; o cotovelo 5,4 cm além da linha das costas | sim |
| A escápula se junta à coluna (da sem banco aprovada) | consenso | a clavícula vai 13,1° para trás | sim |
| ~1 s puxando, pausa curta, ~2 s voltando | consenso | 1,1 s, 0,6 s, 2,1 s; salto de velocidade de 7,4% do pico; o ciclo emenda (0 cm) | sim |
| O elástico estica e não atravessa o corpo | física | de 1,0 vez (braço estendido) a 1,4 vez (no fim); máximo do fabricante 3 vezes. Passa a no mínimo 3,2 cm da pele (canela da frente) | sim |
| O centro de massa sobre os pés | mecânica | sempre dentro do apoio | sim |

**Conferência automática: 0 falha, 3 avisos.** (1) Dorsiflexão de 17,8° no tornozelo de trás: é o mesmo aviso da remada unilateral sem banco aprovada (a mesma base). (2) O elástico estica de 1,0 a 1,4 vez, mais no fim que no começo do ciclo (a regra geral espera o contrário; mesmo aviso das remadas com elástico aprovadas). (3) As linhas de escolha de desenho (as da sem banco e as do tubo). Músculos: o modo abre de três quartos de trás, como a sem banco.

## As vistas

**De lado** (padrão do modo Técnica): o tronco parado, o braço que puxa perto do corpo e os dois trechos do tubo descendo até o pé da frente. **De três quartos** (a segunda): o tronco que não gira e a mão na coxa. As mesmas da sem banco aprovada.

## Erros (os três do cartão, com o mesmo título e na mesma ordem)

| Erro (texto do app) | Vista | O que o boneco faz (medido) |
|---|---|---|
| Girar o tronco | de três quartos | o peito abre para o lado do braço que puxa: a coluna gira 18° no fim (o erro da sem banco aprovada); o tubo estica 1,5 vez |
| Arredondar as costas | de lado | a lombar e a parte de cima das costas curvam 22° cada (o erro da sem banco) |
| Pisar só com a ponta do pé | de lado | o calcanhar da frente sobe 25° (a bola do pé no chão) e o tubo fica sob a ponta dos dedos (97% do caminho do calcanhar à ponta), de onde ele escapa. O quadril fica onde estava (a perna de trás, quase estendida, não deixa o corpo subir): o joelho da frente dobra mais, e a mão de apoio vai junto com a coxa, no mesmo ponto dela. O elástico escapando e voltando no rosto não é desenhado |

## O equipamento

- **Tubo com pegadores:** o da tabela (48 pol). Os **dois pegadores juntos na mão direita**: desenhados um ao lado do outro ao longo da pegada (deslocados 0,9 cm cada um), dentro da mão fechada, com as duas fitas saindo dela.

## Correções já feitas que esta animação respeita

Não há correção registrada para este exercício. Das do elástico: o tubo afina ao esticar e passa sob o pé que pisa. Da sem banco: costas do lado que puxa em vermelho, bíceps e ombro de trás em laranja.

## Mudança em arquivo comum

A mesma da curvada com elástico: `carga: 'elastico'` no `exercicios/remada.ts` (aditiva; o preparo das outras remadas não muda). O `remada-sem-banco.ts` aprovado é usado como está (`baseSemBanco` e `peleDaCoxa` já eram exportados).

## O que não ficou bom

- **Os dois pegadores numa mão só** são uma leitura do cartão ("pisando no meio" + "a ponta do elástico na mão"); de lado, aparecem como duas barrinhas pretas lado a lado, com um "V" de fitas embaixo do punho. Lê-se como pegador, mas não é um desenho que o Gustavo já tenha visto.
- **Tirei o rótulo "cotovelo para trás"**: de lado (no fim) e de três quartos (no começo), o fio dele atravessava as costas. Ficaram "costas retas" (de lado) e "tronco sem girar" (de três quartos); o caminho do cotovelo aparece no modo Trajetória.
- **Na vista de três quartos, a dobra do tubo** aparece como um pequeno "V" roxo ao lado de fora do pé da frente.
- **No erro do pé**, o joelho da frente dobra mais em vez de o corpo subir (com a perna de trás quase estendida, o corpo não tem como subir sem tirar o pé de trás do lugar).
