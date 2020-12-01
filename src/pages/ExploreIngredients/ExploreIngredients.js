import React from 'react';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import IngredientCard from '../../components/IngredientCard';

function ExploreIngredients() {
  return (
    <div>
      <Header
        className="header"
        pageTitle="Explorar Ingredientes"
      />
      <IngredientCard />
      <div className="footer">
        <Footer />
      </div>
    </div>
  );
}

export default ExploreIngredients;
