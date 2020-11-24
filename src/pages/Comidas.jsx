import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect, useDispatch } from 'react-redux';
import { fetcherThunk } from '../redux/actions/mainPageFetcher';
import CategoryMenu from '../components/CategoryMenu';
import Footer from '../components/Footer';
import RecipeCard from '../components/RecipeCard';

const Comidas = (props) => {
  const { recipeList, location: { pathname }, isLoading } = props;
  const dispatch = useDispatch();

  useEffect(
    () => { dispatch(fetcherThunk(pathname)); }, [pathname, dispatch],
  );

  if (isLoading) return <div>carregando</div>;
  return (
    <div>
      <CategoryMenu pathname={ pathname } />
      {
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
      }
      <Footer />
    </div>
  );
};

const mapStateToProps = (state) => ({
  recipeList: state.mainPageReducer.recipeList,
  isLoading: state.mainPageReducer.loading,
});

Comidas.propTypes = {
  recipeList: PropTypes.instanceOf(Array).isRequired,
  location: PropTypes.shape({ pathname: PropTypes.string }).isRequired,
  isLoading: PropTypes.bool,
};

export default connect(mapStateToProps)(Comidas);
