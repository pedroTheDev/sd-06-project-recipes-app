import React, { useEffect, useState } from 'react';
import { Header, Footer } from '../components';
import RecipesMealsCards from '../components/RecipesMealsCards';

function ComidasPorLocalOrigem() {
  const [areas, setAreas] = useState([]);

  const fetchAPI = () => {
    const URL = 'https://www.themealdb.com/api/json/v1/1/list.php?a=list';
    return fetch(URL)
      .then(((response) => response.json().then((json) => (
        response.ok ? Promise.resolve(json) : Promise.reject(json)
      ))));
  }

  useEffect(() => {
    fetchAPI().then(response => setAreas(response.meals));
  }, []);

  return (
    <div>
      <Header title="Explorar Origem" />
      <select
        data-testid="explore-by-area-dropdown"
      >
        { areas.map(({ strArea }) => (
          <option
            data-testid={`${strArea}-option`}
            key={ strArea }
          >
            { strArea }
          </option>
        )) }
      </select>
      <RecipesMealsCards categories="none"/>
      <Footer />
    </div>
  );
}

export default ComidasPorLocalOrigem;
