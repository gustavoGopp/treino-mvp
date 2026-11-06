import { lazy, Suspense } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { EstadoProvider } from "./features/app/estado";
import { BoasVindas } from "./features/onboarding/BoasVindas";
import { Programa } from "./features/programa/Programa";

// Lote técnico do redesign (06/11/2026): cada rota é um pedaço próprio do JavaScript, baixado quando a pessoa chega
// nela (e guardado pelo service worker para o uso sem rede). Ficam no pacote inicial só as 1ªs telas: a boas-vindas
// (pessoa nova) e o programa (quem volta). Antes, toda tela baixava e processava o app inteiro (1 MB).
const tela = <K extends string>(
  carregar: () => Promise<Record<K, React.ComponentType>>,
  nome: K,
) => lazy(() => carregar().then((m) => ({ default: m[nome] })));
const Triagem = tela(() => import("./features/onboarding/Triagem"), "Triagem");
const Nivel = tela(() => import("./features/onboarding/Nivel"), "Nivel");
const Rotina = tela(() => import("./features/onboarding/Rotina"), "Rotina");
const Inventario = tela(
  () => import("./features/onboarding/Inventario"),
  "Inventario",
);
const Restricoes = tela(
  () => import("./features/onboarding/Restricoes"),
  "Restricoes",
);
const Locais = tela(() => import("./features/locais/Locais"), "Locais");
const EditarLocal = tela(
  () => import("./features/locais/Locais"),
  "EditarLocal",
);
const Treino = tela(() => import("./features/treino/Treino"), "Treino");
const Resumo = tela(() => import("./features/treino/Resumo"), "Resumo");
const Semana = tela(() => import("./features/acompanhamento/Semana"), "Semana");
const Evolucao = tela(
  () => import("./features/acompanhamento/Evolucao"),
  "Evolucao",
);
const Dados = tela(() => import("./features/dados/Dados"), "Dados");
const Guia = tela(() => import("./features/guia/Guia"), "Guia");

// Enquanto o pedaço chega (em uso, do service worker, em milissegundos): só o fundo do app, sem spinner.
const Carregando = () => <div className="wrap app" aria-busy="true" />;

// Só em desenvolvimento: fora do bundle de produção.
const GeradorDev = import.meta.env.DEV
  ? lazy(() =>
      import("./features/dev/GeradorDev").then((m) => ({
        default: m.GeradorDev,
      })),
    )
  : null;
// Laboratório do boneco (R4): em desenvolvimento e nas prévias da Vercel; fora do bundle de produção.
const LabBoneco = __LAB__
  ? lazy(() =>
      import("./features/dev/LabBoneco").then((m) => ({
        default: m.LabBoneco,
      })),
    )
  : null;

export function App() {
  return (
    <EstadoProvider>
      <BrowserRouter>
        <Suspense fallback={<Carregando />}>
          <Routes>
            <Route path="/" element={<BoasVindas />} />
            <Route path="/comecar/triagem" element={<Triagem />} />
            <Route path="/comecar/nivel" element={<Nivel />} />
            <Route path="/comecar/rotina" element={<Rotina />} />
            <Route path="/comecar/inventario" element={<Inventario />} />
            <Route path="/comecar/restricoes" element={<Restricoes />} />
            <Route path="/programa" element={<Programa />} />
            <Route path="/locais" element={<Locais />} />
            <Route path="/locais/:id" element={<EditarLocal />} />
            <Route path="/treino" element={<Treino />} />
            <Route path="/treino/fim" element={<Resumo />} />
            <Route path="/semana" element={<Semana />} />
            <Route path="/evolucao/:exId" element={<Evolucao />} />
            <Route path="/dados" element={<Dados />} />
            <Route
              path="/guia"
              element={<Navigate to="/guia/supino-inclinado" replace />}
            />
            <Route path="/guia/:id" element={<Guia />} />
            {GeradorDev && (
              <Route
                path="/dev/gerador"
                element={
                  <Suspense fallback={null}>
                    <GeradorDev />
                  </Suspense>
                }
              />
            )}
            {LabBoneco && (
              <Route
                path="/lab/boneco"
                element={
                  <Suspense fallback={null}>
                    <LabBoneco />
                  </Suspense>
                }
              />
            )}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </EstadoProvider>
  );
}
