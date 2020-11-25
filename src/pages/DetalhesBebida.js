import React, { useContext, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';
import '../style/Detalhes.css';

function DetalhesBebida() {
  const { data } = useContext(RecipesContext);
  const [dataDrinks, setDataDrinks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const history = useHistory();
  const idDrink = history.location.pathname.split('/')[2];
  const SEIS = 6;

  let continuar = false;
  if (localStorage.inProgressRecipes) {
    const ids = Object.keys(JSON.parse(localStorage.inProgressRecipes).cocktails);
    continuar = ids.includes(idDrink);
  }

  useEffect(() => {
    async function fetchAPI() {
      const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idDrink}`);
      const responseJson = await response.json();
      setDataDrinks(responseJson.drinks[0]);
      setIsLoading(false);
    }
    fetchAPI();
  }, [idDrink]);

  return (
    <div>
      {(isLoading)
        ? <p>Loading</p>
        : (
          <div className="container-details">
            <img
              data-testid="recipe-photo"
              src={ dataDrinks.strDrinkThumb }
              alt={ dataDrinks.strDrink }
            />
            <h1 data-testid="recipe-title">{ dataDrinks.strDrink }</h1>
            <p data-testid="recipe-category">{ dataDrinks.strAlcoholic }</p>
            <button data-testid="share-btn" type="button">Compartilhar</button>
            <button data-testid="favorite-btn" type="button">Favoritar</button>
            <h2>Ingredientes:</h2>
            <ul>
              {
                Object.keys(dataDrinks)
                  .filter((keys) => keys.includes('Ingredient'))
                  .map((ingred, index) => {
                    if (dataDrinks[ingred] !== '' && dataDrinks[ingred] !== null) {
                      const measure = Object.keys(dataDrinks)
                        .filter((keys) => keys.includes('Measure'));
                      const measureIndex = measure[index];
                      return (
                        <li
                          key={ index }
                          data-testid={ `${index}-ingredient-name-and-measure` }
                        >
                          { `${dataDrinks[ingred]} - ${dataDrinks[measureIndex]} ` }
                        </li>
                      );
                    }
                    return '';
                  })
              }
            </ul>
            <br />
            <h2>Instruções:</h2>
            <p data-testid="instructions">{ dataDrinks.strInstructions }</p>
            <br />

            <h2>Recomendadas</h2>
            {
              data[0] && data[0].meals
                .filter((_, index) => index < SEIS)
                .map(({ strMeal, strMealThumb }, index) => (
                  <div key={ strMeal } data-testid={ `${index}-recomendation-card` }>
                    <img src={ strMealThumb } alt={ strMeal } />
                    <h2 data-testid={ `${index}-recomendation-title` }>{ strMeal }</h2>
                  </div>
                ))
            }
            <Link to={ `/bebidas/${idDrink}/in-progress` }>
              <button
                className="start-recipe"
                data-testid="start-recipe-btn"
                type="button"
              >
                { continuar ? 'Continuar Receita' : 'Iniciar Receita' }
              </button>
            </Link>
          </div>) }
    </div>
  );
}

export default DetalhesBebida;
