import React, { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import Header from '../components/Header';
import Footer from '../components/Footer';
import RecipeCard from '../components/RecipeCard';
import { ingredientsThunk, successIngredients } from '../redux/actions/exploreActions';

function ComidasIngredientes(props) {
  const { ingredients, location: { pathname }, isLoading } = props;

  const dispatch = useDispatch();
  useEffect(() => {
    if (pathname === '/explorar/comidas/ingredientes') {
      return dispatch(ingredientsThunk('https://www.themealdb.com/api/json/v1/1/list.php?i=list'));
    }


  }, []);

  useEffect(() => {
    if (pathname === '/explorar/bebidas/ingredientes') {
      return dispatch(ingredientsThunk('https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list'));
    }
  }, []);



  if (isLoading) return <div>Carregando</div>;
  return (
    <main>
      <Header pageName="Explorar Ingredientes" renderSearch={ false } />
      ComidasIngredientes Page
      { 
        ingredients.map((ingredient, index) => (
            <RecipeCard
              dataTestId='ingredient'
              key={ ingredient }
              recipeName={ ingredient }
              recipeImage={
                pathname === '/explorar/bebidas/ingredientes'
                  ? `https://www.thecocktaildb.com/images/ingredients/${ingredient}-Small.png`
                  : `https://www.themealdb.com/images/ingredients/${ingredient}-Small.png`
              }
              redirectIngredient={
                pathname.includes('comidas')
                  ? '/comidas'
                  : '/bebidas'
              }
              id={ ingredient }
              foodOrDrink={ '/comidas' }
              index={ index }
              />
            ))
          }
      
      <Footer />
    </main>
  );
}

const mapStateToProps = (state) => ({
  ingredients: state.exploreReducer.ingredients,
  isLoading: state.exploreReducer.isLoading,
});

const mapDispatchToProps = (dispatch) => ({
  test: () => dispatch(successIngredients())
});

export default connect(mapStateToProps, mapDispatchToProps)(ComidasIngredientes);
