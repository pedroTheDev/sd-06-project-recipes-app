import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';

function Footer() {
  return (
    <div data-testid="footer" className="footer">
      <Link to="/bebidas">
        <button type="button" data-testid="drinks-bottom-btn">
          <img src={ drinkIcon } alt="drink-icon" data-testid="drink-icon-svg" />
        </button>
      </Link>
      <Link to="/explorar">
        <button type="button" data-testid="explore-bottom-btn">
          <img src={ exploreIcon } alt="explore-icon" data-testid="explore-icon-svg" />
        </button>
      </Link>
      <Link to="/comidas">
        <button type="button" data-testid="food-bottom-btn">
          <img src={ mealIcon } alt="meal-icon" data-testid="meal-icon-svg" />
        </button>
      </Link>
    </div>
  );
}

export default Footer;
