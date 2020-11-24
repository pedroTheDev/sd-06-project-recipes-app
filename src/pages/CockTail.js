import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
import RecipeResults from '../components/RecipeResults';
import findMatchInKeys from '../helpers/assets';

function CockTail(props) {
  const { history: { location: { pathname } }, recipes } = props;
  const [showMultipleResults, setShowMultipleResults] = useState(false);

  const renderRecipeResults = () => {
    const maxRecipesNumber = 12;
    if (showMultipleResults) {
      return (
        recipes.results.filter((_recipe, index) => index < maxRecipesNumber)
          .map((recipe, index) => (<RecipeResults
            recipe={ recipe }
            pathname={ pathname }
            key={ recipe[findMatchInKeys('id', recipe)] }
            recipeIndex={ index }
          />))
      );
    }
    return null;
  };

  return (
    <>
      <Header pathname={ pathname } setShowMultipleResults={ setShowMultipleResults } />
      {renderRecipeResults()}
    </>
  );
}

const mapStateToProps = (state) => ({
  recipes: state.searchRecipes.recipes,
});

export default connect(mapStateToProps, null)(CockTail);

CockTail.propTypes = {
  recipes: PropTypes.shape({
    type: PropTypes.string,
    results: PropTypes.arrayOf(PropTypes.any),
  }).isRequired,
  history: PropTypes.shape({
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
