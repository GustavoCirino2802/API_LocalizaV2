import CadastrarVeiculo from './components/pages/CadastrarVeiculo';
import './App.css';
import CadastrarUsuario from './components/pages/CadastrarUsuario';
import ListarVeiculos from './components/pages/ListarVeiculos';

function App() {
    return (
       <div className='App'>
        <div className="container">
          <CadastrarUsuario />
          <CadastrarVeiculo />
          <ListarVeiculos />
        </div>
       </div>
    );
}

export default App;