import React from 'react';
import { Link } from 'react-router-dom';
import './footer.css';
import DrinkIcon from '../images/drinkIcon.svg';
import ExploreIcon from '../images/exploreIcon.svg';
import MealIcon from '../images/mealIcon.svg';

function Footer() {
  return (
    <footer data-testid="footer">
      <a data-testid="drinks-bottom-btn" href="/explorar"><img src={ExploreIcon} alt="explore" /></a>
      <a data-testid="explore-bottom-btn" href="/bebidas"><img src={DrinkIcon} alt="drink" /></a>
      <a data-testid="food-bottom-btn" href="/comidas"><img src={MealIcon} alt="meal" /></a>
    </footer>
  );
}

export default Footer;
