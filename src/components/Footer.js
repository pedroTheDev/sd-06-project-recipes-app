import React from 'react';
import { Link } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';

import '../Css/Footer.css';

function Footer() {
  return (
    <div data-testid="footer">
      <form className="Footer">
        <Link to="/bebidas">
          <button type="button" data-testid="drinks-bottom-btn">
            <img src={drinkIcon} alt="DRINKS" />
          </button>
        </Link>
        <Link to="/explore">
          <button type="button" data-testid="explore-bottom-btn">
            <img src={exploreIcon} alt="EXPLORE" />
          </button>
        </Link>
        <Link to="/comidas">
          <button type="button" data-testid="food-bottom-btn">
            <img src={mealIcon} alt="FOOD" />
          </button>
        </Link>
      </form>
    </div>
  );
}

export default Footer;
