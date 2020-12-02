import React from 'react';
import { Link } from 'react-router-dom';

import '../style/footer.css';

import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';

function Footer() {
  return (

    <div
      data-testid="footer"
      className="footer"
    >
      <footer className="footer">
        <Link to="/bebidas" className="footer-link">
          <button
            aria-label="drinks-btn"
            type="button"
            src={ drinkIcon }
            data-testid="drinks-bottom-btn"
            className="footer-drinks-button"
          />
        </Link>
        <Link to="/explorar" className="footer-link">
          <button
            aria-label="explore-btn"
            type="button"
            src={ exploreIcon }
            data-testid="explore-bottom-btn"
            className="footer-explore-button"
          />
        </Link>
        <Link to="/comidas" className="footer-link">
          <button
            aria-label="meal-btn"
            type="button"
            src={ mealIcon }
            data-testid="food-bottom-btn"
            className="footer-meals-button"
          />
        </Link>
      </footer>
    </div>
  );
}

export default Footer;
