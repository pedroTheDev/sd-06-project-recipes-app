import React, { useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import Footer from '../components/Footer';
import ReceitasContext from '../context/ReceitasContext';
import BebidaCard from '../components/DrinksCard';
import { drinkAPI } from '../services/drinkAPI';

function Bebidas() {
  const {
    searchBox, meals, setMeals,
  } = useContext(ReceitasContext);
  const location = useLocation();

  useEffect(() => {
    async function fetchDrink() {
      const responseDrinksAPI = await drinkAPI();
      setMeals(responseDrinksAPI);
    }

    fetchDrink();
  }, []);

  if (!meals) return <div>Carregando...</div>;

  return (
    <section>
      <Header title="Bebidas" searchBtn />
      {searchBox && <SearchBar />}
      <BebidaCard />
      {location.pathname === '/bebidas' && <Footer />}
    </section>
  );
}

export default Bebidas;
