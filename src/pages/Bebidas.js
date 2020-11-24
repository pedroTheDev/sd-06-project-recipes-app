import React, { useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import Footer from '../components/Footer';
import ReceitasContext from '../context/ReceitasContext';
import DrinksCard from '../components/DrinksCard';
import DrinkFilters from '../components/DrinkFilters';

import { drinkAPI } from '../services/drinkAPI';

function Bebidas() {
  const {
    searchBox, meals, setMeals, fetching, setFetching,
  } = useContext(ReceitasContext);
  const location = useLocation();

  const doze = 12;

  useEffect(() => {
    setFetching(true);

    async function fetchDrink() {
      const responseDrinksAPI = await drinkAPI();
      setMeals(responseDrinksAPI);
      setFetching(false);
    }

    fetchDrink();
  }, []);

  return (
    !fetching
      ? (
        <section>
          <Header title="Bebidas" searchBtn />
          {searchBox && <SearchBar /> }
          <DrinkFilters />
          {
            meals
              .filter((_, index) => index < doze)
              .map((drink, i) => (
                <DrinksCard key={ i } drink={ drink } index={ i } />
              ))
          }
          {location.pathname === '/bebidas' && <Footer />}
        </section>
      )
      : <span>Loading...</span>
  );
}

export default Bebidas;
