import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
import RecipeResults from '../components/RecipeResults';
import findMatchInKeys from '../helpers/assets';

function Food(props) {
  const { history: { location: { pathname } }, recipes } = props;

  const renderRecipeResults = () => {
    if (recipes.results.length > 1) {
      return (
        recipes.results.map((recipe) => (<RecipeResults
          recipe={ recipe }
          key={ recipe[findMatchInKeys('id', recipe)] }
        />))
      );
    }
    return null;
  };

  return (
    <>
      <Header pathname={ pathname } />
      {renderRecipeResults()}
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
