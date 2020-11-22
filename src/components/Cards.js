import React, { useContext } from 'react';
import Context from '../context/Context';

export default function Cards() {
  const { items } = useContext(Context);

  function handleCards(value) {
    const arr = [];
    const magic = 12;
    const zero = 0;
    if (value.length > magic) {
      for (let index = zero; index < magic; index += 1) {
        arr.push(value[index]);
      }
      return arr;
    }
    return value;
  }

  if (items) {
    if (items.drinks) {
      return (
        <div>
          {handleCards(items.drinks).map((item, index) => (
            <div key={ index } data-testid={ `${index}-recipe-card` }>
              <img
                src={ item.strDrinkThumb }
                data-testid={ `${index}-card-img` }
                alt="imagem de drink"
              />
              <p data-testid={ `${index}-card-name` }>{item.strDrink}</p>
            </div>
          ))}
        </div>
      );
    }
    if (items.meals) {
      return (
        <div>
          {console.log(items.meals)}
          {console.log(items.meals)}
          {handleCards(items.meals).map((item, index) => (
            <div key={ index } data-testid={ `${index}-recipe-card` }>
              <img
                src={ item.strMealThumb }
                data-testid={ `${index}-card-img` }
                alt="imagem de drink"
              />
              <p data-testid={ `${index}-card-name` }>{item.strMeal}</p>
            </div>
          ))}
        </div>
      );
    }
  }
  return (
    <div>Faça uma busca</div>
  );
}
