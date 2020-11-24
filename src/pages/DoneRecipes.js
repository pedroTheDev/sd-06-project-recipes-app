import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Header, FoodCard, DrinkCard } from '../components';

class DoneRecipes extends React.Component {
  constructor() {
    super();

    this.state = {
      type: 'all',
    };

    this.setFilterState = this.setFilterState.bind(this);
  }

  setFilterState({ target: { id } }) {
    this.setState({
      type: id,
    });
  }

  render() {
    const { history } = this.props;
    const { type } = this.state;
    console.log(type);
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

        {type === 'food' ? <FoodCard history={ history } /> : '' }
        {type === 'drink' ? <DrinkCard history={ history } /> : '' }
        {type === 'all'
          ? (
            <>
              <DrinkCard history={ history } />
              <FoodCard history={ history } />
            </>)
          : '' }

      </div>
    );
  }
}

DoneRecipes.propTypes = {
  history: PropTypes.shape().isRequired,
};

export default connect(null, null)(DoneRecipes);
