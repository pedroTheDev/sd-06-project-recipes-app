import React, { useContext, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Card from '../components/MealRecipeCard';
import Context from '../context/Context';

function Meals() {
  const TRUE = true;
  const { meals, mealsToRender } = useContext(Context);

  useEffect(() => {
    mealsToRender();
  }, []);

  return (
    <div>
      <Header title="Comidas" search={ TRUE } />
      <div className="recipes-cards">
        {!meals ? 'Loading...' : meals.map((meal, index) => (
          <Card key={ meal.strMeal } mealInfo={ meal } index={ index } />
        ))}
      </div>
      <Footer />
    </div>
  );
}

export default Meals;
