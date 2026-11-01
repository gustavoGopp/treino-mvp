# Prompt: sessão de diagnóstico e replanejamento

> Para colar no início de uma nova sessão do Claude Code com o repositório `gustavoGopp/treino-mvp`.
> Escrito em 01/11/2026, depois do M4.

---

<contexto>
Você vai trabalhar no **treino-mvp**, um web app (PWA) em pt-BR que monta um programa de hipertrofia baseado em evidência, só com o equipamento que a pessoa tem, e conduz o treino com um guia animado. O dono do projeto é o Gustavo. Ele não é programador: fala de produto e de experiência, e prefere explicações simples e visuais.

O que já existe, em produção (https://treino-mvp-sigma.vercel.app, deploy automático a cada push na `main`):
- **Base e pesquisa:** Vite + React + TypeScript, testes (Vitest e Playwright) e CI. Em `docs/pesquisa/` estão 77 regras de treino, cada uma com selo de evidência e fonte.
- **Gerador de programa** (`src/domain/`): determinístico, com triagem, nível, progressão e escolhas calculadas quando o programa não cabe no tempo.
- **Onboarding** (M3): triagem, experiência, rotina, equipamento por cartões com desenho, restrições e o treino direto ao ponto.
- **Treino com o app** (M5): registro de séries, descanso, troca de exercício, "Senti algo" e a sugestão de carga para a próxima vez.
- **Foto do equipamento** (M4): a pessoa confirma cada sugestão; a foto sai do celular sem GPS; função `api/vision.ts`.
- **Guia animado** (`src/engine/`): 25 animações do guia original e 6 novas aprovadas. Faltam 42 dos 73 exercícios. Toda animação nova passa pelo ritual de `docs/pesquisa/animacoes/README.md`.

O Gustavo decidiu parar aqui e repensar o projeto antes de seguir. **Esta sessão não é para construir nada.** É para estudar o projeto inteiro, entender o que ele é hoje, avaliar onde estão as maiores oportunidades de melhoria e propor, em ordem de prioridade, o que fazer a seguir.
</contexto>

<objetivo>
Entregar um diagnóstico e uma proposta de caminho que o Gustavo consiga ler e decidir. O resultado bom:
1. mostra que você entendeu o produto como uma pessoa que treina o usaria, não só o código;
2. separa o que é fato (medido, testado, lido numa fonte) do que é opinião sua;
3. avalia com honestidade as ideias do Gustavo, inclusive dizendo quando uma delas não vale o esforço, ou quando há algo melhor a fazer antes;
4. termina numa lista priorizada, com o porquê de cada posição, que sirva de base para reescrever o plano.
</objetivo>

<ideias_do_gustavo>
Leve em conta, com o peso de um pedido do dono do produto, mas avaliando cada uma com evidência:
- **Boneco do guia mais parecido com um humano**, sem perder a clareza de postura e articulações, que ele considera essencial.
- **Estética do formulário**, principalmente os desenhos dos equipamentos e as imagens dos exercícios.
- **Preencher mais rápido**: menos tempo e menos digitação no onboarding.
- **Peso inicial sugerido**, levando em conta quanto tempo a pessoa ficou parada e outros dados.
- **Peso corporal, idade e dados parecidos no perfil**: o que cada um muda de fato no programa.
- **Foto do corpo para estimar o biotipo** e indicar o treino. Já foram levantados dois pontos: dado sensível pela LGPD (minimização) e evidência fraca de que o biotipo deva mudar um programa de hipertrofia. Avalie com pesquisa antes de recomendar.
- As outras pendências estão em `docs/backlog.md`. Entre elas: as 42 animações que faltam, a triagem com perguntas de acompanhamento (hoje qualquer "sim" bloqueia, e ~28% dos adultos das capitais têm hipertensão), o limite da visão compartilhado entre instâncias, o eval da visão com as fotos reais e o beta com testadores.
</ideias_do_gustavo>

<como_trabalhar>
1. **Entenda antes de opinar.** Leia `CLAUDE.md`, `docs/PLANO-MVP.md` (com os critérios de sucesso da seção a), `docs/devlog.md`, `docs/backlog.md`, `docs/pesquisa/README.md` e os documentos de decisão `docs/pesquisa/09-decisoes-m3.md`, `10-decisoes-m5.md` e `11-decisoes-m4.md`. Leia também `docs/revisoes/` e percorra o código de `src/` e `api/`.
2. **Use o app.** Rode `npm run dev` e faça a jornada completa como as personas fictícias de `tests/personas/` (Ana, Bruno, Carla, Diego): do onboarding ao treino e ao resumo. Anote onde trava, confunde, cansa ou passa insegurança. Rode `npm run check` e veja a cobertura dos testes. A rede do ambiente costuma bloquear `*.vercel.app`; use o servidor local.
3. **Compare com o objetivo.** Para cada critério da seção a do plano (tempo até o programa, acerto da visão, coincidência com o programa de referência, testadores, animações, Lighthouse), diga onde o projeto está e o que falta.
4. **Levante as oportunidades**: as ideias do Gustavo, o backlog e o que você mesmo encontrar (produto, segurança, evidência, qualidade técnica, custo, riscos legais e de privacidade). Pergunte também se há algo mais importante que nenhuma dessas listas cobre, por exemplo, colocar o app nas mãos dos testadores antes de polir.
5. **Avalie cada oportunidade** pelo impacto na pessoa que treina e nos critérios de sucesso, pela força da evidência, pelo esforço, pelo risco e pelas dependências. Quando a decisão depender de evidência científica ou de prática de mercado, pesquise na web e cite a fonte. Siga `docs/pesquisa/00-metodo.md`: nada de inventar estudos, e o que não foi lido no original fica marcado como não verificado.
6. **Priorize.** Monte uma ordem e explique os critérios. Prefira poucos itens bem justificados a uma lista longa e rasa.
</como_trabalhar>

<limites>
- Não altere código, testes nem dados do app. O único arquivo novo é o documento do diagnóstico (abaixo); você pode commitá-lo num branch próprio.
- Não use nada de `privado/` em documentos versionados.
- Se faltar informação que só o Gustavo tem, não trave: siga com a melhor hipótese, diga qual foi e coloque a dúvida na lista de perguntas.
</limites>

<entrega>
Crie `docs/planejamento/2026-11-diagnostico.md` com estas seções, em pt-BR simples e sem jargão (quando um termo técnico for inevitável, explique em uma frase):
1. **Resumo em 10 linhas:** onde o projeto está e o que você recomenda fazer primeiro.
2. **O que existe hoje:** o que funciona bem, o que funciona mal e o que você mediu (com números).
3. **Situação de cada critério de sucesso** do plano.
4. **Oportunidades:** uma tabela com problema, evidência (com fonte), impacto, esforço (P/M/G), risco e recomendação (fazer agora / depois / não fazer).
5. **As ideias do Gustavo, uma a uma:** vale a pena? Em que forma? Quando? Por quê?
6. **O que você faria diferente:** algo melhor que não está em nenhuma lista, se houver.
7. **Ordem de prioridade proposta:** os próximos marcos, cada um com objetivo, entregáveis e critério de aceite verificável.
8. **O que não fazer agora,** e por quê.
9. **Perguntas para o Gustavo:** no máximo 8, cada uma com a sua recomendação e o porquê.

Depois, publique uma versão visual do mesmo conteúdo (uma página de Artifact, como o "Mapa do treino-mvp" que já foi feito), para o Gustavo ler no celular.

Ao terminar, pare e espere a decisão dele. O plano só é reescrito depois da aprovação.
</entrega>
