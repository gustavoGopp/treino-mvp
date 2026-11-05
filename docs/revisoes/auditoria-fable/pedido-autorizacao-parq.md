# Pedido de autorização à PAR-Q+ Collaboration (rascunho para o Gustavo enviar)

> Rascunho da auditoria de 05/11/2026. Eu não envio e-mail: o pedido sai da conta pessoal do Gustavo. Os Termos e Condições (https://eparmedx.com/?page_id=746) pedem autorização prévia por escrito para incorporar o PAR-Q+ em aplicativos e para qualquer adaptação do texto; o contato indicado é **eparmedx@gmail.com**. Antes de enviar, preencha os colchetes e confira se quer citar o nome do app (hoje é só um codinome).

**Assunto:** Request for authorization to use the PAR-Q+ (Brazilian Portuguese version) in a small non-commercial fitness app

---

Dear PAR-Q+ Collaboration,

My name is [nome completo], and I am the developer of a small web application for strength training in Brazil (working title "treino-mvp"). The app builds an evidence-based hypertrophy program from the equipment a person has and guides each session. It is currently in a private testing phase, used by myself and a few family members and friends; there is no payment, advertising or data collection on a server (all data stays on the user's device).

Before a person receives a program, the app runs a short readiness screening. Today it uses our own questions, which the app explicitly describes as "inspired by the PAR-Q+ and not the official questionnaire", and it does not claim any endorsement by the Collaboration. Having read your Terms and Conditions, I would like to ask for written authorization to:

1. incorporate the official Brazilian Portuguese version of the PAR-Q+ (the 2025 form, as translated and validated by Schwartz et al., 2021) into the app, as an electronic screening step, with the full and unmodified wording of the seven general questions and, if authorized, the follow-up questions;
2. display the official citation and the Collaboration's copyright notice in the app, exactly as indicated on your "How to cite" page;
3. keep the current behaviour of the app, which is conservative: any "yes" answer suspends the automatic program and advises the person to consult a physician or a qualified exercise professional before continuing. The app does not diagnose and does not replace the ePARmed-X+ or a professional's assessment.

The intended use is non-commercial at this stage. If the app is ever opened to the public or becomes commercial, I understand that a separate authorization and possibly a licence fee would apply, and I would contact you again before that.

Could you please let me know whether this use can be authorized, under which conditions, and whether there is any fee or form I should complete?

Thank you for your work and for making the PAR-Q+ available.

Kind regards,
[nome completo]
[cidade, Brasil]
[e-mail pessoal]
[link do app, se quiser: https://treino-mvp-sigma.vercel.app]

---

## Versão em português (para você entender o que está pedindo)
Peço autorização por escrito para: (1) incorporar no app a versão oficial em português do Brasil do PAR-Q+ (formulário 2025, tradução validada por Schwartz et al., 2021), como etapa eletrônica de triagem, com as 7 perguntas gerais sem alteração e, se autorizado, as de acompanhamento; (2) mostrar no app a citação oficial e o aviso de direitos autorais, como a página "Como citar" indica; (3) manter o comportamento conservador do app (qualquer "sim" suspende o programa automático e recomenda médico ou profissional de exercício). Uso não comercial por enquanto; se o app for aberto ao público ou virar comercial, aviso antes e aceito uma nova autorização ou taxa.

## O que fazer com a resposta
- **Se autorizarem:** a regra `seguranca.triagem.texto` muda e o app passa a usar o texto oficial em português (`schwartz2021`), sem alterar uma palavra, com a citação. As 9 perguntas de hoje viram as 7 oficiais mais as duas que o próprio formulário trata como "adiar" (gravidez e doença aguda).
- **Se negarem ou cobrarem:** fica como está (perguntas próprias, apresentadas como "não é o questionário oficial"), que a licença permite.
