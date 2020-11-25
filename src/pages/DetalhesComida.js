import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { shareIcon, whiteHeartIcon, blackHeartIcon } from '../images';

function DetalhesComida() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
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

  useEffect(() => {
    if (localStorage.favoriteRecipes) {
      setIsFavorite(true);
    }
  }, []);

  const handleClick = () => {
    setIsFavorite(!isFavorite);
    if (!isFavorite) {
      localStorage.favoriteRecipes = JSON.stringify([{
        id: data.idMeal,
        type: 'comida',
        area: data.strArea,
        category: data.strCategory,
        alcoholicOrNot: '',
        name: data.strMeal,
        image: data.strMealThumb,
        // doneDate: ,
        tags: [data.strTags],
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
              src={ data.strMealThumb }
              alt={ data.strMeal }
            />
            <h1 data-testid="recipe-title">{ data.strMeal }</h1>
            <p data-testid="recipe-category">{ data.strCategory }</p>
            <button
              data-testid="share-btn"
              type="button"
            >
              <img
                src={ shareIcon }
                alt="Botão de Compartilhar"
              />
            </button>
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
