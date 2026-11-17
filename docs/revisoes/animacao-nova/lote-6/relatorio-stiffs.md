# Relatório do lote 6: os stiffs no motor novo

Os quatro estão prontos, na ordem pedida, e cada um tem a sua conferência escrita em `docs/revisoes/animacao-nova/lote-6/`. O núcleo comum fica em `src/engine/novo/exercicios/dobrar-o-quadril.ts`. Ele acha o quadril pelo ângulo do joelho e pelo centro de massa sobre o meio do pé; numa perna só, também de lado. A mão desce até a carga ficar a 1 cm da pele, e esse caminho é alisado. As regras novas estão em `src/engine/novo/regras/stiffs.ts`.

`npm run check` passa. `npm run conferir:animacao` dá 0 falha nas 19 animações; os arquivos gerais que ele regrava foram desfeitos antes do commit.

Antes de entregar, conferi os quadros grandes de cada um, inclusive na cor de pele e no tema escuro, item por item da seção 8 do guia. Os defeitos que vi foram consertados:
- o kettlebell encostava no peito do pé;
- o pé livre do unilateral tocava o chão em pé;
- o erro "agachar" do unilateral punha o pé no chão;
- havia rótulos demais;
- a vista de frente era ilegível embaixo.

## stiff (halteres)
- **Conferência automática:** 0 falha. São dois avisos: as linhas que são escolha de desenho e a vista de lado, que não serve ao modo Músculos (a padrão é a de três quartos, de trás).
- **Até onde desce:** segui a ficha, e não a nota antiga sem correção. O centro da pegada chega a 28 cm do chão, a 51% da canela, que é o meio dela. Para isso o peito fica a 2° da horizontal e o quadril dobra 112°, com a lombar neutra (0°). Isso é mais fundo que a animação de hoje, que parava no joelho.
- **O que não ficou bom:**
  - A descida funda é a de quem tem boa flexibilidade.
  - De frente, os dois halteres de 33 cm, lado a lado, parecem quase uma barra.
- **Risco: médio.** A posição de baixo é bem mais funda que a aprovada hoje. Se o dono não gostar, basta mudar `maos.embaixo` na ficha.

## stiff-kettlebell
- **Conferência automática:** 0 falha, com os mesmos dois avisos.
- **Até onde desce:** as mãos param a 65% da canela, e não no meio dela, para a bola não encostar no peito do pé. Ela fica a 5,2 cm da pele do pé. É escolha de desenho.
- **O que não ficou bom:** de três quartos, de trás, o kettlebell quase some atrás das pernas. Ele se lê na vista de lado, que é a padrão.
- **Risco: baixo/médio.** O desenho é o do `stiff`, com o kettlebell do gerador realista e a alça nas duas mãos.

## stiff-elastico
- **Conferência automática:** 0 falha, com os mesmos dois avisos.
- **O elástico:** estica de 1,1 vez (embaixo) a 1,9 vez (em pé). Fica sempre esticado, mais esticado em cima e abaixo do máximo de 3 vezes. O tubo afina ao esticar e passa por fora das pernas.
- **O que não ficou bom:**
  - Com o tubo de 122 cm, sem encurtar, o elástico ficaria frouxo embaixo. Por isso pus **uma volta do elástico em cada mão**. É escolha minha: a ficha cita a volta só como progressão. Anotei em `pedidos-stiffs.md`.
  - O equilíbrio não conta a força do elástico.
  - O fio do rótulo das mãos cruza a coxa.
- **Risco: médio**, pela volta na mão, que é uma escolha nova.

## stiff-unilateral
- **Conferência automática:** 0 falha, com os mesmos dois avisos.
- **O que confere (medido):**
  - O centro de massa (corpo + halter) fica sobre o meio do pé direito, para a frente e de lado (0 cm). Para isso a bacia vai 6,9 cm para cima do pé de apoio.
  - A perna livre fica a 2° da linha do tronco.
  - O quadril fica nivelado (0 cm de diferença entre os dois lados).
  - O tronco fica a 11° da horizontal.
- **A segunda vista:** a de três quartos, de trás, no lugar da de frente da animação de hoje. De frente, o tronco tapa o corpo; de trás, a perna livre vira um borrão. O erro "abrir o quadril" é mostrado nessa vista.
- **O que não ficou bom:**
  - O fio do rótulo "quadril nivelado" cruza a coxa.
  - A mão livre só pende.
- **Risco: médio.** Mudam o lado do apoio (agora o direito), a vista e a pose de em pé (o pé livre logo atrás, com o joelho dobrado).

## Comum aos quatro
- **Glúteo:** laranja (secundário) e posteriores da coxa em vermelho, como decidiu a revisão de 02/11. A ficha do unilateral ainda dá o glúteo como primário; anotei em `pedidos-stiffs.md`.
- **Eretores da coluna:** ficam fora, porque o desenho do Boneco novo não tem esse grupo.
- **O erro "lombar arredonda" sem exagero:** a cabeça fica sempre de 10 a 30 cm acima do centro do joelho, e a carga desce só 3 cm a mais que no certo.

## Arquivos comuns que mexi
Só as linhas aditivas nos registros:
- 4 linhas em `exercicios/registro.ts`;
- 1 linha em `regras/registro.ts`.

Nenhum arquivo do motor foi alterado.

## Medidas provisórias (selo desenho)
- Os ângulos do joelho: 8 a 15° nos bilaterais; 10 a 16° no unilateral.
- O cotovelo a 4°.
- A folga da carga: 1 cm; 0,6 cm no unilateral; 0,5 cm no elástico.
- As mãos a 17 cm do meio (halteres) e a 13 cm (elástico).
- A altura das mãos embaixo no kettlebell (65% da canela).
- O raio da mão e da volta do elástico.
- A posição do pé de apoio e da perna livre no unilateral.
- Todos os números dos erros.

## Ramo e commits
Ramo `worktree-agent-a7df51f3b81336764`:
- `9d84a4f`: stiff (com o núcleo e as regras);
- `cc5697e`: stiff-kettlebell;
- `3b9b0ee`: stiff-elastico;
- `8bff2be`: stiff-unilateral;
- mais um último commit, só com este relatório.

Não fiz push nem merge.
