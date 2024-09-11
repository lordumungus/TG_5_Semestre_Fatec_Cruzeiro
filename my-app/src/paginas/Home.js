import React, { useState, useEffect } from 'react';
import Slider from "react-slick";
import './Home.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function LoadingSpinner() {
  return (
    <div className="loading-spinner">
      <div className="spinner"></div>
      <p>Carregando...</p>
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
              <strong>{service.name}</strong> - R$ {service.rate} por hora
              {service.userEmail && <span> (Adicionado por: {service.userEmail})</span>}
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

  useEffect(() => {
    const loadData = () => {
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    };
    loadData();
  }, []);

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
              <img src="banner1.jpg" alt="Banner 1" />
              <div className="banner-text">
                <h1>Bem-vindo ao My App</h1>
                <p>Encontre os melhores serviços para seu pet!</p>
                <a href="/cadastro" className="btn">Cadastre-se Agora</a>
              </div>
            </div>
            <div className="banner-slide">
              <img src="banner2.jpg" alt="Banner 2" />
              <div className="banner-text">
                <h1>Serviços de alta qualidade</h1>
                <p>Encontre profissionais qualificados para seu pet!</p>
                <a href="/cadastro" className="btn">Comece Agora</a>
              </div>
            </div>
            <div className="banner-slide">
              <img src="banner3.jpg" alt="Banner 3" />
              <div className="banner-text">
                <h1>Ganhe renda extra</h1>
                <p>Adicione seus serviços e conquiste clientes!</p>
                <a href="/cadastro" className="btn">Cadastre-se Hoje</a>
              </div>
            </div>
          </Slider>

          <WelcomeContainer userEmail={userEmail} />
          <ServicesContainer services={services} />
        </>
      )}
    </div>
  );
}

export default Home;
