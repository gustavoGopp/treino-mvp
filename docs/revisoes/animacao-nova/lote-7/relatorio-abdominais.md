# Lote 7 · Relatório dos abdominais (e da abertura em T)

De 15/11/2026. Os quatro foram feitos, na ordem pedida. Ramo: `worktree-agent-a19eaaf70b3b270cc` (sobre `8d6851d`). Commits: `aa019cf` (abdominal no chão), `82d123a` (abdominal invertido), `5b0f4b5` (abertura em T deitado) e o último, com o abdominal na bola e este relatório. Sem push, merge nem pull request. Conferências escritas, folhas e quadros em `lote-7/`, `prototipos/folha-<id>.png` e `quadros/<id>.png`.

## Arquivos comuns que mexi

- `exercicios/registro.ts` e `regras/registro.ts`: uma linha por exercício e uma pelo arquivo de regras novo (`regras/abdominais.ts`).
- `exercicios/flexao-joelho.ts` (núcleo de bruços), só aditivo: dois campos opcionais em `OpcoesDeBrucos`, `bracos` (os braços em outra pose, no lugar das mãos sob a testa) e `cabeca` (flexão da cabeça sobre o pescoço, para o erro de levantar a cabeça). Motivo: a abertura em T usa o corpo de bruços com os braços em T e a testa numa toalha. Sem os campos, o resultado é o mesmo: `npm run conferir:animacao` continua sem falha em todas as animações e as linhas das que já existiam não mudaram.
- Nada em `pecas.ts`, `equipamento.ts`, `bola-suica.ts`, no desenho do corpo nem nos núcleos dos outros. Núcleo novo meu: `exercicios/abdominal.ts`.

## abdominal-chao

- Conferência: **0 falha**; avisos: os provisórios e o de músculos que vem do conteúdo (oblíquo externo como secundário dentro do grupo que o conteúdo conta como principal). Mulher: 0 falha.
- Medido: escápulas de 0 cm (embaixo) a 3,9 cm do chão no topo, tórax a 34,5°; glúteo a 0 cm e o alto da lombar sobe 1 cm; a cabeça dobra 13° sobre o alto do tórax no topo; mãos presas ao peito, a 9,8 cm da cabeça.
- O que não ficou bom: os antebraços cruzados tapam a parte de cima do reto do abdômen (subir as mãos joga os cotovelos para cima do corpo e, na mulher, o braço atravessava o chão); o fio de "lombar no chão" desce pela coxa até a bacia (como na ponte); "sobe só as escápulas" ficou fora porque o fio atravessava a cabeça ou o braço em todos os pontos que tentei; sem colchonete (o do motor tem 100 cm, provisório). Quadro: `quadros/abdominal-chao.png`.
- Risco: **médio**. A pose e os erros se leem bem; as mãos cruzadas formam um volume no peito que pode não agradar, e falta o rótulo principal ("sobe só as escápulas").
- Provisórias: `lombar.base` (15°), `toracica.topo` (45°), `lombar.topo` (5°), `joelho` (90°), `ombro.z` e as medidas das mãos cruzadas (`maos.*`).

## abdominal-invertido

- Conferência: **0 falha**, 1 aviso (provisórios). Mulher: 0 falha.
- Medido: costas e cabeça a 0 cm do chão, ombro parado; glúteo de 0 a 7,7 cm (a bacia sobe 11,1 cm), joelho vem 33,8 cm para a cabeça; coxa a 0° da vertical embaixo; joelho a 90° sempre.
- O que não ficou bom: no alto as coxas tapam parte da barriga (o principal aparece numa faixa estreita); o fio de "enrola a pelve" cruza a perna; o quadril sobe menos que na animação de hoje (7,7 cm de glúteo contra 13 cm de quadril), porque sobe só pela curva da coluna, com o tórax deitado. Os erros "jogar as pernas" e "empurrar com as mãos" são de ritmo e força: o quadro parado mostra a pose (pernas além do certo; braço armado), como na animação de hoje. Quadro: `quadros/abdominal-invertido.png`.
- Risco: **médio**, pelo quadril que sobe pouco e pelo erro das mãos, que só se lê pelo título.
- Provisórias: `lombar.base`, `pelve.enrola` (40°), `pe.plantar` (55°), `ombro.z`, `maos.alcance`, `maos.paraFora`.

## abertura-t-deitado (de bruços, testa na toalha)

- Conferência: **0 falha**; avisos: flexão plantar de 60° (o pé deitado, acima da média), provisórios e o modo Músculos (o deltoide posterior aparece de três quartos de trás, 69 cm², e não de frente). Mulher: 0 falha. O ponto mais baixo é −1,5 cm: a barriga que amassa no chão, regra do núcleo de bruços.
- Medido: testa a 0 cm da toalha; braços a 90° do corpo vistos de cima, cotovelo a 5°; mão de 3 cm do chão (embaixo) a 11,1 cm acima do ombro (no alto); clavícula parada (14,2°).
- O que não ficou bom: de frente, a cabeça aparece pelo alto, sem rosto (o rótulo "testa na toalha" ajuda); o erro "encolher os ombros" é pequeno no quadro (a ponta do ombro anda 4,7 cm); "levantar a cabeça" se leria melhor de lado, mas de lado o braço aponta para a câmera, e ficou na vista de três quartos de trás; sem colchonete (as canelas ficariam no ar depois da borda do de 100 cm). Quadro: `quadros/abertura-t-deitado.png`.
- Risco: **médio**: as duas vistas são novas (de frente e de três quartos de trás, no lugar de frente e de cima) e o erro dos ombros é discreto.
- Provisórias: `lombar` (10°), `pe.plantar` (60°), `pe.folga`, `maos.folgaEmbaixo` (3 cm), `bracos.topo` (10°).

## abdominal-bola

- Conferência: **0 falha**, 1 aviso (provisórios). Mulher: 0 falha.
- Medido: a pele da lombar entra de −0,5 a 0,8 cm na bola; nenhum ponto entra mais de 1,3 cm; a bola anda 0 cm; embaixo as escápulas encostam (1 cm), no topo ficam a 2,7 cm da bola, tórax a 36,7°; cabeça de 5° a 13° sobre o tórax.
- O que não ficou bom: a bola não amassa no desenho (a pele entra 1 cm na esfera; achatar pediria mudar a peça pronta); no erro "subir até sentar" o tronco para a 57°, porque mais que isso o quadro abria e o corpo ficava pequeno em todas as vistas de lado; o fio do nome desse erro passa pela cabeça; o quadril fica 8° estendido (17,8° na mulher), com o corpo quase deitado sobre a bola. Quadro: `quadros/abdominal-bola.png`.
- Risco: **médio**: a pose sobre a bola é escolha minha (bacia a 80°, L3 15 cm à frente do centro) e a bola não amassa.
- Provisórias: `pelve.frente`, `lombar.base`, `bola.lombar`, `bola.amassa` (1 cm), `toracica.base` (−10°), `toracica.topo` (45°), `lombar.topo`, `canela.aFrente` e as medidas das mãos (`maos.*`, as do abdominal no chão).

Os pedidos de conteúdo: nenhum. Nada ficou para trás dos quatro.
