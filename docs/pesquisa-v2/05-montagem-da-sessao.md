# 5. Montagem de cada treino (tema T4)

> Pesquisa de 01/11/2026. Estudos com o **resumo oficial lido no PubMed** (resumo-PubMed, com PMID). As simulações usaram o gerador real, com scripts temporários fora do repositório **[medido]**.

## Resumo
1. **O modelo de tempo do app nunca foi validado.** Nenhum estudo dá uma fórmula de duração de treino. O modelo atual é razoável, mas é consenso. A proposta é **calibrá-lo com o tempo real** que o app já registra em cada sessão (início e fim), a partir do uso real (R3).
2. **O descanso aprovado (90–120 s nos multiarticulares) economiza até 7–8 minutos por treino** de intermediários e avançados, sem perda esperada de crescimento **[medido]**.
3. **Quando falta tempo, primeiro as técnicas que mantêm o volume** (superséries de músculos que não competem, drop set, rest-pause), e só depois cortar exercícios ou séries. Isso inverte parte da escada atual.
4. **Aquecimento: só o específico.** O aquecimento geral (bicicleta, alongamento) não melhorou o desempenho no treino de força.

## 1. Quanto cabe em cada duração

**Premissas do modelo** (todas são as do app hoje, exceto o descanso):

| Premissa | Valor | Selo |
|---|---|---|
| Tempo de uma série | repetições × 3 s + 7,5 s de preparo | consenso (`tempo.serie`) |
| Descanso | multiarticular 105 s (aprovado: 90–120 s); isolador 75 s | moderada (Singer 2024: sem diferença apreciável acima de ~90 s) |
| Troca de exercício | 90 s | consenso (`tempo.transicao`) |
| Aquecimento específico | 3 min no 1º multiarticular de cada região; 1,5 min nos seguintes | consenso (`tempo.aquecimento`) |
| Margem para fila de aparelho | +10% | consenso (`tempo.colchao`) |

**Resultado do modelo** **[medido com a fórmula do app; 10 repetições por série, 2 regiões aquecidas]**:

| Exercícios no treino | Com 2 séries cada | Com 3 séries cada |
|---|---|---|
| 3 | ~17 min | ~24 min |
| 4 | ~22 min | ~31 min |
| 5 | ~27 min | ~38 min |
| 6 | ~31 min | ~45 min |
| 7 | ~36 min | ~52 min |
| 8 | ~41 min | ~59 min |

**Leitura prática** **[opinião, a partir da tabela]**. Cada exercício a mais com 3 séries custa ~7 minutos; com 2 séries, ~5.

| Minutos disponíveis | O que cabe sem técnicas | Com superséries nos isoladores |
|---|---|---|
| 30 | 4 exercícios × 3 séries, ou 5–6 × 2 | +1 a 2 exercícios |
| 45 | 6 × 3 | +2 |
| 60 | 8 × 3 | +2 a 3 |
| 75 | ~10 × 3 | — |
| 90 | ~12 × 3 | — |

Junto com o teto de ~10 séries por músculo por sessão e a meta semanal (`01-divisao-e-frequencia.md`), essa tabela diz que divisão cabe em quantos dias. Exemplo: com 30 minutos, corpo todo só cabe com 2 séries por exercício ou com superséries.

**Efeito do descanso novo nas personas** (programas sem limite de tempo, minutos por dia) **[medido]**:

| Persona | Hoje | Com descanso de 105 s | Economia por dia |
|---|---|---|---|
| Bruno (intermediário, 4 dias) | 59 / 53 / 61 / 46 | 54 / 49 / 54 / 45 | 1 a 7 min |
| Carla (avançada, 5 dias) | 56 / 65 / 55 / 54 / 39 | 52 / 57 / 49 / 52 / 36 | 2 a 8 min |
| Ana e Diego (iniciantes) | sem mudança | sem mudança | 0 (já descansavam 105 s) |

## 2. Ordem dentro do treino

| Regra | Base | Selo |
|---|---|---|
| A ordem **não muda o crescimento** | 11 estudos (Nunes 2021, PMID 32077380) | moderada |
| Multiarticulares primeiro, porque a força cresce mais no que vem primeiro e eles pedem mais técnica | Nunes 2021; ACSM 2026 (41843416): força melhor "no começo da sessão" | moderada |
| Músculo prioritário antes, dentro de cada tipo | `ordem.sessao`, já aprovada | consenso |
| Abdômen por último | `ordem.sessao` | consenso |

**Sem mudança** na regra atual; ela foi confirmada.

## 3. Aquecimento

| Achado | Fonte | Selo |
|---|---|---|
| Aquecimento geral (aeróbio), específico ou combinado não mudou o total de repetições em supino, agachamento e rosca a 80% de 1RM (15 homens) | Ribeiro et al. 2014, *Percept Mot Skills* (25153744) | um estudo |
| Aquecer o músculo melhora a potência e a taxa de força, **não a força máxima** | Wilson et al. 2025, meta-análise, *J Sport Health Sci* (39864808) | moderada |
| Um aquecimento curto e pesado (série com 80% da carga do treino) rendeu mais volume que um leve | Viveiros et al. 2024 (39593476) | um estudo |
| Recomendação de revisão: aquecimento **só específico do exercício**; alongamento só se o objetivo for flexibilidade | Iversen et al. 2021, *Sports Med* (34125411) | consenso (revisão narrativa) |

**Proposta:**
- Mantém `tempo.aquecimento`: 1 a 2 séries leves de aproximação, só antes do 1º multiarticular de cada região.
- A última série de aproximação passa a ser **mais perto da carga do treino** (Viveiros 2024).
- O app nunca exige aquecimento geral.

## 4. Quando falta tempo: a nova escada

| Técnica | O que a evidência diz | Selo | Fonte |
|---|---|---|---|
| **Supersérie de músculos que não competem** (peito + costas, bíceps + tríceps) | Mantém o volume; a supersérie do **mesmo** músculo derruba o volume. Aumenta a sensação de esforço e o dano muscular, então pode pedir mais recuperação. | moderada (meta-análise) | Zhang et al. 2025, *Sports Med* (39903375) |
| Supersérie de multiarticulares, corpo todo | Composição corporal igual; força máxima um pouco menor | um estudo | Iversen et al. 2024, *J Strength Cond Res* (39072654) |
| **Drop set** | Mesma hipertrofia, em metade a um terço do tempo | moderada | Sødal 2023 (37523092) |
| **Myo-reps / rest-pause** | Mesmo tamanho e força em 8 semanas, com ~30% menos volume de carga | um estudo | Bradshaw et al. 2026 (42112925); Tsartsapakis 2026 (41718208) |
| Técnicas avançadas em geral | Cortam o tempo pela metade mantendo o volume; mais indicadas para hipertrofia que para força | consenso (revisão narrativa) | Iversen 2021 (34125411) |

**Nova ordem dos cortes** (proposta para `tempo.corte`). A escada atual começa cortando exercício; a nova primeiro tenta manter o volume:
1. **Aquecimento só específico** (já é o padrão).
2. **Superséries** entre músculos que não competem. Primeiro nos isoladores, depois nos multiarticulares de músculos diferentes (nunca dois multiarticulares pesados de pernas, regra `tempo.superserie` atual). Para iniciante, só a partir da 3ª semana **[opinião: pelo aumento de esforço e de dano descrito em Zhang 2025]**.
3. **Drop set, myo-reps ou rest-pause** na última série dos isoladores (regra `tempo.drop-set` atual: nunca em multiarticular livre pesado).
4. **Menos exercícios**, mantendo os multiarticulares e os isoladores obrigatórios do T3: extensora, tríceps acima da cabeça, panturrilha em pé.
5. **Por último, menos séries.** Primeiro nos não prioritários, até o piso de 4, e só então nos prioritários. Um prioritário nunca cai antes de um não prioritário (defeito achado na revisão do M2, já corrigido no código; a regra fica escrita).

**O que muda no app:**
- Hoje o drop set só aparece como texto ("se puder…"). Com a escada nova, ele **vira prescrição** no programa, por exemplo "última série: drop set", e o registro do treino precisa aceitar a queda de carga. Isso entra no R0b.

## 5. Calibrar o tempo com o uso real
- O app já grava o início e o fim de cada sessão (`resumoSessao`).
- **Proposta:** a partir de 3 sessões registradas, o app compara o tempo real com o estimado e ajusta a margem pessoal (no lugar dos 10% fixos). Por exemplo: "seus treinos levam ~8 min a mais que o previsto; ajustamos".
- **Selo:** consenso; é medição da própria pessoa, não um estudo.
- Entra no R2 (acompanhamento), com a pergunta de confirmação: nada muda sem a escolha da pessoa.

## 6. Mudanças propostas para `regras.md` (só com aprovação)
- **`descanso.por-tipo`:** multiarticular 90–120 s (padrão 105 s) em todos os níveis; 2–3 min como opção. *(Aprovado em 01/11/2026; entra no R0b.)*
- **`tempo.corte`:** a nova ordem da seção 4.
- **`tempo.aquecimento`:** a última série de aproximação perto da carga de trabalho (+ Viveiros 2024, + Ribeiro 2014).
- **`tempo.calibracao` (nova):** ajuste pessoal do tempo depois de 3 sessões; consenso.
- **`tempo.superserie`:** + Zhang 2025 e Iversen 2024; iniciante só a partir da 3ª semana.
- **`tempo.drop-set`:** passa de "sugerido no texto" a prescrição quando falta tempo (+ Sødal 2023, Bradshaw 2026).
- **Fontes novas (resumo-PubMed):** Iversen 2021 (34125411), Iversen 2024 (39072654), Zhang 2025 (39903375), Bradshaw 2026 (42112925), Wilson 2025 (39864808), Viveiros 2024 (39593476), Ribeiro 2014 (25153744).

## 7. O que fica sem resposta
- **Nenhum estudo valida uma fórmula de duração de treino.** A tabela da seção 1 é uma estimativa até haver tempo real registrado.
- Os estudos de técnicas são curtos (8 a 12 semanas). Não se sabe se manter drop sets e superséries por meses causa mais fadiga acumulada.
- A regra "superséries para iniciante só a partir da 3ª semana" é raciocínio do projeto, não estudo.
