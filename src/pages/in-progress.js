import React, { Component } from 'react';
import PropTypes from 'prop-types';

import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

import './style/details.css';

class InProgress extends Component {
  constructor() {
    super();
    this.state = {
      details: [],
      isLoading: true,
      isMeal: false,
      clipboard: '',
      isFavorite: false,
      isDone: false,
      ingredientsUsed: [],
    };
    this.requestDetails = this.requestDetails.bind(this);
    this.renderCardDetails = this.renderCardDetails.bind(this);
    this.handleShare = this.handleShare.bind(this);
    this.handleFavorite = this.handleFavorite.bind(this);
    this.checkIsFavorite = this.checkIsFavorite.bind(this);
    this.handleInput = this.handleInput.bind(this);
  }

  componentDidMount() {
    const { match: { path } } = this.props;
    const pathname = path;
    this.requestDetails(pathname);
  }

  handleShare() {
    const { match: { url } } = this.props;
    window.navigator.clipboard.writeText(`http://localhost:3000${url.replace('/in-progress', '')}`)
      .then(() => {
        this.setState({
          clipboard: `http://localhost:3000${url.replace('/in-progress', '')}`,
        });
      });
  }

  handleFavorite() {
    this.setState((prevState) => ({
      isFavorite: !prevState.isFavorite,
    }), () => {
      const { isFavorite } = this.state;
      if (isFavorite) this.saveToLocalStorage();
      else this.deleteFromLocalStorage();
    });
  }

  handleInput({ target: { value, checked } }) {
    if (checked) {
      this.setState((prev) => ({
        ingredientsUsed: [...prev.ingredientsUsed, value],
      }));
    } else {
      this.setState((prev) => ({
        ingredientsUsed: prev.ingredientsUsed.filter((ing) => ing !== value),
      }));
    }
  }

  checkIsFavorite() {
    const { details } = this.state;
    const LS = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (LS && LS.find((recipe) => recipe.id === details[0].idMeal
    || recipe.id === details[0].idDrink)) {
      this.setState({
        isFavorite: true,
      });
    }
  }

  checkIsDone() {
    const { details } = this.state;
    const LS = JSON.parse(localStorage.getItem('doneRecipes'));
    if (LS && LS.find((recipe) => recipe.id === details[0].idMeal
    || recipe.id === details[0].idDrink)) {
      this.setState({
        isDone: true,
      });
    }
  }

  saveToLocalStorage() {
    const { isMeal, details } = this.state;
    const LS = JSON.parse(localStorage.getItem('favoriteRecipes'));
    let obj;
    if (isMeal) {
      obj = {
        id: details[0].idMeal,
        type: 'comida',
        area: details[0].strArea,
        category: details[0].strCategory,
        alcoholicOrNot: '',
        name: details[0].strMeal,
        image: details[0].strMealThumb,
      };
    } else {
      obj = {
        id: details[0].idDrink,
        type: 'bebida',
        area: '',
        category: details[0].strCategory,
        alcoholicOrNot: details[0].strAlcoholic,
        name: details[0].strDrink,
        image: details[0].strDrinkThumb,
      };
    }
    if (!LS) {
      localStorage.setItem('favoriteRecipes', JSON.stringify([obj]));
    } else {
      localStorage.setItem('favoriteRecipes', JSON.stringify([...LS, obj]));
    }
  }

  deleteFromLocalStorage() {
    const { details } = this.state;
    const LS = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const filteredLS = LS.filter((recipe) => !recipe.id
      .includes(details[0].idMeal || details[0].idDrink));
    localStorage.setItem('favoriteRecipes', JSON.stringify(filteredLS));
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
      const { isMeal } = this.state;

      if (isMeal) {
        const endPointMeal = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
        const mealsApi = await fetch(endPointMeal);
        const { meals } = await mealsApi.json();
        this.setState({
          details: meals,
          isLoading: false,
        }, () => {
          this.checkIsFavorite();
          this.checkIsDone();
        });
      } else {
        const endPointDrink = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
        const drinksApi = await fetch(endPointDrink);
        const { drinks } = await drinksApi.json();
        this.setState({
          details: drinks,
          isLoading: false,
        }, () => {
          this.checkIsFavorite();
          this.checkIsDone();
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
    const { details, isMeal, clipboard, isFavorite, isDone } = this.state;
    const ingredientsAndMeasures = this.parseIngredientsAndMeasures(details);
    console.log('1', details);
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
            <p>Link copiado!</p>
          </div>
        )}
        <button type="button" data-testid="share-btn" onClick={ this.handleShare }>
          <img src={ shareIcon } alt="Share Recipe" />
        </button>
        <button type="button" onClick={ this.handleFavorite }>
          {isFavorite ? (
            <img
              src={ blackHeartIcon }
              data-testid="favorite-btn"
              alt="Favorite Recipe"
            />
          ) : (
            <img
              src={ whiteHeartIcon }
              data-testid="favorite-btn"
              alt="Favorite Recipe"
            />
          )}
        </button>
        {isMeal ? (
          <p data-testid="recipe-category">{strCategory}</p>
        ) : (
          <p data-testid="recipe-category">{strAlcoholic}</p>
        )}
        {ingredientsAndMeasures.map((item, idx) => (
          <div key={ `${idx}` } data-testid={ `${idx}-ingredient-step` }>
            <input
              name={ `${idx}-ingredient-step` }
              type="checkbox"
              onChange={ this.handleInput }
              value={ item }
            />
            {item}
          </div>
        ))}
        <p data-testid="instructions">{strInstructions}</p>
        <button
          type="button"
          data-testid="finish-recipe-btn"
          className="finish-recipe-btn"
          disabled={ !isDone }
        >
          Finalizar Receita
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

InProgress.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.objectOf,
    path: PropTypes.string,
    url: PropTypes.string,
  }).isRequired,
};

// export default connect(null, mapDispatchToProps)(Login);
export default InProgress;
