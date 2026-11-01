# Prompt: pesquisa v2, temas T5 e T6

> Para colar no início de uma nova sessão do Claude Code com o repositório `gustavoGopp/treino-mvp`.
> Escrito em 01/11/2026, ao fim da sessão que fez o diagnóstico e os temas T1 a T4 da pesquisa v2.
> Depois que a sessão começar, este arquivo pode ser apagado (o git guarda o histórico).

---

<contexto>
Você vai continuar a **pesquisa v2** do **treino-mvp**, um web app (PWA) em pt-BR que monta um programa de hipertrofia baseado em evidência, só com o equipamento que a pessoa tem, e conduz o treino com um guia animado. O dono é o Gustavo. Ele não é programador: fala de produto e de experiência, e prefere explicações simples e visuais, em pt-BR, sem jargão (quando um termo técnico for inevitável, explique em uma frase).

**Onde o projeto está (01/11/2026)**
- Os marcos M0 a M5 estão prontos e em produção: gerador, cadastro, foto do equipamento, treino com registro e progressão.
- Em 01/11, uma sessão de diagnóstico revisou tudo (`docs/planejamento/2026-11-diagnostico.md`, documento histórico) e o plano foi reescrito: `docs/PLANO-MVP.md`, seções a (critérios) e i (marcos).
- **Decisões do Gustavo que valem agora:**
  - o público principal é ele mesmo; família e amigos podem testar, mas o plano não depende disso;
  - ele pediu um **passo atrás**: refazer a base do programa com pesquisa aprofundada, para todos e para ele, **sem tomar como certo** o programa pessoal de referência (`referencia/programa-fase-1.md`, hoje marcado como histórico). Isso virou o marco **P (pesquisa v2)**, em `docs/pesquisa-v2/`, antes de qualquer código;
  - **não há profissional de Educação Física no projeto por agora.** As regras de segurança não mudam sem um profissional; propostas de mudança na triagem ficam registradas, não aplicadas;
  - fora por agora: foto do corpo e biotipo, e idade, peso, sexo e altura no perfil (nenhuma regra os usa; LGPD manda coletar só o necessário);
  - ele quer um **acompanhamento personalizado**: quantos treinos fez, se treinou menos do que devia, que carga pegar depois de faltar. Base no tema T6 e código no marco R2.

**Pesquisa v2: o que já foi aprovado** (leia os arquivos, não reabra as decisões):
- `docs/pesquisa-v2/README.md`: o porquê, o método e as premissas herdadas que estão sendo reavaliadas.
- `01-divisao-e-frequencia.md` (aprovado): com o mesmo volume semanal, AB, ABC, ABCD, corpo todo e superior/inferior dão o mesmo resultado. A divisão passa a ser **escolhida pela pessoa** entre opções equivalentes.
- `02-panorama-da-evidencia.md` (aprovado): as regras numéricas do app foram confirmadas pela evidência mais recente (ACSM 2026, Pelland 2026). Há 4 ajustes:
  - descanso de 90–120 s nos multiarticulares;
  - semana leve só para fadiga ou dor;
  - técnicas para economizar tempo antes de cortar exercícios;
  - sobrecarga na descida, em estudo.
- `03-universo-de-equipamentos.md`: cerca de 45 equipamentos, com a linha de base medida (numa academia completa, o gerador usa só 32 dos 60 exercícios possíveis).
- `04-exercicios-por-musculo.md` (T3, aprovado): a escolha é por **função**, não por equipamento. Inclui a posição alongada e os isoladores obrigatórios (extensora, tríceps acima da cabeça, panturrilha em pé).
- `05-montagem-da-sessao.md` (T4, aprovado em 01/11/2026): a tabela "minutos → exercícios", a nova escada de cortes, o aquecimento só específico e a calibração do tempo pelo uso real.
- `PLANO-DOS-TEMAS.md`: o plano dos temas T3 a T8, com perguntas, fontes já localizadas, entregável e critério de pronto. **Siga esse plano.**

**Nada disso entrou ainda em `docs/pesquisa/regras.md` nem no código.** As mudanças aprovadas entram juntas no marco R0b, depois da pesquisa, para não mexer no gerador duas vezes.
</contexto>

<objetivo>
Fazer o **tema T5 (populações e segurança)** e, se o Gustavo aprovar, o **tema T6 (progressão e acompanhamento)**, exatamente como descritos em `docs/pesquisa-v2/PLANO-DOS-TEMAS.md`.

- **T5** → `docs/pesquisa-v2/06-populacoes-e-seguranca.md`. Para cada grupo, diga o que muda na prescrição, ou "não muda", sempre com a fonte:
  - iniciante;
  - volta de pausa;
  - mulheres;
  - acima de 60 anos;
  - gestação;
  - pressão alta;
  - lesões.

  Confira a triagem atual (`src/domain/triagem/index.ts`) contra as diretrizes médicas: OMS 2020 (PMID 33239350), o Guia de Atividade Física para a População Brasileira (Ministério da Saúde, 2021; ler o PDF oficial se a rede permitir), ACSM 2026 (41843416), NSCA para idosos (31343601), ICFSR (34409961, 30498820), a diretriz canadense para gestação (30337460) e a metanálise de exercício e pressão arterial (37491419).

  A proposta de triagem revisada fica **registrada, não aplicada**.
- **T6** → `docs/pesquisa-v2/07-progressao-e-acompanhamento.md`. Dê base às 4 peças do acompanhamento do R2:
  - pausas detectadas sozinhas;
  - "a sua semana";
  - a evolução por exercício;
  - a semana leve sugerida.

  Inclua também a calibração da carga na 1ª série (repetições + reserva → carga). O ponto de partida está no próprio plano do T6.

Cada tema termina com:
1. a lista de mudanças propostas para `regras.md`;
2. o que muda no app;
3. o que fica sem resposta;
4. **uma parada para a revisão do Gustavo.**
</objetivo>

<como_trabalhar>
1. **Leia primeiro:** `CLAUDE.md`, `docs/PLANO-MVP.md` (seções a e i), `docs/pesquisa-v2/` inteira, `docs/pesquisa/00-metodo.md`, `docs/pesquisa/regras.md`, `docs/pesquisa/07-seguranca-triagem-niveis.md` e `docs/pesquisa/03-progressao-readaptacao-deload.md`.
2. **Leitura de estudos.** A rede das sessões abre o PubMed. Use `python3 -I scripts/pesquisa/pubmed.py s <termos>` para buscar e `python3 -I scripts/pesquisa/pubmed.py a <PMID…>` para ler o resumo oficial. Dicas:
   - prefira buscas de 3 a 6 termos;
   - se o resumo vier vazio, espere e rode de novo (o PubMed limita pedidos seguidos);
   - o PMC e as editoras costumam estar bloqueados.
3. **Siga `docs/pesquisa/00-metodo.md`.** Nada de inventar estudos, autores ou números.
   - Cada fonte tem nível de leitura: **resumo-PubMed** (resumo oficial lido, com PMID), **texto-completo** ou **não verificado** (visto só na busca).
   - Confira autores e revista no PubMed antes de citar.
   - O selo vai no número, não no tema.
4. **Marque o que é opinião.** Separe o que é fato (medido, lido numa fonte) do que é opinião sua.
5. **Medições com o gerador real**, se precisar: scripts temporários **fora do repositório**. Um jeito que funciona é empacotar com `npx esbuild arquivo.ts --bundle --platform=node --format=esm` e rodar com `node`. Não altere código, testes nem dados do app nesta fase.
6. **Visual para o Gustavo.** Ele lê no celular a página de Artifact "Diagnóstico do treino-mvp" (slug `5cae90d2-05e5-438d-a138-2eeca6023832`). A cada tema, acrescente uma seção no topo, no mesmo estilo da página, e mude o rótulo da seção anterior para "aprovado". Use `get_artifact` para pegar a versão atual antes de editar.
7. **Commits:** pequenos, em pt-BR, no imperativo. Atualize o status do tema no `docs/pesquisa-v2/README.md`. Esta fase só mexe em documentos, e o Gustavo aprovou levá-los à `main` a cada tema aprovado.
8. **Nunca use nada de `privado/`** em arquivos versionados. Esta pasta não existe na nuvem; o tema T8 (o programa do Gustavo) é feito na máquina dele.
9. **Pendências do Gustavo:** estão em `docs/backlog.md` (a chave da Anthropic, os 2 projetos extras na Vercel, o limite compartilhado da foto). Os 6 branches antigos já estão na `main` e podem ser apagados pelo GitHub; a sessão anterior não teve permissão para apagá-los. Não insista nesses itens; lembre-os só se fizer sentido.
</como_trabalhar>

<entrega>
Ao fim de cada tema, diga em poucas linhas, em pt-BR simples:
- o que achou;
- o que muda no app;
- o que precisa da decisão dele.

Depois pare e espere. Quando T5 e T6 estiverem aprovados, proponha o prompt da sessão seguinte (T7, equipamentos, segunda versão), ou siga para o T7 se ele pedir.
</entrega>
