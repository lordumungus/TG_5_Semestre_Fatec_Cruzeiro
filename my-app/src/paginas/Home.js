import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Slider from "react-slick";
import './Home.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function LoadingSpinner() {
  return (
    <div className="loading-spinner">
      <div className="spinner"></div> 
      <div></div>
    </div>
  );
}

function WelcomeContainer({ userEmail }) {
  return (
    <div className="welcome-container">
      <h1>Bem-vindo, {userEmail || 'Usuário'}!</h1>
    </div>
  );
}

function ServicesContainer({ services }) {
  return (
    <div className="services-container">
      <h2>Serviços Disponíveis</h2>
      {services.length > 0 ? (
        <ul className="services-list">
          {services.map((service, index) => (
            <li key={index} className="service-box">
              <Link to={`/service/${service.id}`}>
                {/* Título do Serviço */}
                <div className="service-header">SERVIÇO: {service.name}</div>

                {/* Foto do Serviço */}
                <div className="service-photo-container">
                  {service.photo && (
                    <img
                      src={`data:image/jpeg;base64,${service.photo}`}
                      alt={service.name}
                      className="service-photo"
                    />
                  )}
                </div>

                {/* Informações sobre Quem Postou */}
                <div className="service-footer">
                  Adicionado por: <strong>{service.userEmail || 'Desconhecido'}</strong>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>Nenhum serviço adicionado ainda.</p>
      )}
    </div>
  );
}


function Home({ services, userEmail }) {
  const [isLoading, setIsLoading] = useState(true);
  const [cookiesAccepted, setCookiesAccepted] = useState(false);

  useEffect(() => {
    const loadData = () => {
      setTimeout(() => {
        setIsLoading(false);
      }, 2000); // Simula o carregamento com um delay de 2 segundos
    };
    
    // Verifica se o usuário já aceitou os cookies
    const cookieConsent = getCookie('cookieConsent');
    if (cookieConsent) {
      setCookiesAccepted(true);
    }
    
    loadData();
  }, []);

  // Funções para gerenciar cookies
  const setCookie = (name, value, days) => {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = "expires=" + date.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
  };

  const getCookie = (name) => {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  };

  const handleAcceptCookies = () => {
    setCookie('cookieConsent', 'accepted', 30); // Armazena a aceitação por 30 dias
    setCookiesAccepted(true);
  };

  const handleDeclineCookies = () => {
    setCookie('cookieConsent', 'declined', 30); // Armazena a recusa por 30 dias
    setCookiesAccepted(true);
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="home">
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          {/* Carrossel Animado */}
          <Slider {...settings} className="banner-carousel">
            <div className="banner-slide">
              <img src="/assets/f2.png" alt="Banner 1" />
            </div>
            <div className="banner-slide">
              <img src="/assets/f3.png" alt="Banner 2" />
            </div>
            <div className="banner-slide">
              <img src="/assets/f4.png" alt="Banner 3" />
            </div>
          </Slider>

          <WelcomeContainer userEmail={userEmail} />
          <ServicesContainer services={services} />

          {/* Aviso de Cookies */}
          {!cookiesAccepted && (
            <div className="cookie-notice">
              <p>Este site utiliza cookies para melhorar sua experiência. Você aceita?</p>
              <button onClick={handleAcceptCookies}>Aceitar</button>
              <button onClick={handleDeclineCookies}>Recusar</button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Home;
