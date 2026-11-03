import type { PerguntaId } from "../../domain/triagem";

// Ícones da triagem (design v3, visual.md §2.4): traço de 2 px, 24×24, sempre ao lado do texto, nunca no lugar dele.
const D: Record<PerguntaId, string> = {
  coracao:
    "M12 20s-8-4.6-8-10.5A4.5 4.5 0 0 1 12 7a4.5 4.5 0 0 1 8 2.5C20 15.4 12 20 12 20zM7 12h2.5l1.5-2.5 2 5 1.5-2.5H17",
  peito:
    "M9.5 4.5a2.5 2.5 0 1 0 5 0a2.5 2.5 0 1 0-5 0M4 21v-8a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v8M13 11.5l-2.5 3.5h3L11 18.5",
  tontura:
    "M12 12a1.5 1.5 0 0 1 3 0a3 3 0 0 1-6 0a4.5 4.5 0 0 1 9 0a6 6 0 0 1-12 0a7.5 7.5 0 0 1 15 0",
  "doenca-cronica": "M9 3h6v3H9zM8 4.5H6v16h12v-16h-2M12 10v6M9 13h6",
  medicamento: "M10.5 20.5a5 5 0 0 1-7-7l6-6a5 5 0 0 1 7 7zM8.5 8.5l7 7",
  supervisao:
    "M5 8a3 3 0 1 0 6 0a3 3 0 1 0-6 0M13.5 8a3 3 0 1 0 6 0a3 3 0 1 0-6 0M2.5 20a5.5 5.5 0 0 1 11 0M12 15.5a5.5 5.5 0 0 1 9.5 4.5",
  osteoarticular:
    "M8 10.5h8a2.3 2.3 0 1 1 2.6 1.5 2.3 2.3 0 1 1-2.6 1.5H8a2.3 2.3 0 1 1-2.6-1.5A2.3 2.3 0 1 1 8 10.5z",
  gravidez:
    "M13 3a8 8 0 0 1 8 8h-8zM3 11h18a6 6 0 0 1-6 6H9a6 6 0 0 1-6-6zM3 11 1.5 7M6.5 20a1.5 1.5 0 1 0 3 0a1.5 1.5 0 1 0-3 0M14.5 20a1.5 1.5 0 1 0 3 0a1.5 1.5 0 1 0-3 0",
  "doenca-aguda": "M14 14.5V5a2 2 0 0 0-4 0v9.5a4 4 0 1 0 4 0zM12 9v8",
};

export function IconeSaude({ id }: { id: PerguntaId }) {
  return (
    <svg className="ic" viewBox="0 0 24 24" aria-hidden="true">
      <path d={D[id]} />
    </svg>
  );
}
