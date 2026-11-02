# Progressão com os saltos reais de cada equipamento (praticante simulado)

> Gerado por `npm run auditoria:progressao`. A sugestão é a do app; o corpo é um modelo (Epley invertida, +1% de força por semana, 3 séries, 32 sessões em 16 semanas), descrito no topo de `scripts/auditoria/progressao.ts`. Serve para achar travas e vaivéns, não para prever ganho de ninguém.

| caso | começo → fim | subidas | voltas | mais sessões sem progresso (nem carga nem repetições) | ações | carga que não existe | veredito |
| --- | --- | ---: | ---: | ---: | --- | --- | --- |
| Supino com halteres fixos de 1 a 12 kg, de 1 em 1 kg | 11 kg → 12 kg | 1 | 0 | 4 | manter 14, estagnado 17, subir 1 | — | **anda** |
| Supino com halteres fixos de 2 a 40 kg, de 2 em 2 kg | 18 kg → 20 kg | 1 | 0 | 4 | manter 15, estagnado 16, subir 1 | — | **anda** |
| Supino com só 2 pares de halteres (5 e 10 kg) | 5 kg → 5 kg | 5 | 5 | 2 | subir 5, voltar 5, manter 22 | — | **vaivém** |
| Goblet com halteres montáveis de casa (2 a 18 kg) | 18 kg → 18 kg | 0 | 0 | 4 | manter 21, estagnado 11 | — | **não sobe** |
| Goblet com kettlebells de 8, 12 e 16 kg | 12 kg → 12 kg | 1 | 1 | 4 | manter 17, estagnado 13, subir 1, voltar 1 | — | **anda** |
| Agachamento com barra, menor anilha de 2 kg | 62,5 kg → 68 kg | 1 | 0 | 4 | manter 15, estagnado 16, subir 1 | — | **anda** |
| Agachamento com barra, menor anilha de 5 kg | 62,5 kg → 70 kg | 1 | 0 | 4 | manter 15, estagnado 16, subir 1 | — | **anda** |
| Rosca com barra W, anilhas de 1 kg | 22,5 kg → 24 kg | 1 | 0 | 4 | manter 15, estagnado 16, subir 1 | — | **anda** |
| Leg press, menor anilha de 5 kg | 30 kg por lado → 35 kg por lado | 1 | 0 | 4 | manter 16, estagnado 15, subir 1 | — | **anda** |
| Cadeira extensora (torre de 15 placas) | placa 8 → placa 9 | 1 | 0 | 4 | manter 14, estagnado 17, subir 1 | — | **anda** |
| Elevação lateral na polia (torre de 15 placas) | placa 2 → placa 2 | 2 | 2 | 4 | manter 16, estagnado 12, subir 2, voltar 2 | — | **vaivém** |
| Barra fixa no graviton (contrapeso, 10 placas) | contrapeso 5 → contrapeso 4 | 1 | 0 | 4 | manter 15, estagnado 16, subir 1 | — | **anda** |
| Flexão de braço (peso do corpo, escada de dificuldade) | peso do corpo → peso do corpo | 0 | 0 | 4 | manter 16, estagnado 16 | — | **não sobe** |
| Remada com elástico (3 intensidades) | elástico → elástico | 0 | 0 | 4 | manter 16, estagnado 16 | — | **não sobe** |
| Panturrilha no chão, para quem não tem halteres (só elásticos) | peso do corpo · carga externa ou elástico mais forte → peso do corpo · carga externa ou elástico mais forte | 0 | 0 | 31 | manter 2, estagnado 30 | — | **trava** |
