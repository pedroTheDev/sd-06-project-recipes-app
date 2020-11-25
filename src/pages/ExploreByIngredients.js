import React, { useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { useLocation, useHistory } from 'react-router-dom';
import ContextRecipes from '../context/ContextRecipes';
import Footer from '../components/Footer';
import Header from '../components/Header';

function ExploreByIngredients(props) {
  const location = useLocation().pathname;
  const history = useHistory();
  const [data, setData] = useState([]);
  const MAX_NUMBER_OF_CARDS = 12;
  const { setSelectedRadio,
    setIdRecipe, setRecipes, setSearchText } = useContext(ContextRecipes);
  const { fetchApi } = props;

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

  // const renderCards = (recipeApi) => {
  //   if (!recipeApi) {
  //     alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
  //   } else if (recipeApi.length === 1) {
  //     if (location === '/comidas') {
  //       const idRecipe = recipeApi[0].idMeal;
  //       setIdRecipe(idRecipe);
  //       history.push(`/comidas/${idRecipe}`);
  //     } else {
  //       const idRecipe = recipeApi[0].idDrink;
  //       setIdRecipe(idRecipe);
  //       history.push(`/bebidas/${idRecipe}`);
  //     }
  //   }
  // };

  const handleClick = async (selectIngredient) => {
    if (location.includes('comidas')) {
      history.push('/comidas');
      // setSelectedRadio('ingredient');
      // setSearchText(selectIngredient);
      // const recipesApi = await fetchApi('ingredient', selectIngredient);
      // setRecipes(recipesApi);
      // renderCards(recipesApi);
    } else {
      history.push('/bebidas');
      // setSelectedRadio('ingredient');
      // setSearchText(selectIngredient);
      // const recipesApi = await fetchApi('ingredient', selectIngredient);
      // setRecipes(recipesApi);
      // renderCards(recipesApi);
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
            key={ index }
            data-testid={ `${index}-ingredient-card` }
            onClick={ () => handleClick(meals.strIngredient) }
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
            key={ index }
            data-testid={ `${index}-ingredient-card` }
            onClick={ () => handleClick(drinks.strIngredient) }
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

ExploreByIngredients.propTypes = {
  fetchApi: PropTypes.func.isRequired,
};

export default ExploreByIngredients;
