import React from 'react';
import { Link } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';

import '../Css/Footer.css';

function Footer() {
  return (
    <div data-testid="footer" className="Footer">
      <form>
        <Link to="/bebidas">
          <button type="button" data-testid="drinks-bottom-btn" src={drinkIcon}>
            <img src={drinkIcon} alt="DRINKS" />
          </button>
        </Link>
        <Link to="/explorar">
          <button type="button" data-testid="explore-bottom-btn" src={exploreIcon}>
            <img src={exploreIcon} alt="EXPLORE" />
          </button>
        </Link>
        <Link to="/comidas">
          <button type="button" data-testid="food-bottom-btn" src={mealIcon}>
            <img src={mealIcon} alt="FOOD" />
          </button>
        </Link>
      </form>
    </div>
  );
}

export default Footer;
