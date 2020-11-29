import React, { useEffect, useState, useContext } from 'react';
import YouTube from 'react-youtube';
import Button from 'react-bootstrap/Button';
import { useParams } from 'react-router-dom';
import { getRecipeMealByIdApi } from '../services/mealsAPI';
import shareIcon from '../images/shareIcon.svg';
import favoriteIcon from '../images/whiteHeartIcon.svg';
import MyCarousel from './MyCarousel';
import MealsContext from '../context/MealsContext';
import '../Css/MealDetail.css';

function MealDetails() {
  const [recipeMeal, setRecipeMeal] = useState(undefined);
  const { verifyRecommendedRecipes } = useContext(MealsContext);
  const valorZero = 0;

  const { id } = useParams(); // retorna o paramentro que está na rota

  useEffect(() => {
    async function fetchDatas() {
      // Verifica os detalhes da receita por id para
      const resultDetail = await getRecipeMealByIdApi(id);
      setRecipeMeal(resultDetail[0]);

      // Verifica bebidas e comidas recomendadas
      verifyRecommendedRecipes();
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

  function updateDoneRecipes() {
    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));

    const newDoneRecipe = {
      id: recipeMeal.idMeal,
      type: 'comida',
      area: recipeMeal.strArea,
      category: recipeMeal.strCategory,
      alcoholicOrNot: '',
      name: recipeMeal.strMeal,
      image: recipeMeal.strMealThumb,
      doneDate: '',
      tags: recipeMeal.strTags,
    };
    const arrayDoneRecipe = [...doneRecipes, newDoneRecipe];
    localStorage.setItem('doneRecipes', JSON.stringify(arrayDoneRecipe));
  }

  function imgDetail() {
    return (
      <div className="img-container">
        <img
          className="detail-img"
          alt="detail"
          data-testid="recipe-photo"
          src={ recipeMeal.strMealThumb }
        />
      </div>
    );
  }
  function titleDatail() {
    return (
      <div>
        <h2 data-testid="recipe-title">{ recipeMeal.strMeal }</h2>
        <div>
          <img src={ shareIcon } alt="Profile" data-testid="share-btn" />
          <img src={ favoriteIcon } alt="Profile" data-testid="favorite-btn" />
        </div>
      </div>
    );
  }

  function categoryDetail() {
    return (
      <div>
        <h4 data-testid="recipe-category">{ recipeMeal.strCategory }</h4>
      </div>
    );
  }

  function ingredientsDetail() {
    return (
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
    );
  }

  function instructionsDetail() {
    return (
      <div>
        <h3>Instructions</h3>
        <p data-testid="instructions">{ recipeMeal.strInstructions }</p>
      </div>
    );
  }

  function videoDetail() {
    return (
      <div data-testid="video">
        <h3>Video</h3>
        <YouTube
          videoId={ recipeMeal.strYoutube !== undefined ? getIdYoutube() : null }
          opts={ optsYoutube }
          onReady={ (e) => e.target.pauseVideo() }
        />
      </div>
    );
  }

  function recommendedDetail() {
    return (
      <div>
        <h3>Recommended</h3>
        <MyCarousel />
      </div>
    );
  }

  function buttonDetail() {
    // Verifica se receita já foi iniciada ou concluída
    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    const indexDoneRecipe = doneRecipes.findIndex((item) => item.id === id);
    let textBtnDoneRecipe = 'Iniciar Receita';
    if (indexDoneRecipe >= valorZero) {
      if (doneRecipes[indexDoneRecipe].doneDate === '') {
        textBtnDoneRecipe = 'Continuar Receita';
      } else {
        textBtnDoneRecipe = 'Receita Finalizada';
      }
    }
    return (
      <div>
        { textBtnDoneRecipe === 'Receita Finalizada'
          ? (<h5>{ textBtnDoneRecipe }</h5>)
          : (
            <Button
              className="btn-iniciar-receita"
              type="button"
              data-testid="start-recipe-btn"
              variant="success"
              size="lg"
              block
              onClick={ updateDoneRecipes }
            >
              { textBtnDoneRecipe }
            </Button>)}
      </div>
    );
  }

  return (
    <div>
      { recipeMeal === undefined
        ? (<h5>Loading...</h5>)
        : (
          <div>
            { imgDetail() }
            { titleDatail() }
            { categoryDetail() }
            { ingredientsDetail() }
            { instructionsDetail() }
            { videoDetail() }
            { recommendedDetail() }
            { buttonDetail() }
          </div>)}
    </div>
  );
}

export default MealDetails;
