import React, { useEffect, useContext, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import blackHeart from './images/blackHeartIcon.svg';
import whiteHeart from './images/whiteHeartIcon.svg';
import ShareIcon from '../images/shareIcon.svg';
import * as api from '../services/Api';
import Context from '../context/Context';
import './styles/pages.css';
import { templateSettings } from 'lodash';

export default function DetalhesComidas() {
  const { id } = useParams();
  const {
    meals,
    setMeals,
    setSelectedMeal,
    selectedMeal,
    favoriteMeals,
    setFavoriteMeals,
    loading,
    setLoading,
  } = useContext(Context);
  const [arrayIngredients, setArrayIngredients] = useState([]);
  const [recomendedDrinks, setRecomendedDrinks] = useState([]);
  const [favoriteImg, setFavoriteImg] = useState(whiteHeart);

  function getFoodById() {
    const newSelected = meals.filter((meal) => meal.idMeal === id)
    console.log('newSelected', newSelected)
    console.log('selectedMeal', selectedMeal)
  }

  const setarComida = async () => {
    setLoading(true);
    const meal = await api.fetchFoodById(id);
    const drinks = await api.fetchDrinkByName('');
    setSelectedMeal(meal[0]);
    setRecomendedDrinks(drinks);
    setLoading(false);
  };

  useEffect(() => {
    setarComida();
  }, []);

  const collectIngredients = () => {
    const ingredients = [];
    const maxLenght = 20;
    const noLength = 0;
    for (let index = 1; index <= maxLenght; index += 1) {
      if (selectedMeal.length !== noLength && selectedMeal[`strIngredient${index}`]) {
        ingredients.push(`${selectedMeal[`strIngredient${index}`]} 
        ${selectedMeal[`strMeasure${index}`]}`);
      }
      setArrayIngredients(ingredients);
    }
  };

  useEffect(() => {
    collectIngredients();
  }, [selectedMeal]);

  // const saveFavoriteRecipe = {
  //   id: selectedMeal.idMeal,
  //   type: 'meal',
  //   area: selectedMeal.strArea,
  //   category: selectedMeal.strCategory,
  //   alcoholicOrNot: '',
  //   name: selectedMeal.strMeal,
  //   image: selectedMeal.strMealThumb,
  // };

  // const clickFavorite = () => {
  //   setFavoriteMeals(...favoriteMeals, saveFavoriteRecipe);
  //   console.log(favoriteMeals);
  //   localStorage.setItem('favoriteRecipes', JSON.stringify(saveFavoriteRecipe));
  //   handleFavorite(saveFavoriteRecipe.id)
  //   if (favoriteImg === whiteHeart) {
  //     return setFavoriteImg(blackHeart);
  //   }
  //   return setFavoriteImg(whiteHeart);
  // };

  const handleFavoriteImg = () => {
    return selectedMeal.favorite ? setFavoriteImg(blackHeart)
      : setFavoriteImg(whiteHeart);
  };

  const handleFavorite = (ids) => {
    const isFavorite = meals.map((meal) => {
      return meal.idMeal === ids ? { ...meal, favorite: !meal.favorite } : meal;
    });
    setMeals(isFavorite);
    handleFavoriteImg();
    console.log('selectedMeal.favorite', selectedMeal.favorite);
  };

  const seis = 6;
  // console.log('selectedMeal', selectedMeal);
  return (
    <div>
      <h1>Detalhes Comidas</h1>
      <button onClick={ getFoodById }>teste</button>
      { loading ? <p>Loading</p>
        : (
          <div>
            <img
              src={ selectedMeal.strMealThumb }
              height="200px"
              data-testid="recipe-photo"
              alt="foto-recipe"
            />
            <h2 data-testid="recipe-title">{selectedMeal.strMeal}</h2>
            <button
              type="button"
              src={ ShareIcon }
              alt="compartilhar"
              data-testid="share-btn"
            >
              Compartilhar
            </button>
            <button
              type="button"
              src={ favoriteImg }
              alt="favoritar"
              data-testid="favorite-btn"
              onClick={ () => handleFavorite(selectedMeal.idMeal) }
            >
              <img src={ favoriteImg } alt="favoritar" />
            </button>
            <h3 data-testid="recipe-category">{selectedMeal.strCategory}</h3>
            <h3>Ingredients</h3>
            { arrayIngredients.map((ingredient, index) => (
              <p
                key={ index }
                data-testid={ `${index}-ingredient-name-and-measure` }
              >
                {ingredient}
              </p>
            ))}
            <h3>Instructions</h3>
            <p data-testid="instructions">
              Instructions
              {selectedMeal.strInstructions}
            </p>
            <p data-testid="video"><a href={ selectedMeal.strYoutube }>Vídeo</a></p>
            <h3>Recomendadas</h3>
            { recomendedDrinks.filter((drink, index) => drink && index < seis)
              .map((drink, index) => (
                <div key={ index } data-testid={ `${index}-recomendation-card` }>
                  <p data-testid={ `${index}-recomendation-title` }>{drink.strDrink }</p>
                  <img src={ drink.strDrinkThumb } alt={ index } />
                </div>
              ))}

            <Link to={ `/comidas/${id}/in-progress` }>
              <button type="button" className="iniciar-receita" data-testid="start-recipe-btn">
                Iniciar Receita
              </button>
            </Link>
          </div>
        )}
    </div>
  );
}
