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
              <strong>ID: {service.id}</strong>
              <strong>SERVIÇO: {service.name}</strong>
              <strong>HORA COBRADA: R$ {service.rate} por hora</strong>
              <strong>DESCRIÇÃO SERVIÇO: {service.description}</strong>
              <strong>LOCAL: {service.location}</strong>
              {service.photo && (
                <img
                  src={`data:image/jpeg;base64,${service.photo}`}
                  alt={service.name}
                  className="service-photo"
                />
              )}
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
    <img src="/assets/f2.jpeg" alt="Banner 1" />
  </div>
  <div className="banner-slide">
    <img src="/assets/f3.jpg" alt="Banner 2" />
  </div>
  <div className="banner-slide">
    <img src="/assets/f4.jpg" alt="Banner 3" />
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
