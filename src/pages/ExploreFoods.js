import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { randomRecipeFoods } from '../services';
import { Footer, Header } from '../components';

class ExploreFoods extends React.Component {
  constructor() {
    super();
    this.randomRequestRecipe = this.randomRequestRecipe.bind(this);
  }

  async randomRequestRecipe() {
    const { history } = this.props;
    const random = await randomRecipeFoods();
    const id = random[0].idMeal;
    history.push(`/comidas/${id}`);
  }

  render() {
    const { history } = this.props;
    return (
      <div className="explorefoods-container">
        <Header history={ history } />
        <button
          type="button"
          className="explore-buttons"
          data-testid="explore-by-ingredient"
          onClick={ () => history.push('/explorar/comidas/ingredientes') }
        >
          Por Ingredientes
        </button>
        <button
          type="button"
          className="explore-buttons"
          data-testid="explore-by-area"
          onClick={ () => history.push('/explorar/comidas/area') }
        >
          Por Local de Origem
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

ExploreFoods.propTypes = {
  history: PropTypes.shape().isRequired,
};

export default connect(null, null)(ExploreFoods);
