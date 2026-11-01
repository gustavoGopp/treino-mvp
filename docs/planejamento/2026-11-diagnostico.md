# Diagnóstico e proposta de caminho (01/11/2026)

> Sessão de estudo, sem construir nada. Li o plano, o devlog, o backlog, a pesquisa, as decisões dos marcos M3, M4 e M5, a revisão do M2 e o código de `src/` e `api/`. Rodei os testes e usei o app no servidor local como as personas fictícias Ana, Bruno, Carla e Diego, e também como uma pessoa com pressão alta. Para medir o programa gerado, rodei o gerador direto com scripts temporários, fora do repositório. Nenhum código, teste ou dado do app foi alterado.
>
> **Como ler as marcações:**
> - **[medido]**: número que eu tirei rodando o app, os testes ou o gerador nesta sessão.
> - **[fonte]**: fato lido numa fonte, com link. Seguindo `pesquisa/00-metodo.md`, o que só vi no resumo da busca, sem abrir o original, aparece como **(não verificado)**.
> - **[devlog]**: o projeto registrou isso, mas eu não refiz a medição.
> - **[opinião]**: avaliação minha.

---

## 1. Resumo em 10 linhas

1. O app já faz a jornada inteira: triagem, perfil, equipamento (por desenho ou foto), programa com o porquê, treino com registro e descanso, e sugestão para a próxima vez. A base técnica é sólida: 239 testes unitários e 21 testes no navegador passando, e cobertura de 99,8% nas regras **[medido]**.
2. Até hoje, nenhuma pessoa além do Gustavo usou o app. Dos 6 critérios de sucesso, só 2 estão cumpridos (programa de referência e animações originais). Os 4 que dependem de gente ou de fotos reais ainda não foram medidos.
3. Usando o app, achei **3 problemas que enganam quem treina**, e nenhum teste os pega hoje **[medido]**:
   - quem marca "ombro" na triagem recebe um programa **sem nenhum exercício de peito, costas ou ombros**, e o aviso culpa o equipamento;
   - o guia "Ver como fazer" mostra a prescrição do programa pessoal de referência (ex.: "3 × 8–15 · RIR 1–2"), e não a da pessoa (ex.: "2 × 8–15 · RIR 3–4");
   - alguns textos dizem o contrário do que o app faz (ex.: "nada é enviado para servidor", mas a foto vai).
4. **O que eu faria primeiro:** corrigir esses 3 pontos (1 a 2 dias), depois preparar e rodar um teste com 5 pessoas reais antes de qualquer polimento visual.
5. Das 42 animações que faltam, **14 nunca aparecem em nenhum programa**, e **10 delas cobrem metade dos casos** em que hoje falta animação **[medido]**. Dá para animar menos e cobrir quase tudo.
6. **Peso inicial: vale a pena**, mas na forma de "calibrar na primeira série" (a pessoa faz uma série, informa as repetições e a reserva, e o app ajusta a carga da próxima). Uma fórmula com idade e peso corporal não seria a melhor forma.
7. **Idade, peso corporal e sexo** quase não mudariam o programa de hipertrofia pela evidência que encontrei. Pela LGPD (coletar só o necessário), não devem ser pedidos agora.
8. **Foto do corpo para biotipo: não fazer.** Não achei estudo que mostre que o biotipo deva mudar um programa de hipertrofia, e a foto do corpo pode revelar dado de saúde (sensível).
9. **Boneco mais humano e estética:** vale a pena depois de ouvir os testadores. Mudar o boneco agora obrigaria a refazer a aprovação e a linha de base das 31 animações, sem prova de que a figura atual atrapalha.
10. Proponho 4 marcos curtos:
    - **R1**, "corrigir o que engana";
    - **R2**, "pronto para gente de verdade";
    - **R3**, "beta fechado";
    - **R4**, "decidir com dados" (animações, visual, triagem revisada).

---

## 2. O que existe hoje

### O que funciona bem
- **Gerador confiável e auditável.**
  - **[medido]** 239 testes unitários passam em 2,7 s, e 432 combinações de perfil × equipamento são testadas por propriedade.
  - **[medido]** A cobertura em `src/domain/` é de 99,8% das linhas e 95% dos caminhos.
  - **[devlog]** No caso real, o gerador repetiu 25 de 25 exercícios do programa feito à mão.
- **Treino com o app.**
  - **[medido]** Uma sessão completa da Ana (7 exercícios, 14 séries) levou 48 toques, ou **3,4 toques por série**. A série seguinte vem preenchida, o descanso começa sozinho e o botão "Senti algo" está sempre à vista.
  - **[medido]** Os 21 testes no navegador passam: sessão completa, retomar, trocar, dor > 5, dor no peito, exportar e importar.
- **Programa fácil de ler.** A tela do treino mostra séries × repetições em destaque, a miniatura do guia e o botão "Começar o treino". Os detalhes técnicos ficam recolhidos.
- **Honestidade sobre a evidência.** Cada regra tem um selo, e o app diz quando algo é consenso de treinadores e não ciência.
- **Privacidade no desenho.** Os dados ficam no aparelho, a foto sai sem GPS e um teste no CI barra dado pessoal no repositório.
- **App leve.** **[medido]** O código do app tem 560 KB, ou 157 KB comprimidos.

### O que funciona mal (encontrado usando o app)

| # | Problema | O que eu vi | Gravidade **[opinião]** |
|---|---|---|---|
| 1 | **Triagem apaga regiões inteiras** | **[medido]** Basta responder "sim" à pergunta 6 ("problema em osso, articulação… nos últimos 12 meses") e marcar **ombro** para o programa do Bruno ficar com **peito 0, costas 0 e ombros 0** séries. O "Torso A" vira um único exercício, abdominal na polia. Com **joelho**, o quadríceps vai a 0, para a Ana e para o Bruno. O aviso diz "abaixo da meta com este equipamento e a divisão" e "sem barra fixa nem polia alta", mas o Bruno tem as duas. Já quem informa dor 3 no ombro em "Restrições" recebe o programa normal. Ou seja, quem teve uma tendinite no ano passado e hoje está bem perde o treino de tronco inteiro, e quem sente dor hoje não perde nada. | Alta: é a pessoa honesta que sai prejudicada, e o texto está errado |
| 2 | **Guia com a prescrição de outra pessoa** | **[medido]** A Ana toca em "Ver como fazer" no goblet. O guia mostra "3 × 8–15 · RIR 1–2 · descanso 2 min", o checklist pede "carga para RIR 1–2" e o texto fala em "halteres fixos (até 10 kg)", que é o equipamento do programa de referência. O programa da Ana diz "2 × 8–15 · RIR 3–4 · 1:45". O guia abre ainda nas abas "Torso A / Membros A", que não são a divisão dela. Em 21 dos 32 textos de exercício há um RIR fixo. | Alta: instrução contraditória no meio do treino |
| 3 | **Textos que não batem com o app** | Na boas-vindas: "Nada é enviado para servidor" (a foto é enviada) e "Sugere quando aumentar a carga (em breve)" (já sugere). No Bruno, que nunca registrou nada: "carga 10–20% abaixo da **última registrada**". No resumo, um exercício de peso do corpo aparece como "**mais repetições × 12**". O README ainda diz "Status: M0, fundação". | Média: mina a confiança e, no caso da privacidade, a transparência que a LGPD pede (art. 9º) |
| 4 | **Primeira carga no escuro** | **[medido]** Na primeira vez em cada exercício, o app diz "escolha uma carga que deixe você dentro de 8–15 repetições com 3–4 de reserva", com a lista de cargas vazia. Para quem está começando, essa é a pergunta mais difícil do treino. | Média |
| 5 | **Tela de equipamento longa** | **[medido]** Vazia, ela tem 2,6 alturas de tela. Depois de preenchida, chega a 5,1 alturas no Bruno e 3,6 na Carla. O Bruno precisou de **27 toques** só nessa tela. | Média |
| 6 | **Pouco tempo e metas abaixo** | **[medido]** O "Corpo todo A" do Diego estima 47 min para 45 disponíveis. A Carla (avançada, academia completa, 5 × 75 min, prioridade em pernas) fica com posteriores 8 de 14 e panturrilha 8 de 14 séries, enquanto o dia "Superiores C" usa só 39 dos 75 min. | Baixa: o aviso aparece, e a Carla não é o público principal |
| 7 | **Sem canal com o testador** | Não há formulário de opinião, termos de uso nem forma de saber quantas sessões alguém fez, porque os dados ficam só no aparelho. Sem isso, o critério a.4 não tem como ser medido. | Alta para o beta |

### O que eu medi na jornada (personas fictícias, celular Pixel 7 simulado)

| Persona | Toques até o programa | Caracteres digitados | Palavras nas telas | Tela de equipamento (alturas de tela, depois de preenchida) |
|---|---|---|---|---|
| Ana (halteres e banco) | 28 | 2 | 885 | 3,2 |
| Diego (elásticos e barra) | 26 | 2 | 877 | 2,8 |
| Carla (academia completa) | 48 | 2 | 915 | 3,6 |
| Bruno (prédio com polia) | 55 | 2 | 906 | 5,1 |
| Pessoa com pressão alta | 23 | 2 | 927 | 2,6 |

- A única digitação é o número de minutos por treino. O resto já é por toque, o que é um bom resultado.
- A triagem sozinha soma 10 toques e 178 palavras.
- **[medido]** Para quem tem pressão alta, o "bloqueio" se desfaz com **2 toques**: marcar a caixa "fui avaliado e liberado" e tocar em "Continuar". O bloqueio é, ao mesmo tempo, rígido demais (pega cerca de 28% dos adultos das capitais, Vigitel 2023, citado em `pesquisa/09-decisoes-m3.md`) e fraco demais (2 toques e passou).

**Estimativa de tempo [opinião]** (não é medição; a medição exige pessoas reais): a conta supõe ler de 30% a 50% do texto a ~200 palavras por minuto e de 2 a 3 s por toque.
- **Ana:** cerca de 2,5 a 3,5 min.
- **Bruno:** cerca de 3 a 5 min, mais o tempo de lembrar quais pesos de anilha tem, que é o verdadeiro risco de passar dos 5 min.
- O teste automático "do zero ao programa em menos de 5 minutos" mede um robô (2,4 s). Ele não mede o critério a.1.

### Animações: o que falta de fato
- **[medido]** 31 dos 73 exercícios têm animação (42%).
- **[medido]** Rodei o gerador em 252 programas: 7 conjuntos de equipamento × 3 níveis × 4 opções de dias × 3 durações. Contando cada vez que um exercício aparece num programa, **26% das aparições não têm animação**. A média esconde diferenças grandes:

| Equipamento | Aparições sem animação |
|---|---|
| Ana (halteres e banco) | 9% |
| Bruno (prédio com polia) | 7% |
| Polia simples + halteres | 9% |
| Carla (academia completa) | 21% |
| Halteres + banco regulável + elásticos | 25% |
| Só peso do corpo | 45% |
| **Diego (elásticos e barra fixa)** | **70%** |

- **14 das 42 animações que faltam nunca apareceram** em nenhum dos 252 programas (ex.: supino na polia, remada com barra, cadeira extensora, mesa flexora, afundo para trás). Elas só servem como alternativa, se tanto.
- **10 exercícios cobrem 55%** das aparições sem animação, e **17 cobrem 81%**:
  1. crucifixo com halteres
  2. elevação lateral com elástico
  3. remada com elástico
  4. tríceps com elástico acima da cabeça
  5. desenvolvimento unilateral
  6. afundo com peso do corpo
  7. flexão de joelho com elástico
  8. ponte de glúteo
  9. puxada com elástico
  10. rosca com elástico
- Limite desta medição: os 7 conjuntos de equipamento foram escolhidos por mim. Com outros conjuntos, a ordem muda um pouco, mas o padrão (poucos exercícios concentram a falta) deve se manter **[opinião]**.

---

## 3. Situação de cada critério de sucesso (seção a do plano)

| Critério | Meta | Onde está | O que falta |
|---|---|---|---|
| a.1 Tempo até o programa | ≤ 5 min pelo checklist, ≤ 7 min pela foto, com 5 testadores cronometrados | **Não medido.** Minha estimativa é de 2,5 a 5 min pelo checklist **[opinião]**. A foto depende do convite e da chave em produção. | Cronometrar 5 pessoas reais (protocolo no marco R2) |
| a.2 Coincidência com o programa de referência | ≥ 80% dos exercícios; séries por grupo ±2 | **Cumprido** **[devlog]**: 25/25 e ±2. O teste é privado, e eu não o rodei. | Nada. Manter o teste privado rodando a cada mudança no gerador |
| a.3 Acerto da visão | recall ≥ 85% e precisão ≥ 90% | **Não medido.** O script `eval:visao` está pronto, mas só roda na máquina que tem as fotos reais. | O Gustavo roda o eval (1 a 2 h) e escolhe o modelo |
| a.4 Testadores | 8 pessoas × 2 semanas; ≥ 5 com 6 sessões ou mais | **Não começou.** Também não existe ainda a forma de medir (os dados ficam no aparelho). | Recrutar, criar um canal de opinião e a coleta de dados com consentimento |
| a.5 Animações | 25 originais com 0 pixel de diferença; IK com 0 falhas | **Cumprido** **[devlog]**, no CI. Não rodei a regressão visual aqui (ela leva ~8 min). As 6 novas também estão congeladas. | Atenção: um boneco novo **quebra este critério por definição**, e ele teria de ser reescrito |
| a.6 Lighthouse e uso com uma mão | PWA e Acessibilidade ≥ 90 no celular | **Acessibilidade 100** nas telas **[devlog]**. A parte "PWA" **não existe mais**: o Lighthouse removeu essa categoria para seguir os critérios de instalação do Chrome **[fonte]** ([notas de versão do Lighthouse](https://www.github.com/GoogleChrome/lighthouse/releases); versão 12 não verificada no original). O uso com uma mão nunca foi testado com uma pessoa. | Reescrever: "instalável no Android e no iPhone" + Acessibilidade ≥ 90 + 1 sessão real com uma mão |

**Animações (pedido do Gustavo, não é critério do plano):** 31 de 73. Contando o uso real nos programas, 74% das aparições já têm animação **[medido]**.

---

## 4. Oportunidades

Esforço: **P** = até 2 dias; **M** = 3 a 6 dias; **G** = mais de 1 semana. "Agora" = marcos R1 e R2; "depois" = marco R4 ou mais tarde.

| # | Problema | Evidência (fonte) | Impacto em quem treina | Esforço | Risco | Recomendação |
|---|---|---|---|---|---|---|
| O1 | Triagem "ombro" ou "joelho" zera grupos inteiros, com aviso errado | **[medido]**, ver a seção 2. Pelo `CLAUDE.md`, a restrição deveria tirar o exercício que dói e oferecer alternativa, não tirar a região inteira. | Alto. Afeta exatamente a pessoa cuidadosa. | P | Baixo. É regra do domínio, coberta por testes. | **Fazer agora** (R1) |
| O2 | Guia mostra a prescrição do programa de referência | **[medido]** 21 de 32 textos têm RIR fixo, e o goblet cita "halteres até 10 kg". | Alto. Instrução contraditória no meio do treino. | P | Baixo. Mexe no texto e na tela, não no motor. | **Fazer agora** (R1) |
| O3 | Textos desatualizados ou errados (privacidade, "em breve", "última registrada", "mais repetições × 12", README) | **[medido]**. A LGPD (art. 9º) pede informação clara sobre o tratamento dos dados. A Anthropic informa que apaga entradas e saídas da API em até 30 dias, com exceções **[fonte]** ([central de privacidade](https://privacy.claude.com/en/articles/7996866-how-long-do-you-store-my-organization-s-data), não verificado: a rede bloqueou o site, li só o resumo da busca). | Médio. Afeta a confiança. | P | Nenhum | **Fazer agora** (R1) |
| O4 | Primeira carga no escuro | Iniciantes escolhem cargas de 42% a 57% de 1RM, abaixo do indicado **[fonte]** ([Glass & Stanton 2004](https://pubmed.ncbi.nlm.nih.gov/15142014/), não verificado). Na média de vários estudos, a carga escolhida fica em ~53% de 1RM **[fonte]** (Steele et al. 2022, não verificado). As pessoas erram o RIR em ~1 repetição (`rir.leitura`, já no projeto). | Alto no 1º treino, que é o momento de maior insegurança | P–M | Baixo, se a sugestão for conservadora | **Fazer agora** (R2), como "calibração na 1ª série" |
| O5 | Nenhum teste com pessoas; sem canal de opinião nem medição | Testes com 5 pessoas acham em média ~85% dos problemas de uso, e o recomendado são rodadas pequenas e repetidas **[fonte]** ([NN/g](https://nngroup.com/articles/why-you-only-need-to-test-with-5-users/), não verificado). Numa simulação, a faixa foi de 55% a ~100% (Faulkner 2003, não verificado). | Alto. Decide os critérios a.1 e a.4. | M | Baixo | **Fazer agora** (R2 e R3) |
| O6 | Eval da visão com as fotos reais | Plano, seção g; `pesquisa/11-decisoes-m4.md` | Médio. Decide o modelo e o custo. | P (1–2 h do Gustavo) | Nenhum | **Fazer agora** (R2) |
| O7 | Onboarding mais rápido | **[medido]** 26 a 55 toques; ~900 palavras; a única digitação são os minutos. Formulários: uma coisa por página (`09-decisoes-m3.md`). | Médio | P | Baixo | **Agora, só os cortes baratos** (minutos por toque, uma pergunta de dor só); o resto depois de cronometrar |
| O8 | Termos de uso e aviso de privacidade | Plano, seção j ("termos de uso simples"; "consulta jurídica antes do beta aberto") | Médio | P | Baixo | **Agora** (R2): versão simples para o beta fechado |
| O9 | Animações que faltam | **[medido]** 10 exercícios = 55% da falta; 14 nunca aparecem | Alto para quem treina em casa (Diego: 70% sem animação); baixo para Ana e Bruno | M (10 exercícios); G (42) | Médio: cada uma passa pelo ritual de aprovação | **Agora, só as que os testadores vão usar**; o resto depois, por frequência; as 14 que nunca aparecem, **não fazer** |
| O10 | Triagem com perguntas de acompanhamento | O PAR-Q+ e o ACSM 2015 fazem perguntas de acompanhamento antes de encaminhar (`09-decisoes-m3.md`, seção 8). 27,9% dos adultos das capitais têm hipertensão (Vigitel 2023). | Alto para quem tem pressão controlada | M | **Alto**: é decisão de segurança. Exige revisão de um profissional de Educação Física (CREF) e a licença do PAR-Q+. | **Depois** (R4), com o CREF. No beta fechado, o bloqueio atual se contorna com 2 toques. |
| O11 | Limite da visão compartilhado | O "Vercel KV" não existe mais; a Vercel migrou tudo para Redis (Upstash) no Marketplace **[fonte]** ([docs da Vercel](https://vercel.com/docs/redis)) | Baixo no beta fechado (convite + teto de gasto) | P | Baixo | **Depois**, antes do beta *aberto*; o backlog deve citar só Upstash |
| O12 | Boneco mais humano | Ver a seção 5.1 | Incerto | G | **Alto**: refazer a aprovação e a linha de base de 31 animações; quebra o critério a.5 | **Depois**, se os testadores apontarem dificuldade; antes, um protótipo num exercício só |
| O13 | Estética (desenhos de equipamento, imagens dos exercícios) | **[medido]** A figura ocupa uma parte pequena da miniatura no cartão do treino; os ícones são de linha, coerentes, mas corda, triângulo e estribo se parecem | Baixo a médio | P (miniatura maior) a M (novos desenhos) | Baixo | **Agora, só a miniatura**; desenhos novos depois |
| O14 | Peso corporal, idade e sexo no perfil | Ver a seção 5.5 | Baixo | P | Médio (LGPD: dado que não muda nenhuma regra não deve ser coletado) | **Não fazer agora** |
| O15 | Foto do corpo para biotipo | Ver a seção 5.6 | Nenhum comprovado | G | Alto (dado sensível, custo, promessa sem evidência) | **Não fazer** |
| O16 | Lacunas do gerador para avançados com academia completa | **[medido]** Carla: posteriores 8/14 e panturrilha 8/14 com tempo sobrando | Baixo para o público principal | M | Médio (mexe nos modelos de divisão e nos snapshots) | **Depois** |
| O17 | Verificação das 52 fontes "NÃO VERIFICADO" | `pesquisa/README.md`; a rede do ambiente bloqueia PubMed e as editoras | Baixo para quem treina; alto para a credibilidade | M | Baixo | **Depois**, quando a rede liberar os sites, começando pela pendência 1 (Pelland 2026) |
| O18 | Critérios a.5 e a.6 desatualizados | Seção 3 | Nenhum direto | P | Nenhum | **Agora**, junto com o plano novo |

---

## 5. As ideias do Gustavo, uma a uma

### 5.1 Boneco mais parecido com um humano, sem perder a clareza
- **Vale a pena?** Ainda não sei, e acho que ninguém sabe ainda. Não encontrei estudo que compare boneco de traço com figura realista no aprendizado de um movimento.
  - O mais próximo: um estudo com 64 iniciantes em tênis comparou desenho esquemático, 3D estilizado e vídeo real. As pessoas **preferiram** o vídeo, mas **aprenderam igual** **[fonte]** ([Lucas 2019](https://ir.unimas.my/id/eprint/31603/), não verificado).
  - A meta-análise de Höffler & Leutner (2007) mostra vantagem maior quando a animação é muito realista, como vídeo (d = 0,76). Mas ela compara animação com imagem parada, não boneco com humano **[fonte]** ([Leibniz-IPN](https://www.leibniz-ipn.de/en/research/publications/instructional-animation-versus-static-pictures-a-meta-analysis), não verificado).
- **Em que forma?** **[opinião]** Não um redesenho completo. Primeiro, um protótipo **num único exercício** (o goblet, por exemplo): membros com espessura, tronco e cabeça preenchidos, articulações ainda marcadas. Depois, mostrar o atual e o protótipo lado a lado para os testadores e perguntar qual explica melhor o movimento.
- **Quando?** Depois do beta fechado (R4).
- **Por quê?**
  - Qualquer mudança no motor obriga a refazer a linha de base e a aprovação das 31 animações já prontas. Também quebra o critério "0 pixel".
  - Se feito agora, cada animação nova feita até lá seria refeita. É melhor decidir o estilo **antes** do próximo lote grande de animações, mas **depois** de ouvir quem usa.

### 5.2 Estética do formulário (desenhos dos equipamentos e imagens dos exercícios)
- **Vale a pena?** Em parte.
  - **[medido]** Os ícones de equipamento são simples e coerentes, mas 3 acessórios (corda, triângulo e estribo) ficam quase iguais.
  - **[medido]** A miniatura do exercício no cartão do treino mostra a figura pequena, com muito espaço vazio.
- **Em que forma?** Agora: enquadrar a miniatura na figura (mais zoom). É barato e não mexe no motor, só no recorte. Depois: um ilustrador ou um conjunto de desenhos novo para os equipamentos, se os testadores errarem itens na lista.
- **Quando?** A miniatura no R2; os desenhos no R4.
- **Por quê?** **[opinião]** Estética melhora a primeira impressão, mas o que trava a pessoa hoje são os problemas O1, O2 e O4.

### 5.3 Preencher mais rápido
- **Vale a pena?** Sim, com moderação. O ponto de partida já é bom: só 2 caracteres digitados **[medido]**.
- **Em que forma?**
  1. Minutos por toque: 30, 45, 60, 75, 90 e "outro". Some a única digitação.
  2. Uma pergunta de dor só. Hoje a dor aparece duas vezes (triagem pergunta 6 e "Restrições"), com efeitos diferentes, e isso causa o problema O1.
  3. Um atalho "academia completa" que marca todas as máquinas, para a pessoa desmarcar o que falta. É uma escolha explícita da pessoa, não um padrão pré-marcado, mas toca na decisão 7 do M3 (ver as perguntas).
  4. Na tela de equipamento, mostrar os detalhes (faixa dos halteres, anilhas) **um item por vez**, em vez de tudo aberto.
- **Quando?** Os itens 1 e 2 no R1 e R2. Os itens 3 e 4 depois de cronometrar pessoas reais.
- **Por quê?** O plano já mandava "medir o tempo de cada passo com testadores e cortar o que não muda o programa" (`backlog.md`). Sem medir, eu estaria adivinhando qual passo cansa mais.

### 5.4 Peso inicial sugerido (tempo parado e outros dados)
- **Vale a pena?** **Sim, é a ideia de maior valor da lista** **[opinião]**. A primeira sessão é quando a pessoa mais se sente insegura, e hoje o app diz "escolha uma carga" sem ajuda. Iniciantes tendem a escolher cargas leves demais (~42% a 57% de 1RM) **[fonte]** ([Glass & Stanton 2004](https://pubmed.ncbi.nlm.nih.gov/15142014/), não verificado).
- **Em que forma?** **Calibração na primeira série**, sem dado novo no perfil:
  1. O app sugere começar pela carga mais leve "que pareça fácil".
  2. A pessoa faz a série e informa as repetições e a reserva (o RIR, como já faz hoje).
  3. Com "repetições feitas + reserva", o app estima quantas repetições ela aguentaria e propõe a carga da próxima série, para cair na faixa da meta. Ele usa só as cargas que o inventário permite e erra para baixo, porque as pessoas subestimam a reserva em ~1 repetição (`rir.leitura`).
  - **Para quem volta de pausa:** uma pergunta opcional na 1ª vez de cada exercício, "lembra a carga que usava?". Se a pessoa lembrar, aplica a redução de 10% a 20% que a regra `readaptacao.semana1` já prevê. Isso também conserta o texto "última registrada" do problema 3.
- **Sobre o tempo parado:** ele já entra no programa (readaptação e nível). Numa meta-análise com 103 estudos, a força máxima mudou pouco em até ~4 semanas sem treino e caiu mais depois disso, com perda maior acima dos 65 anos **[fonte]** ([Bosquet et al. 2013](https://pesquisa.bvsalud.org/bvsms/resource/pt/mdl-23347054), não verificado; os números vêm de um resumo secundário). Isso apoia as faixas atuais. Não muda o peso inicial de quem não tem registro.
- **Por que não uma fórmula com peso corporal e idade?** **[opinião]** Prever carga de exercício por idade e peso tem erro grande de uma pessoa para outra (não achei validação para halter, elástico e polia). A própria série de calibração mede a pessoa real em 1 minuto. A regra de cálculo de "repetições + reserva → carga" precisa entrar em `regras.md` com selo próprio. Pelo que vi até aqui, deve ser **consenso**.
- **Quando?** R2, antes do beta.

### 5.5 Peso corporal, idade e dados parecidos no perfil
- **Vale a pena?** Agora, não.
- **O que cada dado mudaria, pela evidência que encontrei:**

| Dado | O que mudaria no programa | Evidência |
|---|---|---|
| **Sexo** | Nada no volume e na intensidade | Numa meta-análise, homens e mulheres tiveram ganho de massa muscular semelhante (diferença de 0,07, não significativa) **[fonte]** ([Roberts et al. 2020](https://pubmed.ncbi.nlm.nih.gov/32218059/), não verificado). Uma análise de 2025 achou ganho absoluto um pouco maior nos homens e ganho relativo igual (Refalo et al. 2025, não verificado). |
| **Idade** | Pouco. Talvez uma progressão mais conservadora e mais atenção à triagem | Idosos respondem bem ao treino de força, e o posicionamento da NSCA de 2019 diz que o treino bem feito é seguro para idosos saudáveis **[fonte]** ([Fragala et al. 2019](https://pubmed.ncbi.nlm.nih.gov/31343601/), não verificado). A perda de força numa pausa é maior acima dos 65 anos (Bosquet 2013). |
| **Peso corporal** | Nada na prescrição | Só serviria para mostrar a carga em kg nos exercícios de peso do corpo, e a escada de dificuldade já resolve isso **[opinião]** |
| **Altura** | Nada | Nenhuma regra do projeto usa altura **[opinião]** |

- **Em que forma, se um dia entrar?** Uma pergunta de idade em faixas ("60 anos ou mais?") **só quando** existir uma regra que use a resposta, com selo e fonte.
- **Por quê não agora?** A LGPD manda coletar só o necessário (art. 6º, III), e o próprio projeto já seguiu esse princípio ao não pedir o nome do profissional na triagem (`09-decisoes-m3.md`, seção 8). Pedir dado que não muda nada também alonga o onboarding.

### 5.6 Foto do corpo para estimar o biotipo e indicar o treino
- **Vale a pena?** **Não.**
- **Evidência de que o biotipo deve mudar o programa:** não encontrei revisão sistemática. O que existe é uma tese de doutorado que associou o biotipo à força inicial e ao ganho em alguns músculos, em pessoas não treinadas **[fonte]** ([tese, Univ. Winchester](https://research.winchester.ac.uk/en/studentTheses/the-influence-of-somatotype-on-acute-and-chronic-responses-to-res/), não verificado). Uma revisão guarda-chuva de 44 revisões sistemáticas achou que o volume de séries é a variável com efeito mais claro na massa muscular. Para várias outras variáveis do treino, ela não achou evidência suficiente de efeito no crescimento **[fonte]** ([Mcleod, Currier, Lowisz & Phillips 2024, *J Sport Health Sci*; PubMed 37385345](https://pubmed.ncbi.nlm.nih.gov/37385345/), não verificado). Ou seja, o que move o resultado é volume e esforço, que o app já controla.
- **O que uma foto conseguiria medir:** o melhor estudo que achei (financiado pela Amazon, 134 adultos) estimou o percentual de gordura por foto com erro médio de ~2,2 pontos em relação ao DXA, o exame de referência **[fonte]** ([npj Digital Medicine 2022](https://pmc.ncbi.nlm.nih.gov/articles/PMC9243018/), não verificado). Mas o percentual de gordura também não muda um programa de hipertrofia.
- **LGPD:**
  - **Pela lei:** dado biométrico é sensível (art. 5º, II).
  - **Na interpretação:** se uma foto comum do corpo é biometria ainda está em discussão. A ANPD abriu consulta sobre dados biométricos, que está na agenda regulatória de 2025–2026. Uma foto que revela uma condição física pode ser dado de saúde **[fonte]** ([gov.br, tomada de subsídios](https://www.gov.br/participamaisbrasil/ts-dados-biometricos); resumos de escritórios de advocacia, não verificado).
  - **Em qualquer leitura:** seria o dado mais sensível do app, enviado a um servidor, que hoje não recebe nada além da foto da academia. Pelo resumo da busca, o fornecedor da IA guarda as entradas por até 30 dias (ver O3).
- **Custo e risco:** alto (uma função nova, consentimento específico, avaliação de impacto, texto jurídico) para um benefício que não consegui encontrar na literatura.
- **Alternativa, se o objetivo for motivação:** "foto de progresso" guardada **só no aparelho**, sem IA e sem envio. Mesmo assim, fica fora do MVP.

### 5.7 Pendências do backlog
- **As 42 animações:** fazer **as que os testadores vão usar** (provavelmente as ~10 mais frequentes da seção 2) antes do beta, e o resto depois, em ordem de frequência. As **14 que nunca aparecem** só entram se o gerador passar a usá-las **[medido]**. Isso troca ~42 ciclos de aprovação por ~10 a 17, com quase a mesma cobertura.
- **Triagem com acompanhamento:** sim, mas no R4, com o CREF e a licença do PAR-Q+. **Antes dela vem o O1**, que é um problema de lógica do próprio app e não depende de licença.
- **Limite compartilhado da visão:** antes do beta aberto, não do fechado. No fechado, convite + teto de gasto no console bastam **[opinião]**. Atualizar o backlog: o caminho agora é Upstash pelo Marketplace da Vercel.
- **Eval da visão com as fotos reais:** já, porque é barato e decide o modelo. Só o Gustavo pode rodar.
- **Beta com testadores:** é o centro da proposta (ver a seção 6).

---

## 6. O que eu faria diferente

1. **Colocar o app nas mãos de 5 pessoas antes de polir.**
   - O projeto construiu 6 marcos sem nenhum usuário além do dono.
   - Os 3 problemas mais graves que achei (O1, O2, O3) são do tipo que um teste automático não pega e uma pessoa pega em 10 minutos.
   - **[opinião]** A ordem certa é: corrigir o que engana, testar com 5 pessoas sentado ao lado (uma rodada de 1 a 2 dias), corrigir e só então abrir o beta de 2 semanas. Isso segue a recomendação de rodadas pequenas e repetidas da NN/g citada em O5.
2. **Testes que olham o programa como uma pessoa olharia.** Os testes de hoje provam que as regras são cumpridas, mas não que o resultado faz sentido. Proponho propriedades novas:
   - "nenhum dia de treino tem só abdominal";
   - "nenhum grupo grande fica com 0 série sem um aviso que diga o motivo verdadeiro";
   - "o guia mostra a prescrição do programa da pessoa".
3. **Medir o beta sem quebrar o "tudo no aparelho".** Opções, da mais simples à mais completa:
   - um formulário de opinião com link no app;
   - um botão "enviar meu resumo de uso" que mostra o que vai ser enviado (só contagens: sessões, séries, dias) e só envia com o toque da pessoa;
   - pedir a exportação em JSON no fim do beta.

   **[opinião]** A meta "5 de 8 com 6 sessões ou mais em 2 semanas" é exigente: em apps de saúde e fitness, só ~3% a 8% das pessoas ainda usam o app no 30º dia **[fonte]** ([Business of Apps](https://businessofapps.com/data/health-fitness-app-benchmarks), [Adjust](https://www.adjust.com/blog/what-makes-a-good-retention-rate/), não verificados). Com amigos convidados, o número tende a ser melhor, mas não deve ser lido como sinal de mercado.
4. **Separar o "guia de técnica" do "programa de referência".** O guia nasceu do programa pessoal, e isso ainda aparece nas abas, nas prescrições e nos textos. Ele deveria ser só técnica, e a prescrição deveria vir sempre do programa da pessoa.
5. **Escolher o público principal e dizer isso no plano.** Os números mostram que o app está muito melhor para o Bruno e a Ana (prédio com halteres e polia: 7% a 9% sem animação) do que para o Diego (casa com elásticos: 70%). **[opinião]** Recrutar os testadores no perfil em que o app já é forte dá um beta mais justo. A outra opção é animar primeiro o lote de elásticos, se o público for casa.

---

## 7. Ordem de prioridade proposta

**Critérios da ordem**, nesta sequência:
1. não enganar quem treina (segurança e confiança);
2. destravar os critérios de sucesso que ainda não foram medidos;
3. custo baixo antes de custo alto;
4. decidir o que é caro (boneco, 42 animações, triagem nova) com dados de pessoas reais, não por suposição.

### R1. Corrigir o que engana (esforço P, ~2 dias)
**Objetivo:** nada no app contradiz o programa da pessoa nem os fatos.

**Entregáveis:**
1. **Triagem.** "Sim" na pergunta osteoarticular deixa de excluir a região inteira. Passa a perguntar "e hoje, dói? de 0 a 10" e segue a regra de dor que já existe (`seguranca.dor.escala`). O texto da pergunta e a pesquisa são atualizados, e a mudança vai para a sua aprovação antes, porque é regra de segurança.
2. **Aviso.** O aviso de meta diz o motivo verdadeiro (por exemplo, "por causa da restrição no ombro").
3. **Guia.** Ao abrir o guia a partir do programa ou do treino, ele mostra a prescrição da pessoa. O "RIR 1–2" fixo e o "até 10 kg" saem dos textos de técnica.
4. **Textos.** Corrigir a boas-vindas (privacidade e "em breve"), o README, "última registrada" e "mais repetições × 12".

**Aceite verificável:**
- Teste de propriedade "nenhum dia sem exercício principal e nenhum grupo grande com 0 série sem aviso com o motivo".
- Teste no navegador: a Ana abre o goblet pelo treino e vê "2 × 8–15 · RIR 3–4".
- Busca no código sem "Nada é enviado para servidor" nem "(em breve)".
- `npm run check` e o e2e verdes.

### R2. Pronto para gente de verdade (esforço M, ~1 semana)
**Objetivo:** uma pessoa nova consegue fazer o 1º treino sem ajuda, e o projeto consegue medir o que acontece.

**Entregáveis:**
1. Calibração da carga na 1ª série (5.4), com a regra registrada em `regras.md`.
2. Minutos por toque e uma pergunta de dor só (5.3).
3. Miniatura do exercício enquadrada na figura (5.2).
4. Termos de uso e aviso de privacidade simples, incluindo o que acontece com a foto.
5. Formulário de opinião com link no app e "enviar resumo de uso" com consentimento, ou outra opção da pergunta 3.
6. Animações das ~10 mais frequentes **nos programas dos testadores recrutados**.
7. Do lado do Gustavo: chave e convites na Vercel, teto de gasto e o **eval da visão** rodado (critério a.3).
8. Plano reescrito com os critérios a.5 e a.6 atualizados.

**Aceite verificável:**
- E2E: na 1ª sessão de um exercício, depois da 1ª série, aparece uma carga sugerida dentro do inventário.
- Onboarding com 0 caractere digitado.
- Eval com recall e precisão registrados no devlog.
- Link de opinião visível no fim do treino.

### R3. Beta fechado (2 a 3 semanas)
**Objetivo:** medir os critérios a.1 e a.4 com pessoas reais.

**Entregáveis:**
1. **Rodada de uso observado com 5 pessoas.** Elas usam o app sozinhas, cronometradas, e alguém anota onde travam. Correção do que aparecer.
2. **Beta de 2 semanas com 8 testadores.**
3. **Relatório no devlog:** tempo de cada passo, sessões por pessoa e os 5 problemas mais citados.

**Aceite verificável:** a.1 medido em 5 pessoas (mediana e pior caso); a.4 medido (quantas pessoas chegaram a 6 sessões ou mais); relatório publicado.

### R4. Decidir com dados (escopo definido pelo R3)
**Objetivo:** gastar o esforço caro onde o beta mostrou que importa.

**Candidatos:**
- Protótipo do boneco num exercício, com teste de preferência e de compreensão.
- As animações restantes por frequência.
- Triagem com perguntas de acompanhamento, revisada por um CREF.
- Desenhos novos dos equipamentos.
- Limite compartilhado da visão (Upstash) antes do beta aberto.
- Lacunas do gerador para avançados.

**Aceite verificável:** cada item entra com o motivo tirado do relatório do R3 e o seu próprio critério de aceite.

---

## 8. O que não fazer agora, e por quê

| Item | Por quê |
|---|---|
| Foto do corpo e biotipo | Não achei evidência de que o biotipo deva mudar o programa; é dado sensível; custo alto (seção 5.6) |
| Peso corporal, idade, sexo e altura no perfil | Nenhuma regra usaria esses dados; a LGPD manda coletar só o necessário (seção 5.5) |
| Redesenho do boneco | Refaria a aprovação e a linha de base de 31 animações e quebraria o critério a.5, sem prova de que a figura atual atrapalha. Primeiro ouvir os testadores (seção 5.1) |
| As 14 animações que nunca aparecem num programa | Esforço sem ninguém que as veja (seção 2) |
| Todas as 42 animações antes do beta | ~17 cobrem 81% da falta; o resto depende do público do beta |
| Triagem nova sem CREF | É regra de segurança. Mudar sem revisão profissional e sem a licença do PAR-Q+ troca um risco por outro. O O1 (lógica interna) vem antes |
| Limite compartilhado da visão no beta fechado | Com convite e teto de gasto, o risco é pequeno; fica para antes do beta aberto |
| Lacunas do gerador para avançados com academia completa | Não é o público principal do "equipamento limitado"; o aviso já aparece |
| Perseguir a nota "PWA" do Lighthouse | A categoria não existe mais nas versões atuais; trocar por "instalável" |

---

## 9. Perguntas para o Gustavo

1. **Quem serão os 8 testadores e onde eles treinam** (casa com elásticos, prédio com halteres, academia completa)?
   - **Recomendo:** maioria em academia de prédio ou casa com halteres, que é onde o app já está mais completo, e 2 ou 3 em casa com elásticos.
   - **Por quê:** isso decide quais ~10 animações fazer no R2.
2. **Você topa testar com o boneco atual e decidir o novo estilo depois do beta?**
   - **Recomendo:** sim.
   - **Por quê:** evita refazer 31 animações duas vezes e deixa a decisão com quem usa.
3. **Como medir o beta: formulário + exportação manual, ou um botão "enviar resumo de uso" (só contagens, com consentimento)?**
   - **Recomendo:** o botão de envio com consentimento, mais o formulário.
   - **Por quê:** a exportação manual depende de a pessoa lembrar, e sem dados o critério a.4 não se mede. O botão envia só números e só com o toque da pessoa.
4. **Você tem acesso a um profissional de Educação Física (CREF) para revisar a triagem e os textos de segurança, e qual o orçamento?**
   - **Recomendo:** fazer a revisão antes do beta aberto. Para o fechado, a correção do O1 basta.
   - **Por quê:** o próprio plano (seção j) já sugeria isso, e a triagem com acompanhamento depende dela.
5. **A chave da API e os convites já estão na Vercel, e você consegue rodar o eval da visão com as fotos reais esta semana?**
   - **Recomendo:** sim, antes do beta.
   - **Por quê:** é a única forma de cumprir o critério a.3 e escolher o modelo mais barato que acerta. Eu não consigo rodar sem as fotos de `privado/`.
6. **A correção da triagem do ombro e do joelho (O1) pode seguir a regra de dor de 0 a 10 que já existe?**
   - **Recomendo:** sim. "Sim" na pergunta 6 leva à nota de dor de hoje; acima de 5 sai o exercício; de 3 a 5 entra a alternativa.
   - **Por quê:** é a regra já aprovada no M0-R e evita zerar o tronco de quem está bem hoje.
7. **Posso criar um atalho "academia completa: marcar todas as máquinas" na tela de equipamento?**
   - **Recomendo:** sim, como um botão que a pessoa toca. Nada vem pré-marcado.
   - **Por quê:** corta ~15 toques de quem tem academia completa. Por ser uma escolha explícita, respeita a decisão 7 do M3 (sem valores pré-preenchidos).
8. **Qual é o público principal do MVP: academia de prédio e casa com halteres, ou também academia completa e casa só com elásticos?**
   - **Recomendo:** academia de prédio e casa com halteres.
   - **Por quê:** é a origem do projeto, onde o gerador e as animações já estão melhores. Dizer isso no plano ajuda a cortar trabalho (O16 e parte das animações).

---

*Hipóteses que assumi por falta de informação:*
- a chave e os convites ainda não estão configurados em produção (o devlog do M4 diz que dependem do Gustavo, e a rede desta sessão bloqueia o site publicado);
- o teste privado do cenário 1 continua passando (`privado/` não está neste ambiente);
- a regressão visual continua verde no CI (não a rodei aqui).

---

## Atualização de 01/11/2026: respostas do Gustavo

O Gustavo respondeu às perguntas:
- **Público:** o público principal é ele mesmo. Família e amigos podem testar, sem que o plano dependa disso.
- **Boneco:** topa testar com o atual e quer um boneco diferente num exercício, para comparar.
- **Profissional de Educação Física:** fica de lado por agora.
- **Triagem:** a correção pode ser feita, com o cadastro em até 1 minuto para quem não tem nenhuma condição.
- **Academia completa:** o botão entra como opção.
- **Ideia nova:** um acompanhamento personalizado do progresso (quantos treinos, se treinou menos do que devia, que carga pegar depois de faltar).

A proposta de plano com essas decisões está em `2026-11-plano-revisado.md`. Ela traz dois achados novos:
- **[medido]** o app não aplica a readaptação quando a pessoa para de treinar durante o uso;
- a chave da Anthropic na Vercel não pôde ser verificada daqui, e há 3 projetos da Vercel ligados ao mesmo repositório.
