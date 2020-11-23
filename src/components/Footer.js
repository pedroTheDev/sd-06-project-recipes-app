import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { drinkIcon, mealIcon, exploreIcon } from '../images';

export default class Footer extends Component {
  render() {
    return (
      <footer data-testid="footer">
        <nav>
          <p data-testid="drinks-bottom-btn">
            <Link to="/bebidas">
              Drinks
              <img
                src={ drinkIcon }
                alt="Imagem de drink"
                height="25"
              />
            </Link>
          </p>
          <p data-testid="food-bottom-btn">
            <Link to="/comidas">
              Alimento
              <img
                src={ mealIcon }
                alt="Imagem de alimento"
                height="25"
              />
            </Link>
          </p>
          <p data-testid="explore-bottom-btn">
            <Link to="explorar">
              Explore
              <img
                src={ exploreIcon }
                alt="Explore o Site"
                height="25"
              />
            </Link>
          </p>
        </nav>
      </footer>
    );
  }
}
