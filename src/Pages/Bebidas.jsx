import React, { useContext, useEffect } from 'react';

import Header from '../components/Header';
import Footer from '../components/Footer';
import Cards from '../components/Cards';

import CategoriesBebidas from '../components/Categories/indexBebidas';

import { showSugestedDrinks,
} from '../services/aPI';
import ContextAPI from '../Context/ContextAPI';

const Bebidas = () => {
  const { setApiValueSearch, apiValueSearch } = useContext(ContextAPI);

  const getSugestedDrinks = async () => {
    const drinks = await showSugestedDrinks();
    // console.log(drinks);
    setApiValueSearch({
      ...apiValueSearch,
      drinks,
    });
  };
  useEffect(() => {
    getSugestedDrinks();
  }, []);

  return (
    <div>
      <Header />
      <CategoriesBebidas />
      <Cards />
      <Footer />
    </div>
  );
};

export default Bebidas;
