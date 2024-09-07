import React from 'react';

// Componente para o container de boas-vindas
function WelcomeContainer() {
  return (
    <div className="welcome-container">
      <h1>Bem-vindo ao Meu App!</h1>
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
              <strong>Serviço:</strong> {service.name} - <strong>R${service.rate} por hora</strong>
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
function Home({ services }) {
  return (
    <div>
      <WelcomeContainer />
      <ServicesContainer services={services} />
    </div>
  );
}

export default Home;
