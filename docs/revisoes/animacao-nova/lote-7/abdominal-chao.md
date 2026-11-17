# Lote 7 · Abdominal no chão (`abdominal-chao`)

De 15/11/2026. Primeiro dos abdominais no motor novo. **Ainda não foi revisto pelo Gustavo.**

- Ficha da técnica: `docs/pesquisa/animacoes/abdominal-chao.md`. Texto do app: `src/conteudo/exercicios/abdominal-chao.json` (só leitura). Animação de hoje: `src/engine/exercicios/abdominal-chao.ts` (só leitura).
- Ficha de movimento: `src/engine/novo/dados/movimentos/abdominal-chao.json`.
- Animação: `src/engine/novo/exercicios/abdominal-chao.ts`, sobre o núcleo novo dos abdominais (`exercicios/abdominal.ts`: `baseDeCostas`, `troncoEnrolado`, `bracosCruzados`, `pernasDobradas`), que usa o tronco de costas do núcleo das flexões de joelho deitado (`troncoDeCostas`, `folgaDaPelve`, `pelveAoChao`, importados sem mudança).
- Regras medidas novas: `src/engine/novo/regras/abdominais.ts` (`abdominal-escapulas-saem-do-chao`, `abdominal-lombar-apoiada`, `abdominal-pescoco-acompanha`, `abdominal-maos-no-peito`).
- Folha ao lado da de hoje: `../prototipos/folha-abdominal-chao.png`. Quadros grandes: `../quadros/abdominal-chao.png`.

## Como a pose é montada

Deitado de costas, a cabeça para −z. (1) Base: a lombar achata 15° além da curva de repouso ("lombar apoiada", "abdômen firme"), a bacia inclina até o glúteo e as costas encostarem juntos no chão e a cabeça encosta no chão (`troncoDeCostas`). (2) A bacia fica parada (`pelve` nos contatos); a coluna enrola sobre ela: a torácica dobra até 45° e a lombar só mais 5°; o pescoço sai da posição com a cabeça no chão e vai ao pescoço reto de quem está em pé mais 8°, e a cabeça dobra 5°. É a coluna enrolando, sem o quadril dobrar (a flexão do quadril fica em 29,1° o ciclo inteiro). (3) As mãos ficam cruzadas no peito, presas ao tórax: cada punho perto do meio do peito, a palma no peito, os dedos para o ombro do outro lado; o antebraço esquerdo passa por cima do direito. (4) Os pés ficam presos no chão, na largura do quadril, onde o joelho dobra 90°.

## O que a fonte pede × o que o boneco faz (medido) × confere?

| O que a ficha da técnica pede | Selo | O que o boneco faz (medido) | Confere? |
|---|---|---|---|
| Deitado de costas, joelhos dobrados, pés no chão | consenso | joelho a 90°; bola e ponta do pé paradas (0 cm) | sim |
| Mãos cruzadas no peito | consenso | os punhos não andam em relação ao tórax (0 cm); a mão mais perto da cabeça fica a 9,8 cm dela (não a puxa) | sim |
| Enrola a parte de cima da coluna até tirar as escápulas do chão | consenso | embaixo, a pele das costas na altura das escápulas a 0 cm do chão; no topo, a 3,9 cm, com o tórax (T12 a C7) a 34,5° do chão | sim |
| A lombar continua apoiada | consenso | a pele do glúteo a 0 cm do chão o ciclo inteiro; o alto da lombar (T12–L1) sobe 1,0 cm | sim |
| O pescoço acompanha o tronco, sem puxar a cabeça; olhar para os joelhos | consenso | no topo, a cabeça dobra 13° sobre o alto do tórax além do que dobra em pé (embaixo, −28,8°: a cabeça apoiada no chão, sem travesseiro) | sim |
| ~1 s subindo, 1 s contraído, ~2 s descendo | consenso | 1 s, 1 s, 2 s, com 0,5 s parado embaixo | sim |

Conferência automática (homem): **0 falha, 1 aviso** (o script também lista o aviso de músculos que vem do conteúdo: o oblíquo externo como secundário dentro de um grupo que o conteúdo conta como principal). Corpo da mulher: **0 falha**. Ponto mais baixo do corpo 0 cm (no certo e nos erros); ritmo 5,3% (ok). O aviso: os provisórios (`lombar.base`, `toracica.topo`, `lombar.topo`, `joelho`, `ombro.z` e as medidas das mãos cruzadas): a ficha não dá número para nenhum deles.

## Erros

| Erro (texto do app) | O que o boneco faz (medido) |
|---|---|
| Puxar o pescoço | a torácica enrola só 30% do certo (as escápulas ficam a 1,3 cm do chão, e não 3,9) e o pescoço dobra 30° com a cabeça mais 20°: a cabeça fica 50° dobrada sobre o alto do tórax (13° no certo) |
| Subir a lombar | o quadril dobra 30° (a bacia gira em volta do quadril e assenta de novo no chão): o alto da lombar sobe 19,6 cm e o tórax fica a 64,5° do chão; o glúteo continua no chão |

## Correções já feitas que esta animação respeita

O abdominal no chão foi aprovado no lote 1 de 01/11 sem correção registrada; nas aprovações de 03 e 04/11, os oblíquos entram como "só ajuda" no guia de hoje. Aqui eles ficam como secundário, como a ficha da técnica ("Secundário: oblíquos") e a lista do guia de hoje (`muscles.s`).

## Músculos e vistas

Reto do abdômen (principal) e oblíquos (secundário). Vistas: de lado (padrão de Técnica) e de três quartos de frente (`quina`), que é a padrão do modo Músculos pela medida (130 cm² contra 121 cm² de lado). Testei as outras: de frente o corpo deitado vira um bloco (as coxas tapam o tronco) e de cima ele parece em pé.

## O que não ficou bom

- Os antebraços cruzados tapam parte do reto do abdômen (a parte de cima) no modo Músculos. Subir as mãos para o alto do peito faz os cotovelos saírem para cima do corpo (a geometria do braço: o ombro fica no chão e o punho na frente do peito); no corpo da mulher, com os cotovelos mais para trás, o braço atravessava o chão no topo (−5,2 cm). Fiquei com os punhos no meio do peito e os cotovelos ao lado do corpo.
- Os rótulos de lado ("pescoço solto" e "lombar no chão") ficam acima do corpo e o fio de "lombar no chão" desce pela coxa até a bacia, como na ponte de glúteo. "Sobe só as escápulas" não entrou: em todos os pontos que tentei (C7, ombro) o fio atravessava a cabeça ou o braço; a vista de três quartos fica sem rótulo.
- O colchonete da animação de hoje não é desenhado (o do motor novo tem 100 cm, provisório, e não cabe o corpo deitado); a ficha diz "um colchonete ou chão firme".
