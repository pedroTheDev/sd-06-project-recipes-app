import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { Footer, Header } from '../components';

function BebidasPorIngrediente() {
  const [ingredientsDrink, setIngredientsDrink] = useState([]);
  const [redirect, setRedirect] = useState(false);
  const [setDataDrink] = useState([]);
  const zero = 0;
  const twelve = 12;

  const getDrinkByIngredients = (ingredient) => {
    const URL = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`;
    return fetch(URL).then((response) => response.json().then((json) => (
      response.ok ? Promise.resolve(json) : Promise.reject(json)
    )));
  };

  const getDrinkIngredients = () => {
    const URL = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list';
    return fetch(URL).then((response) => response.json().then((json) => (
      response.ok ? Promise.resolve(json) : Promise.reject(json)
    )));
  };

  const clickOn = (ingredients) => {
    getDrinkByIngredients(ingredients).then((data) => {
      setDataDrink(data.drinks);
      setRedirect(true);
    });
  };

  useEffect(() => {
    getDrinkIngredients().then((data) => setIngredientsDrink(data.drinks));
  }, []);

  if (ingredientsDrink.length > twelve) {
    return setIngredientsDrink(ingredientsDrink.slice(zero, twelve));
  }
  if (redirect) return <Redirect to="/bebidas" />;

  return (
    <div>
      <Header title="Explorar Ingredientes" />
      {ingredientsDrink.map((ingredients, index) => (
        <button
          key={ ingredients.strIngredient1 }
          type="button"
          data-testid={ `${index}-ingredient-card` }
          onClick={ () => clickOn(ingredients.strIngredient1) }
        >
          <img
            data-testid={ `${index}-card-img` }
            src={ `https://www.thecocktaildb.com/images/ingredients/${ingredients.strIngredient1}-Small.png` }
            alt={ ingredients.strIngredient1 }
          />
          <p
            data-testid={ `${index}-card-name` }
          >
            { ingredients.strIngredient1 }
          </p>
        </button>
      ))}
      <Footer />
    </div>
  );
}

export default BebidasPorIngrediente;
