import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';
import { detailsFoodById } from '../../services/aPI';

const FavoriteFoodButton = () => {
  const [stateLocal, setStatelocal] = useState();
  const [isFavorite, setIsFavorite] = useState(false);
  const currentFoodID = useParams().id;

  const handleIdDetails = async () => {
    const food = await detailsFoodById(currentFoodID);
    setStatelocal({ ...stateLocal, food });
  };

  const loadFavoriteRecipesFromLocalStorage = () => {
    if (localStorage.getItem('favoriteRecipes') === null) {
      const favoriteRecipes = [];
      localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
    }

    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const isRecipeFavorite = favoriteRecipes[0] ? favoriteRecipes
      .find((recipe) => recipe.id === currentFoodID) : undefined;

    if (isRecipeFavorite) setIsFavorite(true);
    else setIsFavorite(false);
  };

  useEffect(() => {
    handleIdDetails();
    loadFavoriteRecipesFromLocalStorage();
  }, []);

  const handleFavorite = () => {
    const currentFood = stateLocal.food.meals[0];
    const recipeData = {
      id: currentFood.idMeal,
      type: 'comida',
      area: currentFood.strArea,
      category: currentFood.strCategory,
      alcoholicOrNot: '',
      name: currentFood.strMeal,
      image: currentFood.strMealThumb,
    };

    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const zero = 0;
    const isAlreadyAFavorite = favoriteRecipes.length > zero
      ? favoriteRecipes.find((recipe) => recipe.id === currentFood.idMeal) : undefined;

    if (isAlreadyAFavorite) {
      setIsFavorite(false);
      localStorage.setItem('favoriteRecipes', JSON.stringify([...favoriteRecipes
        .filter((recipe) => recipe.id !== currentFood.idMeal)]));
    } else {
      setIsFavorite(true);
      localStorage.setItem('favoriteRecipes', JSON.stringify([
        ...favoriteRecipes, recipeData]));
    }
  };

  return (
    <button
      type="button"
      onClick={ handleFavorite }
    >
      <img
        data-testid="favorite-btn"
        src={ !isFavorite ? whiteHeartIcon : blackHeartIcon }
        alt={ !isFavorite ? 'whiteHeartIcon' : 'blackHeartIcon' }
      />
    </button>);
};

export default FavoriteFoodButton;
