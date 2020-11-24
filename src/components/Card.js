import React, { useContext } from 'react';
import ContextRecipes from '../context/ContextRecipes';

function Card() {
  const { recipes, typeRecipe } = useContext(ContextRecipes);
  const MAX_NUMBER_OF_CARDS = 12;
  let name = '';
  let thumb = '';
  console.log('CARD: ', recipes);
  if (typeRecipe === 'food') {
    name = 'strMeal';
    thumb = 'strMealThumb';
  } else {
    name = 'strDrink';
    thumb = 'strDrinkThumb';
  }

  return (
    recipes.map((recipe, index) => (
      <div data-testid={ `${index}-recipe-card` } key={ index }>
        <p data-testid={ `${index}-card-name` }>{recipe[name]}</p>
        <img
          data-testid={ `${index}-card-img` }
          src={ recipe[thumb] }
          alt="meal"
        />
      </div>
    )).filter((_, index) => index < MAX_NUMBER_OF_CARDS)
  );
}

export default Card;

// const [typeRecipe, setTypeRecipe] = useState(''); // food, drink
