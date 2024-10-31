import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CryptoJS from 'crypto-js'; // Importando a biblioteca CryptoJS

function Cadastro() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState(''); // Novo estado para confirmar a senha
  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [telefone, setTelefone] = useState('');
  const [endereco, setEndereco] = useState('');
  const [numeroCasa, setNumeroCasa] = useState('');
  const [cep, setCep] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleCepChange = async (e) => {
    const cepValue = e.target.value;
    setCep(cepValue);

    // Valida o CEP para garantir que está no formato correto
    if (cepValue.length === 8) {
      try {
        const response = await fetch(`https://viacep.com.br/ws/${cepValue}/json/`);
        const data = await response.json();

        // Verifica se o retorno é válido
        if (!data.erro) {
          setEndereco(data.logradouro);
          setNumeroCasa(''); // Limpa o número da casa, se já estiver preenchido
        } else {
          setMessage('CEP não encontrado');
        }
      } catch (error) {
        console.error('Erro ao buscar endereço:', error);
        setMessage('Erro ao buscar endereço. Tente novamente.');
      }
    } else {
      setEndereco(''); // Limpa o endereço se o CEP não estiver completo
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    // Valida se as senhas coincidem
    if (password !== confirmPassword) {
      setMessage('As senhas não coincidem.');
      return;
    }

    // Criptografando a senha antes de enviar ao servidor
    const encryptedPassword = CryptoJS.AES.encrypt(password, 'chave-secreta').toString();

    try {
      const response = await fetch('http://localhost:5000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password: encryptedPassword, // Enviando a senha criptografada
          nome,
          cpf,
          telefone,
          endereco,
          numeroCasa,
          cep, // Incluindo o CEP na requisição
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Cadastro realizado com sucesso!');
        setTimeout(() => navigate('/login'), 2000); // Redireciona para a página de login após 2 segundos
      } else {
        setMessage(data.error);
      }
    } catch (error) {
      console.error('Erro ao cadastrar:', error);
      setMessage('Erro ao cadastrar. Tente novamente.');
    }
  };

  return (
    <div className="cadastro-form">
      <h2>Cadastro</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="nome">Nome:</label>
          <input
            type="text"
            id="nome"
            name="nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">E-mail:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="cpf">CPF:</label>
          <input
            type="text"
            id="cpf"
            name="cpf"
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="telefone">Telefone:</label>
          <input
            type="text"
            id="telefone"
            name="telefone"
            value={telefone}
            onChange={(e) => setTelefone(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="cep">CEP:</label>
          <input
            type="text"
            id="cep"
            name="cep"
            value={cep}
            onChange={handleCepChange} // Chama a função ao alterar o CEP
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="endereco">Endereço:</label>
          <input
            type="text"
            id="endereco"
            name="endereco"
            value={endereco}
            onChange={(e) => setEndereco(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="numeroCasa">Número da Casa:</label>
          <input
            type="text"
            id="numeroCasa"
            name="numeroCasa"
            value={numeroCasa}
            onChange={(e) => setNumeroCasa(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Senha:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirmar Senha:</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Cadastrar</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default Cadastro;
