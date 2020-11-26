import React, { Component } from 'react';
import PropTypes from 'prop-types';

import DrinkCard from '../components/DrinkCard';
import MealCard from '../components/MealCard';

import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
// import blackHeartIcon from '../images/blackHeartIcon.svg';

class Details extends Component {
  constructor() {
    super();
    this.state = {
      details: [],
      recomendations: [],
      isLoading: true,
      isMeal: false,
      isDrink: false,
      clipboard: '',
    };
    this.requestDetails = this.requestDetails.bind(this);
    this.renderCardDetails = this.renderCardDetails.bind(this);
    this.handleShare = this.handleShare.bind(this);
  }

  componentDidMount() {
    const { match: { path } } = this.props;
    const pathname = path;
    this.requestDetails(pathname);
  }

  handleShare() {
    const { match: { url } } = this.props;
    window.navigator.clipboard.writeText(`http://localhost:3000${url}`)
      .then(() => {
        this.setState({
          clipboard: `http://localhost:3000${url}`,
        });
      });
  }

  requestDetails(pathname) {
    this.setState(() => {
      if (pathname.includes('comidas')) {
        return { isLoading: true, isMeal: true };
      }
      return { isLoading: true, isDrink: true };
    }, async () => {
      const {
        match: {
          params: { id },
        },
      } = this.props;
      const { isMeal, isDrink } = this.state;
      let endPointMeal;
      let endPointDrink;
      if (isMeal) {
        endPointMeal = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
        endPointDrink = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
      } else {
        endPointDrink = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
        endPointMeal = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
      }
      const mealsApi = await fetch(endPointMeal);
      const { meals } = await mealsApi.json();
      const drinksApi = await fetch(endPointDrink);
      const { drinks } = await drinksApi.json();
      const zero = 0;
      const six = 6;
      if (isDrink) {
        this.setState({
          details: drinks,
          recomendations: meals.slice(zero, six),
          isLoading: false,
        });
      } else {
        this.setState({
          details: meals,
          recomendations: drinks.slice(zero, six),
          isLoading: false,
        });
      }
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
    const { details, recomendations, isMeal, clipboard } = this.state;
    const ingredientsAndMeasures = this.parseIngredientsAndMeasures(details);
    console.log('1', details);
    console.log('1', recomendations);
    console.log('1', ingredientsAndMeasures);
    console.log('1', this.props);
    const zero = 0;
    const {
      strMeal,
      strMealThumb,
      strDrink,
      strDrinkThumb,
      strCategory,
      strAlcoholic,
      strInstructions,
      strYoutube,
    } = details[0];
    return (
      <div>
        <h3 data-testid="recipe-title">{strMeal || strDrink}</h3>
        <img
          data-testid="recipe-photo"
          src={ strMealThumb || strDrinkThumb }
          alt={ `${strMeal || strDrink}` }
          width={ 100 }
        />
        {clipboard.length !== zero && (
          <div>
            <p>Link Copiado!</p>
          </div>
        )}
        <button type="button" data-testid="share-btn" onClick={ this.handleShare }>
          <img src={ shareIcon } alt="Share Recipe" />
        </button>
        <button type="button" data-testid="favorite-btn">
          <img src={ whiteHeartIcon } alt="Favorite Recipe" />
        </button>
        {isMeal ? (
          <p data-testid="recipe-category">{strCategory}</p>
        ) : (
          <p data-testid="recipe-category">{strAlcoholic}</p>
        )}
        {ingredientsAndMeasures.map((item, idx) => (
          <p key={ `${idx}` } data-testid={ `${idx}-ingredient-name-and-measure` }>
            {item}
          </p>
        ))}
        <p data-testid="instructions">{strInstructions}</p>
        { isMeal && (<p data-testid="video">{strYoutube}</p>) }
        {/*
          REQ 37:
          TODO: Pegar Carousel de 'react-bootstrap/Carousel'
          https://react-bootstrap.github.io/components/carousel/#carousel-props
         */}
        {recomendations.map((item, idx) => (
          <div key={ idx } data-testid={ `${idx}-recomendation-card` }>
            {isMeal ? (
              <DrinkCard drink={ item } idx={ idx } />
            ) : (
              <MealCard meal={ item } idx={ idx } />
            )}
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

Details.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.objectOf,
    path: PropTypes.string,
    url: PropTypes.string,
  }).isRequired,
};

// export default connect(null, mapDispatchToProps)(Login);
export default Details;
