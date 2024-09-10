// Home.js
import React from 'react';

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
  return (
    <div>
      <WelcomeContainer userEmail={userEmail} />
      <ServicesContainer services={services} />
    </div>
  );
}

export default Home;
