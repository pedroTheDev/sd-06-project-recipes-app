import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { fetcherThunk } from '../redux/actions/mainPageFetcher';
import CategoryMenu from '../components/CategoryMenu';
import Footer from '../components/Footer';
import Header from '../components/Header';
import RecipeCard from '../components/RecipeCard';

const MainPage = (props) => {
  const { recipeList, location: { pathname }, isLoading, retrievedFood } = props;

  const checkRequestSize = (recipeList) => {
    const noLength = 0;
    if (recipeList === null) {
      alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
    } else if (recipeList.length === noLength) {
      return null;
    } else if (recipeList.length === 1) {
      const { id } = recipeList[0];
      return <Redirect to={ `${ pathname }/${ id }` } />;
    } else {
      return (
        recipeList.map(({ name, image, id }, index) => (
          <RecipeCard
            key={ id }
            recipeName={ name }
            recipeImage={ image }
            id={ id }
            foodOrDrink={ pathname }
            index={ index }
          />
        ))
      );
    }
  }

  const dispatch = useDispatch();

  useEffect(
    () => { dispatch(fetcherThunk(pathname)); }, [pathname, dispatch],
  );

  if (isLoading) return <div>carregando</div>;
  return (
    <div>
      <Header pageName={ pathname } renderSearch />
      <CategoryMenu pathname={ pathname } />
      {
        checkRequestSize(recipeList)
      }
      <Footer />
    </div>
  );
};

const mapStateToProps = (state) => ({
  recipeList: state.mainPageReducer.recipeList,
  isLoading: state.mainPageReducer.loading,
  retrievedFood: state.searchReducer.meals,
});

MainPage.propTypes = {
  recipeList: PropTypes.instanceOf(Array).isRequired,
  location: PropTypes.shape({ pathname: PropTypes.string }).isRequired,
  isLoading: PropTypes.bool,
};

export default connect(mapStateToProps)(MainPage);
