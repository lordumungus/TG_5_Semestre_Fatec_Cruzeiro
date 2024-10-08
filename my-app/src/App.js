import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { FaSun, FaMoon } from 'react-icons/fa';
import './App.css';
import Categories from './paginas/Categories';
import Ofertas from './paginas/Ofertas';
import Contato from './paginas/Contato';
import Home from './paginas/Home';
import AddService from './paginas/AddService';
import Login from './paginas/Login';
import Cadastro from './paginas/Cadastro';
import Rodape from './paginas/Rodape';
import ServiceDetail from './paginas/ServiceDetail';
import axios from 'axios';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [services, setServices] = useState([]);
  const [showAddService, setShowAddService] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const storedEmail = localStorage.getItem('userEmail');
    if (storedEmail) {
      setIsAuthenticated(true);
      setUserEmail(storedEmail);
    }

    axios.get('http://localhost:5000/api/services')
      .then(response => {
        setServices(response.data);
      })
      .catch(error => {
        console.error('Houve um erro ao buscar os serviços!', error);
      });
  }, []);

  const handleLogin = (email) => {
    setIsAuthenticated(true);
    setUserEmail(email);
    localStorage.setItem('userEmail', email);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserEmail('');
    localStorage.removeItem('userEmail');
  };

  const handleRegister = (email, password) => {
    console.log("Usuário cadastrado:", email);
  };

  const handleAddService = (newService) => {
    setServices([...services, newService]);
    setShowAddService(false);
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <Router>
      <div className={`app ${isDarkMode ? 'dark-theme' : ''}`}>
        <header className="header">
          <div className="logo">
            <img src="favicon.ico" alt="My App" />
          </div>
          <nav className="nav">
            {isAuthenticated && (
              <span className="user-email">{userEmail}</span>
            )}
            <Link to="/">Home</Link>
            <Link to="/categories">Categorias</Link>
            <Link to="/offers">Ofertas</Link>
            <Link to="/contact">Contato</Link>
            <Link to="/cadastro">Cadastro</Link>
            {isAuthenticated ? (
              <>
                <Link to="/" onClick={handleLogout}>Logout</Link>
                <Link onClick={() => setShowAddService(true)}>Adicionar Serviço</Link>
              </>
            ) : (
              <Link to="/login">Login</Link>
            )}
            <button className="toggle-theme-btn" onClick={toggleTheme}>
              {isDarkMode ? <FaSun /> : <FaMoon />}
            </button>
          </nav>
        </header>

        <main className="main">
          <Routes>
            <Route path="/" element={<Home services={services} userEmail={userEmail} />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/offers" element={<Ofertas />} />
            <Route path="/contact" element={<Contato />} />
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route path="/cadastro" element={<Cadastro onRegister={handleRegister} />} />
            <Route path="/service/:id" element={<ServiceDetail />} />
          </Routes>
          {showAddService && <AddService onAddService={handleAddService} userEmail={userEmail} />}
        </main>

        <Rodape />
      </div>
    </Router>
  );
}

export default App;
