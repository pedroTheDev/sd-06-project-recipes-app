import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
  return (
    <div className="footer" data-testid="footer">
      <div />
      <Link to="/bebidas" data-testid="drinks-bottom-btn">
        <img src="./images/drinkIcon.svg" alt="Drink icon" />
      </Link>
      <Link to="/explorar" data-testid="explore-bottom-btn">
        <img src="./images/exploreIcon.svg" alt="exploreIcon" />
      </Link>
      <Link to="/comida" data-testid="food-bottom-btn">
        <img src="./images/mealIcon.svg" alt="mealIcon" />
      </Link>
    </div>
  );
}
