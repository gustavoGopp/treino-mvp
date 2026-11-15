# Lote 4 · Remada unilateral com halter, sem banco (`remada-unilateral-sem-banco`)

De 15/11/2026. Segunda da família das remadas com peso livre: o braço que puxa é o do núcleo `exercicios/remada.ts` (o mesmo da remada no banco); o corpo parado sai da base nova `exercicios/remada-sem-banco.ts`, que também serve à remada com kettlebell. Ainda não está ligada às telas do app.

- Ficha da técnica: `docs/pesquisa/animacoes/remada-unilateral-sem-banco.md`. Cartão: `src/conteudo/exercicios/remada-unilateral-sem-banco.json`.
- Ficha de movimento: `src/engine/novo/dados/movimentos/remada-unilateral-sem-banco.json`.
- Animação: `src/engine/novo/exercicios/remada-unilateral-sem-banco.ts`; base: `exercicios/remada-sem-banco.ts`; núcleo: `exercicios/remada.ts`.
- Regras novas: `pe-da-carga-atras` e `mao-de-apoio-na-coxa` (em `regras/remadas.ts`).
- Folha: `../prototipos/folha-remada-unilateral-sem-banco.png`. Quadros grandes: `../quadros/remada-unilateral-sem-banco.png`.

## Como a geometria foi montada

1. **O tronco** parado com o peito a 55° da vertical (a ficha só diz "inclinado à frente"; hoje: ~45–60°), coluna sem flexão.
2. **Os pés:** o esquerdo à frente, o direito (do lado do halter) atrás, cada um 2 cm para fora da linha do quadril; o de trás com o calcanhar 15° levantado. Cada pé fica onde o joelho dele dobra o que a ficha de movimento pede (frente 30°, trás 8°, pela lei dos cossenos), e a altura do quadril é a que dá 66 cm de um tornozelo ao outro (`resolver1`).
3. **A mão livre** espalmada na pele da coxa da frente (medida na superfície do Boneco), os dedos para o joelho, o polegar para dentro; o ponto ao longo da coxa é o único em que o cotovelo de apoio fica a 12° (`resolver1`): deu 88% do caminho do quadril ao joelho, logo acima do joelho.
4. **O braço que puxa:** o mesmo da remada no banco (de pendurado a 20° além da linha das costas, 16° para fora, antebraço pendendo embaixo do cotovelo, pegada neutra, escápula de +6 a −10).

## O que a fonte pede × o que o boneco faz (medido) × confere?

| O que a ficha da técnica (e o cartão) pede | Selo | O que o boneco faz (medido) | Confere? |
|---|---|---|---|
| Pés afastados, um à frente; o do lado do halter atrás | consenso | o tornozelo direito fica 66 cm atrás do esquerdo; os dois pés parados (0 cm) | sim |
| Mão livre firme na coxa da frente | consenso | a mão fica a 0,2 cm da pele da coxa, a 88% do caminho do quadril ao joelho, parada (0 cm); cotovelo de apoio a 12° | sim |
| Tronco inclinado à frente, costas retas | consenso | peito a 56,3° da vertical; lombar sem flexão (0°) | sim |
| Sem girar o tronco (tronco parado) | consenso | base do pescoço e bacia andam 0 cm; o tórax gira 0° | sim |
| Começo: braço estendido, halter embaixo do ombro | consenso (cartão) | cotovelo a 3°; o halter pende embaixo do ombro, um pouco para fora | sim |
| Cotovelo para trás, em direção ao quadril, perto do corpo | consenso | o braço se afasta no máximo 16° do lado do tronco | sim |
| Fim: cotovelo passando a linha das costas, halter ao lado do quadril | consenso | o cotovelo fica 2,4 cm além da linha das costas; a mão a 90% do caminho do ombro ao quadril | sim |
| Pegada neutra (palma virada para o corpo) | consenso | pronação de 90° o ciclo todo | sim |
| O halter não atravessa o corpo | (desenho) | a no mínimo 0,3 cm da pele (o antebraço junto à mão; a coxa fica a 4 cm ou mais) | sim |
| Equilíbrio | (mecânica) | o centro de massa (corpo + halter) fica sempre dentro do apoio dos pés | sim |
| ~1 s puxando, 1 s parado, ~2 s voltando | consenso | 1,1 s / 1 s / 2,1 s | sim |

Conferência automática: **0 falha, 2 avisos.** (1) Dorsiflexão do tornozelo de trás de 17,8° (média 14,8°, máximo observado 48°): a perna de trás inclina à frente com o passo de 66 cm; com o calcanhar a 20° a mão deixava de alcançar a coxa com o cotovelo quase estendido, então fiquei com 15°. (2) As linhas de desenho da ficha de movimento.

Músculos: dorsal e meio das costas do lado direito em vermelho; ombro de trás e bíceps em laranja. As vistas são a de lado e a de três quartos, de frente (`quina`); a vista padrão do modo Músculos fica a de lado (176 cm² do principal). De trás (282 cm²), de três quartos de trás (299) e de cima (310) mostram mais o músculo, mas em nenhuma delas a mão livre na coxa aparece (fica escondida atrás do corpo), e a mão na coxa é o que distingue este exercício: escolhi a de três quartos, de frente, para a segunda vista. O erro "girar" fica na de três quartos, de trás, onde ele se lê.

## Erros

| Erro (texto do app) | Vista | O que o boneco faz (medido) |
|---|---|---|
| Girar o tronco | três quartos, de trás | a coluna gira 18° no fim; a mão livre continua na coxa (o cotovelo de apoio dobra até 32°) |
| Arredondar as costas | lado | lombar +22° e torácica +22°; a bacia vira para trás até o ombro de apoio ficar à mesma distância da mão (a mão não sai da coxa) |
| Não estender o braço (quadro parado no começo) | lado | a volta para a 45% do caminho |

## Correções já feitas que esta animação respeita

- `remada-unilateral-sem-banco` motivou o acabamento A2 (04/11): mão em luva por cima do cabo e braço destacado do tronco, ok no desenho novo.
- "Linha-guia do rótulo movido atravessa o corpo quando a âncora está escondida (mão livre na coxa)" (`correcoes-ja-feitas.md`): o rótulo "mão firme na coxa" fica só na vista de três quartos, de frente, onde a mão aparece; de lado ele não é usado.

## O que não ficou bom

- **De lado, a mão livre na coxa não aparece** (fica atrás da perna e do braço direitos): é o lado de longe. Por isso o rótulo dela foi para a outra vista, e o modo Músculos fica de lado, que mostra menos o músculo que a vista de trás. Risco de o Gustavo preferir a de três quartos, de trás, como segunda vista.
- A dica "cotovelo para o quadril" ficou de fora: de lado, o fio dela atravessava as costas no fim da puxada; a trajetória do cotovelo mostra o mesmo.
