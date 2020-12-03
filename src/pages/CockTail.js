import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
import RecipesList from '../components/RecipesList';
import Footer from '../components/Footer';
import { addRecipes,
  changeIsFetchin, addDrinkCategories } from '../redux/actions/searchRecipes';
import useFetch from '../helpers/effects/useFetch';
import { fetchAPI } from '../helpers/APIRequests';
import DrinkCategoriesButtons from '../components/DrinkCategoriesButtons';

function CockTail(props) {
  const { history: { location: { pathname } },
    pageConfig, fetchmap, dispatchRecipes, data,
    isFetchin,
    dispatchFetching, dispatchCategories, drinkRecipes, categoriesFilterActive } = props;

  const [isLoading, setIsLoading] = useState(true);

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

  const allDrinkRecipesEndPoint = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
  useEffect(() => {
    async function fetchData() {
      const zero = 0;

      if (!drinkRecipes || !drinkRecipes.length) {
        setIsLoading(true);
        const initialRecipes = await fetchAPI(allDrinkRecipesEndPoint);
        dispatchRecipes(initialRecipes);
      }
      setIsLoading(false);

      dispatchCategories();
    }
    fetchData();
  }, []);

  return (

    <>

      {console.log(drinkRecipes) }
      <Header
        pathname={ pathname }
        componentConfig={ header }
      />
      <DrinkCategoriesButtons />
      <RecipesList
        title={ title }
        recipeConfig={ recipe }
        pathname={ pathname }
        isLoading={ isLoading }
        filter={ categoriesFilterActive }
        recipes={ drinkRecipes }
      />
      <Footer />
    </>
  );
}

const mapStateToProps = (state) => ({

  drinkRecipes: state.searchRecipes.recipes.drinks,
  pageConfig: state.sitemap.bebidas,
  fetchmap: state.fetchmap,
  data: state.searchRecipes.data,
  isFetchin: state.searchRecipes.isFetchin,
  categoriesFilterActive: state.searchRecipes.categoriesFilterActive,

});

const mapDispatchToProps = (dispatch) => ({
  dispatchRecipes: (recipes) => dispatch(addRecipes(recipes)),
  dispatchFetching: (isFetchin) => dispatch(changeIsFetchin(isFetchin)),
  dispatchCategories: (categories) => dispatch(addDrinkCategories(categories)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CockTail);

CockTail.propTypes = {

  data: PropTypes.shape({
    inputText: PropTypes.string.isRequired,
    radioSearchSelection: PropTypes.string.isRequired,
  }).isRequired,
  fetchmap: PropTypes.shape({
    all: PropTypes.func,
  }).isRequired,
  isFetchin: PropTypes.bool.isRequired,
  dispatchCategories: PropTypes.func.isRequired,
  dispatchFetching: PropTypes.func.isRequired,
  dispatchRecipes: PropTypes.func.isRequired,
  drinkRecipes: PropTypes.arrayOf(PropTypes.any).isRequired,
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
  categoriesFilterActive: PropTypes.shape({
    Comidas: PropTypes.bool.isRequired,
    Bebidas: PropTypes.bool.isRequired,
  }).isRequired,
};
