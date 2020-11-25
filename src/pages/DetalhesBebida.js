import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

function DetalhesBebida() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const history = useHistory();
  const idDrink = history.location.pathname.split('/')[2];

  useEffect(() => {
    async function fetchAPI() {
      const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idDrink}`);
      const responseJson = await response.json();
      setData(responseJson.drinks[0]);
      setIsLoading(false);
    }
    fetchAPI();
  }, [idDrink]);
  console.log(data);
  return (
    <div>
      {(isLoading)
        ? <p>Loading</p>
        : (
          <div>
            <img
              data-testid="recipe-photo"
              src={ data.strDrinkThumb }
              alt={ data.strDrink }
            />
            <h1 data-testid="recipe-title">{ data.strDrink }</h1>
            <p data-testid="recipe-category">{ data.strAlcoholic }</p>
            <button data-testid="share-btn" type="button">Compartilhar</button>
            <button data-testid="favorite-btn" type="button">Favoritar</button>
            <h2>Ingredientes:</h2>
            <ul>
              {
                Object.keys(data)
                  .filter((keys) => keys.includes('Ingredient'))
                  .map((ingredient, index) => {
                    if (data[ingredient] !== '' && data[ingredient] !== null) {
                      const measure = Object.keys(data)
                        .filter((keys) => keys.includes('Measure'));
                      const measureIndex = measure[index];
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
            <h2>Instruções:</h2>
            <p data-testid="instructions">{ data.strInstructions }</p>
            <br />
            <h2>Recomendadas</h2>
            <button data-testid="start-recipe-btn" type="button">Iniciar receita</button>
          </div>) }
    </div>
  );
}

export default DetalhesBebida;
