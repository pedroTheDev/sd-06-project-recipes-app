import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
import RecipesList from '../components/RecipesList';
import { addRecipes, changeIsFetchin } from '../redux/actions/searchRecipes';
import useFetch from '../helpers/effects/useFetch';
import Footer from '../components/Footer';

function Food(props) {
  const { history: { location: { pathname } }, recipes,
    pageConfig,
    fetchmap,
    dispatchRecipes, data, isFetchin, dispatchFetching } = props;

  const { header, recipe } = pageConfig;
  const { title } = header;
  const { inputText, radioSearchSelection } = data;

  useFetch(
    title,
    inputText,
    radioSearchSelection,
    dispatchRecipes,
    isFetchin,
    dispatchFetching,
    fetchmap,
    recipe,
  );
  console.log('page:', title, 'varRecipeType:', recipe.type);

  // useFetchOnMount(fetchmap, title, dispatchRecipes);

  return (
    <>
      <Header
        pathname={ pathname }
        componentConfig={ header }
      />
      <RecipesList
        title={ title }
        recipes={ recipes }
        fetchmap={ fetchmap }
        dispatchRecipes={ dispatchRecipes }
        recipeConfig={ recipe }
        pathname={ pathname }
      />
      <Footer />
    </>
  );
}

const mapStateToProps = (state) => ({
  recipes: state.searchRecipes.recipes,
  pageConfig: state.sitemap.comidas,
  fetchmap: state.fetchmap,
  data: state.searchRecipes.data,
  isFetchin: state.searchRecipes.isFetchin,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchRecipes: (recipes) => dispatch(addRecipes(recipes)),
  dispatchFetching: (isFetchin) => dispatch(changeIsFetchin(isFetchin)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Food);

Food.propTypes = {
  recipes: PropTypes.shape({
    type: PropTypes.string,
    results: PropTypes.arrayOf(PropTypes.any),
  }).isRequired,
  data: PropTypes.shape({
    inputText: PropTypes.string.isRequired,
    radioSearchSelection: PropTypes.string.isRequired,
  }).isRequired,
  fetchmap: PropTypes.shape({
    all: PropTypes.func,
  }).isRequired,
  isFetchin: PropTypes.bool.isRequired,
  dispatchFetching: PropTypes.func.isRequired,
  dispatchRecipes: PropTypes.func.isRequired,
  pageConfig: PropTypes.shape({
    header: PropTypes.shape({
      title: PropTypes.string.isRequired,
      profileButton: PropTypes.bool.isRequired,
      searchButton: PropTypes.bool.isRequired,
    }),
    recipe: PropTypes.shape({
      type: PropTypes.string.isRequired,
    }),
  }).isRequired,
  history: PropTypes.shape({
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
