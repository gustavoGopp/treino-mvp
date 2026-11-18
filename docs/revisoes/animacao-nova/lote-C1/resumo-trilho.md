# Lote C1 · Grupo "trilho": leg press 45°, panturrilha no leg press e hack

De 18/11/2026. Duas peças novas (o leg press 45° e o hack) e três animações (`leg-press`, `panturrilha-leg-press`, `hack`), que até aqui eram cartão de texto. Nada entra no app sem quem integra registrar a aprovação.

## As peças

| Peça | Arquivos | Medida (fonte) | De desenho ou derivada do corpo |
|---|---|---|---|
| Leg press 45° | `pecas-de-cena/leg-press.ts`, `dados/objetos/leg-press.json`, folha `docs/revisoes/animacoes-restantes/pecas/folha-leg-press.png` | 176 × 130 × 145 cm (Hammer Strength PL-LP, catálogo 2024; desenhada com 181 × 130 × 140); guias a 45° (nome dos aparelhos; página da Hammer Strength HSLLP); guia de 40 mm, tubo 100 × 50 mm, pegadores de 38 mm, 4 pinos de guardar (Gym Gear Elite, ficha PDF); carro de 75,7 kg, batente de baixo regulável e trava (Magnum MG-PL70, ficha PDF) | encosto a 40° do chão, altura do assento (36 cm), linha da chapa, onde a trava apoia, comprimento dos pinos: derivados do corpo da tabela (com o motivo); assento a 10°, chapa 10° mais em pé que a perpendicular à guia, 72 cm de chapa, 50 cm de estofado: do cartão de hoje |
| Hack | `pecas-de-cena/hack.ts`, `dados/objetos/hack.json`, folha `.../pecas/folha-hack.png` | 216 × 155 × 153 cm (Hammer Strength PL-HSQ, catálogo 2024; desenhada com 218 × 155 × 153); carro a 45°, 57 kg, trava de duas posições, 4 pinos de guardar, 8 anilhas por lado, a chapa que regula 8° (página pública da PL-HSQ2 no distribuidor da Life Fitness; a página americana confirma os 45°) | o ângulo da chapa (15°, do cartão de hoje: a página não dá), onde a chapa fica em relação ao encosto (derivado do corpo), as almofadas dos ombros (derivadas do corpo), guias a 70 cm e pinos de 38 cm (fecham a largura da ficha), alto das guias a 128 cm (fecha o comprimento) |

As duas peças funcionam: o carro só anda nas guias; a alavanca da trava, presa no carro, fecha sobre o suporte da estrutura ou gira e solta o carro; no leg press, os batentes de baixo ficam parados na guia. Na cena, o lado de perto vai para trás do corpo, como cenário (o mesmo corte do smith aprovado), e o quadro corta o chão e o pé da estrutura.

## As animações

| Id | Conferência automática | Erros desenhados | Sem desenho | Risco |
|---|---|---|---|---|
| `leg-press` | 0 falhas, 3 avisos (dorsiflexão 34,6° embaixo; provisórios; de cima o músculo principal some embaixo) | os quatro do cartão | — | médio |
| `panturrilha-leg-press` | 0 falhas, 2 avisos (dorsiflexão 18,8°, a mesma da panturrilha no step aprovada; provisórios) | Movimento curto, Dobrar os joelhos | Quicar embaixo (só ritmo) | médio |
| `hack` | 0 falhas, 2 avisos (provisórios; de frente o músculo principal some embaixo) | os quatro do cartão | — | médio |

Conferências escritas: `leg-press.md`, `panturrilha-leg-press.md`, `hack.md` nesta pasta. Quadros: `docs/revisoes/animacao-nova/quadros/<id>.png`.

## Mudanças em arquivo comum

- `src/engine/novo/esqueleto.ts`: o pé apoiado (`pe`) ganha o campo opcional `normal` (a normal da superfície em que o pé apoia; por omissão, o chão `[0, 1, 0]`, com o mesmo cálculo de antes). Sem ele, o pé não apoia chapado numa chapa inclinada (o leg press, o hack). O preparo das animações aprovadas não mudou (o `preparo.mjs` só acrescentou os três arquivos novos e as linhas no registro).
- `scripts/animacao-nova/folha-pecas.mjs`: as seções `leg-press` e `hack`.
- Uma linha em cada registro (`exercicios/registro.ts`, `regras/registro.ts`, `dados/objetos/registro.ts`) e o `dados/preparo/registro.ts` regravado.

## O que fica para quem integra

- A exceção "Quicar embaixo" (`panturrilha-leg-press`) na lista `SEM_DESENHO` do teste da ponte.
- As medidas de desenho das duas peças (em amarelo nas folhas), sobretudo o ângulo da chapa do hack e o do encosto do leg press, que nenhuma ficha pública lida dá.
