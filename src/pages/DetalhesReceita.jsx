import React, { useEffect, useState } from 'react';
import { requestApiFoodDetails } from '../services/requestFood';

function DetalhesReceita(props) {
  const [detailsFood, setDetailsFood] = useState([]);
  const [arrayIngredients, setArrayIngredients] = useState([]);
  const [embed, setEmbed] = useState('');

  useEffect(() =>{
    requestApiFoodDetails(props.match.params.id)
      .then((response) => {
        setDetailsFood(response[0]);
        console.log(response);
      });
  }, []);

  useEffect(() => {
    ingredientsFunc();
    embedVideo();
  }, [detailsFood])

  const embedVideo = () => {
    const youtubeVideo = detailsFood.strYoutube;
    if (youtubeVideo != undefined) {
      const newYoutube = youtubeVideo.split("=")
      setEmbed(newYoutube[1]);
    }
  }

  const ingredientsFunc = () => {
    if(detailsFood != []) {
      const array = []
      for(let i=1;i<=20;i++) {
        const ingredient = detailsFood[`strIngredient${i}`];
        array.push(ingredient);
      }
      const arrayReturn = array.filter((element) => element!=='')
      setArrayIngredients(arrayReturn);
    } 
  }

  if (detailsFood === [])  {
    return <div>Loading...</div>
  }
  return (
    <div>
      <img data-testid="recipe-photo" src={detailsFood.strMealThumb} />
      <h2 data-testid="recipe-title">{detailsFood.strMeal}</h2>
      <h3 data-testid="recipe-category">{detailsFood.strCategory}</h3>
      <h4 data-testid="instructions">{detailsFood.strInstructions}</h4>
      <button data-testid="share-btn">Share</button>
      <button data-testid="favorite-btn">Favorite</button>
      <button data-testid="start-recipe-btn">Iniciar receita</button>
      {arrayIngredients.map((element, index) => {
        return (
          <h5 
            data-testid={`${index}-ingredient-name-and-measure`} 
            key={index}>
              {element}
          </h5>
        )
      })}
      <iframe 
        data-testid="video" 
        width="1042" height="586"
        src={`https://www.youtube.com/embed/${embed}`}
        frameborder="0" allow="accelerometer;
        autoplay;
        clipboard-write;
        encrypted-media;
        gyroscope;
        picture-in-picture"
        allowfullscreen>
      </iframe>
      {/* <div data-testid="${index}-recomendation-card">
        Recomendadas
      </div> */}
    </div>
  );
}

export default DetalhesReceita;
