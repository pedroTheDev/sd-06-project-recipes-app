import React from 'react';
import { Redirect } from 'react-router-dom';
import RecipeCard from './RecipeCard';
import findMatchInKeys from '../helpers/assets';

export default function RecipesList(props) {
  const { pathname, recipes, title, recipeConfig, isLoading } = props;
  const { type } = recipeConfig;

  const renderRecipesResults = () => {
    console.log('recipesType', recipes[type]);
    const maxRecipesNumber = 12;
    if (recipes[type]) {
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
    const results = recipes[type];
    const recipe = results[0];
    if (recipes[type]) {
      console.log('recipe:', recipe, 'recipes:', recipes, 'results:', results);
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
