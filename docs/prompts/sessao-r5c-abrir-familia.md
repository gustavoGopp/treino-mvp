# Prompt: R5c, abrir o app para família e amigos com segurança

> Rascunho escrito na sessão de próximos passos (06/11/2026), a partir de `docs/revisoes/proximos-passos.md` (parte 2, marco R5c) e do relatório `proximos-passos/e-produto.md`. Escolhido em 07/11/2026 (parte 3 de `docs/revisoes/proximos-passos.md`). Cole o texto abaixo, a partir de "Você vai conduzir", numa sessão nova.
>
> **Atualização de 07/11/2026 (decisões da parte 3 de `docs/revisoes/proximos-passos.md`):** é o **6º marco** da ordem R5a → R5-CL → R5d → R5-anim → R5b → R5c, conduzida pela sessão de `sessao-desenvolvimento.md`. A triagem continua com as perguntas próprias e a revisão por um CREF continua "de lado" (decisão do Gustavo de 01/11); registre-a no devlog como item a reavaliar antes de abrir o app a desconhecidos (não para família e amigos).

---

Você vai conduzir o **R5c, "abrir para família e amigos"**, do treino-mvp, um web app (PWA) em pt-BR que monta um programa de hipertrofia baseado em evidência, só com o equipamento que a pessoa tem, e conduz cada sessão com um guia animado (o "Boneco"), o temporizador de descanso e as sugestões de progressão.

**Quem é o Gustavo.** É o dono do app. Não é programador nem da área de exercício, anatomia ou design. Fala de produto e de experiência, e prefere explicações simples e visuais, em pt-BR, sem jargão. Quando um termo técnico for inevitável, explique-o numa frase.

**Por que este marco.** O Gustavo decidiu (06/11) que o app vai abrir para **família e amigos** nos próximos meses, não para o público. A sessão de próximos passos mediu o que falta para outra pessoa usar com segurança:
- **A foto:** três telas (`BoasVindas.tsx:57`, `FotoEquipamento.tsx:144`, `Dados.tsx:68`) dizem que a foto "não fica guardada no servidor". O servidor do app não guarda, mas a Anthropic guarda o que a API recebe por até 30 dias, nos EUA (`anthropic-retencao`). Falta dizer para onde a foto vai e pedir o consentimento destacado antes do 1º envio (LGPD, art. 11 e art. 33; `lgpd`).
- **Perder os dados:** há 0 tela de erro no app; um erro de tela deixa a página em branco, sem caminho até "Exportar". No Safari sem instalar, o armazenamento do site é apagado depois de 7 dias de uso do Safari sem visita (`webkit2020`).
- **Termos e canal:** não há termos de uso, aviso de privacidade nem um jeito de avisar um problema.
- **O que já funciona:** o app funciona sem rede depois da 1ª visita (5 de 5 passos medidos) e se instala no Android. O limite compartilhado da visão custa US$ 0 (Upstash grátis), mas quem protege o bolso é o teto de gasto no console da Anthropic com um convite por pessoa.
- **Quem nunca treinou:** RIR aparece em 5 telas e é explicado em 1; série, repetição e carga em 0.

**Leia primeiro:** o `CLAUDE.md` (o princípio de privacidade); `docs/revisoes/proximos-passos.md` (parte 2); `docs/revisoes/proximos-passos/e-produto.md` inteiro (P1 a P6, B1, B2, os pedidos e as fontes); `docs/pesquisa/11-decisoes-m4.md` (a visão); `api/`; `src/storage/`; `src/features/onboarding/BoasVindas.tsx`, `FotoEquipamento.tsx`, `src/features/dados/Dados.tsx`; as fontes `lgpd`, `anpd2-2022`, `anthropic-retencao`, `anthropic-termos`, `webkit2020`, `webkit2023`, `mdn-storage` em `docs/pesquisa/fontes.md`.

**Regras desta sessão**
- Conta: só as contas pessoais do Gustavo, nunca a conta de trabalho. Tudo fica no git, e só no git.
- Não mexa no branch `r3-uso-real`. `privado/` nunca é versionado nem usado.
- **Não é parecer jurídico.** Os textos de termos e privacidade saem como rascunho para um advogado revisar; o devlog registra a revisão antes de mandar o link a alguém.
- **O redesign visual** é de outra sessão e refaz a tela da foto (lote 3) e o `App.tsx` (lote técnico). Combine a ordem com o Gustavo; as telas novas (caixa de consentimento, tela de erro, aviso de instalar no iPhone, "última cópia", link dos termos, "Como ler o seu treino", ícone do iPhone) são pedidos ao design (`proximos-passos.md`, seção 2.5, itens 11 a 17). Se o lote dele não estiver na `main`, faça o mínimo funcional com os componentes de hoje.
- **O estado guardado não muda de versão.** A data da última cópia e o consentimento da foto ficam no `localStorage`, como o convite.
- Branch nova a partir da `main`. Commits pequenos, em pt-BR e no imperativo, com push. Ida para a `main` só com o ok do Gustavo, por merge sem forçar.
- Todo texto de regra entra em `docs/pesquisa/regras.md` com selo e fonte (a regra nova `privacidade.foto`, consenso, norma). A chave da API continua só no servidor; nenhum dado pessoal vai para o repositório nem para o canal de problema.

**O que fazer, nesta ordem**
1. **A foto (P1):** a regra `privacidade.foto`; o texto exato nas 3 telas; a caixa de consentimento antes do 1º envio, com a data guardada no aparelho; teste e2e.
2. **Não perder os dados (P3, P4):** a tela de erro em volta das rotas, com "Exportar meus dados" (lendo direto o armazenamento), "Avisar um problema", "Tentar de novo" e a versão; "última cópia há N dias" e o lembrete; o aviso de instalar no iPhone fora da tela de início; o aviso quando o navegador nega o armazenamento persistente.
3. **Termos e canal (P2, P5):** a página de termos e privacidade (o que o app faz e não faz, o dado no aparelho, a foto, os direitos do titular, o contato), linkada nas boas-vindas e em Meus dados; o "Avisar um problema" com a versão e o aparelho já escritos e sem dado de saúde.
4. **"Como ler o seu treino" (B2):** série, repetição, carga, descanso e RIR em 5 linhas, com as regras `rir.leitura` e `iniciante.fase-aprendizado`.
5. **Com o Gustavo (P6):** o teto de gasto no console da Anthropic e um código de convite por pessoa. Opcional, se der tempo: o limite compartilhado no Upstash (B1) e a correção de `api/_lib/pedido.ts` para contar o aparelho antes do IP.

**Aceite (medido)**
- e2e: um erro forçado numa tela mostra a saída, e o export funciona dali; a caixa de consentimento aparece antes do 1º envio da foto e não aparece depois; "última cópia" aparece em Meus dados.
- 0 tela com "não fica guardada no servidor" sem dizer para onde a foto vai.
- O Gustavo confirma no devlog o teto de gasto, os convites e a revisão do advogado.
- `npm run check`, `npm run test:e2e` limpos; Lighthouse de acessibilidade ≥ 90 nas telas novas.

**Fechamento.** `docs/devlog.md` (o que mudou e o rascunho de post), `docs/backlog.md` e parar para a revisão do Gustavo antes de mandar o link a qualquer pessoa.

**O que não fazer**
- Não colete dado pessoal, nem para medir o uso; o export só sai do aparelho se a pessoa enviar, com consentimento específico.
- Não prometa o que a Anthropic ou a Vercel não garantem por escrito.
- Não mude a triagem (o PAR-Q+ oficial e a revisão por um CREF são decisão separada do Gustavo).
- Não afirme nada sobre treino ou lei sem selo e fonte.
