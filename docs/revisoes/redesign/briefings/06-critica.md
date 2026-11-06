# Briefing do agente 6: crítico independente, acessibilidade e medição

Leia primeiro `docs/revisoes/redesign/briefings/00-comum.md` (o contexto, o que não muda, o formato). Relatório: `docs/revisoes/redesign/agente-6-critica.md`. Scripts: `scripts/design/redesign/agente-6/`; imagens brutas em `reports/design/redesign/agente-6/`; até 8 imagens no relatório em `docs/revisoes/redesign/img/agente-6-*.png` (≤ 300 kB cada).

**Objetivo em uma frase:** descobrir o que, na proposta de redesign (o protótipo e os 5 relatórios), vai falhar com gente de verdade: leitor de tela, baixa visão, tremor nas mãos, celular barato e lento, sol forte, sem internet.

**Independência.** Você entra depois dos agentes 1 a 5 e **não recebe as conclusões do orquestrador**: não leia `docs/revisoes/redesign/proposta.md`. Julgue o protótipo e os relatórios pelo que eles são. Não confirme hipótese de ninguém; procure o que está errado.

**O material:**
- O protótipo: `docs/revisoes/redesign/prototipo/` (HTML estático: `index.html`, `dados.js`, `boneco.js`, `boneco.css`, `icones-novos.js`; 32 telas e estados, navegados por `#id`; a barra de cima troca tema e cor). Publicado também em https://claude.ai/artifact/5U6uCLS7wT6GsUHYCsQg56. Para medir, sirva os arquivos como faz `scripts/design/redesign/prototipo/capturas.spec.ts` (função `servir`: o arquivo `index.html` ganha o esqueleto `<!doctype html>` na hora; `window.CAPTURA = true` esconde a barra do protótipo). A lista de telas está em `window.__TELAS`.
- As medidas do protótipo que já existem: `docs/revisoes/redesign/depois/medidas-*.json` (toque, contraste, botão principal, rolagem lateral, texto cortado e a visibilidade de "Senti algo", "Série feita" e RIR, em 412 × 839 claro e escuro, 360 × 740 e 412 × 640). Confira-as, não as aceite.
- Os 5 relatórios: `docs/revisoes/redesign/agente-1-retencao.md` a `agente-5-cor.md`, e os briefings que eles receberam.
- As medidas do app de hoje: `docs/revisoes/redesign/medidas.md` e `docs/revisoes/redesign/antes/` (inclui `base.json`: bundle, letra e Lighthouse por rota).
- O app de hoje servido em http://localhost:4173 (se não responder, rode em segundo plano `npm run preview -- --port 4173 --strictPort` a partir de /home/user/treino-mvp; não rode `npm install` nem build).

**Decisões do Gustavo depois de ver o protótipo (06/11)** (são dele, não do orquestrador; não reabra sem motivo de segurança ou acessibilidade):
- A cor escolhida é **Giz e grafite** (a padrão do protótipo).
- Sem faixa colorida na lateral dos avisos.
- A saúde vira **uma pergunta geral** ("Alguma destas vale para você?", com as 9 condições em poucas palavras embaixo; "Não, nenhuma" segue com 1 toque; "Sim, alguma (ou não tenho certeza)" leva à tela em que se marca só o que vale, com a pergunta completa embaixo). Isso muda a regra `seguranca.triagem.nenhuma`: avalie o risco de segurança dessa forma com rigor, porque é o ponto mais sensível da proposta.
- Os 24 equipamentos sem desenho ganharam desenhos novos (folha em `docs/revisoes/redesign/img/icones-equipamento.png`); o desenho do "Corpo livre" ainda não foi aprovado.

**Confira, item a item, e diga passa ou falha com a evidência:**
1. Os critérios de "o que não muda" do briefing comum, em todas as telas do protótipo: o Boneco intacto (só a moldura); o selo em toda regra mostrada e o caminho até a fonte; "Senti algo" visível sem rolar em todo estado do treino (inclusive com folha ou diálogo aberto e no guia aberto pelo treino); a montagem segura nunca recolhida por padrão; nada de `privado/`; toque ≥ 44 px (48 é o piso de hoje); `prefers-reduced-motion`; contraste; nada só pela cor; uma mão; sem rolagem lateral a 360 px; nenhuma dependência nova; motivação sem manipulação.
2. **WCAG 2.2 nível AA**, critério a critério, nas telas que importam (cadastro, treino, descanso, "Senti algo", guia, fim, semana): 1.3.1, 1.3.2 (ordem de leitura), 1.4.1, 1.4.3, 1.4.4 (texto a 200%), 1.4.10 (reflow a 320 px de largura), 1.4.11, 1.4.12 (espaçamento de texto), 1.4.13, 2.1.1 (teclado), 2.4.3 (ordem do foco), 2.4.7 e 2.4.11 (foco visível e não coberto: as barras e folhas fixas cobrem o foco?), 2.5.3 (rótulo no nome), 2.5.7, 2.5.8 (tamanho e espaçamento do alvo), 3.2.x, 3.3.x, 4.1.2 (nome, papel e valor) e 4.1.3 (mensagens de status). Use axe-core (`npx @axe-core/cli` ou o `axe-core` injetado pelo Playwright; se a rede bloquear, diga) e o Lighthouse (via `npx lighthouse`, com `CHROME_PATH=/opt/pw-browsers/chromium-1243/chrome-linux64/chrome`, como em `scripts/design/redesign/base.mjs`).
3. **Leitor de tela:** a árvore de acessibilidade (Playwright `page.accessibility.snapshot()` ou `ariaSnapshot`) do treino, do descanso, de "Senti algo" aberto, do guia e da triagem: os nomes fazem sentido sem ver a tela? O relógio do descanso anuncia demais ou de menos? A folha prende o foco e devolve ao fechar? O título focado ao abrir cada tela ajuda ou atrapalha?
4. **Baixa visão e sol:** zoom de 200% e letra do sistema grande (simule com `font-size` raiz maior), o tema claro e o escuro sob perda de contraste (reduza o contraste das capturas como faria um reflexo), daltonismo (protanopia, deuteranopia, tritanopia) na direção Giz e grafite: alguma informação some?
5. **Tremor e mão molhada:** espaço entre alvos vizinhos que fazem coisas diferentes (RIR, steppers, "Série feita", −15 s e +15 s, "Senti algo" e "‹ Início"), alvos destrutivos perto de alvos comuns, gestos que pedem precisão.
6. **Celular barato e lento, e sem internet:** o orçamento da proposta contra a base medida (o app hoje tem 1 MB de JavaScript e desempenho de 59 a 73 no Lighthouse); a letra servida pelo app; as animações e folhas num CPU 4× ou 6× mais lento (meça o tempo de quadro do protótipo com `CPU throttling` pelo CDP, se der); o que acontece offline. Lembre que o protótipo não é o app: o desempenho real só se mede na implementação; aqui você avalia o orçamento e os riscos.
7. **Privacidade:** o protótipo e os relatórios usam só personas fictícias? Algum pedido externo novo?
8. **Afirmações sem fonte ou sem medida** nos relatórios 1 a 5: procure as importantes que não se sustentam (número sem origem, estudo citado com selo forte demais, "medido" que não foi medido, conclusão que não segue da fonte). Confira por amostragem nos dados brutos (`reports/design/redesign/agente-*/`) e nas fontes (WebSearch/WebFetch; o PubMed está bloqueado: marque "(resumo)").

**Entregue:**
- A **lista de problemas por gravidade**: **bloqueia** (fere "o que não muda", segurança ou WCAG AA de forma que impede uso), **grave** (atrapalha muito um grupo de pessoas ou um critério do projeto), **pequeno**. Cada um no formato do briefing comum (Tela/estado, Problema [medido], Evidência [fonte, selo], Proposta de correção, Efeito esperado, Custo e risco).
- A **lista de afirmações dos outros agentes que não se sustentam**, com o relatório, o trecho e o motivo.
- Um parecer específico sobre a **pergunta geral da saúde**: é segura? O que precisa para ser?
- O que está bom e deve ficar (com a medida).
- O resumo em 10 linhas para o Gustavo.

Regras duras: não altere o protótipo, o app, os testes, os docs existentes nem configurações; não faça commit. Só personas fictícias. Nada de inventar estudo, número ou citação: sem fonte, [opinião]. Escreva em pt-BR simples, para o Gustavo (não programador). Seja econômico: priorize terminar o relatório.
