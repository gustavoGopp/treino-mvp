# Progressão no cenário de equipamento mínimo (praticante simulado)

> Gerado por `npm run auditoria:minimo-progressao`. A sugestão é a do app; o corpo é um modelo (Epley invertida, +1% de força por semana, 3 séries, 32 sessões em 16 semanas, cada degrau da escada = +15% de esforço), descrito no topo de `scripts/auditoria/minimo-progressao.ts`. Serve para achar travas, não para prever o ganho de ninguém. Não editar à mão.

A escada do peso do corpo e do elástico é uma só para todos os exercícios (`progressao.incremento.peso-corporal`): 1) mais repetições; 2) descida de 3 s ou pausa embaixo; 3) variação mais difícil; 4) carga externa ou elástico mais forte. Ela só sobe de degrau com todas as séries no topo da faixa, no RIR alvo, em 2 sessões seguidas.

| exercício | onde | faixa | RIR | começo | 1ª série: hoje → para subir | 1ª subida | subidas em 16 semanas | "estagnado" (de 32) | maior trava (sessões) | fim | degrau que não existe | veredito |
| --- | --- | --- | --- | --- | --- | --- | ---: | ---: | ---: | --- | --- | --- |
| Flexão de braço `flexao` | nada | 8–20 | 1–2 | início da faixa | 8 → 22 | — | 0 | 17 | 4 | peso do corpo | — | **não sobe em 16 semanas** |
| Flexão de braço `flexao` | nada | 8–20 | 1–2 | meio da faixa | 14 → 22 | — | 0 | 16 | 4 | peso do corpo | — | **não sobe em 16 semanas** |
| Agachamento com o peso do corpo `agachamento-peso-corpo` | nada | 15–30 | 1–2 | início da faixa | 16 → 32 | — | 0 | 16 | 4 | peso do corpo | — | **não sobe em 16 semanas** |
| Agachamento com o peso do corpo `agachamento-peso-corpo` | nada | 15–30 | 1–2 | meio da faixa | 23 → 32 | semana 16 | 1 | 13 | 3 | peso do corpo · descida de 3 s ou pausa embaixo | — | **anda** |
| Afundo estático com o peso do corpo `afundo-peso-corpo` | nada | 12–25 | 1–2 | início da faixa | 13 → 27 | — | 0 | 16 | 4 | peso do corpo | — | **não sobe em 16 semanas** |
| Afundo estático com o peso do corpo `afundo-peso-corpo` | nada | 12–25 | 1–2 | meio da faixa | 18 → 27 | semana 16 | 1 | 13 | 3 | peso do corpo · descida de 3 s ou pausa embaixo | — | **anda** |
| Búlgaro com o peso do corpo `bulgaro-peso-corpo` | nada | 10–20 | 1–2 | início da faixa | 10 → 22 | — | 0 | 16 | 4 | peso do corpo | — | **não sobe em 16 semanas** |
| Búlgaro com o peso do corpo `bulgaro-peso-corpo` | nada | 10–20 | 1–2 | meio da faixa | 14 → 22 | semana 15 | 1 | 14 | 3 | peso do corpo · descida de 3 s ou pausa embaixo | — | **anda** |
| Ponte de glúteo `ponte-gluteo` | nada | 12–25 | 1–2 | início da faixa | 13 → 27 | — | 0 | 16 | 4 | peso do corpo | — | **não sobe em 16 semanas** |
| Ponte de glúteo `ponte-gluteo` | nada | 12–25 | 1–2 | meio da faixa | 18 → 27 | semana 16 | 1 | 13 | 3 | peso do corpo · descida de 3 s ou pausa embaixo | — | **anda** |
| Panturrilha em pé no chão `panturrilha-chao` | nada | 12–20 | 0–1 | início da faixa | 13 → 22 | — | 0 | 17 | 4 | peso do corpo | — | **não sobe em 16 semanas** |
| Panturrilha em pé no chão `panturrilha-chao` | nada | 12–20 | 0–1 | meio da faixa | 15 → 22 | semana 13 | 1 | 14 | 3 | peso do corpo · descida de 3 s ou pausa embaixo | — | **anda** |
| Abdominal no chão (crunch) `abdominal-chao` | nada | 12–25 | 0–1 | início da faixa | 13 → 27 | — | 0 | 17 | 4 | peso do corpo | — | **não sobe em 16 semanas** |
| Abdominal no chão (crunch) `abdominal-chao` | nada | 12–25 | 0–1 | meio da faixa | 19 → 27 | semana 16 | 1 | 15 | 4 | peso do corpo · descida de 3 s ou pausa embaixo | — | **anda** |
| Barra fixa `barra-fixa` | barra fixa | 6–12 | 1–2 | início da faixa | 6 → 14 | — | 0 | 17 | 4 | peso do corpo | — | **não sobe em 16 semanas** |
| Barra fixa `barra-fixa` | barra fixa | 6–12 | 1–2 | meio da faixa | 8 → 14 | semana 13 | 1 | 16 | 4 | peso do corpo · descida de 3 s ou pausa embaixo | — | **anda** |
| Barra fixa com pegada supinada `barra-fixa-supinada` | barra fixa | 6–12 | 1–2 | início da faixa | 6 → 14 | — | 0 | 17 | 4 | peso do corpo | — | **não sobe em 16 semanas** |
| Barra fixa com pegada supinada `barra-fixa-supinada` | barra fixa | 6–12 | 1–2 | meio da faixa | 8 → 14 | semana 13 | 1 | 16 | 4 | peso do corpo · descida de 3 s ou pausa embaixo | — | **anda** |
| Elevação de joelhos na barra fixa `elevacao-joelhos` | barra fixa | 10–15 | 0–1 | início da faixa | 11 → 17 | semana 15 | 1 | 17 | 4 | peso do corpo · descida de 3 s ou pausa embaixo | — | **anda** |
| Elevação de joelhos na barra fixa `elevacao-joelhos` | barra fixa | 10–15 | 0–1 | meio da faixa | 13 → 17 | semana 10 | 1 | 17 | 4 | peso do corpo · descida de 3 s ou pausa embaixo | — | **anda** |
| Remada sentada com elástico `remada-elastico` | elástico de 1 intensidade | 10–20 | 1–2 | início da faixa | 10 → 22 | — | 0 | 16 | 4 | elástico | — | **não sobe em 16 semanas** |
| Remada sentada com elástico `remada-elastico` | elástico de 1 intensidade | 10–20 | 1–2 | meio da faixa | 14 → 22 | semana 15 | 1 | 14 | 3 | elástico · descida de 3 s ou pausa embaixo | — | **anda** |
| Puxada com elástico ancorado no alto `puxada-elastico` | elástico de 1 intensidade | 10–20 | 1–2 | início da faixa | 10 → 22 | — | 0 | 16 | 4 | elástico | — | **não sobe em 16 semanas** |
| Puxada com elástico ancorado no alto `puxada-elastico` | elástico de 1 intensidade | 10–20 | 1–2 | meio da faixa | 14 → 22 | semana 15 | 1 | 14 | 3 | elástico · descida de 3 s ou pausa embaixo | — | **anda** |
| Flexão de braço com elástico `flexao-elastico` | elástico de 1 intensidade | 8–20 | 1–2 | início da faixa | 8 → 22 | — | 0 | 17 | 4 | elástico | — | **não sobe em 16 semanas** |
| Flexão de braço com elástico `flexao-elastico` | elástico de 1 intensidade | 8–20 | 1–2 | meio da faixa | 14 → 22 | — | 0 | 16 | 4 | elástico | — | **não sobe em 16 semanas** |
| Agachamento com elástico `agachamento-elastico` | elástico de 1 intensidade | 12–25 | 1–2 | início da faixa | 13 → 27 | — | 0 | 16 | 4 | elástico | — | **não sobe em 16 semanas** |
| Agachamento com elástico `agachamento-elastico` | elástico de 1 intensidade | 12–25 | 1–2 | meio da faixa | 18 → 27 | semana 16 | 1 | 13 | 3 | elástico · descida de 3 s ou pausa embaixo | — | **anda** |
| Rosca com elástico `rosca-elastico` | elástico de 1 intensidade | 12–20 | 0–1 | início da faixa | 13 → 22 | — | 0 | 17 | 4 | elástico | — | **não sobe em 16 semanas** |
| Rosca com elástico `rosca-elastico` | elástico de 1 intensidade | 12–20 | 0–1 | meio da faixa | 15 → 22 | semana 13 | 1 | 14 | 3 | elástico · descida de 3 s ou pausa embaixo | — | **anda** |
| Elevação lateral com elástico `elevacao-lateral-elastico` | elástico de 1 intensidade | 12–20 | 0–1 | início da faixa | 13 → 22 | — | 0 | 17 | 4 | elástico | — | **não sobe em 16 semanas** |
| Elevação lateral com elástico `elevacao-lateral-elastico` | elástico de 1 intensidade | 12–20 | 0–1 | meio da faixa | 15 → 22 | semana 13 | 1 | 14 | 3 | elástico · descida de 3 s ou pausa embaixo | — | **anda** |
| Stiff com elástico `stiff-elastico` | elástico de 1 intensidade | 12–20 | 1–2 | início da faixa | 13 → 22 | — | 0 | 16 | 4 | elástico | — | **não sobe em 16 semanas** |
| Stiff com elástico `stiff-elastico` | elástico de 1 intensidade | 12–20 | 1–2 | meio da faixa | 16 → 22 | semana 13 | 1 | 15 | 4 | elástico · descida de 3 s ou pausa embaixo | — | **anda** |
| Remada sentada com elástico `remada-elastico` | elásticos de 3 intensidades | 10–20 | 1–2 | início da faixa | 10 → 22 | — | 0 | 16 | 4 | elástico | — | **não sobe em 16 semanas** |
| Remada sentada com elástico `remada-elastico` | elásticos de 3 intensidades | 10–20 | 1–2 | meio da faixa | 14 → 22 | semana 15 | 1 | 14 | 3 | elástico · descida de 3 s ou pausa embaixo | — | **anda** |
| Remada na suspensão `remada-suspensao` | suspensão | 8–15 | 1–2 | início da faixa | 8 → 17 | — | 0 | 17 | 4 | peso do corpo | — | **não sobe em 16 semanas** |
| Remada na suspensão `remada-suspensao` | suspensão | 8–15 | 1–2 | meio da faixa | 12 → 17 | semana 12 | 1 | 17 | 4 | peso do corpo · descida de 3 s ou pausa embaixo | — | **anda** |
| Mergulho nas paralelas `mergulho` | paralelas | 6–12 | 1–2 | início da faixa | 6 → 14 | — | 0 | 17 | 4 | peso do corpo | — | **não sobe em 16 semanas** |
| Mergulho nas paralelas `mergulho` | paralelas | 6–12 | 1–2 | meio da faixa | 8 → 14 | semana 13 | 1 | 16 | 4 | peso do corpo · descida de 3 s ou pausa embaixo | — | **anda** |
| Flexão de joelho na bola suíça `flexao-bola` | bola suíça | 8–15 | 0–1 | início da faixa | 9 → 17 | — | 0 | 18 | 5 | peso do corpo | — | **não sobe em 16 semanas** |
| Flexão de joelho na bola suíça `flexao-bola` | bola suíça | 8–15 | 0–1 | meio da faixa | 11 → 17 | semana 12 | 1 | 16 | 4 | peso do corpo · descida de 3 s ou pausa embaixo | — | **anda** |
| Panturrilha unilateral no step `panturrilha` | step | 10–15 | 0–1 | início da faixa | 11 → 17 | semana 15 | 1 | 17 | 4 | peso do corpo · descida de 3 s ou pausa embaixo | — | **anda** |
| Panturrilha unilateral no step `panturrilha` | step | 10–15 | 0–1 | meio da faixa | 13 → 17 | semana 10 | 1 | 17 | 4 | peso do corpo · descida de 3 s ou pausa embaixo | — | **anda** |
| Agachamento goblet com kettlebell `goblet-kettlebell` | kettlebell de 12 kg | 8–15 | 1–2 | início da faixa | 8 → 17 | — | 0 | 17 | 4 | 12 kg | — | **sem carga maior: só a escada em texto** |
| Agachamento goblet com kettlebell `goblet-kettlebell` | kettlebell de 12 kg | 8–15 | 1–2 | meio da faixa | 12 → 17 | — | 0 | 13 | 4 | 12 kg | — | **sem carga maior: só a escada em texto** |
| Agachamento goblet com calcanhar elevado `goblet` | um par de halteres de 5 kg | 8–15 | 1–2 | início da faixa | 8 → 17 | — | 0 | 17 | 4 | 5 kg | — | **sem carga maior: só a escada em texto** |
| Agachamento goblet com calcanhar elevado `goblet` | um par de halteres de 5 kg | 8–15 | 1–2 | meio da faixa | 12 → 17 | — | 0 | 13 | 4 | 5 kg | — | **sem carga maior: só a escada em texto** |
| Rosca alternada com halteres `rosca-alternada` | um par de halteres de 5 kg | 8–12 | 0–1 | início da faixa | 9 → 14 | — | 0 | 15 | 5 | 5 kg | — | **sem carga maior: só a escada em texto** |
| Rosca alternada com halteres `rosca-alternada` | um par de halteres de 5 kg | 8–12 | 0–1 | meio da faixa | 9 → 14 | — | 0 | 11 | 4 | 5 kg | — | **sem carga maior: só a escada em texto** |
| Elevação lateral com halteres `elevacao-halteres` | um par de halteres de 5 kg | 12–20 | 0–1 | início da faixa | 13 → 22 | — | 0 | 17 | 4 | 5 kg | — | **sem carga maior: só a escada em texto** |
| Elevação lateral com halteres `elevacao-halteres` | um par de halteres de 5 kg | 12–20 | 0–1 | meio da faixa | 15 → 22 | — | 0 | 12 | 3 | 5 kg | — | **sem carga maior: só a escada em texto** |

## Resumo

- Casos que não sobem nenhuma vez em 16 semanas: **30 de 52**.
- Sugestões "estagnado" (3 sessões sem melhora): 808 de 1664 sessões.
- Casos em que o app sugere um degrau que a pessoa não tem (carga externa sem carga; elástico mais forte com uma intensidade só): **0**.
- Mediana da 1ª subida, entre os que sobem: semana 15.
