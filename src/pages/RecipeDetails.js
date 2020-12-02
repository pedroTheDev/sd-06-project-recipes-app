import React, { useContext, useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import RevenueContext from '../context/RevenueContext';
import ShareIcon from '../images/shareIcon.svg';
import WhiteHeartIcon from '../images/whiteHeartIcon.svg';
import BlackHeartIcon from '../images/blackHeartIcon.svg';
import RecommendedRecipes from '../components/RecommendedRecipes';

/*
a chave doneRecipes deve conter a seguinte estrutura:
[{
    id: id-da-receita,
    type: comida-ou-bebida,
    area: area-da-receita-ou-texto-vazio,
    category: categoria-da-receita-ou-texto-vazio,
    alcoholicOrNot: alcoholic-ou-non-alcoholic-ou-texto-vazio,
    name: nome-da-receita,
    image: imagem-da-receita,
    doneDate: quando-a-receita-foi-concluida,
    tags: array-de-tags-da-receita-ou-array-vazio
}]
a chave favoriteRecipes deve conter a seguinte estrutura:
[{
    id: id-da-receita,
    type: comida-ou-bebida,
    area: area-da-receita-ou-texto-vazio,
    category: categoria-da-receita-ou-texto-vazio,
    alcoholicOrNot: alcoholic-ou-non-alcoholic-ou-texto-vazio,
    name: nome-da-receita,
    image: imagem-da-receita
}]
a chave inProgressRecipes deve conter a seguinte estrutura:
{
    cocktails: {
        id-da-bebida: [lista-de-ingredientes-utilizados],
        ...
    },
    meals: {
        id-da-comida: [lista-de-ingredientes-utilizados],
        ...
    }
}
*/

export default function RecipeDetails() {
  const { foods, setSearchParam, inProgress, setInProgress,
    searchParam, fetchApi, isLoading } = useContext(RevenueContext);
  const location = useLocation();
  const idRecipe = location.pathname.split('/');
  const [heartIcon, setheartIcon] = useState(WhiteHeartIcon);
  const [alert, setAlert] = useState();
  // const [isChecked, setIsChecked] = useState([]);

  if (idRecipe[3] === 'in-progress' && inProgress === false)(setInProgress(!inProgress));
  if (idRecipe[1] === 'comidas') setSearchParam('Meal');
  if (idRecipe[1] === 'bebidas') setSearchParam('Drink');
  const linkRecipeAPI = (searchParam === 'Meal')
    ? `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idRecipe[2]}`
    : `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idRecipe[2]}`;

  const [localStorageFavorites, setLocalStorageFavorites] = useState(
    JSON
      .parse(localStorage
        .getItem('favoriteRecipes')),
  );

  const [localStorageInProgress, setLocalStorageInProgress] = useState(
    JSON
      .parse(localStorage
        .getItem('inProgressRecipes')),
  );

  const [localStorageDoneRecipes, setLocalStorageDoneRecipes] = useState(
    JSON
      .parse(localStorage
        .getItem('doneRecipes')),
  );

  if (!localStorageFavorites) {
    setLocalStorageFavorites([]);
  }

  if (!localStorageDoneRecipes) {
    setLocalStorageDoneRecipes([]);
  }

  let actualRecipe = [];
  function checkLocalStorage() {
    if (searchParam === 'Meal') {
      actualRecipe = ([
        {
          id: foods[0].idMeal,
          type: searchParam,
          area: foods[0].strArea,
          category: foods[0].strCategory,
          alcoholicOrNot: '',
          name: foods[0].strMeal,
          image: foods[0].strMealThumb,
          doneDate: 'fullDatte',
          tags: foods[0].strTag ? foods[0].strTag : '',
        },
      ]);
    }
    if (searchParam === 'Drink') {
      actualRecipe = ([
        {
          id: foods[0].idDrink,
          type: searchParam,
          area: '',
          category: foods[0].strCategory,
          alcoholicOrNot: foods[0].strAlcoholic,
          name: foods[0].strDrink,
          image: foods[0].strDrinkThumb,
          doneDate: 'fullDatte',
          tags: foods[0].strTag ? foods[0].strTag : '',
        },
      ]);
    }

    let isFavorite;
    if (localStorageFavorites !== null) {
      isFavorite = localStorageFavorites
        .find((favorite) => favorite.id === actualRecipe[0].id);
    }
    if (isFavorite !== undefined && heartIcon === WhiteHeartIcon) {
      setheartIcon(BlackHeartIcon);
    }
    if (isFavorite === undefined && heartIcon === BlackHeartIcon) {
      setheartIcon(WhiteHeartIcon);
    }
    return actualRecipe;
  }

  function shareRecipeLink() {
    // const time = 15000;
    navigator.clipboard.writeText(`http://localhost:3000${location.pathname}`);
    setAlert(true);
    // setTimeout(() => {
    //   setAlert(false);
    // }, time);
    // alert('Link copiado!');
  }

  function whiteToBlackHeart() {
    if (heartIcon === WhiteHeartIcon) {
      // // ...
      // if (localStorageFavorites !== 'null') {
      const newLocalStorageFavorites = localStorageFavorites;
      newLocalStorageFavorites.push(actualRecipe[0]);
      setLocalStorageFavorites(newLocalStorageFavorites);
      localStorage
        .setItem('favoriteRecipes', JSON
          .stringify(localStorageFavorites));
      // } else {
      //   const setLocal = async () =>
      //   { localStorage.setItem('favoriteRecipes', JSON.stringify(actualRecipe));
      //   await setheartIcon(BlackHeartIcon);
      // }
      setheartIcon(BlackHeartIcon);
    } else {
      // ...
      const newLocalStorageFavorites = localStorageFavorites;
      newLocalStorageFavorites
        .splice(localStorageFavorites
          .indexOf(localStorageFavorites
            .find((favorite) => favorite.id === actualRecipe[0].id)), 1);
      setLocalStorageFavorites(newLocalStorageFavorites);
      localStorage
        .setItem('favoriteRecipes', JSON
          .stringify(localStorageFavorites));
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

  function handleCheckbox({ target }, pairArray) {
    if (!localStorageInProgress) {
      localStorage
        .setItem('inProgressRecipes', JSON
          .stringify({
            cocktails: { [foods[0].id]: [] },
            meals: { id: [] },
          }));
    }
  }

  //   localStorage
  //     .setItem('inProgressRecipes', JSON
  //       .stringify(setLocalStorageInProgress));
  // }

  // } else if (idRecipe[1] === 'comidas') {
  // if (idRecipe[1] === 'bebidas') {
  //   keyInProgressMealsOrDrinks = 'inProgressRecipes.meals';
  // } else {
  //   keyInProgressMealsOrDrinks = 'inProgressRecipes.cocktails';
  // }
  // localStorage
  //   .setItem(keyInProgressMealsOrDrinks, JSON
  //     .stringify(setLocalStorageInProgress));

  useEffect(() => {
    fetchApi(linkRecipeAPI);
  }, [searchParam]);

  const render = () => {
    const ZERO = 0;
    if (foods.length > ZERO) {
      checkLocalStorage();
      let videoCode;
      if (searchParam === 'Meal') {
        videoCode = (foods[0].strYoutube) ? foods[0].strYoutube.split('=') : undefined;
      }
      return (
        <Container>
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
              {alert && <span>Link copiado!</span>}
            </a>
            <a href onClick={ () => whiteToBlackHeart() }>
              <img src={ heartIcon } alt="Favorite Button" data-testid="favorite-btn" />
            </a>
          </div>
          <h6 data-testid="recipe-category">
            { searchParam === 'Meal' ? foods[0].strCategory : foods[0].strAlcoholic }
          </h6>
          <ul data-testid="0-recipe-card">
            { listContent().map((pairArray, index) => (
              (inProgress === false)
                ? (
                  <li
                    key={ index }
                    data-testid={ `${index}-ingredient-name-and-measure` }
                  >
                    {pairArray[0] }
                    { pairArray[1] ? ` - ${pairArray[1]}` : undefined }
                  </li>
                )
                : (
                  <div
                    key={ index }
                    data-testid={ `${index}-ingredient-step` }
                  >
                    <input
                      className="lineThrough"
                      type="checkbox"
                      name={ index }
                      id={ index }
                      onChange={ (e) => handleCheckbox(e, pairArray) }
                    />
                    {' '}
                    <label
                      className="lineThrough"
                      htmlFor={ index }
                    >
                      {pairArray[0] }
                      { pairArray[1] ? ` - ${pairArray[1]}` : undefined }
                    </label>
                  </div>
                )
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
          {inProgress === false
            ? (
              <Link to={ `/${idRecipe[1]}/${idRecipe[2]}/in-progress` }>
                <button
                  style={ {
                    postion: 'fixed',
                    bottom: '0px',
                  } }
                  data-testid="start-recipe-btn"
                  className="start-recipe-btn"
                  type="button"
                  onClick={ () => setInProgress(!inProgress) }
                >
                  INICIAR RECEITA
                </button>
              </Link>
            )
            : (
              <Link to={ `/${idRecipe[1]}/${idRecipe[2]}` }>
                <button
                  style={ {
                    postion: 'fixed',
                    bottom: '0px',
                  } }
                  data-testid="finish-recipe-btn"
                  className="start-recipe-btn"
                  type="button"
                  onClick={ () => setInProgress(!inProgress) }
                >
                  FINALIZAR RECEITA
                </button>
              </Link>
            )}
        </Container>
      );
    }
  };

  return (
    <div>
      {(isLoading) ? 'Loading...' : render()}
    </div>
  );
}
