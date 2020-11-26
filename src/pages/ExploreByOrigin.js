import React, { useState, useEffect, useContext } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Card from '../components/Card';
import { fetchAPIRecipes } from '../services';
import ContextRecipes from '../context/ContextRecipes';

function ExploreByOrigin() {
  const location = useLocation().pathname;
  const history = useHistory();
  const [data, setData] = useState([]);
  const { setRecipes, showCard, setShowCard, recipes } = useContext(ContextRecipes);
  const MAGIC_NUMBER_ZERO = 0;

  const fetchRecipes = async () => {
      const apiRequest = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=Canadian`);
      const response = await apiRequest.json();
      const recipesApi = response.meals;
      setRecipes(recipesApi);
      setShowCard(true);
  };

  useEffect(() => {
    if (recipes.length === MAGIC_NUMBER_ZERO) {
      fetchRecipes();
    } else {
      setShowCard(true);
    }
  }, []);

  const apiOrigin = async () => {
    if (location.includes('comidas')) {
      const apiRequest = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list');
      const response = await apiRequest.json();
      console.log(response.meals);
      setData(response.meals);
    } else {
      history.push('/explorar/bebidas/area')
    }
  };

  useEffect(() => {
    apiOrigin();
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
          {showCard && <Card />}
          <Footer />
        </div>
      ) : (
        <div>
          <h1>Not Found</h1>
        </div>
      )}
    </div>
  )
}

export default ExploreByOrigin;
