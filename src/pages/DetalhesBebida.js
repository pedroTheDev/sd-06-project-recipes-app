import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ReceitasContext from '../context/ReceitasContext';
import MealsCard from '../components/MealsCard';
import Header from '../components/Header';
import { fetchDrinkAPI } from '../services/drinkAPI';
import { foodAPI } from '../services/foodAPI';
import "../style/Detalhes.css";

function DetalhesBebida(props) {
  const { meals, setMeals, fetchById, setFetchById,
    beganRecipes, setBeganRecipes, doneRecipes,
  } = useContext(ReceitasContext);
  const { match: { params: { id } } } = props;
  let startedRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
  const seis = 6;

  useEffect(() => {
    async function fetchFood() {
      const foodResponse = await foodAPI();
      const responseAPI = await fetchDrinkAPI(id);

      setMeals(foodResponse);
      setFetchById(responseAPI);
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

  const startRecipe = (recipeName) => { 
    localStorage.setItem('inProgressRecipes', JSON.stringify({ cocktails: { [recipeName]: fetchById } }))
    if (!beganRecipes.includes(recipeName)) setBeganRecipes([ ...beganRecipes, recipeName ]);
  };

  const verifyState = (idDrink) => {
    return !startedRecipes.cocktails[idDrink] ? 'Iniciar Receita' : 'Continuar Receita'; 
  }

  return ((!fetchById)
    ? <div>carregando...</div>
    : (
      <section>
        <Header title="Detalhes Bebidas" />
        {
          fetchById.map((drink, index) => (
            <div key={ index }>
              <img data-testid="recipe-photo" src={ drink.strDrinkThumb } alt="" />
              <h2 data-testid="recipe-title">{drink.strDrink}</h2>
              <button data-testid="share-btn" type="button">Compartilhar</button>
              <button data-testid="favorite-btn" type="button">Favoritar</button>
              <p data-testid="recipe-category">{drink.strAlcoholic}</p>
              {getIngredients(drink, /strIngredient/).map((item, indx) => {
                const measure = getIngredients(drink, /strMeasure/);
                return (
                  <p
                    key={ indx }
                    data-testid={ `${indx}-ingredient-name-and-measure` }
                  >
                    {`- ${item} - ${measure[indx]}`}
                  </p>
                );
              })}
              <h3>Instruções</h3>
              <p data-testid="instructions">{drink.strInstructions}</p>
              <h2>Receitas Recomendadas</h2>
              <div className="carousel">
                {meals.length && (meals
                  .filter((_, indx) => indx < seis)
                  .map((food, i) => (
                    <div key={ i } data-testid={ `${i}-recomendation-card` }>
                      <div data-testid={ `${i}-recomendation-title` }>  
                        <MealsCard food={ food } index={ i } />
                      </div>  
                    </div>
                  )))}
              </div>
              {!doneRecipes.includes(drink.idDrink) && (
                <Link to={ `/bebidas/${drink.idDrink}/in-progress` }>
                  <button
                    className="start-recipe-btn"
                    data-testid="start-recipe-btn"
                    type="button"
                    onClick={ () => startRecipe(drink.idDrink) }
                  >
                    {!startedRecipes ? 'Iniciar Receita' : verifyState(drink.idDrink)}
                  </button>
                </Link>
              )}
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
