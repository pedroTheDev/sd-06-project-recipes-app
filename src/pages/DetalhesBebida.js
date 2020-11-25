import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import copyToClipboard from 'clipboard-copy';
import { shareIcon, whiteHeartIcon, blackHeartIcon } from '../images';

function DetalhesBebida() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isShare, setShare] = useState();
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

  useEffect(() => {
    if (localStorage.favoriteRecipes) {
      setIsFavorite(true);
    }
  }, []);

  // useEffect(() => {
  //   copyToClipboard(`http://localhost:3000/bebidas/${idDrink}`);
  // }, [setShare]);

  const handleClick = () => {
    setIsFavorite(!isFavorite);
    if (!isFavorite) {
      localStorage.favoriteRecipes = JSON.stringify([{
        id: data.idDrink,
        type: 'bebida',
        area: '',
        category: data.strCategory,
        alcoholicOrNot: data.strAlcoholic,
        name: data.strDrink,
        image: data.strDrinkThumb,
      }]);
    } else {
      localStorage.removeItem('favoriteRecipes');
    }
  };

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
            <span>
              <button
                data-testid="share-btn"
                type="button"
                onClick={ () => setShare('Link copiado!') }
              >
                <img
                  src={ shareIcon }
                  alt="Botão de Compartilhar"
                />
              </button>
              {isShare}
            </span>
            <button
              data-testid="favorite-btn"
              type="button"
              onClick={ handleClick }
              src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
            >
              <img
                src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
                alt="Botão de Favorito"
              />
            </button>
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
