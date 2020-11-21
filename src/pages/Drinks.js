import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Footer, Header } from '../components';

class Drinks extends React.Component {
  render() {
    const { history, stateDrinks } = this.props;
    const INITIAL_LENGTH = 0;
    const MAX_LENGTH = 12;
    const newArray = stateDrinks.slice(INITIAL_LENGTH, MAX_LENGTH);

    return (
      <div className="food-drink-container">
        <Header history={ history } />
        {stateDrinks ? newArray.map((recipe, index) => (
          <div className="card" key={ index } data-testid={ `${index}-recipe-card` }>
            <img
              src={ recipe.strDrinkThumb }
              data-testid={ `${index}-card-img` }
              alt="recipe"
            />
            <hr className="card-hr" />
            <p data-testid={ `${index}-card-name` }>{recipe.strDrink}</p>
            <hr className="card-hr" />
          </div>
        )) : null}
        <Footer history={ history } />
      </div>
    );
  }
}

Drinks.propTypes = {
  history: PropTypes.shape().isRequired,
  stateDrinks: PropTypes.shape().isRequired,
};

const mapStateToProps = (state) => ({
  stateDrinks: state.menu.drinks,
});

export default connect(mapStateToProps, null)(Drinks);
