# Progressão no cenário de equipamento mínimo (praticante simulado)

> Gerado por `npm run auditoria:minimo-progressao`. A sugestão é a do app; o corpo é um modelo (Epley invertida, +1% de força por semana, 3 séries, 32 sessões em 16 semanas, cada degrau da escada = +15% de esforço), descrito no topo de `scripts/auditoria/minimo-progressao.ts`. Serve para achar travas, não para prever o ganho de ninguém. Não editar à mão.

Sem escada própria, vale a genérica (`progressao.incremento.peso-corporal`): 1) mais repetições; 2) descida de 3 s ou pausa embaixo; 3) variação mais difícil; 4) variação mais difícil, com descida de 3 s. Cada exercício tem a sua escada (`progressao.escada-por-exercicio`; o elástico sobe pelas intensidades, `progressao.escada-elastico`), e o degrau sobe quando a 1ª série chega ao topo da faixa e as outras ficam a até 2 repetições dele, no RIR alvo, em 2 sessões seguidas (`progressao.criterio-degrau`).

| exercício | onde | faixa | RIR | começo | 1ª série: hoje → para subir | 1ª subida | subidas em 16 semanas | "estagnado" (de 32) | maior trava (sessões) | fim | degrau que não existe | veredito |
| --- | --- | --- | --- | --- | --- | --- | ---: | ---: | ---: | --- | --- | --- |
| Flexão de braço `flexao` | nada | 8–15 | 1–2 | início da faixa | 8 → 15 | semana 16 | 1 | 16 | 4 | peso do corpo · descida de 3 s | — | **anda** |
| Flexão de braço `flexao` | nada | 8–15 | 1–2 | meio da faixa | 12 → 15 | semana 8 | 1 | 16 | 4 | peso do corpo · descida de 3 s | — | **anda** |
| Agachamento com o peso do corpo `agachamento-peso-corpo` | nada | 12–20 | 1–2 | início da faixa | 13 → 20 | semana 16 | 1 | 16 | 4 | peso do corpo · descida de 3 s | — | **anda** |
| Agachamento com o peso do corpo `agachamento-peso-corpo` | nada | 12–20 | 1–2 | meio da faixa | 16 → 20 | semana 10 | 1 | 15 | 4 | peso do corpo · descida de 3 s | — | **anda** |
| Afundo estático com o peso do corpo `afundo-peso-corpo` | nada | 10–16 | 1–2 | início da faixa | 10 → 16 | semana 13 | 1 | 15 | 4 | peso do corpo · descida de 3 s | — | **anda** |
| Afundo estático com o peso do corpo `afundo-peso-corpo` | nada | 10–16 | 1–2 | meio da faixa | 13 → 16 | semana 8 | 1 | 16 | 4 | peso do corpo · descida de 3 s | — | **anda** |
| Búlgaro com o peso do corpo `bulgaro-peso-corpo` | nada | 8–15 | 1–2 | início da faixa | 8 → 15 | semana 16 | 1 | 16 | 4 | peso do corpo · descida de 3 s | — | **anda** |
| Búlgaro com o peso do corpo `bulgaro-peso-corpo` | nada | 8–15 | 1–2 | meio da faixa | 12 → 15 | semana 8 | 1 | 16 | 4 | peso do corpo · descida de 3 s | — | **anda** |
| Ponte de glúteo `ponte-gluteo` | nada | 12–20 | 1–2 | início da faixa | 13 → 20 | semana 16 | 1 | 16 | 4 | peso do corpo · pausa de 2 s no alto | — | **anda** |
| Ponte de glúteo `ponte-gluteo` | nada | 12–20 | 1–2 | meio da faixa | 16 → 20 | semana 10 | 1 | 15 | 4 | peso do corpo · pausa de 2 s no alto | — | **anda** |
| Panturrilha em pé no chão `panturrilha-chao` | nada | 12–20 | 0–1 | início da faixa | 13 → 20 | — | 0 | 17 | 4 | peso do corpo | — | **não sobe em 16 semanas** |
| Panturrilha em pé no chão `panturrilha-chao` | nada | 12–20 | 0–1 | meio da faixa | 15 → 20 | semana 10 | 1 | 14 | 4 | peso do corpo · pausa de 2 s em cima | — | **anda** |
| Abdominal no chão (crunch) `abdominal-chao` | nada | 12–20 | 0–1 | início da faixa | 13 → 20 | — | 0 | 17 | 4 | peso do corpo | — | **não sobe em 16 semanas** |
| Abdominal no chão (crunch) `abdominal-chao` | nada | 12–20 | 0–1 | meio da faixa | 15 → 20 | semana 10 | 1 | 14 | 4 | peso do corpo · descida de 3 s | — | **anda** |
| Barra fixa `barra-fixa` | barra fixa | 5–10 | 1–2 | início da faixa | 6 → 10 | semana 12 | 1 | 18 | 5 | peso do corpo · descida de 3 s | — | **anda** |
| Barra fixa `barra-fixa` | barra fixa | 5–10 | 1–2 | meio da faixa | 8 → 10 | semana 7 | 1 | 18 | 5 | peso do corpo · descida de 3 s | — | **anda** |
| Barra fixa com pegada supinada `barra-fixa-supinada` | barra fixa | 5–10 | 1–2 | início da faixa | 6 → 10 | semana 12 | 1 | 18 | 5 | peso do corpo · descida de 3 s | — | **anda** |
| Barra fixa com pegada supinada `barra-fixa-supinada` | barra fixa | 5–10 | 1–2 | meio da faixa | 8 → 10 | semana 7 | 1 | 18 | 5 | peso do corpo · descida de 3 s | — | **anda** |
| Elevação de joelhos na barra fixa `elevacao-joelhos` | barra fixa | 10–15 | 0–1 | início da faixa | 11 → 15 | semana 11 | 2 | 12 | 4 | peso do corpo · joelhos até o peito | — | **anda** |
| Elevação de joelhos na barra fixa `elevacao-joelhos` | barra fixa | 10–15 | 0–1 | meio da faixa | 13 → 15 | semana 6 | 2 | 13 | 4 | peso do corpo · joelhos até o peito | — | **anda** |
| Remada sentada com elástico `remada-elastico` | elástico de 1 intensidade | 10–16 | 1–2 | início da faixa | 10 → 16 | semana 13 | 1 | 15 | 4 | elástico · mais esticado (um passo mais longe) | — | **anda** |
| Remada sentada com elástico `remada-elastico` | elástico de 1 intensidade | 10–16 | 1–2 | meio da faixa | 13 → 16 | semana 8 | 1 | 16 | 4 | elástico · mais esticado (um passo mais longe) | — | **anda** |
| Puxada com elástico ancorado no alto `puxada-elastico` | elástico de 1 intensidade | 10–16 | 1–2 | início da faixa | 10 → 16 | semana 13 | 1 | 15 | 4 | elástico · mais esticado (um passo mais longe) | — | **anda** |
| Puxada com elástico ancorado no alto `puxada-elastico` | elástico de 1 intensidade | 10–16 | 1–2 | meio da faixa | 13 → 16 | semana 8 | 1 | 16 | 4 | elástico · mais esticado (um passo mais longe) | — | **anda** |
| Flexão de braço com elástico `flexao-elastico` | elástico de 1 intensidade | 8–15 | 1–2 | início da faixa | 8 → 15 | semana 16 | 1 | 16 | 4 | elástico · mais esticado (um passo mais longe) | — | **anda** |
| Flexão de braço com elástico `flexao-elastico` | elástico de 1 intensidade | 8–15 | 1–2 | meio da faixa | 12 → 15 | semana 8 | 1 | 16 | 4 | elástico · mais esticado (um passo mais longe) | — | **anda** |
| Agachamento com elástico `agachamento-elastico` | elástico de 1 intensidade | 10–16 | 1–2 | início da faixa | 10 → 16 | semana 13 | 1 | 15 | 4 | elástico · mais esticado (um passo mais longe) | — | **anda** |
| Agachamento com elástico `agachamento-elastico` | elástico de 1 intensidade | 10–16 | 1–2 | meio da faixa | 13 → 16 | semana 8 | 1 | 16 | 4 | elástico · mais esticado (um passo mais longe) | — | **anda** |
| Rosca com elástico `rosca-elastico` | elástico de 1 intensidade | 12–20 | 0–1 | início da faixa | 13 → 20 | — | 0 | 17 | 4 | elástico | — | **não sobe em 16 semanas** |
| Rosca com elástico `rosca-elastico` | elástico de 1 intensidade | 12–20 | 0–1 | meio da faixa | 15 → 20 | semana 10 | 1 | 14 | 4 | elástico · mais esticado (um passo mais longe) | — | **anda** |
| Elevação lateral com elástico `elevacao-lateral-elastico` | elástico de 1 intensidade | 12–20 | 0–1 | início da faixa | 13 → 20 | — | 0 | 17 | 4 | elástico | — | **não sobe em 16 semanas** |
| Elevação lateral com elástico `elevacao-lateral-elastico` | elástico de 1 intensidade | 12–20 | 0–1 | meio da faixa | 15 → 20 | semana 10 | 1 | 14 | 4 | elástico · mais esticado (um passo mais longe) | — | **anda** |
| Stiff com elástico `stiff-elastico` | elástico de 1 intensidade | 10–16 | 1–2 | início da faixa | 10 → 16 | semana 13 | 1 | 15 | 4 | elástico · mais esticado (um passo mais longe) | — | **anda** |
| Stiff com elástico `stiff-elastico` | elástico de 1 intensidade | 10–16 | 1–2 | meio da faixa | 13 → 16 | semana 8 | 1 | 16 | 4 | elástico · mais esticado (um passo mais longe) | — | **anda** |
| Remada sentada com elástico `remada-elastico` | elásticos de 3 intensidades | 10–16 | 1–2 | início da faixa | 10 → 16 | semana 13 | 1 | 15 | 4 | elástico · mais esticado (um passo mais longe) | — | **anda** |
| Remada sentada com elástico `remada-elastico` | elásticos de 3 intensidades | 10–16 | 1–2 | meio da faixa | 13 → 16 | semana 8 | 1 | 16 | 4 | elástico · mais esticado (um passo mais longe) | — | **anda** |
| Remada na suspensão `remada-suspensao` | suspensão | 8–15 | 1–2 | início da faixa | 8 → 15 | semana 16 | 1 | 16 | 4 | peso do corpo · pés mais à frente (corpo mais deitado) | — | **anda** |
| Remada na suspensão `remada-suspensao` | suspensão | 8–15 | 1–2 | meio da faixa | 12 → 15 | semana 8 | 1 | 16 | 4 | peso do corpo · pés mais à frente (corpo mais deitado) | — | **anda** |
| Mergulho nas paralelas `mergulho` | paralelas | 6–12 | 1–2 | início da faixa | 6 → 12 | semana 14 | 1 | 15 | 4 | peso do corpo · descida de 3 s | — | **anda** |
| Mergulho nas paralelas `mergulho` | paralelas | 6–12 | 1–2 | meio da faixa | 8 → 12 | semana 9 | 1 | 16 | 5 | peso do corpo · descida de 3 s | — | **anda** |
| Flexão de joelho na bola suíça `flexao-bola` | bola suíça | 8–15 | 0–1 | início da faixa | 9 → 15 | semana 16 | 1 | 17 | 5 | peso do corpo · pausa de 2 s com os joelhos dobrados | — | **anda** |
| Flexão de joelho na bola suíça `flexao-bola` | bola suíça | 8–15 | 0–1 | meio da faixa | 11 → 15 | semana 8 | 1 | 15 | 4 | peso do corpo · pausa de 2 s com os joelhos dobrados | — | **anda** |
| Panturrilha unilateral no step `panturrilha` | step | 10–15 | 0–1 | início da faixa | 11 → 15 | semana 11 | 2 | 12 | 4 | peso do corpo · pausa de 2 s embaixo, alongada | — | **anda** |
| Panturrilha unilateral no step `panturrilha` | step | 10–15 | 0–1 | meio da faixa | 13 → 15 | semana 6 | 2 | 13 | 4 | peso do corpo · pausa de 2 s embaixo, alongada | — | **anda** |
| Agachamento goblet com kettlebell `goblet-kettlebell` | kettlebell de 12 kg | 8–15 | 1–2 | início da faixa | 8 → 17 | — | 0 | 17 | 4 | 12 kg | — | **sem carga maior: só a escada em texto** |
| Agachamento goblet com kettlebell `goblet-kettlebell` | kettlebell de 12 kg | 8–15 | 1–2 | meio da faixa | 12 → 17 | — | 0 | 13 | 4 | 12 kg | — | **sem carga maior: só a escada em texto** |
| Extensão de joelho sentado com caneleira `extensao-joelho-caneleira` | um par de caneleiras de 2 kg | 15–25 | 0–1 | início da faixa | 15 → 27 | — | 0 | 15 | 3 | 2 kg | — | **sem carga maior: só a escada em texto** |
| Extensão de joelho sentado com caneleira `extensao-joelho-caneleira` | um par de caneleiras de 2 kg | 15–25 | 0–1 | meio da faixa | 19 → 27 | — | 0 | 12 | 3 | 2 kg | — | **sem carga maior: só a escada em texto** |
| Abdução de quadril sentado com mini-band `abducao-mini-band` | mini-band de 1 intensidade | 12–20 | 0–1 | início da faixa | 13 → 20 | — | 0 | 17 | 4 | faixa curta | — | **não sobe em 16 semanas** |
| Abdução de quadril sentado com mini-band `abducao-mini-band` | mini-band de 1 intensidade | 12–20 | 0–1 | meio da faixa | 15 → 20 | semana 10 | 1 | 14 | 4 | faixa curta · pausa de 2 s com a faixa esticada | — | **anda** |
| Agachamento goblet com calcanhar elevado `goblet` | um par de halteres de 5 kg | 8–15 | 1–2 | início da faixa | 8 → 17 | — | 0 | 17 | 4 | 5 kg | — | **sem carga maior: só a escada em texto** |
| Agachamento goblet com calcanhar elevado `goblet` | um par de halteres de 5 kg | 8–15 | 1–2 | meio da faixa | 12 → 17 | — | 0 | 13 | 4 | 5 kg | — | **sem carga maior: só a escada em texto** |
| Rosca alternada com halteres `rosca-alternada` | um par de halteres de 5 kg | 8–12 | 0–1 | início da faixa | 9 → 14 | — | 0 | 15 | 5 | 5 kg | — | **sem carga maior: só a escada em texto** |
| Rosca alternada com halteres `rosca-alternada` | um par de halteres de 5 kg | 8–12 | 0–1 | meio da faixa | 9 → 14 | — | 0 | 11 | 4 | 5 kg | — | **sem carga maior: só a escada em texto** |
| Elevação lateral com halteres `elevacao-halteres` | um par de halteres de 5 kg | 12–20 | 0–1 | início da faixa | 13 → 22 | — | 0 | 17 | 4 | 5 kg | — | **sem carga maior: só a escada em texto** |
| Elevação lateral com halteres `elevacao-halteres` | um par de halteres de 5 kg | 12–20 | 0–1 | meio da faixa | 15 → 22 | — | 0 | 12 | 3 | 5 kg | — | **sem carga maior: só a escada em texto** |

## Resumo

- Casos que não sobem nenhuma vez em 16 semanas: **15 de 56**.
- Sugestões "estagnado" (3 sessões sem melhora): 858 de 1792 sessões.
- Casos em que o app sugere um degrau que a pessoa não tem (carga externa sem carga; elástico mais forte com uma intensidade só): **0**.
- Mediana da 1ª subida, entre os que sobem: semana 10.
