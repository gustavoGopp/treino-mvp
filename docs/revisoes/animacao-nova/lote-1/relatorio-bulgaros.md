# Relatório: búlgaro com o peso do corpo e búlgaro na suspensão (lote 1)

De 15/11/2026. Ramo `worktree-agent-a15bc4d7d642ac73d`, sobre `d28725f`. Commits: `041a2a6` (búlgaro com o peso do corpo, extensão do núcleo, cadeira e fita), `71eec93` (búlgaro na suspensão) e o deste relatório. Sem push, merge nem pull request.

O `bulgaro` aprovado não mudou: quadros (posições, peças, fios e marcas em 41 instantes, certo e erros) idênticos byte a byte antes e depois, e a folha `folha-bulgaro.png` regerada saiu idêntica. `npm run conferir:animacao`: 0 falha em todas as 14 animações. `npm run check` passa.

## `bulgaro-peso-corpo`

- **Conferência automática:** 0 falha, 3 avisos: extensão do quadril de trás a 25° (média 18,5°, máximo 42°; no aprovado, 22,7°); linhas de desenho na ficha (distâncias dos pés, iguais às do aprovado; altura das mãos); vista de frente não serve ao modo Músculos (padrão: de lado).
- **O que não ficou bom:** o joelho de trás fica a 5 cm do chão, e não a 4 como no aprovado: o assento (45,1 cm) é 1,6 cm mais alto que o banco, e com 4 cm a coxa da frente passava 15,2° abaixo da horizontal (falha); com 5 cm o quadril para na mesma altura do aprovado (41,6 cm). A cadeira não tem cartão de referência no app: desenho simples (tampo, pés, travessas, uma tábua no encosto), quase escondida de frente. A parede aparece só de lado, como faixa cinza na borda; o rótulo "cadeira na parede" de hoje saiu. O calcanhar do erro "pé perto da cadeira" (34°) vem da animação de hoje.
- **Risco de o Gustavo não gostar: baixo.** É o búlgaro aprovado com as mãos na cintura e a cadeira no lugar do banco; o único número que mudou (5 cm) não se vê.

## `bulgaro-suspensao`

- **Conferência automática:** 0 falha, 3 avisos: **flexão plantar do tornozelo de trás a 73° em cima** (média 57°, máximo 90°); linhas de desenho na ficha; vista de frente não serve ao modo Músculos. A fita mede 154,6 a 154,7 cm no ciclo (não estica; hoje variava 2,4 cm); o berço fica a 28,3 cm (meio da canela; fabricante: 20,3 a 30,5).
- **O que não ficou bom:** o pé fica deitado no berço com a inclinação do banco e não gira; como o berço é baixo, a canela de trás fica quase horizontal em cima e o tornozelo chega a 73° (o aviso). O pé de trás fica baixo (tornozelo a 32 cm): é o que a ficha pede, mas lê menos como búlgaro. A fita é uma só, no meio do pé, e cruza o tornozelo no desenho (de verdade os lados do berço sobem um de cada lado); o motor não mede a fita contra o corpo. Pegador e berço quase não aparecem de lado; de frente, a fita é uma faixa preta larga atrás da cabeça; no tema escuro ela quase some. O quadril para mais alto que no aprovado (47 cm contra 42), porque o pé de trás está mais baixo. O erro "empurrar" repete os números de hoje.
- **Risco de o Gustavo não gostar: médio.** A física da fita está certa e medida, mas o tornozelo de trás muito esticado, o pé baixo e a fita passando pelo tornozelo podem incomodar quem olha de perto.

## Arquivos comuns que mexi

- `src/engine/novo/exercicios/bulgaro-base.ts` (núcleo dos búlgaros; eu era o único nele): parâmetro novo e opcional `apoioDeTras: 'banco' | 'cadeira' | 'fita'` (padrão `'banco'`), opções novas e opcionais de `pose` (`tornozelo`, `quadrilZ`), o cálculo da fita (`fita`, `alcaNaFita`, `quadroNaFita`) e a cadeira no lugar do banco. O caminho do banco ficou como estava (conferido pelos quadros idênticos).
- Uma linha em cada registro: `exercicios/registro.ts` (duas), `regras/registro.ts` (uma), `dados/objetos/registro.ts` (duas).
- Nenhum outro arquivo comum. Os gerais regenerados (`prototipos/conferencia.*`) foram desfeitos antes de cada commit.

Arquivos novos: `pecas-de-cena/cadeira.ts` (cadeira e parede), `pecas-de-cena/suspensao.ts` (fita reutilizável: viga, fita de ancoragem, mosquetão, fita com fivela, pegador de mão e berço do pé; um ou dois pegadores; devolve o comprimento para `fios`; `alturaNaFita` para pendurar um pegador), `dados/objetos/cadeira.json`, `dados/objetos/suspensao.json`, `regras/bulgaros.ts`, as duas fichas, os dois exercícios, as duas conferências escritas, as folhas e os quadros.

## Medidas provisórias

- **Cadeira** (IKEA STEFAN, ficha pública: assento 45,1 cm, 41,9 × 37,1, altura 89,9, profundidade 48,9): espessura do tampo (3 cm) e lado dos pés (3,5 cm) provisórios.
- **Fita** (páginas da TRX: âncora a ~6 pés = 182,9 cm; berço a 8 a 12 pol do chão no meio da canela; fita de ancoragem de 2 pol): largura da fita (3,8 cm), mosquetão (10 cm), pegador (14 × 3,5 cm), berço do pé (9 cm de largura, 6 cm abaixo do pegador) provisórios (`a-conferir`). A viga do alto é só desenho. Uma das páginas (Six Procedures) é um PDF da TRX hospedado por uma universidade, não pelo fabricante.
- **Fichas de movimento** (selo `desenho`): onde o berço fica em relação à âncora (4 cm à frente em cima), quanto o pé anda (8 cm, de hoje), o raio de busca do ponto de apoio do peito do pé (10 cm), a altura das mãos (11 cm) e os números dos erros (de hoje).
