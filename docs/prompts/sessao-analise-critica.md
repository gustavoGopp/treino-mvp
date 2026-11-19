# Prompt: análise crítica do projeto inteiro (os pontos que mais precisam mudar)

> Para colar no início de uma nova sessão do Claude Code no repositório `gustavoGopp/treino-mvp`.
> Escrito em 19/11/2026, enquanto outra sessão finaliza as animações. O Gustavo quer um olhar **extremamente crítico e
> imparcial** sobre o app como um todo (produto, usabilidade, estética, funcionamento, conteúdo, animação e o próprio
> jeito de construir), que termine num **ranking completo** dos problemas, com os **3 principais** aprofundados.
> Respostas do Gustavo que moldaram este prompt: só diagnóstico (nada de código); tudo pode ser questionado, inclusive
> os princípios; a régua é o **público geral**; as animações entram por completo; comparar com o mercado; entrega em
> ranking completo. Se possível, rode com um modelo diferente do que construiu a maior parte do app, para o olhar ser
> de fato independente.
> Cole o texto abaixo, a partir de "Você vai fazer".

---

Você vai fazer a **análise crítica completa** do **treino-mvp**, um web app (PWA) em pt-BR que monta um programa de hipertrofia baseado em evidência, só com o equipamento que a pessoa tem, e conduz cada sessão com um guia animado, o temporizador de descanso e as sugestões de progressão. Ele está no ar em https://treino-mvp-sigma.vercel.app, hoje aberto para família e amigos.

**Quem é o Gustavo.** É o dono do app. Não é programador nem da área de exercício ou de design. Fala de produto e de experiência, e prefere explicações simples e visuais, em pt-BR, sem jargão. Quando um termo técnico for inevitável, explique-o numa frase.

**O seu papel.** Você é um **crítico independente**, não um ajudante do projeto. Tudo o que existe foi construído ao longo de semanas, em dezenas de sessões, com muita documentação justificando cada escolha. Isso não é prova de que as escolhas estão certas. A sua tarefa é responder, com honestidade e com provas: **se este app fosse aberto amanhã para desconhecidos, o que faria a pessoa desistir dele, e o que precisa mudar primeiro?** Você não está aqui para elogiar, nem para listar defeitos pequenos para parecer rigoroso. Está aqui para achar o que **mais importa**.

<regras>
1. **Só diagnóstico.** Você não altera nada em `src/`, `tests/`, `scripts/`, `api/`, `public/` nem nos arquivos de configuração. Você escreve apenas na pasta nova `docs/revisoes/analise-critica/`. Não edite `docs/devlog.md` nem `docs/backlog.md`: outra sessão está trabalhando em paralelo e mexe neles. No relatório, deixe pronto o texto sugerido para a entrada do devlog.
2. **Ramo próprio.** Comece a partir da `main` mais recente (`git fetch origin main`), num ramo novo só seu. Commits pequenos, no imperativo, em pt-BR. Ao terminar, faça o push desse ramo. Não abra pull request.
3. **Outra sessão está finalizando as animações agora.** Antes da fase de animação (fase 1, item 6), faça um novo `git fetch origin main` e avalie o estado mais recente. Diga no relatório em qual commit você avaliou cada coisa.
4. **Tudo pode ser questionado,** inclusive os princípios do `CLAUDE.md`, o escopo do MVP, a direção visual "Placar", a decisão de 16/11 de tirar o nível de evidência das telas e o próprio processo de construção. Mas antes de atacar uma decisão, apresente o melhor argumento a favor dela (o motivo registrado nos documentos) e só então diga por que, mesmo assim, ela deveria mudar. Discordar sem conhecer o motivo não vale.
5. **Prova em tudo.** Cada achado precisa ter pelo menos uma prova concreta: uma captura de tela, um `arquivo:linha`, uma medida (tempo, número de toques, tamanho de toque, contraste), o trecho de um texto do app ou uma fonte externa com link. Separe sempre **fato** (o que você viu ou mediu) de **opinião** (o que você acha) e dê o seu grau de confiança (alto, médio, baixo). Nada de inventar estudos, números de mercado ou falas de usuários.
6. **Privacidade.** `privado/` nunca é lida, copiada nem citada. Use só as personas fictícias de `tests/personas/` ou personas que você mesmo criar. Nenhum dado pessoal no relatório.
7. **Nada fora do repositório.** Não publique páginas, artefatos nem documentos fora do git.
8. **Não instale dependências no projeto.** Se precisar de uma ferramenta (por exemplo, um verificador de acessibilidade), instale numa pasta temporária fora do repositório. O Chromium e o Playwright já estão instalados na máquina; o projeto fixa o Playwright 1.63.0.
</regras>

<contexto>
**Onde ler (nesta ordem, sem tentar ler tudo):**
1. `CLAUDE.md` e `README.md`: princípios e estado declarado.
2. `docs/PLANO-MVP.md`: objetivo, escopo e marcos.
3. `docs/devlog.md`: leia só as últimas 8 entradas (de "Frontend novo" em diante). O arquivo tem mais de 2.000 linhas, e isso também é um dado a considerar.
4. `docs/revisoes/frontend-novo/` (`diagnostico.md`, `proposta.md`, `referencias.md`, `qa.md`): o redesenho "Placar" e o que ele pretendia resolver.
5. `docs/revisoes/proximos-passos.md`, `docs/revisoes/auditoria-fable.md`, `docs/planejamento/2026-11-diagnostico.md`: as análises anteriores. Leia-as **depois** da fase 1, para não herdar as conclusões delas. No relatório, diga o que elas já tinham apontado e não foi resolvido (problema que reaparece é sinal forte).
6. `docs/pesquisa-v2/25-treinadores-e-aplicativos.md` e `24-objetivos-e-adesao.md`: o que o projeto já pesquisou sobre aplicativos e sobre fazer as pessoas continuarem treinando.
7. `docs/backlog.md`: o que já está anotado como pendente (para não "descobrir" o que já se sabe, e para julgar se a fila de prioridades está certa).
8. Código, quando precisar provar algo: `src/App.tsx` (as rotas), `src/features/` (as telas: `onboarding/`, `programa/`, `treino/`, `guia/`, `acompanhamento/`, `dados/`, `entenda/`), `src/styles.css`, `src/engine/` (o motor da animação), `src/domain/` (o gerador e as regras), `src/storage/` (onde os dados ficam), `public/` (ícones e manifesto).

**Comandos:** `npm run dev` (servidor local), `npm run build && npm run preview` (a versão de produção), `npm run check` (lint, tipos e testes unitários), `npm run test:e2e -- --trace off` (Playwright). Rode o `check` uma vez no início para registrar a linha de base; o e2e é opcional.
</contexto>

## Como trabalhar, em fases

### Fase 1. Usar o app como um desconhecido (antes de ler os documentos de projeto)

Leia só o `CLAUDE.md` e o `README.md`, suba a versão de produção (`build` + `preview`) e use o app de verdade, pelo Playwright, em tela de celular (Pixel 7 e iPhone SE, que é estreito; tire as capturas com `deviceScaleFactor: 2`). Faça isso como **pelo menos 4 personas** que você mesmo descreve no relatório, por exemplo: quem nunca treinou e baixou o app por curiosidade; quem treina há anos e é exigente; alguém de 55 anos, sem intimidade com aplicativos; alguém que só tem halteres em casa. Para cada uma, mantenha um **diário de uso** (`diario-de-uso.md`): o que ela esperava, o que encontrou, onde travou, o que não entendeu, quanto tempo e quantos toques levou da primeira tela até começar a 1ª série.

Cubra, no mínimo:
1. **Primeira impressão e cadastro:** os primeiros 10 segundos (o que a pessoa entende que o app é e por que deveria confiar), o tamanho e o tom do formulário, a triagem de saúde, o inventário de equipamento.
2. **O programa gerado:** dá vontade de fazer? Parece feito para mim? Dá para entender sem ler explicação?
3. **Uma sessão de treino inteira, como se fosse na academia:** uma mão só, celular no banco, intervalo de descanso, anotar carga e repetições, trocar exercício, "senti algo".
4. **O app em segundo plano:** o que acontece com o descanso e os avisos quando a pessoa troca para o WhatsApp ou a música, ou bloqueia a tela. Teste o que der para testar e pesquise, com fonte, o que um PWA consegue fazer hoje no iOS e no Android (notificação, som, vibração, manter a tela ligada) e o que só um app nativo faz.
5. **Depois do treino e na volta:** o resumo, a semana, a evolução. Existe algum motivo para voltar amanhã?
6. **O guia animado, por completo:** a miniatura durante o treino, o guia em tela cheia, a clareza de cada ângulo, o ritmo e a naturalidade do movimento, a precisão da técnica, o que acontece com exercício sem animação. Escolha uma amostra de pelo menos 15 animações variadas (com peso livre, máquina, polia, corpo livre, elástico) e julgue cada uma: um leigo aprende o movimento só olhando? Use `node scripts/folha-animacao.mjs <id> <saida.png>` para ver as fases lado a lado.
7. **Linguagem:** toda palavra que um leigo não entenderia ou que soa como "coisa de sistema" (anote o texto exato e a tela).
8. **Estética e personalidade:** o app tem uma cara própria ou parece um modelo genérico? Hierarquia, respiro, densidade (a tela parece apertada?), tipografia, cor, ícone, modo escuro, movimento.
9. **Básicos que o público geral não perdoa:** áreas de toque, contraste, leitor de tela, `prefers-reduced-motion`, tela de 360 px, instalação na tela de início, funcionamento sem internet, velocidade de abertura, o que acontece se a pessoa trocar de celular ou limpar o navegador.

### Fase 2. Ler o projeto por dentro

Agora leia o mapa do `<contexto>` e confronte o que você viu com o que foi planejado. Procure em especial:
- decisões que fazem sentido no papel e falham na tela;
- complexidade que o usuário não percebe, mas que custa caro manter (regras demais, telas demais, documentação demais);
- se o treino gerado é bom para o público geral, e não só correto pela evidência;
- o processo: o jeito de construir (sessões, auditorias, documentos, número de testes) está ajudando o app a chegar às pessoas ou está atrasando?

### Fase 3. A régua do mercado

Pesquise na web e compare com **5 ou 6 aplicativos**, cobrindo três famílias: (a) registro de treino de força (por exemplo Hevy, Strong, Fitbod); (b) atividade com comunidade (Strava); (c) bem-estar com marca forte (por exemplo Ladder, Nike Training Club, Oura ou Whoop). Para cada um, o que ele faz muito bem na primeira sessão, no registro durante o treino, na motivação para voltar e na personalidade visual. Isso é **régua**, não molde: diga o que as pessoas já esperam de um app de treino e onde o treino-mvp pode ser **diferente de propósito** (o diferencial dele é o treino baseado em evidência, com o equipamento que a pessoa tem, e os dados no aparelho). Não proponha copiar marca, nome ou aparência de ninguém. Registre em `mercado.md`, com links.

### Fase 4. As notas do Gustavo (abra só agora)

Só depois de terminar as fases 1 a 3 e de escrever o seu rascunho de ranking, leia as anotações abaixo, que o Gustavo escreveu depois de treinar com o app. Para cada uma, diga se você **chegou ao mesmo achado sozinho**, se **concorda**, se **discorda** (e por quê) e se ela muda a sua ordem. Não deixe que elas reescrevam o seu ranking sem motivo: o valor delas é confirmar ou desafiar o que você viu.

<notas-do-gustavo>
- O app está funcional, mas a apresentação inicial e o formulário são pouco cativantes e com "cara de app": parece algo meio estranho.
- O app tem pouca personalidade ainda, é meio genérico.
- Durante o treino, a animação pequena não abre maior ao tocar. Tenho que ficar voltando para ver como fazer, em vez de o guia estar integrado ao treino.
- O app não apita nem avisa se eu não estiver com ele aberto, então não consigo mexer em outra coisa durante o treino.
- As páginas do treino dão uma sensação um pouco claustrofóbica, tudo meio apertado.
- Tem muita linguagem técnica e estranha, como "exportar os dados" em vez de "salvar em algum lugar".
- O ritmo da animação em alguns ângulos não é natural e é impreciso.
- Ideia: usar referências como Strava e as plataformas do "hype do wellness" para dar personalidade e trazer funcionalidades criativas, como uma competição entre amigos dentro do app (por peso levantado, quantidade de treinos etc.).
</notas-do-gustavo>

Sobre a **competição entre amigos**: avalie com seriedade, sem descartar nem abraçar de cara. Ela esbarra em dois princípios atuais (os dados ficam só no aparelho; sem login, nuvem nem recursos sociais no MVP) e em riscos próprios (competir por carga pode empurrar gente para a lesão). Diga se ela resolve um problema real de retenção, o que custaria e se existe uma versão que preserve a privacidade (por exemplo, sem conta e sem servidor). Pode concluir que vale mudar o princípio, desde que diga o preço.

### Fase 5. O ranking e os 3 principais

Junte tudo em **um ranking completo**, do que mais importa ao que menos importa. O critério de ordem é: **o quanto isso faz uma pessoa do público geral desistir do app, ou deixa de fazê-la voltar**, ponderado pelo número de pessoas afetadas. O custo de mudar não entra na ordem: entra como coluna, para o Gustavo decidir.

Depois, aprofunde os **3 primeiros**. Os 3 podem ser de naturezas diferentes (um de produto, um de experiência, um de funcionamento), mas só se for isso que as provas mostram: não force o equilíbrio.

## O que entregar

Na pasta `docs/revisoes/analise-critica/`:

1. **`relatorio.md`**, o documento principal, nesta ordem:
   - **Em uma frase:** o veredito sobre o app hoje, para o público geral.
   - **Os 3 principais,** cada um com: o problema, em linguagem simples; a prova (capturas, medidas, `arquivo:linha`); quem sofre e em que momento; por que é mais grave que o 4º; **duas propostas** (a mais barata que resolve a maior parte e a ideal); o custo aproximado de cada uma (pequeno, médio, grande, e o porquê); o risco; que princípio ou decisão anterior ela contraria, se contrariar; e **como saber se melhorou** (o que medir ou observar depois).
   - **O ranking completo** numa tabela: posição, problema, frente (produto, usabilidade, estética, funcionamento, conteúdo, animação, treino, processo), gravidade, quantas pessoas afeta, prova, custo de mudar, confiança.
   - **O que não mexer:** o que está bom e deve ser protegido nas mudanças (com prova, não por gentileza).
   - **Problemas que reaparecem:** o que análises anteriores já apontaram e continua aí.
   - **As notas do Gustavo,** uma a uma, com o seu parecer (fase 4).
   - **Perguntas para o Gustavo:** só as decisões que são dele e que mudam a ordem ou as propostas.
   - **Texto sugerido para o devlog** (para o Gustavo colar depois).
2. **`diario-de-uso.md`:** as personas e o diário de cada uma.
3. **`mercado.md`:** a comparação com os aplicativos, com links.
4. **`capturas/`:** as capturas usadas como prova, com nomes que digam a tela e a persona. Prefira montar pares "o que é hoje / o que a régua faz" quando ajudar.

**Na conversa, ao terminar:** o veredito, os 3 principais em 3 parágrafos curtos, as perguntas para o Gustavo e o nome do ramo. Depois, **pare** e espere a revisão dele.

## Para não errar

- **Não seja gentil e não seja teatral.** Um achado grave dito com clareza vale mais que vinte pequenos. Se algo está bom, diga uma vez e siga.
- **Não confunda "eu faria diferente" com problema.** Problema é o que atrapalha uma pessoa real; gosto pessoal não entra no ranking.
- **Não proponha moda.** Uma função só entra se resolver um problema que você provou. "Os outros apps têm" não é motivo sozinho.
- **Não esconda a incerteza.** Onde só um teste com pessoas de verdade resolveria a dúvida, diga isso e proponha o teste mais simples possível.
- **Escreva para o Gustavo:** frases curtas, em pt-BR, sem jargão, com imagem sempre que uma imagem explicar melhor.
