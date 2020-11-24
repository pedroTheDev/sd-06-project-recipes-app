import React from 'react';
import { useHistory } from 'react-router-dom';
import FoodImage from '../images/mealIcon.svg';
import DrinkImage from '../images/drinkIcon.svg';
import ExploreImage from '../images/exploreIcon.svg';
import './MenuInferior.css';

function MenuInferior() {
  const history = useHistory();
  function redirectComidas() {
    history.push('/comidas');
  }
  function redirectBebidas() {
    history.push('/bebidas');
  }
  function redirectExplorar() {
    history.push('/explorar');
  }
  return (
    <div data-testid="footer" className="MenuInferior">

      <button
        type="button"
        data-testid="drinks-bottom-btn"
        onClick={ redirectBebidas }
      >
        <img src={ DrinkImage } alt="drink-img" />
        Bebidas
      </button>

      <button
        type="button"
        data-testid="explore-bottom-btn"
        onClick={ redirectExplorar }
      >
        <img src={ ExploreImage } alt="explore-img" />
        Explorar
      </button>

      <button
        type="button"
        data-testid="food-bottom-btn"
        onClick={ redirectComidas }
      >
        <img src={ FoodImage } alt="food-img" />
        Comidas
      </button>
    </div>
  );
}
export default MenuInferior;
