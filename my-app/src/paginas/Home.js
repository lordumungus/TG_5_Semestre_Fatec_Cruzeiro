import React from 'react';

function Home({ services }) {
  return (
    <div>
      <h1>Bem-vindo ao Meu App!</h1>
      <h2>Serviços Adicionados</h2>
      {services.length > 0 ? (
        <ul>
          {services.map((service, index) => (
            <li key={index}>
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

export default Home;
