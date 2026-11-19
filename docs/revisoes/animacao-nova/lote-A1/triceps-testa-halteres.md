# Lote A1 · Tríceps testa com halteres, deitado (`triceps-testa-halteres`)

De 17/11/2026. Primeira animação deste exercício (até aqui ele só aparecia como cartão de texto). Deitado de costas num colchonete, joelhos dobrados, pés no chão; um halter leve (10 lb) em cada mão, pegada neutra. O braço fica parado, apontado para o teto um pouco para o lado da cabeça, e só o cotovelo dobra, levando os halteres para os lados da cabeça. **Ainda não aprovada nem ligada às telas.**

- Ficha da técnica: `docs/pesquisa/animacoes/triceps-testa-halteres.md`. Cartão do app: `src/conteudo/exercicios/triceps-testa-halteres.json` (só leitura).
- Ficha de movimento: `src/engine/novo/dados/movimentos/triceps-testa-halteres.json`.
- Animação: `src/engine/novo/exercicios/triceps-testa-halteres.ts`, sobre o núcleo dos exercícios deitado no chão com halteres (`exercicios/deitado-no-chao-halteres.ts`, o mesmo do supino no chão); o braço segue a ideia do núcleo dos franceses (`triceps-frances-base.ts`: o braço parado, só o cotovelo dobra), sem usar o código dele. Regras medidas: `src/engine/novo/regras/deitado-no-chao.ts`.
- Quadros grandes: `../quadros/triceps-testa-halteres.png`. **Sem folha** (não havia animação deste exercício).

## Chão ou banco

O cartão aceita "o chão (com colchonete) ou um banco". **A animação é no chão, com colchonete**, como o supino no chão: o mesmo núcleo serve aos dois, e o chão é o caso de quem só tem halteres. No banco, a descida poderia ir mais longe (o halter passaria abaixo do nível da cabeça); no chão, é o colchonete que limita.

## Onde os números saem

A ficha da técnica não dá números. O que não vem do cartão saiu das animações aprovadas parecidas, com selo `desenho` e fonte `desenho`: o joelho a 90° e os ombros na cena (abdominal no chão), o cotovelo quase estendido em cima, 8° (tríceps francês com halter). **O fim da descida não é um ângulo escolhido:** o cotovelo dobra até a ponta do halter chegar a 2 cm do colchonete (medido na casca do halter, `halter.folgaEmbaixo`). O braço "um pouco para trás, na direção da cabeça" ficou em 10°: com 15°, o halter descia já além do topo da cabeça (o meio dele a 0,2 cm do fim da cabeça) e o cotovelo dobrava só 108°; com 10°, o meio do halter fica ao lado da testa e o cotovelo dobra 115°.

## O que a fonte pede × o que o boneco faz (medido) × confere?

| O que a ficha da técnica (e o cartão) pede | Selo | O que o boneco faz (medido) | Confere? |
|---|---|---|---|
| Deitado de costas, joelhos dobrados (chão com colchonete) | consenso | costas, cabeça e glúteo no tampo do colchonete (0 cm); joelhos a 90°; pés no chão, parados (0 cm) | sim |
| Halteres leves | consenso | o halter sextavado de 10 lb da tabela (`halterLeve`), um em cada mão | sim |
| Halteres acima do peito, braços estendidos, um pouco para trás | consenso | em cima, o cotovelo dobra 8°; o braço fica 10° para o lado da cabeça, na largura dos ombros | sim |
| Pegada neutra (palmas uma para a outra) | consenso | o antebraço fica 0° fora da posição neutra o ciclo todo (o polegar aponta para a cabeça com o braço esticado) | sim |
| Só os cotovelos dobram | consenso | o cotovelo não sai do lugar (0 cm); o braço fica parado a 10° da vertical; o cotovelo dobra de 8° a 115° | sim |
| Descida em ~2 a 3 s, halteres para os lados da cabeça | consenso | 2,5 s; embaixo, o meio do halter fica ao lado da cabeça (ao lado da testa, a 3,4 cm do fim da cabeça), na largura dos ombros | sim |
| Embaixo: cotovelos bem dobrados, apontados para o teto | consenso | 115° de flexão; o braço aponta para o teto (10° da vertical) | sim |
| O halter passa perto do rosto (segurança) | consenso | no ciclo inteiro, o halter passa no mínimo a 6 cm da cabeça e a 2 cm do colchonete | sim |
| Subida: estica os cotovelos até os braços ficarem retos | consenso | 1,2 s (a ficha não dá o tempo: escolha de desenho); o último quadro emenda no primeiro (0 cm); ritmo suave (salto de 4,9%, limite 15%) | sim |

Pescoço e cabeça: o mesmo do supino no chão (o pescoço dobra 16° para trás para a nuca apoiar no colchonete).

**Conferência automática: 0 falha, 1 aviso**: as linhas da ficha de movimento que são escolha de desenho (`lombar.base`, `joelho`, `ombro.z`, `colchonete.alemDaCabeca`, `braco.paraTras`, `cotovelo.estendido`, `halter.folgaEmbaixo`).

## As vistas

Medido (área do tríceps virada para quem olha, no pior de três instantes): de frente 211 cm², de três quartos 133, de lado 55, de cima 0, de trás 0. **De lado** é a padrão do modo Técnica: o cotovelo dobra no plano de lado, e é onde se lê o braço parado e o halter descendo ao lado da cabeça. **De três quartos** é a segunda (e a padrão do modo Músculos): mostra o tríceps e os halteres ao lado da cabeça. De frente (dos pés), o tríceps aparece mais, mas as coxas tapam a cabeça e os halteres (olhado): não serve. De cima, o braço aponta para quem olha e o tríceps some (0 cm²), mas os erros de abrir os cotovelos e de ir até a falha se leem melhor de cima, e é lá que eles ficam.

## Erros (os três do cartão, com o mesmo título e na mesma ordem)

| Erro (texto do app) | Vista | O que o boneco faz (medido) |
|---|---|---|
| Abrir os cotovelos | de cima | os braços abrem 25° para os lados enquanto o cotovelo dobra (o braço fica a 27° da vertical); os halteres se afastam 46 cm um do outro (o certo: 37 cm) |
| Mexer os ombros | de lado | o braço desce até 35° para o lado dos pés (o certo fica 10° para o lado da cabeça), "como num supino": o cotovelo anda 24 cm e o halter para em cima do rosto, a 11 cm da cabeça |
| Ir até a falha | de cima | a repetição em que a forma cede (o precedente aprovado da extensão de tríceps com o peso do corpo): os antebraços tombam para o meio e os halteres descem sobre a testa, a 1 cm dela (o certo passa a 6 cm), com o cotovelo a 100° |

"Ir até a falha" é erro de esforço; a consequência visível que o cartão dá é "o halter passa perto do rosto", e é ela que se desenha.

## O equipamento

- **Halteres:** o de 10 lb da tabela (`dados/objetos/halter-leve.json`, com fonte), um em cada mão. Embaixo, a ponta de baixo de cada halter fica a 2 cm do colchonete.
- **Colchonete:** o da tabela de objetos (medidas provisórias), da cabeça ao glúteo; os halteres descem sobre ele.

## Correções já feitas que esta animação respeita

Não há correção registrada para este exercício em `correcoes-ja-feitas.md` (ele nunca teve animação).

## O que não ficou bom

- **De lado, embaixo, o halter de perto passa na frente do rosto.** É só a projeção (ele fica 6 cm ao lado da cabeça, medido), mas, no quadro parado, parece que o halter está no rosto. A vista de três quartos mostra que ele está ao lado.
- **O erro "ir até a falha" de cima** se lê, mas é discreto: os halteres vão para cima da testa, perto do topo do quadro, e o corpo fica pequeno nessa vista (deitado e visto de cima, ele é comprido). Tentei de trás da cabeça e de três quartos por trás: os braços e as coxas tapam a cabeça.
- **O rótulo "cotovelos para o teto"** tem o fio passando pelo antebraço no quadro de cima (os dois ficam quase em linha).
- **O fim da descida depende do chão:** no banco, a amplitude seria maior. Se o Gustavo preferir a versão no banco, a pose de baixo muda.
- **O colchonete** tem as medidas provisórias da tabela (100 × 50 cm).

## Correção de 19/11 (peso dentro do corpo)

Depois do aviso do Gustavo na remada sem banco ("o halter tá puxando pra dentro do próprio corpo"), a regra `peso-fora-do-corpo` (a superfície do peso contra o volume do corpo, fora as mãos que seguram, no ciclo e em cada erro em 9 instantes; tolerância de 0,5 cm) e a checagem de pesos da conferência da pintura foram passadas em todas as animações com peso livre. Nesta, **no fim do erro "Ir até a falha"**, o halter entrava **2,8 cm na cabeça** (3,9 cm pela checagem da pintura). Os antebraços tombam para o meio até o halter ficar a 1 cm da testa, mas essa folga era medida entre pontos soltos do halter e os 12 pontos de cada anel da cabeça, e o halter passava entre eles.

**A mudança.**

- A folga do erro (`erro.falha.folga`, 1 cm) passa a ser medida na superfície: o maior giro dos antebraços para o meio em que os halteres, engordados de 1 cm para todos os lados, não entram no corpo (pela regra `peso-fora-do-corpo`). No corpo do app, os antebraços tombam 10,5° para o meio, e não 18,1°; o halter desce rente à testa, a 1 cm dela.
- O ciclo e os outros dois erros não mudam.

| medido (homem) | antes | depois |
|---|---|---|
| o halter entra na cabeça (erro "Ir até a falha", fim) | 2,8 cm | 0 cm (a 1 cm da pele) |
| giro dos antebraços para o meio | 18,1° | 10,5° |

A ficha liga `peso-fora-do-corpo`: medida no estado de antes, ela falha (2,8 cm, na cabeça, no erro "Ir até a falha"); no de agora, passa (o peso não entra no corpo). O antes e depois está em `correcao-das-antigas/triceps-testa-halteres-peso.png`; os quadros grandes foram regravados (`quadros/triceps-testa-halteres.png`) e olhados vista por vista, quadro a quadro e erro a erro, nos dois lados do corpo. A conferência automática dá **1 falha e 1 aviso** (antes: 2 falhas e 1 aviso, entre elas a de pesos).

**O que ainda não ficou bom.**
- A falha que sobra é de antes e não é do peso: de três quartos, o colchonete é pintado por cima do tronco, da bacia e da coxa direita, que estão na frente dele. Não corrigi (fora deste trabalho).
- O erro ficou um pouco menos marcado de cima (os halteres se juntam menos sobre a testa).
