# Briefing do agente 2: Cadastro rápido, de verdade e na sensação

Leia primeiro `docs/revisoes/redesign/briefings/00-comum.md`. Relatório: `docs/revisoes/redesign/agente-2-cadastro.md`. Scripts: `scripts/design/redesign/agente-2/`; imagens brutas em `reports/design/redesign/agente-2/`.

**Objetivo em uma frase:** como o caminho da abertura (`/`) até o primeiro programa (`/programa`) fica o mais curto possível em toques e em tempo, e **parece** ainda mais curto a quem preenche.

**Fronteira:** você é dono do **fluxo, da contagem de toques e do tempo** de todas as telas do cadastro, inclusive da tela de equipamento (`/comecar/inventario`: lugar, lista, foto). O **layout** dela (cartões, ícones, densidade) é do agente 4: você diz o que a tela precisa fazer e em quantos toques; ele desenha. Não desenhe paleta (agente 5).

**Critério do projeto (PLANO-MVP, seção a, critério 1):** até 1 min e até 15 toques, 0 caractere, da abertura ao programa para quem não tem condição de saúde, **sem contar a tela de equipamento**; com "Academia completa", a tela de equipamento em até 15 s. Hoje: 13 toques (teste em `tests/e2e/onboarding.spec.ts`, que conta `pointerdown` fora de `/comecar/inventario`). Meta da proposta: menos toques que hoje, ou o mesmo número com menos telas e menos rolagem.

**Meça por script (Playwright, Pixel 7 e 360 × 740), para as 6 personas de `tests/personas/index.ts` e para o caminho "sem condição de saúde":**
- toques, caracteres digitados, número de telas, altura de rolagem por tela (em alturas de tela), tempo de um robô (com pausas de 0) e **tempo estimado de uma pessoa** pelo modelo KLM/GOMS (cite a fonte dos operadores: Card, Moran e Newell 1983; Kieras; para toque em celular, procure estimativas validadas, ou declare a sua premissa).
- a tela de equipamento em separado: lugar (os 4 atalhos "Academia completa", "Condomínio", "Casa", "Corpo livre"), lista (os 46 itens em `src/domain/taxonomia/equipamentos.ts`) e foto (`src/features/onboarding/FotoEquipamento.tsx`; a API não roda localmente: meça o fluxo até o envio e o que a tela mostra enquanto espera, simulando a resposta). O que "Academia completa" supõe (regra `equipamento.atalhos` em `docs/pesquisa/regras.md` e `src/domain/`): é honesto? O que a foto promete e quanto demora?
- use `tests/e2e/jornada.ts` como base para percorrer; a Ana já está pronta; monte o percurso das outras 5 (Bruno tem 2 locais: meça o 2º local também, em `/locais`).

**Estude (com fonte e selo):** percepção de tempo e de progresso (limites de resposta de 0,1 s, 1 s e 10 s: Miller 1968, Nielsen 1993; indicadores de progresso: Myers 1985, Harrison 2007; gradiente de meta e progresso adiantado: Kivetz 2006, Nunes e Drèze 2006, já no projeto); "uma coisa por página" do GOV.UK; padrões (defaults) e avanço automático (quando ajuda, quando confunde; o custo de desfazer); o custo de cada pergunta (Baymard, Conrad 2010); formulários em celular (Luke Wroblewski; NN/g; Baymard).

**Para cada pergunta do cadastro de hoje** (aviso; triagem com 9 condições e dor; experiência: tempo contínuo, semanas parado, confiança na técnica; rotina: dias, minutos, prioridades, objetivo; equipamento; confirmar com "algo a evitar"), diga: fica, sai, muda de forma ou **vai para depois do 1º treino**, e **confira o efeito no gerador** em `src/domain/` e em `src/storage/esquema.ts` (`perfilDe()`, `PASSOS`, o que é opcional). O Gustavo autorizou propor mover objetivo, prioridades e "algo a evitar" para depois do 1º treino. A triagem e os textos de segurança **não mudam de conteúdo** (só de forma e ordem, se fizer sentido e for seguro: registre o conflito se houver).

**Entregue:**
- A tabela de medidas de hoje (persona × toques, caracteres, telas, rolagem, tempo do robô, tempo KLM).
- O **fluxo proposto tela a tela**, com a contagem prevista de toques e a estimativa de tempo por KLM, para o caminho sem condição e para as 6 personas.
- A lista das perguntas que saem ou se movem, cada uma com o efeito no gerador e no estado (migração necessária?).
- As **regras de "sensação de velocidade"** que a implementação deve cumprir: resposta visual ao toque em menos de 100 ms, transição de no máximo 200 ms (desligada com `prefers-reduced-motion`), nunca um spinner sem contexto, nenhuma espera acima de 1 s sem progresso visível, o que fazer enquanto a foto é analisada, e onde o avanço automático é aceitável (só onde a pessoa vê o que escolheu e volta com um toque).
- Os riscos (ex.: avanço automático e toque errado; o que a pessoa perde se "algo a evitar" vier depois).
