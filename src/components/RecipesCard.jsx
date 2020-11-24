import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import './style/recipesCard.css';

class RecipesCard extends Component {
  cardBody(index, thumbName, recipeName) {
    return (
      <div key={ index } data-testid={ `${index}-recipe-card` }>
        <img
          className="recipe-thumb"
          data-testid={ `${index}-card-img` }
          alt={ recipeName }
          src={ thumbName }
        />
        <p data-testid={ `${index}-card-name` }>{ recipeName }</p>
      </div>
    );
  }

  renderMealsAndDrink(meals, drinks) {
    const zero = 0;
    const twelve = 12;
    const mealsArray = meals.slice(zero, twelve);
    const drinksArray = drinks.slice(zero, twelve);

    if (mealsArray.length !== zero) {
      return mealsArray.map((item, index) => {
        const { strMealThumb, strMeal } = item;
        return this.cardBody(index, strMealThumb, strMeal);
      });
    }

    return drinksArray.map((item, index) => {
      const { strDrinkThumb, strDrink } = item;
      return this.cardBody(index, strDrinkThumb, strDrink);
    });
  }

  render() {
    const { meals, drinks } = this.props;
    return (
      <div>{ (meals || drinks) && this.renderMealsAndDrink(meals, drinks) }</div>
    );
  }
}

const mapStateToProps = (state) => ({
  meals: state.mealsAndDrinksReducer.meals,
  drinks: state.mealsAndDrinksReducer.drinks,
});

RecipesCard.propTypes = {
  meals: PropTypes.objectOf.isRequired,
  drinks: PropTypes.objectOf.isRequired,
};

export default connect(mapStateToProps, null)(RecipesCard);
