import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import mealsContext from './MealsContext';
import { getAllDrinkTypesApi, getFilteredDrinksApi,
  getDrinksAlcoholic } from '../services/drinksAPI';
import { getAllRecipeTypesApi, getFilteredRecipesApi } from '../services/mealsAPI';

function MyProvider({ children }) {
  const [categories, setCategories] = useState([]);
  const [areas, setAreas] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [drinkCategories, setDrinkCategories] = useState([]);
  const [alcoholic, setAlcoholic] = useState([]);
  const [drinkIngredients, setDrinkIngredients] = useState([]);
  const [glasses, setGlasses] = useState([]);
  const [disable, setDisable] = useState(true);
  const [user, setUser] = useState({ email: '' });
  const [showSearchBar, setSearchBar] = useState(false);
  const [recommendedRecipe, setRecommendedRecipe] = useState([]);
  const [cardsRecipe, setCardsRecipe] = useState([]);
  const [drinksAlcoholic, setDrinksAlcoholic] = useState({});

  useEffect(() => {
    async function fetchALL() {
      const myCategories = await getAllRecipeTypesApi('c');
      const myAreas = await getAllRecipeTypesApi('a');
      const myIngredients = await getAllRecipeTypesApi('i');
      setCategories(myCategories);
      setAreas(myAreas);
      setIngredients(myIngredients);

      const myDrinkCategories = await getAllDrinkTypesApi('c');
      const myAlcoholic = await getAllDrinkTypesApi('a');
      const myDrinkIngredients = await getAllDrinkTypesApi('i');
      const myGlasses = await getAllDrinkTypesApi('g');
      const myDrinksAlcoholic = await getDrinksAlcoholic();
      setDrinkCategories(myDrinkCategories);
      setAlcoholic(myAlcoholic);
      setDrinkIngredients(myDrinkIngredients);
      setGlasses(myGlasses);
      setDrinksAlcoholic(myDrinksAlcoholic);
    }
    fetchALL();
  }, []);

  const contextValue = {
    categories,
    areas,
    ingredients,
    drinkCategories,
    alcoholic,
    drinkIngredients,
    glasses,
    disable,
    setDisable,
    user,
    setUser,
    showSearchBar,
    setSearchBar,
    recommendedRecipe,
    setRecommendedRecipe,
    getFilteredRecipesApi,
    getFilteredDrinksApi,
    cardsRecipe,
    setCardsRecipe,
    drinksAlcoholic,
  };

  return (
    <mealsContext.Provider value={ contextValue }>
      {children}
    </mealsContext.Provider>
  );
}

MyProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MyProvider;
