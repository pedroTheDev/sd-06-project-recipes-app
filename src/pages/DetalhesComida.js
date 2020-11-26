import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import ReceitasContext from '../context/ReceitasContext';
import DrinksCard from '../components/DrinksCard';
import Header from '../components/Header';
import { drinkAPI } from '../services/drinkAPI';
import { fetchFoodAPI } from '../services/foodAPI';

function DetalhesComida(props) {
  const { drinks, setDrinks, fetchById, setFetchById } = useContext(ReceitasContext);
  const { match: { params: { id } } } = props;
  const seis = 6;

  useEffect(() => {
    async function fetchDrink() {
      const responseFoodsAPI = await drinkAPI();
      const responseID = await fetchFoodAPI(id);

      setDrinks(responseFoodsAPI);
      setFetchById(responseID);
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

  return ((!fetchById)
    ? <div>carregando...</div>
    : (
      <section>
        <Header title="Detalhes Comidas" />
        {
          fetchById.map((meal, index) => (
            <div key={index}>
              <img data-testid="recipe-photo" src={meal.strMealThumb} alt="" />
              <h2 data-testid="recipe-title">{meal.strMeal}</h2>
              <button data-testid="share-btn" type="button">Compartilhar</button>
              <button data-testid="favorite-btn" type="button">Favoritar</button>
              <p data-testid="recipe-category">{meal.strCategory}</p>
              {getIngredients(meal, /strIngredient/).map((item, indx) => {
                const measure = getIngredients(meal, /strMeasure/);
                return (
                  <p
                    key={indx}
                    data-testid={`${indx}-ingredient-name-and-measure`}
                  >
                    { `- ${item} - ${measure[indx]} `}
                  </p>
                );
              })}
              <p data-testid="instructions">{meal.strInstructions}</p>
              <iframe
                data-testid="video"
                src={meal.strYoutube.replace('watch?v=', 'embed/')}
                title="frame"
              />
              <h2>Receitas Recomendadas</h2>
              <div>
                {drinks
                  .filter((_, indx) => indx < seis)
                  .map((drink, i) => (
                    <div data-testid={`${i}-recomendation-card`}>
                      <DrinksCard key={drink} drink={drink} index={i} />
                    </div>
                  ))}
              </div>
              <button
                data-testid="start-recipe-btn"
                type="button"
              >
                Iniciar Receita
              </button>
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
