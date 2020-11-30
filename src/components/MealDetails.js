import React, { useEffect, useContext, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Carousel from 'react-bootstrap/Carousel';
import YouTube from 'react-youtube';
import { getRecipeMealByIdApi } from '../services/mealsAPI';
import { getRecipeDrinksApi } from '../services/drinksAPI';
import shareIcon from '../images/shareIcon.svg';
import favoriteIcon from '../images/whiteHeartIcon.svg';
import MealsContext from '../context/MealsContext';
import '../Css/MealDetail.css';

function MealDetails() {
  const [btnDoneRecipe, setBtnDoneRecipe] = useState();
  const { recipeMeal, setRecipeMeal, recommendedDrinks,
    setRecommendedDrinks } = useContext(MealsContext);
  const { id } = useParams(); // retorna o paramentro que está na rota
  const indiceZero = 0;
  const indiceUm = 1;
  const indiceDois = 2;
  const indiceTres = 3;
  const indiceQuatro = 4;
  const indiceCinco = 5;

  useEffect(() => {
    async function fetchData() {
      // Verifica os detalhes da receita por id para
      const myRecipe = await getRecipeMealByIdApi(id);

      // Verifica bebidas recomendadas
      const inditialIndex = 0;
      const quantityRecipes = 6;
      const resultRecommendedDrinks = await getRecipeDrinksApi();
      const myRecommendedDrinks = resultRecommendedDrinks
        .slice(inditialIndex, quantityRecipes);

      // Verifica se receita já foi iniciada ou concluída
      // const valorZero = 0;
      // const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
      // const indexDoneRecipe = doneRecipes.findIndex((item) => item.id === id);
      // let textBtnDoneRecipe = 'Iniciar Receita';
      // if (indexDoneRecipe >= valorZero) {
      //   if (doneRecipes[indexDoneRecipe].doneDate === '') {
      //     textBtnDoneRecipe = 'Continuar Receita';
      //   } else {
      //     textBtnDoneRecipe = 'Receita Finalizada';
      //   }
      // }
      // setBtnDoneRecipe(textBtnDoneRecipe);
      setBtnDoneRecipe('Inicia Receita');
      setRecommendedDrinks(myRecommendedDrinks);
      setRecipeMeal(myRecipe[0]);
    }
    fetchData();
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

  function showItemCarousel(index) {
    return (
      <div data-testid={ `${index}-recomendation-card` }>
        <img
          className="d-block w-100"
          src={ recommendedDrinks[index].strDrinkThumb }
          alt="Receitas recomendadas"
        />
        <h6>{ recommendedDrinks[index].strAlcoholic }</h6>
        <h4
          data-testid={ `${index}-recomendation-title` }
        >
          { recommendedDrinks[index].strDrink }
        </h4>
      </div>
    );
  }

  function recommendedDetail() {
    return (
      <div>
        <h3>Recommended</h3>
        <Carousel>
          <Carousel.Item>
            <div className="carousel-container">
              { showItemCarousel(indiceZero) }
              { showItemCarousel(indiceUm) }
            </div>
          </Carousel.Item>
          <Carousel.Item>
            <div className="carousel-container">
              { showItemCarousel(indiceDois) }
              { showItemCarousel(indiceTres) }
            </div>
          </Carousel.Item>
          <Carousel.Item>
            <div className="carousel-container">
              { showItemCarousel(indiceQuatro) }
              { showItemCarousel(indiceCinco) }
            </div>
          </Carousel.Item>
        </Carousel>
      </div>
    );
  }

  function buttonDetail() {
    return (
      <div>
        { btnDoneRecipe !== 'Receita Finalizada' && (
          <Link to={ `/comidas/${id}/in-progress` }>
            <Button
              className="btn-iniciar-receita"
              type="button"
              data-testid="start-recipe-btn"
              variant="success"
              size="lg"
              block
              onClick={ updateDoneRecipes }
            >
              { btnDoneRecipe }
            </Button>
          </Link>)}
      </div>
    );
  }

  return (
    (!recipeMeal)
      ? <h5>Loading...</h5>
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
        </div>
      ));
}

export default MealDetails;
