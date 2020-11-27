import React, { useEffect, useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import copy from 'clipboard-copy';

import blackHeart from '../images/blackHeartIcon.svg';
import whiteHeart from '../images/whiteHeartIcon.svg';
import ShareIcon from '../images/shareIcon.svg';
import * as api from '../services/Api';
import Context from '../context/Context';

import './styles/pages.css';

export default function DetalhesComidas({ history }) {
  const { id } = useParams();
  const {
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
  const [favLocalStorage, setFavLocalStorage] = useState([]);
  const [sharedURL, setSharedURL] = useState(false);

  const setarComida = async () => {
    setLoading(true);
    const meal = await api.fetchFoodById(id);
    const drinks = await api.fetchDrinkByName('');
    setSelectedMeal(meal[0]);
    setRecomendedDrinks(drinks);
    setLoading(false);
  };

  // let favLocalStorage = [];

  const favoriteRecipe = {
    id: selectedMeal.idMeal,
    type: 'meal',
    area: selectedMeal.strArea,
    category: selectedMeal.strCategory,
    alcoholicOrNot: '',
    name: selectedMeal.strMeal,
    image: selectedMeal.strMealThumb,
  };

  const getLocalStorage = () => {
    if (!favLocalStorage) {
    // favLocalStorage = JSON.parse(localStorage.getItem('favoriteRecipes'));
      setFavLocalStorage(JSON.parse(localStorage.getItem('favoriteRecipes')));
    }
  };

  const verifyFavorite = () => {
    if (favLocalStorage.includes(favoriteRecipe)) {
      setFavoriteImg(blackHeart);
    }
  };

  useEffect(() => {
    setarComida();
    getLocalStorage();
    verifyFavorite();
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

  const clickFavorite = () => {
    if (favoriteImg === whiteHeart) {
      setFavoriteMeals([...favoriteMeals, selectedMeal]);
      const newFav = [...favLocalStorage, favoriteRecipe];
      localStorage.setItem('favoriteRecipes',
        JSON.stringify(newFav));
      return setFavoriteImg(blackHeart);
    }
    const takeOutMeal = favLocalStorage.filter(
      (meal) => meal.id !== favoriteRecipe.id,
    );
    const newMeals = favoriteMeals.filter(
      (meal) => meal.strMeal !== selectedMeal.strMeal,
    );
    setFavoriteMeals(newMeals);
    localStorage.setItem('favoriteRecipes', JSON.stringify(takeOutMeal));
    return setFavoriteImg(whiteHeart);
  };

  const clickDetails = (identidade) => {
    history.push(`/comidas/${identidade}/in-progress`);
  };

  const seis = 6;

  const urlToClipboard = () => {
    const url = window.location.href;

    copy(url);
    setSharedURL(true);
  };

  return (
    <div>
      <h1>Detalhes Comidas</h1>
      { loading ? <p>Loading...</p>
        : (
          <div>
            <img
              src={ selectedMeal.strMealThumb }
              height="200px"
              data-testid="recipe-photo"
              alt="foto-recipe"
            />

            <h2 data-testid="recipe-title">{selectedMeal.strMeal}</h2>
            <div>
              <button
                type="button"
                alt="compartilhar"
                data-testid="share-btn"
                onClick={ urlToClipboard }
              >
                <img src={ ShareIcon } alt="compartilhar" />
              </button>
              {sharedURL ? <p>Link copiado!</p> : null}
            </div>

            <button
              type="button"
              src={ favoriteImg }
              alt="favoritar"
              data-testid="favorite-btn"
              onClick={ clickFavorite }
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
                  <img src={ drink.strDrinkThumb } alt={ index } width="200px" />
                </div>
              ))}
            <button
              type="button"
              className="iniciar-receita"
              data-testid="start-recipe-btn"
              onClick={ () => clickDetails(selectedMeal.idMeal) }
            >
              Iniciar Receita
            </button>
          </div>
        )}
    </div>
  );
}

DetalhesComidas.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
