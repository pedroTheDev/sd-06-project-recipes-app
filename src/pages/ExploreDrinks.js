import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { randomRecipeDrinks } from '../services';
import { Footer, Header } from '../components';

class ExploreDrinks extends React.Component {
  constructor() {
    super();
    this.randomRequestRecipe = this.randomRequestRecipe.bind(this);
  }

  async randomRequestRecipe() {
    const { history } = this.props;
    const random = await randomRecipeDrinks();
    const id = random[0].idDrink;
    history.push(`/bebidas/${id}`);
  }

  render() {
    const { history } = this.props;
    return (
      <div className="exploredrinks-container">
        <Header history={ history } />
        <button
          type="button"
          className="explore-buttons"
          data-testid="explore-by-ingredient"
          onClick={ () => history.push('/explorar/bebidas/ingredientes') }
        >
          Por Ingredientes
        </button>
        <button
          type="button"
          className="explore-buttons"
          data-testid="explore-surprise"
          onClick={ () => this.randomRequestRecipe() }
        >
          Me Surpreenda!
        </button>
        <Footer history={ history } />
      </div>
    );
  }
}

ExploreDrinks.propTypes = {
  history: PropTypes.shape().isRequired,
};

export default connect(null, null)(ExploreDrinks);
