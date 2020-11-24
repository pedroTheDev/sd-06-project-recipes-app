import React from 'react';
import { useLocation } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import ExploreFoodsIngredients from '../components/ExploreFoodsIngredients';
import ExploreDrinksIngredients from '../components/ExploreDrinksIngredients';

function ExploreByIngredients() {
  const location = useLocation().pathname;
  return (
    <div>
      <Header title="Explorar Ingredientes" />
      <div>
        { location === '/explorar/comidas/ingredientes' ? <ExploreFoodsIngredients />
          : <ExploreDrinksIngredients /> }
      </div>
      <Footer />
    </div>
  );
}

export default ExploreByIngredients;
