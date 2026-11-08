# Mapa da cobertura (auditoria do treino)

> Gerado por `npm run auditoria:base`. Quantos exercícios são possíveis em cada cenário fictício (`scripts/auditoria/cenarios.ts`), para o nível avançado (sem limite de complexidade) e sem dor. **0** = nenhum; **1** = depende de um exercício só.

## Por músculo (exercícios com o músculo como principal)

| cenário | peito | costas | ombro (lateral) | ombro (posterior) | bíceps | tríceps | quadríceps | posteriores da coxa | glúteos | panturrilha | abdômen | adutores |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| casa | 6 | 6 | 5 | 5 | 5 | 7 | 10 | 6 | 5 | 3 | 2 | **1** |
| casa+ | 10 | 13 | 6 | 9 | 9 | 9 | 16 | 10 | 12 | 5 | 5 | 2 |
| condominio | 8 | 6 | 3 | 4 | 5 | 5 | 9 | 5 | 4 | 3 | 3 | **1** |
| condominio+ | 12 | 15 | 6 | 7 | 9 | 8 | 16 | 11 | 13 | 5 | 5 | 2 |
| academia | 18 | 17 | 4 | 6 | 10 | 12 | 15 | 9 | 10 | 8 | 6 | 2 |
| academia+ | 20 | 23 | 7 | 12 | 14 | 16 | 22 | 15 | 19 | 8 | 9 | 3 |
| peso-corpo | 3 | **0** | **0** | **1** | **0** | 2 | 4 | 2 | 2 | 2 | 2 | **1** |
| elasticos | 5 | 4 | 2 | 3 | 2 | 4 | 6 | 4 | 4 | 2 | 2 | **1** |
| halteres | 4 | 2 | 3 | 3 | 3 | 5 | 8 | 4 | 3 | 3 | 2 | **1** |
| halteres-banco | 6 | 3 | 3 | 3 | 3 | 5 | 9 | 4 | 3 | 3 | 2 | **1** |
| diego | 5 | 7 | 2 | 3 | 2 | 4 | 6 | 4 | 4 | 2 | 3 | **1** |
| bruno | 14 | 16 | 6 | 8 | 9 | 11 | 11 | 9 | 7 | 5 | 6 | **1** |
| bairro | 9 | 7 | 3 | 4 | 5 | 6 | 11 | 5 | 3 | 4 | 4 | **1** |

## Por função (a vaga do gerador)

Quantos exercícios da função são possíveis (somando os níveis).

| cenário | empurrar-horizontal | empurrar-inclinado | crucifixo | puxar-vertical | puxar-horizontal | empurrar-vertical | elevacao-lateral | ombro-posterior | biceps | triceps-acima-cabeca | triceps-complemento | agachar | afundo | extensora | flexao-joelho | dobrar-quadril | extensao-quadril | abducao | aducao | panturrilha-em-pe | panturrilha-sentada | abdomen |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| casa | 4 | 4 | **1** | 3 | 5 | 4 | 5 | 5 | 5 | 4 | 3 | 4 | 5 | **1** | 3 | 3 | 3 | 2 | **1** | 2 | **1** | 2 |
| casa+ | 5 | 8 | 3 | 9 | 9 | 6 | 6 | 9 | 9 | 6 | 4 | 6 | 8 | 3 | 5 | 5 | 6 | 6 | 2 | 4 | **1** | 5 |
| condominio | 4 | 7 | 2 | 4 | 5 | 4 | 3 | 4 | 5 | 3 | 2 | 4 | 6 | **0** | 3 | 2 | 3 | **1** | **1** | 2 | **1** | 3 |
| condominio+ | 6 | 10 | 4 | 9 | 10 | 6 | 6 | 7 | 9 | 5 | 3 | 6 | 7 | 4 | 5 | 6 | 7 | 6 | 2 | 4 | **1** | 5 |
| academia | 10 | 15 | 5 | 11 | 10 | 6 | 4 | 6 | 10 | 6 | 6 | 9 | 6 | **1** | 4 | 5 | 6 | 3 | 2 | 6 | 2 | 6 |
| academia+ | 11 | 16 | 6 | 14 | 15 | 8 | 7 | 12 | 14 | 9 | 8 | 11 | 8 | 4 | 7 | 8 | 10 | 8 | 3 | 6 | 2 | 9 |
| peso-corpo | 2 | 2 | **0** | **0** | **0** | **1** | **0** | **1** | **0** | **1** | **1** | **1** | 3 | **0** | 2 | **0** | **1** | **1** | **1** | 2 | **0** | 2 |
| elasticos | 3 | 3 | **1** | **1** | 3 | 2 | 2 | 3 | 2 | 2 | 2 | 2 | 3 | **1** | 3 | **1** | 2 | 2 | **1** | 2 | **0** | 2 |
| halteres | 3 | 3 | **0** | 2 | 2 | 3 | 3 | 3 | 3 | 3 | 2 | 3 | 5 | **0** | 2 | 2 | 2 | **1** | **1** | 2 | **1** | 2 |
| halteres-banco | 4 | 5 | **1** | 3 | 3 | 3 | 3 | 3 | 3 | 3 | 2 | 4 | 6 | **0** | 2 | 2 | 2 | **1** | **1** | 2 | **1** | 2 |
| diego | 3 | 3 | **1** | 4 | 3 | 2 | 2 | 3 | 2 | 2 | 2 | 2 | 3 | **1** | 3 | **1** | 2 | 2 | **1** | 2 | **0** | 3 |
| bruno | 6 | 12 | 5 | 9 | 10 | 5 | 6 | 8 | 9 | 6 | 5 | 5 | 6 | **1** | 4 | 5 | 5 | 2 | **1** | 4 | **1** | 6 |
| bairro | 5 | 7 | 2 | 6 | 4 | 4 | 3 | 4 | 5 | 3 | 3 | 5 | 6 | **1** | 3 | 2 | 2 | **1** | **1** | 3 | **1** | 4 |

## Cenários

- **casa**: Casa com halteres e elásticos (atalho).
- **casa+**: Casa + os "às vezes tem" (banco, barra fixa, kettlebell, suspensão, step, bola, caneleiras, mini-band, roda).
- **condominio**: Condomínio com multifuncional (atalho: puxador e remada).
- **condominio+**: Condomínio + os "às vezes tem" e o multifuncional com todas as estações.
- **academia**: Academia completa (atalho).
- **academia+**: Academia completa + kettlebell, elásticos, bola, suspensão, caneleiras, mini-band e roda (a Carla).
- **peso-corpo**: Só o peso do corpo (nada marcado).
- **elasticos**: Só elásticos.
- **halteres**: Só halteres (2 a 20 kg), sem banco.
- **halteres-banco**: Halteres de 1 a 12 kg e banco reto (a Ana).
- **diego**: Elásticos e barra fixa de porta (o Diego).
- **bruno**: Prédio com polia dupla, halteres e banco regulável (o Bruno).
- **bairro**: Academia do bairro sem polia (2º local do Bruno).
