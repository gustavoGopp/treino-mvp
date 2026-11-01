# Prompt: pesquisa v2, tema T7

> Para colar no início de uma nova sessão do Claude Code com o repositório `gustavoGopp/treino-mvp`.
> Escrito em 01/11/2026, ao fim da sessão que fez o tema T6 da pesquisa v2.
> Depois que a sessão começar, este arquivo pode ser apagado (o git guarda o histórico).

---

<contexto>
Você vai continuar a **pesquisa v2** do **treino-mvp**, um web app (PWA) em pt-BR que monta um programa de hipertrofia baseado em evidência, só com o equipamento que a pessoa tem, e conduz o treino com um guia animado. O dono é o Gustavo. Ele não é programador: fala de produto e de experiência, e prefere explicações simples e visuais, em pt-BR, sem jargão (quando um termo técnico for inevitável, explique em uma frase).

**Onde o projeto está (01/11/2026)**
- Os marcos M0 a M5 estão prontos e em produção: gerador, cadastro, foto do equipamento, treino com registro e progressão.
- O plano foi reescrito em 01/11: `docs/PLANO-MVP.md`, seções a (critérios) e i (marcos). O critério 4 (aproveitar o equipamento) e os marcos R0b e R0c são o alvo deste tema.
- **Decisões do Gustavo que valem agora:**
  - o público principal é ele mesmo; família e amigos podem testar, mas o plano não depende disso;
  - a base do programa está sendo refeita **sem tomar como certo** o programa pessoal de referência (`referencia/programa-fase-1.md`, histórico). É o marco **P (pesquisa v2)**, em `docs/pesquisa-v2/`, antes de qualquer código;
  - **não há profissional de Educação Física no projeto por agora.** As regras de segurança não mudam sem um profissional;
  - fora por agora: foto do corpo e biotipo, e idade, peso, sexo e altura no perfil;
  - **qualidade do guia:** exercício sem animação aprovada aparece como cartão de texto, nunca com uma animação improvisada (`CLAUDE.md`).

**Pesquisa v2: o que já foi aprovado** (leia os arquivos, não reabra as decisões):
- `README.md`: o porquê, o método e as premissas herdadas.
- `01-divisao-e-frequencia.md`: a divisão é **escolhida pela pessoa** entre opções equivalentes.
- `02-panorama-da-evidencia.md`: os números do app confirmados, com 4 ajustes.
- `03-universo-de-equipamentos.md`: **é o ponto de partida do T7.** ~45 equipamentos (25 hoje no app; paralelas, tornozeleira e smith quase sem uso), os 4 cenários (casa, condomínio, academia de bairro, academia completa), a regra "por capacidade, não por item" e a linha de base: numa academia completa o gerador usa 32 de 60 exercícios, máquinas são 8% dos exercícios, a extensora e a mesa flexora nunca saem.
- `04-exercicios-por-musculo.md` (T3): escolha por **função** (alongado, estável, carga possível), não por equipamento; as regras de vaga; e a lista de exercícios a acrescentar (tríceps acima da cabeça na polia, rosca Scott, panturrilha em pé na máquina, abdução de quadril, hip thrust, agachamento livre profundo, hack, voador).
- `05-montagem-da-sessao.md` (T4): tabela "minutos → exercícios" e a escada de cortes.
- `06-populacoes-e-seguranca.md` (T5): inclui o cartão de **"montagem segura"** (travas, pinos, apoio dos halteres, espaço), aprovado para os exercícios com barra, banco e halteres pesados.
- `07-progressao-e-acompanhamento.md` (T6, aprovado em 01/11/2026). O que importa para o T7: a calibração da carga e a carga da volta de pausa **arredondam para baixo no inventário**. Por isso, cada equipamento novo precisa dizer **como a carga sobe** (kg por placa ou número da placa na torre, anilhas, degraus) para a progressão funcionar.
- `PLANO-DOS-TEMAS.md`: o plano dos temas. **Siga a seção do T7.**

**Nada disso entrou ainda em `docs/pesquisa/regras.md` nem no código.** As mudanças aprovadas entram juntas nos marcos R0b, R0c, R1 e R2, depois da pesquisa.
</contexto>

<objetivo>
Fazer o **tema T7 (equipamentos, segunda versão)**, exatamente como descrito em `docs/pesquisa-v2/PLANO-DOS-TEMAS.md`, com o entregável `docs/pesquisa-v2/08-equipamentos-v2.md`.

Responda às 3 perguntas do plano:
1. **Para cada equipamento novo, quais exercícios do T3 ele permite, e com que prioridade?** Faça uma tabela equipamento → capacidades → exercícios, ligando cada exercício à função do T3 que ele preenche e ao selo de lá. Diga também como a carga sobe em cada equipamento (para a progressão e a calibração do T6).
2. **Que atalhos de cenário oferecer** (academia completa, condomínio com multifuncional, casa com halteres e elásticos)? Liste o conjunto típico de cada um e diga, com o gerador atual, o que cada cenário libera. O botão "academia completa" é do marco R1. Nada vem pré-marcado: o atalho é uma escolha explícita da pessoa (decisão 7 do M3).
3. **O que muda no reconhecimento por foto?** Ids novos no esquema da visão (`src/domain/visao`, `api/vision.ts`), os equipamentos fáceis de confundir (por exemplo hack × leg press, voador × crucifixo na polia, multifuncional × estação de polia) e os exemplos que o eval vai precisar. O eval com as fotos reais roda na máquina do Gustavo (`privado/`): aqui só o plano.

O entregável também traz:
- a **lista final** de equipamentos e de exercícios a acrescentar;
- a **ordem das animações** a fazer, pela frequência estimada nos programas gerados;
- o **custo estimado** de cada animação. Considere o que o motor já desenha (halter, banco, peso do corpo, polia) e o que falta (máquinas, barra, smith). Use o histórico dos lotes em `docs/pesquisa/animacoes/README.md` e no `docs/devlog.md`.

**Pronto quando:** todo equipamento da lista permite pelo menos 1 exercício, e todo exercício proposto tem uma **ficha de técnica com fonte**, no formato de `docs/pesquisa/animacoes/` (uma ficha por exercício, cada afirmação com selo).

O tema termina com:
1. a lista de mudanças propostas para `regras.md` e para os dados (`taxonomia/equipamentos`, `biblioteca/exercicios.json`);
2. o que muda no app (R0b, R0c e R1);
3. o que fica sem resposta;
4. **uma parada para a revisão do Gustavo.**
</objetivo>

<como_trabalhar>
1. **Leia primeiro:** `CLAUDE.md`, `docs/PLANO-MVP.md` (seções a e i), `docs/pesquisa-v2/` inteira (principalmente `03`, `04` e o T7 do `PLANO-DOS-TEMAS.md`), `docs/pesquisa/00-metodo.md`, `docs/pesquisa/regras.md`, `docs/pesquisa/05-equipamento-limitado.md`, `docs/pesquisa/08-tecnica-guia.md` e `docs/pesquisa/animacoes/`. No código, veja `src/domain/taxonomia/`, `src/domain/biblioteca/`, `src/domain/gerador/` (`divisoes.ts` e as capacidades), `src/domain/visao/`, `api/vision.ts` e `src/engine/` (o que o motor já desenha).
2. **Leitura de estudos.** A rede das sessões abre o PubMed. Use `python3 -I scripts/pesquisa/pubmed.py s <termos>` para buscar e `python3 -I scripts/pesquisa/pubmed.py a <PMID…>` para ler o resumo oficial. Dicas:
   - prefira buscas de 3 a 6 termos;
   - se o resumo vier vazio, espere e rode de novo (o PubMed limita pedidos seguidos);
   - o PMC, as editoras e os sites do governo estavam bloqueados nas sessões do T5 e do T6. Não insista: registre a lacuna.

   Para as fichas de técnica, procure estudos de execução (EMG, biomecânica, ensaios por músculo) e diga quando a base é só consenso. **EMG não mede hipertrofia** (`00-metodo.md`).
3. **Siga `docs/pesquisa/00-metodo.md`.** Nada de inventar estudos, autores ou números.
   - Cada fonte tem nível de leitura: **resumo-PubMed** (com PMID), **texto-completo** ou **não verificado**.
   - Confira autores e revista no PubMed antes de citar.
   - O selo vai no número, não no tema.
   - Registre as buscas (termos e data) no fim do arquivo, como no `06` e no `07`.
4. **Marque o que é opinião.** Separe o fato (medido, lido numa fonte) da opinião sua. A lista de equipamentos "comuns" no Brasil não tem fonte oficial (ver `03`): diga isso.
5. **Medições com o código real** (por exemplo, o que cada cenário libera, ou a frequência de cada exercício nos programas das personas): scripts temporários **fora do repositório**. Um jeito que funciona: `npm ci --ignore-scripts`, depois empacotar com `npx esbuild arquivo.ts --bundle --platform=node --format=esm` e rodar com `node`. Não altere código, testes nem dados do app nesta fase. O gerador ainda não tem as vagas por função (isso é do R0b), então a frequência dos exercícios novos é uma **estimativa** pelas regras do T3: diga como ela foi feita.
6. **Visual para o Gustavo.** Ele lê no celular a página de Artifact "Diagnóstico do treino-mvp" (slug `5cae90d2-05e5-438d-a138-2eeca6023832`). Acrescente uma seção do T7 no topo, no mesmo estilo da página, e mude o rótulo da seção do T6 para "aprovado". Use `get_artifact` para pegar a versão atual antes de editar. Ajudam muito: um esboço dos 3 atalhos de cenário na tela de equipamento e a fila das animações com o custo de cada uma.
7. **Commits:** pequenos, em pt-BR, no imperativo. Atualize o status do tema no `docs/pesquisa-v2/README.md`. Esta fase só mexe em documentos, e o Gustavo aprovou levá-los à `main` a cada tema aprovado (antes da aprovação, use um branch). As fichas novas vão em `docs/pesquisa/animacoes/<id>.md`.
8. **Nunca use nada de `privado/`** em arquivos versionados. Esta pasta não existe na nuvem; o tema T8 (o programa do Gustavo) é feito na máquina dele.
9. **Pendências do Gustavo:** estão em `docs/backlog.md` (a chave da Anthropic, os 2 projetos extras na Vercel, o limite compartilhado da foto). Os branches antigos que já estão na `main` podem ser apagados pelo GitHub. Não insista nesses itens; lembre-os só se fizer sentido, por exemplo a chave da Anthropic ao falar do eval da foto.
</como_trabalhar>

<entrega>
Ao fim do tema, diga em poucas linhas, em pt-BR simples:
- o que achou;
- o que muda no app;
- o que precisa da decisão dele.

Depois pare e espere. Quando o T7 for aprovado, proponha o prompt da sessão seguinte. O T8 (o programa do Gustavo) é feito na máquina dele, com `privado/` e depois do R0b. Então a proposta provavelmente é começar os marcos de código (R0b), a não ser que ele prefira outra ordem.
</entrega>
