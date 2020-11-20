import React from 'react';
import { Link } from 'react-router-dom';
import '../Style/footer.css';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';

function Footer() {
  return (
    <div data-testid="footer" className="footer">
      <button type="button" data-testid="drinks-bottom-btn" src={ drinkIcon }>
        <Link to="/bebidas">
          <img src={ drinkIcon } alt="drink-icon" />
          Drinks
        </Link>
      </button>
      <button type="button" data-testid="explore-bottom-btn" src={ exploreIcon }>
        <Link to="/explorar">
          <img src={ exploreIcon } alt="explore-icon" />
          Explore
        </Link>
      </button>
      <button type="button" data-testid="food-bottom-btn" src={ mealIcon }>
        <Link to="/comidas">
          <img src={ mealIcon } alt="meal-icon" />
          Foods
        </Link>
      </button>
    </div>
  );
}

export default Footer;
