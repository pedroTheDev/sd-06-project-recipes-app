import React, { useEffect, useContext } from 'react';

import Header from '../components/Header';
import Footer from '../components/Footer';
import Cards from '../components/Cards';
import Categories from '../components/Categories';

import { showAllFoodsCategories,
} from '../services/aPI';
import ContextAPI from '../Context/ContextAPI';

const Comidas = () => {
  const { setApiValueSearch, apiValueSearch } = useContext(ContextAPI);

  const getFoodCategories = async () => {
    const foods = await showAllFoodsCategories();
    setApiValueSearch({
      ...apiValueSearch,
      foods,
    });
  };
  useEffect(() => {
    getFoodCategories();
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
