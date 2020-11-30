import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import inProgressContext from '../contexts/inProgressContext';

function IngredientsCheck({ recipe, path, id }) {
  const { ingredients = [], measures = [] } = recipe;
  const [ingredientsCheck, setIngredientsCheck] = useState({});
  const { setDisableButton } = useContext(inProgressContext);
  const [isLoading, setIsLoading] = useState(true);

  const getLocalStorageInfo = () => JSON.parse(localStorage.getItem('inProgressRecipes'));

  const toggleIngredientCheck = (event) => {
    const ingredientName = event.target.id;
    const newCheckedIngredients = {
      ...ingredientsCheck,
      [ingredientName]: !ingredientsCheck[ingredientName],
    };
    if (newCheckedIngredients[ingredientName] === false) {
      delete newCheckedIngredients[ingredientName];
    }
    setIngredientsCheck(newCheckedIngredients);
  };

  const saveProgressInLocalStorage = () => {
    if (recipe.id === undefined) return null;
    const settedIngredients = Object.keys(ingredientsCheck);
    const status = Object.values(ingredientsCheck);
    const currentCheckedIngredients = JSON.parse(localStorage.getItem(
      'inProgressRecipes',
    )) || { meals: {}, cocktails: {} };
    const key = path === 'comidas' ? 'meals' : 'cocktails';
    const checkedIngToLocalStorage = settedIngredients.filter((ingredient, index) => (
      status[index]
    ));
    currentCheckedIngredients[key][recipe.id] = checkedIngToLocalStorage;
    localStorage.setItem('inProgressRecipes', JSON.stringify(currentCheckedIngredients));
  };

  useEffect(() => {
    if (Object.keys(ingredientsCheck).length >= 1) {
      const allIngredients = [...ingredients];
      const checkedIngredients = Object.keys({ ...ingredientsCheck });

      if (allIngredients.length === checkedIngredients.length) {
        setDisableButton(false);
      } else {
        setDisableButton(true);
      }
    }
  }, [ingredientsCheck, recipe]);

  useEffect(() => {
    const key = path === 'comidas' ? 'meals' : 'cocktails';

    const retrievedLocalStorageInfo = getLocalStorageInfo();

    if (retrievedLocalStorageInfo === null) {
      return null;
    } if (retrievedLocalStorageInfo[key][id] !== undefined) {
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
    if (recipe.id !== undefined && (Object.keys(ingredientsCheck)).length >= minLength) {
      saveProgressInLocalStorage();
    }
  }, [ingredientsCheck]);

  useEffect(() => {
    if (recipe.id !== undefined) {
      setIsLoading(false);
    } else {
      setIsLoading(true);
    }
  }, [recipe]);

  const handleCheckClick = (event) => {
    toggleIngredientCheck(event);
    // saveProgressInLocalStorage();
  };

  return (
    <div>
      {!isLoading
        ? (
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
          </ul>)
        : false }
    </div>
  );
}
IngredientsCheck.propTypes = {
  recipe: PropTypes.shape.isRequired,
  path: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

export default IngredientsCheck;
