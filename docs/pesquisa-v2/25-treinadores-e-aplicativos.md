# Como bons treinadores montam programas, o que se critica em treinos de aplicativo e o que os aplicativos de referência fazem

> **Tema 25 da pesquisa v2** (sessão "treino para todos", 12 e 13/11/2026). Como os temas 13 a 17, este arquivo é o relatório de um pesquisador de leitura (subagente, modelo mais simples), com briefing fechado e a regra de não inventar; a síntese abaixo e as decisões são da sessão. As afirmações centrais foram conferidas na fonte por um verificador independente, que não viu as conclusões (`26-verificacao-independente.md`). Selos e status de leitura: `docs/pesquisa/00-metodo.md`. "texto-completo" aqui quer dizer que o artigo foi aberto e os números conferidos no texto, muitas vezes por trechos e não de ponta a ponta; cada fonte diz o que foi lido. Nada daqui entrou em `regras.md` ainda: as mudanças propostas estão em `docs/revisoes/treino-para-todos/proposta.md` e esperam a decisão do Gustavo.

## Síntese da sessão (o que muda regra)
- **Tudo aqui é consenso de treinadores ou descrição de produto, nunca evidência de estudo.** Várias fontes são páginas de concorrentes falando de concorrentes, e estão marcadas.
- **"2 séries de quase tudo" não aparece em nenhuma fonte lida:** quem dá número usa 3 a 5 séries nos exercícios principais. Para a Renaissance Periodization, 6 séries por semana por músculo é manutenção.
- **O que os programas bem vistos têm em comum:** exercícios estáveis por semanas, progressão explícita (dupla progressão), poucos exercícios para o iniciante, treino curto feito de pares de exercícios sem músculo em comum.
- **As queixas mais citadas de treino "de máquina":** troca constante de exercícios, falta de lógica entre os dias, exercício estranho no lugar do básico, volume que não combina com a pessoa.
- **Cadastro dos aplicativos:** experiência, lesões ou exercícios a evitar, músculos a enfatizar, estrutura da semana. Não achamos documentação pública de como usam idade, sexo e peso.
- **A lista de verificação de um bom treinador** (25 itens, no fim do arquivo) foi a base de várias medidas do retrato (`scripts/auditoria/cuidados.ts`).

---

Selo de TUDO neste arquivo: **consenso** (prática de treinadores e de apps; nenhum número aqui vem de ensaio). Data da pesquisa: 2026-11-12.

## Aviso sobre o status de leitura (leia antes)
- Usei WebFetch, que devolve um resumo feito por um modelo auxiliar sobre a página, não o HTML bruto. Chamo de **texto-completo (via WebFetch)** quando a página abriu e o resumo trouxe os números/afirmações; **não** li o HTML linha a linha. Os números abaixo são os que o resumo devolveu.
- **NÃO VERIFICADO** = só vi em resultado de busca (WebSearch), ou a página deu 403/404/PDF ilegível. Reddit está bloqueado: r/Fitness e r/bodyweightfitness só foram lidos num espelho (ver `rbwf2024`) ou ficaram sem leitura. Citações de usuários do Reddit vêm de segunda mão (via artigo da Dr. Muscle, concorrente).
- Nada de PubMed aqui: o tema é prática, não literatura.
- Várias críticas a apps vêm de sites de concorrentes (Dr. Muscle, Alpha Progression). Marquei como **[concorrente]**: servem como retrato de queixas, não como medida de qualidade.

---

## 1. Perguntas e respostas

### P1. Estrutura de um dia: quantos exercícios e séries
- **Achados (consenso).**
  - Programa de iniciante em guias abertos: foco nos levantamentos principais + 2–3 exercícios de peso do corpo/isolamento por sessão, ~2 séries cada (Nuckols, `nuckols-guide`, texto-completo via WebFetch, sem data na página). Isso é a única situação em que "2 séries" aparece como padrão nas fontes lidas: como acessório de iniciante, não como regra de todos os exercícios.
  - Fluxo "composto primeiro, isolamento depois", com exemplos como 4 séries de supino + 2 de tríceps (`duquette2024`, 10/09/2024). A página não dá número fixo de exercícios por sessão.
  - 3–8 séries duras por músculo **por treino** bastam para a maioria; ~3 séries por músculo/sessão já dão ganho para iniciante-intermediário, ~8 é o "ótimo médio" citado, e iniciantes respondem entre 2 e 8 (`rp-setincrease2020`, 01/07/2020; página cita pesquisa só em termos gerais, sem referências no texto).
  - Henselmans defende um teto produtivo por sessão de ~9–13 séries por músculo (NÃO VERIFICADO: página deu 403; número vem do resumo da busca, `henselmans-sessao`).
  - Exemplo de treino-curto de 6 exercícios em 3 supersets, 1 série por exercício por rodada, 2–5 rodadas, 20–40 min (`rp-tempo2026`).
  - Exemplo de 2x/semana com 7 exercícios, 3–5 séries nos principais, 1 série de "finalizador" (`dale2025b`): é um programa curto em dias, mas longo em volume por dia. Mostra que "2 dias" não implica "poucas séries".
  - r/bodyweightfitness: 9 exercícios (4 blocos) por sessão, mas todos com 3 séries de 5–8 (ou 8–12 no core), 40–60 min (`rbwf2024`).
- **Princípio.** O que parece "de bom treinador" é concentrar séries onde importa: 1–2 exercícios principais com 3–4 séries e poucos acessórios; muitos exercícios com 2 séries cada vira "de máquina". Quanto menos exercícios, mais séries por exercício.
- **Estrutura por duração** [opinião, derivada das fontes, não publicada por nenhuma delas]: não achei fonte aberta que dê "N exercícios por 30/45/60/90 min". Os pontos de ancoragem lidos: 20–40 min = 6 exercícios em supersets (`rp-tempo2026`); 40–60 min = 9 exercícios de 3 séries (`rbwf2024`). Não proponho tabela como regra.
- **Selo:** consenso. **Regra para o gerador:** limitar nº de exercícios por dia pelo tempo e dar ≥3 séries aos principais; 2 séries só em acessório, em sessão curta ou de alta frequência, nunca em quase tudo.

### P2. Volume semanal por músculo por nível
- **Onde há número aberto e lido:**
  - RP (`rp-landmarks2017`, 04/01/2017, texto-completo via WebFetch): MV ≈ 6 séries/músculo/semana (treinando cada músculo ≥2x/sem); MEV ≈ perto do MV em iniciante e sobe com a experiência; MAV = faixa entre MEV e MRV; MRV = limite de recuperação. O artigo **não** traz tabela por músculo; só exemplos (MEV 12 e MRV 20 numa progressão ilustrativa; MRV 18 de tríceps e 25 de quadríceps no leg press como exemplos). Só séries diretas contam.
  - Consenso de pesquisadores (Schoenfeld, Fisher, Grgic, Haun, Helms e outros): ≈10 séries/músculo/semana como mínimo geral para otimizar hipertrofia (NÃO VERIFICADO: só vi na busca; não abri o documento; `schoenfeld-consenso`). Aliás o próprio projeto já tem a literatura sobre volume em `docs/pesquisa/`; aqui só registro a prática.
  - Helms: faixas "10–20 séries/sem" vêm de resumo de podcast (NÃO VERIFICADO); contagens de ~55 séries/sem num programa iniciante e ~75 no intermediário de 5 dias vêm de blog de terceiros (NÃO VERIFICADO).
  - Henselmans: treina corpo inteiro com ~14 séries/músculo/sem e diz que frequência maior torna o volume mais fácil de recuperar; sugere escolher volume e frequência primeiro e só depois a divisão (NÃO VERIFICADO: busca).
  - Nuckols (`nuckols-guide`): intermediário, cada músculo 2–3x/sem, 4–6 séries por sessão (≈40–70 repetições totais) em acessórios de 6–15 reps.
  - Duquette (`duquette2024`): 3–8 séries duras/músculo/treino; cada músculo 2–4x/sem; o resumo da página contradiz o corpo do texto (3–12 vs 3–8), e a unidade "por treino" é ambígua. Marco como inconsistência da fonte.
- **Onde concordam:** ~10+ séries/semana por músculo como alvo de crescimento; frequência 2x/sem ou mais; volume sobe com experiência; contar só séries diretas (RP) ou frações (Henselmans).
- **Onde discordam:** RP trata 6 séries como manutenção; vários textos tratam ~10 como mínimo de crescimento (não são incompatíveis: manter ≠ crescer). Sobre quanto é demais por sessão: ~8 (RP) vs 9–13 (Henselmans, NÃO VERIFICADO) vs 3–8 (Duquette).
- **Para o gerador (consenso):** sem foco, 6 séries/sem por músculo é nível de manutenção, não de crescimento. Para "ganhar músculo", todo músculo grande deve começar perto de ~10 séries e subir com a experiência; com "grupo de foco", o músculo de foco recebe mais e os demais ficam perto do mínimo. Os números exatos devem vir da revisão de literatura do projeto, não desta nota.

### P3. Escolha e ordem
- **Achados.**
  - Base: um padrão de agachar, um de dobrar o quadril (RDL/terra), empurrar e puxar (supino/desenvolvimento e remada/barra), mais isolamento de bíceps, tríceps, deltoide lateral e panturrilha onde os compostos não bastam (`duquette2024`). Prefira exercícios que carregam o músculo alongado (RDL, agachamento frontal, extensão de tríceps acima da cabeça) (mesma fonte).
  - Ordem: o mais pesado e técnico primeiro, quando o aluno está fresco; compostos antes dos isoladores (`duquette2024`; `dale2025a`: "exercícios mais exigentes primeiro, sem que um atrapalhe o outro").
  - Peso do corpo unilateral e estabilizadores (inverted row, RDL unilateral, prancha) como acessórios de iniciante (`nuckols-guide`).
  - Pareamento sem músculos em comum (empurrar com puxar) em treino curto (`rp-tempo2026`).
  - Pares do r/bodyweightfitness: puxada vertical + agachamento; mergulho + dobradiça de quadril; remada + flexão; tríade de core (anti-extensão, anti-rotação, extensão) (`rbwf2024`).
  - Qualquer regra sobre fadiga de lombar/pegada em sequência, antebraço, trapézio: **não achei** fonte aberta explícita nas leituras; fica como [opinião]: evitar dois exercícios de pegada/lombar pesados seguidos.
- **Princípio de bom treinador:** exercícios comuns e reconhecíveis (a lista acima), não variantes exóticas; "variantes" entram como progressão ou troca por lesão/equipamento, não como padrão. A crítica a escolhas estranhas aparece nos usuários (ver P8).
- **Selo:** consenso. **Regra:** cada padrão (agachar, dobrar quadril, empurrar horizontal/vertical, puxar horizontal/vertical, core) deve ter um exercício "âncora" por equipamento; o gerador escolhe a âncora primeiro e só usa variante exótica se a âncora não existir no equipamento.

### P4. Progressão ao longo das semanas
- **Achados.**
  - Iniciante: adicionar peso quase toda semana enquanto der; mudar para abordagem intermediária quando não der mais sem "forçar repetições" (estimado em 2–6 meses; `nuckols-guide`).
  - Periodização leve para iniciante: começar 3x8 e somar carga a cada sessão até travar, depois 5x5, depois 5x3; ou variar as repetições dentro da semana (8/5/3) (`nuckols-novice`, sem data na página).
  - Platô: reduzir a carga ~10–15% e voltar **somando 1 série** por exercício (4x8, 6x5, 6x3), em vez de só repetir o mesmo esquema com 10% a menos (`nuckols-novice`). Argumento dele: baixo volume deixa o iniciante despreparado para volume maior depois.
  - Dupla progressão: apps de referência usam (Alpha Progression, Boostcamp; ver P10). Barbell Medicine: primeira fase com pouca variação de exercícios, volume baixo, RPE em várias faixas de repetição, 4 semanas e a 4ª se repete; programa atual de 15 semanas, 2 ou 3 dias, deloads embutidos e RPE para escolher a carga (NÃO VERIFICADO: o PDF era imagem ilegível; vem de resultado de busca; `bbm-iniciante`). Orientação de fórum: 2,5–5 kg/sem nos topos de agachamento e supino (NÃO VERIFICADO, fórum).
  - Mesociclo RP: começar perto do MEV e **somar séries semana a semana** conforme recuperação; autorregulação por desempenho, dor muscular e "pump" é melhor que aumento pré-fixado; deload ao fim; RIR cai de ~4 para 0 ao longo do bloco (`rp-setincrease2020`, `rp-landmarks2017`). Regra do artigo de 2017: ambos os indicadores em 1 → +2–3 séries; 2 → +1 série; algum 3 com dor 3–4 → manter; desempenho 4 → deload; deload ≈ volume de manutenção (~6 séries).
  - Blocos de 4 semanas no início, depois 8 e 12 (`nuckols-guide`, para intermediários).
  - Quando trocar exercício: só quando travar ou por lesão/desconforto (`dale2025a`: "revise quando o progresso estancar"; "não troque de programa cedo demais").
- **Princípio:** progressão **visível** (carga ou repetição a cada semana) e volume que muda de forma planejada dentro de um bloco; troca de exercícios é exceção.
- **Selo:** consenso. **Regra:** o gerador deve emitir semana 1..N do bloco (não "um dia repetido"), com a meta de repetições/carga da semana e, para quem não é iniciante, +1 série/semana nos músculos-alvo, terminando em deload semanal programado. **Nota:** isto contradiz o MacroFactor Workouts, que não altera estrutura nem volume sozinho (ver P10); é escolha de desenho, não unanimidade.

### P5. Iniciantes × avançados × mais velhos × pouco equipamento
- **Iniciante:** 3 dias de corpo inteiro (`duquette2024`), ficar ≥3 repetições da falha, 60–80% do máximo, 2–4x/semana por levantamento (`nuckols-guide`).
- **Peso do corpo (r/bodyweightfitness, espelho `rbwf2024`):** a dificuldade se mantém **mudando a progressão do exercício**, não o número de exercícios: 3x5–8 com a variante mais difícil possível, ~1 repetição antes da falha; ao fazer 3x8 com boa técnica, sobe para a próxima variante e volta para 3x5; pausas estáticas progridem até 3x30 s; descanso 90 s (60 s no core); tempo "10X0"; quando as progressões acabam, passa para a rotina intermediária. Alternativas listadas se faltar equipamento; versão com barra para agachamento e RDL. Alavanca, unilateral, tempo, pausa, anéis: **não achei** texto de autor de calistenia lido (só o do r/bwf).
- **Mais velhos:** resultado de busca (NÃO VERIFICADO; as páginas da NSCA deram 403): 2–3 sessões/sem, máquinas pela estabilidade, aumento de carga <5% por vez, repetições mais altas no início, movimento controlado, programa NSCA de 12 semanas (`nsca-idosos`, `strengthlog-idosos`; só resultado de busca).
- **Selo:** consenso. **Regra:** para peso do corpo, o gerador deve ter uma escada de progressões por padrão (ex.: flexão inclinada → flexão → mais difícil) e subir a escada pela regra 3x8 → próximo degrau; avançado sem equipamento não ganha mais exercícios, ganha variante mais difícil.

### P6. Treinos curtos (30 min, 2x/semana)
- Fontes lidas: `rp-tempo2026` (6 exercícios em 3 supersets, compostos ≥80%, 15–20 repetições na primeira série perto da falha, descanso 5–10 s entre os exercícios do par, 2–5 rodadas, 18–25 min; a própria página admite que perde trabalho pesado e estima 80–90% do resultado de programas maiores, sem referência no texto) e `dale2025b` (2 sessões/sem, 7 exercícios, corpo inteiro, compostos, espaçadas 2–3 dias; diz que mais frequência provavelmente rende mais).
- Resultados de busca (NÃO VERIFICADO): "2 séries até a falha uma vez por semana mantêm força" (post de fórum, sem fonte) e "10–20 séries/semana é o ponto doce" (dica de coach).
- **Princípio:** treino curto = só compostos, pareados sem músculos em comum, poucas séries duras; o que se perde é o trabalho pesado e o volume de isoladores.
- **Selo:** consenso. **Regra:** em 30 min, o gerador reduz exercícios (6, em 3 pares agonista-antagonista) em vez de espremer 8 exercícios; **bi-set só para economizar tempo com pares sem músculo em comum**, e não em iniciante sem justificativa (nenhuma fonte lida usa drop set em iniciante; ver P7).

### P7. Erros comuns de programas (lista de treinadores)
- `dale2025a` (11 erros, Patrick Dale, 05/06/2025): sem objetivo claro; sem sobrecarga progressiva planejada; "junk volume" (usar o mínimo que cumpre a meta); frequência errada; escolha ruim de exercícios (base em compostos, isolados como complemento); ordem ruim (o mais exigente primeiro); nunca mudar o programa (revisar quando estanca); mudar cedo demais; ignorar recuperação; pular deload (planejar de antemão); seguir programa de elite cedo demais.
- Freeletics, fórum oficial, jun/2024 (`freeletics-adapt`, paráfrase): após 3 dias seguidos de força de pernas o app não ajustou as sessões seguintes (risco de sobretreino); excluir um grupo muscular virava treino de peso do corpo em vez de com carga; sessões de pernas seguidas com trocas mínimas (agachamento livre, depois frontal); usuário tinha de "fingir" um treino para receber outro; um dia de corrida ou bicicleta remodelava a semana toda. São relatos de usuários, num fórum da própria empresa.
- Nuckols (`nuckols-more`): se o levantador estagnou e não está cansado, a primeira resposta é somar volume, não trocar de programa; vale para força em levantadores experientes (estudo pequeno, só agachamento).
- Resultado de busca (NÃO VERIFICADO): "muitos exercícios para o mesmo músculo = nenhum atacado com intensidade suficiente"; "3 séries pesadas de remada superam 12 séries de variações no cabo a 50%"; 2019 estudo sobre exercícios escolhidos ao acaso (não verificado, não citado).
- Crítica do Dr. Muscle ao Fitbod: troca de exercícios com frequência demais reduz a frequência de cada exercício, atrasa a progressão e empurra para cargas mais leves; cita especialistas recomendando ~2–3 exercícios por grupo muscular (sem nomear estudos) **[concorrente]** (`juneau2025`).
- Zourdos (Stronger by Science, 31/01/2023): uma meta-análise sobre drop sets achou ganhos de hipertrofia e força parecidos com séries tradicionais (só o título/resumo curto de índice; NÃO VERIFICADO além disso). Ou seja, drop set não é "erro" por si só; o erro é usar em iniciante ou por padrão.
- **Selo:** consenso. **Regras:** (a) no máximo 2–3 exercícios por músculo por sessão; (b) nenhuma troca de exercício entre semanas dentro do bloco; (c) deload agendado; (d) bi-set/drop set não entram em iniciante, a menos que o tempo exija e sem músculo em comum.

### P8. O que usuários e treinadores criticam em programas de app/IA
Todos os itens abaixo são anedotas ou opinião; selo consenso (fraco).
- **Fitbod (segunda mão, via `juneau2025` [concorrente]; também `kimola`/lojas só em busca):**
  - "não quero treinar 70 exercícios diferentes por grupo muscular";
  - "quando espero aumento de carga, vem uma série de 15 repetições";
  - "duvidei que houvesse progressão racional";
  - treinos "fáceis demais mesmo no nível avançado" e "pareciam aleatórios";
  - cargas estimadas altas demais (threads citados com títulos como "um pouco agressivo" e "o 1RM de 43 kg está errado");
  - alguém relatou 3 meses sem ganho muscular (anedota).
  - A fonte também diz que Fitbod é bonito e fácil de usar e serve para começar sem objetivo específico.
  - O Fitbod oferece configuração de variabilidade (mais consistente retém ~70–80% dos exercícios de uma semana para outra; balanceado é o padrão), segundo página de concorrente (`ap-vs-fitbod`). Ou seja, a troca constante é um padrão do produto, escolhido, e as críticas são sobre esse padrão.
  - A Alpha Progression diz que Fitbod escolhe por recuperação muscular, não por periodização (`ap-vs-fitbod`, **[concorrente]**).
- **Gravl (via `ap-vs-gravl` [concorrente]):** sessões geradas só para a semana corrente; exercícios mudam mais do que num programa estável; contagem de séries não progride sozinha; "foco" só move o exercício para o começo do treino, sem aumentar frequência.
- **Freeletics (fórum oficial, paráfrase):** em 24/03/2024 um usuário que voltou após 5 anos viu exercícios "totalmente aleatórios", foco quase exclusivo em pernas e abdômen, e não achou como relatar dor para o coach redistribuir (`freeletics-random`, texto-completo via WebFetch); em 30/03/2024 cancelou ao ver 4–5 dias seguidos de agachamentos e abdominais. Uma resposta no mesmo tópico diz que outros reclamam do contrário (muito membro superior) e que o coach só se ajusta depois de algum tempo. Outro resumo de busca (NÃO VERIFICADO): "6 séries de 20 afundos com peso", "sem progressão", "platô entediante". Garett Reid (CSCS), que declara ter sido pago para testar e escreve no site de um concorrente, critica o excesso de HIIT em planos "de força", "programas demais, que estimulam trocar de programa" e rótulos de marketing (`reid2025`).
- **ChatGPT/IA como treinador (resultados de busca, NÃO VERIFICADO salvo `idea2025`):** estimativa de tempo errada (pedido de 30 min que daria >60 min); extensora (isolador de quadríceps) num dia de posteriores/glúteos; plano que "atende ao pedido, não é o ideal"; sem aquecimento/volta à calma; elogia demais a rotina do usuário (bajulação). IDEA Health & Fitness (`idea2025`, Vivian Griggs, 11/08/2025, texto-completo via WebFetch): planos genéricos sem estrutura de séries/repetições, intensidade, nem atenção a lesão; sem supervisão de técnica/fadiga; opacidade; privacidade. NSCA: "pode dar orientação básica para adultos saudáveis que pode ou não atender aos padrões de prescrição da NSCA" (frase de resumo de busca; PDF ilegível; NÃO VERIFICADO).
- **Planilhas e apps da JuggernautAI, Dr. Muscle, Evolve AI, Planfit:** **não achei** críticas específicas legíveis; só descrições de produto. Não invento.
- **Selo:** consenso. **Rótulos de "de máquina" a evitar:** troca de exercícios entre sessões sem motivo; dias sem lógica de grupo muscular (4–5 dias de pernas); progressão que "devolve" 15 repetições onde se espera mais carga; carga inicial agressiva; tempo de treino subestimado; exercício isolado de um músculo no dia de outro grupo.

### P9. O que elogiam
- Estabilidade do programa e progressão clara: a Alpha Progression se descreve assim (meta e carga exatas por série; usa os saltos de carga que a academia tem; exercícios estáveis) (`ap-vs-fitbod`, **[concorrente]**; é autodescrição, não elogio de usuário).
- Interface limpa e facilidade de uso do Fitbod, reconhecidas até pelo crítico `juneau2025`.
- Auto-regulação com feedback (RP: dor, pump, carga de trabalho) e deload programado, descritas pela própria RP e por resumos de busca (NÃO VERIFICADO para o gatilho exato do deload).
- Para o MacroFactor Workouts, a ajuda oficial diz que os ajustes de carga são "nunca punitivos" e se baseiam no que o usuário registrou (`mf-progressao`).
- **Não achei** elogios independentes e legíveis de "praticantes sérios" a algum app. O critério "o que faz um app ser bom" fica registrado só pelo que os apps dizem de si e pelo que os críticos cobram. **[opinião]**: os critérios que se repetem são exercício estável, progressão previsível, volume ajustável e respeito ao equipamento.

### P10. O que cada app de referência faz (só o que é público e o que consegui ler)
| App | Cadastro (o que pergunta) | Volume | Exercícios | Progressão | Deload | Status |
|---|---|---|---|---|---|---|
| **MacroFactor Workouts** | objetivo; experiência (define volume e intensidade iniciais); dias/semana e minutos por sessão; equipamento (perfil da academia); exercícios excluídos; divisão (corpo inteiro, superior/inferior); "áreas de ênfase" (5 pontos para distribuir) e "desenfatizar" (até 5); incluir deload (sim/não) (`mf-gera`, `mf-smart`) | experiência define ponto de partida; a estrutura **não muda sozinha** (`mf-atualiza`) | gerados por regras, "não IA generativa" (busca); o app mostra músculos-alvo; dá para trocar | recomendação por peso e repetições registrados, RIR-alvo, desempenho vs. esperado e histórico; se falhou, sugere carga um pouco menor (`mf-progressao`) | opção no cadastro; comportamento detalhado não descrito | texto-completo via WebFetch |
| **Fitbod** | objetivo, experiência, equipamento, divisão (PPL, superior/inferior, corpo inteiro), tempo, preferências, histórico (via `ap-vs-fitbod`, concorrente) | escolhe por recuperação muscular (0–100%; abaixo de 50% = "cansado" em blog da empresa); acessórios limitados a 1–2 exercícios por treino; tende a favorecer exercícios já registrados; só equipamento selecionado (busca) | >1.500 exercícios; variabilidade ajustável | sugere séries/repetições/carga e ajusta por registros e RIR opcional; "exercícios de foco" progridem em ciclos de 4 semanas (concorrente) | não achei | **NÃO VERIFICADO** (páginas de ajuda deram 403; só busca e página de concorrente) |
| **Alpha Progression** | objetivo, experiência, equipamento, frequência, duração, prioridades musculares opcionais (busca e concorrente) | muda séries ao longo do mesociclo; prioridades afetam volume semanal e distribuição do tempo (autodescrição) | 795 exercícios curados, com avaliação para hipertrofia (estabilidade, amplitude); estáveis até você trocar | dupla progressão; meta de carga e repetições por série; RIR opcional, de 3 na semana 1 a 0 na 4 num exemplo do glossário | deload com carga muito mais leve após o bloco | **NÃO VERIFICADO** em página própria (só busca e página de comparação); as descrições vêm do próprio fornecedor |
| **RP Hypertrophy** | modelos prontos (>45) ou mesociclo próprio (busca) | marcos MV/MEV/MAV/MRV; feedback de dor, pump, dor articular e carga de trabalho recalcula as semanas seguintes | modelos por grupo; troca na hora | recalcula a cada sessão com o feedback | deload no fim do mesociclo (~1 semana a ~50% do volume em resumo de terceiro; gatilho exato não confirmado) | **NÃO VERIFICADO** (pá­gina oficial redirecionou; só busca e `rp-landmarks2017`/`rp-setincrease2020` lidos) |
| **Boostcamp** | (Pro) questionário de objetivo, experiência, equipamento, foco, lesões, dias (busca) | segue o programa escolhido | biblioteca de >130 programas de treinadores (incl. Wendler, Helms) | Pro: linear para séries fixas, dupla progressão para faixas de repetições | conforme o programa | **NÃO VERIFICADO** (só busca) |
| **JuggernautAI** | busca cita idade, sexo, experiência, recuperação, histórico de cargas, medidas, objetivo e data de competição | não detalhado | powerlifting/powerbuilding | RPE/RIR e feedback em tempo real; ajuda oficial tem seção "tudo sobre RPE e RIR" mas não consegui ler | não achei | **NÃO VERIFICADO**; o review do GarageGymReviews deu 404 |
| **Caliber** | experiência, frequência, onde treina, duração, obstáculos (lesão) (análise de UX, busca) | não achei | "Workout Wizard" gratuito; planos prontos; coach humano pago | não achei | não achei | **NÃO VERIFICADO** |
| **Freeletics** | não consegui ler o cadastro | não achei | "Coach" gera sessões; ver críticas em P8 | adaptação por feedback (relatos mistos) | não achei | **NÃO VERIFICADO** |
| **Nike Training Club** | teardown de 2020: não pergunta objetivo, só agenda; planos por equipamento (básico/completo/sem) (busca); a Nike diz que os planos foram substituídos por "NTC Programmes" | não achei | treinos fixos | sem evidência de adaptação | não achei | **NÃO VERIFICADO** |
| **Hevy/Strong** | não geram; bibliotecas/rotinas | – | – | – | – | **não achei** documentação lida |
| **MFIT (Brasil)** | é ferramenta do profissional: anamnese, avaliação, prescrição; **não achei** perguntas nem fluxo de montagem automática | – | – | – | – | **NÃO VERIFICADO**, só loja de apps |
| **Smart Fit app, Treino Mestre** | – | – | – | – | – | **não achei** documentação |

### P11. Síntese
**10 decisões de desenho que os melhores apps e treinadores têm em comum (consenso; pela leitura acima):**
1. Programa **estável**: os mesmos exercícios por várias semanas (Alpha Progression e Barbell Medicine; o Fitbod/Gravl só como opção "mais consistente").
2. Progressão **explícita e previsível** por exercício: dupla progressão ou linear (Boostcamp, Alpha, MacroFactor; `nuckols-novice`).
3. Volume que **muda dentro do bloco** (+1 série/semana perto do MEV; RP) com **deload no fim** (RP, Alpha, Barbell Medicine; MacroFactor deixa opção).
4. Autorregulação por **RIR/RPE** (MacroFactor, Alpha, Barbell Medicine) e carga que **nunca pune** (MacroFactor).
5. Poucos exercícios, **âncoras** de cada padrão primeiro; isolamento depois (Duquette, Nuckols, Dale).
6. Foco muscular como **entrada explícita** (MacroFactor: ênfase e desenfatizar; Alpha: prioridades): o foco muda volume **e** frequência, não só a ordem (crítica ao Gravl, `ap-vs-gravl`).
7. **Equipamento** como filtro duro; só sugerir o que o usuário tem (Fitbod, MacroFactor, Alpha).
8. **Exclusões** do usuário respeitadas (MacroFactor).
9. Tempo da sessão como **restrição** (todos perguntam duração); em sessão curta, compostos e pares sem músculo em comum (`rp-tempo2026`).
10. Biblioteca **curada**, não grande: Alpha tem 795 exercícios com avaliação para hipertrofia; Fitbod tem >1.500 e é criticado por escolhas aleatórias [concorrente]. Para peso do corpo, escada de progressões (`rbwf2024`).

**5 perguntas de cadastro mais comuns que o nosso app (pelo briefing) não faz, e o que cada app diz fazer com elas:**
1. **Experiência/anos de treino**: MacroFactor usa para definir volume e intensidade iniciais; Alpha, Caliber, Boostcamp e Fitbod também perguntam. (Se o nosso app já pergunta experiência, desconsidere; não conferi o código.)
2. **Exercícios a excluir / lesões**: MacroFactor tira os exercícios do programa; Boostcamp e Caliber perguntam lesões/obstáculos.
3. **Músculos a enfatizar e a desenfatizar**: MacroFactor (5 pontos de foco, até 5 a desenfatizar), Alpha (prioridades), Fitbod/Gravl (foco só move a ordem).
4. **Estrutura preferida (corpo inteiro vs. superior/inferior) e se quer deload**: MacroFactor pergunta os dois.
5. **Idade, sexo e peso**: **não achei** documentação pública, entre os apps lidos, de como usam isso. Só a busca cita que JuggernautAI usa idade, sexo, experiência e recuperação (NÃO VERIFICADO). Não há base nas fontes lidas para criar regra com idade/sexo/peso; fica como lacuna. [opinião]: idade entra no gerador como segurança/progressão (mais velhos), não como regra de volume.

### Lista de verificação de um bom treinador (consenso de treinadores; cada item é checável num programa gerado)
1. Nenhum exercício aparece com menos de 3 séries nos 1–2 exercícios principais do dia (exceção: sessão curta/acessório). — `rp-setincrease2020`, `nuckols-guide`
2. Séries por músculo por sessão ficam entre ~3 e ~8 (≤ ~13 como teto absoluto). — `rp-setincrease2020`, `duquette2024`, `henselmans-sessao` (NÃO VERIFICADO)
3. Cada músculo grande recebe ≥10 séries diretas/semana no objetivo de ganhar músculo; ≥6 só no objetivo de manter. — `rp-landmarks2017`, `schoenfeld-consenso` (NÃO VERIFICADO)
4. Cada músculo é treinado ≥2x/semana. — `rp-landmarks2017`, `duquette2024`, `nuckols-guide`
5. Máximo de 2–3 exercícios por músculo por sessão. — `juneau2025` [concorrente], `nuckols-guide`
6. Há um exercício composto "âncora" para cada padrão: agachar, dobrar o quadril, empurrar, puxar. — `duquette2024`, `rbwf2024`
7. Compostos vêm antes dos isoladores; o mais exigente/técnico vem primeiro. — `duquette2024`, `dale2025a`
8. Empurrar e puxar têm séries semanais equilibradas (razão ~1:1). — `rbwf2024` (pares), `dale2025a` [razão numérica: opinião]
9. Quadríceps e posteriores/glúteo têm cada um pelo menos um exercício por semana. — `rbwf2024` (agachar + dobrar), `dale2025b` (agachar + curl de perna)
10. Existe trabalho de core (anti-extensão/rotação) e, quando há equipamento, de panturrilha. — `rbwf2024`, `dale2025b`
11. Nenhum exercício isolador de um músculo no dia de outro grupo (ex.: extensora em dia de posteriores). — `techradar-chatgpt` (NÃO VERIFICADO; só busca)
12. Os exercícios não mudam entre as semanas de um bloco; troca só por lesão/estagnação. — `dale2025a`, `juneau2025` [concorrente], `ap-vs-fitbod` [concorrente]
13. Cada semana do bloco tem uma meta explícita (carga/repetições) e a seguinte é um pouco maior. — `nuckols-novice`, `rbwf2024`, `mf-progressao`
14. Quem não é iniciante tem volume que sobe ~1 série/semana por músculo e um deload ao fim do bloco. — `rp-setincrease2020`, `rp-landmarks2017`
15. Iniciante: ≥3 repetições de reserva nos principais, 60–80% do máximo, corpo inteiro 2–3x/semana. — `nuckols-guide`, `duquette2024`
16. A faixa de repetições é 6–15 nos acessórios e 5–8 (ou 8–12) nos principais; 15–20 só em formato de treino curto. — `nuckols-guide`, `rbwf2024`, `rp-tempo2026`
17. Bi-set/superset só entre exercícios sem músculos em comum e só quando o tempo exige; drop set não aparece em iniciante. — `rp-tempo2026`; [drop set em iniciante: opinião, nenhuma fonte lida recomenda]
18. Sessão de 30 min tem ≤6–7 exercícios, compostos ≥80%. — `rp-tempo2026`
19. A duração estimada (séries × tempo + descansos) não passa do tempo declarado. — `techradar-chatgpt` (NÃO VERIFICADO)
20. O plano usa só o equipamento declarado e respeita as exclusões. — `mf-gera`, `ap-vs-fitbod`
21. Quem declara "foco" recebe mais séries **e** mais frequência nesse músculo, não só a ordem. — `ap-vs-gravl` [concorrente], `mf-smart`
22. Peso do corpo: cada padrão tem escada de progressões e a regra de subida (3x8 → próxima variante). — `rbwf2024`
23. Mais velhos: aumento de carga <5% por vez, máquinas/estáveis no início, 2–3 sessões/semana. — `nsca-idosos`, `strengthlog-idosos` (NÃO VERIFICADO; só busca)
24. Dia de treino inclui aquecimento (5–10 min) e a sugestão de carga inicial não é agressiva (carga conservadora na 1ª semana). — `rbwf2024`, `juneau2025` [concorrente]
25. Nenhum dia concentra 4–5 sessões seguidas no mesmo grupo (pernas/abdômen). — `freeletics-random`

---

## 2. Onde as fontes discordam
- **Quanto volume por sessão:** RP ~3 (ganho) a ~8 (ótimo médio) por músculo; Duquette 3–8 (e o resumo da página diz 3–12); Henselmans 9–13 (NÃO VERIFICADO). Nenhum dos lados vem de ensaio nestas leituras.
- **Volume que muda sozinho vs. estrutura fixa:** RP/Alpha somam séries e fazem deload; MacroFactor mantém estrutura e volume fixos até o usuário editar (`mf-atualiza`). Nuckols (iniciante) prefere somar uma série ao travar, em vez de recuar só carga.
- **Variedade vs. consistência:** Fitbod/Gravl tratam variação como característica (e oferecem "mais consistente"); Alpha e treinadores como Dale/Nuckols pregam estabilidade. As críticas à variação vêm principalmente de concorrentes.
- **Treino curto:** RP mostra supersets de 1 série e 20–40 min como "80–90% do resultado" (sem referência); Dale mostra 2 sessões de 7 exercícios com 3–5 séries (muito mais volume). Mesmo rótulo ("2x/semana"), desenhos opostos.
- **Periodização:** Nuckols diz que importa pouco para hipertrofia e serve para variar; RP e Barbell Medicine a usam como estrutura central.
- **Pedido do dono vs. fontes:** nenhuma fonte lida recomenda 2 séries em quase todos os exercícios; todas que dão número de séries por exercício vão de 3 a 5 nos principais.

## 3. O que esta pesquisa NÃO sabe
- Nenhum número de exercícios por sessão por duração (30/45/60/90) em fonte aberta lida.
- As tabelas de volume por músculo por nível (MEV/MAV/MRV) da RP, de Helms, de Nippard e de Schoenfeld: não li as originais; a página da RP lida não traz tabela por músculo.
- r/Fitness wiki: bloqueado (Reddit); não li. Nippard, Barbell Medicine (PDF ilegível), NSCA (403) e Henselmans (403): sem leitura direta.
- Regras de fadiga de lombar/pegada em sequência, antebraço, trapézio: nada lido.
- Como Fitbod, Alpha Progression, RP, Boostcamp, JuggernautAI, Caliber, Freeletics, NTC, Hevy/Strong, MFIT, Smart Fit e Treino Mestre decidem volume e deload: sem página oficial lida (exceto MacroFactor). Cadastro: idem.
- Críticas independentes (não de concorrente) a JuggernautAI, Planfit, Evolve AI: não achei.
- Frequência real de queixas: os relatos são anedotas; não há dado de proporção.
- Para calistenia avançada (alavanca, unilateral, anéis, tempo): só a rotina do r/bwf.

---

## 4. Fontes
Formato: chave — título, autor/organização, data, URL, status (acesso 2026-11-12). Sem PMID/DOI (páginas da web).
- `rp-landmarks2017` — "Training Volume Landmarks for Muscle Growth". RP Strength blog (sem autor na página; rodapé liga ao perfil de Mike Israetel). 04/01/2017. https://rpstrength.com/blogs/articles/training-volume-landmarks-muscle-growth — **status:** texto-completo via WebFetch (lido em 2026-11-12 em rpstrength.com; conferi MV ≈ 6 séries/sem, exemplos 12→20 séries, regras de +1/+2–3 séries, deload ≈ MV) — conferido em 2026-11-12
- `rp-setincrease2020` — "In Defense of Set Increases Within the Hypertrophy Mesocycle". RP Strength (cita James Krieger como defensor da abordagem). 01/07/2020. https://rpstrength.com/blogs/articles/in-defense-of-set-increases-within-the-hypertrophy-mesocycle — **status:** texto-completo via WebFetch (lido em 2026-11-12; conferi ~3 a ~8 séries por músculo/sessão, 2–8 em iniciantes, autorregulação por desempenho/dor/pump; página sem referências específicas) — conferido em 2026-11-12
- `rp-tempo2026` — "Time-Efficient Workouts: Science-Backed 20-Minute Plan". RP Strength (sem autor na página). 24/03/2026. https://rpstrength.com/blogs/video-guides/time-efficient-workouts-science-backed-20-minute-plan — **status:** texto-completo via WebFetch (lido em 2026-11-12; conferi 6 exercícios em 3 supersets, 2–5 rodadas, 18–25 min, "80–90%" sem referência) — conferido em 2026-11-12
- `nuckols-guide` — "The Complete Strength Training Guide". Nuckols G. Stronger by Science (sem data na página). https://www.strongerbyscience.com/complete-strength-training-guide/ — **status:** texto-completo via WebFetch (lido em 2026-11-12; conferi 2–3 exercícios de peso do corpo/isolamento ~2 séries para iniciante, 4–6 séries/sessão em acessórios intermediários, blocos 4→8→12 semanas) — conferido em 2026-11-12
- `nuckols-novice` — "Two Easy Ways to Make Your Novice Strength Training Program More Effective". Nuckols G. Stronger by Science (sem data). https://www.strongerbyscience.com/making-your-novice-strength-training-routine-more-effective-two-quick-tips/ — **status:** texto-completo via WebFetch (lido em 2026-11-12; conferi 3x8→5x5→5x3, plateau: deload 10–15% e +1 série) — conferido em 2026-11-12
- `duquette2024` — "The Hypertrophy Training Guide: How to Lift for Muscle Size". Duquette S, Walker-Ng M. Outlift. 10/09/2024. https://outlift.com/hypertrophy-training-guide/ — **status:** texto-completo via WebFetch (lido em 2026-11-12; conferi 3–8 séries/músculo/treino; resumo da página diz 3–12, inconsistente; 3 dias de corpo inteiro para iniciante) — conferido em 2026-11-12
- `dale2025a` — "11 Workout Programming Mistakes Everyone Makes". Dale P. FitnessVolt. 05/06/2025. https://fitnessvolt.com/workout-programming-mistakes/ — **status:** texto-completo via WebFetch (lido em 2026-11-12; conferi os 11 erros) — conferido em 2026-11-12
- `dale2025b` — "The Minimalist Muscle Plan: A Two-Workouts-a-Week Program". Dale P. FitnessVolt. 08/01/2025. https://fitnessvolt.com/two-workouts-a-week-program/ — **status:** texto-completo via WebFetch (lido em 2026-11-12; conferi 7 exercícios/sessão, 2 sessões/sem) — conferido em 2026-11-12
- `rbwf2024` — "Recommended Routine" (r/bodyweightfitness wiki), espelho https://redditbwf.github.io/wiki/recommended_routine.html (original em reddit.com, bloqueado). Autoria coletiva da comunidade; data da versão não conferida. — **status:** texto-completo via WebFetch **no espelho** (lido em 2026-11-12; conferi 3x/sem, 9 exercícios em 4 blocos, 3x5–8, regra 3x8→próxima progressão, tempo 10X0); a identidade com o original não foi conferida — conferido em 2026-11-12
- `mf-gera` — "What Information Does MacroFactor Workouts Use to Generate My Program?". MacroFactor (ajuda). https://help.macrofactorapp.com/en/articles/370-what-information-does-macrofactor-workouts-use-to-generate-my-program — **status:** texto-completo via WebFetch (lido em 2026-11-12; 6 entradas de cadastro) — conferido em 2026-11-12
- `mf-smart` — "Create a New Program via Smart Generation". MacroFactor (ajuda). https://help.macrofactorapp.com/en/articles/285-create-a-new-program-via-smart-generation — **status:** texto-completo via WebFetch (lido em 2026-11-12; lista de 10 perguntas; não explica como escolhe exercícios nem volume) — conferido em 2026-11-12
- `mf-progressao` — "Why does the app sometimes recommend lowering weight or reps?". MacroFactor (ajuda). https://help.macrofactorapp.com/en/articles/373-why-does-the-app-sometimes-recommend-lowering-weight-or-reps — **status:** texto-completo via WebFetch (lido em 2026-11-12; 4 entradas da recomendação) — conferido em 2026-11-12
- `mf-atualiza` — "How often does my program update?". MacroFactor (ajuda). https://help.macrofactorapp.com/en/articles/369-how-often-does-my-program-update — **status:** texto-completo via WebFetch (lido em 2026-11-12; estrutura não muda sozinha; nada sobre deload) — conferido em 2026-11-12
- `juneau2025` — "Fitbod Review 2024 by Independent Expert". Juneau C (dono do Dr. Muscle, concorrente). Atualizado 26/04/2025. https://dr-muscle.com/fitbod-app-review-alternative/ — **status:** texto-completo via WebFetch (lido em 2026-11-12; citações de usuários do Reddit de segunda mão) — conferido em 2026-11-12 **[concorrente]**
- `reid2025` — "Freeletics App Review and Critique: 5 Issues and Alternative for Lifters". Reid G (CSCS), Dr. Muscle. Atualizado 26/04/2025. https://dr-muscle.com/freelectics-app-review-alternative/ — **status:** texto-completo via WebFetch (lido em 2026-11-12; autor declara ter sido pago) — conferido em 2026-11-12 **[concorrente]**
- `freeletics-random` — "Totally Random Exercises". Fórum oficial da Freeletics, usuários (mar/2024). https://forum.freeletics.com/t/totally-random-exercises/14853 — **status:** texto-completo via WebFetch (lido em 2026-11-12) — conferido em 2026-11-12
- `idea2025` — "Don't Let AI Be Your Only Coach". Griggs V. IDEA Health & Fitness. 11/08/2025. https://www.ideafit.com/dont-let-ai-be-your-only-coach — **status:** texto-completo via WebFetch (lido em 2026-11-12) — conferido em 2026-11-12
- `ap-vs-fitbod` — "Alpha Progression vs Fitbod". Alpha Progression (concorrente do Fitbod). https://alphaprogression.com/en/blog/alpha-progression-vs-fitbod — **status:** texto-completo via WebFetch (lido em 2026-11-12; autodescrição da Alpha e descrição do Fitbod por concorrente) — conferido em 2026-11-12 **[concorrente]**
- `ap-vs-gravl` — "Alpha Progression vs Gravl". Alpha Progression. https://alphaprogression.com/en/blog/alpha-progression-vs-gravl — **status:** texto-completo via WebFetch (lido em 2026-11-12) — conferido em 2026-11-12 **[concorrente]**
- `bbm-template` — "Beginner Strength Training Program". Barbell Medicine (página da loja do programa). https://www.barbellmedicine.com/shop/training-templates/strength/beginner-template/ — **status:** texto-completo via WebFetch (lido em 2026-11-13; conferi: 4 variantes, 2 ou 3 dias/sem, 15 semanas em 3 blocos, deloads embutidos, carga por RPE; a página NÃO traz exercícios por sessão nem séries/repetições) — conferido em 2026-11-13. Confirma o que `bbm-iniciante` só trazia por busca (15 semanas, 2/3 dias, deload, RPE).
- `nuckols-more` — "More is More". Nuckols G. Stronger by Science (sem data). https://www.strongerbyscience.com/more-is-more/ — **status:** texto-completo via WebFetch (lido em 2026-11-13; estudo de Robbins et al. 2012, levantadores com ≥2 anos, 6 semanas, agachamento 2x/sem com 1, 4 ou 8 séries: ganho ~16, ~23, ~31 kg; amostra pequena, diferenças nem sempre significativas, só agachamento; recomendação: se estagnou e não está cansado, some volume) — conferido em 2026-11-13. Vale para força, não para hipertrofia.
- `freeletics-adapt` — "Feedback on Workout Adaptation in the Freeletics App". Fórum oficial da Freeletics, usuários (jun/2024). https://forum.freeletics.com/t/feedback-on-workout-adaptation-in-the-freeletics-app/15894 — **status:** texto-completo via WebFetch (lido em 2026-11-13) — conferido em 2026-11-13
- `schoenfeld-consenso` — consenso de especialistas (Schoenfeld, Fisher, Grgic, Haun, Helms e outros) sobre ≥~10 séries/músculo/semana. — **status:** NÃO VERIFICADO (visto só em resumo de busca; não abri o documento; falta autor/ano/periódico confirmados) — conferido em 2026-11-12
- `henselmans-sessao` — Henselmans M. Artigos "maximum productive training volume per session" (https://mennohenselmans.com/maximum-productive-training-volume-per-session/). — **status:** NÃO VERIFICADO (403; só resumo de busca) — conferido em 2026-11-12
- `bbm-iniciante` — Barbell Medicine, "The Beginner Prescription" (https://www.barbellmedicine.com/wp-content/uploads/2019/05/The-Beginner-Prescription.pdf) e página do programa de iniciantes. — **status:** NÃO VERIFICADO (PDF era imagem, ilegível; resumo de busca) — conferido em 2026-11-12
- `nsca-idosos` — NSCA/Linkul R, "Strength Training for the Older Client: A Blueprint for Program Design" (https://nsca.com/education/articles/ptq/strength-training-for-the-older-clienta-blueprint-for-program-design). — **status:** NÃO VERIFICADO (403; só busca) — conferido em 2026-11-12
- `strengthlog-idosos` — StrengthLog, "Strength Training for Seniors" (https://www.strengthlog.com/training-program-for-seniors/). — **status:** NÃO VERIFICADO (só busca) — conferido em 2026-11-12
- `techradar-chatgpt` — TechRadar, "We asked AI chatbots Gemini and ChatGPT to design our workouts". https://techradar.com/health-fitness/we-asked-ai-chatbots-gemini-and-chatgpt-to-design-our-workouts-then-we-tried-them-out — **status:** NÃO VERIFICADO (a página não trouxe o corpo; os itens vêm de resumo de busca de vários artigos) — conferido em 2026-11-12
- `nsca-ptq-ia` — NSCA PTQ 10.3.4, "Artificial Intelligence Applications for Exercise Prescription" (PDF). — **status:** NÃO VERIFICADO (PDF baixado mas ilegível pelo leitor; frase só de resumo de busca) — conferido em 2026-11-12
- Páginas só vistas em busca, sem abrir com sucesso: Fitbod help center (403: https://help.fitbod.me/hc/en-us/articles/360004429814-How-Fitbod-Creates-Your-Workout) e blog Fitbod (403); RP Hypertrophy (redirecionou, não segui); Boostcamp (https://www.boostcamp.app/features/auto-progression); Caliber; Nike (https://www.nike.com/au/help/a/ntc-plan); MFIT na App Store; JuggernautAI (https://help.jtsstrength.com); Alpha Progression glossário de progressão; Zourdos "Can You Drop (Set) Weight for Gains?" (Stronger by Science, 31/01/2023, só teaser de índice) — todas **NÃO VERIFICADO**.

## 5. Buscas feitas (WebSearch, 2026-11-12)
Fitbod how algorithm chooses exercises muscle recovery; Fitbod review complaints random exercises no progression; common beginner workout program mistakes junk volume; ChatGPT workout program trainer critique; RP Hypertrophy app mesocycle volume deload; JuggernautAI how it works; Alpha Progression how plan is generated; MacroFactor Workouts program generation; Helms program design sets per muscle; Greg Nuckols beginner program (domínios strongerbyscience.com, outlift.com); Henselmans (mennohenselmans.com); Barbell Medicine beginner (barbellmedicine.com); Freeletics complaints; Boostcamp/Hevy; Caliber onboarding; MFIT cadastro (pt-BR); Nike Training Club onboarding; bodyweight fitness recommended routine; time-efficient 30 min twice a week; older adults beginners program. Reddit (r/Fitness, r/bodyweightfitness) deu "unable to fetch".
