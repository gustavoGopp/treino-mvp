# Backlog (fora do MVP)

Ideias e requisitos para depois do MVP. Nada aqui entra sem passar pelo plano.

- **Nutrição.** Precisa suportar restrições alimentares religiosas e culturais (ex.: kashrut, halal) como **regra dura**: separação carne × laticínios, certificação de industrializados, inclusive suplementos lácteos.
- Login e sincronização na nuvem.
- Pagamentos.
- App nativo.
- Recursos sociais.
- Integração com relógios.
- Outros objetivos: emagrecimento, força máxima, corrida.
- Treinador humano.
- Cardio prescrito (no MVP fica só como texto informativo).
- Deload automático (no MVP o app só sugere).
- **Triagem com perguntas de acompanhamento** (como no PAR-Q+ oficial e no ACSM 2015), em vez de bloquear em qualquer "sim". Só depois de confirmar a licença do PAR-Q+ e com revisão de um CREF. Motivo e números em `docs/pesquisa/09-decisoes-m3.md`, seção 8.


## Pendências do lado do Gustavo
- **Chave da Anthropic.** Confirmar que a chave e os convites estão no projeto `treino-mvp` da Vercel, o que atende `treino-mvp-sigma.vercel.app`.
- **Projetos extras na Vercel.** Avaliar apagar `treino-mvp-huks` e `treino-mvp-yej6`, criados em 31/10/2026. Eles repetem cada deploy.
- **Cronometrar o cadastro no celular (critério 1, R1).** O teste automático conta 13 toques e 0 caractere para quem não tem condição nenhuma (sem a tela de equipamento); falta a sua medição de tempo no celular, uma vez, e a da tela de equipamento com "academia completa" (meta: até 15 s).
- **Confirmar a menor anilha da sua academia (T8).** Sem resposta, o app usa 2 kg (opinião).
- **Limite da visão compartilhado** entre instâncias, antes de abrir o app para outras pessoas. Hoje o contador fica na memória de cada instância (`pesquisa/11-decisoes-m4.md`). O Vercel KV foi descontinuado; o caminho é o Redis (Upstash) pelo Marketplace da Vercel.

## Decididos no replanejamento de 01/11/2026
Detalhes em `planejamento/2026-11-diagnostico.md`, `PLANO-MVP.md` e `pesquisa-v2/`.
- **Não fazer agora:**
  - foto do corpo e biotipo (sem evidência de benefício e com dado sensível);
  - idade, peso corporal, sexo e altura no perfil (nenhuma regra os usa).
- **De lado por decisão do Gustavo:** revisão por profissional de Educação Física e triagem com perguntas de acompanhamento.
- **Depois do uso real (R5):**
  - as animações que faltam, por frequência; 14 delas nunca aparecem em programa nenhum;
  - desenhos novos de equipamento;
  - termos de uso e formulário de opinião, se o app for aberto a outras pessoas.
- **Cartões de texto dos exercícios antigos sem animação** (R0c): os 29 novos já têm cartão; os ~40 que vinham de antes (cadeira extensora, ponte, leg press…) ainda mostram "animação em breve" com os músculos. Escrever a partir de uma ficha de técnica, como os novos.
- **Vários locais (R1b), para depois:**
  - apagar um local (hoje dá para renomear, editar o equipamento e trocar o principal, mas não apagar);
  - no local com mais equipamento que o principal, o dia só troca o que não é possível; não acrescenta a vaga que o principal não tinha (ex.: a extensora na academia do bairro do Bruno). Ideia: oferecer "aqui dá para fazer também…";
  - a calibração na volta de uma pausa de mais de 26 semanas depende das pausas detectadas sozinhas (R2).
- **Esteira no inventário antigo (R1):** a esteira saiu da lista de treino, mas fica no inventário de quem já a tinha marcado, sem efeito no programa, para o app não apagar um dado sem a pessoa pedir. A decidir: tirá-la quando a pessoa salvar o equipamento de novo.
- **Lacunas do gerador para avançados com academia completa:** entram no R0 (aproveitar o equipamento).
- **Boneco mais humano, estética do formulário, cadastro mais rápido, peso inicial e acompanhamento:** viraram os marcos R1, R2 e R4 do `PLANO-MVP.md`.
