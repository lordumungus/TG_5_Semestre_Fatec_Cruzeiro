import React, { useState, useEffect } from 'react';
import './Home.css'; // Supondo que o estilo do Spinner esteja aqui

function Categories() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulando o tempo de carregamento
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer); // Limpeza do timer ao desmontar o componente
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
      <h1>Categorias de Serviços</h1>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <ul>
          <li>Consultoria</li>
          <li>Design Gráfico</li>
          <li>Desenvolvimento Web</li>
          <li>Marketing Digital</li>
          <li>Suporte Técnico</li>
        </ul>
      )}
    </div>
  );
}

export default Categories;
