import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

function IngredientsCheck({ recipe, path, id }) {
  const { ingredients = [], measures = [] } = recipe;
  const [ingredientsCheck, setIngredientsCheck] = useState({});

  const getLocalStorageInfo = () => JSON.parse(localStorage.getItem('inProgressRecipes'));

  const toggleIngredientCheck = (event) => {
    const ingredientId = event.target.id;
    const newcheckedIngredients = {
      ...ingredientsCheck,
      [ingredientId]: !ingredientsCheck[ingredientId],
    };
    setIngredientsCheck(newcheckedIngredients);
  };

  const saveProgressInLocalStorage = () => {
    console.log('Recipe id:', recipe.id);
    if (recipe.id === undefined) return null;
    const settedIngredients = Object.keys(ingredientsCheck);
    const status = Object.values(ingredientsCheck);
    const currentCheckedIngredients = JSON.parse(localStorage.getItem(
      'inProgressRecipes',
    )) || { meals: {}, cocktails: {} };
    console.log(currentCheckedIngredients);
    const key = path === 'comidas' ? 'meals' : 'cocktails';
    const checkedIngToLocalStorage = settedIngredients.filter((ingredient, index) => (
      status[index]
    ));
    currentCheckedIngredients[key][recipe.id] = checkedIngToLocalStorage;
    localStorage.setItem('inProgressRecipes', JSON.stringify(currentCheckedIngredients));
  };

  useEffect(() => {
    const key = path === 'comidas' ? 'meals' : 'cocktails';

    const retrievedLocalStorageInfo = getLocalStorageInfo();

    if (retrievedLocalStorageInfo === null) {
      console.log('sem local storage');
    } else if (retrievedLocalStorageInfo[key][id] !== undefined) {
      console.log('local storage existe, mas TEM a chave desta receita');

      const savedIngredients = retrievedLocalStorageInfo[key][id];

      const unCheckedIngredients = ingredients.filter((ingredient) => (
        !savedIngredients.includes(ingredient)
      ));

      const ingredientsObj = {};

      unCheckedIngredients.forEach((ingredient) => {
        ingredientsObj[ingredient] = false;
      });

      savedIngredients.forEach((ingredient) => {
        ingredientsObj[ingredient] = true;
      });

      setIngredientsCheck(ingredientsObj);
    }
  }, []);

  useEffect(() => {
    const minLength = 0;
    if (recipe.id !== undefined && (Object.keys(ingredientsCheck)).length > minLength) {
      saveProgressInLocalStorage();
    }
  }, [ingredientsCheck]);

  const handleCheckClick = (event) => {
    toggleIngredientCheck(event);
    saveProgressInLocalStorage();
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
              // checked
              checked={ ingredientsCheck[ingredient] }
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
  path: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

export default IngredientsCheck;
