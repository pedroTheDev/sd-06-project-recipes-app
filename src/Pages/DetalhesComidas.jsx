import React, { useContext, useEffect, useState } from 'react';
import ContextAPI from '../Context/ContextAPI';
import { detailsFoodById } from '../services/aPI';
import './DetalhesComida.css';

import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

const DetalhesComida = () => {
  const { stateIdDetails } = useContext(ContextAPI);

  const [stateLocal, setStatelocal] = useState();

  const handleIdDetails = async () => {
    const recipeById = await detailsFoodById(stateIdDetails.id);

    setStatelocal({
      ...stateLocal,
      food: recipeById,
      id: stateIdDetails.id,
    });
    // console.log(recipeById);
  };

  useEffect(() => {
    handleIdDetails();
  }, []);

  return (
    <div>
      {stateLocal ? (
        <div className="main-details">
          {console.log(stateLocal.food.meals)}
          <div className="container-img">
            <img
              data-testid="recipe-photo"
              className="img-details"
              src={ stateLocal.food.meals[0].strMealThumb }
              alt={ stateLocal.food.meals[0].strMeal }
            />
            <span data-testid="recipe-title">
              { stateLocal.food.meals[0].strMeal }
            </span>
            <div>
              <img
                data-testid="share-btn"
                src={ shareIcon }
                alt="shareIcon"
              />
              <img
                data-testid="favorite-btn"
                src={ whiteHeartIcon }
                alt="whiteHeartIcon"
              />
            </div>
            <div data-testid="recipe-category">
              {stateLocal.food.meals[0].strCategory}
            </div>
          </div>
        </div>
      ) : <div>Loading...</div>}
    </div>
  );
};

export default DetalhesComida;
