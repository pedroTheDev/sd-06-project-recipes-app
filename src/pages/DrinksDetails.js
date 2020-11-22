import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchDrinksById, fetchRecommendedDrinks } from '../services';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

class DrinksDetails extends React.Component {
  constructor() {
    super();
    this.state = {
      Drink: [],
      RecommendedDrinks: [],
      x: 0,
    };
    this.goLeft = this.goLeft.bind(this);
    this.goRight = this.goRight.bind(this);
  }

  async componentDidMount() {
    const { history: { location: { pathname } } } = this.props;
    const endpoint = pathname.split('/').pop();
    const drinkRecipe = await fetchDrinksById(endpoint);
    const recommendedDrinks = await fetchRecommendedDrinks();
    this.setDrinkState(drinkRecipe, recommendedDrinks);
  }

  setDrinkState(Drink, RecommendedDrinks) {
    this.setState({
      Drink,
      RecommendedDrinks,
    });
  }

  goLeft() {
    const additionalX = 110;
    const mintranslateX = 0;
    const maxtranslateX = 440;
    const { x } = this.state;
    if (x === mintranslateX) this.setState({ x: x - maxtranslateX });
    else this.setState({ x: x + additionalX });
  }

  goRight() {
    const additionalX = 110;
    const maxtranslateX = 440;
    const { x } = this.state;
    if (x === -maxtranslateX) this.setState({ x: x + maxtranslateX });
    else this.setState({ x: x - additionalX });
  }

  render() {
    const { Drink, RecommendedDrinks, x } = this.state;
    return (
      <div>
        {Drink ? Drink.map((recipe, index) => {
          console.log(Drink);
          return (
            <div className="card detail-card" key={ index }>
              <img
                src={ recipe.strDrinkThumb }
                data-testid="recipe-photo"
                alt="recipe-img"
              />
              <div className="details-recipe-title-div">
                <h1 data-testid="recipe-title">{recipe.strDrink}</h1>
                <p data-testid="recipe-category">{recipe.strAlcoholic}</p>
                <input type="image" src={ shareIcon } alt="shareIcon" />
                <input type="image" src={ whiteHeartIcon } alt="whiteHeartIcon" />
              </div>
              <hr className="card-hr" />
              <h2>Ingredients</h2>
              <div>
                <ul>
                  {recipe.strIngredient1 || recipe.strMeasure1
                    ? <li>{`${recipe.strIngredient1} - ${recipe.strMeasure1}`}</li> : '' }
                  {recipe.strIngredient2 || recipe.strMeasure2
                    ? <li>{`${recipe.strIngredient2} - ${recipe.strMeasure2}`}</li> : '' }
                  {recipe.strIngredient3 || recipe.strMeasure3
                    ? <li>{`${recipe.strIngredient3} - ${recipe.strMeasure3}`}</li> : '' }
                  {recipe.strIngredient4 || recipe.strMeasure4
                    ? <li>{`${recipe.strIngredient4} - ${recipe.strMeasure4}`}</li> : '' }
                  {recipe.strIngredient5 || recipe.strMeasure5
                    ? <li>{`${recipe.strIngredient5} - ${recipe.strMeasure5}`}</li> : '' }
                  {recipe.strIngredient6 || recipe.strMeasure6
                    ? <li>{`${recipe.strIngredient6} - ${recipe.strMeasure6}`}</li> : '' }
                  {recipe.strIngredient7 || recipe.strMeasure7
                    ? <li>{`${recipe.strIngredient7} - ${recipe.strMeasure7}`}</li> : '' }
                  {recipe.strIngredient8 || recipe.strMeasure8
                    ? <li>{`${recipe.strIngredient8} - ${recipe.strMeasure8}`}</li> : '' }
                  {recipe.strIngredient9 || recipe.strMeasure9
                    ? <li>{`${recipe.strIngredient9} - ${recipe.strMeasure9}`}</li> : '' }
                </ul>
              </div>
              <h2 data-testid="instructions">Instructions</h2>
              <div>{recipe.strInstructions}</div>
              <p data-testid={ `${index}-card-name` }>{recipe.strMeal}</p>
              <h2>Recomendadas</h2>
              <div className="slider">
                {RecommendedDrinks.map((recomend, i) => {
                  console.log('bla');
                  return (
                    <div
                      key={ i }
                      className="slide"
                      style={ { transform: `translateX(${x}%)` } }
                    >
                      <img
                        src={ recomend.strDrinkThumb }
                        data-testid="recipe-photo"
                        alt="recipe-img"
                      />
                      <div className="text-slider-div">
                        <p>{recomend.strAlcoholic}</p>
                        <h3>{recomend.strDrink}</h3>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="slider-controls">
                <button type="button" id="goLeft" onClick={ this.goLeft }>
                  <i className="fas fa-chevron-left" />
                </button>
                <button type="button" id="goRight" onClick={ this.goRight }>
                  <i className="fas fa-chevron-right" />
                </button>
              </div>
            </div>
          );
        }) : null}
      </div>
    );
  }
}

DrinksDetails.propTypes = {
  history: PropTypes.shape().isRequired,
};

export default connect(null, null)(DrinksDetails);
