import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';

export default function Footer() {
  return (
    <div className="footer" data-testid="footer">
      <div />
      <Link to="/bebidas" data-testid="drinks-bottom-btn" src={ drinkIcon }>
        <img src={ drinkIcon } alt="Drink icon" />
      </Link>
      <Link to="/explorar" data-testid="explore-bottom-btn" src={ exploreIcon }>
        <img src={ exploreIcon } alt="exploreIcon" />
      </Link>
      <Link to="/comidas" data-testid="food-bottom-btn" src={ mealIcon }>
        <img src={ mealIcon } alt="mealIcon" />
      </Link>
    </div>
  );
}
