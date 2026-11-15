# Lote 7 · Abdominal invertido no chão (`abdominal-invertido`)

De 15/11/2026. **Ainda não foi revisto pelo Gustavo.**

- Ficha da técnica: `docs/pesquisa/animacoes/abdominal-invertido.md`. Texto do app: `src/conteudo/exercicios/abdominal-invertido.json` (só leitura). Animação de hoje: `src/engine/exercicios/abdominal-invertido.ts` (só leitura).
- Ficha de movimento: `src/engine/novo/dados/movimentos/abdominal-invertido.json`.
- Animação: `src/engine/novo/exercicios/abdominal-invertido.ts`, sobre o tronco de costas e os braços no chão do núcleo das flexões de joelho deitado (`troncoDeCostas`, `bracosNoChao`, `folgaDaPelve`, importados sem mudança).
- Regras medidas novas: `src/engine/novo/regras/abdominais.ts` (`abdominal-invertido-quadril-sai-do-chao`, `abdominal-invertido-coxas-na-vertical`); reaproveitada: `ombros-e-cabeca-no-chao` (`regras/flexao-joelho.ts`).
- Folha ao lado da de hoje: `../prototipos/folha-abdominal-invertido.png`. Quadros grandes: `../quadros/abdominal-invertido.png`.

## Como a pose é montada

Deitado de costas, a cabeça para −z. Base: a lombar achata 15° (a mesma do abdominal no chão) e a bacia inclina até o glúteo e as costas encostarem juntos no chão. A pelve enrola: a bacia gira para trás `enrola` graus e a lombar dobra o mesmo tanto, de modo que o tórax fica deitado; o corpo assenta com as costas e a cabeça no chão e o ombro no lugar (`troncoDeCostas`). O quadril sai do chão pela curva da coluna, sem nenhum empurrão. As pernas andam presas à bacia: a coxa fica, no referencial da bacia, onde estava na vertical embaixo, e o joelho fica a 90°; os pés soltos, com a ponta esticada. Os braços ficam no chão ao lado do corpo, palmas para baixo (`mao.R` e `mao.L` presas).

## O que a fonte pede × o que o boneco faz (medido) × confere?

| O que a ficha da técnica pede | Selo | O que o boneco faz (medido) | Confere? |
|---|---|---|---|
| De costas, mãos no chão | consenso | mãos espalmadas no chão, 10 cm para fora do ombro, paradas (0 cm) | sim |
| Joelhos a ~90°, coxas na vertical | consenso | embaixo, a coxa a 0° da vertical; o joelho a 90° o ciclo inteiro | sim |
| Enrolar a pelve em direção ao peito, tirando o quadril do chão | consenso | embaixo, a pele do glúteo a 0 cm do chão; no alto, a 7,7 cm (o centro da bacia sobe 11,1 cm); a pelve enrola 40° (37° na animação de hoje); o joelho anda 33,8 cm na direção da cabeça | sim |
| As costas de cima no chão (lista do app) | consenso | costas e cabeça a 0 cm do chão; o centro do ombro anda 0 cm | sim |
| Sem embalo; descida devagar, sem arquear a lombar | consenso | subida em 1 s, pausa de 1 s, descida em 2 s; a lombar só dobra (de 15° a 55° além da curva de repouso) | sim |

Conferência automática (homem): **0 falha, 1 aviso**; mulher: **0 falha**. Ponto mais baixo do corpo −0,2 cm (no certo) e −0,4 cm na mulher (o antebraço, apoiado no chão); ritmo 5,2% (ok). O aviso: provisórios `lombar.base`, `pelve.enrola`, `pe.plantar`, `ombro.z`, `maos.alcance`, `maos.paraFora` (a ficha não dá número).

## Erros

| Erro (texto do app) | O que o boneco faz (medido) |
|---|---|
| Jogar as pernas | a pelve enrola 30% além do certo e o quadril dobra mais 15°: o glúteo sobe a 9,7 cm (7,7 no certo), a coxa fica a 67° da vertical (40° no certo) e o joelho vem 15 cm mais para a cabeça. O embalo em si (a velocidade) não aparece em quadro parado |
| Empurrar com as mãos | as mãos apertam o chão perto do quadril, com os cotovelos dobrados (100°) e apontando para cima: o braço armado para empurrar (a força não aparece no desenho, como na animação de hoje) |
| Arquear a lombar na descida | embaixo (instante 0): as coxas descem 25° além da vertical em relação à bacia (41° da vertical no mundo), a lombar arqueia 25° e o alto dela (T12–L1) sobe de 3,1 para 6,0 cm, com o glúteo no chão; o pé fica a 4,8 cm do chão |

## Correções já feitas que esta animação respeita

10/11 (R5-anim): o erro das mãos mostra o braço armado para empurrar, porque a força não aparece no desenho; a cabeça não se mexe nos erros (0 cm), e aqui também não.

## Músculos e vistas

Só o abdômen, principal (a ficha: os flexores do quadril não são músculo do app). Vistas: de lado (padrão; 99 cm² do principal) e de três quartos de frente (`quina`, 84 cm²). De frente e de cima o corpo deitado vira uma figura sem leitura (as pernas tapam o tronco).

## O que não ficou bom

- No alto, as coxas tapam parte da barriga: o principal aparece numa faixa estreita, nas duas vistas. É a pose (os joelhos vêm ao peito).
- O fio de "enrola a pelve" desce do alto e cruza a perna até a bacia (o rótulo fica acima do corpo, como na ponte). "Sem embalo das pernas" foi para a vista de três quartos, ligado ao tornozelo, para os dois fios não se cruzarem de lado.
- O quadril sobe menos que na animação de hoje (glúteo a 7,7 cm; hoje o quadril sobe 13 cm), porque aqui ele sobe só pela curva da coluna, com o tórax deitado e os ombros parados.
