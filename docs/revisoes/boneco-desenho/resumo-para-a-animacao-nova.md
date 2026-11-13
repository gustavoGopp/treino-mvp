# Resumo para a sessão da animação nova

Da sessão do desenho do Boneco (13/11/2026), ramo `claude/vigilant-lovelace-rkqoz1`, criado a partir de `claude/loving-hamilton-c4ji83`. Esta sessão não mexeu em `src/`, em `public/`, nos testes nem no app: tudo está em `docs/revisoes/boneco-desenho/` e `scripts/boneco-desenho/`.

## O que ficou decidido

O Gustavo escolheu **dois desenhos do mesmo corpo**: "pode ser 1.1 e 10.1. Vamos deixar esses 2 como opções para a pessoa escolher na configuração e o cinza como default".

- **Cinza (padrão):** cinza, traço fino escuro, sem roupa, descalço, cabeça de ovo sem rosto e sem cabelo, com os grupos musculares e a rótula sempre desenhados em linha fina; músculo vermelho (principal) e laranja (secundário), com borda escura.
- **Cor de pele (opção):** o mesmo corpo com cor de pele, contorno suave na cor de cada parte, short opaco, tênis e cabelo curto; o músculo aparece por baixo do short, que só fica claro quando o músculo que trabalha está debaixo dele; principal num vermelho mais suave e secundário num tom claro dele.
- Nos dois: proporção real, formas curvas, chapado (sem sombra), mão com polegar e dedos, três níveis de músculo (cor cheia com divisões; tom claro; listrado), traço de 1,25 px no palco e de 1 px na miniatura.

A ficha completa, com o contraste medido e o selo de cada item (decisão dele, herdada, escolha de desenho, em aberto), está em **`decisao.md`**. As pranchas finais, ao lado do boneco de hoje, estão em **`final/prancha-cinza.png`** e **`final/prancha-pele.png`**.

## O que você precisa saber para continuar

1. **O caminho recomendado é o corpo em seções ovais que você já tem** (`src/engine/novo/corpo3d.ts` e `desenho.ts`), agora com as seções tiradas dos perfis desenhados nesta sessão, e não direto da tabela de medidas. A malha do MakeHuman e o pintor em WebGL não são necessários para este desenho. A análise está em `viabilidade.md`.
2. **Os perfis desenhados** (largura de cada parte, de lado e de frente, mais cabeça, mão, pé, bacia) estão em `scripts/boneco-desenho/boneco-prova.mjs`; **os grupos musculares**, em `musculos-prova.mjs`; **as cores e os traços dos dois estilos**, em `estilos-finais.mjs`. São dados para levar para o motor.
3. **As pranchas são o gabarito.** Antes de animar, o motor precisa reproduzir `final/prancha-*.png` de lado e de frente.
4. **As vistas de cima, de frente e de trás fora da pose em pé nunca foram mostradas ao Gustavo.** 32 das 90 animações de hoje usam a vista de frente, 16 a de cima e 14 a de trás.
5. **O esqueleto de medidas reais funcionou** como base de todas as pranchas (goblet, flexão, supino, puxada e uma pose de braços para cima). Só foi lido, não alterado.
6. **Regra nova de roupa:** a peça só fica clara (véu) quando há músculo que trabalha debaixo dela. Sem isso, de costas, os glúteos aparecem por baixo do short, e ele achou esquisito.

## O que o Gustavo disse que vale levar

- No começo: gosta da simplicidade, da leveza e da cara de diagrama do boneco de hoje; sente falta de acabamento, de corpo e músculos mais fiéis e de personalidade.
- Sobre o cinza sem as linhas do corpo: "tá bom, mas acho que ainda tá muito simples [...] na hora de ver um treino com ele, ele não vai ser tão preciso".
- Sobre o músculo: não por cima da roupa, não forte demais e com forma de músculo.
- Ele decide olhando, responde curto ("pode ser") e muda de ideia quando vê: escolheu "sem contorno" e "com roupa" nas perguntas de gosto e, nas rodadas, ficou com dois desenhos com traço e sem regata. O registro inteiro está em `gosto.md` e `rodadas.md`.

## O que ficou em aberto (perguntas para ele)

1. O músculo secundário na cor de pele tem contraste de 1,1:1 com a pele: aceitar uma borda mais escura?
2. Secundário laranja no cinza e tom claro do principal na cor de pele: duas regras ou uma?
3. O short claro no tema escuro se confunde com a pele (1,2:1).
4. Um tom de pele só, ou a pessoa escolhe?
5. Um corpo só (homem), ou uma segunda pessoa?
6. A bolinha da junta-chave do boneco de hoje entra no desenho novo?
7. O estilo "Silhueta" continua na configuração?

## Avisos

- **O teste de privacidade falha no seu ramo.** `tests/repo/privacidade.test.ts` acusa `docs/revisoes/animacao-nova/pesquisa/07-tecnica-de-desenho.md`, que cita o e-mail público de licenciamento de um instituto de pesquisa. Não mexi, porque o arquivo é da sua sessão.
- Os scripts desta sessão passam no lint (`npx eslint scripts/boneco-desenho`). O `npm run check` inteiro não foi rodado.
- A pesquisa de referências desta sessão (86 referências com a imagem vista, mais 50 citações de avaliações de apps) está em `referencias.md` e `pesquisa/`.

## Mapa da pasta

| Arquivo | O que tem |
|---|---|
| `gosto.md` | o que o Gustavo disse e escolheu, pergunta a pergunta |
| `referencias.md`, `referencias-resumo.md`, `pesquisa/` | a pesquisa e a régua de realismo |
| `ideias.md` | 48 ideias e os 11 conceitos |
| `rodadas.md` | as quatro rodadas, com a minha recomendação e a decisão dele em cada uma |
| `decisao.md` | a ficha dos dois desenhos escolhidos |
| `viabilidade.md` | como reproduzir por código, o que foi medido, riscos e testes |
| `gosto/`, `rodada-1/` a `rodada-4/`, `final/` | as pranchas |
| `scripts/boneco-desenho/` | o que gera tudo (`pares.mjs`, `rodada1.mjs` a `rodada4.mjs`, `final.mjs`) |
