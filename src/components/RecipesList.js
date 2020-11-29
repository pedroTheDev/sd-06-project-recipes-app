import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import RecipeCard from './RecipeCard';
import findMatchInKeys from '../helpers/assets';

function RecipesList(props) {
  const { pathname,
    recipes, title, recipeConfig, isLoading, categoriesFilterActive } = props;
  const { type } = recipeConfig;
  console.log('btnActive', categoriesFilterActive[title]);

  const renderRecipesResults = () => {
    const maxRecipesNumber = 12;
    if (recipes[type].length > 1) {
      return (
        recipes[type].filter((_recipe, index) => index < maxRecipesNumber)
          .map((recipe, index) => (<RecipeCard
            pathname={ pathname }
            recipe={ recipe }
            key={ recipe[findMatchInKeys('id', recipe)] }
            id={ recipe[findMatchInKeys('id', recipe)] }
            recipeIndex={ index }
          />))
      );
    }
  };

  const renderRedirectToSingleResult = () => {
    const results = recipes[type];
    const recipe = results[0];
    if (recipes[type].length === 1 && !categoriesFilterActive[title]) {
      const id = findMatchInKeys('id', recipe);
      return <Redirect to={ `${title.toLowerCase()}/${recipe[id]}` } />;
    }
    if (recipes[type].length === 1) {
      return (
        <RecipeCard
          pathname={ pathname }
          recipe={ recipe }
          recipeIndex={ 0 }
          id={ recipe[findMatchInKeys('id', recipe)] }
        />);
    }
  };

  const renderSearchResults = () => (
    <>
      {renderRedirectToSingleResult()}
      {renderRecipesResults()}
    </>

  );

  const render = () => {
    if (!isLoading && recipes && recipes[type] && recipes[type].length > 0) {
      return renderSearchResults();
    }
    return <p>is loading</p>;
  };

  return render();
}

const mapStateToProps = (state) => ({
  recipes: state.searchRecipes.recipes,
  categoriesFilterActive: state.searchRecipes.categoriesFilterActive,
});

export default connect(mapStateToProps, null)(RecipesList);
