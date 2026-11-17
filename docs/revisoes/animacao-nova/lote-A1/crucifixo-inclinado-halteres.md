# Lote A1 · Crucifixo inclinado com halteres (`crucifixo-inclinado-halteres`)

De 17/11/2026. Primeira animação deste exercício: até aqui o app mostrava só o cartão de texto. **Ainda não foi revisto pelo Gustavo.** Não está em `aprovados.ts` nem no catálogo do guia (quem integra faz isso).

- Ficha da técnica: `docs/pesquisa/animacoes/crucifixo-inclinado-halteres.md` (que manda seguir "o mesmo movimento do crucifixo com halteres, no banco inclinado"). Texto do app: `src/conteudo/exercicios/crucifixo-inclinado-halteres.json` (só leitura). Não há animação de hoje deste exercício.
- Ficha de movimento: `src/engine/novo/dados/movimentos/crucifixo-inclinado-halteres.json`.
- Animação: `src/engine/novo/exercicios/crucifixo-inclinado-halteres.ts`, sobre o núcleo dos crucifixos deitados (`exercicios/crucifixo-deitado.ts`, feito com o crucifixo no banco plano).
- O corpo no banco: o mesmo do supino inclinado aprovado, pela função `sentar` de `exercicios/supino-inclinado.ts` (exportada agora; ver "Mudanças em arquivos comuns").
- Regras medidas: as do núcleo (`regras/crucifixos.ts`: `crucifixo-cotovelo-fixo`, `crucifixo-arco`, `crucifixo-halteres-acima-do-peito`, `crucifixo-cotovelos-na-altura-do-tronco`) e, reaproveitadas, `supino-inclinado-encosto-30`, `supino-inclinado-apoiado-no-banco`, `supino-inclinado-halteres-nao-batem` e `carga-livre-do-corpo-e-do-banco`.
- Quadros grandes: `../quadros/crucifixo-inclinado-halteres.png`. Sem folha ao lado da de hoje (não existe animação de hoje).

## Como a pose é montada

A pessoa e o banco são os do supino inclinado aprovado: o banco regulável da tabela (Rogue Adjustable Bench 3.0) com o encosto a 30°, o quadril, a bacia e o pescoço resolvidos até o glúteo, as costas e a nuca apoiarem (a conta já guardada, `supino-inclinado:sentado`), os pés no chão à frente. Os braços são os do crucifixo no banco plano (cotovelo fixo a 25°, palmas uma para a outra, 3 cm entre os halteres em cima, cotovelo 2 cm abaixo do ombro embaixo), com uma diferença: em cima, a linha do ombro ao halter vai 20° para o lado da cabeça, para o braço ficar perto da vertical e o halter acima do peito (com o tronco a 30°, a mesma linha do banco plano poria o halter acima da barriga); embaixo, ela volta a 10° para o lado dos pés, com os halteres na altura do peito, como pede o cartão.

## O que a fonte pede × o que o boneco faz (medido) × confere?

| O que a ficha da técnica (e o cartão) pede | Selo | O que o boneco faz (medido) | Confere? |
|---|---|---|---|
| Banco a ~30° | um estudo | o encosto fica a 30° do chão (a linha do quadril ao ombro, a 21,9°) | sim |
| Deitado no banco inclinado, pés firmes no chão | consenso | costas e glúteo entram 1 cm no estofado e a cabeça 0,7 cm, o ciclo todo; pés e quadril parados (0 cm) | sim |
| Escápulas juntas e para baixo | consenso | a clavícula fica de 9,6° a 11° atrás e para baixo (a mesma retração do supino inclinado) | sim |
| Em cima: halteres acima do peito, palmas uma para a outra, sem bater | consenso | o halter fica 61,7 cm acima do ombro (na vertical), 8,4 cm para o lado dos pés e 6,8 cm para dentro; sai 7,3° do plano do meio do corpo; 3 cm entre as cabeças de dentro | sim |
| Cotovelos levemente dobrados (mantenha o ângulo) | consenso | o cotovelo dobra 25° do começo ao fim (variação 0°) | sim |
| Abrir e fechar em arco, sem virar supino | consenso | o halter fica sempre a 62,7 cm do ombro (variação 0 cm) | sim |
| Embaixo: halteres perto da altura do peito, peito alongado, sem descer além do confortável | consenso | o centro do cotovelo fica 2 cm abaixo do centro do ombro (medido na direção do peito); o halter, 9,7 cm acima dele | sim |
| Abertura em ~2 a 3 s; pausa curta embaixo | consenso | 2,5 s; 0,45 s; fechamento em 1,5 s (escolha de desenho: o cartão não dá número) | sim |
| O halter não bate no corpo nem no banco | consenso | no mínimo 0,4 cm da pele e 39,2 cm do banco | sim |

Conferência automática (`node scripts/animacao-nova/conferir.mjs crucifixo-inclinado-halteres`): **0 falha, 2 avisos.** (1) Os provisórios: a direção do cotovelo e a carga. (2) Músculos: de cima, 455 cm² do peitoral à mostra (é a vista do modo Músculos); em três quartos, 103 cm² (não serve ao modo Músculos). Ritmo 3,5% (ok). Elevação do braço até 106° em cima; supinação do antebraço até 78,8° (média da tabela 87,5°). O corpo entra até 1,5 cm no estofado (tolerância 2,5).

## As vistas (escolhidas por medida)

| Vista | caminho do halter | peitoral à mostra | o corpo se lê? |
|---|---|---|---|
| frontal | 0,45 | 135 cm² | **não serve**: no cor de pele, o encosto é pintado por cima do tronco e da cabeça (o mesmo acontece no supino inclinado aprovado, que não usa essa vista) |
| por trás | 0,45 | 0 cm² | não: o corpo atrás do encosto |
| três quartos de trás | 0,40 | 46 cm² | mal: o encosto tapa o tronco |
| **três quartos (quina)** | **0,28** | 103 cm² | **sim**: o corpo, o banco com a marca de 30° e o arco |
| lateral | 0,27 | 84 cm² | sim, mas o braço de perto aponta para quem olha |
| **de cima** | 0,25 | **455 cm²** | sim |

O modo Técnica abre em **três quartos**, e a segunda vista é **de cima** (a do modo Músculos). A frontal mostrava o arco melhor (0,45) e lia bem no cinza, mas no cor de pele o encosto cobre o corpo: é defeito do desenho daquela vista com o banco inclinado, não desta animação, e não mexi no motor comum para isso. Os erros "virar supino" e "descer demais" ficam em três quartos; "soltar as escápulas" fica de lado, como o erro parecido do supino reto aprovado (o guia ganha um terceiro botão, Lateral).

O corpo ocupa 59% × 77% do palco em três quartos, 62% × 77% de cima e 69% × 82% de lado.

## Erros (os três do cartão, na ordem dele)

| Erro (texto do app) | Vista | O que o boneco faz (medido) |
|---|---|---|
| Virar supino | três quartos, no fundo | o cotovelo dobra de 25° a 90° na abertura, desce à mesma altura do certo e o halter fica a 45,5 cm do ombro (o certo: 62,7), 20,7 cm mais alto: o movimento vira empurrar |
| Descer demais | três quartos, no fundo | o cotovelo desce 13 cm abaixo do centro do ombro (o certo: 2) e o halter fica 13,9 cm abaixo do ombro, na direção do peito (o certo: 9,7 cm acima) |
| Soltar as escápulas | lateral, no topo | a clavícula vai para cima e para a frente (de 11° a 16°) e a ponta do ombro sobe 3,7 cm do encosto |

Nenhum erro ficou de fora: os três têm consequência visível.

## O equipamento

- **Banco regulável** com o encosto a 30° e a marca do ângulo: a mesma peça e a mesma montagem do supino inclinado (`pecas-de-cena/banco-regulavel.ts`, `BANCO_DO_SUPINO`), sem mudança.
- **Halter** de 25 lb da tabela.

## Correções já feitas que esta animação respeita (`correcoes-ja-feitas.md`)

- Não há correção sobre este exercício (é a primeira animação). Do supino inclinado aprovado: o encosto a 30° com a marca do ângulo e a pessoa apoiada no banco (a mesma conta). Dos crucifixos na polia: cotovelo "levemente dobrado e fixo" e a vista de cima para o arco (05/11/2026).

## Mudanças em arquivos comuns

- `exercicios/supino-inclinado.ts` (animação aprovada): só exportação, sem mudar o que ela desenha. `function sentar` e `interface Sentado` passaram a ser exportadas, com um comentário. O crucifixo chama `sentar` (e não `sentado`, que guarda o resultado na própria animação do supino), para a calibração `supino-inclinado:sentado` ser pedida também por ele e ficar no arquivo de preparo dele; com `sentado`, o preparo do supino inclinado perdia a calibração guardada. Conferido: `src/engine/novo/dados/preparo/supino-inclinado.json` não muda, e `npm run conferir:animacao` segue com 0 falha nas 92 animações.
- Linha acrescentada em `exercicios/registro.ts`.

## O que não ficou bom

- **Três quartos, em cima:** os dois halteres se sobrepõem e o braço de perto tapa parte do rosto.
- **Três quartos, no erro "virar supino":** o braço de perto, dobrado, fica na frente do encosto e a linha tracejada do certo quase não aparece; o braço de longe mostra o erro melhor. A frontal mostrava os dois braços dobrados de relance, mas não serve (ver as vistas).
- **Os rótulos de três quartos apontam para a mão de longe e o punho de perto**, e não para o cotovelo: no cotovelo, o de longe some atrás do peito embaixo.
- **Erro "soltar as escápulas":** a diferença é pequena (o ombro sobe 3,7 cm), como no supino reto aprovado; quem mostra é a linha vermelha. O nome aponta para o cotovelo (no ombro, o quadro abria demais).
- **Em cima, a linha do ombro ao halter fica 8° da vertical** (20° para o lado da cabeça, num tronco a 30°): escolha de desenho para o halter ficar acima do peito; a ficha não dá número.
