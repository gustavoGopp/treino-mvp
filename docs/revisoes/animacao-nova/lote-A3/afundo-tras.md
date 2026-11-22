# Lote A3 · Afundo para trás alternado (`afundo-tras`)

De 17/11/2026. Primeira animação deste exercício (até aqui ele só aparecia como cartão de texto). Em pé, pés juntos, um halter de 25 lb em cada mão, os braços pendendo ao lado do corpo; o pé esquerdo sai do chão, passa pelo ar e apoia na ponta, um passo longo atrás; o quadril desce até o joelho de trás chegar perto do chão e volta. O pé da frente (o direito, o de perto na vista de lado) não sai do lugar. **Ainda não aprovada nem ligada às telas** (quem integra registra em `aprovados.ts` e no catálogo do guia).

- Ficha da técnica: `docs/pesquisa/animacoes/afundo-tras.md`. Cartão do app: `src/conteudo/exercicios/afundo-tras.json` (só leitura).
- Ficha de movimento: `src/engine/novo/dados/movimentos/afundo-tras.json`.
- Animação: `src/engine/novo/exercicios/afundo-tras.ts`, sobre o núcleo comum dos afundos (`exercicios/afundar.ts`), com o mesmo caminho do afundo para trás com o peso do corpo aprovado e os braços do afundo com halteres aprovado. Nenhum arquivo comum mudou; nenhuma regra nova.
- Quadros grandes: `../quadros/afundo-tras.png`. **Sem folha** (o exercício não tinha animação).

## Onde os números saem

A ficha da técnica não dá número: diz "passo longo para trás", "joelho de trás perto do chão", "peso na perna da frente", "tronco reto" e manda seguir, por analogia, o afundo para trás com o peso do corpo aprovado. Por isso o caminho é o dele, número a número (tamanho do passo, quando o pé apoia, altura do pé no ar, calcanhar de trás, as condições de em pé e de embaixo), com selo `desenho` e fonte `aprovado`; os braços com o halter vêm do afundo com halteres aprovado (fonte `afundo`). A única diferença do aprovado é o que as mãos fazem: em vez das mãos na cintura, um halter em cada mão (o cartão), que entra no equilíbrio. O código repete o do aprovado em vez de reaproveitá-lo, porque a função dele não recebe os braços: mudar a aprovada para recebê-los mudaria um arquivo que não posso mexer sem necessidade.

## O que a fonte pede × o que o boneco faz (medido) × confere?

| O que a ficha da técnica (e o cartão) pede | Selo | O que o boneco faz (medido) | Confere? |
|---|---|---|---|
| Início: em pé, pés juntos (cartão, "Amplitude"); pés na largura do quadril | consenso | os dois pés lado a lado, a 18 cm de centro a centro (como trilhos); os dois joelhos dobram 8° | sim |
| Um halter em cada mão, ao lado do corpo | consenso | os braços pendem com 7° de abertura; o halter pende na vertical, com o cabo para a frente; o centro da pegada fica 7,8 cm para fora do ombro e a 1 cm à frente dele, do começo ao fim | sim |
| Passo longo para trás | consenso | embaixo, 85,2 cm do tornozelo da frente ao de trás (a regra pede 60 ou mais); a ponta do pé de trás passa pelo ar a no máximo 10 cm do chão e apoia aos 60% da descida | sim |
| Desce até o joelho de trás chegar perto do chão | consenso | embaixo, a pele do joelho de trás fica a 4 cm do chão; os dois joelhos dobram 91° e 92° | sim |
| O peso fica na perna da frente | consenso | embaixo, o centro de massa (corpo + 2 halteres) fica a 61% do caminho da ponta do pé de trás ao tornozelo da frente | sim |
| Tronco reto | consenso | o peito inclina no máximo 5,3° da vertical | sim |
| Fim: joelho da frente sobre o pé (cartão, "Amplitude") | consenso | embaixo, o joelho da frente fica 1,8 cm à frente do tornozelo e 11 cm atrás da bola do pé | sim |
| Empurra o chão com a perna da frente e volta à posição em pé | consenso | subida de 1,5 s pelo mesmo caminho; o último quadro emenda no primeiro (0 cm); o pé da frente não sai do lugar (0 cm) | sim |

**Conferência automática: 0 falha, 5 avisos**, os mesmos do afundo para trás aprovado: (1) a dorsiflexão do tornozelo de trás na ponta do pé (31,8°, acima da média); (2) o ritmo, com o maior salto de velocidade em 15,7% do pico (joelho da frente, na subida; o aprovado tem o mesmo número); (3) as linhas da ficha que são escolha de desenho; (4) o quadríceps da perna de trás pintado como secundário dentro de um grupo que o conteúdo conta como principal (o mesmo do afundo aprovado); (5) de frente, o quadríceps da frente quase não aparece (0 cm²) e o modo Músculos abre de lado (354 cm²), como em todos os afundos.

## As vistas

As do afundo para trás aprovado: **de lado** (padrão: o passo, a descida e o joelho de trás perto do chão) e **de frente** (o joelho da frente sobre o pé e o erro do joelho para dentro). De frente, os halteres ficam fora das coxas.

## Erros (os três do cartão, com o mesmo título e na mesma ordem)

| Erro (texto do app) | Vista | O que o boneco faz (medido) |
|---|---|---|
| Passo curto | de lado | a ponta do pé de trás apoia a 50 cm do tornozelo da frente (no certo, 86,5 cm); o quadril fica 22 cm mais à frente; o joelho da frente dobra 118° e passa 10,9 cm da bola do pé (uns 4 cm além da ponta dos dedos; no certo, 11 cm atrás da bola) e o calcanhar da frente sobe 7,5 cm (o pé gira 22° na bola), como o cartão diz. O joelho de trás desce até os mesmos 4 cm do chão |
| Impulso com a perna de trás | de lado | o quadril fica 13 cm para trás, perto do pé de trás, e o tronco recua 2,7° da vertical; o centro de massa vai para trás do meio do passo e o joelho da frente dobra só 71°: a perna de trás faz a força. É o mesmo desenho do erro "Empurrar com o pé de trás" do afundo para trás aprovado |
| Joelho da frente para dentro | de frente | o joelho da frente fica 8,6 cm para dentro da linha do tornozelo (no certo, 0,6 cm) |

Nenhum erro ficou fora: os três têm consequência que se vê. O cartão diz que o joelho cai "na subida"; o quadro parado é o de baixo (instante 1), onde a diferença é maior, como no aprovado.

## O equipamento

Dois halteres de 25 lb (11,3 kg) da tabela de objetos, os mesmos do afundo com halteres aprovado; os dois entram no equilíbrio.

## Correções já feitas que esta animação respeita

- Adutores da perna da frente como secundários, como o afundo aprovado (`correcoes-ja-feitas.md`: "Afundo para trás com adutores, como o afundo aprovado", 10/11), e o glúteo em laranja (revisão de anatomia de 02/11).
- O boneco começa em pé com os pés juntos e o pé de trás passa pelo ar até apoiar na ponta (afundo para trás aprovado, 10/11). A cadeira de equilíbrio não é desenhada (não está no cartão deste exercício).
- O halter pende na vertical.

## O que não ficou bom

- **O rótulo "passo longo"** aponta para a ponta do pé de trás; no quadro "Em pé", com os pés juntos, o fio corre pelo chão até a ponta do pé, ao lado do pé da frente. É o mesmo do afundo para trás aprovado (anotado em `correcoes-ja-feitas.md`).
- **No erro do passo curto**, o calcanhar da frente sobe 7,5 cm: de lado ele se lê, mas é o detalhe pequeno do quadro; o que mais se vê é o joelho passando da ponta do pé e o corpo à frente do contorno certo.
- **O ritmo** fica em 15,7% de salto (aviso), herdado do caminho do aprovado.
