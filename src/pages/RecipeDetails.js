import React, { useContext, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import RevenueContext from '../context/RevenueContext';
import ShareIcon from '../images/shareIcon.svg';
import WhiteHeartIcon from '../images/whiteHeartIcon.svg';
import BlackHeartIcon from '../images/blackHeartIcon.svg';
import RecommendedRecipes from '../components/RecommendedRecipes';

export default function RecipeDetails() {
  const { foods, setSearchParam,
    searchParam, fetchApi, isLoading } = useContext(RevenueContext);
  const location = useLocation();
  const idRecipe = location.pathname.split('/');
  const [heartIcon, setheartIcon] = useState(WhiteHeartIcon);
  if (idRecipe[1] === 'comidas') setSearchParam('Meal');
  if (idRecipe[1] === 'bebidas') setSearchParam('Drink');
  const linkRecipeAPI = (searchParam === 'Meal')
    ? `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idRecipe[2]}`
    : `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idRecipe[2]}`;

  console.log(idRecipe[1]);
  console.log(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idRecipe[2]}`);

  useEffect(() => {
    fetchApi(linkRecipeAPI);
  }, [searchParam]);

  function shareRecipeLink() {
    navigator.clipboard.writeText(`http://localhost:3000${location.pathname}`);
    alert('Link copiado!');
  }

  function whiteToBlackHeart() {
    if (heartIcon === WhiteHeartIcon) {
      // ...
      setheartIcon(BlackHeartIcon);
    } else {
      // ...
      setheartIcon(WhiteHeartIcon);
    }
    // AO CLICAR NO BOTÃO DO CORÇÃO DEVE MUDAR O SRC PARA {BlackHeartIcon} E FICAR GRAVADO
    // LOCALSTORAGE?
    // USAR A MESMA LÓGICA DO DISABLED?
    // Salve as receitas favoritas no localStorage na chave favoriteRecipes
    // O formato deve ser [{ id, type, area, category, alcoholicOrNot, name, image }].
    // As receitas feitas devem ser salvas em localStorage na chave doneRecipes no formato [{ id, type, area, category, alcoholicOrNot, name, image, doneDate, tags }].
  }

  function listContent() {
    const ingredientsMeasureArray = [];
    const VINTE = 20;
    for (let index = 1; index <= VINTE; index += 1) {
      if (foods[0][`strIngredient${index}`]) {
        let measureValue = foods[0][`strMeasure${index}`];
        if (!measureValue) measureValue = '';
        ingredientsMeasureArray
          .push(
            [foods[0][`strIngredient${index}`], measureValue],
          );
      }
    }
    return ingredientsMeasureArray;
  }

  const render = () => {
    const ZERO = 0;
    if (foods.length > ZERO) {
      let videoCode;
      if (searchParam === 'Meal') {
        videoCode = (foods[0].strYoutube) ? foods[0].strYoutube.split('=') : undefined;
      }
      return (
        <>
          <img
            width="360px"
            data-testid="recipe-photo"
            src={ foods[0][`str${searchParam}Thumb`] }
            alt={ foods[0][`str${searchParam}`] }
          />
          <h1 data-testid="recipe-title">{ foods[0][`str${searchParam}`] }</h1>
          <div className="d-flex justify-content-around">
            <a href onClick={ () => shareRecipeLink() }>
              <img src={ ShareIcon } alt="Share Button" data-testid="share-btn" />
            </a>
            <a href onClick={ () => whiteToBlackHeart() }>
              <img src={ heartIcon } alt="Favorite Button" data-testid="favorite-btn" />
            </a>
          </div>
          <h6 data-testid="recipe-category">
            { searchParam === 'Meal' ? foods[0].strCategory : foods[0].strAlcoholic }
          </h6>
          <ul>
            { listContent().map((pairArray, index) => (
              <li key={ index } data-testid={ `${index}-ingredient-name-and-measure` }>
                {pairArray[0] }
                { pairArray[1] ? ` - ${pairArray[1]}` : undefined }
              </li>
            )) }
          </ul>
          <h4>INSTRUCTIONS: </h4>
          <p data-testid="instructions">{ foods[0].strInstructions }</p>
          { (videoCode) && (
            <>
              <h4>VIDEO: </h4>
              <iframe
                data-testid="video"
                className="width360"
                title="video"
                src={ `https://www.youtube.com/embed/${videoCode[1]}` }
                frameBorder="0"
                allow="accelerometer; autoplay;
            clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </>
          ) }
          <h4>RECOMENDED: </h4>
          <RecommendedRecipes />
          <button
            data-testid="start-recipe-btn"
            type="button"
            onClick={ console.log('Iniciar receita') }
          >
            INICIAR RECEITA
          </button>
        </>
      );
    }
  };

  return (
    <div>
      {(isLoading) ? 'Loading...' : render()}
    </div>
  );
}
