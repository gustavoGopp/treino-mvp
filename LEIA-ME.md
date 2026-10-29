# Kit inicial: MVP do app de treino

Esta pasta é o ponto de partida do projeto no Claude Code.

## Como usar
1. Descompacte o kit numa pasta de projetos (por exemplo, `treino-mvp`).
2. Abra essa pasta no Claude Code desktop e ative o modo plan.
3. Envie esta mensagem: **"Leia o arquivo PROMPT-INICIAL.md e siga as instruções."** Se preferir, cole o conteúdo do arquivo direto.
4. Responda às perguntas, revise o plano e só aprove quando o objetivo estiver claro.

## O que tem aqui
| Caminho | O que é | Vai para o git? |
|---|---|---|
| `PROMPT-INICIAL.md` | Prompt de abertura para o modo plan | Sim |
| `.gitignore` | Já bloqueia `privado/`, `.env` e builds | Sim |
| `referencia/guia-execucao-fase1.html` | Guia animado atual (4 treinos, 26 exercícios) | Sim |
| `referencia/motor-de-animacao.md` | Notas técnicas do motor de animação | Sim |
| `referencia/programa-fase-1.md` | Programa e lógica, com fontes | Sim (decida se quer tirar o tom pessoal antes de publicar) |
| `referencia/especificacao-guia-visual.md` | Pedido que gerou o guia (padrão de qualidade) | Sim |
| `referencia/qa/check-motor.cjs` | QA do motor com Playwright | Sim |
| `privado/perfil-usuario-1.md` | Seu perfil, usado como caso de teste | **Não** |
| `privado/prompt-original-personal-trainer.md` | O pedido original que deu início a tudo | **Não** |
| `privado/fotos-academia/` | 5 fotos da academia (metadados removidos) e o gabarito do inventário | **Não** |

## Antes de publicar o repositório
- Confira com `git status` que nada de `privado/` foi versionado.
- As fotos mostram o prédio pela janela. Mesmo sem metadados, não as use em posts públicos.
- Nunca faça commit da chave da API: ela vai em `.env.local` e nas variáveis de ambiente da Vercel.
