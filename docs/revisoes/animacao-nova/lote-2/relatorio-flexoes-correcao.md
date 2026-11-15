# Lote 2 · Rodada de correção das flexões

De 15/11/2026. Ramo `worktree-agent-a355db8a2fe6a9372`, alinhado a `0eaa5b2` antes de começar. Cada exercício foi revisto contra a seção 8 do guia ("O padrão de qualidade") e o búlgaro aprovado, nos quadros grandes. Para cada exercício mexido, a folha, os quadros e a conferência escrita foram refeitos. Sem push.

## O que mudou

### `flexao-bola`: a mais fraca (`c6e9504`)
- **A pose foi refeita sobre `ponteDeCostas`**, do núcleo `exercicios/flexao-joelho.ts`, que não foi mexido: a deslizante e a com elástico seguem com 0 falha. Saíram as costas arredondadas 25°. As costas e a nuca ficam no chão (de −0,3 a 0,2 cm); a cabeça fica apoiada; o ombro não escorrega (0,2 cm). No começo, ombro, quadril e calcanhar ficam em linha (180°); no fim, ombro, quadril e joelho fazem 170,8°, com o joelho a 90°.
- **A bola foi redesenhada como o kettlebell:** gradiente radial na tela e brilho via `C.bruto`, igual em todas as vistas, com a costura discreta. A cor é a do estofado do banco, puxada 30% para o cinza. O gradiente antes ficava num grupo girado e não aparecia de lado. Com as pernas estendidas, o calcanhar apoia 7 cm atrás do alto da bola, e a panturrilha não entra mais nela.
- **A segunda vista agora é a de três quartos (`quina`).** Testei `cima`, `quina` e `quinaTras`: de cima, as pernas tapam o corpo; de três quartos por trás, o quadril tapa o tronco.

### `flexao-pes-elevados` (`497b5c9`)
- **O rosto não encosta mais no chão:** embaixo, ele fica a 5 cm (4,6 cm no erro do quadril). O pescoço estende conforme o corpo desce, de 16° a 50°, olhando o chão à frente das mãos; contra o chão, o rosto fica virado só uns 30° para a frente. Para isso o núcleo `flexionar.ts` ganhou um parâmetro opcional, `pescoco.extensaoEmbaixo`. A `flexao` saiu idêntica, comparada quadro a quadro.
- **O peito para a 8,5 cm do chão** (antes, 8,9). O que tentei está na conferência escrita.
- **As mãos embaixo:** conferi nos quadros grandes. O antebraço inclina para a frente porque a mão fica debaixo do ombro; com a mão 3 ou 5 cm mais para trás, o punho passa do máximo (96° e 98°).

### `flexao-fechada` (`4776bd8`)
- **O erro "cotovelos abertos" abre 72,5°** (antes, 51°), como o da `flexao`.
- **As vistas:** testei `quina`, `quinaTras` e `frontal`, e ficou a de cima, a que a ficha pede. De três quartos, os fios dos rótulos cruzavam o braço e o erro apontava para quem olha; de frente, o corpo virava um borrão.
- Os nove itens do padrão conferem.

### `flexao-elastico` (`2c2ee10`)
- **A vista padrão agora é a de três quartos por trás (`quinaTras`):** o elástico aparece atravessando as escápulas e descendo pelos braços, do começo ao fim. A de lado fica como segunda. Testei também `cima`, `quina` e `posterior`.
- **Saiu o pegador no chão:** ele se lia como um halter e, de três quartos, ficava pintado por cima da coxa.
- **O erro do pescoço não pinta mais o corpo:** só o elástico muda.
- **Os rótulos:** "elástico nas escápulas" de três quartos e "corpo em linha" de lado. Saiu "cotovelos para trás", cujo fio cruzava o corpo.

## O que ainda falha ou não ficou como a ficha pede (com o quadro)
- **`flexao-bola`:** no fim, o pescoço dobra 53°, com a cabeça apoiada (`quadros/flexao-bola.png`, `lateral:tec:f1`). É o que o próprio núcleo calcula para a nuca apoiar com ombros, quadril e joelhos em linha e os pés no alto de uma bola de 65 cm. Com a bola de 55 cm, o pescoço fica em 48°, e o tornozelo passa do máximo. **Risco médio.**
- **`flexao-pes-elevados`:** o peito para a 8,5 cm do chão, e não a 5 (`quadros/flexao-pes-elevados.png`, `lateral:tec:f1`). Com o rosto a 5 cm do chão, o corpo reto e os pés no banco de 43,5 cm, ele não desce mais sem o pescoço passar de 50°. Um degrau mais baixo resolveria, mas mudaria a inclinação aprovada em 10/11. **Risco médio.**
- **`flexao-elastico`:** a volta do tubo na mão não é desenhada (o motor não tem um tubo que contorne a mão). **Risco médio.**
- **`flexao-fechada`:** nada visível. As mãos ficam a 14 cm do ombro, e não a 16, por causa do limite do punho (não se vê no quadro). **Risco baixo.**

## Conferência
- 0 falha nas quatro e em todas as animações do registro (`npm run conferir:animacao`). Os arquivos gerais regenerados foram desfeitos antes de cada commit.
- `npm run check` (lint, tipos, testes) passa. Um teste do domínio (`tests/unit/equipamento-minimo.test.ts`, os 450 programas) falhou uma vez na execução completa antes do commit da bola e passou ao rodar sozinho e na execução completa seguinte. É o teste intermitente que o repositório já registrou, e não tem relação com o motor.

## Arquivos comuns mexidos
- `exercicios/flexionar.ts` (o núcleo das flexões, deste lote): o parâmetro opcional `pescoco.extensaoEmbaixo`. A `flexao` saiu idêntica.
- `regras/flexoes.ts` (deste lote): a regra `bola-costas-e-cabeca-no-chao`, o limite do rosto em `cabeca-livre-do-chao` passou para 5 cm, e saíram as duas regras que ninguém usava.
- Nenhum arquivo comum de outros (`flexao-joelho.ts`, `pecas.ts`, `equipamento.ts`, `conferir.ts`, `cena.ts`).

## Medidas provisórias
- O achatamento da bola (1,5 cm).
- As linhas de desenho das fichas, listadas pela conferência. As novas desta rodada:
  - `flexao-bola`: `ombro.z`, `bola.alemDoCalcanhar`.
  - `flexao-pes-elevados`: `pescoco.extensaoEmbaixo`.

## Commits
- `c6e9504`: `flexao-bola`.
- `497b5c9`: `flexao-pes-elevados`.
- `4776bd8`: `flexao-fechada`.
- `2c2ee10`: `flexao-elastico`.
- Este relatório vai no commit seguinte.
