import React, { useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ComidaCard from '../components/MealsCard';
import Footer from '../components/Footer';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import ReceitasContext from '../context/ReceitasContext';
import { foodAPI } from '../services/foodAPI';

const Comidas = (history) => {
  const {
    meals, searchBox, setMeals,
  } = useContext(ReceitasContext);
  const location = useLocation();

  useEffect(() => {
    async function fetchFood() {
      const responseFoodsAPI = await foodAPI();
      setMeals(responseFoodsAPI);
    }

    fetchFood();
  }, []);

  if (!meals) return <div>Carregando...</div>;

  return (
    <section>
      <Header title="Comidas" searchBtn />
      {searchBox && <SearchBar history={ history } />}
      <ComidaCard />
      {location.pathname === '/comidas' && <Footer />}
    </section>
  );
};

export default Comidas;
