import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import Categories from './paginas/Categories';
import Ofertas from './paginas/Ofertas';
import Contato from './paginas/Contato';
import Home from './paginas/Home';
import AddService from './paginas/AddService';
import Login from './paginas/Login';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [services, setServices] = useState([]); // Estado para armazenar os serviços adicionados
  const [showAddService, setShowAddService] = useState(false);

  const handleLogin = (email) => {
    setIsAuthenticated(true);
    setUserEmail(email);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserEmail('');
  };

  const handleAddService = (newService) => {
    setServices([...services, newService]);
    setShowAddService(false); // Ocultar o formulário após adicionar o serviço
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
                <button onClick={() => setShowAddService(true)}>Adicionar Serviço</button> {/* Botão para exibir o formulário */}
              </>
            ) : (
              <Link to="/login">Login</Link>
            )}
          </nav>
        </header>

        <main className="main">
          <Routes>
            <Route path="/" element={<Home services={services} userEmail={userEmail} />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/offers" element={<Ofertas />} />
            <Route path="/contact" element={<Contato />} />
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
          </Routes>
          {showAddService && <AddService onAddService={handleAddService} />} {/* Exibir o formulário se o estado for true */}
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
