# Plano revisado (proposta de 01/11/2026)

> Este documento parte do diagnóstico (`2026-11-diagnostico.md`) e das respostas do Gustavo de 01/11/2026. Depois de aprovado, ele substitui as seções **a** (critérios de sucesso) e **i** (marcos) de `docs/PLANO-MVP.md`, e a mudança de rumo entra no `devlog.md`. As outras seções do plano continuam valendo: arquitetura, modelos de dados, algoritmo do gerador, fluxo da foto e motor de animação.
>
> Marcações: **[medido]** = medido nesta sessão; **[fonte]** = lido numa fonte (com "não verificado" quando só vi o resumo da busca); **[opinião]** = avaliação minha.

## 1. O que mudou com as suas respostas

| Tema | Antes (plano de 29/10) | Agora |
|---|---|---|
| **Para quem é** | Quem treina com equipamento limitado, com 8 testadores | **O Gustavo.** Família e amigos podem testar, mas o plano não depende deles. |
| **Como medir o sucesso** | Tempo cronometrado com 5 testadores; 8 testadores por 2 semanas | O próprio uso do Gustavo, registrado no app, e o **acompanhamento do progresso** dentro do app (seção 3) |
| **Profissional de Educação Física** | Revisão antes do beta aberto | **Fica de lado.** A triagem com perguntas de acompanhamento também fica, porque depende dessa revisão. |
| **Boneco** | Redesenho no backlog | Testar com o atual **e** fazer um boneco diferente num exercício, para comparar e decidir se continua ou para |
| **Velocidade do cadastro** | Até 5 min | **Até 1 min** para quem não tem nenhuma condição de saúde nem dor, com um caminho de um toque só |
| **Academia completa** | Não existia | Botão "academia completa", como opção |
| **42 animações** | Todas, em 4 lotes | **Depois.** O programa do cenário 1 (Bruno, a versão fictícia do seu) já tem 100% dos exercícios animados **[medido]**. |
| **Limite compartilhado da foto, termos de uso, formulário de opinião** | Antes do beta | Só se o app for aberto para outras pessoas |

## 2. Achados novos desta rodada

1. **O app não percebe quando você para de treinar.**
   - A regra de readaptação (`readaptacao.gatilho`, já aprovada) só é usada no cadastro, nunca durante o uso **[medido]**:
     - menos de 2 semanas sem treinar: segue normal;
     - de 2 a 3 semanas: a 1ª sessão tem 1 repetição a mais de reserva;
     - 3 semanas ou mais: 3 semanas de volta gradual.
   - A "semana do programa" é contada pelo calendário, desde o primeiro treino.
   - **Simulação [medido]:** a Ana treina na 1ª semana, some por um mês e volta. O app a coloca na "semana 6", com **3 séries e RIR 2–3**. Antes de parar, ela fazia 2 séries com RIR 3–4. Ou seja, depois de um mês parada, ela recebe **mais** volume e **mais** esforço, quando a regra do projeto manda metade das séries e carga 10% a 20% menor.
   - A sugestão de carga (`sugerirProgressao`) também não olha as datas: com 2 dias ou com 2 meses de intervalo, a sugestão é a mesma.
   - A função de "semana leve" existe no domínio, mas nenhuma tela a usa **[medido]**.
2. **A chave da Anthropic na Vercel: não consegui confirmar se funciona.**
   - A Vercel negou a esta sessão a leitura das variáveis, até dos nomes.
   - O plano gratuito guarda os registros da função por só 1 hora.
   - A rede desta sessão bloqueia o endereço do app.
   - **Achei outra coisa:** a sua conta tem **3 projetos ligados ao mesmo repositório** **[medido]**:
     - `treino-mvp` (é ele que atende `treino-mvp-sigma.vercel.app`);
     - `treino-mvp-huks` e `treino-mvp-yej6`, criados em 31/10/2026, por volta de 22h20 no horário de Brasília.

     Cada envio ao GitHub gera 3 deploys. Se a chave foi cadastrada num dos dois novos, o app principal não a enxerga. Ver a pergunta 1.

## 3. A sua ideia nova: acompanhamento personalizado

**O que você pediu:** não só marcar o treino como feito, mas saber:
- quantas vezes você treinou;
- se treinou menos do que devia;
- que carga pegar depois de faltar, por exemplo, dois treinos.

**Vale a pena?** Sim. É a ideia que mais combina com o app ser para você **[opinião]**. E a maior parte dela **é aplicar regras que o projeto já aprovou** ao histórico real, o que torna o trabalho barato e seguro.

**Evidência:**
- **Automonitoramento.** Acompanhar o próprio comportamento foi a técnica que mais explicou a diferença entre programas de atividade física e alimentação. Ela funcionou melhor quando combinada com metas e retorno: efeito de 0,42 contra 0,26 **[fonte]** ([Michie et al. 2009, *Health Psychology*, 122 avaliações](https://pubmed.ncbi.nlm.nih.gov/19916637/), não verificado).
- **Faltar a dois treinos.** Pausas curtas quase não tiram força:
  - em homens treinados, 2 semanas sem treinar mantiveram a força e a massa muscular **[fonte]** (Hwang et al. 2017, *J Strength Cond Res*, não verificado);
  - num estudo de Ogasawara e colegas, a força se manteve em 3 semanas de pausa, embora a área do músculo tenha diminuído **[fonte]** ([resumo](https://coachsci.sdsu.edu/csa/vol171/ogasawar.htm), não verificado);
  - numa meta-análise com 103 estudos, a força máxima mudou pouco em até ~4 semanas sem treino **[fonte]** (Bosquet et al. 2013, não verificado).

  Então, para "dois treinos sem fazer", a resposta com evidência é **manter a carga**. A redução entra a partir de ~3 semanas, como a regra do projeto já diz.
- **Volume por semana.** A meta de séries por músculo por semana é a regra com evidência mais forte do projeto (`volume.semanal.alvo`, robusta).

**Em que forma.** Quatro peças, em ordem de valor:
1. **Pausas detectadas sozinhas.** No começo de cada treino, o app olha há quanto tempo foi o último:
   - menos de 2 semanas: "mesma carga";
   - de 2 a 3 semanas: "mesma carga, 1 repetição a mais de reserva hoje";
   - 3 semanas ou mais: começa a volta gradual de 3 semanas, com a carga 10% a 20% abaixo da **última registrada**. Agora essa carga existe.

   A "semana do programa" passa a contar semanas de treino de verdade, não semanas do calendário.
2. **A sua semana.** Uma faixa no topo do programa:
   - "Esta semana: **2 de 4** treinos";
   - séries feitas por músculo contra a meta, por exemplo "costas 6 de 12";
   - quando algo fica abaixo, o que resolve: "o próximo treino (Torso B) cobre costas".
3. **A sua evolução.** Por exercício, a melhor série de cada sessão (carga × repetições) numa linha do tempo, e quantas sessões seguidas sem melhora.
4. **Semana leve sugerida.** A função já existe. Ela aparece quando há 2 ou mais exercícios estagnados, ou 6 semanas sem pausa, sempre como sugestão: o app nunca aplica sozinho, conforme o escopo do MVP.

**Junto com isso:** a **calibração na 1ª série**, do diagnóstico. Na primeira vez de cada exercício, a pessoa faz uma série leve, informa as repetições e a reserva, e o app sugere a carga das próximas.

**O que não entra:** previsão por idade ou peso corporal, gamificação (medalhas, sequências) e lembretes por notificação. As notificações de um app instalado pelo navegador são limitadas, sobretudo no iPhone **[opinião]**; podem voltar depois.

## 4. Critérios de sucesso (substituem a seção a)

1. **Cadastro rápido.** Para quem não tem condição de saúde nem dor, o caminho da abertura até o programa leva **até 1 min**, sem contar o equipamento, e **até 15 toques**. Com o botão "academia completa", o equipamento leva **até 15 s**. Medição: um teste automático conta os toques, e o Gustavo cronometra uma vez no celular.
2. **Programa de referência** (igual ao antigo a.2): 80% ou mais dos exercícios iguais e séries por grupo com diferença de até 2.
3. **Foto do equipamento** (igual ao antigo a.3): recall ≥ 85% e precisão ≥ 90% no gabarito, com o eval rodado pelo Gustavo.
4. **Uso real.** O Gustavo treina **4 semanas** só com o app (sem anotar fora dele), com **10 sessões ou mais** registradas. No fim, ele aponta os 5 maiores incômodos.
5. **Acompanhamento.**
   - Depois de uma pausa simulada de 3 semanas, o próximo treino aplica a volta gradual (teste automático).
   - Uma pausa de menos de 2 semanas mantém a carga (teste automático).
   - A faixa "a sua semana" mostra os treinos feitos e as séries por músculo contra a meta.
6. **Animações.** As 31 aprovadas continuam com 0 pixel de diferença e 0 falha de cinemática. Todo exercício do programa do Gustavo tem animação.
7. **Uso no celular.** Acessibilidade ≥ 90 no Lighthouse; o app se instala no celular do Gustavo; uma sessão inteira feita com uma mão.

## 5. Marcos (substituem a seção i)

### R1. Corrigir o que engana e cadastro em 1 minuto (P–M, ~3 dias)
**Entregáveis:**
1. **Triagem.**
   - **Caminho rápido:** as 9 condições aparecem numa lista curta, com o botão "**Nenhuma se aplica a mim**". Um toque e passa.
   - **Se a pessoa tiver alguma condição:** ela toca em "Tenho alguma" e abrem as perguntas de sim e não, como hoje.
   - O "sim" em articulação deixa de excluir a região inteira e passa à nota de dor de hoje (0 a 10), usando a regra que já existe (`seguranca.dor.escala`).
   - O bloqueio continua para as outras condições. Como não haverá profissional de Educação Física por agora, as regras de segurança não ficam mais brandas; só a tela fica mais rápida.
2. **Dor: uma pergunta só.** "Sente dor em alguma articulação hoje?" Com "Não", passa direto.
3. **Minutos por toque:** 30, 45, 60, 75, 90 e "outro".
4. **Botão "academia completa"**, que marca todas as máquinas e barras. Nada vem marcado sozinho; a pessoa desmarca o que não tiver.
5. **Guia.** Mostra a prescrição do programa da pessoa. O "RIR 1–2" fixo e o "até 10 kg" saem dos textos de técnica.
6. **Textos.** Corrigir a privacidade, o "em breve", o "última registrada", o "mais repetições × 12", o "1 exercícios" e o README.
7. **Aviso de meta.** Diz o motivo verdadeiro (por exemplo, "por causa da restrição no ombro").

**Aceite:**
- E2E do caminho rápido com 15 toques ou menos.
- Teste de propriedade: nenhum dia só com abdominal, e nenhum grupo grande com 0 série sem aviso com o motivo.
- E2E: o guia aberto pelo treino da Ana mostra "2 × 8–15 · RIR 3–4".
- `npm run check` e o e2e verdes.

### R2. Acompanhamento personalizado (M, ~1 semana)
**Entregáveis:**
- As 4 peças da seção 3.
- A calibração na 1ª série.
- As regras novas registradas em `regras.md`, com selo e fonte: "carga a partir de repetições + reserva" e "pausa durante o uso".
- Atualização da pesquisa em `docs/pesquisa/12-decisoes-acompanhamento.md`.

**Aceite:** os testes do critério 5; a calibração aparece depois da 1ª série; a faixa "a sua semana" aparece no programa.

### R3. Uso real (4 semanas, em paralelo com o R4)
**Entregáveis:**
- O Gustavo treina com o app.
- O eval da foto rodado com as fotos reais.
- Uma lista curta dos incômodos.
- Correções pequenas no caminho.

**Aceite:** critério 4 e critério 3 medidos e registrados no devlog.

### R4. Experimento do boneco (P–M, 2 a 3 dias, durante o R3)
**Entregáveis:**
- Um segundo estilo de figura num único exercício (o goblet): membros com volume, tronco e cabeça preenchidos, articulações ainda marcadas.
- Uma tela de comparação lado a lado, só em desenvolvimento.
- O estilo novo fica **fora** das animações aprovadas: a regressão visual das 31 não muda.

**Aceite:** o Gustavo compara os dois no celular e decide entre três caminhos:
- **seguir:** o novo estilo vira o padrão e as 31 passam por nova aprovação;
- **ajustar:** uma nova rodada no mesmo exercício;
- **parar:** fica o boneco atual.

### R5. Decidir com o uso (escopo vem do R3 e do R4)
**Candidatos:**
- o estilo do boneco em todas as animações;
- as animações que faltam, se família e amigos forem usar;
- desenhos novos de equipamento;
- os termos de uso e o limite compartilhado, se o app for aberto.

## 6. Fora por agora
- Foto do corpo e biotipo; idade, peso e sexo no perfil (diagnóstico, seções 5.5 e 5.6).
- Triagem com perguntas de acompanhamento e revisão por profissional de Educação Física (decisão do Gustavo).
- As 42 animações (o seu programa já está completo).
- Formulário de opinião, termos de uso e limite compartilhado da foto: só se o app for aberto a outras pessoas.
- Lacunas do gerador para avançados com academia completa.

## 7. Riscos desta mudança
- **Um usuário só.** O app pode ficar bom para o Gustavo e estranho para os outros. Mitigação: as personas fictícias continuam nos testes, e a família pode testar quando quiser **[opinião]**.
- **"Nenhuma se aplica a mim" com um toque.** A pessoa pode tocar sem ler. Mitigação: as 9 condições ficam visíveis numa lista curta logo acima do botão, e o resultado é o mesmo de hoje (quem tem alguma condição continua passando pelas perguntas). Sem revisão profissional, a regra de segurança não muda; só a tela muda.
- **Pausas detectadas pelo relógio do celular.** Se a data do aparelho estiver errada, a fase sai errada. Mitigação: o app mostra "último treino: há X dias" e deixa a pessoa corrigir.

## 8. Perguntas que ainda ficam (3)
1. **A chave.**
   - **Teste:** abra o app em `treino-mvp-sigma.vercel.app` → Equipamento → digite o código de convite → escolha uma foto.
   - **Se aparecer "ainda não está configurado":** a chave não está no projeto `treino-mvp`.
   - **Os outros dois projetos** (`-huks` e `-yej6`) parecem ter sido criados sem querer.
   - **Recomendo:** confirmar que a chave e os convites estão no `treino-mvp` e apagar os outros dois. Eu não apago nada sem o seu ok.
2. **O "1 minuto" inclui a tela de equipamento?**
   - **Recomendo:** não incluir. Usar 1 minuto para o resto e até 15 s para o equipamento com "academia completa".
   - **Por quê:** quem tem equipamento misto (como a sua academia) precisa marcar item por item uma vez só, ou usar a foto.
3. **Posso já trocar as seções a e i do `PLANO-MVP.md` por este documento e começar o R1?**
   - **Recomendo:** sim, e parar no fim do R1 para a sua revisão, como sempre.
