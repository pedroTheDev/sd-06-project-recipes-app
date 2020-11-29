import React, { useEffect, useState, useContext } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import RecipesAppContext from '../hooks/RecipesAppContext';
import {
  requestApiFoodFilterIngredient,
  requestApiFoodListIngredients,
} from '../services/requestFood';

function ComidaPorIngredientes({ history }) {
  const {
    cards: {
      setCardFood,
    },
  } = useContext(RecipesAppContext);

  const [nameIngredientsFood, setNameIngredientsFood] = useState([]);

  useEffect(() => {
    requestApiFoodListIngredients()
      .then((arrayObjIngredients) => {
        const arrayNameIngredientsFood = arrayObjIngredients
          .map((objIngredient) => objIngredient.strIngredient);
        setNameIngredientsFood(arrayNameIngredientsFood);
      });
  }, []);

  const onClickIngredient = async (ingredient) => {
    const arrayIngredients = await requestApiFoodFilterIngredient(ingredient);
    setCardFood(arrayIngredients);
    history.push('/comidas');
  };

  return (
    <>
      <Header name="Comida por Ingredientes" button={ false } />
      {nameIngredientsFood.slice(0, 12).map((ingredient, index) => (
        <button
          key={ index }
          type="button"
          data-testid={ `${index}-ingredient-card` }
          onClick={ () => onClickIngredient(ingredient) }
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
