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
            const response = await axios.post('http://localhost:5272/api/usuario/cadastrar', usuario);
            console.log('Usuário cadastrado:', usuario);
            console.log('Resposta do servidor:', response.data);
            alert('Usuário cadastrado com sucesso!');
            // Limpar o formulário
            setUsuario({
                CPF: '',
                NomeCompleto: '',
                Celular: '',
                Email: '',
                Senha: ''
            });
        } catch (error) {
            alert('Erro ao cadastrar usuário');
            console.error('Erro:', error);
        }
    };

    return (
        <div className="container mt-4">
            <h2>Cadastro de Usuário</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">CPF:</label>
                    <input
                        type="text"
                        className="form-control"
                        name="CPF"
                        value={usuario.CPF}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Nome Completo:</label>
                    <input
                        type="text"
                        className="form-control"
                        name="NomeCompleto"
                        value={usuario.NomeCompleto}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Celular:</label>
                    <input
                        type="text"
                        className="form-control"
                        name="Celular"
                        value={usuario.Celular}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Email:</label>
                    <input
                        type="email"
                        className="form-control"
                        name="Email"
                        value={usuario.Email}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Senha:</label>
                    <input
                        type="password"
                        className="form-control"
                        name="Senha"
                        value={usuario.Senha}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">Cadastrar</button>
            </form>
        </div>
    );
};

export default CadastrarUsuario; 