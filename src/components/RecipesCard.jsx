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

  filter(index, strCategory) {
    return (
      <div key={ index }>
        <button type="button" data-testid={`${strCategory}-category-filter`}>
          {strCategory}
        </button>
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

  renderFilterButtons(mealsCategories, drinksCategories) {
    const zero = 0;
    const five = 5;
    if (!drinksCategories) {
      const mealsCategoriesArray = mealsCategories.slice(zero, five);
      return mealsCategoriesArray.map((item, index) => {
        const { strCategory } = item;
        return this.filter(index, strCategory);
      });
    }
    const drinksCategoriesArray = drinksCategories.slice(zero, five);
    return drinksCategoriesArray.map((item, index) => {
      const { strCategory } = item;
      return this.filter(index, strCategory);
    });
  }

  render() {
    const { meals, drinks, mealsCategories, drinksCategories } = this.props;
    return (
      <div>
        <div>
          { (mealsCategories || drinksCategories) 
          && this.renderFilterButtons(mealsCategories, drinksCategories) }
        </div>
        <div>
          { (meals || drinks) && this.renderMealsAndDrink(meals, drinks) }
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  meals: state.mealsAndDrinksReducer.meals,
  mealsCategories: state.mealsAndDrinksReducer.mealsCategories,
  drinks: state.mealsAndDrinksReducer.drinks,
  drinksCategories: state.mealsAndDrinksReducer.drinksCategories,
});

RecipesCard.propTypes = {
  meals: PropTypes.objectOf.isRequired,
  drinks: PropTypes.objectOf.isRequired,
};

export default connect(mapStateToProps, null)(RecipesCard);
