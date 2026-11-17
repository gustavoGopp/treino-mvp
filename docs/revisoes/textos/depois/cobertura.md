# Inventário dos textos: cobertura

Gerado por `scripts/textos/montar.ts` a partir da colheita (`colheita.json`) e da tabela escrita à mão em `scripts/textos/cobertura.ts`. Não edite este arquivo: mude a tabela e monte de novo (`npx vite-node scripts/textos/montar-agora.ts`).

## Como ler

- Cada linha da colheita (`colheita.json`) é uma tela, uma folha aberta por cima dela, um bloco aberto, um estado vazio, um aviso ou um erro. O `id` é `fluxo/NN-nome`; as capturas estão em `capturas/claro/<id>.png` e `capturas/escuro/<id>.png` (a 1ª dobra) e, nas telas mais altas que 844 px, em `capturas/claro/<id>-inteira.png`.
- A conta de palavras (`palavrasAVista`, `palavrasNaTela`, `blocosLongos`, `selos`, `porques`) é a régua de 13/11/2026, copiada sem mudar de `scripts/design/frontend-novo/capturas.spec.ts`. Com uma folha aberta, `palavrasNaTela` conta só a folha; `palavrasAVista` conta também o que está atrás do véu (é assim na régua).
- A soma de `palavras` dos `blocos` é sempre igual a `palavrasNaTela` (a colheita confere). O `texto` de um bloco junta os pedaços como aparecem na tela ("4+" e não "4 +"); por isso, contar as palavras do `texto` pode dar 1 ou 2 a menos que `palavras`.
- `dentroDe` é "folha" em tudo o que está numa folha aberta; fora de folha, "bloco aberto" no conteúdo de um `<details open>` e "tela" no resto. O campo a mais `blocoAberto` traz o rótulo do bloco que abre (também dentro de uma folha).
- `aVista` de um bloco: está na 1ª dobra e não está cortado por uma área que rola (a lista comprida dentro de uma folha).
- Campos a mais em cada tela: `listas` (as opções de cada lista do aparelho, que só aparecem ao tocar no campo), `textoDoCss` (texto que o CSS escreve e não está no DOM: "+ marcar", "✓ tenho", o "!" do erro, o "+" e o "−" dos blocos que abrem), `textoEmDesenho` (texto dentro do SVG do Boneco), `textosQueAlternam` (a fase do movimento e a respiração do guia, que mudam sozinhas), `tituloDoDocumento`, `rota`, `captura` e `capturaInteira`. Nenhum deles entra na conta de palavras.
- `nomesAcessiveis` lista o que o leitor de tela ouve e não está escrito: `aria-label`, `aria-labelledby` (em controles), `alt`, `title` e texto oculto (`.sr`), em controles, imagens, regiões, grupos e listas. `origem: "SEM NOME"` marca um controle ou imagem com função e sem nome.
- A persona Ana faz o cadastro pela interface nos testes `cadastro-ana`, `inicio-ana`, `inicio-ana-saude` e `treino-ana` (o caminho do roteiro de 13/11); nos outros, o estado pronto dela (o mesmo de `tests/e2e/apoio/estados-personas.ts`) é gravado no aparelho. As outras personas entram sempre pelo estado gravado. O Bruno usa os 2 locais fictícios de `tests/personas` e as 12 semanas parado que a persona descreve.
- Desde 16/11/2026 (commit f81e484), o selo de evidência e o "por quê?" só aparecem na página "Entenda o treino" (Meus dados) e nos Termos; fora delas, ficam só os "por quê?" de segurança e de privacidade (Boas-vindas e Meus dados). As folhas de selo e de "por quê?" que abriam nas outras telas não existem mais e saíram desta tabela. Toda folha "De onde vem isto" (o selo) mostra o texto de uma regra de `src/domain/regras/regras.json` e as fontes dela (`src/conteudo/fontes.json`). A colheita abriu uma amostra (o selo de "Carga" em "Como ler o treino" e os selos dos Termos) e fotografou "Todas as regras e as fontes" com as regras fechadas; as 100+ regras não foram abertas uma a uma: o texto delas está no JSON das regras.
- O guia de execução tem uma ficha de texto por exercício (`src/conteudo/exercicios/*.json`, 171 fichas). A colheita abriu 7 guias animados (búlgaro, 3º exercício da Ana, 2 de polia da Carla, 2 de corpo livre da Elisa e o supino do catálogo) e 1 cartão de texto; as outras fichas têm a mesma forma e estão nos JSON.
- O que não existe no app, e por isso não está na colheita: aviso de "sem rede" e aviso de "versão nova do app" (o service worker guarda os arquivos e se atualiza sozinho: `vite.config.ts`, `registerType: 'autoUpdate'`); aviso de instalar no Android (o aviso é só do iPhone e do iPad: `src/domain/dados/index.ts`); tela de carregando com texto (enquanto o pedaço da tela chega, só o fundo); tela de rota desconhecida (leva à Boas-vindas ou ao Início); validação ao gerar o programa sem equipamento (sem nada marcado, o programa usa o peso do corpo, e a tela diz isso antes); guia animado de exercício sem animação (`/guia/<id>` só aceita animações: o exercício sem animação mostra o cartão de texto, colhido no início e no treino).
- Na tela da série e no guia, o Boneco animado mostra a fase do movimento ("DESCIDA · EXCÊNTRICA", "TOPO · SEGURA"…), que muda sozinha: a conta de palavras dessas telas varia 1 a 3 palavras entre uma colheita e outra, conforme o instante da foto. É a única diferença de régua entre 13/11 e hoje nas telas que não mudaram (a tabela no fim compara as 41).
- Estados forçados na colheita, que por toque não aparecem: as mensagens de "falta" da Experiência e da Rotina sem resposta (o botão "Continuar" só aparece com as respostas) foram vistas forçando o envio do formulário; a gravação recusada pelo aparelho, forçando o erro do IndexedDB; a demora da foto, baixando a espera de 70 s para 4 s; a tela de erro, pela chave de teste do próprio app (`ProvaDeErro`).

## O que há no código e onde está na colheita

### `src/App.tsx`

| Linha | O que é | Tipo | Na colheita |
|---|---|---|---|
| 28 | `Carregando`: o fundo do app enquanto o pedaço da tela chega *(sem texto: só o fundo, com aria-busy)* | carregando |  |
| 44 | `/` Boas-vindas (com programa pronto, abre direto o Início) | rota | `cadastro/01-boas-vindas` |
| 45 | `/comecar/triagem` Saúde | rota | `cadastro/04-saude`<br>`cadastro/06-saude-quais-valem`<br>`cadastro/13-saude-pausa`<br>`dados-e-locais/39-refazer-a-triagem`<br>`dados-e-locais/42-refazer-a-triagem-com-sim` |
| 46 | `/comecar/nivel` Experiência | rota | `cadastro/15-experiencia-vazia`<br>`cadastro/23-experiencia-respondida`<br>`dados-e-locais/40-experiencia-com-o-programa-feito`<br>`dados-e-locais/53-refazer-o-nivel` |
| 47 | `/comecar/rotina` Rotina (e `?de=dados`: Rotina e divisão, Objetivo) | rota | `cadastro/24-rotina-vazia`<br>`cadastro/32-rotina-respondida`<br>`dados-e-locais/28-rotina-e-divisao`<br>`dados-e-locais/35-objetivo` |
| 48 | `/comecar/inventario` Equipamento | rota | `cadastro/33-equipamento-lugar`<br>`cadastro/80-equipamento-item-por-item`<br>`dados-e-locais/41-equipamento-com-o-programa-feito` |
| 49 | `/comecar/restricoes` Algo a evitar | rota | `dados-e-locais/36-algo-a-evitar` |
| 50 | `/programa` Início | rota | `inicio/03-inicio`<br>`inicio/45-inicio-diego`<br>`inicio/52-inicio-elisa`<br>`inicio/59-inicio-fabio`<br>`inicio/67-inicio-bruno`<br>`inicio/78-inicio-carla`<br>`inicio/01-inicio-depois-do-1o-treino` |
| 51 | `/locais` Meus locais | rota | `dados-e-locais/44-locais`<br>`dados-e-locais/49-locais-2-locais`<br>`dados-e-locais/51-locais-bruno` |
| 52 | `/locais/:id` Editar local e `/locais/novo` Novo local | rota | `dados-e-locais/45-locais-editar`<br>`dados-e-locais/46-locais-novo` |
| 53 | `/treino` Treino em andamento | rota | `treino/01-serie-vazia`<br>`treino/09-descanso` |
| 54 | `/treino/fim` Fim do treino | rota | `fim-e-semana/04-fim-do-treino`<br>`fim-e-semana/03-fim-sem-serie`<br>`fim-e-semana/10-fim-encerrado-por-seguranca` |
| 55 | `/semana` A sua semana | rota | `fim-e-semana/01-semana-vazia`<br>`fim-e-semana/06-semana-1-treino`<br>`fim-e-semana/11-semana-completa` |
| 56 | `/evolucao/:exId` Evolução | rota | `fim-e-semana/02-evolucao-vazia`<br>`fim-e-semana/08-evolucao-1-treino`<br>`fim-e-semana/12-evolucao-com-historico`<br>`fim-e-semana/16-evolucao-por-local` |
| 57 | `/dados` Meus dados | rota | `dados-e-locais/01-meus-dados`<br>`dados-e-locais/19-meus-dados-sem-dados`<br>`dados-e-locais/52-meus-dados-bruno` |
| 58 | `/guia` (leva ao 1º do catálogo) *(não há link para o catálogo dentro do app)* | rota | `guia/43-catalogo` |
| 59 | `/guia/:id` Guia de execução | rota | `guia/01-tecnica`<br>`guia/18-pelo-programa-tecnica`<br>`guia/43-catalogo` |
| 60 | `/termos` Termos de uso e privacidade | rota | `termos-e-foto/01-termos` |
| 62 | `/entenda` Entenda o treino (Meus dados → "Entenda o treino") | rota | `dados-e-locais/21-entenda` |
| 61 | `/dev/gerador` e `/lab/boneco` *(só em desenvolvimento e nas prévias: fora do app publicado, não colhidas)* | rota |  |
| 81 | rota desconhecida (leva a `/`) *(não tem texto próprio: abre a Boas-vindas ou o Início)* | rota | `cadastro/01-boas-vindas` |

### `src/features/app/Folha.tsx`

| Linha | O que é | Tipo | Na colheita |
|---|---|---|---|
| 125 | o botão de fechar de toda folha ("Fechar"; "Voltar" em "Terminar o treino agora?" e em "Apagar todos os dados?") | folha | `treino/22-folha-terminar-com-serie`<br>`dados-e-locais/18-meus-dados-folha-apagar-todos-os-dados` |

### `src/features/app/ui.tsx`

| Linha | O que é | Tipo | Na colheita |
|---|---|---|---|
| 48 | selo de evidência (robusta, moderada, 1 estudo, consenso; "fonte" nas frases sobre o app): só desenha em "Entenda o treino", nos Termos e dentro da folha de um "por quê?" essencial | folha | `inicio/15-como-ler-aberto`<br>`dados-e-locais/22-entenda-os-exercicios`<br>`termos-e-foto/01-termos`<br>`dados-e-locais/02-meus-dados-folha-o-que-sai-daqui` |
| 61 | folha "De onde vem isto" (a regra, o que o nível quer dizer e as fontes) | folha | `inicio/16-como-ler-folha-selo`<br>`termos-e-foto/02-termos-folha-selo-1`<br>`termos-e-foto/03-termos-folha-selo-2`<br>`termos-e-foto/04-termos-folha-selo-3` |
| 78 | folha de "por quê?" (o texto de apoio e as regras por extenso): fora de "Entenda o treino", só os essenciais (segurança e privacidade) | folha | `cadastro/02-boas-vindas-folha-o-que-o-app-nao-faz`<br>`dados-e-locais/02-meus-dados-folha-o-que-sai-daqui`<br>`dados-e-locais/03-meus-dados-folha-o-navegador-e-os-seus-dados` |
| 125 | "Carregando a regra…" *("Entenda o treino" pede as regras ao abrir: só aparece com o arquivo das regras ainda a caminho quando a pessoa toca no selo)* | carregando | `avisos-e-erros/16-selo-carregando-a-regra` |
| 129 | "Não deu para carregar a regra agora. Tente de novo com internet." + "Recarregar o app" | erro ou validação | `avisos-e-erros/20-selo-sem-a-regra` |
| 166 | "Carregando as fontes…" | carregando | `avisos-e-erros/18-selo-carregando-as-fontes` |
| 168 | "Não deu para carregar as fontes agora. As chaves são: …" | erro ou validação | `avisos-e-erros/19-selo-sem-as-fontes` |
| 180 | topo com o voltar ("‹ Meus dados", "‹ Semana", "‹ Treino", "‹ Meus locais", "‹ Início") | rota | `dados-e-locais/44-locais`<br>`fim-e-semana/08-evolucao-1-treino`<br>`fim-e-semana/09-evolucao-pelo-programa`<br>`dados-e-locais/45-locais-editar`<br>`termos-e-foto/01-termos` |
| 203 | barra de baixo: Treino, Semana, Meus dados | rota | `inicio/03-inicio` |
| 291 | link "Meu programa" no alto das telas do cadastro de quem já tem programa | aviso condicional | `dados-e-locais/39-refazer-a-triagem`<br>`dados-e-locais/40-experiencia-com-o-programa-feito` |
| 308 | "‹ Voltar" e "Passo N de 4" do cadastro | rota | `cadastro/04-saude`<br>`cadastro/15-experiencia-vazia`<br>`cadastro/24-rotina-vazia`<br>`cadastro/33-equipamento-lugar` |
| 439 | caixa "Falta pouco:" com a lista do que falta | erro ou validação | `cadastro/07-saude-quais-valem-erro-nenhuma-marcada`<br>`cadastro/58-equipamento-erro-detalhes-por-completar` |

### `src/features/app/avisos.tsx`

| Linha | O que é | Tipo | Na colheita |
|---|---|---|---|
| 25 | "Não foi possível salvar neste aparelho." + "Exportar meus dados" (Boas-vindas, Início, Treino, Fim e Meus dados) | erro ou validação | `avisos-e-erros/12-nao-foi-possivel-salvar-treino`<br>`avisos-e-erros/14-nao-foi-possivel-salvar-inicio` |
| 46 | aviso "Instale o app para não perder seus dados" (iPhone e iPad no navegador) *(não há texto para Android: o aviso só existe no iPhone e no iPad)* | aviso condicional | `avisos-e-erros/01-instalar-no-iphone-boas-vindas`<br>`avisos-e-erros/02-instalar-no-iphone-inicio` |
| 89 | lembrete "Guarde uma cópia dos seus treinos" (as 2 frases: nenhuma cópia ainda; treinos novos desde a última) | aviso condicional | `avisos-e-erros/03-lembrete-de-copia`<br>`avisos-e-erros/05-lembrete-de-copia-com-treinos-novos` |
| 104 | "Arquivo exportado. Guarde-o num lugar seguro…" (no lembrete de cópia) | resposta de uma ação | `avisos-e-erros/04-lembrete-de-copia-exportado` |

### `src/features/app/TelaDeErro.tsx`

| Linha | O que é | Tipo | Na colheita |
|---|---|---|---|
| 53 | tela de erro "Algo deu errado nesta tela" | erro ou validação | `avisos-e-erros/09-tela-de-erro` |
| 40 | "Não há dados guardados neste aparelho." | erro ou validação | `avisos-e-erros/11-tela-de-erro-sem-dados` |
| 44 | "Arquivo exportado. Guarde-o num lugar seguro…" (na tela de erro) | resposta de uma ação | `avisos-e-erros/10-tela-de-erro-exportado-e-aviso-aberto` |

### `src/features/app/privacidade.tsx`

| Linha | O que é | Tipo | Na colheita |
|---|---|---|---|
| 18 | texto curto da foto (com a foto ligada no build) | aviso condicional | `cadastro/03-boas-vindas-folha-seus-dados`<br>`dados-e-locais/02-meus-dados-folha-o-que-sai-daqui` |
| 29 | "Para onde vai a foto" (os 5 itens) | aviso condicional | `termos-e-foto/05-foto-sem-autorizacao`<br>`termos-e-foto/01-termos` |
| 86 | "Avisar um problema" aberto (sem e-mail no build: o texto para copiar) | bloco que abre | `dados-e-locais/12-meus-dados-avisar-um-problema`<br>`avisos-e-erros/10-tela-de-erro-exportado-e-aviso-aberto` |
| 79 | "Copiado. Cole numa mensagem…" e "Não deu para copiar: selecione o texto acima e copie." | resposta de uma ação | `dados-e-locais/13-meus-dados-avisar-um-problema-copia-1`<br>`dados-e-locais/14-meus-dados-avisar-um-problema-copia-2` |

### `src/features/onboarding/BoasVindas.tsx`

| Linha | O que é | Tipo | Na colheita |
|---|---|---|---|
| 40 | erro de leitura dos dados guardados + "Em Meus dados você pode importar um backup." | erro ou validação | `avisos-e-erros/06-dado-ilegivel-boas-vindas` |
| 52 | "o que o app não faz" | por quê | `cadastro/02-boas-vindas-folha-o-que-o-app-nao-faz` |
| 68 | "Seus dados ficam no aparelho" | folha | `cadastro/03-boas-vindas-folha-seus-dados` |

### `src/features/onboarding/Triagem.tsx`

| Linha | O que é | Tipo | Na colheita |
|---|---|---|---|
| 103 | "Vamos pausar o programa automático" (algum "sim" que pede avaliação) | aviso condicional | `cadastro/13-saude-pausa`<br>`cadastro/14-saude-pausa-liberacao-marcada`<br>`dados-e-locais/43-refazer-a-triagem-pausa` |
| 151 | "As 9 perguntas completas" | folha | `cadastro/05-saude-folha-perguntas-completas` |
| 173 | "Quais valem para você?" (a subtela do "sim") | rota | `cadastro/06-saude-quais-valem` |
| 58 | "Nenhuma marcada. Se nenhuma vale, volte e toque em “Não, nenhuma”." | erro ou validação | `cadastro/07-saude-quais-valem-erro-nenhuma-marcada` |
| 59 | "Marque pelo menos uma região com problema." | erro ou validação | `cadastro/08-saude-quais-valem-regioes-erro-sem-regiao` |
| 60 | "Dê a nota da dor de hoje na região marcada." / "…em cada região marcada." | erro ou validação | `cadastro/10-saude-quais-valem-regioes-erro-sem-uma-nota`<br>`cadastro/09-saude-quais-valem-regioes-erro-sem-notas` |
| 185 | "Quais regiões?" e a nota de dor de hoje de cada região (só com "sim" em osso e articulação) | aviso condicional | `cadastro/08-saude-quais-valem-regioes-erro-sem-regiao`<br>`cadastro/09-saude-quais-valem-regioes-erro-sem-notas` |
| 217 | "Escolha a nota de hoje." | erro ou validação | `cadastro/09-saude-quais-valem-regioes-erro-sem-notas` |
| 232 | "Nenhuma destas vale para você?" (as 2 frases: "esta" e "estas N") | folha | `cadastro/11-saude-folha-confirmar-nao-marcadas`<br>`cadastro/12-saude-folha-confirmar-nao-marcada-uma` |

### `src/features/onboarding/Nivel.tsx`

| Linha | O que é | Tipo | Na colheita |
|---|---|---|---|
| 73 | "Diga há quanto tempo…", "Diga se está treinando…", "Diga se tem confiança…" e "Escolha uma opção." (linhas 47 a 49, 81, 93 e 105) *(por toque não aparecem: sem as 3 respostas não há botão "Continuar"; vistas forçando o envio)* | erro ou validação | `cadastro/16-experiencia-erro-sem-resposta` |
| 112 | "Seu nível: …" com o motivo (5 motivos, em src/domain/nivel) e "Quer começar num nível mais leve?" | aviso condicional | `cadastro/23-experiencia-respondida`<br>`cadastro/19-experiencia-nivel-avancado`<br>`cadastro/20-experiencia-nivel-intermediario`<br>`cadastro/21-experiencia-nivel-iniciante-pela-pausa`<br>`cadastro/22-experiencia-nivel-iniciante-pela-tecnica` |
| 85 | uma pergunta por vez: a 2ª e a 3ª aparecem depois da resposta anterior | aviso condicional | `cadastro/17-experiencia-2a-pergunta`<br>`cadastro/18-experiencia-3a-pergunta` |

### `src/features/onboarding/Rotina.tsx`

| Linha | O que é | Tipo | Na colheita |
|---|---|---|---|
| 89 | "Escolha quantos dias por semana.", "Escolha quantos minutos por treino." e "Escolha uma opção." (linhas 65, 66, 103 e 121) *(por toque, no cadastro, não aparecem: sem os dias e os minutos não há botão "Continuar"; vistas forçando o envio)* | erro ou validação | `cadastro/25-rotina-erro-sem-resposta` |
| 66 | "Informe os minutos por sessão (de 20 a 150)." e "Use um número inteiro de 20 a 150." (linha 134) | erro ou validação | `cadastro/28-rotina-minutos-outro-erro` |
| 106 | uma pergunta por vez: os minutos e os grupos aparecem depois da resposta anterior | aviso condicional | `cadastro/26-rotina-2a-pergunta`<br>`cadastro/29-rotina-3a-pergunta` |
| 124 | campo "Outro: quantos minutos?" | aviso condicional | `cadastro/27-rotina-minutos-outro` |
| 157 | nota do foco (3 frases, em src/domain/gerador/opcoes.ts) | aviso condicional | `cadastro/32-rotina-respondida`<br>`cadastro/30-rotina-foco-3-grupos`<br>`cadastro/31-rotina-foco-bracos` |
| 190 | "Como prefere dividir? (opcional)", com as divisões de cada número de dias, "Recomendada" e "Deixar o app escolher" | aviso condicional | `dados-e-locais/28-rotina-e-divisao`<br>`dados-e-locais/29-rotina-e-divisao-com-escolhas`<br>`dados-e-locais/30-rotina-e-divisao-2-dias`<br>`dados-e-locais/31-rotina-e-divisao-4-dias`<br>`dados-e-locais/32-rotina-e-divisao-5-dias`<br>`dados-e-locais/33-rotina-e-divisao-6-dias` |

### `src/features/onboarding/Restricoes.tsx`

| Linha | O que é | Tipo | Na colheita |
|---|---|---|---|
| 60 | "Exercícios a evitar" | bloco que abre | `dados-e-locais/37-algo-a-evitar-exercicios` |

### `src/features/onboarding/Inventario.tsx`

| Linha | O que é | Tipo | Na colheita |
|---|---|---|---|
| 492 | "Há 1 detalhe para completar." / "Há N detalhes para completar." | erro ou validação | `cadastro/69-equipamento-erro-um-detalhe`<br>`cadastro/58-equipamento-erro-detalhes-por-completar` |
| 520 | depois de um atalho de lugar: o que o toque marcou, "Às vezes tem" e "Conferir os N itens ›" | aviso condicional | `cadastro/73-equipamento-lugar-academia`<br>`cadastro/74-equipamento-lugar-condominio`<br>`cadastro/75-equipamento-lugar-casa`<br>`cadastro/76-equipamento-lugar-corpo` |
| 554 | "Item por item": marcados, busca, categorias e grade | bloco que abre | `cadastro/35-equipamento-item-por-item-vazio`<br>`cadastro/80-equipamento-item-por-item`<br>`cadastro/77-equipamento-item-por-item-academia`<br>`cadastro/36-equipamento-categoria-bancos`<br>`cadastro/37-equipamento-categoria-polias-e-acessorios`<br>`cadastro/38-equipamento-categoria-barras`<br>`cadastro/39-equipamento-categoria-maquinas`<br>`cadastro/40-equipamento-categoria-outros-acessorios` |
| 559 | "Reconhecer pela foto" | folha | `cadastro/34-equipamento-folha-da-foto`<br>`termos-e-foto/05-foto-sem-autorizacao` |
| 583 | "falta completar" na linha do item marcado | erro ou validação | `cadastro/58-equipamento-erro-detalhes-por-completar` |
| 602 | busca pelo nome ("Procurar") | rota | `cadastro/42-equipamento-busca-com-resultado` |
| 622 | "Nada com “…”. Confira a escrita ou procure pela categoria." | estado vazio | `cadastro/41-equipamento-busca-sem-resultado` |
| 638 | folha de detalhes do item (12 itens têm detalhes) | folha | `cadastro/43-equipamento-folha-halteres-fixos`<br>`cadastro/45-equipamento-folha-anilhas-e-manoplas`<br>`cadastro/46-equipamento-folha-polia-simples`<br>`cadastro/47-equipamento-folha-banco-regulavel`<br>`cadastro/48-equipamento-folha-elasticos`<br>`cadastro/49-equipamento-folha-polia-dupla-crossover`<br>`cadastro/51-equipamento-folha-multifuncional`<br>`cadastro/52-equipamento-folha-kettlebell`<br>`cadastro/53-equipamento-folha-caneleiras-de-peso`<br>`cadastro/54-equipamento-folha-mini-band`<br>`cadastro/55-equipamento-folha-voador`<br>`cadastro/56-equipamento-folha-maquina-de-triceps`<br>`cadastro/78-equipamento-folha-do-item`<br>`cadastro/79-equipamento-folha-do-item-respondida` |
| 166 | campo "<pergunta>: outro valor" (em "Outro") | aviso condicional | `cadastro/44-equipamento-folha-halteres-fixos-outro` |
| 329 | "Placas da torre (opcional)" (polia dupla) | bloco que abre | `cadastro/50-equipamento-folha-polia-dupla-placas` |
| 646 | "Anilhas das máquinas e barras" e "Qual a menor anilha?" (com leg press, hack, smith, panturrilha sentada ou barra marcados) | aviso condicional | `cadastro/77-equipamento-item-por-item-academia` |

### `src/features/onboarding/inventarioForm.ts`

| Linha | O que é | Tipo | Na colheita |
|---|---|---|---|
| 224 | "Use um número maior que zero." / "Use um número inteiro maior que zero." | erro ou validação | `cadastro/57-equipamento-folha-halteres-fixos-erro`<br>`cadastro/59-equipamento-folha-anilhas-e-manoplas-erro`<br>`cadastro/62-equipamento-folha-elasticos-erro`<br>`cadastro/66-equipamento-folha-mini-band-erro` |
| 237 | "O mais pesado precisa ser maior ou igual ao mais leve." | erro ou validação | `cadastro/71-equipamento-folha-halteres-fixos-erro-ordem` |
| 239 | "O passo não pode ser maior que a diferença entre o mais leve e o mais pesado." | erro ou validação | `cadastro/72-equipamento-folha-halteres-fixos-erro-passo` |
| 241 | "O passo precisa ser de pelo menos … kg." e "Confira o peso: o app aceita até … kg por halter." (linha 242) | erro ou validação | `cadastro/70-equipamento-folha-halteres-fixos-erro-limites` |
| 251 | "Informe pelo menos um tipo de anilha (peso e quantidade)." | erro ou validação | `cadastro/59-equipamento-folha-anilhas-e-manoplas-erro` |
| 263 | "Diga onde fica a polia (no alto, embaixo ou regulável)." | erro ou validação | `cadastro/60-equipamento-folha-polia-simples-erro` |
| 269 | "Marque pelo menos uma estação do multifuncional." | erro ou validação | `cadastro/63-equipamento-folha-multifuncional-erro` |
| 273 | "Marque pelo menos um peso de kettlebell." e "…de caneleira." (linha 277) | erro ou validação | `cadastro/64-equipamento-folha-kettlebell-erro`<br>`cadastro/65-equipamento-folha-caneleiras-de-peso-erro` |
| 281 | "Diga se o voador também vira para trás.", "Diga se a máquina é com o braço acima da cabeça." (285) e "Diga se o banco também declina." (289) | erro ou validação | `cadastro/67-equipamento-folha-voador-erro`<br>`cadastro/68-equipamento-folha-maquina-de-triceps-erro`<br>`cadastro/61-equipamento-folha-banco-regulavel-erro` |

### `src/features/onboarding/FotoEquipamento.tsx`

| Linha | O que é | Tipo | Na colheita |
|---|---|---|---|
| 110 | "O que encontramos nas fotos" (com certeza, provável, talvez; a esteira; "Falta responder 1 item." / "Faltam responder N itens.") | folha | `termos-e-foto/10-foto-resultado`<br>`termos-e-foto/13-foto-resultado-2-por-responder` |
| 116 | "Não reconhecemos nenhum equipamento. Use a lista abaixo." | estado vazio | `termos-e-foto/14-foto-resultado-vazio` |
| 167 | quem já autorizou: "Você autorizou o envio… em <data>." + "Retirar a autorização" | aviso condicional | `termos-e-foto/11-foto-ja-autorizada` |
| 183 | "Para onde vai a foto" (para quem já autorizou) | bloco que abre | `termos-e-foto/12-foto-ja-autorizada-para-onde-vai` |
| 191 | caixa de consentimento "Antes de enviar: para onde vai a foto" | aviso condicional | `termos-e-foto/05-foto-sem-autorizacao`<br>`termos-e-foto/06-foto-autorizada`<br>`termos-e-foto/29-foto-autorizacao-retirada` |
| 210 | "Analisando as fotos…" | carregando | `termos-e-foto/09-foto-analisando` |
| 213 | "Falta marcar a autorização acima." | erro ou validação | `termos-e-foto/05-foto-sem-autorizacao` |
| 54 | "Digite o código de convite para usar a foto. Sem código, use a lista abaixo." | erro ou validação | `termos-e-foto/07-foto-erro-sem-codigo` |
| 58 | "Escolha até 5 fotos." | erro ou validação | `termos-e-foto/08-foto-erro-fotos-demais` |
| 79 | erros da foto no aparelho (src/domain/visao/index.ts:22 a 27): não abre, grandes demais, sem conexão, servidor, demora, análise | erro ou validação | `termos-e-foto/15-foto-erro-nao-abre`<br>`termos-e-foto/18-foto-erro-grandes-demais`<br>`termos-e-foto/17-foto-erro-sem-conexao`<br>`termos-e-foto/16-foto-erro-servidor-nao-respondeu`<br>`termos-e-foto/20-foto-erro-demora`<br>`termos-e-foto/19-foto-erro-analise` |
| 98 | mensagens que o servidor manda (api/_lib/pedido.ts:54 a 85), mostradas como vêm *(a função de visão é simulada por rota; as frases foram copiadas de api/_lib/pedido.ts)* | erro ou validação | `termos-e-foto/21-foto-erro-do-servidor-convite-invalido`<br>`termos-e-foto/22-foto-erro-do-servidor-muitas-tentativas`<br>`termos-e-foto/23-foto-erro-do-servidor-limite-de-fotos`<br>`termos-e-foto/24-foto-erro-do-servidor-nao-configurado`<br>`termos-e-foto/25-foto-erro-do-servidor-pedido-invalido`<br>`termos-e-foto/26-foto-erro-do-servidor-formato-nao-aceito`<br>`termos-e-foto/27-foto-erro-do-servidor-tamanho-no-servidor`<br>`termos-e-foto/28-foto-erro-do-servidor-modelo` |

### `src/features/programa/Programa.tsx`

| Linha | O que é | Tipo | Na colheita |
|---|---|---|---|
| 69 | "Programa pausado" (a triagem bloqueia, ou nenhum exercício é possível com a dor de hoje) | aviso condicional | `inicio/40-programa-pausado-pela-triagem`<br>`inicio/41-programa-pausado-sem-exercicio` |
| 157 | linha de aviso "Pela triagem: …" e o bloco "Pela triagem" (até o 1º treino) | aviso condicional | `inicio/33-inicio-ana-saude`<br>`inicio/36-folha-avisos-ana-saude` |
| 170 | "Para dar a nota de hoje, volte à triagem." (região sem nota, de um estado antigo) | aviso condicional | `inicio/42-folha-avisos-dor-sem-nota` |
| 181 | "Há uma versão nova do seu programa." + "Atualizar" + "Mais N avisos" | aviso condicional | `inicio/23-inicio-versao-nova`<br>`inicio/24-inicio-versao-nova-folha-mais-avisos`<br>`inicio/21-inicio-depois-de-mudar-a-rotina` |
| 192 | linha de aviso "Semana leve até …" e "Semana leve? (opcional)" | aviso condicional | `fim-e-semana/29-inicio-semana-leve-ativa`<br>`fim-e-semana/24-inicio-oferta-de-semana-leve` |
| 197 | "O tempo dos seus treinos" (linha de aviso e bloco, com "Ajustar" e "Não") | aviso condicional | `fim-e-semana/36-inicio-aviso-do-tempo`<br>`fim-e-semana/37-inicio-aviso-do-tempo-folha-avisos` |
| 226 | linha de aviso dos ajustes ("Alguns músculos ficaram abaixo da meta." / "Algum treino passa do tempo." + "Dá para ajustar.") | aviso condicional | `inicio/03-inicio`<br>`inicio/59-inicio-fabio` |
| 99 | "Programa mantido." | resposta de uma ação | `inicio/26-inicio-programa-mantido` |
| 118 | "Programa gerado de novo: …." | resposta de uma ação | `inicio/28-inicio-programa-gerado-de-novo` |
| 135 | "Preferência salva. Ela entra quando você atualizar o programa e nas trocas de local." (também na linha 622, dentro da folha) | resposta de uma ação | `inicio/22-folha-do-exercicio-preferencia-salva` |
| 186 | "Programa atualizado com as regras novas." | resposta de uma ação | `inicio/25-inicio-programa-atualizado` |
| 211 | "Estimativa ajustada ao seu tempo real." | resposta de uma ação | `fim-e-semana/38-inicio-tempo-ajustado` |
| 286 | "Tudo bem: o programa segue, com a mesma volta leve." | resposta de uma ação | `fim-e-semana/23-inicio-volta-200-dias-agora-nao` |
| 245 | abas dos dias de treino | rota | `inicio/04-inicio-aba-corpo-todo-b`<br>`inicio/05-inicio-aba-corpo-todo-c`<br>`inicio/34-inicio-ana-saude-aba-corpo-todo-b`<br>`inicio/35-inicio-ana-saude-aba-corpo-todo-c`<br>`inicio/46-inicio-diego-aba-corpo-todo-b`<br>`inicio/47-inicio-diego-aba-corpo-todo-c`<br>`inicio/53-inicio-elisa-aba-corpo-todo-b`<br>`inicio/54-inicio-elisa-aba-corpo-todo-c`<br>`inicio/60-inicio-fabio-aba-inferior-a`<br>`inicio/61-inicio-fabio-aba-superior-b`<br>`inicio/62-inicio-fabio-aba-inferior-b`<br>`inicio/68-inicio-bruno-aba-inferior-a`<br>`inicio/69-inicio-bruno-aba-superior-b`<br>`inicio/70-inicio-bruno-aba-inferior-b`<br>`inicio/79-inicio-carla-aba-inferior`<br>`inicio/80-inicio-carla-aba-empurrar`<br>`inicio/81-inicio-carla-aba-puxar`<br>`inicio/82-inicio-carla-aba-pernas` |
| 306 | "Onde vou treinar hoje?" (com 2 locais), "Em <local>: o que muda neste treino." / "tudo do programa é possível aqui." e as trocas | aviso condicional | `inicio/67-inicio-bruno`<br>`inicio/74-inicio-bruno-na-academia-do-bairro-superior-a`<br>`inicio/75-inicio-bruno-na-academia-do-bairro-inferior-a`<br>`inicio/76-inicio-bruno-na-academia-do-bairro-superior-b`<br>`inicio/77-inicio-bruno-na-academia-do-bairro-inferior-b`<br>`inicio/43-inicio-com-2-locais-e-versao-nova` |
| 361 | "Avisos" | folha | `inicio/14-folha-avisos`<br>`inicio/48-folha-avisos-diego`<br>`inicio/55-folha-avisos-elisa`<br>`inicio/63-folha-avisos-fabio`<br>`inicio/36-folha-avisos-ana-saude` |
| 374 | "O programa será atualizado depois do treino em andamento." | aviso condicional | `inicio/29-inicio-com-treino-em-andamento-e-versao-nova` |
| 418 | "Continuar o treino em andamento" (no lugar de "Começar o treino …") | aviso condicional | `inicio/20-inicio-com-treino-em-andamento` |
| 458 | cartão da volta de uma pausa "Bem-vindo de volta!" (4 textos, em src/domain/acompanhamento/volta.ts) + "Refazer o nível" e "Agora não" | aviso condicional | `fim-e-semana/20-inicio-volta-15-dias`<br>`fim-e-semana/17-inicio-volta-22-dias`<br>`fim-e-semana/21-inicio-volta-60-dias`<br>`fim-e-semana/22-inicio-volta-200-dias` |
| 517 | bloco "Ajustes possíveis" | aviso condicional | `inicio/14-folha-avisos`<br>`inicio/24-inicio-versao-nova-folha-mais-avisos` |
| 583 | folha do exercício | folha | `inicio/06-folha-do-exercicio`<br>`inicio/51-folha-do-exercicio-diego`<br>`inicio/58-folha-do-exercicio-elisa`<br>`inicio/66-folha-do-exercicio-fabio`<br>`inicio/73-folha-do-exercicio-bruno`<br>`inicio/85-folha-do-exercicio-carla`<br>`inicio/39-folha-do-exercicio-ana-saude` |
| 590 | "· bi-set", "· última série em drop set" e "Bi-set com …: alterne os dois e descanse depois da dupla." (linha 600) | aviso condicional | `inicio/06-folha-do-exercicio`<br>`inicio/32-folha-do-exercicio-com-drop-set` |
| 624 | "Ver a evolução deste exercício" (com histórico) | aviso condicional | `inicio/02-folha-do-exercicio-com-historico` |
| 792 | "Se o equipamento estiver ocupado" (as alternativas) | aviso condicional | `inicio/06-folha-do-exercicio` |
| 795 | "Ver mais N opções" (alternativas) | bloco que abre | `inicio/07-folha-do-exercicio-ver-mais-opcoes` |

### `src/features/programa/ComoEsta.tsx`

| Linha | O que é | Tipo | Na colheita |
|---|---|---|---|
| 38 | "Não deu para conferir o programa agora. O seu treino continua valendo." + "Tentar de novo" (em "Entenda o treino" → "O seu programa") | erro ou validação | `avisos-e-erros/15-sobre-o-programa-sem-conferir` |
| 45 | "Conferindo o programa…" (em "Entenda o treino" → "O seu programa") | carregando | `inicio/44-sobre-o-programa-conferindo` |
| 50 | "Como está o seu programa" (o título é só para o leitor de tela): o resumo e os achados (Segurança, Alerta, Ajustar) | aviso condicional | `inicio/08-sobre-o-programa`<br>`inicio/37-sobre-o-programa-ana-saude` |
| 59 | "Limites e observações (N)" | bloco que abre | `inicio/09-sobre-o-programa-limites-e-observacoes` |

### `src/features/programa/ComoLer.tsx`

| Linha | O que é | Tipo | Na colheita |
|---|---|---|---|
| 9 | as definições do treino (Série, Repetição, Carga, Descanso, RIR e, no iniciante, "As primeiras semanas"), dentro de "Entenda o treino" → "Como ler o treino" | aviso condicional | `inicio/15-como-ler-aberto` |

### `src/features/programa/CartaoTexto.tsx`

| Linha | O que é | Tipo | Na colheita |
|---|---|---|---|
| 42 | "Não deu para carregar o guia em texto deste exercício agora." + "Tentar de novo" / "Recarregar o app" | erro ou validação | `avisos-e-erros/23-guia-em-texto-nao-baixou-na-folha`<br>`avisos-e-erros/24-guia-em-texto-nao-baixou-2a-vez`<br>`avisos-e-erros/25-guia-em-texto-nao-baixou-no-treino` |
| 73 | cartão de texto do exercício sem animação: "Montagem segura" (quando a ficha tem) e "Como fazer" (até 16/11, "Como fazer: dicas e erros") | aviso condicional | `inicio/17-folha-do-exercicio-sem-animacao`<br>`treino/43-exercicio-sem-animacao`<br>`treino/47-carla-inferior-1` |
| 78 | "Como fazer (em texto)" | folha | `inicio/18-folha-como-fazer-em-texto`<br>`treino/44-exercicio-sem-animacao-folha-como-fazer` |
| 96 | "Posição, execução e carga, passo a passo" | bloco que abre | `inicio/19-folha-como-fazer-em-texto-passo-a-passo`<br>`treino/45-exercicio-sem-animacao-folha-como-fazer-passo-a-passo` |

### `src/features/programa/Prefiro.tsx`

| Linha | O que é | Tipo | Na colheita |
|---|---|---|---|
| 62 | "Prefere algum destes? …" e os botões "Prefiro …" / "Você prefere … · desfazer" | aviso condicional | `inicio/06-folha-do-exercicio`<br>`inicio/22-folha-do-exercicio-preferencia-salva`<br>`treino/32-folha-trocar-exercicio-com-preferencia` |

### `src/features/programa/Miniatura.tsx`

| Linha | O que é | Tipo | Na colheita |
|---|---|---|---|
| 20 | miniatura sem animação: "guia em texto" | estado vazio | `inicio/04-inicio-aba-corpo-todo-b` |

### `src/features/treino/Treino.tsx`

| Linha | O que é | Tipo | Na colheita |
|---|---|---|---|
| 191 | cabeçalho do treino: "×", "N de M", o livro (ver como fazer), "⋯" e "Senti algo" | rota | `treino/01-serie-vazia` |
| 325 | a mesma tela da série nos outros exercícios e nas outras personas (o nome, a legenda do guia e o tipo de carga mudam) | rota | `treino/16-exercicio-2`<br>`treino/18-exercicio-3`<br>`treino/19-exercicio-4`<br>`treino/20-exercicio-5`<br>`treino/21-exercicio-6`<br>`treino/47-carla-inferior-1`<br>`treino/48-carla-inferior-2`<br>`treino/49-carla-inferior-3`<br>`treino/50-carla-inferior-4`<br>`treino/51-carla-inferior-5`<br>`treino/52-carla-inferior-6`<br>`treino/53-carla-inferior-7`<br>`treino/54-carla-inferior-8`<br>`treino/57-elisa-exercicio-1`<br>`treino/59-elisa-exercicio-2`<br>`treino/60-elisa-exercicio-3`<br>`treino/61-elisa-exercicio-4`<br>`treino/62-diego-exercicio-1`<br>`treino/63-diego-exercicio-2`<br>`treino/64-diego-exercicio-3`<br>`treino/65-fabio-exercicio-1`<br>`treino/66-fabio-exercicio-2`<br>`treino/67-fabio-exercicio-3`<br>`treino/68-bruno-volta-da-pausa-exercicio-1`<br>`treino/69-bruno-troca-do-local-2` |
| 781 | botão "Série feita · descansar m:ss" (e "Série feita" com o descanso contando) | rota | `treino/08-serie-preenchida`<br>`treino/13-serie-com-descanso` |
| 223 | orientação de segurança depois de "Senti algo" (as frases vêm de src/domain/triagem/index.ts:124 a 158) + "Nota N guardada…" (linhas 430 a 433) | aviso condicional | `treino/23-aviso-dor-0`<br>`treino/24-aviso-dor-2-antes-da-serie`<br>`treino/25-aviso-dor-4-antes-da-serie`<br>`treino/28-aviso-dor-4`<br>`treino/26-aviso-dor-4-sem-carga-menor`<br>`treino/34-exercicio-encerrado-pela-dor` |
| 228 | tela do descanso (o que vem a seguir, as séries feitas, "−15 s", "+15 s", "Pular", "Série N feita") | aviso condicional | `treino/09-descanso`<br>`treino/12-descanso-sem-o-desfazer` |
| 242 | descanso com a série seguinte por preencher: "Falta escolher a carga" + "Preencher a série N" (ao passar para outro exercício com o descanso contando) | aviso condicional | `treino/17-hora-da-proxima-serie` |
| 254 | descanso depois da última série: "A seguir · exercício N de M" + "Próximo exercício" | aviso condicional | `treino/29-descanso-entre-exercicios` |
| 282 | "Série N salva" + "Desfazer" (5 s) | resposta de uma ação | `treino/09-descanso` |
| 282 | "Série N anotada, mas não salva" | erro ou validação | `avisos-e-erros/13-nao-foi-possivel-salvar-serie` |
| 296 | faixa do descanso sobre a série ("Descanso" / "Hora da próxima série") | aviso condicional | `treino/13-serie-com-descanso` |
| 315 | motivo da troca pelo local ("Aqui não tem …: … → ….") | aviso condicional | `treino/69-bruno-troca-do-local-2` |
| 318 | "No lugar de …, só neste treino." | aviso condicional | `treino/31-exercicio-trocado`<br>`treino/56-carla-contrapeso` |
| 342 | "Exercício encerrado. Se quiser, troque pela alternativa abaixo ou siga para o próximo." | aviso condicional | `treino/34-exercicio-encerrado-pela-dor` |
| 351 | "Antes: 1–2 séries leves de aquecimento, sem contar." | aviso condicional | `treino/01-serie-vazia` |
| 357 | mensagem da calibração ("Calibração: Ficou leve/pesada: na próxima série, …") | aviso condicional | `treino/13-serie-com-descanso`<br>`treino/27-serie-depois-da-calibracao` |
| 376 | "Séries completas." + "Próximo exercício" / "Terminar treino" | aviso condicional | `treino/30-exercicio-completo`<br>`treino/36-ultimo-exercicio-completo` |
| 395 | "Trocar só neste treino por:" | folha | `treino/14-folha-trocar-exercicio`<br>`treino/33-folha-trocar-depois-da-dor`<br>`treino/35-folha-trocar-depois-do-sinal`<br>`treino/55-carla-folha-trocar-exercicio` |
| 417 | "O que você sentiu?" (Senti algo) | folha | `treino/10-folha-senti-algo` |
| 458 | "Mais opções" (com e sem "Desfazer a última série") | folha | `treino/11-folha-mais-opcoes`<br>`treino/42-folha-mais-opcoes-sem-serie` |
| 490 | "Terminar o treino agora?" (sem série: descartar ou guardar; com série: "Você terminou N de M exercícios.") | folha | `treino/41-folha-terminar-sem-serie`<br>`treino/22-folha-terminar-com-serie`<br>`treino/37-folha-terminar-com-exercicios-por-fazer` |
| 539 | "1ª vez: comece leve." (a calibração; o motivo está em "Entenda o treino" → "Os exercícios") | aviso condicional | `treino/01-serie-vazia` |
| 544 | "Hoje: <carga>" / "Hoje: mesma carga" (o motivo, que vem de src/domain/progressao, está em "Entenda o treino" → "Os exercícios") | aviso condicional | `treino/38-serie-com-sugestao-do-dia`<br>`treino/46-treino-na-volta` |
| 738 | "Drop set (opcional)", com as 2 quedas (na última série do exercício com drop set) | aviso condicional | `treino/40-serie-com-drop-set`<br>`treino/39-exercicio-com-drop-set` |
| 787 | "Falta escolher a carga e quantas ainda conseguiria." / "Falta escolher a carga." / "Falta dizer quantas ainda conseguiria." | erro ou validação | `treino/01-serie-vazia`<br>`treino/06-serie-falta-a-carga`<br>`treino/07-serie-falta-a-reserva` |
| 829 | carga em anilhas: "Anilhas por lado" + "Sem contar o peso do trenó ou da barra da máquina." | aviso condicional | `treino/52-carla-inferior-6` |
| 847 | carga em contrapeso: "Contrapeso (placa)" + "Aqui é ao contrário: mais placa = mais ajuda. Para progredir, tire uma placa." | aviso condicional | `treino/56-carla-contrapeso` |
| 872 | carga em degraus: "Dificuldade" (peso do corpo e elástico; as opções da lista estão em `listas`) | aviso condicional | `treino/57-elisa-exercicio-1`<br>`treino/62-diego-exercicio-1` |
| 891 | carga em placas: "Placa" | aviso condicional | `treino/49-carla-inferior-3` |
| 925 | carga em kg: "Carga" (com a lista das cargas do aparelho, ou de 2,5 em 2,5 kg na barra) | aviso condicional | `treino/01-serie-vazia`<br>`treino/47-carla-inferior-1` |
| 978 | "Este exercício não tem alternativa com o seu equipamento." | estado vazio | `treino/58-elisa-folha-trocar-sem-alternativa` |
| 992 | "Ver mais N opções" (na troca) | bloco que abre | `treino/15-folha-trocar-exercicio-ver-mais`<br>`treino/55-carla-folha-trocar-exercicio` |

### `src/features/treino/Temporizador.tsx`

| Linha | O que é | Tipo | Na colheita |
|---|---|---|---|
| 195 | fim do descanso: "Hora da próxima série", "+m:ss" e "Ok" (a tela inverte); "Descanso terminado." para o leitor de tela | aviso condicional | `treino/17-hora-da-proxima-serie` |

### `src/features/treino/PalcoTreino.tsx`

| Linha | O que é | Tipo | Na colheita |
|---|---|---|---|
| 160 | "O guia animado não carregou agora. O registro da série continua funcionando." + "Tentar de novo" | erro ou validação | `avisos-e-erros/22-guia-animado-nao-carregou` |
| 183 | os 4 modos do guia dentro do treino (Técnica, Erros, Músculos, Trajetória) e a legenda de cada um | rota | `treino/01-serie-vazia`<br>`treino/02-serie-vazia-guia-erros`<br>`treino/03-serie-vazia-guia-musculos`<br>`treino/04-serie-vazia-guia-trajetoria`<br>`treino/05-serie-vazia-guia-pausado` |

### `src/features/treino/Resumo.tsx`

| Linha | O que é | Tipo | Na colheita |
|---|---|---|---|
| 67 | "Treino encerrado por segurança" + a orientação e "Ligar para o SAMU: 192" | aviso condicional | `fim-e-semana/10-fim-encerrado-por-seguranca` |
| 97 | "O que mudou hoje": a semana, os recordes e "N exercício(s) com carga para subir na próxima vez." | aviso condicional | `fim-e-semana/04-fim-do-treino`<br>`fim-e-semana/13-fim-com-recorde` |
| 158 | "Para a próxima vez": Subir, Manter, Reduzir, Voltar à anterior, Estagnado, Ajustar, Trocar, Calibrar *(colhidos: Calibrar, Manter, Subir, Reduzir, Estagnado e Ajustar; faltam "Voltar à anterior" e "Trocar" (Resumo.tsx:18 a 27). O motivo de cada um saiu do fim do treino e está em "Entenda o treino" → "Os exercícios")* | aviso condicional | `fim-e-semana/04-fim-do-treino`<br>`fim-e-semana/13-fim-com-recorde`<br>`fim-e-semana/35-fim-com-dor`<br>`fim-e-semana/27-fim-com-oferta-de-semana-leve` |
| 174 | confirmação "Apagar este treino?" | aviso condicional | `fim-e-semana/05-fim-apagar-este-treino` |

### `src/features/acompanhamento/Semana.tsx`

| Linha | O que é | Tipo | Na colheita |
|---|---|---|---|
| 35 | faixa "A sua semana" no Início (depois do 1º treino), e o Início com histórico | aviso condicional | `inicio/01-inicio-depois-do-1o-treino`<br>`inicio/30-inicio-semana-completa`<br>`inicio/31-inicio-ana-na-3a-semana` |
| 72 | frase da semana (5 formas, em src/domain/acompanhamento/semana.ts:144 a 151) | aviso condicional | `fim-e-semana/01-semana-vazia`<br>`fim-e-semana/06-semana-1-treino`<br>`fim-e-semana/14-semana-2-de-3`<br>`fim-e-semana/11-semana-completa` |
| 76 | "Últimas N semanas" | aviso condicional | `fim-e-semana/11-semana-completa`<br>`fim-e-semana/14-semana-2-de-3` |
| 94 | "O que subiu nesta semana" (subiu a carga, recorde) | aviso condicional | `fim-e-semana/11-semana-completa` |
| 137 | estado de cada músculo (na meta, crescendo, mantendo, ainda não treinou) e "o seu programa planeja N de M: …" | aviso condicional | `fim-e-semana/06-semana-1-treino`<br>`fim-e-semana/11-semana-completa` |
| 145 | "Como ler este quadro" *(o bloco está de saída da Semana: o que ele explica também está em "Entenda o treino" → "A sua semana e as pausas")* | bloco que abre | *não existe nesta versão do app: fim-e-semana/semana-como-ler-este-quadro* |
| 149 | "Nesta semana, a meta é o que o programa prescreveu para ela." (semana leve ou volta de pausa) / "A meta é a do seu programa." (dentro de "Como ler este quadro") | aviso condicional | `fim-e-semana/32-semana-na-semana-leve`<br>*não existe nesta versão do app: fim-e-semana/semana-como-ler-este-quadro* |
| 157 | "Um programa que cabe melhor?" (a revisão da meta) | aviso condicional | `fim-e-semana/15-semana-revisao-da-meta` |
| 180 | "Sua evolução" (a lista dos exercícios com histórico) | aviso condicional | `fim-e-semana/06-semana-1-treino` |

### `src/features/acompanhamento/SemanaLeve.tsx`

| Linha | O que é | Tipo | Na colheita |
|---|---|---|---|
| 20 | aviso de dor que se repete (o texto vem de src/domain/acompanhamento/semana-leve.ts) | aviso condicional | `fim-e-semana/33-inicio-dor-que-se-repete` |
| 28 | "Semana leve até …" + "Voltar ao normal" | aviso condicional | `fim-e-semana/28-fim-com-semana-leve-ativa`<br>`fim-e-semana/30-inicio-semana-leve-ativa-folha-avisos` |
| 39 | "Semana leve? (opcional)", com o motivo, "Fazer a semana leve" e "Agora não" | aviso condicional | `fim-e-semana/27-fim-com-oferta-de-semana-leve`<br>`fim-e-semana/26-semana-com-oferta-de-semana-leve`<br>`fim-e-semana/25-inicio-oferta-de-semana-leve-folha-avisos`<br>`fim-e-semana/34-inicio-dor-que-se-repete-folha-avisos` |

### `src/features/acompanhamento/Evolucao.tsx`

| Linha | O que é | Tipo | Na colheita |
|---|---|---|---|
| 35 | "Ainda não há treino registrado deste exercício. A evolução aparece depois do 1º treino com ele." | estado vazio | `fim-e-semana/02-evolucao-vazia` |
| 38 | "Em <local>" e "Nas máquinas, cada local tem a sua lista…" (máquina, com 2 locais) | aviso condicional | `fim-e-semana/16-evolucao-por-local` |
| 73 | resumo da evolução ("<série> · 1 treino" / "Começou com … · agora … · N treinos") e as marcas | aviso condicional | `fim-e-semana/08-evolucao-1-treino`<br>`fim-e-semana/12-evolucao-com-historico`<br>`fim-e-semana/09-evolucao-pelo-programa` |

### `src/features/guia/Guia.tsx`

| Linha | O que é | Tipo | Na colheita |
|---|---|---|---|
| 293 | faixa do descanso no alto do guia aberto pelo treino | aviso condicional | `guia/17-tecnica-com-descanso` |
| 300 | cabeçalho do guia: "Voltar ao treino" + "Senti algo", ou "Voltar ao programa" | aviso condicional | `guia/01-tecnica`<br>`guia/18-pelo-programa-tecnica` |
| 313 | cabeçalho do catálogo: "Guia de execução", os grupos e os exercícios | aviso condicional | `guia/43-catalogo`<br>`guia/44-catalogo-novas` |
| 341 | a fase do movimento e a respiração sobre o Boneco (mudam sozinhas: campo `textosQueAlternam`) | aviso condicional | `guia/01-tecnica` |
| 376 | as vistas ("Visão"), "Pausar"/"Reproduzir", "Voltar à posição inicial" e "Lento" | rota | `guia/02-tecnica-vista-frontal`<br>`guia/03-tecnica-pausado-e-lento` |
| 384 | os 4 modos ("Informação") e a legenda de cada um (linhas 514 a 600) | rota | `guia/01-tecnica`<br>`guia/04-erros`<br>`guia/07-musculos`<br>`guia/08-trajetoria` |
| 532 | modo Erros: um botão por erro, com a descrição do escolhido | rota | `guia/04-erros`<br>`guia/05-erros-2`<br>`guia/06-erros-3` |
| 407 | nota do exercício abaixo do palco ("Montagem segura…") | aviso condicional | `guia/45-catalogo-nota-de-montagem-segura` |
| 426 | a prescrição da pessoa ("Semana N: … · RIR … · descanso … · fase de aprendizado") ou, no catálogo, "As séries, as repetições e o RIR vêm do seu programa." | aviso condicional | `guia/01-tecnica`<br>`guia/43-catalogo` |
| 607 | "Confira em 5 segundos" (a lista de conferência e "Desmarcar tudo") | rota | `guia/16-lista-de-conferencia` |
| 639 | "Montagem" (vem aberto) | bloco que abre | `guia/09-bloco-montagem` |
| 648 | "Execução e tempo" | bloco que abre | `guia/10-bloco-execucao-e-tempo` |
| 662 | "Amplitude" | bloco que abre | `guia/11-bloco-amplitude` |
| 668 | "Respiração" | bloco que abre | `guia/12-bloco-respiracao` |
| 674 | "Onde sentir" | bloco que abre | `guia/13-bloco-onde-sentir` |
| 681 | "Erros comuns" | bloco que abre | `guia/14-bloco-erros-comuns` |
| 694 | "O que varia de pessoa para pessoa" | bloco que abre | `guia/15-bloco-o-que-varia-de-pessoa-para-pessoa` |
| 474 | rodapé "Segurança" e "Voltar para o treino" / "Voltar para o programa" | rota | `guia/01-tecnica`<br>`guia/18-pelo-programa-tecnica` |
| 1 | o guia de outros exercícios (o tamanho do texto muda por ficha) | rota | `guia/18-pelo-programa-tecnica`<br>`guia/19-pelo-programa-erros`<br>`guia/20-pelo-programa-musculos`<br>`guia/21-pelo-programa-trajetoria`<br>`guia/22-pelo-programa-tudo-aberto`<br>`guia/23-carla-polia-tecnica`<br>`guia/24-carla-polia-erros`<br>`guia/25-carla-polia-musculos`<br>`guia/26-carla-polia-trajetoria`<br>`guia/27-carla-polia-tudo-aberto`<br>`guia/28-carla-polia-remada-tecnica`<br>`guia/29-carla-polia-remada-erros`<br>`guia/30-carla-polia-remada-musculos`<br>`guia/31-carla-polia-remada-trajetoria`<br>`guia/32-carla-polia-remada-tudo-aberto`<br>`guia/33-elisa-corpo-livre-1-tecnica`<br>`guia/34-elisa-corpo-livre-1-erros`<br>`guia/35-elisa-corpo-livre-1-musculos`<br>`guia/36-elisa-corpo-livre-1-trajetoria`<br>`guia/37-elisa-corpo-livre-1-tudo-aberto`<br>`guia/38-elisa-corpo-livre-2-tecnica`<br>`guia/39-elisa-corpo-livre-2-erros`<br>`guia/40-elisa-corpo-livre-2-musculos`<br>`guia/41-elisa-corpo-livre-2-trajetoria`<br>`guia/42-elisa-corpo-livre-2-tudo-aberto` |

### `src/features/entenda/Entenda.tsx`

| Linha | O que é | Tipo | Na colheita |
|---|---|---|---|
| 128 | "Entenda o treino": os 7 blocos fechados | rota | `dados-e-locais/21-entenda` |
| 131 | "Como ler o treino" (até 16/11, "Como ler o seu treino", no início) | bloco que abre | `inicio/15-como-ler-aberto`<br>`inicio/16-como-ler-folha-selo` |
| 136 | "O seu programa" (até 16/11, a folha "Sobre o programa" do início): o resumo, a fase, "Como está o seu programa" e os blocos de dentro | bloco que abre | `inicio/08-sobre-o-programa`<br>`inicio/49-sobre-o-programa-diego`<br>`inicio/56-sobre-o-programa-elisa`<br>`inicio/64-sobre-o-programa-fabio`<br>`inicio/71-sobre-o-programa-bruno`<br>`inicio/83-sobre-o-programa-carla`<br>`inicio/37-sobre-o-programa-ana-saude` |
| 143 | "Semana N." + o texto da fase (aprendizado, volta da pausa, semana leve) | aviso condicional | `inicio/08-sobre-o-programa`<br>`inicio/71-sobre-o-programa-bruno`<br>`fim-e-semana/18-sobre-o-programa-na-volta`<br>`fim-e-semana/31-sobre-o-programa-na-semana-leve` |
| 149 | "Ver ajustes possíveis" (depois de "Manter") | aviso condicional | `inicio/27-sobre-o-programa-ver-ajustes` |
| 163 | "Avisos (N)" | bloco que abre | `inicio/10-sobre-o-programa-avisos`<br>`inicio/50-sobre-o-programa-diego-tudo-aberto`<br>`inicio/57-sobre-o-programa-elisa-tudo-aberto`<br>`inicio/65-sobre-o-programa-fabio-tudo-aberto`<br>`inicio/72-sobre-o-programa-bruno-tudo-aberto`<br>`inicio/38-sobre-o-programa-ana-saude-tudo-aberto` |
| 175 | "Fases (N)" | bloco que abre | `inicio/11-sobre-o-programa-fases`<br>`inicio/72-sobre-o-programa-bruno-tudo-aberto` |
| 186 | "Por que este programa (N)" | bloco que abre | `inicio/12-sobre-o-programa-por-que-este-programa`<br>`inicio/84-sobre-o-programa-carla-tudo-aberto` |
| 196 | "Séries por músculo" (até 16/11, "Séries por músculo na semana") | bloco que abre | `inicio/13-sobre-o-programa-series-por-musculo-na-semana` |
| 226 | "Os exercícios: por que cada um e a próxima carga": um bloco por exercício, com a próxima carga, o motivo dela e os motivos do exercício (até 16/11, "Por que este exercício" na folha do exercício e os "por quê?" do treino e do fim do treino) | bloco que abre | `dados-e-locais/22-entenda-os-exercicios` |
| 258 | "A sua semana e as pausas": a mensagem da semana, a mensagem da volta de uma pausa (quando há) e o que conta no quadro da semana (até 16/11, os "por quê?" da volta e do fim do treino) | bloco que abre | `dados-e-locais/23-entenda-a-sua-semana`<br>`fim-e-semana/19-entenda-a-sua-semana-e-as-pausas` |
| 279 | "Por que o app pergunta e sugere" (até 16/11, os "por quê?" do cadastro e do treino) | bloco que abre | `dados-e-locais/24-entenda-por-que-o-app-pergunta` |
| 317 | "Segurança" | bloco que abre | `dados-e-locais/25-entenda-seguranca` |
| 340 | "Todas as regras e as fontes": as regras por grupo, cada uma num bloco fechado (a regra, o nível e as fontes ao abrir) *(as regras não foram abertas uma a uma: o texto delas está em src/domain/regras/regras.json)* | bloco que abre | `dados-e-locais/26-entenda-todas-as-regras` |
| 85 | "Carregando as regras…" | carregando | `avisos-e-erros/17-entenda-todas-as-regras-carregando` |
| 86 | "Não deu para carregar as regras agora. Tente de novo com internet." | erro ou validação | `avisos-e-erros/21-entenda-todas-as-regras-sem-carregar` |

### `src/features/dados/Dados.tsx`

| Linha | O que é | Tipo | Na colheita |
|---|---|---|---|
| 131 | "o que sai daqui" | por quê | `dados-e-locais/02-meus-dados-folha-o-que-sai-daqui` |
| 138 | "Este navegador pode apagar seus dados. Guarde uma cópia." (o navegador não garantiu o armazenamento) | aviso condicional | `dados-e-locais/01-meus-dados` |
| 141 | "por quê?" de "O navegador e os seus dados" | por quê | `dados-e-locais/03-meus-dados-folha-o-navegador-e-os-seus-dados` |
| 151 | erro de leitura dos dados guardados (o texto vem de src/storage/idb.ts) | erro ou validação | `avisos-e-erros/07-dado-ilegivel-meus-dados` |
| 156 | "Os dados que o app não conseguiu ler continuam guardados…" + "Exportar os dados que não foram lidos" | erro ou validação | `avisos-e-erros/07-dado-ilegivel-meus-dados` |
| 69 | "Arquivo exportado. Guarde-o num lugar seguro: ele tem seus dados de saúde." | resposta de uma ação | `dados-e-locais/06-meus-dados-copia-exportada` |
| 82 | "Arquivo exportado com os dados que o app não conseguiu ler. Guarde-o: ele tem seus dados de saúde." | resposta de uma ação | `avisos-e-erros/08-dado-ilegivel-exportado` |
| 98 | "Não foi possível importar. <motivo> Seus dados atuais não foram alterados." (os motivos vêm de src/storage/arquivo.ts) | erro ou validação | `dados-e-locais/09-meus-dados-folha-trazer-uma-copia-erro`<br>`dados-e-locais/10-meus-dados-folha-trazer-uma-copia-erro-de-leitura` |
| 103 | "Dados importados." | resposta de uma ação | `dados-e-locais/11-meus-dados-copia-importada` |
| 172 | as linhas de Meus dados e a 2ª linha de cada uma (o objetivo, "N marcado(s)", "N locais: …", "Última cópia: …", "Autorizada em …") | aviso condicional | `dados-e-locais/01-meus-dados`<br>`dados-e-locais/34-meus-dados-com-objetivo`<br>`dados-e-locais/38-meus-dados-com-algo-a-evitar`<br>`dados-e-locais/52-meus-dados-bruno`<br>`dados-e-locais/27-meus-dados-com-copia-antiga`<br>`dados-e-locais/15-meus-dados-com-a-foto-autorizada` |
| 232 | folha do estilo do Boneco | folha | `dados-e-locais/04-meus-dados-folha-estilo-do-boneco` |
| 237 | "Guardar uma cópia" (sem cópia, com a cópia de hoje, sem dados) | folha | `dados-e-locais/05-meus-dados-folha-guardar-uma-copia`<br>`dados-e-locais/07-meus-dados-folha-guardar-uma-copia-com-copia`<br>`dados-e-locais/20-meus-dados-sem-dados-folha-guardar-uma-copia` |
| 261 | "Trazer uma cópia" ("Nenhum arquivo escolhido.", "Falta escolher o arquivo.", "Escolhido: …") | folha | `dados-e-locais/08-meus-dados-folha-trazer-uma-copia` |
| 302 | "Foto do equipamento" (retirar a autorização) | folha | `dados-e-locais/16-meus-dados-folha-foto-do-equipamento` |
| 314 | "Autorização da foto retirada." | resposta de uma ação | `dados-e-locais/17-meus-dados-autorizacao-retirada` |
| 323 | "Apagar todos os dados?" | folha | `dados-e-locais/18-meus-dados-folha-apagar-todos-os-dados` |

### `src/features/locais/Locais.tsx`

| Linha | O que é | Tipo | Na colheita |
|---|---|---|---|
| 56 | "<local> é o principal. O programa muda quando você tocar em "Atualizar" no início." | resposta de uma ação | `dados-e-locais/50-locais-local-principal-trocado` |
| 91 | "Dê um nome ao local, por exemplo "Prédio" ou "Academia do bairro"." | erro ou validação | `dados-e-locais/47-locais-novo-erro-sem-nome` |
| 145 | título do equipamento do local ("Equipamento") | aviso condicional | `dados-e-locais/46-locais-novo`<br>`dados-e-locais/48-locais-novo-com-nome` |

### `src/features/termos/Termos.tsx`

| Linha | O que é | Tipo | Na colheita |
|---|---|---|---|
| 57 | "Contato: fale direto com essa pessoa." e "quem te mandou o link do app" (sem e-mail e sem responsável no build) | aviso condicional | `termos-e-foto/01-termos` |

## Não alcançados

| Onde | O que é | Texto (copiado do código-fonte) | Por que não foi alcançado |
|---|---|---|---|
| `src/features/onboarding/FotoEquipamento.tsx:50` | erro da foto sem a autorização | Para usar a foto, marque a autorização acima. Sem ela, use a lista abaixo. | Sem a autorização marcada, o campo das fotos fica desligado (linha 208) e a função que mostra esta frase não chega a rodar. O que a pessoa vê é "Falta marcar a autorização acima." (linha 213). |
| `src/features/programa/Programa.tsx:601` | folha do exercício sem animação e sem cartão de texto | Sem guia ainda. Trabalha <músculos>; também <músculos>. Se não conhece o exercício, prefira uma alternativa com guia. | Hoje todo exercício da biblioteca sem animação tem cartão de texto (81 sem animação, 0 sem cartão). O mesmo vale para "sem guia ainda" na miniatura (src/features/programa/Miniatura.tsx:20) e para "Sem guia ainda. Se não conhece este exercício, troque por um com guia em "Trocar exercício"." (src/features/treino/Treino.tsx:311). |
| `src/features/dados/Dados.tsx:77` | erros ao exportar os dados que não foram lidos | Não há dados antigos guardados neste aparelho. / Não foi possível ler os dados deste aparelho. (linha 84) | O botão "Exportar os dados que não foram lidos" só aparece quando esses dados existem; as duas frases cobrem uma falha do armazenamento entre a tela abrir e o toque. A segunda frase também está na tela de erro (src/features/app/TelaDeErro.tsx:46), na mesma condição. |
| `src/features/dados/Dados.tsx:92` | importar sem arquivo | Escolha um arquivo exportado pelo treino-mvp. | O botão "Importar dados" fica desligado sem arquivo escolhido (linha 286); o que a pessoa vê é "Falta escolher o arquivo." (linha 296). |
| `src/features/dados/Dados.tsx:246` | armazenamento permanente aceito | Este navegador aceitou guardar seus dados de forma permanente. | O Chromium de teste nega o armazenamento persistente (por isso a colheita mostra o aviso contrário, "Este navegador pode apagar seus dados."). A frase aparece na folha "Guardar uma cópia" de quem tem o app instalado ou num navegador que aceita o pedido. |
| `src/features/app/privacidade.tsx:15` | texto curto da foto com a foto desligada | Nada sai do aparelho: por enquanto, o reconhecimento pela foto está desligado. | A colheita roda com a foto ligada (VITE_FOTO=ligada), como os testes. Na produção de hoje a foto está desligada: valem esta frase (Boas-vindas e Meus dados), a de src/features/termos/Termos.tsx:90 ("Por enquanto, o reconhecimento pela foto está desligado: nada sai do aparelho. Quando for ligado, valerá o que está abaixo.") e some o botão "Pela foto". |
| `src/features/app/privacidade.tsx:69` | "Avisar um problema" com e-mail de contato no build | Abre o seu e-mail com a mensagem pronta. Vão a versão do app, o modelo do aparelho e a tela. Não escreva nada sobre a sua saúde e não anexe o arquivo exportado. | Depende de VITE_CONTATO_EMAIL no build, que não está no repositório (nenhum dado pessoal vai para o código). Com ele, "Avisar um problema" vira um link de e-mail; e os Termos mostram "Contato: <e-mail>" e o nome do responsável (src/features/termos/Termos.tsx:56 a 60). |
| `src/features/app/estado.tsx:57` | falha ao abrir o armazenamento do aparelho | Não foi possível ler os dados guardados neste aparelho. | Só quando o IndexedDB recusa a leitura (não quando o dado está num formato inválido, que foi colhido). Aparece nos mesmos lugares do erro colhido: a caixa de erro da Boas-vindas e de Meus dados. |
| `src/features/treino/Resumo.tsx:18` | rótulos de "Para a próxima vez" não vistos | Voltar à anterior · Trocar | Cada um pede um histórico próprio (a carga que subiu e não rendeu; o exercício interrompido pela dor em sessões seguidas). Foram colhidos Calibrar, Manter, Subir, Reduzir, Estagnado e Ajustar; o motivo de cada um vem de src/domain/progressao e, desde 16/11, aparece em "Entenda o treino" → "Os exercícios". |

## Telas colhidas que a tabela não cita

- `fim-e-semana/07-semana-1-treino-evolucao-aberta`: Semana com 1 treino, com "Evolução (1)" aberto

## As 41 telas de 13/11, com a mesma régua

`palavrasNaTela` de `docs/revisoes/frontend-novo/textos/medidas-de-texto.json` (a medida "enxuta", depois da etapa 1) e da tela de hoje que refaz o mesmo caminho.

| Tela de 13/11 | Tela de hoje | 13/11 | Hoje | Diferença |
|---|---|---|---|---|
| 01-boas-vindas | `cadastro/01-boas-vindas` | 68 | 53 | -15 |
| 02-saude | `cadastro/04-saude` | 87 | 83 | -4 |
| 02b-saude-quais-valem | `cadastro/06-saude-quais-valem` | 195 | 185 | -10 |
| 03-nivel-vazio | `cadastro/15-experiencia-vazia` | 40 | 27 | -13 |
| 03b-nivel-respondido | `cadastro/23-experiencia-respondida` | 121 | 78 | -43 |
| 04-rotina-vazia | `cadastro/24-rotina-vazia` | 28 | 14 | -14 |
| 04b-rotina-respondida | `cadastro/32-rotina-respondida` | 108 | 60 | -48 |
| 05-equipamento-lugar | `cadastro/33-equipamento-lugar` | 73 | 37 | -36 |
| 05b-equipamento-foto | `cadastro/34-equipamento-folha-da-foto` | 194 | 193 | -1 |
| 05c-equipamento-folha-do-item | `cadastro/78-equipamento-folha-do-item` | 62 | 53 | -9 |
| 05d-equipamento-item-por-item | `cadastro/80-equipamento-item-por-item` | 110 | 70 | -40 |
| 06-inicio | `inicio/03-inicio` | 105 | 78 | -27 |
| 07-folha-do-exercicio | `inicio/06-folha-do-exercicio` | 93 | 22 | -71 |
| 06b-inicio-sobre-o-programa | `inicio/08-sobre-o-programa` | 104 | 135 | +31 |
| 08-treino-serie-vazia | `treino/01-serie-vazia` | 69 | 58 | -11 |
| 12-guia-tecnica | `guia/01-tecnica` | 295 | 60 | -235 |
| 12b-guia-erros | `guia/04-erros` | 323 | 92 | -231 |
| 12c-guia-musculos | `guia/07-musculos` | 340 | 109 | -231 |
| 12d-guia-trajetoria | `guia/08-trajetoria` | 326 | 95 | -231 |
| 08b-treino-serie-preenchida | `treino/08-serie-preenchida` | 61 | 63 | +2 |
| 09-treino-descanso | `treino/09-descanso` | 51 | 51 | = |
| 10-treino-senti-algo | `treino/10-folha-senti-algo` | 73 | 72 | -1 |
| 11-treino-mais-opcoes | `treino/11-folha-mais-opcoes` | 15 | 15 | = |
| 09b-treino-serie-com-descanso | `treino/13-serie-com-descanso` | 64 | 63 | -1 |
| 11b-treino-por-que | *saiu do app* (`treino/folha-por-que-na-2a-serie`) | 202 | — | saiu |
| 08c-treino-exercicio-2 | `treino/16-exercicio-2` | 59 | 55 | -4 |
| 09c-treino-hora-da-proxima-serie | `treino/17-hora-da-proxima-serie` | 31 | 31 | = |
| 08c-treino-exercicio-3 | `treino/18-exercicio-3` | 68 | 59 | -9 |
| 08c-treino-exercicio-4 | `treino/19-exercicio-4` | 64 | 57 | -7 |
| 08c-treino-exercicio-5 | `treino/20-exercicio-5` | 60 | 53 | -7 |
| 08c-treino-exercicio-6 | `treino/21-exercicio-6` | 60 | 53 | -7 |
| 11c-treino-terminar | `treino/22-folha-terminar-com-serie` | 23 | 21 | -2 |
| 13-fim-do-treino | `fim-e-semana/04-fim-do-treino` | 62 | 40 | -22 |
| 14-semana | `fim-e-semana/06-semana-1-treino` | 101 | 66 | -35 |
| 15-evolucao | `fim-e-semana/08-evolucao-1-treino` | 29 | 20 | -9 |
| 06c-inicio-depois-do-1o-treino | `inicio/01-inicio-depois-do-1o-treino` | 109 | 82 | -27 |
| 16-meus-dados | `dados-e-locais/01-meus-dados` | 144 | 99 | -45 |
| 16b-meus-dados-estilo-do-boneco | `dados-e-locais/04-meus-dados-folha-estilo-do-boneco` | 46 | 6 | -40 |
| 17-locais | `dados-e-locais/44-locais` | 38 | 17 | -21 |
| 17b-locais-editar | `dados-e-locais/45-locais-editar` | 125 | 77 | -48 |
| 18-termos | `termos-e-foto/01-termos` | 793 | 792 | -1 |
| **Soma** (sem a tela que saiu do app) | | **4.817** | **3.294** | -1523 |

Saíram do app (não entram na soma):

- `treino/folha-por-que-na-2a-serie`: o "por quê?" saiu da tela da série em 16/11/2026 (commit f81e484); a explicação da reserva está em "Entenda o treino" → "Por que o app pergunta e sugere".

## Totais

- Telas colhidas: **424**, do app na versão `desconhecida` (publicada em ?; colheita de 2026-11-17).
- Soma de `palavrasNaTela`: **44.338** (a mesma frase conta de novo em cada tela ou folha em que aparece).
- Linhas da tabela de cobertura: 242 (por tipo: rota 37, folha 22, bloco que abre 28, por quê 3, aviso condicional 86, estado vazio 5, carregando 6, erro ou validação 40, resposta de uma ação 15); não alcançados: 9.
- Falhas anotadas na colheita: 0 (em `colheita.json`, campo `falhas`).

| Fluxo | Telas | palavrasNaTela (soma) | Folhas | Blocos abertos | Estados vazios, erros e avisos |
|---|---|---|---|---|---|
| cadastro | 80 | 6.114 | 21 | 1 | 32 |
| inicio | 85 | 11.400 | 14 | 28 | 10 |
| treino | 69 | 4.186 | 9 | 3 | 41 |
| guia | 45 | 5.978 | 0 | 12 | 0 |
| fim-e-semana | 38 | 3.693 | 4 | 4 | 21 |
| dados-e-locais | 53 | 7.404 | 8 | 7 | 13 |
| termos-e-foto | 29 | 3.622 | 9 | 1 | 18 |
| avisos-e-erros | 25 | 1.941 | 0 | 0 | 25 |

| Persona | Telas | palavrasNaTela (soma) | Folhas | Blocos abertos | Estados vazios, erros e avisos |
|---|---|---|---|---|---|
| ana | 311 | 29.619 | 57 | 33 | 128 |
| ana + saúde | 12 | 2.186 | 2 | 3 | 3 |
| bruno | 16 | 1.716 | 0 | 3 | 2 |
| carla | 28 | 2.958 | 0 | 6 | 9 |
| diego | 10 | 1.245 | 1 | 3 | 3 |
| elisa | 22 | 2.708 | 1 | 5 | 5 |
| fabio | 11 | 1.196 | 1 | 3 | 3 |
| ninguém | 14 | 2.710 | 3 | 0 | 7 |
