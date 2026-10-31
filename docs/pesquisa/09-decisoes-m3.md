# Decisões do M3 com base em pesquisa (31/10/2026)

As 8 perguntas do M3 foram respondidas por pesquisa, em vez de escolha pessoal. A busca foi feita na web e só os trechos devolvidos pela busca foram lidos: a rede do ambiente bloqueia a leitura das páginas (nngroup.com, researchgate.net). Cada fonte abaixo tem o mesmo selo de `00-metodo.md`: o que não foi lido no original está marcado como **não verificado**.

Decisão do Gustavo nesta data: **todos os exercícios terão animação**. O cartão de texto passa a ser provisório (ver a seção 3).

---

## 1. Formato do onboarding: uma rota por passo

**Decisão:** uma pergunta (ou um grupo pequeno de perguntas relacionadas) por tela, cada uma com rota própria, indicador "passo 2 de 5" e salvamento a cada passo.

- O GOV.UK Design System e o Service Manual recomendam começar com "uma coisa por página": uma informação, uma decisão ou uma pergunta. A pesquisa do GDS com formulários reais mostrou que as pessoas acharam esse formato mais fácil. O próprio GDS sugere um indicador simples, do tipo "Pergunta 3 de 5". (consenso de prática, várias fontes oficiais)
- A NN/g recomenda assistentes passo a passo para pessoas novatas e processos feitos raramente, como configuração inicial, que é o caso do onboarding. (consenso de prática; trecho lido na busca, artigo não verificado)
- O estudo de caso da HealthCare.gov (Nava) mostra que "uma coisa" costuma ser um pequeno grupo de perguntas relacionadas, não um campo só. Por isso o perfil pode ter 2 ou 3 telas curtas, e não 10.

Fontes: [GOV.UK – Question pages](https://design-system.service.gov.uk/patterns/question-pages), [GOV.UK – Form structure](https://www.gov.uk/service-manual/design/form-structure), [GDS – One thing per page](https://designnotes.blog.gov.uk/2015/07/03/one-thing-per-page/), [GDS 2024 – GOV.UK Forms](https://gds.blog.gov.uk/2024/01/12/how-were-making-it-easier-to-access-government-forms-online/), [Nava – HealthCare.gov](https://www.navapbc.com/uploads/Structuring%20a%20complex%20eligibility%20form%20for%20HealthCare.gov.pdf), [NN/g – Wizards](https://www.nngroup.com/articles/wizards/).

## 2. Classificação de nível: tempo contínuo + pausa + técnica, para baixo na dúvida

**Decisão:** manter a regra `nivel.classificacao` com três perguntas: tempo de treino contínuo (< 6 meses, 6–24 meses, > 2 anos), tempo parado e confiança na técnica básica. "Mais ou menos" conta como "não". A pessoa pode baixar o nível, mas não subir.

- O ACSM (2009) define os níveis pela experiência: iniciante é quem nunca treinou ou parou há vários anos; intermediário tem ~6 meses de treino consistente; avançado tem anos. Os cortes de 6 meses e ~2 anos da regra batem com isso. (consenso; texto completo não verificado)
- Santos Junior et al. (2021, *Strength Cond J*, DOI 10.1519/SSC.0000000000000627) propõem um modelo com vários parâmetros e média de pontuação, mas os pontos de corte não puderam ser lidos (o PDF fica no researchgate.net, bloqueado). Continua como pendência 5 do README.
- Não foi encontrada validação de questionário autodeclarado de nível. Essa ausência reforça a regra "na dúvida, para baixo": errar para baixo custa pouco (a progressão corrige em semanas), errar para cima expõe a pessoa a volume e complexidade maiores.

Fontes: [ACSM 2009 (PubMed)](https://pubmed.ncbi.nlm.nih.gov/19204579/), [Santos Junior et al. 2021](https://www.researchgate.net/profile/Evaldo-Junior-3/publication/349287497_Classification_and_Determination_Model_of_Resistance_Training_Status/links/6029329b299bf1cc26c4894e/Classification-and-Determination-Model-of-Resistance-Training-Status.pdf).

## 3. Exercícios sem animação: animar todos (decisão do Gustavo)

**Decisão:** os 48 exercícios sem animação recebem animação, em lotes revisados, num marco próprio logo depois do M3. Até cada lote ser aprovado, o exercício aparece com o cartão provisório, como manda o `CLAUDE.md` (nada de animação improvisada).

A pesquisa apoia a decisão:
- A meta-análise de Höffler & Leutner (2007; 26 estudos) encontrou vantagem média da animação sobre imagens estáticas (d = 0,37). A vantagem foi **maior para conhecimento procedimental-motor (d = 1,06)**, que é exatamente o caso de aprender um exercício. (robusta para o efeito geral; o subgrupo motor tem menos estudos)
- Num estudo com exercícios de academia (n = 20), quem aprendeu por vídeo executou melhor no teste de retenção do que quem aprendeu por fotos. (um estudo, amostra pequena)
- Wong et al. (2009) confirmaram a vantagem da animação em tarefas com movimento humano. Arguel & Jamet (2009) mostraram que **animação + poucos quadros estáticos** foi melhor que cada um sozinho, o que apoia manter os quadros estáticos com setas do modo `prefers-reduced-motion`.

Fontes: [Höffler & Leutner 2007](https://www.leibniz-ipn.de/en/research/publications/instructional-animation-versus-static-pictures-a-meta-analysis), [Regis – vídeo × fotos em exercícios](https://epublications.regis.edu/facultypubs/1203), [Wong et al. 2009](https://unsworks.unsw.edu.au/entities/publication/6b06f7a0-e27c-4ae1-852a-dd75eb5f9eca), [Arguel & Jamet 2009](https://researchers.mq.edu.au/en/publications/using-video-and-static-pictures-to-improve-learning-of-procedural/).

**Referência técnica para animar:** o *Exercise Technique Manual for Resistance Training*, 4ª ed. (NSCA, 2021), tem 100 exercícios com checklist passo a passo e vídeos de erros comuns. É a melhor fonte única, mas é paga. Sem ela, cada animação usa fontes abertas (ACE, artigos de EMG e de biomecânica), registradas no arquivo do exercício. Vídeos do YouTube servem só como referência visual de movimento, nunca como fonte de regra.

Fonte: [NSCA – Exercise Technique Manual, 4ª ed.](https://us.humankinetics.com/products/exercise-technique-manual-for-resistance-training-4th-edition-epub).

## 4. Trocar exercício pela alternativa: mostrar no M3, trocar no M5

**Decisão:** sem mudança. No M3, as alternativas aparecem com nome e guia; a troca definitiva entra no M5.

- Dar escolha aumenta o prazer e a sensação de autonomia, e possivelmente a adesão. Os resultados de desempenho com e sem escolha costumam ser equivalentes. Mas a evidência direta sobre adesão em musculação é fraca: os dois ensaios mais relevantes (APART, NCT05371587; dor lombar, NCT07745465) ainda não publicaram resultados. (um estudo / consenso)
- Isso indica que a troca **deve existir** (há ganho de autonomia sem perda de resultado), e o lugar natural é o M5, onde ela precisa conversar com o registro de séries e a progressão.

Fontes: [PeerJ 2020 – ordem autosselecionada](https://peerj.com/articles/10361), [NCT05371587](https://clinicaltrials.gov/study/NCT05371587), [NCT07745465](https://cdn.clinicaltrials.gov/large-docs/65/NCT07745465/Prot_SAP_000.pdf).

## 5. Programa salvo ou gerado de novo: salvo, e a mudança só com a escolha da pessoa

**Decisão:** salvar o programa junto com as entradas e o `entradasHash`. Se uma versão nova do gerador produzir outro resultado, o app avisa e oferece "atualizar o programa". **Acréscimos que vieram da pesquisa:**
1. Pedir armazenamento persistente (`navigator.storage.persist()`) na primeira gravação e checar o resultado. Sem isso, o navegador pode apagar o IndexedDB por falta de espaço.
2. No Safari, os dados de sites podem ser apagados depois de 7 dias de uso do Safari sem visitar o site. O app instalado na tela inicial fica de fora dessa regra, mas as fontes são de 2020 e há relatos conflitantes. Por isso: sugerir instalar na tela inicial e lembrar de exportar um backup.

- O WCAG 3.2.5 ("Change on Request") pede que mudanças de contexto só aconteçam a pedido da pessoa. O critério é AAA, mas a ideia vale para o programa: ele não pode mudar sozinho quando o app atualiza.
- O software *local-first* (Ink & Switch, 2019) coloca a pessoa como dona dos dados. A migração de esquema é reconhecida como problema difícil, por isso o esquema é versionado e testado desde o primeiro dia.

Fontes: [web.dev – Persistent storage](https://web.dev/persistent-storage), [Search Engine Land – limite de 7 dias do Safari](https://searchengineland.com/what-safaris-7-day-cap-on-script-writeable-storage-means-for-pwa-developers-332519), [iTnews – WebKit sobre apps na tela inicial](https://www.itnews.com.au/news/apple-cops-flak-for-deleting-local-browser-storage-after-7-days-539833), [W3C – SC 3.2.5](https://www.w3.org/WAI/WCAG22/Understanding/change-on-request), [Ink & Switch – Local-first](https://inkandswitch.com/local-first/), [Edwards et al. 2023 – mudança de esquema](https://ar5iv.labs.arxiv.org/html/2309.11406).

## 6. Painel de ajustes: poucas opções, nenhuma pré-selecionada, "Manter" sempre visível

**Decisão:** o painel no topo do programa mostra no máximo 4 opções (o gerador já limita), cada uma com o que resolve e o que custa. **Nenhuma vem pré-selecionada.** "Manter" fica sempre presente e, ao ser escolhido, recolhe o painel.

- O efeito do padrão é grande: na meta-análise de Jachimowicz et al. (2019; 58 estudos; 73.675 pessoas), a opção pré-selecionada foi escolhida bem mais vezes (d = 0,68). Pré-selecionar um ajuste seria decidir pela pessoa, o que vai contra o princípio "nada muda sem a escolha dela". (robusta)
- A sobrecarga de escolha aumenta com a dificuldade da tarefa e com a **incerteza de preferência** (Chernev et al., 2015; 99 observações). Quem está começando tem muita incerteza, por isso convém poucas opções, cada uma com uma frase clara do que resolve. (moderada; uma reanálise de 2018 aponta efeito inconsistente)

Fontes: [Jachimowicz et al. 2019](https://ideas.repec.org/a/cup/bpubpo/v3y2019i02p159-186_00.html), [Columbia – resumo](https://business.columbia.edu/faculty/research/when-and-why-defaults-influence-decisions-meta-analysis-default-effects), [Chernev et al. 2015](https://www.kellogg.northwestern.edu/academics-research/research/detail/2015/when-product-assortment-leads-to-choice-overload-a-conceptual/), [Frontiers 2022 – crítica](https://www.frontiersin.org/articles/10.3389/fpsyg.2022.800528).

## 7. Detalhes do inventário: sem valor pré-preenchido e **sem placeholder**

**Decisão (mudou):** os campos de atributos (faixa e passo dos halteres, anilhas etc.) não vêm preenchidos. O exemplo deixa de ficar no placeholder e passa para um **texto de ajuda visível acima do campo**, com rótulo sempre visível. Sem atalhos de "academia pronta" no M3.

- A NN/g mostra em testes com usuários que o placeholder costuma atrapalhar mais que ajudar: ele some quando a pessoa digita, pesa na memória, é pulado com mais frequência e prejudica a acessibilidade. A orientação é pôr a informação essencial fora do campo. (consenso de prática; Deque e digital.gov concordam)
- Valor pré-preenchido funciona como padrão (d = 0,68, ver a seção 6): a pessoa tende a aceitar sem conferir, e a faixa dos halteres muda a carga prescrita.

Fontes: [NN/g – Placeholders](https://www.nngroup.com/articles/form-design-placeholders/), [Deque – placeholders](https://www.deque.com/blog/accessible-forms-the-problem-with-placeholders/), [digital.gov – placeholder text](https://digital.gov/2014/11/24/placeholder-text-think-outside-the-box).

## 8. Liberação na triagem: caixa + data, sem coletar o nome do profissional

**Decisão:** caixa "Confirmo que fui avaliado e liberado por um médico ou profissional de Educação Física", com a data gravada no aparelho. Se o único "sim" for o osteoarticular, exige pelo menos uma região. A triagem pode ser refeita em "Meus dados". O app **não** pede o nome nem o registro (CREF/CRM) do profissional.

- LGPD: dado de saúde é sensível (art. 11), e o princípio da necessidade (art. 6º, III) manda coletar só o mínimo para a finalidade. O nome ou o registro do profissional não muda nenhuma decisão do app, então não se justifica. (texto legal; fontes de divulgação, conferir no Planalto)
- **Ponto de atenção para o futuro:** o PAR-Q+ oficial não bloqueia na primeira resposta "sim". Ele faz perguntas de acompanhamento e só encaminha quem responde "sim" a elas. O ACSM (Riebe et al., 2015) tirou a contagem de fatores de risco da triagem justamente para reduzir encaminhamentos desnecessários; pelo critério antigo, 54% dos adultos seriam encaminhados antes de qualquer exercício. No Brasil, 27,9% dos adultos das capitais relatam diagnóstico de hipertensão (Vigitel 2023), e todos eles cairiam no bloqueio da pergunta 1. **A decisão aprovada no M0-R (qualquer "sim" bloqueia) continua valendo no M3**, mas vale reavaliar perguntas de acompanhamento quando a licença do PAR-Q+ for confirmada e houver revisão de um CREF. Registrado no backlog.

Fontes: [HealthLinkBC – PAR-Q+ e ePARmed-X+](https://www.healthlinkbc.ca/living-well/physical-activity/general-information-and-tools/tools-and-resources/par-q-and-eparmed-x), [Warburton et al. 2013 (PMC)](https://pmc.ncbi.nlm.nih.gov/articles/PMC3596208), [Riebe et al. 2015](https://digitalcommons.uri.edu/kinesiology_facpubs/180), [NFPT – resumo do ACSM 2015](https://nfpt.com/assessing-cardiovascular-risk-with-fitness-clients/), [SERPRO – LGPD e dados de saúde](https://serpro.gov.br/lgpd/noticias/2019/paciente-no-comando-lgpd-dados-sensiveis-saude), [IESS – hipertensão, Vigitel 2023](https://iess.org.br/sites/default/files/2024-05/Estudo%20Especial%20Hipertens%C3%A3o.pdf).
