# Lote A1 · Crucifixo com halteres no banco plano (`crucifixo-halteres`)

De 17/11/2026. Primeira animação deste exercício: até aqui o app mostrava só o cartão de texto. **Ainda não foi revisto pelo Gustavo.** Não está em `aprovados.ts` nem no catálogo do guia (quem integra faz isso).

- Ficha da técnica: `docs/pesquisa/animacoes/crucifixo-halteres.md`. Texto do app: `src/conteudo/exercicios/crucifixo-halteres.json` (só leitura). Não há animação de hoje deste exercício.
- Ficha de movimento: `src/engine/novo/dados/movimentos/crucifixo-halteres.json`.
- Animação: `src/engine/novo/exercicios/crucifixo-halteres.ts`, sobre o núcleo novo dos crucifixos deitados (`exercicios/crucifixo-deitado.ts`, que o crucifixo inclinado também usa). O braço sai de `bracoNoArco` (`exercicios/polia-bracos.ts`, o mesmo do crucifixo na polia, sem mudança).
- Regras medidas novas: `src/engine/novo/regras/crucifixos.ts` (`crucifixo-cotovelo-fixo`, `crucifixo-arco`, `crucifixo-halteres-acima-do-peito`, `crucifixo-cotovelos-na-altura-do-tronco`, `crucifixo-deitado-no-banco-reto`); reaproveitadas: `supino-inclinado-halteres-nao-batem` e `carga-livre-do-corpo-e-do-banco`.
- Quadros grandes: `../quadros/crucifixo-halteres.png`. Sem folha ao lado da de hoje (não existe animação de hoje).

## Como a pose é montada

O corpo deita no banco reto da tabela de objetos como no supino reto aprovado: o banco é posto pela cabeça (o topo dela a 3 cm da ponta), os pés no chão um pouco mais abertos que o quadril. Diferente do supino reto, a bacia e o pescoço não vêm prontos: a bacia inclina e o quadril desce até as costas e o glúteo entrarem 1 cm no estofado, e o pescoço dobra até a nuca apoiar (com a pose fixa do supino reto, as costas ficavam 2,6 cm e a cabeça 7,7 cm acima do banco, e a ficha pede escápulas encostadas). Essa conta vai guardada (`calibragens.ts`, chave `crucifixo-halteres:deitado`).

O braço gira pela linha do ombro ao centro da pegada, no tórax, com o cotovelo sempre dobrado 25° e apontando para fora e para o chão (como num abraço). A linha vai 10° para o lado dos pés, para os halteres ficarem acima do peito, e não do ombro. Palmas uma para a outra: o halter fica ao comprido do corpo. O começo do arco é calculado pela folga entre os halteres (3 cm entre as cabeças de dentro); o fim, pela altura do cotovelo (2 cm abaixo do centro do ombro, medido na direção do peito: "cotovelos mais ou menos na altura do tronco").

## O que a fonte pede × o que o boneco faz (medido) × confere?

| O que a ficha da técnica (e o cartão) pede | Selo | O que o boneco faz (medido) | Confere? |
|---|---|---|---|
| Deitado no banco, pés firmes no chão | consenso | costas, cabeça e glúteo entram 1 cm no estofado o ciclo todo; pés e quadril parados (0 cm) | sim |
| Escápulas encostadas no banco | consenso | a clavícula fica 9,6° atrás e para baixo (a mesma retração do supino reto) e as costas apoiadas (1 cm) | sim |
| Em cima: halteres acima do peito, palmas uma para a outra | consenso | o halter fica 61,7 cm acima do ombro (na vertical), 7 cm para o lado dos pés e 8,5 cm para dentro; o halter sai 2,1° do plano do meio do corpo | sim |
| Em cima: sem encostar um halter no outro | consenso | 3 cm entre as cabeças de dentro | sim |
| Cotovelos levemente dobrados e fixos | consenso | o cotovelo dobra 25° do começo ao fim (variação 0°) | sim |
| Abre em arco; volta pelo mesmo arco, como num abraço | consenso | o halter fica sempre a 62,7 cm do ombro (variação 0 cm); a volta é o mesmo caminho | sim |
| Embaixo: cotovelos mais ou menos na altura do tronco, peito alongado | consenso | o centro do cotovelo fica 2 cm abaixo do centro do ombro; o halter, 9,7 cm acima dele e 56,6 cm acima do chão (o tampo do banco está a 43,5 cm) | sim |
| O halter não bate no corpo nem no banco | consenso | no mínimo 0,4 cm da pele e 39 cm do banco | sim |

Os tempos (2,5 s descendo, 0,45 s embaixo, 1,5 s subindo) são escolha de desenho: a ficha não dá número; vêm do supino reto aprovado.

Conferência automática (`node scripts/animacao-nova/conferir.mjs crucifixo-halteres`): **0 falha, 2 avisos.** (1) Os provisórios: a posição do corpo no banco (copiada do supino reto ou calculada), a largura dos pés, a retração das escápulas, a direção do cotovelo e a carga, que a ficha não dá em número. (2) Músculos: de cima, 460 cm² do peitoral à mostra (é a vista do modo Músculos); na vista de três quartos só 76 cm², por isso ela não serve ao modo Músculos (o app usa a de cima sozinho). Ritmo 3,5% (ok). Supinação do antebraço até 71,9° (palmas uma para a outra com o cotovelo para fora), dentro da amplitude. O corpo entra até 1,6 cm no estofado (tolerância 2,5).

## As vistas (escolhidas por medida)

Medido o caminho do halter na fase de descida, em fração da largura do palco, e a área do peitoral virada para quem olha:

| Vista | caminho do halter | peitoral à mostra | o corpo se lê? |
|---|---|---|---|
| por trás (pela cabeça) | 0,49 | 123 cm² | não: o corpo visto pela cabeça |
| frontal (pelos pés) | 0,46 | 0 cm² | não: visto pelos pés, a cabeça some atrás do peito |
| três quartos de trás | 0,46 | 85 cm² | mal: o banco tapa o corpo |
| **três quartos (quina)** | **0,38** | 76 cm² | **sim** |
| **de cima** | 0,32 | **460 cm²** | sim |
| lateral | 0,19 | 84 cm² | sim, mas o braço de perto aponta para quem olha |

O modo Técnica abre em **três quartos**: o maior caminho entre as vistas em que o corpo se lê (o dobro da lateral). A frontal e a de trás mostram o arco melhor, mas veem o corpo pelos pés ou pela cabeça (o guia manda trocar essas vistas). A segunda é **de cima**, que é a do modo Músculos (o peitoral inteiro) e mostra o arco das mãos abrindo. Os erros "dobrar e esticar", "descer demais" e "escápulas" ficam na **frontal**, onde o cotovelo dobrado, os halteres abaixo da linha do tronco e os ombros subindo se leem de relance; por isso o guia ganha um terceiro botão (como no crucifixo na polia). "Bater os halteres" fica de cima.

O corpo ocupa 65% × 77% do palco em três quartos, 70% × 77% de cima e 79% × 71% na frontal (o búlgaro aprovado: 53% × 73% de lado; o supino reto: 57% × 65%).

## Erros (os quatro do cartão, na ordem dele)

| Erro (texto do app) | Vista | O que o boneco faz (medido) |
|---|---|---|
| Dobrar e esticar os cotovelos | frontal, no fundo | o cotovelo dobra de 25° a 90° na descida, desce à mesma altura do certo (2 cm abaixo do ombro) e o halter fica a 45,5 cm do ombro (o certo: 62,7), 21,7 cm mais alto: vira supino e o peito sai do alongamento |
| Descer demais | frontal, no fundo | o cotovelo desce 13 cm abaixo do centro do ombro (o certo: 2) e o halter fica 33 cm acima do chão, 10,5 cm abaixo do tampo do banco |
| Bater os halteres em cima | de cima, no topo | os braços fecham até as pontas dos halteres se encostarem (0 cm; o certo: 3 cm) |
| Tirar as escápulas do banco | frontal, no topo | a clavícula vai 5° para cima e para a frente (de 9,6° a 14,6°) e a ponta do ombro sobe 3,5 cm do banco |

Nenhum erro ficou de fora: os quatro têm consequência visível.

## O equipamento

- **Banco reto** da tabela de objetos (122 cm, 43,5 cm de altura), sem peça nova.
- **Halter** de 25 lb da tabela (o mesmo dos supinos), ao comprido do corpo.

## Correções já feitas que esta animação respeita (`correcoes-ja-feitas.md`)

- Não há correção sobre este exercício (é a primeira animação). Respeitadas as dos parentes: a cabeça a 3 cm da ponta do banco (supino reto, pedido de 15/11/2026) e, dos crucifixos na polia, o cotovelo "levemente dobrado e fixo" e a vista de cima para o arco das mãos (05/11/2026).

## Mudanças em arquivos comuns

- Nenhuma nos arquivos comuns do motor. Linhas acrescentadas: `exercicios/registro.ts` e `regras/registro.ts`.

## O que não ficou bom

- **Três quartos, no fundo:** o braço de perto aponta para quem olha e o halter dele fica por cima da ponta do banco, perto da cabeça; o arco do braço de longe se lê melhor que o do braço de perto. Tentei a lateral (o braço de perto vira um toco) e a frontal (o corpo visto pelos pés).
- **Três quartos, em cima:** os dois halteres se sobrepõem e a mão de perto tapa o rosto.
- **O rótulo "cotovelos fixos" aponta para o punho de perto, e não para o cotovelo:** com o ponto no cotovelo, o de longe some atrás do peito embaixo e o de perto abre o quadro até o corpo ficar com 58% da largura.
- **Erro "tirar as escápulas":** a diferença é pequena (o ombro sobe 3,5 cm), como no erro parecido do supino reto aprovado; quem mostra é a linha vermelha do ombro, mais que o corpo. O nome aponta para o cotovelo (no ombro, o quadro abria até 53%).
- **Erro "bater os halteres":** de cima, o fio do título passa por cima da cabeça.
- **Supinação de 72°:** é o que a pegada com as palmas uma para a outra pede com o cotovelo para fora; fica abaixo da média da tabela (87,5°), mas é mais que nos supinos. Vale o olho de quem conhece o movimento.
