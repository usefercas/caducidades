import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // Asegúrate de importar App correctamente
import { BrowserRouter } from 'react-router-dom'; // Importamos BrowserRouter
import 'bootstrap/dist/css/bootstrap.min.css'; // Importamos el archivo CSS de Bootstrap
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // Importamos el archivo JS de Bootstrap

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter> {/* Envolvemos toda la aplicación con BrowserRouter */}
    <App />
  </BrowserRouter>
);
