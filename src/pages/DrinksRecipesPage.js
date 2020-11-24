import React from 'react';
import Filters from '../components/Filters';
import Header from '../components/Header';
import Footer from '../components/Footer';

function DrinksRecipesPage() {
  return (
    <div>
      <Header pageName="Bebidas" />
      <Filters />
      <Footer />
    </div>
  );
}

export default DrinksRecipesPage;
