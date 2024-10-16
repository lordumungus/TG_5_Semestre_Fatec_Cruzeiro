import React, { useState } from 'react';

function Cadastro({ onRegister }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [telefone, setTelefone] = useState('');
  const [cep, setCep] = useState('');
  const [endereco, setEndereco] = useState('');
  const [numeroCasa, setNumeroCasa] = useState(''); // Novo estado para o número da casa
  const [message, setMessage] = useState(''); // Estado para exibir mensagens de resposta

  // Função para buscar o endereço pelo CEP
  const buscarEnderecoPorCep = async (cep) => {
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await response.json();
      if (data.erro) {
        setMessage('CEP não encontrado.');
        setEndereco('');
      } else {
        setEndereco(`${data.logradouro}, ${data.bairro}, ${data.localidade} - ${data.uf}`);
        setMessage('');
      }
    } catch (error) {
      setMessage('Erro ao buscar endereço. Tente novamente.');
    }
  };

  const handleCepChange = (e) => {
    const novoCep = e.target.value;
    setCep(novoCep);

    if (novoCep.length === 8) {
      buscarEnderecoPorCep(novoCep);
    } else {
      setEndereco('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(''); // Limpa a mensagem antes de uma nova tentativa

    // Verifica se as senhas coincidem
    if (password !== confirmPassword) {
      setMessage('As senhas não coincidem!');
      return;
    }

    if (email && password && nome && cpf && telefone && cep && endereco && numeroCasa) {
      try {
        const response = await fetch('http://localhost:5000/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password, nome, cpf, telefone, endereco, numeroCasa }),
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
          setCep('');
          setEndereco('');
          setNumeroCasa(''); // Limpa o campo do número da casa
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
          <label>CEP:</label>
          <input 
            type="text" 
            value={cep} 
            onChange={handleCepChange} 
            placeholder="Digite seu CEP" 
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
            readOnly={true} // O endereço será preenchido automaticamente
          />
        </div>
        <div className="form-group">
          <label>Número da Casa:</label>
          <input 
            type="text" 
            value={numeroCasa} 
            onChange={(e) => setNumeroCasa(e.target.value)} 
            placeholder="Digite o número da casa" 
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
