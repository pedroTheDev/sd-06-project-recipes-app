import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMeal } from '../../services/mealAPI';
import SecondaryHeader from '../../components/SecondaryHeader';

function MealInProgress() {
  const { id } = useParams();
  const [recipes, setRecipes] = useState({});

  const fetchIngredients = async () => {
    const recipesByIdApi = await fetchMeal('lookupIngredient', id);
    // console.log('recipes linha 16', recipesByIdApi);
    setRecipes(recipesByIdApi.meals[0]);
  };

  useEffect(() => {
    fetchIngredients();
  }, []);

  return (
    <div>
      <SecondaryHeader
        name={ recipes.strMeal }
        img={ recipes.strMealThumb }
        category={ recipes.strCategory }
      />
    </div>
  );
}

export default MealInProgress;
