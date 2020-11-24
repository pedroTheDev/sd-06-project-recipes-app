import React, { useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import MealsCard from '../components/MealsCard';
import Footer from '../components/Footer';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import ReceitasContext from '../context/ReceitasContext';
import FoodFilters from '../components/FoodFilters';

import { foodApi } from '../services/foodAPI';

const Comidas = (history) => {
  const { searchBox, meals, setMeals,stopApi, setStopApi  } = useContext(ReceitasContext);

  const location = useLocation();

  useEffect(() => {
    if (stopApi) {
      return '';
    }
    foodApi().then((response) => {
      setMeals(response.meals);
    });
    return setStopApi(false);
  }, []);

  if (!meals.length) return <div>Carregando...</div>;
  const doze = 12;

  console.log("flag", meals)

  return (
    <section>
      <Header title="Comidas" searchBtn />
      {searchBox && <SearchBar history={ history } /> }
      <FoodFilters />
      <div>
        {meals
          .filter((x, index) => index < doze)
          .map((food, i) => (
            <MealsCard key={ food } food={ food } index={ i } />
          )) }
      </div>
      {location.pathname === '/comidas' && <Footer />}
    </section>

  );
};

export default Comidas;
