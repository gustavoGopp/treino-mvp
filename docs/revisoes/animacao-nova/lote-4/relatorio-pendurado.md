# Relatório: família do corpo pendurado (barra fixa, barra supinada, elevação de joelhos na barra e nas paralelas)

De 15/11/2026. Ramo `worktree-agent-a2a443ef06c7b3e26` (a partir de `092afe6`). Os quatro exercícios foram feitos, na ordem pedida, um commit por exercício: `a740ba3` (barra fixa), `47cec6b` (barra supinada), `bf3cd2f` (elevação de joelhos na barra) e o último, com as paralelas e este relatório. Sem push, merge ou pull request.

**Núcleo comum** (`exercicios/pendurado.ts`): as mãos presas na barra (o centro da pegada no eixo dela, a mão fechada no diâmetro), e a posição do corpo sai de duas condições: o braço alcança a barra com a dobra de cotovelo pedida, e o centro de massa fica na vertical das mãos (corpo parado). Em cima dele, `barra-fixa-base.ts` (as duas pegadas) e `pendurado-joelhos.ts` (as duas elevações de joelhos). Regras em `regras/pendurado.ts` (ids `pendurado-*` e `barra-fixa-*`). As mãos não entram em `contatos` (lá, `mao.X` mede o punho, que gira em volta da barra): a regra `pendurado-maos-na-barra` mede a pegada parada. Com contatos que não são pés, a conferência do equilíbrio não roda; o equilíbrio pendurado é medido por `pendurado-sem-balanco`.

## Barra fixa, pegada pronada (`barra-fixa`, `lote-4/barra-fixa.md`)

- **Conferência automática:** 0 falha, 4 avisos: ritmo de 15,5% (o ok vai até 15%; é o cotovelo saindo do quase estendido); linhas de escolha de desenho; trapézio médio e inferior como secundário dentro de "costas" e o antebraço como "só ajuda"; a vista de lado não serve ao modo Músculos (a padrão é a de trás, 532 cm²).
- **Pegada (correção antiga):** medi 61,2 cm de centro a centro das mãos = 1,5 × 40,8 cm (largura entre os acrômios). A animação de hoje usava 68 cm (1,8×); segui a pesquisa (1 a 1,5×) e o "cerca de 1,5×" do app.
- **O que não ficou bom depois de tentar:** de lado, no topo, o braço de perto cobre parte do rosto e a cabeça, inclinada para trás para passar da barra, parece grande (quadro `quadros/barra-fixa.png`, `lateral:tec:f1`); o corpo ocupa cerca de 75% da altura do quadro (o boneco pendurado tem 230 cm do pé à mão e sobe 54 cm).
- **Risco de o dono não gostar: médio.** A estação de barra é peça nova (o cartão de hoje é uma barra de batente, baixa demais para pender), a pegada mudou de 1,8× para 1,5× e, de lado, a estrutura não aparece (como a coluna de polia que é cenário).

## Barra fixa, pegada supinada (`barra-fixa-supinada`, `lote-4/barra-fixa-supinada.md`)

- **Conferência automática:** 0 falha, 5 avisos: elevação do braço até 171,2° (média 170°); supinação do antebraço até 93,8° (média 87,5°, máximo 131°: a palma virada para você na barra pede supinação completa; com o cotovelo para fora, como hoje, passava de 109°); linhas de desenho; trapézio como secundário; vista de lado sem o principal. Ritmo 14,3% (ok).
- **Medidas:** mãos a 40,8 cm (1× os ombros; hoje 42 cm); no topo, o cotovelo 21,8 cm abaixo do ombro e 22,4 cm à frente da coluna, rente às costelas.
- **O que mudou por defeito visível:** o erro "meia repetição" foi para a vista de lado (de trás, o braço dobrado para a frente parecia reto).
- **O que não ficou bom:** o mesmo da pronada (de lado, no topo, o braço de perto cobre parte do rosto); de lado, no erro da meia repetição, o braço dobrado tapa a cabeça.
- **Risco: médio**, pelos mesmos motivos da pronada, mais a supinação perto do fim da amplitude.

## Elevação de joelhos na barra fixa (`elevacao-joelhos`, `lote-7/elevacao-joelhos.md`)

- **Conferência automática:** 0 falha, 4 avisos: elevação do braço 170,6° (média 170°); ritmo de 15,9% no quadril (a bacia vai para trás e depois para cima quando a pelve enrola, no meio da subida; tentei o começo do enrolar entre 35% e 45% e o fim do joelho entre 60% e 90%: fica entre 15,9% e 18%); linhas de desenho; antebraço como "só ajuda".
- **Medidas:** pegada 1,2× os ombros (49 cm; hoje 60 cm); braços a 6°; ombros ativos (clavícula parada, 18,7 cm do alto do ombro à base do crânio); a pelve enrola 25° (a bacia gira 25° para trás e a lombar dobra 25°); no topo, o joelho 14,8 cm acima do quadril; centro de massa a 0 cm da vertical das mãos. Para ficar parado, o corpo vai para trás quando as pernas sobem (o ombro anda 17,5 cm em z, com os braços inclinados).
- **O que não ficou bom:** de lado, o braço de perto cobre parte da cabeça pendurado; ritmo de 15,9% (aviso).
- **Risco: médio.** O recuo do corpo para o prumo (físico, mas diferente da animação de hoje, em que o corpo só sobe) e a pegada mais fechada que a de hoje.

## Elevação de joelhos nas paralelas (`elevacao-joelhos-paralelas`, `lote-7/elevacao-joelhos-paralelas.md`)

- **Apoio:** braços retos, como abre o cartão ("Sustente o corpo nas paralelas com os braços retos"); o apoio nos antebraços fica no texto.
- **Conferência automática:** 0 falha, 2 avisos: ritmo de 16,2% no quadril (o mesmo da barra); linhas de desenho. Vista padrão dos músculos: de frente (236 cm²).
- **Medidas:** barras a 132,4 cm, 50,8 cm de centro a centro; cotovelo a 6°; ombros longe das orelhas (21,3 cm do alto do ombro à base do crânio; em pé, 18,7); pés a 50,4 cm do chão; os mesmos números da pelve e dos joelhos da barra. Erro "afundar nos ombros": a clavícula vai de 1° a 25° e o corpo afunda 6,2 cm.
- **O que não ficou bom:** de lado, a barra de perto passa na frente do corpo, na altura do quadril (é a geometria real); a altura da barra é derivada.
- **Risco: médio.** As paralelas ficaram bem mais altas que as de hoje (132 × 105 cm), pela medida do fabricante; os pés ficam a meio metro do chão.

## Arquivos comuns que mexi

Só os três registros, uma linha cada (aditivo): `exercicios/registro.ts` (os quatro exercícios), `regras/registro.ts` (`regrasDoPendurado`) e `dados/objetos/registro.ts` (`barraFixa`, `paralelas`). Não mexi em `pecas.ts`, `equipamento.ts`, `conferir.ts` nem em outros arquivos comuns. `npm run conferir:animacao` roda sem falha em todas as animações; os arquivos gerais regenerados foram desfeitos antes dos commits.

As peças de cena novas são `PecaPropria` (`pecas-de-cena/barra-fixa.ts`, `pecas-de-cena/paralelas.ts`), cada uma dividida em duas: o equipamento (que entra no enquadramento) e a estrutura (`cenario: true`). A estrutura da barra não aparece de perfil (ela mesma confere a câmera, como a coluna de polia que é cenário).

## Medidas provisórias

- **Objetos:** a altura das paralelas (132,4 cm) é derivada da altura total da estação (a página não dá a da barra); o comprimento de cada barra das paralelas (60 cm), a distância da barra fixa à frente dos montantes (32 cm) e o trecho emborrachado debaixo da mão (18 cm) são de desenho; o diâmetro da barra fixa (3,2 cm) vem de outro produto (Rogue) e o tubo da torre (5,1 × 7 cm), de outro modelo de torre (Titan), porque a página da torre de referência (ProsourceFit) não os traz. As fontes estão em `dados/objetos/barra-fixa.json` e `paralelas.json`, com o trecho lido.
- **Fichas de movimento:** as linhas de escolha de desenho que a conferência lista (escápula, inclinação do tronco no topo, tempos dentro da subida, para onde aponta o cotovelo, ângulos do topo da elevação de joelhos, pelve enrolada 25°, ponta do pé).

## Ramo e commits

Ramo `worktree-agent-a2a443ef06c7b3e26`: `a740ba3` (barra fixa), `47cec6b` (barra supinada), `bf3cd2f` (elevação de joelhos na barra) e o commit das paralelas com este relatório (o hash está na resposta).
