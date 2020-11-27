import React, { useEffect, useContext, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import blackHeart from '../images/blackHeartIcon.svg';
import whiteHeart from '../images/whiteHeartIcon.svg';
import ShareIcon from '../images/shareIcon.svg';
import * as api from '../services/Api';
import Context from '../context/Context';
import './styles/pages.css';

export default function DetalhesComidas() {
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

  const setarComida = async () => {
    setLoading(true);
    const meal = await api.fetchFoodById(id);
    const drinks = await api.fetchDrinkByName('');
    setSelectedMeal(meal[0]);
    setRecomendedDrinks(drinks);
    setLoading(false);
  };

  const verifyFavorite = () => {
    if (favoriteMeals.includes(selectedMeal)) {
      setFavoriteImg(blackHeart);
    }
  };

  useEffect(() => {
    setarComida();
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

  // const favoriteRecipe = {
  //   id: selectedMeal.idMeal,
  //   type: 'meal',
  //   area: selectedMeal.strArea,
  //   category: selectedMeal.strCategory,
  //   alcoholicOrNot: '',
  //   name: selectedMeal.strMeal,
  //   image: selectedMeal.strMealThumb,
  // };

  const clickFavorite = () => {
    if (favoriteImg === whiteHeart) {
      setFavoriteMeals(...favoriteMeals, [selectedMeal]);
      return setFavoriteImg(blackHeart);
    }
    const newMeals = favoriteMeals.filter(
      (meal) => meal.strMeal !== selectedMeal.strMeal,
    );
    setFavoriteMeals(newMeals);
    return setFavoriteImg(whiteHeart);
  };
  const seis = 6;

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
            <button
              type="button"
              alt="compartilhar"
              data-testid="share-btn"
            >
              <img src={ ShareIcon } alt="compartilhar" />
            </button>
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

            <Link to={ `/comidas/${id}/in-progress` }>
              <button
                type="button"
                className="iniciar-receita"
                data-testid="start-recipe-btn"
              >
                Iniciar Receita
              </button>
            </Link>
          </div>
        )}
    </div>
  );
}
