# Lote A3 · Desenvolvimento unilateral com halter, em pé (`desenvolvimento-unilateral`)

De 17/11/2026. Primeira animação deste exercício (até aqui ele só aparecia como cartão de texto). Em pé, pés na largura do quadril; um halter de 25 lb na mão direita, na altura do ombro, palma para a frente e cotovelo um pouco à frente do corpo; a mão esquerda na cintura. O halter sobe até o cotovelo quase estender, sobre o ombro, e desce em ~2 s. **Ainda não aprovada nem ligada às telas** (quem integra registra em `aprovados.ts` e no catálogo do guia).

- Ficha da técnica: `docs/pesquisa/animacoes/desenvolvimento-unilateral.md`. Cartão do app: `src/conteudo/exercicios/desenvolvimento-unilateral.json` (só leitura).
- Ficha de movimento: `src/engine/novo/dados/movimentos/desenvolvimento-unilateral.json`.
- Animação: `src/engine/novo/exercicios/desenvolvimento-unilateral.ts`, sobre o núcleo dos desenvolvimentos (`exercicios/empurrar-para-cima.ts`), com a variação nova `'halter'` (ver "Mudanças em arquivos comuns"). Regras novas: `src/engine/novo/regras/desenvolvimentos-em-pe.ts`.
- Quadros grandes: `../quadros/desenvolvimento-unilateral.png`. **Sem folha**: o exercício não tinha animação.

## Onde os números saem

A ficha da técnica não dá número; ela manda seguir o desenvolvimento com halteres "por analogia". O que ela não dá saiu das animações aprovadas parecidas, cada linha com a fonte: a postura em pé, a outra mão na cintura e o erro de arquear (desenvolvimento unilateral com kettlebell, em pé); a pegada com a palma para a frente, o cotovelo 30° à frente embaixo e o erro de descer pouco (desenvolvimento sentado com halteres); o braço em cima a 79° (desenvolvimento com elástico, em pé, que já tinha visto que os 80° do sentado passam da amplitude da tabela com o tronco na vertical); o erro de inclinar para o lado (a elevação lateral unilateral com elástico, 14°, metade na lombar e metade na torácica).

**A altura de baixo não é a do sentado.** O cartão do sentado pede "na altura das orelhas"; o deste pede "na altura do ombro". O braço desce até o úmero ficar 52° abaixo da horizontal: o centro da mão fica 5,7 cm acima da ponta do ombro e o halter, ao lado da cabeça, não encosta no ombro (6,7 cm da cabeça).

**O cotovelo no topo vai mais à frente que no sentado (70° em vez de 30°, visto de cima).** Com 30°, de lado, a frente do ombro (o músculo principal) sumia atrás do braço no topo: 0 cm² medidos, falha da conferência. Com o braço quase na vertical, essa diferença move o cotovelo só uns 6 cm; o halter continua a 5,8 cm da vertical do ombro. O desenvolvimento com kettlebell aprovado usa 80° pelo mesmo motivo.

## O que a fonte pede × o que o boneco faz (medido) × confere?

| O que a ficha da técnica (e o cartão) pede | Selo | O que o boneco faz (medido) | Confere? |
|---|---|---|---|
| Em pé, pés na largura do quadril | consenso | cada pé a 9 cm do meio; os dois parados no ciclo (0 cm); joelhos a 8° (destravados), sem mexer | sim |
| Abdômen e glúteos firmes, tronco reto | consenso | a lombar não sai da curva de repouso (0°); a base do pescoço não se move (0 cm) | sim |
| Halter na altura do ombro | consenso | embaixo, o centro da mão fica 5,7 cm acima da ponta do ombro (limite: ±6 cm) | sim |
| Cotovelo um pouco à frente do corpo | consenso | embaixo, o cotovelo fica 30° à frente do plano do corpo, visto de cima | sim |
| A outra mão na cintura | consenso | a mão esquerda na cintura, parada (0 cm), cotovelo a 98° | sim |
| Empurra para cima até quase estender o cotovelo | consenso | o antebraço fica na vertical o tempo todo (0°); no topo, o cotovelo dobra 11° e o halter fica a 5,8 cm da vertical do ombro | sim |
| Sem inclinar o tronco para o lado | consenso | visto de frente, o peito fica a 0° da vertical | sim |
| Descida ~2 s, até a altura do ombro | consenso | 2,0 s; volta ao mesmo ponto de baixo (o último quadro emenda no primeiro: 0 cm) | sim |
| (Subida: o cartão não dá tempo) | consenso | 1,3 s, o do desenvolvimento aprovado; o ritmo é suave (salto de 8,5% da velocidade de pico, limite 25%) | sim |
| Equilíbrio (mecânica) | consenso | o centro de massa (corpo + halter) anda de −1,8 a 1,3 cm do meio do pé, sempre dentro do apoio | sim |
| O halter não bate na cabeça | consenso | a carga passa a no mínimo 6,7 cm da cabeça | sim |

**Conferência automática: 0 falha, 2 avisos.** (1) As linhas da ficha de movimento que são escolha de desenho (`joelho`, `cervical`, `cabeca`, `braco.topo.frente`). (2) O modo Músculos abre de lado (35 cm², o pior dos três instantes); de frente, a frente do ombro aparece embaixo (38 cm²) e some no meio e em cima (0 cm²), como no desenvolvimento com kettlebell aprovado (de frente: 0 cm²).

## As vistas

**De lado** (padrão): mostra o caminho do halter, o antebraço na vertical, o tronco parado e o arco da lombar. **De frente**: mostra o halter ao lado da cabeça, a mão na cintura, a inclinação para o lado e a descida curta. As duas são as do desenvolvimento com kettlebell aprovado.

## Erros (os três do cartão, com o mesmo título e na mesma ordem)

| Erro (texto do app) | Vista | O que o boneco faz (medido) |
|---|---|---|
| Inclinar para o lado | de frente | enquanto o halter sobe, a coluna dobra 14° para a esquerda (o lado oposto ao halter): o peito chega a 10,8° da vertical e a base do pescoço anda 7 cm; o braço continua subindo na vertical |
| Arquear a lombar | de lado | no topo, a lombar arqueia 20°, as costas de cima estendem 8° e a bacia inclina 6° à frente: o peito vai para trás (a base do pescoço anda 5,7 cm) |
| Descida curta | de frente | a descida para com o úmero 35° acima da horizontal: o halter fica 49 cm acima da ponta do ombro, acima da cabeça |

Os três são pose (consequência visível); nenhum ficou de fora.

## O equipamento

- **Halter:** o sextavado de 25 lb da tabela de objetos (o mesmo do desenvolvimento sentado aprovado), com o cabo atravessado na mão (palma para a frente).

## Correções já feitas que esta animação respeita

Não há correção registrada para este exercício em `correcoes-ja-feitas.md`. Das correções do desenvolvimento com kettlebell (a variação mais próxima), a da bola no antebraço não se aplica ao halter.

## Mudanças em arquivos comuns

- `exercicios/empurrar-para-cima.ts`: duas variações novas (`'halter'`, um halter na mão direita e a outra mão na cintura; `'halteres-em-pe'`) e o erro `'lado'` (a coluna dobra para a esquerda, pela linha `erro.lado.tronco`). Aditiva: o que as outras variações pedem não mudou (as condições que eram `!elastico` e `sentado || elastico` passaram a nomear o kettlebell, com o mesmo resultado). O preparo dos três desenvolvimentos aprovados não mudou.
- `exercicios/dobrar-o-quadril.ts`: um campo opcional novo, `lado` (a inclinação da coluna para a esquerda, metade na lombar e metade na torácica). Sem ele, nada muda: o preparo de todos os que usam o núcleo ficou igual.

## O que não ficou bom

- **De lado, embaixo, o halter fica na frente do queixo.** O halter está do lado de fora da cabeça (a 6,7 cm dela), mas de lado ele se projeta sobre o rosto. É o mesmo do desenvolvimento com kettlebell aprovado (a bola na frente do queixo). Abaixar o halter não resolve (ele continua na frente do rosto, só mais embaixo); a vista de três quartos tiraria o halter do rosto, mas eu mantive a vista de lado das variações aprovadas.
- **No topo, de lado, o braço passa na frente do rosto**, como no desenvolvimento com kettlebell aprovado: é o preço de a frente do ombro aparecer no modo Músculos.
- **No erro de inclinar para o lado, o braço sobe na vertical do mundo**, e não junto com o tronco; a ficha não diz o que o braço faz.
