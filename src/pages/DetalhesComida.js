import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';
import '../style/Detalhes.css';

function DetalhesComida() {
  const { data } = useContext(RecipesContext);
  const [dataMeal, setDataMeal] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const history = useHistory();
  const idMeal = history.location.pathname.split('/')[2];
  const SEIS = 6;

  useEffect(() => {
    async function fetchAPI() {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`);
      const responseJson = await response.json();
      setDataMeal(responseJson.meals[0]);
      setIsLoading(false);
    }
    fetchAPI();
  }, [idMeal]);

  return (
    <div>
      {(isLoading)
        ? <p>Loading</p>
        : (
          <div className="container-details">
            <img
              data-testid="recipe-photo"
              src={ dataMeal.strMealThumb }
              alt={ dataMeal.strMeal }
            />
            <h1 data-testid="recipe-title">{ dataMeal.strMeal }</h1>
            <p data-testid="recipe-category">{ dataMeal.strCategory }</p>
            <button data-testid="share-btn" type="button">Compartilhar</button>
            <button data-testid="favorite-btn" type="button">Favoritar</button>
            <h2>Ingredientes</h2>
            <ul>
              {
                Object.keys(dataMeal)
                  .filter((keys) => keys.includes('Ingredient'))
                  .map((ingredient, index) => {
                    const measure = Object.keys(dataMeal)
                      .filter((keys) => keys.includes('Measure'));
                    const measureIndex = measure[index];
                    if (dataMeal[ingredient] !== '' && dataMeal[ingredient] !== null) {
                      return (
                        <li
                          key={ index }
                          data-testid={ `${index}-ingredient-name-and-measure` }
                        >
                          { `${dataMeal[ingredient]} - ${dataMeal[measureIndex]} ` }
                        </li>
                      );
                    }
                    return '';
                  })
              }
            </ul>
            <br />
            <h2>Instruções</h2>
            <p data-testid="instructions">{ dataMeal.strInstructions }</p>
            <br />
            <h2>Vídeo</h2>
            <video data-testid="video" width="300" height="250" controls>
              <source src={ dataMeal.strYoutube } type="video/mp4" />
              <track src="" kind="captions" />
            </video>

            <h2>Recomendadas</h2>
            {
              data[1] && data[1].drinks
                .filter((_, index) => index < SEIS)
                .map(({ strDrink, strDrinkThumb }, index) => (
                  <div key={ strDrink } data-testid={ `${index}-recomendation-card` }>
                    <img src={ strDrinkThumb } alt={ strDrink } />
                    <h2 data-testid={ `${index}-recomendation-title` }>{ strDrink }</h2>
                  </div>
                ))
            }

            <button
              className="start-recipe"
              data-testid="start-recipe-btn"
              type="button"
            >
              Iniciar receita
            </button>
          </div>) }
    </div>
  );
}
export default DetalhesComida;
