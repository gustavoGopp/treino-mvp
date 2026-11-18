# Lote C3 · Resumo do grupo "panturrilhas"

De 18/11/2026. Duas peças novas e duas animações novas no motor novo, sobre o commit-base `5a96e30`. Nada aprovado nem ligado às telas.

| Id | Conferência automática | Erros desenhados | Sem desenho | Risco |
|---|---|---|---|---|
| `panturrilha-em-pe-maquina` | 0 falha, 2 avisos (dorsiflexão 30,2°, a mesma da panturrilha no degrau aprovada; provisórios) | Subida e descida curtas; Dobrar os joelhos | **Quicar** (só ritmo: "sem pausa embaixo") | médio |
| `panturrilha-sentada` | 0 falha, 2 avisos (dorsiflexão 24,1°, a da panturrilha sentada com halter aprovada; provisórios) | Amplitude curta; Impulso com o quadril | nenhum | baixo a médio |

Conferências escritas: `panturrilha-em-pe-maquina.md` e `panturrilha-sentada.md`. Quadros grandes: `../quadros/<id>.png`. Folhas das peças: `docs/revisoes/animacoes-restantes/pecas/folha-panturrilha-em-pe.png` e `folha-panturrilha-sentada.png` (`node scripts/animacao-nova/folha-pecas.mjs panturrilha-em-pe|panturrilha-sentada`).

## As peças

**Panturrilha em pé** (`pecas-de-cena/panturrilha-em-pe.ts`, `dados/objetos/panturrilha-em-pe.json`). Medida: 148 × 114 × 183 cm (Hammer Strength HS-SC, página pública da Life Fitness Austrália). **Segunda ficha: Atlantis M118** (128 × 81,9 × 186,4 cm, pilha de 181 kg; "handgrips on shoulder mechanism and in front of user", "angled shoulder pads"). Nas fotos das duas, o braço das almofadas gira num eixo (no cartão de hoje, elas correm num carro na vertical): a peça segue as fotos. De desenho (cartão): o degrau de 16 cm (36 × 56), as almofadas (30 × 14 × 10), os montantes, a torre. Derivado do corpo: as almofadas a 34 cm de centro a centro (sobre o trapézio), o eixo a 169 cm do chão e 70 cm à frente da borda do degrau (as almofadas sobem quase na vertical). De desenho sem fonte: o braço de 72 cm, a travessa 28 cm à frente e 16 cm abaixo do meio das almofadas (passa na frente do pescoço, abaixo do queixo), os pegadores nas pontas dela, o came de 22 cm (como na flexora).

**Panturrilha sentada** (`pecas-de-cena/panturrilha-sentada.ts`, `dados/objetos/panturrilha-sentada.json`). Medida: 155 × 74 × 107 cm (Life Fitness SPLCALF); Hammer Strength PL-CALF (124 × 84 × 112 na página; o catálogo dá 137 de altura) e Atlantis M219 (158,1 × 119,5 × 98,4) como segunda e terceira. As três dizem que a almofada das coxas regula na altura e apoia em cima dos joelhos; a M219, que o pino é de anilha olímpica. De desenho (cartão): o apoio dos pés de 20 cm (18 × 36), o assento (36 × 34 × 9), a almofada (40 × 8), o pegador. Derivado do corpo: o assento a 58 cm, a borda dele 40 cm atrás do apoio (joelho a 90°), **o eixo na linha do centro do quadril** (66,7 cm do chão, 54,7 cm atrás do apoio), a almofada a 32 cm do eixo (9 cm atrás do joelho). De desenho sem fonte: a alavanca do lado de fora da coxa esquerda, o pino a 80 cm do eixo (depois dos pés, como na foto da M219), o batente.

## Mudanças em arquivo comum

Nenhuma no motor. Só as linhas nos três registros (`exercicios/registro.ts`, `regras/registro.ts`, `dados/objetos/registro.ts`), as duas seções novas em `scripts/animacao-nova/folha-pecas.mjs` (aditivas) e os arquivos de preparo dos dois ids (`dados/preparo/<id>.json` e a linha de cada um em `dados/preparo/registro.ts`). O núcleo `elevar-o-calcanhar.ts` e as regras das panturrilhas aprovadas são usados sem mudança.

## Para quem integra

- `SEM_DESENHO` do teste da ponte: `'panturrilha-em-pe-maquina': ['Quicar']`.
- Os dois ids entram em `aprovados.ts` e no catálogo (o teste "todas as animações estão aprovadas e no catálogo" falha nesta cópia, como esperado).
- `enquadra` não foi usado: de lado, o calcanhar abaixo da borda se lê com o corpo inteiro nas duas (na sentada, com folga; na em pé, com o pé do tamanho do da panturrilha no degrau aprovada).
