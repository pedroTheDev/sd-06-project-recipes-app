import React, { useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import HeaderContext from '../context/HeaderContext';
import RecipesContext from '../context/RecipesContext';
import getRecipesInformation from '../services/recipesAPI';
import CategoryButtons from '../components/CategoryButtons';
import './Foods.css';

const Foods = ({ history }) => {
  const { title, setTitle } = useContext(HeaderContext);
  const { searchByIngredient } = useContext(RecipesContext);
  const {
    fetchedResults,
    isFetching,
    setFetchedResults,
    setIsFetching,
    selectedCategory,
  } = useContext(RecipesContext);

  const defaultRecipes = async () => {
    let url = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
    if (searchByIngredient !== '') {
      url = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchByIngredient}`;
    }
    const recipes = await getRecipesInformation(url);
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

      if (fetchedResults.recipes.length === 1 && selectedCategory !== 'Goat') {
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
      <CategoryButtons type="meals" />
      {
        isFetching
          ? <p>Faça uma Pesquisa</p>
          : fetchedResults.recipes
            .map((recipe, index) => (
              <Link to={ `/comidas/${recipe.idMeal}` } key={ recipe.idMeal }>
                <div
                  className="meal-card"
                  data-testid={ `${index}-recipe-card` }
                  style={ { borderRadius: 10,
                    border: '1px solid black',
                    marginTop: 20,
                    marginLeft: 10 } }
                >
                  <p
                    className="meal-title"
                    data-testid={ `${index}-card-name` }
                    style={ { textAlign: 'center',
                      color: 'black',
                      fontSize: '24px',
                      marginLeft: '10px' } }
                  >
                    { recipe.strMeal }
                  </p>
                  <img
                    src={ recipe.strMealThumb }
                    className="meal-img"
                    data-testid={ `${index}-card-img` }
                    alt={ recipe.strMeal }
                    style={ { borderRadius: 40, marginLeft: 40 } }
                  />
                </div>
              </Link>
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
