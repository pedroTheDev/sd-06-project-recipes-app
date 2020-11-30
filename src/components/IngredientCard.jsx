import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './recipeCard.css';
import { redirectToIngredientThunk } from '../redux/actions/mainPageFetcher';
import { connect } from 'react-redux';
import { clearState } from '../redux/actions/mainPageFetcher';

const IngredientCard = ({ ingredientName, ingredientImage, index, foodOrDrink, dispatchRequestedIngredient, clear }) => {

  return (
    <Link to={ foodOrDrink } onClick={ () => {
      dispatchRequestedIngredient(ingredientName, foodOrDrink);
      clear();
    }}>
      <div data-testid={ `${index}-ingredient-card` }>
        <img
          data-testid={ `${index}-card-img` }
          className="smallIMG"
          src={ ingredientImage }
          alt="Foto da receita"
        />
        <h5 data-testid={ `${index}-card-name` }>{ingredientName}</h5>
      </div>
    </Link>
  );
}

const mapDispatchToProps = (dispatch) => ({
  dispatchRequestedIngredient: (ingredient, pathname) => (
    dispatch(redirectToIngredientThunk(ingredient, pathname))
  ),
  clear: () => dispatch(clearState()),
});


IngredientCard.propTypes = {
  ingredientName: PropTypes.string.isRequired,
  ingredientImage: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  foodOrDrink: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};

export default connect(null, mapDispatchToProps)(IngredientCard);