import React from 'react';
import Header from '../components/Header';
import Filters from '../components/Filters';
import Footer from '../components/Footer';

function FoodRecipesPage() {
  return (
    <div>
      <Header pageName="Comidas" />
      <Filters />
      <Footer />
    </div>
  );
}

export default FoodRecipesPage;
