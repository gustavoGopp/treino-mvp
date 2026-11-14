# Prompt: o desenho do Boneco (só o desenho, sem animação)

> Escrito na sessão da animação nova em 13/11/2026, a pedido do Gustavo. Aquela sessão está **pausada** no ramo `claude/loving-hamilton-c4ji83` e só continua depois que esta chegar a uma conclusão. O estado dela está em `docs/revisoes/animacao-nova/estado-da-sessao.md`.

---

Você vai conduzir a sessão do **desenho do Boneco** do treino-mvp, um web app (PWA) em pt-BR que monta um programa de hipertrofia baseado em evidência e conduz cada treino com um guia animado de execução (o "Boneco"). Esta sessão decide **uma coisa só: como o Boneco é desenhado**. Não há animação, motor, objeto de cena nem tela do app aqui. Só o desenho parado, até o Gustavo dizer "é este".

**Quem é o Gustavo.** É o dono do app. Não é programador nem da área de exercício, anatomia ou design. Fala de produto e de experiência, e **decide olhando**. Explique em pt-BR simples, sem jargão; termo técnico inevitável, em uma frase. Uma decisão por vez, com a sua recomendação e nada pré-marcado.

**Por que esta sessão existe.** A sessão da animação nova tentou três caminhos para o corpo e o Gustavo recusou todos. As falas dele, de 13/11/2026:

| O que foi mostrado | O que ele disse |
|---|---|
| Manequim de formas ovais, gerado por fórmula (com e sem sombra) | "esse boneco que você está desenhando tá ficando terrível e eu vou querer refazer ele completamente". O que incomodou: cabeça e rosto, formato do corpo, sombra e acabamento, o conjunto todo. |
| Corpo 3D realista (malha humana esculpida, cinza, com músculo colorido), em três acabamentos | "por mais que ele fique interessante, eu acho que fica meio esquisito para absorver, não fica muito agradável para quem está vendo o treino". |
| Quadro com oito estilos (pictograma, cápsulas, manequim articulado, massinha, traço, silhueta, atleta estilizado, vidro com ossos) | "eu confesso que não estou gostando de nada [...] de tudo que você mostrou, eu acho que eu ainda prefiro o boneco mais simples, que tem hoje, mas que não é o que eu quero ter pro final". |

O que ele pediu para esta sessão: "pesquisas por GitHub, procurar referências de imagens, de como isso é feito normalmente. Se eu faço uma ultra realista, se eu faço menos realista para ficar mais normal. [...] eu quero fazer realmente explosão de ideias e pensar bastante sobre isso para conseguir definir".

**A lição das três tentativas (não repita).** Todas partiram da técnica (fórmulas, malha, pintor 3D) e torceram para o desenho sair bonito. Aqui a ordem é a contrária: **primeiro o desenho, como ilustração parada, pensada à mão; só depois a pergunta "como o motor reproduz isso em qualquer pose?"**. E antes de desenhar: entender o gosto do Gustavo. Ele não gostou de nada; o problema pode ser de direção, não de execução.

## 0. Antes de começar

1. Confirme onde está (`git rev-parse --show-toplevel`, `git branch --show-current`). Traga o trabalho da sessão pausada: `git fetch origin claude/loving-hamilton-c4ji83` e crie o seu ramo a partir dele. Nunca faça commit na `main` nem no ramo da outra sessão.
2. Leia o `CLAUDE.md` (os princípios valem aqui: precisão, uso na academia, leve e sem rede, privacidade).
3. Leia e **olhe**:
   - `docs/revisoes/animacao-nova/estado-da-sessao.md` (o que existe, o que foi recusado, o que dá para reaproveitar);
   - `docs/revisoes/animacao-nova/prototipos/opcoes-de-boneco.png` (o quadro dos oito estilos recusados; abra a imagem);
   - `docs/revisoes/animacao-nova/pesquisa/08-estilos-de-figura.md` (12 famílias de estilo, com links, e o que a pesquisa diz sobre realismo e estranheza), `06-ilustracao-movimento-e-produtos.md` e `07-tecnica-de-desenho.md`;
   - `docs/revisoes/animacao-nova/correcoes-ja-feitas.md`, seções 1 (decisões de estilo que o Gustavo já tomou: cor sólida, vermelho no músculo principal, laranja no secundário, rótulos fora do corpo) e 4 (limites do boneco de hoje);
   - `docs/pesquisa/animacoes/r4-estilo-do-boneco.md` e `docs/revisoes/boneco-acabamento/relatorio-auditor.md` (a história do estilo atual);
   - o boneco de hoje rodando no app (`npm run dev`, abra um exercício no guia, nos temas claro e escuro, e a miniatura na tela do programa). É a única coisa de que ele gosta até agora.
4. Em até 5 linhas, diga ao Gustavo o que entendeu e como vai conduzir. Não espere o ok para pesquisar.

## 1. Regras

- **Só o desenho.** Não anime, não mexa no motor (`src/engine/`), no app (`src/features/`, `src/styles.css`), no domínio, nos testes nem em `public/`. Pode ler tudo e pode usar o que existe para gerar imagens.
- **Pasta desta sessão:** `docs/revisoes/boneco-desenho/` (documentos e pranchas) e `scripts/boneco-desenho/` (o que gerar as pranchas). Nada fora delas.
- **Imagem de terceiros nunca entra no repositório.** Para estudar uma referência, baixe para a pasta temporária da sessão e abra com a ferramenta de leitura de imagem; no repositório ficam só o link, o autor, a licença e a sua descrição em palavras. Para o Gustavo ver a referência, dê o link.
- **Não copie desenho de ninguém.** Referência é para entender o princípio. Recurso de terceiros (malha, biblioteca de ilustração, fonte de ícones) só com licença compatível com app comercial (MIT, Apache 2.0, BSD, ISC, CC0, CC BY com crédito); CC BY-SA, CC BY-NC e "só pesquisa" não servem.
- **Nada de imagem gerada por modelo,** nem como arte final nem como esboço: o desenho final precisa ser reproduzível por código, em qualquer pose, e ter licença limpa.
- **Só páginas públicas.** Nada de login, área paga, CAPTCHA ou contorno de bloqueio. O acesso ao GitHub nestas sessões é restrito ao repositório do projeto: use as páginas públicas (web) dos outros repositórios; se precisar clonar ou baixar algo que a sessão não alcança (por exemplo `makehumancommunity/makehuman-assets`, que tem os ajustes de corpo masculino, feminino e musculoso da malha em domínio público), peça ao Gustavo, com o motivo.
- **Conta:** só as contas pessoais do Gustavo. `privado/` nunca. Commits pequenos, em pt-BR e no imperativo, com push no seu ramo.
- **Limite de uso:** pesquisa em lotes de no máximo 4 subagentes, em modelo mais simples, cada um gravando em arquivo antes de responder. A síntese e os desenhos são seus.

## 2. Etapa 0: entender o gosto (antes de desenhar qualquer coisa)

Converse com o Gustavo, em perguntas curtas e visuais:

- Peça **3 a 5 referências de que ele gosta** (app, site, livro, jogo, sinalização, qualquer imagem de gente desenhada) e **2 ou 3 de que não gosta**. Qualquer link ou nome serve.
- Sobre o boneco de hoje: **o que exatamente agrada** (a simplicidade? a leveza? a cara de diagrama? o contorno?) e **o que falta para ser "o final"** (precisão? acabamento? personalidade? os músculos? as mãos e os pés?).
- Perguntas de escolha entre dois, uma por vez, cada uma com um par de miniaturas desenhadas por você: com contorno × sem contorno; com rosto × sem rosto; com roupa × sem roupa; chapado × com volume; proporção real × levemente estilizada; cinza neutro × cor de pele × cor da marca; traço fino × traço grosso; músculo no corpo × músculo num mapa ao lado.

Registre as respostas em `docs/revisoes/boneco-desenho/gosto.md`. Tudo o que vier depois responde a esse arquivo.

## 3. Etapa 1: pesquisa de referências (abrir o leque)

Meta: **pelo menos 60 referências visuais, de pelo menos 8 famílias,** vistas de verdade (imagem aberta, não só texto), registradas em `docs/revisoes/boneco-desenho/referencias.md` com link, autor, licença, o que tem de bom, o que tem de ruim para este uso e o princípio que dá para aproveitar. Comece do que já está em `pesquisa/08-estilos-de-figura.md` e vá além:

- **GitHub e projetos abertos:** bibliotecas de ilustração de pessoas (confira a licença de cada uma), conjuntos de personagens em domínio público, bases abertas de exercícios com imagem, mapas de músculo em SVG, rigs e avatares 2D e 3D, projetos que desenham figura humana por código, pictogramas abertos.
- **Como os produtos fazem:** apps de treino, de fisioterapia, de yoga e de alongamento; atlas de musculação e de anatomia; relógios e apps de corrida. Só páginas públicas e capturas de tela publicadas pelas lojas.
- **Fora do mundo fitness:** sinalização e pictogramas esportivos, manuais de montagem e cartões de segurança, ilustração editorial de esporte, jogos com personagem simples, livros de desenho de figura humana, bonecos articulados de referência para desenho, animação didática.
- **A escala de realismo:** coloque cada referência numa régua de 1 (pictograma) a 7 (foto ou vídeo) e marque onde ficam o boneco de hoje e cada tentativa recusada. Leve em conta o que a pesquisa 08 já achou: figura de realismo médio é a que mais causa estranheza, e mais realismo não ensina mais.
- **Crítica e gosto do público:** avaliações de apps e discussões públicas sobre figuras de exercício (o que as pessoas acham bonito, frio, infantil, esquisito).

Entregue ao Gustavo um resumo de uma página com os links mais fortes de cada família, para ele abrir e reagir. A reação dele entra no `gosto.md`.

## 4. Etapa 2: explosão de ideias

Em `docs/revisoes/boneco-desenho/ideias.md`: **pelo menos 30 ideias, uma linha cada, sem filtro,** variando de propósito os eixos: nível de realismo; proporção; cabeça, rosto e cabelo; mãos e pés; roupa; tipo de traço; cor; volume e sombra; como o músculo aparece; como se vê o lado de longe e a profundidade; quanto de personalidade. Inclua ideias que partem do boneco de hoje ("o de hoje, só que ...") e ideias bem distantes dele. Depois agrupe em **10 a 12 conceitos** com nome, uma frase e a referência que o inspira.

## 5. Etapa 3: pranchas paradas

Para cada conceito, uma prancha parada, **desenhada por você**: SVG escrito à mão, com curvas pensadas, ou saída das ferramentas da sessão pausada quando servirem de base (veja o `estado-da-sessao.md`: há um esqueleto com medidas reais, uma malha humana em domínio público e um pintor com vários acabamentos; `scripts/animacao-nova/opcoes-de-boneco.mjs` mostra como gerar um quadro). O que conta é o desenho ficar bom, não de onde ele saiu.

Cada prancha mostra, ao lado do boneco de hoje:
- as mesmas três poses: em pé (frente ou três quartos), o fundo do agachamento de lado segurando um halter, e a flexão embaixo;
- uma delas com o músculo realçado (principal, secundário e "só ajuda", distinguíveis sem depender só da cor);
- tema claro e tema escuro; no tamanho do palco (cerca de 320 px) e no da miniatura (cerca de 96 px).

Confira cada prancha a olho, em tamanho grande, antes de mostrar. Se a prancha não ficou boa, refaça ou descarte: não mostre desenho de que você mesmo não gosta.

## 6. Etapa 4: rodadas de eliminação com o Gustavo

- **Rodada 1:** os 10 a 12 conceitos num quadro só. Ele elimina até sobrarem 4 ou 5.
- **Rodada 2:** os que sobraram, cada um com variações de detalhe (cabeça, mão, traço, cor). Ficam 2 finalistas.
- **Rodada 3:** os 2 finalistas nas poses difíceis: em pé de frente, de lado e de costas; agachamento; flexão; deitado no banco; ajoelhado puxando um cabo; braço acima da cabeça; a mão segurando o halter em tamanho grande; o pé apoiado. Ele escolhe.

Em toda rodada: um quadro único, nada pré-marcado, a sua recomendação em uma linha e o porquê, e uma pergunta só. **Se ele não gostar de nada numa rodada, não insista em variações do mesmo:** pergunte o que incomoda (com opções), volte ao `gosto.md` e mude de direção. Pare e espere a resposta dele ao fim de cada rodada.

## 7. Etapa 5: a conclusão

Em `docs/revisoes/boneco-desenho/`:

- **`decisao.md`, a ficha do desenho escolhido:** proporções (as reais da tabela, por padrão; se estilizar, quanto e por quê); cabeça, rosto e cabelo; mãos (como seguram) e pés (como apoiam); tronco e articulações; roupa; traço (espessura em px no palco e na miniatura); cores nos temas claro e escuro, com o contraste conferido; como o músculo aparece; como se vê o lado de longe; sombra; o que some na miniatura; e a régua de realismo, com o lugar do escolhido.
- **As pranchas finais** (as poses da rodada 3, claro e escuro, palco e miniatura), ao lado do boneco de hoje.
- **`viabilidade.md`:** como reproduzir esse desenho por código em qualquer pose (formas próprias ou malha; SVG ou placa de vídeo), o peso que soma ao app, o que funciona sem rede, os riscos, e o que precisa ser testado. Sem implementar: só a análise, com o que foi medido.
- **`resumo-para-a-animacao-nova.md`:** em uma página, o que a sessão pausada precisa saber para continuar.

Faça commit e push no seu ramo e **pare**. Diga ao Gustavo, em poucas linhas, o que ficou decidido e os caminhos dos arquivos, e que ele pode voltar à sessão da animação nova com o nome do seu ramo.

## 8. O que não fazer

- Não anime nada e não mexa no app nem no motor.
- Não parta da técnica: nenhuma prancha existe "porque o código gera assim".
- Não copie desenho, não use imagem gerada por modelo, não guarde imagem de terceiros no repositório.
- Não decida pelo Gustavo e não apresente dez decisões de uma vez.
- Não dê a sessão por concluída sem o "é este" dele.
