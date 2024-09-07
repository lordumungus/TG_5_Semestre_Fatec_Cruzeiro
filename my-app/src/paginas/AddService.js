import React, { useState } from 'react';
import './Modal.css';

function AddService({ onAddService }) {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [serviceName, setServiceName] = useState('');
  const [hourlyRate, setHourlyRate] = useState('');

  const closeModal = () => {
    setIsModalOpen(false);
    setServiceName('');
    setHourlyRate('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (serviceName.trim() && hourlyRate.trim()) {
      fetch('http://localhost:5000/add-service', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: serviceName,
          rate: hourlyRate,
        }),
      })
      .then((response) => response.json())
      .then((data) => {
        if (data.message) {
          alert(data.message);
          onAddService({ name: serviceName, rate: hourlyRate });
          closeModal();
        } else if (data.error) {
          alert(data.error);
        }
      })
      .catch((error) => {
        console.error('Erro ao adicionar serviço:', error);
      });
    } else {
      alert('Por favor, preencha todos os campos.');
    }
  };

  return (
    <div>
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>&times;</span>
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
              <button type="button" onClick={closeModal}>Cancelar</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default AddService;
