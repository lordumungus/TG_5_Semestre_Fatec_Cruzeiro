import React, { useState } from 'react';

function Cadastro({ onRegister }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [telefone, setTelefone] = useState('');
  const [endereco, setEndereco] = useState('');
  const [message, setMessage] = useState(''); // Estado para exibir mensagens de resposta

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(''); // Limpa a mensagem antes de uma nova tentativa

    // Verifica se as senhas coincidem
    if (password !== confirmPassword) {
      setMessage('As senhas não coincidem!');
      return;
    }

    if (email && password && nome && cpf && telefone && endereco) {
      try {
        const response = await fetch('http://localhost:5000/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password, nome, cpf, telefone, endereco }),
        });

        const data = await response.json();

        if (response.ok) {
          setMessage('Usuário cadastrado com sucesso!'); // Define a mensagem de sucesso
          onRegister(email, password); // Chama a função passada via props para cadastrar o usuário
          // Limpa os campos após o cadastro
          setEmail('');
          setPassword('');
          setConfirmPassword('');
          setNome('');
          setCpf('');
          setTelefone('');
          setEndereco('');
        } else {
          setMessage(`Erro: ${data.error}`); // Exibe a mensagem de erro retornada pela API
        }
      } catch (error) {
        setMessage('Erro ao cadastrar usuário. Tente novamente mais tarde.'); // Exibe erro genérico em caso de falha na requisição
      }
    } else {
      setMessage('Por favor, preencha todos os campos.');
    }
  };

  return (
    <div className="cadastro-container">
      <h2>Cadastro de Usuário</h2>
      <form onSubmit={handleSubmit} className="cadastro-form">
        <div className="form-group">
          <label>Nome:</label>
          <input 
            type="text" 
            value={nome} 
            onChange={(e) => setNome(e.target.value)} 
            placeholder="Digite seu nome" 
            required 
          />
        </div>
        <div className="form-group">
          <label>CPF:</label>
          <input 
            type="text" 
            value={cpf} 
            onChange={(e) => setCpf(e.target.value)} 
            placeholder="Digite seu CPF" 
            required 
          />
        </div>
        <div className="form-group">
          <label>Telefone:</label>
          <input 
            type="text" 
            value={telefone} 
            onChange={(e) => setTelefone(e.target.value)} 
            placeholder="Digite seu telefone" 
            required 
          />
        </div>
        <div className="form-group">
          <label>Endereço:</label>
          <input 
            type="text" 
            value={endereco} 
            onChange={(e) => setEndereco(e.target.value)} 
            placeholder="Digite seu endereço" 
            required 
          />
        </div>
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
        <div className="form-group">
          <label>Confirmar Senha:</label>
          <input 
            type="password" 
            value={confirmPassword} 
            onChange={(e) => setConfirmPassword(e.target.value)} 
            placeholder="Confirme sua senha" 
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
