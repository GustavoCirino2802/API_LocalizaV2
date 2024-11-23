import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import CadastrarVeiculo from './components/pages/CadastrarVeiculo';
import CadastrarUsuario from './components/pages/CadastrarUsuario';
import ListarVeiculos from './components/pages/ListarVeiculos';
import './App.css';

function App() {
    return (
        <BrowserRouter>
            <div className='App'>
                <div className="container">
                    <nav className="nav">
                        <ul className="nav-list">
                            <li><Link to="/" className="nav-link">HOME</Link></li>
                            <li className="dropdown">
                                <span className="nav-link">Cadastro</span>
                                <ul className="dropdown-menu">
                                    <li><Link to="/cadastro-usuario" className="nav-link">Cadastro Usuário</Link></li>
                                    <li><Link to="/cadastro-veiculo" className="nav-link">Cadastro Veículo</Link></li>
                                </ul>
                            </li>
                            <li><Link to="/veiculos" className="nav-link">Listar Veículos</Link></li>
                        </ul>
                    </nav>

                    <Routes>
                        <Route path="/" element={
                            <div className="home-container">
                                <h1>BEM VINDO AO LOCALIZAV2</h1>
                            </div>
                        } />
                        <Route path="/cadastro-usuario" element={<CadastrarUsuario />} />
                        <Route path="/cadastro-veiculo" element={<CadastrarVeiculo />} />
                        <Route path="/veiculos" element={<ListarVeiculos />} />
                    </Routes>
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;