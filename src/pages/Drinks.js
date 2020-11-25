import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Footer, Header } from '../components';
import { drinksCategoriesOnRender, drinksOnRender, filterDrinksByCategory } from '../services';
import { Link } from 'react-router-dom';

class Drinks extends React.Component {
  constructor() {
    super();
    this.state = {
      Drinks: [],
      Categories: [],
      FilteredDrinks: [],
      CategoryFilter: '',
    };
    this.setCategory = this.setCategory.bind(this);
    this.allButtonHandler = this.allButtonHandler.bind(this);
  }

  async componentDidMount() {
    const Drinks = await drinksOnRender();
    const Categories = await drinksCategoriesOnRender();
    this.setState({ Drinks, Categories });
  }

  async setCategory({ strCategory }) {
    const { CategoryFilter } = this.state;
    if (CategoryFilter !== strCategory) {
      const filteredFoods = await filterDrinksByCategory(strCategory);
      this.setState({ Drinks: filteredFoods, CategoryFilter: strCategory });
    } else {
      const Drinks = await drinksOnRender();
      this.setState({ Drinks: Drinks, CategoryFilter: '' });
    }
  }

  async allButtonHandler() {
    const Drinks = await drinksOnRender();
    this.setState({ Drinks: Drinks, CategoryFilter: '' });
  }

  render() {
    const { history } = this.props;
    const { Drinks, Categories } = this.state;
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
        <button type="button" data-testid="All-category-filter" onClick={ () => this.allButtonHandler() }>
          All
        </button>
        {Drinks ? Drinks.map((recipe, index) => (
          <div className="card" key={ index } data-testid={ `${index}-recipe-card` }>
            <Link to={ `/bebidas/${recipe.idDrink}` }>
              <img
                src={ recipe.strDrinkThumb }
                data-testid={ `${index}-card-img` }
                alt="recipe"
              />
              <hr className="card-hr" />
              <p data-testid={ `${index}-card-name` }>{recipe.strDrink}</p>
              <hr className="card-hr" />
            </Link>
          </div>
        )) : null}
        <Footer history={ history } />
      </div>
    );
  }
}

Drinks.propTypes = {
  history: PropTypes.shape().isRequired,
};

const mapStateToProps = (state) => ({
  stateDrinks: state.menu.drinks,
});

export default connect(mapStateToProps, null)(Drinks);
