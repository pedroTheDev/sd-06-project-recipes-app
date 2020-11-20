import React, { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import ReceitasContext from '../context/ReceitasContext';

const Comidas = () => {
  const { searchBox } = useContext(ReceitasContext);
  const location = useLocation();

  return (
    <section>
      <Header title="Comidas" searchBtn />
      {searchBox && <SearchBar />}
      {location.pathname === '/comidas' ? <Footer /> : null}
    </section>
  );
};

export default Comidas;
