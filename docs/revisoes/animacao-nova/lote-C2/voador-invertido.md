# Lote C2 · Voador invertido (`voador-invertido`)

De 18/11/2026. Primeira animação deste exercício (até aqui ele só aparecia como cartão de texto). Na mesma máquina do voador, sentado virado para o encosto, o peito nele, as mãos nos pegadores horizontais com as palmas para baixo; cada braço da máquina gira num eixo vertical sobre o ombro, e os braços abrem da frente até a linha do corpo, paralelos ao chão, com os cotovelos levemente dobrados e os ombros baixos. **Ainda não aprovada nem ligada às telas** (quem integra registra em `aprovados.ts` e no catálogo do guia).

- Ficha da técnica: `docs/pesquisa/animacoes/voador-invertido.md`. Cartão do app: `src/conteudo/exercicios/voador-invertido.json` (só leitura).
- Ficha de movimento: `src/engine/novo/dados/movimentos/voador-invertido.json`.
- Animação: `src/engine/novo/exercicios/voador-invertido.ts`, sobre o núcleo `exercicios/no-voador.ts` (o mesmo do voador). Regras medidas: `src/engine/novo/regras/voador.ts` e, para as escápulas, a do crucifixo inverso aprovado (`regras/crucifixo-inverso.ts`).
- A máquina: `src/engine/novo/pecas-de-cena/voador.ts`, regulada para o invertido; folha em `docs/revisoes/animacoes-restantes/pecas/folha-voador.png`.
- Quadros grandes: `../quadros/voador-invertido.png`. **Sem folha** ao lado da animação de hoje.

## Onde os números saem

A ficha da técnica dá a técnica em palavras, sem número. O manual da Life Fitness (SS-FLY, p. 28) dá a regulagem: **o assento na altura em que os braços ficam paralelos ao chão**, com as mãos nos pegadores horizontais, sentado virado para o encosto, os braços na posição mais para trás no começo, os cotovelos levemente dobrados, e os braços girando em volta do ombro. O ritmo (abrir em ~1,5 s, segurar, voltar em ~2,5 s) e as escápulas (um pouco juntas, sem encolher) saem do crucifixo inverso aprovado.

**O mesmo núcleo do voador:** a mão presa no pegador horizontal, o eixo sobre o centro do ombro, o cotovelo resolvendo sozinho. Na cena, quem senta sempre olha para +z; a máquina é que gira meia volta. **O encosto recua 14,2 cm na guia** (o mesmo estofado vira apoio do peito): com o encosto no lugar do voador, o peito encostava com o ombro uns 14 cm fora do eixo, e a mão presa no pegador obrigaria o cotovelo a dobrar e esticar ao longo do arco. O tronco inclina 12° para a frente, com o peito no encosto (que deita 10° para longe de quem senta virado para ele).

## O que a fonte pede × o que o boneco faz (medido) × confere?

| O que a ficha da técnica (e o cartão, e a Life Fitness) pede | Selo | O que o boneco faz (medido) | Confere? |
|---|---|---|---|
| Os braços giram em volta do ombro | consenso | o centro do ombro fica a no máximo 0,2 cm (na horizontal) do eixo do braço da máquina | sim |
| As mãos nos pegadores horizontais | consenso | o centro da mão a 0 cm do centro do pegador, o ciclo todo; as palmas para baixo | sim |
| Pegadores na altura dos ombros: braços paralelos ao chão (Life Fitness) | consenso | assento a 53 cm; a linha do ombro à mão fica de 0° a 0,5° da horizontal | sim |
| Sentado de frente para o encosto, peito apoiado | consenso | o peito a −0,5 cm da face do encosto (o estofado amassa), do começo ao fim; o glúteo a −1 cm do tampo; a base do pescoço anda 0 cm | sim |
| Início: braços à frente | consenso | no começo, cada braço 11,9° aberto a partir da frente, as mãos dos dois lados da coluna | sim |
| Abre até a linha do corpo | consenso | no fim, a linha do ombro à mão fica 0,1° fora da linha dos ombros, vista de cima | sim |
| Cotovelos levemente dobrados | consenso | de 19,5° a 21,8° do começo ao fim | sim |
| Sem encolher os ombros nem juntar demais as escápulas no fim | consenso | a clavícula fica 2° abaixo do ritmo normal o ciclo todo e, no fim, 5° atrás dele (a remada, que junta as escápulas, chega a 10°; o limite da regra do crucifixo inverso é 5°) | sim, no limite |
| Volta controlando | consenso | volta em 2,5 s; as placas do pino de 1,6 a 15,2 cm acima das de baixo, sem descansar; salto de velocidade de 3,5% do pico | sim |

Pés firmes no chão, embaixo do encosto, dos dois lados da base, o joelho a 77°.

**Conferência automática: 0 falha, 1 aviso** (as linhas da ficha de movimento que são escolha de desenho: `bacia`, `lombar`, `cervical`, `cabeca`, `cotovelo.paraBaixo`, `assento.amassa`, `pes.meiaDistancia`, `pes.frente`, `psi.meio`). O modo Músculos serve nas duas vistas (o ombro de trás aparece de trás e de cima).

## As vistas

**De trás** (a que o app abre, como o crucifixo inverso e o crucifixo invertido na polia aprovados) e **de cima**. De trás se veem as costas, os ombros baixos, os braços abrindo até a linha do corpo, os eixos sobre os ombros e a pilha subindo; o encosto e a coluna ficam na frente de quem senta, atrás do corpo. De cima, o arco das mãos e os pegadores (a viga e os braços da máquina acima dos pegadores são cortados, como no voador; a cabeça tem o contorno próprio). De lado, o braço da máquina de perto passa na frente do rosto quando abre: é só a vista do erro de embalar, com o corpo pintado por cima dele.

## Erros (os três do cartão, com o mesmo título e na mesma ordem)

| Erro (texto do app) | Vista | O que o boneco faz (medido) |
|---|---|---|
| Encolher os ombros | de trás | abrindo, os ombros sobem: a clavícula vai a 12° acima (o certo, −2°) e o ombro sobe 3,1 cm; com a mão presa no pegador, o cotovelo estica (7,2°, em vez de 21,7°) |
| Embalar o tronco | de lado | para abrir, o tronco vai para trás e o peito sai do encosto: a bacia gira 14° para trás, a lombar arqueia 4°; a base do pescoço anda 17,7 cm. O cotovelo fica no mesmo ângulo (o arco anda junto com o ombro) |
| Abrir pouco | de cima | os braços param a 50°, 40° antes da linha do corpo |

O erro de encolher é mais leve que o do crucifixo inverso aprovado (12° em vez de 16°): com a mão presa no pegador, o cotovelo já fica quase reto com 12°, e com 16° a mão não alcançava mais o pegador.

## O equipamento

O voador novo, regulado para o invertido (ver `voador.md` e o resumo do grupo, `resumo-voador.md`): o encosto recuado na guia, o assento a 53 cm, a posição inicial dos braços para trás (170° a partir da frente do voador). O encosto que muda de lugar quando vira apoio do peito está na patente US 8.162.807 da Hoist (outra mecânica); as fichas comerciais lidas não falam disso.

## Correções já feitas que esta animação respeita

Não há correção registrada para este exercício. Do crucifixo inverso aprovado vêm o ritmo, as escápulas sem encolher nem juntar e a vista de trás como a padrão; da biblioteca e do achado 5 da revisão de anatomia, só o ombro de trás como músculo (a ficha da técnica lista "costas (meio do trapézio)" como secundário; a biblioteca não, e a animação segue a biblioteca, como os outros crucifixos invertidos).

## Mudanças em arquivo comum

Nenhuma (as mesmas do voador: arquivos novos, uma linha em cada registro).

## O que não ficou bom

- **O tronco fica inclinado 12° para a frente e o peito encosta na metade de baixo do encosto** (o ponto mais fundo fica 21 cm abaixo do ombro, perto da borda de baixo). É o que põe o ombro sob o eixo com o encosto inclinado; de lado, parece apoiado na parte baixa do peito.
- **O encosto recuar na guia é uma escolha**: as fichas comerciais lidas não dizem como o peito encosta com o ombro sob o eixo; a única fonte de um encosto que muda de lugar é uma patente (de outra máquina).
- **O limite das escápulas fica exatamente em 5°** (a regra aprovada do crucifixo inverso).
- **De trás, o corpo ocupa pouco mais da metade da altura do quadro**, pela mesma razão do voador (a viga dos eixos a 199 cm).
- **De cima, o assento aparece grande atrás das costas** (quem senta virado para o encosto fica na ponta da frente do assento) e a base da coluna e a torre ficam embaixo do quadro, cortadas.
- **No erro de encolher, o cotovelo estica** (é a consequência da mão presa no pegador, mas o erro passa a parecer também "esticar os cotovelos").

## Correção de 18/11 (auditoria)

A auditoria da fase C (`../auditoria-fase-c.md`) achou, de cima, em todos os quadros, o apoio do peito pintado por cima da cabeça: a metade de baixo dela sumia (o queixo fica 3,1 cm acima da borda de cima do apoio e 1,3 cm à frente da face dele).

**Causa.** O Boneco pinta a cabeça dentro do item do corpo, na profundidade média do corpo inteiro; de cima, ela fica em 103,8 cm, e o apoio, pintado como um item só na profundidade do centro dele, em 104,2: o apoio ia por cima do corpo inteiro, cabeça incluída. Subir o corpo todo não serve: as coxas passam **embaixo** do apoio (de cima, as bordas dele cobrem a parte de dentro das coxas) e iam aparecer por cima dele. O apoio tem de ficar entre o tronco e a cabeça.

**O que mudou.**
- No Boneco (`boneco.ts`), uma opção nova, desligada por padrão: `vies.cabecaAParte`. Com ela, a cabeça (com o contorno próprio, como na opção `cabeca` de 18/11) vai para um item só dela, na profundidade da própria cabeça (mais o valor dado), em vez de ficar dentro do item do corpo. Sem a opção, nada muda: nenhuma outra animação a usa.
- No exercício (`exercicios/voador-invertido.ts`), de cima, `cabecaAParte: 0`: a cabeça fica em 135,2 cm de profundidade, acima do apoio (104,2) e dos braços (113,0). O núcleo `no-voador.ts`, a peça e o voador não mudaram.

**Antes e depois** (a medida 1 da auditoria, conferindo também que o corpo, pintado sozinho, cobre o pixel):

| de cima | antes | depois |
|---|---|---|
| começo, meio e fim; erro "Abrir pouco" | cabeça 5 de 17 anéis por baixo do apoio | 0 |
| de trás (os dois erros e a técnica) | 0 | 0 |

Sobram, de cima, 1 a 2 anéis de cada canela e pé na quina de baixo do apoio, antes e depois: são pontos na linha do contorno do apoio, e as canelas ficam embaixo dele de verdade (o raio até quem olha passa a 0,5 cm da caixa); não aparecem.

**Conferência nova:** `voador-invertido-cabeca-por-cima-do-apoio` (`regras/voador.ts`, com a medida em `regras/pintura-sobre-o-estofado.ts`). Nas duas vistas do exercício e na de cada erro (de trás, de cima e de lado), nos quadros da técnica e nos dos três erros, conta os anéis da cabeça, do tronco e do braço, do antebraço, da coxa e da canela **dos dois lados** que ficam na frente do apoio do peito e por cima dele na tela, e quantos o pintor põe por baixo dele. Antes: **falha** (de cima, cabeça 13 de 13). Depois: passa (0; de cima, a cabeça tem 13 anéis na frente do apoio; de trás, o tronco 8 e cada braço 1; de lado, nenhum).

**Conferência automática:** 0 falha, 1 aviso (o mesmo de antes).

**O que ainda não ficou bom:** com a cabeça num item próprio, de cima ela também passa por cima de tudo o que fica abaixo dela na pintura (o cabo da pilha, a 124 cm, passava por cima da cabeça e agora passa por baixo, o que está certo, porque a cabeça está mais alta). O rótulo "peito no encosto" (só na vista de lado, que o exercício não declara) continua no C7.
