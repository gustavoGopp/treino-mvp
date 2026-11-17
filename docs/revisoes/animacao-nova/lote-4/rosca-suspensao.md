# Lote 4 · Rosca na suspensão (`rosca-suspensao`)

De 15/11/2026. Sobre o núcleo `exercicios/na-fita.ts`, na mesma posição de partida da remada na suspensão (como a ficha pede). Ainda não está ligada às telas do app.

- Ficha da técnica: `docs/pesquisa/animacoes/rosca-suspensao.md`. Cartão: `src/conteudo/exercicios/rosca-suspensao.json`.
- Ficha de movimento: `src/engine/novo/dados/movimentos/rosca-suspensao.json`.
- Animação: `src/engine/novo/exercicios/rosca-suspensao.ts`. Regras: `src/engine/novo/regras/suspensao.ts`.
- Folha: `../prototipos/folha-rosca-suspensao.png`. Quadros grandes: `../quadros/rosca-suspensao.png`.

## Como a geometria foi montada

O começo é o da remada: âncora a 182,9 cm, calcanhares 20 cm antes da vertical dela, corpo a 55°, braços estendidos na linha da fita; daí a fita sai com **97,7 cm** (1,2 cm a mais que na remada, porque com as palmas para cima o pegador fica um pouco mais longe). Na rosca, **o braço não se move no tronco** (cotovelos parados, apontando para a âncora) e só o antebraço dobra, até 115°. O ângulo do corpo sai da fita a cada instante: ele sobe de 55,6° a 36,4°.

## O que a fonte pede × o que o boneco faz (medido) × confere?

| O que a ficha da técnica (e o cartão) pede | Selo | O que o boneco faz (medido) | Confere? |
|---|---|---|---|
| Fitas num ponto firme no alto, alças na mesma altura | consenso | as duas fitas com 97,7 cm o ciclo inteiro (variação 0 cm) | sim |
| De frente para a âncora, corpo reto inclinado para trás, calcanhares no chão | consenso | ombro, quadril e tornozelo a no mínimo 178,4°; o pé fica parado, a 0 cm do chão no calcanhar, a ponta a 11,3 cm | sim |
| Palmas para cima, braços estendidos à frente | consenso | antebraço de 4,9° a 22,9° de pronação (0° = palma para cima); no começo, o cotovelo reto, na linha da fita | sim |
| Cotovelos altos e parados, apontando para a âncora | consenso | o braço gira 0° no tronco; no fim, o cotovelo fica 9,4 cm acima do ombro | sim |
| Mãos para perto da testa | consenso | no fim, a pegada fica a 12,4 cm da cabeça (superfície), 23,6 cm à frente do centro dela e 4,6 cm acima | sim |
| Mais deitado = mais difícil; a fita não estica | consenso / física | o corpo sobe de 55,6° a 36,4° enquanto as mãos vêm à testa | sim |
| ~1 s subindo, ~2 s descendo | consenso | 1,1 s / pausa 0,6 s / 2,1 s | sim |

Conferência automática: **0 falha, 2 avisos.** (1) As linhas da ficha de movimento que são escolha de desenho (pés, ângulo inicial, polegar, quanto o cotovelo dobra no fim). (2) O antebraço aparece como "só ajuda" (`antebraco: 'a'`), fora da lista da biblioteca, como manda a correção de 04/11 ("antebraço em laranja listrado"). Ritmo suave (6,6%). Músculos: a vista padrão é a **de cima** (141 cm² do bíceps; de lado, 51 cm²), a mesma vista que a animação de hoje usa.

## Erros

| Erro (texto do app) | O que o boneco faz (medido) |
|---|---|
| Quadril cai (de lado) | o quadril dobra 34° e desce 17 cm no fim (de 77,1 para 60,1 cm); a fita continua com 97,7 cm |
| Cotovelos descem (de lado) | os cotovelos descem até a posição final da remada (o cotovelo vai de 126,9 para 90,8 cm de altura) e as mãos vão ao peito: vira uma remada, como hoje |
| Não estender os braços (de lado; quadro parado no começo) | a volta para na metade: o cotovelo fica dobrado 57,5° e o corpo a 48° em vez de 55,6° |

## O equipamento

A fita do lote 1, com os acréscimos da remada (`pontoDeDivisao`, `vigaComoCenario`) e mais um: **na vista de cima a viga (cenário) não é desenhada**, porque ficaria por cima da pessoa e, pintada atrás dela como cenário, parecia um degrau sob os pés. Só vale com `vigaComoCenario`; o búlgaro na suspensão não muda.

## Correções já feitas que esta animação respeita

- A fita não estica e o corpo gira sobre os calcanhares (04/11).
- Antebraço como "só ajuda" (04/11): sim, com o aviso da conferência.
- Erros `quadril`, `cotovelo` ("a pose final é a da remada"), `curta`: sim.

## O que não ficou bom

- **De lado, no fim, a mão aparece sobre o contorno da cabeça**: ela fica ao lado da cabeça (a 16 cm do meio do corpo, 12 cm da superfície), mas de perfil o desenho a sobrepõe. Reduzi a dobra do cotovelo de 128° para 115° (a mão a 9 cm da cabeça ficava em cima da testa); menos que isso já não é "perto da testa".
- O quadril caído desce 17 cm, bem mais que na remada (7,6 cm), com a mesma dobra de 34°: com os braços acima do ombro, o corpo inteiro se acomoda diferente para manter a fita. Lê-se bem, mas é mais forte que o da animação de hoje.
- Pés 20 cm antes da âncora em vez de 30 cm além (o mesmo motivo da remada).
