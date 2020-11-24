import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import './style/recipesCard.css';

class RecipesCardDrinks extends Component {
  filter(index, strCategory) {
    return (
      <div key={ index }>
        <button type="button" data-testid={ `${strCategory}-category-filter` }>
          {strCategory}
        </button>
      </div>
    );
  }

  renderDrinks(drinks) {
    const zero = 0;
    const twelve = 12;
    const drinksArray = drinks.slice(zero, twelve);

    return drinksArray.map((item, index) => {
      const { strDrinkThumb, strDrink } = item;
      return (
        <div key={ index } data-testid={ `${index}-recipe-card` }>
          <img
            className="recipe-thumb"
            data-testid={ `${index}-card-img` }
            alt={ strDrink }
            src={ strDrinkThumb }
          />
          <p data-testid={ `${index}-card-name` }>{ strDrink }</p>
        </div>
      );
    });
  }

  renderFilterButtons(drinksCategories) {
    const zero = 0;
    const five = 5;

    const drinksCategoriesArray = drinksCategories.slice(zero, five);
    return drinksCategoriesArray.map((item, index) => {
      const { strCategory } = item;
      return this.filter(index, strCategory);
    });
  }

  render() {
    const { drinks, drinksCategories } = this.props;
    return (
      <div>
        <div>
          { drinksCategories && this.renderFilterButtons(drinksCategories) }
        </div>
        <div>
          { drinks && this.renderDrinks(drinks) }
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  drinks: state.mealsAndDrinksReducer.drinks,
  drinksCategories: state.mealsAndDrinksReducer.drinksCategories,
});

RecipesCardDrinks.propTypes = {
  drinksCategories: PropTypes.func.isRequired,
  drinks: PropTypes.objectOf.isRequired,
};

export default connect(mapStateToProps, null)(RecipesCardDrinks);
