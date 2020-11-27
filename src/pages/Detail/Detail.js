import React, { useState, useEffect } from 'react';
// import Proptypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { fetchMeal } from '../../services/mealAPI';
import SecondaryHeader from '../../components/SecondaryHeader';

function Detail() {
  const [recipes, setRecipes] = useState({});
  const { id } = useParams();

  const fetchIngredients = async () => {
    const recipesByIdApi = await fetchMeal('lookupIngredient', id);
    console.log('recipes', recipesByIdApi);
    // const secondaryHeaderData = {
    //   strMeal: '',
    //   strMealThumb: '',
    //   strCategory: '',
    // };
    setRecipes(recipesByIdApi);
  };

  useEffect(() => {
    fetchIngredients();
  }, []);

  return (
    <div>
      <SecondaryHeader />
      <div className="ingredients-container">
        <h3>Ingredientes</h3>
      </div>
      <div className="instructions-container">
        <h3>Instruções</h3>
        {

        }
        <div data-testid="instructions" />
      </div>
      <div className="container-reccomended">
        <img data-testid="${index}-recomendation-card" />
      </div>
      <button
        type="button"
        data-testid="start-recipe-btn"
      >
        Iniciar Receita
      </button>
    </div>
  );
}

export default Detail;
