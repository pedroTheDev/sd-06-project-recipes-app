import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

function DetalhesComida() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const history = useHistory();
  const idMeal = history.location.pathname.split('/')[2];

  useEffect(() => {
    async function fetchAPI() {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`);
      const responseJson = await response.json();
      setData(responseJson.meals[0]);
      setIsLoading(false);
    }
    fetchAPI();
  }, [idMeal]);

  console.log(data);
  return (
    <div>
      {(isLoading)
        ? <p>Loading</p>
        : (
          <div>
            <img
              data-testid="recipe-photo"
              src={ data.strMealThumb }
              alt={ data.strMeal }
            />
            <h1 data-testid="recipe-title">{ data.strMeal }</h1>
            <p data-testid="recipe-category">{ data.strCategory }</p>
            <button data-testid="share-btn" type="button">Compartilhar</button>
            <button data-testid="favorite-btn" type="button">Favoritar</button>
            <h2>Ingredientes</h2>
            <ul>
              {
                Object.keys(data)
                  .filter((keys) => keys.includes('Ingredient'))
                  .map((ingredient, index) => {
                    const measure = Object.keys(data)
                      .filter((keys) => keys.includes('Measure'));
                    const measureIndex = measure[index];
                    if (data[ingredient] !== '' && data[ingredient] !== null) {
                      return (
                        <li
                          key={ index }
                          data-testid={ `${index}-ingredient-name-and-measure` }
                        >
                          { `${data[ingredient]} - ${data[measureIndex]} ` }
                        </li>
                      );
                    }
                    return '';
                  })
              }
            </ul>
            <br />
            <h2>Instruções</h2>
            <p data-testid="instructions">{ data.strInstructions }</p>
            <br />
            <h2>Vídeo</h2>
            <video data-testid="video" width="300" height="250" controls>
              <source src={ data.strYoutube } type="video/mp4" />
              <track src="" kind="captions" />
            </video>
            <h2>Recomendadas</h2>

            <button data-testid="start-recipe-btn" type="button">Iniciar receita</button>
          </div>) }
    </div>
  );
}
export default DetalhesComida;
