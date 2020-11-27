import React from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import './recipeCard.css';
import { Link } from 'react-router-dom';
import { redirectToIngredientThunk } from '../redux/actions/mainPageFetcher';

const RecipeCard = ({
  recipeName,
  recipeImage,
  id,
  foodOrDrink,
  index,
  dataTestId,
  redirectIngredient,
  foodOrDrink: pathname,
}) => {
  const dispatch = useDispatch();

  return (
    <Link
      to={
        redirectIngredient
          ? redirectIngredient
          : `${foodOrDrink}/${id}` 
        }
      onClick={ () => dispatch(redirectToIngredientThunk('search-ingredient', recipeName, pathname.includes('comidas'))) }
    >
    {/* <Link to={ `${foodOrDrink}/${id}` }> */}
      <div data-testid={ `${index}-${dataTestId}-card` }>
        <img
          data-testid={ `${index}-card-img` }
          className="smallIMG"
          src={ recipeImage }
          alt="Foto da receita"
        />
        { console.log(recipeImage)}
        <h5 data-testid={ `${index}-card-name` }>{recipeName}</h5>
      </div>
    </Link>
  )
}

RecipeCard.propTypes = {
  recipeName: PropTypes.string.isRequired,
  recipeImage: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  foodOrDrink: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};

export default RecipeCard;
