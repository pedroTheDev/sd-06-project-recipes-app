import React from 'react';
import { useLocation } from 'react-router-dom';
import ExploreDrinks from '../components/ExploreDrinks';
import ExploreFoods from '../components/ExploreFoods';

function ExploreRecipes() {
  const location = useLocation().pathname;

  return (
    <div>
      { location === '/explorar/comidas' ? <ExploreFoods /> : <ExploreDrinks /> }
    </div>
  );
}

export default ExploreRecipes;
