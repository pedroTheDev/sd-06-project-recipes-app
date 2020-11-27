import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import RecipeCard from './RecipeCard';
import findMatchInKeys from '../helpers/assets';

function RecipesList(props) {
  const { pathname, recipes, title, recipeConfig, isLoading } = props;
  const { type } = recipeConfig;
  console.log(pathname, recipes, 'recipeslist');

  const renderRecipesResults = () => {
    const maxRecipesNumber = 12;
    if (recipes && recipes[type] && recipes[type].length > 1) {
      if (recipes[type].length > 1) {
        return (
          recipes[type].filter((_recipe, index) => index < maxRecipesNumber)
            .map((recipe, index) => (<RecipeCard
              pathname={ pathname }
              recipe={ recipe }
              key={ recipe[findMatchInKeys('id', recipe)] }
              recipeIndex={ index }
            />))
        );
      }
    }
  };

  const renderRedirectToSingleResult = () => {
    if (recipes && recipes[type]) {
      const results = recipes[type];
      const recipe = results[0];
      if (recipes[type].length === 1) {
        const id = findMatchInKeys('id', recipe);
        return <Redirect to={ `${title.toLowerCase()}/${recipe[id]}` } />;
      }
    }
  };

  const renderSearchResults = () => (
    <>
      {renderRedirectToSingleResult()}
      {renderRecipesResults()}
    </>

  );

  const render = () => {
    if (!isLoading) {
      return renderSearchResults();
    }
    return <p>is loading</p>;
  };

  return render();
}

const mapStateToProps = (state) => ({
  recipes: state.searchRecipes.recipes,
});

export default connect(mapStateToProps, null)(RecipesList);
