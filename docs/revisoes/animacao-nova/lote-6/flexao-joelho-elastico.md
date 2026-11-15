# Lote 6 · Flexão de joelho com elástico (`flexao-joelho-elastico`)

De 15/11/2026. Segunda animação da família das flexões de joelho deitado. **Ainda não foi revista pelo Gustavo.**

- Ficha da técnica: `docs/pesquisa/animacoes/flexao-joelho-elastico.md` (a versão escolhida é **de bruços**, como a mesa flexora). Texto do app: `src/conteudo/exercicios/flexao-joelho-elastico.json` (só leitura).
- Ficha de movimento: `src/engine/novo/dados/movimentos/flexao-joelho-elastico.json`.
- Animação: `src/engine/novo/exercicios/flexao-joelho-elastico.ts`, sobre o núcleo da família (`exercicios/flexao-joelho.ts`: `deitadoDeBrucos`).
- Regras medidas: `src/engine/novo/regras/flexao-joelho.ts` (as quatro de bruços).
- Peças: o elástico em tubo com pegadores e o colchonete, que já existiam; nova, a **porta fechada com a âncora de porta embaixo** (`pecas-de-cena/porta-com-ancora.ts`, medidas em `dados/objetos/porta.json`: folha de porta de 210 × 80 × 3,5 cm, Vert; espuma da âncora de 5 × 4 × 1 pol, Stroops; o vão sob a porta e o comprimento da alça são provisórios). A ficha aceita "o pé de um móvel pesado ou uma porta fechada com a âncora de porta embaixo"; escolhi a porta porque tem medida de fabricante e norma de mercado (o móvel não tem). A animação de hoje usava um poste baixo, sem medida.
- Folha ao lado da de hoje: `../prototipos/folha-flexao-joelho-elastico.png`. Quadros grandes: `../quadros/flexao-joelho-elastico.png`.

## Como a pose é montada

Deitado de bruços, a cabeça para +z, os pés para −z, a porta atrás dos pés. Uma vez por corpo: a bacia inclina até a frente da bacia e a barriga ficarem na mesma altura e o corpo desce até encostar no colchonete (a barriga do Boneco é mais alta que o peito e a bacia: ela amassa 1,5 cm, o mesmo que a conferência aceita no chão); o pescoço dobra até a testa chegar ao dorso das mãos, espalmadas no chão sob a testa, com os cotovelos para fora; a coxa, reta, encosta no colchonete. No ciclo, só a canela gira em torno do joelho. A porta é posta onde o tubo estica 1,2 vez com as pernas quase estendidas. Contatos presos: `pelve`, `joelho.R`, `joelho.L`, `mao.R`, `mao.L`.

## O que a fonte pede × o que o boneco faz (medido) × confere?

| O que a ficha da técnica pede | Selo | O que o boneco faz (medido) | Confere? |
|---|---|---|---|
| Deitado de bruços num colchonete, quadril encostado | consenso | a frente da bacia fica a 0 cm do tampo do colchonete; a barriga, 1,5 cm para dentro dele (amassa); a bacia e os joelhos não saem do lugar (0 cm) | sim |
| Testa apoiada nos braços dobrados | consenso | a testa encosta no dorso das mãos (0 cm); cotovelos dobrados 114°, para fora; as mãos não saem do lugar | sim, com as mãos espalmadas no lugar dos antebraços cruzados (ver "O que não ficou bom") |
| O meio do elástico preso num ponto firme e baixo, perto do chão | consenso | o tubo dá a volta na alça da âncora, a 1,5 cm do chão, 159 cm atrás do quadril; a espuma da âncora fica do lado de lá da porta | sim |
| As pontas (pegadores) em volta dos dois tornozelos, por trás, logo acima do calcanhar | consenso | o centro do pegador fica 5,1 cm atrás do centro do tornozelo e 4 cm acima dele, ao longo da canela, no ciclo inteiro | sim |
| Afastado até o elástico ficar um pouco esticado com as pernas estendidas | consenso | 1,2 vez o comprimento em repouso (146 cm de 122) com o joelho a 12° | sim (o 1,2 é escolha de desenho) |
| Flexão em ~1 s, trazendo os calcanhares ao glúteo, quadril no chão | consenso | 1,1 s; o joelho vai de 12° a 115°; o tornozelo sobe de 9 a 48 cm e vem de 83 a 29 cm atrás do quadril | sim |
| Fim: joelhos bem dobrados, pausa curta | consenso | 115° de joelho; 0,5 s parado | sim (o 115° é escolha de desenho) |
| Volta de ~2–3 s, até quase estender | consenso | 2,4 s, até 12° | sim |
| O elástico estica mais com os joelhos dobrados | consenso (física) | de 1,2 vez (146 cm) com as pernas estendidas a 2,2 vezes (262 cm) no fim; o tubo afina ao esticar; não passa das 3 vezes do fabricante | sim |

Conferência automática: **0 falha, 3 avisos**. Amplitudes: joelho 115°; cotovelo 114°; elevação do braço 129°; flexão plantar do tornozelo 55° (o pé solto, esticado, para a ponta não bater no chão: fica a 3,5 cm dele); ponto mais baixo do corpo −0,1 cm. Os avisos:

1. **Cabos**: a conferência comum espera o elástico mais esticado "em cima" (u = 0), como no agachamento com elástico. Aqui a ficha diz o contrário (mais esticado com os joelhos dobrados, no fim): o aviso é esperado, e a regra `elastico-estica-mais-no-fim` mede o que esta ficha pede (ok).
2. Provisórios: `joelho.fim` (115°), `tornozelo.flexaoPlantar` (55°), `testa.altura`, `maos.meiaDistancia`, `colchonete.z`, `ancora.altura`.
3. Músculos: de lado, o principal (posteriores) aparece pouco (67 cm²); a vista padrão do modo Músculos é **de cima** (645 cm²), onde a parte de trás das coxas fica virada para quem olha.

O item "Ritmo" sai "ok, sem movimento": a conferência acompanha quadril, cabeça, mãos, cotovelo e joelho, e todos ficam parados neste exercício (só a canela e o pé se mexem). O ritmo da canela não foi medido pela conferência comum; o perfil de velocidade é o mesmo `suave` das fases.

## Erros

| Erro (texto do app) | O que o boneco faz (medido) |
|---|---|
| Quadril sobe do chão | o centro da bacia sobe 12 cm (de 14,2 a 26,2 cm; a frente da bacia sai do colchonete e fica a 8,6 cm do chão) e o quadril dobra 49°; a lombar dobra 35° ao contrário para o peito ficar no colchonete; os joelhos não saem do lugar |
| Dar tranco | o quadro parado é o meio da subida: o calcanhar já está em 7/8 do caminho (no certo, na metade) |
| Puxar pouco ou não estender na volta | o joelho vai só de 38° a 69° (12° a 115° no certo) |

## Correções já feitas que esta animação respeita (`correcoes-ja-feitas.md`)

- 05/11: "pose nova de bruços; faixa com poste baixo atrás dos pés e laço nos tornozelos; erro novo `tranco`". Respeitada a pose de bruços, os laços (aqui os pegadores do tubo) nos tornozelos e o erro `tranco`. O poste baixo, que era escolha de desenho do R4 e não tem medida, virou a porta com a âncora, uma das montagens que a ficha da técnica pede.

## Músculos e vistas

O realçado bate com o conteúdo (principal: posteriores da coxa; sem secundário). Os posteriores existem no desenho (`dados/musculos.json`). A vista de lado fica para a Técnica e os erros; a de cima, para os Músculos e para mostrar as duas pontas do tubo nos dois tornozelos.

## O que não ficou bom

- **De lado, o corpo fica pequeno no quadro**: a porta fica 159 cm atrás do quadril, porque o tubo da tabela tem 122 cm em repouso e precisa ficar só um pouco esticado com as pernas estendidas. A porta é cenário (fora do enquadramento), mas a âncora e o tubo entram. Na animação de hoje o poste ficava a 130 cm, com uma faixa de 50 cm sem medida.
- O tronco não fica reto: o peito fica um pouco acima do colchonete e os ombros a 27 cm do chão, porque os braços estão à frente da cabeça e a barriga do Boneco é mais alta que o peito. A barriga entra 1,5 cm no colchonete.
- A ficha diz "testa apoiada nos braços dobrados"; aqui a testa apoia no dorso das mãos espalmadas, lado a lado. Cruzar os antebraços deixaria o corpo assimétrico (a conferência de simetria falharia).
- A canela não é acompanhada pela conferência de ritmo (ver acima).
- O pegador é desenhado como a pegada rígida do cartão, atravessada atrás do tornozelo: na vida real o pé passa pela alça do pegador.
- O vão sob a porta (1 cm) e a alça da âncora (6 cm) são provisórios; a porta é desenhada lisa, sem batente nem maçaneta.
- O colchonete da tabela tem 100 cm (provisório): cobre do peito aos joelhos; as mãos e a cabeça ficam no chão à frente dele.
