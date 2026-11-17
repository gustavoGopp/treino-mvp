# Lote 6 · Ponte de glúteo (`ponte-gluteo`)

De 15/11/2026. Primeira das pontes no motor novo. **Ainda não foi revista pelo Gustavo.**

- Ficha da técnica: `docs/pesquisa/animacoes/ponte-gluteo.md`. Texto do app: `src/conteudo/exercicios/ponte-gluteo.json` (só leitura). Animação de hoje: `src/engine/exercicios/ponte-gluteo.ts` (só leitura).
- Ficha de movimento: `src/engine/novo/dados/movimentos/ponte-gluteo.json`.
- Animação: `src/engine/novo/exercicios/ponte-gluteo.ts`, sobre o núcleo novo das pontes (`exercicios/ponte.ts`: `ponteDePesNoChao` e `criarPonte`), que usa o tronco de costas do núcleo das flexões de joelho deitado (`exercicios/flexao-joelho.ts`: `troncoDeCostas` e `bracosNoChao`, separados de `ponteDeCostas` sem mudar o resultado dela).
- Regras medidas novas: `src/engine/novo/regras/pontes.ts` (`ponte-quadril-quase-no-chao`, `ponte-calcanhares-no-chao`, `ponte-pes-a-um-palmo`); reaproveitadas: `ombros-e-cabeca-no-chao` e `em-linha-no-fim` (`regras/flexao-joelho.ts`), `lombar-neutra` (`conferir.ts`).
- Folha ao lado da de hoje: `../prototipos/folha-ponte-gluteo.png`. Quadros grandes: `../quadros/ponte-gluteo.png`.

## Como a pose é montada

Deitado de costas, a cabeça para −z. A cada quadro: (1) a bacia inclina, do glúteo a 1,5 cm do chão (embaixo) ao ombro, quadril e joelho em linha (em cima); (2) o corpo desce até a parte de cima das costas encostar no chão e o pescoço dobra até a cabeça encostar; (3) o corpo anda em z para o ombro ficar no lugar; (4) as pernas se resolvem até os pés, presos no chão (bola e ponta do pé, `pe.R` e `pe.L` nos contatos). O pé fica onde, no topo, a canela fica em pé (a correção de 04/11 da ponte aprovada); a distância do calcanhar ao glúteo sai disso e é medida. As mãos ficam espalmadas no chão (`mao.R`, `mao.L`); a distância delas ao ombro é uma fração do braço mais o antebraço, para servir aos dois corpos (homem e mulher).

## O que a fonte pede × o que o boneco faz (medido) × confere?

| O que a ficha da técnica pede | Selo | O que o boneco faz (medido) | Confere? |
|---|---|---|---|
| Deitado de costas, joelhos dobrados, braços no chão ao lado do corpo, um pouco abertos | consenso | mãos espalmadas no chão, 10 cm para fora da linha do ombro e a 54,4 cm dele na direção dos pés; cotovelo dobra 27°; as mãos não saem do lugar (0 cm) | sim |
| Pés no chão na largura do quadril | consenso | tornozelos a 16,7 cm um do outro (a distância entre os centros dos quadris); bola e ponta do pé paradas (0 cm) | sim |
| Calcanhares a cerca de um palmo dos glúteos | consenso | embaixo, o calcanhar fica a 15,4 cm da pele do glúteo | **em parte**: um pouco menos que um palmo (~20 cm); é o que dá com a canela em pé no topo |
| Empurra pelos calcanhares (o calcanhar fica no chão) | consenso | o ponto mais baixo do pé fica a 0 cm do chão o ciclo inteiro | sim |
| Embaixo, o quadril quase encosta no chão | consenso | a pele do glúteo fica a 1,5 cm do chão (escolha de desenho; a ficha não dá número) | sim |
| Em cima, ombros, quadril e joelhos em linha; canela em pé (correção de 04/11) | consenso | 180° de lado no topo; canela a 0° da vertical; o centro da bacia sobe de 11,8 a 31,1 cm e a pele do glúteo de 1,5 a 19,4 cm | sim |
| Sem arquear a lombar | consenso | lombar a 0° além da curva de repouso | sim |
| Ombros e cabeça no chão o tempo todo | consenso | costas de 0 a 0,4 cm do chão, cabeça a 0 cm; o centro do ombro anda 2,0 cm (a escápula rola quando a bacia sobe; o limite da regra, do colega, é 2 cm) | sim, no limite |
| Subida ~1 s, topo ~1 s, descida ~2 s | consenso | 1,2 s, 1 s e 2 s, com 0,5 s parado embaixo | sim |

Conferência automática (homem): **0 falha, 1 aviso**. Amplitudes: joelho de 116° (topo) a 134° (embaixo); quadril de 55° de flexão a 0°; ponto mais baixo do corpo −0,5 cm; ritmo 6,5% (ok). No corpo da mulher, também 0 falha. O aviso: provisórios `quadril.folgaEmbaixo` (1,5 cm), `ombro.z`, `maos.alcance`, `maos.paraFora` (posição da cena e das mãos).

## Erros

| Erro (texto do app) | O que o boneco faz (medido) |
|---|---|
| Arquear a lombar no topo | a lombar arqueia 22° e a bacia inclina menos: o quadril fica com 16,5° de flexão (0° no certo) e a barriga sobe; a linha ombro–quadril–joelho dá 177°, porque o tórax é que sobe (o erro se vê na curva das costas) |
| Empurrar pela ponta dos pés | o calcanhar sobe até 12,8 cm do chão (o pé a 40° da horizontal), a bola do pé no lugar; o quadril fica 9° abaixo da linha |
| Subir pouco | o quadril para em 40% do caminho: glúteo a 8,5 cm do chão (19,4 no certo), a 32,5° da linha |

O dos joelhos caindo para dentro fica no texto, como na animação de hoje.

## Correções já feitas que esta animação respeita

- 04/11 (aprovada "com o erro mais claro"): no topo, ombro, quadril e joelho em linha e canela em pé. Medido: 180° e 0°. O "raso" para bem abaixo da linha (40% do caminho) para não parecer o quadro de subida.

## Músculos e vistas

Só o glúteo, principal, sem secundário (biblioteca; revisão de anatomia de 02/11). Vistas: de lado (padrão; 155 cm² do glúteo) e de três quartos de frente (`quina`; 115 cm²). Testei as outras: de cima e de frente o corpo deitado vira uma figura sem leitura (o glúteo fica escondido embaixo), e de três quartos de trás o glúteo some (0 cm²) e o tronco tapa as pernas. A `quina` mostra a ponte inteira e o glúteo; para a folha ao lado da de hoje, acrescentei `quina` aos dois mapas de vista de `scripts/animacao-nova/prototipos.mjs` (comparada com a vista de lado de hoje, que não tem três quartos).

## O que não ficou bom

- O calcanhar fica a 15,4 cm do glúteo, um pouco menos que um palmo. Afastar o pé tira a canela da vertical no topo, que foi a correção aprovada; deixei a canela.
- O ombro anda 2,0 cm, no limite da regra (escolha de desenho do colega). Mãos mais perto do ombro passam de 2 cm.
- O colchonete da animação de hoje não é desenhado (a ficha: "o chão; um colchonete ajuda").
