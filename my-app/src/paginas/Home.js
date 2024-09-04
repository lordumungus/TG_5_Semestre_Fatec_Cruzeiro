function Home({ userEmail }) {
    return (
      <div>
        <h1>Bem-vindo ao Meu App!</h1>
        {userEmail && <p>Você está logado como: {userEmail}</p>}
      </div>
    );
  }

  export default Home;