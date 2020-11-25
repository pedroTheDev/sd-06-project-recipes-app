import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import ReceitasContext from '../context/ReceitasContext';
import DrinksCard from '../components/DrinksCard';
import Header from '../components/Header';
import { drinkAPI } from '../services/drinkAPI';

function DetalhesComida(props) {
  const { meals, drinks, setDrinks } = useContext(ReceitasContext);
  const { match: { params: { id } } } = props;
  const seis = 6;

  useEffect(() => {
    async function fetchDrink() {
      const responseFoodsAPI = await drinkAPI();

      setDrinks(responseFoodsAPI);
    }

    fetchDrink();
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

  return ((!drinks.length)
    ? <div>carregando...</div>
    : (
      <section>
        <Header title="Comidas" />
        {
          meals.filter((item) => item.idMeal === id)
            .map((meal, index) => (
              <div key={ index }>
                <img data-testid="recipe-photo" src={ meal.strMealThumb } alt="" />
                <h2 data-testid="recipe-title">{meal.strMeal}</h2>
                <button data-testid="share-btn" type="button">Compartilhar</button>
                <button data-testid="favorite-btn" type="button">Favoritar</button>
                <p data-testid="recipe-category">{meal.strCategory}</p>
                <ul>
                  {getIngredients(meal, /strIngredient/).map((item, indx) => {
                    const measure = getIngredients(meal, /strMeasure/);
                    return (
                      <li key={ indx }>
                        <p
                          data-testid={ `${indx}-ingredient-name-and-measure` }
                        >
                          { `${item} - ${measure[indx]} ` }
                        </p>
                      </li>
                    );
                  })}
                </ul>
                <p data-testid="instructions">{meal.strInstructions}</p>
                <iframe
                  src={ meal.strYoutube.replace('watch?v=', 'embed/') }
                  title="frame"
                />
                <button
                  data-testid="start-recipe-btn"
                  type="button"
                >
                  Iniciar Receita
                </button>
                <h2>Receitas Recomendadas</h2>
                <div>
                  {drinks
                    .filter((_, indx) => indx < seis)
                    .map((drink, i) => (
                      <DrinksCard key={ drink } drink={ drink } index={ i } />
                    ))}
                </div>
              </div>
            ))
        }
      </section>
    ));
}

DetalhesComida.propTypes = {
  match: PropTypes.shape({
    path: PropTypes.string,
    params: PropTypes.shape({ id: PropTypes.string }),
  }).isRequired,
};

export default DetalhesComida;
