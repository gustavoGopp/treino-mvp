# treino-mvp

Treino de hipertrofia baseado em evidência, montado **só com o equipamento que você tem**: academia de prédio, casa ou academia pequena.

1. Você mostra o que tem (foto ou checklist) e informa objetivo, dias e tempo.
2. O app monta o programa com regras determinísticas e fontes científicas, explicando o porquê de cada escolha.
3. Durante o treino, o app mostra o guia animado de cada exercício, o temporizador de descanso e o registro com sugestão de progressão.

**Demo:** https://treino-mvp-sigma.vercel.app

**Status:** em desenvolvimento. Estão prontos os marcos M0 a M5 (gerador, cadastro, foto do equipamento e treino com registro), a base refeita com pesquisa aprofundada (`docs/pesquisa-v2/`) e os marcos R0b a R2 e R4 a R5 (vários locais, acompanhamento, o boneco novo, o registro confiável, a biblioteca ampliada, o foco, o avaliador e a abertura para família e amigos). O catálogo tem 49 equipamentos e 171 exercícios, 90 deles com animação. O R3 (4 semanas de uso real) está em andamento. O plano está em [`docs/PLANO-MVP.md`](docs/PLANO-MVP.md) e o diário em [`docs/devlog.md`](docs/devlog.md).

O app não substitui avaliação médica nem profissional de educação física.

## Rodando localmente
```bash
npm ci
npm run dev
```
Testes: `npm run check` (lint, tipos, unitários) e `npm run test:e2e`.

## Licença
Todos os direitos reservados. O código está público só para leitura. Ver [LICENSE](LICENSE).
