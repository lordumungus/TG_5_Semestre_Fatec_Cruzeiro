import React, { useState } from 'react';
import './Modal.css';

function AddService({ onAddService, userEmail }) {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [serviceName, setServiceName] = useState('');
  const [hourlyRate, setHourlyRate] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Estado de carregamento

  const closeModal = () => {
    setIsModalOpen(false);
    setServiceName('');
    setHourlyRate('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (serviceName.trim() && hourlyRate.trim()) {
      setIsLoading(true); // Iniciar o carregamento
      fetch('http://localhost:5000/add-service', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: serviceName,
          rate: hourlyRate,
          userEmail: userEmail,
        }),
      })
      .then((response) => response.json())
      .then((data) => {
        setIsLoading(false); // Parar o carregamento
        if (data.message) {
          alert(data.message);
          onAddService({ name: serviceName, rate: hourlyRate, userEmail: userEmail });
          closeModal();
        } else if (data.error) {
          alert(data.error);
        }
      })
      .catch((error) => {
        setIsLoading(false); // Parar o carregamento em caso de erro
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
            {isLoading ? (
              <div className="loading-spinner">
                <div className="spinner"></div>
                <p>Adicionando serviço...</p>
              </div>
            ) : (
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
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default AddService;
