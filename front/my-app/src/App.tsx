import React from "react";
import VeiculoCadastrar from "./components/pages/VeiculoCadastrar";
import VeiculoListar from "./components/pages/VeiculoListar";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div id="app">
      <BrowserRouter>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/api/veiculo/listarTudo">Listar Veiculos</Link>
            </li>
            <li>
              <Link to="/api/veiculo/cadastrar">Cadastrar Veiculo</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<VeiculoListar />} />
          <Route path="/pages/produto/listar" element={<VeiculoListar />} />
          <Route
            path="/pages/produto/cadastrar"
            element={<VeiculoCadastrar />}
          />
          {/* Para páginas não encontradas */}
          {/* <Route path="*" element={<Componente da Página não encontrada />} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
