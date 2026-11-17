# Lote A2 · Tríceps com elástico preso no alto, como na polia (`triceps-elastico-alto`)

De 17/11/2026. Primeira animação deste exercício (até aqui ele só aparecia como cartão de texto). Em pé, de frente para uma porta fechada, com o meio do tubo com pegadores preso no topo dela pela âncora de porta (do lado de lá); um pegador em cada mão, cotovelos colados ao corpo, mãos na altura do peito; os antebraços descem até os braços ficarem retos. **Ainda não aprovada nem ligada às telas** (quem integra registra em `aprovados.ts` e no catálogo do guia).

- Ficha da técnica: `docs/pesquisa/animacoes/triceps-elastico-alto.md`. Cartão do app: `src/conteudo/exercicios/triceps-elastico-alto.json` (só leitura).
- Ficha de movimento: `src/engine/novo/dados/movimentos/triceps-elastico-alto.json`.
- Animação: `src/engine/novo/exercicios/triceps-elastico-alto.ts`, sobre o núcleo do corpo em pé (`polia-bracos.ts`: `montarEmPe`, `equilibrar`, `polegarDaPegada`, já exportados), a porta com a âncora no alto (`pecas-de-cena/elastico-ancora-no-alto.ts`, a mesma da puxada com elástico) e o pegador na mão (`pecas-de-cena/elastico-pegador.ts`).
- Regra medida nova: `src/engine/novo/regras/triceps-elastico-alto.ts` (`triceps-elastico-ancora-no-alto-a-frente`). As outras regras são as do tríceps na polia com corda (`regras/triceps-corda.ts`), que medem o corpo e servem igual, e as do elástico (`regras/elasticos.ts`).
- Quadros grandes: `../quadros/triceps-elastico-alto.png`. **Sem folha** ao lado da de hoje: este exercício não tinha animação.

## Onde os números saem

A ficha da técnica dá a técnica em palavras (de frente para o ponto alto, cotovelos colados; estender até os braços ficarem retos) e a segurança (só a âncora do fabricante ou a barra fixa, `ng2022`). O cartão acrescenta mãos na altura do peito e o tronco levemente inclinado à frente. Como não há animação de hoje, o que eles não dão em número saiu do **tríceps na polia com corda aprovado** (o corpo, o braço colado, os ângulos do cotovelo, os dois erros) e da **puxada com elástico aprovada** (a âncora no topo da porta e o tubo longe do corpo como cenário). Cada linha da ficha de movimento diz de onde.

A âncora: o cartão aceita a âncora de porta do fabricante ou a barra fixa. Desenhei a âncora de porta, no topo da porta fechada, porque é a peça que o motor já tem (puxada com elástico aprovada) e porque a porta, de lado, fica fina e não cobre o corpo.

## O que a fonte pede × o que o boneco faz (medido) × confere?

| O que a ficha da técnica (e o cartão) pede | Selo | O que o boneco faz (medido) | Confere? |
|---|---|---|---|
| De frente para o ponto alto (âncora do fabricante, porta fechada) | consenso | a alça da âncora fica a 205 cm do chão, 31,3 cm acima do alto da cabeça e 39,3 cm à frente do ponto do corpo mais à frente; em cima, as mãos ficam a 45 cm da porta | sim |
| Uma ponta do elástico em cada mão | consenso | o centro de cada mão fica a 0 cm do pegador; as mãos ficam a 32 a 36 cm uma da outra | sim |
| Cotovelos colados ao corpo | consenso | a pele do braço fica a 0,1 cm da pele do tronco; o braço fica na vertical (15° à frente do eixo do tronco inclinado 15°) | sim |
| Só o cotovelo mexe | consenso | o cotovelo anda 0 cm de cima a embaixo | sim |
| Em cima: cotovelos dobrados, mãos na altura do peito | consenso | o cotovelo dobra 112°; o centro da mão fica 12,9 cm abaixo do acrômio, entre a axila (10,4 cm) e a 10ª costela (31,6 cm) | sim |
| Estender os cotovelos até os braços ficarem retos | consenso | embaixo, o cotovelo dobra 4° | sim |
| Tronco levemente inclinado à frente, parado | consenso | o peito fica a 15° da vertical o ciclo todo; a coluna não muda | sim |
| ~1 s descendo as mãos, pausa curta embaixo, ~2 s de volta | consenso | 1,0 s, 0,5 s e 2,0 s (mais 0,4 s em cima, como o tríceps na polia aprovado); salto de velocidade de 5,9% (limite 15%) | sim |
| O elástico não encosta no corpo nem no rosto | desenho | o tubo passa a no mínimo 2,5 cm da pele (no antebraço, junto do pegador); sobe à frente do rosto | sim |
| O elástico estica sem passar do máximo do fabricante | medida (objetos) | de 1,5 vez (em cima) a 2,3 vezes (embaixo) o comprimento em repouso (o máximo é 3) | sim |

**Conferência automática: 0 falha, 3 avisos.** (1) O elástico está mais esticado embaixo do que no primeiro quadro (o aviso mede "mais esticado no começo"; aqui ele estica ao empurrar, como deve). (2) As linhas de escolha de desenho: `cervical`, `cabeca`, `braco.paraDentro` (do tríceps na polia aprovado), `maos.pronacao` (a pegada), `cabo.inclinacao` (onde fica a porta) e `elastico.noQuadro`. (3) De lado o tríceps aparece pouco (56 cm²); o modo Músculos abre de trás (218 cm²).

## As vistas

As do tríceps na polia aprovado: **de lado** (padrão do modo Técnica: o cotovelo parado, o antebraço descendo e o tubo subindo até a porta) e **de trás** (padrão do modo Músculos, com os cotovelos colados e o tubo subindo pelos dois lados da cabeça até a âncora). De frente a porta fica entre quem olha e o corpo (é pintada atrás dele): não serve.

## A pegada e a porta (escolhas de desenho)

- **A pegada:** o cartão não diz. Com o pegador de lado a lado na mão (palmas para baixo em cima, para trás embaixo; o antebraço 70° pronado), a fita em triângulo sobe pelos dois lados do punho até o tubo, como num pegador de verdade. Com a pegada neutra a fita passaria por cima da mão.
- **A porta:** em cima o tubo sobe das mãos à âncora a 28° da vertical. Com os 20° do cabo do tríceps na polia aprovado, as mãos quase encostavam na porta, porque a âncora (205 cm) fica mais baixa e mais perto que a roldana da polia.

## Erros (o cartão tem três; dois desenhados, na mesma ordem)

| Erro (texto do app) | Vista | O que o boneco faz (medido) |
|---|---|---|
| Cotovelos soltos | de lado | em cima, o braço sobe 45° à frente e sai do lado do tronco, com o cotovelo a 115° (as mãos sobem à altura do ombro, 139,9 cm); ao empurrar, o ombro traz o braço de volta |
| Jogar o tronco | de lado | o peito dobra de 15° a 34° da vertical enquanto as mãos descem, com as costas arredondando 8° |
| Não testar o ponto alto | — | **não desenhado**: é um cuidado antes da série (puxar forte uma vez); na série certa e na errada o movimento é o mesmo, e a consequência (o elástico solto voltando no rosto) é um acidente que a ficha não descreve como posição. Fica para a lista `SEM_DESENHO` do teste da ponte |

## O equipamento

- **Elástico:** o tubo com pegadores de 48 pol da tabela (Rogue; máximo de 3 vezes, TheraBand), preso pelo meio, afinando ao esticar.
- **Porta e âncora:** as da tabela (`dados/objetos/porta.json`; a âncora de porta com medida de fabricante, a porta de 210 × 80 cm). A porta, a âncora e o trecho do tubo a mais de 45 cm das mãos são cenário: ficam fora do enquadramento.

## Correções já feitas que esta animação respeita

Não há correção registrada para este exercício em `correcoes-ja-feitas.md`. Das correções dos exercícios com elástico, valem: o tubo afina ao esticar; a âncora é a de verdade (a porta fechada com a âncora de porta, não o poste: a puxada e o face pull com elástico no motor novo já usam a porta); rótulos fora do corpo, em minúsculas.

## O que não ficou bom

- **Os pegadores quase não aparecem de lado**: com a pegada de lado a lado, o pegador fica de ponta para quem olha e some dentro da mão; aparece de trás (as pontas dos dois lados do punho).
- **No erro "jogar o tronco", a cabeça fica perto do tubo, de lado** (20 cm à frente dela, no fundo da cena; no desenho os dois quase se encostam). É o mesmo erro do tríceps na polia aprovado com o tubo no lugar do cabo.

## Risco de o Gustavo não gostar

**Baixo.** É o tríceps na polia aprovado com a âncora da puxada com elástico aprovada; a técnica confere em tudo e as duas vistas se leem. O ponto mais fraco é o pegador pouco visível de lado.
