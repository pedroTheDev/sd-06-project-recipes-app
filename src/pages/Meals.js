import React, { useContext, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import MealRecipeCard from '../components/Cards';
import Context from '../context/Context';

function Meals() {
  const TRUE = true;
  const { recipes, recipesToRender, categoriesToRender } = useContext(Context);

  useEffect(() => {
    recipesToRender('meal');
    categoriesToRender('meal');
  }, []);

  return (
    <div>
      <Header title="Comidas" search={ TRUE } />
      <div className="recipes-cards">
        {recipes.map((meal, index) => (
          <MealRecipeCard
            key={ meal.strMeal }
            info={ meal }
            recipe="comidas"
            index={ index }
          />
        ))}
      </div>
      <Footer />
    </div>
  );
}

export default Meals;
