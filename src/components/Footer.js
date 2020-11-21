import React from 'react';
import { Link } from 'react-router-dom';
import DrinksIcon from '../images/drinkIcon.svg';
import ExploreIcon from '../images/exploreIcon.svg';
import MealIcon from '../images/mealIcon.svg';

export default function Footer() {
  return (
    <footer data-testid="footer">
      <Link to="/bebidas">
        <img src={ DrinksIcon } alt="Drinks" data-testid="drinks-bottom-btn" />
      </Link>
      <Link to="/explorar">
        <img src={ ExploreIcon } alt="Profile" data-testid="explore-bottom-btn" />
      </Link>
      <Link to="/comidas">
        <img src={ MealIcon } alt="Profile" data-testid="food-bottom-btn" />
      </Link>
    </footer>);
}
