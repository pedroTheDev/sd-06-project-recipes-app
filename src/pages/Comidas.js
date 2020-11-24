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
  const { searchBox, foods, setFoods } = useContext(ReceitasContext);
  const { stopApi, setStopApi } = useContext(ReceitasContext);

  const location = useLocation();

  useEffect(() => {
    if (stopApi) {
      return '';
    }
    foodApi().then((response) => {
      setFoods(response);
    });
    return setStopApi(false);
  }, []);

  if (!foods.meals) return <div>Carregando...</div>;
  const doze = 12;

  return (
    <section>
      <Header title="Comidas" searchBtn />
      {searchBox && <SearchBar history={ history } /> }
      <FoodFilters />
      <div>
        {foods.meals
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
