# Decisões do M4: foto do equipamento (01/11/2026)

O plano já definia o fluxo (`PLANO-MVP.md`, seção g). Aqui ficam as escolhas de implementação e o que foi conferido.

## 1. Tamanho da foto: 1.568 px no lado maior
A documentação de visão da API (conferida em 01/11/2026) tem dois níveis: o padrão, que reduz a imagem para no máximo
1.568 px no lado maior (até ~1.568 tokens por imagem), e o de alta resolução, automático nos modelos Claude 4.7 e mais
novos, que vai até 2.576 px (até ~4.784 tokens). O app reduz para 1.568 px no aparelho:
- mantém o custo por foto baixo;
- 5 fotos cabem no limite de tamanho do pedido da função na Vercel;
- era o valor do plano.
O eval (`scripts/eval-vision.ts`) pode testar se a alta resolução melhora a leitura dos números dos halteres.

Fonte: [Claude API – Vision](https://platform.claude.com/docs/en/build-with-claude/vision).

## 2. Metadados (EXIF e GPS) saem no aparelho
A foto é redesenhada num canvas e salva como um JPEG novo (qualidade 0,8). O JPEG novo não leva o segmento EXIF da
original, onde ficam câmera, data e GPS. Um teste E2E monta uma foto com EXIF de GPS, passa pelo app e confere que o que
chega ao servidor não tem EXIF. O servidor não guarda a foto e não registra a imagem no log (só o número de fotos e de
tokens).

## 3. Modelo, formato da resposta e recusas
- **Modelo:** `claude-opus-5-5` por padrão, trocável pela variável `VISION_MODEL`. Pelo plano (seção g), o modelo final é
  **o mais barato que atingir recall ≥ 85% e precisão ≥ 90%** no gabarito; a escolha é do Gustavo, depois de rodar o eval
  com as fotos reais (o script compara Haiku 5.5, Sonnet 5.5 e Opus 5.5).
- **Formato:** saída estruturada com JSON Schema gerado da taxonomia (os ids possíveis são só os 25 itens). O servidor
  valida de novo com zod e descarta o que não for da taxonomia.
- **Recusa do modelo:** o pedido usa o fallback no servidor da API (`fallbacks: "default"`): se o modelo recusar, a API
  refaz o pedido em outro modelo na mesma chamada. Se mesmo assim não houver resposta, o app volta para a lista.

## 4. Convite e limite
- Código de convite na variável `CONVITES` (lista separada por vírgula), sem diferenciar maiúsculas.
- Limite de 10 fotos por aparelho por dia (plano: ~10) e de 40 por IP (várias pessoas podem dividir o IP de uma academia).
- **Limitação conhecida:** o contador fica na memória de cada instância da função. Basta para o beta fechado com convite;
  antes de abrir o beta, trocar por um contador compartilhado (Vercel KV ou Upstash) e definir o teto de gasto no
  console da Anthropic (plano, seção j). Registrado no backlog.

## 5. Confirmação
Como no plano: confiança alta aparece como "Tenho", baixa como "Não tenho" e média pergunta. O botão "Usar na lista" só
libera quando todos os itens têm resposta. Atributos vindos da foto (faixa dos halteres, banco que declina etc.) só
preenchem campos vazios; nunca trocam o que a pessoa já informou.

## 6. Pendências que dependem do Gustavo
- Cadastrar na Vercel as variáveis `ANTHROPIC_API_KEY` e `CONVITES` (a chave nunca passa por esta sessão).
- Definir o teto de gasto mensal no console da Anthropic.
- Rodar `npm run eval:visao` na máquina que tem `privado/` (fotos e gabarito) e escolher o modelo.
