import React, { Component } from 'react';
import PropTypes from 'prop-types';

import DrinkCard from '../components/DrinkCard';

class Details extends Component {
  constructor() {
    super();
    this.state = {
      mealsDetails: [],
      drinksRecommendations: [],
      isLoading: true,
    };
    this.requestDetails = this.requestDetails.bind(this);
    this.renderCardDetails = this.renderCardDetails.bind(this);
  }

  componentDidMount() {
    this.requestDetails();
  }

  requestDetails() {
    this.setState({ isLoading: true }, async () => {
      const {
        match: {
          params: { id },
        },
      } = this.props;
      const endPoint = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
      const endPointRecomendations = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
      const mealsApi = await fetch(endPoint);
      const { meals } = await mealsApi.json();
      const drinksApi = await fetch(endPointRecomendations);
      const { drinks } = await drinksApi.json();
      const zero = 0;
      const six = 6;
      this.setState({
        mealsDetails: meals,
        drinksRecommendations: drinks.slice(zero, six),
        isLoading: false,
      });
    });
  }

  parseIngredientsAndMeasures(details) {
    const ZERO = 0;
    let index = ZERO;
    const ingredients = Object.entries(details[0])
      .filter(([key, value]) => {
        if (key === `strIngredient${index + 1}` && value !== ' ') {
          index += 1;
          return value;
        }
        return null;
      })
      .map((item) => item[1]);

    index = ZERO;
    const measures = Object.entries(details[0])
      .filter(([key, value]) => {
        if (key === `strMeasure${index + 1}` && value !== ' ') {
          index += 1;
          return value;
        }
        return null;
      })
      .map((item) => item[1]);

    return ingredients.map((ingredient, idx) => `${ingredient} - ${measures[idx]}`);
  }

  renderCardDetails() {
    const { mealsDetails, drinksRecommendations } = this.state;
    const ingredientsAndMeasures = this.parseIngredientsAndMeasures(mealsDetails);
    console.log('1', mealsDetails);
    console.log('1', drinksRecommendations);
    const {
      strMeal,
      strMealThumb,
      strCategory,
      strInstructions,
      strYoutube,
    } = mealsDetails[0];
    return (
      <div>
        <h3 data-testid="recipe-title">{strMeal}</h3>
        <img data-testid="recipe-photo" src={ strMealThumb } alt={ `${strMeal}` } />
        <button type="button" data-testid="share-btn">
          share
        </button>
        <button type="button" data-testid="favorite-btn">
          favorite
        </button>
        <p data-testid="recipe-category">{strCategory}</p>
        {ingredientsAndMeasures.map((item, idx) => (
          <p key={ `${idx}` } data-testid={ `${idx}-ingredient-name-and-measure` }>
            {item}
          </p>
        ))}
        <p data-testid="instructions">{strInstructions}</p>
        <p data-testid="video">{strYoutube}</p>
        {drinksRecommendations.map((item, idx) => (
          <div key={ idx } data-testid={ `${idx}-recomendation-card` }>
            <DrinkCard drink={ item } idx={ idx } />
          </div>
        ))}
        <button type="button" data-testid="start-recipe-btn">
          Iniciar Receita
        </button>
      </div>
    );
  }

  render() {
    const { isLoading } = this.state;
    return (
      <div>{isLoading ? <p>carregando</p> : this.renderCardDetails()}</div>
    );
  }
}

// O texto da categoria deve possuir o atributo data-testid="recipe-category";
// Os ingredientes devem possuir o atributo data-testid="${index}-ingredient-name-and-measure";
// O texto de instruções deve possuir o atributo data-testid="instructions";
// O vídeo, presente somente na tela de comidas, deve possuir o atributo data-testid="video";
// O card de receitas recomendadas deve possuir o atributo data-testid="${index}-recomendation-card";

// const mapDispatchToProps = (dispatch) => ({
//   sendLogin: (email) => dispatch(addLogin(email)),
// });

Details.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.objectOf,
  }).isRequired,
};

// export default connect(null, mapDispatchToProps)(Login);
export default Details;
