import React, { Component } from 'react';
import { drinkIcon, mealIcon, exploreIcon } from '../images';


export default class Footer extends Component {

  render() {
    return (
      <footer data-testid="footer">
        <p data-testid="drinks-bottom-btn">
          <a>
            Drinks
            <img
              src={ drinkIcon }
              alt="Imagem de drink"
              height="25"
            />
          </a>
        </p>
        <p data-testid="food-bottom-btn">
          <a>
            Alimento
            <img
              src={ mealIcon }
              alt="Imagem de alimento"
              height="25"
            />
          </a>
        </p>
        <p data-testid="explore-bottom-btn">
          <a>
            Explore
            <img
              src={ exploreIcon }
              alt="Explore o Site"
              height="25"
            />
          </a>
        </p>
      </footer>
    )
  }
}
