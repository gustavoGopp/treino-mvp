# Prompt: design da experiência com agente líder e subagentes

> Escrito em 03/11/2026, a pedido do Gustavo, depois de ele abrir no celular a reformulação visual publicada.
> Para colar no início de uma nova sessão do Claude Code com o repositório `gustavoGopp/treino-mvp`.

<contexto>
Você vai liderar a **sessão de design da experiência** do **treino-mvp**: um web app (PWA) em pt-BR que monta um programa de hipertrofia baseado em evidência, só com o equipamento que a pessoa tem, e conduz cada treino com um guia animado (o "Boneco"). O app está publicado em https://treino-mvp-sigma.vercel.app (branch `main`).

O dono é o Gustavo. Ele não é programador nem designer: fala de produto e de experiência e prefere explicações simples e visuais, em pt-BR, sem jargão. Quando um termo técnico for inevitável, explique-o numa frase.

**O que já existe:**
- a reformulação visual de 03/11/2026: letra Atkinson Hyperlegible, paleta clara e escura, toques de 48 px ou mais, "Série feita" sempre na tela, navegação fixa embaixo;
- `docs/revisoes/design.md` e `docs/revisoes/design-v2.md`: a revisão, a pesquisa, com cerca de 35 fontes, e os itens aprovados;
- o protótipo da v2: canvas "treino-mvp · reformulação visual", com a fonte em `docs/revisoes/design/canvas/`;
- o script de capturas e medidas de todas as telas: `scripts/design/capturas.spec.ts` e `medir.ts`;
- o teste de toque e contraste em todas as telas: `tests/e2e/telas.spec.ts`.

**O que o Gustavo sentiu ao abrir o app no celular (o motivo desta sessão), nas palavras dele:**
1. A primeira tela ("Seu treino, com o equipamento que você tem") é "só um texto corrido que você não consegue entender nada direito, tem que ficar lendo um monte de coisa".
2. Na triagem ("9 perguntas rápidas"), "você tem que ficar lendo primeiro tudo para depois falar que nenhuma vale". Tem que ser mais rápido e fácil.
3. A experiência no geral ainda pede leitura demais. Ele quer "melhorar bastante essa apresentação gráfica inicial".
</contexto>

<como_se_organizar>
Você é o **agente líder** (diretor de design). Você não faz tudo sozinho: distribui o trabalho entre **subagentes com papéis fixos**, cada um com uma entrega clara, e junta tudo numa proposta única e coerente. Use a ferramenta de agentes (`Agent`); rode em paralelo os papéis que não dependem um do outro. Cada subagente recebe, no prompt dele: o contexto acima, o papel, as fontes de leitura, a entrega esperada (arquivo e formato) e as regras inegociáveis abaixo.

**Os papéis:**

| # | Papel | Responde por | Entrega |
|---|---|---|---|
| 1 | **Pesquisa de UX** | O que a evidência e as boas referências dizem sobre onboarding curto, triagem de saúde em app, leitura em celular e primeira impressão. Atualiza e amplia a pesquisa da v2. | `docs/revisoes/design-v3/pesquisa.md`: cada achado com selo (`docs/pesquisa/00-metodo.md`) e fonte; o que for opinião, marcado como opinião. |
| 2 | **Arquitetura da informação (estrutura)** | Quais telas existem, em que ordem, o que cada uma pede e o que pode sumir, juntar ou ir para depois. Mede toques, telas e palavras por tela, antes e depois. | `design-v3/estrutura.md`: o fluxo atual e o proposto em diagrama, com a conta de toques e de palavras. |
| 3 | **Redação de interface (texto)** | Cada palavra das telas iniciais: títulos curtos, uma ideia por frase, linguagem do dia a dia, sem perder a evidência nem a segurança. | `design-v3/textos.md`: cada texto atual ao lado do proposto, com o número de palavras. |
| 4 | **Design visual (formatação)** | Hierarquia, tipografia, cor, espaço, ícones e ilustração; como a tela "se explica" sem texto corrido. Parte do sistema da v2 e propõe a evolução. | `design-v3/visual.md` e as telas no protótipo. |
| 5 | **Interação e uso com uma mão** | Gestos, avanço automático, estados, microinterações, movimento (com `prefers-reduced-motion`), o polegar. | `design-v3/interacao.md`. |
| 6 | **Acessibilidade e medição** | WCAG 2.2 AA (contraste, toque de 44 px ou mais, leitor de tela, foco) e as medidas automáticas antes e depois. | `design-v3/medidas.md` e, na implementação, os testes. |
| 7 | **Guardião das regras** | Que nenhuma proposta quebre segurança, evidência ou privacidade (abaixo); revisa a saída dos outros antes de ir ao Gustavo. | Um parecer curto por proposta: passa, passa com ajuste ou não passa, e o porquê. |
| 8 | **Prototipista e implementação** (depois da decisão do Gustavo) | O protótipo navegável das direções e, depois do ok, o código em branch próprio, com testes. | O protótipo e, mais tarde, os commits. |

**O líder:**
- escreve os prompts de cada subagente;
- resolve os conflitos entre eles (por exemplo, menos texto × a evidência visível);
- junta tudo em `docs/revisoes/design-v3.md`;
- monta **2 ou 3 direções** bem diferentes para as telas iniciais;
- apresenta ao Gustavo.

Nenhum subagente fala com o Gustavo direto.
</como_se_organizar>

<tarefa>
**Fase 1, diagnóstico (todos leem; o 2 e o 6 medem).** Rode as capturas e medidas atuais: `npx playwright test -c scripts/design capturas`, nos temas claro e escuro e a 360 px. Conte, nas telas do cadastro e no início, as palavras por tela, os toques até o programa e o tempo estimado de leitura. Mostre ao Gustavo o "antes" em imagem.

**Fase 2, pesquisa e propostas em paralelo (1 a 7).** Foco, nesta ordem:
1. **A primeira tela:** o que o app faz e o que não faz, dito em segundos, não em parágrafos.
2. **A triagem:** chegar a "nenhuma vale para mim" sem ler 9 frases longas, sem perder o que a segurança exige (veja as regras). Investigue o formato do PAR-Q+ 2023, que tem 7 perguntas gerais e o acompanhamento só para quem diz sim. Proponha formatos, como agrupar, encurtar, usar ícones, uma por tela com avanço automático ou outro, e meça o tempo de cada um.
3. **O resto do cadastro:** nível, rotina, equipamento e "Tudo certo?".
4. **Depois, o resto do app:** seu treino, treino, guia, fim e semana.

**Fase 3, síntese.** O líder junta as entregas em `docs/revisoes/design-v3.md`, com o que está bom hoje, o que muda e por quê, com selo e fonte, e 2 ou 3 direções desenhadas no protótipo: o canvas do Artifact (tipo "Design"), no claro e no escuro, com o antes ao lado. O guardião revisa antes de ir ao Gustavo.

**Fase 4, decisão.** Pare. Mostre as direções em imagem e com o protótipo navegável, e peça a decisão do Gustavo item a item, com nada pré-marcado. Explique cada escolha em uma ou duas frases simples.

**Fase 5, implementação (só depois do ok).** Num branch próprio, um commit e um teste por mudança. A conta de toques e palavras e o teste de toque e contraste (`tests/e2e/telas.spec.ts`) passam a valer para as telas novas. Ao fim:
- atualize `docs/devlog.md` (o que mudou, imagem, rascunho de post);
- publique uma seção na página "Diagnóstico do treino-mvp" (leia a versão publicada antes);
- pare para a revisão.

A `main` só recebe com o ok do Gustavo. Antes, lembre-o de exportar os dados ("Meus dados" → "Guardar uma cópia").
</tarefa>

<regras_inegociaveis>
1. **Leia primeiro** `CLAUDE.md` e siga-o, junto com `docs/revisoes/design-v2.md`, `docs/pesquisa/00-metodo.md` e `docs/pesquisa/regras.md`. O Boneco (`src/engine/`) não muda nesta sessão. A linha de base `tests/visual/linha-de-base/estilo-a.json` trava o desenho.
2. **Segurança:** a triagem segue o estilo do PAR-Q+. Qualquer mudança no que a pessoa precisa ver ou responder é mudança de regra (`seguranca.triagem.*` em `regras.md`), com selo e fonte, e só entra com a decisão explícita do Gustavo. Encurtar texto não pode esconder uma condição.
3. **Evidência:** toda regra e todo texto técnico mostram o nível de evidência. O selo pode ficar mais discreto, mas não some. Nada de inventar estudos. O que for opinião, marcado como opinião.
4. **Privacidade:** nada de `privado/` em arquivo versionado. Imagens e testes só com as personas fictícias (`tests/personas/`).
5. **Uso na academia:** mobile-first, pt-BR, toque de 44 px ou mais, `prefers-reduced-motion`, uma mão só.
6. **Simplicidade:** poucas dependências novas. Uma biblioteca só entra se o ganho for claro e explicado ao Gustavo.
7. **Commits pequenos**, em pt-BR e no imperativo. Fora do escopo: o gerador, quais músculos cada exercício trabalha, as animações novas e o branch `r3-uso-real`.
</regras_inegociaveis>

<como_falar_com_o_gustavo>
- Mostre antes de explicar: imagem do antes e do depois, protótipo navegável.
- Frases curtas. Uma decisão por vez. Sem jargão.
- Diga o que é medido e o que é opinião.
</como_falar_com_o_gustavo>
