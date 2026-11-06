# Frente E: abrir o app para família e amigos (produto, LGPD, dados, offline e dívidas)

> Sessão de próximos passos, 06/11/2026. Medido no HEAD `0bbcbd2` (branch `claude/happy-fermat-zty3eo`, igual à `main`). Nada no app foi alterado; os protótipos ficaram no scratchpad. Não é parecer jurídico.

## Em uma olhada
O app já aguenta a academia sem rede: depois da 1ª visita, programa, semana, guia e registro de série funcionaram offline em 5 de 5 verificações, e a série sobreviveu a recarregar a página sem rede. O que falta para outra pessoa usar sem o Gustavo por perto é, sobretudo, **proteção contra perder os dados** e **um texto honesto sobre a foto**. Três telas dizem que a foto "não fica guardada no servidor". Ela não fica na Vercel, mas a Anthropic guarda o que a API recebe por até 30 dias, nos EUA. Também não há termos de uso, nem canal para avisar um problema, nem tela de erro: o `src/` não tem nenhum `ErrorBoundary`, então um erro de tela deixa a página em branco, sem caminho até "Exportar". No iPhone, quem usa pelo Safari sem instalar pode perder tudo depois de 7 dias de uso do Safari sem abrir o app (WebKit). O limite compartilhado da visão custa US$ 0 no plano grátis do Upstash, mas o que segura o gasto de fato é o teto no console da Anthropic. A dívida de evidência ficou menor do que o backlog diz: as duas leituras do PubMed já tinham sido feitas em 05/11, as 16 fontes do `10` conferem no PubMed e as 14 "não verificadas" agora têm PMID e resumo disponíveis.

## 1. O que existe hoje

| Tema | O que existe | Onde | Medida |
|---|---|---|---|
| Aviso e consentimento | Boas-vindas com "o que o app faz e não faz" e "seus dados ficam no aparelho"; o toque em "Entendi, vamos começar" grava `avisoAceitoEm` | `src/features/onboarding/BoasVindas.tsx`; regra `seguranca.sem-diagnostico` (consenso) | 1 toque; não há link para termos nem para política de privacidade (0 ocorrências de "termos" ou "privacidade" nas telas) |
| Triagem | Perguntas próprias, apresentadas como "não é o questionário oficial"; a liberação guarda só a data | `Triagem.tsx`; `seguranca.triagem`, `seguranca.triagem.texto` (consenso; licença do PAR-Q+ lida em 05/11, `parq2025`) | O dado de saúde nunca sai do aparelho (nenhum `fetch` fora de `FotoEquipamento.tsx`) |
| Foto | Redimensiona e limpa o EXIF no aparelho, código de convite, até 5 fotos | `FotoEquipamento.tsx`, `src/lib/imagem.ts`, `api/vision.ts`, `api/_lib/pedido.ts` | Texto "não fica guardada no servidor" em **3 telas** (`BoasVindas.tsx:57`, `FotoEquipamento.tsx:144`, `Dados.tsx:68`) |
| Limite da visão | `Limite` num `Map` em memória por instância: 10 fotos por aparelho e 40 por IP, por dia | `api/_lib/pedido.ts` | O id do aparelho é gerado no navegador (`crypto.randomUUID`, `localStorage`): apagar o site zera o limite. O IP é contado antes do aparelho, então um pedido barrado pelo aparelho ainda gasta a cota do IP |
| Cópia dos dados | Exportar/importar JSON com migração (versão 7), "Apagar tudo", pedido de armazenamento persistente | `src/storage/*`, `Dados.tsx`, `estado.tsx:51` | A dica "instale e exporte de vez em quando" aparece **só** em Meus dados; não há lembrete nem data da última cópia |
| Erro de tela | Nenhum | `src/main.tsx`, `src/App.tsx` | 0 `ErrorBoundary`; só o erro de **carga** dos dados tem mensagem (`erroCarga`) |
| Versão visível | Commit e data do build em Meus dados | `Dados.tsx` (fim), `vite.config.ts` | Existe; não há "avisar um problema" que a leve junto |
| Offline e instalação | `vite-plugin-pwa` (generateSW, `autoUpdate`), precache de 6 arquivos, rota de navegação para `index.html` | `vite.config.ts` | Build: JS 1.101,35 kB (280,64 kB gzip), precache 1.119,62 KiB; no Chromium, 0 erro de instalabilidade; manifesto só com `icon.svg`; **sem `apple-touch-icon`** |
| Iniciante absoluto | Fase de aprendizado (`iniciante.fase-aprendizado`, consenso), aviso de calibração na 1ª série, pergunta do RIR com `rir.leitura` (moderada) | `Treino.tsx:370`, `Guia.tsx`, `Programa.tsx` | "RIR" aparece em 5 telas da pessoa (programa, treino, guia, evolução, semana leve) e só é explicado em 1: a pergunta da série. "Série", "repetição", "descanso" e "carga" não são definidos em lugar nenhum. Não há opção "nunca treinei" (cai em "Menos de 6 meses") |
| Eval da foto | `scripts/eval-vision.ts` (`npm run eval:visao`): recall e precisão na confiança alta, falsos positivos graves, custo e tempo; relatório escrito em `privado/` | `scripts/eval-vision.ts` | Nunca rodado (devlog, M4 e R3). Usa as 5 primeiras fotos, 1 rodada por modelo, sem acerto de atributo (o plano, seção g, pede atributos) |

## 2. O que falta (medido)

**2.1 Offline e instalação.** Mede-se com o build no scratchpad, o preview na porta 4320 e o Playwright num Pixel 7 com `context.setOffline(true)` depois do cadastro da Ana.
- 5 de 5 passos funcionaram sem rede: recarregar `/programa`, abrir `/semana` (navegação nova), abrir `/guia/bulgaro` com o SVG, começar o treino e registrar 1 série, e recarregar a página com a série guardada. Sexto passo: Meus dados abre sem rede. 0 erro de página.
- Pedidos externos: `fonts.googleapis.com` e `fonts.gstatic.com`. É o que o lote 1 do redesign já tira (0 pedido externo; `medidas.md`). Sem rede, a letra veio do cache HTTP do navegador.
- `navigator.storage.persisted()` deu `false` no Chromium sem interação (o pedido é negado por heurística). O app não mostra nada quando é negado; só mostra quando é aceito.
- Instalação: o Chromium não acusa erro (`Page.getInstallabilityErrors` vazio). No iPhone, sem `apple-touch-icon`, o ícone da tela inicial não usa o SVG do manifesto [consenso, documentação do WebKit/Apple não lida nesta sessão: marcar para conferir no aparelho].

**2.2 Perda de dados.** Uma pessoa perde tudo em 4 casos, e o app só a protege em 1 (o arquivo exportado):
1. troca de celular sem ter exportado;
2. "limpar dados de navegação";
3. no Safari do iPhone sem instalar: o WebKit apaga IndexedDB, localStorage e o service worker após **7 dias de uso do Safari sem interação com o site** (`webkit2020`). Instalado na tela inicial, o app tem a sua própria contagem, e a WebKit diz que apagar ali seria um bug;
4. pressão de espaço: a remoção é por origem, da menos usada para a mais usada, e pula as que têm armazenamento persistente (`webkit2023`, `mdn-storage`).

Não há lembrete de cópia, não há a data da última cópia e não há aviso no 1º uso de que o dado mora num aparelho só. Isso vale para as 4 personas e para qualquer amigo. O pior caso é o iPhone sem instalar.

**2.3 Erro na mão de um amigo.** Sem `ErrorBoundary`, um erro de renderização no React 18 desmonta a árvore inteira e a tela fica em branco [consenso, documentação do React]. "Meus dados" fica na mesma árvore, então a pessoa não consegue exportar. Não há "avisar um problema" e a versão só aparece em Meus dados. Hoje o amigo depende de mandar mensagem para o Gustavo.

**2.4 A foto.** O texto das 3 telas está incompleto. A Vercel não guarda a foto (`api/vision.ts` só registra números), mas a API da Anthropic "apaga entradas e saídas em até 30 dias", salvo acordo de retenção zero ou para fazer cumprir a política de uso (`anthropic-retencao`). Os termos comerciais dizem que a Anthropic não treina modelos com esse conteúdo (`anthropic-termos`). A foto vai para fora do Brasil (LGPD art. 33). Uma foto de casa ou da academia pode mostrar pessoas, espelho ou o interior da casa, então pode ser dado pessoal. Não é dado de saúde.

**2.5 Limite da visão.** Para 10 a 30 pessoas, o risco não é a cota por aparelho. É o **código de convite vazar**: quem tem o código troca o id do aparelho à vontade, e cada instância nova da função começa do zero. O que segura o gasto é o teto mensal no console da Anthropic, que já está no plano (seção "Visão") e ainda não foi confirmado (backlog, "Pendências"). A estimativa por chamada de 5 fotos é **até ~US$ 0,14 no Opus 5.5**. Conta: 5 × ~2.460 tokens por foto de 1.568 × 1.176 (fórmula largura × altura / 750, a conferir com `count_tokens` no eval) mais as instruções, a US$ 4 por milhão de tokens; mais até 4.000 de saída (`max_tokens` em `api/_lib/modelo.ts`) a US$ 20 por milhão. Preços da referência da API em 06/11/2026, os mesmos do `scripts/eval-vision.ts`. É **estimativa**: o eval mede o valor real. Em 30 pessoas com 2 envios cada, dá ~US$ 8 [estimativa].

**2.6 Dependências** (`npm audit --omit=dev` e `npm audit`, 06/11):

| | Produção | Tudo |
|---|---:|---:|
| Crítica | 0 | 2 (`vitest` ≤ 4.1.10 e `tinypool`, só testes) |
| Alta | 1 (`zod` < 4.6.6, memória com coleções grandes) | 1 |
| Moderada | 2 (`react-router`/`-dom` 6.x: redirecionamento aberto com barra invertida no `<Link>`; injeção na hidratação SSR, que o app não usa) | 15 |
| Baixa | 0 | 2 |

Toda correção é mudança de versão maior (zod 4.6.7, react-router-dom 7.18.5, vitest 5.1.0, vite-plugin-pwa e typescript-eslint). O zod aparece em 8 arquivos (`src/conteudo/schema.ts`, `src/storage/esquema.ts` e `migracao.ts`, `src/domain/{visao,biblioteca,taxonomia,progressao,gerador}`). O SDK da Anthropic aceita zod 3 ou 4 (peer `^3.25.0 || ^4.0.0`). No app, o zod valida o arquivo que a própria pessoa importa e o JSON do modelo, então o risco prático é baixo [opinião].

**2.7 Dívida de evidência** (medida com o eutils do PubMed):
- **As duas leituras "bloqueadas" já estavam feitas.** `larsen2025b` (PMID 40113586) e `kassiano2026` (PMID 41379528) entraram em `fontes.md` em 05/11, com o resumo lido; o "back squat" do título foi feito no smith, então as fichas e o `08` estavam certos. Reli os dois resumos hoje e eles conferem. O backlog repete as duas linhas como pendentes ("Do catálogo completo" e "Da auditoria independente"): o texto está desatualizado.
- **17 fontes do `10` "fora de `fontes.md`":** `snarr2017` já entrou. As outras 16 estão fora, mas a ficha completa já está escrita no `10` ("Fontes novas"). As 16 conferem no `esummary` (PMID, 1º autor, ano e título batem, 16/16). Falta só copiar.
- **14 "não verificadas":** as 14 agora têm metadados conferidos e resumo baixado (14/14). Entre elas, `callaghan1998` ganhou o PMID 9442191 (DOI 10.1093/ptj/78.1.8), e as 9 "autores não conferidos" ganharam autor, periódico e DOI (lista em "Fontes novas"). Os resumos **não** foram lidos contra a afirmação do `10`. Isso ainda é trabalho, e o status sobe só para "verificado-busca".
- **Testes de propriedade (F.4):** o `gerador.test.ts` já tem 6 blocos de propriedade (mesma entrada → mesma saída, teto, dor, ordem, piso nos cortes). Faltam os 4 do F.4: a sugestão ao vivo com histórico por semente, a grade larga do gerador, a captura em PNG do Boneco e o e2e de importação das versões 4 e 5 (hoje é só unitário, `armazenamento.test.ts:156`).
- **PAR-Q+ e Ministério da Saúde 2021:** decisões do Gustavo, já lidas (`parq2025`, `ms2021`). Não há nada novo a medir.

**2.8 Idiomas.** Todo o texto está escrito direto nos `.tsx` e nos JSON de conteúdo, sem camada de tradução. Pelo `proposta.md` do redesign, `src/features/` tem ~5.950 linhas, e o redesign vai reescrevê-las. Traduzir antes disso seria trabalho jogado fora [opinião]. Família e amigos falam pt-BR: fica para depois, sem motivo contrário.

## 3. O que a evidência (e a norma) diz

| Pergunta | Resposta | Selo | Fontes (status) |
|---|---|---|---|
| A triagem e as dores são dado sensível? | Sim: "dado referente à saúde" é dado pessoal sensível (art. 5º, II) | consenso (norma) | `lgpd` (texto compilado lido na Câmara; o Planalto não respondeu à rede da sessão) |
| A LGPD vale se o dado nunca sai do aparelho? | O art. 3º vale para "qualquer operação de tratamento"; o art. 4º, I, exclui o tratamento "por pessoa natural para fins exclusivamente particulares e não econômicos" (a própria pessoa no celular dela). Se o Gustavo é controlador do que fica só no aparelho do amigo é pergunta para o advogado | consenso (norma) + [opinião] | `lgpd` |
| Se houver consentimento para dado sensível, como deve ser? | "De forma específica e destacada, para finalidades específicas" (art. 11, I); autorização genérica é nula e o consentimento pode ser revogado a qualquer momento, de graça (art. 8º, §§ 4º e 5º); o ônus da prova é do controlador (art. 8º, § 2º) | consenso (norma) | `lgpd` |
| A foto ir à Anthropic (EUA) é transferência internacional? | Se a foto for dado pessoal, sim. Pode ser por consentimento "específico e em destaque, com informação prévia sobre o caráter internacional" (art. 33, VIII) ou por cláusulas-padrão (art. 33, II, b; Resolução CD/ANPD 19/2024). Como a Anthropic se enquadra é para o advogado | consenso (norma) | `lgpd`, `anpd19-2024` (lida no DOU) |
| Precisa de encarregado (DPO)? | Agente de pequeno porte, inclusive pessoa natural, é dispensado, mas tem de manter um canal com o titular (Res. 2/2022, arts. 2º e 11, § 1º). A dispensa não vale para "alto risco" (art. 3º, I), que pede 1 critério geral (larga escala ou efeito significativo nos direitos) **e** 1 específico (entre eles, dado sensível; art. 4º). Com 10 a 30 pessoas, "larga escala" parece não se aplicar [opinião; confirmar com o advogado] | consenso (norma) | `anpd2-2022` (lida no DOU e no gov.br) |
| Por quanto tempo a Anthropic guarda a foto? | Apaga entradas e saídas da API "em até 30 dias", salvo retenção zero contratada, política de uso ou lei | [mercado] (documento do fornecedor) | `anthropic-retencao`, `anthropic-termos` (lidos em 06/11) |
| O iPhone apaga os dados de um PWA não usado? | No Safari: sim, após 7 dias de uso do Safari sem interação com o site, apaga IndexedDB, localStorage e o service worker. Instalado na tela inicial, o app tem contagem própria, e a WebKit trata apagar ali como bug | consenso (documentação do fornecedor) | `webkit2020` (lido) |
| Quando qualquer navegador apaga? | Por cota ou por pressão de espaço, da origem menos usada para a mais usada; o modo persistente (`persist()`) protege, e o WebKit o concede por heurísticas como estar na tela inicial | consenso | `webkit2023`, `mdn-storage` (lidos) |
| Um iniciante sabe dizer quantas repetições sobram? | O erro médio é de ~1 repetição (a pessoa acha que tem menos), maior longe da falha e acima de ~12 repetições. O projeto registrou que a experiência não diminui o erro | moderada | `halperin2022`, `zourdos2021`, `remmert2023` (já em `rir.leitura`) |
| Explicar os termos (série, RIR) muda a adesão do iniciante? | Não achei estudo e não procurei a fundo. Fica como opinião | [opinião] | — |
| Quanto custa o limite compartilhado? | Upstash grátis: 500 mil comandos por mês e 250 MB; cada envio usa ~4 comandos (2 contadores + validade) | [mercado] | `upstash-preco` (lido em 06/11) |

## 4. Valor para quem usa
- **Amigo com iPhone que abriu o link no Safari e não instalou** (o caso mais provável de perda): treina 2 semanas, viaja 10 dias e perde o histórico. O aviso de instalar no 1º uso e o lembrete de cópia são o que o protege [opinião, com a regra do WebKit].
- **Qualquer amigo num dia de bug:** hoje vê uma tela branca e não tem o que fazer. Com uma tela de erro que exporta os dados e mostra "como avisar", o problema vira uma mensagem com a versão, e não a perda do treino.
- **Quem usa a foto:** fica sabendo para onde a foto vai, por quanto tempo fica lá e que pode usar a lista. Para quem não usa a foto, nada muda.
- **Iniciante absoluto (perfil da Ana e do Diego):** no programa vê "3 × 8–12 · RIR 3–4 · descanso 1:30" sem saber o que é cada parte, e só entende o RIR na 1ª série. Uma explicação curta antes do 1º treino tem valor nesse momento [opinião]. O ganho do registro com o RIR está medido no `rir.leitura`; o da explicação, não.
- **Gustavo:** deixa de ser o suporte de cada pessoa e tem um jeito de saber o que deu errado sem receber dado de saúde.

## 5. Opções

### Pré-requisitos para abrir a família e amigos (sem isso, não abre)

| # | Item | Quem faz | Esforço | Custo em dinheiro | Regra / dado / `src/storage/` | Choque com o redesign / R3 |
|---|---|---|---|---|---|---|
| P1 | **Texto da foto correto + consentimento destacado na própria tela da foto.** "Vai para a Anthropic, nos EUA, que apaga em até 30 dias; não fica na Vercel; você pode usar a lista." Uma caixa marcada antes do 1º envio, com a data guardada no aparelho | código (texto); advogado revisa | 0,5 dia | — | regra nova `privacidade.foto` (consenso, `lgpd` art. 33, VIII); `localStorage`, como o convite, sem migração | O redesign refaz a tela da foto (lote 3): pedir a ele o espaço da caixa (ver Pedidos) |
| P2 | **Termos de uso e aviso de privacidade**: uma página `/termos` com o que o app faz, a ferramenta de orientação (CONFEF), o dado no aparelho, a foto, os direitos do titular e o canal de contato (Res. 2/2022, art. 11, § 1º); link nas boas-vindas e em Meus dados | Gustavo (decide o conteúdo) + código (rascunho e página) + **advogado** (revisa) | 1 dia de código e rascunho | advogado: não achei preço com fonte, a orçar | nenhuma regra muda; `avisoAceitoEm` já existe. Guardar "aceitou os termos versão X" é um campo opcional novo no estado: pede versão nova e migração em `src/storage/` (ou fica no `localStorage`, como em P3) | Tela nova = pedido ao design; o R3 não é afetado |
| P3 | **Não perder os dados**: (a) aviso único no 1º uso no iPhone fora da tela inicial ("instale para não perder"); (b) "última cópia: há N dias" e lembrete em Meus dados e no início depois de X treinos sem cópia; (c) dizer quando o navegador **negou** o armazenamento persistente | código + design | 1–1,5 dia | — | sem regra de treino; a data da última cópia vai no `localStorage` (conveniência do aparelho), o que **evita a versão 8 do estado** que o redesign já reservou para "dias de treino" | Pedido ao design para (a) e (b); o R3 não é afetado |
| P4 | **Tela de erro com saída**: `ErrorBoundary` em volta das rotas, com "Exportar meus dados" (lê direto o IndexedDB), a versão e "Avisar um problema" | código | 0,5–1 dia | — | nenhuma | Mexe no `App.tsx`, que o lote técnico do redesign também mexe (divisão do pacote): combinar a ordem |
| P5 | **Canal de problema**: link "Avisar um problema" (e-mail ou formulário externo) com a versão e o aparelho já escritos, **sem** dado de saúde; o texto pede para não anexar o export | Gustavo (escolhe o canal) + código | 0,5 dia | e-mail: 0 | nenhuma | — |
| P6 | **Teto de gasto e um convite por pessoa**: teto mensal no console da Anthropic (ex.: US$ 10, [opinião]) e um código por pessoa em `CONVITES`, para desligar só o que vazou | **Gustavo** | ~30 min | o teto escolhido | nenhuma | — |

### Bom ter (abre sem, melhora o uso ou a base)

| # | Item | Quem faz | Esforço | Custo | O que muda | Choque |
|---|---|---|---|---|---|---|
| B1 | **Limite compartilhado** (Upstash pelo Marketplace da Vercel; `INCRBY` com validade de 1 dia por IP e por aparelho; testar o aparelho antes de gastar o IP) | código + Gustavo (cria o banco) | 0,5–1 dia | US$ 0 no plano grátis (500 mil comandos por mês) | `api/_lib/pedido.ts` (a classe `Limite` vira interface; testes em `api-visao.test.ts`) | nenhum. Com P6 feito, o risco de não fazer para 10 a 30 pessoas é baixo e limitado em dinheiro [opinião] |
| B2 | **"Como ler o seu treino"** para o iniciante: série, repetição, carga, descanso e RIR em 5 linhas antes do 1º treino, e "RIR = repetições que ainda sobravam" na 1ª vez em cada tela (backlog F.3) | código (texto com selo) + design | 0,5–1 dia | — | texto com `rir.leitura` (moderada) e `iniciante.fase-aprendizado` (consenso); talvez a opção "nunca treinei" na experiência (sem mudar a regra de nível) | O redesign (agente 2) cobriu o cadastro, não isto: pedido ao design |
| B3 | **Eval da foto com fotos reais**: o Gustavo roda `npm run eval:visao` (3 modelos, US$ < 1 [estimativa]); antes, o script passa a medir atributos (faixa dos halteres, altura da polia), recall por item e 3 rodadas por modelo | Gustavo (roda) + código (amplia o script) | código 0,5 dia; Gustavo 15 min | < US$ 1 [estimativa] | só o script; o resultado agregado vai para o devlog; as fotos e o gabarito continuam em `privado/` | R3 (é dele, critério 3). Não é pré-requisito: a confirmação é obrigatória e a lista funciona sempre |
| B4 | **Dívida de fontes**: copiar as 16 fichas do `10` para `fontes.md`; ler os 14 resumos e subir o status; tirar do backlog as 2 leituras já feitas | código/pesquisa | 0,5 dia + 1 dia | — | `fontes.md`, `fontes.json` (o redesign lê esse arquivo: regerar) | Regerar o `fontes.json` do redesign |
| B5 | **Dependências**: zod 4 e react-router 7 numa branch própria, com `npm run check` e e2e; vitest 5 e vite-plugin-pwa juntos | código | 1–2 dias | — | `src/domain/` inteiro (zod) e as rotas; sem mudança de dado guardado, se o esquema der o mesmo resultado (testes de migração) | Conflita com o redesign, que reescreve `src/features/`: fazer **depois** do lote em curso ou na base dele |
| B6 | **Testes de propriedade (F.4)** que faltam | código | 1–2 dias | — | só testes | nenhum |
| B7 | **Medir sem dado pessoal**: (a) formulário de opinião fora do app, sem pedir nome nem saúde; (b) o servidor da visão já registra só números (fotos, tokens): somar por dia; (c) export enviado pela pessoa **só** com consentimento específico (art. 11, I), porque contém dado de saúde | Gustavo + código para (b) | 0,5 dia | 0 | (b) muda o log da `api/`, sem guardar IP; (c) não muda código | — |
| B8 | **PAR-Q+ oficial e textos do MS 2021**: pedir a autorização (eparmedx@gmail.com) ou manter as perguntas próprias; revisão de um CREF antes de abrir | Gustavo + CREF | — | taxa do PAR-Q+ possível (não informada); CREF a orçar | `seguranca.triagem.texto` | O backlog deixou a revisão por CREF "de lado" (01/11); abrir a outras pessoas é um motivo novo para reconsiderar [opinião] |
| B9 | **Idiomas** | — | não estimado (todo o texto nos `.tsx`) | — | — | Depois do redesign |

**Esforço total dos pré-requisitos:** P1 a P5 dão de 3,5 a 4,5 dias de código, mais o advogado (P1, P2), o canal (P5) e o teto de gasto (P6), que ficam com o Gustavo.

## 6. Recomendação

**Fazer P1 a P6 como um marco curto, "abrir para família e amigos", antes de mandar o link a qualquer pessoa. Do "bom ter", B2 e B1 primeiro.**

O porquê:
- Os dois riscos reais estão medidos e são baratos de fechar. **Perder o dado** é um risco do navegador (7 dias no Safari, tela branca sem saída). **Dizer algo inexato sobre a foto** está nas 3 telas e conflita com o princípio de privacidade do `CLAUDE.md`.
- O que parecia o maior bloqueio, o limite compartilhado, custa US$ 0, mas não é o que protege o bolso. Quem protege é o teto de gasto com um convite por pessoa (P6, 30 min). Por isso o Upstash desce para "bom ter".
- O app já funciona sem rede na academia (5 de 5) e já se instala no Android. O desempenho (Lighthouse 59 a 73) é do lote técnico do redesign, já aprovado. Não precisa de outra frente.
- Guardar a data da última cópia no `localStorage` evita disputar a versão 8 do estado com o redesign (pedido 2, "dias de treino").
- O eval da foto é critério do R3 e não trava a abertura, porque nada entra sem a confirmação.

## Pedidos à sessão de design
1. **Aviso de "instale para não perder"** no 1º uso, só no iPhone fora da tela inicial: uma faixa que some de vez, com os passos do Safari (Compartilhar → Adicionar à Tela de Início). Motivo: `webkit2020`, apagamento em 7 dias no Safari; o aviso de hoje fica só em Meus dados.
2. **"Última cópia: há N dias"** em Meus dados, e um lembrete discreto no início depois de N treinos sem cópia, que nunca cubra "Começar o treino". Motivo: 4 caminhos de perda e 1 proteção (seção 2.2).
3. **Tela de erro** com 3 ações: "Exportar meus dados", "Avisar um problema" e "Tentar de novo", e a versão escrita. Motivo: 0 `ErrorBoundary`, a tela fica branca.
4. **Caixa de consentimento da foto** na tela da foto (lote 3): o texto curto, o "para onde vai" e a caixa antes do 1º envio. Motivo: 3 telas com "não fica guardada no servidor".
5. **Link para os termos** nas boas-vindas (junto de "Entendi") e em Meus dados, no grupo Saúde ou Cópia.
6. **"Como ler o seu treino"**: uma folha antes do 1º treino, ou no 1º toque em "RIR". Motivo: RIR em 5 telas e explicado em 1; série, repetição e carga explicados em 0.
7. **Ícone do app também para o iPhone** (`apple-touch-icon` em PNG, 180 px) no lote 5, junto dos tamanhos do Android que a proposta já lista. Motivo: o manifesto só tem SVG e não há `apple-touch-icon`.

## Pedidos ao domínio
1. Regra nova `privacidade.foto` (consenso, `lgpd` art. 33, VIII; `anthropic-retencao`), com o texto que as telas citam. Hoje o texto da foto não tem regra nem selo.
2. Se o glossário (B2) entrar, o texto sai de regras com selo: `rir.leitura`, `iniciante.fase-aprendizado`, e uma regra-texto nova para série e repetição (consenso).
3. `api/_lib/pedido.ts`: contar o aparelho antes do IP (hoje um pedido barrado pelo aparelho gasta a cota do IP), com teste.

## Fontes novas (para conferência)
Normas e documentos (selo consenso ou [mercado]; não são estudos):
- `lgpd`: Brasil. Lei nº 13.709, de 14/08/2018 (LGPD), texto atualizado. https://www2.camara.leg.br/legin/fed/lei/2018/lei-13709-14-agosto-2018-787077-normaatualizada-pl.html. **Status:** texto lido em 06/11/2026 (arts. 3º, 4º, 5º, 8º, 9º, 11, 12, 33, 41, 46 e 48). O planalto.gov.br não respondeu à rede da sessão: conferir lá.
- `anpd2-2022`: Resolução CD/ANPD nº 2, de 27/01/2022 (agentes de tratamento de pequeno porte). https://www.in.gov.br/en/web/dou/-/resolucao-cd/anpd-n-2-de-27-de-janeiro-de-2022-376562019. **Status:** texto lido (arts. 1º a 4º e 11).
- `anpd19-2024`: Resolução CD/ANPD nº 19, de 23/08/2024 (transferência internacional e cláusulas-padrão). https://www.in.gov.br/en/web/dou/-/resolucao-cd/anpd-n-19-de-23-de-agosto-de-2024-580095396. **Status:** só o art. 1º e o prazo de 12 meses lidos.
- `anthropic-retencao`: Anthropic Privacy Center, "How long do you store my organization's data?". https://privacy.anthropic.com/en/articles/7996866-how-long-do-you-store-my-organization-s-data. **Status:** lido em 06/11/2026 (API: apaga em até 30 dias, com exceções).
- `anthropic-termos`: Anthropic, Commercial Terms of Service. https://www.anthropic.com/legal/commercial-terms. **Status:** lido em 06/11/2026 (não treina com o conteúdo do cliente; a DPA entra por referência; a DPA não foi lida).
- `webkit2020`: Wilander J (2020). Full Third-Party Cookie Blocking and More. WebKit blog. https://webkit.org/blog/10218/full-third-party-cookie-blocking-and-more/. **Status:** lido (7 dias; exceção dos apps na tela inicial).
- `webkit2023`: WebKit (2023). Updates to Storage Policy. https://webkit.org/blog/14403/updates-to-storage-policy/. **Status:** lido (cotas, remoção por menos uso recente, `persist()` por heurística).
- `mdn-storage`: MDN. Storage quotas and eviction criteria. https://developer.mozilla.org/en-US/docs/Web/API/Storage_API/Storage_quotas_and_eviction_criteria. **Status:** lido.
- `upstash-preco`: Upstash, Redis Pricing. https://upstash.com/pricing/redis. **Status:** lido em 06/11/2026 (grátis: 500 mil comandos por mês, 250 MB; pago: US$ 0,2 por 100 mil comandos).

Estudos (sem chave nova, só identificadores conferidos no `esummary` do PubMed em 06/11/2026):
- `callaghan1998`: Callaghan JP, Gunning JL, McGill SM (1998). The relationship between lumbar spine load and muscle activity during extensor exercises. Phys Ther 78:8–18. **PMID 9442191**, DOI 10.1093/ptj/78.1.8. **Status:** metadados conferidos; resumo baixado, não lido.
- As outras 13 "não verificadas", com o 1º autor e o periódico agora conferidos (resumo baixado, não lido contra o `10`):
  - `bourne2017`: Bourne MN, Br J Sports Med 51:469–477, PMID 27660368
  - `nordico-fasciculo2021`: Yagiz G, PLoS One 16:e0259821, PMID 34752499
  - `nordico-invertido2024`: Pereira NDS, J Sport Rehabil 33:646–653, PMID 39214520, DOI 10.1123/jsr.2023-0431
  - `nordico-prevencao2019`: van Dyk N, Br J Sports Med 53:1362–1370, PMID 30808663
  - `nordico-reanalise2021`: Impellizzeri FM, J Clin Epidemiol 140:111–124, PMID 34520846
  - `patelofemoral2023`: Song K, Am J Sports Med 51:2110–2119, PMID 37272685, DOI 10.1177/03635465231175160
  - `ponte-plataforma2025`: Sano Y, Int J Sports Med 46:430–436, PMID 39933727, DOI 10.1055/a-2537-6350
  - `ponte-unilateral2017`: Lehecka BJ, Int J Sports Phys Ther 12:543–549, PMID 28900560
  - `cadeiras-criancas2014`: Kurinsky RM, Clin Pediatr 53:372–9, 2014, PMID 24322954, DOI 10.1177/0009922813510599
  - `moveis-criancas2021`: Lu C, Inj Epidemiol 8:53, PMID 34446115, DOI 10.1186/s40621-021-00346-6
  - `flexao-forca1995`: Ikawa H, Acta Med Okayama 49:129–35, 1995, PMID 7676844, DOI 10.18926/AMO/30408
  - `flexao-punho2018`: Daly BT, J Hand Surg Am 43:339–345, 2018, PMID 29157783, DOI 10.1016/j.jhsa.2017.10.019
  - `lombar-reabilitacao2008`: Ekstrom RA, J Orthop Sports Phys Ther 38:736–45, PMID 19195137
- As 16 do `10` (`alizadeh2020`, `andersen2022`, `bello2025`, `carvalho2022`, `ekstrom2003`, `gavanda2026`, `hammert2026`, `heyn2023`, `lees2025`, `martins2013`, `morton2016`, `oranchuk2019`, `schoenfeld2016c`, `terada2022`, `tsuzuku2018`, `vargasmolina2026`): PMID, 1º autor, ano e título conferem com a ficha do `10` (16/16). O status continua o do `10` ("resumo-PubMed").
- `larsen2025b` (PMID 40113586) e `kassiano2026` (PMID 41379528): os resumos foram relidos hoje e conferem com `fontes.md` (05/11). Não há mudança.

## Como reproduzir
Os scripts ficam em `/tmp/claude-0/-home-user-treino-mvp/4613f7ac-a8aa-59f1-871a-0fe029cac2fa/scratchpad/frente-e/` e serão descartados.
- `npx vite build --outDir <pasta>/dist --emptyOutDir`: o tamanho do pacote e do precache.
- `npx vite preview --outDir <pasta>/dist --port 4320 --strictPort` e `npx playwright test -c <pasta>/e2e/pw.config.ts` (com `node_modules` ligado por link simbólico na pasta): `e2e/offline.spec.ts` faz o cadastro da Ana (`tests/e2e/jornada.ts`), liga o offline e testa os 6 passos; mede também a persistência, os caches, a instalabilidade (CDP `Page.getInstallabilityErrors`), os ícones e os pedidos externos. O resultado vai para `offline.json`. O preview foi parado ao fim.
- `npm audit --omit=dev` e `npm audit --json`: a tabela da seção 2.6.
- `curl` no eutils (`esummary` com os 16, os 13 e o 9442191; `efetch rettype=abstract` com os 14 e com 40113586 e 41379528): a conferência das fontes.
- `grep -rn "não fica guardad\|nada fica guardado no servidor" src`: as 3 telas. `grep -rln "ErrorBoundary" src`: 0.
- Textos de norma e de fornecedor: `curl` nas URLs de "Fontes novas"; o Planalto devolveu resposta vazia ou 503.
