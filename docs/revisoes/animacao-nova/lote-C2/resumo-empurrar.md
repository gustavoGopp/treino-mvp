# Lote C2 · Resumo do grupo "empurrar" (as máquinas de empurrar sentado)

De 18/11/2026. Duas peças novas e duas animações novas, que até aqui eram cartões de texto: o **supino na máquina** e o **desenvolvimento na máquina**. Nenhuma está aprovada nem ligada às telas: quem integra registra em `aprovados.ts` e no catálogo do guia (o teste da ponte "todas as animações estão aprovadas e no catálogo" falha na cópia de trabalho, como esperado).

## As peças

Uma função comum, `src/engine/novo/pecas-de-cena/maquina-de-empurrar.ts` (`maquinaDeEmpurrar`), com um modelo para cada máquina (`SUPINO_NA_MAQUINA`, `DESENVOLVIMENTO_NA_MAQUINA`, como a cadeira extensora sai da flexora), e as entradas finas `pecas-de-cena/supino-maquina.ts` e `pecas-de-cena/desenvolvimento-maquina.ts`. Medidas em `dados/objetos/supino-maquina.json` e `dados/objetos/desenvolvimento-maquina.json`. Folhas: `docs/revisoes/animacoes-restantes/pecas/folha-supino-maquina.png` e `folha-desenvolvimento-maquina.png` (o cartão de hoje ao lado, a 96 px e ampliado, a máquina no começo e no fim, de lado, de três quartos e de frente, e a tabela das medidas).

O que as duas têm: o assento que sobe e desce num pé com pino (a regulagem), o encosto parado, a coluna de trás, dois braços independentes que giram cada um no seu eixo com o pegador atravessado na ponta, o came no braço da esquerda e a torre com a pilha de placas ao lado do assento. **A máquina funciona:** o pegador anda num arco em volta do eixo (as mãos vão com ele); o eixo de cada braço é inclinado para dentro e os pegadores se aproximam enquanto empurram; as placas sobem o arco do came.

| Medida | Supino na máquina | Desenvolvimento na máquina | Fonte e tipo |
|---|---|---|---|
| Comprimento × largura | 144 × 144 cm | 164 × 145 cm | medida: Life Fitness SS-CP / SS-SP (catálogo 2026); Hammer Strength, Movement, Technogym e Precor na tabela para comparar |
| Altura total | 163 cm (desenhada ~152) | 185 cm (desenhada ~148) | medida: Hammer Strength HS-CP / Life Fitness SS-SP; a peça desenhada fica na altura da torre e do eixo |
| Altura da torre | 148 cm | 148 cm | medida: Precor RSL0414 / RSL0515 ("Weight Stack Tower Height") |
| Espessura dos estofados | 6,5 cm | 6,5 cm | medida: Precor ("Total thickness is 2.5 inches (65 mm)") |
| Caminho que converge | 8° | 8° | desenho, com a existência da fonte: Precor ("converging motion path", "converging axis"), sem o ângulo |
| Encosto | 15° da vertical, 64 cm | 12° (derivada do desenvolvimento sentado aprovado), 72 cm | desenho / derivada |
| Eixo dos braços | 145 cm do chão, 12 cm atrás da borda do assento (acima da cabeça) | 123 cm do chão, 95 cm atrás da borda do assento (atrás do encosto) | desenho, escolhido para o caminho do pegador; nenhuma ficha dá |
| Braço (do eixo ao pegador) | 54 cm | 72 cm | desenho |
| Pegadores | a 30 cm do meio (o supino com barra aprovado), borracha de 13 × 3,4 cm | a 28 cm do meio, idem | desenho |
| Assento | 40 × 40 cm, curso de 36 a 56 cm | 40 × 40 cm, curso de 36 a 58 cm | desenho |
| Came, pilha | came de 26 cm; 15 placas, 75 × 26 × 12 cm | came de 32 cm; idem | desenho |

**O que mudou do cartão de hoje, e por quê.** Os dois cartões são de anilhas (pinos com uma anilha de cada lado); todas as fichas lidas são de pilha e o texto do app conta a carga pela "placa da torre": as peças novas são de pilha, com a torre ao lado (como a largura das fichas, ~145 cm, fecha). No supino, o eixo do cartão fica atrás e acima do encosto, e dali o pegador não anda os ~50 cm do empurrão: o eixo foi para cima da cabeça, um pouco à frente do peito, e o braço pende dele. No desenvolvimento, o eixo continua atrás do encosto, como no cartão, mas subiu para a meia altura do caminho, para o pegador subir quase na vertical. Uma busca pública na Precor (RSL0414, RSL0515) deu o estofado, a torre, os braços independentes e o caminho que converge; a altura do assento, o eixo e o braço não aparecem em nenhuma ficha lida.

## As animações

| Id | Conferência (`conferir.mjs`) | Erros desenhados | Erros sem desenho | Risco |
|---|---|---|---|---|
| `supino-maquina` | 0 falha, 2 avisos (as linhas de desenho; o modo Músculos abre de frente) | Banco na altura errada; Tirar as costas; Travar os cotovelos | nenhum | médio |
| `desenvolvimento-maquina` | 0 falha, 2 avisos (as linhas de desenho; de frente o principal quase não aparece, como no desenvolvimento aprovado) | Arquear a lombar; Descer pouco | nenhum | médio |

Núcleo comum: `src/engine/novo/exercicios/maquina-de-empurrar.ts`. O corpo senta e encosta medindo a pele; a máquina se regula para o corpo como quem treina faz antes da série (a altura do assento pelo pegador na linha que a técnica pede; a posição inicial dos braços pelo cotovelo embaixo; o fim pelo cotovelo quase estendido), uma vez por corpo, guardado nas calibrações. Regras novas: `src/engine/novo/regras/maquinas-de-empurrar.ts` (as mãos nos pegadores, o pegador no arco, os pegadores que convergem, o cotovelo quase estendido, o pegador na linha do peito, os cotovelos a 30–60° do tronco sentado, as mãos sobre os ombros em cima). Reaproveitadas, com as mesmas marcas: `cadeira-sentado-e-encostado` e `cadeira-pilha-sobe-com-a-alavanca` (C1) e `carga-na-altura-do-ombro` (desenvolvimentos em pé).

Conferências escritas: `lote-C2/supino-maquina.md` e `lote-C2/desenvolvimento-maquina.md`. Quadros: `quadros/supino-maquina.png` e `quadros/desenvolvimento-maquina.png`.

## Mudanças em arquivo comum

- `scripts/animacao-nova/folha-pecas.mjs`: só acrescentei as duas folhas (o import da peça e um bloco no fim); as folhas que já existiam não mudam.
- Uma linha em cada registro (`exercicios/registro.ts`, `regras/registro.ts`, `dados/objetos/registro.ts`) e o `dados/preparo/registro.ts` regravado pelo `preparo.mjs` (só a numeração das importações e as duas linhas novas).
- Nada em `boneco.ts`, `esqueleto.ts`, `cena.ts`, `conferir.ts`, `pecas.ts` nem na cadeira flexora. O "braço de perto atrás do corpo" é uma opção da peça nova (ela empurra a profundidade do braço direito só quando a câmera olha de lado), sem mexer no motor.

## O que não ficou bom (dos dois)

- O cartão de hoje e a peça nova são máquinas diferentes (anilhas × pilha; o eixo do supino em outro lugar): a pessoa que conhece a máquina de anilhas pode não reconhecer a de pilha, e vice-versa.
- A 96 px, as duas peças novas se parecem (a mesma estrutura); o que as separa é o braço pendurado à frente (supino) e o braço vindo de trás, na altura da cabeça (desenvolvimento).
- O supino alonga pouco o peito embaixo (o cotovelo fica 5,7° à frente do plano do peito) e o caminho sobe 10 cm.
- De lado, os fios dos rótulos do desenvolvimento atravessam o corpo, e a mão fica na frente do rosto embaixo.
- Os cames são grandes (26 e 32 cm), para as placas subirem uma distância que se vê.
