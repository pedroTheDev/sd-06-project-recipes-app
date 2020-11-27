import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

function IngredientsCheck({ recipe }) {
  const { ingredients = [], measures = [] } = recipe;
  const [checkedIngredients, setCheckedIngredients] = useState({});

  useEffect(() => {
    const ingredientsObj = {};
    ingredients.forEach((ingredient) => {
      ingredientsObj[ingredient] = false;
    });
    setCheckedIngredients(ingredientsObj);
  }, [recipe]);
  console.log(checkedIngredients);

  const handleCheckClick = (event) => {
    console.log(event.target.id);
    const ingredientId = event.target.id;
    const newcheckedIngredients = {
      ...checkedIngredients,
      [ingredientId]: !checkedIngredients[ingredientId],
    };
    setCheckedIngredients(newcheckedIngredients);
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
              className={ checkedIngredients[ingredient] && 'checked' }
              type="checkbox"
              id={ `${ingredient}` }
              onClick={ (event) => handleCheckClick(event) }
            />
            <span
              className={ checkedIngredients[ingredient] && 'checked-text' }
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
