# Progressão com os saltos reais de cada equipamento (praticante simulado)

> Gerado por `npm run auditoria:progressao`. A sugestão é a do app; o corpo é um modelo (Epley invertida, +1% de força por semana, 3 séries, 32 sessões em 16 semanas), descrito no topo de `scripts/auditoria/progressao.ts`. Serve para achar travas e vaivéns, não para prever ganho de ninguém.

| caso | começo → fim | subidas | voltas | maior trava (sessões) | ações | carga que não existe | veredito |
| --- | --- | ---: | ---: | ---: | --- | --- | --- |
| Supino com halteres fixos de 1 a 12 kg, de 1 em 1 kg | 11 kg → 12 kg | 1 | 0 | 24 | manter 14, estagnado 17, subir 1 | — | **trava** |
| Supino com halteres fixos de 2 a 40 kg, de 2 em 2 kg | 18 kg → 22 kg | 6 | 5 | 15 | manter 11, estagnado 10, subir 6, voltar 5 | — | **vaivém** |
| Supino com só 2 pares de halteres (5 e 10 kg) | 5 kg → 5 kg | 16 | 16 | 1 | subir 16, voltar 16 | — | **vaivém** |
| Goblet com halteres montáveis de casa (2 a 18 kg) | 18 kg → 18 kg | 0 | 0 | 32 | manter 21, estagnado 11 | — | **trava** |
| Goblet com kettlebells de 8, 12 e 16 kg | 12 kg → 16 kg | 4 | 3 | 25 | manter 12, estagnado 13, subir 4, voltar 3 | — | **vaivém** |
| Agachamento com barra, menor anilha de 2 kg | 62,5 kg → 67,5 kg | 1 | 0 | 23 | manter 14, estagnado 17, subir 1 | 67,5 kg | **sugere carga que não existe** |
| Agachamento com barra, menor anilha de 5 kg | 62,5 kg → 67,5 kg | 1 | 0 | 23 | manter 14, estagnado 17, subir 1 | 67,5 kg | **sugere carga que não existe** |
| Rosca com barra W, anilhas de 1 kg | 22,5 kg → 27,5 kg | 6 | 5 | 20 | manter 10, estagnado 11, subir 6, voltar 5 | 27,5 kg, 22,5 kg, 27,5 kg | **sugere carga que não existe** |
| Leg press, menor anilha de 5 kg | 30 kg por lado → 40 kg por lado | 1 | 0 | 20 | manter 15, estagnado 16, subir 1 | — | **trava** |
| Cadeira extensora (torre de 15 placas) | placa 8 → placa 10 | 7 | 6 | 10 | manter 9, estagnado 10, subir 7, voltar 6 | — | **vaivém** |
| Elevação lateral na polia (torre de 15 placas) | placa 2 → placa 4 | 5 | 4 | 23 | manter 11, estagnado 12, subir 5, voltar 4 | — | **vaivém** |
| Barra fixa no graviton (contrapeso, 10 placas) | contrapeso 5 → contrapeso 3 | 5 | 4 | 14 | manter 11, estagnado 12, subir 5, voltar 4 | — | **vaivém** |
| Flexão de braço (peso do corpo, escada de dificuldade) | peso do corpo → peso do corpo | 0 | 0 | 32 | manter 16, estagnado 16 | — | **trava** |
| Remada com elástico (3 intensidades) | elástico → elástico | 0 | 0 | 32 | manter 16, estagnado 16 | — | **trava** |
| Panturrilha no chão, para quem não tem halteres (só elásticos) | 0 kg → 10 kg | 2 | 0 | 17 | manter 16, estagnado 14, subir 2 | 5 kg, 10 kg | **sugere carga que não existe** |
