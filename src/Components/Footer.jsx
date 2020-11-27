import React from 'react';
import { Link } from 'react-router-dom';
import '../Style/footer.css';
import drinkIcon from '../images/cocktail.svg';
import exploreIcon from '../images/explore.svg';
import mealIcon from '../images/foodIcon.svg';

function Footer() {
  return (
    <div data-testid="footer" className="footer">
      <Link to="/bebidas">
        <button type="button">
          <img
            data-testid="drinks-bottom-btn"
            src={ drinkIcon }
            alt="drink-icon"
          />
        </button>
      </Link>
      <Link to="/explorar">
        <button type="button">
          <img
            data-testid="explore-bottom-btn"
            src={ exploreIcon }
            alt="explore-icon"
            width="37.36"
          />
        </button>
      </Link>
      <Link to="/comidas">
        <button type="button">
          <img
            data-testid="food-bottom-btn"
            src={ mealIcon }
            alt="meal-icon"
            width="37.36"
          />
        </button>
      </Link>
    </div>
  );
}

export default Footer;
