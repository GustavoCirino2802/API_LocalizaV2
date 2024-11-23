import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Veiculo } from '../../Models/Veiculo';

const ListarVeiculos: React.FC = () => {
    const [veiculos, setVeiculos] = useState<Veiculo[]>([]);
    const [message, setMessage] = useState<{type: 'success' | 'error', text: string} | null>(null);

    useEffect(() => {
        const fetchVeiculos = async () => {
            try {
                const response = await axios.get('http://localhost:5272/api/veiculo/listarDisponiveis');
                setVeiculos(response.data);
            } catch (error) {
                console.error('Erro ao buscar veículos:', error);
                setMessage({ type: 'error', text: 'Erro ao carregar veículos disponíveis' });
            }
        };

        fetchVeiculos();
    }, []);

    return (
        <div className="table-container">
            <h2 className="form-title">Veículos Disponíveis</h2>
            {message && (
                <div className={`form-message ${message.type}`}>
                    {message.text}
                </div>
            )}
            {veiculos.length > 0 ? (
                <table className="custom-table">
                    <thead>
                        <tr>
                            <th>Placa</th>
                            <th>Modelo</th>
                            <th>Marca</th>
                            <th>Ano</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {veiculos.map((veiculo) => (
                            <tr key={veiculo.placa}>
                                <td>{veiculo.placa}</td>
                                <td>{veiculo.modelo}</td>
                                <td>{veiculo.marca}</td>
                                <td>{veiculo.ano}</td>
                                <td>{veiculo.disponivel}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <div className="form-message">
                    Nenhum veículo disponível no momento.
                </div>
            )}
        </div>
    );
};

export default ListarVeiculos;