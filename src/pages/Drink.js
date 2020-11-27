import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Footer, Header } from '../components';
import { drinksCategoriesOnRender,
  drinksOnRender, filterDrinksByCategory, fetchDrinks } from '../services';
import { bebida, controlState } from '../actions';

class Drink extends React.Component {
  constructor() {
    super();
    this.state = {
      Drinks: [],
      Categories: [],
      CategoryFilter: '',
    };
    this.setCategory = this.setCategory.bind(this);
    this.allButtonHandler = this.allButtonHandler.bind(this);
    this.setInitialState = this.setInitialState.bind(this);
  }

  async componentDidMount() {
    const { control } = this.props;
    let drinksRender;
    const initList = 0;
    const maxList = 12;
    if (control !== '') {
      const drinksExplorer = await fetchDrinks(control, 'ingrediente');
      drinksRender = drinksExplorer.slice(initList, maxList);
    } else { drinksRender = await drinksOnRender(); }

    const Categories = await drinksCategoriesOnRender();
    this.setInitialState(drinksRender, Categories);
  }

  async componentDidUpdate() {
    const { stateDrinks } = this.props;
    const MAXIMUM_LENGTH = 0;
    if (stateDrinks.length > MAXIMUM_LENGTH) {
      this.stateAfterProps(stateDrinks);
    }
  }

  componentWillUnmount() {
    const { dispatchControlState } = this.props;
    dispatchControlState('');
  }

  async setCategory({ strCategory }) {
    const { CategoryFilter } = this.state;
    if (CategoryFilter !== strCategory) {
      const drinksCategory = await filterDrinksByCategory(strCategory);
      this.setState({ Drinks: drinksCategory, CategoryFilter: strCategory });
    } else {
      const initialDrinks = await drinksOnRender();
      this.setState({ Drinks: initialDrinks, CategoryFilter: '' });
    }
  }

  stateAfterProps(props) {
    const { dispatchDrinks } = this.props;
    this.setState({ Drinks: props });
    dispatchDrinks([]);
  }

  setInitialState(drinksRender, Categories) {
    this.setState({ Drinks: drinksRender, Categories });
  }

  async allButtonHandler() {
    const initialDrinks = await drinksOnRender();
    this.setState({ Drinks: initialDrinks, CategoryFilter: '' });
  }

  redirectOnImage(recipe) {
    const { history } = this.props;
    history.push(`/bebidas/${recipe.idDrink}`);
  }

  render() {
    const { history } = this.props;
    const { Drinks, Categories } = this.state;
    const INITIAL_VALUE = 0;
    return (
      <div className="food-drink-container">
        <div className="category-buttons">
          <Header history={ history } />
          {Categories ? Categories.map((element, index) => (
            <div key={ index } data-testid={ `${element.strCategory}-category-filter` }>
              <button
                type="button"
                className="drink-filters"
                onClick={ () => this.setCategory(element) }
              >
                {element.strCategory}
              </button>
            </div>
          )) : ''}
          {Categories.length > INITIAL_VALUE
          && (
            <button
              type="button"
              className="drink-filters"
              data-testid="All-category-filter"
              onClick={ () => this.allButtonHandler() }
            >
              All
            </button>
          )}
        </div>
        <div className="cards-container">
          {Drinks ? Drinks.map((recipe, index) => (
            <div className="card" key={ index } data-testid={ `${index}-recipe-card` }>
              <input
                type="image"
                width="100%"
                src={ recipe.strDrinkThumb }
                data-testid={ `${index}-card-img` }
                alt="recipe"
                onClick={ () => this.redirectOnImage(recipe) }
              />
              <hr className="card-hr" />
              <p data-testid={ `${index}-card-name` }>{recipe.strDrink}</p>
              <hr className="card-hr" />
            </div>
          )) : null}
        </div>
        <Footer history={ history } />
      </div>
    );
  }
}

Drink.propTypes = {
  history: PropTypes.shape().isRequired,
  dispatchDrinks: PropTypes.func.isRequired,
  stateDrinks: PropTypes.arrayOf(PropTypes.object).isRequired,
  dispatchControlState: PropTypes.func.isRequired,
  control: PropTypes.string.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  dispatchDrinks: (drinks) => dispatch(bebida(drinks)),
  dispatchControlState: (control) => dispatch(controlState(control)),
});

const mapStateToProps = (state) => ({
  stateDrinks: state.menu.drinks,
  control: state.menu.control,
});

export default connect(mapStateToProps, mapDispatchToProps)(Drink);
