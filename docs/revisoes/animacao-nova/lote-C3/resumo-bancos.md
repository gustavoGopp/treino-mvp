# Lote C3 · Resumo do grupo "bancos" (banco Scott, banco romano, banco declinado)

De 18/11/2026. Três peças novas e três animações de exercícios que eram cartão de texto. Commit-base `5a96e30`; um commit por peça e um por exercício. **Nenhuma ainda aprovada nem ligada às telas** (quem integra registra em `aprovados.ts` e no catálogo do guia; o teste da ponte que cobra isso falha na cópia de trabalho, como esperado).

| Peça | Folha | Exercício | Conferência | Erros desenhados | Risco |
|---|---|---|---|---|---|
| Banco Scott (`pecas-de-cena/banco-scott.ts`) | `animacoes-restantes/pecas/folha-banco-scott.png` | `rosca-scott` (barra W) | 0 falhas, 2 avisos | os 3 | médio |
| Banco romano a 45° (`pecas-de-cena/banco-romano.ts`) | `folha-banco-romano.png` | `hiperextensao` | 0 falhas, 1 aviso | 2 de 3 ("embalar" é só ritmo) | médio |
| Banco declinado (`pecas-de-cena/banco-declinado.ts`) | `folha-banco-declinado.png` | `abdominal-declinado` | 0 falhas, 1 aviso | os 3 | médio |

Conferências escritas: `rosca-scott.md`, `hiperextensao.md`, `abdominal-declinado.md` (nesta pasta). Quadros: `../quadros/<id>.png`.

## As peças: o que tem fonte e o que é de desenho

- **Banco Scott** (Deltech DF308, página pública): a almofada a 45°, 61 × 30,5 × 5 cm; o assento 23 × 30,5 × 5 cm; a regulagem da almofada (84 a 109 cm) e do assento (47 a 62 cm); 102 × 75 cm. Para comparar: Precor DBR0202, Life Fitness LBR-BC, Hammer Strength FW-AC. De desenho: a distância do assento à almofada (9 cm, do corpo da tabela), o poste de viés (o pé a 54 cm da borda), os ganchos da barra. Na rosca, a almofada fica a 100,5 cm e o assento a 50 cm (dentro da faixa).
- **Banco romano** (Body-Solid GHYP345, página pública; viga da Bench Fitness REVOLVE): 45°, 130 × 73 × 91 cm, almofadas de 3 pol, regulagem da chapa ao alto das almofadas de 89 a 112 cm; viga de 75 mm. De desenho, como no cartão de hoje: as almofadas (30 × 19,5 cm, duas), a chapa, os rolos (10 cm), a altura da viga. **A hiperextensão usa 83,6 cm, 5,4 cm abaixo do mínimo da Body-Solid** (com o corpo da tabela, no mínimo da ficha a barriga entraria 3,6 cm nas almofadas embaixo).
- **Banco declinado** (Life Fitness LBR-DB, página pública e folha de especificações; largura do encosto da Hammer Strength FW-DB): 185 × 73 × 104 cm, o encosto de +10° a −30°, encosto de 29,2 cm de largura. De desenho: o comprimento do encosto (100 cm), a altura da ponta (62 cm), os rolos e onde ficam (do corpo da tabela). **Não havia cartão de hoje** (no app ele é o banco regulável com "declina"); o banco regulável aprovado (Rogue AB-3) não declina nem prende as pernas, então não serviu com uma opção nova.

## Erro não desenhado

- `hiperextensao`, "Embalar" ("subir com impulso"): só ritmo; a única consequência visível (passar da linha em cima) já é o erro 1. Fica para a lista `SEM_DESENHO`.

## Mudança em arquivo comum

Nenhuma no motor. Só as linhas nos três registros e os blocos novos de `scripts/animacao-nova/folha-pecas.mjs` (as três folhas). Os núcleos e peças aprovados (barra W, abdominais, regras das roscas, da barra W e dos abdominais) são usados como estão.

## O que não ficou bom (resumo)

- Rosca Scott: o tríceps amassa a almofada 0,4 cm (pedido 1); de lado, em cima, a anilha de perto cobre o queixo (como na rosca com barra W aprovada).
- Hiperextensão: a regulagem fora da faixa da Body-Solid (acima); o corpo médio no quadro de lado.
- Abdominal declinado: a peça mais curta que a da ficha (143 × 185 cm); de lado, a chapa dos rolos passa na frente da canela; as coxas quase em pé.
