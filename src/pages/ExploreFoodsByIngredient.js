import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Footer, Header } from '../components';
import { foodsIngredientsRender } from '../services';

class ExploreFoodsByIngredient extends React.Component {
  constructor() {
    super();

    this.setIngredientsState = this.setIngredientsState.bind(this);
    this.redirectOnImage = this.redirectOnImage.bind(this);

    this.state = { ingredients: [] };
  }

  async componentDidMount() {
    this.setIngredientsState();
  }

  async setIngredientsState() {
    this.setState({ ingredients: await foodsIngredientsRender() });
  }

  redirectOnImage(recipe) {
    const { history } = this.props;
    history.push('/comidas/');
  }

  render() {
    const { ingredients } = this.state;
    const { history } = this.props;
    return (
      <div className="explorefoods-container">
        <Header history={ history } />
        {ingredients.length > 0 && (ingredients.map((recipe, index) => (
          <div className="card" key={ index } data-testid={ `${index}-ingredient-card` }>
            <input
              type="image"
              width="100%"
              src={ `https://www.themealdb.com/images/ingredients/${recipe.strIngredient}-Small.png` }
              data-testid={ `${index}-card-img` }
              alt={ `imagem de ${recipe.strIngredient}` }
              onClick={ () => this.redirectOnImage(recipe.strIngredient) }
            />
            <hr className="card-hr" />
            <p data-testid={ `${index}-card-name` } className="bla">
              {recipe.strIngredient}
            </p>
            <hr className="card-hr" />
          </div>)))}
        <Footer history={ history } />
      </div>
    );
  }
}

ExploreFoodsByIngredient.propTypes = {
  history: PropTypes.shape().isRequired,
};

export default connect(null, null)(ExploreFoodsByIngredient);
