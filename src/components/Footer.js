import React from 'react';
import { Link } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';

const Footer = () => (
  <div data-testid="footer" className="position-fixed-bottom">
    <Link to="/bebidas">
      <button
        type="button"
        data-testid="drinks-bottom-btn"
      >
        <img src={drinkIcon} alt="" />
      </button>
    </Link>
    <Link to="/explorar">
      <button
        type="button"
        data-testid="explore-bottom-btn"
      >
        <img src={exploreIcon} alt="" />
      </button>
    </Link>
    <Link to="/comidas">
      <button
        type="button"
        data-testid="food-bottom-btn"
      >
        <img src={mealIcon} alt="" />
      </button>
    </Link>
  </div>
);

export default Footer;
