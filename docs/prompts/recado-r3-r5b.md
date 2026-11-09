# Recado para a sessão do R3 (uso real): o que o R5b (o avaliador e o porquê) muda (09/11/2026)

Este recado é do marco R5b (`docs/devlog.md`, "R5b"), no branch `claude/lucid-maxwell-sr3ewo`. Ele **não mexeu** no branch `r3-uso-real`. A ida para a `main` espera o ok do Gustavo.

## O que entra na `main` (quando ele aprovar)
- **"Como está o seu programa"**, dentro de "Sobre o programa": o app confere o programa salvo pelas mesmas regras do gerador e diz, em 1 linha, se está bom; embaixo, o que ajustar e o que é limite do equipamento ou do tempo, cada ponto com o selo e o próximo passo. Nada é guardado.
- **O porquê de cada exercício começa pelo específico**: a vaga, o músculo dela (e se é o foco dele), quantas séries da semana o exercício leva e por que ele ficou com a vaga.
- **Os avisos do programa dizem o próximo passo**, inclusive "não precisa fazer nada" quando a causa é o equipamento.
- **A semana mostra a meta do programa** quando ela fica abaixo da meta do nível: "o seu programa planeja 6 de 10: falta tempo".
- **Três ajustes do gerador**, depois dos cortes de tempo: o músculo grande com um movimento só, havendo outro, troca a vaga repetida pelo que falta (ou ganha um exercício onde há lugar); o isolador obrigatório que coube entra; e as séries de puxar sobem enquanto o empurrar passar de 1,5 vez o puxar.
- **Armazenamento:** nada muda. A versão do estado guardado continua a 7.

## O que isso faz no uso do Gustavo
- **A faixa "Há uma versão nova do seu programa" vai aparecer**, porque os textos do porquê e dos avisos mudaram (a comparação olha o programa inteiro, textos incluídos). Tocar em **Atualizar** traz os textos novos. Os exercícios e as séries só mudam se o programa dele cair num dos ajustes acima: em 4,9% dos programas da grade reduzida, quase todos de 30 min (com 60 min ou mais, 22 de 3.510). As 6 personas fictícias saíram idênticas.
- **O porquê do exercício e os avisos ficam mais longos** (uma frase a mais cada). O retorno mais útil é se eles ajudam ou atrapalham no treino.
- **Antes de abrir o app atualizado:** exportar os dados ("Meus dados" → "Guardar uma cópia"), como nas idas anteriores.

## Como o `r3-uso-real` recebe
1. Atualizar o `r3-uso-real` só quando o Gustavo pedir (merge da `main`, sem forçar).
2. O retorno mais útil: "Como está o seu programa" diz algo que faça sentido para ele? Algum ponto soa como bronca? O porquê específico do exercício responde o "por que este e não outro"? A frase da semana ("o seu programa planeja…") ficou clara?
