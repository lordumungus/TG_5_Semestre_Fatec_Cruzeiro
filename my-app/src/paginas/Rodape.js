import React from 'react';
import { Link } from 'react-router-dom'; // Adicionar essa linha para importar o Link

function Rodape() {
  return (
    <footer className="footer">
      <p>&copy; 2024 Hiring Scope. Todos os direitos reservados.</p>
      <div className="footer-links">
        <Link to="#privacy">Política de Privacidade</Link>
        <Link to="#terms">Termos de Serviço</Link>
      </div>
    </footer>
  );
}

export default Rodape;
