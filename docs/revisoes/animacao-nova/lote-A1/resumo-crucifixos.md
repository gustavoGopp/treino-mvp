# Lote A1 · Resumo: os dois crucifixos com halteres deitados

De 17/11/2026. Primeiras animações do crucifixo com halteres no banco plano (`crucifixo-halteres`) e do crucifixo inclinado com halteres (`crucifixo-inclinado-halteres`), que até aqui eram só cartão de texto. **Nenhuma das duas foi revista pelo Gustavo**; não estão em `aprovados.ts` nem no catálogo do guia (quem integra faz isso, e até lá o teste "todas as animações estão aprovadas e no catálogo" falha, como esperado).

Conferências escritas: `crucifixo-halteres.md` e `crucifixo-inclinado-halteres.md` (nesta pasta). Quadros grandes: `../quadros/crucifixo-halteres.png` e `../quadros/crucifixo-inclinado-halteres.png`. Sem folha ao lado da de hoje: não existe animação de hoje destes exercícios.

## O que foi feito

- **Núcleo comum** `src/engine/novo/exercicios/crucifixo-deitado.ts`: o braço gira em arco pela linha do ombro à pegada (`bracoNoArco`, do crucifixo na polia), com o cotovelo fixo a 25°, palmas uma para a outra; o topo é calculado pela folga entre os halteres (3 cm) e o fundo pela altura do cotovelo (2 cm abaixo do ombro, "na altura do tronco"). Os erros têm os mesmos ids nas duas fichas.
- **Banco plano**: o corpo deita como no supino reto aprovado, mas com a bacia e o pescoço resolvidos até costas, glúteo e nuca apoiarem (no supino reto as costas ficam 2,6 cm e a cabeça 7,7 cm acima do banco; a ficha do crucifixo pede escápulas encostadas).
- **Banco inclinado**: a mesma pessoa no mesmo banco a 30° do supino inclinado aprovado.
- **Regras medidas novas** em `src/engine/novo/regras/crucifixos.ts`: cotovelo fixo, arco (halter sempre à mesma distância do ombro), halteres acima do peito em cima, cotovelos na altura do tronco embaixo, corpo apoiado no banco reto.

## Resultado da conferência automática

| Exercício | Falhas | Avisos |
|---|---|---|
| `crucifixo-halteres` | 0 | 2: provisórios (posição no banco, pés, escápulas, direção do cotovelo, carga); a vista de três quartos não serve ao modo Músculos (o app usa a de cima, 460 cm²) |
| `crucifixo-inclinado-halteres` | 0 | 2: provisórios (direção do cotovelo, carga); a vista de três quartos não serve ao modo Músculos (o app usa a de cima, 455 cm²) |

`npm run conferir:animacao`: 0 falha nas 92 animações; `preparo.mjs conferir`: as tabelas conferem. `npm run check`: só a falha esperada do teste de aprovados e catálogo.

## Erros

- Banco plano: os quatro do cartão, na ordem dele (dobrar e esticar os cotovelos, descer demais, bater os halteres em cima, tirar as escápulas do banco).
- Inclinado: os três do cartão, na ordem dele (virar supino, descer demais, soltar as escápulas).
- Nenhum erro ficou de fora.

## Vistas

- Banco plano: três quartos (Técnica) e de cima (Músculos); os erros na frontal e de cima.
- Inclinado: três quartos (Técnica) e de cima (Músculos); dois erros em três quartos e o das escápulas de lado.
- A frontal e a de trás têm o maior caminho do halter (0,45 a 0,49 do palco), mas no banco plano mostram o corpo pelos pés ou pela cabeça, e no inclinado o encosto é pintado por cima do corpo no cor de pele (defeito daquela vista com o banco inclinado, que o supino inclinado aprovado também teria; não mexi no motor comum).

## Mudança em arquivo comum

- `src/engine/novo/exercicios/supino-inclinado.ts`: só exportação (`sentar` e `Sentado`), com comentário; não muda o que a animação desenha nem o preparo dela (`dados/preparo/supino-inclinado.json` igual).

## Riscos

- **Banco plano: médio.** A técnica confere em tudo e as vistas se leem, mas em três quartos o braço de perto aponta para quem olha (em cima a mão tapa o rosto; embaixo o halter fica por cima da ponta do banco) e o erro das escápulas é pequeno.
- **Inclinado: médio.** Mesmo motivo do de perto em três quartos; o erro "virar supino" se lê mais pelo braço de longe; a inclinação do braço em cima (8° da vertical) é escolha de desenho.
