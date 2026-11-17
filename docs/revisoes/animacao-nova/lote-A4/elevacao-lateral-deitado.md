# Lote A4 · Elevação lateral deitado de lado com halter (`elevacao-lateral-deitado`)

De 17/11/2026. Primeira animação deste exercício (até aqui ele só aparecia como cartão de texto). Deitado sobre o lado esquerdo, no chão, a cabeça apoiada no braço de baixo (estendido acima da cabeça), os dois joelhos dobrados, a perna de cima deitada sobre a de baixo. A mão de cima segura o halter leve: embaixo, o braço fica à frente do corpo e o halter pende para o chão na frente da coxa; ele sobe em arco, um pouco à frente do plano do corpo, até quase a vertical, com o cotovelo levemente dobrado. **Ainda não aprovada nem ligada ao app** (quem integra registra em `aprovados.ts` e no catálogo do guia).

- Ficha da técnica: `docs/pesquisa/animacoes/elevacao-lateral-deitado.md`. Cartão do app: `src/conteudo/exercicios/elevacao-lateral-deitado.json` (só leitura).
- Ficha de movimento: `src/engine/novo/dados/movimentos/elevacao-lateral-deitado.json`.
- Animação: `src/engine/novo/exercicios/elevacao-lateral-deitado.ts`. O corpo deitado é o do núcleo da abdução aprovada (`troncoDeLado`, `pernaNoPiso`, `direcao` e `eixosDaBacia` de `quadril-deitado-de-lado.ts`, como estão, com a opção `deFrente` que a adução aprovada já usa); o braço que sobe é o das elevações aprovadas (`noPlano`, de `elevar-o-braco.ts`, já exportada), no referencial do tórax deitado. A folga do halter até a coxa usa `folgaDasPernas` (`dobrar-o-quadril.ts`); a perna de cima deita sobre a de baixo pela `folgaEntreAsPernas` (`regras/quadril-abrir-e-fechar.ts`, já exportada). **Nenhum arquivo comum mudou.**
- Regras: três novas em `src/engine/novo/regras/elevacao-lateral-deitado.ts` (`elevacao-deitado-braco-quase-vertical`, `elevacao-deitado-cotovelo-levemente-dobrado`, `elevacao-deitado-halter-perto-da-coxa`), uma linha em `regras/registro.ts`. As do corpo deitado já existiam e servem igual: `quadril-deitado-de-lado-no-chao`, `quadril-empilhado` e `quadril-pernas-sem-se-atravessar` (`regras/quadril-abrir-e-fechar.ts`).
- As contas da pose parada (as pernas e a elevação embaixo) passam por `calibragem` e ficam no preparo (`dados/preparo/elevacao-lateral-deitado.json`).
- Quadros grandes: `../quadros/elevacao-lateral-deitado.png`. Sem folha (não há animação de hoje).

## Onde os números saem

A ficha da técnica dá duas linhas (deitado de lado, cabeça apoiada, halter na mão de cima; braço em arco até quase a vertical, cotovelo levemente dobrado; consenso, `17`, G4). O cartão acrescenta a cabeça no braço de baixo, os joelhos dobrados, o braço à frente do corpo e perto da coxa embaixo, e os tempos (~1 s, pausa curta, ~2 s). O resto saiu das animações aprovadas: a **abdução deitado de lado com caneleira** (o corpo deitado no chão, o braço de baixo acima da cabeça, a cabeça apoiada nele, sem colchonete) e a **elevação lateral com halteres** (o halter de 10 lb, o cotovelo a 15°, a folga de 1,5 cm embaixo, o plano do braço). Os números sem fonte numérica são selo `desenho`, com o motivo no campo `o`.

## O que a fonte pede × o que o boneco faz (medido) × confere?

| O que a ficha da técnica (e o cartão) pede | Selo | O que o boneco faz (medido) | Confere? |
|---|---|---|---|
| Deitado de lado, a cabeça apoiada no braço de baixo | consenso | a bacia a 0 cm do chão e o peito a 1,5 cm, o ciclo todo; a pele da cabeça a 0,5 cm da do braço de baixo; o ponto mais baixo do corpo a −0,3 cm (a pele amassa no chão) | sim |
| Joelhos dobrados (cartão) | consenso | as duas coxas 40° à frente da linha do corpo, os joelhos a 84° e 85°; a perna de cima deitada sobre a de baixo (a pele de uma a 0 cm da outra) | sim |
| "Corpo de lado, parado" | consenso | o eixo dos quadris fica na vertical (0°), a bacia anda 0 cm e o peito gira 0° no ciclo | sim |
| Embaixo, o braço à frente do corpo e o halter perto da coxa | consenso | o halter fica a 2,3 cm da pele das pernas (o mais perto no ciclo), 28,6 cm à frente do centro do quadril e 16 cm acima do chão: ele pende para o chão na frente da coxa de cima, 52 cm do ombro em direção aos pés | sim |
| Braço em arco até quase a vertical | consenso | no alto, o braço fica a 22° da vertical: 10° antes dela, no plano do corpo (ainda para o lado dos pés), e 20° à frente do plano do corpo | sim |
| Cotovelo levemente dobrado | consenso | 15° o ciclo todo (de 15° a 15°) | sim |
| ~1 s subindo, pausa curta, ~2 s descendo | consenso | 1,1 s, 0,4 s e 2 s; o ritmo é suave (salto de 11,9% da velocidade de pico, no cotovelo) | sim |

Conferência automática (`node scripts/animacao-nova/conferir.mjs elevacao-lateral-deitado`): **0 falha, 2 avisos.** (1) As linhas da ficha que são escolha de desenho (o chão sem colchonete, o braço de baixo e a mão de cima do núcleo deitado, as pernas, os planos do braço, o giro do cotovelo, a pegada, a folga e a carga). (2) A frente do ombro listrada como "só ajuda", a mesma diferença aceita das outras elevações.

**O plano do braço embaixo:** para o halter ficar à frente do corpo e pendendo para o chão (e não por cima do quadril), o úmero sai do ombro para os pés e para a frente, 105° à frente do plano do corpo; ele passa para o plano da subida (20°) nos primeiros três quartos do caminho. Com a passagem na primeira metade (como na elevação em pé), a volta de 105° para 20° dava um salto de velocidade de 18% no cotovelo (aviso); com três quartos, 12%.

### As vistas

De **frente** (a padrão; o corpo deitado de frente para quem olha): mostra o arco do braço por inteiro, do halter na frente do quadril até quase a vertical, e o corpo parado de lado. É também a padrão do modo Músculos (a lateral do ombro: 39 cm² de frente, 22 cm² de cima). De **cima** (a segunda): mostra o braço à frente do corpo e os joelhos dobrados. De trás, o braço embaixo fica escondido atrás do quadril; de lado (pelos pés), o arco vira uma linha.

## Erros

O cartão tem três erros; os três viraram desenho, na ordem do app.

| Erro (texto do app) | Vista | O que o boneco faz (medido) |
|---|---|---|
| Rolar o corpo ("o tronco gira para ajudar") | três quartos | a bacia e o tronco rolam 30° para trás (o eixo dos quadris vai de 90° para 60° com o chão) e levam o braço junto: no alto, a mão fica 14 cm atrás do centro do quadril (no certo, 27,5 cm à frente dele). As pernas ficam onde estão |
| Jogar o halter ("o embalo tira o trabalho do ombro") | de frente | o halter é jogado além do topo: o braço passa da vertical e vai 24° para o lado da cabeça (o certo para 10° antes dela) |
| Dobrar demais o cotovelo ("o braço encurta") | de frente | o cotovelo dobra 80° (o certo, 15°): a mão fica 34 cm mais baixa no alto |

**"Jogar o halter"** é um erro de ritmo, mas tem consequência visível: como no "Subir alto demais com tranco" aprovado (o impulso joga a perna além do topo), o embalo leva o halter além do ponto certo; deitado de lado, além da vertical, onde o ombro deixa de trabalhar. A animação, que toca, também mostra o braço subindo mais.

O erro de rolar fica de três quartos, como o "Rolar o quadril para trás" da abdução aprovada: de frente, o tronco rolado para trás quase não muda o contorno, e de cima o braço tapa o peito.

## O equipamento

- **Halter sextavado de 10 lb** (`dados/objetos/halter-leve.json`): a ficha pede "um halter leve"; é o menor da tabela e o das elevações aprovadas.
- **Sem colchonete:** o cartão aceita "o chão (com colchonete) ou um banco". O colchonete da tabela (100 × 50 cm, medidas provisórias) é curto para o corpo deitado de lado; como na abdução com caneleira aprovada, o corpo fica no chão. O banco ficou de fora (deitado de lado num banco estreito, o braço de baixo não teria onde apoiar a cabeça).

## Correções já feitas que esta animação respeita (`correcoes-ja-feitas.md`)

- Não há correção registrada para este exercício (ele nunca teve animação).
- **Deitado de lado vira uma faixa achatada** (seção 4, abdução e adução): por isso a segunda vista é a de cima, que mostra o braço à frente do corpo e os joelhos.
- **Achado 3 da revisão de anatomia:** nas elevações laterais, o trapézio de cima fica fora do desenho; a frente do ombro fica listrada ("só ajuda"). `papeis` = `deltLat:R` (principal) e `deltAnt:R` (só ajuda).

## O que não ficou bom

- **De frente, os joelhos dobrados não aparecem:** as coxas vão para quem olha e as canelas para trás, e na projeção de frente as pernas parecem estendidas e um pouco curtas. Não há vista de frente que mostre as duas coisas (o arco do braço fica no plano do corpo, e a dobra do joelho, fora dele). A vista de cima mostra os joelhos dobrados.
- **O corpo ocupa uma faixa baixa do quadro de frente**, como na abdução deitado aprovada: o braço no alto pede a altura do quadro.
- **O modo Trajetória mostra só a mão** (com o cotovelo junto, os dois nomes se atropelavam). O nome "mão" fica à direita, e o fio dele passa rente ao halter no alto.
- **No alto, o fio do rótulo "arco, cotovelo levemente dobrado" desce rente ao antebraço e ao halter** até o cotovelo. Apontar para a mão punha o anel em cima do halter; ficou no cotovelo.
- **O erro de rolar, de três quartos,** deixa o corpo menor no quadro que nas outras vistas.
