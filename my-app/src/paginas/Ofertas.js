import React, { useState, useEffect } from 'react';
import './Home.css';

function Ofertas() {
  const [loading, setLoading] = useState(true); // Estado para controlar o carregamento

  useEffect(() => {
    // Simula o carregamento dos dados
    const loadData = async () => {
      // Aqui você pode adicionar a lógica de carregamento de dados, se necessário
      setTimeout(() => {
        setLoading(false); // Após simular o carregamento, desativa o loading
      }, 2000); // Simula um carregamento de 2 segundos
    };

    loadData();
  }, []);

  function LoadingSpinner() {
    return (
      <div className="loading-spinner">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div>
      {loading ? (
        <LoadingSpinner /> // Exibe o spinner enquanto carrega
      ) : (
        <p>Ofertas</p> // Exibe as ofertas quando não estiver mais carregando
      )}
    </div>
  );
}

export default Ofertas;
