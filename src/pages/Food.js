import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import './Food.css';

function Food() {
  const [meals, setMeals] = useState([]);

  const url = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';

  useEffect(() => {
    const fecthMeals = async () => {
      const APIRequest = await fetch(url);
      const APIResponse = await APIRequest.json();
      if (APIResponse !== null) {
        setMeals(APIResponse.meals);
      }
    };
    fecthMeals();
  }, []);
  const firstMeal = 0;
  const limitMeal = 12;

  return (
    <div className="food-container">
      <Header title="Comidas" />
      {
        meals.slice(firstMeal, limitMeal).map((meal, id) => (
          <div key={ id } className="recipe-card" data-testid={ `${id}-recipe-card` }>
            <img
              className="card-img"
              src={ meal.strMealThumb }
              alt={ meal.strMeal }
              data-testid={ `${id}-card-img` }
            />
            <h3 data-testid={ `${id}-card-name` }>{meal.strMeal}</h3>
          </div>
        ))
      }
      <Footer />
    </div>
  );
}

export default Food;
