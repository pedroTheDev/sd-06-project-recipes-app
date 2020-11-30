import React from 'react';
import PropTypes from 'prop-types';
import './recipeCard.css';
import { Link } from 'react-router-dom';
import { clearState } from '../redux/actions/mainPageFetcher';
import { connect } from 'react-redux';

const RecipeCard = ({ recipeName, recipeImage, id, foodOrDrink, index, limpar }) => (
  <Link to={ `${foodOrDrink}/${id}` } onClick={ () => limpar() }>
    <div data-testid={ `${index}-recipe-card` }>
      <img
        data-testid={ `${index}-card-img` }
        className="smallIMG"
        src={ recipeImage }
        alt="Foto da receita"
      />
      <h5 data-testid={ `${index}-card-name` }>{recipeName}</h5>
    </div>
  </Link>
);

const mapDispatchToProps = (dispatch) => ({
  limpar: () => dispatch(clearState()),
})

RecipeCard.propTypes = {
  recipeName: PropTypes.string.isRequired,
  recipeImage: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  foodOrDrink: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};

export default connect(null, mapDispatchToProps)(RecipeCard);