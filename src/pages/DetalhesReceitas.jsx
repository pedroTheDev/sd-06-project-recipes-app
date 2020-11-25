import React, { useEffect, useState } from 'react';
import {
  requestApiFoodDetails, requestApiFoodFilterIngredient } from '../services/requestFood';

function DetalhesReceita(props) {
  const [detailsFood, setDetailsFood] = useState([]);
  const [arrayIngredients, setArrayIngredients] = useState([]);
  const [embed, setEmbed] = useState('');
  const [recommendFood, setRecommendFood] = useState([]);

  useEffect(() => {
    requestApiFoodDetails(props.match.params.id)
      .then((response) => {
        setDetailsFood(response[0]);
        console.log(response);
      });
  }, []);

  const embedVideo = () => {
    const youtubeVideo = detailsFood.strYoutube;
    if (youtubeVideo !== undefined) {
      const newYoutube = youtubeVideo.split('=');
      setEmbed(newYoutube[newYoutube.length - 1]);
    }
  };

  const ingredientsFunc = () => {
    const zero = 0;
    const vinte = 20;
    if (detailsFood.length !== zero) {
      const array = [];
      for (let i = 1; i <= vinte; i + 1) {
        const ingredient = detailsFood[`strIngredient${i}`];
        array.push(ingredient);
      }
      const arrayReturn = array.filter((element) => element !== '');
      setArrayIngredients(arrayReturn);
    }
  };

  const recommendFoodFunction = async () => {
    const zero = 0;
    const seis = 6;
    if (detailsFood.length !== zero) {
      const response = await requestApiFoodFilterIngredient(detailsFood.strIngredient1);
      setRecommendFood(response.slice(zero, seis));
    }
  };

  useEffect(() => {
    ingredientsFunc();
    embedVideo();
    recommendFoodFunction();
  }, [detailsFood]);

  if (detailsFood.length === zero) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <img alt="recipe" data-testid="recipe-photo" src={ detailsFood.strMealThumb } />
      <h2 data-testid="recipe-title">{detailsFood.strMeal}</h2>
      <h3 data-testid="recipe-category">{detailsFood.strCategory}</h3>
      <h4 data-testid="instructions">{detailsFood.strInstructions}</h4>
      <button type="button" data-testid="share-btn">Share</button>
      <button type="button" data-testid="favorite-btn">Favorite</button>
      <button type="button" data-testid="start-recipe-btn">Iniciar receita</button>
      {arrayIngredients.map((element, index) => (
        <h5
          data-testid={ `${index}-ingredient-name-and-measure` }
          key={ index }
        >
          {element}
        </h5>
      ))}
      <iframe
        title="yt"
        data-testid="video"
        width="1042"
        height="586"
        src={ `https://www.youtube.com/embed/${embed}` }
        frameBorder="0"
        allow="accelerometer;
        autoplay;
        clipboard-write;
        encrypted-media;
        gyroscope;
        picture-in-picture"
        allowFullScreen
      />
      <div>
        {recommendFood.map((food, index) => (
          <div key={ `"${food}"` } data-testid={ `${index}-recomendation-card` }>
            <img alt="mealThumb" src={ food.strMealThumb } />
            <h3>{food.strMeal}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DetalhesReceita;
