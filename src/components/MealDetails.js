import React, { useEffect, useState, useContext } from 'react';
import YouTube from 'react-youtube';
import Button from 'react-bootstrap/Button';
import { useParams } from 'react-router-dom';
import { getRecipeMealByIdApi } from '../services/mealsAPI';
import { getRecipeDrinksApi } from '../services/drinksAPI';
import shareIcon from '../images/shareIcon.svg';
import favoriteIcon from '../images/whiteHeartIcon.svg';
import MyCarousel from './MyCarousel';
import MealsContext from '../context/MealsContext';
import '../Css/MealDetail.css';

function MealDetails() {
  const [recipeMeal, setRecipeMeal] = useState({});
  const { recommendedRecipe, setRecommendedRecipe } = useContext(MealsContext);
  // const [recommendedDrinks, setRecommendedDrinks] = useState([]);
  const itemZerado = 0;

  const { id } = useParams(); // retorna o paramentro que está na rota

  useEffect(() => {
    async function fetchDatas() {
      const resultDetail = await getRecipeMealByIdApi(id);
      setRecipeMeal(resultDetail[0]);

      const inicio = 0;
      const fim = 6;
      const resultDrinks = await getRecipeDrinksApi();
      const myDrinks = resultDrinks.slice(inicio, fim);
      const myRecommendedDrinks = myDrinks.map((item) => {
        const myCard = {
          id: item.idDrink,
          strName: item.strDrink,
          strThumb: item.strDrinkThumb,
          strCategory: item.strAlcoholic,
        };
        return myCard; // retorna o novo objeto criado no map do myCards
      });
      setRecommendedRecipe(myRecommendedDrinks);
    }
    fetchDatas();
  }, []);

  function getIngredients() {
    const inicio = 1;
    const fim = 20;
    let ingredients = [];
    for (let i = inicio; i <= fim; i += 1) {
      if (recipeMeal[`strIngredient${i}`] !== '') {
        ingredients = [...ingredients,
          { ingredient: recipeMeal[`strIngredient${i}`],
            measure: recipeMeal[`strMeasure${i}`] }];
      }
    }
    return ingredients;
  }

  const optsYoutube = {
    height: '390',
    width: '640',
    playerVars: {
      autoplay: 2,
    },
  };

  function getIdYoutube() {
    const idYoutube = recipeMeal.strYoutube.split('watch?v=')[1];
    return idYoutube;
  }

  return (
    <div>
      <div className="img-container">
        <img
          className="detail-img"
          alt="detail"
          data-testid="recipe-photo"
          src={ recipeMeal.strMealThumb }
        />
      </div>
      <div>
        <h2 data-testid="recipe-title">{ recipeMeal.strMeal }</h2>
        <div>
          <img src={ shareIcon } alt="Profile" data-testid="share-btn" />
          <img src={ favoriteIcon } alt="Profile" data-testid="favorite-btn" />
        </div>
      </div>
      <div>
        <h4 data-testid="recipe-category">{ recipeMeal.strCategory }</h4>
      </div>
      <div>
        <h3>Ingredients</h3>
        <ul>
          {getIngredients().map((item, index) => (
            <li
              key={ index }
              data-testid={ `${index}-ingredient-name-and-measure` }
            >
              { `- ${item.ingredient} (${item.measure})` }
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h3>Instructions</h3>
        <p data-testid="instructions">{ recipeMeal.strInstructions }</p>
      </div>
      <div data-testid="video">
        <h3>Video</h3>
        <YouTube
          videoId={ recipeMeal.strYoutube !== undefined ? getIdYoutube() : null }
          opts={ optsYoutube }
          onReady={ (e) => e.target.pauseVideo() }
        />
      </div>
      <div>
        <h3>Recommended</h3>
        { recommendedRecipe.length !== itemZerado
          ? <MyCarousel />
          : <p>Loading...</p> }
      </div>
      <div>
        <Button
          className="btn-iniciar-receita"
          type="button"
          data-testid="start-recipe-btn"
          variant="success"
          size="lg"
          block
        >
          Iniciar Receita
        </Button>
      </div>
    </div>
  );
}

export default MealDetails;
