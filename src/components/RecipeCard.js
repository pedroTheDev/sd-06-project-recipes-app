import { divide } from 'lodash';
import React from 'react'/

const RecipeCard = ({ recipeName, recipeImage, id, foodOrDrink }) => (
  <div>
    <img src={ recipeImage } alt="Foto da receita" />
    <Link to={`/${foodOrDrink}/${ id }`}>
      <h5>{ recipeName }</h5>
    </Link>
  </div>
);

export default RecipeCard;