# Relatório: família "puxar na polia" (remada baixa, remada unilateral na polia, abdominal na polia)

De 15/11/2026. Ramo: `worktree-agent-af893494d9b984a41`, a partir de `d538233`. Sem push, merge nem pull request. Os três exercícios ficaram prontos, na ordem pedida.

Commits:
- `a752a85` Lote 4: remada baixa com triângulo no motor novo (com o núcleo `exercicios/polia-puxar.ts`, as regras `regras/polia-puxar.ts` e o triângulo)
- `d9b90c3` Lote 4: remada unilateral na polia baixa no motor novo
- o último commit do ramo: Lote 7: abdominal na polia com corda (com este relatório; o hash dele está na resposta)

## 1. `remada-baixa` (conferência escrita: `lote-4/remada-baixa.md`)

- **Conferência automática (homem): 0 falha, 2 avisos.** Os avisos: as linhas de desenho da ficha de movimento; de três quartos o músculo principal quase não aparece (a vista padrão do modo Músculos é a de trás, 829 cm²).
- **O que ainda não ficou bom:**
  - No corpo da **mulher**, 2 falhas: no fim o cotovelo fica 2,4 cm à frente das costas e o antebraço entra 3 cm na cintura (no homem passa no limite: 0,6 cm atrás das costas, o antebraço encostando 0,3 cm). Tentei escápula mais para trás, mãos mais altas e mais baixas, cotovelo mais e menos aberto: no corpo dela as duas coisas não fecham juntas com as mãos encostando na barriga. Quadro: `quadros/remada-baixa.png`, `quina:tec:f1`.
  - **Sem a vista de lado.** De lado com a coluna inteira, o corpo sentado ficava com menos da metade da altura do quadro; com a coluna como cenário (o que `pecas.ts` já oferece), ela some de perfil. Fiquei com três quartos de frente e de trás, com a coluna como cenário.
  - A trajetória mostra só o cotovelo (com as mãos junto, um nome caía em cima do banco).
- **Risco de o Gustavo não gostar: médio.** A remada baixa costuma ser mostrada de perfil, e a mulher falha duas regras.
- **Peça nova:** o triângulo (`pecas-de-cena/triangulo-remada.ts`, medidas em `dados/objetos/triangulo-remada.json`: Rogue Grip Triangle). Não é o quadro em V do cartão de equipamento de hoje: nele a barra de baixo passaria entre os punhos.

## 2. `remada-unilateral-polia` (conferência escrita: `lote-4/remada-unilateral-polia.md`)

- **Conferência automática (homem): 0 falha, 2 avisos.** Os avisos: dorsiflexão do tornozelo de trás de 19,9° (média 14,8°, máximo observado 48°); as linhas de desenho. Mulher: 0 falha.
- **O que ainda não ficou bom:**
  - O corpo parado é o da remada sem banco, com dois números trocados: o peito a 50° (lá, 55°) e o joelho da frente a 40° (lá, 30°). Com 55°, para a mão chegar ao lado do quadril a roldana tinha de ficar a 25–30 cm do ombro, e a cabeça ficava em cima da coluna. Mesmo assim, a mão chega no limite (51,3% do caminho do ombro ao quadril; a regra pede 50%). O cotovelo passa das costas com 22° (lá, 26°).
  - O corpo é menor no quadro que nas remadas com halter (a coluna entra no enquadramento, como na puxada unilateral).
  - A dica "cotovelo para o quadril" ficou de fora (o fio atravessava as costas).
- **Risco de o Gustavo não gostar: médio.** O tronco menos inclinado que o da remada sem banco, e a mão no limite.

## 3. `abdominal-polia` (conferência escrita: `lote-7/abdominal-polia.md`)

- **Conferência automática (homem): 0 falha, 2 avisos.** Os avisos: flexão plantar de 80,7° (o peito do pé no colchonete, o mesmo aviso da puxada ajoelhada); as linhas de desenho. Mulher: 0 falha.
- **O que ainda não ficou bom:**
  - De lado, o nome da trajetória cai em cima da coluna (o enquadramento põe o nome entre o corpo e a coluna). Nos quadros usei a de três quartos, onde ele fica fora.
  - O corpo é pequeno no quadro, como na puxada ajoelhada.
  - O punho não dobra: a mão fecha na corda com o polegar para trás e a corda atravessa o punho reta até a bucha.
- **Risco de o Gustavo não gostar: médio.** O corpo pequeno e a trajetória de lado.

## Arquivos comuns mexidos

Só os três registros, uma linha por arquivo novo: `exercicios/registro.ts` (os três exercícios), `regras/registro.ts` (`REGRAS_POLIA_PUXAR`) e `dados/objetos/registro.ts` (`trianguloRemada`). Não mexi em `pecas.ts`, `equipamento.ts`, nos núcleos dos outros (`remada.ts`, `remada-sem-banco.ts`, `corda-triceps.ts`, `puxada-unilateral.ts`) nem no desenho do corpo: eles são importados como estão, sem campo novo. `npm run conferir:animacao` segue sem falha em todas as animações. Os arquivos gerais regenerados (`prototipos/conferencia.*`) foram desfeitos antes de cada commit.

Regras de outras famílias usadas pelo id (porque medem o que a ficha pede): `lombar-neutra`, `braco-estendido-no-comeco`, `cotovelo-rente-na-remada`, `cotovelo-passa-as-costas`, `carga-perto-do-quadril-no-fim`, `tronco-parado-na-remada`, `tronco-bem-inclinado`, `pe-da-carga-atras`, `mao-de-apoio-na-coxa`, `mao-de-apoio-parada`, `escapulas-se-juntam`, `palmas-uma-para-a-outra`, `triceps-frances-corda-na-mao`, `triceps-frances-corda-livre-da-cabeca`.

## Medidas provisórias

- Triângulo: a profundidade da linha das pegadas à ponta (15,9 cm; a PRx dá 5 × 7,25 × 6,25 pol sem dizer qual é qual) e o diâmetro do pino da ponta (1,6 cm). As pegadas (7 pol, 1,31 pol de diâmetro, 6 pol entre os centros) e as chapas (0,25 pol) vêm da página da Rogue.
- As linhas `desenho` das três fichas de movimento (a conferência lista cada uma): na remada baixa, o banco, a largura dos pés, o joelho, a altura das mãos (19 cm acima do quadril), a distância da coluna (45 cm da ponta do triângulo), para onde o cotovelo aponta; na unilateral, o tronco a 50°, o joelho da frente a 40°, a roldana a 42 cm à frente do ombro; no abdominal, a folga da coluna (18 cm da cabeça, que deu 77 cm dos joelhos à base) e o pescoço.
- As que já eram provisórias na tabela e entram aqui: o estribo (altura até o elo), a coluna (largura, placas), o colchonete e as pontas da corda.

Observação: o `npm run check` passou a lint e os tipos; nos testes, um teste do domínio (`tests/unit/equipamento-minimo.test.ts`) estourou o tempo de 5 s com a máquina carregada e passou sozinho (15 de 15). Nada nele toca o motor de animação.
