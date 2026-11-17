# Lote A1 · Supino no chão com halteres (`supino-chao-halteres`)

De 17/11/2026. Primeira animação deste exercício (até aqui ele só aparecia como cartão de texto). Deitado de costas num colchonete, joelhos dobrados, pés no chão; um halter de 25 lb em cada mão. Os braços descem até a parte de trás deles encostar de leve no chão e voltam até estender. **Ainda não aprovada nem ligada às telas** (quem integra registra em `aprovados.ts` e no catálogo do guia).

- Ficha da técnica: `docs/pesquisa/animacoes/supino-chao-halteres.md`. Cartão do app: `src/conteudo/exercicios/supino-chao-halteres.json` (só leitura).
- Ficha de movimento: `src/engine/novo/dados/movimentos/supino-chao-halteres.json`.
- Animação: `src/engine/novo/exercicios/supino-chao-halteres.ts`, sobre o núcleo novo dos exercícios deitado no chão com halteres (`exercicios/deitado-no-chao-halteres.ts`), que o tríceps testa também usa. Regras medidas: `src/engine/novo/regras/deitado-no-chao.ts`.
- Quadros grandes: `../quadros/supino-chao-halteres.png`. **Sem folha** ao lado da animação de hoje: este exercício não tinha animação.

## Onde os números saem

A ficha da técnica dá a técnica em palavras e um número só (cotovelos a meio caminho do tronco, 30–60°, `tecnica.supino-halteres.cotovelos`). Como não há animação de hoje, o que a ficha não dá em número saiu das animações aprovadas parecidas, com selo `desenho` e fonte `desenho`, e cada linha da ficha de movimento diz de onde: o braço em cima e a pegada (supino reto aprovado), o joelho a 90° e o lugar dos ombros na cena (abdominal no chão aprovado). **O fim da descida não é um ângulo escolhido:** o braço desce até a pele da parte de trás dele (da metade do braço ao cotovelo) encostar no chão, medido na superfície do Boneco (`braco.encosta` = 0 cm).

## O que a fonte pede × o que o boneco faz (medido) × confere?

| O que a ficha da técnica (e o cartão) pede | Selo | O que o boneco faz (medido) | Confere? |
|---|---|---|---|
| Deitado no chão, joelhos dobrados, pés no chão | consenso | costas, cabeça e glúteo no tampo do colchonete (0 cm de folga, nos quadros conferidos); joelhos a 90°; os pés no chão (fora do colchonete), parados no ciclo (0 cm) | sim |
| "Um colchonete, se tiver" (cartão) | consenso | o colchonete da tabela (100 × 50 × 1,5 cm, medidas provisórias da tabela) vai de 3 cm além da cabeça até o glúteo | sim |
| Halteres acima do peito, braços estendidos | consenso | em cima, o cotovelo dobra 10°, o braço fica a 80° acima da horizontal e o halter a 5,3 cm da vertical do ombro | sim |
| Descida controlada, cotovelos a meio caminho do tronco | consenso | 2,3 s; embaixo, o braço faz 45° com o tronco, visto de cima | sim |
| Até a parte de trás dos braços encostar de leve no chão | consenso | embaixo, a pele da parte de trás do braço fica a 0 cm do chão (o cotovelo ao lado do colchonete, centro a 4 cm do chão); no caminho, nunca abaixo de 0 cm. O cotovelo dobra 98° embaixo | sim |
| Antebraço na vertical (do supino reto aprovado) | desenho | desvia no máximo 0° da vertical | sim |
| "Encosta sem quicar" (pausa embaixo) | consenso | pausa de 0,5 s embaixo; o ritmo é suave (salto de 4,1% da velocidade de pico, limite 15%) | sim |
| Sobe até os braços estenderem | consenso | 1,3 s, pelo mesmo caminho; o último quadro emenda no primeiro (0 cm) | sim |
| "Quadril no chão" (cartão) | consenso | a bacia não se mexe (0 cm) e o glúteo fica no colchonete (0 cm) | sim |

Pescoço e cabeça: deitado com a lombar na curva de repouso, o pescoço dobra 16° para trás para a nuca apoiar no colchonete. Com a lombar achatada do abdominal no chão aprovado (15°), seriam 29°; por isso a lombar ficou na curva de repouso.

**Conferência automática: 0 falha, 2 avisos.** (1) As linhas da ficha de movimento que são escolha de desenho (`lombar.base`, `joelho`, `ombro.z`, `colchonete.alemDaCabeca`, `braco.cima`, `pegada.giro`, `carga`). (2) O modo Músculos abre de cima (peito: 462 cm²); de lado o peito aparece pouco (84 cm²), igual ao supino reto aprovado (465 e 84 cm²).

## As vistas

Medido e olhado: **de lado** (padrão do modo Técnica: mostra o braço descendo até o chão e o quadril no chão) e **de cima** (mostra os cotovelos a 45°; é a vista padrão do modo Músculos, 462 cm²). De frente (dos pés) o cotovelo no chão se lê muito bem, mas as coxas tapam o tronco e o peito não aparece (0 cm²): ficou só para o erro de quicar. De três quartos, o peito aparece pouco (77 cm²) e o colchonete ocupa o quadro.

## Erros (os quatro do cartão, com o mesmo título e na mesma ordem)

| Erro (texto do app) | Vista | O que o boneco faz (medido) |
|---|---|---|
| Quicar o cotovelo | de frente | o instante do quique, como pose: o braço bate e amassa 1,2 cm no chão (o certo encosta a 0 cm) e o halter tomba para fora, com o antebraço 18° fora da vertical (a carga sai do controle) |
| Cotovelos em "T" | de cima | o braço fica a 88° do tronco (o certo: 45°); ele também para no chão (a pele a 0 cm) |
| Perder o controle em cima | de lado | em cima, os halteres balançam para o lado do rosto: o antebraço sai 18° da vertical e o halter anda 10 cm para a cabeça |
| Levantar o quadril | de lado | o glúteo sai 12 cm do colchonete; as costas, a cabeça e os pés ficam onde estão |

O quique é erro de ritmo: o que se desenha é a consequência visível que a ficha e o cartão dão ("bate no chão e usa o rebote"; "sem quicar o cotovelo no chão"), no instante do quique. O tombo do halter para fora é escolha de desenho (a ficha não diz para onde a carga escapa).

## O equipamento

- **Halteres:** o de 25 lb da tabela (o mesmo do supino reto aprovado), um em cada mão, a pegada levemente neutra.
- **Colchonete:** o da tabela de objetos (medidas provisórias, sem fonte lida: já era assim). Os pés ficam fora dele, no chão.

## Correções já feitas que esta animação respeita

Não há correção registrada para este exercício em `correcoes-ja-feitas.md` (ele nunca teve animação). Das correções do supino reto, vale a da cabeça apoiada (aqui, a nuca no colchonete, 0 cm).

## O que não ficou bom

- **O rótulo "encosta sem quicar"** aponta para o cotovelo, e em cima (quadro do começo) o cotovelo está no ar: o texto fala do fim da descida. Ele ajuda no quadro de baixo; em cima, lê-se como uma lembrança.
- **De lado, o fio dos dois rótulos atravessa o braço e a coxa** (a cena deitada ocupa a largura do quadro e os rótulos vão para cima), como no abdominal no chão aprovado.
- **O modo Trajetória mostra só o halter.** Com o cotovelo junto, os dois nomes ficavam um em cima do outro e o fio de um cortava o outro (a cena deitada não deixa lado livre para os nomes); tirei a linha do cotovelo em vez de mexer na disposição dos rótulos, que é comum.
- **No erro de quicar (de frente),** o fio do título passa por cima do joelho até o cotovelo esquerdo.
- **O colchonete** tem as medidas provisórias da tabela (100 × 50 cm): é curto, e os pés ficam no chão.
