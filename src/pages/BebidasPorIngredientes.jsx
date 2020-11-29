import React, { useContext, useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import RecipesAppContext from '../hooks/RecipesAppContext';
import {
  requestApiDrinkFilterIngredient,
  requestApiDrinkListIngredients,
} from '../services/requestDrink';

function BebidasPorIngredientes({ history }) {
  const {
    cards: {
      setCardDrink,
    },
  } = useContext(RecipesAppContext);

  const [nameIngredientsDrink, setNameIngredientsDrink] = useState([]);

  useEffect(() => {
    requestApiDrinkListIngredients()
      .then((arrayObjIngredients) => {
        const arrayNameIngredientsDrink = arrayObjIngredients
          .map((objIngredient) => objIngredient.strIngredient1);
        setNameIngredientsDrink(arrayNameIngredientsDrink);
      });
  }, []);

  const onClickIngredient = async (ingredient) => {
    const arrayIngredients = await requestApiDrinkFilterIngredient(ingredient);
    setCardDrink(arrayIngredients);
    history.push('/bebidas');
  };

  return (
    <>
      <Header name="Explorar Ingredientes" button={ false } />
      {nameIngredientsDrink.slice(0, 12).map((ingredient, index) => (
        <button
          key={ index }
          type="button"
          data-testid={ `${index}-ingredient-card` }
          onClick={ () => onClickIngredient(ingredient) }
        >
          <img
            src={ `https://www.thecocktaildb.com/images/ingredients/${ingredient}-Small.png` }
            alt={ ingredient }
            data-testid={ `${index}-card-img` }
          />
          <p
            data-testid={ `${index}-card-name` }
          >
            { ingredient }
          </p>
        </button>
      ))}
      <Footer />
    </>
  );
}

export default BebidasPorIngredientes;
