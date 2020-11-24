import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
import RecipeResults from '../components/RecipeResults';
import findMatchInKeys from '../helpers/assets';
import Footer from '../components/Footer';

function Food(props) {
  const { history: { location: { pathname } }, recipes } = props;
  const [showMultipleResults, setShowMultipleResults] = useState(false);

  const renderRecipesResults = () => {
    const maxRecipesNumber = 12;
    if (showMultipleResults) {
      return (
        recipes.results.filter((_recipe, index) => index < maxRecipesNumber)
          .map((recipe, index) => (<RecipeResults
            pathname={ pathname }
            recipe={ recipe }
            key={ recipe[findMatchInKeys('id', recipe)] }
            recipeIndex={ index }
          />))
      );
    }
    return null;
  };

  return (
    <>
      <Header
        pathname={ pathname }
        setShowMultipleResults={ setShowMultipleResults }
      />
      <div className="main__page__recipe-container">
        {renderRecipesResults()}
      </div>
      <Footer />
    </>
  );
}

const mapStateToProps = (state) => ({
  recipes: state.searchRecipes.recipes,
});

export default connect(mapStateToProps, null)(Food);

Food.propTypes = {
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
