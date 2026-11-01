# Prompt: pesquisa v2, tema T6

> Para colar no início de uma nova sessão do Claude Code com o repositório `gustavoGopp/treino-mvp`.
> Escrito em 01/11/2026, ao fim da sessão que fez o tema T5 da pesquisa v2.
> Depois que a sessão começar, este arquivo pode ser apagado (o git guarda o histórico).

---

<contexto>
Você vai continuar a **pesquisa v2** do **treino-mvp**, um web app (PWA) em pt-BR que monta um programa de hipertrofia baseado em evidência, só com o equipamento que a pessoa tem, e conduz o treino com um guia animado. O dono é o Gustavo. Ele não é programador: fala de produto e de experiência, e prefere explicações simples e visuais, em pt-BR, sem jargão (quando um termo técnico for inevitável, explique em uma frase).

**Onde o projeto está (01/11/2026)**
- Os marcos M0 a M5 estão prontos e em produção: gerador, cadastro, foto do equipamento, treino com registro e progressão.
- O plano foi reescrito em 01/11: `docs/PLANO-MVP.md`, seções a (critérios) e i (marcos). O critério 6 (acompanhamento) e o marco R2 são o alvo deste tema.
- **Decisões do Gustavo que valem agora:**
  - o público principal é ele mesmo; família e amigos podem testar, mas o plano não depende disso;
  - a base do programa está sendo refeita **sem tomar como certo** o programa pessoal de referência (`referencia/programa-fase-1.md`, histórico). É o marco **P (pesquisa v2)**, em `docs/pesquisa-v2/`, antes de qualquer código;
  - **não há profissional de Educação Física no projeto por agora.** As regras de segurança não mudam sem um profissional;
  - fora por agora: foto do corpo e biotipo, e idade, peso, sexo e altura no perfil (nenhuma regra os usa; LGPD manda coletar só o necessário);
  - ele quer um **acompanhamento personalizado**: quantos treinos fez, se treinou menos do que devia, que carga pegar depois de faltar. A base é este tema (T6), e o código vem no marco R2.

**Pesquisa v2: o que já foi aprovado** (leia os arquivos, não reabra as decisões):
- `README.md`: o porquê, o método e as premissas herdadas.
- `01-divisao-e-frequencia.md`: a divisão é **escolhida pela pessoa** entre opções equivalentes.
- `02-panorama-da-evidencia.md`: os números do app confirmados (ACSM 2026, Pelland 2026), com 4 ajustes; um deles é **semana leve só para fadiga ou dor** (Coleman 2024: a semana leve não mudou a hipertrofia e tirou um pouco de força).
- `03-universo-de-equipamentos.md`: ~45 equipamentos e a linha de base medida.
- `04-exercicios-por-musculo.md` (T3): escolha por **função**, não por equipamento.
- `05-montagem-da-sessao.md` (T4): tabela "minutos → exercícios", nova escada de cortes e a **calibração do tempo pelo uso real** (proposta para o R2).
- `06-populacoes-e-seguranca.md` (T5, aprovado em 01/11/2026). O que importa para o T6:
  - **volta de pausa:** menos de 2 semanas → mesma carga (Hwang 2017, 28328712; Ogasawara 2011, 21771261); 2 a menos de 3 semanas → 1ª sessão com 1 repetição a mais de reserva (Chen 2012, 21611825: a proteção contra dano dura ~2 semanas); 3 semanas ou mais → volta gradual, com **carga −10% para pausas de 3 a 8 semanas e −10 a −20% acima de 8** (aprovado). A volta gradual existe para evitar dor e dano, não para recuperar músculo perdido;
  - a perda de força cresce com a duração da pausa e é maior acima de 65 anos (Bosquet 2013, 23347054), mas o app não pergunta a idade;
  - a relação "repetições × % da carga máxima" quase não muda com sexo, idade ou experiência (Nuzzo 2024, 37792272), útil para a calibração da carga;
  - aprovado também: cartão de "montagem segura" no guia. A triagem não muda (proposta só registrada).
- `PLANO-DOS-TEMAS.md`: o plano dos temas, com perguntas, fontes, entregável e critério de pronto. **Siga a seção do T6.**

**Nada disso entrou ainda em `docs/pesquisa/regras.md` nem no código.** As mudanças aprovadas entram juntas nos marcos R0b e R2, depois da pesquisa.
</contexto>

<objetivo>
Fazer o **tema T6 (progressão e acompanhamento)**, exatamente como descrito em `docs/pesquisa-v2/PLANO-DOS-TEMAS.md`, com o entregável `docs/pesquisa-v2/07-progressao-e-acompanhamento.md`.

Dê base às peças do acompanhamento do R2, cada uma com uma regra com selo e **um caso de teste descrito** (ex.: "pausa de 22 dias → volta gradual, carga −10%"):
1. **pausas detectadas sozinhas** (hoje a readaptação só vale no cadastro e a "semana do programa" é contada pelo calendário; a simulação de 01/11 mostrou uma persona que sumiu 1 mês e voltou com **mais** séries e RIR **mais baixo**);
2. **"a sua semana"**: treinos feitos contra os planejados e séries por músculo contra a meta. O que conta como "treinou menos do que devia"? Use a adesão real às recomendações de força (PMID 36418149) e a relação força × mortalidade (35228201) para calibrar metas e mensagens sem culpa;
3. **a evolução por exercício**: o que mostrar (carga, repetições, uma estimativa de força?) e com que cuidado;
4. **a semana leve sugerida**: quando sugerir, agora que ela é só para fadiga ou dor (Coleman 2024, 38274324). A função existe no código, mas nenhuma tela a usa;
5. **a calibração da carga na 1ª série**: de "repetições + reserva" para a carga das séries seguintes e da próxima sessão. Quão confiável é o RIR que as pessoas relatam (Halperin 2022, 34542869)? Busque as fórmulas de estimativa da carga máxima (Epley, Brzycki) e o erro delas em séries de muitas repetições; compare com Nuzzo 2024.

Responda também às perguntas 1, 5 e 6 do plano do T6 (dupla progressão × outras formas, Plotkin 2022; o que ajuda a manter o hábito, Michie 2009, 19916637; quanto as pessoas cumprem as recomendações).

O tema termina com:
1. a lista de mudanças propostas para `regras.md`;
2. o que muda no app;
3. o que fica sem resposta;
4. **uma parada para a revisão do Gustavo.**
</objetivo>

<como_trabalhar>
1. **Leia primeiro:** `CLAUDE.md`, `docs/PLANO-MVP.md` (seções a e i), `docs/pesquisa-v2/` inteira (principalmente `06` e o T6 do `PLANO-DOS-TEMAS.md`), `docs/pesquisa/00-metodo.md`, `docs/pesquisa/regras.md` e `docs/pesquisa/03-progressao-readaptacao-deload.md`. No código, veja `src/domain/progressao/`, `src/domain/sessao/`, `src/domain/nivel/` e a parte de readaptação de `src/domain/gerador/index.ts`, para descrever o comportamento atual com precisão.
2. **Leitura de estudos.** A rede das sessões abre o PubMed. Use `python3 -I scripts/pesquisa/pubmed.py s <termos>` para buscar e `python3 -I scripts/pesquisa/pubmed.py a <PMID…>` para ler o resumo oficial. Dicas:
   - prefira buscas de 3 a 6 termos;
   - se o resumo vier vazio, espere e rode de novo (o PubMed limita pedidos seguidos);
   - o PMC, as editoras e os sites do governo (gov.br, bvsms) estavam bloqueados na sessão do T5. Não insista: registre a lacuna.
3. **Siga `docs/pesquisa/00-metodo.md`.** Nada de inventar estudos, autores ou números.
   - Cada fonte tem nível de leitura: **resumo-PubMed** (resumo oficial lido, com PMID), **texto-completo** ou **não verificado** (visto só na busca).
   - Confira autores e revista no PubMed antes de citar.
   - O selo vai no número, não no tema.
   - Registre as buscas (termos e data) no fim do arquivo, como no `06`.
4. **Marque o que é opinião.** Separe o que é fato (medido, lido numa fonte) do que é opinião sua.
5. **Medições com o código real**, se precisar (ex.: refazer a simulação "1 semana de treino, 1 mês parado, volta"): scripts temporários **fora do repositório**. Um jeito que funciona é empacotar com `npx esbuild arquivo.ts --bundle --platform=node --format=esm` e rodar com `node`. Não altere código, testes nem dados do app nesta fase.
6. **Visual para o Gustavo.** Ele lê no celular a página de Artifact "Diagnóstico do treino-mvp" (slug `5cae90d2-05e5-438d-a138-2eeca6023832`). Acrescente uma seção do T6 no topo, no mesmo estilo da página, e mude o rótulo da seção do T5 para "aprovado". Use `get_artifact` para pegar a versão atual antes de editar. Um esboço simples de como "a sua semana" apareceria na tela ajuda muito.
7. **Commits:** pequenos, em pt-BR, no imperativo. Atualize o status do tema no `docs/pesquisa-v2/README.md`. Esta fase só mexe em documentos, e o Gustavo aprovou levá-los à `main` a cada tema aprovado (antes da aprovação, use um branch).
8. **Nunca use nada de `privado/`** em arquivos versionados. Esta pasta não existe na nuvem; o tema T8 (o programa do Gustavo) é feito na máquina dele.
9. **Pendências do Gustavo:** estão em `docs/backlog.md` (a chave da Anthropic, os 2 projetos extras na Vercel, o limite compartilhado da foto). Os branches antigos que já estão na `main` podem ser apagados pelo GitHub. Não insista nesses itens; lembre-os só se fizer sentido.
</como_trabalhar>

<entrega>
Ao fim do tema, diga em poucas linhas, em pt-BR simples:
- o que achou;
- o que muda no app;
- o que precisa da decisão dele.

Depois pare e espere. Quando o T6 for aprovado, proponha o prompt da sessão seguinte (T7, equipamentos, segunda versão), ou siga para o T7 se ele pedir.
</entrega>
