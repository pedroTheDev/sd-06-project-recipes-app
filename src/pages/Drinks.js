import React, { useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import HeaderContext from '../context/HeaderContext';
import RecipesContext from '../context/RecipesContext';
import getRecipesInformation from '../services/recipesAPI';
import CategoryButtons from '../components/CategoryButtons';
import './FoodsAndDrinks.css';

const Drinks = ({ history }) => {
  const { title, setTitle } = useContext(HeaderContext);
  const { searchByIngredient } = useContext(RecipesContext);
  const {
    fetchedResults,
    isFetching,
    setFetchedResults,
    setIsFetching,
  } = useContext(RecipesContext);

  const defaultRecipes = async () => {
    let url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
    if (searchByIngredient !== '') {
      url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${searchByIngredient}`;
    }
    const recipes = await getRecipesInformation(url);
    setFetchedResults(recipes);
    setIsFetching(false);
  };

  useEffect(() => {
    setTitle('Bebidas');
    defaultRecipes();
  }, []);

  const handleQuantityOfResults = () => {
    const onlyIndex = 0;
    if (fetchedResults.recipes.length) {
      const recipeId = fetchedResults.recipes[onlyIndex].idDrink;

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
    <div className="recipe-page-container">
      <CategoryButtons type="drinks" />
      <div className="recipes-container">
        {
          isFetching
            ? <p>Faça uma Pesquisa</p>
            : fetchedResults.recipes
              .map((recipe, index) => (
                <Link to={ `/bebidas/${recipe.idDrink}` } key={ recipe.idDrink }>
                  <div
                    className="recipe-card"
                    data-testid={ `${index}-recipe-card` }
                  >
                    <p
                      className="recipe-title"
                      data-testid={ `${index}-card-name` }
                    >
                      { recipe.strDrink }
                    </p>
                    <img
                      src={ recipe.strDrinkThumb }
                      data-testid={ `${index}-card-img` }
                      className="recipe-img"
                      alt={ recipe.strDrink }
                    />
                  </div>
                </Link>
              ))
        }
      </div>
    </div>
  );
};

Drinks.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Drinks;
