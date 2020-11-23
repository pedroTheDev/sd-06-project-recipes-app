import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

function FoodInProgress() {
  const history = useHistory();
  const [isDisabled, setIsDisabled] = useState(true);
  const ingredients = ['strIngredient1', 'strIngredient2', 'strIngredient3', 'strIngredient4', 'strIngredient5', 'strIngredient6'];

  const handleFinishedRecipe = (event) => {
    event.preventDefault();
    history.push('/receitas-feitas');
  };

  return (
    <div>
      <form onSubmit={ handleFinishedRecipe }>
        <img
          className="picture"
          data-testid="recipe-photo"
          src={ meal.strMealThumb }
          alt={ meal.strMeal }
        />
        <h1 data-testid="recipe-title">{ meal.strMeal }</h1>
        <button data-testid="share-btn" type="button">Compartilhar</button>
        <button data-testid="favorite-btn" type="button">Favoritar</button>
        <p data-testid="recipe-category">{ meal.strCategory }</p>
        <p>
          Ingredientes:
          {ingredients.map((ingredient, index) => (
            <label>
              <input
                name="ingredient"
                key={ index }
                type="checkbox"
                data-testid={ `${index}-ingredient-step` }
                checked={ (ev) => console.log(ev.target) }
                onChange={ () => setIsDisabled(false) }
              />
              { `${meal[ingredient]} ${meal[`strMeasure${index + 1}`]}`}
            </label>
          ))}
        </p>
        <p data-testid="instructions">{ meal.strInstructions }</p>
        <button
          data-testid="finish-recipe-btn"
          type="submit"
          isDisabled={ isDisabled }
        >
          Finalizar receita
        </button>
      </form>
    </div>
  );
}

const meal = {
  idMeal: '52978',
  strMeal: 'Kumpir',
  strDrinkAlternate: null,
  strCategory: 'Side',
  strArea: 'Turkish',
  strInstructions: 'If you order kumpir in Turkey, the standard filling is first, lots of butter mashed into the potato, followed by cheese. There’s then a row of other toppings that you can just point at to your heart’s content – sweetcorn, olives, salami, coleslaw, Russian salad, allsorts – and you walk away with an over-stuffed potato because you got ever-excited by the choices on offer.\r\n\r\nGrate (roughly – you can use as much as you like) 150g of cheese.\r\nFinely chop one onion and one sweet red pepper.\r\nPut these ingredients into a large bowl with a good sprinkling of salt and pepper, chilli flakes (optional).',
  strMealThumb: 'https://www.themealdb.com/images/media/meals/mlchx21564916997.jpg',
  strTags: 'SideDish',
  strYoutube: 'https://www.youtube.com/watch?v=IEDEtZ4UVtI',
  strIngredient1: 'Potatoes',
  strIngredient2: 'Butter',
  strIngredient3: 'Cheese',
  strIngredient4: 'Onion',
  strIngredient5: 'Red Pepper',
  strIngredient6: 'Red Chile Flakes',
  strIngredient7: '',
  strIngredient8: '',
  strIngredient9: '',
  strIngredient10: '',
  strIngredient11: '',
  strIngredient12: '',
  strIngredient13: '',
  strIngredient14: '',
  strIngredient15: '',
  strIngredient16: '',
  strIngredient17: '',
  strIngredient18: '',
  strIngredient19: '',
  strIngredient20: '',
  strMeasure1: '2 large',
  strMeasure2: '2 tbs',
  strMeasure3: '150g',
  strMeasure4: '1 large',
  strMeasure5: '1 large',
  strMeasure6: 'Pinch',
  strMeasure7: ' ',
  strMeasure8: ' ',
  strMeasure9: ' ',
  strMeasure10: ' ',
  strMeasure11: ' ',
  strMeasure12: ' ',
  strMeasure13: ' ',
  strMeasure14: ' ',
  strMeasure15: ' ',
  strMeasure16: ' ',
  strMeasure17: ' ',
  strMeasure18: ' ',
  strMeasure19: ' ',
  strMeasure20: ' ',
  strSource: 'http://www.turkeysforlife.com/2013/10/firinda-kumpir-turkish-street-food.html',
  dateModified: null,
};

export default FoodInProgress;
