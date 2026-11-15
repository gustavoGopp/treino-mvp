# Relatório: correção do búlgaro na suspensão (`bulgaro-suspensao`)

De 15/11/2026. Ramo `worktree-agent-a15bc4d7d642ac73d`, sobre `3effee9`. Commits: `7fb9441` (a correção) e o deste relatório. Sem push.

## O que mudou

1. **Berço em volta do pé.** Antes, uma fita só subia pelo meio do pé e atravessava o tornozelo. Agora o berço tem as duas tiras laterais, uma de cada lado do pé, que se juntam no pegador acima dele, e uma almofada sob o peito do pé. As tiras passam a 1,5 cm de cada lado do pé (9,9 cm de largura, da tabela do corpo). Elas se juntam 1,5 cm acima do ponto mais alto do pé e do tornozelo, medido no Boneco ao longo do ciclo. A fita que sobe para a âncora sai do pegador, acima do pé.
2. **O pé gira no berço.** Ele gira em volta do ponto de apoio (o peito do pé). Em cima, fica com a ponta mais para baixo, até o tornozelo de trás chegar a 52°, como no búlgaro aprovado. Na descida, volta à inclinação do banco: 33° embaixo. **A flexão plantar caiu de 73° para 52°** (média de 57°), e o aviso saiu. A sola continua para cima (em cima, cerca de 45° da horizontal). O fundo do berço continua andando 8 cm no arco; o tornozelo, que agora também gira, anda 6,7 cm.
3. **Fita legível.** A fita gira 45° em volta do comprimento. De lado, ela deixou de ser um fio de 0,35 cm. De frente, ficou mais estreita atrás da cabeça. No tema escuro, aparece em cinza sobre o fundo. Testei como segunda vista a `posterior`, a `quinaTras` e a `quina`. A `frontal` fica: é a que mostra o erro do joelho para dentro e o prumo "joelho sobre o pé", e com a fita mais estreita ela se lê.
4. **O corpo do tamanho do aprovado.** A viga e a ponta da fita de ancoragem viraram cenário (`vigaComoCenario`, o mesmo campo que a remada usa). O quadro deixou de subir até 205 cm, e o corpo ficou do tamanho do búlgaro aprovado. Comparei os dois lado a lado.

Arquivos mexidos:

- **`exercicios/bulgaro-base.ts`** (só no caminho da fita):
  - o giro do pé no berço;
  - o tamanho do berço, medido no Boneco;
  - a fita girada;
  - a viga como cenário.
- **`pecas-de-cena/suspensao.ts`**, só com campos opcionais:
  - `largura` e `juntaAcima` no pegador do pé;
  - `fitaGirada` na fita.

  Sem esses campos, o desenho é o mesmo de antes. Conferi pelo SVG de todas as 29 animações (as duas vistas, os dois temas, os erros e os comprimentos das fitas), antes e depois: só o `bulgaro-suspensao` mudou.
- **Ficha de movimento:** três linhas novas, de desenho: `fita.flexaoPlantarEmCima` (52°, do aprovado), `fita.bercoFolga` (1,5 cm) e `fita.giroDaFita` (45°).

## Conferência

- `node scripts/animacao-nova/conferir.mjs bulgaro-suspensao`: **0 falha, 2 avisos**. Os dois:
  - as linhas de desenho da ficha;
  - a vista de frente, que não serve ao modo Músculos (a padrão é a de lado, como no aprovado).
- A fita mede de 154,6 a 154,7 cm no ciclo; o berço fica a 28,3 cm (meio da canela).
- `npm run conferir:animacao`: 0 falha em todas. `npm run check` passa.
- Os arquivos gerais regenerados foram desfeitos antes do commit.

## Os nove itens da seção 8, nos quadros grandes (`quadros/bulgaro-suspensao.png`)

1. **O corpo parece uma pessoa:** sim. Coluna e cabeça no lugar, nada atravessa o chão. O pé de trás fica dentro do berço.
2. **Rosto e cabeça:** não encostam em nada.
3. **O corpo ocupa o quadro:** sim, do tamanho do búlgaro aprovado (a viga é cenário).
4. **As duas vistas se leem:** sim, de lado e de frente.
5. **Equipamento do gerador realista:** sim. Fita, fivela, mosquetão, pegador, tiras e almofada saem todos dele.
6. **Pés apoiam de verdade:** sim. O peito do pé fica a 0 cm do fundo do berço, e as mãos ficam na cintura.
7. **Os erros se leem:** sim. O joelho para dentro cai 7,2 cm sem cruzar o meio do corpo; "empurrar com o pé de trás" e "descer pouco" aparecem de lado.
8. **Rótulos:** sim. Minúsculos, sem ponto, dois de lado e um de frente, fora do corpo.
9. **Tema escuro e cor de pele:** olhei os dois, e a fita aparece nos dois.

## O que ainda não está bom

Nenhum dos nove itens falha. Fica isto, que não é defeito de desenho:

- **O pé de trás fica baixo** (tornozelo a 32 cm). É o que a ficha pede (alça no meio da canela, como manda o fabricante); quadro: `bulgaro-suspensao:lateral:tec:f0`.
- **De lado, a tira do berço do lado de perto passa por cima do pé.** É como na fita real; o pé aparece dos dois lados dela. Mesmo quadro.

**Risco de o Gustavo não gostar: baixo para médio.** O médio vem só do pé de trás baixo, que é o que a ficha pede.
