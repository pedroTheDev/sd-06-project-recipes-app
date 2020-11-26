import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Footer, Header } from '../components';
import { foodsOnRender, foodsCategoriesOnRender,
  filterFoodsByCategory } from '../services';

class Foods extends React.Component {
  constructor() {
    super();
    this.state = {
      Meals: [],
      Categories: [],
      CategoryFilter: '',
    };
    this.setCategory = this.setCategory.bind(this);
    this.allButtonHandler = this.allButtonHandler.bind(this);
    this.setInitialState = this.setInitialState.bind(this);
  }

  async componentDidMount() {
    const mealsRender = await foodsOnRender();
    const Categories = await foodsCategoriesOnRender();
    this.setInitialState(mealsRender, Categories);
  }

  async setCategory({ strCategory }) {
    const { CategoryFilter } = this.state;
    if (CategoryFilter !== strCategory) {
      const filteredFoods = await filterFoodsByCategory(strCategory);
      this.setState({ Meals: filteredFoods, CategoryFilter: strCategory });
    } else {
      const initialMeals = await foodsOnRender();
      this.setState({ Meals: initialMeals, CategoryFilter: '' });
    }
  }

  setInitialState(mealsRender, Categories) {
    this.setState({ Meals: mealsRender, Categories });
  }

  async allButtonHandler() {
    const initialMeals = await foodsOnRender();
    this.setState({ Meals: initialMeals, CategoryFilter: '' });
  }

  render() {
    const { history } = this.props;
    const { Meals, Categories } = this.state;
    const INITIAL_VALUE = 0;
    return (
      <div className="food-drink-container">
        <Header history={ history } />
        {Categories ? Categories.map((element, index) => (
          <div key={ index } data-testid={ `${element.strCategory}-category-filter` }>
            <button type="button" onClick={ () => this.setCategory(element) }>
              {element.strCategory}
            </button>
          </div>
        )) : ''}
        {Categories.length > INITIAL_VALUE
        && (
          <button
            type="button"
            data-testid="All-category-filter"
            onClick={ () => this.allButtonHandler() }
          >
            All
          </button>
        )}
        {Meals ? Meals.map((recipe, index) => (
          <div className="card" key={ index } data-testid={ `${index}-recipe-card` }>
            <Link to={ `/comidas/${recipe.idMeal}` }>
              <img
                src={ recipe.strMealThumb }
                data-testid={ `${index}-card-img` }
                alt="recipe"
              />
              <hr className="card-hr" />
              <p data-testid={ `${index}-card-name` }>{recipe.strMeal}</p>
              <hr className="card-hr" />
            </Link>
          </div>
        )) : null}
        <Footer history={ history } />
      </div>
    );
  }
}

Foods.propTypes = {
  history: PropTypes.shape().isRequired,
};

const mapStateToProps = (state) => ({
  stateMeals: state.menu.meals,
});

export default connect(mapStateToProps, null)(Foods);
