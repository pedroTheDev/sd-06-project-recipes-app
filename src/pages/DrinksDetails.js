import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Header } from '../components';
import { fetchDrinksById, fetchRecommendedDrinks } from '../services';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

class DrinksDetails extends React.Component {
  constructor() {
    super();
    this.state = {
      Drink: [],
      RecommendedDrinks: [],
    };
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

  render() {
    const { history } = this.props;
    const { Drink, RecommendedDrinks } = this.state;
    return (
      <div>
        <Header history={ history } />
        {Drink ? Drink.map((recipe, index) => {
          console.log(Drink);
          return (
            <div className="card" key={ index }>
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
              {RecommendedDrinks.map((recomend, i) => {
                return (
                  <div key={ i }>
                    <img
                      src={ recomend.strDrinkThumb }
                      data-testid="recipe-photo"
                      alt="recipe-img"
                    />
                    <p>{recomend.strAlcoholic}</p>
                    <h3>{recomend.strDrink}</h3>
                  </div>
                );
              })}
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
