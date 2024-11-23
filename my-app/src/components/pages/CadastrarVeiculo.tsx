import React, { useState } from 'react';
import axios from 'axios';
import { Veiculo } from '../../Models/Veiculo';

const CadastrarVeiculo: React.FC = () => {
    const [veiculo, setVeiculo] = useState<Veiculo>({
        placa: '',
        modelo: '',
        marca: '',
        ano: '',
        disponivel: 'SIM'
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setVeiculo(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5272/api/veiculo/cadastrar', veiculo);
            console.log('Veículo cadastrado:', veiculo);
            console.log('Resposta do servidor:', response.data);
            alert('Veículo cadastrado com sucesso!');
            // Limpar o formulário
            setVeiculo({
                placa: '',
                modelo: '',
                marca: '',
                ano: '',
                disponivel: 'SIM'
            });
        } catch (error) {
            alert('Erro ao cadastrar veículo');
            console.error('Erro:', error);
        }
    };

    return (
        <div className="container mt-4">
            <h2>Cadastro de Veículo</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Placa:</label>
                    <input
                        type="text"
                        className="form-control"
                        name="placa"
                        value={veiculo.placa}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Modelo:</label>
                    <input
                        type="text"
                        className="form-control"
                        name="modelo"
                        value={veiculo.modelo}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Marca:</label>
                    <input
                        type="text"
                        className="form-control"
                        name="marca"
                        value={veiculo.marca}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Ano:</label>
                    <input
                        type="text"
                        className="form-control"
                        name="ano"
                        value={veiculo.ano}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">Cadastrar</button>
            </form>
        </div>
    );
};

export default CadastrarVeiculo;