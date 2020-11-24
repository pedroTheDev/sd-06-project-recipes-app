import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useHistory, useParams } from 'react-router-dom';
import ContextRecipes from '../context/ContextRecipes';
import { fetchAPIDrinks, fetchAPIRecipes } from '../services';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function RecipeDetails() {
  const {
    recipes,
    setRecipes,
    recipeStarted,
    setRecipeStart,
  } = useContext(ContextRecipes);
  const [singleRecipe, setSingleRecipe] = useState([]);
  const [isFetching, setFetching] = useState(true);
  const [favoriteRecipe, setFavoriteRecipe] = useState(false);
  const location = useLocation().pathname;
  const history = useHistory();
  const { idRecipe } = useParams();
  const localStorageFavs = JSON.parse(localStorage.getItem('favoriteRecipes'));
  const localStorageProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));

  const fetchDetailedRecipe = async () => {
    if (location.includes('comidas')) {
      const data = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idRecipe}`);
      const responseJSON = await data.json();
      const mealRecipe = responseJSON.meals;
      setSingleRecipe(mealRecipe[0]);
      const recipesRecomend = await fetchAPIDrinks('name', '');
      setRecipes(recipesRecomend);
      if (localStorageFavs) {
        localStorageFavs.forEach((item) => {
          if (item.id === mealRecipe[0].idMeal) {
            setFavoriteRecipe(true);
          }
        });
      }

      // if (localStorageProgress) {
      //   localStorageProgress.forEach((item) => {
      //     if (item.id === mealRecipe[0].idMeal) {
      //       setRecipeStart(true);
      //     }
      //   });
      // }
    } else {
      const data = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idRecipe}`);
      const responseJSON = await data.json();
      const drinkRecipe = responseJSON.drinks;
      setSingleRecipe(drinkRecipe[0]);
      const recipesRecomend = await fetchAPIRecipes('name', '');
      setRecipes(recipesRecomend);
      if (localStorageFavs) {
        localStorageFavs.forEach((item) => {
          if (item.id === drinkRecipe[0].idDrink) {
            setFavoriteRecipe(true);
          }
        });
      }

      // if (localStorageProgress.cocktails) {
      //   console.log(localStorageProgress);
      //   localStorageProgress.cocktails.forEach((item) => {
      //     if (item.id === drinkRecipe[0].idDrink) {
      //       setRecipeStart(true);
      //     }
      //   });
      // }
    }
  };

  useEffect(() => {
    fetchDetailedRecipe();
    setFetching(false);
  }, []);

  const handleFavoriteRecipes = () => {
    let newFavRecipe = {};
    if (location.includes('comidas')) {
      newFavRecipe = {
        id: singleRecipe.idMeal,
        type: 'comida',
        area: singleRecipe.strArea,
        category: singleRecipe.strCategory,
        alcoholicOrNot: '',
        name: singleRecipe.strMeal,
        image: singleRecipe.strMealThumb,
      };
    } else {
      newFavRecipe = {
        id: singleRecipe.idDrink,
        type: 'bebida',
        area: '',
        category: singleRecipe.strCategory,
        alcoholicOrNot: singleRecipe.strAlcoholic,
        name: singleRecipe.strDrink,
        image: singleRecipe.strDrinkThumb,
      };
    }
    if (!favoriteRecipe) {
      if (!localStorageFavs) {
        localStorage.setItem('favoriteRecipes', JSON.stringify([newFavRecipe]));
      } else {
        localStorage.setItem('favoriteRecipes',
          JSON.stringify([...localStorageFavs, newFavRecipe]));
      }
      setFavoriteRecipe(true);
    } else {
      localStorageFavs.forEach((item, index) => {
        if (item.id === newFavRecipe.id) {
          localStorageFavs.splice(index, 1);
          localStorage.setItem('favoriteRecipes', JSON.stringify(localStorageFavs));
        }
      });
      setFavoriteRecipe(false);
    }
  };

  const handleProgressRecipes = () => {
    if (!recipeStarted) {
      if (location.includes('comidas')) {
        if (!localStorageProgress) {
          localStorage.setItem('inProgressRecipes',
            JSON.stringify({ meals: { id: singleRecipe.idMeal } }));
        } else {
          localStorage.setItem('inProgressRecipes',
            JSON.stringify({ ...localStorageProgress,
              meals: { id: singleRecipe.idMeal } }));
        }
      } else if (!localStorageProgress) {
        localStorage.setItem('inProgressRecipes',
          JSON.stringify({ cocktails: { id: singleRecipe.idDrink } }));
      } else {
        localStorage.setItem('inProgressRecipes',
          JSON.stringify({ ...localStorageProgress,
            cocktails: { id: singleRecipe.idDrink } }));
      }
    }
    history.push(`${location}/in-progress`);
  };

  const renderIngredients = (recipeData) => {
    const arrayIngredients = [];
    const maxIngredients = 20;

    for (let index = 1; index <= maxIngredients; index += 1) {
      if (recipeData[`strIngredient${index}`] !== ''
      && recipeData[`strIngredient${index}`] !== null
      && recipeData[`strIngredient${index}`] !== undefined
      ) {
        arrayIngredients.push({
          ingredient: recipeData[`strIngredient${index}`],
          measure: recipeData[`strMeasure${index}`],
        });
      }
    }
    return arrayIngredients;
  };

  const maxCards = 6;
  const allIngredients = renderIngredients(singleRecipe);

  return (
    <div>
      {(isFetching) ? <h2>Carregando receita...</h2>
        : (
          <div>
            <h2>Detalhes da Receita</h2>
            {(location.includes('comidas')) ? (
              <div>
                <img
                  src={ singleRecipe.strMealThumb }
                  alt="food"
                  data-testid="recipe-photo"
                  width="200px"
                />
                <section>
                  <img src={ shareIcon } alt="Share" data-testid="share-btn" />
                  <img
                    src={ favoriteRecipe ? blackHeartIcon : whiteHeartIcon }
                    alt="Favorite"
                    data-testid="favorite-btn"
                    onClick={ handleFavoriteRecipes }
                    aria-hidden="true"
                  />
                </section>
                <h3 data-testid="recipe-title">{ singleRecipe.strMeal }</h3>
                <h4 data-testid="recipe-category">{ singleRecipe.strCategory }</h4>
                {allIngredients.map((ingredient, index) => (
                  <p
                    data-testid={ `${index}-ingredient-name-and-measure` }
                    key={ index }
                  >
                    {`${ingredient.ingredient}: ${(ingredient.measure === null)
                      ? 'a gosto'
                      : ingredient.measure}`}
                  </p>
                ))}
                <p data-testid="instructions">{ singleRecipe.strInstructions }</p>
                <video data-testid="video" width="320" height="240">
                  <track
                    default
                    kind="captions"
                    srcLang="pt-br"
                  />
                  <source src={ singleRecipe.strYoutube } />
                </video>
                <section>
                  Recomendações:
                  {recipes.map((recipe, index) => (
                    <div key={ index } data-testid={ `${index}-recomendation-card` }>
                      <h5>{ recipe.strAlcoholic }</h5>
                      <h4
                        data-testid={ `${index}-recomendation-title` }
                      >
                        { recipe.strDrink }
                      </h4>
                      <img
                        src={ recipe.strDrinkThumb }
                        alt="drink"
                        width="50px"
                      />
                    </div>
                  )).filter((_, index) => index < maxCards)}
                </section>
              </div>
            ) : (
              <div>
                <img
                  src={ singleRecipe.strDrinkThumb }
                  alt="drink"
                  data-testid="recipe-photo"
                  width="200px"
                />
                <section>
                  <img src={ shareIcon } alt="Share" data-testid="share-btn" />
                  <img
                    src={ favoriteRecipe ? blackHeartIcon : whiteHeartIcon }
                    alt="Favorite"
                    data-testid="favorite-btn"
                    onClick={ handleFavoriteRecipes }
                    aria-hidden="true"
                  />
                </section>
                <h3 data-testid="recipe-title">{ singleRecipe.strDrink }</h3>
                <h4 data-testid="recipe-category">{ singleRecipe.strAlcoholic }</h4>
                {allIngredients.map((ingredient, index) => (
                  <p
                    data-testid={ `${index}-ingredient-name-and-measure` }
                    key={ index }
                  >
                    {`${ingredient.ingredient}: ${(ingredient.measure === null)
                      ? 'a gosto'
                      : ingredient.measure}`}
                  </p>
                ))}
                <p data-testid="instructions">{ singleRecipe.strInstructions }</p>
                <section>
                  Recomendações:
                  {recipes.map((recipe, index) => (
                    <div key={ index } data-testid={ `${index}-recomendation-card` }>
                      <h5>{ recipe.strCategory }</h5>
                      <h4
                        data-testid={ `${index}-recomendation-title` }
                      >
                        { recipe.strMeal }
                      </h4>
                      <img
                        src={ recipe.strMealThumb }
                        alt="food"
                        width="50px"
                      />
                    </div>
                  )).filter((_, index) => index < maxCards)}
                </section>
              </div>
            )}
            <section>
              <button
                type="button"
                data-testid="start-recipe-btn"
                className="footer"
                onClick={ handleProgressRecipes }
              >
                {recipeStarted ? 'Continuar Receita' : 'Iniciar Receita'}
              </button>
            </section>
          </div>
        )}
    </div>
  );
}

export default RecipeDetails;
