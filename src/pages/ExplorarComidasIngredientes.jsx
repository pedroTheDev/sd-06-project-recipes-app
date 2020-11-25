import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Context from '../context/Context';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import * as api from '../services/Api';

export default function ExplorarComidasingredientes({ history }) {
  const { titulo, setTitulo, loading, setLoading, setMealsByIngredient } = useContext(Context);
  const [ingredients, setIngredients] = useState([]);

  const fetchIngredients = async () => {
    setLoading(true);
    const response = await api.fetchFoodIngredients();
    setIngredients(response);
    setLoading(false);
  };

  useEffect(() => {
    setTitulo('Explorar Ingredientes');
    fetchIngredients();
  }, []);

  const onClick = async (name) => {
    setLoading(true);
    const response = await api.fetchFoodByIngredients(name);
    setMealsByIngredient(response);
    setLoading(false);
    // history.push('/comidas');
  };

  return (
    <div>
      <Header titulo={ titulo } />
      {loading ? <p>Loading</p>
        : (
          ingredients.map((ingredient, index) => (
            <div
              data-testid={ `${index}- ingredient-card` }
              key={ index }
            >
              <p
                data-testid={ `${index}-card-name` }
              >
                { ingredient.strIngredient }
              </p>
              <img
                data-testid={ `${index}-card-img` }
                src={ `https://www.themealdb.com/images/ingredients/${ingredient.strIngredient}-Small.png` }
                alt={ `${ingredient.strIngredient}-pic` }
              />
              <button
                type="button"
                onClick={ onClick(ingredient.strIngredient) }
              >
                Receitas
              </button>
            </div>
          ))
        )
      }
      <Footer />
    </div>
  );
}

ExplorarComidasingredientes.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};