import React, { useState } from 'react';

function Cadastro({ onRegister }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState(''); // Estado para exibir mensagens de resposta

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(''); // Limpa a mensagem antes de uma nova tentativa
    if (email && password) {
      try {
        const response = await fetch('http://localhost:5000/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (response.ok) {
          setMessage('Usuário cadastrado com sucesso!'); // Define a mensagem de sucesso
          onRegister(email, password); // Chama a função passada via props para cadastrar o usuário
          setEmail('');
          setPassword('');
        } else {
          setMessage(`Erro: ${data.error}`); // Exibe a mensagem de erro retornada pela API
        }
      } catch (error) {
        setMessage('Erro ao cadastrar usuário. Tente novamente mais tarde.'); // Exibe erro genérico em caso de falha na requisição
      }
    }
  };

  return (
    <div className="cadastro-container">
      <h2>Cadastro de Usuário</h2>
      <form onSubmit={handleSubmit} className="cadastro-form">
        <div className="form-group">
          <label>Email:</label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            placeholder="Digite seu email" 
            required 
          />
        </div>
        <div className="form-group">
          <label>Senha:</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            placeholder="Digite sua senha" 
            required 
          />
        </div>
        <button type="submit">Cadastrar</button>
      </form>

      {/* Exibe a mensagem de sucesso ou erro */}
      {message && <p>{message}</p>}
    </div>
  );
}

export default Cadastro;
