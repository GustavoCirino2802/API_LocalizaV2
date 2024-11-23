import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Veiculo } from '../../Models/Veiculo';

const ListarVeiculos: React.FC = () => {
    const [veiculos, setVeiculos] = useState<Veiculo[]>([]);

    useEffect(() => {
        const fetchVeiculos = async () => {
            try {
                const response = await axios.get('http://localhost:5272/api/veiculo/listarDisponiveis');
                setVeiculos(response.data);
            } catch (error) {
                console.error('Erro ao buscar veículos:', error);
                alert('Erro ao carregar veículos disponíveis');
            }
        };

        fetchVeiculos();
    }, []);

    return (
        <div className="container mt-4">
            <h2>Veículos Disponíveis</h2>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Placa</th>
                        <th>Modelo</th>
                        <th>Marca</th>
                        <th>Ano</th>
                        <th>Disponível</th>
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
            {veiculos.length === 0 && (
                <p className="text-center">Nenhum veículo disponível no momento.</p>
            )}
        </div>
    );
};

export default ListarVeiculos;
