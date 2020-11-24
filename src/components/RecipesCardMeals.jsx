import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import './style/recipesCard.css';

class RecipesCardMeals extends Component {
  filter(index, strCategory) {
    return (
      <div key={ index }>
        <button type="button" data-testid={ `${strCategory}-category-filter` }>
          {strCategory}
        </button>
      </div>
    );
  }

  renderMeals(meals) {
    const zero = 0;
    const twelve = 12;
    const mealsArray = meals.slice(zero, twelve);

    return mealsArray.map((item, index) => {
      const { strMealThumb, strMeal } = item;
      return (
        <div key={ index } data-testid={ `${index}-recipe-card` }>
          <img
            className="recipe-thumb"
            data-testid={ `${index}-card-img` }
            alt={ strMeal }
            src={ strMealThumb }
          />
          <p data-testid={ `${index}-card-name` }>{ strMeal }</p>
        </div>
      );
    });
  }

  renderFilterButtons(mealsCategories) {
    const zero = 0;
    const five = 5;

    const mealsCategoriesArray = mealsCategories.slice(zero, five);
    return mealsCategoriesArray.map((item, index) => {
      const { strCategory } = item;
      return this.filter(index, strCategory);
    });
  }

  render() {
    const { meals, mealsCategories } = this.props;
    return (
      <div>
        <div>
          { mealsCategories && this.renderFilterButtons(mealsCategories) }
        </div>
        <div>
          { meals && this.renderMeals(meals) }
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  meals: state.mealsAndDrinksReducer.meals,
  mealsCategories: state.mealsAndDrinksReducer.mealsCategories,
});

RecipesCardMeals.propTypes = {
  meals: PropTypes.objectOf.isRequired,
  mealsCategories: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, null)(RecipesCardMeals);
