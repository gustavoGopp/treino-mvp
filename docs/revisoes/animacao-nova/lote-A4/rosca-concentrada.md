# Lote A4 · Rosca concentrada sentado, com halter (`rosca-concentrada`)

De 17/11/2026. Primeira animação deste exercício (até aqui, cartão de texto; sem animação de hoje). Sentado na ponta da cadeira firme, pernas afastadas, o tronco inclinado à frente; o braço direito apoiado por dentro da coxa direita, perto do joelho, com um halter leve na mão, palma para cima; a mão esquerda na coxa esquerda. Só o cotovelo dobra, do braço quase estendido até o halter perto do ombro. **Ainda não aprovada nem ligada ao app.**

- Ficha da técnica: `docs/pesquisa/animacoes/rosca-concentrada.md`; cartão: `src/conteudo/exercicios/rosca-concentrada.json` (só leitura).
- Ficha de movimento: `src/engine/novo/dados/movimentos/rosca-concentrada.json`.
- Animação: `src/engine/novo/exercicios/rosca-concentrada.ts`, sobre o núcleo `exercicios/sentado-na-ponta.ts` (o mesmo dos crucifixos invertidos sentados). Usa `halterNaMao` (`dobrar-o-cotovelo.ts`) e a cadeira, sem mudança. **Nenhum arquivo comum mudou.**
- Regras novas: `regras/rosca-concentrada.ts` (o braço na coxa, medido na pele como o braço no encosto da rosca Scott; o halter perto do ombro; a outra mão na outra coxa) e `sentado-na-ponta-da-cadeira` (`regras/sentado-na-ponta.ts`). Usa também as das roscas (`braco-estendido-embaixo-na-rosca`, `palma-para-a-frente-na-rosca`, `carga-fora-do-corpo-na-rosca`, `halter-fora-do-banco`) e a comum `tronco-quase-parado`.
- Quadros grandes: `../quadros/rosca-concentrada.png`.

## Onde os números saem

A ficha da técnica dá só o essencial (braço apoiado por dentro da coxa; só o cotovelo dobra, até o halter perto do ombro; consenso, vídeo de Jeremy Ethier listado em `17`). O cartão acrescenta "na ponta da cadeira", "pernas afastadas", "perto do joelho", "palma para cima, braço quase estendido", "a outra mão na outra coxa" e o ritmo. O que não tem número saiu das roscas aprovadas (cotovelo embaixo, palma, halter leve, amassar 1 cm, os erros "tirar o braço" e "descer pouco") ou é desenho, dito linha por linha na ficha. Medido, e não escolhido:

- **O ponto de apoio**: a pele de dentro da coxa direita a 0,8 do quadril ao joelho; o centro do cotovelo fica fora dela o raio do braço, corrigido até a pele do tríceps amassar 1 cm a da coxa.
- **A inclinação do tronco**: a que deixa o ombro a um braço (30,5 cm) desse ponto. Dá a bacia a 58,8° e o peito a 76,7° da vertical: o tronco bem debruçado, como no exercício.
- **A mão esquerda**: o meio da palma na pele da coxa esquerda, os dedos seguindo o antebraço o quanto a pele deixa (o punho dobra só o que precisa).

## O que a fonte pede × o que o boneco faz (medido) × confere?

| O que a ficha da técnica (e o cartão) pede | Selo | O que o boneco faz (medido) | Confere? |
|---|---|---|---|
| Sentado na ponta da cadeira, pernas afastadas | consenso | quadril a 12 cm da borda; glúteo e coxa 1 cm dentro do tampo; pés a 36 cm do meio, pontas 15° para fora, chapados e parados | sim |
| Braço apoiado por dentro da coxa, perto do joelho | consenso | a pele de trás do braço amassa 1 cm a pele de dentro da coxa do começo ao fim (de 1 a 1 cm); o cotovelo fica a 11,9 cm do centro do joelho (a coxa tem 41,3 cm) e anda 0 cm | sim |
| Só o cotovelo mexe; o tronco não balança | consenso | a base do pescoço anda 0 cm; o ombro e o cotovelo ficam parados; só o antebraço gira | sim |
| Embaixo, braço quase estendido | consenso | o cotovelo dobra 10° | sim |
| Em cima, halter perto do ombro | consenso | o cotovelo dobra 125°; o centro da pegada fica a 29,8 cm do centro do ombro (limite das roscas aprovadas: 30 cm) | sim |
| Palma para cima | consenso | o antebraço fica supinado 85° o ciclo todo | sim |
| A outra mão na outra coxa | consenso | a pele da mão esquerda fica a 0,8 cm da pele da coxa esquerda, parada; o punho não dobra para trás (0°) e o antebraço gira 77° (média da tabela: 80°) | sim |
| O halter não bate no corpo, na cadeira nem no chão | desenho | a menor folga entre o halter e a pele é 1,4 cm (a cabeça, no alto); 7,1 cm do chão | sim |
| ~1 s, pausa curta, ~2 s | consenso | 0,5 s embaixo, 1 s subindo, 0,5 s no alto, 2 s descendo; salto de velocidade de 6,3% do pico | sim |

**Conferência automática: 0 falha, 3 avisos.** (1) A flexão do quadril chega a 136° (média da tabela 132°): o tronco debruçado até o braço chegar à coxa perto do joelho; com as costas de cima dobradas só 10°, eram 145°. (2) As linhas de desenho da ficha. (3) Músculos: o antebraço aparece como "só ajuda", fora da lista do conteúdo, como nas outras roscas aprovadas.

## As vistas

- **De frente** (a que o app abre e padrão do modo Músculos: bíceps 67 cm²): o antebraço sobe do meio das pernas até a frente do ombro; o braço encostado na coxa e a mão esquerda na outra coxa aparecem.
- **De lado** (segunda): o tronco debruçado e o braço por dentro da coxa. De lado, a coxa direita fica mais perto de quem olha que o braço: ela é pintada por cima dele (`viesNaVista`), e o braço some atrás da coxa junto do cotovelo, como deve.
- Descartadas: de três quartos pela frente, o braço que trabalha some atrás da perna e o rótulo cai na cadeira; de cima, o tronco tapa o braço.

## Erros (os três do cartão, mesmo título, mesma ordem)

| Erro (texto do app) | Vista | O que o boneco faz (medido) |
|---|---|---|
| Balançar o tronco | de lado | enquanto o halter sobe, a bacia endireita 20°: a base do pescoço sobe 20,6 cm e o braço vai junto, saindo da coxa (descola 2,8 cm) |
| Tirar o braço da coxa | de lado | na subida, o braço gira 30° no ombro para a frente: o cotovelo sai 16,4 cm da coxa e dobra só 100° (como o "tirar o braço" da rosca Scott aprovada) |
| Descer pouco | de frente | embaixo, a volta para com o cotovelo a 55° (como nas roscas aprovadas) |

## O equipamento

- **Halter:** o sextavado de 10 lb da tabela, o das roscas alternada e martelo aprovadas.
- **Cadeira:** a cadeira firme da tabela, encostada na parede, como cenário.

## O que não ficou bom

- **O halter passa perto do rosto no alto** (1,4 cm). Para não encostar, o pescoço fica estendido 25° (o olhar vai ao chão à frente, e não ao braço) e o cotovelo para em 125° (e não 130°). De frente, no alto, o halter fica na frente do queixo.
- **De lado, o halter embaixo é pintado por cima da canela direita**, embora esteja atrás dela (a ordem de pintura do halter não segue a da perna). Não é uma peça atravessando a outra, mas parece o halter na frente da perna.
- **O braço esquerdo** sai um pouco para fora (o cotovelo aponta para fora e para baixo): é a pose comum de quem apoia a mão na coxa, mas lembra uma asa no quadro de frente.
- O plano do antebraço (`rosca.plano`, 60° do lado de dentro para a frente) é desenho: com o bíceps virado só para dentro, o halter batia na perna esquerda no meio da subida.
