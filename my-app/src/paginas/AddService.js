// src/paginas/AddService.js

import React, { useState } from 'react';

function AddService({ onAddService }) {
  const [serviceName, setServiceName] = useState('');
  const [hourlyRate, setHourlyRate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (serviceName && hourlyRate) {
      onAddService({ name: serviceName, rate: hourlyRate });
      setServiceName('');
      setHourlyRate('');
    } else {
      alert('Por favor, preencha todos os campos.');
    }
  };

  return (
    <div className="add-service-form">
      <h2>Adicionar Serviço</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="serviceName">Nome do Serviço:</label>
          <input
            type="text"
            id="serviceName"
            name="serviceName"
            value={serviceName}
            onChange={(e) => setServiceName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="hourlyRate">Valor por Hora:</label>
          <input
            type="number"
            id="hourlyRate"
            name="hourlyRate"
            value={hourlyRate}
            onChange={(e) => setHourlyRate(e.target.value)}
            required
          />
        </div>
        <button type="submit">Adicionar</button>
      </form>
    </div>
  );
}

export default AddService;
