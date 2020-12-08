import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

function Checkbox({ recipe, index, measure, item, url, id }) {
  const [usedIngredients, setUsedIngredients] = useState([]);
  const isFood = url.includes('comidas');
  console.log(usedIngredients)
  console.log(JSON.parse(localStorage.getItem('inProgressRecipes')).meals[`${id}`])

  useEffect(() => {
    if (isFood) {
      setUsedIngredients(
        JSON.parse(localStorage.getItem('inProgressRecipes')).meals[`${id}`]
      );
    } else {
      setUsedIngredients(
        JSON.parse(localStorage.getItem('inProgressRecipes')).cocktails[`${id}`]
      );
    }
  }, []);

  const handleClick = (isChecked, ingredient) => {
    if (isChecked) {
      setUsedIngredients([...usedIngredients, ingredient]);
    } else {
      setUsedIngredients(usedIngredients.filter((item) => item !== ingredient));
    }
  };

  const handleUsedIngredient = () => {
    const inProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (isFood) {
      const newInProgress = {
        ...inProgress,
        meals: {
          ...inProgress.meals,
          [id]: [...usedIngredients],
        },
      };
      localStorage.setItem('inProgressRecipes', JSON.stringify(newInProgress));
    } else {
      const newInProgress = {
        ...inProgress,
        cocktails: {
          ...inProgress.meals,
          [id]: [...usedIngredients],
        },
      };
      localStorage.setItem('inProgressRecipes', JSON.stringify(newInProgress));
    }
  };

  useEffect(() => {
    handleUsedIngredient();
  }, [usedIngredients]);

  
  return (
    <div data-testid="ingredient-step">
      {usedIngredients.some((ingredient) => item === ingredient) ?
        <input
          type="checkbox"
          key={ index }
          checked
          onClick={ ({ target }) => (
            handleClick(target.checked, item)
          ) }
          id={ `step-${index}` }
          data-testid={ `${index}-ingredient-name-and-measure` }
        />
        : (
          <input
          type="checkbox"
          key={ index }
          onClick={ ({ target }) => (
            handleClick(target.checked, item)
          ) }
          id={ `step-${index}` }
          data-testid={ `${index}-ingredient-name-and-measure` }
        />
        )}
      <label htmlFor={ `step-${index}` }>
        {`- ${item} - ${measure[index]} `}
      </label>
    </div>
  );
}

Checkbox.propTypes = {
  recipe: PropTypes.objectOf(PropTypes.string).isRequired,
  index: PropTypes.number.isRequired,
  measure: PropTypes.arrayOf(PropTypes.string).isRequired,
  item: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};

export default Checkbox;
