# Estudo dos textos do app: menos texto corrido, da abertura ao fim (13/11/2026)

> Pedido do Gustavo em 13/11/2026: o app está com texto corrido demais e poluído; rever e redesenhar todas as partes de texto, da tela que abre até o fim, buscando referências de aplicativos. Este documento é o estudo: a medida de hoje, as referências, as regras propostas e uma versão enxuta de exemplo em 11 telas, lado a lado com as de hoje. **Nada do exemplo está aplicado no app.**

## 1. Resumo

- **O texto pesa fora do treino.** As telas do treino são enxutas (de 15 a 73 palavras). O peso está em "Sobre o programa" (829 palavras), nos termos (793), no guia (de 295 a 340), no início antes do 1º treino (256), em Meus dados (216), na folha do exercício (196) e nas perguntas do cadastro (de 132 a 195).
- **O padrão que se repete:** a explicação vem inteira na tela, antes da ação, em vez de ficar a um toque de quem quiser ler. São 55 blocos de texto corrido com 25 palavras ou mais e 63 selos de evidência à vista nas 41 telas medidas.
- **O que as referências dizem:** as pessoas leem uma parte pequena do texto de uma tela; o essencial vem primeiro; a explicação fica atrás de um toque cujo rótulo diz o que há dentro; aviso repetido perde efeito; o que é necessário para agir com segurança fica à vista.
- **A proposta em uma frase:** em cada tela, **uma linha diz o essencial e um toque abre o resto**, com o nível de evidência e a fonte dentro do que abre.
- **O exemplo:** aplicando isso só no texto das telas (sem mexer em regra de treino nem em texto técnico), 11 das 41 telas mudaram. "Sobre o programa" foi de 829 para 104 palavras à vista; o início, de 256 para 105; a folha do exercício, de 196 para 93; Meus dados, de 216 para 144. Os blocos longos caíram de 55 para 30 e os selos à vista, de 63 para 16 (os outros 47 estão a um toque).

Folhas lado a lado: `exemplo-1-cadastro-e-dados.png` e `exemplo-2-inicio-fim-semana.png`. A mudança do exemplo está em `versao-enxuta-de-exemplo.patch`.

## 2. A medida de hoje, tela a tela

Medido pelo roteiro de capturas (`scripts/design/frontend-novo/capturas.spec.ts`), em 390 × 844, com a persona fictícia Ana. "Palavras" é todo o texto visível da tela (ou da folha aberta), sem contar o que está dentro de um bloco fechado. "Blocos longos" são parágrafos ou itens de lista com 25 palavras ou mais. Os números completos estão em `medidas-de-texto.json`.

"De quem é o texto" diz quem pode mudá-lo: **tela** (escrito em `src/features/`, a sessão do frontend pode mudar); **domínio** (frases geradas pelas regras em `src/domain/`: avisos, porquês, fases, sugestões); **conteúdo** (fichas dos exercícios em `src/conteudo/`); **jurídico** (privacidade e termos, que o advogado revisa).

| Tela | Palavras hoje | Blocos longos | Selos à vista | De quem é o texto | No exemplo |
|---|---|---|---|---|---|
| Boas-vindas | 88 | 1 (34 palavras) | 1 | tela (aviso de segurança) | 68 |
| Saúde (pergunta geral) | 132 | 1 | 2 | tela; as 9 condições são do domínio | 87 |
| Saúde (quais valem) | 195 | 0 | 0 | domínio (as perguntas completas) | não mexido |
| Experiência (respondida) | 121 | 0 | 1 | tela | não mexido |
| Rotina (respondida) | 158 | 2 | 3 | tela | 108 |
| Equipamento (lugar) | 73 | 0 | 0 | tela | não mexido |
| Folha da foto | 194 | 2 (47) | 1 | jurídico | não mexido |
| Equipamento (item por item) | 110 | 0 | 0 | tela | não mexido |
| Início, antes do 1º treino | 256 | 2 | 5 | tela ("Como ler o seu treino") | 105 |
| Início, depois do 1º treino | 109 | 0 | 0 | tela | igual |
| Folha do exercício | 196 | 1 (57) | 6 | domínio (os porquês) | 93 |
| Sobre o programa | 829 | 14 (até 68) | 28 | domínio (avaliação, avisos, fases, porquês) | 104 |
| Treino: série | 59 a 69 | 0 | 0 a 1 | tela e domínio (sugestão) | igual |
| Treino: descanso | 31 a 51 | 0 | 0 | tela | igual |
| Treino: "Senti algo" | 73 | 0 | 1 | tela (as opções são do domínio) | igual |
| Treino: folha do "por quê?" | 202 | 5 | 0 | domínio (regra e fontes) | igual |
| Guia (4 modos) | 295 a 340 | 2 | 0 | conteúdo | não mexido |
| Fim do treino | 86 | 1 | 1 | tela e domínio (a frase da semana) | 62 |
| Semana | 167 | 2 | 2 | tela | 101 |
| Evolução | 29 | 0 | 1 | tela | igual |
| Meus dados | 216 | 2 (64) | 2 | jurídico (privacidade) e tela | 144 |
| Meus locais | 59 | 1 | 1 | tela | 38 |
| Editar local | 125 | 0 | 0 | tela | não mexido |
| Termos | 793 | 13 (até 72) | 3 | jurídico | não mexido |

## 3. Os sete tipos de texto que pesam

1. **Explicação antes da pergunta.** Na triagem, dois parágrafos (47 palavras) vêm antes da lista das 9 condições. Na rotina, cada pergunta tem de 1 a 3 linhas de ajuda embaixo, com 1 ou 2 selos.
2. **Justificativa colada na coisa.** A folha do exercício lista de 4 a 6 porquês, cada um com selo (o 1º tem 57 palavras). "Sobre o programa" empilha avaliação, 9 avisos, fases, porquês e uma tabela.
3. **Aviso longo.** O aviso do navegador em Meus dados tem 28 palavras para dizer "guarde uma cópia". Os avisos do programa são frases inteiras, sem título.
4. **Definição em bloco.** "Como ler o seu treino" abre sozinho antes do 1º treino, com 6 definições e 5 selos no caso da Ana (cerca de 150 palavras), abaixo da lista de exercícios.
5. **Privacidade e termos por extenso.** O parágrafo de privacidade de Meus dados tem 64 palavras e é a 1ª coisa da tela. Os termos têm 793 palavras sem resumo.
6. **Repetição.** O aviso de que o navegador pode apagar os dados aparece em 4 lugares. O que ficou abaixo da meta aparece 3 vezes em "Sobre o programa" e mais uma na linha do início.
7. **Frase que descreve o que já se vê.** "Nada vem marcado.", "Com treino.", "Tempo total, com aquecimento e descansos." (esta última ajuda; as duas primeiras, não).

## 4. O que as referências dizem

Duas pesquisas feitas para este estudo, com as fontes abertas uma a uma e as limitações escritas:

- `pesquisa/01-regras-de-texto.md`: 48 referências (Nielsen Norman Group, GOV.UK, Microsoft, guias brasileiros de linguagem simples, W3C, ICO e estudos de fadiga de aviso) e 20 regras, cada uma com o nível de sustentação.
- `pesquisa/02-como-os-apps-mostram-texto.md`: 38 referências, cobrindo 20 apps (Hevy, StrongLifts, Fitbod, Boostcamp, MacroFactor, Nike Training Club, Peloton, Strava, Duolingo, Headspace, Noom, Oura e outros), por situação do nosso app.

**O que é bem sustentado:**
- As pessoas leem cerca de 20 a 28% das palavras de uma página, e 100 palavras a mais rendem só uns 4 segundos de leitura (NN/g, artigo de 2008 sobre dados de uso em computador). Uma versão concisa do mesmo texto foi 58% mais usável (NN/g, 1997).
- O essencial primeiro; frase com teto de 20 palavras (guias do governo federal e do DF) ou 25 (GOV.UK).
- Revelação progressiva: o que a maioria precisa fica na tela, o detalhe a um toque, com no máximo 2 níveis e um rótulo que diz o que há dentro (NN/g, GOV.UK).
- O que é necessário para a tarefa ou para a segurança **não** vai para trás de um toque (NN/g, GOV.UK, W3C).
- Aviso repetido perde efeito: a atenção cai com a repetição (Anderson 2014, Vance 2018).
- Privacidade em camadas: 1 ou 2 frases na tela e o texto completo a um toque (ICO e modelo do governo federal).

**O que os apps fazem** (segundo descrições de terceiros; nenhuma tela foi vista como imagem):
- Explicação de regra numa folha curta que abre de um toque (Boostcamp, "como as séries são calculadas").
- Definição na 1ª vez em que a palavra aparece, dentro do fluxo (MacroFactor ensina a reserva assim), e dica na 1ª vez em vez de tutorial na abertura (Duolingo, Fitbod).
- Fim de treino em número, com uma pergunta de um toque (StrongLifts, Boostcamp, Freeletics).
- Resumo de privacidade em poucas linhas fixas antes do texto longo (rótulos da App Store, "Segurança dos dados" do Google Play).

**Onde a evidência é fraca, e eu digo:**
- Quase todos os números de leitura são de tela de computador, de 1997 a 2010. Servem como ordem de grandeza.
- Não há estudo de leitura na academia nem estudo que compare selo de evidência com outra forma. Nenhum app de treino aberto na pesquisa mostra nível de evidência: nisso o app não tem em quem se espelhar.
- Apple, Material, Polaris e a norma ISO de linguagem simples não puderam ser abertos; as regras saem de GOV.UK, NN/g, Microsoft e guias brasileiros.
- Esconder texto pode piorar: há quem não toque, e um rótulo vago esconde o que tem dentro. Por isso o rótulo do toque importa, e o que é de segurança fica à vista.

## 5. As 10 regras propostas para o texto do app

| # | Regra | Sustentação |
|---|---|---|
| 1 | **Cortar antes de reescrever.** Cada tela fica com o menor texto que ainda deixa a pessoa agir. | estudo com dados (de computador) |
| 2 | **Uma linha na tela, o resto a um toque.** A linha diz o essencial; o toque abre a explicação, o nível de evidência e a fonte. | várias diretrizes concordam |
| 3 | **O toque diz o que há dentro.** "o que sai daqui", "por que perguntamos", "o que conta"; "por quê?" só quando é mesmo um porquê. | NN/g e GOV.UK |
| 4 | **No máximo 2 níveis.** Tela e folha. Dentro de uma folha, blocos que abrem no lugar, não outra folha (a do selo é a exceção que já existe). | NN/g |
| 5 | **Frase de até 20 palavras; na tela do treino, até 12.** | guias brasileiros; a meta do treino é escolha do projeto |
| 6 | **Segurança à vista, curta e com a ação.** "Sentiu dor ou tontura? Pare e procure avaliação." O texto inteiro fica a um toque e nos termos. | várias diretrizes; a forma exata é opinião |
| 7 | **Cada aviso num lugar só.** O do navegador fica em Meus dados; o do que ficou abaixo da meta, na linha do início e em um bloco de "Sobre o programa". | estudos de fadiga de aviso (outros contextos) |
| 8 | **Número no lugar de frase**, onde o número já diz ("1 de 3"). | padrão dos apps de treino |
| 9 | **Definição onde a palavra aparece**, na 1ª vez, e sempre a um toque depois. | MacroFactor, Duolingo; NN/g |
| 10 | **Privacidade em camadas:** uma frase na tela, o texto completo a um toque, os termos com um resumo no alto. | ICO e modelo do governo federal |

## 6. A versão enxuta de exemplo: o que mudou em cada tela

Só texto e apresentação escritos nas telas. Nenhuma frase de regra, selo ou fonte foi reescrita: o que saiu da tela foi inteiro para o que abre no toque.

| Tela | Hoje | No exemplo |
|---|---|---|
| Boas-vindas | "O que o app não faz" com um parágrafo de 33 palavras e selo | Título "O app orienta, não diagnostica", uma frase com a ação e o toque "o que o app não faz", que abre o texto de hoje com o selo |
| Saúde | Dois parágrafos antes da lista e uma frase com selo depois | Uma linha ("Hoje, ou algo que um médico já disse.") e o toque "por que perguntamos"; a lista das 9 condições não muda |
| Rotina | Ajuda de 1 a 3 linhas com selos sob cada pergunta | "Escolha até 2." e "por quê?"; o mesmo no objetivo e na divisão |
| Início | "Como ler o seu treino" aberto antes do 1º treino | Fechado, a um toque |
| Folha do exercício | Lista de 4 a 6 porquês aberta | "Por que este exercício (4 motivos)", que abre no lugar |
| Sobre o programa | Tudo aberto: 829 palavras | O resumo, a fase e o que pede ajuste à vista; "Limites e observações (3)", "Avisos (9)", "Fases", "Por que este programa" e a tabela, cada um a um toque |
| Fim do treino | Parágrafo sobre a semana e "Nada vem marcado." | "A sua semana 1 de 3" e o toque "o que conta"; "para que serve" no lugar de "Nada vem marcado. por quê?" |
| Semana | Dois parágrafos de explicação sob o quadro | "Como ler este quadro", a um toque |
| Meus dados | Parágrafo de 64 palavras e aviso de 28 | "Tudo fica guardado só neste aparelho." com o toque "o que sai daqui"; "Este navegador pode apagar seus dados. Guarde uma cópia." com "por quê?" |
| Meus locais | Parágrafo de 31 palavras | "O programa é montado para o local principal." com o toque "e nos outros?" |

**O que o exemplo não resolve** e fica para as etapas seguintes: os termos (793 palavras), a folha da foto (194), o guia (cerca de 300), as perguntas completas da saúde (195) e as frases que vêm do domínio (os avisos e os porquês continuam longos por dentro; só mudaram de lugar).

## 7. O que precisa de decisão do Gustavo

1. **A direção.** Aplicar "uma linha na tela, o resto a um toque" no app inteiro, a partir do exemplo.
2. **O aviso da abertura.** Hoje o texto "O app não diagnostica e não substitui um médico…" aparece inteiro na boas-vindas, e um teste confere isso. No exemplo ele vira uma frase com a ação, e o texto inteiro fica a um toque e nos termos.
3. **"Como ler o seu treino" fechado.** Em 07/11 foi decidido que ele abre sozinho até o 1º treino. O exemplo fecha. A alternativa das referências é explicar cada palavra onde ela aparece pela 1ª vez (no treino, "1ª vez: comece leve. por quê?" já faz isso).
4. **Selo a um toque.** No exemplo, 47 dos 63 selos saem da linha e ficam dentro do que abre. O nível e a fonte continuam a um toque, como o pedido original exige; deixam de estar à vista na frase.
5. **Frases do domínio e do conteúdo.** Os avisos, os porquês, as fases e as fichas do guia só ficam curtos de verdade se forem reescritos. Esta sessão não pode mexer neles; seria uma sessão própria, com os pedidos 1, 10 e 12 de `../pedidos-ao-dominio.md`.
6. **Termos e privacidade.** Um resumo em tópicos no alto dos termos e a folha da foto em camadas pedem a revisão de quem cuida do texto jurídico.

## 8. Como ficaria o trabalho, em etapas

| Etapa | O que entra | Depende de |
|---|---|---|
| 1 | Aplicar o exemplo nas 11 telas, com os testes acompanhando | decisões 1 a 4 |
| 2 | O resto do texto das telas: experiência, equipamento, editar local, tela de erro, avisos de instalar e de cópia, rótulos longos ("Registrei algo errado: apagar este treino") | decisão 1 |
| 3 | O guia: o que fica aberto e o que fica a um toque (o texto das fichas não muda) | decisão 1 |
| 4 | Frases do domínio e do conteúdo: título curto dos avisos, porquês mais curtos, um nome só para a série de acerto | decisão 5 e sessão própria |
| 5 | Termos e folha da foto em camadas | decisão 6 e revisão jurídica |

A cada etapa: a mesma medição (palavras, blocos longos e selos por tela), as folhas de antes e depois, `npm run check`, `npm run test:e2e` e `npm run conferir:tokens`.

## 9. Como refazer a medição

```bash
CAPTURAS=docs/revisoes/frontend-novo/capturas/depois npx playwright test -c scripts/design/frontend-novo/playwright.config.ts --trace off
```

Cada `medidas-<formato>.json` traz, por tela: `palavrasNaTela`, `palavrasAVista`, `blocosLongos` (com o começo de cada um), `selos` e `porques`.
