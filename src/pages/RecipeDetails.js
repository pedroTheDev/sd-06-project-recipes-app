import React, { useContext, useEffect, useState } from 'react';
import Context from '../context/Context';
import YouTube from 'react-youtube'
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg'

function RecipeDetails(props) {
  const { getMealDetail, getDrinkDetail, details } = useContext(Context);
  const { path } = props.match;
  const [change, setChange] = useState(true);
  const [fav, setFav] = useState('white');

  useEffect(() => {
    path === "/comidas/:id" ? getMealDetail() :getDrinkDetail();
  }, []);

  const getIngredients = (obj, filter) => {
    let key, keys = [];
    for (key in obj) {
      if (obj.hasOwnProperty(key) && filter.test(key) && obj[key] !== "" && obj[key] !== null) {
        keys.push(obj[key]);
      } 
    }
    return keys;
  }

  const getVideoId = (link) => {
    return link.split('=').pop()
  }

  return (
    <div>
      <h1>Página de Details</h1>
      {console.log(details)}
      {!details ? <p>LOADING...</p> 
      : details.map((recipe) =>
        <div>
          <img
            src={path === '/comidas/:id' ? recipe.strMealThumb : recipe.strDrinkThumb}
            alt="recipe_image" data-testid="recipe-photo"
          />
          <h1 data-testid="recipe-title">
            {path === '/comidas/:id' ? recipe.strMeal : recipe.strDrink}
          </h1>
          <input
            type="image"
            src={ shareIcon }
            data-testid="share-btn"
          />
          <input
            type="image"
            src={ fav === 'white' ? whiteHeartIcon : blackHeartIcon }
            data-testid="favorite-btn"
            onClick={() => fav === 'white' ? setFav('black') : setFav('white')}
          />
          <p data-testid="recipe-category">
            {path === '/comidas/:id' ? recipe.strCategory : recipe.strAlcoholic}
          </p>
          <h2>Ingredients</h2>
          {getIngredients(recipe, /strIngredient/, /strMeasure/).map((item, index) => {
            const measure = getIngredients(recipe, /strMeasure/);
            return (
              <p data-testid={`${index}-ingredient-name-and-measure`}>
                {`- ${item} - ${measure[index]} `}
              </p>
            )
          })}
          <h2>Intructions</h2>
          <p data-testid="instructions">{ recipe.strInstructions }</p>
          {recipe.strVideo === null || recipe.strYoutube === null  ? <p></p> :
          <div>
            <h2>Video</h2>
            { 
              !change ? 
              <YouTube
                videoId={ getVideoId(recipe.strYoutube) }
              /> :
              <iframe
                src={ recipe.strYoutube }
                data-testid="video"
              /> 
            }
            <button
              type="button"
              onClick={ () => change ? setChange(false) : setChange(true)}
            >
              Trocar fonte
            </button>
          </div>}
          <h2>Recomendadas</h2>
          <button
            type="button"
            data-testid="start-recipe-btn"
          >
            Iniciar Receita
          </button>
        </div>
      )}
    </div>
  );
}

export default RecipeDetails;
