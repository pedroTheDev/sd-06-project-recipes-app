import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Footer from '../components/Footer';
import DrinkRecipeCard from '../components/Cards';
import Context from '../context/Context';

function Drinks({ history }) {
  const TRUE = true;
  const {
    ingredientExplore,
    setIngredientExplore,
    recipes,
    recipesToRender,
    categoriesToRender,
    recipesToRenderByIngredient,
  } = useContext(Context);

  useEffect(() => {
    if (ingredientExplore) {
      recipesToRenderByIngredient('drink', ingredientExplore);
      setIngredientExplore('');
    } else recipesToRender('drink');
    categoriesToRender('drink');
  }, []);

  return (
    <div>
      <Header title="Bebidas" search={ TRUE } />
      <div className="recipes-cards">
        {recipes.length === 1 ? history.push(`/bebidas/${recipes[0].idDrink}`) : (
          recipes.map((drink, index) => (
            <DrinkRecipeCard
              key={ drink.strDrink }
              info={ drink }
              recipe="bebidas"
              index={ index }
            />
          )))}
      </div>
      <Footer />
    </div>
  );
}

Drinks.propTypes = {
  history: PropTypes.func.isRequired,
};

export default Drinks;
