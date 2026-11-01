# Prompt: marco R1b (vários locais e trocas inteligentes)

> Para colar no início de uma nova sessão do Claude Code com o repositório `gustavoGopp/treino-mvp`.
> Escrito em 01/11/2026, ao fim da sessão do marco R1. Depois que a sessão começar, este arquivo pode ser apagado (o git guarda o histórico).

---

<contexto>
Você vai continuar os **marcos de código** do **treino-mvp**, um web app (PWA) em pt-BR que monta um programa de hipertrofia baseado em evidência, só com o equipamento que a pessoa tem, e conduz o treino com um guia animado. O dono é o Gustavo. Ele não é programador: fala de produto e de experiência, e prefere explicações simples e visuais, em pt-BR, sem jargão. Quando um termo técnico for inevitável, explique-o em uma frase.

**Onde o projeto está (01/11/2026)**
- M0 a M5 estão em produção. A pesquisa v2 (`docs/pesquisa-v2/`, T1 a T7) está aprovada.
- **O R0b, o R0c e o R1 foram aprovados e estão na `main`** (ver `docs/devlog.md`, entradas R0c e R1).
- **O que o R1 deixou pronto** (é a base do R1b):
  - **Dor:** fica num lugar só, `triagem.dores`, com a nota de hoje por região (`seguranca.dor.programa`). Acima de 5, os exercícios que carregam a região saem; de 3 a 5, o app prefere os que poupam a região; até 5, entra um lembrete.
  - **Vagas esvaziadas pela dor:** recebem um exercício de outro músculo do mesmo dia (`selecao.dia-sem-principal`).
  - **Estado salvo:** versão 5 (`src/storage/esquema.ts`, migrações em `src/storage/migracao.ts`). Hoje há **um** inventário só, em `estado.inventario`.
  - **Atalhos de cenário:** mexem só no formulário de um inventário (`aplicarAtalho` em `src/features/onboarding/inventarioForm.ts`; os dados estão em `src/domain/taxonomia/atalhos.ts`).
  - **Menor anilha:** é gravada em cada item de anilha (`menorAnilhaKg`); sem resposta, vale 2 kg (opinião).
  - **Guia:** mostra a prescrição da pessoa na semana (`prescricaoNoGuia` e `prescricaoDaVaga` em `src/domain/sessao`; o link está em `src/features/guia/link.ts`).
  - **Troca pela alternativa no treino:** existe, mas só para aquela sessão (`noLugarDe` na sessão). O histórico é guardado por exercício (`historicoDoExercicio`).
  - **Testes:** 362 unitários e 53 no navegador.
- **Decisões do Gustavo que valem agora:**
  - o público principal é ele mesmo, sem profissional de Educação Física por agora;
  - ficam fora: foto do corpo, biotipo, idade, peso, sexo e altura;
  - exercício sem animação aprovada aparece como cartão de texto, nunca com animação improvisada;
  - no desempate entre equivalentes, ganha a animação aprovada e, por último, a ordem alfabética. É por isso que o leg press fica nas alternativas da Carla, e é para isso que entra o "prefiro este";
  - nada vem pré-marcado no cadastro (decisão 7 do M3): um atalho ou uma preferência é algo que a pessoa toca;
  - as personas são fictícias (`tests/personas/`): a Ana tem 45 min, e a Carla, os 46 equipamentos.
</contexto>

<tarefa>
Fazer o **marco R1b**: a pessoa cadastra mais de um local de treino e faz o treino do dia em qualquer um deles, com as trocas de aparelho explicadas e sem perder o progresso.
As fontes do escopo são:
- a linha R1b de `docs/PLANO-MVP.md` (seção i);
- a seção 2.3 de `docs/pesquisa-v2/07-progressao-e-acompanhamento.md` (a calibração, `progressao.calibracao`, com os casos C1 a C6);
- a tabela 1.1 de `docs/pesquisa-v2/08-equipamentos-v2.md` (como a carga sobe e calibra em cada tipo de aparelho);
- a tabela de funções (`src/domain/gerador/funcoes.json`).

1. **Pesquisa curta antes do código** (vai para a aprovação do Gustavo):
   - a pergunta: quando a pessoa troca de aparelho, entre equivalentes da mesma função (por exemplo, supino com halteres → supino na máquina, ou leg press → hack), o que dá para levar do progresso, e o que precisa recomeçar pela calibração na 1ª série?
   - registre o que existe na literatura (PubMed), com selo e fonte, sem inventar: a transferência de carga entre exercícios e aparelhos, e se a experiência num exercício encurta a adaptação no outro;
   - escreva o resultado em `docs/pesquisa-v2/` (um arquivo novo, no formato dos temas T1 a T7), com as regras propostas para `regras.md` e os casos de teste;
   - mostre ao Gustavo em linguagem simples e espere o ok.
2. **Vários locais:**
   - cada local tem um nome que a pessoa escolhe ("prédio", "academia do bairro") e o seu próprio inventário;
   - o cadastro do 2º local reaproveita a tela de equipamento, com os atalhos e a foto;
   - antes de começar o treino, a pessoa escolhe "onde vou treinar hoje", com um toque. O último local usado vem lembrado, mas a escolha continua visível.
3. **O treino do dia se ajusta ao local:**
   - cada vaga troca para o equivalente possível ali, pela tabela de funções, com o motivo da troca à mostra (por exemplo, "aqui não tem polia alta: puxada → barra fixa");
   - a prescrição da vaga (séries, RIR, descanso) continua a mesma, e as repetições são as do exercício que entrou, como já acontece na troca pela alternativa;
   - se não houver equivalente possível no local, aplique a mesma lógica do R1: o aviso diz o motivo verdadeiro, e nenhum dia fica sem exercício principal.
4. **Progresso que não se perde:**
   - o histórico de cada exercício segue o exercício, em qualquer local;
   - o exercício que já foi feito antes, mesmo em outro local, continua a progressão normal;
   - no aparelho novo, a carga vem da **calibração na 1ª série** (`progressao.calibracao`, T6, seção 2.3), nos 5 tipos de carga da tabela 1.1. O R1b traz essa regra do R2 e a aplica a toda 1ª vez de um exercício, não só à troca de local;
   - aplique a parte da pesquisa do item 1 que o Gustavo aprovar.
5. **Preferência "prefiro este":**
   - entre equivalentes da mesma função, a pessoa toca "prefiro este" nas alternativas;
   - a preferência vale nos próximos programas e nas trocas entre locais, entra no desempate antes da animação e da ordem alfabética, e aparece no "porquê";
   - nada vem preferido de início, e a pessoa desfaz com um toque;
   - a preferência nunca passa por cima da segurança: a dor acima de 5 tira o exercício preferido igual.
6. **Estado salvo:** versão 6, com migração e teste:
   - o inventário atual vira o 1º local, sem perder nenhum atributo;
   - o nome do local é neutro (por exemplo, "Meu local"), e a pessoa troca quando quiser;
   - a migração não inventa nada que a pessoa não deu;
   - a exportação e a importação em JSON continuam funcionando.
7. **Testes:**
   - cada regra nova ou revista tem teste no Vitest e entra em `regras.md`, com o selo e a fonte;
   - uma persona com 2 locais faz o mesmo dia nos dois, com as trocas explicadas, e a progressão dos exercícios repetidos continua;
   - teste de propriedade: trocar de local nunca apaga nem mistura o histórico, e nenhum exercício exige equipamento que o local não tem;
   - a calibração passa nos casos C1 a C6 do T6;
   - a preferência passa no caso do leg press da Carla: com "prefiro o leg press", ele entra no lugar do hack, e sem a preferência nada muda;
   - no navegador: a pessoa cadastra o 2º local, escolhe onde treina hoje, vê a troca com o motivo e registra a série no aparelho novo, com a calibração;
   - os snapshots das 4 personas mudam só com revisão: mostre ao Gustavo o antes e o depois. Sem 2º local e sem preferência, o programa deve sair idêntico.

Fica para depois:
- o R2: pausas detectadas sozinhas, "a sua semana", evolução por exercício e semana leve sugerida;
- as animações dos exercícios novos e os desenhos dos 21 equipamentos;
- os cartões de texto dos exercícios antigos sem animação (`docs/backlog.md`).

**Pronto quando:**
- `npm run check` e `npm run test:e2e` passam;
- a pesquisa do item 1 foi aprovada pelo Gustavo antes de virar código;
- as regras novas ou revistas estão em `regras.md`, com selo;
- os snapshots revistos foram aprovados;
- o devlog do marco está escrito.
</tarefa>

<como_trabalhar>
1. **Leia primeiro:**
   - o `CLAUDE.md` e o `docs/devlog.md` (entradas R0c e R1);
   - o `docs/PLANO-MVP.md` (seções a e i);
   - as fontes do escopo citadas acima;
   - o código em `src/storage/`, `src/domain/sessao/`, `src/domain/progressao/`, `src/domain/gerador/` (desempate e alternativas), `src/features/treino/`, `src/features/programa/` e `src/features/onboarding/Inventario.tsx`.
2. **Pesquisa e plano antes do código:**
   - mostre ao Gustavo, em linguagem simples, a pesquisa do item 1 e o que muda no treino de cada persona. Por exemplo: o Bruno com o "prédio" e a "academia do bairro", fazendo o mesmo dia nos dois;
   - o código só começa com o ok dele.
3. **Determinístico:** sem `Math.random` nem `Date.now` em `src/domain/`. A data de hoje entra como parâmetro, como já é feito em `src/domain/sessao`.
4. **Segurança:** a regra de dor, os sinais de alerta e o "pare e use a alternativa" valem igual em qualquer local.
5. **Commits:** pequenos, em pt-BR e no imperativo, num branch criado a partir da `main`. A `main` só recebe o marco depois da aprovação dele.
6. **Visual para o Gustavo:** a página "Diagnóstico do treino-mvp" (slug `5cae90d2-05e5-438d-a138-2eeca6023832`):
   - use `get_artifact` antes de editar;
   - acrescente no topo uma seção do R1b, com os prints da escolha do local, de uma troca explicada e da calibração, e com o que mudou em cada persona;
   - as imagens vão como arquivos da página (`publish_files` em modo patch, depois `edit_version`). Os arquivos precisam estar dentro do repositório, numa pasta ignorada pelo git, como `reports/`.
7. **Nunca use nada de `privado/`** em arquivos versionados.
8. **Pendências do Gustavo** estão em `docs/backlog.md`: a chave da Anthropic para o eval da foto, a cronometragem do cadastro no celular e a menor anilha da academia dele.

Ao fim do marco:
- atualize o `docs/devlog.md` com o que mudou, uma imagem ou GIF e o rascunho de post;
- diga em poucas linhas, em pt-BR simples, o que mudou no treino de cada persona, o que ficou para o R2 e o que precisa da decisão do Gustavo.

Depois pare e espere a revisão.
</como_trabalhar>
