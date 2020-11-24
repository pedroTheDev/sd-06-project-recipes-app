import { useState, useEffect } from 'react';

const useAbility = () => {
  const [recipeId, setRecipeId] = useState('');
  const [recipe, setRecipe] = useState([]);

  const searchRecipe = async () => {
    const dataJson = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeId}`);
    const data = await dataJson.json();
    return setRecipe(data);
  };

  useEffect(() => {
    searchRecipe();
  }, [recipeId]);
  return [recipe, recipeId, setRecipeId];
};

export default useAbility;
