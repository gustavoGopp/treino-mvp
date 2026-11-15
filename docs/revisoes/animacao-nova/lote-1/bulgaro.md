# Lote 1 · Agachamento búlgaro com apoio (`bulgaro`)

De 15/11/2026. Sétima animação do lote 1, e a primeira com o pé de trás fora do chão o tempo todo: o peito do pé apoia no banco, com o cadarço para baixo. Um halter na mão do lado da perna da frente; a mão livre segura a coluna da estação, só para equilibrar. **Aprovada pelo Gustavo em 15/11/2026 ("Eu estou aprovando e gostando de tudo que você está fazendo").** Ainda não está ligada às telas do app.

- Ficha da técnica: `docs/pesquisa/animacoes/bulgaro.md`.
- Ficha de movimento: `src/engine/novo/dados/movimentos/bulgaro.json`.
- Animação: `src/engine/novo/exercicios/bulgaro.ts`, sobre o núcleo dos búlgaros (`bulgaro-base.ts`), que os outros dois búlgaros vão usar.
- Folha ao lado da de hoje: `../prototipos/folha-bulgaro.png`. Quadros grandes: `../quadros/bulgaro.png`.

## O que a fonte pede × o que o boneco faz (medido) × confere?

| O que a ficha da técnica (e o cartão) pede | Selo | O que o boneco faz (medido) | Confere? |
|---|---|---|---|
| Peito do pé de trás apoiado no banco, cadarço para baixo | consenso | o pé de trás fica de sola para cima, encostado no tampo do banco (0 cm de folga), e o tornozelo não sai do lugar no ciclo inteiro | sim |
| Pé da frente longe o bastante para o calcanhar ficar no chão embaixo | consenso | o calcanhar e a bola do pé da frente ficam a 0 cm do chão o tempo todo; embaixo, o joelho da frente fica 2 cm atrás do tornozelo | sim |
| A mão livre segura a coluna só para equilibrar, sem puxar | consenso | a mão de apoio não se mexe (0 cm); quem dobra é o cotovelo, de 106° a 127° | sim |
| Tronco levemente inclinado à frente | consenso | o peito fica 16° para a frente, do começo ao fim | sim |
| Peso na perna da frente | consenso | o centro de massa (corpo + halter) fica a 61 a 63% do caminho entre o tornozelo de trás e o da frente | sim |
| Em cima: joelho da frente quase estendido, pés fixos | consenso | o joelho da frente dobra 14°; o pé da frente não se desloca (0 cm) | sim |
| Descida em ~2 a 3 s, reta | consenso | 2,3 s; o quadril desce de 78 para 42 cm sem ir para a frente nem para trás (0 cm) | sim |
| Embaixo: coxa da frente perto da horizontal ou um pouco abaixo | consenso | a coxa da frente fica 11° abaixo da horizontal | sim |
| Embaixo: joelho de trás a poucos centímetros do chão | consenso | a pele do joelho de trás fica a 4 cm do chão (o centro do joelho a 9 cm) | sim |
| Subida em ~1 a 1,5 s | consenso | 1,3 s, pelo mesmo caminho | sim |

A animação de hoje para com o joelho de trás a 14 cm do chão, e o texto diz "a poucos centímetros" (nota sem correção de 04/11/2026, em `correcoes-ja-feitas.md`). Aqui o joelho chega a 4 cm, como nos afundos aprovados, e por isso o quadril desce mais que hoje (42 cm contra 50).

Como o pé deita no banco: o pé é mais alto no peito do pé que nos dedos. De sola para cima, ele descansa nos dois ao mesmo tempo, com a ponta 24° para baixo. Esse ângulo e a altura do tornozelo (3,4 cm acima do tampo) saem da forma do pé do Boneco; não foram escolhidos a olho. A flexão plantar do tornozelo de trás chega a 52° em cima (a média medida é 57°).

Conferência automática: 0 falha. Avisos: a extensão do quadril de trás chega a 23° embaixo (acima da média, dentro do máximo observado); as linhas da ficha de movimento que são escolha de desenho (as distâncias dos pés e a posição da mão, tiradas da animação de hoje); e a vista de frente, que não serve ao modo Músculos (o quadríceps fica escondido atrás do joelho, como nos afundos). O ritmo fica suave (salto de 9,8%, com limite de 15%). A canela de trás afunda até 2,4 cm no estofado na borda do banco (a tolerância é 2,5 cm).

## Erros

| Erro (texto do app) | O que o boneco faz (medido) |
|---|---|
| Joelho da frente para dentro (de frente) | o joelho da frente cai 8 cm para dentro, sem cruzar o meio do corpo |
| Pé da frente perto do banco (de lado) | o pé da frente fica 19 cm mais perto do banco e, embaixo, o calcanhar sobe 11 cm; o joelho da frente dobra 121° (o certo: 98°) |
| Descer pouco (de lado) | o quadril para a 61 cm (o certo: 42) e o centro do joelho de trás fica a 21 cm do chão |

## O equipamento

- **Banco:** o banco reto da tabela de objetos (122 cm, 43,5 cm de altura), ao comprido atrás da pessoa, como na animação de hoje. O quadro só precisa mostrar a ponta onde o pé apoia; o resto do banco aparece quando cabe.
- **Coluna da estação:** a coluna de polia da tabela, ao lado da mão de apoio. Ela é cenário: fica atrás do corpo, o quadro a corta em cima e, de lado, não aparece (ficaria atrás do tronco), como na animação de hoje.
- **Halter:** o de 25 lb da tabela, pendendo ao lado do corpo.

## Correções já feitas que esta animação respeita (`correcoes-ja-feitas.md`)

- O glúteo em laranja (secundário), e não em vermelho (02/11/2026). Respeitada.
- Os adutores da perna da frente entram no desenho (02/11/2026). Respeitada: aparecem de frente.
- Nota sem correção de 04/11/2026: "joelho de trás a 14 cm; o texto diz a poucos centímetros". Aqui ficou em 4 cm.

## O que não ficou bom

- **Erro "pé da frente perto do banco":** o quanto o calcanhar sobe (34°) veio da animação de hoje, não de uma medida. Com o quadril descendo no mesmo lugar, o tornozelo do boneco daria conta sem levantar tanto o calcanhar; o desenho exagera, como o de hoje, para o erro ser lido.
- **De lado, a mão de apoio não aparece:** o braço fica atrás do tronco e a coluna não é desenhada nessa vista. A mão na coluna só se vê de frente.
- **De frente, o rótulo "mão só equilibra"** fica por cima da coluna.
- **De frente, o banco fica quase todo escondido** atrás das pernas.
- **No erro "descer pouco",** o fio do título passa rente ao rosto.
- **O corpo desce mais que na animação de hoje** (joelho de trás a 4 cm): vale olhar se a posição de baixo parece funda demais.
