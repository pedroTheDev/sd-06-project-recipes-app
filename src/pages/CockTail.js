import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
import RecipesList from '../components/RecipesList';
import Footer from '../components/Footer';
import { addRecipes, changeIsFetchin } from '../redux/actions/searchRecipes';
import useFetch from '../helpers/effects/useFetch';
import { fetchAPI } from '../helpers/APIRequests';

function CockTail(props) {
  const { history: { location: { pathname } },
    pageConfig, fetchmap, dispatchRecipes, data,
    isFetchin, dispatchFetching } = props;

  const [isLoading, setIsLoading] = useState(true);

  const { header, recipe } = pageConfig;
  const { title } = header;
  const { inputText, radioSearchSelection } = data;
  console.log('isLoading cocktail', isLoading);
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

  const allFoodRecipesEndPoint = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
  const allDrinkRecipesEndPoint = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
  useEffect(() => {
    async function fetchData() {
      let initialRecipes;
      setIsLoading(true);
      if (pathname === '/comidas') {
        initialRecipes = await fetchAPI(allFoodRecipesEndPoint);
        dispatchRecipes(initialRecipes);
      } else {
        initialRecipes = await fetchAPI(allDrinkRecipesEndPoint);
        dispatchRecipes(initialRecipes);
      }
      setIsLoading(false);
    }
    fetchData();
    return () => {
      dispatchRecipes({ meals: [], drinks: [] });
    };
  }, []);

  return (
    <>
      <Header
        pathname={ pathname }
        componentConfig={ header }
      />
      <RecipesList
        title={ title }
        fetchmap={ fetchmap }
        dispatchRecipes={ dispatchRecipes }
        recipeConfig={ recipe }
        pathname={ pathname }
        isLoading={ isLoading }
      />
      <Footer />
    </>
  );
}

const mapStateToProps = (state) => ({
  recipes: state.searchRecipes.recipes,
  pageConfig: state.sitemap.bebidas,
  fetchmap: state.fetchmap,
  data: state.searchRecipes.data,
  isFetchin: state.searchRecipes.isFetchin,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchRecipes: (recipes) => dispatch(addRecipes(recipes)),
  dispatchFetching: (isFetchin) => dispatch(changeIsFetchin(isFetchin)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CockTail);

CockTail.propTypes = {
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
