import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Footer, Header } from '../components';
import { foodsOnRender, foodsCategoriesOnRender, filterFoodsByCategory } from '../services';
import { Link } from 'react-router-dom';

class Foods extends React.Component {
  constructor() {
    super();
    this.state = {
      Meals: [],
      Categories: [],
      FilteredMeal: [],
      CategoryFilter: '',
    };
    this.setCategory = this.setCategory.bind(this);
  }

  async componentDidMount() {
    const Meals = await foodsOnRender();
    const Categories = await foodsCategoriesOnRender();
    this.setState({ Meals, Categories });
  }

  async setCategory({ strCategory }) {
    const { CategoryFilter } = this.state;
    if (CategoryFilter !== strCategory) {
      const filteredFoods = await filterFoodsByCategory(strCategory);
      this.setState({ Meals: filteredFoods, CategoryFilter: strCategory });
    } else {
      const Meals = await foodsOnRender();
      this.setState({ Meals: Meals, CategoryFilter: '' });
    }
  }

  render() {
    const { history } = this.props;
    const { Meals, Categories } = this.state;
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
