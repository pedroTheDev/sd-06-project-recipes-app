import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Footer, Header } from '../components';

class Foods extends React.Component {
  render() {
    const { history, stateMeals } = this.props;
    return (
      <div>
        <Header history={ history } />
        {stateMeals ? stateMeals.map((recipe, index) => (
          <div key={ index } data-testid={ `${index}-recipe-card` }>
            <img
              src={ recipe.strMealThumb }
              data-testid={ `${index}-card-img` }
              alt="recipe"
            />
            <p data-testid={ `${index}-card-name` }>{recipe.strMeal}</p>
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
