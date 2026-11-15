# Relatório · tríceps francês (lote 5)

Os três ficaram prontos, nesta ordem, sobre um núcleo comum (`src/engine/novo/exercicios/triceps-frances-base.ts`). O núcleo deixa o braço numa direção fixa no tronco e só dobra o antebraço. As duas mãos ficam na distância que a carga pede. As regras novas estão em `regras/triceps-frances.ts`, todas com o prefixo `triceps-frances-`. As conferências escritas ficam em `lote-5/<id>.md`.

## triceps-frances (na polia, com corda; em pé, tronco inclinado, de costas para a polia)

- **Conferência:** nenhuma falha e um aviso (as linhas de desenho da ficha). O cotovelo anda 0 cm e o braço gira 0°. O tronco fica a 27°. As mãos ficam 20 cm atrás da cabeça no alongado e o cotovelo chega a 8° no estendido. A corda passa a no mínimo 16,6 cm da cabeça. A pilha sobe 29,9 cm para 59,8 cm de cabo (2:1).
- **O que não ficou bom:**
  - O erro "cotovelos abrem" realça só o braço direito (quadro `frontal:err:f0:abre`). O motivo: com um pé à frente do outro, a ficha não é simétrica, e a cena só realça o lado direito nesse caso. O braço esquerdo também abre, mas fica cinza.
  - De lado, o braço de perto cobre parte da cabeça no alongado. É o "ao lado das orelhas" e acontece também na animação de hoje.
  - O corpo fica um pouco menor no quadro que no búlgaro, porque a coluna de 2,39 m entra no enquadramento.
- **Risco:** médio. A peça e a montagem são novas (a corda, a polia na altura do ombro, a pilha). O realce do erro fica só no braço direito.

## triceps-frances-halter (sentado na ponta do banco reto; as duas mãos sob a cabeça de cima do halter)

- **Conferência:** nenhuma falha e três avisos:
  - a pronação do antebraço chega a 104,6° (média 80°, máximo observado 108°). É a pegada com as palmas para cima sob a cabeça do halter. Ajustei a pose: antes passava de 108° e falhava;
  - as linhas de desenho da ficha;
  - a vista de lado não serve ao modo Músculos.

  As mãos ficam a 12 cm, como na correção de 04/11. A extensão do punho vai até 62°. O halter passa a no mínimo 1,4 cm da pele (antebraço, estendido) e a 49,5 cm do banco.
- **O que não ficou bom:**
  - De frente, no alongado, o halter some atrás da cabeça (`frontal:tec:f0`). A vista de trás o mostra bem, mas nela aparecem 0 cm² do tríceps.
  - Perto da extensão completa, o braço gira um pouco em volta do próprio eixo, para as duas mãos continuarem a 12 cm. A direção do braço não muda.
- **Risco:** médio. A pronação alta (aviso) e a inclinação do halter nas mãos são escolhas de desenho que o dono pode querer ver.

## triceps-frances-kettlebell (sentado; as mãos nas hastes da alça, a bola para baixo)

- **Conferência:** nenhuma falha e um aviso (as linhas de desenho). As mãos ficam a 12,3 cm, nas hastes, e a bola fica sempre abaixo do meio das mãos (de 2,2 a 14,6 cm). A bola passa a no mínimo 5 cm da pele e a 52,7 cm do banco. O "punho" medido chega a 24°: nesta pegada é sobretudo o desvio da mão para o lado, que a conferência conta como extensão.
- **O que não ficou bom:**
  - De lado, a alça quase não aparece (`lateral:tec:f0`).
  - De frente, no alongado, o kettlebell some atrás da cabeça.
- **Risco:** baixo a médio. Segue o halter. A inclinação do kettlebell no alto (quase deitado atrás das mãos) é escolha de desenho.

## Nos três

- A linha do rótulo da mão ("alonga/desce atrás da cabeça") cruza o braço nos quadros com a mão no alto. O texto fica fora do corpo. É a dica do app no ponto `pegada`, e não troquei por outra.
- **Músculos:** com o braço acima da cabeça, o tríceps fica virado para a frente. Por isso a vista padrão do modo Músculos é a de frente (172, 205 e 168 cm²). De trás e de três quartos de trás aparecem 0 cm². As vistas ficaram `lateral` e `frontal`.
- **Arquivos comuns que mexi:** só uma linha em cada registro, todas aditivas:
  - `exercicios/registro.ts`, para os três exercícios;
  - `regras/registro.ts`, para `REGRAS_TRICEPS_FRANCES`;
  - `dados/objetos/registro.ts`, para a corda.

  Não mexi em nenhum arquivo do motor. `npm run check` passa, e `npm run conferir:animacao` dá 0 falha em todas as animações.
- **Medidas provisórias:**
  - **Corda:** a ponta de borracha (4,5 × 4 cm) e a bucha (4 cm) estão como `a-conferir`. O diâmetro de 2,5 cm vem de outro fabricante (living.fit). O comprimento de 71,1 cm e os ramos de 29,2 cm vêm da página da Rogue.
  - **Fichas de movimento (escolhas de desenho):**
    - nas três: o quanto o braço vai para o meio (6° e 8°);
    - na polia: o passo, o calcanhar de trás, a distância das mãos (14 a 20 cm) e o cabo de 42 cm no alongado;
    - no halter e no kettlebell: a inclinação da carga nas mãos (`carga.giro.*`) e o giro dos dedos no halter (−5°).
  - **Ângulos sem número na ficha da técnica** (escolha minha dentro do "cotovelos bem dobrados" e do "ao lado das orelhas"): o cotovelo no alongado (135° e 130°) e o braço a 166,6° e 163° do braço pendurado.
- **Ramo:** `worktree-agent-acfdc05c618e4a213`. **Commits:**
  - `553f656`: polia com corda, o núcleo e a corda;
  - `87b61eb`: halter;
  - o último commit do ramo: kettlebell e este relatório.
