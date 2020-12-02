import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Footer from '../components/Footer';
import IngredientCard from '../components/ingredientCard';
import Context from '../context/Context';

function IngredientsMeal({ history }) {
  const FALSE = false;
  const { ingredients, ingredientToRender } = useContext(Context);

  useEffect(() => {
    ingredientToRender('meal');
  }, []);
  return (
    <div>
      <Header title="Explorar Ingredientes" search={ FALSE } />
      <div className="recipes-cards">
        {
          ingredients.map((ingredient, index) => (
            <IngredientCard
              key={ ingredient.strIngredient }
              info={ ingredient }
              recipe="ingredientsMeals"
              index={ index }
              history={ history }
            />
          ))
        }
      </div>
      <Footer />
    </div>
  );
}

IngredientsMeal.propTypes = { history: PropTypes.func.isRequired };

export default IngredientsMeal;
