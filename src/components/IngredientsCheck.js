import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

function IngredientsCheck({ recipe, path }) {
  const { ingredients = [], measures = [] } = recipe;
  const [ingredientsCheck, setIngredientsCheck] = useState({});

  const getLocalStorageInfo = () => {
    return JSON.parse(localStorage.getItem('inProgressRecipes'));
  };
  useEffect(() => {
    const retrievedLocalStorageInfo = getLocalStorageInfo();
    const key = path === 'comidas' ? 'meals' : 'cocktails';
    if (retrievedLocalStorageInfo[key][recipe.id] !== undefined) {
      const ingredientsObj = {};
      ingredients.forEach((ingredient) => {
        ingredientsObj[ingredient] = false;
    });
    }
    const ingredientsObj = {};
    ingredients.forEach((ingredient) => {
      ingredientsObj[ingredient] = false;
    });
    setIngredientsCheck(ingredientsObj);
  }, [recipe]);

  useEffect(() => {
    if (recipe.id !== undefined && (Object.keys(ingredientsCheck)).length > 0) {
      console.log(Object.keys(ingredientsCheck).length);
      saveProgressInLocalStorage();
    }
  }, [ingredientsCheck]);

  const toggleIngredientCheck = (event) => {
    const ingredientId = event.target.id;
    const newcheckedIngredients = {
      ...ingredientsCheck,
      [ingredientId]: !ingredientsCheck[ingredientId],
    };
    setIngredientsCheck(newcheckedIngredients);
  };

  const saveProgressInLocalStorage = () => {
    console.log('Recipe id:' , recipe.id);
    if(recipe.id === undefined) return null;
    const ingredients = Object.keys(ingredientsCheck);
    const status = Object.values(ingredientsCheck);
    const currentCheckedIngredients = JSON.parse(localStorage.getItem(
      'inProgressRecipes'
    )) || {'meals': {}, 'cocktails': {}};
    console.log(currentCheckedIngredients);
    const key = path === 'comidas' ? 'meals' : 'cocktails';
    const checkedIngToLocalStorage = ingredients.filter((ingredient, index) => (
      status[index]
    ));
    currentCheckedIngredients[key][recipe.id] = checkedIngToLocalStorage;
    localStorage.setItem('inProgressRecipes', JSON.stringify(currentCheckedIngredients));
  };

  const handleCheckClick = (event) => {
    toggleIngredientCheck(event);
  };

  return (
    <ul>
      {ingredients.map((ingredient, index) => (
        <li
          key={ ingredient }
          data-testid={ `${index}-ingredient-step` }
        >
          <label htmlFor={ `${ingredient}` }>
            <input
              className={ ingredientsCheck[ingredient] && 'checked' }
              type="checkbox"
              id={ `${ingredient}` }
              onClick={ (event) => handleCheckClick(event) }
            />
            <span
              className={ ingredientsCheck[ingredient] && 'checked-text' }
            >
              {`${ingredient} - ${measures[index]}`}
            </span>
          </label>
        </li>
      ))}
    </ul>
  );
}
IngredientsCheck.propTypes = {
  recipe: PropTypes.shape.isRequired,
};

export default IngredientsCheck;
