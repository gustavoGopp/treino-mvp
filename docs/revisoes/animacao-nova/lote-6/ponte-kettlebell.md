# Lote 6 · Ponte de glúteo com kettlebell (`ponte-kettlebell`)

De 15/11/2026. **Ainda não foi revista pelo Gustavo.**

- Ficha da técnica: `docs/pesquisa/animacoes/ponte-kettlebell.md`. Texto do app: `src/conteudo/exercicios/ponte-kettlebell.json` (só leitura). Animação de hoje: `src/engine/exercicios/ponte-kettlebell.ts`; conferência dela: `docs/revisoes/catalogo/conferencia/kettlebell.md`.
- Ficha de movimento: `src/engine/novo/dados/movimentos/ponte-kettlebell.json`.
- Animação: `src/engine/novo/exercicios/ponte-kettlebell.ts`, sobre o núcleo das pontes (`exercicios/ponte.ts`, com `carga: 'kettlebell'`). O kettlebell é a peça `kettlebell` do gerador realista (`equipamento.ts`, `formaDoKettlebell`), com as medidas de `dados/objetos.json`.
- Regras: as da ponte e as duas da carga (`regras/pontes.ts`: `carga-nas-duas-maos`, `carga-apoiada-no-quadril`).
- Folha: `../prototipos/folha-ponte-kettlebell.png`. Quadros grandes: `../quadros/ponte-kettlebell.png`.

## Como a pose é montada

O corpo é o da ponte sem carga (`ponte-gluteo.md`). O kettlebell:

1. **Deitado de lado** (a ficha), com a base para os pés e a alça para a cabeça, inclinada 25° abaixo da horizontal embaixo (escolha de desenho: ele tomba para o lado da barriga). Embaixo, a bola assenta onde fica mais baixa, entre a barriga e as coxas (a dobra do quadril), descendo na vertical até encostar; a alça não pode entrar na barriga (se encostasse, a bola subiria).
2. **Daí em diante, preso à bacia:** as mãos o seguram e ele sobe e gira com o quadril. Primeiro tentei achá-lo de novo a cada quadro (descendo até encostar e tombando até a alça tocar a barriga), mas os pontos da superfície do Boneco são espaçados e o kettlebell tremia (a mão saltava 50% a 100% da velocidade de pico); preso à bacia, ele fica encostado (folga medida de 0 cm em todo o ciclo) e liso.
3. **As mãos:** cada mão segura um lado da alça (a correção de 04/11: "o kettlebell nunca fica solto entre as mãos; a alça passa pelas duas mãos").
4. **Os cotovelos:** embaixo, o braço fica deitado no chão ao lado do corpo (o ponto mais baixo do braço a 0,3 cm do chão; a direção do cotovelo sai disso). É a correção de 10/11 da ponte com halter ("o braço está estranho": cotovelos abertos e no ar), que ficou pendente nesta ponte.

Contatos declarados: `pe.R`, `pe.L` e `costas` (esta última medida pela regra `ombros-e-cabeca-no-chao`; ver `ponte-gluteo-halter.md`).

## O que a fonte pede × o que o boneco faz (medido) × confere?

| O que a ficha da técnica pede | Selo | O que o boneco faz (medido) | Confere? |
|---|---|---|---|
| Kettlebell deitado de lado sobre o quadril | consenso | a bola na dobra do quadril (embaixo, centro a 6 cm do meio dos quadris para o lado da cabeça e 26 cm acima deles); folga até o corpo de 0 cm no ciclo; a distância do centro dela ao meio dos quadris fica em 26,5 cm (não muda) | sim |
| As duas mãos seguram para ele não rolar | consenso | cada pegada a 0 cm do lado da alça que segura; as pegadas a 12,3 cm uma da outra (a largura da alça) | sim |
| Cotovelos no chão (correção de 10/11, da ponte com halter) | consenso | embaixo, o braço deitado no chão (o ponto mais baixo a 0,3 cm; o centro do cotovelo a 4,4 cm, a 26 cm do meio do corpo); no topo, o cotovelo sobe a 30,6 cm | **em parte**: no topo o cotovelo fica no ar (ver "o que não ficou bom") |
| De costas, joelhos dobrados, pés na largura do quadril, calcanhares a cerca de um palmo | consenso | tornozelos a 16,7 cm; calcanhar a 15,4 cm do glúteo | em parte (o palmo, como na ponte) |
| Subida até ombros, quadril e joelhos em linha; pausa ~1 s; descida ~2 s até o quadril quase no chão | consenso | 179,5° no topo; glúteo de 1,5 a 19,4 cm do chão; 1,2 s, 1 s, 2 s | sim |
| Sem arquear a lombar; ombros e cabeça no chão | consenso | lombar 0°; costas de 0 a 0,4 cm, cabeça a 0 cm; o ombro anda 1,3 cm | sim |

Conferência automática (homem): **0 falha, 1 aviso**. Ritmo 10,5% (ok); cotovelo até 102°; elevação do braço até 51°; o corpo não passa do chão (0 cm, também nos erros). No corpo da mulher, também 0 falha. O aviso: provisórios `quadril.folgaEmbaixo`, `ombro.z`, `kettlebell.tomba` (25°), `maos.cotoveloNoChao` (0,3 cm), `maos.poloCabeca`, `maos.alcance` e `maos.paraFora` (estes dois só servem para achar a dobra com os braços no chão).

## Erros

| Erro (texto do app) | O que o boneco faz (medido) |
|---|---|
| Arquear a lombar no topo | a lombar arqueia 22° e o quadril fica com 16,5° de flexão; a barriga sobe e o kettlebell sobe junto, sem entrar nela (nos erros ele é posto de novo em cima do corpo a cada quadro) |
| Empurrar pela ponta dos pés | o calcanhar sobe a 12,8 cm do chão, a bola do pé no lugar |
| Subir pouco | o quadril para em 40% do caminho (glúteo a 8,5 cm) |

## Correções já feitas que esta animação respeita

- 04/11: a alça passa pelas duas mãos (cada mão de um lado da alça).
- 04/11 (ponte): em linha no topo e canela em pé.
- 10/11 (ponte com halter, pendente nesta): cotovelos no chão ao lado da cintura, embaixo.
- A toalha sob o kettlebell não é desenhada, como na de hoje.

## Músculos e vistas

Só o glúteo, principal (biblioteca). Vistas: de lado (padrão; 155 cm²) e de três quartos de frente (`quina`; 115 cm²), como a ponte sem carga: mostra o kettlebell em cima do quadril, as duas mãos e o glúteo. De cima, o corpo deitado não se lê e o glúteo some.

## O que não ficou bom

- **No topo, os cotovelos ficam no ar (30,6 cm do chão).** Com o quadril a 31 cm e o kettlebell em cima dele, a alça fica a 43 cm do chão, e o antebraço mais a mão não alcançam isso com o cotovelo no chão. Tentei: inclinar mais o kettlebell (a alça bate na barriga e a bola sobe), mudar a direção do cotovelo (fica entre 24 e 31 cm) e achar a direção quadro a quadro (o cotovelo saltava e chegava a entrar no tronco). A animação aprovada de hoje também tem os cotovelos no ar; foi isso que o Gustavo achou estranho na ponte com halter.
- O kettlebell de lado, com a alça escondida pelas mãos, aparece de lado como uma bola escura cortada na base; o de hoje era menor e com a alça para cima. As medidas são as da tabela (20,8 cm de bola, 28,2 de altura).
- O calcanhar fica a 15,4 cm do glúteo, como nas outras pontes.
