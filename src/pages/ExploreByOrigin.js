import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';

function ExploreByOrigin() {
  const location = useLocation().pathname;
  const [data, setData] = useState([]);

  const apiOrigin = async () => {
    if (location.includes('comidas')) {
      const apiRequest = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list');
      const response = await apiRequest.json();
      console.log(response.meals)
      setData(response.meals);
    } else {
      const apiRequest = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?a=list');
      const response = await apiRequest.json();
      setData(response.drinks);
    }
  };

  useEffect(() => {
    apiOrigin();
  }, []);

  return(
    <div>
      <Header title="Explorar Origem" showSearchIcon />
      { location.includes('comidas') ? (
        <select
          data-testid="explore-by-area-dropdown"
        >
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
      ) : (
        <select
          data-testid="explore-by-area-dropdown"
        >
          { data.map((drinksArea, index) => (
            <option
              key={ index }
              value={ drinksArea.strAlcoholic }
              data-testid={ `${drinksArea.strArea}-option` }
            >
              { drinksArea.strAlcoholic }
            </option>
          ))}
        </select>
      ) }
      <Footer />
    </div>
  )
}

export default ExploreByOrigin;
