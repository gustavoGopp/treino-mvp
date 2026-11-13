# Parecer: cadastro, Meus dados, Meus locais, termos e tela de erro

Revisão independente, só leitura, em 13/11/2026.

**O que foi visto.** Todas as capturas `01*` a `05*` e `16*` a `18*` em `depois/390-claro` (inclusive as `-inteira`) e em `depois/320-escuro`; os 5 extras (`tela-de-erro`, `dados-guardar-copia`, `dados-trazer-copia`, `dados-apagar`, `dados-rotina`) em 390-claro e 320-escuro; por amostra, `390-escuro` (05b, 05d, 16) e `320-claro` (01, 05, 17b); e, do "antes", 01, 02, 05d, 16, 17 e 17b. Depois, o código de `src/features/onboarding/`, `dados/`, `locais/`, `termos/`, `app/` e o `src/styles.css` (fora os blocos do Boneco).

**O que não tem captura e foi avaliado só pelo código** (marcado "pelo código" em cada item): a triagem que pausa o programa, o lugar já escolhido (a caixa "supôs"), as sugestões e os erros da foto, o aviso de instalar no iPhone, 2 ou mais locais, o local novo, "Algo a evitar", os erros de formulário.

**Conferências feitas.** `npm run conferir:tokens` passou ("tudo nos tokens"). Contraste calculado com as cores dos tokens e com amostras de pixel das capturas. Nada foi editado, nem build, servidor ou e2e.

**Resumo.** Não achei defeito que impeça terminar o cadastro ou usar Meus dados (nenhum "bloqueia"). Achei 17 "importantes" e 26 de acabamento. Nenhuma função do "antes" sumiu (seção 2.4).

---

## 1. Os 20 cuidados do bloco B

| # | Cuidado | Situação | Evidência em uma linha |
|---|---|---|---|
| 1 | Selo só com informação | cumpre em parte | "consenso" aparece em frases que não são evidência de treino (o navegador que pode apagar dados, a privacidade da foto, "Meus locais") e 2 vezes na mesma tela (`02-saude-inteira`, `16-meus-dados`). |
| 2 | Sem rótulo redundante | não cumpre | "Que equipamento você tem?" + "Onde você treina?" (e uma 3ª pergunta em `17b`); na tela de erro, o título de cada bloco repete o botão; na triagem, título curto + pergunta inteira nos 9 cartões. |
| 3 | Sem itálico solto | cumpre | Nenhum itálico nas telas; `.chip i` tem `font-style:normal`. |
| 4 | Uma família de letra | cumpre | Só Geist, sem monoespaçada. Ressalva: o "✓" de "✓ TENHO" (U+2713) está fora do `unicode-range` da fonte e sai na letra do sistema. |
| 5 | Sistema de design de verdade | cumpre em parte | Os tokens passam na conferência, mas há 2 jeitos de mostrar "escolhido" (inversão e contorno), 3 jeitos de voltar, uma classe em colisão (`.falta`) e um tamanho de letra fora dos 8 (`1.1875rem` no `.btn`). |
| 6 | Conteúdo real em primeiro plano | cumpre em parte | Em Meus dados, a lista só começa na metade da 1ª tela em 390 e a 80% em 320 (`320-escuro/16-meus-dados`); na triagem, 7 linhas de texto antes da lista. |
| 7 | O principal é o maior | cumpre em parte | O título é o maior em todas. Em Meus dados, o elemento mais forte da página é o botão vermelho "Apagar todos os dados". |
| 8 | Agrupar por espaçamento | cumpre em parte | Quatro pontos com espaço zero entre blocos diferentes (`04b-…-inteira`, `dados-rotina`, `16b`, `01`) e a folha do item com 16 entre grupos e 8 a 16 dentro. |
| 9 | Títulos específicos | cumpre em parte | "Marcados (2)" e "Editar: Meu local" são bons; "Meus dados", "Meus locais" e "Sua rotina de treino" não trazem número nem conteúdo. |
| 10 | Uma ação principal, perto do polegar | cumpre em parte | Passos 2 a 4: botão preso embaixo, certo. Boas-vindas em 320×640: "Começar" fora da tela. Triagem: os botões ficam abaixo da dobra. O escolhido e a ação principal têm a mesma cara (bloco invertido). |
| 11 | Uma cor, sempre com o mesmo sentido | cumpre em parte | Só há vermelho, mas o "Apagar tudo" que apaga de verdade saiu preto (erro de CSS) e o botão que só abre a confirmação é vermelho cheio. |
| 12 | Ícones de uma família | cumpre em parte | Conjunto Lucide no app, mas a boas-vindas desenha "info" e "cadeado" à mão, e setas, "✓", "+" e "!" são caracteres de texto. |
| 13 | Sem enfeite | cumpre | Sem degradê, brilho ou sombra. A faixa dos 4 lugares na boas-vindas está dentro do combinado. |
| 14 | Raio interno = externo − respiro | cumpre em parte | Canto de 8 dentro de canto de 8 com respiro de 16 (ladrilho do desenho no cartão do item; opção dentro de `.sub`). |
| 15 | Contraste AA | cumpre em parte | Texto: mínimo de 5,8:1 no claro e 6,4:1 no escuro. Mas o botão secundário e o cartão de opção só se separam do fundo por 1,12:1 (claro) e 1,26:1 (escuro), e a folha no escuro tem a cor da página (1,04:1 sob o véu). |
| 16 | Quebra de linha cuidada | não cumpre em 320 | "Abdô-men", "articu-lação", "crô-nica", "pres-são", "bá-sicos" (`320-escuro/dados-rotina`, `02b`, `03b`); selo sozinho na última linha ("baixo. consenso"). |
| 17 | Alinhamento conferido a olho | cumpre em parte | Dias em 3 + 2 colunas (390) e 2 + 2 + 1 (320); selos recuados 4 px quando caem na linha de baixo; nomes dos cartões de item em alturas diferentes na mesma fileira. |
| 18 | Números tabulares | cumpre | `font-variant-numeric: tabular-nums lining-nums` no `body`. |
| 19 | Estado em toda espera, vazio e erro | cumpre em parte | Foto: "Escolher fotos" desligado sem dizer por quê; em Meus dados, a mensagem de sucesso aparece fora da vista; a prévia do Boneco não tem estado de espera nem de erro. Sem rede: tratado no selo e na foto. |
| 20 | Movimento só como resposta | cumpre | Folha de 200 ms, toque que encolhe 2 a 4%; `prefers-reduced-motion` desliga os dois e a rolagem suave. |

---

## 2. Defeitos, em ordem de gravidade

### 2.1 Bloqueia

Nenhum encontrado.

### 2.2 Importante

**I1. "Rotina e divisão", "Objetivo" e "Refazer a triagem" abrem a moldura do cadastro, no meio da tela e sem volta para Meus dados.**
- Tela e captura: Meus dados → Rotina (`extras/390-claro/dados-rotina.png`, `extras/320-escuro/dados-rotina.png`).
- O que está errado: a tela abre já rolada em "Quais grupos você quer priorizar?", com os dias e os minutos (o que a linha "Rotina e divisão" promete) escondidos acima. O topo mostra "Meu programa", não "Meus dados". Pelo código, acima ficam "Passo 3 de 4" e um "Voltar" que leva ao passo de experiência do cadastro; "Salvar" manda para o programa. "Objetivo" abre o mesmo lugar, e a pergunta do objetivo fica mais abaixo ainda. "Refazer a triagem" entra no passo 1 de 4 e obriga a passar por experiência, rotina e equipamento até "Gerar meu programa" (o texto da linha só diz "o programa é gerado de novo no fim").
- Regra: cuidados 5, 9 e 10; uso com uma mão (a pessoa se perde e não tem como voltar com um toque).
- Causa: `Dados.tsx:156`, `:161` e `:190` apontam para as rotas do cadastro; `ui.tsx:242-275` (`Passo`) sempre desenha o progresso e o "Voltar" do cadastro; `Rotina.tsx:97-131`, com `deDados`, monta os dois `Revelar` de uma vez, e cada um chama `scrollIntoView` (`ui.tsx:210-221`). A folga de 80 px da captura é exatamente o `scroll-padding-top`, o que aponta para essa causa; vale confirmar abrindo a tela.
- Correção: com `?de=dados`, trocar o progresso por `Topo voltar={{ para: '/dados', rotulo: 'Meus dados' }}`, não rolar nos `Revelar`, voltar para `/dados` ao salvar, e levar "Objetivo" direto à pergunta dele (âncora ou folha própria). Na triagem refeita, dizer na linha que são os 4 passos, ou encurtar o caminho.

**I2. "Apagar tudo" saiu sem vermelho; o vermelho ficou no botão que só abre a confirmação.**
- Tela e captura: `extras/390-claro/dados-apagar.png`, `extras/320-escuro/dados-apagar.png`, `16-meus-dados-inteira.png`.
- O que está errado: na folha, "Cancelar" é o bloco preto e "Apagar tudo" é um botão cinza de texto preto, igual a qualquer secundário. Na página, "Apagar todos os dados" é um bloco vermelho cheio, de 64 px, o elemento mais forte da tela.
- Regra: direção visual (vermelho = segurança e destrutivo); cuidados 7, 10 e 11.
- Causa: `styles.css:182` `.perigo-sec{color:var(--alerta) !important}` perde para `styles.css:173` `.btn.sec{…color:var(--texto) !important}` (duas classes contra uma, as duas com `!important`). Uso em `Dados.tsx:304`.
- Correção: `.btn.sec.perigo-sec{color:var(--alerta) !important}` (ou `class="btn perigo"` no "Apagar tudo"). Na página, baixar o botão para `btn sec perigo-sec` (texto vermelho, sem bloco cheio): ele só abre a pergunta.

**I3. Boas-vindas: "Começar" fica fora da 1ª tela em celular baixo, e o texto do aceite encosta no botão.**
- Tela e captura: `320-escuro/01-boas-vindas.png` e `320-claro/01-boas-vindas.png` (o botão não aparece; a tela termina no meio da frase dos termos); `390-claro/01-boas-vindas.png` (a frase "Ao começar, você concorda…" encosta no botão, 0 px).
- O que está errado: a única ação da tela não está à vista em 320×640. Em 390×844 o botão termina a 760 px, então some também em aparelhos de 667 px de altura (pela conta, mesmo com o ajuste de `max-height:800px`). O link dos termos tem cerca de 22 px de altura e fica colado no botão: toque errado fácil, justamente no aceite. Pelo código, no iPhone aberto no Safari o aviso "Instale o app…" (título, parágrafo, 3 passos, ajuda e botão) entra entre o título e a frase de abertura e empurra tudo ainda mais.
- Regra: cuidado 10; toque ≥ 44 px; bloco A (proximidade).
- Causa: `styles.css:484` `.acao-boas{margin-top:auto}` não faz nada (o `main` não tem altura mínima) e o bloco não tem `gap`; `BoasVindas.tsx:74-82`; `BoasVindas.tsx:43-44` (ordem dos avisos).
- Correção: usar `.acao-fixa` na boas-vindas (botão preso embaixo, como nos passos 2 a 4); dentro dela, `display:flex;flex-direction:column;gap:var(--s8)` e a frase do aceite abaixo do botão, com o link em `link-botao` (48 px). Levar o aviso de instalar para depois do cadastro.

**I4. O escolhido e a ação principal têm a mesma cara.**
- Tela e captura: `03b-nivel-respondido.png`, `04b-rotina-respondida.png`, `05d-equipamento-item-por-item.png` (390-claro e 320-escuro).
- O que está errado: opção escolhida, categoria ativa, cartão "tenho" e o botão "Continuar" são todos blocos invertidos. Em `04b` há 4 blocos pretos na tela e o botão é só mais um; o olho vai primeiro às respostas já dadas.
- Regra: cuidado 10 (destaque claro da ação principal) e cuidado 5 (o Estilo do Boneco já usa outro padrão, o contorno).
- Causa: `styles.css:210` (`.opcao:has(input:checked)`), `:247` (`.chip-valor`), `:364` (`.chip`), `:498` (`.lugar-linha`), `:518` (`.item-eq`) usam `--acao`, a mesma cor de `.btn` (`:170`).
- Correção: escolher um padrão só para "escolhido" (contorno de 2 px por dentro, como em `.estilo-boneco`, `:855`, mais o rádio ou a caixa preenchidos) e deixar a inversão só para a ação principal. É decisão de direção: levar ao Gustavo com as duas capturas lado a lado.

**I5. Triagem: a lista das 9 condições parece tocável e não é; as respostas ficam abaixo da dobra.**
- Tela e captura: `02-saude.png` e `02-saude-inteira.png` (390-claro), `320-escuro/02-saude.png`.
- O que está errado: as 9 linhas têm a mesma cara das linhas tocáveis de Meus dados (linha fina, 56 px, peso 500). Tocar nelas não faz nada. Os botões "Não, nenhuma" e "Sim, alguma" começam uns 160 px abaixo da 1ª tela em 390×844 e bem mais longe em 320×640; antes da lista há dois parágrafos (7 linhas). Há 2 selos "consenso" na tela, e o segundo fica solto numa linha própria, recuado, ao lado de "Ver as perguntas completas", parecendo rótulo do link.
- Regra: cuidados 1, 6, 10 e 17. (Deixar os botões no fim é decisão registrada no código, para a pessoa passar pelas 9; o defeito é a lista parecer um controle.)
- Causa: `Triagem.tsx:132-149` e `:161-168`; `styles.css:290-291` e `:488` (`.condicoes` no mesmo estilo de `.linhas-dados`).
- Correção: dar à lista cara de texto (marcadores, sem linha por item, entrelinha normal), o que também encurta a tela; ou tornar cada linha tocável, levando a "Quais valem" com aquela já marcada. Juntar os dois parágrafos em um, manter 1 selo e pôr o link numa linha só dele.

**I6. O selo "consenso" é jargão, aparece onde não há evidência de treino e se repete.**
- Tela e captura: `01-boas-vindas`, `02-saude-inteira` (2), `03b`, `04b-inteira` (2 lado a lado), `16-meus-dados` (2 na 1ª tela), `17-locais`, `18-termos-inteira` (4), `dados-guardar-copia`.
- O que está errado: a palavra solta "consenso" não diz de quê (consenso de quem?). Ela acompanha frases sobre o navegador, a privacidade da foto e o funcionamento de "Meus locais"; na folha, o significado é "prática de treinadores e posicionamentos, sem ensaio que teste este número", que não descreve essas frases. Em "moderada consenso" (`04b`) não dá para saber qual selo vale para qual frase.
- Regra: cuidado 1; "jargão sem explicação"; evidência a um toque (o toque existe, o rótulo é que confunde).
- Causa: `ui.tsx:15` (`CURTO_SELO`); usos em `Dados.tsx:128` e `:222`, `privacidade.tsx:20`, `Locais.tsx:28`, `Triagem.tsx:133` e `:145`, `Rotina.tsx:136`, `BoasVindas.tsx:54`.
- Correção: decisão do Gustavo, porque o `CLAUDE.md` pede o nível em todo texto técnico. Sugestão: nas frases de privacidade e de armazenamento, trocar o selo por "de onde vem isto" (mesma folha, sem a palavra de nível); nas regras de treino, manter; onde houver dois, pôr cada um colado na frase a que se refere.

**I7. Meus dados: metade da 1ª tela é texto, e o título encosta na borda de cima.**
- Tela e captura: `16-meus-dados.png` (390-claro e escuro), `320-escuro/16-meus-dados.png`; o título colado também em `extras/*/tela-de-erro.png`.
- O que está errado: o parágrafo de privacidade (7 linhas) e o aviso do navegador ocupam a tela até 49% da altura em 390 e 80% em 320; a 1ª linha da lista mal aparece. O título "Meus dados" fica a uns 6 px do topo, enquanto "Meus locais" fica a mais de 80 px.
- Regra: cuidados 6, 7 e 17; bloco A (margens).
- Causa: `Dados.tsx:121-131` (texto antes da lista); `ui.tsx:170` (sem "voltar" nem atalho, `Topo` não desenha nada) somado a `styles.css:99` (`.wrap` com `padding-top` 0). O mesmo vale para `TelaDeErro.tsx:51-53`.
- Correção: levar o texto de privacidade para uma linha do grupo "Saúde e privacidade" ("O que sai deste aparelho ›") e reduzir o aviso a uma linha com ação ("O navegador pode apagar seus dados · Guardar uma cópia"). Dar `padding-top` ao `main` quando não houver topo (`var(--s24)` mais `env(safe-area-inset-top)`).

**I8. Blocos diferentes com espaço zero entre eles.**
- Tela e captura: `04b-rotina-respondida-inteira.png` ("…rende mais com até 2." colado em "Dá para mudar depois…"); `extras/*/dados-rotina.png` (o aviso colado no título "O que você quer agora?"); `16b-meus-dados-estilo-do-boneco.png` (o texto encosta no 1º cartão); `01-boas-vindas.png` (I3).
- Regra: bloco A (grupos diferentes a 24 ou 32); cuidado 8.
- Causa: `styles.css:105` `.revelar{display:block}` (os filhos de `Rotina.tsx:131-170` não ganham espaço); `styles.css:862` `.folha .box:has(.estilos-boneco)` zera o respiro e não põe `gap` (`EstiloBoneco.tsx:26-29`); `styles.css:484`.
- Correção: `.revelar{display:flex;flex-direction:column;gap:var(--s32)}`; `.folha .box:has(.estilos-boneco){display:flex;flex-direction:column;gap:var(--s16)}`.

**I9. Em 320 px, palavras partidas com hífen e grades que se desfazem.**
- Tela e captura: `320-escuro/dados-rotina.png` ("Abdô-men" num cartão com espaço sobrando à direita); `320-escuro/02b-saude-quais-valem.png` ("crô-nica", "pres-são", "articu-lação", "úl-timos"); `320-escuro/03b-nivel-respondido.png` ("bá-sicos"); `320-escuro/04-rotina-vazia.png` (dias em 2 + 2 + 1); `320-escuro/16b…` (a descrição do estilo numa coluna de 88 px, 6 linhas).
- Regra: cuidados 16 e 17.
- Causa: `styles.css:890` (`hyphens:auto` em toda `.opcao > span` até 359 px); `styles.css:205` (coluna mínima de 8,75rem deixa 68 px para o texto, e "Abdômen" pede uns 72); `styles.css:203`; `styles.css:854` e `:861` (o Estilo do Boneco só empilha abaixo de 280 px).
- Correção: tirar o `hyphens:auto` geral e, em 320, reduzir o `gap` e o respiro do cartão para 8 na grade; dias em uma fileira de 5 blocos sem o círculo do rádio (como os 5 valores da reserva); empilhar o `.estilo-boneco` já em 359 px.

**I10. Editar um local em 320×640: as barras presas ocupam 35% da tela.**
- Tela e captura: `320-escuro/17b-locais-editar.png`, `320-claro/17b-locais-editar.png`; `390-claro/17b-locais-editar.png` (cartão cortado ao meio).
- O que está errado: topo preso (64) + "Salvar local" (96) + navegação (64) = 224 de 640 px. Sobra uma janela de 416 px, e a legenda "Onde você treina?" já aparece cortada. Pelo código, com o teclado aberto para escrever o nome, quase não sobra área para o campo.
- Regra: uso com uma mão; cuidado 6.
- Causa: `styles.css:108` (`header.top` preso), `:189` e `:304` (`.acao-fixa` acima da navegação), `:300`.
- Correção: nas telas filhas de formulário (editar local), tirar a navegação de baixo (como o cadastro já faz) ou soltar o topo (`position:static`).

**I11. Foto: "Escolher fotos" fica desligado sem dizer o que falta, e o "código de convite" não é explicado (pelo código).**
- Tela e captura: `05b-equipamento-foto.png` mostra só o começo da folha; o resto é pelo código.
- O que está errado: sem a autorização marcada, o botão fica apagado (opacidade 0,6; contraste de 4,6:1) e não há texto dizendo "marque a autorização". A mensagem que diria isso (`FotoEquipamento.tsx:50`) nunca aparece, porque o campo desligado não dispara. "Código de convite" não diz o que é nem quem dá. A folha não tem ação principal: "Escolher fotos" tem estilo de secundário.
- Regra: cuidado 19 (o botão desligado diz o que falta, como no treino); cuidado 10; jargão.
- Causa: `FotoEquipamento.tsx:203-211`; `styles.css:235`.
- Correção: abaixo do botão, uma linha `.falta` ("Falta marcar a autorização acima" ou "Falta o código de convite"); ajuda no campo ("Quem te passou o app manda o código"); `btn` (principal) no "Escolher fotos" quando liberado.

**I12. Meus dados: a confirmação de "exportado", "importado" e "autorização retirada" aparece fora da vista.**
- Tela e captura: pelo código; a posição da mensagem se vê em `16-meus-dados-inteira.png` (entre o aviso e "PROGRAMA").
- O que está errado: a folha fecha e a mensagem entra no alto da página, enquanto a pessoa está rolada em "Cópia de segurança", duas telas abaixo. Quem enxerga não vê resposta nenhuma ao toque.
- Regra: cuidado 19.
- Causa: `Dados.tsx:145-147` (o `p.status` fica antes dos grupos); `:58-63`, `:96`, `:289`.
- Correção: mostrar o resultado na própria linha ("Última cópia: hoje") e manter a folha aberta com a mensagem e um "Pronto"; ou um aviso preso acima da navegação.

**I13. "Trazer uma cópia" troca todos os dados com um botão neutro, ativo mesmo sem arquivo.**
- Tela e captura: `extras/390-claro/dados-trazer-copia.png`, `extras/320-escuro/dados-trazer-copia.png`.
- O que está errado: "Importar dados" é o bloco principal, aceso com "Nenhum arquivo escolhido". Importar apaga o que está no aparelho e não tem cor nem segunda pergunta, ao contrário do "Apagar".
- Regra: direção visual (destrutivo); cuidados 10 e 19.
- Causa: `Dados.tsx:243-274`.
- Correção: desligar o botão até haver arquivo (com a linha "Falta escolher o arquivo"); rótulo "Substituir meus dados pelos do arquivo"; oferecer "Guardar uma cópia antes" quando já houver dados.

**I14. A triagem que pausa o programa não tem saída para quem ainda não foi avaliado (pelo código).**
- Tela e captura: sem captura; `Triagem.tsx:100-127`.
- O que está errado: a tela tem "Continuar com a liberação" (desligado até marcar a confirmação) e "Revisar respostas". Para quem tem um "sim" e não tem liberação, o único botão ativo leva a mudar as respostas de saúde. Não há "vou procurar avaliação e volto depois", e no 1º cadastro nada fica salvo (comentário em `Triagem.tsx:76-78`), então a pessoa recomeça do zero.
- Regra: segurança (a triagem interrompe e recomenda avaliação, sem empurrar para mudar a resposta); cuidado 19.
- Correção: uma 3ª saída, discreta: "Vou procurar avaliação e volto depois", que guarda as respostas e diz o que continua disponível. Vale uma captura dessa tela antes de fechar o lote.

**I15. O título da aba é "treino-mvp" em todas as telas (pelo código).**
- O que está errado: nenhum lugar muda `document.title`. Leitor de tela, histórico e a troca de apps mostram sempre o mesmo nome (WCAG 2.4.2, nível A). O foco no `h1` ajuda quem usa leitor de tela, mas não substitui.
- Causa: `index.html:11`; `ui.tsx:224-236` (`Titulo`).
- Correção: no `useEffect` do `Titulo`, `document.title = \`${texto} · treino-mvp\``.

**I16. Item com detalhe faltando fica mais apagado, não mais visível (pelo código).**
- Tela e captura: sem captura; aparece em "Marcados" depois de tentar gerar o programa com um detalhe em branco.
- O que está errado: o `li` recebe a classe `falta`, que em `styles.css:776` é o texto de apoio do treino (`font-size` menor, cor `--texto-2`, `text-align:center`). O item com erro fica cinza, menor e centralizado. "falta completar" usa `--atencao`, que hoje é a cor do texto: nada de vermelho, ao contrário de `.erro`.
- Regra: cuidados 5 e 19.
- Causa: `Inventario.tsx:579` e `:583`; `styles.css:776` e `:508`.
- Correção: renomear a classe (`com-falta`) e pintar o `small` com `--alerta`, com o "!" de `.erro`.

**I17. Em "Quais valem para você?", o "Voltar" de cima sai do passo e perde as marcações.**
- Tela e captura: `02b-saude-quais-valem-inteira.png`.
- O que está errado: há dois "voltar": o de cima (ícone Lucide) leva à boas-vindas; o de baixo ("‹ Voltar à pergunta geral", com seta de texto) leva à pergunta geral. Quem toca no de cima, o mais à mão para quem espera "voltar uma tela", perde o que marcou (o estado é local). "Continuar" fica em fluxo, depois de 9 cartões, enquanto os outros passos prendem o botão embaixo.
- Regra: cuidados 5, 10 e 12.
- Causa: `Triagem.tsx:227-232`; `ui.tsx:256-261`.
- Correção: nessa subtela, o "Voltar" de cima volta à pergunta geral, e o link de baixo sai.

### 2.3 Acabamento

**A1. Dias por semana em 3 + 2 colunas.** `04-rotina-vazia.png`: "5 dias" e "6 dias" esticam e desalinham das colunas de cima (cuidado 17). `styles.css:203` (`flex:1 1 0`). Correção: grade fixa; ver I9.

**A2. Selos recuados e órfãos.** `04b-…-inteira` ("moderada consenso" começa 4 px à direita da margem do texto); `03b` ("baixo. consenso" sozinho na última linha). `styles.css:261` (`padding:0 var(--s4)`). Correção: margem negativa de 4 px quando o selo abre a linha; `white-space:nowrap` entre a última palavra e o selo.

**A3. A área de toque do selo invade o cartão de baixo (pelo código, por estimativa).** O `::after` de 48 px (`styles.css:262`) passa uns 5 px sobre o topo da 1ª opção ("2 dias", "Peito"), e um toque ali abre a folha da evidência. Correção: `margin-bottom` na ajuda que termina em selo, ou `z-index` no cartão.

**A4. Duas perguntas seguidas no equipamento, três ao editar um local.** `05-equipamento-lugar.png`: "Que equipamento você tem?" e "Onde você treina?". `17b-locais-editar.png`: "Editar: Meu local", "Que equipamento tem em "Meu local"?", "Onde você treina?" (cuidado 2). `Inventario.tsx:215` e `:494`; `Locais.tsx:140`. O subtítulo "Pergunta só o que muda o programa" (`Inventario.tsx:44`) descreve o app, não o lugar, e destoa dos outros três.

**A5. "Gerar meu programa" sempre aceso; o que acontece sem nada marcado só está no fim da página.** `05-equipamento-lugar.png`, `320-*/05…`. `Inventario.tsx:661-666`. Correção: o rótulo conta o estado ("Gerar com 12 itens" ou "Gerar só com o peso do corpo").

**A6. "Item por item" não mostra que está aberto.** `05d-…-inteira.png`. O botão tem `aria-expanded` (`Inventario.tsx:554`), mas o estilo só responde a `aria-pressed` (`styles.css:174`).

**A7. Busca: um bloco cinza vazio.** `05d`. Sem o ícone de lupa (existe `search` em `app/icones.tsx`) e sem `role="status"` no "Nada com …" (`Inventario.tsx:602-605` e `:622`).

**A8. Cartões de item.** `05d` (claro e escuro): o ladrilho do desenho tem 7rem e deixa uma faixa vazia à direita (`styles.css:531`); os nomes de uma mesma fileira ficam em alturas diferentes ("Banco Scott" e "Banco romano ou GHD", por causa de `justify-content:space-between`, `:513`); "+ MARCAR" e "✓ TENHO" vêm de `content` no CSS (`:517` e `:520`), com o "✓" fora da letra do app (`styles.css:9`).

**A9. A ação presa corta cartão e texto ao meio, sem linha nem esmaecimento.** `04b-rotina-respondida.png`, `05d`, `17b`, `320-escuro/05…`. No "antes" havia uma linha fina acima do botão. `styles.css:189`. Correção: `border-top:1px solid var(--linha)` na `.acao-fixa`.

**A10. Folha do item (halteres).** `05c-equipamento-folha-do-item.png`: 16 px entre um grupo e o seguinte e 8 a 16 dentro do grupo (cuidado 8; `styles.css:523`, usar 24); fileiras de larguras desiguais; "Outro" 3 vezes; "Pronto" fecha com tudo em branco e o erro só aparece ao gerar (`Inventario.tsx:640`).

**A11. Folha da foto.** `05b` (390-claro e escuro): "a lista abaixo faz o mesmo" e "use a lista abaixo" (`FotoEquipamento.tsx:50`, `:54`, `:116`, `:166`) falam de uma lista que não está abaixo numa folha; "Analisando as fotos…" aparece duas vezes, no botão e na linha de estado (`:210` e `:214`); a caixa da autorização fica a 8 px do último item da lista (`styles.css:537`).

**A12. Linhas de Meus dados.** `16-meus-dados.png`: a seta "›" é um caractere fino, não o `chevron-right` do conjunto (`Dados.tsx:336-338`; cuidado 12); "3 × 45 min · Corpo todo A/B/C" não diz que o 3 são dias (`:157`); "Última cópia: nenhuma cópia ainda" (`:182`, repetido em `:225`); "(JSON)" no botão (`:238`).

**A13. Confirmação de apagar com três saídas.** `dados-apagar.png`: "Voltar" no cabeçalho, "Cancelar" e o toque no véu (`Dados.tsx:298-303`). Tirar o "Voltar" e usar `role="alertdialog"`. Depois de apagar, a pessoa cai na boas-vindas sem nenhum "dados apagados" (`:102-108`).

**A14. Campo de arquivo.** `Dados.tsx:251-263`: o `aria-label` ("Arquivo exportado pelo treino-mvp") difere do rótulo visível ("Escolher o arquivo"), contra a WCAG 2.5.3; o nome do arquivo escolhido não é anunciado (sem `aria-live`); `id="arquivo"` fixo.

**A15. Estilo do Boneco.** `16b`: o escolhido é um contorno, o resto do app inverte (I4); a prévia vazia não pulsa nem tem estado de erro se o desenho não chegar (`EstiloBoneco.tsx:19`); "Estilo do boneco" e "Estilo do Boneco" (`:27`, `:29`).

**A16. Meus locais.** `17-locais.png`, `17b`: as sugestões de nome quebram em 3 + 1 (`Locais.tsx:111-126`); não há como apagar um local (já não havia no "antes"; vale registrar no backlog).

**A17. Três jeitos de voltar.** Locais: "‹ Meus dados" à esquerda (`Locais.tsx:23`). Termos e "Algo a evitar": "Meus dados" à direita, sem seta e sem a navegação de baixo (`Termos.tsx:26`, `Restricoes.tsx:43`; `18-termos.png`). Cadastro: "‹ Voltar". Unificar as telas filhas de Meus dados com `Topo voltar`.

**A18. Tela de erro.** `extras/*/tela-de-erro.png`: "Tentar de novo" (título) sobre "Tentar de novo" (botão) e "Avisar o problema" sobre "Avisar um problema" (`TelaDeErro.tsx:71-79`); o link "Termos e privacidade" no rodapé tem menos de 44 px (`:83`); o vocabulário alterna "guardar uma cópia", "exportar" e "importar" na mesma tela.

**A19. Ícones da boas-vindas desenhados à mão.** `BoasVindas.tsx:47-49` e `:60-62`: "info" e "cadeado" próprios (o cadeado de cantos retos), com `info` e `lock` já no conjunto Lucide do app (cuidado 12).

**A20. Tema escuro.** A folha tem a cor da página (`styles.css:280`, `background:var(--fundo)`): sob o véu a diferença é de 1,04:1 e a borda de cima quase some (`320-escuro/05c`, `dados-apagar`, `390-escuro/05b`). Usar `--superficie` ou uma linha no topo. Os ladrilhos claros dos desenhos (`styles.css:530`) são os pontos mais brilhantes da tela e, no cartão escolhido, somem no fundo claro (`390-escuro/05d`).

**A21. Barra de progresso.** `05-equipamento-lugar.png`: cheia no passo 4, antes de terminar. "Passo N de 4" é um `span` que o leitor de tela não anuncia na troca de tela (`ui.tsx:262-268`).

**A22. Resultado do nível.** `03b`: a caixa "Seu nível: Iniciante" tem a mesma cara de uma opção por tocar (`styles.css:160`). "~6 meses" usa o til como "cerca de".

**A23. Tipografia miúda.** Aspas retas em `Rotina.tsx:161` e `Locais.tsx:86` e `:140` (e no aviso "Pernas", que vem do domínio), curvas no resto; `font-size:1.1875rem` no `.btn` (`styles.css:170`), fora dos 8 tamanhos declarados.

**A24. Cantos aninhados.** Canto de 8 dentro de canto de 8 com respiro de 16: `styles.css:530` dentro de `:513`; `:226` dentro de `:225`; `:858` dentro de `:854` (cuidado 14).

**A25. Acessibilidade miúda no código.** As 9 caixas de "Quais valem" não têm `fieldset` e `legend` (`Triagem.tsx:177-226`); `aria-invalid` num `fieldset` (`ui.tsx:301`); a espera da carga é uma tela vazia com `aria-busy` (`App.tsx:29`), aceitável em milissegundos, sem nada se demorar.

**A26. O mesmo aviso em 4 lugares.** "O navegador pode apagar os dados" aparece no alto de Meus dados, na folha "Guardar uma cópia", no aviso de instalar e nos termos.

### 2.4 Funções em relação ao "antes"

Nenhuma sumiu. Conferido nas capturas e no código:

- Cadastro: os 4 passos com "Voltar"; triagem em lista, "Ver as perguntas completas" e "Não, nenhuma"; lugar pronto, "Pela foto" (com a autorização e o destino da foto) e "Item por item" (busca e 6 categorias); "Mudar" e "Tirar"; "Gerar meu programa".
- Meus dados: rotina e divisão, objetivo, algo a evitar, meus locais, estilo do Boneco, guardar e trazer uma cópia, refazer a triagem, termos, apagar todos os dados, avisar um problema.
- Duas funções existem, mas só aparecem sob condição (como no "antes"): a linha "Foto do equipamento" (retirar a autorização) só depois de a pessoa autorizar (`Dados.tsx:193`); "Montar o programa para este local" só com 2 ou mais locais (`Locais.tsx:45`).
- Tela de erro: exportar, tentar de novo e avisar.
- Saíram de propósito: a faixa com o nome do app, a cor âmbar do aviso do navegador e a linha acima do botão preso (esta faz falta, A9).

---

## 3. O que está bom e não deve ser mexido

- Os tokens: espaço, altura e canto passam em `conferir:tokens`; alturas de toque em 48, 56 e 64, em `rem`.
- O contraste do texto, nos dois temas, inclusive o texto de apoio (5,8:1 ou mais).
- A `Folha`: foco no título, Tab preso, Esc, véu que fecha, foco de volta a quem abriu, o resto da página inerte.
- Os formulários: `fieldset` e `legend` em `Escolha`, `ValorPorToque` e `MarcarVarios`; rótulo e ajuda sempre à vista; erro ligado ao campo por `aria-describedby`.
- O texto de privacidade da foto: diz para onde vai, por quanto tempo, pede autorização antes do 1º envio e deixa retirar; os erros da foto distinguem rede, servidor, tamanho e arquivo ilegível.
- O botão principal preso embaixo nos passos 2 a 4 e em "Salvar local".
- `prefers-reduced-motion` e os números tabulares, resolvidos na base.
- A lista de Meus dados em linhas finas com a 2ª linha que mostra o valor atual; "Marcados (2)" com o desenho, "Mudar" e "Tirar".
- Os 4 desenhos de lugar e os 49 de equipamento.
