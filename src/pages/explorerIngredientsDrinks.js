import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import PropTypes from 'prop-types';
import theIngredientsAndAreaApi from '../services/theIngredientsAndAreaApi';
import { Header, Footer } from '../components';

class ExplorerIngredientsDrinks extends Component {
  constructor() {
    super()
    this.state = {
      ingredients: [],
    }
    this.getIngredients = this.getIngredients.bind(this);
    this.renderIngredients = this.renderIngredients.bind(this);
  }

  componentDidMount() {
    this.getIngredients();
  };

  async getIngredients () {
    const endPoint = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list';
    const { drinks } = await theIngredientsAndAreaApi(endPoint);
    // this.renderIngredients(drinks);
    this.setState({
      ingredients: drinks,
    })
    console.log("ings", this.state.ingredients);
    console.log("z", drinks[1].strIngredient1);
    console.log("tudo", drinks);
    // link
  }

  renderIngredients() {
    const { ingredients } = this.state;
    const zero = 0;
    const twelve = 12;
    const ingsArray = ingredients.slice(zero, twelve);

    return ingsArray.map((item, index) => {
      const { strIngredient1 } = item;
      const sourceImg = `https://www.thecocktaildb.com/images/ingredients/${strIngredient1}-Small.png`;
      return (
        <div key={ index }>
          <Link data-testid={ `${index}-ingredient-card` } to={ `/bebidas` }>
            <img
              className="recipe-thumb"
              data-testid={ `${index}-card-img` }
              alt={ strIngredient1 }
              src={ sourceImg }
            />
            <p data-testid={ `${index}-card-name` }>{ strIngredient1 }</p>
          </Link>
        </div>
      );
    });
  }

  render() {
    const { ingredients } = this.state;
    return (
      <div>
        <Header title={ 'Explorar Ingredientes' } />
        { ingredients.length !== 0 && this.renderIngredients()}
        <Footer />
      </div>
    );
  }
}

// explorerIngredientsDrinks.propTypes = {
//   drinks: PropTypes.objectOf.isRequired,
//   idx: PropTypes.number.isRequired,
// };

export default ExplorerIngredientsDrinks;
