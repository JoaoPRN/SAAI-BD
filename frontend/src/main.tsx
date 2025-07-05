// frontend/src/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // Importa o componente App do arquivo App.tsx na mesma pasta
import './styles/global.css'; // Opcional: Se você tiver um arquivo CSS global, importe-o aqui

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App /> {/* Renderiza o componente App */}
  </React.StrictMode>,
);