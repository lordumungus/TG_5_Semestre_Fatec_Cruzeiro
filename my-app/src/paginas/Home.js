import React, { useState, useEffect } from 'react';

// Componente de animação de loading
function LoadingSpinner() {
  return (
    <div className="loading-spinner">
      <div className="spinner"></div>
      <p>Carregando...    </p>
    </div>
  );
}

// Componente para o container de boas-vindas
function WelcomeContainer({ userEmail }) {
  return (
    <div className="welcome-container">
      <h1>Bem-vindo, {userEmail || 'Usuário'}!</h1>
    </div>
  );
}

// Componente para o container de serviços
function ServicesContainer({ services }) {
  return (
    <div className="services-container">
      <h2>Serviços Adicionados</h2>
      {services.length > 0 ? (
        <ul className="services-list">
          {services.map((service, index) => (
            <li key={index} className="service-box">
              <strong>Serviço:</strong> {service.name} - 
              <strong>R$ {service.rate} por hora
              </strong> {service.userEmail && <span> Adicionado por: {service.userEmail}</span>}
            </li>
          ))}
        </ul>
      ) : (
        <p>Nenhum serviço adicionado ainda.</p>
      )}
    </div>
  );
}

// Componente principal Home
function Home({ services, userEmail }) {
  const [isLoading, setIsLoading] = useState(true);

  // Simulação do carregamento dos dados
  useEffect(() => {
    const loadData = () => {
      setTimeout(() => {
        setIsLoading(false); // Simulando o término do carregamento
      }, 2000); // Simulação de 2 segundos de carregamento
    };
    loadData();
  }, []);

  return (
    <div>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          <WelcomeContainer userEmail={userEmail} />
          <ServicesContainer services={services} />
        </>
      )}
    </div>
  );
}

export default Home;
