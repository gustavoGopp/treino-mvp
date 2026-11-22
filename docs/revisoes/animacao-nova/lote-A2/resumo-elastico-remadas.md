# Lote A2 · Resumo: as duas remadas com elástico pisado e a abdução em pé com elástico

De 17/11/2026. Três animações novas no motor novo, todas com elástico, em pé. As três eram cartão de texto; nenhuma está aprovada nem ligada às telas (quem integra registra em `aprovados.ts` e no catálogo do guia). Conferências escritas: `remada-curvada-elastico.md`, `remada-unilateral-elastico.md`, `abducao-elastico.md`; quadros grandes em `../quadros/<id>.png`.

| Exercício | Conferência automática | Erros desenhados | Erros fora | Risco de o Gustavo não gostar |
|---|---|---|---|---|
| `remada-curvada-elastico` | 0 falha, 3 avisos (elástico mais esticado no fim que no começo, como as remadas com elástico aprovadas; linhas de desenho; de lado o principal aparece pouco, o modo Músculos abre de três quartos de trás) | Arredondar as costas; Subir o tronco; Pisar só com a ponta do pé | nenhum | baixo |
| `remada-unilateral-elastico` | 0 falha, 3 avisos (dorsiflexão de 17,8° no pé de trás, a mesma da sem banco aprovada; elástico mais esticado no fim; linhas de desenho) | Girar o tronco; Arredondar as costas; Pisar só com a ponta do pé | nenhum | médio |
| `abducao-elastico` | 0 falha, 3 avisos (elástico mais esticado no fim; linhas de desenho; de frente o glúteo não aparece, o modo Músculos abre de trás) | Inclinar o tronco; Girar o pé para fora | **Balançar a perna** (a descrição do cartão é só ritmo, sem consequência visível): vai para `SEM_DESENHO` | médio |

## O elástico fecha a conta

- **Curvada:** o tubo da tabela (48 pol, estica até 3 vezes) pisado no meio pelos dois pés ficava frouxo com os braços estendidos (0,9 vez). Com uma volta em cada mão ("segure curto", como a remada sentada e o stiff com elástico aprovados), vai de 1,3 a 1,7 vez; no pior erro, 1,9.
- **Unilateral:** o mesmo tubo, pisado no meio pelo pé da frente e dobrado, com os dois pegadores na mão direita: de 1,0 a 1,4 vez (no pior erro, 1,6), sem volta na mão.
- **Abdução:** o laço longo de 41 pol (estica até 2,5 vezes), pisado pelo pé de dentro: só o trecho do pé ao tornozelo estica (objeto novo `elasticoLongoPisado`, 47 cm em repouso, escolha de desenho), de 1,0 a 2,0 vezes; no erro de inclinar, 2,4. O resto do laço fica sob a sola e deitado no chão.

## Mudanças fora dos arquivos dos exercícios

- `exercicios/remada.ts` (núcleo das remadas): opção aditiva `carga: 'elastico'` (a mão fecha no pegador do tubo; nenhuma carga desenhada nem peso no equilíbrio). O preparo das outras remadas não mudou.
- Novos: `exercicios/elastico-pisado.ts` (o tubo pisado: bordas da sola, volta na mão, trecho até o pé), `regras/abducao-em-pe.ts` (5 regras com nome próprio), `pecas-de-cena/parede-ao-lado.ts` (a parede da panturrilha em pé, de lado), `dados/objetos/elastico-longo-pisado.json`. Uma linha em cada registro (`exercicios`, `regras`, `dados/objetos`).
- O teste da ponte falha na cópia de trabalho em dois pontos esperados: "todas as animações estão aprovadas e no catálogo" (as três novas) e "os erros têm os títulos do app" (a abdução sem "Balançar a perna", até quem integra pôr a exceção em `SEM_DESENHO`).

## O que mais pode incomodar

- **Unilateral:** os dois pegadores juntos numa mão é leitura minha do cartão ("pisando no meio" + "a ponta do elástico na mão"); tirei o rótulo "cotovelo para trás" porque o fio atravessava as costas nas duas vistas.
- **Abdução:** o joelho de fora dobra 8,7° para o pé não raspar no chão embaixo; a sobra do laço aparece como uma linha no chão até perto da parede; a amplitude de 25° é escolha de desenho (a ficha só diz "sobe pouco").
- **Nas duas remadas,** o erro "pisar só com a ponta do pé" mostra a pose (calcanhar no ar, tubo na ponta dos dedos), não o elástico escapando.
