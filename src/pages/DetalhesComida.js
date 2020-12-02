import React, { useContext, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';
import useCopyToClipboard from '../hooks/useCopyToClipboard';
import { shareIcon, whiteHeartIcon, blackHeartIcon,
  setaDireita, setaEsquerda } from '../images';
import '../style/Detalhes.css';

function DetalhesComida() {
  const timeoutTextCopy = 3000;
  const SEIS = 6;
  const ZERO = 0;
  const UM = 1;
  const QUATRO = 4;
  const { data, isLoading } = useContext(RecipesContext);
  const [isCopied, handleCopy] = useCopyToClipboard(timeoutTextCopy);
  const [dataMeal, setDataMeal] = useState([]);
  const [drinks, setDrinks] = useState([]);
  const [next, setNext] = useState(ZERO);
  const [loadingMeal, setloadingMeal] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  const history = useHistory();
  const idMeal = history.location.pathname.split('/')[2];

  let continuar = false;
  if (localStorage.inProgressRecipes) {
    if (JSON.parse(localStorage.inProgressRecipes).meals) {
      const ids = Object.keys(JSON.parse(localStorage.inProgressRecipes).meals);
      continuar = ids.includes(idMeal);
    }
  }

  useEffect(() => {
    async function fetchAPI() {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`);
      const responseJson = await response.json();
      setDataMeal(responseJson.meals[0]);
      setloadingMeal(false);
    }
    fetchAPI();
  }, [idMeal]);

  useEffect(() => {
    if (localStorage.favoriteRecipes) {
      const favoriteRecipes = JSON.parse(localStorage.favoriteRecipes);
      favoriteRecipes.forEach((favorite) => {
        if (favorite.id === idMeal) {
          setIsFavorite(true);
        }
      });
    }
  }, []);

  useEffect(() => {
    if (!isLoading) {
      setDrinks(data[1].drinks.filter((_, index) => index < SEIS));
    }
  }, [isLoading]);

  const changeNext = (valor) => {
    if ((next + valor) > QUATRO) return setNext(ZERO);
    if ((next + valor) < ZERO) return setNext(QUATRO);
    setNext(next + valor);
  };

  const handleClick = () => {
    setIsFavorite(!isFavorite);
    if (!isFavorite) {
      let favoriteRecipes = [];
      if (localStorage.favoriteRecipes) {
        favoriteRecipes = JSON.parse(localStorage.favoriteRecipes);
      }
      localStorage.favoriteRecipes = JSON.stringify([...favoriteRecipes, {
        id: dataMeal.idMeal,
        type: 'comida',
        area: dataMeal.strArea,
        category: dataMeal.strCategory,
        alcoholicOrNot: '',
        name: dataMeal.strMeal,
        image: dataMeal.strMealThumb,
      }]);
    } else {
      localStorage.removeItem('favoriteRecipes');
    }
  };

  return (
    <div>
      {(loadingMeal)
        ? <p>Loading</p>
        : (
          <div className="container-details">
            <img
              data-testid="recipe-photo"
              src={ dataMeal.strMealThumb }
              alt={ dataMeal.strMeal }
            />
            <div className="div-header">
              <div className="div-icon">
                <span>
                  <button
                    data-testid="share-btn"
                    type="button"
                    onClick={ () => handleCopy(`/comidas/${idMeal}`) }
                  >
                    <img
                      src={ shareIcon }
                      alt="Botão de Compartilhar"
                    />
                  </button>
                  { isCopied ? <p>Link copiado!</p> : true }
                </span>
                <button
                  type="button"
                  onClick={ handleClick }
                >
                  <img
                    data-testid="favorite-btn"
                    src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
                    alt="Botão de Favorito"
                  />
                </button>
              </div>
              <div className="div-title">
                <h1 data-testid="recipe-title">{ dataMeal.strMeal }</h1>
                <p data-testid="recipe-category">{ dataMeal.strCategory }</p>
              </div>
            </div>
            <div className="div-recipes">
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
              <div className="cards">
                <div className="scroller">
                  { drinks.map((drink, index) => (
                    <div
                      key={ index }
                      className={
                        (index !== next && index !== next + 1)
                          ? 'card invisible'
                          : 'card'
                      }
                      data-testid={ `${index}-recomendation-card` }
                    >
                      <img src={ drink.strDrinkThumb } alt={ drink.strDrink } />
                      <h2
                        data-testid={ `${index}-recomendation-title` }
                      >
                        { drink.strDrink }
                      </h2>
                    </div>
                  )) }
                </div>
              </div>
              <div className="div-buttons-scroller">
                <button type="button" onClick={ () => { changeNext(-UM); } }>
                  <img src={ setaEsquerda } alt="Anterior" />
                </button>
                <button type="button" onClick={ () => { changeNext(UM); } }>
                  <img src={ setaDireita } alt="Próximo" />
                </button>
              </div>
            </div>
            <Link to={ `/comidas/${idMeal}/in-progress` }>
              <button
                className="start-recipe"
                data-testid="start-recipe-btn"
                type="button"
              >
                { continuar ? 'Continuar Receita' : 'Iniciar Receita' }
              </button>
            </Link>
          </div>
        ) }
    </div>
  );
}

export default DetalhesComida;
