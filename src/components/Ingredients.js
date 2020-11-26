import React from 'react';

function Ingredients(props) {
  const { ingredients=[], measures=[] } = props.recipe;
  return (
  <ul>
    {ingredients.map((ingredient, index) => (
      <li
        key={ingredient}
        data-testid={`${index}-ingredient-name-and-measure`}
      >
        { `${ingredient} - ${measures[index]}`}
      </li>
    ))}
  </ul>
  );
}

export default Ingredients;
