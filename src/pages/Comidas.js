import React, { useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import MealsCard from '../components/MealsCard';
import Footer from '../components/Footer';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import ReceitasContext from '../context/ReceitasContext';
import FoodFilters from '../components/FoodFilters';

import { foodAPI } from '../services/foodAPI';

const Comidas = (history) => {
  const {
    searchBox, meals, setMeals, fetching, setFetching,
  } = useContext(ReceitasContext);

  const location = useLocation();

  const doze = 12;

  useEffect(() => {
    setFetching(true);

    async function fetchFood() {
      const responseFoodsAPI = await foodAPI();
      setMeals(responseFoodsAPI);
      setFetching(false);
    }

    fetchFood();
  }, []);

  return (
    !fetching
      ? (
        <section>
          <Header title="Comidas" searchBtn />
          {searchBox && <SearchBar history={ history } /> }
          <section>
            <FoodFilters />
          </section>
          {
            meals.filter((_, index) => index < doze)
              .map((food, i) => (<MealsCard key={ i } food={ food } index={ i } />
              ))
          }
          {location.pathname === '/comidas' && <Footer />}

        </section>
      )
      : <span>Loading...</span>
  );
};

export default Comidas;
