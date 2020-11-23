import React from 'react';

function Card(props) {
  const { strDrink, strDrinkThumb } = props.element;
  return (
    <div>
      <h2>{ strDrink }</h2>
      <img src={ strDrinkThumb } />
    </div>
  );
}

export default Card;
