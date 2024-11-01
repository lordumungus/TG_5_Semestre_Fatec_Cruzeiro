import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CryptoJS from 'crypto-js';
import './Home.css';

function Cadastro() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [telefone, setTelefone] = useState('');
  const [endereco, setEndereco] = useState('');
  const [numeroCasa, setNumeroCasa] = useState('');
  const [cep, setCep] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true); // Estado para controlar o spinner
  const navigate = useNavigate();

  useEffect(() => {
    // Simulando um carregamento inicial da página
    setTimeout(() => setLoading(false), 1000);
  }, []);

  function LoadingSpinner() {
    return (
      <div className="loading-spinner">
        <div className="spinner"></div>
      </div>
    );
  }

  const handleCepChange = async (e) => {
    const cepValue = e.target.value;
    setCep(cepValue);

    if (cepValue.length === 8) {
      try {
        setLoading(true); // Ativa o spinner durante a busca do CEP
        const response = await fetch(`https://viacep.com.br/ws/${cepValue}/json/`);
        const data = await response.json();

        if (!data.erro) {
          setEndereco(data.logradouro);
          setNumeroCasa('');
        } else {
          setMessage('CEP não encontrado');
        }
      } catch (error) {
        console.error('Erro ao buscar endereço:', error);
        setMessage('Erro ao buscar endereço. Tente novamente.');
      } finally {
        setLoading(false); // Desativa o spinner após a busca
      }
    } else {
      setEndereco('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    if (!termsAccepted) {
      setMessage('Por favor, aceite os Termos e Condições para continuar.');
      return;
    }

    if (password !== confirmPassword) {
      setMessage('As senhas não coincidem.');
      return;
    }

    const encryptedPassword = CryptoJS.AES.encrypt(password, 'chave-secreta').toString();

    try {
      setLoading(true); // Ativa o spinner durante a submissão do formulário
      const response = await fetch('http://localhost:5000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password: encryptedPassword,
          nome,
          cpf,
          telefone,
          endereco,
          numeroCasa,
          cep,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Cadastro realizado com sucesso!');
        setTimeout(() => navigate('/login'), 2000);
      } else {
        setMessage(data.error);
      }
    } catch (error) {
      console.error('Erro ao cadastrar:', error);
      setMessage('Erro ao cadastrar. Tente novamente.');
    } finally {
      setLoading(false); // Desativa o spinner após a submissão
    }
  };

  return (
    <div className="cadastro-form">
      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
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
                onChange={handleCepChange}
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

            {/* Termos e Condições */}
            <div className="form-group" style={{ display: 'flex', alignItems: 'center' }}>
              <input
                type="checkbox"
                id="terms"
                checked={termsAccepted}
                onChange={(e) => setTermsAccepted(e.target.checked)}
                style={{ marginRight: '1px' }}
              />
              <label htmlFor="terms">
                Eu li e aceito os{' '}
                <a href="/termos" target="_blank" rel="noopener noreferrer">
                  Termos e Condições
                </a>
              </label>
            </div>

            <button type="submit" disabled={!termsAccepted}>Cadastrar</button>
          </form>
          {message && <p>{message}</p>}
        </>
      )}
    </div>
  );
}

export default Cadastro;
