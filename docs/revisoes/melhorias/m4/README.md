# M4. O descanso avisa: o teste nos aparelhos, as fontes conferidas e o passo 1

> Começado em 22/11/2026, no ramo `claude/m4-o-descanso-avisa`. O roteiro do lote está em `docs/prompts/sessao-melhorias-analise-critica.md` ("M4. O descanso avisa"). Este arquivo guarda o pedido de teste, a tabela medida e as decisões técnicas, com o motivo. Nada daqui está na `main` ainda.

## 1. O teste de 5 minutos (para o Gustavo e para um amigo com iPhone)

**Para que serve:** saber, num celular de verdade, se o fim do descanso avisa. Até hoje isso só foi lido no código e em páginas da internet.

**Como fazer** (igual nos dois celulares; no iPhone, pelo Safari):

1. Abra o app e comece um treino qualquer. Deixe o volume do celular na metade ou mais.
2. Registre uma série. O descanso começa sozinho.
3. Toque em "−15 s" até sobrar perto de 1 minuto.
4. Faça uma das situações da tabela e espere o tempo acabar. Anote o que aconteceu.
5. Toque em "Ok", registre outra série e repita para a situação seguinte.

Em cada quadrinho, escreva **sim** ou **não** para três coisas: **tocou** (deu para ouvir), **vibrou**, **apareceu** (deu para ver algum aviso sem abrir o app).

| Situação | Android: tocou | Android: vibrou | Android: apareceu | iPhone: tocou | iPhone: vibrou | iPhone: apareceu |
|---|---|---|---|---|---|---|
| A. App aberto na tela | | | | | | |
| B. Em outro app (WhatsApp, por exemplo) | | | | | | |
| C. Tela bloqueada | | | | | | |
| D. App aberto, celular no silencioso | | | | | | |
| E. App aberto, com música tocando (Spotify ou outro). **A música parou ou baixou?** | | | | | | |

Duas perguntas a mais, uma linha cada:

- Qual é o celular e a versão do sistema? (No iPhone: Ajustes, Geral, Sobre, "Versão do iOS".)
- O app estava instalado na tela de início, ou aberto pelo navegador?

**Este primeiro teste é com o app como está hoje** (o endereço normal). Depois do passo 1, a mesma tabela é refeita no endereço de teste do ramo.

### Tabela medida: o app de hoje (antes do M4)

*A preencher com as respostas.*

### Tabela medida: depois do passo 1

*A preencher.*

## 2. As fontes, conferidas nas páginas (22/11/2026)

A análise de 19/11 tinha visto parte delas só pelo resumo da busca (`docs/revisoes/analise-critica/mercado.md`). Abri as páginas. O que cada uma diz:

| O que a análise afirmou | O que a página diz | Resultado |
|---|---|---|
| No iPhone, o som gerado pelo site (Web Audio) é calado pela chave do silencioso, e o som de arquivo não é | [WebKit 237322](https://bugs.webkit.org/show_bug.cgi?id=237322): quem abriu o registro relata que `<audio>` e `<video>` tocam com a chave no silencioso, e o Web Audio não. [WebKit 252746](https://bugs.webkit.org/show_bug.cgi?id=252746): Jer Noble, da equipe do WebKit (22/02/2023), diz que foi decisão deles tratar o som do Web Audio como som "ambiente", que obedece à chave, enquanto áudio e vídeo de arquivo a ignoram | **Confirmado.** É comportamento decidido, não defeito a ser consertado |
| No iPhone, página em segundo plano pode congelar | [WebKit 211018](https://bugs.webkit.org/show_bug.cgi?id=211018): web app instalado congelava ao sair da tela (iOS 13); comentários dizem que foi consertado no iOS 14 ou 15 | **Confirmado para o passado.** Hoje, só o aparelho diz |
| No iPhone, o som de web app instalado para em segundo plano | [WebKit 261554](https://bugs.webkit.org/show_bug.cgi?id=261554): o som do site era suspenso ao ir para o fundo; consta como consertado (06/2024; um relato diz iOS 17.5). A página não fala de web app instalado | **Em parte.** Não dá para contar com som com a tela bloqueada sem medir |
| No iPhone, o aviso enviado por servidor pode chegar sem som | [Fórum da Apple, 728022](https://developer.apple.com/forums/thread/728022): relato de 04/2023 (iOS 16.4), sem resposta da Apple e sem solução na página | **Confirmado como relato antigo.** Só o aparelho diz como está hoje |

Achado novo, que a análise não tinha: desde o iOS 17 um site pode dizer ao iPhone que tipo de som toca (`navigator.audioSession.type`). Um engenheiro do WebKit (Jean-Yves Avenard, 25/09/2024, no registro 237322) diz que o padrão do Web Audio é "ambiente" e que, com o tipo "playback", o som não é suspenso. A página da MDN marca o recurso como experimental e não fala da chave do silencioso. Fica como alternativa, se a medida pedir.

## 3. Passo 1 (sem servidor): o que foi feito no ramo

- **Som de arquivo no lugar do Web Audio.** Os mesmos três bipes (880, 880 e 1175 Hz), agora num arquivo de 46 kB (`public/sons/fim-descanso.wav`, gerado por `scripts/som/gerar-fim-descanso.mjs`, sem sorteio: rodar de novo dá o mesmo arquivo). Entra na lista do que o app guarda para funcionar sem rede.
- **A hora do fim na tela:** o rótulo "Descanso" virou "Descanso até 17:28". Muda junto com "−15 s" e "+15 s".

![A tela do descanso com a hora do fim](descanso-ate.png)

**Decisões técnicas, com o motivo:**

1. **Arquivo, e não Web Audio com `audioSession`.** O arquivo tem o comportamento confirmado por quem faz o WebKit; o outro caminho é experimental e só existe do iOS 17 em diante.
2. **O elemento de som é preparado no toque que começa o descanso** (o "Série feita"). O iPhone só deixa um site tocar som depois de um toque da pessoa; a técnica de carregar o elemento dentro do toque é a que as bibliotecas de som usam. **Isto não tem como ser conferido fora de um iPhone:** é o que a linha A da tabela mede depois do passo 1.
3. **Um elemento só para o app inteiro.** Quem abre o guia no meio do descanso ouve o mesmo som que o toque no treino preparou.
4. **Som atrasado não toca.** Se a página ficou parada em segundo plano e acordou mais de 5 s depois do fim, o som não sai (a tela invertida já diz "Hora da próxima série"). Os 5 s são escolha do projeto [opinião].
5. **Perda aceita:** o Web Audio marcava o som no relógio do próprio áudio; o arquivo depende do relógio da página, que em segundo plano confere 1 vez por segundo no Chrome. O atraso possível é de até 1 s.

**Um risco que só o aparelho mostra, e que pode virar decisão do Gustavo:** no iPhone, o som que ignora a chave do silencioso é da mesma categoria da música. É possível que ele **pare a música** de quem treina de fone (no Android, o esperado é só baixar por um instante). É a linha E da tabela. Se parar, a escolha é de produto: avisar no silencioso e interromper a música, ou não interromper e ficar mudo no silencioso. Há uma terceira via técnica a medir antes (`audioSession`, acima).

**Testes:** `tests/e2e/treino.spec.ts`, "no fim do descanso toca o som de arquivo, uma vez, e o rótulo diz a hora do fim" e "o descanso sobrevive à ida ao guia e o som marcado não toca quando o tempo passa de zero" (este substitui o que conferia os osciladores do Web Audio, que não existem mais; conferi que ele falha quando o som antigo não é desmarcado).

## 4. O que falta no lote

- As duas tabelas medidas (item 1).
- Passo 2: aviso com a tela bloqueada (service worker próprio, função em `api/`, serviço gratuito), o pedido de permissão e a frase nova de privacidade. Só depois da tabela.
- Fechamento: devlog, backlog, plano e a frase do `CLAUDE.md`, com o ok do Gustavo.
