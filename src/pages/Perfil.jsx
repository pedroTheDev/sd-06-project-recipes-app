import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import '../styles/Profile.css';

function Perfil({ history }) {
  const user = JSON.parse(localStorage.user);

  // Logout and redirect to login page
  const handleLogout = () => {
    localStorage.clear();
    history.push('/');
  };

  return (
    <>
      <Header name="Perfil" button={ false } />
      <div className="profile">
        <span data-testid="profile-email">
          {user.email}
        </span>
        <Link to="/receitas-feitas">
          <button
            type="button"
            data-testid="profile-done-btn"
          >
            Receitas Feitas
          </button>
        </Link>
        <Link to="/receitas-favoritas">
          <button
            type="button"
            data-testid="profile-favorite-btn"
          >
            Receitas Favoritas
          </button>
        </Link>
        <button
          type="button"
          data-testid="profile-logout-btn"
          onClick={ () => handleLogout() }
        >
          Sair
        </button>
      </div>
      <Footer />
    </>
  );
}

Perfil.propTypes = {
  history: PropTypes.shape.isRequired,
};

export default Perfil;

// 82 - Implemente os elementos da a tela de perfil respeitando os atributos descritos no protótipo
// Observações técnicas

// Todos o data-testid do email e de todos os botões
// O elemento de email deve possuir o atributo data-testid="profile-email";
// O botão com as "Receitas Feitas" deve possuir o atributo data-testid="profile-done-btn";
// O botão com as "Receitas Favoritas" deve possuir o atributo data-testid="profile-favorite-btn";
// O botão de sair deve possuir o atributo data-testid="profile-logout-btn".
// 83 - Implemente a solução de maneira que o e-mail da pessoa usuária deve estar visível
// 84 - Implemente 3 botões: um de nome "Receitas Feitas", um de nome "Receitas Favoritas" e um de nome "Sair"
// Observações técnicas

// A tela contêm todos os 3 botões.
// 85 - Redirecione a pessoa usuária que, ao clicar no botão de "Receitas Favoritas", a rota deve mudar para a tela de receitas favoritas
// Observações técnicas

// Redireciona para a rota correta.
// 86 - Redirecione a pessoa usuária que, ao clicar no botão de "Receitas Feitas", a rota deve mudar para a tela de receitas feitas
// Observações técnicas

// Redireciona para a rota correta.
// 87 - Redirecione a pessoa usuária que, ao clicar no botão de "Sair", o localStorage deve ser limpo e a rota deve mudar para a tela de login
// Observações técnicas

// Limpa todas as chaves da localStorage;
// A rota muda para a tela de login.
