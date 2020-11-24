import React, { useContext, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import DrinkRecipeCard from '../components/DrinkRecipeCard';
import Context from '../context/Context';

function Drinks() {
  const TRUE = true;
  const { recipes, recipesToRender, categoriesToRender } = useContext(Context);

  useEffect(() => {
    recipesToRender('drink');
    categoriesToRender('drink');
  }, []);

  return (
    <div>
      <Header title="Bebidas" search={ TRUE } />
      <div className="recipes-cards">
        {recipes.map((drink, index) => (
          <DrinkRecipeCard key={ drink.strDrink } drinkInfo={ drink } index={ index } />
        ))}
      </div>
      <Footer />
    </div>
  );
}

export default Drinks;
