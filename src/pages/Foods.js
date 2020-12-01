import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Footer, Header } from '../components';
import { foodsOnRender, foodsCategoriesOnRender,
  filterFoodsByCategory, fetchMeal } from '../services';
import { comida, controlState } from '../actions';

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
    this.setKeyLocalStorage = this.setKeyLocalStorage.bind(this);
  }

  async componentDidMount() {
    const { control } = this.props;
    let mealsRender;
    const initList = 0;
    const maxList = 12;
    if (control !== '') {
      const mealsExplorer = await fetchMeal(control, 'ingrediente');
      mealsRender = mealsExplorer.slice(initList, maxList);
    } else { mealsRender = await foodsOnRender(); }

    const Categories = await foodsCategoriesOnRender();
    this.setInitialState(mealsRender, Categories);
    this.setKeyLocalStorage();
  }

  async componentDidUpdate() {
    const { stateMeals } = this.props;
    const MAXIMUM_LENGTH = 0;
    if (stateMeals.length > MAXIMUM_LENGTH) {
      this.stateAfterProps(stateMeals);
    }
  }

  componentWillUnmount() {
    const { dispatchControlState } = this.props;
    dispatchControlState('');
  }

  setKeyLocalStorage() {
    const verifyLocalStorage = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const recipesInProgress = {
      cocktails: { },
      meals: { },
    };
    if (!verifyLocalStorage) {
      localStorage.setItem('inProgressRecipes', JSON.stringify(recipesInProgress));
    }
  }

  async setCategory({ target }, { strCategory }) {
    const { CategoryFilter } = this.state;
    if (CategoryFilter !== strCategory) {
      const filteredFoods = await filterFoodsByCategory(strCategory);
      this.setState({ Meals: filteredFoods, CategoryFilter: strCategory });
      target.style.background = '#ac5c22';
    } else {
      const initialMeals = await foodsOnRender();
      this.setState({ Meals: initialMeals, CategoryFilter: '' });
      target.style.background = '#5a2d0c';
    }
  }

  stateAfterProps(props) {
    const { dispatchMeals } = this.props;
    this.setState({ Meals: props });
    dispatchMeals([]);
  }

  setInitialState(mealsRender, Categories) {
    this.setState({ Meals: mealsRender, Categories });
  }

  async allButtonHandler() {
    const initialMeals = await foodsOnRender();
    this.setState({ Meals: initialMeals, CategoryFilter: '' });
  }

  redirectOnImage(recipe) {
    const { history } = this.props;
    history.push(`/comidas/${recipe.idMeal}`);
  }

  render() {
    const INITIAL_VALUE = 0;
    const { history } = this.props;
    const { Meals, Categories } = this.state;
    return (
      <div className="food-drink-container">
        <Header history={ history } />
        <div className="category-buttons">
          {Categories ? Categories.map((element, index) => (
            <div key={ index } data-testid={ `${element.strCategory}-category-filter` }>
              <button
                className="food-filters"
                type="button"
                onClick={ (event) => this.setCategory(event, element) }
              >
                {element.strCategory}
              </button>
            </div>
          )) : ''}
          {Categories.length > INITIAL_VALUE
          && (
            <button
              type="button"
              className="food-filters"
              data-testid="All-category-filter"
              onClick={ () => this.allButtonHandler() }
            >
              All
            </button>
          )}
        </div>
        <div className="cards-container">
          {Meals ? Meals.map((recipe, index) => (
            <div className="card" key={ index } data-testid={ `${index}-recipe-card` }>
              <input
                type="image"
                width="100%"
                src={ recipe.strMealThumb }
                data-testid={ `${index}-card-img` }
                alt="recipe"
                onClick={ () => this.redirectOnImage(recipe) }
                style={ { borderRadius: '4px' } }
              />
              <hr className="card-hr" />
              <p data-testid={ `${index}-card-name` } className="bla">
                {recipe.strMeal}
              </p>
              <hr className="card-hr" />
            </div>
          )) : null}
        </div>
        <Footer history={ history } />
      </div>
    );
  }
}

Foods.propTypes = {
  history: PropTypes.shape().isRequired,
  dispatchMeals: PropTypes.func.isRequired,
  stateMeals: PropTypes.arrayOf(PropTypes.object).isRequired,
  dispatchControlState: PropTypes.func.isRequired,
  control: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  stateMeals: state.menu.meals,
  control: state.menu.control,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchMeals: (meals) => dispatch(comida(meals)),
  dispatchControlState: (control) => dispatch(controlState(control)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Foods);
