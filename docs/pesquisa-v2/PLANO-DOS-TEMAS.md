# Plano dos 6 temas restantes da pesquisa v2 (01/11/2026)

> Aprovado pelo Gustavo em 01/11/2026:
> - a divisão do treino passa a ser escolhida pela pessoa entre opções equivalentes (`01-divisao-e-frequencia.md`);
> - os 4 ajustes do panorama (`02-panorama-da-evidencia.md`): descanso dos compostos em 90–120 s, semana leve só para fadiga ou dor, drop set e séries pareadas antes na escada de tempo, e sobrecarga na descida em estudo.
>
> Essas decisões entram em `docs/pesquisa/regras.md` e no código no marco R0b, junto com o resto da montagem, para não mexer no gerador duas vezes.

## Como cada tema é feito (igual para todos)
1. **Perguntas fechadas.** Cada tema começa com as perguntas que o app precisa responder, já escritas abaixo.
2. **Busca registrada.** As buscas no PubMed ficam anotadas no próprio arquivo do tema (termos e data), para quem quiser refazer.
3. **Hierarquia das fontes**, como em `docs/pesquisa/00-metodo.md`:
   - diretrizes e posicionamentos (OMS, Ministério da Saúde, ACSM, NSCA, sociedades médicas);
   - meta-análises;
   - ensaios randomizados;
   - consenso.
4. **Nível de leitura de cada fonte:**
   - **resumo-PubMed:** resumo oficial lido;
   - **texto-completo:** quando a página abrir;
   - **não verificado:** visto só na busca.
5. **Selo por número.** Cada número recebe um dos 4 selos (robusta, moderada, um estudo, consenso), e o selo vai no número, não no tema.
6. **Entregável de cada tema:**
   - um arquivo nesta pasta;
   - a lista de mudanças propostas para `regras.md`;
   - o que muda no app;
   - as dúvidas que sobraram.
7. **Parada para revisão do Gustavo** no fim de cada tema. Nada entra em `regras.md` sem aprovação.

## Ordem e dependências
```
T3 Exercícios por músculo ──┬─► T4 Montagem da sessão ──┐
                            └─► T7 Equipamentos v2 ─────┤
T5 Populações e segurança ──────────────────────────────┼─► T8 Programa do Gustavo
T6 Progressão e acompanhamento ─────────────────────────┘
```
- **T3 vem primeiro:** é a peça que falta para montar o treino sem copiar o programa de referência.
- **T5 e T6** não dependem de T3 e podem andar em paralelo.
- **T8 é o último:** junta tudo e precisa de `privado/` (feito na máquina do Gustavo).

| Tema | Esforço estimado | Libera no app |
|---|---|---|
| T3 Exercícios por músculo | 2–3 dias | R0b (gerador) e R0c (catálogo) |
| T4 Montagem da sessão | 1 dia | R0b e R1 |
| T5 Populações e segurança | 1–2 dias | R1 (triagem e textos) |
| T6 Progressão e acompanhamento | 1–2 dias | R2 |
| T7 Equipamentos v2 | 1 dia | R0c |
| T8 Programa do Gustavo | 0,5–1 dia (com `privado/`) | R3 (uso real) |

---

## T3. Escolha dos exercícios, músculo por músculo
**Objetivo:** trocar as "vagas" e a "ordem" copiadas do programa de referência por regras de escolha com base.

**Perguntas**
1. Para cada músculo (peito, costas, ombros nas três porções, bíceps, tríceps, quadríceps, posteriores, glúteos, panturrilha, abdômen), quais exercícios têm evidência de crescer mais, e por quê? Exemplos: posição alongada, ângulo, região do músculo.
2. Quantos exercícios diferentes por músculo por semana, e quantas séries por exercício?
3. Quando usar um exercício multiarticular e quando um isolador?
4. Como variar entre blocos de semanas sem "variar demais" (Kassiano 2022)?
5. Quais exercícios são equivalentes, para servir de alternativa quando o aparelho está ocupado?

**Fontes a ler** (já localizadas no PubMed):
- Músculo alongado: tríceps acima da cabeça × braço ao lado do corpo (Maeo et al. 2023, PMID 35819335); flexora sentada × deitada (Maeo 2021, 33009197); panturrilha em pé × sentada (Kinoshita et al. 2023, PMID 38156065) e parcial alongada na panturrilha (PMID 37015016); revisão narrativa sobre hipertrofia em posição alongada (PMID 37556026); parciais alongadas (Wolf 2025, 39959841).
- Glúteos: hip thrust × agachamento (Plotkin 2023, 37877099).
- Variação: Kassiano 2022 (35438660).
- Equipamento: Haugen 2023 (37582807); ACSM 2026 (41843416).
- **A buscar:** extensora de joelho com o quadril flexionado ou estendido (reto femoral); supino inclinado × reto (porção clavicular); puxada × remada para o latíssimo; unilateral × bilateral; multiarticular × isolador para braços.

**Entregável:** `04-exercicios-por-musculo.md`, com:
- uma tabela por músculo: exercícios em ordem de preferência por **função** (alongado, estável, carga possível), não por equipamento, cada linha com selo;
- as **regras de vaga**: cada dia pede funções ("um empurrar horizontal", "um isolador de tríceps com o braço acima da cabeça"), e o gerador preenche com o que o equipamento permite.

**Pronto quando:** cada um dos 12 músculos tem pelo menos 3 opções classificadas, cada uma com selo, e cada padrão de movimento tem pelo menos 2 alternativas de equipamento diferente.

## T4. Montagem da sessão
**Objetivo:** decidir quantos exercícios, em que ordem e quanto tempo cada sessão leva, para caber nos minutos que a pessoa tem.

**Perguntas**
1. Quantos exercícios e séries cabem em 30, 45, 60, 75 e 90 minutos (o modelo de tempo atual nunca foi validado)?
2. Ordem: o que vem primeiro quando a ordem não muda a hipertrofia (Nunes 2021)?
3. Superséries, séries pareadas e drop sets: quando usar e entre quais músculos?
4. Aquecimento: quanto basta antes de treinar com peso?
5. Descanso: aplicar o ajuste aprovado (90–120 s) e medir quanto tempo economiza.

**Fontes:**
- Sødal 2023 (37523092); Chien 2026 (42783664); Tsartsapakis 2026 (41718208); Singer 2024 (39205815).
- Aquecimento: meta-análise de 2025 (PMID 39864808) e revisão de 2026 (42188564).
- `docs/pesquisa/06-economia-de-tempo.md`.

**Entregável:** `05-montagem-da-sessao.md`, com a tabela "minutos → exercícios e séries" e a nova escada de cortes.

**Pronto quando:** existe um modelo de tempo com as premissas escritas, e uma regra de corte que **nunca** derruba um músculo prioritário antes de um não prioritário (defeito já achado na revisão do M2).

## T5. Populações e segurança
**Objetivo:** saber o que muda para quem está começando, quem volta de pausa, mulheres, pessoas acima de 60 anos, gestantes e pessoas com pressão alta. Saber também o que a medicina recomenda sobre segurança, sem profissional de Educação Física no projeto por agora.

**Perguntas**
1. **Iniciante:** quanto volume e qual fase de aprendizado?
2. **Volta de pausa:** as faixas de 2 e 3 semanas se sustentam?
3. **Mulheres:** muda algo na prescrição?
4. **Acima de 60 anos:** muda o volume, a carga ou a progressão?
5. **Gestação:** o app hoje bloqueia na triagem; isso está certo?
6. **Pressão alta:** o treino de força é seguro, e há evidência que sustente uma pergunta de acompanhamento na triagem?
7. **Lesões:** quão comuns são na musculação, e quais cuidados do app têm base?

**Fontes (diretrizes médicas primeiro):**
- OMS 2020, atividade física (Bull et al., *Br J Sports Med*, PMID 33239350).
- **Guia de Atividade Física para a População Brasileira** (Ministério da Saúde, 2021; [notícia da OPAS](https://www.paho.org/pt/noticias/30-6-2021-ministerio-da-saude-do-brasil-lanca-guia-atividade-fisica-para-populacao); o PDF oficial ainda vai ser lido).
- ACSM 2026 (41843416).
- NSCA para idosos (Fragala 2019, 31343601).
- ICFSR, exercício em idosos (34409961), e sarcopenia (30498820).
- Diretriz canadense de atividade física na gestação (30337460).
- Exercício e pressão arterial, metanálise em rede (Edwards et al. 2023, 37491419).
- Diferenças entre os sexos (Refalo 2025, 40028215).
- Volume em idosos (Radaelli 2025, 39405023).
- Epidemiologia de lesões na musculação (Keogh & Winwood 2017, 27328853).
- Detraining (Bosquet 2013) e pausa curta (Hwang 2017).

**Entregável:** `06-populacoes-e-seguranca.md`, com:
- o que muda por grupo, ou "não muda" com a fonte;
- uma **proposta de triagem revisada** apoiada em diretrizes médicas. Ela fica **registrada, não aplicada**: a decisão do Gustavo é não mexer na regra de segurança sem um profissional;
- a lista de cuidados com e sem base.

**Pronto quando:** cada um dos 7 grupos tem uma resposta com selo, e a triagem atual foi conferida contra a OMS e o guia brasileiro.

## T6. Progressão e acompanhamento
**Objetivo:** dar base ao marco R2, o acompanhamento personalizado que o Gustavo pediu.

**Perguntas**
1. A dupla progressão é a melhor forma para hipertrofia? Repetições × carga (Plotkin 2022).
2. Como calcular a carga da próxima série a partir de "repetições + reserva" (calibração na 1ª série)? Quão confiável é o RIR que as pessoas relatam?
3. Pausas durante o uso: quanto tempo sem treinar justifica reduzir a carga?
4. Semana leve: quando sugerir (Coleman 2024)?
5. Acompanhar o próprio treino ajuda a manter o hábito, e que tipo de acompanhamento funciona (Michie 2009)?
6. Quanto as pessoas cumprem as recomendações de força? Útil para calibrar as metas do acompanhamento.

**Fontes:**
- Plotkin 2022 (36199287); Coleman 2024 (38274324); Robinson 2024 (38970765).
- Precisão do RIR (Halperin 2022, já em `regras.md`).
- Michie 2009 (19916637).
- Adesão às recomendações de força em 3,3 milhões de pessoas (PMID 36418149); força e mortalidade em coortes (35228201).
- **A buscar:** fórmulas de estimativa da carga máxima por repetições (Epley, Brzycki) e o erro delas em séries de muitas repetições.

**Ponto de partida (achados de 01/11/2026):**
- O app não percebe pausas durante o uso: a readaptação (`readaptacao.gatilho`) só vale no cadastro, e a "semana do programa" é contada pelo calendário.
- Simulação: uma persona que treinou 1 semana, sumiu 1 mês e voltou recebeu **mais** séries e RIR **mais baixo** do que antes de parar, quando a regra manda cerca de metade das séries e carga 10% a 20% menor.
- A função de semana leve existe, mas nenhuma tela a usa.
- **Pedido do Gustavo:** saber quantos treinos foram feitos, se treinou menos do que devia, e que carga pegar depois de faltar. A resposta preliminar, a confirmar neste tema: até ~2 semanas sem treinar, manter a carga (Hwang 2017; Bosquet 2013; não verificados no PubMed ainda).

**Entregável:** `07-progressao-e-acompanhamento.md`, com as regras novas de pausa, calibração, semana leve e as métricas de "a sua semana".

**Pronto quando:** cada peça do R2 tem uma regra com selo e um caso de teste descrito, por exemplo "pausa de 22 dias → volta gradual".

## T7. Equipamentos, segunda versão
**Objetivo:** fechar a lista universal (`03-universo-de-equipamentos.md`) com o que cada equipamento permite, usando o resultado do T3.

**Perguntas:**
1. Para cada equipamento novo, quais exercícios do T3 ele permite, e com que prioridade?
2. Que atalhos de cenário oferecer (academia completa, condomínio, casa)?
3. O que muda no reconhecimento por foto?

**Entregável:**
- a lista final de equipamentos e exercícios a acrescentar;
- a ordem das animações a fazer, por frequência nos programas gerados;
- o custo estimado de cada animação.

**Pronto quando:** todo equipamento da lista permite pelo menos 1 exercício, e todo exercício proposto tem ficha de técnica com fonte (no formato de `docs/pesquisa/animacoes/`).

## T8. O programa do Gustavo
**Objetivo:** aplicar a base nova ao perfil e ao equipamento do Gustavo, sem regra especial.

**Passos:**
1. Na máquina que tem `privado/`: ler o inventário (as fotos e a lista) e o perfil.
2. Gerar o programa com o gerador já atualizado (depende do R0b).
3. Comparar com o programa de referência só para entender as diferenças, não como meta.
4. Escrever o porquê de cada diferença.

**Entregável:** um resumo **fora do repositório** (os dados são pessoais) e, no devlog, só os números agregados.

**Pronto quando:** o Gustavo aprovar o programa novo para começar o R3 (4 semanas de uso real).

---

## Depois dos 6 temas
A pesquisa vira código nos marcos já aprovados:
- **R0b:** gerador com divisão escolhida, vagas por função e os 4 ajustes;
- **R0c:** catálogo ampliado;
- **R1:** correções e cadastro rápido;
- **R2:** acompanhamento;
- **R3:** uso real;
- **R4:** experimento do boneco.
