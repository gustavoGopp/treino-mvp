import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';
import './styles.css';
// o desenho do motor novo (animação nova): cores e traços do corpo e das cenas
import './engine/novo/estilo.css';
import './engine/novo/boneco.gerado.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
