import React, { useContext, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { fetchAPIRecipes } from '../services';
import Card from '../components/Card';
import ContextRecipes from '../context/ContextRecipes';

function Foods() {
  const { setRecipes, showCard, setShowCard } = useContext(ContextRecipes);

  const fetchRecipes = async () => {
    const recipesApi = await fetchAPIRecipes('name', '');
    console.log(recipesApi);
    setRecipes(recipesApi);
    setShowCard(true);
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  return (
    <div>
      <Header fetchApi={ fetchAPIRecipes } title="Comidas" showSearchIcon />
      {showCard && <Card />}
      <Footer />
    </div>
  );
}

export default Foods;
