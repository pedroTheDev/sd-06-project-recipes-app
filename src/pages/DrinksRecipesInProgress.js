import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { doneRecipesDrink } from '../actions';

class DrinksRecipesInProgress extends React.Component {
  constructor() {
    super();

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const { myRecipe, history } = this.props;
    const { Meal } = this.state;
    myRecipe(Meal);
    history.push('/receitas-feitas');
  }

  render() {
    return (
      <button
        type="button"
        data-testid="start-recipe-btn"
        onClick={ () => this.handleClick() }
      >
        Finalizar Receita
      </button>
    );
  }
}

// DrinksRecipesInProgress.propTypes = {
//   history: PropTypes.shape().isRequired,
// };

const mapDispatchToProps = (dispatch) => ({
  myRecipe: (recipe) => dispatch(doneRecipesDrink(recipe)),
});

DrinksRecipesInProgress.propTypes = {
  history: PropTypes.shape().isRequired,
  myRecipe: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(DrinksRecipesInProgress);
