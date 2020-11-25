import React, { useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import HeaderContext from '../context/HeaderContext';
import RecipesContext from '../context/RecipesContext';
import getRecipesInformation from '../services/recipesAPI';

const Foods = ({ history }) => {
  const { title, setTitle } = useContext(HeaderContext);
  const {
    fetchedResults,
    isFetching,
    setFetchedResults,
    setIsFetching,
  } = useContext(RecipesContext);

  const defaultRecipes = async () => {
    const url = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
    const recipes = await getRecipesInformation(url);
    const recipesCategories = [
      recipes.recipes[0].strCategory,
      recipes.recipes[1].strCategory,
      recipes.recipes[2].strCategory,
      recipes.recipes[3].strCategory,
      recipes.recipes[4].strCategory,
    ];
    console.log(typeof recipesCategories);
    console.log('recipesCategories', recipesCategories);
    const newRecipesCategories = Array.from(recipesCategories);
    console.log(typeof newRecipesCategories);
    console.log('newRecipesCategories', newRecipesCategories);
    console.log(recipes.recipes[0].strCategory);
    console.log(recipes.recipes[1].strCategory);
    console.log(recipes.recipes[2].strCategory);
    console.log(recipes.recipes[3].strCategory);
    console.log(recipes.recipes[4].strCategory);
    const { strCategory } = recipes.recipes;
    console.log(strCategory);
    setFetchedResults(recipes);
    setIsFetching(false);
  };

  useEffect(() => {
    setTitle('Comidas');
    defaultRecipes();
  }, []);

  const handleQuantityOfResults = () => {
    const onlyIndex = 0;
    if (fetchedResults.recipes.length) {
      const recipeId = fetchedResults.recipes[onlyIndex].idMeal;

      if (fetchedResults.recipes.length === 1) {
        const sendToDetailsPath = `/${title.toLowerCase()}/${recipeId}`;
        history.push(sendToDetailsPath);
      }
    }
  };

  useEffect(() => {
    if (fetchedResults.recipes) {
      handleQuantityOfResults();
    }
  }, [fetchedResults]);

  return (
    <div className="meals-container">
      {
        isFetching
          ? <p>Faça uma Pesquisa</p>
          : fetchedResults.recipes
            .map((recipe, index) => (
              <div
                key={ recipe.idMeal }
                className="meal-card"
                data-testid={ `${index}-recipe-card` }
              >
                <p
                  className="meal-title"
                  data-testid={ `${index}-card-name` }
                >
                  { recipe.strMeal }
                </p>
                <img
                  src={ recipe.strMealThumb }
                  className="meal-img"
                  data-testid={ `${index}-card-img` }
                  alt={ recipe.strMeal }
                />
                <p className="meal-id">{ recipe.idMeal }</p>
              </div>
            ))
      }
    </div>
  );
};

Foods.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Foods;
