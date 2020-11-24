import React, { useContext, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { fetchAPIDrinks } from '../services';
import Card from '../components/Card';
import ContextRecipes from '../context/ContextRecipes';

function Drinks() {
  const { setRecipes, showCard, setShowCard } = useContext(ContextRecipes);

  const fetchRecipes = async () => {
    const recipesApi = await fetchAPIDrinks('name', '');
    console.log(recipesApi);
    setRecipes(recipesApi);
  };

  useEffect(async () => {
    await fetchRecipes();
    setShowCard(true);
  }, []);

  return (
    <div>
      <Header title="Bebidas" fetchApi={ fetchAPIDrinks } showSearchIcon />
      {showCard && <Card />}
      <Footer />
    </div>
  );
}

export default Drinks;
