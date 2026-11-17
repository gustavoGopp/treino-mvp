# Lote A4 · Resumo dos três sentados na ponta da cadeira

De 17/11/2026. Primeira animação de três exercícios que eram cartão de texto, todos sentados na ponta da cadeira firme (a da extensão de joelho com caneleira aprovada, encostada na parede): o crucifixo invertido sentado com halteres, o mesmo com caneleira presa no punho e a rosca concentrada. Um commit por exercício; nenhum ainda aprovado nem ligado ao app.

| Exercício | Conferência automática | Vistas (a que abre primeiro) | Erros desenhados | Risco de o Gustavo não gostar |
|---|---|---|---|---|
| `crucifixo-invertido-sentado` | 0 falha, 2 avisos (quadril 144,8°; linhas de desenho) | três quartos de trás, de cima | os três | médio |
| `crucifixo-invertido-caneleira` | 0 falha, 2 avisos (os mesmos) | três quartos de trás, de cima | 2 de 3 ("Parar longe da falha" fica fora: só esforço) | médio-alto |
| `rosca-concentrada` | 0 falha, 3 avisos (quadril 136°; linhas de desenho; antebraço "só ajuda", como nas roscas aprovadas) | de frente, de lado | os três | médio |

Conferências escritas: `crucifixo-invertido-sentado.md`, `crucifixo-invertido-caneleira.md`, `rosca-concentrada.md` (nesta pasta). Quadros: `../quadros/<id>.png`.

## O que é novo e comum

- `src/engine/novo/exercicios/sentado-na-ponta.ts`: sentado na ponta da cadeira com o tronco inclinado. Calibra a altura da bacia (o glúteo no assento) e o lugar dos pés (o joelho no ângulo da ficha) com a bacia já inclinada; a calibração de `quadril-sentado-na-cadeira.ts` é feita com o tronco reto. Mede quanto uma parte do corpo entra noutra (`entraNasPartes`, a conta do `entraNoTronco` de `polia-puxar.ts` para quaisquer partes) e o contato entre duas partes (positivo = amassa; negativo = distância).
- `src/engine/novo/exercicios/crucifixo-invertido-sentado-base.ts`: o núcleo dos dois crucifixos. A inclinação do tronco sai da medida "o peito amassa 1 cm a metade de baixo das coxas"; o começo do braço sai da medida "a carga 2 cm acima do chão". A caneleira entra no lugar do halter em quatro pontos (a mão relaxada; `caneleiraNoAntebraco` no lugar de `halterNaMao`; a carga no centro da faixa; o ponto mais baixo passa a ser a ponta dos dedos).
- Regras novas: `regras/sentado-na-ponta.ts` (sentado na ponta; peito nas coxas; pescoço na linha das costas; braços pendurados; halteres atrás das panturrilhas; caneleira presa no punho; carga livre; braços livres das pernas) e `regras/rosca-concentrada.ts` (braço na coxa, medido na pele como na rosca Scott; halter perto do ombro; a outra mão na outra coxa).
- **Nenhum arquivo comum mudou**: a cadeira, a caneleira, `quadril-sentado-na-cadeira.ts`, `dobrar-o-cotovelo.ts` e `na-fita.ts` só são importados. O preparo das animações aprovadas não mudou (só entram os três arquivos novos e o `dados/preparo/registro.ts`, que é gerado).

## O que pesa no risco

- **Os crucifixos começam com os braços abertos** (23,3° com halteres, 31,9° com caneleira). Com o peito nas coxas o ombro fica a 66,6 cm do chão e o braço pendurado na vertical levaria o halter (ou a ponta dos dedos) ao chão. A regra do crucifixo inverso ("até 15° da vertical") não serve; a regra nova pede a carga o mais baixo que o chão deixa (2 cm dele) e mostra o ângulo. É a geometria do corpo da tabela na cadeira de 45 cm, mas o quadro do começo pode parecer "já abrindo", sobretudo com a caneleira.
- **A flexão do quadril passa da média da tabela** nos crucifixos (144,8°; máximo observado 159°), para o peito encostar nas coxas sem arredondar mais as costas (a coluna dobra 15° + 15°).
- **A cadeira é cenário** e, de três quartos de trás, é pintada atrás do corpo, embora esteja na frente; lê-se como "sentado na ponta".
- **Na rosca**, o halter chega a 1,4 cm do rosto no alto: o pescoço fica estendido 25° (o olhar ao chão à frente, não ao braço) e o cotovelo para em 125°. De lado, o halter embaixo é pintado por cima da canela, embora esteja atrás dela.
- "Parar longe da falha" (caneleira) não foi desenhado: é só esforço, sem consequência visível; quem integra põe a exceção em `SEM_DESENHO` do teste da ponte.

## Testes

`npm run check`: lint e tipos passam; nos testes, falham só os dois esperados na cópia de trabalho (`tests/unit/motor-novo-ponte.test.ts`: "todas as animações estão aprovadas e no catálogo" e os títulos dos erros do `crucifixo-invertido-caneleira`, por causa do "Parar longe da falha" fora do desenho). `node scripts/animacao-nova/preparo.mjs conferir`: as tabelas conferem.
