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

## Melhorias pedidas na revisão do M3 (01/11/2026)
Dentro do escopo do MVP, para os próximos marcos (não são itens "fora do MVP"):
- **Boneco do guia mais sofisticado.** Evoluir o desenho da figura (hoje traço e círculos). Qualquer mudança no motor passa pela regressão visual com nova linha de base aprovada.
- **Estética do formulário**, principalmente os desenhos dos equipamentos e as imagens dos exercícios.
- **Preencher mais rápido.** Medir o tempo de cada passo do onboarding com testadores e cortar o que não muda o programa.

## Para o replanejamento depois do M4 (pedido do Gustavo em 01/11/2026)
Depois da foto do equipamento (M4), parar e fazer uma análise completa do cenário e reescrever o plano. Ideias a avaliar:
- **Peso inicial sugerido** a partir do tempo parado, do nível e de dados como peso corporal e idade (hoje o app não sugere carga inicial).
- **Peso corporal, idade e outros dados do perfil**, e o que cada um muda de fato no programa (com evidência).
- **Foto do corpo para estimar o biotipo** e indicar o treino. Pontos já levantados: foto do corpo é dado sensível (LGPD, minimização) e a evidência de que o biotipo deve mudar um programa de hipertrofia é fraca. Analisar com pesquisa antes de decidir.
- As melhorias de estética, praticidade e o boneco mais humano, registradas acima.
- **Limite da visão compartilhado** entre instâncias (Vercel KV ou Upstash) antes de abrir o beta; hoje o contador fica na memória de cada instância (`pesquisa/11-decisoes-m4.md`).
