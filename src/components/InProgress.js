import React, { useContext, useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';
import { handleIngredients } from '../services/functions';
import ShareBtn from './ShareBtn';
import FavoriteBtn from './FavoriteBtn';

function InProgress() {
  const {
    getFoodAPI,
    getDrinkAPI,
    foodData,
    drinkData,
  } = useContext(RecipesContext);

  const [ingredients, setIngredients] = useState([]);
  const [measures, setMeasures] = useState([]);

  const { id } = useParams();
  const { pathname } = useLocation();

  const isFood = pathname.includes('comidas');
  const isDrink = pathname.includes('bebidas');

  useEffect(() => {
    if (isFood) getFoodAPI('id-filter', `${id}`);
    if (isDrink) getDrinkAPI('id-filter', `${id}`);
  }, []);

  useEffect(() => {
    if (isFood) handleIngredients(foodData, setIngredients, setMeasures);
    if (isDrink) handleIngredients(drinkData, setIngredients, setMeasures);
  }, [foodData]);

  const handleRedering = () => {
    const currentDrink = drinkData[0];
    const currentFood = foodData[0];

    if (currentDrink || currentFood) {
      return (
        <div className="detail-container">

          <div className="detail-img-container">
            <img
              alt="recipe"
              data-testid="recipe-photo"
              src={ isFood ? currentFood.strMealThumb : currentDrink.strDrinkThumb }
            />
          </div>

          <div className="detail-title-btn-container">
            <div className="detail-title-container">

              <h3 data-testid="recipe-title">
                {isFood ? currentFood.strMeal : currentDrink.strDrink}
              </h3>

              <div className="detail-category-container">
                <h3 data-testid="recipe-category">
                  {isFood ? 'Comida' : 'Bebida'}
                </h3>
              </div>

            </div>

            <div className="detail-btn-container">
              <ShareBtn id={ id } />
              <FavoriteBtn
                id={ id }
                type={ isFood ? 'comida' : 'bebida' }
                recipe={ isFood ? currentFood : currentDrink }
              />
            </div>
          </div>

          <div className="detail-ingredients-container">

            <div className="detail-ingredients-title">
              <h3>Ingredients</h3>
            </div>

            <div className="detail-ingredients">
              <ul>
                {ingredients.length && ingredients.map((ingredient, i) => (
                  <li
                    data-testid={ `${i}-ingredient-step` }
                    key={ `ingredient-${i}` }
                  >
                    <span>{ingredient}</span>
                    <span>{measures[i]}</span>
                  </li>
                ))}

              </ul>
            </div>
          </div>

          <div>
            <button
              data-testid="finish-recipe-btn"
              type="button"
            >
              Terminar Receita
            </button>
          </div>

        </div>
      );
    }
  };

  return (
    <div>
      { handleRedering() }
    </div>
  );
}

export default InProgress;
