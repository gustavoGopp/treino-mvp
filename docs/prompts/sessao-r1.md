# Prompt: marco R1 (corrigir o que engana e cadastro em 1 minuto)

> Para colar no início de uma nova sessão do Claude Code com o repositório `gustavoGopp/treino-mvp`.
> Escrito em 01/11/2026, ao fim da sessão do marco R0c. Depois que a sessão começar, este arquivo pode ser apagado (o git guarda o histórico).

---

<contexto>
Você vai continuar os **marcos de código** do **treino-mvp**, um web app (PWA) em pt-BR que monta um programa de hipertrofia baseado em evidência, só com o equipamento que a pessoa tem, e conduz o treino com um guia animado. O dono é o Gustavo. Ele não é programador: fala de produto e de experiência, e prefere explicações simples e visuais, em pt-BR, sem jargão (quando um termo técnico for inevitável, explique em uma frase).

**Onde o projeto está (01/11/2026)**
- M0 a M5 em produção. A pesquisa v2 (`docs/pesquisa-v2/`, T1 a T7) está aprovada.
- **O R0b e o R0c foram aprovados e estão na `main`** (ver `docs/devlog.md`, entradas R0b e R0c):
  - o gerador escolhe a divisão e preenche vagas por função (`src/domain/gerador/funcoes.json`, a tabela 2.1 completa);
  - o catálogo tem 46 equipamentos e 102 exercícios (`src/domain/taxonomia/equipamentos.ts`, `src/domain/biblioteca/exercicios.json`);
  - os 29 exercícios novos têm cartão de texto (`src/conteudo/exercicios/`, esquema `cartaoTextoSchema`);
  - a carga é registrada nos 5 tipos (placa, kg, anilha por lado, contrapeso, degrau);
  - as alternativas trazem a função inteira (3 à mostra, o resto em "ver mais");
  - o estado salvo está na versão 4;
  - as metas do R0 passam em `tests/unit/metas-r0.test.ts`.
- **Decisões do Gustavo que valem agora:**
  - o público principal é ele mesmo, sem profissional de Educação Física por agora;
  - fora: foto do corpo, biotipo, idade, peso, sexo e altura;
  - exercício sem animação aprovada aparece como cartão de texto, nunca com animação improvisada;
  - no desempate entre equivalentes, entra a animação aprovada e, por último, a ordem alfabética (o leg press fica nas alternativas da Carla); sem drop set nas semanas de RIR 3–4; com polia, a puxada ganha da barra fixa pela "carga possível";
  - a Carla (persona fictícia) tem os 46 equipamentos, e as metas do R0 são medidas com ela;
  - a adução fica sem alternativa (exceção declarada), e o aviso da panturrilha sentada fica;
  - nada vem pré-marcado no cadastro (decisão 7 do M3): um atalho é um botão que a pessoa toca.
- **O próximo marco depois deste é o R1b** (pedido do Gustavo, ver `docs/PLANO-MVP.md`, seção i): vários locais com trocas inteligentes de aparelho sem perder o progresso, a calibração da carga na 1ª série e a preferência "prefiro este" entre equivalentes. **Não entra neste marco**, mas não feche portas para ele: por exemplo, não amarre o inventário a um local só, se a mudança do R1 tocar nisso.
</contexto>

<tarefa>
Fazer o **marco R1**: nada no app contradiz o programa da pessoa nem os fatos, e o cadastro de quem não tem nenhuma condição de saúde leva cerca de 1 minuto.
As fontes do escopo são três:
- a linha R1 de `docs/PLANO-MVP.md` (seção i);
- a seção R1 e a 5.3 de `docs/planejamento/2026-11-diagnostico.md`;
- a seção 3 de `docs/pesquisa-v2/08-equipamentos-v2.md` (atalhos).

1. **Triagem** (`src/domain/triagem/`, `src/features/onboarding/Triagem.tsx`):
   - um botão "Nenhuma se aplica a mim", que responde "não" a todas de uma vez (a pessoa ainda vê as perguntas);
   - **regra de segurança, vai para a aprovação do Gustavo antes do código:** o "sim" na pergunta de osso e articulação deixa de excluir a região inteira e passa a perguntar "e hoje, dói? de 0 a 10". Daí segue a regra de dor que já existe (`seguranca.dor.escala`), com o aviso dizendo o motivo verdadeiro (por exemplo, "por causa da restrição no ombro"). Mostre a proposta em linguagem simples, com o antes e o depois de uma persona com ombro marcado, e espere o ok. O resto da triagem não muda (o T5 deixou a proposta da seção 9 só registrada).
2. **Uma pergunta de dor só:** hoje a dor aparece na triagem e em "Restrições", com efeitos diferentes. Junte as duas num lugar só, sem perder nenhuma regra de segurança.
3. **Minutos por toque:** 30, 45, 60, 75, 90 e "outro".
4. **Tela de equipamento** (`src/features/onboarding/Inventario.tsx`):
   - os 3 atalhos da seção 3 do T7 ("casa com halteres e elásticos", "condomínio com multifuncional" e "academia completa"). Nenhum vem selecionado. O toque marca o conjunto, e os "às vezes tem" aparecem logo abaixo, desmarcados. Os detalhes que mudam o programa (faixa dos halteres, estações do multifuncional, altura da polia…) continuam sendo perguntados;
   - a esteira sai da lista de treino e continua reconhecida na foto;
   - a pergunta única "qual a menor anilha?" quando houver item de anilha (leg press, hack, smith, panturrilha sentada, barra longa ou hexagonal), gravada em `menorAnilhaKg`. Sem resposta, vale o padrão de 2 kg (opinião, `MENOR_ANILHA_PADRAO_KG`).
5. **Guia com a prescrição da pessoa:** aberto pelo programa ou pelo treino, o guia mostra as séries, as repetições, o RIR e o descanso do programa dela. Saem dos textos de técnica o "RIR 1–2" fixo e o "até 10 kg" do goblet (o campo `rx` do conteúdo é legado).
6. **Textos:** corrigir a boas-vindas e "Meus dados" ("Nada é enviado para servidor", mas a foto vai, sem ser guardada; e "(em breve)"), o README, "última registrada" e "mais repetições × 12".
7. **Testes:**
   - cada regra nova ou revista com teste no Vitest, e o selo e a fonte em `regras.md`;
   - o teste de propriedade "nenhum dia sem exercício principal, e nenhum grupo grande com 0 série sem aviso com o motivo";
   - no navegador: a Ana abre pelo treino o guia do búlgaro e vê as séries, as repetições e o RIR da semana dela (na fase de aprendizado, RIR 3–4), e não os da referência; o cadastro sem nenhuma condição sai com 0 caractere digitado;
   - uma busca no código sem "Nada é enviado para servidor" e sem "(em breve)";
   - os snapshots das 4 personas mudam só com revisão: mostre ao Gustavo o antes e o depois.

Fica para depois:
- o R1b (vários locais, trocas inteligentes, calibração da carga na 1ª série, preferência entre equivalentes);
- o R2 (pausas detectadas sozinhas, "a sua semana", evolução por exercício);
- as animações dos exercícios novos e os desenhos dos 21 equipamentos;
- os cartões de texto dos exercícios antigos sem animação (`docs/backlog.md`).

**Pronto quando:**
- `npm run check` e `npm run test:e2e` passam;
- a mudança da triagem foi aprovada pelo Gustavo antes de entrar;
- as regras novas ou revistas estão em `regras.md`, com selo;
- os snapshots revistos foram aprovados;
- o devlog do marco está escrito.
</tarefa>

<como_trabalhar>
1. **Leia primeiro:**
   - `CLAUDE.md` e o `docs/devlog.md` (entradas R0b e R0c);
   - `docs/PLANO-MVP.md` (seções a e i) e as partes do diagnóstico citadas acima;
   - `docs/pesquisa-v2/06-populacoes-e-seguranca.md` (seções 7 a 9, a triagem) e a seção 3 do `08-equipamentos-v2.md`;
   - `src/domain/triagem/`, `src/features/onboarding/`, `src/features/guia/` e `src/conteudo/`.
2. **Plano antes do código:** mostre ao Gustavo, em linguagem simples, o que muda no cadastro e no programa de cada persona. A mudança de segurança (item 1) só entra com o ok dele.
3. **Determinístico:** sem `Math.random` nem `Date.now` em `src/domain/`.
4. **Estado salvo:** se o formato mudar (por exemplo, a dor num lugar só), crie a versão 5 com migração e teste, sem inventar resposta que a pessoa não deu.
5. **Commits:** pequenos, em pt-BR, no imperativo, num branch criado a partir da `main`. A `main` só depois da aprovação do marco.
6. **Visual para o Gustavo:** a página "Diagnóstico do treino-mvp" (slug `5cae90d2-05e5-438d-a138-2eeca6023832`). Use `get_artifact` antes de editar e acrescente no topo uma seção do R1, com o cadastro antes e depois (prints) e o que mudou em cada persona. Imagens vão como arquivos da página (`publish_files` em modo patch, depois `edit_version`).
7. Nunca use nada de `privado/` em arquivos versionados.
8. Pendências do Gustavo estão em `docs/backlog.md` (a chave da Anthropic para o eval da foto continua lá).

Ao fim do marco:
- atualize o `docs/devlog.md` (o que mudou, imagem ou GIF, rascunho de post);
- diga em poucas linhas, em pt-BR simples, o que mudou no cadastro e no programa de cada persona, o que ficou para o R1b e o que precisa da decisão dele.

Depois pare e espere a revisão.
</como_trabalhar>
