# Recado para a sessão do R3 (uso real): o que o R5b muda (07/11/2026)

Este recado é do marco R5b, "o avaliador e o porquê" (`docs/prompts/sessao-r5b-avaliador.md`, `docs/revisoes/r5b/README.md`), no branch `claude/compassionate-curie-0nqhyc`. Ele **não mexeu** no branch `r3-uso-real`. A ida para a `main` espera o ok do Gustavo.

## O que entra na `main` (quando ele aprovar)
- **"Como está o seu programa"**: uma dobra nova na tela do treino, logo acima de "Sobre o programa", com o veredito do avaliador sobre o programa salvo ("Está bom: nada a ajustar", "Está bom dentro do que o seu equipamento, a dor ou o tempo permitem", "Dá para ajustar algumas coisas") e os achados agrupados, com o selo. Nada novo é guardado.
- **Os avisos do programa mudam de texto**: todos passam a dizer o que fazer, ou "não precisa fazer nada" (eram 2 de 20 nas personas). Alguns programas ganham 1 aviso novo (uma função só num músculo grande, a coxa fora do equilíbrio, mais empurrar que puxar, o isolador que faltou), quase sempre com 30 min por treino.
- **O "porquê" de cada exercício muda o 1º item**: passa a dizer a função, o músculo, se é o foco, as séries ali e na semana, e por que o exercício ganhou das outras opções.
- **A Semana** diz, ao lado do músculo, quanto o programa planeja quando fica abaixo da meta do nível ("o seu programa planeja 6 de 8: falta tempo").
- **3 correções do gerador** (o teto de 10 séries por treino conta as séries indiretas; o glúteo ganha a extensão de quadril quando o stiff não é possível; o dia com afundo não recebe outro afundo na vaga de agachar). Nas 6 personas, nenhum exercício nem série mudou.
- 5 regras novas e 4 revistas em `docs/pesquisa/regras.md` (146 no total).
- **Armazenamento:** nada muda (versão 7).

## O que isso faz no programa do Gustavo
- **Quase certamente só o texto.** As 3 correções mudam poucos programas (0,6%, 2,3% e 10% dos programas medidos na grade; nenhuma das 6 personas).
- **A faixa "Há uma versão nova do seu programa" vai aparecer**, mesmo que nenhum exercício mude: a comparação (`mesmoConteudo`) olha o programa inteiro, textos incluídos, e os avisos e o porquê mudaram. Tocar em "Atualizar" troca os textos (e, se for o caso dele, aplica as correções); nada do histórico muda. Vale dizer isso a ele antes.
- **Os textos mudam no meio do uso:** os avisos, o 1º item do porquê e a linha da Semana. Vale avisá-lo antes, para ele não estranhar, e perguntar depois se os textos novos ajudam (é o que o R5b pede a ele revisar).
- **Antes de abrir o app atualizado:** exportar os dados ("Meus dados" → "Guardar uma cópia"), como nas idas anteriores.

## Como o `r3-uso-real` recebe
1. Atualizar o `r3-uso-real` só quando o Gustavo pedir (rebase ou merge da `main`, sem forçar).
2. Antes de ele tocar em "Atualizar", mostrar o antes e o depois do programa dele.
3. O retorno dele sobre "Como está o seu programa" (o veredito ajuda? os limites "não precisa fazer nada" tranquilizam ou incomodam?) é o que mais vale para o marco seguinte, "Monte o seu treino" (`docs/prompts/sessao-monte-o-seu.md`).
