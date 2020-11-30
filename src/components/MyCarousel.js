import React, { useContext, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Carousel from 'react-bootstrap/Carousel';
import MealsContext from '../context/MealsContext';
import '../Css/myCarousel.css';

function MyCarousel() {
  const [recommendedRecipe, setRecommendedRecipe] = useState();
  const { recommendedMeals, recommendedDrinks } = useContext(MealsContext);

  // Será usado para pegar o pathname ("comidas" ou "bebidas")
  const location = useLocation();
  const indiceZero = 0;
  const indiceUm = 1;
  const indiceDois = 2;
  const indiceTres = 3;
  const indiceQuatro = 4;
  const indiceCinco = 5;

  useEffect(() => {
    let myRecommendedRecipes = [];
    if (location.pathname.includes('comidas')) {
      myRecommendedRecipes = recommendedDrinks.map((item) => {
        const myCard = {
          id: item.idDrink,
          strName: item.strDrink,
          strThumb: item.strDrinkThumb,
          strCategory: item.strAlcoholic,
        };
        return myCard; // retorna o novo objeto criado no map do myCards
      });
    } else {
      myRecommendedRecipes = recommendedMeals.map((item) => {
        const myCard = {
          id: item.idMeal,
          strName: item.strMeal,
          strThumb: item.strMealThumb,
          strCategory: item.strCategory,
        };
        return myCard; // retorna o novo objeto criado no map do myCards
      });
    }
    setRecommendedRecipe(myRecommendedRecipes);
  }, []);

  function showItemCarousel(index) {
    return (
      <div data-testid={ `${index}-recomendation-card" ` }>
        <img
          className="d-block w-100"
          src={ recommendedRecipe[index].strThumb }
          alt="Receitas recomendadas"
        />
        <h6>{ recommendedRecipe[index].strCategory }</h6>
        <h4
          data-testid={ `${index}-recomendation-title` }
        >
          { recommendedRecipe[index].strName }
        </h4>
      </div>
    );
  }

  return (
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
  );

// return (
  //   (!recommendedRecipe || )
  //     ? <h5>Loading...</h5>
  //     : showCarousel()
  // );
}

export default MyCarousel;
