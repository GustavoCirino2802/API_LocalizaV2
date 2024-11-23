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

    const [message, setMessage] = useState<{type: 'success' | 'error', text: string} | null>(null);

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
            setMessage({ type: 'success', text: 'Veículo cadastrado com sucesso!' });
            setVeiculo({
                placa: '',
                modelo: '',
                marca: '',
                ano: '',
                disponivel: 'SIM'
            });
        } catch (error) {
            setMessage({ type: 'error', text: 'Erro ao cadastrar veículo' });
            console.error('Erro:', error);
        }
    };

    return (
        <div className="form-container">
            <h2 className="form-title">Cadastro de Veículo</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label className="form-label">Placa:</label>
                    <input
                        type="text"
                        className="form-input"
                        name="placa"
                        value={veiculo.placa}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label className="form-label">Modelo:</label>
                    <input
                        type="text"
                        className="form-input"
                        name="modelo"
                        value={veiculo.modelo}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label className="form-label">Marca:</label>
                    <input
                        type="text"
                        className="form-input"
                        name="marca"
                        value={veiculo.marca}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label className="form-label">Ano:</label>
                    <input
                        type="text"
                        className="form-input"
                        name="ano"
                        value={veiculo.ano}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="button-container">
                    <button type="submit" className="submit-button">Cadastrar Veículo</button>
                </div>
                {message && (
                    <div className={`form-message ${message.type}`}>
                        {message.text}
                    </div>
                )}
            </form>
        </div>
    );
};

export default CadastrarVeiculo;