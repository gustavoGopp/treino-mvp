import type { ItemId } from '../../domain/taxonomia/equipamentos';

// Desenhos do equipamento (redesign, lote 5, 08/11/2026): ilustração realista de cada um dos 49 itens, só o aparelho,
// aprovada pelo Gustavo na 3ª rodada (docs/img/redesign-lote-5-desenhos-49-*.png). Cada item é um SVG próprio em
// public/equipamento/<id>.svg, gerado por scripts/desenhos-equipamento/todos.mjs; fica fora do pacote de
// JavaScript e é baixado só quando aparece. O nome do item continua sempre escrito ao lado (o desenho ajuda, não
// substitui). O jeito de usar fica no vídeo do guia.
export function IconeEquipamento({ id }: { id: ItemId }) {
  return <img className="icone-eq" src={`/equipamento/${id}.svg`} alt="" width={160} height={120} loading="lazy" decoding="async" />;
}
