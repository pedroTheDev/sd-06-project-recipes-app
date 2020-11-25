import React, { useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import Footer from '../components/Footer';
import ReceitasContext from '../context/ReceitasContext';
import DrinksCard from '../components/DrinksCard';
import DrinkFilters from '../components/DrinkFilters';
import { drinkAPI, drinkCategoryApi } from '../services/drinkAPI';

function Bebidas() {
  const {
    searchBox, meals, setMeals, setFiltersData,
  } = useContext(ReceitasContext);

  const location = useLocation();
  const doze = 12;

  useEffect(() => {
    async function fetchDrink() {
      const data = await drinkCategoryApi();
      const responseDrinksAPI = await drinkAPI();

      setFiltersData(data);
      setMeals(responseDrinksAPI);
    }

    fetchDrink();
  }, []);

  return ((!meals.length)
    ? <div>Carregando...</div>
    : (
      <section>
        <Header title="Bebidas" searchBtn />
        {searchBox && <SearchBar />}
        <DrinkFilters />
        <div>
          {meals
            .filter((x, index) => index < doze)
            .map((drink, i) => (
              <DrinksCard key={ drink } drink={ drink } index={ i } />
            ))}
        </div>
        {location.pathname === '/bebidas' && <Footer />}
      </section>
    )
  );
}

export default Bebidas;
