import React, { useEffect /*useState*/ } from 'react';
import '../Css/inProgress.css';

function CheckboxInProgress(ingredients) {
  //const [checked, setChecked] = useState([]);

  /*const handleChange = (index) => {
    const value = !recipeInProgress.ingredients[index].checkbox;
    recipeInProgress.ingredients[index].checkbox = value;
    setRecipeInProgress(recipeInProgress);
  };*/
  useEffect(() => {
    const recipeCheckbox = ingredients.map((item) => item.checkbox);
    console.log(recipeCheckbox);
  }, []);

  return (
    <div>
      <h1>lalala</h1>
      {/*<form className="form-checkbox">
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
      </form>*/}
    </div>
  );
}

export default CheckboxInProgress;
