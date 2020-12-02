import React, { useEffect, useState } from 'react';
import '../Css/inProgress.css';

function CheckboxInProgress({ ingredients }) {
  const [myIngredients, setIngredients] = useState([]);

  const handleChange = (index) => {
    const value = !myIngredients[index].checkbox;
    const markedCheckbox = myIngredients;
    markedCheckbox[index].checkbox = value;
    setIngredients(markedCheckbox);
  };

  useEffect(() => {
    // const recipeCheckbox = myIngredients.map((item) => item.checkbox);
    setIngredients(ingredients);
  }, []);

  return (
    <div>
      <form className="form-checkbox">
        {myIngredients.map((item, index) => (
          <label
            htmlFor="checkbox"
            key={ index }
          >
            <input
              onChange={ () => handleChange(index) }
              checked={ item.checked }
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
