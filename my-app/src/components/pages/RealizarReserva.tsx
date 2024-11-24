import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Reserva } from '../../Models/Reserva';
import { Veiculo } from '../../Models/Veiculo';

const VALOR_DIARIA = 100; // Valor fixo da diária

const RealizarReserva: React.FC = () => {
    const [reserva, setReserva] = useState<Reserva>({
        cpf: '',
        placa: '',
        periodoInicial: '',
        periodoFinal: '',
        formaPagamento: 'Cartão de Crédito'
    });

    const [veiculosDisponiveis, setVeiculosDisponiveis] = useState<Veiculo[]>([]);
    const [message, setMessage] = useState<{type: 'success' | 'error', text: string} | null>(null);
    const [valorTotal, setValorTotal] = useState<number>(0);
    const [quantidadeDias, setQuantidadeDias] = useState<number>(0);
    const [showPayment, setShowPayment] = useState<boolean>(false);

    useEffect(() => {
        const fetchVeiculos = async () => {
            try {
                const response = await axios.get('http://localhost:5272/api/veiculo/listarDisponiveis');
                setVeiculosDisponiveis(response.data);
            } catch (error) {
                console.error('Erro ao buscar veículos:', error);
                setMessage({ type: 'error', text: 'Erro ao carregar veículos disponíveis' });
            }
        };

        fetchVeiculos();
    }, []);

    useEffect(() => {
        calcularValorTotal();
    }, [reserva.periodoInicial, reserva.periodoFinal]);

    const calcularValorTotal = () => {
        if (reserva.periodoInicial && reserva.periodoFinal) {
            const inicio = new Date(reserva.periodoInicial);
            const fim = new Date(reserva.periodoFinal);
            const diffTime = Math.abs(fim.getTime() - inicio.getTime());
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            
            setQuantidadeDias(diffDays);
            setValorTotal(diffDays * VALOR_DIARIA);
        } else {
            setQuantidadeDias(0);
            setValorTotal(0);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setReserva(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setShowPayment(true);
    };

    const handlePayment = async () => {
        try {
            // Primeiro, cadastrar a reserva
            const reservaResponse = await axios.post('http://localhost:5272/api/reserva/cadastrar', reserva);
            const reservaId = reservaResponse.data.reservaId; // Assumindo que a API retorna o ID da reserva

            // Em seguida, cadastrar o pagamento
            const pagamento = {
                reservaId: reservaId,
                valorTotal: valorTotal,
                metodoPagamento: reserva.formaPagamento
            };

            await axios.post('http://localhost:5272/api/pagamento/realizar', pagamento);

            setMessage({ type: 'success', text: 'Reserva e pagamento realizados com sucesso!' });
            setShowPayment(false);
            
            // Resetar os estados
            setReserva({
                cpf: '',
                placa: '',
                periodoInicial: '',
                periodoFinal: '',
                formaPagamento: 'Cartão de Crédito'
            });
            setValorTotal(0);
            setQuantidadeDias(0);
        } catch (error) {
            console.error('Erro ao realizar reserva/pagamento:', error);
            setMessage({ type: 'error', text: 'Erro ao realizar reserva/pagamento' });
        }
    };

    const handleCancelPayment = () => {
        setShowPayment(false);
        setMessage(null);
    };

    return (
        <div className="form-container">
            <h2 className="form-title">Realizar Reserva</h2>
            {!showPayment ? (
                <form onSubmit={handleSubmit}>
                    {/* ... existing form fields ... */}
                    <div className="form-group">
                        <label className="form-label">CPF:</label>
                        <input
                            type="text"
                            className="form-input"
                            name="cpf"
                            value={reserva.cpf}
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Veículo:</label>
                        <select
                            className="form-input"
                            name="placa"
                            value={reserva.placa}
                            onChange={handleInputChange}
                            required
                        >
                            <option value="">Selecione um veículo</option>
                            {veiculosDisponiveis.map((veiculo) => (
                                <option key={veiculo.placa} value={veiculo.placa}>
                                    {veiculo.placa} - {veiculo.marca}/{veiculo.modelo} 
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group">
                        <label className="form-label">Data Inicial:</label>
                        <input
                            type="date"
                            className="form-input"
                            name="periodoInicial"
                            value={reserva.periodoInicial}
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Data Final:</label>
                        <input
                            type="date"
                            className="form-input"
                            name="periodoFinal"
                            value={reserva.periodoFinal}
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    {quantidadeDias > 0 && (
                        <div className="form-group info-box">
                            <p>Quantidade de dias: {quantidadeDias}</p>
                            <p>Valor da diária: R$ {VALOR_DIARIA.toFixed(2)}</p>
                            <p className="valor-total">Valor Total: R$ {valorTotal.toFixed(2)}</p>
                        </div>
                    )}

                    <div className="form-group">
                        <label className="form-label">Forma de Pagamento:</label>
                        <select
                            className="form-input"
                            name="formaPagamento"
                            value={reserva.formaPagamento}
                            onChange={handleInputChange}
                            required
                        >
                            <option value="Cartão de Crédito">Cartão de Crédito</option>
                            <option value="Cartão de Débito">Cartão de Débito</option>
                            <option value="PIX">PIX</option>
                            <option value="Dinheiro">Dinheiro</option>
                        </select>
                    </div>

                    <div className="button-container">
                        <button type="submit" className="submit-button">Prosseguir para Pagamento</button>
                    </div>
                </form>
            ) : (
                <div className="payment-container">
                    <h3 className="payment-title">Confirmação de Pagamento</h3>
                    <div className="payment-info">
                        <p>Forma de Pagamento: {reserva.formaPagamento}</p>
                        <p>Valor Total: R$ {valorTotal.toFixed(2)}</p>
                    </div>
                    <div className="button-container">
                        <button onClick={handlePayment} className="submit-button">
                            Confirmar Pagamento
                        </button>
                        <button onClick={handleCancelPayment} className="cancel-button">
                            Cancelar
                        </button>
                    </div>
                </div>
            )}

            {message && (
                <div className={`form-message ${message.type}`}>
                    {message.text}
                </div>
            )}
        </div>
    );
};

export default RealizarReserva;