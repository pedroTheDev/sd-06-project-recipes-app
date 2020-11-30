import React, { useEffect, useContext, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Carousel from 'react-bootstrap/Carousel';
import { getRecipeDrinkByIdApi } from '../services/drinksAPI';
import { getRecipesMealsApi } from '../services/mealsAPI';
import shareIcon from '../images/shareIcon.svg';
import favoriteIcon from '../images/whiteHeartIcon.svg';
import MealsContext from '../context/MealsContext';
import '../Css/MealDetail.css';

function DrinkDetails() {
  const [btnDoneRecipe, setBtnDoneRecipe] = useState();
  const { recipeDrink, setRecipeDrink, recommendedMeals,
    setRecommendedMeals } = useContext(MealsContext);
  const { id } = useParams(); // retorna o paramentro que está na rota
  const indiceZero = 0;
  const indiceUm = 1;
  const indiceDois = 2;
  const indiceTres = 3;
  const indiceQuatro = 4;
  const indiceCinco = 5;

  useEffect(() => {
    async function fetchDatas() {
      // Verifica os detalhes da receita por id para
      const myRecipe = await getRecipeDrinkByIdApi(id);

      // Verifica bebidas recomendadas
      const inditialIndex = 0;
      const quantityRecipes = 6;
      const resultRecommendedMeals = await getRecipesMealsApi();
      const myRecommendedMeals = resultRecommendedMeals
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
      setRecommendedMeals(myRecommendedMeals);
      setRecipeDrink(myRecipe[0]);
    }
    fetchDatas();
  }, []);

  function getIngredients() {
    const inicio = 1;
    const fim = 15;
    let ingredients = [];
    for (let i = inicio; i <= fim; i += 1) {
      if (recipeDrink[`strIngredient${i}`] !== null) {
        ingredients = [...ingredients,
          { ingredient: recipeDrink[`strIngredient${i}`],
            measure: recipeDrink[`strMeasure${i}`] }];
      }
    }
    return ingredients;
  }

  function updateDoneRecipes() {
    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    const newDoneRecipe = {
      id: recipeDrink.idDrink,
      type: 'bebida',
      area: '',
      category: recipeDrink.strCategory,
      alcoholicOrNot: recipeDrink.strAlcoholic,
      name: recipeDrink.strDrink,
      image: recipeDrink.strDrinkThumb,
      doneDate: '',
      tags: recipeDrink.strTags,
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
          src={ recipeDrink.strDrinkThumb }
        />
      </div>
    );
  }

  function titleDatail() {
    return (
      <div>
        <h2 data-testid="recipe-title">{ recipeDrink.strDrink }</h2>
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
        <h4 data-testid="recipe-category">{ recipeDrink.strAlcoholic }</h4>
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
        <p data-testid="instructions">{ recipeDrink.strInstructions }</p>
      </div>
    );
  }

  function showItemCarousel(index) {
    return (
      <div data-testid={ `${index}-recomendation-card` }>
        <img
          className="d-block w-100"
          src={ recommendedMeals[index].strMealThumb }
          alt="Receitas recomendadas"
        />
        <h6>{ recommendedMeals[index].strCategory }</h6>
        <h4
          data-testid={ `${index}-recomendation-title` }
        >
          { recommendedMeals[index].strMeal }
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
          <Link to={ `/bebidas/${id}/in-progress` }>
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
    (!recipeDrink)
      ? <h5>Loading...</h5>
      : (
        <div>
          { imgDetail() }
          { titleDatail() }
          { categoryDetail() }
          { ingredientsDetail() }
          { instructionsDetail() }
          { recommendedDetail() }
          { buttonDetail() }
        </div>
      ));
}

export default DrinkDetails;
