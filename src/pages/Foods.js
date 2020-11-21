import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Footer, Header } from '../components';

class Foods extends React.Component {
  render() {
    const { history, stateMeals } = this.props;
    return (
      <div className="food-drink-container">
        <Header history={ history } />
        {stateMeals ? stateMeals.map((recipe, index) => (
          <div className="card" key={ index } data-testid={ `${index}-recipe-card` }>
            <img
              src={ recipe.strMealThumb }
              data-testid={ `${index}-card-img` }
              alt="recipe"
            />
            <hr className="card-hr" />
            <p data-testid={ `${index}-card-name` }>{recipe.strMeal}</p>
            <hr className="card-hr" />
          </div>
        )) : null}
        <Footer history={ history } />
      </div>
    );
  }
}

Foods.propTypes = {
  history: PropTypes.shape().isRequired,
  stateMeals: PropTypes.shape().isRequired,
};

const mapStateToProps = (state) => ({
  stateMeals: state.menu.meals,
});

export default connect(mapStateToProps, null)(Foods);
