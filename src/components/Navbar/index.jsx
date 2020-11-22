import React from 'react';
import { Link } from 'react-router-dom';
// import PropTypes from 'prop-types';

import drinkIcon from '../../images/drinkIcon.svg';
import exploreIcon from '../../images/exploreIcon.svg';
import mealIcon from '../../images/mealIcon.svg';

import './styles.css';

function Navbar() {
  return (
    <nav className="app-nav-bar" data-testid="footer">
      <Link to="/bebidas">
        <img data-testid="drinks-bottom-btn" src={drinkIcon} alt="drinks page" />
      </Link>

      <Link to="/explorar">
        <img data-testid="explore-bottom-btn" src={exploreIcon} alt="explore page" />
      </Link>

      <Link to="/comidas">
        <img data-testid="food-bottom-btn" src={mealIcon} alt="meals page" />
      </Link>
    </nav>
  );
}

export default Navbar;

// Não tem footer na tela de login;
// Tem footer na tela de principal de receitas de comidas;
// Tem footer na tela de principal de receitas de bebidas;
// Não tem footer na tela de detalhes de uma receita de comida;
// Não tem footer na tela de detalhes de uma receita de bebida;
// Não tem footer na tela de receita em processo de comida;
// Não tem footer na tela de receita em processo de bebida;
// Tem footer na tela de explorar;
// Tem footer na tela de explorar comidas;
// Tem footer na tela de explorar bebidas;
// Tem footer na tela de explorar comidas por ingrediente;
// Tem footer na tela de explorar bebidas por ingrediente;
// Tem footer na tela de explorar comidas por local de origem;
// Tem footer na tela de perfil;
// Não tem footer na tela de receitas feitas;
// Não tem footer na tela de receitas favoritas.
