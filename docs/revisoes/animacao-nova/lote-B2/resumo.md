# Lote B2 · Smith: resumo (a peça do smith, agachamento no smith, supino reto no smith)

De 18/11/2026. A peça nova do smith e as duas primeiras animações dos exercícios no smith (antes, só cartão de texto). Nenhuma está aprovada nem ligada às telas: quem integra registra em `aprovados.ts` e no catálogo do guia.

## A peça: o smith

`src/engine/novo/pecas-de-cena/smith.ts`, medidas em `src/engine/novo/dados/objetos/smith.json`, folha em `docs/revisoes/animacoes-restantes/pecas/folha-smith.png` (o cartão de hoje ao lado, no tamanho do cartão e ampliado, e o cartão do suporte de agachamento).

**Medidas com fonte (página pública do fabricante, lida em 18/11/2026):** Life Fitness Smith Machine SSM, no distribuidor oficial da Life Fitness na Austrália (`lifefitness.com.au/commercial/smith-machine-ssm`): 221 × 125 × 237 cm (as mesmas 87 × 49 × 93 pol do catálogo de 2026), **guia a 7°** ("7-degree bar angle follows the natural free weight path of movement for pressing or squatting"), 16 cm entre os ganchos ("Vertical Height Between Bar Supports: 6\" (16 cm)"), barra de 9 kg com contrapeso, 8 pinos de anilha, "fully enclosed linear bearings with unsupported guide rods". A Hammer Strength HSSMV (vertical, 0°, 11 posições de gancho, 127 × 229 × 234 cm) foi lida no mesmo distribuidor (`lifefitness.com.au/commercial/vertical-smith-machine-hssmv`) e fica como comparação. O ângulo de 7°, antes só de resumo de busca, agora está lido na página do fabricante.

**De desenho (sem ficha):** a distância entre as guias (122 cm), o diâmetro da guia, o carro do rolamento, a régua dos pinos e o gancho, a trava (o batente que corre na guia), os montantes, o comprimento dos pinos de anilha, a pegada de 2,8 cm (a da barra olímpica) e a manga de 5 cm (a da barra olímpica, para as anilhas da tabela). Para que lado a guia inclina em relação a quem treina, a ficha não diz: o alto da guia vai para a cabeça no supino e, no agachamento, para a frente de quem agacha (a barra desce um pouco para trás).

**A máquina funciona:** a barra só anda na guia (o centro dela fica na linha da guia, a 7°, em qualquer altura); os carros correm com a barra; o gancho gira com a barra e prende num pino da régua; a trava fica parada na guia e o carro para nela. A frente do alto fica aberta (só a travessa do fundo), e de cima a travessa não é desenhada (cobriria o corpo).

**Smith × suporte de agachamento a 96 px:** melhorou, mas **ainda se parecem**: os dois são uma gaiola alta de grafite com uma barra e duas anilhas. O que separa agora: as duas guias cromadas inclinadas com a régua de pinos ao lado, a barra presa nelas pelos carros (no suporte, a barra fica solta nos ganchos em J), os pinos de anilha para fora e a falta das barras de segurança horizontais do suporte. Ampliado, não se confundem; no tamanho do cartão, quem conhece reconhece pelas guias, quem não conhece talvez não. O cartão do app (`public/equipamento/smith.svg`) não foi mexido.

## As animações

| | Agachamento no smith (`agachamento-smith`) | Supino reto no smith (`supino-smith`) |
|---|---|---|
| Conferência automática | 0 falha, 3 avisos (a dorsiflexão do tornozelo a 29,4°, acima da média e dentro do máximo; linhas de desenho; de frente o quadríceps quase não aparece) | 0 falha, 2 avisos (linhas de desenho; de lado o peito quase não aparece, como no supino com halteres aprovado) |
| Vistas | de lado e de frente | de lado e de cima (o modo Músculos abre de cima) |
| Base | `agachar.ts` (o arco do quadril em volta do tornozelo) e os agachamentos aprovados | o corpo deitado do `supino-reto.ts` aprovado |
| Erros desenhados | descer pouco; pés embaixo da barra | banco fora do lugar; cotovelos em T |
| Erros não desenhados | "Esquecer a trava": sem consequência visível na pose | "Quicar a barra": é ritmo; parado, a barra que quica e a que encosta ficam no mesmo lugar |
| Conferência escrita | `agachamento-smith.md` | `supino-smith.md` |
| Quadros grandes | `../quadros/agachamento-smith.png` | `../quadros/supino-smith.png` |
| Risco de o Gustavo não gostar | médio | médio a alto |

## Mudanças em arquivos comuns

Nenhuma no núcleo, nas peças comuns nem nos exercícios aprovados. Só o que é novo, mais uma linha em cada registro:

- Peça e objeto novos: `pecas-de-cena/smith.ts`, `dados/objetos/smith.json` (linha em `dados/objetos/registro.ts`).
- Regras novas: `regras/smith.ts` (`barra-so-anda-na-guia`, `barra-no-alto-das-costas`, `pes-a-frente-da-barra`, `travas-logo-abaixo-do-fundo`, `barra-no-meio-do-peito`, `antebracos-quase-verticais-embaixo`, `pegada-ate-1-5-ombro`, `cotovelos-sem-travar-em-cima`), linha em `regras/registro.ts`.
- `scripts/animacao-nova/folha-pecas.mjs`: a folha do smith (`node scripts/animacao-nova/folha-pecas.mjs smith`), sem mudar as outras duas.
- O `dados/preparo/registro.ts` é o gerado pelo `preparo.mjs`; ele só gravou os dois arquivos novos (`agachamento-smith.json`, `supino-smith.json`) e o registro.
- A peça lê o giro da câmera pelo `rot` que o gerador realista já devolve (sem tipo em `base.d.mts`; não mexi no arquivo de tipos).

## Pontos para quem integra

- `npm run check`: lint e tipos passam; falham só os dois testes esperados da ponte: "todas as animações estão aprovadas e no catálogo do guia" e o dos títulos dos erros, porque dois erros ficam fora. Para `SEM_DESENHO`: `'agachamento-smith': ['Esquecer a trava']` e `'supino-smith': ['Quicar a barra']`.
- `npm run conferir:animacao` sem falha nas 134 animações; o preparo confere.
- **O corte do lado de perto.** Nos dois exercícios, a guia, a régua, o carro e a anilha do lado direito da máquina (o de perto, de lado) são desenhados como cenário, atrás do corpo: sem isso, de lado a anilha de 45 cm cobria a cabeça (agachamento) e o peito e as mãos (supino). É uma escolha de ilustração que o Gustavo pode recusar.
- **O equilíbrio no agachamento.** Com os pés à frente da barra, quem agacha senta para trás encostado nela: o centro de massa fica atrás do meio do pé (até 8,3 cm), sobre o calcanhar (1,3 cm à frente da borda dele embaixo). A guia segura a barra para a frente e para trás, e é isso que o smith permite.
- **O que olhar primeiro:** o supino de lado (os rótulos ficam por cima da guia; ver a conferência escrita) e o antebraço a 18,5° da vertical embaixo.
