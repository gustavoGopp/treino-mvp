# Lote 6 · Ponte de glúteo com halter (`ponte-gluteo-halter`)

De 15/11/2026. **Ainda não foi revista pelo Gustavo.**

- Ficha da técnica: `docs/pesquisa/animacoes/ponte-gluteo-halter.md`. Texto do app: `src/conteudo/exercicios/ponte-gluteo-halter.json` (só leitura). Animação de hoje: `src/engine/exercicios/ponte-gluteo-halter.ts`; conferência dela: `docs/revisoes/r5-anim/conferencia/ponte-gluteo-halter.md`.
- Ficha de movimento: `src/engine/novo/dados/movimentos/ponte-gluteo-halter.json`.
- Animação: `src/engine/novo/exercicios/ponte-gluteo-halter.ts`, sobre o núcleo das pontes (`exercicios/ponte.ts`, com `carga: 'halter'`). O halter é o `halter` de `pecas.ts` (sextavado, medidas de `dados/objetos.json`), desenhado pelo gerador realista.
- Regras novas desta carga (`regras/pontes.ts`): `ponte-carga-nas-duas-maos`, `ponte-carga-no-quadril`; as outras são as da ponte (`ponte-gluteo.md`).
- Folha: `../prototipos/folha-ponte-gluteo-halter.png`. Quadros grandes: `../quadros/ponte-gluteo-halter.png`.

## Como a pose é montada

O corpo é o da ponte sem carga (mesma bacia, mesmos pés; ver `ponte-gluteo.md`). O halter, de través (o cabo ao longo de x):

1. **Onde fica:** embaixo, procurei, ao longo do corpo, o lugar onde o halter assenta mais baixo entre a barriga e as coxas (a dobra do quadril); daí em diante esse ponto anda preso à bacia. A cada quadro, o halter desce na vertical até encostar no corpo (barriga, bacia, coxas; os braços ficam de fora), contra as cabeças sextavadas e o cabo. Ele nem entra no corpo nem fica no ar, e sobe e desce com o quadril.
2. **As mãos:** cada mão segura uma cabeça pela ponta de fora ("as mãos seguram as anilhas pelos lados", como na animação aprovada), com os dedos por cima. Testei a mão em volta da cabeça (como uma pegada no cabo): de cima e de três quartos o halter tapava as mãos inteiras.
3. **Os cotovelos** (correção de 10/11, "o braço está estranho"): apontam para fora e para baixo; embaixo, o cotovelo fica no chão ao lado da cintura e, no topo, sobe com o halter.

Contatos declarados: os pés (`pe.R`, `pe.L`) e `costas`. `costas` não tem medição na conferência comum: é a regra `ombros-e-cabeca-no-chao` que mede; serve para a conferência não tratar o corpo como "só os pés apoiam" (o equilíbrio de quem está em pé).

## O que a fonte pede × o que o boneco faz (medido) × confere?

| O que a ficha da técnica pede | Selo | O que o boneco faz (medido) | Confere? |
|---|---|---|---|
| O halter deitado de través sobre a dobra do quadril | consenso | o halter assenta na dobra (embaixo, a 10 cm do meio dos quadris para o lado da cabeça e 18 cm acima deles); folga até o corpo de 0 cm em todo o ciclo; a distância do centro dele ao meio dos quadris fica entre 21,1 e 21,2 cm | sim |
| As duas mãos seguram o halter o tempo todo | consenso | cada pegada a 0 cm do ponto da cabeça que ela segura; as pegadas a 33 cm uma da outra (as pontas do halter) | sim |
| Cotovelos apoiados no chão ao lado da cintura (correção de 10/11) | consenso | embaixo, o centro do cotovelo fica a 6,4 cm do chão (a pele encosta), a 33,6 cm do meio do corpo; no topo sobe a 24,1 cm | **em parte**: na de hoje, 25 cm do meio do corpo e 16 cm no topo; aqui o halter assenta mais alto (na pele do Boneco) e o cotovelo acompanha |
| De costas, joelhos dobrados, pés no chão na largura do quadril, calcanhares a cerca de um palmo | consenso | como na ponte sem carga: tornozelos a 16,7 cm; calcanhar a 15,4 cm do glúteo | em parte (o palmo, como na ponte) |
| Subida até ombros, quadril e joelhos em linha; pausa; descida até o quadril quase no chão | consenso | 179,8° no topo; glúteo de 1,5 a 19,4 cm do chão; 1,2 s, 1 s, 2 s | sim |
| Sem arquear a lombar; ombros e cabeça no chão | consenso | lombar 0°; costas de 0 a 0,4 cm, cabeça 0 cm; o ombro anda 1,9 cm | sim |

Conferência automática (homem): **0 falha, 2 avisos**. Cotovelo até 86°; ritmo 8,4% (ok); o corpo não passa do chão (0 cm; −0,2 cm no erro do halter rolando). No corpo da mulher, também 0 falha. Avisos: (1) Músculos: de cima o glúteo não aparece (0 cm²); a vista padrão do modo Músculos é a de lado (155 cm²). (2) Provisórios `quadril.folgaEmbaixo`, `ombro.z`, `maos.naCabeca.acima` (2 cm), `maos.naCabeca.diam` (6 cm), `maos.poloFora`, `maos.poloCabeca` (direção dos cotovelos), `maos.alcance` e `maos.paraFora` (só a mão que solta no erro).

## Erros

| Erro (texto do app) | Vista | O que o boneco faz (medido) |
|---|---|---|
| Arquear a lombar no topo (`e1`) | de lado | a lombar arqueia 22° e o quadril fica com 16,5° de flexão; o halter vai junto (o centro a 48,8 cm do chão; 45 no certo) |
| Halter rolando (`e2`) | de cima | a mão esquerda solta e vai ao chão ao lado do corpo; o halter escorrega 14 cm para o lado direito e assenta de novo no corpo, com a cabeça da direita para fora do quadril (o centro a 47,6 cm do chão, 2,6 cm acima do certo: a cabeça da esquerda sobe no osso do quadril); a mão direita segue com ele |
| Empurrar pela ponta dos pés (`e3`) | de lado | o calcanhar sobe a 12,8 cm do chão, a bola do pé fica no lugar |
| Subir pouco (`e4`) | de lado | o quadril para em 40% do caminho (glúteo a 8,5 cm) |

## Correções já feitas que esta animação respeita

- 10/11: cotovelos no chão ao lado da cintura (embaixo, medido 6,4 cm do centro do cotovelo ao chão); vista de cima para o "halter rolando".
- 04/11 (ponte): em linha no topo e canela em pé.
- A toalha sob o halter não é desenhada, como na de hoje (está no texto e no checklist).

## Músculos e vistas

Só o glúteo, principal (biblioteca). Vistas: de lado (padrão; Músculos) e de cima, como a animação aprovada: é a de cima que mostra o halter rolando para o lado. Testei a de três quartos (`quina`): mostra bem o glúteo, mas o halter cobre as mãos e o erro de rolar fica menos claro do que de cima.

## O que não ficou bom

- No topo, o cotovelo fica a 24 cm do chão (16 cm na de hoje). Com o halter assentado na pele do Boneco e as mãos nas pontas dele, o antebraço não alcança mais baixo; baixar o cotovelo pede o halter mais baixo, o que o faria entrar na barriga.
- O calcanhar fica a 15,4 cm do glúteo (um pouco menos que um palmo), como na ponte sem carga.
- De cima, o corpo deitado se lê como uma figura de frente; a vista serve ao erro do halter rolando, e a técnica se lê de lado.

## Correção de 19/11 (peso dentro do corpo)

Depois do aviso do Gustavo na remada sem banco ("o halter tá puxando pra dentro do próprio corpo"), a regra `peso-fora-do-corpo` (a superfície do peso contra o volume do corpo, fora as mãos que seguram, no ciclo e em cada erro em 9 instantes; tolerância de 0,5 cm) e a checagem de pesos da conferência da pintura foram passadas em todas as animações com peso livre. Nesta, **o halter entrava 2,1 cm na emenda da cintura** no ciclo (3,3 cm no erro "Halter rolando"; 2,1 cm e 1,4 cm na cintura e no tronco pela checagem da pintura). O halter assentava no corpo pelos 12 pontos de cada anel do Boneco, sem a emenda da cintura (o volume que junta o tronco à bacia): entre os pontos, ele afundava. E, como a dobra do quadril era procurada nesses pontos, ele parava sobre a barriga baixa, 9,5 cm mais para o lado da cabeça que a dobra.

**A mudança.**

- Opção nova do núcleo `exercicios/ponte.ts`, `superficieDensa` (aditiva; desligada, nada muda; a ponte com kettlebell e a sem carga não a usam): a carga assenta sobre a superfície inteira das partes onde ela apoia, a emenda da cintura inclusive, com pontos entre os anéis (a cada ~1 cm) e 36 em volta de cada anel. O halter agora fica na dobra do quadril, como a ficha pede, e não entra no corpo.
- As mãos e os cotovelos vão junto com o halter (as mãos nas pontas das cabeças).

| medido (homem) | antes | depois |
|---|---|---|
| o halter entra no corpo (ciclo) | 2,1 cm (emenda da cintura) | 0 cm |
| o halter entra no corpo (erro "Halter rolando") | 3,3 cm (emenda da cintura) | 0,2 cm (no antebraço direito, que segura) |
| onde o halter fica, embaixo | sobre a barriga baixa | na dobra do quadril |

A ficha liga `peso-fora-do-corpo`: medida no estado de antes, ela falha (2,1 cm no ciclo e 3,3 cm no erro "Halter rolando", na emenda da cintura); no de agora, passa (0,2 cm, no antebraço, no erro "Halter rolando"). O antes e depois está em `correcao-das-antigas/ponte-gluteo-halter-peso.png`; os quadros grandes foram regravados (`quadros/ponte-gluteo-halter.png`) e olhados vista por vista, quadro a quadro e erro a erro, nos dois lados do corpo. A conferência automática dá **0 falhas e 2 avisos** (antes: 0 falhas e 3 avisos, entre eles o de pesos).

**O que ainda não ficou bom.**
- O halter mudou de lugar (9,5 cm, da barriga baixa para a dobra do quadril): é o que a ficha pede, mas o quadro aprovado mudou mais que só a altura.
