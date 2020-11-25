import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import ReceitasContext from '../context/ReceitasContext';
import MealsCard from '../components/MealsCard';
import Header from '../components/Header';
import { foodAPI } from '../services/foodAPI';

function DetalhesBebida(props) {
  const { meals, drinks, setMeals } = useContext(ReceitasContext);
  const { match: { params: { id } } } = props;
  const seis = 6;

  useEffect(() => {
    async function fetchFood() {
      const responseFoodsAPI = await foodAPI();

      setMeals(responseFoodsAPI);
    }

    fetchFood();
  }, []);

  const getIngredients = (obj, filter) => {
    const keys = [];
    Object.keys(obj).forEach((key) => {
      if (key && filter.test(key) && obj[key] !== '' && obj[key] !== null) {
        keys.push(obj[key]);
      }
    });
    return keys;
  };

  return ((!meals.length)
    ? <div>carregando...</div>
    : (
      <section>
        <Header title="Bebidas" />
        {
          drinks.filter((item) => item.idDrink === id)
            .map((drink, index) => (
              <div key={ index }>
                <img data-testid="recipe-photo" src={ drink.strDrinkThumb } alt="" />
                <h2 data-testid="recipe-title">{drink.strDrink}</h2>
                <button data-testid="share-btn" type="button">Compartilhar</button>
                <button data-testid="favorite-btn" type="button">Favoritar</button>
                <p data-testid="recipe-category">{drink.strCategory}</p>
                <ul>
                  {getIngredients(drink, /strIngredient/).map((item, indx) => {
                    const measure = getIngredients(drink, /strMeasure/);
                    return (
                      <li key={ indx }>
                        <p
                          data-testid={ `${indx}-ingredient-name-and-measure` }
                        >
                          { `- ${item} - ${measure[indx]} ` }
                        </p>
                      </li>
                    );
                  })}
                </ul>
                <h3>Instruções</h3>
                <p data-testid="instructions">{drink.strInstructions}</p>
                <button
                  data-testid="start-recipe-btn"
                  type="button"
                >
                  Iniciar Receita
                </button>
                <h2>Receitas Recomendadas</h2>
                <div>
                  {meals.length && (meals
                    .filter((_, indx) => indx < seis)
                    .map((food, i) => (
                      <MealsCard key={ food } food={ food } index={ i } />
                    )))}
                </div>
              </div>
            ))
        }
      </section>
    ));
}

DetalhesBebida.propTypes = {
  match: PropTypes.shape({
    path: PropTypes.string,
    params: PropTypes.shape({ id: PropTypes.string }),
  }).isRequired,
};

export default DetalhesBebida;
