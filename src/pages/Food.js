import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';

function Food() {
  const [meals, setMeals] = useState([]);
  const [isFecthing, setIsFecthing] = useState(true);

  const url = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';

  useEffect(() => {
    const fecthMeals = async () => {
      const APIRequest = await fetch(url);
      const APIResponse = await APIRequest.json();
      if (APIResponse !== null) {
        setMeals(APIResponse.meals);
        setIsFecthing(false);
      }
    };
    fecthMeals();
  }, []);

  const limitMeal = 12;

  const loading = () => {
    if (isFecthing === true) {
      return 'loading...';
    }
  };

  return (
    <>
      <h1>Food</h1>
      <p>{loading()}</p>
      {
        meals.splice(1, limitMeal).map((meal, id) => (
          <div key={ id } data-testid={ `${id}-recipe-card` }>
            <img
              src={ meal.strMealThumb }
              alt={ meal.strMeal }
              data-testid={ `${id}-card-img` }
            />
            <h1 data-testid={ `${id}-card-name` }>{meal.strMeal}</h1>
          </div>
        ))
      }
      <Footer />
    </>
  );
}

export default Food;
