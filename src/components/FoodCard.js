import React from 'react';

function Card(props) {
  const { strMeal, strMealThumb } = props.element;
  return (
    <div>
      <h2>{ strMeal }</h2>
      <img src={ strMealThumb } />
    </div>
  );
}

export default Card;
