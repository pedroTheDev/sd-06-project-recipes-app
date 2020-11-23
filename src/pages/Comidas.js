import React, { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import MealsCard from '../components/MealsCard';
import ReceitasContext from '../context/ReceitasContext';

const Comidas = (history) => {
  const { searchBox } = useContext(ReceitasContext);
  const location = useLocation();

  return (
    <section>
      <Header title="Comidas" searchBtn />
      {searchBox && <SearchBar history={ history } />}
      <MealsCard />
      {location.pathname === '/comidas' ? <Footer /> : null}

    </section>
  );
};

export default Comidas;
