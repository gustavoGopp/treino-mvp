# Guia: a frase de cada regra em linguagem simples

O app treino-mvp (PWA em pt-BR) monta um programa de treino de força com base em evidência. Ele tem 163 regras, guardadas num arquivo de dados. Cada regra tem um `id`, um texto técnico (`regra`), os `valores` que o app usa (às vezes um por nível: iniciante, intermediário, avançado), um nível de evidência (`selo`) e as fontes.

Na página "Entenda o treino" → "Todas as regras e as fontes", a pessoa abre cada regra e lê o texto dela, o nível de evidência e as fontes. Hoje o texto mostrado é o campo `regra`, que foi escrito para quem desenvolve o app: tem siglas internas ("R5d", "G5"), nomes de arquivos, datas de decisões, medições do projeto. E o campo `valores`, onde costuma estar o que a regra faz de verdade, nem aparece.

Sua tarefa: para cada regra do seu lote, escrever um **título** e uma **frase** em linguagem simples, para uma pessoa leiga que treina na academia e nunca leu sobre treino. O nível de evidência e as fontes continuam aparecendo logo abaixo, então não os repita.

## Regra de ouro: só a frase muda, nunca a regra

- Tudo o que a frase afirma tem de estar no texto da regra ou nos valores dela. **Não acrescente** nenhum número, benefício, explicação, estudo ou recomendação que não esteja ali, mesmo que você saiba que é verdade.
- **Não mude nem arredonde nenhum número.** Se a regra diz "10–20%", a frase diz "10 a 20%".
- Se os valores mudam por nível, diga os três (iniciante, intermediário, avançado). Se dois níveis são iguais, pode juntar ("iniciante e intermediário: 2; avançado: 3").
- Se você não entender o que a regra faz, **não chute**: escreva o melhor que der com o que está claro e ponha o `id` em `duvidas`, dizendo o que não ficou claro.

## O que entra na frase

- O que o app faz ou o que a regra diz, do ponto de vista de quem treina. Junte `regra` e `valores`: muitas vezes `regra` é só um título e o conteúdo está em `valores`.
- O motivo, em poucas palavras, **só se a regra der o motivo**.
- Todo número que define o que o app faz (limites, faixas, quantidades, prazos).
- **Segurança** (ids `seguranca.*` e qualquer regra sobre dor, sinais de alerta, triagem, gravidez, lesão): nenhum limite e nenhuma ação pode ficar de fora. Pode encurtar a redação; não pode tirar conteúdo.
- **Privacidade e dados** (ids `privacidade.*`, `dados.*`, `visao.*`): diga por inteiro o que o app faz com o dado ou a foto.

## O que fica de fora

- A história da decisão: siglas de etapas ("R1b", "R5-CL", "R5d", "G5", "C2", "B2"), datas ("08/11/2026"), "decisão do Gustavo", "sessão de…", "auditoria".
- Referências internas: nomes de arquivos (`01-volume-frequencia.md`, `pesquisa-v2/06`), ids de outras regras (`volume.semanal.dose-resposta`), "régua".
- Medições do próprio projeto ("cai de 21,9% para 15,5% dos programas", "36.300 programas").
- Detalhes de implementação que a pessoa não vê.

## Estilo

- pt-BR do Brasil, frases curtas, voz ativa, presente. Trate a pessoa por "você" quando fizer sentido.
- **Título:** até 8 palavras, sem dois-pontos, sem ponto final, só a 1ª letra maiúscula. Diz o assunto, não a conclusão ("Quando subir a carga", e não "A carga sobe com 2 repetições a mais").
- **Frase:** de 1 a 3 frases, até 45 palavras. Regras de segurança e listas com passos podem ir até 80.
- Sem travessão (—) e sem "–" no meio da frase como pausa (use vírgula, dois-pontos ou ponto). O "–" pode ficar em faixas de número ("8–12").
- Sem markdown, sem crase invertida, sem negrito, sem emojis. Aspas curvas “ ” só para nomes de botões e telas do app, como aparecem no texto da regra.
- Palavras: "repetições de reserva" (no lugar de RIR: quantas repetições você ainda conseguiria fazer); "séries por semana" (no lugar de "volume"); "carga" (o peso usado); "descanso"; "amplitude" pode ficar; "isolador" (exercício de uma articulação só) e "composto" ou "multiarticular" (de várias articulações) já aparecem no app e podem ficar; "drop set" e "supersérie" também. Evite "hipertrofia" quando "crescer" ou "ganhar músculo" servir; evite "prescrição" ("o que o programa pede"); evite "calibração" ("acerto da carga").
- Não comece toda frase com "O app…"; varie quando o sujeito for a pessoa ou o treino.

## Exemplos (regra → título e frase)

1. `volume.semanal.alvo` (valores: iniciante 10, intermediário 12, avançado 14; o texto conta a história de uma decisão)
   - título: `Séries por semana nos músculos em foco`
   - frase: `Os músculos que você prioriza recebem por semana 10 séries (iniciante), 12 (intermediário) ou 14 (avançado). Os outros ficam no mínimo que ainda faz crescer, e continuam crescendo, mais devagar.`

2. `rir.serie-efetiva` (regra: "Série que conta como efetiva no volume"; valores: "RIR ≤ 4; RIR ≥ 5 e aquecimento não contam")
   - título: `Que série conta`
   - frase: `Conta a série feita com até 4 repetições de reserva. Série com 5 ou mais de reserva e aquecimento não contam.`

3. `seguranca.dor.escala` (segurança: nada pode sair)
   - título: `Nota de dor de 0 a 10`
   - frase: `De 0 a 2, o treino segue. De 3 a 5: reduzir a carga em 10 a 20% (se houver uma menor), encurtar a amplitude ou ir mais devagar, e trocar o exercício se a dor não cair. Acima de 5 ou dor aguda: o exercício é encerrado. Se a dor piorar no treino seguinte, durar mais de 1 a 2 semanas ou aparecer com nota 3 ou mais no mesmo exercício em 2 treinos seguidos, o app avisa e recomenda avaliação profissional.`

4. `tempo.corte` (uma escada de passos)
   - título: `Quando o treino não cabe no tempo`
   - frase: `O corte segue esta ordem: 1) só o aquecimento do próprio exercício; 2) superséries entre músculos que não competem; 3) drop set na última série dos isoladores; 4) menos exercícios; 5) por último, menos séries, primeiro dos músculos sem foco. Um músculo em foco nunca perde séries antes dos outros.`

5. `progressao.troca-equivalente`
   - título: `Ao trocar por um exercício equivalente`
   - frase: `A semana, as séries, as repetições de reserva, o descanso e o histórico continuam. A carga do exercício novo recomeça pelo acerto da carga: o app nunca converte a carga de um aparelho para outro.`

## Formato da saída

Um arquivo JSON, com exatamente os ids do seu lote, nesta forma:

```json
{
  "frases": {
    "id.da.regra": { "titulo": "…", "frase": "…" }
  },
  "duvidas": [
    { "id": "id.da.regra", "duvida": "o que não ficou claro" }
  ]
}
```
