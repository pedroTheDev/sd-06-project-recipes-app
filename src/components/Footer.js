import React from 'react';
import { Link } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';

export default function Footer() {
  const footerStyle = {
    position: 'fixed',
    bottom: 0,
    // Precisa desse style pra passar no cypress
  };

  return (
    <footer data-testid="footer" style={ footerStyle }>
      <Link to="/bebidas">
        <img
          src={ drinkIcon }
          alt="Ícone de drink"
          data-testid="drinks-bottom-btn"
        />
      </Link>
      <Link to="/explorar">
        <img
          src={ exploreIcon }
          alt="Explore icon"
          data-testid="explore-bottom-btn"
        />
      </Link>
      <Link to="/comidas">
        <img
          src={ mealIcon }
          alt="Meal icon"
          data-testid="food-bottom-btn"
        />
      </Link>
    </footer>
  );
}
