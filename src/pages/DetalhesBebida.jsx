import React, { useEffect, useState } from 'react';
import { requestApiDrinkDetails } from '../services/requestDrink';

function DetalhesReceita(props) {
  const [detailsDrink, setdetailsDrink] = useState([]);
  const [arrayIngredients, setArrayIngredients] = useState([]);

  useEffect(() =>{
    requestApiDrinkDetails(props.match.params.id)
      .then((response) => {
        setdetailsDrink(response[0]);
        console.log(response);
      });
  }, []);

  useEffect(() => {
    ingredientsFunc();
  }, [detailsDrink])

  const ingredientsFunc = () => {
    if(detailsDrink != []) {
      const array = []
      for(let i=1;i<=20;i++) {
        const ingredient = detailsDrink[`strIngredient${i}`];
        array.push(ingredient);
      }
      const arrayReturn = array.filter((element) => element!=='')
      setArrayIngredients(arrayReturn);
    } 
  }

  if (detailsDrink === [])  {
    return <div>Loading...</div>
  }
  return (
    <div>
      <img data-testid="recipe-photo" src={detailsDrink.strDrinkThumb} />
      <h2 data-testid="recipe-title">{detailsDrink.strDrink}</h2>
      <h3 data-testid="recipe-category">{detailsDrink.strCategory}</h3>
      <h4 data-testid="instructions">{detailsDrink.strInstructions}</h4>
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
      {/* <iframe data-testid="video" ></iframe>
      <div data-testid="${index}-recomendation-card">
        Recomendadas
      </div> */}
    </div>
  );
}

export default DetalhesReceita;
