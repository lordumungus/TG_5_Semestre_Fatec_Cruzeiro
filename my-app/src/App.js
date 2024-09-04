import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from 'react-router-dom';
import './App.css';

function Home() {
  return (
    <div>
      <h1>Bem-vindo ao Meu App!</h1>
    </div>
  );
}

function Categories() {
  return (
    <div>
      <h1>Categorias de Serviços</h1>
      <ul>
        <li>Consultoria</li>
        <li>Design Gráfico</li>
        <li>Desenvolvimento Web</li>
        <li>Marketing Digital</li>
        <li>Suporte Técnico</li>
      </ul>
    </div>
  );
}

function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Verificação simples
    if (email === 'lele@gmail.com' && password === '1234') {
      onLogin(true);
      navigate('/');
    } else {
      alert('Login ou senha incorretos');
    }
  };

  return (
    <div className="login-form">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
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
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Router>
      <div className="app">
        <header className="header">
          <div className="logo">My App</div>
          <nav className="nav">
            <Link to="/">Home</Link>
            <Link to="/categories">Categorias</Link>            
            <Link to="#offers">Ofertas</Link>
            <Link to="#contact">Contato</Link>
            {isAuthenticated ? (
              <Link to="/" onClick={() => setIsAuthenticated(false)}>Logout</Link>
            ) : (
              <Link to="/login">Login</Link>
            )}
          </nav>
        </header>

        <main className="main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/login" element={<Login onLogin={setIsAuthenticated} />} />
          </Routes>
        </main>

        <footer className="footer">
          <p>&copy; 2024 MY APP. Todos os direitos reservados.</p>
          <div className="footer-links">
            <Link to="#privacy">Política de Privacidade</Link>
            <Link to="#terms">Termos de Serviço</Link>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
