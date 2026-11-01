# Decisões do M5: treinar com o app (01/11/2026)

O Gustavo pediu para seguir direto até o M4 e decidir por pesquisa, sem rodada de perguntas. Cada decisão abaixo cita a
regra de `regras.md` ou a fonte. O que veio só de resumo de busca está marcado.

## 1. Qual treino é hoje: o próximo da rotação
O app sugere o próximo dia da divisão (A → B → C → A…), não um dia fixo da semana. A pessoa pode escolher outro.
O que importa para a hipertrofia é o volume semanal e treinar cada músculo cerca de 2 vezes por semana, não o dia
exato (`frequencia.musculo`, `volume.semanal.alvo`). Um dia fixo faria quem perdeu a segunda-feira "perder" o treino A.

## 2. Em que semana do programa a pessoa está
Contada em semanas corridas desde a primeira sessão registrada. As fases (readaptação e aprendizado) usam isso:
`prescricaoDaSemana` já aplica o fator de séries e o RIR de cada semana (`readaptacao.semana1` a `semana3`,
`iniciante.fase-aprendizado`).

## 3. Registro de cada série: carga, repetições e RIR, confirmados com um toque
- Os campos vêm com a última série registrada daquele exercício (ou a série anterior da mesma sessão). É o histórico da
  própria pessoa, não uma recomendação; nada é salvo até ela tocar em "Série feita".
- Repetições com − e +; RIR em 5 botões (0, 1, 2, 3, 4 ou mais). Unilateral: repetições de cada lado.
- **Carga conforme o equipamento** (`progressao.incremento.*`): halter, só as cargas que o inventário permite
  (`cargasHalter`); polia, o número da placa (não kg); peso do corpo e elástico, o degrau da escada de dificuldade;
  barra e máquina, kg de 2,5 em 2,5.

## 4. Como explicar o RIR
"Quantas repetições você ainda conseguiria fazer com boa técnica." A escala de RIR foi proposta por Zourdos et al. (2016)
e detalhada por Helms et al. (2016). As pessoas costumam subestimar o RIR em cerca de 1 repetição (`rir.leitura`;
revisão de escopo de Halperin et al., resumo de busca). O app mostra essa dica, mas não corrige o número sozinho.

## 5. Primeira sessão de cada exercício: sem carga sugerida
O app ainda não sabe a força da pessoa. A orientação é escolher uma carga que permita ficar dentro da faixa de
repetições no RIR do programa; a partir da 2ª sessão, a progressão sugere. **Peso inicial sugerido** fica para o
replanejamento depois do M4 (`backlog.md`).

## 6. Dor e sinais de alerta durante o treino
Um botão "Senti algo" em cada exercício (a pergunta de dor é opcional, `seguranca.dor.escala`):
- **Peito, falta de ar desproporcional, tontura, batimento irregular:** encerra a sessão e orienta o SAMU 192 se o
  sintoma não passar (`seguranca.alerta.cardiovascular`).
- **Dor articular aguda, formigamento, perda de força incomum:** encerra o exercício e oferece a alternativa
  (`seguranca.alerta.musculoesqueletico`).
- **Nota de dor 0–10:** 3–5 ajusta (reduzir carga, amplitude ou velocidade); acima de 5 encerra o exercício.
O app nunca diagnostica (`seguranca.sem-diagnostico`).

## 7. Trocar pela alternativa durante o treino
Se o equipamento estiver ocupado ou houver dor, a pessoa troca pela alternativa só naquela sessão. O histórico guarda o
exercício que de fato foi feito, para a progressão não misturar exercícios diferentes.

## 8. Temporizador de descanso
Portado do guia original: bipes, vibração, ±15 s e pedido de tela ligada. Conta pelo **horário de término**, não por
"tique" a cada segundo, para continuar certo se o celular bloquear a tela. A tela ligada (Screen Wake Lock) é
"melhor esforço": o Safari tem a API desde a versão 16.4, e no app instalado na tela inicial do iPhone ela só passou a
funcionar a partir do iOS 18.4, segundo um guia secundário (não verificado na nota da Apple). Por isso o app também
avisa para deixar a tela ligada.

## 9. Fim do treino: resumo e sugestão para a próxima vez
Ao terminar, cada exercício mostra a sugestão de `sugerirProgressao` (subir, manter, reduzir, voltar, estagnado), com o
motivo e a regra. Na próxima sessão daquele exercício, a sugestão aparece no topo ("Hoje: tente 12 kg").
Semana leve nunca é automática (`deload.semana-leve`).

## 10. Aquecimento
Antes do primeiro multiarticular de cada região, um lembrete: 1–2 séries leves (`tempo.aquecimento`). Não é registrado.

## 11. Dados
O histórico de sessões entra no estado salvo no aparelho (esquema versão 2, com migração da versão 1 testada) e no
arquivo de exportação.

## Fontes
- Zourdos MC et al. (2016). Novel resistance training-specific rating of perceived exertion scale measuring repetitions
  in reserve. J Strength Cond Res 30(1):267–275. [repositório AUT](https://openrepository.aut.ac.nz/items/efef3b25-6701-4fb5-bb82-55fcd2a26027/full) (resumo de busca).
- Helms ER, Cronin J, Storey A, Zourdos MC (2016). Application of the repetitions in reserve-based rating of perceived
  exertion scale for resistance training. Strength Cond J 38(4):42–49 (resumo de busca, não verificado).
- Halperin I et al. Accuracy in predicting repetitions to task failure in resistance exercise: a scoping review
  (resumo de busca; já citado em `regras.md` como base de `rir.leitura`).
- [Chrome Developers – Screen Wake Lock API](https://developer.chrome.com/docs/capabilities/web-apis/wake-lock);
  [WebKit bug 254545](https://bugs.webkit.org/show_bug.cgi?id=254545); [Progressier – Wake Lock em PWAs](https://progressier.com/pwa-capabilities/screen-wake-lock) (secundário).
