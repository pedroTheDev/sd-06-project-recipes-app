/* import React, { useEffect, useState, useContext } from "react";
import MealsContext from "../context/MealsContext";
import { useLocation } from 'react-router-dom';
import { getIngredients } from "../services/mealsAPI";
import { getIngredientsDrinks } from "../services/drinksAPI";
import IngredientsCard from './IngredientsCard';
import '../Css/IngredientsList.css';

function IngredientsList() {
  const { drinkIngredients,
    cardsList,
    setCardsList,
    ingredients } = useContext(MealsContext);
  const [cardsIngredients, setcardsIngredients] = useState([]);
  const [IngredientsSelected, setIngredientsSelected] = useState([]);
  const location = useLocation();

  if (location.pathname === '/explorar/comidas') {
    if (ingredients[0] !== undefined && cardsIngredients[0] === undefined) {
      setcardsIngredients(ingredients);
    } else if (location.pathname === '/explorar/bebidas') {
      if (ingredients[0] !== undefined && cardsIngredients[0] === undefined) {
        setcardsIngredients(ingredients);
      }
    }
  }
}

export default IngredientsList;
 */
