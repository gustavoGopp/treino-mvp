# Lote 2 · Relatório das flexões

De 15/11/2026. Ramo `worktree-agent-a355db8a2fe6a9372`, sobre `d28725f`. Sem push, merge nem pull request. As quatro animações estão feitas, cada uma com conferência escrita nesta pasta.

## Núcleo comum

`flexao.ts` virou um arquivo curto sobre o núcleo novo `exercicios/flexionar.ts` (`criarFlexao`). O núcleo recebe da ficha a largura e a linha das mãos e o ângulo dos cotovelos; os pés podem apoiar no chão ou no banco reto; o pescoço pode estender mais (opcional); a descida pode parar quando a cabeça chega ao chão (opcional); e cada variação pode acrescentar a sua cena. **A `flexao` não mudou:** comparei os quadros dela (dois corpos, o certo e os três erros, 21 instantes) antes e depois de cada commit, e saíram idênticos. A folha regenerada também saiu idêntica, byte a byte. A conferência dela continua com 0 falha e 6 avisos.

## Por exercício

### 1. `flexao-fechada`: mãos juntas
- **Conferência:** 0 falha. Avisos: extensão do punho 94,6° (o máximo é 95°), pronação 84,5°, dedos do pé 76,1°, ritmo 17,2%, linhas de desenho, vista de cima sem serventia para os Músculos.
- **O que não ficou bom:** as mãos ficam a 14 cm do ombro, e não "abaixo da parte de baixo do peito": com 16 cm, o punho passava do máximo e a conferência falhava. O erro dos cotovelos abre só até 51° (o da `flexao` abre até 72°). De cima, embaixo, os cotovelos quase somem debaixo do tronco.
- **Risco:** **baixo**. É a `flexao` aprovada com as mãos e os cotovelos trocados.

### 2. `flexao-pes-elevados`: pés num apoio
- **Conferência:** 0 falha. Avisos: dorsiflexão do tornozelo 27°, punho 93°, dedos do pé 80°, ritmo 15,3%, oito linhas de desenho, o abdômen listrado (a correção de 10/11), a vista de cima.
- **O que não ficou bom:** o peito para a 8,9 cm do chão (o limite da regra é 9). Com a cabeça em linha, ela chega ao chão antes do peito: com o peito a 5 cm, a cabeça entraria 4,7 cm no chão. Agora a cabeça para a 1,5 cm do chão, e de lado parece que o rosto encosta. O apoio é o **banco reto** (43,5 cm, medida com fonte), e não o degrau, a cama ou o sofá que o texto do app cita; tem a altura da caixa de 45 cm aprovada em 10/11. A linha das mãos e o tornozelo mudaram contra a `flexao` para os ângulos caberem nos limites. O erro do quadril mostra só o quadril caído, como a animação de hoje.
- **Risco:** **médio**, pela troca do apoio e pelo peito a quase 9 cm do chão.

### 3. `flexao-elastico`: elástico nas costas
- **Conferência:** 0 falha. Avisos: os mesmos da `flexao` e mais três linhas de desenho do elástico. O elástico estica 1,7 vez em cima e 1,2 vez embaixo, sem nunca ficar frouxo e longe das 3 vezes do fabricante.
- **O que usei:** o tubo com pegadores da tabela (o do agachamento com elástico), e não uma faixa chata. O texto do app aceita "um elástico com pegadores", e o tubo já tem medidas de fabricante; a faixa seria um objeto novo sem ficha lida. O tubo segue a pele das costas, 12 cm abaixo da C7, passa por fora do ombro e desce até o dorso da mão. A volta na mão (22 cm de tubo de cada lado) entra na conta do comprimento. O pegador fica no chão, atrás da mão.
- **O que não ficou bom:** de lado, em cima, o elástico quase some atrás do braço. A volta na mão não é desenhada. O erro "elástico no pescoço" fica discreto de lado.
- **Risco:** **médio**, pela leitura do elástico.

### 4. `flexao-bola`: não é flexão de braço
- **Atenção:** a ficha da técnica, o texto do app e a animação de hoje tratam da **flexão de joelho na bola suíça** (posteriores da coxa, deitado de costas, calcanhares na bola), e não de uma "flexão com apoio na bola". Fiz a da ficha. Uma flexão de braço com apoio na bola não existe na biblioteca e não foi feita.
- **Conferência:** 0 falha. Avisos: flexão plantar do tornozelo 61,4°, cinco linhas de desenho, a vista de cima sem serventia para os Músculos. O ritmo ficou suave (7%), e as 8 regras novas passam.
- **A bola:** peça de cena nova. A bola rola com o pé, 43 cm, e uma costura gira junto. Ela achata embaixo, e o pé encosta nela sem atravessar (de −0,1 a 0,1 cm).
- **O que não ficou bom:** no fim, o tronco fica muito inclinado, com a pelve a 54 cm e o pescoço dobrado 50°. Para isso funcionar, a parte de cima das costas se arredonda 25° (escolha de desenho). No erro "quadril encosta na volta", a cabeça fica jogada para trás (o pescoço estende 46°). A bola é um círculo desenhado à mão, e de cima a luz não acompanha a vista. O achatamento é provisório. A panturrilha saiu do realce que a animação de hoje tem, porque a ficha não a conta. O cotovelo fica dobrado 27°.
- **Risco:** **alto**. É outro exercício, numa peça nova, com a posição do fim bem diferente da de hoje.

## Arquivos comuns que mexi (só linhas acrescentadas)
- `exercicios/registro.ts`: 4 linhas, uma por exercício.
- `regras/registro.ts`: 1 linha, para `regras/flexoes.ts`.
- `dados/objetos/registro.ts`: 1 linha, para `bola-suica.json`.
- `exercicios/flexao.ts`: reescrito sobre o núcleo `flexionar.ts`, com o resultado idêntico, como o pedido mandava.

Nenhum outro arquivo comum foi tocado (`pecas.ts`, `equipamento.ts`, `conferir.ts`, `cena.ts` etc.), nem o desenho do corpo. Os arquivos gerais regenerados (`prototipos/conferencia.*`) foram desfeitos antes dos commits. `npm run check` passou antes de cada commit, e `npm run conferir:animacao` deu 0 falha nas 15 animações.

## Medidas provisórias
- `bolaSuica.amassa` = 1,5 cm (`tipo: provisoria`, sem fonte de fabricante). O diâmetro de 65 cm tem fonte: o guia de tamanhos da Gymnic na página pública do revendedor Gray Line Medical.
- As linhas `desenho` das fichas de movimento, todas listadas pela conferência:
  - `flexao-fechada`: `maos.abaixoDoOmbro`.
  - `flexao-pes-elevados`: `maos.abaixoDoOmbro`, `tornozelo.dorsiflexao`, `pescoco.extensao`, `cabeca.extensao`, `cabeca.aoChao`, `pes.daBordaDoBanco`, `banco.pontaNoQuadro`.
  - `flexao-elastico`: `elastico.abaixoDeC7` (o número), `elastico.voltaNaMao`, `elastico.folgaNasCostas`, `elastico.atrasDoOmbro`.
  - `flexao-bola`: `bracos.alcance`, `cabeca.aoChao`, `cabeca.fracaoDoPescoco`, `toracica.flexao`, `pe.afundaNaBola`.
  - As herdadas da `flexao`: `tornozelo.dorsiflexao` e `escapula.retracaoEmbaixo`.

## Commits (ramo `worktree-agent-a355db8a2fe6a9372`)
- `821c07d`: o núcleo comum das flexões, sem mudar a `flexao`.
- `8e6b717`: `flexao-fechada`.
- `cd7371d`: `flexao-pes-elevados`.
- `35ce7f5`: `flexao-elastico`.
- `ae0ab40`: `flexao-bola`.
- Este relatório vai num último commit, logo depois desses cinco.
