import React, { useContext } from 'react';
import RecipesContext from '../context/RecipesContext';
import FoodCard from './FoodCard';
import DrinkCard from './DrinkCard';

function FoodCards() {
  const { resultsFoodsAndDrinks } = useContext(RecipesContext);
  console.log(resultsFoodsAndDrinks)
  const url = document.URL;
  const splitedURL = url.split('/');
  return (
  <div>
    { splitedURL[3] === 'bebidas' ?
      resultsFoodsAndDrinks.drinks.map((element) => <DrinkCard element={ element } key={ element.idDrink }/>) :
      resultsFoodsAndDrinks.meals.map((element) => <FoodCard element={ element } key={ element.idMeal }/>)
    } 
  </div>
  );
}

export default FoodCards;
