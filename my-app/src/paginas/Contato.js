import React from 'react';
import './Contato.css'; // Certifique-se de criar e importar um arquivo CSS para estilização

function Contato() {
  return (
    <div className="contato-container">
      <h1>Contato com os Desenvolvedores</h1>
      <p>
        Se você tem alguma dúvida ou feedback sobre o nosso software, sinta-se à vontade para entrar em contato com nossa equipe de desenvolvimento. Estamos aqui para ajudar!
      </p>
      <div className="team-members">
        <h2>Nossos Desenvolvedores:</h2>
        <ul>
          <li><strong>Alessandro:</strong> Especialista em Frontend, responsável pela interface do usuário.</li>
          <li><strong>Matheus:</strong> Desenvolvedor Backend, encarregado das funcionalidades do servidor e banco de dados.</li>
          <li><strong>Gabriel:</strong> Engenheiro de Software, cuida da arquitetura geral e integração de sistemas.</li>
        </ul>
      </div>
    </div>
  );
}

export default Contato;
