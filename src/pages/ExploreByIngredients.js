import React, { useEffect, useState, useContext } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import ContextRecipes from '../context/ContextRecipes';
import { fetchAPIDrinks, fetchAPIRecipes } from '../services';
import Footer from '../components/Footer';
import Header from '../components/Header';

function ExploreByIngredients() {
  const location = useLocation().pathname;
  const history = useHistory();
  const [data, setData] = useState([]);
  const MAX_NUMBER_OF_CARDS = 12;
  const { setRecipes } = useContext(ContextRecipes);

  const apiIngredients = async () => {
    if (location.includes('comidas')) {
      const apiRequest = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list');
      const response = await apiRequest.json();
      setData(response.meals);
    } else {
      const apiRequest = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list');
      const response = await apiRequest.json();
      setData(response.drinks);
    }
  };

  const handleClick = async (selectIngredient) => {
    if (location.includes('comidas')) {
      const recipesApi = await fetchAPIRecipes('ingredient', selectIngredient);
      setRecipes(recipesApi);
      history.push('/comidas');
    } else {
      const recipesApi = await fetchAPIDrinks('ingredient', selectIngredient);
      setRecipes(recipesApi);
      history.push('/bebidas');
    }
  };

  useEffect(() => {
    apiIngredients();
  }, []);

  return (
    <div>
      <Header title="Explorar Ingredientes" />
      { location.includes('comidas') ? (
        data.map((meals, index) => (
          <div
            type="button"
            key={ index }
            data-testid={ `${index}-ingredient-card` }
            onClick={ () => handleClick(meals.strIngredient) }
            onKeyPress={ handleClick }
            role="button"
            tabIndex="0"
          >
            <img
              data-testid={ `${index}-card-img` }
              alt="food"
              src={ `https://www.themealdb.com/images/ingredients/${meals.strIngredient}-Small.png` }
            />
            <h3
              data-testid={ `${index}-card-name` }
            >
              { meals.strIngredient }
            </h3>
          </div>
        )).filter((_, index) => index < MAX_NUMBER_OF_CARDS)
      ) : (
        data.map((drinks, index) => (
          <div
            type="button"
            key={ index }
            data-testid={ `${index}-ingredient-card` }
            onClick={ () => handleClick(drinks.strIngredient1) }
            onKeyPress={ handleClick }
            role="button"
            tabIndex="0"
          >
            <img
              data-testid={ `${index}-card-img` }
              alt="drink"
              src={ `https://www.thecocktaildb.com/images/ingredients/${drinks.strIngredient1}-Small.png` }
            />
            <h3
              data-testid={ `${index}-card-name` }
            >
              { drinks.strIngredient1 }
            </h3>
          </div>
        )).filter((_, index) => index < MAX_NUMBER_OF_CARDS)
      ) }
      <Footer />
    </div>
  );
}

export default ExploreByIngredients;
