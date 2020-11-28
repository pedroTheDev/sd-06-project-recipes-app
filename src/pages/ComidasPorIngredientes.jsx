import React, { useEffect, useState, useContext } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import RecipesAppContext from '../hooks/RecipesAppContext';
import {
  requestApiFoodFilterIngredient,
  requestApiFoodListIngredients,
} from '../services/requestFood';

function ComidaPorIngredientes() {
  const {
    cards: {
      setCardFood,
    },
  } = useContext(RecipesAppContext);

  const [nameIngredients, setNameIngredients] = useState([]);

  useEffect(() => {
    requestApiFoodListIngredients()
      .then((arrayObjIngredients) => {
        const arrayNameIngredients = arrayObjIngredients
          .map((objIngredient) => objIngredient.strIngredient);
        setNameIngredients(arrayNameIngredients);
      });
  }, []);

  const edrfse = async (ingredient) => {
    const arrayIngredients = await requestApiFoodFilterIngredient(ingredient);
    setCardFood(arrayIngredients);
  };

  return (
    <>
      <Header name="Comida por Ingredientes" button={ false } />
      {nameIngredients.slice(0, 12).map((ingredient, index) => (
        <button
          key={ index }
          type="button"
          data-testid={ `${index}-ingredient-card` }
          onClick={ () => edrfse(ingredient) }
        >
          <img
            src={ `https://www.themealdb.com/images/ingredients/${ingredient}-Small.png` }
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

export default ComidaPorIngredientes;
