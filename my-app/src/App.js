import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import Categories from './paginas/Categories';
import Ofertas from './paginas/Ofertas';
import Contato from './paginas/Contato';
import Home from './paginas/Home';
import AddService from './paginas/AddService';
import Login from './paginas/Login';
import Cadastro from './paginas/Cadastro';
import Rodape from './paginas/Rodape';
import axios from 'axios';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [services, setServices] = useState([]);
  const [showAddService, setShowAddService] = useState(false);

  useEffect(() => {
    // Fetch services from backend on component mount
    axios.get('http://localhost:5000/api/services')
      .then(response => {
        setServices(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the services!', error);
      });
  }, []);

  const handleLogin = (email) => {
    setIsAuthenticated(true);
    setUserEmail(email);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserEmail('');
  };

  const handleRegister = (email, password) => {
    console.log("Usuário cadastrado:", email);
    // Lógica para cadastrar usuários
  };

  const handleAddService = (newService) => {
    setServices([...services, newService]);
    setShowAddService(false);
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
            <Link to="/cadastro">Cadastro</Link>
            
            {isAuthenticated ? (
              <>
                <span className="user-email">{userEmail}</span>
                <Link to="/" onClick={handleLogout}>Logout</Link>
                <button onClick={() => setShowAddService(true)}>Adicionar Serviço</button>
              </>
            ) : (
              <Link to="/login">Login</Link>
            )}
          </nav>
        </header>

        <main className="main">
          <Routes>
            <Route path="/" element={<Home services={services} />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/offers" element={<Ofertas />} />
            <Route path="/contact" element={<Contato />} />
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route path="/cadastro" element={<Cadastro onRegister={handleRegister} />} />
          </Routes>
          {showAddService && <AddService onAddService={handleAddService} />}
        </main>

        <Rodape/>
      </div>
    </Router>
  );
}

export default App;
