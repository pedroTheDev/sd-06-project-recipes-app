import React from 'react';
import '../Css/inProgress.css';

const handleChange = (index) => {
  const value = !recipeInProgress.ingredients[index].checkbox;
  recipeInProgress.ingredients[index].checkbox = value;
  setRecipeInProgress(recipeInProgress);
};

function CheckboxInProgress() {
  return (
    <div>
      <form className="form-checkbox">
        {recipeInProgress.ingredients.map((item, index) => (
          <label
            htmlFor="checkbox"
            key={ index }
          >
            <input
              onChange={ () => handleChange(index) }
              checked={ item.checkbox }
              type="checkbox"
              name="checkbox"
              id="checkbox"
              data-testid={ `${index}-ingredient-step` }
            />
            { ` ${item.ingredient} (${item.measure})` }
          </label>
        ))}
      </form>
    </div>
  );
}

export default CheckboxInProgress;
