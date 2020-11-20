import React from 'react';
import { Link } from 'react-router-dom';

import '../Css/Footer.css';

function Footer() {
  return (
    <div data-testid="footer">
      <form className="Footer">
        <Link to="/bebidas">
          <button type="button" data-testid="drinks-bottom-btn">
            <img src="./src/imagens/drinkIcon.svg" alt="DRINKS" />
          </button>
        </Link>
        <Link to="/explore">
          <button type="button" data-testid="explore-bottom-btn">
            <img src="./src/imagens/exploreIcon.svg" alt="EXPLORE" />
          </button>
        </Link>
        <Link to="/comidas">
          <button type="button" data-testid="food-bottom-btn">
            <img src="./src/imagens/mealIcon.svg" alt="FOOD" />
          </button>
        </Link>
      </form>
    </div>
  );
}

export default Footer;
