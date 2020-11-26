import React, { useEffect, useContext, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import blackHeart from '../images/blackHeartIcon.svg';
import whiteHeart from '../images/whiteHeartIcon.svg';
import ShareIcon from '../images/shareIcon.svg';
import '../Components/style/style.css';
import * as api from '../services/Api';
import Context from '../context/Context';

export default function DetalhesBebidas() {
  const { id } = useParams();
  const {
    setSelectedDrink,
    selectedDrink,
    favoriteDrinks,
    setFavoriteDrinks,
    loading,
    setLoading,
  } = useContext(Context);
  const [arrayIngredients, setArrayIngredients] = useState([]);
  const [recomendedMeals, setRecomendedMeals] = useState([]);
  const [favoriteImg, setFavoriteImg] = useState(whiteHeart);

  const setarBebida = async () => {
    setLoading(true);
    const drink = await api.fetchDrinkbyId(id);
    const meals = await api.fetchFoodByName('');
    setSelectedDrink(drink[0]);
    setRecomendedMeals(meals);
    setLoading(false);
  };

  const verifyFavorite = () => {
    if (favoriteDrinks.includes(selectedDrink)) {
      setFavoriteImg(blackHeart);
    }
  };

  useEffect(() => {
    setarBebida();
    verifyFavorite();
  }, []);

  const collectIngredients = () => {
    const ingredients = [];
    const maxLenght = 20;
    const noLength = 0;
    for (let index = 1; index <= maxLenght; index += 1) {
      if (selectedDrink.length !== noLength && selectedDrink[`strIngredient${index}`]) {
        ingredients.push(`${selectedDrink[`strIngredient${index}`]} 
        ${selectedDrink[`strMeasure${index}`]}`);
      }
      setArrayIngredients(ingredients);
    }
  };

  useEffect(() => {
    collectIngredients();
  }, [selectedDrink]);

  /* Para salvar no LocalSotrage dessa forma:
  localStorage.setItem('favoriteRecipes', JSON.stringfy(saveFavoriteRecipes)); */
  // const saveFavoriteRecipe = {
  //   id: selectedDrink.idDrink,
  //   type: 'drinks',
  //   area: '',
  //   category: selectedDrink.strCategory,
  //   alcoholicOrNot: selectedDrink.strAlcoholic,
  //   name: selectedDrink.strDrink,
  //   image: selectedDrink.strDrinkThumb,
  // };

  const clickFavorite = () => {
    if (favoriteImg === whiteHeart) {
      setFavoriteDrinks(...favoriteDrinks, [selectedDrink]);
      return setFavoriteImg(blackHeart);
    }
    const newDrinks = favoriteDrinks.filter(
      (drink) => drink.strDrink !== selectedDrink.strDrink,
    );
    setFavoriteDrinks(newDrinks);
    return setFavoriteImg(whiteHeart);
  };

  const seis = 6;

  return (
    <div>
      <h1>Detalhes Bebidas</h1>
      {loading ? <p>Loading</p>
        : (
          <div>
            <img
              data-testid="recipe-photo"
              src={ selectedDrink.strDrinkThumb }
              height="200px"
              alt="foto-recipe"
            />
            <h2 data-testid="recipe-title">{selectedDrink.strDrink}</h2>
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
              onClick={ clickFavorite }
            >
              <img src={ favoriteImg } alt="favoritar" />
            </button>
            <h3 data-testid="recipe-category">
              {selectedDrink.strCategory}
              ,
              {selectedDrink.strAlcoholic}
            </h3>
            <h3>Ingredients </h3>
            { arrayIngredients.map((ingredient, index) => (
              <p
                key={ index }
                data-testid={ `${index}-ingredient-name-and-measure` }
              >
                { ingredient }
              </p>
            )) }
            <p data-testid="instructions">
              Instructions
              { selectedDrink.strInstructions }
            </p>
            <p data-testid="video"><a href={ selectedDrink.strVideo }>Vídeo</a></p>
            <h3>Recomendadas</h3>
            { recomendedMeals.filter((meal, index) => meal && index < seis)
              .map((meal, index) => (
                <div key={ index } data-testid={ `${index}-recomendation-card` }>
                  <p data-testid={ `${index}-recomendation-title` }>{meal.strMeal}</p>
                  <img src={ meal.strMealThumb } alt={ index } />
                </div>))}
            <Link to={ `/bebidas/${id}/in-progress` }>
              <button type="button" id="iniciar-receita" data-testid="start-recipe-btn">
                Iniciar Receita
              </button>
            </Link>
          </div>
        )}
    </div>
  );
}
