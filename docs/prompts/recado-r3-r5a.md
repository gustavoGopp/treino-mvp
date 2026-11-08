# Recado para a sessão do R3 (uso real): o que o R5a (o registro que não engana) muda (08/11/2026)

Este recado é do marco R5a (`docs/devlog.md`, "R5a"), no branch `claude/dazzling-mendel-lb069v`. Ele **não mexeu** no branch `r3-uso-real`. A ida para a `main` espera o ok do Gustavo.

## O que entra na `main` (quando ele aprovar)
- **A nota de dor do "Senti algo" passa a ficar guardada na série** (a última feita do exercício; sem série, a próxima registrada). Antes ela só aparecia na tela e sumia.
- **Um treino sem nenhuma série não conta**: não pula o dia da rotação, nem soma na semana. "Terminar" sem série oferece "Descartar este treino" ou "Guardar mesmo assim". No fim do treino, "Registrei algo errado: apagar este treino" (com confirmação).
- **A calibração da carga tem fim**: depois de 3 séries de acerto sem achar a carga certa, o app fica com a carga mais perto da faixa e diz "Fim da calibração".
- **"Agora não" na semana leve vale 7 dias** (antes, só até o próximo treino).
- **Na fase de aprendizado do iniciante** (semanas 1 e 2), nem "estagnado" nem semana leve.
- **A estagnação conta o exercício que a pessoa fez** quando ela trocou pela alternativa (e não o exercício da vaga, que ninguém fez).
- **Quatro ajustes do gerador**: o teto de 10 séries por músculo numa sessão conta as séries indiretas; no Corpo todo A/B sem stiff, a ponte de glúteo entra; um afundo por dia, havendo outra opção; no Corpo todo 6x sem nada, o pike entra para o ombro.
- **Um script que lê um export**: `npm run ler-export -- caminho/do/arquivo.json`. Ele imprime números: os tipos de sugestão, os "estagnados", as semanas leves, as calibrações longas, a dor e os treinos sem série.
- **Armazenamento:** nada muda. A versão do estado guardado continua a 7; o "Agora não" usa a data que já era guardada.

## O que isso faz no uso do Gustavo
- **Mais avisos e mais semanas leves podem aparecer, e isso é o esperado.** Até agora a dor dada no "Senti algo" não era guardada, então duas regras de segurança nunca disparavam: a redução da carga na próxima sessão (dor de 3 a 5) e a "dor que se repete" em 2 treinos seguidos, que sugere a semana leve e recomenda avaliação profissional se piorar ou durar mais de 1 a 2 semanas. A partir de agora, elas disparam.
- **Se ele já recusou a semana leve**, a oferta some por 7 dias, e não volta a cada treino.
- **Se algum exercício estava "Ainda calibrando" há várias sessões**, ele sai da calibração no próximo treino, com a carga mais perto da faixa.
- **Um "Começar" sem querer** não pula mais o dia: basta "Terminar" e "Descartar este treino".
- **O programa dele não muda** com os ajustes do gerador, a não ser que ele tenha um destes casos: Corpo todo A/B sem stiff possível; um dia com búlgaro e afundo juntos; Corpo todo 6x sem equipamento; um dia com mais de 10 séries de um músculo contando as indiretas (era o glúteo, em dias de pernas com foco em glúteo e 90 min). As 6 personas fictícias saíram idênticas. Mesmo nesses casos, o programa salvo só muda quando ele toca em "Atualizar".
- **Antes de abrir o app atualizado:** exportar os dados ("Meus dados" → "Guardar uma cópia"), como nas idas anteriores.

## Como o `r3-uso-real` recebe
1. Atualizar o `r3-uso-real` só quando o Gustavo pedir (merge da `main`, sem forçar).
2. Se ele quiser, rodar `npm run ler-export -- <export dele>` **no computador dele** e trazer para o devlog **só os números agregados** (o export nunca entra no git; o `.gitignore` já barra o nome padrão `treino-mvp-AAAA-MM-DD.json`). Esses números decidem os gatilhos da semana leve e do "estagnado" (3 sessões, 2 exercícios), que este marco **não** mexeu de propósito (`revisoes/proximos-passos/d-longo-prazo.md`, opção 2).
3. O retorno mais útil: a dor guardada aparece onde ele espera? A frase "Fim da calibração" ficou clara? Algum treino vazio foi guardado sem querer?
