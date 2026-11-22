# Lote C2 · Resumo do grupo "estações" (as estações de polia com assento)

De 18/11/2026. Duas peças novas e duas animações novas, sobre o commit-base `d359889`. Nada aprovado nem ligado às telas: quem integra registra em `aprovados.ts` e no catálogo do guia (o teste da ponte que falha por isso é o esperado).

## Peças novas

| Peça | Arquivos | Folha |
|---|---|---|
| Estação de puxada (assento, rolos das coxas, torre com a pilha, braço de cima com a roldana) e barra longa de puxada (48 pol) | `pecas-de-cena/estacao-puxada.ts`, `pecas-de-cena/torre-da-estacao.ts`, `dados/objetos/estacao-puxada.json` | `docs/revisoes/animacoes-restantes/pecas/folha-estacao-puxada.png` |
| Estação de remada baixa (banco comprido, plataforma dos pés, polia baixa, torre com a pilha) | `pecas-de-cena/estacao-remada.ts`, `pecas-de-cena/torre-da-estacao.ts`, `dados/objetos/estacao-remada.json` | `docs/revisoes/animacoes-restantes/pecas/folha-estacao-remada.png` |

As duas torres saem do mesmo desenho (`torre-da-estacao.ts`, a partir da função `torre` do cartão de hoje). O triângulo, as roldanas (110 mm) e o cabo são os já aprovados.

**Medidas com fonte:**
- Estação de puxada: Life Fitness SS-PD 145 × 142 × 194 cm, Hammer Strength HS-PD 138 × 84 × 227, Movement 152,8 × 137,5 × 194,8 (as três do `pesquisa/04-objetos.md`, seção 13); **Spirit CSS-LATP 147 × 121 × 231, relação 1:1 e pilha de 17 placas** (ficha pública lida em 18/11).
- Barra longa de puxada: **Titan 48 in. Stainless Steel Lat Bar, 121,9 cm, 28 mm, trecho reto de 76,2 cm, 5,9 kg** (página pública lida em 18/11); Gym Gear 48".
- Estação de remada: Technogym Low Row MK80 142 × 118,5 × 137,5 cm (seção 13); **Nautilus Impact Low Row 228,6 × 72 × 218, relação 1:1** (ficha pública lida em 18/11); Bells of Steel: plataforma inclinada, 1:1 (página pública, sem medidas).

**De desenho (sem ficha), com o motivo na tabela:** a altura desenhada da estação de puxada (212 cm, entre 194 e 227); a altura do assento (45) e do banco (42); onde ficam os rolos das coxas e a roldana de cima; o ângulo das pontas da barra (25°); o ângulo da plataforma (22°, o do cartão de hoje); a posição da plataforma e a altura da polia baixa (do corpo da tabela); o tamanho das placas, dos estofados e da torre. **Provisórias:** a espessura das placas (2,5 cm, a da coluna de polia) e a aba e o mosquetão da barra (os da barra reta curta).

## Animações

| Id | Conferência | Erros desenhados | Vistas | Risco |
|---|---|---|---|---|
| `puxada-frente` | 0 falha, 2 avisos (linhas de desenho; o principal pouco visível de lado) | os três do cartão: atrás da nuca, tronco para trás, não estender | de lado; de três quartos por trás | médio |
| `remada-baixa-estacao` | 0 falha, 2 avisos (os mesmos dois tipos) | os três do cartão: balançar o tronco, arredondar a lombar, cotovelos abertos | de lado; de trás | baixo a médio |

Nenhum erro do cartão ficou sem desenho. A conferência escrita de cada uma está em `puxada-frente.md` e `remada-baixa-estacao.md`; os quadros grandes, em `../quadros/`.

## Mudança em arquivo comum

`conferir.ts` e `movimento.ts` (aditiva): a conferência da pilha lê a relação da máquina do objeto que o cabo declara (`fios: [{ id: 'cabo', ..., objeto }]`, o campo que já servia aos elásticos). Sem o campo, lê a da coluna de polia, como antes; nenhum cabo aprovado declara objeto, e o preparo das outras animações não mudou. Motivo: as duas estações têm relação 1:1 (Spirit, Nautilus), e a coluna de polia, 2:1.

`scripts/animacao-nova/folha-pecas.mjs`: duas seções novas (`estacao-puxada`, `estacao-remada`).

## Para quem integra

- `dados/preparo/registro.ts` foi regravado com os dois ids (arquivo gerado: regrave com `preparo.mjs` ao juntar).
- Os três registros ganharam linhas: duas no de exercícios, duas no de objetos e uma no de regras.
