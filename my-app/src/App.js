import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
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

function Login() {
  return (
    <div className="login-form">
      <h2>Login</h2>
      <form>
        <div className="form-group">
          <label htmlFor="email">E-mail:</label>
          <input type="email" id="email" name="email" required />
        </div>
        <div className="form-group">
          <label htmlFor="password">Senha:</label>
          <input type="password" id="password" name="password" required />
        </div>
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
}

function App() {
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
          </nav>
        </header>

        <main className="main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </main>

        <footer className="footer">
          <p>&copy; 2024 Mercado Livre Clone. Todos os direitos reservados.</p>
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
