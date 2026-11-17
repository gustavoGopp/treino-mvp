# Lote A2 · Remada curvada em pé com elástico, pisando no meio (`remada-curvada-elastico`)

De 17/11/2026. Primeira animação deste exercício (até aqui ele só aparecia como cartão de texto). Em pé, os dois pés inteiros no meio do tubo, tronco bem inclinado com as costas retas; uma ponta em cada mão; os cotovelos vão para trás, rentes ao corpo, até as mãos chegarem perto do quadril. **Ainda não aprovada nem ligada às telas** (quem integra registra em `aprovados.ts` e no catálogo do guia).

- Ficha da técnica: `docs/pesquisa/animacoes/remada-curvada-elastico.md`. Cartão do app: `src/conteudo/exercicios/remada-curvada-elastico.json` (só leitura).
- Ficha de movimento: `src/engine/novo/dados/movimentos/remada-curvada-elastico.json`.
- Animação: `src/engine/novo/exercicios/remada-curvada-elastico.ts`. O corpo parado é o da remada curvada com halteres aprovada (`dobrar-o-quadril.ts`), o braço que puxa é o do núcleo das remadas (`remada.ts`), e o caminho do tubo pisado sai de um núcleo novo, `exercicios/elastico-pisado.ts` (que a remada unilateral com elástico também usa), sobre `elastico-faixa.ts`.
- Quadros grandes: `../quadros/remada-curvada-elastico.png`. **Sem folha** ao lado da animação de hoje: este exercício não tinha animação.

## Onde os números saem

A ficha da técnica não dá nenhum número. Sem animação de hoje, a postura (tronco a 62°, joelhos a 20°, pés na largura do quadril), o braço que puxa (começo, fim, escápulas) e os dois erros de tronco saem da **remada curvada com halteres aprovada** (fonte `curvada` da ficha de movimento, selo `desenho` onde ela era desenho). O tubo é o da tabela (48 pol, `objetos.json`), como na rosca e na remada sentada com elástico aprovadas. **O equilíbrio sai do corpo sem carga:** o elástico é pisado e seguro pelo mesmo corpo, é uma força de dentro (das mãos aos pés) e não desloca o centro de massa (o quadril vai para trás só o que o corpo pede, sem o peso dos halteres na frente).

## O que a fonte pede × o que o boneco faz (medido) × confere?

| O que a ficha da técnica (e o cartão) pede | Selo | O que o boneco faz (medido) | Confere? |
|---|---|---|---|
| Pés inteiros no meio do elástico, na largura do quadril | consenso | o tubo passa sob a sola a 54% do caminho do calcanhar à bola do pé, a 0,6 cm do chão (o raio do tubo); calcanhares no chão (0 cm); os pés não andam (0 cm) | sim |
| Tronco bem inclinado, costas retas | consenso | o peito a 63,3° da vertical; a lombar não dobra além da curva de repouso (0°) | sim |
| Joelhos levemente dobrados | consenso | 20°, parados | sim |
| Uma ponta em cada mão, braços estendidos | consenso | no começo o cotovelo dobra 3°; o centro de cada mão fica sobre o pegador (0 cm) | sim |
| Cotovelos para trás, perto do corpo | consenso | o braço se afasta no máximo 16° do lado do tronco | sim |
| Até as mãos chegarem perto do quadril; cotovelos atrás do tronco | consenso | no fim a mão fica a 81% do caminho do ombro ao quadril; o cotovelo, 5,4 cm além da linha das costas | sim |
| Tronco parado | consenso | a base do pescoço e a bacia andam 0 cm; o tórax gira 0° | sim |
| As escápulas se juntam (da curvada aprovada) | consenso | a clavícula vai 12,3° para trás do começo ao fim | sim |
| ~1 s puxando, pausa curta, ~2 s voltando | consenso | 1,1 s, 0,6 s, 2,1 s; salto de velocidade de 6,7% do pico (limite 15%); o ciclo emenda (0 cm) | sim |
| O elástico estica e não atravessa o corpo | física | de 1,3 vez o comprimento em repouso (braços estendidos) a 1,7 vez (no fim); máximo do fabricante 3 vezes. Passa a no mínimo 3,1 cm da pele (canela) | sim |
| O centro de massa sobre os pés | mecânica | sempre dentro do apoio | sim |

**O tubo dá uma volta em cada mão** ("segure curto", como na remada sentada e no stiff com elástico aprovados): pisado no meio, com os pés na largura do quadril, o tubo de 48 pol ficava frouxo com os braços estendidos (0,9 vez o comprimento em repouso, medido). Com uma volta de 2,4 cm de raio em cada mão, começa a 1,3 vez.

**Conferência automática: 0 falha, 3 avisos.** (1) O elástico estica de 1,3 a 1,7 vez e é "mais esticado em cima" no fim da puxada, e não no começo do ciclo: a regra geral espera o máximo no primeiro quadro (é o mesmo aviso da remada sentada com elástico aprovada). (2) As linhas da ficha de movimento que são escolha de desenho (todas vindas da curvada com halteres, mais as do tubo). (3) Músculos: de lado o principal aparece pouco (176 cm²); o modo Músculos abre de três quartos de trás (551 cm²), como na curvada com halteres.

## As vistas

**De lado** (padrão do modo Técnica): mostra o tronco inclinado parado, o cotovelo que vai para trás e o tubo do pé à mão. **De três quartos, de trás** (a segunda, e a padrão do modo Músculos): as costas e os dois cotovelos, e o tubo passando sob os dois pés. As mesmas vistas da curvada com halteres aprovada.

## Erros (os três do cartão, com o mesmo título e na mesma ordem)

| Erro (texto do app) | Vista | O que o boneco faz (medido) |
|---|---|---|
| Arredondar as costas | de lado | a lombar e a parte de cima das costas curvam 22° cada (o erro da curvada com halteres aprovada); o tubo estica 1,9 vez |
| Subir o tronco | de lado | o tronco sobe 25° na puxada "para esticar o elástico" (o quadril vai de 88° a 63° de flexão) |
| Pisar só com a ponta do pé | de lado | os calcanhares sobem 25° (a bola do pé no chão), o corpo inteiro sobe com os tornozelos (os joelhos ficam a 20°), e o tubo fica sob a ponta dos dedos (97% do caminho do calcanhar à ponta), de onde ele escapa. A consequência do cartão ("pode escapar e voltar no rosto") não é desenhada: o quadro mostra o pé na ponta e o tubo na beira |

## O equipamento

- **Tubo com pegadores:** o da tabela (`objetos.json`, `elastico`: 48 pol, Rogue; estica até 3 vezes, TheraBand). Desenhado com o mesmo tubo e o mesmo pegador da rosca e da remada sentada com elástico aprovadas; afina ao esticar.

## Correções já feitas que esta animação respeita

Não há correção registrada para este exercício (ele nunca teve animação). Das correções do elástico (`correcoes-ja-feitas.md`): o tubo afina ao esticar; onde o elástico passa sob os pés, é isso que se desenha; os rótulos ficam fora do corpo. Da curvada com halteres: ombro de trás e bíceps em laranja (secundários), costas em vermelho.

## Mudança em arquivo comum

`exercicios/remada.ts` (o núcleo das remadas com peso livre) ganhou a opção `carga: 'elastico'`: a mão fecha no pegador do tubo da tabela e o núcleo não desenha carga nem põe peso no equilíbrio (quem usa desenha o elástico). Aditiva: as outras remadas não mudam (os arquivos de preparo delas ficaram iguais).

## O que não ficou bom

- **A volta do tubo na mão** aparece, de lado, como um laço roxo saindo de cima do punho fechado (o mesmo desenho da remada sentada com elástico aprovada). É escolha de desenho para o tubo não começar frouxo; o cartão não fala dela.
- **O rótulo "pés inteiros no elástico"** aponta para a ponta do pé (o motor não tem ponto do meio da sola para rótulo); o tubo passa uns 10 cm atrás.
- **O erro do pé** mostra a pose (calcanhares no ar, tubo na ponta dos dedos), não o elástico escapando: a animação não tem quadro de "escapou".
