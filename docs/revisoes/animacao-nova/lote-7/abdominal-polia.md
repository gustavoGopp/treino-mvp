# Lote 7 · Abdominal na polia com corda (`abdominal-polia`)

De 15/11/2026. Terceira da família "puxar na polia" (núcleo `exercicios/polia-puxar.ts`, regras em `regras/polia-puxar.ts`); a corda é a do tríceps na corda (`pecas-de-cena/corda-triceps.ts`, usada como está). Ainda não está ligada às telas do app.

- Ficha da técnica: `docs/pesquisa/animacoes/abdominal-polia.md`. Cartão: `src/conteudo/exercicios/abdominal-polia.json`. Animação de hoje: `src/engine/exercicios/abdominal-polia.ts`.
- Ficha de movimento: `src/engine/novo/dados/movimentos/abdominal-polia.json`.
- Animação: `src/engine/novo/exercicios/abdominal-polia.ts`.
- Regras novas: `polia-puxar-quadril-parado`, `polia-puxar-coluna-enrola`, `polia-puxar-maos-paradas-na-cabeca`, `polia-puxar-cotovelos-vao-as-coxas`, `polia-puxar-ajoelhado-no-colchonete`. Usadas como estão (da família do tríceps francês, porque medem o que esta ficha pede): `triceps-frances-corda-na-mao` e `triceps-frances-corda-livre-da-cabeca`.
- Folha: `../prototipos/folha-abdominal-polia.png`. Quadros grandes: `../quadros/abdominal-polia.png`.

## Como a geometria foi montada

1. **Ajoelhado no colchonete:** os joelhos parados no colchonete, na largura do quadril (8,7 cm do meio); a canela para trás, o peito do pé no colchonete. A coxa fica 14° atrás da vertical ("quadril um pouco atrás dos joelhos": o centro do quadril fica 10 cm atrás dos joelhos; hoje, ~8 cm).
2. **O tronco no começo** inclinado à frente com o peito a 32° da vertical e a coluna neutra (sem flexão além da curva de repouso); a bacia que dá esse peito sai de `resolver1`. Daí em diante **a bacia não se mexe**: quem enrola é a coluna, a lombar até 26° e a torácica até 40° além da curva de repouso, e o pescoço acompanha (de −8° a +14°).
3. **As mãos** ficam presas à cabeça: o centro de cada mão 9 cm abaixo do alto da cabeça e 3 cm à frente do meio dela (as têmporas); de lado, a mão anda para fora até a pele dela ficar a 0,5 cm da pele da cabeça ("mãos grudadas na cabeça"). O polegar aponta para trás (a pegada neutra com o cotovelo à frente).
4. **A corda:** os dois ramos esticados, retos de cada mão até a bucha (25,2 cm fora da ponta de borracha); o cabo vai reto da bucha à roldana, no alto da coluna (193 cm).
5. **A coluna** fica à frente, tão perto quanto dá com a cabeça, no fim, a 18 cm da face dela: deu 77 cm dos joelhos ao centro da base ("a cerca de meio passo"; a puxada ajoelhada usa 70). A pilha sobe metade do curso do cabo.

## O que a fonte pede × o que o boneco faz (medido) × confere?

| O que a ficha da técnica (e o cartão) pede | Selo | O que o boneco faz (medido, homem) | Confere? |
|---|---|---|---|
| Ajoelhado no colchonete, joelhos na largura do quadril | consenso | pele dos joelhos 0,4 cm dentro do colchonete (amassa); joelhos a 17,4 cm um do outro (quadris a 16,7); joelhos e pés parados (0 cm) | sim |
| Quadril um pouco atrás dos joelhos | consenso | 10 cm atrás | sim |
| Início: tronco inclinado à frente, coluna neutra | consenso | peito a 32° da vertical; coluna sem flexão (0°) | sim |
| O quadril fica parado | consenso | a bacia anda 0 cm e gira 0° | sim |
| Costelas em direção ao quadril; fim: coluna toda enrolada | consenso | lombar +26°, torácica +40°; o tórax gira 49,3° à frente; a base do pescoço chega 6,9 cm mais perto do quadril | sim |
| Mãos ao lado da cabeça, perto das têmporas, paradas | consenso | as mãos andam 0 cm em relação à cabeça; a pele delas a 0,5 cm da pele da cabeça | sim |
| Cotovelos em direção às coxas | consenso | o cotovelo vai de 56,9 cm a 28,7 cm da coxa | sim |
| Polia no alto, com a corda | consenso (cartão) | roldana a 193 cm; a corda esticada da mão à bucha (25,2 cm) | sim |
| A corda e o cabo não atravessam a cabeça | (desenho) | a no mínimo 0,7 cm da pele (cabeça) | sim |
| A pilha sobe com o cabo | (mecânica) | o cabo anda 37,5 cm e a pilha sobe 18,7 cm (2:1) | sim |
| ~1,5 s enrolando, 1 s parado, ~2 s desenrolando | consenso | 1,5 s / 1 s / 2 s | sim |

Conferência automática (homem): **0 falha, 2 avisos.** (1) Flexão plantar do tornozelo de 80,7° (média 57°): o peito do pé deitado no colchonete, ajoelhado (o mesmo aviso da puxada unilateral ajoelhada). (2) As linhas de desenho da ficha (a folga da coluna e o pescoço). Mulher: 0 falha, 2 avisos (os mesmos).

Músculos: o reto do abdômen em vermelho (a biblioteca não conta secundário). Vistas: de lado e de três quartos, de frente (`quina`); a vista padrão do modo Músculos é a de três quartos (122 cm² do principal; de lado, 116). De frente o corpo fica atrás da coluna.

## Erros

| Erro (texto do app) | Vista | O que o boneco faz (medido) |
|---|---|---|
| Mexer o quadril | lado | a coxa vai 24° para trás (o quadril senta em direção aos calcanhares) e a bacia gira 18° à frente: o quadril dobra 42° a mais e a coluna enrola só 35% do certo |
| Puxar com os braços | lado | as mãos saem da cabeça e descem 30 cm, até a frente do peito; a coluna enrola só 40% do certo |

## Correções já feitas que esta animação respeita

- Montagem da polia conferida em cm (`correcoes-ja-feitas.md`: polia a 132 cm ou no alto): aqui a roldana no ponto mais alto da tabela (193 cm), como pede o cartão ("carro no ponto mais alto").
- Coluna de polia: o cabo reto da roldana à bucha e a pilha que sobe.

## O que não ficou bom

- **De lado, o nome da trajetória cai em cima da coluna** (o enquadramento põe o nome à direita, entre o corpo e a coluna, com uma ou com duas linhas). Nos quadros usei a de três quartos, onde ele fica à esquerda, fora do corpo e do aparelho; no app, quem escolhe a trajetória de lado vê o nome em cima da coluna. Quadro: rascunho `lateral:traj:f1` (não está nos quadros).
- **O corpo é pequeno no quadro**, como na puxada unilateral ajoelhada: a coluna (2,39 m) entra inteira no enquadramento.
- **A pegada:** a mão fecha em volta da corda com o polegar para trás (a pegada neutra com o cotovelo à frente) e a corda atravessa o punho reta até a bucha. Na academia o punho dobra um pouco para a corda subir pelo lado do polegar; o motor não dobra o punho (a extensão do punho fica em 0°).
- A distância da coluna (77 cm dos joelhos) saiu da folga da cabeça, uma escolha de desenho, e não de uma medida.
