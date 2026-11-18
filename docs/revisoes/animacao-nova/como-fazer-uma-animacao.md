# Como fazer uma animação no motor novo (guia de quem executa)

Este guia é para quem recebe uma família de exercícios para refazer no motor novo (`src/engine/novo/`), trabalhando em paralelo com outros. Desde 15/11/2026 o Gustavo pediu que as animações sejam feitas em paralelo; quem integra confere cada folha e leva a ele só as de maior risco. O corpo do Boneco está fechado: **não mude o desenho do corpo.**

Leia este arquivo inteiro antes de começar. As regras completas da frente estão em `prompt-continuacao.md` (seções 1, 2 e 8); o que está aqui é o que você precisa no dia a dia.

## 1. O que você entrega, por exercício

1. `src/engine/novo/dados/movimentos/<id>.json`: a ficha de movimento (os números, cada um com selo e fonte).
2. `src/engine/novo/exercicios/<id>.ts`: a animação (e, se a família pedir, um núcleo comum `exercicios/<familia>.ts`).
3. Uma linha em `src/engine/novo/exercicios/registro.ts`.
4. `docs/revisoes/animacao-nova/lote-N/<id>.md`: a conferência escrita (modelo: `lote-1/bulgaro.md`).
5. `docs/revisoes/animacao-nova/prototipos/folha-<id>.png`: a folha ao lado do guia de hoje.
6. `docs/revisoes/animacao-nova/quadros/<id>.png`: os quadros grandes (comando na seção 6).
7. Um commit por exercício, no seu ramo de trabalho, em pt-BR, no imperativo (ex.: "Lote 2: flexão com os pés elevados"). **Não faça push, merge nem pull request.**

No fim, a sua resposta traz, para cada exercício: o resultado da conferência automática (falhas e avisos), o que não ficou bom, e uma nota de **risco de o Gustavo não gostar** (baixo, médio ou alto) com o motivo. Seja franco: é essa nota que decide o que ele vai olhar.

## 2. O ritual (não pule passos)

1. **Releia o que já foi corrigido** nesse exercício: procure o id em `correcoes-ja-feitas.md`. A animação nova respeita cada correção.
2. **Leia as fontes:** a ficha da técnica (`docs/pesquisa/animacoes/<id>.md`), o texto do app (`src/conteudo/exercicios/<id>.json`, só leitura) e a animação de hoje (`src/engine/exercicios/<id>.ts`, só leitura). A ficha da técnica manda; da animação de hoje saem as distâncias que a ficha não dá em número (selo `desenho`, fonte `hoje`).
3. **Escreva a ficha de movimento.** Cada linha de `param` tem `v`, `un`, `selo` (`robusta`, `moderada`, `um estudo`, `consenso` ou `desenho`), `fonte` (uma chave de `fontes`) e `o` (o que é, em português simples). Nada de número solto no código. Nada de estudo inventado.
4. **Monte as poses** no arquivo do exercício, reaproveitando os núcleos (seção 4).
5. **Conferência automática sem falha:** `node scripts/animacao-nova/conferir.mjs <id>`. Falha não se contorna afrouxando a regra: corrige-se a pose. Aviso se explica na conferência escrita.
6. **Olhe os quadros** (seção 6) em tamanho grande: técnica nas duas vistas (começo, meio, fim), músculos, cada erro, trajetória. Olhe de verdade: mão que não fecha na peça, pé que atravessa o chão, membro torcido, rótulo em cima do corpo ou do aparelho, corpo pequeno demais no quadro.
7. **Conferência escrita** "o que a fonte pede × o que o boneco faz (medido) × confere?", com os números medidos (não os pedidos), os erros, o equipamento, as correções respeitadas e a seção "O que não ficou bom".
8. **Folha** ao lado da de hoje e commit.

Não ajuste pose "a olho" contra a medida. Se a ficha pede uma coisa e o corpo não consegue (amplitude, alcance), a conferência escrita diz isso com o número; não esconda.

## 3. Onde você pode mexer

- **Crie à vontade:** os arquivos novos do seu exercício e da sua família; peças de cena novas em `src/engine/novo/pecas-de-cena/<peca>.ts`; objetos novos em `src/engine/novo/dados/objetos/<objeto>.json`; regras novas em `src/engine/novo/regras/<familia>.ts`.
- **Só acrescente uma linha:** nos três registros (`exercicios/registro.ts`, `regras/registro.ts`, `dados/objetos/registro.ts`). Eles se juntam sozinhos entre quem trabalha em paralelo.
- **Evite mexer** nos arquivos comuns: `boneco.ts`, `esqueleto.ts`, `desenho.ts`, `cena.ts`, `movimento.ts`, `conferir.ts`, `equipamento.ts`, `pecas.ts`, `rotulos.ts`, `tabelas.ts`, `dados/objetos.json`, `dados/corpo-*.json`, os núcleos dos outros (`agachar.ts`, `afundar.ts`, `afundo-estatico.ts`, `bulgaro-base.ts`, `flexao.ts`) e os scripts. Se o seu exercício precisa de algo que o motor não tem (um tipo de apoio, uma opção de pose), faça a **menor mudança aditiva possível** (um campo opcional novo, sem mudar o que já existe), confira que `npm run conferir:animacao` continua sem falha em todas as animações e **liste a mudança na sua resposta**, com o motivo.
- **Não regenere nem inclua no commit** os arquivos gerais: `prototipos/index.html`, `prototipos/conferencia.*`, `prototipos/medidas.json`, `prototipos/peso.json`, `prototipos/erros.png`, `tabelas.md`. Quem integra regenera. Antes do commit, desfaça mudanças neles (`git checkout -- <arquivo>`).
- **Nunca altere:** `src/domain/`, `src/storage/`, `api/`, `src/features/`, `src/conteudo/`, `tests/unit/`, `tests/personas/`, `CLAUDE.md`, `docs/devlog.md`, `docs/backlog.md`, o motor de hoje (`src/engine/*.ts` fora de `novo/`, `src/engine/exercicios/`). `privado/` não existe para você.
- **Texto do app ou lista de músculos que parece errado:** não corrija. Anote num arquivo seu, `docs/revisoes/animacao-nova/lote-N/pedidos-<familia>.md`, com a fonte.
- **Sem dependência nova.** Sem `Math.random` nem `Date.now`: a mesma entrada dá a mesma saída.

## 4. O motor, em uma página

- **Eixos (cm):** `y` para cima; o chão é `y = 0`; `z` para a frente do corpo em pé; o lado direito do corpo (`'R'`) fica em `x` negativo (`sinal('R') = -1`). A vista `lateral` olha do lado direito: o lado `R` fica perto de quem olha. Por isso, em exercício de um lado só, quem trabalha é o `R`.
- **Esqueleto (`esqueleto.ts`):** `resolverTronco(corpo, { pelve, frente, lombar?, cervical?, cabeca? })` e `resolverMembros(tronco, { R: PoseBraco, L: PoseBraco }, { R: PosePerna, L: PosePerna })`.
  - Braço: por alvo (`pegada`: onde fica o centro da mão, com `polo` dizendo para onde o cotovelo aponta) ou por direções (`umero`, `antebraco`). `mao: { polegar, forma: 'pegada' | 'relaxada' | 'aberta', diam }`. Escápula: `elev`, `prot`.
  - Perna: pé apoiado (`pe: { bola, dir, calc }`: a bola do pé no chão, a direção dos dedos, quanto o calcanhar sobe) ou pé livre (`tornozelo` ou `coxa` + `canela`, com `peDir`). `polo` diz para onde o joelho aponta.
  - `falta.braco` e `falta.perna` dizem quando o membro não alcança o alvo (a conferência falha).
- **Corpo:** `corpo.m('coxa.comp')` lê uma medida da tabela (`dados/corpo-homem.json`). Objetos: `obj('halter', 'caboDiam')`.
- **Ficha:** `fichaSchema.parse(json)`, `daFicha(F)` devolve `f('nome.do.param')`. `mix(a, b, u)`, `suave(x)` (0 a 1 sem tranco), `resolver1(fn, a, b)` (acha onde `fn` cruza zero, para calibrar uma altura por uma medida).
- **Exercício (`Exercicio` em `movimento.ts`):** `ficha`, `vistas` (duas: `lateral`, `frontal`, `posterior`, `cima`, `quina`, `quinaTras`; a primeira é a padrão), `quadro(corpo, u, erro?)` com `u` de 0 (posição inicial) a 1 (final), `papeis` (músculos: `'p'` principal, `'s'` secundário, `'a'` só ajuda; `'quadriceps:R'` = só o lado direito; a lista vem da ficha da técnica, que segue a biblioteca) e `trajetorias`.
- **Quadro:** `{ esq, prims, pecas, fios, cargas, marcas, vies? }`. `prims` são os volumes simples que a conferência usa (chão, caixas onde o corpo encosta); `pecas` é o que é desenhado (o gerador realista); `cargas` entram no equilíbrio; `marcas` são pontos que regras e trajetórias leem.
- **Ficha de movimento:** `fases` (pausa, exc, conc, com duração, `de` e `ate`), `contatos` (`pe.R`, `pe.L`, `mao.R`, `joelho.L`, `pelve`: o que não pode sair do lugar), `regras` (ids medidos pela conferência), `erros` (`id`, `titulo` igual ao do app, `vista`, `destaca`, `linha`, `foco`, `instante`), `rotulos` (as dicas do app; `ponto` aceita `joelho:R`, `pelve`, `c7`, `pegada:L` etc.; `prumo`, `guia` e `seta` opcionais).
- **Músculos que o desenho tem:** veja `dados/musculos.json` (inclui porções: `deltAnt`, `deltLat`, `deltPost`, `trapSup`, `trapMedInf`). Não invente grupo; se a ficha pede um músculo que o desenho não tem, diga na conferência escrita.

**Exemplos para ler antes de escrever (do mais simples ao mais completo):**

| Para | Leia |
|---|---|
| exercício em pé, simétrico, com núcleo comum | `exercicios/agachar.ts`, `agachamento-peso-corpo.ts` |
| um núcleo que serve a várias variações | `exercicios/afundo-estatico.ts`, `afundo.ts`, `afundo-kettlebell.ts` |
| pé num apoio, mão num aparelho, peça como cenário | `exercicios/bulgaro-base.ts`, `bulgaro.ts`, `dados/movimentos/bulgaro.json`, `lote-1/bulgaro.md` |
| movimento com fase no ar | `exercicios/afundo-tras-peso-corpo.ts` |
| mãos no chão, corpo em prancha | `exercicios/flexao.ts` |
| deitado no banco, halteres | `exercicios/supino-reto.ts` |
| polia, cabo, pilha que sobe | `exercicios/puxada-unilateral.ts` |
| elástico que estica | `exercicios/agachamento-elastico.ts` |

## 5. Peças de cena, objetos e regras novas

- **Medida real, com fonte.** Cada objeto novo tem as medidas num arquivo `dados/objetos/<objeto>.json`, no formato de `dados/objetos.json` (`fontes` e `objetos`; cada medida com `v`, `un`, `tipo`: `medida`, `derivada`, `provisoria` ou `desenho`, `fonte` e `onde`). Fonte = ficha pública de fabricante ou norma, com o endereço e o trecho lido. Só páginas públicas: nada de login, área paga, CAPTCHA ou contorno de bloqueio. Não achou? `tipo: "provisoria"`, `fonte: "a-conferir"`, e diga na resposta. Antes de criar, veja se o objeto já existe em `dados/objetos.json` (halter, anilha, banco reto, banco regulável, coluna de polia, estribo, colchonete, elástico em tubo, kettlebell).
- **Peça desenhada:** um arquivo `pecas-de-cena/<peca>.ts` que exporta uma função devolvendo `{ prims, peca }`: os volumes simples para a conferência e uma `PecaPropria` (`pecas.ts`) cujo `desenhar(C, M, o)` usa o gerador realista (`realista/base.mjs`: `C.tubo`, `C.cilindro`, `C.prisma`, `C.estofado`, `C.linha`, `C.sombra`...; veja como `equipamento.ts` desenha o banco e a coluna). Parta do cartão de hoje dessa peça, se existir (`scripts/desenhos-equipamento/`). Não copie desenho de terceiros.
- **Regra medida:** um arquivo `regras/<familia>.ts` que exporta um objeto `{ 'id-da-regra': (q, corpo) => ({ medido, ok }) }` (tipo `Regra` e utilidades em `conferir-util.ts`), com uma linha no `regras/registro.ts`. Antes, veja se a regra já existe em `conferir.ts` (`REGRAS`) ou nas outras famílias (`regras/*.ts`): se existe e serve, use-a; se a sua mede outra coisa, dê a ela um nome próprio da família (`cotovelos-rentes-na-fita`, e não `cotovelos-rentes`). Dois arquivos com o mesmo id fazem a conferência parar com erro. O limite da regra vem do que a ficha pede, não do que a sua pose deu.

## 6. Comandos

Rode tudo da raiz do seu diretório de trabalho. Se ele for uma cópia de trabalho do git (worktree) sem `node_modules`, ligue o da raiz do projeto antes de qualquer coisa: `ln -s /home/user/treino-mvp/node_modules node_modules`. Não rode `npm install`.

- `npm run typecheck`: os tipos (é o que vale; `npx tsc --noEmit -p .` não confere nada).
- `node scripts/animacao-nova/conferir.mjs <id>`: a conferência de um exercício (mostra falhas e avisos). `npm run conferir:animacao`: de todos (regrava `prototipos/conferencia.*`: desfaça antes do commit).
- Quadros para você olhar e para a entrega:
  `LARG=520 JANELA=1640 ESCALA=2 TITULO="<nome> (motor novo)" node scripts/animacao-nova/olhar.mjs docs/revisoes/animacao-nova/quadros/<id>.png <id>:lateral:tec:f0 <id>:lateral:tec:f0.5 <id>:lateral:tec:f1 <id>:frontal:tec:f0 <id>:frontal:tec:f1 <id>:lateral:mus:f1 <id>:<vista>:err:f1:<erro> ... <id>:lateral:tec:f1::pele <id>:lateral:traj:f1`
  (cada pedido é `id:vista:modo:instante[:erro][:estilo][:tema]`; `f0`, `f0.5`, `f1` = começo, meio e fim da primeira fase com movimento). Para rascunho, grave fora do repositório e use `ESCALA=1`. Abra o PNG e olhe.
- `node scripts/animacao-nova/prototipos.mjs so-folhas <id>`: a folha ao lado do guia de hoje (só a desse id).
- `npm run check`: lint, tipos e testes. Tem que passar antes de cada commit.
- `node scripts/animacao-nova/preparo.mjs`: regrava o que vem calculado de antemão, um arquivo por exercício (`src/engine/novo/dados/preparo/<id>.json`, mais o `registro.ts`). **Rode depois de mudar um exercício, uma ficha de movimento, uma peça ou o corpo**, e leve os arquivos que mudarem no commit: o guia abre com o quadro e as calibrações que estão ali. `node scripts/animacao-nova/preparo.mjs conferir` (que o `npm run conferir:animacao` e o teste `tests/motor/motor-novo.spec.ts` também rodam) falha se algum arquivo estiver velho.
- Para medir uma pose (os números da conferência escrita), escreva um script descartável em `node_modules/.tmp/` (fora do git) no molde:
  `import { motorNovo } from '<raiz>/scripts/animacao-nova/empacotar.mjs'; const { modulo: m } = await motorNovo(); const ex = m.EXERCICIOS['<id>'], c = m.CORPOS.homem; const r = m.conferir(ex, c); for (const i of r.itens) console.log(i.nivel, i.grupo, i.oQue, '→', i.medido); const q = ex.quadro(c, 1); ...`
  (`m.angulosDoLado(q.esq, 'R')`, `m.centroDeMassa(q.esq, 'homem', q.cargas)`).

## 7. O que costuma dar errado (aprendido nos onze primeiros)

- **Membro que não alcança** (`falta`): a distância pedida é maior que o membro. Calibre a altura ou a distância com `resolver1` por uma medida da ficha, em vez de fixar as duas.
- **Tranco no ritmo** (acima de 25% é falha): use `suave` nas transições; nada de degrau nem `max()` em posição.
- **Erro que cruza o meio do corpo** (joelho para dentro): meça e reduza.
- **Corpo pequeno no quadro:** uma peça grande entra no enquadramento. Peça que é só cenário leva `cenario: true`; do banco, só a ponta que importa (`pontaNoQuadro`).
- **Rótulo em cima do aparelho ou do corpo:** troque o ponto do rótulo ou a dica (use as dicas do app, `cues`).
- **Contato da mão:** `mao.X` nos `contatos` mede o punho, que gira em volta da pegada; para mão que segura uma peça parada, meça a pegada numa regra.
- **O halter pende na vertical; o cabo é reto da polia à mão; o elástico afina ao esticar.** O peso aparece.
- **Elástico que não fecha a conta:** o tubo da tabela tem 122 cm e estica no máximo 3 vezes. Se o caminho do exercício pede mais (ou deixa o tubo frouxo), a saída não é forçar a pose: é outro elástico, com medidas de fabricante num arquivo `dados/objetos/<elastico>.json` (com `comp` e `esticaAte`), declarado no quadro em `fios: [{ id: 'elastico', comp, estica: true, objeto: '<id>' }]`. A conferência mede contra esse objeto.
- **Rótulos em minúsculas e sem ponto final** ("desce reto", "joelho sobre o pé"), mesmo que a dica do app venha com maiúscula e ponto. No máximo dois por vista.
- **Nos pedidos do `olhar.mjs`, o tema é o sétimo campo:** `id:vista:modo:f1::cinza:escuro` (com `::escuro` o desenho sai todo preto, porque "escuro" vira o estilo).
- **A primeira vista de `vistas` é a que o app abre:** tem de ser a que mostra o corpo grande e o movimento (quase nunca a de cima). A de cima serve de segunda vista.
- **Polia baixa:** a coluna de 2,39 m encolhe o corpo no quadro. A peça `torre` aceita `cortadaEmCima: <cm>` (até que altura o quadro precisa mostrá-la); o resto é cortado pela borda.
- **Nomes que aparecem na tela têm acento:** as chaves de `trajetorias` viram rótulo (`cabeça`, e não `cabeca`; `mão`, `pé`).
- **Calibração demorada atrasa o primeiro desenho no app.** Uma conta de tentativa e erro com centenas de poses (`resolver1` dentro de `resolver1`, ou medindo a pele com `pontosDoBoneco` a cada passo) leva segundos no computador e muito mais no celular. Passe o resultado por `calibragem(corpo, '<id>:<o que é>', () => ...)` (`src/engine/novo/calibragens.ts`): ele fica gravado para o corpo do app e é conferido pelo `preparo.mjs`. O resultado tem de ser só números (objetos e listas simples). Cuidado com memória que guarda "a primeira pose que passou": com a calibração gravada, a primeira pose passa a ser outra; grave essa memória junto (como a superfície do pé em `ponte-pes-bola.ts`).
- **Estilo embutido não funciona no app.** A política de segurança (`style-src 'self'`) barra `style="..."` dentro do desenho: use uma classe no `estilo.css`. O teste do motor falha se algum quadro tiver estilo embutido.
- **De frente, nos afundos, o músculo principal some atrás do joelho:** é aviso conhecido; diga na conferência escrita qual é a vista padrão do modo Músculos.

## 8. O padrão de qualidade (aviso do dono em 15/11/2026)

O Gustavo avisou que a qualidade caiu nas animações feitas em paralelo: "o fato de eu ter delegado fazer todos juntos não quer dizer que a gente pode diminuir a qualidade". O padrão é o das animações que ele aprovou na folha: abra `quadros/bulgaro.png` e `prototipos/folha-afundo.png` e compare a sua, quadro a quadro, antes de entregar.

**Defeito visível não vai para a lista "o que não ficou bom": é consertado antes da entrega.** Essa lista é só para o que você tentou de verdade e não conseguiu, com o que tentou. Antes de entregar, confira nos quadros grandes, um por um:

1. **O corpo parece uma pessoa fazendo o exercício,** em todos os quadros: coluna sem dobra estranha (nada de costas arredondadas ou pescoço quebrado para a pose "fechar"), cabeça no lugar, membros sem torção, nada atravessando o chão, o aparelho ou o próprio corpo. Se a pose só fecha com uma dobra feia, a geometria está errada (distância, altura ou apoio): corrija a geometria.
2. **O rosto e a cabeça não encostam nem entram no chão ou no aparelho** se a ficha não pede.
3. **O corpo ocupa o quadro.** Compare o tamanho do corpo com o do búlgaro aprovado. Peça grande ou distante que encolhe o corpo vira cenário ou é cortada pelo quadro.
4. **As duas vistas se leem de relance.** Se uma vista vira um borrão (o corpo visto pela cabeça ou pelos pés, uma perna tapando a outra, o músculo principal escondido), troque de vista: `lateral`, `frontal`, `posterior`, `cima`, `quina`, `quinaTras`. Teste as candidatas e fique com a que mostra melhor.
5. **O equipamento tem o mesmo desenho dos outros:** sai do gerador realista (volumes com luz, como o banco, o halter e o kettlebell), nunca um círculo ou um retângulo chapado. Olhe a sua peça ao lado do banco e do kettlebell.
6. **As mãos seguram de verdade** (fecham em volta do pegador, espalmam no chão) e os pés apoiam de verdade.
7. **Os erros se leem** sem exagero e sem pose impossível.
8. **Rótulos:** minúsculas, sem ponto, no máximo dois por vista, fora do corpo e do aparelho.
9. **Tema escuro e cor de pele:** olhe os dois (`id:vista:modo:f1::pele` e `id:vista:modo:f1::cinza:escuro`).

Se depois disso algum item ainda falhar, diga qual, com o quadro, e marque o risco como alto. Uma animação a menos, bem feita, vale mais que uma a mais com defeito.

## 9. Nos exercícios que eram cartão de texto (desde 17/11/2026)

A frente das animações restantes (`docs/revisoes/animacoes-restantes/plano.md`) anima os 81 exercícios que nunca tiveram animação. O que muda, aprendido no lote A1:

- **Não há animação de hoje.** As distâncias que a ficha da técnica não dá saem das animações aprovadas parecidas, com selo `desenho` e o motivo no campo `o`. Não use `src/engine/exercicios/`. A folha (`prototipos.mjs so-folhas`) não serve, porque compara com a de hoje: entregue só os quadros grandes.
- **Os erros vêm do cartão** (`src/conteudo/exercicios/<id>.json`, campo `errors`), com o mesmo título e na mesma ordem. Desenhe a consequência visível que a ficha ou a descrição do erro dizem (precedente: "Ir até a falha" virou a repetição em que a forma cede). Erro que é só ritmo ou só esforço, sem nenhuma consequência visível ("Parar longe da falha", "Não testar o ponto alto", "Carga pesada demais" quando a descrição só fala de tranco): não invente; deixe fora da ficha e diga na resposta. Quem integra põe a exceção na lista `SEM_DESENHO` do teste da ponte.
- **Não mexa em `aprovados.ts` nem no catálogo do guia.** Quem integra registra a animação como aprovada e "esperando a ligação" (`ESPERAM_A_LIGACAO`) ou "para o Gustavo ver" (`PARA_O_GUSTAVO_VER`). O teste da ponte que falha na sua cópia ("todas as animações estão aprovadas e no catálogo") é esperado; qualquer outra falha não.
- **A vista que o app abre é a que se lê de relance, não a de maior área medida.** No tríceps testa, de lado o halter parecia estar no rosto (estava 6 cm ao lado): o app abre de três quartos. Nos crucifixos, o app abre de cima, como os crucifixos aprovados (decisão do Gustavo de 05/11/2026), porque de três quartos o braço de perto aponta para quem olha.
- **Reaproveitar uma animação aprovada:** só por exportação aditiva (`export` numa função que já existe), sem mudar o que ela desenha; o preparo dela não pode mudar. Diga na resposta.
- **Conflito no `dados/preparo/registro.ts`** ao juntar ramos: é arquivo gerado; quem integra o regrava com `preparo.mjs`.

## 10. Os dois lados do corpo e as bordas do apoio (aviso do Gustavo em 18/11/2026)

O Gustavo achou, na rosca Scott no banco Scott (fase C), o braço de longe fora da almofada na vista de três quartos. A conferência medida e a conferência quadro a quadro não pegaram o erro. Ele pediu: "tome cuidado com as proporções e detalhes; esse tipo de erro é muito importante de evitar". Desde então:

- **Toda regra de contato mede os dois lados do corpo.** Mede o braço e a perna de perto e os de longe, e não só a distância a um plano: confere também que o ponto fica **dentro das bordas** do apoio (a almofada, o rolo, o assento, a plataforma, o pegador). Um braço no plano da almofada, mas além da borda lateral, é um braço fora do apoio.
- **Proporção da peça com o corpo:** antes de animar, meça se o apoio cabe no corpo da tabela. A almofada tem de caber os dois braços, o assento a coxa, a plataforma os dois pés, e o pegador tem de estar ao alcance. Leia na ficha qual medida é a largura e qual é o comprimento; não as troque.
- **Quem confere os quadros olha cada vista declarada, nos dois lados do corpo**, procurando o membro de longe. É ele que a vista de três quartos e a de frente mostram e a de lado esconde.
