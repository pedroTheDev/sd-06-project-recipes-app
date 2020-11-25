import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Header, FoodCard, DrinkCard } from '../components';

class DoneRecipes extends React.Component {
  constructor() {
    super();

    this.state = {
      type: 'all',
      drinkIndex: 0,
    };

    this.setFilterState = this.setFilterState.bind(this);
    this.setFilterIndex = this.setFilterIndex.bind(this);
  }

  componentDidMount() {
    const recipes = JSON.parse(localStorage.getItem('doneRecipes'));
    if (recipes) {
      const foods = recipes.filter((element) => element.type === 'comida').length;
      this.setFilterIndex(foods);
    }
  }

  setFilterIndex(foods) {
    this.setState({
      drinkIndex: foods,
    });
  }

  setFilterState({ target: { id } }) {
    this.setState({
      type: id,
    });
  }

  render() {
    const { history } = this.props;
    const { type, drinkIndex } = this.state;
    return (
      <div>
        <Header history={ history } />
        <h1>dentro do header</h1>
        <h1>quase fora do header</h1>
        <h1>fora do header</h1>
        <button
          id="all"
          data-testid="filter-by-all-btn"
          type="button"
          onClick={ this.setFilterState }
        >
          All
        </button>

        <button
          id="food"
          data-testid="filter-by-food-btn"
          type="button"
          onClick={ this.setFilterState }
        >
          Food
        </button>

        <button
          id="drink"
          data-testid="filter-by-drink-btn"
          type="button"
          onClick={ this.setFilterState }
        >
          Drinks
        </button>

        {type === 'food' ? <FoodCard history={ history } indexAcc={ 0 } /> : null }
        {type === 'drink' ? <DrinkCard history={ history } indexAcc={ 0 } /> : null }
        {type === 'all'
          ? (
            <div>
              <FoodCard history={ history } indexAcc={ 0 } />
              <DrinkCard history={ history } indexAcc={ drinkIndex } />
            </div>)
          : null }

      </div>
    );
  }
}

DoneRecipes.propTypes = {
  history: PropTypes.shape().isRequired,
};

export default connect(null, null)(DoneRecipes);
