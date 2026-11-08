# Prompt: R5b, o avaliador de programas e o porquê de cada escolha

> Rascunho escrito na sessão de próximos passos (06/11/2026), a partir de `docs/revisoes/proximos-passos.md` (parte 2, marco R5b) e dos relatórios `proximos-passos/b-monte-e-avaliador.md` e `c-fluxo.md`. Escolhido em 07/11/2026 (parte 3 de `docs/revisoes/proximos-passos.md`). Cole o texto abaixo, a partir de "Você vai conduzir", numa sessão nova.
>
> **Atualização de 07/11/2026 (decisões da parte 3 de `docs/revisoes/proximos-passos.md`):** é o **5º marco** da ordem R5a → R5-CL → R5d → R5-anim → R5b → R5c, conduzida pela sessão de `sessao-desenvolvimento.md`. **Decidido, não pergunte de novo:** o limiar de empurrar ÷ puxar é **1,5** (o mesmo da régua da G5, consenso, `kolber2010`; equivale aos 2/3 do protótipo); a frente × trás da coxa usa **0,5–2** (consenso, `green2018`, a mesma faixa da régua). As 3 correções do gerador vieram no R5a. A régua da G5 já está na auditoria (R5-CL): o avaliador se alinha a ela.

---

Você vai conduzir o **R5b, "o avaliador e o porquê"**, do treino-mvp, um web app (PWA) em pt-BR que monta um programa de hipertrofia baseado em evidência, só com o equipamento que a pessoa tem, e conduz cada sessão com um guia animado (o "Boneco"), o temporizador de descanso e as sugestões de progressão.

**Quem é o Gustavo.** É o dono do app. Não é programador nem da área de exercício, anatomia ou design. Fala de produto e de experiência, e prefere explicações simples e visuais, em pt-BR, sem jargão. Quando um termo técnico for inevitável, explique-o numa frase.

**Por que este marco.** O Gustavo quer uma opção para a pessoa **montar o próprio treino**, com um **avaliador** que diga se algum músculo ou área deve ser ajustado, ou não. Ele decidiu (06/11) que "monte o seu" é para **quem já treina e tem um programa próprio**, que o avaliador aceita **só exercícios da biblioteca** a princípio, e que a IA para ler um programa de fora fica para depois. A sessão de próximos passos montou um protótipo descartável e mediu:
- quase tudo de que o avaliador precisa já existe no domínio (`volumePorMusculo`, `metasDoPerfil`, os tetos, o estimador de tempo, a triagem, a dor por região, a tabela de funções);
- numa amostra de 2.682 programas do gerador, ele diz "está bom" em 59,8%, repete um aviso que o gerador já dá em ~23% e acha algo que o gerador não avisa em 17,4%. Isso revelou 3 defeitos do gerador, que o R5a corrige (se o R5a não veio antes, eles entram aqui);
- nos 4 programas publicados que digitou (protocolos de ensaios com texto completo no PMC: `thomas2016`, `carneiro2024`, o de 5 séries de `schoenfeld2019b`), ele aponta o que um treinador apontaria: 6 a 10 séries num exercício só, posteriores e panturrilha zerados, dias de ~95 min num orçamento de 60;
- e, de outra frente, **só 2 de 20 avisos do programa dizem o que fazer** (a regra `acompanhamento.mensagens` pede "fato + próximo passo"), e **61% dos exercícios têm só o "porquê" genérico**.
Este marco faz o avaliador de verdade, sem editor, e a explicação do porquê. A edição e o "montar do zero" vêm num marco depois, já com a régua pronta.

**Leia primeiro:** o `CLAUDE.md`; `docs/revisoes/proximos-passos.md` (parte 2); `docs/revisoes/proximos-passos/b-monte-e-avaliador.md` inteiro (o desenho, as saídas completas do protótipo, os riscos, os pedidos ao domínio e ao design) e `c-fluxo.md` (opção A e os pedidos ao domínio 4, 6 e 7); `docs/pesquisa/00-metodo.md`, `docs/pesquisa/regras.md` (`volume.*`, `selecao.*`, `tempo.*`, `seguranca.*`, `acompanhamento.mensagens`); `src/domain/gerador/index.ts`, `funcoes.json`, `src/domain/sessao/`, `src/domain/triagem/`; `tests/unit/gerador.test.ts`.

**Regras desta sessão**
- Conta: só as contas pessoais do Gustavo (gustavogopp@gmail.com ou gustavogopp2@gmail.com), nunca a da Futurum. Tudo fica no git, e só no git.
- Não mexa no branch `r3-uso-real`. `privado/` nunca é versionado nem usado; as personas são fictícias (`tests/personas/`).
- **O redesign visual** é de outra sessão. A tela "Como está o seu programa", a folha do exercício com o porquê primeiro e a semana com a meta do programa são pedidos ao design (`proximos-passos.md`, seção 2.5, itens 7 a 10). Se o lote dele ainda não estiver na `main`, mostre a saída do avaliador com os componentes de hoje, sem estilo novo, e registre o pedido.
- **O estado guardado não muda de versão.** O avaliador roda sobre o programa salvo; nada novo é guardado.
- Branch nova a partir da `main`. Commits pequenos, em pt-BR e no imperativo, com push. Ida para a `main` só com o ok do Gustavo, por merge sem forçar.
- Toda regra nova entra primeiro em `docs/pesquisa/regras.md`, com selo e fonte. O avaliador é uma função pura em `src/domain/avaliador/`, determinística e com 100% das regras testadas. **Ele mede pela tabela de funções (`FUNCAO`), como o gerador**, e não pelo padrão de movimento.
- Rede liberada (PubMed, PMC, Crossref). Nunca contorne bloqueio anti-robô. Nada de inventar estudo.

**O que fazer, nesta ordem**
1. **As decisões já tomadas (07/11):** o limiar de empurrar ÷ puxar é 1,5 e a coxa usa 0,5–2 (os mesmos da régua da G5). Decida você, com a medida, se a flexão em duas vagas conta como 2 funções do peito, e registre.
2. **Extrair do gerador** o que o avaliador precisa (`prescrever`, `cabeNoTetoSemanal`), sem mudar a saída: o snapshot das personas igual prova isso.
3. **O avaliador**: por músculo, séries por semana contra a meta e o piso (meia série indireta), frequência e funções que se complementam; os equilíbrios; o tempo de cada dia; as séries acima do teto; os exercícios que a dor ou o equipamento impedem (isso bloqueia ou alerta forte, pelo princípio de segurança; o resto só orienta). Cada achado com `regraId`, selo e o texto do que ajustar, ou "está bom". Os achados iguais saem agrupados ("5 séries num exercício só" × 21 vira uma linha).
4. **O avaliador como régua**: um teste de propriedade sobre o gerador (nenhum achado de segurança; nenhum "ajustar" que o gerador não avise) e uma coluna nova na auditoria (`npm run auditoria:qualidade`). Os 4 programas publicados entram como dado de teste, com a fonte de cada um.
5. **O porquê e os avisos**: o porquê específico de cada exercício (o músculo da vaga, se é foco e quantas séries tem, por que ganhou das outras opções); os avisos com o próximo passo, inclusive "não precisa fazer nada" quando a causa é o equipamento; a semana com a meta do programa quando ela fica abaixo da meta do nível.

**Aceite (medido)**
- O avaliador diz "está bom" ou só "limite do equipamento" em ≥ 80% dos programas da grade reduzida e encontra 0 problema de segurança neles.
- Nos 4 programas publicados, reproduz os achados do protótipo (`b-monte-e-avaliador.md`, seção 2).
- 20 de 20 avisos do programa com "fato + próximo passo"; porquê específico em ≥ 90% dos exercícios das 6 personas.
- `npm run check`, `npm run test:e2e` e `npm run auditoria:verificar` limpos; os textos novos revisados pelo Gustavo.

**Fechamento.** `docs/devlog.md` (com um exemplo da saída do avaliador e o rascunho de post), `docs/backlog.md`, o recado ao R3 se os textos mudarem no meio do uso, o rascunho do prompt do marco seguinte ("monte o seu treino", `b-monte-e-avaliador.md`, opção c, com a versão do estado coordenada com o redesign) e parar para a revisão do Gustavo.

**O que não fazer**
- Não faça o editor nem o "montar do zero" neste marco.
- Não use IA no avaliador nem para ler programas.
- Não bloqueie nada que não seja segurança.
- Não troque a lógica "vaga por função, nunca por equipamento" nem o determinismo.
- Não afirme nada sobre treino sem selo e fonte; "treinadores fazem" é "consenso", "acho que" é "[opinião]".
