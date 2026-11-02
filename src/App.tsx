import { lazy, Suspense } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { EstadoProvider } from './features/app/estado';
import { Evolucao } from './features/acompanhamento/Evolucao';
import { Semana } from './features/acompanhamento/Semana';
import { Dados } from './features/dados/Dados';
import { Guia } from './features/guia/Guia';
import { BoasVindas } from './features/onboarding/BoasVindas';
import { Inventario } from './features/onboarding/Inventario';
import { EditarLocal, Locais } from './features/locais/Locais';
import { Nivel } from './features/onboarding/Nivel';
import { Restricoes } from './features/onboarding/Restricoes';
import { Rotina } from './features/onboarding/Rotina';
import { Triagem } from './features/onboarding/Triagem';
import { Programa } from './features/programa/Programa';
import { Resumo } from './features/treino/Resumo';
import { Treino } from './features/treino/Treino';

// Só em desenvolvimento: fora do bundle de produção.
const GeradorDev = import.meta.env.DEV ? lazy(() => import('./features/dev/GeradorDev').then((m) => ({ default: m.GeradorDev }))) : null;
// Laboratório do boneco (R4): em desenvolvimento e nas prévias da Vercel; fora do bundle de produção.
const LabBoneco = __LAB__ ? lazy(() => import('./features/dev/LabBoneco').then((m) => ({ default: m.LabBoneco }))) : null;

export function App() {
  return (
    <EstadoProvider>
      <BrowserRouter>
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
          <Route path="/guia" element={<Navigate to="/guia/supino-inclinado" replace />} />
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
      </BrowserRouter>
    </EstadoProvider>
  );
}
