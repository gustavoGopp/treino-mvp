# Notas para o fechamento (Parte D)

O que vai para o devlog, o backlog e os pedidos de conteúdo, anotado durante os lotes.

## Pontos fracos (para o backlog)
- O cenário pintado atrás do corpo (smith, glúteo na máquina): de lado, a parte de perto da máquina passa atrás do corpo.
- `afundo-kettlebell` (aprovado): o kettlebell fica 2,9 cm dentro do peito em um quadro.
- `tests/repo/privacidade.test.ts` passa perto do limite de tempo (5,3 s) com a máquina carregada; sozinho, passa.
- A barra reta de 20 polegadas fica curta para a puxada.
- A barra hexagonal e o suporte desenhados diferem dos cartões de equipamento de hoje.
- De cima, a cabeça de quem está em pé ou sentado some dentro da silhueta dos ombros (o contorno do corpo é um só). Achado na abdutora (18/11) e conferido em duas aprovadas, `elevacao-lateral` e `face-pull`. A abdutora usa o acréscimo `vies.cabeca` do boneco, desligado por padrão; as aprovadas não foram mexidas. Pedir ao Gustavo se liga nelas.
- Glúteo na máquina: a ficha da técnica pede a de quatro apoios; o cartão de equipamento e as fichas LF SS-GL, HS-HG e MV-NEXT são em pé. Decisão do Gustavo.

## Pedidos de conteúdo
- `docs/revisoes/animacoes-restantes/textos/pedidos.md` (fase A e fase B): entre eles, "travas logo acima do peito" no supino no smith.
- `panturrilha-leg-press`: primeira animação com o quadro só na perna (campo novo `enquadra`, opcional) e uma vista só; espera o ok do Gustavo.
- `hiperextensao`: a almofada do banco romano fica 5,4 cm abaixo do mínimo da ficha da Body-Solid (83,6 contra 89 cm), para a barriga do corpo da tabela não entrar nela.
- `triceps-maquina`: o cartão de equipamento de hoje (`triceps_maquina.svg`) mostra outra máquina (mergulho sentado); a animação segue a ficha da técnica (braço apoiado à frente). Decidir se o cartão muda.
- As máquinas de pilha (supino, desenvolvimento, remada articulada) diferem dos cartões de hoje, que mostram anilhas.
- Auditoria da fase C (18/11, `docs/revisoes/animacao-nova/auditoria-fase-c.md`): seis animações tiradas da aprovação e em correção (pintura de estofado sobre o corpo, mãos fora das alças nos erros, um rótulo no lugar errado). O método da auditoria (o ponto do corpo mais perto da câmera, na frente do estofado e pintado por baixo dele) deve virar uma conferência automática para todas as animações; nas 90 aprovadas, só relatar e perguntar ao Gustavo.
- Pequenos da auditoria ainda abertos: entradas acima de 2,5 cm no `hack` (braço no encosto, 3,1), no `supino-maquina` (2,7) e no `desenvolvimento-maquina` (3,2 no erro); o rolo sobre os calcanhares na `mesa-flexora` vista de cima; na `panturrilha-sentada`, a almofada e o assento 0,5 cm afastados da pele.
- Auditoria das fases A e B (19/11, `docs/revisoes/animacao-nova/auditoria-fases-a-b.md`): 8 graves e 10 médios, todos em animações ainda não ligadas ao app; as 18 saíram da aprovação e estão em correção. A cabeça que some de cima também aparece em aprovadas antigas (`elevacao-lateral`, `face-pull`): perguntar ao Gustavo se corrige.
- Lição geral das duas auditorias: a conferência automática dava 0 falha e não via ordem de pintura nem cabos dentro do corpo. A conferência genérica de pintura (o raio da pele à câmera) e a de fio dentro do corpo devem entrar no `conferir` para todas as animações.
- Achados em animações antigas aprovadas (as 90), não mexidas: a cabeça some de cima em `elevacao-lateral`, `face-pull`, `face-pull-elastico`, `elevacao-halteres`, `elevacao-lateral-elastico`, `crucifixo-polia`, `crucifixo-elastico`, `crucifixo-invertido-polia`, `desenvolvimento`, `desenvolvimento-elastico` (e `abertura-t-deitado`, de frente); a mão de apoio entra na coxa em `remada-unilateral-sem-banco` e `remada-unilateral-kettlebell` (centro da mão a 2,3 cm do eixo da coxa, a mão entra 5,7 cm). Perguntado ao Gustavo em 19/11.
- Conferência automática de pintura, fios e pesos (19/11, `src/engine/novo/conferir-pintura.ts`, relatório em `docs/revisoes/animacao-nova/conferencia-de-pintura.md`): achados em 49 das 90 antigas (aviso) e em 42 das 61 da sessão (falha); `npm run conferir:animacao` passa a sair com erro enquanto houver achado numa da sessão. Antes de corrigir caso a caso, um estudo mede se uma mudança geral no pintor do motor resolve a maioria (`docs/revisoes/animacao-nova/estudo-do-pintor.md`); a decisão de mexer no desenho das antigas é do Gustavo.
