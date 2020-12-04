import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { detailsFoodById } from '../services/aPI';

import './ProcessoComida.css';

import Instructions from '../components/Instructions';
import ContextAPI from '../Context/ContextAPI';
import BasicInfo from '../components/BasicInfo';

const ReceitaProcessoComida = () => {
  const [foodDetails, setFoodDetails] = useState();
  const [isRecipeDone, setIsRecipeDone] = useState(false);
  const [checkedIdList, setCheckedIdList] = useState([]);

  const idFood = useParams().id;

  const { detailsInfo, setDetailsInfo } = useContext(ContextAPI);

  const getFoodDetails = async () => {
    const food = await detailsFoodById(idFood);

    setFoodDetails({
      ...foodDetails,
      food: food.meals[0],
    });
    setDetailsInfo({ ...detailsInfo, foods: food.meals[0] });
  };

  const loadCheckedIngredientsLocalStorage = () => {
    if (localStorage.getItem('checkedIngredients') === null) {
      const checkedIngredients = {
        cocktails: {},
        meals: {},
      };
      localStorage.setItem('checkedIngredients', JSON.stringify(checkedIngredients));
    }

    const checkedIngredients = JSON.parse(localStorage.getItem('checkedIngredients'));
    setCheckedIdList(checkedIngredients.meals[idFood] || []);
  };

  const loadDoneRecipesFromStorage = () => {
    if (localStorage.getItem('doneRecipes') === null) {
      const doneRecipes = [];
      localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes));
    }
    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    console.log(doneRecipes.some((key) => key.id === idFood));
    if (doneRecipes.some((key) => key.id === idFood)) setIsRecipeDone(true);
    else setIsRecipeDone(false);
  };

  useEffect(() => {
    getFoodDetails();
    loadCheckedIngredientsLocalStorage();
    loadDoneRecipesFromStorage();
  }, []);

  const getIngredientsOrMeasure = (param) => {
    const dataObject = foodDetails.food;

    const dataKeys = Object.keys(dataObject)
      .filter((key) => key.includes(param)
        && dataObject[key] !== '' && dataObject[key] !== ' ' && dataObject[key] !== null);

    const ingredients = dataKeys
      .map((key) => dataObject[key]);

    return ingredients;
  };

  const setDoneRecipes = () => {
    if (foodDetails) {
      const progressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
      if (progressRecipes !== null) {
        const progressKeys = Object.keys(progressRecipes.meals);
        let mealsObject = {};
        progressKeys.forEach((key) => {
          if (key !== idFood) {
            mealsObject = { ...mealsObject, [key]: progressKeys[key] };
          }
        });
        localStorage.setItem('inProgressRecipes', JSON.stringify({
          ...progressRecipes,
          meals: mealsObject,
        }));
      }

      setIsRecipeDone(true);

      const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
      localStorage.setItem('doneRecipes', JSON.stringify([...doneRecipes, {
        id: foodDetails.food.idMeal,
        type: 'comida',
        area: foodDetails.food.strArea,
        category: foodDetails.food.strCategory,
        alcoholicOrNot: '',
        name: foodDetails.food.strMeal,
        photoFood: foodDetails.food.strMealThumb,
        doneDate: '',
        tags: foodDetails.food.strTags
          ? foodDetails.food.strTags
          : [],
      }]));

      window.location.href = 'http://localhost:3000/receitas-feitas';
    } else {
      return '';
    }
  };

  const saveCheckedIngredient = (checkedIngredients, target) => {
    const ingredientsToSave = {
      ...checkedIngredients,
      meals: {
        ...checkedIngredients.meals,
        [idFood]: checkedIngredients.meals[idFood] ? [
          ...checkedIngredients.meals[idFood],
          target.id,
        ] : [target.id],
      },
    };
    localStorage.setItem('checkedIngredients', JSON.stringify(ingredientsToSave));
    setCheckedIdList(ingredientsToSave.meals[idFood]);
  };

  const removeCheckedIngredient = (checkedIngredients, target) => {
    const ingredientsToSave = {
      ...checkedIngredients,
      meals: {
        ...checkedIngredients.meals,
        [idFood]: [
          ...checkedIngredients.meals[idFood].filter((id) => id !== target.id),
        ],
      },
    };
    localStorage.setItem('checkedIngredients', JSON.stringify(ingredientsToSave));
    setCheckedIdList(ingredientsToSave.meals[idFood]);
  };

  const handleCheckbox = (target) => {
    const checkedIngredients = JSON.parse(localStorage.getItem('checkedIngredients'));

    if (target.checked === true) {
      saveCheckedIngredient(checkedIngredients, target);
    } else {
      removeCheckedIngredient(checkedIngredients, target);
    }

    return target.id;
  };

  const showIngredientsCheckbox = () => {
    const ingredientsList = getIngredientsOrMeasure('strIngredient');
    const measuresList = getIngredientsOrMeasure('strMeasure');

    return (
      ingredientsList.map((ingred, i) => (
        <label
          key={ i }
          htmlFor={ i }
          className="input-checkbox"
          data-testid={ `${i}-ingredient-step` }
        >
          <input
            className="checkbox-input"
            type="checkbox"
            checked={ checkedIdList.includes(i.toString()) }
            id={ i }
            onChange={ (({ target }) => handleCheckbox(target)) }
          />
          {`${ingred} - ${measuresList[i]}`}
        </label>
      ))
    );
  };

  const showDoneRecipeBtn = () => {
    const ingredientsList = getIngredientsOrMeasure('strIngredient');

    return (
      <button
        type="button"
        data-testid="finish-recipe-btn"
        onClick={ setDoneRecipes }
        disabled={ !(ingredientsList.length === checkedIdList.length) }
      >
        Finalizar Receita
      </button>
    );
  };

  return (

    <div>
      {!foodDetails
        ? <div className="loading">Loading...</div>
        : (
          <div className="body-progress">
            <BasicInfo />
            <div className="span-ingredients">
              <span>Ingredients</span>
            </div>
            <div className="container-checkbox">
              {showIngredientsCheckbox()}
            </div>
            <Instructions />
            <div className="container-button">
              {!isRecipeDone && showDoneRecipeBtn()}
            </div>
          </div>
        )}
    </div>
  );
};

export default ReceitaProcessoComida;
