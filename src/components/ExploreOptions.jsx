import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import randomCall from '../services/theRandomCallApi';

class ExploreOptions extends Component {
  constructor() {
    super()
    this.handleClick = this.handleClick.bind(this);
  }

  async handleClick() {
    const { location: { pathname }, history } = this.props;
    const path = pathname;
    const randomFood = ('https://www.themealdb.com/api/json/v1/1/random.php');
    const randomDrink = ('https://www.thecocktaildb.com/api/json/v1/1/random.php');
    
    if(path === '/explorar/comidas') {
      const randomAPI = await randomCall(randomFood);
      const foodID = randomAPI.meals[0].idMeal;
      history.push(`${path.slice(-8)}/${foodID}`);
    }
    if(path === '/explorar/bebidas') {
      const randomAPI = await randomCall(randomDrink);
      const drinkID = randomAPI.drinks[0].idDrink;
      history.push(`${path.slice(-8)}/${drinkID}`);
    }
  }

  render() {
    const { location: { pathname } } = this.props;
    const path = pathname;
   
    return (
      <div>
        <Link data-testid="explore-by-ingredient" to={ `${pathname}/ingredientes` }>
          Por Ingredientes
        </Link>
        {!path.includes('bebidas') && (
          <Link data-testid="explore-by-area" to={ `${pathname}/area` }>
            Por Local de Origem
          </Link>
        )}
        <button onClick={() => this.handleClick()} data-testid="explore-surprise">
          Me Surpreenda!
        </button>
      </div>
    );
  }
}

ExploreOptions.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
};

export default ExploreOptions;
