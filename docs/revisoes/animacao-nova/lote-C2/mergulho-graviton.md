# Lote C2 · Mergulho assistido no graviton (`mergulho-graviton`)

De 18/11/2026. Primeira animação deste exercício (até aqui ele só aparecia como cartão de texto). Ajoelhado na almofada do graviton, as mãos nas alças de paralela, os braços estendidos; desce com o tronco um pouco à frente até o braço ficar quase paralelo ao chão e volta. A almofada desce com os joelhos e a pilha sobe (o contrapeso). **Ainda não aprovada nem ligada às telas.**

- Ficha da técnica: `docs/pesquisa/animacoes/mergulho-graviton.md`. Cartão do app: `src/conteudo/exercicios/mergulho-graviton.json` (só leitura).
- Ficha de movimento: `src/engine/novo/dados/movimentos/mergulho-graviton.json`.
- Animação: `src/engine/novo/exercicios/mergulho-graviton.ts`, sobre o núcleo do corpo ajoelhado na almofada (`exercicios/graviton.ts`). Usa a medida do braço do mergulho aprovado (`bracoAbaixoDaHorizontal`, que já era exportada; nada mudou nele). Regras: `regras/graviton.ts`, `regras/mergulho.ts` e `regras/pendurado.ts`.
- A peça: `pecas-de-cena/graviton.ts` (folha em `docs/revisoes/animacoes-restantes/pecas/folha-graviton.png`).
- Quadros grandes: `../quadros/mergulho-graviton.png`.

## Onde os números saem

A ficha da técnica diz que a técnica é a do mergulho nas paralelas, com a ajuda do contrapeso. **Os braços, a escápula e o tronco usam os números do mergulho aprovado** (`mergulho.json`): o cotovelo a 8° em cima, o braço 12° abaixo da horizontal embaixo (o fim da descida é o cotovelo em que o braço chega a esse ângulo, calibrado), o tronco de 6° a 22° à frente, a clavícula 10° abaixo do ritmo do ombro, o cotovelo apontando para trás. A posição do corpo sai das mesmas duas condições da barra no graviton (o braço alcança a alça com a dobra pedida; o joelho fica no arco da almofada), e não do equilíbrio sobre as mãos. Como o tronco inclina à frente na descida, o quadril dobra junto (de 8° a 24°), para a coxa ficar no mesmo ângulo do chão e o joelho debaixo do quadril (escolha de desenho).

## O que a fonte pede × o que o boneco faz (medido) × confere?

| O que a ficha da técnica (e o cartão) pede | Selo | O que o boneco faz (medido) | Confere? |
|---|---|---|---|
| Joelhos na plataforma | consenso | a frente das canelas fica a −0,4 cm do topo da almofada (amassa 0,4 cm), nas duas pernas e em todos os quadros; o joelho anda 0 cm ao longo dela | sim |
| O contrapeso ajuda | consenso | a almofada vai de 89,1 cm (em cima) a 64 cm do chão (embaixo); a alavanca, de +11,7° a −12,9°; as placas ficam 5,8 cm acima do repouso em cima e 12,3 cm embaixo (o arco do came, diferença 0 cm) | sim |
| Mãos nas barras paralelas do aparelho | consenso | o centro da pegada a 0 cm do eixo da alça (3,9 cm), a mão fechada nela; não anda (0 cm); a pele fica a no mínimo 2,1 cm das alças | sim |
| Em cima, braços estendidos sem travar | consenso | o cotovelo dobra 8° | sim |
| Tronco levemente inclinado à frente | consenso | o tórax fica a 7,3° da vertical em cima e 23,3° embaixo (o aprovado: o mesmo caminho) | sim |
| Desce até o braço ficar quase paralelo ao chão | consenso | embaixo, o braço fica 12° abaixo da horizontal (no caminho, nunca menos de 12°) e o cotovelo dobra 102,9° | sim |
| Ombros longe das orelhas | consenso | do alto do ombro à base do crânio, no mínimo 20,8 cm no caminho (em pé: 18,7 cm) | sim |
| O corpo desce e sobe sem balançar | consenso | a bacia desce 25,1 cm e anda 1,5 cm para a frente e para trás | sim |
| Ritmo (~2 s descendo, ~1 s subindo) | consenso | 2,2 s e 1,3 s, os do mergulho aprovado; salto de velocidade de 6,5% do pico | sim |

Comparação com o mergulho aprovado: lá a bacia desce 25,5 cm; aqui, 25,1 cm.

**Conferência automática: 0 falha, 1 aviso** (as linhas da ficha de movimento que são escolha de desenho).

## As vistas

**De lado** é a padrão (o tronco inclinando, o braço chegando à horizontal, a almofada e a pilha; é também a padrão do modo Músculos: 142 cm², a mesma área de lado do mergulho aprovado). **De três quartos, por trás** é a segunda: os ombros longe das orelhas e o erro de encolher se leem de trás (100 cm² do músculo principal: aparece o tríceps). O mergulho aprovado abre o modo Músculos de frente (464 cm²): aqui, de frente, a alavanca dos joelhos e o came, que ficam à frente das coxas, são pintados por cima delas (a almofada está na frente de verdade) e a vista não serve; de três quartos pela frente (153 cm²), a máquina fica entre quem olha e o corpo.

## Erros (os dois do cartão, com o mesmo título e na mesma ordem)

| Erro (texto do app) | Vista | O que o boneco faz (medido) |
|---|---|---|
| Descer demais | de lado | o braço sobe 7° acima da horizontal (o ombro passa abaixo do cotovelo: o cotovelo dobra 108°, contra 103° no certo); no fundo, o ombro vai 14° à frente e sobe 6°, e a cabeça cai junto (os números do erro do mergulho aprovado) |
| Ombros encolhidos | de três quartos, por trás | a clavícula sobe 12° além do ritmo do ombro (o certo: 10° abaixo) e a cabeça afunda 10° entre os ombros, na primeira parte da descida, e fica assim embaixo |

"Sem dor no ombro" (a dica do cartão) não é pose: fica no texto do guia.

## O equipamento

O mesmo graviton da barra (`pecas-de-cena/graviton.ts`), com as alças de paralela a 118 cm do chão e 50,8 cm uma da outra (o vão das paralelas aprovadas). Nesta animação, as alças de barra (que não são usadas) vão para trás do corpo, como cenário.

## Correções já feitas que esta animação respeita

Não há correção registrada para este exercício. Do mergulho aprovado vale a correção 12 de 02/11 (peito e tríceps, os dois principais).

## O que não ficou bom

- **O peito aparece pouco no modo Músculos** (142 cm² de lado, contra 464 cm² de frente no mergulho aprovado). A vista de frente não serve aqui (a alavanca passa na frente das coxas).
- **A almofada inclina de +12° a −13°** no caminho (a alavanca gira): em cima, os pés ficam um pouco mais altos que os joelhos.
- **A alça de paralela fica 10 cm abaixo da do cartão de hoje** (118, contra 128 cm), para a almofada ficar perto da horizontal no meio do mergulho; nenhuma ficha dá essa altura.
