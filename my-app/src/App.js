import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from 'react-router-dom';
import './App.css';
import Categories from './paginas/Categories';
import Ofertas from './paginas/Ofertas';
import Contato from './paginas/Contato';
import Home from './paginas/Home';






function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Verificação simples
    if (email === 'lele@gmail.com' && password === '1234') {
      onLogin(email); // Passando o email para o estado de login
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
  const [userEmail, setUserEmail] = useState('');

  const handleLogin = (email) => {
    setIsAuthenticated(true);
    setUserEmail(email);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserEmail('');
  };

  return (
    <Router>
      <div className="app">
        <header className="header">
          <div className="logo">My App</div>
          <nav className="nav">
            <Link to="/">Home</Link>
            <Link to="/categories">Categorias</Link>            
            <Link to="/offers">Ofertas</Link>
            <Link to="/contact">Contato</Link>
            {isAuthenticated ? (
              <>
                <span className="user-email">{userEmail}</span>
                <Link to="/" onClick={handleLogout}>Logout</Link>
              </>
            ) : (
              <Link to="/login">Login</Link>
            )}
          </nav>
        </header>

        <main className="main">
          <Routes>
            <Route path="/" element={<Home userEmail={userEmail} />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/offers" element={<Ofertas />} />
            <Route path="/contact" element={<Contato />} />
            
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
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
