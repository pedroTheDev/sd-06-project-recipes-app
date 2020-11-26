import React, { useState, useEffect, useContext } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import ContextRecipes from '../context/ContextRecipes';

function ExploreByOrigin() {
  const location = useLocation().pathname;
  const history = useHistory();
  const [data, setData] = useState([]);
  const { setRecipes, recipes } = useContext(ContextRecipes);
  const MAX_NUMBER_OF_CARDS = 12;

  const fetchRecipes = async () => {
    const apiRequest = await fetch('https://www.themealdb.com/api/json/v1/1/filter.php?a=Canadian');
    const response = await apiRequest.json();
    const recipesApi = response.meals;
    setRecipes(recipesApi);
  };

  // https://www.themealdb.com/api/json/v1/1/filter.php?a=Canadian - como fazer o acesso ao valor específico do valor selecionado na option?? sem quebrar o código?

  const apiOrigin = async () => {
    if (location.includes('comidas')) {
      const apiRequest = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list');
      const response = await apiRequest.json();
      console.log(response.meals);
      setData(response.meals);
    } else {
      history.push('/explorar/bebidas/area');
    }
  };

  useEffect(() => {
    apiOrigin();
  }, []);

  useEffect(() => {
    fetchRecipes();
  }, []);

  return (
    <div>
      { location.includes('comidas') ? (
        <div>
          <Header title="Explorar Origem" showSearchIcon />
          <div>
            <select
              data-testid="explore-by-area-dropdown"
            >
              <option value="all" data-testid="All-option">All</option>
              { data.map((foodsArea, index) => (
                <option
                  key={ index }
                  value={ foodsArea.strArea }
                  data-testid={ `${foodsArea.strArea}-option` }
                >
                  { foodsArea.strArea }
                </option>
              ))}
            </select>
          </div>
          { recipes.map((recipe, index) => (
            <div
              key={ index }
              id={ recipe.idMeal }
              data-testid={ `${index}-recipe-card` }
              onClick={ () => history.push(`/comidas/${recipe.idMeal}`) }
              onKeyPress={ () => history.push(`/comidas/${recipe.idMeal}`) }
              role="button"
              tabIndex="0"
            >
              <p data-testid={ `${index}-card-name` }>{ recipe.strMeal }</p>
              <img
                data-testid={ `${index}-card-img` }
                src={ recipe.strMealThumb }
                alt={ `${index}-food` }
                aria-hidden="true"
                width="100px"
              />
            </div>
          )).filter((_, index) => index < MAX_NUMBER_OF_CARDS) }
          <Footer />
        </div>
      ) : (
        <div>
          <h1>Not Found</h1>
        </div>
      )}
    </div>
  );
}

export default ExploreByOrigin;
