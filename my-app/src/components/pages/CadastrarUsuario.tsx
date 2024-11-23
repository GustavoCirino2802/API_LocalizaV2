import React, { useState } from 'react';
import axios from 'axios';

interface Usuario {
    CPF: string;
    NomeCompleto: string;
    Celular: string;
    Email: string;
    Senha: string;
}

const CadastrarUsuario: React.FC = () => {
    const [usuario, setUsuario] = useState<Usuario>({
        CPF: '',
        NomeCompleto: '',
        Celular: '',
        Email: '',
        Senha: ''
    });

    const [message, setMessage] = useState<{type: 'success' | 'error', text: string} | null>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUsuario(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            console.log('Cadastrando novo usuário:', {
                CPF: usuario.CPF,
                NomeCompleto: usuario.NomeCompleto,
                Celular: usuario.Celular,
                Email: usuario.Email,
                Senha: '******' // Por segurança, não exibimos a senha
            });

            const response = await axios.post('http://localhost:5272/api/usuario/cadastrar', usuario);
            console.log('Resposta do servidor:', response.data);
            setMessage({ type: 'success', text: 'Usuário cadastrado com sucesso!' });
            setUsuario({
                CPF: '',
                NomeCompleto: '',
                Celular: '',
                Email: '',
                Senha: ''
            });
        } catch (error) {
            console.error('Erro ao cadastrar usuário:', error);
            setMessage({ type: 'error', text: 'Erro ao cadastrar usuário' });
        }
    };

    return (
        <div className="form-container">
            <h2 className="form-title">Cadastro de Usuário</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label className="form-label">CPF:</label>
                    <input
                        type="text"
                        className="form-input"
                        name="CPF"
                        value={usuario.CPF}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label className="form-label">Nome Completo:</label>
                    <input
                        type="text"
                        className="form-input"
                        name="NomeCompleto"
                        value={usuario.NomeCompleto}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label className="form-label">Celular:</label>
                    <input
                        type="text"
                        className="form-input"
                        name="Celular"
                        value={usuario.Celular}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label className="form-label">Email:</label>
                    <input
                        type="email"
                        className="form-input"
                        name="Email"
                        value={usuario.Email}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label className="form-label">Senha:</label>
                    <input
                        type="password"
                        className="form-input"
                        name="Senha"
                        value={usuario.Senha}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="button-container">
                    <button type="submit" className="submit-button">Cadastrar Usuário</button>
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

export default CadastrarUsuario;