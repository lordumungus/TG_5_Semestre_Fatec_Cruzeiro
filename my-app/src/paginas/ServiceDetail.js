import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './ServiceDetail.css'; // Estilização personalizada

function ServiceDetail() {
  const { id } = useParams(); // Captura o ID do serviço a partir da URL
  const [service, setService] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Buscar os detalhes do serviço usando o ID da URL
    fetch(`http://localhost:5000/api/service/${id}`)
      .then(response => response.json())
      .then(data => {
        setService(data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Erro ao buscar os detalhes do serviço:', error);
        setIsLoading(false);
      });
  }, [id]);

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  if (!service) {
    return <div>Serviço não encontrado.</div>;
  }

  return (
    <div className="service-detail">
      <h1>Detalhes do Serviço</h1>
      <div className="service-box">
        <strong>Nome: {service.name}</strong>
        <strong>Descrição: {service.description}</strong>
        <strong>Preço por hora: R$ {service.rate}</strong>
        <strong>Local: {service.location}</strong>
        {service.photo && (
          <img
            src={`data:image/jpeg;base64,${service.photo}`}
            alt={service.name}
            className="service-photo"
          />
        )}
        <strong>Adicionado por: {service.userEmail}</strong>
      </div>
    </div>
  );
}

export default ServiceDetail;
