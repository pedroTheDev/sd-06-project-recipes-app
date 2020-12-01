import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { fetchFoodByIngredient,
  fetchDrinkByIngredient } from '../redux/actions/searchRecipes';

function IngredientCard({ name, index, pathname, dispatchFetchDrinkByIngredient,
  dispatchFetchFoodByIngredient, isRecipesLoading, thumb }) {
  const [redirectState, setRedirectState] = useState(false);
  const componentRedirect = useRef(false);
  const [loadingIngredients, setLoadingIngredients] = useState(true);
  console.log(thumb);
  useEffect(() => {
    if (componentRedirect.current && !isRecipesLoading) {
      setRedirectState(true);
    }
  }, [isRecipesLoading]);

  useEffect(() => {
    if (thumb) setLoadingIngredients(false);
  }, [thumb]);

  const getCorrespondentRecipePage = (path) => {
    if (path.split('/').some((el) => el.includes('comidas'))) {
      return '/comidas';
    }
    return '/bebidas';
  };

  const handleClick = (ingredientName, path) => {
    if (getCorrespondentRecipePage(path) === '/comidas') {
      dispatchFetchFoodByIngredient(ingredientName);
    } else {
      dispatchFetchDrinkByIngredient(ingredientName);
      console.log('dispatchFetchdrink');
    }
    componentRedirect.current = true;
  };

  const renderRedirectToMainPage = (boolRedirectState, path) => {
    if (boolRedirectState) {
      return <Redirect to={ getCorrespondentRecipePage(path) } replace />;
    }
  };

  const renderIngredientCard = (ingredientIndex, strThumb, ingredientName, path) => {
    console.log(strThumb);
    if (!loadingIngredients) {
      return (
        <div
          data-testid={ `${ingredientIndex}-ingredient-card` }
        >
          <button
            type="button"
            onClick={ () => handleClick(ingredientName, path) }
          >

            <p data-testid={ `${ingredientIndex}-card-name` }>{ingredientName}</p>
          </button>

          <img
            src={ thumb }
            alt={ thumb }
            data-testid={ `${index}-card-img` }
          />
        </div>

      );
    }
  };

  return (
    <>
      {renderRedirectToMainPage(redirectState, pathname)}
      {renderIngredientCard(index, thumb, name, pathname)}

    </>
  );
}

const mapStateToProps = (state) => ({
  isRecipesLoading: state.searchRecipes.isRecipesFetching,
  foodThumbs: state.searchRecipes.foodIngredientsThumbs,
  drinkThumbs: state.searchRecipes.drinkIngredientsThumbs,

});

const mapDispatchToProps = (dispatch) => ({
  dispatchFetchFoodByIngredient: (ingredientName) => (
    dispatch(fetchFoodByIngredient(ingredientName))),
  dispatchFetchDrinkByIngredient: (ingredientName) => (
    dispatch(fetchDrinkByIngredient(ingredientName))
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(IngredientCard);
