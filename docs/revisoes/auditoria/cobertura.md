# Mapa da cobertura (auditoria do treino)

> Gerado por `npm run auditoria:base`. Quantos exercícios são possíveis em cada cenário fictício (`scripts/auditoria/cenarios.ts`), para o nível avançado (sem limite de complexidade) e sem dor. **0** = nenhum; **1** = depende de um exercício só.

## Por músculo (exercícios com o músculo como principal)

| cenário | peito | costas | ombro (lateral) | ombro (posterior) | bíceps | tríceps | quadríceps | posteriores da coxa | glúteos | panturrilha | abdômen | adutores |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| casa | 4 | 3 | 2 | 2 | 2 | 2 | 8 | 4 | 2 | **1** | **1** | **0** |
| casa+ | 7 | 8 | 2 | 3 | 3 | 2 | 10 | 5 | 2 | 3 | 2 | **0** |
| condominio | 5 | 5 | **1** | 2 | 2 | **1** | 8 | 3 | 2 | **1** | **1** | **0** |
| condominio+ | 9 | 10 | 2 | 3 | 4 | 2 | 11 | 7 | 3 | 3 | 2 | **0** |
| academia | 15 | 14 | 2 | 3 | 7 | 7 | 14 | 7 | 9 | 6 | 4 | **1** |
| academia+ | 17 | 17 | 3 | 5 | 8 | 8 | 16 | 10 | 9 | 6 | 5 | **1** |
| peso-corpo | **1** | **0** | **0** | **0** | **0** | **0** | 3 | **0** | **1** | **1** | **1** | **0** |
| elasticos | 3 | 2 | **1** | **1** | **1** | **1** | 4 | 2 | **1** | **1** | **1** | **0** |
| halteres | 2 | **1** | **1** | **1** | **1** | **1** | 7 | 2 | 2 | **1** | **1** | **0** |
| halteres-banco | 4 | 2 | **1** | **1** | **1** | **1** | 8 | 2 | 2 | **1** | **1** | **0** |
| diego | 3 | 4 | **1** | **1** | **1** | **1** | 4 | 2 | **1** | **1** | 2 | **0** |
| bruno | 11 | 11 | 3 | 4 | 5 | 5 | 9 | 7 | 3 | 3 | 4 | **0** |
| bairro | 6 | 5 | **1** | 2 | 2 | 2 | 10 | 3 | 2 | 2 | 2 | **0** |

## Por função (a vaga do gerador)

Quantos exercícios da função são possíveis (somando os níveis).

| cenário | empurrar-horizontal | empurrar-inclinado | crucifixo | puxar-vertical | puxar-horizontal | empurrar-vertical | elevacao-lateral | ombro-posterior | biceps | triceps-acima-cabeca | triceps-complemento | agachar | afundo | extensora | flexao-joelho | dobrar-quadril | extensao-quadril | abducao | aducao | panturrilha-em-pe | panturrilha-sentada | abdomen |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| casa | 3 | **1** | **1** | 2 | 2 | 2 | 2 | 2 | 2 | 2 | **0** | 4 | 4 | **0** | **1** | 3 | 2 | **0** | **0** | **1** | **0** | **1** |
| casa+ | 4 | 3 | 2 | 6 | 5 | 3 | 2 | 3 | 3 | 2 | **0** | 6 | 5 | **0** | 2 | 3 | 2 | **0** | **0** | 3 | **0** | 2 |
| condominio | 3 | 3 | **1** | 3 | 4 | 2 | **1** | 2 | 2 | **1** | **0** | 4 | 5 | **0** | **1** | 2 | 2 | **0** | **0** | **1** | **0** | **1** |
| condominio+ | 5 | 4 | 3 | 6 | 6 | 3 | 2 | 3 | 4 | 2 | **0** | 6 | 5 | **1** | 3 | 4 | 3 | **0** | **0** | 3 | **0** | 2 |
| academia | 9 | 7 | 4 | 9 | 8 | 4 | 2 | 3 | 7 | 3 | 4 | 9 | 5 | **1** | 2 | 5 | 6 | 2 | **1** | 5 | **1** | 4 |
| academia+ | 10 | 7 | 5 | 11 | 10 | 5 | 3 | 5 | 8 | 4 | 4 | 11 | 5 | **1** | 4 | 6 | 6 | 2 | **1** | 5 | **1** | 5 |
| peso-corpo | **1** | **1** | **0** | **0** | **0** | **0** | **0** | **0** | **0** | **0** | **0** | **1** | 2 | **0** | **0** | **0** | **1** | **0** | **0** | **1** | **0** | **1** |
| elasticos | 2 | **1** | **1** | **1** | **1** | **1** | **1** | **1** | **1** | **1** | **0** | 2 | 2 | **0** | **1** | **1** | **1** | **0** | **0** | **1** | **0** | **1** |
| halteres | 2 | **1** | **0** | **1** | **1** | **1** | **1** | **1** | **1** | **1** | **0** | 3 | 4 | **0** | **0** | 2 | 2 | **0** | **0** | **1** | **0** | **1** |
| halteres-banco | 3 | 2 | **1** | 2 | 2 | **1** | **1** | **1** | **1** | **1** | **0** | 4 | 5 | **0** | **0** | 2 | 2 | **0** | **0** | **1** | **0** | **1** |
| diego | 2 | **1** | **1** | 3 | **1** | **1** | **1** | **1** | **1** | **1** | **0** | 2 | 2 | **0** | **1** | **1** | **1** | **0** | **0** | **1** | **0** | 2 |
| bruno | 5 | 6 | 4 | 7 | 6 | 3 | 3 | 4 | 5 | 3 | 2 | 5 | 5 | **0** | 2 | 5 | 3 | **0** | **0** | 3 | **0** | 4 |
| bairro | 4 | 3 | **1** | 4 | 3 | 2 | **1** | 2 | 2 | **1** | **1** | 5 | 5 | **1** | **1** | 2 | 2 | **0** | **0** | 2 | **0** | 2 |

## Cenários

- **casa**: Casa com halteres e elásticos (atalho).
- **casa+**: Casa + os "às vezes tem" (banco, barra fixa, kettlebell, suspensão, step, bola).
- **condominio**: Condomínio com multifuncional (atalho: puxador e remada).
- **condominio+**: Condomínio + os "às vezes tem" e o multifuncional com todas as estações.
- **academia**: Academia completa (atalho).
- **academia+**: Academia completa + kettlebell, elásticos, bola e suspensão (a Carla).
- **peso-corpo**: Só o peso do corpo (nada marcado).
- **elasticos**: Só elásticos.
- **halteres**: Só halteres (2 a 20 kg), sem banco.
- **halteres-banco**: Halteres de 1 a 12 kg e banco reto (a Ana).
- **diego**: Elásticos e barra fixa de porta (o Diego).
- **bruno**: Prédio com polia dupla, halteres e banco regulável (o Bruno).
- **bairro**: Academia do bairro sem polia (2º local do Bruno).
