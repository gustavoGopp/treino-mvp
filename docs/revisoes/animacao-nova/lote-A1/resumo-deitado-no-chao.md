# Lote A1 · Deitado no chão com halteres: resumo (supino no chão e tríceps testa)

De 17/11/2026. As duas primeiras animações destes exercícios (antes, só cartão de texto). Ambas deitado de costas num colchonete, joelhos dobrados, pés no chão, sobre um núcleo comum novo. Nenhuma está aprovada nem ligada às telas: quem integra registra em `aprovados.ts` e no catálogo do guia.

## O que foi feito

| | Supino no chão (`supino-chao-halteres`) | Tríceps testa (`triceps-testa-halteres`) |
|---|---|---|
| Conferência automática | 0 falha, 2 avisos (linhas de desenho; o modo Músculos abre de cima, como no supino reto) | 0 falha, 1 aviso (linhas de desenho) |
| Vistas | de lado e de cima | de lado e de três quartos |
| Erros desenhados | os 4 do cartão: quicar o cotovelo (de frente), cotovelos em "T" (de cima), perder o controle em cima (de lado), levantar o quadril (de lado) | os 3 do cartão: abrir os cotovelos (de cima), mexer os ombros (de lado), ir até a falha (de cima) |
| Erros não desenhados | nenhum | nenhum |
| Fim da descida | medido: a pele da parte de trás do braço encosta no chão (0 cm); o cotovelo dobra 98° | medido: a ponta do halter a 2 cm do colchonete; o cotovelo dobra 115° e o halter fica ao lado da testa, a 6 cm da cabeça |
| Conferência escrita | `supino-chao-halteres.md` | `triceps-testa-halteres.md` |
| Quadros grandes | `../quadros/supino-chao-halteres.png` | `../quadros/triceps-testa-halteres.png` |
| Risco de o Gustavo não gostar | baixo | médio |

O tríceps testa é no chão com colchonete (o cartão aceita o chão ou um banco), como o supino no chão.

## Arquivos

- Novos: `src/engine/novo/exercicios/deitado-no-chao-halteres.ts` (o núcleo: deitado no colchonete, pernas, colchonete na cena, medidas do braço e do halter contra o chão e a cabeça), `exercicios/supino-chao-halteres.ts`, `exercicios/triceps-testa-halteres.ts`, `dados/movimentos/<id>.json`, `dados/preparo/<id>.json`, `regras/deitado-no-chao.ts` (cinco regras com nomes próprios da família).
- Uma linha em cada registro: `exercicios/registro.ts` e `regras/registro.ts`. O `dados/preparo/registro.ts` é regravado pelo `preparo.mjs`.
- **Nenhum arquivo comum mudou** (corpo, desenho, cena, peças, núcleos dos outros, scripts). O núcleo usa `troncoDeCostas` e `folgaDaPelve` (flexões de joelho deitado) e `pernasDobradas` (abdominais) como estão.

## Pontos para quem integra

- `npm run check`: só falha o teste esperado (`tests/unit/motor-novo-ponte.test.ts`, "todas as animações estão aprovadas e no catálogo"), porque as duas ainda não foram aprovadas. `npm run conferir:animacao` sem falha em todas.
- Não há folha (`prototipos.mjs so-folhas` compara com a animação de hoje, que não existe).
- O modo Trajetória das duas mostra só o halter (ver as conferências escritas).
- O colchonete continua com as medidas provisórias da tabela (100 × 50 × 1,5 cm, sem fonte): os pés ficam fora dele, no chão.
