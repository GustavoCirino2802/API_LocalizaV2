import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import CadastrarVeiculo from './components/pages/CadastrarVeiculo';
import CadastrarUsuario from './components/pages/CadastrarUsuario';
import ListarVeiculos from './components/pages/ListarVeiculos';
import RealizarReserva from './components/pages/RealizarReserva';
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
                                <span className="nav-link">CADASTRO</span>
                                <ul className="dropdown-menu">
                                    <li><Link to="/api/usuario/cadastrar" className="nav-link">Cadastro Usuário</Link></li>
                                    <li><Link to="/api/veiculo/cadastrar" className="nav-link">Cadastro Veículo</Link></li>
                                </ul>
                            </li>
                            <li className="dropdown">
                                <span className="nav-link">RESERVAS</span>
                                <ul className="dropdown-menu">
                                    <li><Link to="/api/reserva/cadastrar" className="nav-link">Realizar Reserva</Link></li>
                                    <li><Link to="/api/veiculo/listarDisponiveis" className="nav-link">Veículos Disponíveis</Link></li>
                                </ul>
                            </li>
                        </ul>
                    </nav>

                    <Routes>
                        <Route path="/" element={
                            <div className="home-container">
                                <h1>BEM VINDO A LOCALIZAV2</h1>
                                <div className="home-content">
                                    <p>Sistema de Locação de Veículos</p>
                                    <p>Equipe: Bruno Somera, Giselle Marry, Bruno Alexandre, Gustavo Cirino</p>
                                </div>
                            </div>
                        } />
                        <Route path="/api/usuario/cadastrar" element={<CadastrarUsuario />} />
                        <Route path="/api/veiculo/cadastrar" element={<CadastrarVeiculo />} />
                        <Route path="/api/veiculo/listarDisponiveis" element={<ListarVeiculos />} />
                        <Route path="/api/reserva/cadastrar" element={<RealizarReserva />} />
                    </Routes>
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;