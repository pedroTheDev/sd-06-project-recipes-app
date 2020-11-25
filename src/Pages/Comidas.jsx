import React, { useEffect, useContext } from 'react';

import Header from '../components/Header';
import Footer from '../components/Footer';
import Cards from '../components/Cards';
import Categories from '../components/Categories/indexComidas';

import { showSugestedFoods } from '../services/aPI';
import ContextAPI from '../Context/ContextAPI';

const Comidas = () => {
  const { setApiValueSearch, apiValueSearch } = useContext(ContextAPI);

  const getSugestedFoods = async () => {
    const foods = await showSugestedFoods();
    console.log(foods);
    setApiValueSearch({
      ...apiValueSearch,
      foods,
    });
  };

  useEffect(() => {
    getSugestedFoods();
  }, []);

  return (
    <div>
      <Header />
      <Categories />
      <Cards />
      <Footer />
    </div>
  );
};

export default Comidas;
