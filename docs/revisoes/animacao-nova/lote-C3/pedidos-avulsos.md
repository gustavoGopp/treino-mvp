# Lote C3 · Avulsos: pedidos ao conteúdo e a quem integra

De 18/11/2026. Nada aqui foi mexido: são pedidos.

1. **Coice na polia (`coice-polia`): o músculo secundário.** A ficha da técnica (`docs/pesquisa/animacoes/coice-polia.md`, "Músculos") propõe "Primário: glúteos. Secundário: posteriores". O cartão e a biblioteca só listam glúteos, e a conferência falha se a animação realça um músculo que o conteúdo não lista. A animação ficou só com o glúteo. Se os posteriores entrarem na biblioteca, basta pôr `'posteriores:R': 's'` em `papeis` (`src/engine/novo/exercicios/coice-polia.ts`).
2. **Abdução na polia (`abducao-polia`): "Embalar a perna" sem desenho.** A descrição do cartão ("A perna vai com impulso") é ritmo, sem pose diferente da certa; é o mesmo caso do "Balançar a perna" da abdução com elástico aprovada. Quem integra põe `'abducao-polia': ['Embalar a perna']` em `SEM_DESENHO` (`tests/unit/motor-novo-ponte.test.ts`).
3. **Abdominal na máquina: o cartão de equipamento de hoje** (`public/equipamento/abdominal_maquina.svg`) tem o braço girando num eixo alto, atrás da cabeça, e não tem o apoio da lombar. A peça nova segue o manual público da Life Fitness (o eixo baixo, ao lado da lombar, e o apoio). Se o Gustavo aprovar a peça, o cartão pode ser refeito para combinar com ela.
4. **A tornozeleira:** a argola em D e o mosquetão ficaram provisórios (nenhuma ficha pública lida dá a medida).
