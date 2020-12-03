import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchDrink } from '../../services/cocktailAPI';
import SecondaryHeader from '../../components/SecondaryHeader';

function DrinkInProgress() {
  const { id } = useParams();
  const [recipes, setRecipes] = useState({});

  const fetchIngredients = async () => {
    const recipesByIdApi = await fetchDrink('lookupIngredient', id);
    setRecipes(recipesByIdApi.drinks[0]);
  };

  useEffect(() => {
    fetchIngredients();
  }, []);

  return (
    <div>
      <div>
        <SecondaryHeader
          name={ recipes.strDrink }
          img={ recipes.strDrinkThumb }
          category={ recipes.strCategory }
        />
      </div>
    </div>
  );
}

export default DrinkInProgress;
