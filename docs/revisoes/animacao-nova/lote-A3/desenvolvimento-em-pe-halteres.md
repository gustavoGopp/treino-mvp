# Lote A3 · Desenvolvimento em pé com dois halteres (`desenvolvimento-em-pe-halteres`)

De 17/11/2026. Primeira animação deste exercício (até aqui ele só aparecia como cartão de texto). Em pé, pés na largura do quadril, joelhos levemente soltos; um halter de 25 lb em cada mão, na altura dos ombros, palmas para a frente e cotovelos um pouco à frente do corpo. Os halteres sobem até os braços quase estenderem acima da cabeça, sem se tocar, e descem em ~2 s. **Ainda não aprovada nem ligada às telas** (quem integra registra em `aprovados.ts` e no catálogo do guia).

- Ficha da técnica: `docs/pesquisa/animacoes/desenvolvimento-em-pe-halteres.md`. Cartão do app: `src/conteudo/exercicios/desenvolvimento-em-pe-halteres.json` (só leitura).
- Ficha de movimento: `src/engine/novo/dados/movimentos/desenvolvimento-em-pe-halteres.json`.
- Animação: `src/engine/novo/exercicios/desenvolvimento-em-pe-halteres.ts`, sobre o núcleo dos desenvolvimentos (`exercicios/empurrar-para-cima.ts`), com a variação nova `'halteres-em-pe'` (a mudança está descrita em `desenvolvimento-unilateral.md`, nesta pasta). Regras novas: `src/engine/novo/regras/desenvolvimentos-em-pe.ts`.
- Quadros grandes: `../quadros/desenvolvimento-em-pe-halteres.png`. **Sem folha**: o exercício não tinha animação.

## Onde os números saem

A ficha da técnica diz que é "o mesmo movimento do desenvolvimento sentado, em pé", sem número. Os números saíram das animações aprovadas parecidas, cada linha com a fonte: a pegada, o cotovelo 30° à frente embaixo e o erro de descer pouco (desenvolvimento sentado com halteres); a postura em pé, o braço em cima a 79° e os erros de arquear e de jogar o peso com as pernas (desenvolvimentos em pé com elástico e com kettlebell). Como no unilateral com halter, o cartão pede **"na altura dos ombros"** (o sentado pede "das orelhas"): o úmero desce a 52° abaixo da horizontal, e o centro da mão fica 5,7 cm acima da ponta do ombro. No topo, o cotovelo vai 70° à frente (visto de cima) para a frente do ombro não sumir de lado (ver `desenvolvimento-unilateral.md`).

## O que a fonte pede × o que o boneco faz (medido) × confere?

| O que a ficha da técnica (e o cartão) pede | Selo | O que o boneco faz (medido) | Confere? |
|---|---|---|---|
| Em pé, pés na largura do quadril, joelhos levemente soltos | consenso | cada pé a 9 cm do meio, parados (0 cm); joelhos a 8° | sim |
| Halteres na altura dos ombros | consenso | embaixo, o centro de cada mão fica 5,7 cm acima da ponta do ombro (limite: ±6 cm) | sim |
| Palmas para a frente, cotovelos um pouco à frente do corpo | consenso | palmas para a frente, cabo atravessado; embaixo, o cotovelo fica 30° à frente do plano do corpo | sim |
| Abdômen e glúteos firmes, sem arquear a lombar | consenso | a lombar não sai da curva de repouso (0°); a base do pescoço não se move (0 cm) | sim |
| "As pernas ficam paradas" (cartão) | consenso | os joelhos ficam a 8° o ciclo todo, dos dois lados | sim |
| Empurrar até quase estender acima da cabeça | consenso | os antebraços ficam na vertical (0°); no topo, o cotovelo dobra 11° e o halter fica a 5,8 cm da vertical do ombro | sim |
| No alto, sem bater um halter no outro | consenso | pausa de 0,4 s; as pontas de dentro dos halteres ficam a no mínimo 7,2 cm uma da outra; a carga passa a 6,7 cm da cabeça | sim |
| Descida ~2 s, até a altura dos ombros | consenso | 2,0 s, até o mesmo ponto de baixo (o ciclo emenda: 0 cm); subida em 1,3 s (a do sentado); ritmo suave (8,5% da velocidade de pico, limite 25%) | sim |
| Equilíbrio (mecânica) | consenso | o centro de massa (corpo + halteres) anda de −3,2 a 2,3 cm do meio do pé | sim |

**Conferência automática: 0 falha, 2 avisos.** (1) As linhas da ficha de movimento que são escolha de desenho (`cervical`, `cabeca`, `braco.topo.frente`). (2) O modo Músculos abre de lado (35 cm², o pior dos três instantes; 72 cm² em cima); de frente, a frente do ombro aparece embaixo (76 cm²) e some no meio e em cima (0 cm²).

## As vistas

**De lado** (padrão): o caminho do halter, o antebraço na vertical, a lombar e os joelhos (os dois primeiros erros). **De frente**: os dois halteres subindo na linha dos ombros sem se tocar, e a descida curta.

## Erros (os três do cartão, com o mesmo título e na mesma ordem)

| Erro (texto do app) | Vista | O que o boneco faz (medido) |
|---|---|---|
| Arquear a lombar | de lado | no topo, a lombar arqueia 20°, as costas de cima estendem 8° e a bacia inclina 6° à frente: o tronco inclina para trás (a base do pescoço anda 6,8 cm) |
| Embalo das pernas | de lado | embaixo, os joelhos dobram 30° (o certo: 8°) e o tronco inclina 6° à frente; na subida eles estendem e empurram (a consequência visível que o cartão descreve: "os joelhos dobram e empurram") |
| Descer pouco | de frente | a descida para com o úmero 35° acima da horizontal: os halteres ficam 49 cm acima da ponta do ombro, acima da cabeça |

Os três são pose; nenhum ficou de fora.

## O equipamento

- **Halteres:** o sextavado de 25 lb da tabela de objetos, um em cada mão, como no desenvolvimento sentado aprovado.

## Correções já feitas que esta animação respeita

Não há correção registrada para este exercício em `correcoes-ja-feitas.md`. O cartão pede "palmas para a frente ou uma para a outra": ficou a primeira, a do desenvolvimento sentado aprovado.

## O que não ficou bom

- **De lado, embaixo, o halter de perto fica na frente do queixo** (ele está fora da cabeça, a 6,7 cm dela; é a projeção da vista), e **no topo o braço passa na frente do rosto**, como nos desenvolvimentos em pé aprovados.
- **O de trás quase some de lado**: o halter esquerdo fica escondido atrás da cabeça e do braço direito; a vista de frente mostra os dois.
