# Lote B1 · Levantamento terra com barra hexagonal (`terra-hexagonal`)

De 18/11/2026. Primeira animação deste exercício (até aqui ele só aparecia como cartão de texto). Em pé dentro da barra hexagonal, pés na largura do quadril, as mãos nos cabos (pegada neutra); a barra começa no chão, apoiada nas anilhas de 20 kg; o quadril e o joelho estendem juntos até a pessoa ficar em pé, e a barra volta ao chão, controlada. **Ainda não aprovada nem ligada às telas** (quem integra registra em `aprovados.ts` e no catálogo do guia).

- Ficha da técnica: `docs/pesquisa/animacoes/terra-hexagonal.md`. Cartão do app: `src/conteudo/exercicios/terra-hexagonal.json` (só leitura).
- Ficha de movimento: `src/engine/novo/dados/movimentos/terra-hexagonal.json`.
- Animação: `src/engine/novo/exercicios/terra-hexagonal.ts`, sobre o núcleo dos agachamentos aprovados (`exercicios/agachar.ts`, usado como está). Regras medidas novas: `src/engine/novo/regras/barras-especiais.ts`.
- A peça: `src/engine/novo/pecas-de-cena/barra-hexagonal.ts`, com as medidas em `dados/objetos/barra-hexagonal.json` (folha: `docs/revisoes/animacoes-restantes/pecas/folha-barra-hexagonal.png`).
- Quadros grandes: `../quadros/terra-hexagonal.png`. **Sem folha** ao lado da animação de hoje: este exercício não tinha animação.

## Onde os números saem

A ficha da técnica dá a técnica em palavras; os dois estudos dela (Swinton 2011 e Stahl 2024, um estudo cada) dizem que, comparado ao agachamento, o terra hexagonal tem menos flexão de joelho e mais inclinação do tronco, mas os resumos lidos não dão os ângulos. O que é escolhido e o que sai da conta:

- **Escolhido (selo `desenho`):** o joelho embaixo a 90° (menos que os 126° do agachamento aprovado, e o bastante para o quadril ficar perto da altura do joelho, como a ficha pede: "quadril mais baixo que no terra comum"), os pés a 9 cm do meio com as pontas 5° para fora, os cotovelos a 4° (o do agachamento com halteres aprovado) e uma anilha de 20 kg de cada lado.
- **Da conta:** o peito embaixo inclina o que leva as mãos aos cabos com as anilhas tocando o chão (57°: `resolver1`, guardado para o corpo do app); a posição do quadril sai do centro de massa (corpo + 67,2 kg de barra) sobre o meio do pé, como nos agachamentos; os braços pendem na vertical e abrem para o lado só o que leva cada mão ao seu cabo (os cabos a 63,5 cm, medida da Rogue). Joelho e peito andam no mesmo passo, do embaixo ao em cima ("estende joelhos e quadril juntos"). A barra sai das mãos: o meio dela fica entre as duas pegadas.

Tentei o joelho embaixo a 85°, 100° e 110°. Com mais joelho, a barra fica mais perto da vertical do meio do pé (a 4,8 cm com 110°), mas o tornozelo passa da média (22° de dorsiflexão) e o movimento vira um agachamento, o que os estudos dizem que ele não é; com 85°, o quadril dobra mais (136°) e a barra fica mais à frente. Fiquei com 90°.

## O que a fonte pede × o que o boneco faz (medido) × confere?

| O que a ficha da técnica (e o cartão) pede | Selo | O que o boneco faz (medido) | Confere? |
|---|---|---|---|
| Anilhas iguais dos dois lados, com travas | consenso | uma anilha de 20 kg de cada lado, com a presilha | sim |
| Embaixo: anilhas no chão | consenso | a borda de baixo das anilhas a 0 cm do chão; o centro dos cabos a 22,5 cm | sim |
| Em pé dentro da barra, pés na largura do quadril | consenso | a bola de cada pé a 9 cm do meio; a moldura e os cabos nunca encostam no corpo (a menor folga é 3,1 cm, no antebraço) | sim |
| Pegadores neutros (palmas para dentro) | consenso | cada mão no meio do cabo (0 cm do eixo, 0 cm do meio); a linha da palma a até 4° da linha do cabo; as mãos sempre a 63,5 cm uma da outra | sim |
| Quadril mais baixo que no terra comum | consenso | embaixo, o centro do quadril fica 7,6 cm acima do centro do joelho, com o peito 57° à frente e o quadril dobrado 135°; o joelho dobra 90° (sem regra medida: a ficha não diz quanto mais baixo) | a olho |
| Coluna neutra | consenso | a lombar não dobra além da curva de repouso (0°) | sim |
| Empurra o chão e estende joelhos e quadril juntos | consenso | o joelho estende de 90° a 4° e o quadril de 135° a 4,5°, no mesmo passo (a maior diferença entre as frações das duas fica abaixo de 0,05); o centro de massa (corpo + barra) fica sobre o meio do pé o ciclo todo (0 cm) | sim |
| Braços só seguram | desenho | o cotovelo fica em 4° o ciclo todo | sim |
| Em cima: em pé, quadril e joelhos estendidos | consenso | em cima, o joelho dobra 4° e o quadril 4,5° | sim |
| Descida controlada até as anilhas tocarem o chão de leve | consenso | 2,2 s descendo, 1,4 s subindo, pausas de 0,4 s; as anilhas param no chão (0 cm); o maior salto de velocidade é 5,6% do pico | sim |

O caminho da barra (medido, sem regra): ela sobe quase na vertical, mas anda 7,1 cm para trás no caminho, de 7,4 cm à frente do meio do pé (embaixo) até 0,4 cm (em cima). É o equilíbrio: embaixo, o quadril vai para trás e a barra de 67 kg fica na frente para o peso ficar sobre o meio do pé. Não pus regra de "barra na vertical do meio do pé" porque a ficha não pede isso.

**Conferência automática: 0 falha, 2 avisos.** (1) A flexão do quadril embaixo (135,2°) passa da média da tabela de amplitudes (fica abaixo do máximo observado): é o fundo de um movimento entre o agachamento e o terra, com o peito a 57° e o joelho a 90°. (2) As linhas da ficha de movimento que são escolha de desenho (`pes.paraFora`, `joelho.baixo`, `cotovelo`, `anilhas`).

## As vistas

- **De três quartos, pela frente** (a que o app abre): mostra o corpo dentro do hexágono, os cabos ao lado das mãos, as anilhas no chão, e a inclinação do peito e o quadril. O enquadramento só precisa da moldura e do começo das anilhas (a barra tem 2,26 m de ponta a ponta): as pontas das mangas podem ser cortadas pela borda, para o corpo não ficar pequeno.
- **De lado** (segunda vista): mostra a coluna, o quadril e o peito subindo juntos, e os erros da coluna e do quadril. **A anilha de perto tapa as canelas e os pés embaixo, e as mãos e as coxas no meio da subida**, como numa foto de lado de um levantamento terra.
- De três quartos por trás, o modo Músculos mostra bem os glúteos (está nos quadros grandes); de frente e de trás, a barra vira uma linha e o movimento não se lê.

## Erros (os três do cartão, com o mesmo título e na mesma ordem)

| Erro (texto do app) | Vista | O que o boneco faz (medido) |
|---|---|---|
| Arredondar a lombar | de lado | na saída do chão, a lombar dobra 28° além da curva de repouso e o peito cai a 68° (o certo: 57°) para as mãos continuarem nos cabos com a barra no chão; a lombar volta a neutra até o fim da subida |
| Quadril sobe antes | de lado | a meio caminho, os joelhos já estenderam até 30° (o certo: 47°) e o peito continua a 57° (o certo: 30°): o quadril subiu sozinho e o tronco ficou deitado; depois os dois terminam juntos. A canela inclina 8° para trás nesse instante |
| Soltar a barra | de três quartos | na descida, as mãos abrem e a barra cai na frente delas: a meio caminho, a barra já está 3,9 cm acima do chão, com as mãos a 65 cm de altura. O corpo é o do certo (a comparação é só a barra e as mãos) |

"Soltar a barra" e "Quadril sobe antes" têm consequência visível e foram desenhados como o cartão descreve ("deixar a barra cair na descida"; "o quadril sobe antes do peito"). Nenhum erro do cartão é só de ritmo.

## O equipamento

- **Barra hexagonal:** a peça nova, com as medidas da Rogue TB-1 Trap Bar 2.0 (226,1 × 72,4 cm, tubo quadrado de 3,81 cm, cabos de 3,4 cm a 63,5 cm de centro a centro, mangas de 4,85 cm com 40,6 cm carregáveis, 27,2 kg), toda preta como a da Rogue. O comprimento de cada lado do hexágono, o ângulo das pontas e o batente são de desenho. **O cartão de hoje tinha os cabos deitados ao longo das mangas, a 24 cm um do outro**; na peça nova eles atravessam o hexágono da frente para trás, que é como a pessoa segura.
- **Anilhas e presilhas:** as da barra longa (tabela de objetos), uma de 20 kg de cada lado.

## Correções já feitas que esta animação respeita

Para este exercício, só a da lista dos adutores (`correcoes-ja-feitas.md`, itens 6 e 11): os músculos são os da biblioteca, quadríceps e glúteos como principais, posteriores da coxa e adutores como secundários.

## O que não ficou bom

- **De lado, a anilha tapa muito** (canelas e pés embaixo; mãos e coxas no meio). Por isso a vista que o app abre é a de três quartos; de lado fica para a coluna e os erros.
- **A barra não sobe na vertical:** anda 7 cm para trás no caminho (ver acima). É consequência do equilíbrio com o joelho a 90°; com o joelho mais dobrado ela ficaria mais vertical, mas o movimento viraria agachamento.
- **A cabeça segue a do agachamento aprovado** (o núcleo `agachar.ts` levanta um pouco o olhar quando o peito inclina). Com o peito a 57°, o pescoço fica um pouco estendido; a ficha pede "coluna neutra" e a regra mede só a lombar.
- **A flexão do quadril embaixo (135°) passa da média da tabela** (aviso, sem falha).
- **No erro "Quadril sobe antes", a canela inclina 8° para trás**: com a barra pesada na frente e o tronco deitado, é onde o equilíbrio põe o quadril.
- **De três quartos, o rótulo é um só** ("peito e quadril sobem juntos"): "empurra o chão" apontava para o calcanhar e a linha atravessava a manga e a anilha; "coluna neutra", de três quartos, caía em cima do braço.
